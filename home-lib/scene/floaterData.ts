import { BufferAttribute, BufferGeometry } from 'three'

/**
 * Spawn points for the environment dust, in a unit box the mesh then scales up.
 *
 * Lives outside the component because the positions are random: React's
 * compiler rules — rightly — do not allow that inside a render.
 */
export function createFloaterGeometry(count: number): BufferGeometry {
  const positions = new Float32Array(count * 3)
  const randoms = new Float32Array(count * 4)

  for (let i = 0; i < count; i++) {
    positions[i * 3] = Math.random() * 2 - 1
    positions[i * 3 + 1] = Math.random() * 2 - 1
    positions[i * 3 + 2] = Math.random() * 2 - 1
    for (let k = 0; k < 4; k++) randoms[i * 4 + k] = Math.random()
  }

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(positions, 3))
  geometry.setAttribute('random', new BufferAttribute(randoms, 4))
  return geometry
}
