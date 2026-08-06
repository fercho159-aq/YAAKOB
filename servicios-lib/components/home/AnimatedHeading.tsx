import { Heading, type HeadingProps } from '@chakra-ui/react'
import type { Variants } from 'framer-motion'
import { useState, type ComponentType, type ElementType } from 'react'
import { VARIANTS } from './constants'
import { MotionSpan } from './motion'
import { ScrambleText } from '@servicios/components/ui/ScrambleText'

/**
 * Chakra v2's `Heading` resolves its `as`-prop overload via a conditional
 * type that, combined with React 19's `ElementType`, blows past TypeScript's
 * instantiation-depth limit (TS2590) when `as` is given a union of tag names.
 * Widening the component reference to a plain `ComponentType` sidesteps the
 * overload resolution; the `as` prop is still read and honoured at runtime by
 * Chakra exactly as before.
 */
const AsHeading = Heading as unknown as ComponentType<Omit<HeadingProps, 'as'> & { as?: ElementType }>

/** The tinted bar wipes in from the left; the text starts once it is half open. */
const barVariants: Variants = {
  [VARIANTS.hidden]: { scaleX: 0 },
  [VARIANTS.visible]: (delay: number) => ({
    scaleX: 1,
    transition: { duration: 0.8, ease: [0.25, 0, 0, 1], delay },
  }),
}

export type AnimatedHeadingProps = Omit<HeadingProps, 'children'> & {
  children: string
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  delay?: number
}

export function AnimatedHeading({
  children,
  type = 'h2',
  delay = 0,
  ...rest
}: AnimatedHeadingProps) {
  const [textVisible, setTextVisible] = useState(false)

  return (
    <AsHeading
      as={type}
      pos="relative"
      h="2.1875rem"
      pl={{ base: '0.625rem', xl: '0.75rem' }}
      fontSize="0.75rem"
      fontWeight="semibold"
      lineHeight="2.1875rem"
      textTransform="uppercase"
      letterSpacing="widest"
      {...rest}
    >
      <MotionSpan
        pos="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        bg="rgba(255,255,255,0.08)"
        transformOrigin="left"
        variants={barVariants}
        custom={delay}
        onUpdate={({ scaleX }) => setTextVisible(Number(scaleX) > 0.5)}
      />
      <ScrambleText text={children} animate={textVisible} />
    </AsHeading>
  )
}
