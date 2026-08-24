import { Box, Button, Link, SimpleGrid, Text } from '@chakra-ui/react'
import Head from 'next/head'
import NextLink from 'next/link'
import { ScrambleText } from '@servicios/components/ui/ScrambleText'
import { MotionArticle } from '@servicios/components/home/motion'
import Layout from '@servicios/components/layout/Layout'
import content from '@servicios/data/content.json'
import { PLANES, formatearPrecio, type Plan } from '@pagos/planes'
import { MAX_POR_LINEA, useCarrito } from '@pagos/carrito'
import { IndicadorCarrito } from '@pagos/components/IndicadorCarrito'

/**
 * Punto 4 de la validación técnica: los precios tienen que ser públicos y
 * consultables ANTES de contratar. No hay costos de envío —— son contenidos
 * digitales —— pero sí importe, IVA desglosado, periodicidad y condiciones de
 * renovación, que es lo que el validador busca en esta pantalla.
 */

const COLUMN_WIDTH = { base: `${(315 / 375) * 100}%`, xl: '52rem' }
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

const enlaceAccion = {
  fontSize: '0.6875rem',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'gold',
  _hover: { color: 'white', textDecor: 'none' },
} as const

function TarjetaPlan({ plan }: { plan: Plan }) {
  const { listo, lineas, agregar } = useCarrito()
  const enCarrito = listo ? (lineas.find((linea) => linea.planId === plan.id)?.cantidad ?? 0) : 0
  const lleno = enCarrito >= MAX_POR_LINEA

  return (
    <Box
      as="article"
      p="1.75rem"
      border={HAIRLINE}
      borderRadius="2px"
      display="flex"
      flexDirection="column"
      bg="rgba(255,255,255,0.02)"
    >
      <Text {...etiqueta}>{plan.periodicidad === 'anual' ? 'Cargo anual' : 'Cargo mensual'}</Text>

      <Text mt="0.625rem" fontSize="1.25rem" lineHeight="1.75rem">
        {plan.nombre}
      </Text>

      <Box mt="1rem" pb="1rem" borderBottom={HAIRLINE}>
        <Text fontSize="2rem" lineHeight="2.25rem" color="white">
          {formatearPrecio(plan.precio, plan.moneda)}
        </Text>
        <Text mt="0.25rem" fontSize="0.75rem" color="rgba(255,255,255,0.6)">
          {plan.moneda} · IVA incluido ({formatearPrecio(plan.iva, plan.moneda)}) · {plan.cadencia}
        </Text>
      </Box>

      <Text {...cuerpo} mt="1rem">
        {plan.resumen}
      </Text>

      <Box as="ul" mt="1rem" listStyleType="none" p={0} m={0} flex="1 1 auto">
        {plan.incluye.map((punto) => (
          <Box
            as="li"
            key={punto}
            pos="relative"
            pl="1.125rem"
            mt="0.5rem"
            {...cuerpo}
            _before={{
              content: '""',
              pos: 'absolute',
              left: 0,
              top: '0.5625rem',
              w: '0.3125rem',
              h: '0.3125rem',
              bg: 'goldAlt',
            }}
          >
            {punto}
          </Box>
        ))}
      </Box>

      <Button
        mt="1.75rem"
        h="2.75rem"
        borderRadius="2px"
        bg="gold"
        color="#111316"
        fontSize="0.6875rem"
        fontWeight="bold"
        letterSpacing="0.18em"
        textTransform="uppercase"
        isDisabled={lleno}
        onClick={() => agregar(plan.id)}
        _hover={{ bg: 'goldAlt' }}
      >
        {enCarrito ? 'Agregar otra suscripción' : 'Agregar al carrito'}
      </Button>

      <Box mt="0.875rem" display="flex" flexWrap="wrap" justifyContent="space-between" gap="0.75rem">
        {enCarrito ? (
          <Link as={NextLink} href="/carrito" {...enlaceAccion}>
            En el carrito ({enCarrito}) · Ver carrito →
          </Link>
        ) : (
          <Text fontSize="0.6875rem" letterSpacing="0.12em" color="rgba(255,255,255,0.45)">
            Una suscripción por RFC
          </Text>
        )}
        <Link as={NextLink} href={`/suscripcion?plan=${plan.id}`} {...enlaceAccion}>
          Contratar sólo este →
        </Link>
      </Box>
    </Box>
  )
}

export default function Planes() {
  const { site } = content
  const title = `${site.title} | Planes y precios`
  const description =
    'Precios, IVA, periodicidad y condiciones de renovación de las suscripciones de vigilancia fiscal de Yaakob Consultores, S.C.'

  return (
    <Layout backgroundVariant="play">
      <Head>
        <title key="page-title">{title}</title>
        <meta key="description" name="description" content={description} />
        <link key="icon" rel="icon" type="image/png" href="/favicon.png" />
        <link key="canonical" rel="canonical" href={`${site.url}/planes`} />
        <meta key="og-title" property="og:title" content={title} />
        <meta key="og-description" property="og:description" content={description} />
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
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" gap="1rem">
            <Text {...etiqueta}>Suscripciones</Text>
            <IndicadorCarrito />
          </Box>
          <Box
            as="h1"
            mt="0.625rem"
            fontSize={{ base: '1.5rem', xl: '2rem' }}
            fontWeight="normal"
            lineHeight={{ base: '1.875rem', xl: '2.375rem' }}
          >
            <ScrambleText text="Planes y precios" duration={1} display="inline" />
          </Box>
          <Text {...cuerpo} mt="1rem">
            Todos los importes están en pesos mexicanos e incluyen IVA. La suscripción se renueva
            automáticamente en la periodicidad indicada hasta que usted la cancele; el importe y la
            fecha del siguiente cargo se le confirman antes de autorizar el pago. Son contenidos y
            servicios digitales: no hay envíos ni costos de envío.
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing="1.25rem" mt="2rem">
          {PLANES.map((plan) => (
            <TarjetaPlan key={plan.id} plan={plan} />
          ))}
        </SimpleGrid>

        <Box mt="2.5rem" pt="1.5rem" borderTop={HAIRLINE}>
          <Text {...cuerpo}>
            Se hace uso de Openpay como pasarela de pagos. El cobro se realiza con tarjeta de crédito
            o débito, con autenticación 3D Secure de su banco. Antes de contratar, consulte las
            condiciones de cancelación y reembolso.
          </Text>
          <Box mt="1.25rem" display="flex" flexWrap="wrap" gap="1.25rem">
            {[
              { href: '/cancelaciones', label: 'Cancelaciones y reembolsos' },
              { href: '/terminos', label: 'Términos y condiciones' },
              { href: '/privacidad', label: 'Aviso de privacidad' },
            ].map((enlace) => (
              <Link
                key={enlace.href}
                as={NextLink}
                href={enlace.href}
                fontSize="0.75rem"
                letterSpacing="0.16em"
                textTransform="uppercase"
                color="gold"
                _hover={{ color: 'white', textDecor: 'none' }}
              >
                {enlace.label} →
              </Link>
            ))}
          </Box>
        </Box>
      </MotionArticle>
    </Layout>
  )
}
