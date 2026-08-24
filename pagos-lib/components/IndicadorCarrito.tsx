import { Box, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useCarrito } from '../carrito'
import { formatearPrecio } from '../planes'

/**
 * Acceso al carrito desde las pantallas de contratación: cuántas suscripciones
 * lleva y por cuánto va la orden. Mientras el carrito esté vacío no ocupa
 * espacio, para no ofrecer un carrito que no lleva nada.
 */
export function IndicadorCarrito() {
  const { listo, totales } = useCarrito()
  if (!listo || totales.unidades === 0) return null

  return (
    <Link
      as={NextLink}
      href="/carrito"
      display="inline-flex"
      alignItems="center"
      gap="0.625rem"
      px="0.875rem"
      h="2.25rem"
      border="1px solid rgba(255,255,255,0.16)"
      borderRadius="2px"
      bg="rgba(255,255,255,0.04)"
      _hover={{ borderColor: 'gold', textDecor: 'none' }}
      aria-label={`Ver carrito: ${totales.unidades} suscripciones`}
    >
      <Box
        as="span"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        minW="1.25rem"
        h="1.25rem"
        px="0.25rem"
        borderRadius="2px"
        bg="gold"
        color="#111316"
        fontSize="0.6875rem"
        fontWeight="bold"
      >
        {totales.unidades}
      </Box>
      <Text
        as="span"
        fontSize="0.6875rem"
        letterSpacing="0.16em"
        textTransform="uppercase"
        color="rgba(255,255,255,0.78)"
      >
        Carrito · {formatearPrecio(totales.total)}
      </Text>
    </Link>
  )
}
