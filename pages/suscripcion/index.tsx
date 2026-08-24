import { Box, Link, Text } from '@chakra-ui/react'
import Head from 'next/head'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { MotionArticle } from '@servicios/components/home/motion'
import { ScrambleText } from '@servicios/components/ui/ScrambleText'
import Layout from '@servicios/components/layout/Layout'
import content from '@servicios/data/content.json'
import { FormularioPago } from '@pagos/components/FormularioPago'
import { MAX_UNIDADES, totalesDelCarrito, useCarrito, type LineaResuelta } from '@pagos/carrito'
import { buscarPlan, formatearPrecio, finDelPrimerPeriodo } from '@pagos/planes'

/**
 * Pantalla de contratación. Muestra el resumen de la orden —— renglones,
 * importe, IVA, periodicidad y fecha aproximada del siguiente cobro de cada
 * suscripción —— antes del formulario, como exige la sección 7 de los términos y
 * el criterio de información previa de la validación.
 *
 * Entra por dos caminos: con `?plan=` se contrata un solo plan sin pasar por el
 * carrito, y sin parámetro se cobra lo que el carrito lleve.
 */

const COLUMN_WIDTH = { base: `${(315 / 375) * 100}%`, xl: '34rem' }
const HAIRLINE = '1px solid rgba(255,255,255,0.14)'

const etiqueta = {
  fontSize: '0.625rem',
  fontWeight: 'semibold',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'goldAlt',
} as const

const cuerpo = {
  fontSize: { base: '0.8125rem', xl: '0.875rem' },
  lineHeight: { base: '1.375rem', xl: '1.5rem' },
  letterSpacing: '0.02em',
  color: 'rgba(255,255,255,0.78)',
} as const

const enlace = {
  fontSize: '0.6875rem',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'gold',
  _hover: { color: 'white', textDecor: 'none' },
} as const

function Renglon({ etiqueta: texto, valor }: { etiqueta: string; valor: string }) {
  return (
    <Box display="flex" justifyContent="space-between" gap="1rem" mt="0.5rem">
      <Text {...cuerpo} color="rgba(255,255,255,0.6)">
        {texto}
      </Text>
      <Text {...cuerpo} color="white" textAlign="right">
        {valor}
      </Text>
    </Box>
  )
}

function fechaLarga(fecha: Date) {
  return fecha.toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' })
}

