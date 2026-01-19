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

  // Vertex Shader - Organic flow using Simplex Noise
  const vertexShader = `
    varying vec2 vUv;
    varying float vElevation;
    varying vec3 vPosition;
    uniform float uTime;

    // Simplex 2D noise
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Center of the flow/organic movement (bottom-right ish)
      vec2 origin = vec2(6.0, -6.0);
      float dist = length(pos.xy - origin);
      
      // Layered noise for organic wave shape
      float noise1 = snoise(vec2(pos.x * 0.15 + uTime * 0.2, pos.y * 0.15 - uTime * 0.1));
      float noise2 = snoise(vec2(dist * 0.1 - uTime * 0.3, pos.y * 0.2));
      
      // Combine for elevation
      float elevation = (noise1 * 1.5 + noise2 * 1.0);
      
      // Smooth falloff
      elevation *= smoothstep(0.0, 10.0, dist) * smoothstep(25.0, 5.0, dist);
      
      pos.z += elevation;
      vElevation = elevation;
      vPosition = pos;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `

  // Fragment Shader - High frequency fibers
  const fragmentShader = `
    varying vec2 vUv;
    varying float vElevation;
    varying vec3 vPosition;
    uniform float uTime;
    uniform vec3 uColor;
    uniform vec3 uLineColor;
    uniform vec3 uAccentColor;
    
    // Simplex 2D noise (repeated for fragment)
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      // Flow coordinates
      vec2 flowUv = vUv;
      
      // Distort UVs slightly with elevation for depth illusion
      flowUv += vElevation * 0.02;
      
      // High frequency noise stretched to look like fibers/silk
      // We stretch X much more than Y (or radial)
      
      vec2 origin = vec2(0.85, 0.15);
      vec2 toOrigin = flowUv - origin;
      float dist = length(toOrigin);
      float angle = atan(toOrigin.y, toOrigin.x);
      
      // Fiber Pattern: mixture of radial sin waves and noise
      float fibers = sin(angle * 300.0 + dist * 50.0 - uTime * 0.5); // High frequency radial
      
      // Add noise to break up the perfect lines
      float noiseVal = snoise(vec2(angle * 20.0, dist * 10.0 - uTime * 0.2));
      fibers += noiseVal * 0.5;
      
      // Sharpen the fibers
      float fiberSharp = smoothstep(0.5, 1.0, fibers);
      
      // Secondary finer fibers
      float fineFibers = sin(angle * 600.0 + dist * 80.0 - uTime * 0.3);
      fiberSharp += smoothstep(0.8, 1.0, fineFibers) * 0.5;
      
      // Clamp
      float alpha = clamp(fiberSharp, 0.0, 1.0);
      
      // Softness/Fade
      alpha *= smoothstep(0.05, 0.2, dist); // Fade center
      
      // Color mixing
      vec3 col = mix(uColor, uLineColor, alpha);
      
      // Highlights based on elevation peaks
      float highlight = smoothstep(0.5, 1.5, vElevation);
      col = mix(col, uAccentColor, highlight * 0.5);

      // Vignette
      float vignette = 1.0 - smoothstep(0.4, 0.8, length(vUv - 0.5));
      
      // Final alpha
      float finalAlpha = alpha * 0.8 + 0.2; // Keep some base opacity? Or fully transparent?
      // For "silk" usually the gaps are transparent or semi-transparent
      finalAlpha *= vignette;
      
      gl_FragColor = vec4(col, finalAlpha);
      
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `

  return (
    <mesh ref={meshRef} rotation={[Math.PI / -2, 0, .25]} position={[-1.5, -2.3, -1]}>
      <planeGeometry args={[18, 18, 256, 256]} />
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
