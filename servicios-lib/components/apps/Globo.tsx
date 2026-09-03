import { Box, type BoxProps } from '@chakra-ui/react'

const FRAME = '#2b3440'

export interface GloboProps extends BoxProps {
  title: string
  body: string
}

/**
 * Globo descriptivo en HTML: marco pizarra, cara blanca con brillo y cola
 * centrada abajo. Reproduce el arte del cliente pero con texto real.
 */
export function Globo({ title, body, ...rest }: GloboProps) {
  return (
    <Box pos="relative" w="100%" pb="1.1rem" {...rest}>
      <Box
        pos="relative"
        bg={FRAME}
        borderRadius="1.35rem"
        p="0.45rem"
        boxShadow="0 18px 40px -18px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.06)"
        _after={{
          content: '""',
          pos: 'absolute',
          left: '50%',
          bottom: '-0.7rem',
          w: '1.5rem',
          h: '1.5rem',
          bg: FRAME,
          transform: 'translateX(-50%) rotate(45deg)',
          borderRadius: '0.2rem',
          zIndex: 0,
        }}
      >
        <Box
          pos="relative"
          zIndex={1}
          borderRadius="1rem"
          bg="linear-gradient(160deg, #ffffff 0%, #f2f4f7 45%, #e6e9ee 100%)"
          boxShadow="inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(0,0,0,0.06)"
          px={{ base: '1.1rem', xl: '1.25rem' }}
          py={{ base: '1rem', xl: '1.15rem' }}
          textAlign="center"
          overflow="hidden"
          _before={{
            content: '""',
            pos: 'absolute',
            top: '-40%',
            left: '-10%',
            w: '70%',
            h: '90%',
            bg: 'radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)',
            pointerEvents: 'none',
          }}
          _after={{
            content: '""',
            pos: 'absolute',
            left: '50%',
            bottom: '-0.45rem',
            w: '0.95rem',
            h: '0.95rem',
            bg: '#eef0f3',
            transform: 'translateX(-50%) rotate(45deg)',
          }}
        >
          <Box
            as="h3"
            pos="relative"
            fontFamily="var(--font-din-ot)"
            fontWeight={700}
            fontSize={{ base: '1.05rem', xl: '1.1rem' }}
            lineHeight={1.2}
            color="#2f3742"
            textShadow="0 1px 0 rgba(255,255,255,0.9)"
          >
            {title}
          </Box>
          <Box
            as="p"
            pos="relative"
            mt="0.45rem"
            fontFamily="var(--font-din-ot)"
            fontWeight={600}
            fontSize={{ base: '0.8rem', xl: '0.8125rem' }}
            lineHeight={1.4}
            color="#4a525e"
          >
            {body}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
