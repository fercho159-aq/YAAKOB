/**
 * Shared GLSL helpers.
 *
 * The original bundle keeps these as standalone template literals and splices
 * them into each shader, so they are reproduced here the same way.
 */

/** Rotates a point around (0.5, 0.5). Injected into the two instanced vertex shaders. */
export const rotate2D = /* glsl */ `
vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}
`;

/** Distance falloff used for both the screen vignette and the interactive zone. */
export const drawVignette = /* glsl */ `
  float drawVignette(vec2 center, vec2 currentPosition, float scale, float strength) {
    float dist = distance(center, currentPosition) + 0.5 - scale;
    return max(0.0, dist) * strength;
  }
`;

/** Inverse distance falloff used to localise the UV shift around the pointer. */
export const drawRadialGradient = /* glsl */ `
  float drawRadialGradient(vec2 center, vec2 currentPosition, float scale, float strength) {
    float dist = distance(center, currentPosition) * (2.0 / scale);
    return (1.0 - min(1., dist)) * strength;
  }
`;
