import { apiBase, llavePrivada, merchantIdServidor } from './config'

/**
 * Cliente REST de Openpay para el servidor.
 *
 * Se habla con la API por `fetch` en vez de con el SDK de Node por dos razones:
 * el SDK usa callbacks y no corre bien en el runtime de Vercel, y una
 * dependencia menos en un flujo de cobro es una superficie menos que auditar.
 *
 * NADA de este archivo puede importarse desde un componente de cliente: usa la
 * llave privada. Vive sólo detrás de las rutas de `app/api/pagos`.
 */

export type ErrorOpenpay = {
  category?: string
  error_code?: number
  description?: string
  http_code?: number
  request_id?: string
}

/** Error tipado para distinguir un fallo de Openpay de un fallo nuestro. */
export class OpenpayError extends Error {
  readonly codigo?: number
  readonly httpStatus: number
  readonly cuerpo: ErrorOpenpay

  constructor(cuerpo: ErrorOpenpay, httpStatus: number) {
    super(cuerpo.description ?? 'Error de Openpay')
    this.name = 'OpenpayError'
    this.codigo = cuerpo.error_code
    this.httpStatus = httpStatus
    this.cuerpo = cuerpo
  }
}

function autorizacion(): string {
  // Basic auth: usuario = llave privada, contraseña vacía.
  return `Basic ${Buffer.from(`${llavePrivada()}:`).toString('base64')}`
}

async function peticion<T>(
  metodo: 'GET' | 'POST' | 'PUT' | 'DELETE',
  ruta: string,
  cuerpo?: unknown,
): Promise<T> {
  const url = `${apiBase}/${merchantIdServidor()}${ruta}`

  const respuesta = await fetch(url, {
    method: metodo,
    headers: {
      Authorization: autorizacion(),
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: cuerpo === undefined ? undefined : JSON.stringify(cuerpo),
    cache: 'no-store',
  })

  if (respuesta.status === 204) return undefined as T

  const texto = await respuesta.text()
  const datos = texto ? JSON.parse(texto) : {}

  if (!respuesta.ok) {
    // El log del servidor sí guarda el detalle; al navegador nunca llega.
    console.error('[openpay]', metodo, ruta, respuesta.status, datos)
    throw new OpenpayError(datos as ErrorOpenpay, respuesta.status)
  }

  return datos as T
}

/* ------------------------------------------------------------- tipos de API */

export type ClienteOpenpay = {
  id: string
  name: string
  last_name?: string
  email: string
  phone_number?: string
}

export type TarjetaOpenpay = {
  id: string
  card_number: string
  brand: string
  type?: string
  holder_name: string
  expiration_month: string
  expiration_year: string
  bank_name?: string
  creation_date?: string
}

export type CargoOpenpay = {
  id: string
  status: 'in_progress' | 'completed' | 'failed' | 'cancelled' | 'charge_pending' | string
  amount: number
  currency: string
  order_id?: string
  description?: string
  error_message?: string
  error_code?: number
  customer_id?: string
  card?: TarjetaOpenpay
  /** Presente cuando 3D Secure exige mandar al usuario al emisor. */
  payment_method?: { type: string; url?: string }
}

export type SuscripcionOpenpay = {
  id: string
  plan_id: string
  status: 'active' | 'trial' | 'past_due' | 'unpaid' | 'cancelled' | string
  customer_id?: string
  card_id?: string
  charge_date?: string
  period_end_date?: string
  trial_end_date?: string
  cancel_at_period_end?: boolean
}

/* ------------------------------------------------------------- operaciones */

export const clientes = {
  buscarPorCorreo: async (correo: string): Promise<ClienteOpenpay | undefined> => {
    const lista = await peticion<ClienteOpenpay[]>(
      'GET',
      `/customers?email=${encodeURIComponent(correo)}&limit=1`,
    )
    return Array.isArray(lista) ? lista[0] : undefined
  },

  crear: (datos: {
    name: string
    last_name: string
    email: string
    phone_number: string
  }): Promise<ClienteOpenpay> =>
    peticion('POST', '/customers', { ...datos, requires_account: false }),

  /** Reutiliza el cliente si el correo ya existe: evita duplicados en el panel. */
  obtenerOCrear: async (datos: {
    name: string
    last_name: string
    email: string
    phone_number: string
  }): Promise<ClienteOpenpay> => {
    const existente = await clientes.buscarPorCorreo(datos.email)
    return existente ?? (await clientes.crear(datos))
  },
}

export const tarjetas = {
  listar: (clienteId: string): Promise<TarjetaOpenpay[]> =>
    peticion('GET', `/customers/${clienteId}/cards`),

  crear: (
    clienteId: string,
    datos: { token_id: string; device_session_id: string },
  ): Promise<TarjetaOpenpay> => peticion('POST', `/customers/${clienteId}/cards`, datos),

  eliminar: (clienteId: string, tarjetaId: string): Promise<void> =>
    peticion('DELETE', `/customers/${clienteId}/cards/${tarjetaId}`),
}

export const cargos = {
  crear: (
    clienteId: string,
    datos: {
      source_id: string
      amount: number
      currency: string
      description: string
      order_id: string
      device_session_id: string
      use_3d_secure: boolean
      redirect_url: string
    },
  ): Promise<CargoOpenpay> =>
    peticion('POST', `/customers/${clienteId}/charges`, { method: 'card', ...datos }),

  obtener: (clienteId: string, cargoId: string): Promise<CargoOpenpay> =>
    peticion('GET', `/customers/${clienteId}/charges/${cargoId}`),

  /** Por id de cargo, sin conocer al cliente: lo usa la página de retorno de 3DS. */
  obtenerSuelto: (cargoId: string): Promise<CargoOpenpay> => peticion('GET', `/charges/${cargoId}`),
}

export const suscripciones = {
  crear: (
    clienteId: string,
    datos: { plan_id: string; card_id: string; trial_end_date?: string },
  ): Promise<SuscripcionOpenpay> =>
    peticion('POST', `/customers/${clienteId}/subscriptions`, datos),

  listar: (clienteId: string): Promise<SuscripcionOpenpay[]> =>
    peticion('GET', `/customers/${clienteId}/subscriptions`),

  cancelar: (clienteId: string, suscripcionId: string): Promise<void> =>
    peticion('DELETE', `/customers/${clienteId}/subscriptions/${suscripcionId}`),
}
