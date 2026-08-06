import type { BoxProps } from '@chakra-ui/react'
import type { Variants } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { MotionAspectRatio, MotionNextLink } from './motion'
import { VARIANTS } from './shared'

/** The frame drops in from above… */
const linkVariants: Variants = {
  [VARIANTS.hidden]: { y: '-100%' },
  [VARIANTS.visible]: (delay: number) => ({
    y: '0%',
    transition: { ease: [0.25, 0, 0, 1], duration: 1, delay },
  }),
}

/** …while the image inside rises to meet it. */
const imageVariants: Variants = {
  [VARIANTS.hidden]: { y: '100%', scale: 0.9 },
  [VARIANTS.visible]: (delay: number) => ({
    y: '0%',
    scale: 1,
    transition: { ease: [0.25, 0, 0, 1], duration: 1, delay },
  }),
}

export type ItemThumbnailProps = Omit<BoxProps, 'onMouseEnter' | 'onMouseLeave'> & {
  src: string
  alt: string
  href: string
  ratio: number
  animate?: boolean
  delay?: number
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export function ItemThumbnail({
  src,
  alt,
  href,
  ratio,
  animate = true,
  delay = 0,
  onMouseEnter,
  onMouseLeave,
  ...rest
}: ItemThumbnailProps) {
  // Held back until the image is decoded, so it never slides in blank.
  const [loaded, setLoaded] = useState(false)
  const state = animate && loaded ? VARIANTS.visible : VARIANTS.hidden
  const isExternal = href.startsWith('http://') || href.startsWith('https://')

  return (
    <MotionNextLink
      href={href}
      rel="noreferrer"
      target={isExternal ? '_blank' : '_self'}
      display="block"
      overflow="hidden"
      style={{ transition: 'none' }}
      variants={linkVariants}
      custom={delay}
      initial={VARIANTS.hidden}
      animate={state}
      {...rest}
    >
      <MotionAspectRatio
        ratio={ratio}
        border="1px solid"
        borderColor="rgba(255,255,255,0.2)"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        variants={imageVariants}
        custom={delay}
        initial={VARIANTS.hidden}
        animate={state}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          onLoad={() => setLoaded(true)}
        />
      </MotionAspectRatio>
    </MotionNextLink>
  )
}
