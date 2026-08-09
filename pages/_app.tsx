import { ChakraProvider } from '@chakra-ui/react'
import { Global } from '@emotion/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import { ContactModalProvider } from '@servicios/components/contact'
import { dinOT, gridnik, wordmark } from '@servicios/fonts'
import theme from '@servicios/theme'

/** Keeps `--vh` in sync with the visual viewport, as the original site does. */
function useViewportHeight() {
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
    }
    setVh()
    window.addEventListener('resize', setVh)
    window.addEventListener('orientationchange', setVh)
    return () => {
      window.removeEventListener('resize', setVh)
      window.removeEventListener('orientationchange', setVh)
    }
  }, [])
}

export default function App({ Component, pageProps }: AppProps) {
  useViewportHeight()

  return (
    <ChakraProvider theme={theme}>
      <Global
        styles={`:root{--font-din-ot:${dinOT.style.fontFamily};--font-gridnik:${gridnik.style.fontFamily};--font-wordmark:${wordmark.style.fontFamily};}`}
      />
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </Head>
      <ContactModalProvider>
        <Component {...pageProps} />
      </ContactModalProvider>
    </ChakraProvider>
  )
}
