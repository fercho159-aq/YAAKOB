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
 *   - one-shots are fired, and held only as long as they still mean something.
 *     A blocked sound waits for the first gesture with a deadline attached —
 *     the moment its picture leaves the screen, it is dropped. A whoosh that
 *     lands after the camera has stopped moving is worse than no whoosh, but
 *     one that lands while it is still travelling is the sound working.
 *
 * That last point is not a corner case in production. Chrome decides autoplay
 * per origin, and a dev machine has spent weeks earning the localhost origin
 * the right to make noise — so the intro sounds locally and is silent on the
 * real domain, on identical code. The deadline is what makes the deployed
 * page behave like the one in front of you.
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
/**
 * Whether the room tone is supposed to be sounding.
 *
 * Kept apart from whether it actually is: the tone is meant to hold for the
 * whole visit, and everything that can knock it over — a refused `play`, a
 * call coming in on a phone, the OS handing audio to another app — knocks over
 * the fact, not the intent. `ensureAmbience` is what closes the gap.
 */
let ambienceWanted = false
/** One-shots the browser refused, each with the time it stops being worth playing. */
const pending = new Map<SoundName, number>()
/** Whether the listener that flushes `pending` is already attached. */
let waitingOnGesture = false

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

/**
 * Build every registered sound's element now rather than on first play.
 *
 * Without this the first hover pays for a round trip and lands after the
 * pointer has already moved on, which reads as the sound being broken rather
 * than late. Five files, ~550KB total; the browser gives media a low fetch
 * priority, so this sits behind the scene's own assets rather than racing them.
 */
export function preload() {
  if (typeof window === 'undefined') return
  ;(Object.keys(SOUNDS) as SoundName[]).forEach(element)
}

/**
 * Ramp an element's volume, in ms.
 *
 * Backed by rAF, which a hidden tab does not run — a fade started there would
 * stall part-way and leave the volume wherever it stopped. Nobody can hear the
 * ramp in that case anyway, so snap instead.
 */
function fade(el: HTMLAudioElement, to: number, ms: number) {
  const from = el.volume
  if (ms <= 0 || from === to || document.hidden) {
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
 * Fire any held one-shot whose moment has not passed, and forget the rest.
 *
 * Called on the gesture that lifts the autoplay block. Deadlines are absolute
 * times on the same clock `play` stamped them with, so a visitor who clicks
 * ten seconds late gets silence rather than a whoosh over a still frame.
 */
function flushPending() {
  const now = performance.now()
  const due = [...pending.entries()].filter(([, deadline]) => now <= deadline)
  pending.clear()
  due.forEach(([name]) => play(name))
}

/** Attach the one-shot listener that lets a held sound through. */
function waitForGesture() {
  if (waitingOnGesture) return
  waitingOnGesture = true
  const events = ['pointerdown', 'keydown', 'touchstart'] as const
  const onGesture = () => {
    waitingOnGesture = false
    events.forEach((e) => window.removeEventListener(e, onGesture))
    markUnlocked()
  }
  events.forEach((e) => window.addEventListener(e, onGesture, { once: true, passive: true }))
}

/**
 * Play a registered sound.
 *
 * `grace` is how long past this instant the sound still matches what is on
 * screen. Give it one and a blocked sound is held for that window instead of
 * dropped; leave it off and a refusal is final, which is what every sound
 * answering a click wants — the click already unlocked the page, so a failure
 * there is a real failure.
 */
export function play(
  name: SoundName,
  opts: { loop?: boolean; fadeIn?: number; grace?: number } = {}
) {
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
      // Blocked, or the file is missing. Hold it if it was given a window and
      // the page has never been touched — that is the autoplay case, and the
      // one a gesture can still rescue.
      if (opts.grace && !unlocked) {
        pending.set(name, performance.now() + opts.grace)
        waitForGesture()
      }
    }
  )
}

/** Fade a sound out and stop it. */
export function stop(name: SoundName, ms = 600) {
  // Before the pause, not after: the `pause` handler reads this to tell a
  // stop we asked for from one done to us.
  if (name === 'ambience') ambienceWanted = false
  const el = cache.get(name)
  if (!el) return
  fade(el, 0, ms)
  window.setTimeout(() => el.pause(), ms)
}

/**
 * Put the room tone back on if it is meant to be playing and is not.
 *
 * Every route to silence ends here, so there is one recovery path instead of
 * one per accident. Safe to call at any time: it does nothing when the tone is
 * already sounding, when the page has stopped wanting it, or when the tab is
 * hidden and the silence is deliberate.
 *
 * A refusal re-arms the gesture listener rather than giving up. The first
 * attempt on a page nobody has touched is expected to fail; the tone starting
 * on the click that follows is the normal path, not the fallback.
 */
function ensureAmbience(fadeMs: number) {
  if (!ambienceWanted) return
  const el = element('ambience')
  if (!el || document.hidden || !el.paused) return
  el.loop = true
  el.volume = 0
  void el.play().then(
    () => fade(el, SOUNDS.ambience.volume, fadeMs),
    () => waitForGesture()
  )
}

/**
 * The tone stopped without us asking. Something outside the page did it: audio
 * handed to another app, a call, a decoder giving up mid-file. Take it back.
 */
function onInterrupted() {
  // Short ramp — this is a hole being closed, not an entrance.
  ensureAmbience(300)
}

/**
 * Park the room tone while the tab is in the background and bring it back on
 * return.
 *
 * A loop left running in a tab nobody is looking at is the fastest way to get
 * a site muted at the browser level, so the pause is hard and immediate — a
 * fade would need rAF, which is frozen there anyway. Coming back is the part
 * that has to be gentle, so that side ramps from silence.
 */
function onVisibility() {
  if (!ambienceWanted) return
  if (document.hidden) {
    cache.get('ambience')?.pause()
    return
  }
  ensureAmbience(600)
}

/**
 * Hold the room tone under the page for as long as it is mounted.
 *
 * It starts as soon as the browser allows noise — now if a gesture has already
 * landed, otherwise on the first one — and from then on it is kept up rather
 * than merely started: a refusal waits for the next gesture, an interruption
 * is taken back, a tab switch parks it and returning resumes it. Returns a
 * teardown that ends the intent and fades the tone out.
 */
export function armAmbience() {
  if (typeof window === 'undefined') return () => {}
  if (ambiencePending) return () => {}
  ambiencePending = true
  ambienceWanted = true

  const el = element('ambience')
  el?.addEventListener('pause', onInterrupted)
  el?.addEventListener('ended', onInterrupted)
  document.addEventListener('visibilitychange', onVisibility)

  // The entrance is the one slow fade; every later recovery is quick.
  ensureAmbience(2000)

  return () => {
    ambiencePending = false
    document.removeEventListener('visibilitychange', onVisibility)
    el?.removeEventListener('pause', onInterrupted)
    el?.removeEventListener('ended', onInterrupted)
    stop('ambience')
  }
}

/**
 * Note that the user has interacted, so later one-shots are allowed to try,
 * and let through anything held while they had not.
 */
export function markUnlocked() {
  unlocked = true
  if (pending.size) flushPending()
  // The gesture that lets the page make noise is also the one the room tone
  // has been waiting for, whether this is its first chance or its fifth.
  ensureAmbience(2000)
}

/** True once a gesture has landed. One-shots before that will be dropped. */
export function isUnlocked() {
  return unlocked
}
