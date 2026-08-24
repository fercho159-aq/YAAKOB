import { NextResponse } from 'next/server'
import { MAX_TARJETAS_POR_CLIENTE, sitioUrl } from '@pagos/config'
import { mensajeDeDeclinacion, esErrorDeCaptura, DECLINADA_GENERICA } from '@pagos/declinaciones'
import {
  OpenpayError,
  cargos,
  clientes,
  tarjetas,
  type CargoOpenpay,
} from '@pagos/openpay-servidor'
import { MAX_POR_LINEA, MAX_UNIDADES, buscarPlan } from '@pagos/planes'
import { descripcionDeCargo, esReferenciaValida } from '@pagos/referencia'

/**
 * Alta de suscripción.
 *
 * Recibe el TOKEN de la tarjeta, nunca el número: el PAN se captura y se
 * tokeniza en el navegador contra Openpay (punto 1), así que no toca este
 * servidor ni sus logs.
 *
 * Secuencia:
 *   1. cliente de Openpay (se reutiliza si el correo ya existe);
 *   2. tope de tarjetas guardadas — punto 11;
 *   3. alta de la tarjeta con `device_session_id` (antifraude);
 *   4. cargo del primer periodo con 3D Secure — punto 14;
 *   5. el usuario va al banco; al volver, `/api/pagos/estado` confirma el cargo
 *      y da de alta la suscripción con `trial_end_date` al final del periodo ya
 *      pagado, para que el cobro recurrente no duplique el primer mes.
 *
 * La suscripción NO se crea aquí a propósito: mientras 3D Secure no termine no
 * hay dinero confirmado, y una suscripción activa sin primer cobro es una
 * aclaración segura.
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Cuerpo = {
  /** Renglones del carrito. Un solo plan viaja como un renglón de cantidad 1. */
  items?: { planId?: string; cantidad?: number }[]
  token?: string
  deviceSessionId?: string
  referencia?: string
  cliente?: { nombre?: string; apellido?: string; correo?: string; telefono?: string }
}

const error = (mensaje: string, status = 400, extra: Record<string, unknown> = {}) =>
  NextResponse.json({ ok: false, mensaje, ...extra }, { status })

