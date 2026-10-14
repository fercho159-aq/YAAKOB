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
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react'
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

/** How long the "copied" tick stays on a share button, in ms. */
const COPIED_MS = 2000

/**
 * Opens a note in a centred popup window over the site. The papers refuse
 * to be framed, so an in-page modal cannot show them. Phones, which have no
 * popup windows, open it as a new tab.
 */
function openPopup(e: MouseEvent<HTMLAnchorElement>, url: string) {
  e.preventDefault()
  const w = Math.min(960, window.screen.availWidth - 40)
  const h = Math.min(820, window.screen.availHeight - 80)
  const left = Math.round((window.screen.availWidth - w) / 2)
  const top = Math.round((window.screen.availHeight - h) / 2)
  window.open(
    url,
    'yk-nota',
    `popup=yes,width=${w},height=${h},left=${left},top=${top},noopener,noreferrer`,
  )
}

/** Hands one note to the OS share sheet, or copies its link. */
function ShareNote({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  async function onClick() {
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title, url })
      } catch {
        // The visitor closed the share sheet.
      }
      return
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), COPIED_MS)
    } catch (error) {
      console.warn(error)
    }
  }

  return (
    <Box
      as="button"
      type="button"
      onClick={onClick}
      aria-label={copied ? 'Enlace copiado' : `Compartir: ${title}`}
      title={copied ? 'Enlace copiado' : 'Compartir'}
      flex="0 0 auto"
      alignSelf="center"
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="2rem"
      h="2rem"
      mr="0.625rem"
      color={copied ? 'white' : 'gold'}
      border="1px solid rgba(255,255,255,0.2)"
      borderRadius="full"
      transition="color 0.2s linear, background 0.2s linear"
      _hover={{ color: 'white', bg: HIGHLIGHT }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {copied ? (
          <path d="M5 12l5 5L20 7" />
        ) : (
          <>
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
          </>
        )}
      </svg>
    </Box>
  )
}

/**
 * The drawer's only list. The entries are external, so each row opens in a
 * popup window and the drawer stays where the visitor left it; the button
 * beside it shares the note.
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
          <ListItem key={entry.id} display="flex" borderTop={HAIRLINE}>
            <Link
              href={entry.href}
              isExternal
              onClick={(e) => openPopup(e, entry.href)}
              flex="1 1 auto"
              display="block"
              px="1.125rem"
              py="0.875rem"
              transition="background 0.2s linear"
              _hover={{ bg: HIGHLIGHT, textDecor: 'none' }}
            >
              <Box
                fontSize="0.5625rem"
                letterSpacing="0.18em"
                textTransform="uppercase"
                color="gold"
                mb="0.375rem"
              >
                {entry.source}
              </Box>
              <Box fontSize="0.8125rem" lineHeight="1.35" color="white">
                {entry.title}
              </Box>
            </Link>
            <ShareNote title={entry.title} url={entry.href} />
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
              data-soft=""
              display={{ base: 'flex', xl: 'none' }}
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
