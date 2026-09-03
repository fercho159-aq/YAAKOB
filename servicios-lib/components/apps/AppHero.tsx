import { Box, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { APP_LOGO, HERO } from './data'

/** Cabecera del póster: título en relieve, subtítulo y el logo de la app. */
export function AppHero() {
  return (
    <Box as="header" pos="relative" px={{ base: '1.125rem', xl: 0 }} pr={{ md: '9rem', xl: '12rem' }}>
      <Box
        as="h1"
        fontFamily="var(--font-din-ot)"
        textTransform="uppercase"
        color="#f2f2f2"
        lineHeight={0.95}
        textShadow="0 2px 0 #b9bec6, 0 4px 0 #6b7078, 0 14px 30px rgba(0,0,0,0.65)"
      >
        <Box as="span" display="block" fontWeight={800} fontSize={{ base: '3.1rem', md: '4.5rem', xl: '5.75rem' }} letterSpacing="-0.01em">
          {HERO.titleStrong}
        </Box>
        <Box as="span" display="block" fontWeight={600} fontSize={{ base: '2.1rem', md: '3.1rem', xl: '4rem' }} letterSpacing="0.01em" mt="0.1em">
          {HERO.titleRest}
        </Box>
      </Box>
      <Text
        mt={{ base: '1rem', xl: '1.25rem' }}
        fontFamily="var(--font-din-ot)"
        fontWeight={500}
        fontSize={{ base: '1.1rem', md: '1.35rem', xl: '1.6rem' }}
        lineHeight={1.25}
        color="rgba(255,255,255,0.92)"
        textShadow="0 2px 12px rgba(0,0,0,0.7)"
      >
        {HERO.subtitle}
      </Text>
      <Text
        mt={{ base: '1.25rem', xl: '1.75rem' }}
        maxW="34rem"
        fontFamily="var(--font-din-ot)"
        fontSize={{ base: '0.95rem', md: '1.05rem', xl: '1.15rem' }}
        lineHeight={1.5}
        color="rgba(255,255,255,0.86)"
        textShadow="0 2px 10px rgba(0,0,0,0.7)"
      >
        {HERO.body}
      </Text>

      <Box
        display={{ base: 'none', md: 'block' }}
        pos="absolute"
        top={{ md: '0.25rem', xl: '0' }}
        right={{ md: '0', xl: '1rem' }}
        w={{ md: '6.5rem', xl: '8.5rem' }}
        sx={{ filter: 'drop-shadow(0 0 24px rgba(0,180,255,0.35))' }}
        aria-hidden="true"
      >
        <Image
          src={APP_LOGO.src}
          alt=""
          width={APP_LOGO.width}
          height={APP_LOGO.height}
          priority
          sizes="8.5rem"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </Box>
    </Box>
  )
}
