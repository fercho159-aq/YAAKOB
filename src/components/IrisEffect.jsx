import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const IrisEffect = ({
  position = [0, 0, -5],
  scale = 1,
  fiberColor = '#5a7a9a',   // Gris-azul sutil (tema claro YAAKOB)
  innerColor = '#f0f2f5',   // Gris muy claro (centro)
  suctionSpeed = 0.15,      // Más lento para efecto sereno
  rotationSpeed = 0.05,
  // Torus params
  torusRadius = 10,
  tubeRadius = 3,
  radialSegments = 64,
  tubularSegments = 200
}) => {
  const meshRef = useRef()
  const mouseRef = useRef({ x: 0, y: 0 })

  // Mouse tracking for subtle interaction
  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    })
  }

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uFiberColor: { value: new THREE.Color(fiberColor) },
      uInnerColor: { value: new THREE.Color(innerColor) },
      uSuctionSpeed: { value: suctionSpeed },
      uRotationSpeed: { value: rotationSpeed },
    }),
    [fiberColor, innerColor, suctionSpeed, rotationSpeed]
  )

  useFrame((state) => {
    if (!meshRef.current) return

    meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime()
    meshRef.current.material.uniforms.uMouse.value.set(
      mouseRef.current.x,
      mouseRef.current.y
    )

    // Subtle rotation based on mouse
    meshRef.current.rotation.z += mouseRef.current.x * 0.001
  })

  // Vertex Shader - Simplified for torus, adds subtle wave
  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    uniform float uTime;

    void main() {
      vUv = uv;
      vPosition = position;
      vNormal = normalMatrix * normal;
      
      vec3 pos = position;
      
      // Subtle breathing/pulsing effect
      float pulse = sin(uTime * 0.5) * 0.05;
      pos *= 1.0 + pulse;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `

  // Fragment Shader - Energy Fibers Effect (E.C.H.O. style)
  const fragmentShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec3 uFiberColor;
    uniform vec3 uInnerColor;
    uniform float uSuctionSpeed;

    // Simple hash-based noise for fiber generation
    float hash(float n) {
      return fract(sin(n) * 43758.5453123);
    }
    
    float noise(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }
    
    // Smooth noise
    float smoothNoise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      
      float a = noise(i);
      float b = noise(i + vec2(1.0, 0.0));
      float c = noise(i + vec2(0.0, 1.0));
      float d = noise(i + vec2(1.0, 1.0));
      
      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }
    
    // FBM for more organic look
    float fbm(vec2 p) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 1.0;
      
      for(int i = 0; i < 4; i++) {
        value += amplitude * smoothNoise(p * frequency);
        amplitude *= 0.5;
        frequency *= 2.0;
      }
      return value;
    }

    void main() {
      // === 1. FLOW COORDINATES (Suction Effect) ===
      vec2 flowUv = vUv;
      
      // Continuous flow towards center (suction)
      flowUv.y -= uTime * uSuctionSpeed;
      
      // Make flow coordinates tile properly
      flowUv.y = fract(flowUv.y);
      
      // === 2. ENERGY FIBER GENERATION ===
      // Create many thin vertical fibers using column-based noise
      float fiberColumns = 250.0; // Number of fiber columns
      float columnIndex = floor(flowUv.x * fiberColumns);
      
      // Each fiber column has unique properties
      float fiberNoise = hash(columnIndex);
      float fiberBrightness = fiberNoise;
      
      // Fiber width variation
      float fiberWidth = 0.3 + fiberNoise * 0.7;
      
      // Create sharp fiber edges
      float fiberX = fract(flowUv.x * fiberColumns);
      float fiber = smoothstep(0.5 - fiberWidth * 0.5, 0.5, fiberX) * 
                    smoothstep(0.5 + fiberWidth * 0.5, 0.5, fiberX);
      
      // === 3. INTENSITY FLICKERING ===
      // Add temporal flickering to each fiber
      float flickerSpeed = 2.0 + fiberNoise * 3.0;
      float flicker = sin(uTime * flickerSpeed + columnIndex * 0.5) * 0.5 + 0.5;
      
      // Add wave patterns along fibers
      float wavePattern = sin(flowUv.y * 30.0 + columnIndex * 2.0 + uTime * 2.0) * 0.5 + 0.5;
      
      // Combine intensity factors
      float intensity = fiber * fiberBrightness * flicker * wavePattern;
      
      // === 4. SECONDARY FIBER LAYER (finer details) ===
      float fineColumns = 500.0;
      float fineColumnIndex = floor(flowUv.x * fineColumns);
      float fineNoise = hash(fineColumnIndex + 1000.0);
      float fineFiber = smoothstep(0.4, 0.5, fract(flowUv.x * fineColumns)) * 
                        smoothstep(0.6, 0.5, fract(flowUv.x * fineColumns));
      float fineIntensity = fineFiber * fineNoise * 0.3;
      
      // === 5. DEPTH GRADIENT ===
      // vUv.y goes around the tube - use it for depth perception
      // 0 and 1 are the "back" of the tunnel, 0.5 is the "front"
      float depth = 1.0 - abs(vUv.y - 0.5) * 2.0;
      depth = pow(depth, 1.5); // Soften the falloff
      
      // Also fade based on tube position for tunnel effect
      float tunnelDepth = smoothstep(0.0, 0.3, vUv.y) * smoothstep(1.0, 0.7, vUv.y);
      
      // === 6. ORGANIC VARIATION ===
      // Add FBM noise for organic feel
      float organic = fbm(flowUv * vec2(2.0, 10.0) + uTime * 0.1);
      intensity *= 0.7 + organic * 0.6;
      
      // === 7. COLOR COMPOSITION (YAAKOB Light Theme) ===
      // Para tema claro, las fibras son más sutiles y elegantes
      
      // Intensidad más suave para tema claro
      float softIntensity = (intensity + fineIntensity) * 0.8;
      vec3 baseGlow = uFiberColor * softIntensity;
      
      // Variación de color muy sutil
      vec3 colorVariation = uFiberColor * sin(flowUv.y * 6.28 + uTime * 0.3) * 0.1;
      
      // Core más sutil para tema claro
      vec3 core = vec3(0.3, 0.4, 0.5) * pow(intensity, 3.0) * 0.5;
      
      // === 8. DEPTH & ATMOSPHERE ===
      // Centro más claro/transparente en lugar de oscuro
      float centerFade = smoothstep(0.3, 0.5, abs(vUv.y - 0.5));
      
      // Fresnel edge - bordes más definidos
      float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.5);
      vec3 fresnelGlow = uFiberColor * fresnel * 0.3;
      
      // Combine all color components
      vec3 finalColor = (baseGlow + colorVariation + core + fresnelGlow) * centerFade;
      finalColor *= depth * tunnelDepth;
      
      // === 9. ALPHA ===
      // Alpha más sutil para tema claro
      float alpha = smoothstep(0.0, 0.2, intensity + fineIntensity) * tunnelDepth * 0.7;
      alpha = clamp(alpha, 0.0, 0.9);
      
      // Visibilidad mínima del túnel
      alpha = max(alpha, tunnelDepth * 0.04);
      
      gl_FragColor = vec4(finalColor, alpha);
      
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      rotation={[Math.PI / 2, 0, 0]} // Rotate to face camera
    >
      {/* Torus geometry for 3D tunnel effect */}
      <torusGeometry args={[torusRadius, tubeRadius, radialSegments, tubularSegments]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.NormalBlending} // Normal blending para tema claro
      />
    </mesh>
  )
}

export default IrisEffect
