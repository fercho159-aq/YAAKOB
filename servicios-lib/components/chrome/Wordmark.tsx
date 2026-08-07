import { keyframes, type IconProps, type SystemStyleObject } from '@chakra-ui/react'
import { PlaceholderWordmark } from '@servicios/components/svg'

/**
 * The original reveals its wordmark glyph by glyph — each letter flips in from
 * `rotateY(90deg)` over 0.5s on a 0.05s stagger. `PlaceholderWordmark` draws a
 * single `<text>` between two bracket rules rather than per-letter paths, so
 * the same motion is applied to those three shapes instead.
 */
const reveal = keyframes({
  from: { opacity: 0, transform: 'rotateY(90deg)' },
  to: { opacity: 1, transform: 'rotateY(0deg)' },
})

const revealStyles: SystemStyleObject = {
  '& > g > path, & > text': { animation: `${reveal} 0.5s both` },
  '& > g > path:nth-of-type(1)': { animationDelay: '0s' },
  '& > text': { animationDelay: '0.15s' },
  '& > g > path:nth-of-type(2)': { animationDelay: '0.3s' },
}

export interface AnimatedWordmarkProps extends IconProps {
  animate?: boolean
  label?: string
  title?: string
}

export function AnimatedWordmark({ animate = true, ...props }: AnimatedWordmarkProps) {
  return (
    <PlaceholderWordmark
      w="100%"
      h="100%"
      sx={{
        // Matches `.css-lnibci *` in the compiled stylesheet.
        '& *': { transformBox: 'fill-box', transformOrigin: 'left !important' },
        ...(animate ? revealStyles : {}),
      }}
      {...props}
    />
  )
}
