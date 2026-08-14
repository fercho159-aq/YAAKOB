import { useEffect, useRef, useState } from 'react'

/**
 * The blue field that carries the hand-off from the loader plate to the scene.
 *
 * The reference cuts straight from `LoaderView`'s plate to the WebGL frame —
 * the plate's own 2.5s cross-fade is the whole transition. That works there
 * because the plate lifts onto a shot that is already full of moving dust. On
 * this build the canvas is still compiling shaders at that moment, so the
 * first second under the plate is a flat wash and the hand-off reads as a cut.
 *
 * This layer fills that second: the same blue the environment settles on, with
 * a field of particles streaming outward on the axis the camera is about to
 * travel. It sits under the plate and over the canvas, so the order on screen
 * is plate -> blue field -> scene, and each one dissolves into the next.
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

/** Particle field. Depth is in the same sense as the camera's: smaller = nearer. */
const COUNT = 190
const NEAR = 0.12
const FAR = 1
/** Depth units per second — the rate the field streams past. */
const SPEED = 0.085

/** The wash, centre out. Sampled off the environment's colour ramp. */
const WASH_INNER = '#b4c5cf'
const WASH_OUTER = '#6f8899'
/** Particles, drawn additively over the wash. */
const DUST = '#dce9f2'

type Mote = { x: number; y: number; z: number; seed: number }

function seedField(): Mote[] {
  const out: Mote[] = []
  for (let i = 0; i < COUNT; i++) {
    out.push({
      // Angle + radius rather than a square, so the field reads as a cone
      // opening toward the viewer instead of a grid drifting apart.
      x: Math.cos((i * 2.399) % (Math.PI * 2)) * (0.15 + Math.random() * 1.35),
      y: Math.sin((i * 2.399) % (Math.PI * 2)) * (0.15 + Math.random() * 1.35),
      z: NEAR + Math.random() * (FAR - NEAR),
      seed: Math.random(),
    })
  }
  return out
}

/** One soft dot, pre-rendered once and blitted per particle. */
function makeSprite() {
  const size = 64
  const sprite = document.createElement('canvas')
  sprite.width = sprite.height = size
  const ctx = sprite.getContext('2d')
  if (!ctx) return sprite
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, DUST)
  g.addColorStop(0.35, 'rgba(220, 233, 242, 0.45)')
  g.addColorStop(1, 'rgba(220, 233, 242, 0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  return sprite
}

export function IntroVeil() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [fading, setFading] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const timers = [
      setTimeout(() => setFading(true), FADE_AT),
      setTimeout(() => setGone(true), FADE_AT + FADE_MS + 200),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    const sprite = makeSprite()
    const field = seedField()
    let width = 0
    let height = 0
    let dpr = 1

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    let raf = 0
    let last = performance.now()

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      // Wash. Redrawn each frame rather than left in CSS so the particles
      // composite against it and not against whatever is behind the canvas.
      const g = ctx.createRadialGradient(
        width / 2,
        height * 0.45,
        0,
        width / 2,
        height * 0.45,
        Math.max(width, height) * 0.75
      )
      g.addColorStop(0, WASH_INNER)
      g.addColorStop(1, WASH_OUTER)
      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = 1
      ctx.fillStyle = g
      ctx.fillRect(0, 0, width, height)

      // The field. Perspective divide by depth, so motes accelerate and swell
      // as they pass — the same read the camera dolly gives a moment later.
      ctx.globalCompositeOperation = 'lighter'
      const scale = Math.max(width, height) * 0.45
      for (const mote of field) {
        if (!reduced) {
          mote.z -= SPEED * dt
          if (mote.z <= NEAR) {
            mote.z = FAR
            mote.seed = Math.random()
          }
        }
        const x = width / 2 + (mote.x / mote.z) * scale * 0.35
        const y = height * 0.45 + (mote.y / mote.z) * scale * 0.35
        if (x < -80 || x > width + 80 || y < -80 || y > height + 80) continue
        const r = (2.4 + mote.seed * 5.5) / mote.z
        // Fade in from the far plane and back out as they leave frame, so
        // nothing pops at either end.
        const depth = (FAR - mote.z) / (FAR - NEAR)
        ctx.globalAlpha = 0.5 * Math.min(1, depth * 3) * (1 - Math.pow(depth, 4))
        ctx.drawImage(sprite, x - r, y - r, r * 2, r * 2)
      }

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  if (gone) return null

  return (
    <div id="intro-veil" className={fading ? 'fade-out' : undefined} aria-hidden="true">
      <canvas ref={canvasRef} style={{ opacity: WASH }} />
    </div>
  )
}
