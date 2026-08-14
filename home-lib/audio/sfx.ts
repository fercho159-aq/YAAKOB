/**
 * The home's sound, on the engine's own model.
 *
 * The legacy bundle drives audio through `SFXController`: sounds are
 * registered by name with a source and a volume, then played by name with
 * `{ loop, fadeInDuration }`, and ambience is just a looping sound faded in
 * over 2s. This is the same shape, over plain `Audio` elements — the page
 * plays five short files, which is not worth a WebAudio graph.
 *
 * Autoplay is the one thing the engine did not have to think about and this
 * build does. A page that has never been clicked cannot start audio: the
 * browser rejects `play()`. So:
 *
 *   - the ambience is armed, not played. It starts on the first real gesture,
 *     whenever that comes, and fades in from silence.
 *   - one-shots are fired and forgotten. If the browser refuses, the sound is
 *     dropped rather than queued: a whoosh that lands after the camera has
 *     stopped moving is worse than no whoosh.
 *
 * Nothing here throws. Audio is decoration; a missing file or a blocked call
 * must never take the page down with it.
 */

type SoundName = keyof typeof SOUNDS

/** Registered sounds, with the level each one sits at. */
const SOUNDS = {
  /** Low whoosh under the camera push-in. */
  zoom: { src: '/assets/audio/landing/sfx/sfx_lvl3_zoomsub.mp3', volume: 0.55 },
  /** The hit as the wordmark wipes in. */
  logo: { src: '/assets/audio/landing/sfx/sfx_lvl3_logoAppear.mp3', volume: 0.5 },
  /** Room tone, looped under everything. */
  ambience: { src: '/assets/audio/sfx_lvl1-3-7_amb_1.mp3', volume: 0.28 },
  /** Pointer over a link. Quiet: it fires often. */
  hover: { src: '/assets/audio/sfx_mouseHover.mp3', volume: 0.22 },
  /** Anything being opened or followed. */
  click: { src: '/assets/audio/sfx_menuClick.mp3', volume: 0.4 },
} as const

/** Elements are made on demand and kept, so a file is only fetched once. */
const cache = new Map<SoundName, HTMLAudioElement>()

/** Whether a gesture has landed. Until it has, only arming is possible. */
let unlocked = false
/** Set while the ambience is waiting for that gesture. */
let ambiencePending = false

function element(name: SoundName): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null
  const cached = cache.get(name)
  if (cached) return cached
  const { src, volume } = SOUNDS[name]
  const el = new Audio(src)
  el.preload = 'auto'
  el.volume = volume
  cache.set(name, el)
  return el
}

/** Ramp an element's volume, in ms. Resolves when it lands. */
function fade(el: HTMLAudioElement, to: number, ms: number) {
  const from = el.volume
  if (ms <= 0 || from === to) {
    el.volume = to
    return
  }
  const begin = performance.now()
  const step = () => {
    const t = Math.min(1, (performance.now() - begin) / ms)
    // Equal-power-ish: linear volume ramps read as a jump at the top.
    el.volume = from + (to - from) * (t * t * (3 - 2 * t))
    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

/**
 * Play a registered sound. A no-op if the browser refuses — see the note at
 * the top of the file on why one-shots are not queued.
 */
export function play(name: SoundName, opts: { loop?: boolean; fadeIn?: number } = {}) {
  const el = element(name)
  if (!el) return
  const target = SOUNDS[name].volume
  el.loop = opts.loop ?? false
  // Restart rather than overlap: these are UI sounds, not a music bed.
  try {
    el.currentTime = 0
  } catch {
    // Safari throws if the media is not seekable yet; not worth handling.
  }
  el.volume = opts.fadeIn ? 0 : target
  void el.play().then(
    () => {
      if (opts.fadeIn) fade(el, target, opts.fadeIn)
    },
    () => {
      // Blocked, or the file is missing. Either way the page carries on.
    }
  )
}

/** Fade a sound out and stop it. */
export function stop(name: SoundName, ms = 600) {
  const el = cache.get(name)
  if (!el) return
  fade(el, 0, ms)
  window.setTimeout(() => el.pause(), ms)
}

/**
 * Start the room tone as soon as the page is allowed to make noise: now if a
 * gesture has already landed, otherwise on the first one. Returns a teardown.
 */
export function armAmbience() {
  if (typeof window === 'undefined') return () => {}
  if (ambiencePending) return () => {}
  ambiencePending = true

  const start = () => {
    play('ambience', { loop: true, fadeIn: 2000 })
  }

  if (unlocked) {
    start()
    return () => stop('ambience')
  }

  const onGesture = () => {
    unlocked = true
    start()
    detach()
  }
  const events = ['pointerdown', 'keydown', 'touchstart'] as const
  const detach = () => {
    events.forEach((e) => window.removeEventListener(e, onGesture))
  }
  events.forEach((e) => window.addEventListener(e, onGesture, { once: true, passive: true }))

  return () => {
    detach()
    ambiencePending = false
    stop('ambience')
  }
}

/** Note that the user has interacted, so later one-shots are allowed to try. */
export function markUnlocked() {
  unlocked = true
}

/** True once a gesture has landed. One-shots before that will be dropped. */
export function isUnlocked() {
  return unlocked
}
