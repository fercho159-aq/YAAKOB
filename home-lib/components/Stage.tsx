import dynamic from 'next/dynamic'
import { useCallback, useRef } from 'react'

/**
 * The home's WebGL stage.
 *
 * Replaces the cloned Hydra engine that used to run here: same scene, rebuilt
 * on react-three-fiber in `home-lib/scene`. The dissolve out to /apps is kept
 * from the old build — the engine fired it from its own UI button, which on
 * this site is the services line, so the scene calls back here instead.
 *
 * Client only: the canvas needs a browser, and pre-rendering it on the server
 * would only produce markup React has to throw away.
 */
const Scene = dynamic(() => import('@home/scene/Scene').then((m) => m.Scene), {
  ssr: false,
})

/** Milliseconds; must stay in step with the CSS animation in home.css. */
const DISSOLVE = 1800
const BLACKOUT_AT = 600

export function Stage() {
  const leavingRef = useRef(false)

  const begin = useCallback(() => {
    if (leavingRef.current) return
    leavingRef.current = true

    const canvas = document.querySelector('canvas')
    const blackout = document.getElementById('yaakob-blackout')

    // Dispersion: bright flash and blur, then fade to dark underneath.
    if (canvas) {
      canvas.style.animation = 'particleDissolve 1.8s cubic-bezier(0.4, 0, 0.2, 1) forwards'
    }
    setTimeout(() => {
      if (blackout) {
        blackout.style.transition = 'opacity 0.8s ease'
        blackout.style.opacity = '1'
      }
    }, BLACKOUT_AT)
    setTimeout(() => {
      window.location.href = '/apps'
    }, DISSOLVE)
  }, [])

  return (
    <>
      <Scene onBegin={begin} />
      <div id="yaakob-blackout" />
    </>
  )
}
