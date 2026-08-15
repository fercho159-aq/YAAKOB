import { useEffect } from 'react'

import { intro, logo } from '@home/scene/config'

import { armAmbience, play, preload } from './sfx'

/**
 * The intro's two one-shots, on the same clock as the visuals.
 *
 * Both delays are read off `scene/config` rather than written down here, so
 * retiming the dolly moves the sound with it:
 *
 *   zoom  at `intro.flightDelay`      — the camera starts its push-in
 *   logo  at the wordmark's wipe      — `logo.transition.delay`
 *
 * The room tone is armed at mount and starts on the first gesture.
 *
 * Every file is fetched at mount, not at first play: the zoom is due 5.8s in
 * and the HUD's hover fires the moment the pointer crosses the bar, and
 * neither can afford to wait on a request at that point.
 *
 * Neither of these can play on a page nobody has touched yet, which on the
 * deployed site is every first visit. Each one carries the length of its own
 * move as a grace window, so a click during the intro still lands the sound
 * over the picture it belongs to, and a click after it lands nothing.
 */
export function useIntroSfx() {
  useEffect(() => {
    preload()

    const timers = [
      // Held while the camera is still travelling: 5800 -> 8400.
      window.setTimeout(() => play('zoom', { grace: intro.flightDuration }), intro.flightDelay),
      // Held while the wordmark is still wiping in: 6700 -> 8900.
      window.setTimeout(
        () => play('logo', { grace: logo.transition.duration }),
        logo.transition.delay
      ),
    ]
    const disarm = armAmbience()

    return () => {
      timers.forEach(clearTimeout)
      disarm()
    }
  }, [])
}
