import { ColorModeScript } from '@chakra-ui/react'
import Document, { Head, Html, Main, NextScript } from 'next/document'
import theme from '@servicios/theme'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="es">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          {/* Adobe Fonts kit used by the home's cloned WebGL experience */}
          <link rel="stylesheet" href="https://use.typekit.net/awh6wkx.css" />
        </Head>
        <body>
          <noscript>
            <iframe
              title="Google Analytics Embed"
              src="https://www.googletagmanager.com/gtag/js?id=GTM-MJWLZF8"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
