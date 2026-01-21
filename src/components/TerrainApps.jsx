import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * TerrainApps - E.C.H.O.-Style Energy Fiber Lines Effect
 * 
 * Creates flowing parallel curved lines using a torus geometry
 * with custom shaders for the fiber/line effect.
 */
const TerrainApps = ({
    position = [2, -1, -5],
    scale = 1,
    fiberColor = '#5a7a9a',   // Gris-azul sutil
    innerColor = '#f0f2f5',   // Gris muy claro (centro)
    suctionSpeed = 0.12,      // Velocidad de flujo
    rotationSpeed = 0.05,
    // Torus params
    torusRadius = 10,
    tubeRadius = 3,
    radialSegments = 64,
    tubularSegments = 200
}) => {
    const meshRef = useRef()
    const mouseRef = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
            mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

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
        meshRef.current.rotation.z += mouseRef.current.x * 0.0008
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
            float pulse = sin(uTime * 0.4) * 0.03;
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
        uniform vec3 uFiberColor;
        uniform vec3 uInnerColor;
        uniform float uSuctionSpeed;

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
            flowUv.y -= uTime * uSuctionSpeed;
            flowUv.y = fract(flowUv.y);
            
            // === 2. ENERGY FIBER GENERATION ===
            float fiberColumns = 250.0;
            float columnIndex = floor(flowUv.x * fiberColumns);
            
            float fiberNoise = hash(columnIndex);
            float fiberBrightness = fiberNoise;
            float fiberWidth = 0.3 + fiberNoise * 0.7;
            
            float fiberX = fract(flowUv.x * fiberColumns);
            float fiber = smoothstep(0.5 - fiberWidth * 0.5, 0.5, fiberX) * 
                          smoothstep(0.5 + fiberWidth * 0.5, 0.5, fiberX);
            
            // === 3. INTENSITY FLICKERING ===
            float flickerSpeed = 2.0 + fiberNoise * 3.0;
            float flicker = sin(uTime * flickerSpeed + columnIndex * 0.5) * 0.5 + 0.5;
            float wavePattern = sin(flowUv.y * 30.0 + columnIndex * 2.0 + uTime * 2.0) * 0.5 + 0.5;
            float intensity = fiber * fiberBrightness * flicker * wavePattern;
            
            // === 4. SECONDARY FIBER LAYER ===
            float fineColumns = 500.0;
            float fineColumnIndex = floor(flowUv.x * fineColumns);
            float fineNoise = hash(fineColumnIndex + 1000.0);
            float fineFiber = smoothstep(0.4, 0.5, fract(flowUv.x * fineColumns)) * 
                              smoothstep(0.6, 0.5, fract(flowUv.x * fineColumns));
            float fineIntensity = fineFiber * fineNoise * 0.3;
            
            // === 5. DEPTH GRADIENT ===
            float depth = 1.0 - abs(vUv.y - 0.5) * 2.0;
            depth = pow(depth, 1.5);
            float tunnelDepth = smoothstep(0.0, 0.3, vUv.y) * smoothstep(1.0, 0.7, vUv.y);
            
            // === 6. ORGANIC VARIATION ===
            float organic = fbm(flowUv * vec2(2.0, 10.0) + uTime * 0.1);
            intensity *= 0.7 + organic * 0.6;
            
            // === 7. COLOR COMPOSITION ===
            float softIntensity = (intensity + fineIntensity) * 0.8;
            vec3 baseGlow = uFiberColor * softIntensity;
            vec3 colorVariation = uFiberColor * sin(flowUv.y * 6.28 + uTime * 0.3) * 0.1;
            vec3 core = vec3(0.3, 0.4, 0.5) * pow(intensity, 3.0) * 0.5;
            
            // === 8. DEPTH & ATMOSPHERE ===
            float centerFade = smoothstep(0.3, 0.5, abs(vUv.y - 0.5));
            float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.5);
            vec3 fresnelGlow = uFiberColor * fresnel * 0.3;
            
            vec3 finalColor = (baseGlow + colorVariation + core + fresnelGlow) * centerFade;
            finalColor *= depth * tunnelDepth;
            
            // === 9. ALPHA ===
            float alpha = smoothstep(0.0, 0.2, intensity + fineIntensity) * tunnelDepth * 0.7;
            alpha = clamp(alpha, 0.0, 0.9);
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
            rotation={[Math.PI / 2.2, 0.1, 0.3]}
        >
            <torusGeometry args={[torusRadius, tubeRadius, radialSegments, tubularSegments]} />
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

