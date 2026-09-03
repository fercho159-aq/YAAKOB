import { Box } from '@chakra-ui/react'
import Head from 'next/head'
import { AppHero, DemoCta, FEATURES, FeatureGrid, StepTour } from '@servicios/components/apps'
import Layout from '@servicios/components/layout/Layout'
import content from '@servicios/data/content.json'

/**
 * Landing de la app móvil: el póster "La app que te acompaña" del cliente
 * (doce funciones con globo y captura), el onboarding del Resumen SAT y el
 * botón de demo, que lleva a /start (splash + tiendas).
 */
export default function Apps() {
  const { site } = content
  const title = 'La app que te acompaña | Yaakob'
  const description =
    'Consulta, calcula, comprende y actúa desde una sola app: RFC, adeudos, DOF, resumen de documentos del SAT, validación biométrica y citas con tu consultor fiscal.'
  const url = `${site.url}/apps`
  const shareImage = `${site.url}${FEATURES[0].screen.src}`

  return (
    <Layout fluxColor="#4f74c9" backgroundVariant="index">
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
        <meta key="og-image" property="og:image" content={shareImage} />
      </Head>

      <Box
        as="article"
        maxW="90rem"
        mx="auto"
        px={{ base: 0, xl: '3rem' }}
        pt={{ base: '5.5rem', xl: '7rem' }}
        pb={{ base: '12rem', xl: '11rem' }}
      >
        <AppHero />
        <FeatureGrid />
        <StepTour />
      </Box>
      <DemoCta />
    </Layout>
  )
}
