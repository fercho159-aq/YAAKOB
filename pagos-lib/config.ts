/**
 * Configuración de Openpay.
 *
 * Las llaves viven en variables de entorno; nunca en el repositorio. Copia
 * `.env.example` a `.env.local` para desarrollo y carga las mismas variables en
 * Vercel para producción.
 *
 * Reglas que impone la validación técnica:
 *   · la llave PRIVADA jamás sale del servidor (por eso no lleva prefijo
 *     `NEXT_PUBLIC_`); si aparece en un bundle del navegador, el comercio queda
 *     comprometido;
 *   · durante la cita el ambiente tiene que estar en sandbox (punto 2).
 */

/** `true` mientras `OPENPAY_SANDBOX` no valga explícitamente `"false"`. */
export const esSandbox = process.env.NEXT_PUBLIC_OPENPAY_SANDBOX !== 'false'

/** Identificador del comercio. Es público: viaja al navegador para tokenizar. */
export const merchantId = process.env.NEXT_PUBLIC_OPENPAY_MERCHANT_ID ?? ''

/** Llave pública. También viaja al navegador; sólo sirve para crear tokens. */
export const llavePublica = process.env.NEXT_PUBLIC_OPENPAY_PUBLIC_KEY ?? ''

/** Base de la API REST según el ambiente. */
export const apiBase = esSandbox
  ? 'https://sandbox-api.openpay.mx/v1'
  : 'https://api.openpay.mx/v1'

/** URL pública del sitio, para armar el `redirect_url` de 3D Secure. */
// Mismo cuidado que en `merchantIdServidor`: la variable puede venir declarada
// y vacía, y un `redirect_url` sin origen deja el retorno de 3D Secure roto.
export const sitioUrl = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
).replace(/\/$/, '')

/**
 * Sólo en el servidor. Lanza si falta, para que el fallo aparezca en el log del
 * despliegue y no como un 500 silencioso en medio de un cobro.
 */
export function llavePrivada(): string {
  const clave = process.env.OPENPAY_PRIVATE_KEY
  if (!clave) {
    throw new Error(
      'Falta OPENPAY_PRIVATE_KEY. Cárgala en las variables de entorno del proyecto; ' +
        'no la pongas con prefijo NEXT_PUBLIC_ ni la escribas en el código.',
    )
  }
  return clave
}

export function merchantIdServidor(): string {
  // `||` y no `??`: la variable opcional viene declarada pero VACÍA en
  // `.env.example`, y una cadena vacía sí está definida —— con `??` ganaba el
  // vacío y el fallback público nunca entraba.
  const id = process.env.OPENPAY_MERCHANT_ID?.trim() || merchantId
  if (!id) {
    throw new Error('Falta OPENPAY_MERCHANT_ID (o NEXT_PUBLIC_OPENPAY_MERCHANT_ID).')
  }
  return id
}

/** Máximo de tarjetas guardadas por cliente — punto 11 de la validación. */
export const MAX_TARJETAS_POR_CLIENTE = 3

/**
 * Importe en pesos a partir del cual el cobro pide 3D Secure.
 *
 * Abajo del umbral el cargo pasa directo, que es lo que corresponde a una
 * suscripción: las renovaciones que cobra Openpay tampoco autentican. De
 * $6,001 en adelante sí se manda al cliente con su banco, porque ahí el
 * contracargo pesa lo suficiente como para querer trasladar la
 * responsabilidad al emisor.
 */
export const UMBRAL_3DS = 6001

/** `true` si el importe del cargo obliga a pasar por 3D Secure. */
export function requiere3ds(importe: number): boolean {
  return importe >= UMBRAL_3DS
}

/** Scripts de Openpay que carga el navegador para tokenizar y para el antifraude. */
export const SCRIPTS_OPENPAY = {
  core: 'https://openpay.s3.amazonaws.com/openpay.v1.min.js',
  antifraude: 'https://openpay.s3.amazonaws.com/openpay-data.v1.min.js',
} as const
