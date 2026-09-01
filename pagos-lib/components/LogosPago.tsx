import { Box, Flex, Image, Text } from '@chakra-ui/react'

/**
 * Puntos 13 y 17 de la validación técnica: el logo de Openpay y las marcas de
 * tarjeta aceptadas tienen que estar visibles DENTRO del formulario de cobro.
 *
 * Los archivos son propiedad de Openpay y de las marcas, y viven en
 * `public/pagos/`. Mientras falte alguno se dibuja una etiqueta de texto en su
 * lugar: así se ve de inmediato en pantalla lo que todavía falta, en vez de
 * quedar un hueco silencioso el día de la cita.
 *
 * Van dentro de una pastilla blanca porque los originales son de fondo blanco y
 * sin canal alfa: sobre el fondo oscuro del formulario, el azul de Visa y el
 * azul marino de Openpay se pierden. La pastilla es además como las marcas
 * piden que se muestren sus logos —— sobre fondo claro y sin recolorear.
 */

type Marca = { archivo: string; nombre: string }

/** Ajusta la lista a las marcas que Openpay te haya habilitado. */
const MARCAS: Marca[] = [
  { archivo: '/pagos/visa.png', nombre: 'Visa' },
  { archivo: '/pagos/mastercard.png', nombre: 'Mastercard' },
  { archivo: '/pagos/amex.png', nombre: 'American Express' },
]

const OPENPAY = { archivo: '/pagos/openpay.png', nombre: 'Openpay' }

function Marca({ marca, alto }: { marca: Marca; alto: string }) {
  return (
    <Box
      bg="white"
      borderRadius="3px"
      px="0.4375rem"
      py="0.3125rem"
      display="flex"
      alignItems="center"
      lineHeight="0"
    >
      <Image
        src={marca.archivo}
        alt={marca.nombre}
        h={alto}
        w="auto"
        // El fallback deja constancia visible de que falta el asset.
        fallback={
          <Text fontSize="0.5625rem" letterSpacing="0.1em" color="rgba(0,0,0,0.6)">
            {marca.nombre.toUpperCase()}
          </Text>
        }
      />
    </Box>
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
      <Flex align="center" gap="0.5rem">
        {MARCAS.map((marca) => (
          <Marca key={marca.archivo} marca={marca} alto="1.125rem" />
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
