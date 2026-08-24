import { randomUUID } from 'crypto'

/**
 * Referencias de operación e idempotencia (punto 12 de la validación).
 *
 * El bloqueo del botón «Contratar» en el navegador evita el doble clic, pero no
 * evita el doble cargo: basta con que el usuario recargue, que la red reintente
 * o que alguien reenvíe la petición a mano. La garantía real la da el
 * `order_id`, que Openpay obliga a ser único por comercio — si llega un segundo
 * cargo con el mismo `order_id`, Openpay lo rechaza y no hay cobro duplicado.
 *
 * Por eso el `order_id` lo fija el NAVEGADOR una sola vez, al montar el
 * formulario, y viaja en cada intento. Reintentar el mismo formulario reutiliza
 * la referencia; abrir el checkout de nuevo genera otra.
 */

const PREFIJO = 'yk'

/** `yk-2f6c1a9b8e4d` — corto, único y legible en el panel de Openpay. */
export function nuevaReferencia(): string {
  return `${PREFIJO}-${randomUUID().replace(/-/g, '').slice(0, 16)}`
}

/** Versión para el navegador, donde `crypto.randomUUID` ya está disponible. */
export function nuevaReferenciaCliente(): string {
  const uuid =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random()}`
  return `${PREFIJO}-${uuid.replace(/[^a-z0-9]/gi, '').slice(0, 16)}`
}

export function esReferenciaValida(referencia: unknown): referencia is string {
  return typeof referencia === 'string' && /^yk-[a-z0-9]{8,32}$/i.test(referencia)
}

/**
 * El contenido del carrito viaja dentro de la descripción del cargo para que la
 * página de retorno de 3D Secure pueda reconstruir la operación consultando a
 * Openpay, sin depender de una base de datos ni de la sesión del navegador ——
 * que es justo lo que se pierde cuando el banco redirige al usuario de vuelta.
 *
 * Formato: `Yaakob Consultores · plan:vigilancia-mensual x2 · plan:...`
 */
export function descripcionDeCargo(lineas: { planId: string; cantidad: number }[]): string {
  const conceptos = lineas.map((linea) => `plan:${linea.planId} x${linea.cantidad}`).join(' · ')
  return `Yaakob Consultores · ${conceptos}`.slice(0, 250)
}

/**
 * Devuelve los renglones del carrito codificados en la descripción. Un cargo
 * viejo sin cantidad (`plan:algo`) se lee como una unidad.
 */
export function planesDesdeDescripcion(descripcion?: string): { planId: string; cantidad: number }[] {
  if (!descripcion) return []
  const lineas: { planId: string; cantidad: number }[] = []
  for (const encontrado of descripcion.matchAll(/plan:([a-z0-9-]+)(?:\s*x(\d+))?/gi)) {
    const planId = encontrado[1]
    const cantidad = Number(encontrado[2] ?? 1)
    if (!Number.isFinite(cantidad) || cantidad < 1) continue
    lineas.push({ planId, cantidad })
  }
  return lineas
}
