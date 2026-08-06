import { BackSide, Color, Mesh, ShaderMaterial, SphereGeometry } from 'three';

import { BACKGROUND_COLOR } from './config';
import { backgroundColorFragmentShader, backgroundColorVertexShader } from './shaders';

/**
 * The flat backdrop: a unit sphere blown up to 800 and drawn from the inside,
 * so it fills the frame at any camera angle without needing a clear colour.
 */
export class BackgroundColor extends Mesh<SphereGeometry, ShaderMaterial> {
  constructor(color1: string = BACKGROUND_COLOR.color1, color2: string = color1) {
    super(
      new SphereGeometry(1, 32, 16),
      new ShaderMaterial({
        side: BackSide,
        uniforms: {
          color1: { value: new Color(color1) },
          color2: { value: new Color(color2) },
          transition: { value: 0 },
        },
        vertexShader: backgroundColorVertexShader,
        fragmentShader: backgroundColorFragmentShader,
      }),
    );

    this.scale.multiplyScalar(BACKGROUND_COLOR.sphereScale);
  }

  dispose(): void {
    this.geometry.dispose();
    this.material.dispose();
  }
}
