import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { FEATURES } from './data'
import { Globo } from './Globo'
import { PhoneShot } from './PhoneShot'

const CARD_W = 'min(78vw, 22rem)'

/**
 * Las doce funciones de la app, cada una con su globo y su captura.
 * Escritorio: rejilla de 4 columnas con las pares desplazadas, como el póster.
 * Móvil: pista horizontal con snap y una pista "Desliza" que se retira sola.
 */
export function FeatureGrid() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [hintVisible, setHintVisible] = useState(true)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const onScroll = () => {
      if (el.scrollLeft > 24) setHintVisible(false)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Box as="section" aria-labelledby="apps-funciones" mt={{ base: '2.5rem', xl: '4rem' }}>
      <Text
        id="apps-funciones"
        as="h2"
        fontSize="0.625rem"
        fontWeight="semibold"
        letterSpacing="0.22em"
        textTransform="uppercase"
        color="gold"
        px={{ base: '1.125rem', xl: 0 }}
      >
        [ Funciones ]
      </Text>

      {/* Móvil / tablet: pista horizontal */}
      <Box display={{ base: 'block', xl: 'none' }} mt="1.25rem">
        <Flex
          ref={trackRef}
          gap="1.25rem"
          px="1.125rem"
          pb="1rem"
          overflowX="auto"
          overflowY="hidden"
          sx={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {FEATURES.map((f, i) => (
            <Flex
              key={f.id}
              as="article"
              direction="column"
              align="center"
              flex={`0 0 ${CARD_W}`}
              w={CARD_W}
              sx={{ scrollSnapAlign: 'center' }}
            >
              <Globo title={f.title} body={f.body} />
              <PhoneShot screen={f.screen} priority={i < 2} px="1rem" />
            </Flex>
          ))}
          <Box flex="0 0 0.125rem" aria-hidden="true" />
        </Flex>
        <Text
          textAlign="right"
          px="1.125rem"
          mt="0.25rem"
          fontSize="0.625rem"
          letterSpacing="0.2em"
          textTransform="uppercase"
          color="whiteAlpha.700"
          opacity={hintVisible ? 1 : 0}
          transition="opacity 0.4s ease"
          aria-hidden="true"
        >
          Desliza →
        </Text>
      </Box>

      {/* Escritorio: rejilla escalonada */}
      <Grid
        display={{ base: 'none', xl: 'grid' }}
        templateColumns="repeat(4, minmax(0, 1fr))"
        columnGap="2.5rem"
        rowGap="4.5rem"
        mt="2.5rem"
        pb="6rem"
      >
        {FEATURES.map((f, i) => (
          <GridItem
            key={f.id}
            as="article"
            display="flex"
            flexDirection="column"
            alignItems="center"
            transform={i % 2 === 1 ? 'translateY(6rem)' : undefined}
          >
            <Globo title={f.title} body={f.body} />
            <PhoneShot screen={f.screen} priority={i < 4} px="1.5rem" />
          </GridItem>
        ))}
      </Grid>
    </Box>
  )
}
