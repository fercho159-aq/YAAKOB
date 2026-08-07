import { Box, List, ListItem } from '@chakra-ui/react'
import type { Variants } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { StackedWordmark } from '@servicios/components/svg'
import { AnimatedHeading } from './AnimatedHeading'
import { SLIDE_HEIGHT_XL, SLIDE_WIDTH_XL, VARIANTS, slideWidthPct } from './constants'
import { useIsDesktop } from './hooks'
import { MotionAspectRatio, MotionBox, MotionParagraph, MotionSpan } from './motion'
import { SlideCorners } from './SlideCorners'
import type { CarouselItem } from './types'

/**
 * The wordmark slot overhangs the thumbnail. It is one width for every item —
 * the mark is set at a fixed size and left-aligned, so rows end where the label
 * ends instead of being fitted to a per-item box. Authored against a 390px-wide
 * slide, sized for the longest label in the set.
 */
const WORDMARK_SLOT_XL = 565

/** The slide itself: dims to 0.6 when it is not the active one. */
const slideVariants: Variants = {
  [VARIANTS.hidden]: { x: 0, opacity: 0.6, transition: { duration: 1, ease: [0.2, 0, 0, 1] } },
  [VARIANTS.visible]: (isDesktop: boolean) => ({
    x: isDesktop ? -20 : 0,
    opacity: 1,
    transition: { duration: 1, ease: [0.2, 0, 0, 1] },
  }),
}

/**
 * Two empty layers the original hung decorative art on, one behind the
 * thumbnail and one in front. The art is not part of this rebuild, but the
 * slots stay: they are load-bearing for the stacking order around the
 * thumbnail, and are where a neutral flourish would go.
 */
const overlayVariants: Variants = {
  [VARIANTS.hidden]: { opacity: 0 },
  [VARIANTS.visible]: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'linear', delay: 1, staggerChildren: 1, delayChildren: 0 },
  },
}

/** Thumbnail: the frame drops in from above while the image slides up inside it. */
const thumbnailFrameVariants: Variants = {
  [VARIANTS.hidden]: { y: '-100%' },
  [VARIANTS.visible]: { y: '0%', transition: { ease: [0.25, 0, 0, 1], duration: 1 } },
}

const thumbnailImageVariants: Variants = {
  [VARIANTS.hidden]: { y: '100%' },
  [VARIANTS.visible]: { y: '0%', transition: { ease: [0.25, 0, 0, 1], duration: 1 } },
}

/** Logo and tagline rise into their clipping mask. */
const riseVariants: Variants = {
  [VARIANTS.hidden]: { y: '100%', opacity: 0 },
  [VARIANTS.visible]: (delay: number) => ({
    y: '0%',
    opacity: 1,
    transition: { duration: 0.8, ease: [0, 0, 0, 1], delay: delay + 0.5 || 0.5 },
  }),
}

const fadeVariants: Variants = {
  [VARIANTS.hidden]: { opacity: 0 },
  [VARIANTS.visible]: ({ delay, duration }: { delay: number; duration: number }) => ({
    opacity: 1,
    transition: { duration, delay },
  }),
}

const pillVariants: Variants = {
  [VARIANTS.hidden]: { scale: 0 },
  [VARIANTS.visible]: (delay: number) => ({ scale: 1, transition: { duration: 0.3, delay } }),
}

const pillLabelVariants: Variants = {
  [VARIANTS.hidden]: { opacity: 0 },
  [VARIANTS.visible]: (delay: number) => ({
    opacity: [0, 1, 0.5, 1, 0.5, 1],
    transition: { ease: 'linear', duration: 0.25, delay },
  }),
}

function Thumbnail({ src, alt, animate = true }: { src: string; alt: string; animate?: boolean }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <MotionBox
      variants={thumbnailFrameVariants}
      initial={VARIANTS.hidden}
      animate={animate && loaded ? VARIANTS.visible : VARIANTS.hidden}
      overflow="hidden"
    >
      <MotionAspectRatio
        variants={thumbnailImageVariants}
        ratio={SLIDE_WIDTH_XL / SLIDE_HEIGHT_XL}
        w="100%"
        border="1px solid rgba(255,255,255,0.2)"
      >
        <Image
          src={src}
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          alt={alt}
          onLoad={() => setLoaded(true)}
        />
      </MotionAspectRatio>
    </MotionBox>
  )
}

function WordmarkAndTagline({
  label,
  tagline,
  isActive,
}: {
  label: string
  tagline: string
  isActive: boolean
}) {
  return (
    <Box
      pos="absolute"
      bottom={{ base: '0.9375rem', xl: 'auto' }}
      top={{ xl: '16.5rem' }}
      left={{ base: '-1.625rem', xl: '-16.125rem' }}
      w={{ base: 'calc(100% + 3.25rem)', xl: slideWidthPct(WORDMARK_SLOT_XL) }}
      pointerEvents={isActive ? undefined : 'none'}
    >
      {/* Clips the rise, so it has to stay wide enough for the longest label. */}
      <Box overflow="hidden" w="100%">
        <MotionBox variants={riseVariants}>
          <StackedWordmark label={label.toUpperCase()} title={`${label} wordmark`} />
        </MotionBox>
      </Box>
      <Box
        mt={{ base: '0.6875rem', xl: '1.875rem' }}
        overflow="hidden"
        fontSize={{ base: '1.125rem', xl: '1.5rem' }}
        lineHeight={{ base: '1.375rem', xl: '1.75rem' }}
      >
        <MotionBox
          _after={{
            content: '""',
            display: 'block',
            w: '0.9375rem',
            h: '0.1875rem',
            mt: '1.125rem',
            bg: 'gold',
          }}
          variants={riseVariants}
          custom={0.3}
        >
          {tagline}
        </MotionBox>
      </Box>
    </Box>
  )
}

