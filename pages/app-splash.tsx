import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'

/**
 * The home's WebGL scene on its own, for the mobile app's splash screen.
 *
 * The app loads this in a WebView so its opening frame is the same scene the
 * site opens on: no HUD, no legal bar, no analytics and no Hebrew loader plate
 * — the app has its own. The clock starts partway into the intro so the shot
 * is already pushing in when the WebView appears (`?t=` overrides, in ms).
 */
const Scene = dynamic(() => import('@home/scene/Scene').then((m) => m.Scene), {
  ssr: false,
})

const DEFAULT_SHIFT = 7000

export default function AppSplash() {
  const router = useRouter()
  const t = Number(router.query.t)
  const timeShift = Number.isFinite(t) && t >= 0 ? t : DEFAULT_SHIFT

  // Tell the host (React Native WebView, or an iframe parent on web) that the
  // scene is actually on screen, so it can lift its placeholder.
  const handleReady = useCallback(() => {
    const w = window as Window & { ReactNativeWebView?: { postMessage: (m: string) => void } }
    w.ReactNativeWebView?.postMessage('yk-splash-ready')
    if (window.parent !== window) window.parent.postMessage('yk-splash-ready', '*')
  }, [])

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
      {router.isReady ? <Scene timeShift={timeShift} onReady={handleReady} /> : null}
    </>
  )
}
