import { Box, Flex, Image, Text } from '@chakra-ui/react'

/**
 * Puntos 13 y 17 de la validación técnica: el logo de Openpay y las marcas de
 * tarjeta aceptadas tienen que estar visibles DENTRO del formulario de cobro.
 *
 * Los archivos son propiedad de Openpay y de las marcas; hay que descargarlos
 * de https://openpay.mx/recursos/ y https://documents.openpay.mx/recursos y
 * dejarlos en `public/pagos/` con estos nombres. Mientras falte alguno se
 * dibuja una etiqueta de texto en su lugar: así se ve de inmediato en pantalla
 * lo que todavía falta, en vez de quedar un hueco silencioso el día de la cita.
 */

type Marca = { archivo: string; nombre: string }

/** Ajusta la lista a las marcas que Openpay te haya habilitado. */
const MARCAS: Marca[] = [
  { archivo: '/pagos/visa.svg', nombre: 'Visa' },
  { archivo: '/pagos/mastercard.svg', nombre: 'Mastercard' },
  { archivo: '/pagos/amex.svg', nombre: 'American Express' },
]

const OPENPAY = { archivo: '/pagos/openpay.svg', nombre: 'Openpay' }

function Marca({ marca, alto }: { marca: Marca; alto: string }) {
  return (
    <Image
      src={marca.archivo}
      alt={marca.nombre}
      h={alto}
      w="auto"
      // El fallback deja constancia visible de que falta el asset.
      fallback={
        <Box
          px="0.5rem"
          py="0.125rem"
          border="1px dashed"
          borderColor="rgba(255,255,255,0.3)"
          borderRadius="2px"
        >
          <Text fontSize="0.5625rem" letterSpacing="0.1em" color="rgba(255,255,255,0.55)">
            {marca.nombre.toUpperCase()}
          </Text>
        </Box>
      }
    />
  )
}

export function LogosPago() {
  return (
    <Flex
      align="center"
      justify="space-between"
      wrap="wrap"
      gap="0.75rem"
      mt="1.5rem"
      pt="1rem"
      borderTop="1px solid rgba(255,255,255,0.14)"
    >
      <Flex align="center" gap="0.625rem">
        {MARCAS.map((marca) => (
          <Marca key={marca.archivo} marca={marca} alto="1.25rem" />
        ))}
      </Flex>

      <Flex align="center" gap="0.5rem">
        <Text fontSize="0.625rem" letterSpacing="0.14em" color="rgba(255,255,255,0.55)">
          PROCESADO POR
        </Text>
        <Marca marca={OPENPAY} alto="1rem" />
      </Flex>
    </Flex>
  )
}

export default LogosPago
