import { useEffect, useRef, useState } from 'react'

/**
 * Entry loader, rebuilt to the layout airforceecho.com uses (same engine family
 * as the site this home was ported from), with the Hebrew alphabet in place of
 * the reference's latin one:
 *
 *   the divine names in the reference's logo slot, 50px from the top
 *   500px wrapper, centred:
 *     450px box with a registration square at each corner
 *     380px field where single letters blink in and out
 *     the two-digit counter, 230px, white, behind everything
 *     the prayer over it, where the reference runs its status line
 * Both the names and the prayer are set the way the client's "Oracion
 * TELEFONO" sheet has them: unpointed, three lines.
 *
 * Measured off the reference at 1920x992: squares 12px with a 1px #0b1c26 rule
 * and a 2px dot, letters 18px at 0.5 alpha, counter 230px/23px tracking, title
 * 20px/24px with 4px tracking. Everything scales with `--hs-k` under 1100px.
 */

/** Scribe-hand alphabet the field draws from. */
const ALEPHBET = 'אבגדהוזחטיכלמנסעפצקרשת'.split('')

/**
 * Cells of the 380px field: a 5x5 grid of 50x18 slots, minus the middle band
 * the title sits on. 82.5px pitch puts the last column flush with the edge.
 */
const CELLS = (() => {
  const out: Array<{ x: number; y: number }> = []
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      if (row === 2 && col > 0 && col < 4) continue
      out.push({ x: col * 82.5, y: row * 90.5 })
    }
  }
  return out
})()

/** How many letters are lit at once, and how long each one stays. */
const LIT = 7
const BLINK_MS = 420

/** Total run, and the slice of it the counter takes to reach 99. */
const COUNT_MS = 4200
const FADE_AT = 4600
/** The hand-off to the scene: two seconds of blue and snow. */
const HANDOFF_MS = 2000
const GONE_AT = FADE_AT + HANDOFF_MS

/** One flake per this many square pixels of viewport. */
const FLAKE_DENSITY = 9000

export function HebrewSplash() {
  const [shown, setShown] = useState(false)
  const [fading, setFading] = useState(false)
  const [gone, setGone] = useState(false)
  const [count, setCount] = useState(0)
  const [lit, setLit] = useState<Record<number, string>>({})
  const startRef = useRef(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const timers = [
      setTimeout(() => setShown(true), 100),
      setTimeout(() => setFading(true), FADE_AT),
      setTimeout(() => setGone(true), GONE_AT),
    ]

    // Counter: eased so it crawls at the end, the way the reference does.
    startRef.current = performance.now()
    const tick = () => {
      const t = Math.min(1, (performance.now() - startRef.current) / COUNT_MS)
      setCount(Math.floor(99 * (1 - Math.pow(1 - t, 2.2))))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    let raf = requestAnimationFrame(tick)

    // Field: a fresh handful of letters every beat.
    const blink = setInterval(() => {
      const next: Record<number, string> = {}
      const pool = [...CELLS.keys()]
      for (let i = 0; i < LIT && pool.length; i++) {
        const [cell] = pool.splice(Math.floor(Math.random() * pool.length), 1)
        next[cell] = ALEPHBET[Math.floor(Math.random() * ALEPHBET.length)]
      }
      setLit(next)
    }, BLINK_MS)

    return () => {
      timers.forEach(clearTimeout)
      cancelAnimationFrame(raf)
      clearInterval(blink)
    }
  }, [])

  /**
   * Hand-off to the scene: two seconds where the flat ground turns blue and
   * clears off the WebGL page, with snow drifting down over it. The intro's
   * own marks just fade; nothing happens to the lettering itself.
   */
  useEffect(() => {
    if (!fading) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const dpr = Math.min(2, window.devicePixelRatio || 1)
    const w = window.innerWidth
    const h = window.innerHeight
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    ctx.scale(dpr, dpr)

    // Flakes start spread over the frame and a screen-height above it, so the
    // fall reads as already under way when the veil turns.
    const count = Math.round((w * h) / FLAKE_DENSITY)
    const flakes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h * 2 - h,
      r: 1 + Math.random() * 2.2,
      fall: 40 + Math.random() * 110,
      sway: 6 + Math.random() * 22,
      rate: 0.6 + Math.random() * 1.4,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.45 + Math.random() * 0.55,
    }))

    const begin = performance.now()
    let raf = 0
    const draw = () => {
      const t = (performance.now() - begin) / 1000
      const p = Math.min(1, t / (HANDOFF_MS / 1000))
      // In over the first fifth, out over the last third.
      const envelope = Math.min(1, p / 0.2) * Math.min(1, (1 - p) / 0.35)

      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#ffffff'
      for (const f of flakes) {
        const x = f.x + Math.sin(f.phase + t * f.rate) * f.sway
        const y = f.y + f.fall * t
        if (y > h + 4) continue
        ctx.globalAlpha = f.alpha * envelope
        ctx.beginPath()
        ctx.arc(x, y, f.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      if (p < 1) raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => cancelAnimationFrame(raf)
  }, [fading])

  if (gone) return null

  const show = shown ? ' show' : ''
  const tens = Math.floor(count / 10)
  const units = count % 10

  return (
    <div id="hebrew-splash" ref={rootRef} className={fading ? 'fade-out' : undefined}>
      <div className="hs-bg" />

      <div className="hs-wrapper">
        <div className="hs-squares">
          <span className={`hs-square${show}`} />
          <span className={`hs-square${show}`} />
          <span className={`hs-square${show}`} />
          <span className={`hs-square${show}`} />
        </div>

        <div className="hs-field" aria-hidden="true">
          {CELLS.map((c, i) => (
            <span
              key={i}
              className={`hs-cell${lit[i] ? ' on' : ''}`}
              style={{ transform: `translate(${c.x}px, ${c.y}px)` }}
            >
              {lit[i] ?? ''}
            </span>
          ))}
        </div>

        <div className={`hs-count${show}`} aria-hidden="true">
          <span>{tens}</span>
          <span>{units}</span>
        </div>

        <div className={`hs-prayer${show}`}>
          <p>אלהים יחננו ויברכנו</p>
          <p>יאר פניו אתנו</p>
          <p>סלה</p>
        </div>
      </div>

      <div className={`hs-yhsal${show}`}>
        <p>יה</p>
        <p>סאל</p>
      </div>

      <canvas className="hs-particles" ref={canvasRef} aria-hidden="true" />
    </div>
  )
}
