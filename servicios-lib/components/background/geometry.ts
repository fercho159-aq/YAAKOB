import {
  BufferAttribute,
  BufferGeometry,
  InstancedBufferAttribute,
  InstancedBufferGeometry,
} from 'three';

/** Two triangles spanning -1..1 on XY. Both instanced passes share this quad. */
const QUAD_VERTICES = [-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0];

export const createQuadGeometry = (): BufferGeometry => {
  const geometry = new BufferGeometry();
  geometry.setAttribute(
    'position',
    new BufferAttribute(new Float32Array(QUAD_VERTICES), 3),
  );
  return geometry;
};

/**
 * An InstancedBufferGeometry seeded from a plain geometry, with a helper for
 * allocating the per-instance attributes.
 *
 * Note there is no `uv` attribute: both instanced shaders derive their UVs from
 * the quad's own position.
 */
export class InstancedQuadGeometry extends InstancedBufferGeometry {
  readonly maxInstancedCount: number;

  constructor(source: BufferGeometry, count: number) {
    super();
    this.maxInstancedCount = count;
    this.instanceCount = count;

    Object.keys(source.attributes).forEach((name) => {
      this.setAttribute(name, source.attributes[name].clone());
    });
    this.groups = [...source.groups];
    this.setIndex(source.getIndex());
  }

  createAttribute(name: string, itemSize: number): InstancedBufferAttribute {
    const attribute = new InstancedBufferAttribute(
      new Float32Array(this.maxInstancedCount * itemSize),
      itemSize,
    );
    this.setAttribute(name, attribute);
    return attribute;
  }
}
