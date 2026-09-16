/**
 * Catálogo de suscripciones.
 *
 * Tres niveles —— Esencial, Avanzado y Único —— cada uno con cargo mensual o
 * anual, seis planes en total. Los importes públicos van ANTES de IVA, como los
 * presentó el cliente; aquí se guarda el desglose completo (base, IVA y total)
 * porque el total es lo que Openpay cobra y lo que el punto 4 de la validación
 * exige mostrar antes de contratar.
 *
 * Cada plan tiene que existir en el panel de Openpay (Planes → Nuevo plan) con
 * el importe TOTAL con IVA; su identificador `p...` se copia al `.env` en la
 * variable que se indica en cada renglón. Sin ese identificador el plan se
 * muestra pero `/api/pagos/suscripcion` lo rechaza con 503.
 *
 * `/planes` renderiza desde este archivo, así que lo que se escriba aquí es lo
 * que ve el validador y lo que se cobra.
 */

export type Periodicidad = 'mensual' | 'anual'

export type Nivel = 'esencial' | 'avanzado' | 'unico'

export type Funcion = {
  nombre: string
  /** `false` aparece en la tarjeta tachado en gris, como en la presentación. */
  incluida: boolean
}

export type Plan = {
  id: string
  nivel: Nivel
  nombre: string
  /** A quién va dirigido: «Para estudiantes», «Para profesionales»… */
  audiencia: string
  resumen: string
  usuarios: number
  /** Importe antes de IVA, en pesos. Es el que se anuncia. */
  precioBase: number
  /** IVA sobre `precioBase`. Se muestra desglosado. */
  iva: number
  /** Importe TOTAL a cobrar, con IVA incluido. Es el que cobra Openpay. */
  precio: number
  moneda: 'MXN'
  periodicidad: Periodicidad
  /** Texto que ve el usuario junto al importe: «cada mes», «cada año». */
  cadencia: string
  funciones: Funcion[]
  /** Sólo las funciones incluidas, para las pantallas de carrito y resumen. */
  incluye: string[]
  /** Tarjeta resaltada con la etiqueta «Popular». */
  destacado: boolean
  /** Leyenda de ahorro del plan anual, p. ej. «Ahorra 21%». */
  ahorro?: string
  /** Identificador del plan en el panel de Openpay. */
  openpayPlanId: string
}

export const IVA = 0.16

/** Desglosa un importe anunciado antes de IVA. */
function desdeBase(precioBase: number) {
  const iva = Math.round(precioBase * IVA * 100) / 100
  return { precioBase, iva, precio: Math.round((precioBase + iva) * 100) / 100 }
}

/** Las quince funciones de la app, en el orden en que se listan en cada tarjeta. */
const FUNCIONES = [
  'Chat privado E2EE',
  'Encriptación de archivos',
  'Análisis documental',
  'Marcos legales',
  'Diario Oficial de la Federación',
  'Calculador RFC',
  'Calculadora fiscal',
  'Validación biométrica INE',
  'Consulta IMSS',
  'Consulta SAT',
  'Revisión de personas físicas',
  'Revisión de personas morales',
  'Agenda de citas',
  'Asesoría fiscal preferencial',
  'Asesor de inteligencia fiscal con IA 24/7',
] as const

/** Marca como incluidas las primeras `hasta` funciones de la lista. */
function funcionesHasta(hasta: number): Funcion[] {
  return FUNCIONES.map((nombre, i) => ({ nombre, incluida: i < hasta }))
}

type NivelBase = {
  nivel: Nivel
  nombre: string
  audiencia: string
  resumen: string
  usuarios: number
  funciones: Funcion[]
  destacado: boolean
}

/** Lo que comparten el plan mensual y el anual de cada nivel. */
export const NIVELES: NivelBase[] = [
  {
    nivel: 'esencial',
    nombre: 'Esencial',
    audiencia: 'Para estudiantes',
    resumen: 'Chat cifrado, análisis documental, marcos legales y DOF para entender su situación fiscal.',
    usuarios: 1,
    funciones: funcionesHasta(6),
    destacado: false,
  },
  {
    nivel: 'avanzado',
    nombre: 'Avanzado',
    audiencia: 'Para profesionales',
    resumen: 'Todo lo Esencial más calculadora fiscal, validación biométrica INE y consulta IMSS.',
    usuarios: 2,
    funciones: funcionesHasta(9),
    destacado: false,
  },
  {
    nivel: 'unico',
    nombre: 'Único',
    audiencia: 'Para consultores',
    resumen:
      'Cobertura completa: consulta SAT, revisión de personas físicas y morales, agenda, asesoría preferencial y asesor con IA 24/7.',
    usuarios: 3,
    funciones: funcionesHasta(15),
    destacado: true,
  },
]

