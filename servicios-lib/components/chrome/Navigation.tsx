import { Box, Flex, Link } from '@chakra-ui/react'
import type { Variants } from 'framer-motion'
import { useRouter } from 'next/router'
import { useState, type ReactNode } from 'react'
import { useContactModal } from '@servicios/components/contact'
import { MenuDrawer } from './MenuDrawer'
import { MenuOverlay } from './MenuOverlay'
import { AnimatedWordmark } from './Wordmark'
import { MotionBox, MotionFlex, NavLink } from './motion'

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

/** Simple house glyph — links out to the marketing root, away from `/servicios`. */
function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
      <path
        d="M3.5 11.5 12 4l8.5 7.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 10v8.5a1 1 0 0 0 1 1H9.5v-6h5v6h3a1 1 0 0 0 1-1V10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
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
      <MotionBox as="span" display="block" bg="gold" h="2px" variants={barVariants} />
      <MotionBox
        as="span"
        display="block"
        bg="gold"
        h="2px"
        transformOrigin="left"
        variants={barVariants}
        custom={{ hover: 0.75 }}
      />
      <MotionBox
        as="span"
        display="block"
        bg="gold"
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

  const topOffset = minimal ? { base: '0.5rem', xl: '0.5rem' } : { base: '0.875rem', xl: '1.5rem' }

  return (
    <MotionBox
      as="nav"
      pos="relative"
      zIndex="navigation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
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

      {/* Mobile: news toggle pinned to the left edge, per the client's layout. */}
      <MotionFlex
        display={{ base: 'flex', xl: 'none' }}
        alignItems="center"
        pos="fixed"
        top={topOffset}
        left="0.75rem"
        zIndex="navigation"
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
        variants={buttonVariants}
        initial="hidden"
        animate={animate ? 'visible' : undefined}
      >
        <Link
          href="https://www.yaakob.com/"
          aria-label="Ir al inicio de Yaakob"
          display={{ base: 'none', xl: 'flex' }}
          alignItems="center"
          justifyContent="center"
          h="2.0625rem"
          w="2.0625rem"
          color="whiteAlpha.800"
          _hover={{ color: 'gold' }}
        >
          <HomeIcon />
        </Link>
        <NavLink href="/servicios" display={{ base: 'none', xl: 'block' }} {...NAV_LINK_STYLES}>
          Servicios
        </NavLink>
        <Box
          as="button"
          display={{ base: 'none', xl: 'block' }}
          {...NAV_LINK_STYLES}
          onClick={openContact}
        >
          Contacto
        </Box>
        <NavLink href="/start" display={{ base: 'none', xl: 'block' }} {...NAV_LINK_STYLES}>
          Consultor
        </NavLink>
        <NavLink
          href="/apps"
          aria-label="App"
          display={{ base: 'none', xl: 'flex' }}
          alignItems="center"
          justifyContent="center"
          h="2.0625rem"
          w="1.5rem"
        >
          <Box
            w="1.25rem"
            h="1.25rem"
            bg="gold"
            transition="background 0.2s linear"
            _hover={{ bg: 'white' }}
            sx={{
              WebkitMaskImage: 'url(/logo.png)',
              maskImage: 'url(/logo.png)',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
              WebkitMaskPosition: 'center',
              maskPosition: 'center',
            }}
          />
        </NavLink>
        <Box display={{ base: 'none', xl: 'block' }}>
          <ToggleButton label="Noticias" onClick={() => setNewsOpen((open) => !open)} />
        </Box>
        <Box display={{ base: 'block', xl: 'none' }}>
          <ToggleButton label="Menu" onClick={() => setMenuOpen((open) => !open)} />
        </Box>
      </MotionFlex>

      <MenuOverlay isOpen={newsOpen} onClose={() => setNewsOpen(false)} footer={menuFooter} />
      <MenuDrawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </MotionBox>
  )
}
