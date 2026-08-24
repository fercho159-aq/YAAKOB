/**
 * Catálogo de suscripciones.
 *
 * PENDIENTE DE LLENAR: los importes y los `openpayPlanId` son marcadores. Cada
 * plan tiene que existir primero en el panel de Openpay (Planes → Nuevo plan);
 * ahí se define el monto, la periodicidad y la política de reintentos, y de ahí
 * se copia el identificador `p...` al `.env`.
 *
 * El punto 4 de la validación exige que estos precios estén publicados en el
 * sitio antes de contratar: `/planes` los renderiza desde este archivo, así que
 * lo que se escriba aquí es lo que ve el validador y lo que se cobra.
 */

export type Periodicidad = 'mensual' | 'anual'

export type Plan = {
  id: string
  nombre: string
  resumen: string
  /** Importe TOTAL a cobrar, con IVA incluido, en pesos. */
  precio: number
  /** Cuánto de `precio` corresponde al IVA. Se muestra desglosado. */
  iva: number
  moneda: 'MXN'
  periodicidad: Periodicidad
  /** Texto que ve el usuario junto al importe: «cada mes», «cada año». */
  cadencia: string
  incluye: string[]
  /** Identificador del plan en el panel de Openpay. */
  openpayPlanId: string
}

const IVA = 0.16

/** Desglosa un precio con IVA incluido. */
function conIva(total: number) {
  return { precio: total, iva: Math.round((total - total / (1 + IVA)) * 100) / 100 }
}

export const PLANES: Plan[] = [
  {
    id: 'vigilancia-mensual',
    nombre: 'Vigilancia fiscal',
    resumen:
      'Monitoreo continuo del buzón tributario y aviso oportuno de requerimientos, cartas invitación y avisos del SAT.',
    ...conIva(1_160),
    moneda: 'MXN',
    periodicidad: 'mensual',
    cadencia: 'cada mes',
    incluye: [
      'Revisión mensual del buzón tributario',
      'Alerta de requerimientos y cartas invitación',
      'Resumen mensual de obligaciones y vencimientos',
      'Cancelación en cualquier momento',
    ],
    openpayPlanId: process.env.NEXT_PUBLIC_OPENPAY_PLAN_VIGILANCIA_MENSUAL ?? '',
  },
  {
    id: 'vigilancia-anual',
    nombre: 'Vigilancia fiscal · anual',
    resumen: 'La misma cobertura con cargo anual: dos meses de ahorro frente al plan mensual.',
    ...conIva(11_600),
    moneda: 'MXN',
    periodicidad: 'anual',
    cadencia: 'cada año',
    incluye: [
      'Todo lo del plan mensual',
      'Equivalente a diez mensualidades',
      'Diagnóstico fiscal inicial sin costo',
      'Cancelación en cualquier momento',
    ],
    openpayPlanId: process.env.NEXT_PUBLIC_OPENPAY_PLAN_VIGILANCIA_ANUAL ?? '',
  },
]

export function buscarPlan(id: string | undefined): Plan | undefined {
  if (!id) return undefined
  return PLANES.find((plan) => plan.id === id)
}

/** Formato de importe para pantalla: «$1,160.00 MXN». */
export function formatearPrecio(monto: number, moneda: 'MXN' = 'MXN'): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: moneda,
    minimumFractionDigits: 2,
  }).format(monto)
}

/** Fecha en que arranca el cobro recurrente: al final del periodo ya pagado. */
export function finDelPrimerPeriodo(plan: Plan, desde = new Date()): Date {
  const fin = new Date(desde)
  if (plan.periodicidad === 'anual') fin.setFullYear(fin.getFullYear() + 1)
  else fin.setMonth(fin.getMonth() + 1)
  return fin
}

/** `YYYY-MM-DD`, que es como Openpay espera `trial_end_date`. */
export function comoFechaOpenpay(fecha: Date): string {
  return fecha.toISOString().slice(0, 10)
}

/**
 * Topes del carrito. Viven aquí, junto al catálogo, porque los aplica tanto la
 * interfaz como `/api/pagos/suscripcion`, y el servidor no debe tener que
 * importar el módulo del carrito —— que es código de navegador.
 */

/** Máximo de suscripciones del mismo plan en una orden. */
export const MAX_POR_LINEA = 10

/** Máximo de suscripciones por operación. Arriba de esto se atiende a mano. */
export const MAX_UNIDADES = 20
