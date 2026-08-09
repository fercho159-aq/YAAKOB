import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Link,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react'
import type { ReactNode } from 'react'
import content from '@servicios/data/content.json'
import { AnimatedWordmark } from './Wordmark'
import { NavLink } from './motion'

const HAIRLINE = '1px solid rgba(255,255,255,0.2)'
const HIGHLIGHT = 'rgba(255,255,255,0.09)'

export interface MenuOverlayProps {
  isOpen: boolean
  onClose: () => void
  /**
   * Bottom-right slot of the drawer. The original puts the "Background
   * animation" toggle here, which needs the WebGL context.
   */
  footer?: ReactNode
}

/**
 * The drawer's only list. The entries are external, so each row
 * opens in its own tab and the drawer stays where the visitor left it.
 */
function NewsSection() {
  return (
    <Box as="section" borderTop={HAIRLINE}>
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
          {content.news.label}
        </Box>
        <Box as="span" fontSize="0.75rem" lineHeight={1}>
          ]
        </Box>
      </Flex>

      <UnorderedList m={0} p={0} listStyleType="none">
        {content.news.items.map((entry) => (
          <ListItem key={entry.id}>
            <Link
              href={entry.href}
              isExternal
              display="block"
              px="1.125rem"
              py="0.875rem"
              borderTop={HAIRLINE}
              transition="background 0.2s linear"
              _hover={{ bg: HIGHLIGHT, textDecor: 'none' }}
            >
              <Box
                fontSize="0.5625rem"
                letterSpacing="0.18em"
                textTransform="uppercase"
                color="goldAlt"
                mb="0.375rem"
              >
                {entry.source}
              </Box>
              <Box fontSize="0.8125rem" lineHeight="1.35" color="white">
                {entry.title}
              </Box>
            </Link>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  )
}

export function MenuOverlay({ isOpen, onClose, footer }: MenuOverlayProps) {
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
            borderBottom={{ base: '1.6px solid rgba(255,255,255,0.2)', xl: 'none' }}
          >
            <NavLink
              href="/servicios"
              display={{ base: 'flex', xl: 'none' }}
              alignItems="center"
              h="100%"
              fontSize="0.75rem"
              letterSpacing="widest"
              textTransform="uppercase"
              aria-label="Go to home page"
              onClick={onClose}
            >
              <AnimatedWordmark animate={isOpen} w="auto" h="22px" />
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
            <NewsSection />

            {footer ? (
              <Flex
                h="100%"
                w="100%"
                direction="column"
                justifyContent="flex-end"
                alignItems="flex-end"
                minH="4.6875rem"
                px="1.6875rem"
                py="0.75rem"
              >
                {footer}
              </Flex>
            ) : null}
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}
