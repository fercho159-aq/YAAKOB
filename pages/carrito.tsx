import { Box, Button, Link, Text } from '@chakra-ui/react'
import Head from 'next/head'
import NextLink from 'next/link'
import { MotionArticle } from '@servicios/components/home/motion'
import { ScrambleText } from '@servicios/components/ui/ScrambleText'
import Layout from '@servicios/components/layout/Layout'
import content from '@servicios/data/content.json'
import { MAX_POR_LINEA, MAX_UNIDADES, useCarrito, type LineaResuelta } from '@pagos/carrito'
import { formatearPrecio } from '@pagos/planes'

/**
 * Carrito de contratación.
 *
 * Aquí se ve y se modifica lo que se va a cobrar antes de entrar al pago:
 * agregar, cambiar el número de suscripciones de cada plan, quitar un renglón o
 * vaciarlo todo. Los importes se muestran con IVA desglosado y con la
 * periodicidad de cada renglón, porque una suscripción mensual y una anual no
 * se suman a un solo cargo recurrente: se cobran juntas la primera vez y luego
 * cada una renueva en su propia fecha.
 */

const COLUMN_WIDTH = { base: `${(315 / 375) * 100}%`, xl: '46rem' }
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

const botonPaso = {
  w: '2rem',
  h: '2rem',
  minW: '2rem',
  borderRadius: '2px',
  bg: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.16)',
  color: 'white',
  fontSize: '1rem',
  fontWeight: 'normal',
  _hover: { bg: 'rgba(255,255,255,0.12)' },
  _disabled: { opacity: 0.35, cursor: 'not-allowed' },
} as const

function Renglon({
  linea,
  onCantidad,
  onQuitar,
}: {
  linea: LineaResuelta
  onCantidad: (cantidad: number) => void
  onQuitar: () => void
}) {
  const { plan, cantidad } = linea

  return (
    <Box
      as="article"
      data-carrito-linea={plan.id}
      py="1.25rem"
      borderBottom={HAIRLINE}
      display="flex"
      flexWrap="wrap"
      gap="1rem"
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <Box flex="1 1 16rem" minW="0">
        <Text {...etiqueta}>{plan.periodicidad === 'anual' ? 'Cargo anual' : 'Cargo mensual'}</Text>
        <Text mt="0.375rem" fontSize="1rem" color="white">
          {plan.nombre}
        </Text>
        <Text {...cuerpo} mt="0.25rem" fontSize="0.75rem" color="rgba(255,255,255,0.6)">
          {formatearPrecio(plan.precio, plan.moneda)} {plan.moneda} · IVA incluido (
          {formatearPrecio(plan.iva, plan.moneda)}) · renueva {plan.cadencia}
        </Text>
        <Text {...cuerpo} mt="0.5rem" fontSize="0.75rem">
          Una suscripción por cada RFC bajo vigilancia.
        </Text>
      </Box>

      <Box display="flex" alignItems="center" gap="0.5rem">
        <Button
          {...botonPaso}
          aria-label={`Quitar una suscripción de ${plan.nombre}`}
          onClick={() => onCantidad(cantidad - 1)}
        >
          −
        </Button>
        <Text
          minW="2rem"
          textAlign="center"
          fontSize="0.9375rem"
          color="white"
          aria-live="polite"
          aria-label={`${cantidad} suscripciones de ${plan.nombre}`}
        >
          {cantidad}
        </Text>
        <Button
          {...botonPaso}
          aria-label={`Agregar una suscripción de ${plan.nombre}`}
          isDisabled={cantidad >= MAX_POR_LINEA}
          onClick={() => onCantidad(cantidad + 1)}
        >
          +
        </Button>
      </Box>

      <Box textAlign="right" minW="9rem">
        <Text fontSize="1.125rem" color="white">
          {formatearPrecio(linea.importe, plan.moneda)}
        </Text>
        <Text {...cuerpo} fontSize="0.6875rem" color="rgba(255,255,255,0.6)">
          IVA {formatearPrecio(linea.iva, plan.moneda)} · {plan.cadencia}
        </Text>
        <Link as="button" type="button" {...enlace} mt="0.5rem" display="inline-block" onClick={onQuitar}>
          Quitar
        </Link>
      </Box>
    </Box>
  )
}

