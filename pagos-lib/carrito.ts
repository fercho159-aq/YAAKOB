import { useSyncExternalStore } from 'react'
import { MAX_POR_LINEA, PLANES, buscarPlan, type Plan } from './planes'

export { MAX_POR_LINEA, MAX_UNIDADES } from './planes'

/**
 * Carrito de contratación.
 *
 * Cada renglón es un plan y el número de suscripciones de ese plan —— una por
 * cada RFC que se va a vigilar. El carrito vive en `localStorage` del navegador
 * y nada de esto llega al servidor hasta que la persona confirma el pago: lo que
 * se cobra se recalcula en `/api/pagos/suscripcion` con los precios del
 * catálogo, nunca con los importes que mande el navegador.
 */

const CLAVE = 'yaakob.carrito.v1'
const EVENTO = 'yaakob:carrito'

export type LineaCarrito = { planId: string; cantidad: number }

export type LineaResuelta = {
  plan: Plan
  cantidad: number
  /** Importe del renglón con IVA incluido. */
  importe: number
  /** Parte del renglón que corresponde al IVA. */
  iva: number
}

export type TotalesCarrito = {
  /** Suma con IVA incluido. */
  total: number
  /** IVA contenido en el total. */
  iva: number
  /** Total menos IVA. */
  subtotal: number
  /** Número de renglones. */
  conceptos: number
  /** Número de suscripciones. */
  unidades: number
}

/* ------------------------------------------------------------------ estado */

/**
 * Copia en memoria de lo que hay en `localStorage`. `useSyncExternalStore`
 * exige que dos lecturas seguidas devuelvan la MISMA referencia mientras nada
 * cambie, así que el arreglo se cachea aquí y sólo se rearma al escribir o al
 * llegar un cambio desde otra pestaña.
 */
let cache: LineaCarrito[] | null = null
const VACIO: LineaCarrito[] = []

function saneada(valor: unknown): LineaCarrito[] {
  if (!Array.isArray(valor)) return VACIO
  const lineas: LineaCarrito[] = []
  for (const item of valor) {
    const planId = (item as LineaCarrito)?.planId
    const cantidad = Number((item as LineaCarrito)?.cantidad)
    // Un plan que ya no existe en el catálogo se descarta en silencio: el
    // carrito puede llevar meses guardado en el navegador.
    if (!buscarPlan(planId)) continue
    if (!Number.isFinite(cantidad) || cantidad < 1) continue
    if (lineas.some((linea) => linea.planId === planId)) continue
    lineas.push({ planId, cantidad: Math.min(Math.floor(cantidad), MAX_POR_LINEA) })
  }
  return lineas
}

export function leerCarrito(): LineaCarrito[] {
  if (cache) return cache
  if (typeof window === 'undefined') return VACIO
  try {
    cache = saneada(JSON.parse(window.localStorage.getItem(CLAVE) ?? '[]'))
  } catch {
    cache = VACIO
  }
  return cache
}

function escribir(lineas: LineaCarrito[]) {
  cache = lineas
  if (typeof window === 'undefined') return
  try {
    if (lineas.length) window.localStorage.setItem(CLAVE, JSON.stringify(lineas))
    else window.localStorage.removeItem(CLAVE)
  } catch {
    // Navegador con almacenamiento bloqueado: el carrito vive sólo en memoria.
  }
  window.dispatchEvent(new Event(EVENTO))
}

/* ------------------------------------------------------------ operaciones */

export function agregarAlCarrito(planId: string, cantidad = 1) {
  if (!buscarPlan(planId)) return
  const lineas = leerCarrito()
  const existente = lineas.find((linea) => linea.planId === planId)
  const siguiente = existente
    ? lineas.map((linea) =>
        linea.planId === planId
          ? { ...linea, cantidad: Math.min(linea.cantidad + cantidad, MAX_POR_LINEA) }
          : linea,
      )
    : [...lineas, { planId, cantidad: Math.min(Math.max(cantidad, 1), MAX_POR_LINEA) }]
  escribir(siguiente)
}

export function fijarCantidad(planId: string, cantidad: number) {
  if (cantidad < 1) return quitarDelCarrito(planId)
  escribir(
    leerCarrito().map((linea) =>
      linea.planId === planId
        ? { ...linea, cantidad: Math.min(Math.floor(cantidad), MAX_POR_LINEA) }
        : linea,
    ),
  )
}

export function quitarDelCarrito(planId: string) {
  escribir(leerCarrito().filter((linea) => linea.planId !== planId))
}

export function vaciarCarrito() {
  escribir(VACIO)
}

/* ---------------------------------------------------------------- cálculo */

/** Cruza los renglones guardados contra el catálogo vigente. */
export function resolverCarrito(lineas: LineaCarrito[]): LineaResuelta[] {
  const resueltas: LineaResuelta[] = []
  // Se recorre el catálogo, no el carrito, para que el orden en pantalla sea
  // siempre el mismo que en `/planes`.
  for (const plan of PLANES) {
    const linea = lineas.find((candidata) => candidata.planId === plan.id)
    if (!linea) continue
    resueltas.push({
      plan,
      cantidad: linea.cantidad,
      importe: plan.precio * linea.cantidad,
      iva: Math.round(plan.iva * linea.cantidad * 100) / 100,
    })
  }
  return resueltas
}

export function totalesDelCarrito(resueltas: LineaResuelta[]): TotalesCarrito {
  const total = resueltas.reduce((suma, linea) => suma + linea.importe, 0)
  const iva = Math.round(resueltas.reduce((suma, linea) => suma + linea.iva, 0) * 100) / 100
  return {
    total,
    iva,
    subtotal: Math.round((total - iva) * 100) / 100,
    conceptos: resueltas.length,
    unidades: resueltas.reduce((suma, linea) => suma + linea.cantidad, 0),
  }
}

/* -------------------------------------------------------------------- hook */

function suscribir(avisar: () => void) {
  const desdeOtraPestana = () => {
    cache = null
    avisar()
  }
  window.addEventListener(EVENTO, avisar)
  window.addEventListener('storage', desdeOtraPestana)
  return () => {
    window.removeEventListener(EVENTO, avisar)
    window.removeEventListener('storage', desdeOtraPestana)
  }
}

/**
 * Estado del carrito para la interfaz.
 *
 * `listo` distingue el primer render del servidor —— donde no hay
 * `localStorage` y el carrito siempre sale vacío —— del carrito realmente
 * vacío, para no parpadear «su carrito está vacío» sobre un carrito con cosas.
 */
export function useCarrito() {
  const lineas = useSyncExternalStore(
    suscribir,
    leerCarrito,
    () => VACIO,
  )
  const resueltas = resolverCarrito(lineas)
  const totales = totalesDelCarrito(resueltas)
  const listo = useSyncExternalStore(
    suscribir,
    () => true,
    () => false,
  )

  // Las operaciones son funciones de módulo: ya son estables entre renders, no
  // hace falta memorizarlas.
  return {
    listo,
    lineas,
    resueltas,
    totales,
    agregar: agregarAlCarrito,
    fijarCantidad,
    quitar: quitarDelCarrito,
    vaciar: vaciarCarrito,
  }
}
