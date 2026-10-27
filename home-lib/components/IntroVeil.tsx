import { useEffect, useState } from 'react'

/**
 * The blue field that carries the hand-off from the loader plate to the scene.
 *
 * The reference cuts straight from `LoaderView`'s plate to the WebGL frame —
 * the plate's own 2.5s cross-fade is the whole transition. That works there
 * because the plate lifts onto a shot that is already full of moving dust. On
 * this build the canvas is still compiling shaders at that moment, so the
 * first second under the plate is a flat wash and the hand-off reads as a cut.
 *
 * This layer fills that second with a plain field of the blue the environment
 * settles on, brighter at the centre where the camera is about to push in.
 * Nothing moves in it; the motion belongs to the dolly that follows. It sits
 * under the plate and over the canvas, so the order on screen is
 * plate -> blue field -> scene, and each one dissolves into the next.
 *
 * Timings are pinned to `HebrewSplash` (FADE_AT 4600, HANDOFF_MS 3000) and to
 * `intro.flightDelay` in home-lib/scene/config: the field is gone before the
 * dolly starts, so nothing overlaps the move itself.
 */

/** When the field starts dissolving — a beat after the plate does. */
const FADE_AT = 4900
/** How long it takes, in CSS and here. Clear by 7500, dolly starts at 7100. */
const FADE_MS = 2600

/** Opacity the wash holds at. Under 1 so the scene bleeds through early. */
const WASH = 0.92

/** The wash, centre out. Sampled off the environment's colour ramp. */
const WASH_INNER = '#b4c5cf'
const WASH_OUTER = '#6f8899'

/**
 * Centred a little above the middle and reaching three quarters of the longer
 * side, so it follows the viewport on resize without any script.
 */
const WASH_GRADIENT = `radial-gradient(circle at 50% 45%, ${WASH_INNER} 0, ${WASH_OUTER} 75vmax)`

export function IntroVeil() {
  const [fading, setFading] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const timers = [
      setTimeout(() => setFading(true), FADE_AT),
      setTimeout(() => setGone(true), FADE_AT + FADE_MS + 200),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  if (gone) return null

  return (
    <div id="intro-veil" className={fading ? 'fade-out' : undefined} aria-hidden="true">
      <div style={{ width: '100%', height: '100%', opacity: WASH, background: WASH_GRADIENT }} />
    </div>
  )
}
