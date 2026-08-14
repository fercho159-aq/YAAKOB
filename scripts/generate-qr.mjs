#!/usr/bin/env node
/**
 * Generates the branded QR: round modules, rounded finder eyes and the Yaakob
 * emblem in the middle.
 *
 * The `qrcode` package only draws square modules, so this asks it for the raw
 * module matrix and does its own SVG. Error correction is forced to H (30%
 * recovery) because the emblem covers part of the payload.
 *
 *   node scripts/generate-qr.mjs [url] [outfile]
 */
import { createRequire } from 'node:module'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

const require = createRequire(import.meta.url)
const QRCode = require('qrcode')
// Reaching into the package for the alignment pattern coordinates. They depend
// on the version, which grows with the payload, so hardcoding them would break
// the day the URL gets longer.
const alignment = require('qrcode/lib/core/alignment-pattern')

const url = process.argv[2] ?? 'https://yaakob.com'
const outFile = resolve(process.argv[3] ?? 'public/qr-yaakob.svg')
const logoFile = resolve('public/favicon-home.png')

/** Modules of white space around the code. Four is the spec's minimum. */
const QUIET = 4
/** Radius of each data dot, as a fraction of one module. */
const DOT = 0.42
/** Diameter of the cleared centre, as a fraction of the code's width. */
const HOLE = 0.26
/** Diameter of the emblem itself, slightly smaller so the hole shows a rim. */
const LOGO = 0.22
/** Softening applied to the emblem, in module units. See the note by the filter. */
const BLUR = 0.12

const qr = QRCode.create(url, { errorCorrectionLevel: 'H' })
const size = qr.modules.size
const data = qr.modules.data
const at = (x, y) => data[y * size + x] === 1

/** The three finder patterns, which get drawn as rounded eyes instead of dots. */
const eyes = [
  [0, 0],
  [size - 7, 0],
  [0, size - 7],
]
const inEye = (x, y) =>
  eyes.some(([ex, ey]) => x >= ex && x < ex + 7 && y >= ey && y < ey + 7)

/**
 * Alignment patterns. These have to stay solid: readers use them to work out
 * the perspective, and broken into loose dots they stop being recognisable —
 * the code renders beautifully and then scans in nothing.
 */
const version = (size - 17) / 4
const coords = alignment.getRowColCoords(version)
const aligns = []
for (const row of coords) {
  for (const col of coords) {
    // the three that would sit under a finder pattern do not exist
    const underEye =
      (row === 6 && col === 6) || (row === 6 && col === size - 7) || (row === size - 7 && col === 6)
    if (!underEye) aligns.push([col, row])
  }
}
const inAlign = (x, y) => aligns.some(([ax, ay]) => Math.abs(x - ax) <= 2 && Math.abs(y - ay) <= 2)

// Clear a disc in the middle for the emblem. Modules whose centre falls inside
// it are dropped; error correction covers the loss.
const centre = size / 2
const holeRadius = (size * HOLE) / 2
const inHole = (x, y) => Math.hypot(x + 0.5 - centre, y + 0.5 - centre) < holeRadius

const dots = []
for (let y = 0; y < size; y++) {
  for (let x = 0; x < size; x++) {
    if (!at(x, y) || inEye(x, y) || inAlign(x, y) || inHole(x, y)) continue
    dots.push(`<circle cx="${x + 0.5}" cy="${y + 0.5}" r="${DOT}"/>`)
  }
}

/** One eye: a rounded ring plus a rounded core, matching the reference. */
function eye(ex, ey) {
  return [
    `<rect x="${ex + 0.5}" y="${ey + 0.5}" width="6" height="6" rx="1.75"`,
    ` fill="none" stroke="#000" stroke-width="1"/>`,
    `<rect x="${ex + 2}" y="${ey + 2}" width="3" height="3" rx="0.9"/>`,
  ].join('')
}

/** An alignment pattern, in the same rounded language as the eyes. */
function alignMark(ax, ay) {
  return [
    `<rect x="${ax - 1.5}" y="${ay - 1.5}" width="4" height="4" rx="1"`,
    ` fill="none" stroke="#000" stroke-width="1"/>`,
    `<rect x="${ax}" y="${ay}" width="1" height="1" rx="0.35"/>`,
  ].join('')
}

const logo = readFileSync(logoFile).toString('base64')
const logoSize = size * LOGO
const logoPos = centre - logoSize / 2

const total = size + QUIET * 2
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}" width="1024" height="1024" role="img" aria-label="Código QR de ${url}">
<defs>
  <!--
    The emblem is a black disc crossed by thin white rings. Rendered sharp, a
    scan line across it produces the same black-white-black run lengths a
    finder pattern has, and readers lock onto it as a fourth corner: the code
    then fails to decode at any raster large enough to resolve the rings.
    Softening them keeps the emblem readable to the eye and invisible to the
    locator. Verified by decoding from 120px to 2048px.
  -->
  <filter id="suavizar"><feGaussianBlur stdDeviation="${BLUR}"/></filter>
</defs>
<rect width="${total}" height="${total}" fill="#fff"/>
<g transform="translate(${QUIET} ${QUIET})" fill="#000">
${dots.join('\n')}
${eyes.map(([x, y]) => eye(x, y)).join('\n')}
${aligns.map(([x, y]) => alignMark(x, y)).join('\n')}
<circle cx="${centre}" cy="${centre}" r="${logoSize / 2}" fill="#000"/>
<image href="data:image/png;base64,${logo}" x="${logoPos}" y="${logoPos}" width="${logoSize}" height="${logoSize}" opacity="0.75" filter="url(#suavizar)"/>
</g>
</svg>
`

mkdirSync(dirname(outFile), { recursive: true })
writeFileSync(outFile, svg)

console.log(`QR de ${url}`)
console.log(`  versión ${version}, ${size}x${size} módulos, corrección H`)
console.log(`  ${dots.length} puntos, ${aligns.length} patrón(es) de alineación`)
console.log(`  emblema al ${Math.round(LOGO * 100)}% del ancho`)
console.log(`  escrito en ${outFile}`)