function TagPill({ label, delay = 0 }: { label: string; delay?: number }) {
  return (
    <MotionBox
      display="inline-flex"
      alignItems="center"
      h="1.5625rem"
      px="0.5rem"
      border="1px solid rgba(224,190,122,0.4)"
      fontSize="0.6875rem"
      fontWeight="semibold"
      textAlign="center"
      textTransform="uppercase"
      variants={pillVariants}
      custom={delay}
    >
      <MotionSpan variants={pillLabelVariants} custom={delay + 0.3}>
        {label}
      </MotionSpan>
    </MotionBox>
  )
}

function AboutPanel({
  heading,
  description,
  tags,
  isActive,
  delay = 0,
}: CarouselItem['about'] & { isActive: boolean; delay?: number }) {
  // Inactive slides scramble their heading away to nothing.
  const [visibleHeading, setVisibleHeading] = useState(heading)

  useEffect(() => {
    setVisibleHeading(isActive ? heading : '')
  }, [heading, isActive])

  return (
    <MotionBox
      variants={fadeVariants}
      custom={{ delay: 0, duration: 0.01 }}
      pos={{ base: 'relative', xl: 'absolute' }}
      bottom="0"
      left={{ base: '-1.625rem', xl: '100%' }}
      mt={{ base: '4.25rem', xl: 0 }}
      pl={{ xl: '4rem' }}
      w={{ base: 'calc(100% + 3.25rem)', xl: slideWidthPct(348) }}
      pointerEvents={isActive ? 'none' : undefined}
    >
      <AnimatedHeading type="h2" delay={delay + 1}>
        {visibleHeading}
      </AnimatedHeading>
      <MotionParagraph
        mt={{ base: '1.125rem', xl: '0.8125rem' }}
        fontSize={{ base: 'sm', xl: 'md' }}
        lineHeight={{ base: '1.25rem', xl: '1.375rem' }}
        letterSpacing="0.02em"
        variants={fadeVariants}
        custom={{ delay: delay + 1.2, duration: 0.5 }}
      >
        {description}
      </MotionParagraph>
      <List display="flex" flexWrap="wrap" mt={{ base: '0.625rem', xl: '0.75rem' }}>
        {tags.map((tag, index) => (
          <ListItem key={tag} mt="0.5rem" mr="0.625rem">
            <TagPill label={tag} delay={delay + 1.4 + 0.1 * index} />
          </ListItem>
        ))}
      </List>
    </MotionBox>
  )
}

export type GameSlideProps = {
  id: string
  /** Position in the carousel — picks the wordmark and graphic placements. */
  index: number
  label: string
  thumbnail: CarouselItem['thumbnail']
  tagline: string
  about: CarouselItem['about']
  isActive: boolean
  animateThumbnail?: boolean
}

export function GameSlide({
  id,
  index,
  label,
  thumbnail,
  tagline,
  about,
  isActive,
  animateThumbnail = true,
}: GameSlideProps) {
  const [mounted, setMounted] = useState(false)
  const isDesktop = useIsDesktop()

  useEffect(() => {
    setMounted(true)
  }, [])

  const overlayState = isActive && mounted ? VARIANTS.visible : VARIANTS.hidden

  return (
    <MotionBox
      custom={isDesktop}
      variants={slideVariants}
      initial={VARIANTS.hidden}
      animate={isActive ? VARIANTS.visible : VARIANTS.hidden}
    >
      <Box pos="relative">
        {isActive && (
          <SlideCorners
            top={{ base: '-1.5rem', xl: '-2.1875rem' }}
            left={{ base: '-1.5625rem', xl: '-2.125rem' }}
            w={{ base: 'calc(100% + 3.125rem)', xl: 'calc(100% + 4.25rem)' }}
            h={{ base: 'calc(100% + 3.25rem)', xl: 'calc(100% + 4.625rem)' }}
          />
        )}
        <MotionBox
          variants={overlayVariants}
          custom={isActive}
          initial={VARIANTS.hidden}
          animate={overlayState}
          pointerEvents="none"
        />
        <Thumbnail src={thumbnail.src} alt={thumbnail.alt} animate={animateThumbnail} />
        <MotionBox
          variants={overlayVariants}
          custom={isActive}
          initial={VARIANTS.hidden}
          animate={overlayState}
          pointerEvents="none"
        />
        <WordmarkAndTagline label={label} tagline={tagline} isActive={isActive} />
      </Box>
      <AboutPanel
        isActive={isActive}
        heading={about.heading}
        description={about.description}
        tags={about.tags}
      />
    </MotionBox>
  )
}
