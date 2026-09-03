import { Box, Flex, Text } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { MotionBox, NavLink } from '@servicios/components/chrome/motion'
import { DEMO_HREF, FEATURES, STEPS } from './data'
import { PhoneShot } from './PhoneShot'

const BLUE = '#1e4bff'
const NAVY = '#0f1a3a'
const BAR_ON = 'linear-gradient(90deg, #1e4bff 0%, #19d3ff 100%)'
const BAR_OFF = '#d9dde3'
const CARD = '#f4f6f9'

const resumen = FEATURES.find((f) => f.id === 'resumen-sat')!

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <path d="M5 12h13M12 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const ctaStyles = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.6rem',
  h: '3rem',
  px: '1.75rem',
  borderRadius: 'full',
  bg: 'linear-gradient(90deg, #1a3cff 0%, #19c8ff 100%)',
  color: 'white',
  fontFamily: 'var(--font-din-ot)',
  fontWeight: 700,
  fontSize: '1rem',
  boxShadow: '0 10px 24px -8px rgba(26,60,255,0.7), inset 0 1px 0 rgba(255,255,255,0.35)',
  transition: 'transform 0.2s ease, filter 0.2s ease',
  _hover: { transform: 'translateY(-1px)', filter: 'brightness(1.06)', textDecor: 'none' },
  _active: { transform: 'translateY(0)' },
} as const

/**
 * Cómo se genera el Resumen SAT en cinco pasos. El paso se cambia con las
 * barras, con el botón o con la ×, que regresa al primero. En el último paso
 * el botón deja de avanzar y lleva a la demo.
 */
export function StepTour() {
  const [index, setIndex] = useState(0)
  const step = STEPS[index]
  const last = index === STEPS.length - 1

  return (
    <Box as="section" aria-labelledby="apps-pasos" mt={{ base: '3.5rem', xl: '2rem' }}>
      <Text
        id="apps-pasos"
        as="h2"
        fontSize="0.625rem"
        fontWeight="semibold"
        letterSpacing="0.22em"
        textTransform="uppercase"
        color="gold"
        px={{ base: '1.125rem', xl: 0 }}
      >
        [ Cómo funciona el Resumen SAT ]
      </Text>

      <Flex
        mt="1.5rem"
        px={{ base: '1.125rem', xl: 0 }}
        direction={{ base: 'column', lg: 'row' }}
        align={{ base: 'stretch', lg: 'center' }}
        gap={{ base: '2rem', lg: '3rem' }}
      >
        {/* Tarjeta del paso */}
        <Box flex="1 1 0" order={{ base: 0, lg: 1 }} pos="relative">
          <Box
            pos="relative"
            bg={CARD}
            borderRadius="1.5rem"
            p={{ base: '1.25rem', md: '1.75rem' }}
            boxShadow="0 30px 60px -30px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.5) inset"
            _after={{
              content: '""',
              pos: 'absolute',
              left: { base: '50%', lg: '3rem' },
              bottom: '-0.8rem',
              w: '1.6rem',
              h: '1.6rem',
              bg: CARD,
              transform: 'translateX(-50%) rotate(45deg)',
              borderRadius: '0.25rem',
            }}
          >
            <Flex align="center" gap="0.6rem" pr="3rem">
              {STEPS.map((s, i) => (
                <Box
                  key={s.title}
                  as="button"
                  type="button"
                  aria-label={`Ir al paso ${i + 1}`}
                  aria-current={i === index ? 'step' : undefined}
                  flex="1 1 0"
                  h="0.55rem"
                  borderRadius="full"
                  bg={i <= index ? BAR_ON : BAR_OFF}
                  boxShadow={i <= index ? '0 2px 6px rgba(30,75,255,0.4)' : 'inset 0 1px 2px rgba(0,0,0,0.08)'}
                  transition="background 0.3s ease"
                  onClick={() => setIndex(i)}
                  cursor="pointer"
                />
              ))}
            </Flex>
            <Box
              as="button"
              type="button"
              aria-label="Reiniciar los pasos"
              pos="absolute"
              top="1.1rem"
              right="1.1rem"
              w="2.25rem"
              h="2.25rem"
              borderRadius="full"
              bg="white"
              color="#3a4250"
              boxShadow="0 4px 12px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,1)"
              fontSize="1.1rem"
              lineHeight={1}
              cursor="pointer"
              _hover={{ color: NAVY }}
              onClick={() => setIndex(0)}
            >
              ×
            </Box>

            <Box minH={{ base: '13rem', md: '11.5rem' }} pos="relative" mt="1.25rem" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <MotionBox
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                >
                  <Text
                    fontFamily="var(--font-din-ot)"
                    fontWeight={700}
                    fontSize="0.8rem"
                    letterSpacing="0.06em"
                    color={BLUE}
                    textTransform="uppercase"
                  >
                    Paso {index + 1} de {STEPS.length}
                  </Text>
                  <Text
                    as="h3"
                    mt="0.35rem"
                    fontFamily="var(--font-din-ot)"
                    fontWeight={800}
                    fontSize={{ base: '1.5rem', md: '1.85rem' }}
                    lineHeight={1.1}
                    color={NAVY}
                  >
                    {step.title}
                  </Text>
                  <Text
                    mt="0.75rem"
                    fontFamily="var(--font-din-ot)"
                    fontSize={{ base: '0.95rem', md: '1.05rem' }}
                    lineHeight={1.5}
                    color="#4b5563"
                  >
                    {step.body}
                  </Text>
                </MotionBox>
              </AnimatePresence>
            </Box>

            <Flex justify="flex-end" mt="1.25rem">
              {last ? (
                <NavLink href={DEMO_HREF} {...ctaStyles}>
                  {step.cta}
                  <Arrow />
                </NavLink>
              ) : (
                <Box as="button" type="button" {...ctaStyles} onClick={() => setIndex(index + 1)}>
                  {step.cta}
                  <Arrow />
                </Box>
              )}
            </Flex>
          </Box>
        </Box>

        {/* Teléfono */}
        <Box
          flex={{ base: '0 0 auto', lg: '0 0 18rem' }}
          w={{ base: 'min(62vw, 16rem)', lg: '18rem' }}
          alignSelf="center"
          order={{ base: 1, lg: 0 }}
          mt={{ base: '1.5rem', lg: 0 }}
        >
          <PhoneShot screen={resumen.screen} sizes="(min-width: 48em) 18rem, 62vw" />
        </Box>
      </Flex>
    </Box>
  )
}
