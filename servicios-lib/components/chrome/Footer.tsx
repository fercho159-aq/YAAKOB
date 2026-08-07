import { Button, Grid, GridItem, Link, type GridProps, type IconProps } from '@chakra-ui/react'
import { useAnimation, type Variants } from 'framer-motion'
import NextLink from 'next/link'
import { useCallback, useEffect, useState, type ComponentType, type ElementType } from 'react'
import { ScrambleText } from '@servicios/components/ui/ScrambleText'
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

declare global {
  interface Window {
    OneTrust?: { ToggleInfoDisplay?: () => void }
  }
}

const IDLE = '#898989'
const ACTIVE = '#FFFFFF'

const GRIDNIK = 'var(--font-gridnik)'

/** `FOOTER_HEIGHT` in the original's constants module. */
const FOOTER_HEIGHT = '80px'

/**
 * The consent SDK binds itself to this id/class. It is not part of this
 * rebuild, so the click handler is a guarded no-op until something provides it.
 */
const CONSENT_BUTTON_ID = 'ot-sdk-btn'
const CONSENT_BUTTON_CLASS = 'ot-sdk-show-settings'

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
  /**
   * The consent control. In the bundle this is gated only on the component
   * having mounted, so it renders on every page; the prop is here because the
   * hydrated site was observed without it on the detail pages.
   */
  cookieSettings?: boolean
}

export function Footer({
  delay = 0,
  animate = true,
  mobile = false,
  restartId = 0,
  cookieSettings = true,
  ...rest
}: FooterProps) {
  const [mounted, setMounted] = useState(false)
  const logoControls = useAnimation()
  const cookieControls = useAnimation()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !animate) return
    const cookieDelay = mobile ? delay + 1.2 : delay
    const logoDelay = mobile ? delay + 0.8 : delay + 0.5

    cookieControls.set({ opacity: 0 })
    cookieControls.start({ opacity: 1, transition: { duration: 0.5, delay: cookieDelay } })
    logoControls.set({ opacity: 0 })
    logoControls.start({ opacity: 1, transition: { duration: 0.5, delay: logoDelay } })
  }, [restartId, mounted, animate, mobile, delay, logoControls, cookieControls])

  const openCookieSettings = useCallback(() => {
    window.OneTrust?.ToggleInfoDisplay?.()
  }, [])

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
        rowStart={[3, null, null, null, 'auto']}
        display="flex"
        maxW="480px"
        minW={['initial', null, '420px']}
        mx={['auto', null, null, null, 'initial']}
        justifyContent={['space-around', null, 'space-between']}
        alignItems="center"
        pl={[0, null, null, null, null, '1.875rem']}
        pr={{ base: 0, xl: '0.625rem' }}
        fontSize={['12px', null, 'initial']}
        fontFamily="var(--font-gridnik)"
        gap={3}
      >
        {cookieSettings && mounted ? (
          <MotionBox initial={{ opacity: 0 }} animate={cookieControls}>
            <Button
              id={CONSENT_BUTTON_ID}
              className={CONSENT_BUTTON_CLASS}
              opacity={0.8}
              h="20px"
              minW={['auto', null, '120px']}
              maxW="170px"
              textAlign={['center', null, 'left']}
              style={{
                fontSize: '1em',
                fontWeight: 'normal',
                fontFamily: GRIDNIK,
                textTransform: 'none',
                color: '#fff',
                padding: 0,
                border: 'none',
                background: 'none',
                backgroundColor: 'transparent',
              }}
              _hover={{ background: 'none', backgroundColor: 'transparent', opacity: 1, textDecor: 'none' }}
              onClick={openCookieSettings}
              aria-label={`Go to ${content.footer.cookies.label}`}
            >
              <ScrambleText
                text={content.footer.cookies.label}
                w="100%"
                animate={shouldAnimate}
                delay={mobile ? delay + 1.2 : delay}
                restart={restartId}
                pointerEvents="none"
              />
            </Button>
          </MotionBox>
        ) : null}
        <Link
          href={content.footer.privacy.href}
          isExternal
          textAlign={['center', null, 'left']}
          opacity={0.8}
          minW={['auto', null, '110px']}
          _hover={{ opacity: 1, textDecor: 'none' }}
          aria-label={`Go to ${content.footer.privacy.label}`}
        >
          <ScrambleText
            text={content.footer.privacy.label}
            animate={shouldAnimate}
            delay={mobile ? delay + 1 : delay + 0.2}
            restart={restartId}
          />
        </Link>
        <Link
          href={content.footer.ads.href}
          isExternal
          textAlign={['center', null, 'left']}
          opacity={0.8}
          minW={['auto', null, '113px']}
          _hover={{ opacity: 1, textDecor: 'none' }}
          aria-label={`Go to ${content.footer.ads.label}`}
        >
          <ScrambleText
            text={content.footer.ads.label}
            animate={shouldAnimate}
            delay={mobile ? delay + 1.4 : delay + 0.4}
            restart={restartId}
          />
        </Link>
      </GridItem>

      <GridItem
        colSpan={[12, null, null, null, 4]}
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
