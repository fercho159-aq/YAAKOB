import { rotate2D } from './lib';

/**
 * Instanced particle "flux".
 *
 * Geometry is a 6-vertex quad with `position` in {-1, +1} on XY and z = 0,
 * instanced `particleNbr` times. Every particle rides the same tube: its place
 * along the tube comes from `_progress`, its offset from the axis from
 * `_variation` (rejection-sampled out of the flow texture).
 */
export const fluxVertexShader = /* glsl */ `
        attribute vec2 _variation;
        attribute vec2 _explodeVariation;
        attribute float _progress;
        attribute float _speed;
        attribute float _opacity;

        // Particle
        uniform float particleScale;

        // Global Shape
        uniform float scale;
        uniform vec3 direction;
        uniform float torsionStrenght;
        uniform float waveShift;
        uniform float waveLength;
        uniform float waveStrenght;
        uniform float minorWaveSpeed;
        uniform float minorWaveLength;
        uniform float minorWaveStrenght;

        // Animation
        uniform float time;
        uniform float rotationSpeed;
        uniform float translationSpeed;

        // Interaction
        uniform float rotationShift;
        uniform float translationShift;

        uniform float transition;
        uniform float explodeStrenght;

        varying vec2 vUv;
        varying float vOpacity;
        varying float vProgress;

        ${rotate2D}

        void main () {
          vUv = vec2(
            position.x * 0.5 + 0.5,
            position.y * 0.5 + 0.5
          );

          // --- PROGRESS: The position in the flux from -0.5 to 0.5
          float progress = mod(_progress + time * _speed * translationSpeed + translationShift, 1.0) - 0.5;

          // Define the transformed position
          vec3 transformed = position;

          // particle Scale
          transformed *= particleScale;

          // Increase the scale of transparent particles
          if (_opacity < 1.) {
            transformed *= 4. * _opacity;
          }

          // Apply a unique position in the flux based on progress and the direction needed
          transformed += direction * progress;

          // --- VARIATION: Apply the variations
          vec2 variation = _variation;

          // Explode transition
          variation += transition * _explodeVariation * explodeStrenght;

          // Rotate around the central axis
          variation = rotate2D(variation, progress * torsionStrenght + (time * rotationSpeed) + rotationShift);

          // Global Scale
          variation *= scale;

          // Main Wavy flux
          variation.xy += cos((waveShift + progress) * waveLength) * waveStrenght;

          // Minor wavy flux
          variation.xy += sin((minorWaveSpeed * time + progress) * minorWaveLength) * minorWaveStrenght;

          // --- FINAL: Apply the unique variations from X and Y for each particles
          transformed.xy += variation;

          vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
          gl_Position = projectionMatrix * mvPosition;

          vOpacity = _opacity;
          vProgress = progress;
        }
`;

export const fluxFragmentShader = /* glsl */ `
      // Global Shape
      uniform vec3 color;
      uniform float opacity;
      // Interaction
      uniform float transitionOpacity;
      uniform float progressOpacity;

      varying vec2 vUv;
      varying float vOpacity;
      varying float vProgress;

      void main() {
        if ( length( vUv - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
        vec4 transformed = vec4(color, vOpacity * opacity * transitionOpacity);

        // Apply a color variation along the flux
        transformed.a -= transformed.a * (1.0 - vProgress) * progressOpacity;

        gl_FragColor = transformed;
      }
`;
