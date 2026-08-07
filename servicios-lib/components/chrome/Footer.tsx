import { Grid, GridItem, Link, type GridProps, type IconProps } from '@chakra-ui/react'
import { useAnimation, type Variants } from 'framer-motion'
import NextLink from 'next/link'
import { useEffect, useState, type ComponentType, type ElementType } from 'react'
import {
  FacebookLogo,
  InstagramLogo,
  PlaceholderWordmark,
  SocialIcon,
  XLogo,
  YoutubeLogo,
} from '@servicios/components/svg'
import content from '@servicios/data/content.json'
import { MotionBox, MotionCenter, type MotionCenterProps } from './motion'

/**
 * Chakra v2's `Grid` resolves its `as`-prop overload via a conditional type
 * that, combined with React 19's `ElementType`, blows past TypeScript's
 * instantiation-depth limit (TS2590) when `as="footer"` is applied directly.
 * Widening the component reference to a plain `ComponentType` sidesteps the
 * overload resolution; the `as` prop is still read and honoured at runtime by
 * Chakra exactly as before.
 */
const FooterGrid = Grid as unknown as ComponentType<Omit<GridProps, 'as'> & { as?: ElementType }>

const IDLE = '#898989'
const ACTIVE = '#FFFFFF'

/** `FOOTER_HEIGHT` in the original's constants module. */
const FOOTER_HEIGHT = '80px'

const iconVariants: Variants = {
  initial: { scale: 0.4, opacity: 0, transition: { type: 'tween', ease: 'easeOut' } },
}

const ringVariants: Variants = {
  initial: { rotate: -180, opacity: 0 },
}

interface SocialLinkProps extends Omit<MotionCenterProps, 'variants' | 'animate'> {
  href: string
  icon: ComponentType<IconProps>
  /** Per-brand SVG tweaks — X ships a 1200-wide viewBox and needs scaling down. */
  iconProps?: IconProps
  ariaLabel: string
  delay: number
  animate?: boolean
  restartId?: number
}

function SocialLink({
  href,
  icon: Brand,
  iconProps,
  ariaLabel,
  delay,
  animate = true,
  restartId = 0,
  ...rest
}: SocialLinkProps) {
  const [isHovering, setIsHovering] = useState(false)
  const controls = useAnimation()
  const color = isHovering ? ACTIVE : IDLE

  useEffect(() => {
    if (!animate) return
    controls.set('initial')
    controls.start('inactive', { delay })
  }, [restartId, animate, delay, controls])

  return (
    <MotionCenter
      w="40px"
      h="40px"
      pos="relative"
      ml={3}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      initial="initial"
      animate={animate ? controls : undefined}
      variants={{
        ...iconVariants,
        inactive: {
          scale: 1,
          opacity: 1,
          transition: { duration: 0.6, delay, type: 'tween', ease: 'easeOut' },
        },
      }}
      {...rest}
    >
      <Link href={href} isExternal aria-label={ariaLabel} height="40px" width="40px">
        <Brand
          w="40px"
          h="auto"
          pos="absolute"
          top="0"
          left="0"
          background="transparent"
          sx={{ '& path, & circle': { fill: color, transition: 'fill 0.4s ease-out' } }}
          {...iconProps}
        />
        <MotionBox
          pos="absolute"
          top="0"
          left="0"
          variants={{
            ...ringVariants,
            inactive: {
              rotate: 0,
              opacity: 1,
              transition: { duration: 0.8, delay, type: 'tween', ease: 'easeOut' },
            },
            active: {
              rotate: 180,
              opacity: 1,
              transition: { duration: 0.8, delay, type: 'tween', ease: 'easeOut' },
            },
          }}
        >
          <MotionBox
            animate={animate ? { rotate: 0, transition: { duration: 0.4, ease: 'easeOut' } } : undefined}
            whileHover={animate ? { rotate: 90, transition: { duration: 0.4, ease: 'easeOut' } } : undefined}
          >
            <SocialIcon
              w="40px"
              h="auto"
              fill="none"
              background="transparent"
              stroke={color}
              strokeWidth="20px"
              strokeMiterlimit={10}
              transition="stroke 0.4s ease-out"
            />
          </MotionBox>
        </MotionBox>
      </Link>
    </MotionCenter>
  )
}

export interface FooterProps extends GridProps {
  /** Base delay the reveal animations are offset from. */
  delay?: number
  animate?: boolean
  /** Mobile ordering of the reveal (the original's `mobile` prop). */
  mobile?: boolean
  /** Bump to replay the reveal. */
  restartId?: number
}

