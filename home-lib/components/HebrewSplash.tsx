import { useEffect, useState } from 'react'

/** Drifting letters, at the positions and delays the legacy page shipped. */
const FLOATS: Array<{ glyph: string; style: React.CSSProperties }> = [
  { glyph: 'נ', style: { top: '15%', left: '70%', animationDelay: '0s', animationDuration: '3s' } },
  { glyph: 'ח', style: { top: '25%', left: '72%', animationDelay: '0.18s', animationDuration: '4s' } },
  { glyph: 'ל', style: { top: '38%', left: '58%', animationDelay: '0.36s', animationDuration: '5s' } },
  { glyph: 'פ', style: { top: '75%', left: '30%', animationDelay: '0.54s', animationDuration: '3s' } },
  { glyph: 'כ', style: { top: '20%', left: '25%', animationDelay: '0.72s', animationDuration: '4s' } },
  { glyph: 'ע', style: { top: '60%', left: '78%', animationDelay: '0.9s', animationDuration: '5s' } },
  { glyph: 'ם', style: { top: '80%', left: '65%', animationDelay: '1.08s', animationDuration: '3s' } },
  { glyph: 'ד', style: { top: '50%', left: '15%', animationDelay: '1.26s', animationDuration: '4s' } },
  { glyph: 'ר', style: { top: '68%', left: '45%', animationDelay: '1.44s', animationDuration: '5s' } },
  { glyph: 'ב', style: { top: '12%', left: '48%', animationDelay: '1.62s', animationDuration: '3s' } },
  { glyph: 'א', style: { top: '45%', left: '85%', animationDelay: '1.8s', animationDuration: '4s' } },
  { glyph: 'י', style: { top: '85%', left: '18%', animationDelay: '1.98s', animationDuration: '5s' } },
]

/**
 * Entry overlay: the psalm frame the site ran before the home was rebuilt on
 * react-three-fiber — grey field, big מ watermark, registration corners,
 * drifting letters, "booting" status and Psalm 67 at the foot.
 *
 * Same markup, styles and timings as the legacy `public/app.html`: everything
 * fades in at 100ms, the frame fades out at 4.5s and unmounts at 5.5s onto the
 * WebGL scene, which it never touches.
 */
export function HebrewSplash() {
  const [shown, setShown] = useState(false)
  const [fading, setFading] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const timers = [
      setTimeout(() => setShown(true), 100),
      setTimeout(() => setFading(true), 4500),
      setTimeout(() => setGone(true), 5500),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  if (gone) return null

  const show = shown ? ' show' : ''
  return (
    <div id="hebrew-splash" className={fading ? 'fade-out' : undefined}>
      <div className="hs-bg-glyph">מ</div>
      <div className={`hs-corner hs-corner--tl${show}`} />
      <div className={`hs-corner hs-corner--tr${show}`} />
      <div className={`hs-corner hs-corner--bl${show}`} />
      <div className={`hs-corner hs-corner--br${show}`} />
      {FLOATS.map((f, i) => (
        <span key={i} className={`hs-float${show}`} style={f.style}>
          {f.glyph}
        </span>
      ))}
      <div className={`hs-center${show}`}>
        <p className="hs-status">מאתחל _</p>
        <p className="hs-status">_ מערכת</p>
      </div>
      <div className={`hs-psalm${show}`}>
        <p>אֱלֹהִים יְחָנֵּנוּ וִיבָרְכֵנוּ יָאֵר פָּנָיו אִתָּנוּ סֶלָה</p>
        <p>לָדַעַת בָּאָרֶץ דַּרְכֶּךָ בְּכָל גּוֹיִם יְשׁוּעָתֶךָ</p>
        <p>יוֹדוּךָ עַמִּים אֱלֹהִים יוֹדוּךָ עַמִּים כֻּלָּם</p>
      </div>
    </div>
  )
}
