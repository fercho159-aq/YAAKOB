import { rotate2D } from './lib';

/**
 * Drifting smoke layers: the same 6-vertex quad as the flux, instanced once per
 * layer, each reading the greyscale background texture as an alpha mask.
 */
export const backgroundLayersVertexShader = /* glsl */ `
        attribute vec3 _position;
        attribute float _rotation;
        attribute float _scale;
        attribute float _opacity;

        uniform float time;
        uniform float floatingYStrenght;
        uniform float waveRotationStrenght;

        varying vec2 vUv;
        varying float vOpacity;

        ${rotate2D}

        void main () {
          vec3 transformed = position;

          // Time variation
          float timeVariation = sin(_scale + time);

          // Scale
          transformed *= _scale;
          transformed.x *= 2.0;

          // Rotation
          transformed.xy = rotate2D(transformed.xy, _rotation + timeVariation * waveRotationStrenght);

          // Position
          transformed += _position;

          // Wave effect
          transformed.y += timeVariation * floatingYStrenght;

          vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
          gl_Position = projectionMatrix * mvPosition;

          vOpacity = _opacity;
          vUv = vec2(
            position.x * 0.5 + 0.5,
            position.y * 0.5 + 0.5
          );
        }
`;

export const backgroundLayersFragmentShader = /* glsl */ `
        uniform sampler2D map;

        varying vec2 vUv;
        varying float vOpacity;

        void main() {
          float alpha = 1.0 - texture2D(map, vUv).x;
          alpha *= vOpacity;

          gl_FragColor = vec4(vec3(0.0), alpha);
        }
`;
