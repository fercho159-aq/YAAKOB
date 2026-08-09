import {
  Box,
  Flex,
  Grid,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { WhatsappLogo } from '@servicios/components/svg'
import content from '@servicios/data/content.json'
import { CONTACT_ICONS, ScaleIcon } from './icons'

const { contact } = content

const CARD_BORDER = 'rgba(255,255,255,0.07)'
const CARD_BG = 'rgba(255,255,255,0.025)'
const LABEL = '#8A8F99'

interface ContactField {
  id: string
  icon: string
  label: string
  lines: string[]
  href?: string
}

/** Every row is the same card; only the ones with an `href` are clickable. */
function ContactCard({ field }: { field: ContactField }) {
  const Glyph = CONTACT_ICONS[field.icon]
  const isExternal = Boolean(field.href?.startsWith('http'))

  const card = (
    <Flex
      align="center"
      gap={4}
      h="100%"
      px={4}
      py={3}
      bg={CARD_BG}
      border="1px solid"
      borderColor={CARD_BORDER}
      borderRadius="14px"
      transition="border-color 0.3s ease-out, background 0.3s ease-out"
      _hover={field.href ? { borderColor: 'goldAlt', bg: 'rgba(224,190,122,0.06)' } : undefined}
    >
      <Flex
        align="center"
        justify="center"
        flexShrink={0}
        w="42px"
        h="42px"
        borderRadius="12px"
        bg="rgba(224,190,122,0.09)"
        border="1px solid"
        borderColor="rgba(224,190,122,0.18)"
        color="gold"
      >
        {Glyph ? <Glyph w="20px" h="20px" /> : null}
      </Flex>
      <Box minW={0}>
        <Text
          fontFamily="var(--font-gridnik)"
          fontSize="0.5625rem"
          letterSpacing="0.22em"
          textTransform="uppercase"
          color={LABEL}
          mb={1}
        >
          {field.label}
        </Text>
        {field.lines.map((line) => (
          <Text key={line} fontSize="0.875rem" lineHeight="1.35" color="white">
            {line}
          </Text>
        ))}
      </Box>
    </Flex>
  )

  if (!field.href) return card

  return (
    <Link
      href={field.href}
      isExternal={isExternal}
      display="block"
      h="100%"
      _hover={{ textDecor: 'none' }}
      _focusVisible={{ boxShadow: 'outline', borderRadius: '14px' }}
    >
      {card}
    </Link>
  )
}

export interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

/** The contact card, shown as an overlay on top of whatever page is open. */
export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="inside" size="5xl">
      <ModalOverlay bg="rgba(0,0,0,0.78)" backdropFilter="blur(6px)" />
      <ModalContent
        bg="grey1"
        color="white"
        border="1px solid"
        borderColor="rgba(255,255,255,0.09)"
        borderRadius="18px"
        overflow="hidden"
        mx={[3, null, 6]}
        my={[4, null, 8]}
        maxH="calc(var(--vh, 1vh) * 92)"
        boxShadow="2xl"
      >
        <Flex
          align="center"
          gap={3}
          px={[4, null, 6]}
          py={4}
          borderBottom="1px solid"
          borderColor="rgba(255,255,255,0.08)"
          flexShrink={0}
        >
          {/* The mark ships as black line art on white, so it needs its own light disc. */}
          <Flex
            align="center"
            justify="center"
            flexShrink={0}
            w="36px"
            h="36px"
            borderRadius="full"
            bg="white"
            overflow="hidden"
          >
            <Image src="/logo.png" alt="" w="30px" h="30px" objectFit="contain" />
          </Flex>
          <Text fontSize="1rem" fontWeight="medium" letterSpacing="0.01em">
            {contact.title}
          </Text>
        </Flex>
        <ModalCloseButton top={4} right={4} color={LABEL} _hover={{ color: 'white', bg: 'transparent' }} />

        <ModalBody px={[4, null, 8]} py={[5, null, 6]}>
          <Text
            as="h2"
            fontFamily="heading"
            fontWeight="bold"
            fontSize={['1.5rem', null, '1.875rem', null, '2.25rem']}
            lineHeight="1.1"
            letterSpacing="-0.02em"
            mb={[5, null, 6]}
          >
            {contact.heading}
          </Text>

          <Grid templateColumns={['1fr', null, null, '1fr 1fr 0.85fr']} gap={[3, null, 3.5]} alignItems="stretch">
            <Grid
              templateColumns={['1fr', null, '1fr 1fr', null, null]}
              gap={[3, null, 3.5]}
              gridColumn={[null, null, null, 'span 2']}
              gridAutoRows="1fr"
            >
              {(contact.fields as ContactField[]).map((field) => (
                <ContactCard key={field.id} field={field} />
              ))}
            </Grid>

            <Flex
              direction="column"
              align="center"
              justify="center"
              gap={5}
              px={5}
              py={7}
              bg={CARD_BG}
              border="1px solid"
              borderColor={CARD_BORDER}
              borderRadius="14px"
            >
              <Link
                href={contact.qr.href}
                isExternal
                pos="relative"
                p={4}
                bg="white"
                borderRadius="10px"
                border="2px dashed"
                borderColor="rgba(255,255,255,0.35)"
                aria-label="Abrir WhatsApp"
              >
                <Image
                  src={contact.qr.src}
                  alt="Código QR de WhatsApp de Yaakob Consultores"
                  w={['150px', null, '180px']}
                  h={['150px', null, '180px']}
                />
                <Flex
                  pos="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  align="center"
                  justify="center"
                  w="44px"
                  h="44px"
                  borderRadius="full"
                  bg="white"
                >
                  <WhatsappLogo w="34px" h="34px" background="transparent" />
                </Flex>
              </Link>
              <Text fontSize="0.8125rem" color="#B9BDC6" textAlign="center" maxW="14rem">
                {contact.qr.caption}
              </Text>
            </Flex>
          </Grid>
        </ModalBody>

        <Box
          px={[4, null, 8]}
          py={5}
          borderTop="1px solid"
          borderColor="rgba(255,255,255,0.08)"
          bg="rgba(255,255,255,0.02)"
          flexShrink={0}
        >
          <Flex align="center" gap={2} mb={2} color="gold">
            <ScaleIcon w="16px" h="16px" />
            <Text
              fontFamily="var(--font-gridnik)"
              fontSize="0.5625rem"
              letterSpacing="0.22em"
              textTransform="uppercase"
            >
              {contact.legal.label}
            </Text>
          </Flex>
          <Text fontSize="0.6875rem" lineHeight="1.7" color={LABEL}>
            {contact.legal.body}
          </Text>
          <Text
            mt={4}
            fontFamily="var(--font-gridnik)"
            fontSize="0.5625rem"
            letterSpacing="0.18em"
            textTransform="uppercase"
            color="#6C717B"
            textAlign="center"
          >
            [ {contact.signature} ]
          </Text>
        </Box>
      </ModalContent>
    </Modal>
  )
}
