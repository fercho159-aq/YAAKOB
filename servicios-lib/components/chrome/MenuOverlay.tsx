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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  UnorderedList,
} from '@chakra-ui/react'
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react'
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

/** Query parameter that opens a note on arrival: `/servicios?nota=<id>`. */
const NOTE_PARAM = 'nota'

type NewsEntry = (typeof content.news.items)[number]

/**
 * The id in `?nota=`. Empty on the server and while hydrating, so the markup
 * matches; React re-reads it in the browser right after.
 */
function useNoteParam() {
  return useSyncExternalStore(
    () => () => {},
    () => new URLSearchParams(window.location.search).get(NOTE_PARAM) ?? '',
    () => '',
  )
}

/**
 * Hands one note to the OS share sheet, or copies its link. The link is to
 * this site, which opens the note in its modal — never the paper's own page,
 * so whoever receives it lands on YAAKOB first.
 */
function ShareNote({ title, id }: { title: string; id: string }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  async function onClick() {
    const url = `${window.location.origin}/servicios?${NOTE_PARAM}=${encodeURIComponent(id)}`
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
 * A note in a modal over the site. Papers that allow framing (`embed` in
 * content.json, checked against their X-Frame-Options) show inside an iframe;
 * the rest refuse to render there, so the modal offers the headline and a
 * link to read it on the paper's own site.
 */
/** `2026-08-27` → `27 de agosto de 2026`, read as a calendar date (no timezone shift). */
function formatNoteDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })
}

/**
 * Our own write-up of a note whose paper refuses framing: the facts in our
 * words, a YAAKOB comment set apart, and the original credited at the foot.
 */
function NoteArticle({ entry }: { entry: NewsEntry }) {
  const body = entry.body ?? []
  const note = entry.note ?? null
  const date = entry.date ? formatNoteDate(entry.date) : null

  return (
    <Box maxW="40rem" mx="auto" px={{ base: '1.125rem', xl: '1.5rem' }} py="1.5rem">
      {body.map((paragraph) => (
        <Box as="p" key={paragraph} mb="1rem" fontSize="0.9375rem" lineHeight="1.65" color="rgba(255,255,255,0.88)">
          {paragraph}
        </Box>
      ))}
      {note ? (
        <Box as="aside" mt="1.5rem" p="1rem 1.125rem" bg="rgba(255,255,255,0.05)" borderLeft="2px solid" borderColor="gold">
          <Box fontSize="0.5625rem" letterSpacing="0.18em" textTransform="uppercase" color="gold" mb="0.5rem">
            Comentario YAAKOB
          </Box>
          <Box as="p" fontSize="0.875rem" lineHeight="1.6">
            {note}
          </Box>
        </Box>
      ) : null}
      <Box mt="1.75rem" pt="1rem" borderTop={HAIRLINE} fontSize="0.75rem" lineHeight="1.5" color="rgba(255,255,255,0.6)">
        Fuente: {entry.source}
        {date ? `, ${date}` : ''}.{' '}
        <Link href={entry.href} isExternal color="gold" _hover={{ color: 'white' }}>
          Leer la nota original ↗
        </Link>
      </Box>
    </Box>
  )
}

