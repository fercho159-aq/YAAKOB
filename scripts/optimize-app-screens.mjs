// One-off: turns the client's APP_WEBP phone renders into web-sized WebP
// under public/app. Run with `node scripts/optimize-app-screens.mjs`.
// sharp comes with Next 16, so nothing to install.
import sharp from 'sharp'
import { readdirSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { homedir } from 'node:os'

const SRC = join(homedir(), 'Downloads', 'APP_WEBP')
const ICONS = join(homedir(), 'Downloads', 'Iconos_APP_WEBP')
const OUT = join(process.cwd(), 'public', 'app', 'screens')
mkdirSync(OUT, { recursive: true })

const SLUGS = {
  1: 'presentacion',
  2: 'registro-rfc',
  3: 'bienvenida',
  4: 'chat-consultor',
  5: 'resumen-sat',
  6: 'consulta-rfc',
  7: 'calculadora-rfc',
  8: 'calculadora-adeudos',
  9: 'validacion-biometrica',
  10: 'consulta-dof',
  11: 'explicacion-legal',
  12: 'agenda-cita',
}

const results = []
for (const file of readdirSync(SRC)) {
  const m = /^(\d+)\(/.exec(file)
  if (!m) continue
  const n = Number(m[1])
  const name = `${String(n).padStart(2, '0')}-${SLUGS[n]}.webp`
  const info = await sharp(join(SRC, file))
    .trim()
    .resize({ height: 1400, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(join(OUT, name))
  results.push({ n, name, width: info.width, height: info.height, kb: Math.round(info.size / 1024) })
}

const logo = await sharp(join(ICONS, '0bd3b17b-83c4-4190-a6f9-4e332c74bbbd.png'))
  .trim()
  .resize({ width: 512, height: 512, fit: 'inside' })
  .webp({ quality: 85 })
  .toFile(join(process.cwd(), 'public', 'app', 'logo-app.webp'))

results.sort((a, b) => a.n - b.n)
for (const r of results) console.log(`${r.name}\t${r.width}x${r.height}\t${r.kb} KB`)
console.log(`logo-app.webp\t${logo.width}x${logo.height}\t${Math.round(logo.size / 1024)} KB`)
