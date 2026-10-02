// One-off: empareja el mockup 01 (splash) de la pasarela con los demás. Es
// otro modelo de teléfono y venía más grande (816x1652 contra 804x1630). El
// original NO se toca: se escribe 01-ajustada.webp junto a él.
// Run with `node scripts/normalize-pasarela.mjs`. sharp viene con Next 16.
import sharp from 'sharp'
import { join } from 'node:path'

const DIR = join(process.cwd(), 'public', 'app', 'pasarela')

// Lienzo y caja de referencia (08-12): 940x1672, teléfono de 1630 px de alto
// centrado en x≈470 con ~21 px arriba.
const CANVAS = { width: 940, height: 1672 }
const PHONE_HEIGHT = 1630
const CENTER_X = 470.5
const TOP = 21

// Caja del teléfono sólido (alfa > 200) y caja de todo lo visible (alfa > 0,
// incluye antialias y sombra suave) para no recortar bordes.
async function boxes(file) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const solid = { x0: Infinity, y0: Infinity, x1: -1, y1: -1 }
  const any = { x0: Infinity, y0: Infinity, x1: -1, y1: -1 }
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const a = data[(y * info.width + x) * 4 + 3]
      for (const [box, ok] of [[solid, a > 200], [any, a > 0]]) {
        if (!ok) continue
        if (x < box.x0) box.x0 = x
        if (y < box.y0) box.y0 = y
        if (x > box.x1) box.x1 = x
        if (y > box.y1) box.y1 = y
      }
    }
  }
  return { solid, any }
}

for (const n of ['01']) {
  const src = join(DIR, `${n}.webp`)
  const { solid, any } = await boxes(src)
  const solidH = solid.y1 - solid.y0 + 1
  const solidW = solid.x1 - solid.x0 + 1
  const k = PHONE_HEIGHT / solidH

  const anyW = any.x1 - any.x0 + 1
  const anyH = any.y1 - any.y0 + 1
  const outW = Math.round(anyW * k)
  const outH = Math.round(anyH * k)
  const piece = await sharp(src)
    .extract({ left: any.x0, top: any.y0, width: anyW, height: anyH })
    .resize({ width: outW, height: outH, kernel: 'lanczos3' })
    .png()
    .toBuffer()

  // Coloca la caja sólida (escalada) centrada en CENTER_X y a TOP del borde.
  const left = Math.round(CENTER_X - (solidW * k) / 2 - (solid.x0 - any.x0) * k)
  const top = Math.round(TOP - (solid.y0 - any.y0) * k)

  const out = join(DIR, `${n}-ajustada.webp`)
  const info = await sharp({ create: { ...CANVAS, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: piece, left, top }])
    .webp({ quality: 82, alphaQuality: 100, effort: 6 })
    .toFile(out)
  console.log(n, { factor: k.toFixed(4), left, top, kb: Math.round(info.size / 1024) })
}

// El 04 (Registro) tiene el bisel derecho más delgado que el izquierdo
// (~42 px contra ~52), y se ve "angosto hacia el lado derecho". Se ensancha
// solo el bisel: la franja negra interior (columna STRETCH_X, a la derecha
// del borde de la pantalla) se repite GROW px y lo que queda a su derecha se
// recorre. Después se recentra el teléfono en el mismo lienzo. Escribe
// 04-ajustada.webp y deja 04.webp intacto.
{
  const STRETCH_X = 834
  const GROW = 8
  const src = join(DIR, '04.webp')
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width: W, height: H } = info
  const out = Buffer.alloc(W * H * 4)
  const shift = Math.floor(GROW / 2)
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      // Coordenada de origen: hasta STRETCH_X igual, luego GROW repeticiones
      // de esa columna, luego el resto recorrido. Todo movido shift a la izquierda.
      const dx = x + shift
      const sx = dx <= STRETCH_X ? dx : dx <= STRETCH_X + GROW ? STRETCH_X : dx - GROW
      if (sx < 0 || sx >= W) continue
      data.copy(out, (y * W + x) * 4, (y * W + sx) * 4, (y * W + sx) * 4 + 4)
    }
  }
  const info2 = await sharp(out, { raw: { width: W, height: H, channels: 4 } })
    .webp({ quality: 82, alphaQuality: 100, effort: 6 })
    .toFile(join(DIR, '04-ajustada.webp'))
  console.log('04', { grow: GROW, shift, kb: Math.round(info2.size / 1024) })
}
