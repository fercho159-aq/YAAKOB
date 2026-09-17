import { Box, Flex, Image, Link } from '@chakra-ui/react'
import type { Variants } from 'framer-motion'
import { useRouter } from 'next/router'
import { useState, type ReactNode } from 'react'
import { useContactModal } from '@servicios/components/contact'
import { MenuDrawer } from './MenuDrawer'
import { MenuOverlay } from './MenuOverlay'
import { AnimatedWordmark } from './Wordmark'
import { MotionBox, MotionFlex, NavLink } from './motion'
import { BRAND_GRADIENT } from '@servicios/theme'

const EASE: [number, number, number, number] = [0.25, 0, 0, 1]

const buttonVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
}

const menuLabelVariants: Variants = {
  hidden: { y: '100%' },
  visible: { y: 0, transition: { ease: EASE, duration: 0.5 } },
}

interface BarScale {
  visible?: number
  hover?: number
}

const barVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: (custom?: BarScale) => ({
    scaleX: custom?.visible ?? 1,
    transition: { ease: EASE, duration: 0.5 },
  }),
  hover: (custom?: BarScale) => ({ scaleX: custom?.hover ?? 1 }),
}

/** The three animated bars shared by both toggles. */
function Bars() {
  return (
    <Flex
      flexDirection="column"
      alignItems="stretch"
      justifyContent="space-between"
      h="0.75rem"
      w="1rem"
    >
      <MotionBox as="span" display="block" bgImage={BRAND_GRADIENT} h="2px" variants={barVariants} />
      <MotionBox
        as="span"
        display="block"
        bgImage={BRAND_GRADIENT}
        h="2px"
        transformOrigin="left"
        variants={barVariants}
        custom={{ hover: 0.75 }}
      />
      <MotionBox
        as="span"
        display="block"
        bgImage={BRAND_GRADIENT}
        h="2px"
        transformOrigin="left"
        variants={barVariants}
        custom={{ visible: 0.5, hover: 1 }}
      />
    </Flex>
  )
}

interface ToggleButtonProps {
  label: string
  barsFirst?: boolean
  onClick: () => void
}

function ToggleButton({ label, barsFirst = false, onClick }: ToggleButtonProps) {
  const text = (
    <Box
      as="span"
      overflow="hidden"
      fontSize="0.75rem"
      lineHeight="100%"
      letterSpacing="0.1em"
      fontWeight="semibold"
      textTransform="uppercase"
    >
      <MotionBox as="span" display="block" variants={menuLabelVariants}>
        {label}
      </MotionBox>
    </Box>
  )
  return (
    <MotionFlex
      as="button"
      aria-label={`Toggle ${label}`}
      alignItems="center"
      gap={{ base: '0.6875rem', xl: '0.875rem' }}
      h="2.0625rem"
      p="0.625rem"
      minWidth={0}
      whileHover="hover"
      onClick={onClick}
    >
      {barsFirst ? (
        <>
          <Bars />
          {text}
        </>
      ) : (
        <>
          {text}
          <Bars />
        </>
      )}
    </MotionFlex>
  )
}

const NAV_LINK_STYLES = {
  fontSize: '0.75rem',
  lineHeight: '100%',
  letterSpacing: '0.1em',
  fontWeight: 'semibold',
  textTransform: 'uppercase',
  color: 'whiteAlpha.800',
  _hover: { color: 'gold', textDecor: 'none' },
} as const

export interface NavigationProps {
  /** Set false to skip the reveal animations. */
  animate?: boolean
  /** Tighter offsets, as on the in-experience pages. */
  minimal?: boolean
  /** Bottom slot of the menu drawer — see `MenuOverlayProps.footer`. */
  menuFooter?: ReactNode
}

