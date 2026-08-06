import { drawRadialGradient, drawVignette } from './lib';

export const gridFinalPassVertexShader = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

/**
 * The original assembles this fragment shader out of a generic pass template
 * plus three injected chunks (`fragUniforms`, `fragUv`, `fragTransform`), and
 * swaps a single expression -- the vignette -- between pointer and touch
 * devices. That structure is preserved so the touch variant stays a one-line
 * substitution rather than a second copy of the shader.
 */
const template = ({
  fragUniforms,
  fragUv,
  fragTransform,
}: {
  fragUniforms: string;
  fragUv: string;
  fragTransform: string;
}) => /* glsl */ `
  uniform sampler2D tDiffuse;

  varying vec2 vUv;

  ${fragUniforms}

  void main() {
    vec2 uv = vUv;

    ${fragUv}

    vec4 transformed = texture2D(tDiffuse, uv);

    ${fragTransform}

    gl_FragColor = transformed;
  }
`;

/** Vignette expression used on pointer devices: a horizontal-only falloff. */
export const VIGNETTE_STYLE_POINTER =
  'max(0.0, 1.0 - pow(abs(uv.x * 2.0 - 1.0) * vignetteStrenght, vignetteRadius))';

/** Vignette expression used on touch devices: a centred radial falloff. */
export const VIGNETTE_STYLE_TOUCH =
  '1.0 - drawVignette(vec2(0.5, 0.5), uv, vignetteRadius, vignetteStrenght)';

export const createGridFinalPassFragmentShader = (vignetteStyle: string): string =>
  template({
    fragUniforms: /* glsl */ `
          uniform vec2 mousePosition;

          uniform float interactVignetteRadius;
          uniform float interactVignetteStrenght;
          uniform float interactMouseRadius;
          uniform float interactMouseStrenght;
          uniform float interactStrenght;

          uniform float vignetteRadius;
          uniform float vignetteStrenght;

          uniform sampler2D tShift;
          uniform sampler2D tGrid;

          uniform float gridScale;
          uniform float gridRatio;

          // FINAL PASS
          uniform float brightness;
          uniform float contrast;
          uniform float opacity;

          ${drawVignette}
          ${drawRadialGradient}
        `,
    fragUv: /* glsl */ `
          // Compute the squaredUv
          vec2 squaredUv = uv;
          squaredUv.x *= gridRatio;

          // Interactive Zone
          vec2 reversedMousePos = 0.5 - mousePosition;
          float interactiveZone = drawVignette(reversedMousePos, uv, interactVignetteRadius, interactVignetteStrenght);
          vec2 squaredMousePos = mousePosition + 0.5;
          squaredMousePos.x *= gridRatio;
          interactiveZone *= drawRadialGradient(squaredMousePos, squaredUv, interactMouseRadius, interactMouseStrenght);
          interactiveZone *= interactStrenght;

          // Grid texture
          squaredUv *= gridScale;
          squaredUv -= mousePosition * 0.1;
          vec2 shiftTexture = texture2D(tShift, squaredUv).xy - 0.5;

          // Apply a shift on the Uvs to have some parts shifted
          uv += shiftTexture * interactiveZone;
        `,
    fragTransform: /* glsl */ `
          // GLOBAL PASS
          transformed += brightness;
          transformed = (transformed - 0.5) / (1.0 - contrast) + 0.5;

          // GRID
          transformed += texture2D(tGrid, squaredUv).x * 0.5;

          // VIGNETTE
          float vignette = ${vignetteStyle};
          transformed *= vignette;

          // OPACITY
          transformed *= opacity;
        `,
  });
