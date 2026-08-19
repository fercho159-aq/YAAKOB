import { Box, Link, SimpleGrid, Text } from '@chakra-ui/react'
import Head from 'next/head'
import NextLink from 'next/link'
import { AnimatedHeading } from '@servicios/components/home/AnimatedHeading'
import { MotionArticle } from '@servicios/components/home/motion'
import { ScrambleText } from '@servicios/components/ui/ScrambleText'
import Layout from '@servicios/components/layout/Layout'
import content from '@servicios/data/content.json'
import legal from '@servicios/data/legal.json'

/**
 * Puntos 10 y 16 de la validación técnica de Openpay: domicilio fiscal,
 * teléfono y correo de soporte visibles sin abrir un modal ni descargar nada.
 * La tarjeta de contacto flotante sigue existiendo; esta página es su versión
 * estática, indexable y enlazada desde el pie de todas las páginas.
 */

const COLUMN_WIDTH = { base: `${(315 / 375) * 100}%`, xl: '46rem' }
const HAIRLINE = '1px solid rgba(255,255,255,0.14)'

const labelProps = {
  fontSize: '0.625rem',
  fontWeight: 'semibold',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'goldAlt',
} as const

const valueProps = {
  mt: '0.5rem',
  fontSize: { base: '0.875rem', xl: '0.9375rem' },
  lineHeight: { base: '1.375rem', xl: '1.5rem' },
  letterSpacing: '0.02em',
  color: 'rgba(255,255,255,0.86)',
} as const

const noteProps = {
  mt: '0.875rem',
  fontSize: { base: '0.8125rem', xl: '0.875rem' },
  lineHeight: { base: '1.375rem', xl: '1.5rem' },
  letterSpacing: '0.02em',
  color: 'rgba(255,255,255,0.78)',
} as const

type Entry = {
  label: string
  lines: string[]
  href?: string
}

const { responsable } = legal

const ENTRIES: Entry[] = [
  { label: 'Razón social', lines: [responsable.denominacion, `RFC: ${responsable.rfc}`] },
  {
    label: 'Domicilio fiscal y de atención',
    lines: [responsable.domicilioFiscal],
  },
  {
    label: 'Teléfonos',
    lines: responsable.telefonos,
    href: `tel:${responsable.telefonos[0].replace(/[^+\d]/g, '')}`,
  },
  {
    label: 'WhatsApp',
    lines: [responsable.whatsapp],
    href: `https://wa.me/${responsable.whatsapp.replace(/[^\d]/g, '')}`,
  },
  { label: 'Correo electrónico', lines: [responsable.correo], href: `mailto:${responsable.correo}` },
  { label: 'Horario de atención', lines: ['Lunes a viernes', '9:00 a 18:00 h (tiempo del centro de México)'] },
]

const LEGAL_LINKS = [
  { href: '/terminos', label: 'Términos y condiciones' },
  { href: '/privacidad', label: 'Aviso de privacidad' },
  { href: '/cancelaciones', label: 'Cancelaciones y reembolsos' },
]

function Field({ entry }: { entry: Entry }) {
  const body = (
    <Text {...valueProps}>
      {entry.lines.map((line) => (
        <Box key={line} as="span" display="block">
          {line}
        </Box>
      ))}
    </Text>
  )

  return (
    <Box>
      <Text {...labelProps}>{entry.label}</Text>
      {entry.href ? (
        <Link
          href={entry.href}
          {...(/^https?:/.test(entry.href) ? { isExternal: true, rel: 'noopener noreferrer' } : {})}
          _hover={{ color: 'gold', textDecor: 'none' }}
        >
          {body}
        </Link>
      ) : (
        body
      )}
    </Box>
  )
}

export default function Contacto() {
  const { site } = content
  const title = `${site.title} | Contacto`
  const description =
    'Datos de contacto de Yaakob Consultores, S.C.: domicilio fiscal en Ciudad de México, teléfonos, WhatsApp, correo de soporte y horario de atención.'
  const url = `${site.url}/contacto`

  return (
    <Layout backgroundVariant="play">
      <Head>
        <title key="page-title">{title}</title>
        <meta key="page-title-meta" name="title" content={title} />
        <meta key="description" name="description" content={description} />
        <link key="icon" rel="icon" type="image/png" href="/favicon.png" />
        <link key="canonical" rel="canonical" href={url} />
        <meta key="og-type" property="og:type" content="website" />
        <meta key="og-title" property="og:title" content={title} />
        <meta key="og-description" property="og:description" content={description} />
        <meta key="og-url" property="og:url" content={url} />
        <meta key="og-image" property="og:image" content={site.shareImage} />
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
          <Text {...labelProps}>Atención a clientes y soporte</Text>
          <Box
            as="h1"
            mt="0.625rem"
            fontSize={{ base: '1.5rem', xl: '2rem' }}
            fontWeight="normal"
            lineHeight={{ base: '1.875rem', xl: '2.375rem' }}
          >
            <ScrambleText text="Contacto" duration={1} display="inline" />
          </Box>
          <Text {...noteProps}>
            Para dudas sobre el sitio, sobre una suscripción o sobre un cargo, escríbanos o llámenos por
            cualquiera de estos medios. Respondemos en horario de oficina.
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing="1.75rem" mt="2.5rem">
          {ENTRIES.map((entry) => (
            <Field key={entry.label} entry={entry} />
          ))}
        </SimpleGrid>

        <Box as="section" mt="3rem" pt="1.5rem" borderTop={HAIRLINE}>
          <AnimatedHeading>Pagos en línea</AnimatedHeading>
          <Text {...noteProps}>
            Se hace uso de Openpay como pasarela de pagos. Los datos de la tarjeta se capturan y tokenizan en
            su navegador con autenticación 3D Secure del banco emisor, y no se almacenan en los servidores de
            Yaakob. Las condiciones de cobro, cancelación y reembolso están en los documentos siguientes.
          </Text>
          <Box mt="1.25rem" display="flex" flexWrap="wrap" gap="1.25rem">
            {LEGAL_LINKS.map((entry) => (
              <Link
                key={entry.href}
                as={NextLink}
                href={entry.href}
                fontSize="0.75rem"
                letterSpacing="0.16em"
                textTransform="uppercase"
                color="gold"
                _hover={{ color: 'white', textDecor: 'none' }}
              >
                {entry.label} →
              </Link>
            ))}
          </Box>
        </Box>
      </MotionArticle>
    </Layout>
  )
}
