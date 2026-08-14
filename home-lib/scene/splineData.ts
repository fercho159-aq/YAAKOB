import {
  BufferAttribute,
  BufferGeometry,
  DataTexture,
  FloatType,
  NearestFilter,
  RGBAFormat,
  type Texture,
} from 'three'

/**
 * The spline particle data.
 *
 * `landing/eye-SPLINES.json` is 459 splines of 100 points each, flat xyz. The
 * engine packed them into a 512px square texture and looked them up with
 * `uPerSpline * (index + t)` as a row-major texel index; the same packing is
 * kept here so the ported lookup is the original one.
 */
export const SPLINE_TEX_SIZE = 512

export interface SplineData {
  texture: Texture
  splineCount: number
  perSpline: number
}

export async function loadSplineTexture(url: string): Promise<SplineData> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`splines ${url}: ${res.status}`)
  const splines = (await res.json()) as number[][]

  const perSpline = splines[0].length / 3
  const data = new Float32Array(SPLINE_TEX_SIZE * SPLINE_TEX_SIZE * 4)

  let texel = 0
  for (const spline of splines) {
    for (let i = 0; i < spline.length; i += 3) {
      data[texel * 4] = spline[i]
      data[texel * 4 + 1] = spline[i + 1]
      data[texel * 4 + 2] = spline[i + 2]
      data[texel * 4 + 3] = 1
      texel++
    }
  }

  const texture = new DataTexture(
    data,
    SPLINE_TEX_SIZE,
    SPLINE_TEX_SIZE,
    RGBAFormat,
    FloatType
  )
  // Points are interpolated by hand in the shader, so no filtering here.
  texture.minFilter = texture.magFilter = NearestFilter
  texture.needsUpdate = true

  return { texture, splineCount: splines.length, perSpline }
}

/**
 * One point per particle. Position is a placeholder — the vertex shader derives
 * the real one from the spline texture — while the attributes carry what the
 * engine kept in its simulation textures: which spline to ride (`splineIndex`),
 * where in its life the particle starts plus per-particle jitter (`random`),
 * and the direction it is scattered in around the spline (`origin`).
 */
export function createSplineGeometry(count: number, splineCount: number): BufferGeometry {
  const positions = new Float32Array(count * 3)
  const randoms = new Float32Array(count * 4)
  const origins = new Float32Array(count * 3)
  const indices = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    randoms[i * 4] = Math.random()
    randoms[i * 4 + 1] = Math.random()
    randoms[i * 4 + 2] = Math.random()
    randoms[i * 4 + 3] = Math.random()

    origins[i * 3] = Math.random() * 2 - 1
    origins[i * 3 + 1] = Math.random() * 2 - 1
    origins[i * 3 + 2] = Math.random() * 2 - 1

    indices[i] = Math.floor(Math.random() * splineCount)
  }

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(positions, 3))
  geometry.setAttribute('random', new BufferAttribute(randoms, 4))
  geometry.setAttribute('origin', new BufferAttribute(origins, 3))
  geometry.setAttribute('splineIndex', new BufferAttribute(indices, 1))
  return geometry
}
