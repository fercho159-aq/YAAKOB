import type { NextConfig } from 'next'

/**
 * Hosts de terceros que el sitio carga hoy. Cualquier añadido nuevo (un pixel,
 * un chat, un embed) tiene que pasar por aquí o la CSP lo reportará.
 */
const OPENPAY_HOSTS = [
  'https://openpay.s3.amazonaws.com',
  'https://api.openpay.mx',
  'https://sandbox-api.openpay.mx',
  'https://js.openpay.mx',
  'https://cdn.openpay.mx',
]

/**
 * El antifraude de Openpay (`openpay-data.v1.min.js`) no se queda en dominios de
 * Openpay: monta iframes de Kount y de OpenControl para calcular el
 * `device_session_id`. Se descubrieron corriendo el cobro con la CSP en modo
 * reporte, que los marcó como violación. Sin ellos no hay huella de dispositivo
 * y el cargo se queda sin el dato antifraude, así que tienen que ir en la lista
 * antes de poner `CSP_ENFORCE=1`.
 */
const ANTIFRAUDE_HOSTS = [
  'https://*.kaptcha.com',
  'https://opencontrol.mx',
  'https://*.opencontrol.mx',
]

const ANALYTICS_HOSTS = [
  'https://www.googletagmanager.com',
  'https://www.google-analytics.com',
  'https://stats.g.doubleclick.net',
]

const FONT_HOSTS = ['https://use.typekit.net', 'https://p.typekit.net', 'https://fonts.gstatic.com']

/**
 * `unsafe-inline` y `unsafe-eval` siguen presentes porque la portada inyecta
 * shaders y snippets de GTM en línea. Quitarlos exige mover esos bloques a
 * archivos con nonce; mientras tanto la CSP vale sobre todo por `frame-ancestors`
 * y por acotar a dónde puede hablar la página.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' 'unsafe-eval' ${[...OPENPAY_HOSTS, ...ANTIFRAUDE_HOSTS, ...ANALYTICS_HOSTS].join(' ')}`,
  `style-src 'self' 'unsafe-inline' ${FONT_HOSTS.join(' ')}`,
  `font-src 'self' data: ${FONT_HOSTS.join(' ')}`,
  `img-src 'self' data: blob: ${[...ANALYTICS_HOSTS, ...OPENPAY_HOSTS, ...ANTIFRAUDE_HOSTS].join(' ')}`,
  `connect-src 'self' ${[...OPENPAY_HOSTS, ...ANTIFRAUDE_HOSTS, ...ANALYTICS_HOSTS].join(' ')}`,
  // 3D Secure devuelve al usuario dentro de un marco del emisor en algunos bancos.
  `frame-src 'self' ${[...OPENPAY_HOSTS, ...ANTIFRAUDE_HOSTS].join(' ')}`,
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ')

/**
 * La CSP arranca en modo reporte para no tumbar la portada por un host que se
 * nos haya escapado. Revisen los reportes del navegador durante unos días y
 * pongan `CSP_ENFORCE=1` en Vercel para pasarla a bloqueo antes de la cita.
 */
const cspHeaderName = process.env.CSP_ENFORCE === '1'
  ? 'Content-Security-Policy'
  : 'Content-Security-Policy-Report-Only'

const securityHeaders = [
  // Fuerza HTTPS durante un año. Requisito 5 de la validación técnica.
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(self)' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: cspHeaderName, value: csp },
]

const nextConfig: NextConfig = {
  // Preserve trailing slashes so API routes like /api/auth/ don't 308-redirect
  skipTrailingSlashRedirect: true,
  // No anunciar la versión del framework.
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        // Nada de lo que hay bajo /api debe quedar cacheado por un intermediario.
        source: '/api/(.*)',
        headers: [
          ...securityHeaders,
          { key: 'Cache-Control', value: 'no-store, max-age=0' },
        ],
      },
    ]
  },
}

export default nextConfig

/*
 * NOTA SOBRE EL CORS QUE ESTABA AQUÍ
 *
 * Esta configuración aplicaba `Access-Control-Allow-Origin: *`,
 * `Access-Control-Allow-Methods` y `Access-Control-Allow-Headers: *` a
 * `source: "/(.*)"`, es decir, a todas las rutas del sitio incluidas las de
 * `/api`. El comentario decía «allow loading scripts from external domains»,
 * pero esa cabecera no sirve para eso: `Access-Control-Allow-Origin` es una
 * cabecera de *respuesta* que autoriza a cualquier origen a leer las respuestas
 * de este dominio desde el navegador. En un sitio que va a procesar cobros es
 * un agujero: cualquier página de cualquier dominio podía llamar a los
 * endpoints y leer el resultado.
 *
 * Se eliminó por completo. Si en algún momento hace falta CORS, decláralo por
 * ruta y con una lista blanca de orígenes, nunca con comodín.
 */
