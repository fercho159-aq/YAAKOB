import { BufferAttribute, BufferGeometry } from 'three'

/**
 * MSDF text, the way the engine drew every glyph on the page.
 *
 * `assets/fonts/*.json` are plain BMFont descriptors paired with a multi-channel
 * signed distance field atlas, so a line of text is just a quad per glyph with
 * uvs into that atlas. The engine's `msdf.glsl` does the rest at draw time.
 */
interface FontChar {
  id: number
  char: string
  x: number
  y: number
  width: number
  height: number
  xoffset: number
  yoffset: number
  xadvance: number
}

interface Font {
  chars: FontChar[]
  common: { lineHeight: number; base: number; scaleW: number; scaleH: number }
  kernings?: { first: number; second: number; amount: number }[]
}

export interface TextLayout {
  geometry: BufferGeometry
  /** Width of the laid-out line, in font units. */
  width: number
}

export async function loadFont(url: string): Promise<Font> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`font ${url}: ${res.status}`)
  return (await res.json()) as Font
}

/**
 * Lays a single line out centred on the origin, in font units (the atlas' own
 * pixel scale). Callers scale the mesh to whatever width they need.
 *
 * `letterSpacing` is a fraction of the font size, matching the engine's
 * `letterSpacing` style value.
 */
export function layoutText(font: Font, text: string, letterSpacing = 0): TextLayout {
  const byChar = new Map(font.chars.map((c) => [c.char, c]))
  const kernings = new Map(
    (font.kernings ?? []).map((k) => [`${k.first}:${k.second}`, k.amount])
  )
  const tracking = letterSpacing * font.common.lineHeight

  const glyphs: { char: FontChar; x: number }[] = []
  let cursor = 0
  let previous: FontChar | undefined

  for (const character of text) {
    const glyph = byChar.get(character)
    if (!glyph) continue
    if (previous) cursor += kernings.get(`${previous.id}:${glyph.id}`) ?? 0
    if (glyph.width > 0 && glyph.height > 0) glyphs.push({ char: glyph, x: cursor })
    cursor += glyph.xadvance + tracking
    previous = glyph
  }

  const width = cursor - tracking
  const { scaleW, scaleH, base } = font.common

  const positions = new Float32Array(glyphs.length * 4 * 3)
  const uvs = new Float32Array(glyphs.length * 4 * 2)
  const indices = new Uint16Array(glyphs.length * 6)

  glyphs.forEach(({ char, x }, i) => {
    // Centre the line horizontally and sit the baseline on the origin.
    const x0 = x + char.xoffset - width / 2
    const x1 = x0 + char.width
    const y0 = base - char.yoffset
    const y1 = y0 - char.height

    const u0 = char.x / scaleW
    const u1 = (char.x + char.width) / scaleW
    // BMFont measures v from the top; three's textures start at the bottom.
    const v0 = 1 - char.y / scaleH
    const v1 = 1 - (char.y + char.height) / scaleH

    const p = i * 12
    positions.set([x0, y1, 0, x1, y1, 0, x1, y0, 0, x0, y0, 0], p)

    const t = i * 8
    uvs.set([u0, v1, u1, v1, u1, v0, u0, v0], t)

    const v = i * 4
    indices.set([v, v + 1, v + 2, v, v + 2, v + 3], i * 6)
  })

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(positions, 3))
  geometry.setAttribute('uv', new BufferAttribute(uvs, 2))
  geometry.setIndex(new BufferAttribute(indices, 1))
  geometry.computeBoundingSphere()

  return { geometry, width }
}
