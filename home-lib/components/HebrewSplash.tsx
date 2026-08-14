import { useEffect, useState } from 'react'

const FLOATS: Array<{ glyph: string; style: React.CSSProperties }> = [
  { glyph: 'ש', style: { top: '34%', left: '50%', animationDelay: '0s', animationDuration: '3s' } },
  { glyph: 'ק', style: { top: '36%', left: '22%', animationDelay: '0.18s', animationDuration: '4s' } },
  { glyph: 'צ', style: { top: '37%', left: '79%', animationDelay: '0.36s', animationDuration: '5s' } },
  { glyph: 'כ', style: { top: '58%', left: '68%', animationDelay: '0.54s', animationDuration: '3s' } },
  { glyph: 'ק', style: { top: '61%', left: '28%', animationDelay: '0.72s', animationDuration: '4s' } },
]

/** The brand flower, tinted ink via CSS mask over /logo.png. */
function Flower({ className }: { className: string }) {
  return <div className={className} aria-hidden="true" />
}

/**
 * Entry sequence, per the client's mocks:
 *  1. "intro" — flat grey-blue frame, flower mark + YAAKOB.
 *  2. "hebrew" — the psalm frame: יה/סאל up top, the blessing over a faint 20,
 *     corner registration marks, drifting letters, the mark again at the foot.
 * Then the whole overlay fades and unmounts onto the WebGL scene.
 */
export function HebrewSplash() {
  const [phase, setPhase] = useState<'intro' | 'hebrew'>('intro')
  const [shown, setShown] = useState(false)
  const [fading, setFading] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const timers = [
      setTimeout(() => setShown(true), 100),
      setTimeout(() => setPhase('hebrew'), 2400),
      setTimeout(() => setFading(true), 6800),
      setTimeout(() => setGone(true), 7800),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  if (gone) return null

  const show = shown ? ' show' : ''
  return (
    <div
      id="hebrew-splash"
      className={`${phase === 'hebrew' ? 'phase-hebrew' : ''}${fading ? ' fade-out' : ''}`}
    >
      {/* Phase 1 — the brand card. */}
      <div className={`hs-intro${phase === 'intro' ? ' show' : ''}`}>
        <Flower className="hs-flower hs-flower--intro" />
        <div className="hs-brand">
          <span className="hs-brand-name">YAAKOB</span>
        </div>
      </div>

      {/* Phase 2 — the psalm card. */}
      <div className={`hs-hebrew${phase === 'hebrew' ? ' show' : ''}`}>
        <div className="hs-yhsal">
          <span>יה</span>
          <span>סאל</span>
        </div>
        <div className={`hs-corner hs-corner--tl${show}`} />
        <div className={`hs-corner hs-corner--tr${show}`} />
        <div className={`hs-corner hs-corner--bl${show}`} />
        <div className={`hs-corner hs-corner--br${show}`} />
        {FLOATS.map((f, i) => (
          <span key={i} className={`hs-float${show}`} style={f.style}>
            {f.glyph}
          </span>
        ))}
        <div className="hs-psalm-wrap">
          <div className="hs-watermark">20</div>
          <div className="hs-psalm">
            <p>אֱלֹהִים יְחָנֵּנוּ וִיבָרְכֵנוּ</p>
            <p>יָאֵר פָּנָיו אִתָּנוּ</p>
            <p>סֶלָה</p>
          </div>
        </div>
        <div className="hs-foot">
          <Flower className="hs-flower hs-flower--foot" />
          <div className="hs-brand hs-brand--foot">
            <span className="hs-brand-name">YAAKOB</span>
          </div>
        </div>
      </div>
    </div>
  )
}
