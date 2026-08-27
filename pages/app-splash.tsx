import { SplashStage } from '@home/components'
import Head from 'next/head'
import { useEffect } from 'react'

/**
 * The home's WebGL scene on its own, for the mobile app's splash screen.
 *
 * The app loads this in a WebView so its opening frame is the same scene the
 * site opens on: no HUD, no legal bar, no analytics and no Hebrew loader plate
 * — the app has its own. The clock starts partway into the intro so the shot
 * is already pushing in when the WebView appears (`?t=` overrides, in ms).
 */
export default function AppSplash() {
  useEffect(() => {
    document.documentElement.classList.add('yk-home')
    return () => document.documentElement.classList.remove('yk-home')
  }, [])

  return (
    <>
      <Head>
        <title>Yaakob</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="theme-color" content="#a8b6bd" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <SplashStage />
    </>
  )
}
