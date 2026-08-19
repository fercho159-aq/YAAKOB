import { NextResponse } from 'next/server'
import { DECLINADA_GENERICA } from '@pagos/declinaciones'
import { OpenpayError, clientes, suscripciones } from '@pagos/openpay-servidor'

/**
 * Cancelación de la suscripción.
 *
 * La política de cancelación y la sección 8 de los términos prometen un
 * mecanismo claro y accesible; esto lo cumple sin obligar al usuario a llamar
 * por teléfono.
 *
 * ── SOBRE LA AUTORIZACIÓN, LÉASE ANTES DE TOCAR ESTE ARCHIVO ──
 *
 * El sitio todavía no tiene cuentas de usuario ni sesión, así que aquí no hay
 * a quién autenticar. El modelo que se usa es de *capacidad*: para cancelar
 * hace falta presentar dos cosas a la vez — el identificador de la suscripción,
 * que es un valor opaco de Openpay que sólo ve quien completó la contratación,
 * y el correo con el que se contrató, contra el que se verifica que la
 * suscripción efectivamente pertenece a ese cliente. Ni el identificador es
 * enumerable ni el correo por sí solo sirve de nada.
 *
 * Es el mismo patrón de un enlace de baja de un boletín, y es aceptable para
 * una acción que sólo puede *detener* cobros — nunca iniciarlos, cambiar datos
 * ni revelar información. Pero NO es un sustituto de una sesión autenticada:
 * en cuanto el sitio tenga cuentas, esta ruta debe pasar a exigir sesión y
 * derivar el cliente de ella, no del cuerpo de la petición.
 *
 * Lo que esta ruta nunca hace, a propósito: listar las suscripciones o las
 * tarjetas de un correo. Un endpoint así, sin sesión, sería una fuga de datos
 * de clientes; la gestión de tarjetas guardadas tiene que esperar al área
 * autenticada.
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const error = (mensaje: string, status = 400) =>
  NextResponse.json({ ok: false, mensaje }, { status })

/** Respuesta idéntica para «no existe» y «no es tuya»: no confirma nada. */
const NO_ENCONTRADA = 'No encontramos una suscripción activa con esos datos.'

export async function POST(request: Request) {
  let suscripcionId: string | undefined
  let correo: string | undefined

  try {
    const cuerpo = (await request.json()) as { suscripcionId?: string; correo?: string }
    suscripcionId = cuerpo.suscripcionId
    correo = cuerpo.correo?.trim().toLowerCase()
  } catch {
    return error('Petición inválida.')
  }

  if (!suscripcionId || typeof suscripcionId !== 'string' || suscripcionId.length > 64) {
    return error('Falta el identificador de la suscripción.')
  }
  if (!correo || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo)) {
    return error('Escriba el correo con el que contrató.')
  }

  try {
    const cliente = await clientes.buscarPorCorreo(correo)
    if (!cliente) return error(NO_ENCONTRADA, 404)

    const lista = await suscripciones.listar(cliente.id)
    const suya = Array.isArray(lista) && lista.some((s) => s.id === suscripcionId)
    if (!suya) return error(NO_ENCONTRADA, 404)

    await suscripciones.cancelar(cliente.id, suscripcionId)

    return NextResponse.json({
      ok: true,
      mensaje:
        'Su suscripción quedó cancelada. No se generarán cobros posteriores y conserva el ' +
        'acceso hasta el final del periodo ya pagado.',
    })
  } catch (fallo) {
    if (fallo instanceof OpenpayError) {
      if (fallo.httpStatus === 404) return error(NO_ENCONTRADA, 404)
      console.error('[pagos] Openpay rechazó la cancelación', fallo.cuerpo)
      return error('No pudimos completar la cancelación. Escríbanos a contacto@yaakob.com.', 502)
    }
    console.error('[pagos] fallo no controlado en /cancelar', fallo)
    return error(DECLINADA_GENERICA, 500)
  }
}

export async function GET() {
  return error('Método no permitido.', 405)
}