function ResumenOrden({ lineas }: { lineas: LineaResuelta[] }) {
  const totales = totalesDelCarrito(lineas)

  return (
    <Box as="section" mt="2rem" p="1.25rem" border={HAIRLINE} borderRadius="2px">
      <Text {...etiqueta}>Resumen de la orden</Text>

      {lineas.map((linea) => (
        <Box
          key={linea.plan.id}
          mt="1rem"
          pt="1rem"
          borderTop="1px solid rgba(255,255,255,0.08)"
          _first={{ borderTop: 'none', pt: 0 }}
        >
          <Box display="flex" justifyContent="space-between" gap="1rem">
            <Text {...cuerpo} color="white">
              {linea.plan.nombre}
              {linea.cantidad > 1 ? ` × ${linea.cantidad}` : ''}
            </Text>
            <Text {...cuerpo} color="white" textAlign="right">
              {formatearPrecio(linea.importe, linea.plan.moneda)}
            </Text>
          </Box>
          <Renglon
            etiqueta="IVA incluido"
            valor={formatearPrecio(linea.iva, linea.plan.moneda)}
          />
          <Renglon etiqueta="Periodicidad" valor={`Renovación ${linea.plan.cadencia}`} />
          <Renglon etiqueta="Siguiente cargo" valor={fechaLarga(finDelPrimerPeriodo(linea.plan))} />
        </Box>
      ))}

      <Box mt="1rem" pt="1rem" borderTop={HAIRLINE}>
        <Renglon etiqueta="Subtotal" valor={formatearPrecio(totales.subtotal)} />
        <Renglon etiqueta="IVA (16 %)" valor={formatearPrecio(totales.iva)} />
        <Renglon etiqueta="Envío" valor="No aplica · servicio digital" />
        <Renglon etiqueta="Cancelación" valor="En cualquier momento, sin penalización" />
        <Box display="flex" justifyContent="space-between" gap="1rem" mt="0.875rem">
          <Text fontSize="0.9375rem" color="white">
            Total a pagar hoy
          </Text>
          <Text fontSize="1.125rem" color="white" textAlign="right">
            {formatearPrecio(totales.total)} MXN
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

export default function Suscripcion() {
  const router = useRouter()
  const { listo, resueltas } = useCarrito()
  const { site } = content

  const planDirecto = buscarPlan(typeof router.query.plan === 'string' ? router.query.plan : undefined)
  const soloEstePlan: LineaResuelta[] = planDirecto
    ? [{ plan: planDirecto, cantidad: 1, importe: planDirecto.precio, iva: planDirecto.iva }]
    : []
  const lineas = planDirecto ? soloEstePlan : resueltas
  const unidades = lineas.reduce((suma, linea) => suma + linea.cantidad, 0)
  const excedido = unidades > MAX_UNIDADES

  // Con `?plan=` el resumen no depende del navegador; sin él hay que esperar a
  // que el carrito se lea de `localStorage` antes de decir que está vacío.
  const esperando = !planDirecto && !listo

  let cuerpoPagina
  if (esperando) {
    cuerpoPagina = (
      <Text {...cuerpo} mt="2rem">
        Cargando el resumen de su orden…
      </Text>
    )
  } else if (!lineas.length) {
    cuerpoPagina = (
      <Box mt="2rem">
        <Text {...cuerpo}>
          No hay nada que contratar: su carrito está vacío y no se indicó un plan. Revise los planes
          disponibles y vuelva a intentarlo.
        </Text>
        <Link as={NextLink} href="/planes" {...enlace} display="inline-block" mt="1.25rem">
          Ver planes →
        </Link>
      </Box>
    )
  } else if (excedido) {
    cuerpoPagina = (
      <Box mt="2rem">
        <Text {...cuerpo}>
          El máximo por operación es de {MAX_UNIDADES} suscripciones y su carrito lleva {unidades}.
          Ajústelo o escríbanos a contacto@yaakob.com para un alta a la medida.
        </Text>
        <Link as={NextLink} href="/carrito" {...enlace} display="inline-block" mt="1.25rem">
          Volver al carrito →
        </Link>
      </Box>
    )
  } else {
    cuerpoPagina = (
      <>
        <ResumenOrden lineas={lineas} />

        <Box mt="0.875rem" display="flex" flexWrap="wrap" gap="1.25rem">
          {planDirecto ? (
            <>
              <Text fontSize="0.6875rem" letterSpacing="0.12em" color="rgba(255,255,255,0.45)">
                Está contratando un solo plan, sin pasar por el carrito.
              </Text>
              <Link as={NextLink} href="/carrito" {...enlace}>
                Ver mi carrito →
              </Link>
            </>
          ) : (
            <Link as={NextLink} href="/carrito" {...enlace}>
              Modificar el carrito →
            </Link>
          )}
        </Box>

        <Box mt="2rem">
          <FormularioPago lineas={lineas} />
        </Box>
      </>
    )
  }

  return (
    <Layout backgroundVariant="play">
      <Head>
        <title key="page-title">{`${site.title} | Contratar suscripción`}</title>
        {/* Una pantalla de cobro no tiene por qué estar indexada. */}
        <meta key="robots" name="robots" content="noindex, nofollow" />
        <link key="icon" rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <MotionArticle
        w={COLUMN_WIDTH}
        mx="auto"
        mt={{ base: '4.5rem', md: '5.625rem' }}
        pb={{ base: '3rem', xl: '4rem' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Box as="header" pb="1.5rem" borderBottom={HAIRLINE}>
          <Text {...etiqueta}>Contratación segura</Text>
          <Box
            as="h1"
            mt="0.625rem"
            fontSize={{ base: '1.5rem', xl: '2rem' }}
            fontWeight="normal"
            lineHeight={{ base: '1.875rem', xl: '2.375rem' }}
          >
            <ScrambleText text="Contratar suscripción" duration={1} display="inline" />
          </Box>
        </Box>

        {cuerpoPagina}

        <Box mt="2.5rem" pt="1.5rem" borderTop={HAIRLINE} display="flex" flexWrap="wrap" gap="1.25rem">
          {[
            { href: '/cancelaciones', label: 'Cancelaciones y reembolsos' },
            { href: '/terminos', label: 'Términos' },
            { href: '/privacidad', label: 'Privacidad' },
            { href: '/contacto', label: 'Contacto' },
          ].map((item) => (
            <Link key={item.href} as={NextLink} href={item.href} {...enlace}>
              {item.label}
            </Link>
          ))}
        </Box>
      </MotionArticle>
    </Layout>
  )
}
