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
 * El plan viaja dentro de la descripción del cargo para que la página de
 * retorno de 3D Secure pueda reconstruir la operación consultando a Openpay,
 * sin depender de una base de datos ni de la sesión del navegador —— que es
 * justo lo que se pierde cuando el banco redirige al usuario de vuelta.
 */
export function descripcionDeCargo(nombrePlan: string, planId: string): string {
  return `Yaakob Consultores · ${nombrePlan} · plan:${planId}`
}

export function planDesdeDescripcion(descripcion?: string): string | undefined {
  if (!descripcion) return undefined
  const encontrado = /plan:([a-z0-9-]+)/i.exec(descripcion)
  return encontrado?.[1]
}
