import { Box, type BoxProps } from '@chakra-ui/react'
import Image from 'next/image'
import type { Screen } from './data'

export interface PhoneShotProps extends BoxProps {
  screen: Screen
  priority?: boolean
  sizes?: string
}

/** Captura de la app con sombra suave; el tamaño lo decide el contenedor. */
export function PhoneShot({ screen, priority = false, sizes, ...rest }: PhoneShotProps) {
  return (
    <Box
      pos="relative"
      w="100%"
      sx={{ filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.6))' }}
      {...rest}
    >
      <Image
        src={screen.src}
        alt={screen.alt}
        width={screen.width}
        height={screen.height}
        priority={priority}
        sizes={sizes ?? '(min-width: 62em) 22vw, 78vw'}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </Box>
  )
}