export function Footer({
  delay = 0,
  animate = true,
  mobile = false,
  restartId = 0,
  ...rest
}: FooterProps) {
  const [mounted, setMounted] = useState(false)
  const logoControls = useAnimation()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !animate) return
    const logoDelay = mobile ? delay + 0.8 : delay + 0.5

    logoControls.set({ opacity: 0 })
    logoControls.start({ opacity: 1, transition: { duration: 0.5, delay: logoDelay } })
  }, [restartId, mounted, animate, mobile, delay, logoControls])

  const shouldAnimate = animate && mounted

  return (
    <FooterGrid
      as="footer"
      w="100%"
      h={['auto', null, null, null, FOOTER_HEIGHT]}
      py={[5, null, 2, null, null, 0]}
      px={[0, null, 5]}
      templateColumns="repeat(12, 1fr)"
      templateRows={['repeat(3, 40px)', null, null, null, 'auto']}
      gap={[2, null, null, null, 6]}
      pos="relative"
      zIndex="footer"
      {...rest}
    >
      <GridItem
        colSpan={[12, null, null, null, 4]}
        colStart={[ 'auto', null, null, null, 1]}
        rowStart={[3, null, null, null, 'auto']}
        display="flex"
        justifyContent={['center', null, null, null, 'flex-start']}
        alignItems="center"
        pl={[0, null, null, null, null, '1.875rem']}
      >
        <MotionBox initial={{ opacity: 0 }} animate={logoControls}>
          <Link
            as={NextLink}
            href={content.footer.contact.href}
            fontSize="0.75rem"
            lineHeight="100%"
            letterSpacing="0.1em"
            fontWeight="semibold"
            textTransform="uppercase"
            color={IDLE}
            transition="color 0.4s ease-out"
            _hover={{ color: ACTIVE, textDecor: 'none' }}
          >
            {content.footer.contact.label}
          </Link>
        </MotionBox>
      </GridItem>

      <GridItem
        colSpan={[12, null, null, null, 4]}
        colStart={['auto', null, null, null, 5]}
        rowStart={[2, null, null, null, 'auto']}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <MotionBox initial={{ opacity: 0 }} animate={logoControls}>
          <Link
            as={NextLink}
            href={content.footer.logo.href}
            display="flex"
            justifyContent="center"
            _hover={{ color: 'gold', textDecor: 'none' }}
            aria-label="Ir al inicio del sitio"
          >
            <PlaceholderWordmark
              w={['90%', null, '355px']}
              maxW="355px"
              h="auto"
              color="white"
              background="transparent"
              opacity={0.8}
              transition="opacity 0.4s ease-out"
              _hover={{ opacity: 1 }}
            />
          </Link>
        </MotionBox>
      </GridItem>

      <GridItem
        colSpan={[12, null, null, null, 4]}
        rowStart={[1, null, null, null, 'auto']}
        display="flex"
        justifyContent={['center', null, null, null, 'flex-end']}
        alignItems="center"
        pr={[0, null, null, null, null, '1.875rem']}
      >
        <SocialLink
          href={content.footer.social.facebook.href}
          icon={FacebookLogo}
          ariaLabel={`Go to ${content.footer.social.facebook.label}`}
          animate={shouldAnimate}
          delay={mobile ? delay : delay + 0.5}
          restartId={restartId}
          ml={0}
        />
        <SocialLink
          href={content.footer.social.twitter.href}
          icon={XLogo}
          iconProps={{ fill: 'none', transform: 'scale(0.4)' }}
          ariaLabel={`Go to ${content.footer.social.twitter.label}`}
          animate={shouldAnimate}
          delay={mobile ? delay + 0.2 : delay + 0.6}
          restartId={restartId}
        />
        <SocialLink
          href={content.footer.social.instagram.href}
          icon={InstagramLogo}
          ariaLabel={`Go to ${content.footer.social.instagram.label}`}
          animate={shouldAnimate}
          delay={mobile ? delay + 0.4 : delay + 0.7}
          restartId={restartId}
        />
        <SocialLink
          href={content.footer.social.youtube.href}
          icon={YoutubeLogo}
          ariaLabel={`Go to ${content.footer.social.youtube.label}`}
          animate={shouldAnimate}
          delay={mobile ? delay + 0.6 : delay + 0.8}
          restartId={restartId}
        />
      </GridItem>
    </FooterGrid>
  )
}
