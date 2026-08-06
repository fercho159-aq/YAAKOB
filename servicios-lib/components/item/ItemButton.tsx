import { chakra, type BoxProps } from '@chakra-ui/react'
import type { Variants } from 'framer-motion'
import { useState, type ComponentProps } from 'react'
import { MotionAnchor, MotionButton, MotionNextLink } from './motion'
import { ScrambleText, VARIANTS } from './shared'

/** Wipes open vertically, then stretches out to full width. */
const buttonVariants: Variants = {
  [VARIANTS.hidden]: { scaleY: 0, scaleX: 0.1 },
  [VARIANTS.visible]: (delay: number) => ({
    scaleY: 1,
    scaleX: 1,
    transition: {
      scaleY: { duration: 0.2, delay },
      scaleX: { duration: 0.5, ease: [0.25, 0, 0, 1], delay: delay + 0.2 },
    },
  }),
}

const baseStyle: BoxProps = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: { base: '3.125rem', xl: '4.375rem' },
  p: 0,
  border: '1px solid',
  borderColor: 'goldAlt',
  fontSize: { base: '0.75rem', xl: 'sm' },
  fontWeight: 'semibold',
  textTransform: 'uppercase',
  letterSpacing: 'widest',
  // Not the `transition` style prop: framer-motion claims that name.
  sx: { transition: 'background 0.15s linear, color 0.15s linear' },
  _hover: { color: 'goldAlt', bg: 'rgba(0,0,0,0.3)' },
}

type ItemButtonBaseProps = {
  className?: string
  label: string
  href?: string
  isExternal?: boolean
  onClick?: () => void
  delay?: number
  ariaLabel?: string
}

function ItemButtonBase({
  className,
  label,
  href,
  isExternal = false,
  onClick,
  delay = 0,
  ariaLabel,
}: ItemButtonBaseProps) {
  const [labelVisible, setLabelVisible] = useState(false)

  const shared = {
    className,
    'aria-label': ariaLabel,
    variants: buttonVariants,
    custom: delay,
    onUpdate: ({ scaleX }: { scaleX?: string | number }) => {
      setLabelVisible(Number(scaleX) > 0.8)
    },
  }
  const text = <ScrambleText text={label} animate={labelVisible} />

  if (href && !isExternal) {
    return (
      <MotionNextLink href={href} {...baseStyle} {...shared}>
        {text}
      </MotionNextLink>
    )
  }

  if (href) {
    return (
      <MotionAnchor href={href} target="_blank" rel="noreferrer" {...baseStyle} {...shared}>
        {text}
      </MotionAnchor>
    )
  }

  return (
    <MotionButton onClick={onClick} {...baseStyle} {...shared}>
      {text}
    </MotionButton>
  )
}

/**
 * The gold-bordered CTA. Its label only starts typing itself in once the button
 * has stretched most of the way out.
 *
 * Wrapped in `chakra()` so a caller's style props land in a second class that
 * emotion appends after these: an override for one breakpoint then layers over
 * the responsive values here instead of replacing them, which is how the
 * original composes its two style objects.
 */
export const ItemButton = chakra(ItemButtonBase)

export type ItemButtonProps = ComponentProps<typeof ItemButton>