export function Navigation({ animate = true, minimal = false, menuFooter }: NavigationProps) {
  const [newsOpen, setNewsOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { open: openContact } = useContactModal()
  const router = useRouter()

  const lastSegment = router.asPath.split('/').pop()
  const logoHiddenOnMobile =
    router.asPath !== '/' && router.asPath !== '/account-settings' && lastSegment !== 'play'

  // The services index gets its own corner mark, and its first nav slot
  // points home (a link back to itself would be useless).
  const onServicesIndex = router.pathname === '/servicios'
  // There the header sits on a white band, as on the home, so the type goes dark.
  const ink = onServicesIndex ? '#1a1a1a' : undefined
  const linkStyles = onServicesIndex ? { ...NAV_LINK_STYLES, color: 'blackAlpha.800' } : NAV_LINK_STYLES

  const topOffset = minimal
    ? { base: '0.5rem', xl: '0.5rem' }
    : { base: '0.875rem', xl: onServicesIndex ? '0.59375rem' : '1.5rem' }

  return (
    <MotionBox
      as="nav"
      pos="relative"
      zIndex="navigation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* White band behind the services-index header, same look as the home HUD. */}
      {onServicesIndex ? (
        <Box
          pos="fixed"
          top={0}
          left={0}
          right={0}
          h={minimal ? { base: '2.75rem', xl: '2.75rem' } : { base: '3rem', xl: '3.25rem' }}
          bg="white"
          boxShadow="0 6px 18px rgba(26,26,26,0.16), 0 1px 3px rgba(26,26,26,0.10)"
          zIndex="navigation"
          pointerEvents="none"
        />
      ) : null}
      {/* The services index swaps the bracketed wordmark for the Tree of Life
          seal and its XIX-XXIII legend. Phones keep that corner for NOTICIAS. */}
      {onServicesIndex ? (
        <Flex
          display={{ base: 'none', xl: 'flex' }}
          alignItems="center"
          gap="0.875rem"
          pos="absolute"
          top={minimal ? '0.5rem' : '0.5rem'}
          left="1.875rem"
          zIndex="navigation"
        >
          <Image src="/logo-xix-xxiii.png" alt="Árbol de la vida" w="2.125rem" h="2.125rem" objectFit="contain" />
          <Box
            as="span"
            fontSize="0.875rem"
            fontWeight="semibold"
            letterSpacing="0.22em"
            color={ink}
          >
            XIX-XXIII
          </Box>
        </Flex>
      ) : (
        <NavLink
          href="/servicios"
          aria-label="Go to home page"
          pos="absolute"
          top={minimal ? { base: '0.9375rem', xl: '0.9375rem' } : { base: '1.375rem', xl: '1.875rem' }}
          left={{ base: '1.125rem', xl: '1.875rem' }}
          w="20rem"
          mt="-0.25rem"
          zIndex="navigation"
          visibility={{ base: logoHiddenOnMobile ? 'hidden' : undefined, xl: 'visible' }}
        >
          <AnimatedWordmark animate={animate} label="YAAKOB CONSULTORES SC" title="Yaakob" />
        </NavLink>
      )}

      {/* Mobile: news toggle pinned to the left edge, per the client's layout. */}
      <MotionFlex
        display={{ base: 'flex', xl: 'none' }}
        alignItems="center"
        pos="fixed"
        top={topOffset}
        left="0.75rem"
        zIndex="navigation"
        color={ink}
        variants={buttonVariants}
        initial="hidden"
        animate={animate ? 'visible' : undefined}
      >
        <ToggleButton label="Noticias" barsFirst onClick={() => setNewsOpen((open) => !open)} />
      </MotionFlex>

      {/* Right cluster: MENU toggle on phones; inline nav + news on desktop. */}
      <MotionFlex
        alignItems="center"
        gap={{ base: '0.75rem', xl: '1.25rem' }}
        pos="fixed"
        top={topOffset}
        right={{ base: '0.75rem', xl: '1.5rem' }}
        zIndex="navigation"
        color={ink}
        variants={buttonVariants}
        initial="hidden"
        animate={animate ? 'visible' : undefined}
      >
        {onServicesIndex ? (
          // The home is a full page load (WebGL), so a plain link rather than
          // a client transition.
          <Link href="/" display={{ base: 'none', xl: 'block' }} {...linkStyles}>
            Inicio
          </Link>
        ) : (
          <NavLink href="/servicios" display={{ base: 'none', xl: 'block' }} {...linkStyles}>
            Servicios
          </NavLink>
        )}
        <Box
          as="button"
          display={{ base: 'none', xl: 'block' }}
          {...linkStyles}
          onClick={openContact}
        >
          Contacto
        </Box>
        <NavLink href="/apps" display={{ base: 'none', xl: 'block' }} {...linkStyles}>
          App
        </NavLink>
        <NavLink href="/planes" display={{ base: 'none', xl: 'block' }} {...linkStyles}>
          Planes
        </NavLink>
        {onServicesIndex ? (
          // The home is a full page load (WebGL), so a plain link.
          <Link
            href="/"
            aria-label="YAAKOB, inicio"
            display={{ base: 'none', xl: 'flex' }}
            alignItems="center"
            transition="transform 0.3s ease"
            _hover={{ transform: 'translateY(-2px) scale(1.06)' }}
          >
            <Image src="/logo-yaakob.png" alt="" h="1.75rem" w="auto" />
          </Link>
        ) : (
          <Box display={{ base: 'none', xl: 'block' }}>
            <ToggleButton label="Noticias" onClick={() => setNewsOpen((open) => !open)} />
          </Box>
        )}
        <Box display={{ base: 'block', xl: 'none' }}>
          <ToggleButton label="Menu" onClick={() => setMenuOpen((open) => !open)} />
        </Box>
      </MotionFlex>

      {/* On the services index the header keeps only links and logo, so the
          news toggle sits just under the white band, on the right. */}
      {onServicesIndex ? (
        <MotionFlex
          display={{ base: 'none', xl: 'flex' }}
          pos="fixed"
          top={minimal ? '3.75rem' : '4.75rem'}
          right="1.5rem"
          zIndex="navigation"
          variants={buttonVariants}
          initial="hidden"
          animate={animate ? 'visible' : undefined}
        >
          <ToggleButton label="Noticias" onClick={() => setNewsOpen((open) => !open)} />
        </MotionFlex>
      ) : null}

      <MenuOverlay isOpen={newsOpen} onClose={() => setNewsOpen(false)} footer={menuFooter} />
      <MenuDrawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </MotionBox>
  )
}
