import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  Text,
} from '@chakra-ui/react'
import Head from 'next/head'
import NextLink from 'next/link'
import { useRef, useState } from 'react'
import { MotionArticle } from '@servicios/components/home/motion'
import { ScrambleText } from '@servicios/components/ui/ScrambleText'
import Layout from '@servicios/components/layout/Layout'
import content from '@servicios/data/content.json'

/**
 * Mecanismo de cancelación en el sitio.
 *
 * La sección 8 de los términos y la política de cancelaciones prometen que
 * cancelar es claro y accesible; esta pantalla es esa promesa. Pide el folio de
 * la suscripción y el correo con el que se contrató —— ver la nota sobre
 * autorización en `app/api/pagos/cancelar/route.ts`.
 */

const COLUMN_WIDTH = { base: `${(315 / 375) * 100}%`, xl: '34rem' }
const HAIRLINE = '1px solid rgba(255,255,255,0.14)'

const etiqueta = {
  fontSize: '0.625rem',
  fontWeight: 'semibold',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.6)',
  mb: '0.375rem',
} as const

const cuerpo = {
  fontSize: { base: '0.8125rem', xl: '0.875rem' },
  lineHeight: { base: '1.375rem', xl: '1.5rem' },
  letterSpacing: '0.02em',
  color: 'rgba(255,255,255,0.78)',
} as const

const campo = {
  bg: 'rgba(255,255,255,0.04)',
  border: '1px solid',
  borderColor: 'rgba(255,255,255,0.16)',
  borderRadius: '2px',
  h: '2.75rem',
  fontSize: '0.9375rem',
  _hover: { borderColor: 'rgba(255,255,255,0.28)' },
  _focus: { borderColor: 'gold' },
  _placeholder: { color: 'rgba(255,255,255,0.28)' },
} as const

export default function Cancelar() {
  const [correo, setCorreo] = useState('')
  const [folio, setFolio] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [resultado, setResultado] = useState<{ ok: boolean; mensaje: string } | null>(null)
  const enVuelo = useRef(false)

  async function enviar(evento: React.FormEvent) {
    evento.preventDefault()
    if (enVuelo.current) return
    enVuelo.current = true
    setEnviando(true)
    setResultado(null)

    try {
      const respuesta = await fetch('/api/pagos/cancelar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: correo.trim(), suscripcionId: folio.trim() }),
      })
      const datos = (await respuesta.json()) as { ok?: boolean; mensaje?: string }
      setResultado({
        ok: Boolean(datos.ok),
        mensaje: datos.mensaje ?? 'No pudimos completar la cancelación.',
      })
    } catch {
      setResultado({
        ok: false,
        mensaje:
          'No pudimos conectar con el servidor. Escríbanos a contacto@yaakob.com y lo resolvemos.',
      })
    } finally {
      setEnviando(false)
      enVuelo.current = false
    }
  }

  return (
    <Layout backgroundVariant="play">
      <Head>
        <title key="page-title">{`${content.site.title} | Cancelar suscripción`}</title>
        <meta key="robots" name="robots" content="noindex, nofollow" />
        <link key="icon" rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <MotionArticle
        w={COLUMN_WIDTH}
        mx="auto"
        mt={{ base: '4.5rem', md: '5.625rem' }}
        pb={{ base: '3rem', xl: '4rem' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Box as="header" pb="1.5rem" borderBottom={HAIRLINE}>
          <Text {...etiqueta} color="goldAlt">
            Suscripciones
          </Text>
          <Box
            as="h1"
            mt="0.625rem"
            fontSize={{ base: '1.5rem', xl: '2rem' }}
            fontWeight="normal"
            lineHeight={{ base: '1.875rem', xl: '2.375rem' }}
          >
            <ScrambleText text="Cancelar suscripción" duration={1} display="inline" />
          </Box>
          <Text {...cuerpo} mt="1rem">
            La cancelación surte efecto de inmediato para los cobros futuros. Conserva el acceso
            hasta el final del periodo que ya pagó. No necesita darnos una explicación.
          </Text>
        </Box>

        {resultado ? (
          <Alert
            status={resultado.ok ? 'success' : 'error'}
            bg={resultado.ok ? 'rgba(63,178,127,0.14)' : 'rgba(210,86,79,0.14)'}
            color={resultado.ok ? '#8fe0bb' : '#ffb4ae'}
            borderRadius="2px"
            mt="2rem"
          >
            <AlertIcon color={resultado.ok ? '#8fe0bb' : '#ffb4ae'} />
            <Text fontSize="0.8125rem">{resultado.mensaje}</Text>
          </Alert>
        ) : null}

        {!resultado?.ok ? (
          <Box as="form" onSubmit={enviar} mt="2rem" noValidate>
            <FormControl>
              <FormLabel {...etiqueta}>Correo con el que contrató</FormLabel>
              <Input
                {...campo}
                type="email"
                inputMode="email"
                autoComplete="email"
                maxLength={120}
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </FormControl>

            <FormControl mt="1rem">
              <FormLabel {...etiqueta}>Folio de la suscripción</FormLabel>
              <Input
                {...campo}
                maxLength={64}
                value={folio}
                placeholder="El que le enviamos al confirmar el pago"
                onChange={(e) => setFolio(e.target.value)}
              />
            </FormControl>

            <Button
              type="submit"
              mt="1.75rem"
              w="100%"
              h="3rem"
              borderRadius="2px"
              bg="gold"
              color="#111316"
              fontSize="0.75rem"
              fontWeight="bold"
              letterSpacing="0.18em"
              textTransform="uppercase"
              isDisabled={enviando || correo.trim() === '' || folio.trim() === ''}
              isLoading={enviando}
              loadingText="Cancelando…"
              _hover={{ bg: 'goldAlt' }}
              _disabled={{ bg: 'rgba(255,153,51,0.35)', cursor: 'not-allowed' }}
            >
              Cancelar mi suscripción
            </Button>
          </Box>
        ) : null}

        <Box mt="2.5rem" pt="1.5rem" borderTop={HAIRLINE}>
          <Text {...cuerpo} fontSize="0.75rem">
            ¿No encuentra su folio? Escríbanos a contacto@yaakob.com desde el correo con el que
            contrató, o llame al +52 55 9008 6360 de lunes a viernes de 9:00 a 18:00 h. También
            cancelamos por esa vía.
          </Text>
          <Link
            as={NextLink}
            href="/cancelaciones"
            display="inline-block"
            mt="1.25rem"
            fontSize="0.75rem"
            letterSpacing="0.16em"
            textTransform="uppercase"
            color="gold"
            _hover={{ color: 'white', textDecor: 'none' }}
          >
            Ver la política completa →
          </Link>
        </Box>
      </MotionArticle>
    </Layout>
  )
}