type Cargo = {
  periodicidad: Periodicidad
  precioBase: number
  ahorro?: string
  openpayPlanId: string
}

/**
 * Importes por nivel y periodicidad, antes de IVA, tal como los entregó el
 * cliente. El anual de Único ($23,430) se conserva como vino; el cliente lo
 * confirmó aunque quede debajo del anual de Avanzado.
 *
 * Las variables de entorno van escritas completas —— nada de armar el nombre
 * con plantillas —— porque Next sólo expone al navegador las `NEXT_PUBLIC_*`
 * que encuentra literalmente en el código.
 */
const CARGOS: Record<Nivel, Cargo[]> = {
  esencial: [
    {
      periodicidad: 'mensual',
      precioBase: 999,
      openpayPlanId: process.env.NEXT_PUBLIC_OPENPAY_PLAN_ESENCIAL_MENSUAL ?? '',
    },
    {
      periodicidad: 'anual',
      precioBase: 11_988,
      openpayPlanId: process.env.NEXT_PUBLIC_OPENPAY_PLAN_ESENCIAL_ANUAL ?? '',
    },
  ],
  avanzado: [
    {
      periodicidad: 'mensual',
      precioBase: 1_999,
      openpayPlanId: process.env.NEXT_PUBLIC_OPENPAY_PLAN_AVANZADO_MENSUAL ?? '',
    },
    {
      periodicidad: 'anual',
      precioBase: 23_988,
      openpayPlanId: process.env.NEXT_PUBLIC_OPENPAY_PLAN_AVANZADO_ANUAL ?? '',
    },
  ],
  unico: [
    {
      periodicidad: 'mensual',
      precioBase: 2_999,
      openpayPlanId: process.env.NEXT_PUBLIC_OPENPAY_PLAN_UNICO_MENSUAL ?? '',
    },
    {
      periodicidad: 'anual',
      precioBase: 23_430,
      ahorro: 'Ahorra 21%',
      openpayPlanId: process.env.NEXT_PUBLIC_OPENPAY_PLAN_UNICO_ANUAL ?? '',
    },
  ],
}

export const PLANES: Plan[] = NIVELES.flatMap((base) =>
  CARGOS[base.nivel].map((cargo) => ({
    id: `${base.nivel}-${cargo.periodicidad}`,
    nivel: base.nivel,
    nombre: cargo.periodicidad === 'anual' ? `${base.nombre} · anual` : base.nombre,
    audiencia: base.audiencia,
    resumen: base.resumen,
    usuarios: base.usuarios,
    ...desdeBase(cargo.precioBase),
    moneda: 'MXN' as const,
    periodicidad: cargo.periodicidad,
    cadencia: cargo.periodicidad === 'anual' ? 'cada año' : 'cada mes',
    funciones: base.funciones,
    incluye: [
      `${base.usuarios} ${base.usuarios === 1 ? 'usuario' : 'usuarios'}`,
      ...base.funciones.filter((f) => f.incluida).map((f) => f.nombre),
    ],
    destacado: base.destacado,
    ahorro: cargo.ahorro,
    openpayPlanId: cargo.openpayPlanId,
  })),
)

export function buscarPlan(id: string | undefined): Plan | undefined {
  if (!id) return undefined
  return PLANES.find((plan) => plan.id === id)
}

/** El plan de un nivel en la periodicidad pedida. Siempre existe. */
export function planDe(nivel: Nivel, periodicidad: Periodicidad): Plan {
  const plan = PLANES.find((p) => p.nivel === nivel && p.periodicidad === periodicidad)
  if (!plan) throw new Error(`No hay plan ${nivel} ${periodicidad} en el catálogo.`)
  return plan
}

/** Formato de importe para pantalla: «$1,158.84 MXN». */
export function formatearPrecio(monto: number, moneda: 'MXN' = 'MXN'): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: moneda,
    minimumFractionDigits: 2,
  }).format(monto)
}

/** Importe entero para la tarjeta del plan: «$999», «$11,988». */
export function formatearEntero(monto: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
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
