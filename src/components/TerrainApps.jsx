import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'

const TerrainApps = () => {
    const meshRef = useRef()
    const mouseRef = useRef({ x: 0, y: 0 })
    const positionRef = useRef({ y: -15 }) // Start below viewport

    // Mouse tracking for tilt effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
            mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
        }

        window.addEventListener('mousemove', handleMouseMove)

        // Animate terrain rising up after texts appear
        gsap.to(positionRef.current, {
            y: -5,
            duration: 2,
            delay: 1, // Wait 1 second for texts to appear first
            ease: 'power2.out'
        })

        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            // Colores con mayor contraste - líneas más oscuras
            uBaseColor: { value: new THREE.Color('#d8e2e8') },
            uLineColor: { value: new THREE.Color('#1a3040') }, // Azul muy oscuro
            uAccentColor: { value: new THREE.Color('#2a4050') }, // Azul oscuro
            uGlowColor: { value: new THREE.Color('#0a2030') }, // Azul profundo
        }),
        []
    )

    // Base rotation - diferente ángulo para la página de apps
    const baseRotation = [-3.8, -0.3, 0.7]

    useFrame((state) => {
        if (!meshRef.current) return

        meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime()

        // Update position from animated ref
        meshRef.current.position.y = positionRef.current.y

        // Tilt effect following mouse
        const targetRotationX = baseRotation[0] + mouseRef.current.y * 0.15
        const targetRotationY = baseRotation[1] + mouseRef.current.x * 0.15

        meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * 0.06
        meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * 0.06
    })

    const vertexShader = `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform float uTime;

    void main() {
      vUv = uv;
      vPosition = position;
      vec3 pos = position;

      // Slower, more ethereal twist
      float twist = pos.z * 0.3;
      float s = sin(twist + uTime * 0.25);
      float c = cos(twist + uTime * 0.25);
      mat2 m = mat2(c, -s, s, c);
      pos.xy = m * pos.xy;

      // Add subtle wave distortion
      pos.y += sin(pos.x * 2.0 + uTime * 0.5) * 0.1;

      vNormal = normalMatrix * normal;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `

    const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  uniform float uTime;
  uniform vec3 uBaseColor;
  uniform vec3 uLineColor;
  uniform vec3 uAccentColor;
  uniform vec3 uGlowColor;

  void main() {
    // Grid-like pattern for digital feel
    float verticalCoord = vUv.x;
    float flow = verticalCoord + (vUv.y * 0.15) - uTime * 0.03;

    // Multiple line layers for depth
    float lines1 = sin(flow * 800.0);
    float lines2 = sin(flow * 1200.0 + uTime * 0.5) * 0.6;
    float lines3 = sin(vUv.y * 600.0) * 0.3; // Cross lines
    
    float pattern = smoothstep(0.92, 1.0, lines1);
    float pattern2 = smoothstep(0.94, 1.0, lines2);
    float gridPattern = smoothstep(0.96, 1.0, lines3);
    
    // Combine patterns
    float combinedPattern = max(pattern, max(pattern2 * 0.7, gridPattern * 0.4));
    
    // Edge fading
    float edge = smoothstep(0.0, 0.15, vUv.y) * smoothstep(1.0, 0.85, vUv.y);
    float bottomMask = smoothstep(0.4, 0.7, vUv.y);
    
    // Pulsing glow effect
    float pulse = sin(uTime * 2.0) * 0.5 + 0.5;
    float glowIntensity = smoothstep(0.3, 0.7, vUv.y) * pulse * 0.3;
    
    // Alpha with glow
    float alpha = (combinedPattern * edge * bottomMask * 0.8) + glowIntensity * 0.2;

    // Color mixing with gradient based on position
    vec3 gradientColor = mix(uLineColor, uAccentColor, vUv.y);
    gradientColor = mix(gradientColor, uGlowColor, sin(vUv.x * 3.14159 + uTime * 0.5) * 0.3 + 0.3);
    
    vec3 finalColor = mix(uBaseColor, gradientColor, combinedPattern + glowIntensity);

    // Fresnel glow effect for edge lighting
    float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0,0,1))), 3.0);
    finalColor += fresnel * uGlowColor * 0.4;
    
    // Add subtle scanline effect
    float scanline = sin(vUv.y * 400.0 + uTime * 2.0) * 0.05;
    finalColor += scanline;

    gl_FragColor = vec4(finalColor, alpha);
    
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`

    return (
        <mesh ref={meshRef} rotation={baseRotation} position={[3, -15, -12]}>
            {/* High resolution torus for smooth lines */}
            <torusGeometry args={[10, 7, 1000, 3500]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
                side={THREE.DoubleSide}
                depthWrite={false}
                blending={THREE.NormalBlending}
            />
        </mesh>
    )
}

export default TerrainApps
