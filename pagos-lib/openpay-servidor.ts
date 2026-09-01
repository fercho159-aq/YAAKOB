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
  /**
   * OJO: Openpay acepta el parámetro `email` pero NO filtra por él —— devuelve
   * la lista completa de clientes del comercio. Confiar en el primer renglón
   * cuelga cada alta nueva del cliente equivocado: su tarjeta, su cargo y su
   * suscripción terminan en el expediente de otra persona. El correo se
   * compara aquí, contra lo que de verdad trae cada registro.
   */
  buscarPorCorreo: async (correo: string): Promise<ClienteOpenpay | undefined> => {
    const buscado = correo.trim().toLowerCase()
    const POR_PAGINA = 100
    // Tope de seguridad: 20 páginas ≈ 2,000 clientes. Si el correo estuviera más
    // allá, se crea un cliente duplicado —— molesto en el panel, pero inocuo.
    // Colgarse del cliente equivocado no lo es, y ése es el fallo que se evita.
    for (let pagina = 0; pagina < 20; pagina += 1) {
      const lista = await peticion<ClienteOpenpay[]>(
        'GET',
        `/customers?limit=${POR_PAGINA}&offset=${pagina * POR_PAGINA}`,
      )
      if (!Array.isArray(lista) || lista.length === 0) return undefined
      const encontrado = lista.find((cliente) => cliente.email?.trim().toLowerCase() === buscado)
      if (encontrado) return encontrado
      if (lista.length < POR_PAGINA) return undefined
    }
    return undefined
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
      // Opcionales: el cobro del primer periodo va sin 3DS porque lo que se
      // contrata es una suscripción y las renovaciones tampoco lo llevan.
      // `redirect_url` sólo tiene sentido si se vuelve a pedir 3DS.
      use_3d_secure?: boolean
      redirect_url?: string
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
