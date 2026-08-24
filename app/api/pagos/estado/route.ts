import { NextResponse } from 'next/server'
import { mensajeDeDeclinacion, DECLINADA_GENERICA } from '@pagos/declinaciones'
import {
  OpenpayError,
  cargos,
  suscripciones,
  type SuscripcionOpenpay,
} from '@pagos/openpay-servidor'
import {
  buscarPlan,
  comoFechaOpenpay,
  finDelPrimerPeriodo,
  formatearPrecio,
  type Plan,
} from '@pagos/planes'
import { planesDesdeDescripcion } from '@pagos/referencia'

/**
 * Confirmación del cargo y alta de la suscripción.
 *
 * Es la ruta a la que llama la página de retorno de 3D Secure. Regla dura: el
 * estado del cobro se lee de Openpay, NUNCA de los parámetros con los que el
 * banco devuelve al usuario. Un `?status=ok` en la URL lo escribe cualquiera;
 * el cargo consultado a la API es el único dato que vale para dar acceso.
 *
 * Idempotente: recargar la página de resultado no da de alta una segunda
 * suscripción — antes de crearla se revisa si el cliente ya tiene una activa
 * para el mismo plan.
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const error = (mensaje: string, status = 400, extra: Record<string, unknown> = {}) =>
  NextResponse.json({ ok: false, mensaje, ...extra }, { status })

const ACTIVAS = new Set(['active', 'trial', 'past_due'])

export async function POST(request: Request) {
  let cargoId: string | undefined
  try {
    const cuerpo = (await request.json()) as { cargoId?: string }
    cargoId = cuerpo.cargoId
  } catch {
    return error('Petición inválida.')
  }

  if (!cargoId || typeof cargoId !== 'string' || cargoId.length > 64) {
    return error('Falta el identificador del cargo.')
  }

  try {
    const cargo = await cargos.obtenerSuelto(cargoId)

    if (cargo.status === 'in_progress' || cargo.status === 'charge_pending') {
      return NextResponse.json({ ok: true, estado: 'pendiente' })
    }

    if (cargo.status !== 'completed') {
      return NextResponse.json(
        {
          ok: false,
          estado: 'rechazado',
          mensaje: mensajeDeDeclinacion(cargo.error_code),
        },
        { status: 402 },
      )
    }

    /* ------------------------------------------------- cargo confirmado */

    const renglones = planesDesdeDescripcion(cargo.description)
      .map((renglon) => ({ plan: buscarPlan(renglon.planId), cantidad: renglon.cantidad }))
      .filter((renglon): renglon is { plan: Plan; cantidad: number } => Boolean(renglon.plan))
    const clienteId = cargo.customer_id
    const tarjetaId = cargo.card?.id

    if (!renglones.length || !clienteId || !tarjetaId) {
      // El dinero sí entró; lo que falla es armar la recurrencia. Se le dice al
      // usuario que su pago está hecho y que soporte lo completa, en vez de
      // dejarle un error rojo sobre un cargo que sí se le hizo.
      console.error('[pagos] cargo confirmado sin datos para la suscripción', {
        cargoId,
        descripcion: cargo.description,
        clienteId,
        tarjetaId,
      })
      return NextResponse.json({
        ok: true,
        estado: 'pagado_sin_suscripcion',
        mensaje:
          'Su pago se procesó correctamente. Estamos activando su suscripción; si no recibe ' +
          'confirmación en las próximas horas, escríbanos a contacto@yaakob.com.',
        importe: formatearPrecio(cargo.amount),
      })
    }

    // Una suscripción por unidad del carrito. Idempotente: las que ya existen
    // para ese plan se cuentan primero, así que recargar la página de resultado
    // no da de alta un segundo juego de suscripciones.
    const activas = await suscripciones.listar(clienteId).catch(() => [] as SuscripcionOpenpay[])
    const contratados = []

    for (const { plan, cantidad } of renglones) {
      const existentes = Array.isArray(activas)
        ? activas.filter((s) => s.plan_id === plan.openpayPlanId && ACTIVAS.has(s.status))
        : []
      const ids = existentes.slice(0, cantidad).map((s) => s.id)

      for (let i = ids.length; i < cantidad; i += 1) {
        const suscripcion = await suscripciones.crear(clienteId, {
          plan_id: plan.openpayPlanId,
          card_id: tarjetaId,
          // El primer periodo ya se cobró con este cargo: el recurrente arranca
          // cuando ese periodo termina, no de inmediato.
          trial_end_date: comoFechaOpenpay(finDelPrimerPeriodo(plan)),
        })
        ids.push(suscripcion.id)
      }

      contratados.push({
        id: plan.id,
        nombre: plan.nombre,
        cadencia: plan.cadencia,
        cantidad,
        importe: formatearPrecio(plan.precio * cantidad, plan.moneda),
        proximoCargo: comoFechaOpenpay(finDelPrimerPeriodo(plan)),
        suscripciones: ids,
        reutilizadas: Math.min(existentes.length, cantidad),
      })
    }

    return NextResponse.json({
      ok: true,
      estado: 'activa',
      planes: contratados,
      importe: formatearPrecio(cargo.amount),
      suscripcionId: contratados[0]?.suscripciones[0],
    })
  } catch (fallo) {
    if (fallo instanceof OpenpayError) {
      if (fallo.httpStatus === 404) return error('No encontramos esa operación.', 404)
      return error(mensajeDeDeclinacion(fallo.codigo), 402)
    }
    console.error('[pagos] fallo no controlado en /estado', fallo)
    return error(DECLINADA_GENERICA, 500)
  }
}

export async function GET() {
  return error('Método no permitido.', 405)
}
