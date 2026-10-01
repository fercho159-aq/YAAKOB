import { createHmac } from 'node:crypto'

export class AltaError extends Error {
  constructor(public status: number, public codigo: string, mensaje: string) { super(mensaje) }
}

/** Comunicación firmada entre los servidores; ninguna llave llega al navegador. */
export async function cuentasApp(path: '/orden' | '/confirmar', datos: object) {
  const secret = process.env.YAAKOB_PROVISION_SECRET
  const base = process.env.YAAKOB_APP_API_URL?.replace(/\/$/, '')
  if (!secret || secret.length < 32 || !base) {
    throw new AltaError(503, 'alta_no_disponible', 'El alta de cuentas no está disponible. Intente más tarde.')
  }
  const body = JSON.stringify(datos)
  const timestamp = String(Date.now())
  const signature = createHmac('sha256', secret).update(`${path}\n${timestamp}\n${body}`).digest('hex')
  let response: Response
  try {
    response = await fetch(`${base}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-yaakob-timestamp': timestamp, 'x-yaakob-signature': signature },
      body, cache: 'no-store', signal: AbortSignal.timeout(45000),
    })
  } catch {
    throw new AltaError(503, 'alta_no_disponible', 'El alta de cuentas no está disponible. Intente más tarde.')
  }
  const result = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new AltaError(response.status, result.code || 'alta_no_disponible', result.mensaje || 'El alta de cuentas no está disponible.')
  }
  return result
}
