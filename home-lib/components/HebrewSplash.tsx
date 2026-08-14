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

/**
 * Hand-off to the scene, timed off the engine's own `LoaderView.animateOut`
 * (`public/assets/js/app.*.js`): the counter snaps to 99 and fades in 500ms,
 * the status letters dissolve one by one, the registration squares collapse
 * back to the middle over 1s, and the whole plate cross-fades out over 2.5s
 * after a 500ms beat. Three seconds, no veil and no particles — the reference
 * does not use any.
 */
const HANDOFF_MS = 3000

/** The two blocks of type, split so each letter can leave on its own beat. */
const PRAYER = ['אלהים יחננו ויברכנו', 'יאר פניו אתנו', 'סלה']
const NAMES = ['יה', 'סאל']

/**
 * Per-letter delay, the engine's `Math.random(0, 500)` — but derived from the
 * index so the server and the client agree on the markup.
 */
function letterDelay(line: number, i: number) {
  return ((line * 7 + i * 37) * 61) % 500
}

/** One span per letter, so the hand-off can dissolve them one at a time. */
function splitLine(line: string, index: number) {
  return [...line].map((char, i) => (
    <span key={i} style={{ transitionDelay: `${letterDelay(index, i)}ms` }}>
      {char}
    </span>
  ))
}

export function HebrewSplash() {
  const [shown, setShown] = useState(false)
  const [fading, setFading] = useState(false)
  const [out, setOut] = useState(false)
  const [gone, setGone] = useState(false)
  const [count, setCount] = useState(0)
  const [lit, setLit] = useState<Record<number, string>>({})
  const startRef = useRef(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setShown(true), 100),
      setTimeout(() => setFading(true), FADE_AT),
      // A beat after the plate starts leaving, so the letters have a state to
      // transition from.
      setTimeout(() => setOut(true), FADE_AT + 20),
      setTimeout(() => setGone(true), FADE_AT + HANDOFF_MS),
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

  if (gone) return null

  const show = shown ? ' show' : ''
  const tens = Math.floor(count / 10)
  const units = count % 10

  return (
    <div id="hebrew-splash" className={`${fading ? ' fade-out' : ''}${out ? ' is-out' : ''}`.trim()}>
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
          {PRAYER.map((line, l) => (
            <p key={l}>{splitLine(line, l)}</p>
          ))}
        </div>
      </div>

      <div className={`hs-yhsal${show}`}>
        {NAMES.map((line, l) => (
          <p key={l}>{splitLine(line, l + PRAYER.length)}</p>
        ))}
      </div>
    </div>
  )
}
