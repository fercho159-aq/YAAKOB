import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState } from 'react'

/**
 * The scene on its own, for the mobile app's splash screen: the home page
 * renders this instead of the full experience when opened with `?app=1`.
 * No HUD, no dissolve-out: the app decides when to leave.
 */
const Scene = dynamic(() => import('@home/scene/Scene').then((m) => m.Scene), {
  ssr: false,
})

/** Where the intro clock starts when `?t=` is absent, in ms. */
const DEFAULT_SHIFT = 7000

export function SplashStage() {
  // Read on the client only: the page is static, so there is no query at
  // render time.
  const [timeShift, setTimeShift] = useState<number | null>(null)
  useEffect(() => {
    const t = Number(new URLSearchParams(window.location.search).get('t'))
    setTimeShift(Number.isFinite(t) && t >= 0 ? t : DEFAULT_SHIFT)
  }, [])

  // Tell the host (React Native WebView, or an iframe parent on web) that the
  // scene is actually on screen, so it can lift its placeholder.
  const handleReady = useCallback(() => {
    const w = window as Window & { ReactNativeWebView?: { postMessage: (m: string) => void } }
    w.ReactNativeWebView?.postMessage('yk-splash-ready')
    if (window.parent !== window) window.parent.postMessage('yk-splash-ready', '*')
  }, [])

  if (timeShift === null) return null
  return <Scene timeShift={timeShift} onReady={handleReady} />
}
