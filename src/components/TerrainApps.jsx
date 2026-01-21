import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'

/**
 * E.C.H.O.-Style Energy Fiber Lines Effect
 * 
 * Creates flowing parallel curved lines using a torus geometry
 * with custom shaders for the fiber/line effect.
 */
const TerrainApps = () => {
    const meshRef = useRef()
    const mouseRef = useRef({ x: 0, y: 0 })
    const smoothMouseRef = useRef({ x: 0, y: 0 })
    const opacityRef = useRef({ value: 0 })

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
            mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
        }

        window.addEventListener('mousemove', handleMouseMove)

        gsap.to(opacityRef.current, {
            value: 1,
            duration: 2.5,
            ease: 'power2.out'
        })

        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0, 0) },
            uOpacity: { value: 0 },
            uLineColor: { value: new THREE.Color('#5a7a9a') },    // Gris-azul sutil
            uInnerColor: { value: new THREE.Color('#8fa4b8') },   // Más claro adentro
            uFlowSpeed: { value: 0.12 },
        }),
        []
    )

    useFrame((state) => {
        if (!meshRef.current) return

        const elapsed = state.clock.getElapsedTime()
        meshRef.current.material.uniforms.uTime.value = elapsed
        meshRef.current.material.uniforms.uOpacity.value = opacityRef.current.value

        // Smooth mouse interpolation
        const lerpFactor = 0.02
        smoothMouseRef.current.x = THREE.MathUtils.lerp(
            smoothMouseRef.current.x,
            mouseRef.current.x,
            lerpFactor
        )
        smoothMouseRef.current.y = THREE.MathUtils.lerp(
            smoothMouseRef.current.y,
            mouseRef.current.y,
            lerpFactor
        )

        meshRef.current.material.uniforms.uMouse.value.set(
            smoothMouseRef.current.x,
            smoothMouseRef.current.y
        )

        // Subtle rotation
        meshRef.current.rotation.z += smoothMouseRef.current.x * 0.0005
    })

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
            float pulse = sin(uTime * 0.3) * 0.03;
            pos *= 1.0 + pulse;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
    `

    const fragmentShader = `
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uOpacity;
        uniform vec3 uLineColor;
        uniform vec3 uInnerColor;
        uniform float uFlowSpeed;

        // Simple hash-based noise
        float hash(float n) {
            return fract(sin(n) * 43758.5453123);
        }
        
        float noise(vec2 p) {
            return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
        }
        
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
            // === 1. FLOW COORDINATES ===
            vec2 flowUv = vUv;
            
            // Continuous flow
            flowUv.y -= uTime * uFlowSpeed;
            flowUv.y = fract(flowUv.y);
            
            // === 2. PARALLEL LINE GENERATION ===
            // Create many thin parallel lines
            float lineColumns = 180.0; // Number of lines
            float columnIndex = floor(flowUv.x * lineColumns);
            
            // Each line has unique properties
            float lineNoise = hash(columnIndex);
            float lineBrightness = 0.4 + lineNoise * 0.6;
            
            // Line width variation
            float lineWidth = 0.2 + lineNoise * 0.4;
            
            // Create sharp line edges
            float lineX = fract(flowUv.x * lineColumns);
            float line = smoothstep(0.5 - lineWidth * 0.5, 0.5, lineX) * 
                        smoothstep(0.5 + lineWidth * 0.5, 0.5, lineX);
            
            // === 3. WAVE PATTERNS ===
            float wavePattern = sin(flowUv.y * 20.0 + columnIndex * 1.5 + uTime * 1.5) * 0.5 + 0.5;
            
            // Combine intensity
            float intensity = line * lineBrightness * wavePattern;
            
            // === 4. SECONDARY FINER LINES ===
            float fineColumns = 350.0;
            float fineColumnIndex = floor(flowUv.x * fineColumns);
            float fineNoise = hash(fineColumnIndex + 500.0);
            float fineLine = smoothstep(0.45, 0.5, fract(flowUv.x * fineColumns)) * 
                            smoothstep(0.55, 0.5, fract(flowUv.x * fineColumns));
            float fineIntensity = fineLine * fineNoise * 0.25;
            
            // === 5. DEPTH/TUNNEL EFFECT ===
            float depth = 1.0 - abs(vUv.y - 0.5) * 2.0;
            depth = pow(depth, 1.2);
            
            float tunnelDepth = smoothstep(0.0, 0.25, vUv.y) * smoothstep(1.0, 0.75, vUv.y);
            
            // === 6. ORGANIC VARIATION ===
            float organic = fbm(flowUv * vec2(2.0, 8.0) + uTime * 0.08);
            intensity *= 0.7 + organic * 0.5;
            
            // === 7. COLOR ===
            float totalIntensity = (intensity + fineIntensity) * 0.85;
            vec3 baseColor = uLineColor * totalIntensity;
            
            // Subtle color variation
            vec3 colorVar = uLineColor * sin(flowUv.y * 6.28 + uTime * 0.2) * 0.08;
            
            // Inner glow
            vec3 core = uInnerColor * pow(intensity, 2.5) * 0.3;
            
            // === 8. FRESNEL EDGE ===
            float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
            vec3 fresnelGlow = uLineColor * fresnel * 0.2;
            
            // === 9. COMBINE ===
            float centerFade = smoothstep(0.2, 0.5, abs(vUv.y - 0.5));
            vec3 finalColor = (baseColor + colorVar + core + fresnelGlow) * centerFade;
            finalColor *= depth * tunnelDepth;
            
            // === 10. ALPHA ===
            float alpha = smoothstep(0.0, 0.15, intensity + fineIntensity) * tunnelDepth * uOpacity * 0.8;
            alpha = clamp(alpha, 0.0, 0.85);
            alpha = max(alpha, tunnelDepth * 0.03);
            
            gl_FragColor = vec4(finalColor, alpha);
        }
    `

    return (
        <mesh
            ref={meshRef}
            position={[2, -1, -5]}
            scale={1}
            rotation={[Math.PI / 2.2, 0.1, 0.3]}
        >
            <torusGeometry args={[10, 3, 64, 200]} />
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


