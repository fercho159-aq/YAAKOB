import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
} from '@chakra-ui/react'
import { useContactModal } from '@servicios/components/contact'
import { AnimatedWordmark } from './Wordmark'
import { NavLink } from './motion'

const HAIRLINE = '1px solid rgba(255,255,255,0.2)'
const HIGHLIGHT = 'rgba(255,255,255,0.09)'

interface MenuEntry {
  label: string
  href?: string
  modal?: boolean
}

/** Same links, same order, as the home and /start headers. */
const ENTRIES: MenuEntry[] = [
  { label: 'Servicios', href: '/servicios' },
  { label: 'Planes', href: '/planes' },
  { label: 'Contacto', modal: true },
  { label: 'App', href: '/apps' },
]

export interface MenuDrawerProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * Main navigation drawer — the client's "MENU" panel: SERVICIOS / PLANES /
 * CONTACTO / APP over hairline rows, with the logo below.
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
              <Box as="a" href="/" aria-label="YAAKOB, inicio" onClick={onClose}>
                <Image src="/logo-yaakob.png" alt="" w="7.5rem" h="auto" />
              </Box>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}
