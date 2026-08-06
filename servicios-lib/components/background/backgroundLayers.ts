import { Mesh, ShaderMaterial, Texture } from 'three';

import { BACKGROUND_LAYERS } from './config';
import { createQuadGeometry, InstancedQuadGeometry } from './geometry';
import { backgroundLayersFragmentShader, backgroundLayersVertexShader } from './shaders';

/**
 * Four large quads of drifting smoke, drawn as pure black with the greyscale
 * background texture inverted into an alpha mask.
 */
export class BackgroundLayers extends Mesh<InstancedQuadGeometry, ShaderMaterial> {
  constructor(map: Texture) {
    const { layers } = BACKGROUND_LAYERS;
    const geometry = new InstancedQuadGeometry(createQuadGeometry(), layers.length);

    const position = geometry.createAttribute('_position', 3);
    const rotation = geometry.createAttribute('_rotation', 1);
    const scale = geometry.createAttribute('_scale', 1);
    const opacity = geometry.createAttribute('_opacity', 1);

    layers.forEach((layer, i) => {
      position.setXYZ(i, layer.position.x, layer.position.y, layer.position.z);
      scale.setX(i, layer.scale);
      rotation.setX(i, layer.rotation);
      opacity.setX(i, layer.opacity * BACKGROUND_LAYERS.opacity);
    });

    super(
      geometry,
      new ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: {
          map: { value: map },
          time: { value: 0 },
          floatingYStrenght: { value: BACKGROUND_LAYERS.floatingYStrenght },
          waveRotationStrenght: { value: BACKGROUND_LAYERS.waveRotationStrenght },
        },
        vertexShader: backgroundLayersVertexShader,
        fragmentShader: backgroundLayersFragmentShader,
      }),
    );

    this.frustumCulled = false;
  }

  update = (): void => {
    this.material.uniforms.time.value += BACKGROUND_LAYERS.speed;
  };

  dispose(): void {
    this.geometry.dispose();
    this.material.dispose();
  }
}
