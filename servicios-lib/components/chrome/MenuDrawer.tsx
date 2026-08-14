import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
} from '@chakra-ui/react'
import { useContactModal } from '@servicios/components/contact'
import { AnimatedWordmark } from './Wordmark'
import { NavLink } from './motion'

const HAIRLINE = '1px solid rgba(255,255,255,0.2)'
const HIGHLIGHT = 'rgba(255,255,255,0.09)'

/** Small house glyph for the HOME row. */
function HomeGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
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

/** The brand flower, tinted via mask so it always follows the accent colour. */
function FlowerGlyph({ size }: { size: string }) {
  return (
    <Box
      w={size}
      h={size}
      bg="gold"
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
  )
}

interface MenuEntry {
  label: string
  href?: string
  modal?: boolean
  icon?: 'home' | 'flower'
}

const ENTRIES: MenuEntry[] = [
  { label: 'Home', href: '/', icon: 'home' },
  { label: 'Contacto', modal: true },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Consultor', href: '/start' },
  { label: 'App', href: '/apps', icon: 'flower' },
]

export interface MenuDrawerProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * Main navigation drawer — the client's "MENU" panel: HOME / CONTACTO /
 * SERVICIOS / CONSULTOR / APP over hairline rows, with the flower mark below.
 */
export function MenuDrawer({ isOpen, onClose }: MenuDrawerProps) {
  const { open: openContact } = useContactModal()

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent
          maxWidth={{ base: '100%', xl: '21.75rem' }}
          bg="grey1"
          borderLeft="1.6px solid rgba(255,255,255,0.2)"
          color="white"
        >
          <DrawerHeader
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            position="relative"
            p="1.25rem 1rem 1rem"
            borderBottom="1.6px solid rgba(255,255,255,0.2)"
          >
            <NavLink
              href="/servicios"
              display="flex"
              alignItems="center"
              h="100%"
              fontSize="0.75rem"
              letterSpacing="widest"
              textTransform="uppercase"
              aria-label="Go to home page"
              onClick={onClose}
            >
              <AnimatedWordmark animate={isOpen} label="YAAKOB CONSULTORES SC" title="Yaakob" w="auto" h="22px" />
            </NavLink>
            <DrawerCloseButton
              pos="absolute"
              top="0.875rem"
              right="0.75rem"
              color="gold"
              _hover={{ color: 'white' }}
            />
          </DrawerHeader>

          <DrawerBody p="3px 0 0 0" display="flex" flexDir="column">
            <Flex align="center" gap="0.5rem" px="1.125rem" pt="1.5rem" pb="0.875rem" color="gold">
              <Box as="span" fontSize="0.75rem" lineHeight={1}>
                [
              </Box>
              <Box
                as="h2"
                fontSize="0.625rem"
                fontWeight="semibold"
                letterSpacing="0.22em"
                textTransform="uppercase"
              >
                Menu
              </Box>
              <Box as="span" fontSize="0.75rem" lineHeight={1}>
                ]
              </Box>
            </Flex>

            <Box as="nav" aria-label="Menú principal">
              {ENTRIES.map((entry) => {
                const inner = (
                  <Flex align="center" gap="0.75rem" color="gold">
                    {entry.icon === 'home' ? <HomeGlyph /> : null}
                    {entry.icon === 'flower' ? <FlowerGlyph size="16px" /> : null}
                    <Box
                      as="span"
                      fontSize="0.9375rem"
                      fontWeight="semibold"
                      letterSpacing="0.18em"
                      textTransform="uppercase"
                    >
                      {entry.label}
                    </Box>
                  </Flex>
                )
                const rowStyles = {
                  display: 'block',
                  width: '100%',
                  textAlign: 'left' as const,
                  px: '1.125rem',
                  py: '1.375rem',
                  borderTop: HAIRLINE,
                  transition: 'background 0.2s linear',
                  _hover: { bg: HIGHLIGHT, textDecor: 'none' },
                }
                if (entry.modal) {
                  return (
                    <Box
                      as="button"
                      key={entry.label}
                      {...rowStyles}
                      onClick={() => {
                        onClose()
                        openContact()
                      }}
                    >
                      {inner}
                    </Box>
                  )
                }
                return (
                  <NavLink key={entry.label} href={entry.href ?? '/'} {...rowStyles} onClick={onClose}>
                    {inner}
                  </NavLink>
                )
              })}
            </Box>

            <Flex flex="1" align="flex-end" justify="center" pb="2.5rem" pt="2rem" borderTop={HAIRLINE}>
              <FlowerGlyph size="7.5rem" />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}
