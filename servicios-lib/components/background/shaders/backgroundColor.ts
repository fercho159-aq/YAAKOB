/**
 * Solid backdrop, drawn on the inside of a large sphere.
 *
 * The color1 -> color2 crossfade is present but commented out in the shipped
 * bundle, so only `color1` is ever visible. Kept verbatim.
 */
export const backgroundColorVertexShader = /* glsl */ `
      precision highp float;

      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }
`;

export const backgroundColorFragmentShader = /* glsl */ `
      precision highp float;

      uniform vec3 color1;
      uniform vec3 color2;
      uniform float transition;

      void main() {
        gl_FragColor = vec4(color1, 1.0);
        // gl_FragColor = vec4(mix(color1, color2, transition), 1.0);
      }
`;