export default function Carrito() {
  const { listo, resueltas, totales, fijarCantidad, quitar, vaciar } = useCarrito()
  const { site } = content
  const title = `${site.title} | Carrito`
  const vacio = listo && resueltas.length === 0
  const excedido = totales.unidades > MAX_UNIDADES

  return (
    <Layout backgroundVariant="play">
      <Head>
        <title key="page-title">{title}</title>
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
          <Text {...etiqueta}>Su carrito</Text>
          <Box
            as="h1"
            mt="0.625rem"
            fontSize={{ base: '1.5rem', xl: '2rem' }}
            fontWeight="normal"
            lineHeight={{ base: '1.875rem', xl: '2.375rem' }}
          >
            <ScrambleText text="Carrito de contratación" duration={1} display="inline" />
          </Box>
          <Text {...cuerpo} mt="1rem">
            Revise y modifique lo que va a contratar antes de pagar. Los importes están en pesos
            mexicanos con IVA incluido; cada renglón renueva en su propia periodicidad hasta que
            usted lo cancele. Son servicios digitales: no hay envíos ni costos de envío.
          </Text>
        </Box>

        {!listo ? (
          <Text {...cuerpo} mt="2rem">
            Cargando su carrito…
          </Text>
        ) : null}

        {vacio ? (
          <Box mt="2rem">
            <Text {...cuerpo}>
              Su carrito está vacío. Agregue un plan desde la página de precios para continuar.
            </Text>
            <Link as={NextLink} href="/planes" {...enlace} display="inline-block" mt="1.25rem">
              Ver planes y precios →
            </Link>
          </Box>
        ) : null}

        {resueltas.length ? (
          <>
            <Box as="section" mt="1rem" borderTop={HAIRLINE}>
              {resueltas.map((linea) => (
                <Renglon
                  key={linea.plan.id}
                  linea={linea}
                  onCantidad={(cantidad) => fijarCantidad(linea.plan.id, cantidad)}
                  onQuitar={() => quitar(linea.plan.id)}
                />
              ))}
            </Box>

            <Box as="section" mt="1.5rem" p="1.25rem" border={HAIRLINE} borderRadius="2px">
              <Text {...etiqueta}>Total de la orden</Text>
              {[
                ['Conceptos', `${totales.conceptos}`],
                ['Suscripciones', `${totales.unidades}`],
                ['Subtotal', formatearPrecio(totales.subtotal)],
                ['IVA (16 %)', formatearPrecio(totales.iva)],
                ['Envío', 'No aplica · servicio digital'],
              ].map(([texto, valor]) => (
                <Box key={texto} display="flex" justifyContent="space-between" gap="1rem" mt="0.5rem">
                  <Text {...cuerpo} color="rgba(255,255,255,0.6)">
                    {texto}
                  </Text>
                  <Text {...cuerpo} color="white" textAlign="right">
                    {valor}
                  </Text>
                </Box>
              ))}
              <Box
                display="flex"
                justifyContent="space-between"
                gap="1rem"
                mt="1rem"
                pt="1rem"
                borderTop={HAIRLINE}
              >
                <Text fontSize="0.9375rem" color="white">
                  Total a pagar hoy
                </Text>
                <Text fontSize="1.25rem" color="white" textAlign="right">
                  {formatearPrecio(totales.total)} MXN
                </Text>
              </Box>
            </Box>

            {excedido ? (
              <Text {...cuerpo} mt="1rem" color="#ffb4ae">
                El máximo por operación es de {MAX_UNIDADES} suscripciones. Para un volumen mayor
                escríbanos a contacto@yaakob.com y lo damos de alta a la medida.
              </Text>
            ) : null}

            <Box mt="1.75rem" display="flex" flexWrap="wrap" gap="1rem" alignItems="center">
              <Button
                as={NextLink}
                href="/suscripcion"
                h="2.75rem"
                px="2rem"
                borderRadius="2px"
                bg="gold"
                color="#111316"
                fontSize="0.6875rem"
                fontWeight="bold"
                letterSpacing="0.18em"
                textTransform="uppercase"
                isDisabled={excedido}
                pointerEvents={excedido ? 'none' : undefined}
                _hover={{ bg: 'goldAlt', textDecor: 'none' }}
              >
                Continuar al pago
              </Button>
              <Link as={NextLink} href="/planes" {...enlace}>
                Seguir viendo planes →
              </Link>
              <Link as="button" type="button" {...enlace} color="rgba(255,255,255,0.6)" onClick={vaciar}>
                Vaciar carrito
              </Link>
            </Box>
          </>
        ) : null}

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
