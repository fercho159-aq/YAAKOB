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
 */
export function useIntroSfx() {
  useEffect(() => {
    preload()

    const timers = [
      window.setTimeout(() => play('zoom'), intro.flightDelay),
      window.setTimeout(() => play('logo'), logo.transition.delay),
    ]
    const disarm = armAmbience()

    return () => {
      timers.forEach(clearTimeout)
      disarm()
    }
  }, [])
}
