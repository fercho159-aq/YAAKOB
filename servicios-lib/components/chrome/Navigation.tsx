import { Box, Flex, type IconProps } from '@chakra-ui/react'
import type { Variants } from 'framer-motion'
import { useRouter } from 'next/router'
import { useState, type ComponentType, type ReactNode } from 'react'
import { PlaceholderWordmark } from '@servicios/components/svg'
import content from '@servicios/data/content.json'
import { MenuOverlay, type MenuItem } from './MenuOverlay'
import { AnimatedWordmark } from './Wordmark'
import { MotionBox, MotionFlex, NavLink } from './motion'

const EASE: [number, number, number, number] = [0.25, 0, 0, 1]

/** Width the menu draws each item's wordmark at, in px (the original's per-game table). */
const MENU_ICON_WIDTH = 168

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

/** Binds an item's label into the shared wordmark so the menu can render it as an icon. */
function itemWordmark(label: string): ComponentType<IconProps> {
  function ItemWordmark(props: IconProps) {
    return <PlaceholderWordmark label={label.toUpperCase()} title={`${label} wordmark`} {...props} />
  }
  ItemWordmark.displayName = `ItemWordmark(${label})`
  return ItemWordmark
}

const menuItems: MenuItem[] = content.items.map(({ id, slug, label, tagline }) => ({
  id,
  slug,
  label,
  tagline,
  links: [
    { label: content.nav.primary, href: `/servicios/${slug}` },
    { label: content.nav.secondary, href: `/servicios/${slug}` },
    { label: content.nav.tertiary, href: `/servicios/${slug}` },
  ],
  icon: itemWordmark(label),
  iconWidth: MENU_ICON_WIDTH,
}))

interface MenuToggleProps {
  animate?: boolean
  minimal?: boolean
  onClick: () => void
}

function MenuToggle({ animate = true, minimal = false, onClick }: MenuToggleProps) {
  return (
    <MotionFlex
      as="button"
      aria-label="Toggle menu"
      h="2.0625rem"
      p="0.625rem"
      minWidth={0}
      pos="fixed"
      top={minimal ? { base: '0.5rem', xl: '0.5rem' } : { base: '0.875rem', xl: '1.5rem' }}
      right={{ base: '0.75rem', xl: '1.5rem' }}
      zIndex="navigation"
      variants={buttonVariants}
      initial="hidden"
      animate={animate ? 'visible' : undefined}
      whileHover="hover"
      onClick={onClick}
    >
      <Box
        as="span"
        mr={{ base: '0.6875rem', xl: '0.875rem' }}
        overflow="hidden"
        fontSize="0.75rem"
        lineHeight="100%"
        letterSpacing="0.1em"
        fontWeight="semibold"
        textTransform="uppercase"
      >
        <MotionBox as="span" display="block" variants={menuLabelVariants}>
          Menu
        </MotionBox>
      </Box>
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
    </MotionFlex>
  )
}

export interface NavigationProps {
  /** Set false to skip the reveal animations. */
  animate?: boolean
  /** Tighter offsets, as on the in-experience pages. */
  minimal?: boolean
  /** Bottom slot of the menu drawer — see `MenuOverlayProps.footer`. */
  menuFooter?: ReactNode
}

export function Navigation({ animate = true, minimal = false, menuFooter }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const lastSegment = router.asPath.split('/').pop()
  const logoHiddenOnMobile =
    router.asPath !== '/' && router.asPath !== '/account-settings' && lastSegment !== 'play'

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
        w="8rem"
        mt="-0.25rem"
        zIndex="navigation"
        visibility={{ base: logoHiddenOnMobile ? 'hidden' : undefined, xl: 'visible' }}
      >
        <AnimatedWordmark animate={animate} />
      </NavLink>

      <MenuToggle animate={animate} minimal={minimal} onClick={() => setIsOpen((open) => !open)} />

      <MenuOverlay
        items={menuItems}
        isOpen={isOpen}
        activePath={router.asPath}
        onClose={() => setIsOpen(false)}
        footer={menuFooter}
      />
    </MotionBox>
  )
}
