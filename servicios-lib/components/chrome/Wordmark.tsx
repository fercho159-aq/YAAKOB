import { Box, type BoxProps } from '@chakra-ui/react'
import Image from 'next/image'

export interface AnimatedWordmarkProps extends BoxProps {
  animate?: boolean
  title?: string
}

/**
 * The site mark, used in the header and in the mobile menu. The original
 * revealed a lettered wordmark glyph by glyph; the mark is a single image, so
 * it fades in over the same window instead.
 *
 * The file ships as black on white, so it is inverted for the dark chrome and
 * screened to drop the square it sits on.
 */
export function AnimatedWordmark({
  animate = true,
  title = 'YAAKOB',
  ...props
}: AnimatedWordmarkProps) {
  return (
    <Box
      pos="relative"
      h="4.25rem"
      w="auto"
      opacity={animate ? 1 : 0}
      transition="opacity 0.5s ease-out"
      {...props}
    >
      <Image
        src="/logo.png"
        alt={title}
        width={512}
        height={512}
        sizes="80px"
        style={{
          width: 'auto',
          height: '100%',
          filter: 'invert(1)',
          mixBlendMode: 'screen',
        }}
      />
    </Box>
  )
}
