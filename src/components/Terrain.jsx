import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const Terrain = () => {
  const meshRef = useRef()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#d8e2e8') },      // Light grey-blue base
      uLineColor: { value: new THREE.Color('#8aa0b0') },  // Subtle blue-grey lines
      uAccentColor: { value: new THREE.Color('#b8c8d4') }, // Soft accent
    }),
    []
  )

  useFrame((state) => {
    const { clock } = state
    meshRef.current.material.uniforms.uTime.value = clock.getElapsedTime() * 0.15
  })

  // Vertex Shader - Soft flowing feather waves from bottom-right corner
  const vertexShader = `
    varying vec2 vUv;
    varying float vElevation;
    varying vec3 vPosition;
    uniform float uTime;

    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Origin point for waves (bottom-right corner)
      vec2 origin = vec2(6.0, -6.0);
      float distFromOrigin = length(pos.xy - origin);
      
      // Soft flowing waves emanating from corner - like silk or feathers
      float wave1 = sin(distFromOrigin * 0.4 + uTime * 0.8) * 0.6;
      float wave2 = sin(distFromOrigin * 0.25 + uTime * 0.5 + 1.0) * 0.8;
      float wave3 = sin(distFromOrigin * 0.6 + uTime * 0.3) * 0.3;
      
      // Directional flow towards top-left
      float flowAngle = atan(pos.y - origin.y, pos.x - origin.x);
      float directionalWave = sin(flowAngle * 3.0 + distFromOrigin * 0.3 + uTime * 0.2) * 0.4;
      
      // Combine waves with smooth falloff
      float elevation = (wave1 + wave2 + wave3 + directionalWave) * 0.5;
      
      // Smooth intensity based on distance from origin
      elevation *= smoothstep(0.0, 8.0, distFromOrigin) * smoothstep(20.0, 5.0, distFromOrigin);
      
      pos.z += elevation;
      vElevation = elevation;
      vPosition = pos;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `

  // Fragment Shader - Delicate flowing lines like feathers/silk fibers
  const fragmentShader = `
    varying vec2 vUv;
    varying float vElevation;
    varying vec3 vPosition;
    uniform float uTime;
    uniform vec3 uColor;
    uniform vec3 uLineColor;
    uniform vec3 uAccentColor;

    void main() {
      // Origin for the feather effect (bottom-right)
      vec2 origin = vec2(0.85, 0.15);
      vec2 toOrigin = vUv - origin;
      float distFromOrigin = length(toOrigin);
      float angle = atan(toOrigin.y, toOrigin.x);
      
      // Main flowing fiber lines - radiate from corner
      float fibers1 = sin(angle * 60.0 + distFromOrigin * 25.0 - uTime * 0.3);
      fibers1 = smoothstep(0.75, 1.0, fibers1);
      
      // Secondary fibers - slightly offset
      float fibers2 = sin(angle * 45.0 + distFromOrigin * 18.0 + uTime * 0.2 + 2.0);
      fibers2 = smoothstep(0.8, 1.0, fibers2) * 0.7;
      
      // Fine detail fibers
      float fibers3 = sin(angle * 80.0 + distFromOrigin * 35.0 - uTime * 0.15);
      fibers3 = smoothstep(0.88, 1.0, fibers3) * 0.4;
      
      // Subtle contour lines following elevation
      float contour = sin(vElevation * 12.0 + uTime * 0.1);
      contour = smoothstep(0.9, 1.0, contour) * 0.3;
      
      // Combine all fibers
      float allFibers = fibers1 + fibers2 + fibers3 + contour;
      allFibers = clamp(allFibers, 0.0, 1.0);
      
      // Fade fibers near the origin (cleaner look at the source)
      allFibers *= smoothstep(0.05, 0.25, distFromOrigin);
      
      // Base color - light and clean
      vec3 baseColor = uColor;
      
      // Apply fiber lines with soft coloring
      vec3 finalColor = mix(baseColor, uLineColor, allFibers * 0.45);
      
      // Subtle depth shading based on elevation
      float depth = smoothstep(-1.0, 1.0, vElevation);
      finalColor *= (0.92 + 0.08 * depth);
      
      // Soft accent in the flowing areas
      float accentArea = smoothstep(0.2, 0.5, distFromOrigin) * smoothstep(1.0, 0.4, distFromOrigin);
      finalColor = mix(finalColor, uAccentColor, accentArea * 0.15);
      
      // Gentle vignette - fade edges
      float edgeDist = length(vUv - vec2(0.5));
      float vignette = 1.0 - smoothstep(0.4, 0.75, edgeDist);
      finalColor = mix(uColor, finalColor, vignette);
      
      // Alpha fade at edges
      float alphaFade = 1.0 - smoothstep(0.5, 0.75, edgeDist);

      gl_FragColor = vec4(finalColor, alphaFade);
      
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `

  return (
    <mesh ref={meshRef} rotation={[Math.PI / -1.5, 0, .25]} position={[-1.5, -2.3, -1]}>
      <planeGeometry args={[18, 18, 128, 128]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  )
}

export default Terrain
