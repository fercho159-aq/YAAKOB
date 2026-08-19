import { Box, Link, Text } from '@chakra-ui/react'
import Head from 'next/head'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { MotionArticle } from '@servicios/components/home/motion'
import { ScrambleText } from '@servicios/components/ui/ScrambleText'
import Layout from '@servicios/components/layout/Layout'
import content from '@servicios/data/content.json'
import { FormularioPago } from '@pagos/components/FormularioPago'
import { buscarPlan, formatearPrecio, finDelPrimerPeriodo } from '@pagos/planes'

/**
 * Pantalla de contratación. Muestra el resumen del cargo —— importe, IVA,
 * periodicidad y fecha aproximada del siguiente cobro —— antes del formulario,
 * como exige la sección 7 de los términos y el criterio de información previa
 * de la validación.
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

export default function Suscripcion() {
  const router = useRouter()
  const plan = buscarPlan(typeof router.query.plan === 'string' ? router.query.plan : undefined)
  const { site } = content

  const cuerpoPagina = plan ? (
    <>
      <Box as="section" mt="2rem" p="1.25rem" border={HAIRLINE} borderRadius="2px">
        <Text {...etiqueta}>Resumen del cargo</Text>
        <Renglon etiqueta="Plan" valor={plan.nombre} />
        <Renglon etiqueta="Importe (IVA incluido)" valor={formatearPrecio(plan.precio, plan.moneda)} />
        <Renglon etiqueta="IVA incluido" valor={formatearPrecio(plan.iva, plan.moneda)} />
        <Renglon etiqueta="Periodicidad" valor={`Renovación ${plan.cadencia}`} />
        <Renglon
          etiqueta="Siguiente cargo"
          valor={finDelPrimerPeriodo(plan).toLocaleDateString('es-MX', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}
        />
        <Renglon etiqueta="Cancelación" valor="En cualquier momento, sin penalización" />
      </Box>

      <Box mt="2rem">
        <FormularioPago plan={plan} />
      </Box>
    </>
  ) : (
    <Box mt="2rem">
      <Text {...cuerpo}>
        No encontramos el plan que intenta contratar. Revise los planes disponibles y vuelva a
        intentarlo.
      </Text>
      <Link
        as={NextLink}
        href="/planes"
        display="inline-block"
        mt="1.25rem"
        fontSize="0.75rem"
        letterSpacing="0.16em"
        textTransform="uppercase"
        color="gold"
        _hover={{ color: 'white', textDecor: 'none' }}
      >
        Ver planes →
      </Link>
    </Box>
  )

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
          ].map((enlace) => (
            <Link
              key={enlace.href}
              as={NextLink}
              href={enlace.href}
              fontSize="0.6875rem"
              letterSpacing="0.16em"
              textTransform="uppercase"
              color="gold"
              _hover={{ color: 'white', textDecor: 'none' }}
            >
              {enlace.label}
            </Link>
          ))}
        </Box>
      </MotionArticle>
    </Layout>
  )
}