function NewsModal({ entry, onClose }: { entry: NewsEntry | null; onClose: () => void }) {
  const isArticle = entry !== null && !entry.embed && Boolean(entry.body)
  return (
    <Modal
      isOpen={entry !== null}
      onClose={onClose}
      size={isArticle ? '3xl' : '6xl'}
      isCentered
      scrollBehavior="inside"
    >
      <ModalOverlay bg="rgba(0,0,0,0.75)" />
      <ModalContent
        bg="grey1"
        color="white"
        border={HAIRLINE}
        borderRadius={0}
        mx={{ base: '0.5rem', xl: '2rem' }}
        h={entry?.embed ? { base: '92dvh', xl: '88vh' } : 'auto'}
        maxH={{ base: '92dvh', xl: '88vh' }}
        display="flex"
        flexDir="column"
        overflow="hidden"
      >
        {entry ? (
          <>
            <ModalHeader
              display="flex"
              alignItems="center"
              gap="0.75rem"
              p="0.875rem 3.5rem 0.875rem 1.125rem"
              borderBottom={HAIRLINE}
              fontWeight="normal"
            >
              <Box flex="1 1 auto" minW={0}>
                <Box fontSize="0.5625rem" letterSpacing="0.18em" textTransform="uppercase" color="gold" mb="0.25rem">
                  {entry.source}
                </Box>
                <Box fontSize="0.875rem" lineHeight="1.35" noOfLines={2}>
                  {entry.title}
                </Box>
              </Box>
              <ShareNote title={entry.title} id={entry.id} />
            </ModalHeader>
            <ModalCloseButton top="1.125rem" right="0.75rem" color="gold" _hover={{ color: 'white' }} />
            <ModalBody p={0} flex="1 1 auto" display="flex" flexDir="column" overflowY="auto">
              {isArticle ? <NoteArticle entry={entry} /> : null}
              {entry.embed ? (
                <Box
                  as="iframe"
                  src={entry.href}
                  title={entry.title}
                  flex="1 1 auto"
                  w="100%"
                  border={0}
                  bg="white"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              ) : null}
              {isArticle ? null : (
                <Flex
                  align="center"
                  justify={entry.embed ? 'flex-end' : 'flex-start'}
                  gap="1rem"
                  px="1.125rem"
                  py={entry.embed ? '0.625rem' : '1.5rem'}
                  borderTop={entry.embed ? HAIRLINE : undefined}
                  fontSize="0.75rem"
                  flexWrap="wrap"
                >
                  {entry.embed ? null : (
                    <Box flex="1 1 16rem" color="rgba(255,255,255,0.7)" lineHeight="1.4">
                      {entry.source} no permite mostrar sus notas dentro de otros sitios.
                    </Box>
                  )}
                  <Link
                    href={entry.href}
                    isExternal
                    color="gold"
                    letterSpacing="0.14em"
                    textTransform="uppercase"
                    fontSize="0.6875rem"
                    _hover={{ color: 'white' }}
                  >
                    Leer en {entry.source} ↗
                  </Link>
                </Flex>
              )}
            </ModalBody>
          </>
        ) : null}
      </ModalContent>
    </Modal>
  )
}

/**
 * The drawer's only list. Each row opens its note in a modal (above) so the
 * visitor never leaves the site; the button beside it shares the note.
 */
function NewsSection({ onOpenNote }: { onOpenNote: (entry: NewsEntry) => void }) {
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
              onClick={(e) => {
                e.preventDefault()
                onOpenNote(entry)
              }}
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
            <ShareNote title={entry.title} id={entry.id} />
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  )
}

export function MenuOverlay({ isOpen, onClose, footer }: MenuOverlayProps) {
  // Outside the drawer, so a shared link (`?nota=`) opens its note straight
  // away without the drawer behind it.
  const sharedId = useNoteParam()
  const [picked, setPicked] = useState<NewsEntry | null>(null)
  const [dismissed, setDismissed] = useState(false)
  const shared = dismissed ? null : (content.news.items.find((n) => n.id === sharedId) ?? null)
  const note = picked ?? shared

  function closeNote() {
    setPicked(null)
    setDismissed(true)
    // Drop `?nota=` so a reload does not raise the note again.
    const url = new URL(window.location.href)
    if (url.searchParams.has(NOTE_PARAM)) {
      url.searchParams.delete(NOTE_PARAM)
      window.history.replaceState(window.history.state, '', url)
    }
  }

  return (
    <>
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
              <NewsSection onOpenNote={setPicked} />

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
      <NewsModal entry={note} onClose={closeNote} />
    </>
  )
}
