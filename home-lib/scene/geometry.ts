import { BufferAttribute, BufferGeometry } from 'three'

/**
 * The engine's geometry format: a JSON object of flat, non-indexed attribute
 * arrays. Nothing exotic, so it loads without the Hydra runtime or draco.
 *
 *   { "position": [x, y, z, ...], "uv": [u, v, ...], "normal": [...] }
 */
interface GeometryJson {
  position: number[]
  uv?: number[]
  normal?: number[]
}

export async function loadGeometry(url: string): Promise<BufferGeometry> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`geometry ${url}: ${res.status}`)
  const json = (await res.json()) as GeometryJson

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(new Float32Array(json.position), 3))
  if (json.uv) geometry.setAttribute('uv', new BufferAttribute(new Float32Array(json.uv), 2))
  if (json.normal) {
    geometry.setAttribute('normal', new BufferAttribute(new Float32Array(json.normal), 3))
  } else {
    geometry.computeVertexNormals()
  }
  geometry.computeBoundingSphere()
  return geometry
}