export async function POST(request: Request) {
  let cuerpo: Cuerpo
  try {
    cuerpo = (await request.json()) as Cuerpo
  } catch {
    return error('Petición inválida.')
  }

  const { items, token, deviceSessionId, referencia, cliente } = cuerpo

  /* --------------------------------------------------------- validaciones */

  if (!Array.isArray(items) || items.length === 0) {
    return error('No hay nada que contratar.')
  }

  // El carrito llega por referencia, no por importe: aquí se vuelve a resolver
  // contra el catálogo y el total se calcula con los precios del servidor. Un
  // navegador que mande otro importe no cambia lo que se cobra.
  const lineas: { planId: string; cantidad: number; nombre: string; importe: number }[] = []
  for (const item of items) {
    const plan = buscarPlan(item?.planId)
    if (!plan) return error('Uno de los planes seleccionados no existe.')
    if (!plan.openpayPlanId) {
      console.error('[pagos] plan sin openpayPlanId:', plan.id)
      return error('Este plan no está disponible por el momento.', 503)
    }
    if (lineas.some((linea) => linea.planId === plan.id)) {
      return error('El mismo plan viene repetido en la orden.')
    }
    const cantidad = Number(item?.cantidad ?? 1)
    if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > MAX_POR_LINEA) {
      return error(`La cantidad de cada plan tiene que estar entre 1 y ${MAX_POR_LINEA}.`)
    }
    lineas.push({
      planId: plan.id,
      cantidad,
      nombre: plan.nombre,
      importe: plan.precio * cantidad,
    })
  }

  const unidades = lineas.reduce((suma, linea) => suma + linea.cantidad, 0)
  if (unidades > MAX_UNIDADES) {
    return error(
      `El máximo por operación es de ${MAX_UNIDADES} suscripciones. Escríbanos a ` +
        'contacto@yaakob.com para un alta a la medida.',
    )
  }

  const importeTotal = Math.round(lineas.reduce((suma, linea) => suma + linea.importe, 0) * 100) / 100

  if (!token || typeof token !== 'string') return error('Falta el token de la tarjeta.')
  if (!deviceSessionId || typeof deviceSessionId !== 'string') {
    return error('Falta el identificador antifraude de la sesión.')
  }
  if (!esReferenciaValida(referencia)) return error('Falta la referencia de la operación.')

  const nombre = cliente?.nombre?.trim()
  const apellido = cliente?.apellido?.trim()
  const correo = cliente?.correo?.trim().toLowerCase()
  const telefono = cliente?.telefono?.trim()

  if (!nombre || !apellido || !correo || !telefono) {
    return error('Faltan los datos de contacto del titular.')
  }

  /* -------------------------------------------------------------- proceso */

  try {
    const clienteOpenpay = await clientes.obtenerOCrear({
      name: nombre,
      last_name: apellido,
      email: correo,
      phone_number: telefono,
    })

    // Punto 11: el tope se aplica en el servidor. En la interfaz también, pero
    // la interfaz no es una garantía.
    const guardadas = await tarjetas.listar(clienteOpenpay.id)
    if (guardadas.length >= MAX_TARJETAS_POR_CLIENTE) {
      return error(
        `Tiene ${MAX_TARJETAS_POR_CLIENTE} tarjetas guardadas, que es el máximo permitido. ` +
          'Elimine una desde su suscripción antes de registrar otra.',
        409,
        { codigo: 'limite_tarjetas' },
      )
    }

    const tarjeta = await tarjetas.crear(clienteOpenpay.id, {
      token_id: token,
      device_session_id: deviceSessionId,
    })

    let cargo: CargoOpenpay
    try {
      cargo = await cargos.crear(clienteOpenpay.id, {
        source_id: tarjeta.id,
        amount: importeTotal,
        currency: 'MXN',
        description: descripcionDeCargo(lineas),
        // Openpay rechaza un `order_id` repetido: ésta es la garantía real
        // contra el cobro duplicado, no el botón deshabilitado.
        order_id: referencia,
        device_session_id: deviceSessionId,
        use_3d_secure: true,
        redirect_url: `${sitioUrl}/suscripcion/resultado`,
      })
    } catch (fallo) {
      // La tarjeta quedó guardada pero el cargo no pasó: se retira para no
      // dejarle al cliente una tarjeta inservible ocupando uno de sus tres
      // lugares.
      await tarjetas.eliminar(clienteOpenpay.id, tarjeta.id).catch(() => undefined)
      throw fallo
    }

    // Camino normal con 3DS: Openpay devuelve a dónde mandar al usuario.
    if (cargo.payment_method?.type === 'redirect' && cargo.payment_method.url) {
      return NextResponse.json({
        ok: true,
        estado: '3ds',
        url: cargo.payment_method.url,
        cargoId: cargo.id,
      })
    }

    if (cargo.status === 'completed' || cargo.status === 'in_progress') {
      // Sin redirección: se confirma por el mismo camino que el retorno de 3DS,
      // para que la creación de la suscripción viva en un solo lugar.
      return NextResponse.json({
        ok: true,
        estado: 'confirmar',
        cargoId: cargo.id,
      })
    }

    return error(mensajeDeDeclinacion(cargo.error_code), 402, {
      codigo: 'declinada',
      corregible: esErrorDeCaptura(cargo.error_code),
    })
  } catch (fallo) {
    if (fallo instanceof OpenpayError) {
      // El texto de Openpay se queda en el log; al navegador va el saneado.
      return error(mensajeDeDeclinacion(fallo.codigo), fallo.httpStatus >= 500 ? 502 : 402, {
        codigo: 'declinada',
        corregible: esErrorDeCaptura(fallo.codigo),
      })
    }
    console.error('[pagos] fallo no controlado en /suscripcion', fallo)
    return error(DECLINADA_GENERICA, 500)
  }
}

/** Cierra el resto de métodos: esta ruta sólo acepta POST. */
export async function GET() {
  return error('Método no permitido.', 405)
}
