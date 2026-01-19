import { useRef, useMemo } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { Text, shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Custom shader material for the blueprint/tech line effect
const TechLineMaterial = shaderMaterial(
    {
        uTime: 0,
        uColor: new THREE.Color('#1a2e3a'),
        uLineColor: new THREE.Color('#4a6878'),
        uOpacity: 1.0,
    },
    // Vertex Shader
    `
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
    // Fragment Shader
    `
    uniform float uTime;
    uniform vec3 uColor;
    uniform vec3 uLineColor;
    uniform float uOpacity;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
        // Create horizontal scan lines
        float scanLine = sin(vUv.y * 80.0 + uTime * 0.5);
        scanLine = smoothstep(0.8, 1.0, scanLine) * 0.15;
        
        // Create subtle vertical lines 
        float vertLine = sin(vUv.x * 60.0);
        vertLine = smoothstep(0.9, 1.0, vertLine) * 0.1;
        
        // Combine base color with lines
        vec3 finalColor = mix(uColor, uLineColor, scanLine + vertLine);
        
        // Add subtle edge glow
        float edge = 1.0 - smoothstep(0.0, 0.1, vUv.y) * smoothstep(0.0, 0.1, 1.0 - vUv.y);
        edge *= 0.2;
        
        finalColor += uLineColor * edge;
        
        gl_FragColor = vec4(finalColor, uOpacity);
    }
    `
)

extend({ TechLineMaterial })

export default function EchoText3D() {
    const groupRef = useRef()
    const materialRefs = useRef([])
    const outlineRefs = useRef([])

    useFrame((state) => {
        const time = state.clock.getElapsedTime()

        // Update shader uniforms
        materialRefs.current.forEach((mat) => {
            if (mat) {
                mat.uTime = time
            }
        })
    })

    const textProps = {
        font: "/fonts/Audiowide,Zen_Dots/Zen_Dots/ZenDots-Regular.ttf",
        fontSize: 0.42,
        letterSpacing: 0.06,
        anchorX: "center",
        anchorY: "middle",
        textAlign: "center",
        lineHeight: 1,
    }

    // Configuration for tech line layers
    const layers = [
        // Deep shadow layer
        { offset: [0.08, -0.08, -0.2], color: '#1a2533', opacity: 0.25 },
        // Mid shadow 
        { offset: [0.04, -0.04, -0.1], color: '#2a3d4d', opacity: 0.35 },
        // Main fill with tech lines
        { offset: [0, 0, 0], color: '#1a2e3a', opacity: 1.0, useShader: true },
        // Inner highlight
        { offset: [-0.015, 0.015, 0.02], color: '#3a5565', opacity: 0.2 },
        // Edge outline - multiple for thickness
        { offset: [0, 0, 0.01], color: '#0d1f2b', opacity: 1.0, strokeWidth: 0.008 },
    ]

    return (
        <group ref={groupRef} position={[0, 0.5, 2.6]}>
            {/* Tech blueprint grid decoration behind text */}
            <mesh position={[0, 0, -0.3]}>
                <planeGeometry args={[3.5, 1.2]} />
                <meshBasicMaterial
                    transparent
                    opacity={0.03}
                    color="#4a6878"
                />
            </mesh>

            {/* Render each layer */}
            {layers.map((layer, index) => (
                <Text
                    key={index}
                    {...textProps}
                    position={layer.offset}
                    strokeWidth={layer.strokeWidth || 0}
                    strokeColor={layer.color}
                >
                    YAAKOB
                    {layer.useShader ? (
                        <techLineMaterial
                            ref={(el) => materialRefs.current[index] = el}
                            uColor={new THREE.Color(layer.color)}
                            uLineColor={new THREE.Color('#4a6878')}
                            uOpacity={layer.opacity}
                            transparent
                        />
                    ) : (
                        <meshBasicMaterial
                            color={layer.color}
                            transparent
                            opacity={layer.opacity}
                            toneMapped={false}
                        />
                    )}
                </Text>
            ))}

            {/* Geometric accent lines - circuit-like decorations */}
            <group position={[0, 0, 0.03]}>
                {/* Top left corner accent */}
                <mesh position={[-1.4, 0.22, 0]}>
                    <planeGeometry args={[0.15, 0.003]} />
                    <meshBasicMaterial color="#3a5060" transparent opacity={0.5} />
                </mesh>
                <mesh position={[-1.32, 0.18, 0]}>
                    <planeGeometry args={[0.003, 0.08]} />
                    <meshBasicMaterial color="#3a5060" transparent opacity={0.5} />
                </mesh>

                {/* Top right corner accent */}
                <mesh position={[1.4, 0.22, 0]}>
                    <planeGeometry args={[0.15, 0.003]} />
                    <meshBasicMaterial color="#3a5060" transparent opacity={0.5} />
                </mesh>
                <mesh position={[1.32, 0.18, 0]}>
                    <planeGeometry args={[0.003, 0.08]} />
                    <meshBasicMaterial color="#3a5060" transparent opacity={0.5} />
                </mesh>

                {/* Bottom decorative elements */}
                <mesh position={[-0.8, -0.3, 0]}>
                    <planeGeometry args={[0.2, 0.002]} />
                    <meshBasicMaterial color="#3a5060" transparent opacity={0.4} />
                </mesh>
                <mesh position={[0.8, -0.3, 0]}>
                    <planeGeometry args={[0.2, 0.002]} />
                    <meshBasicMaterial color="#3a5060" transparent opacity={0.4} />
                </mesh>

                {/* Small squares - tech style */}
                <mesh position={[-1.5, 0.1, 0]}>
                    <planeGeometry args={[0.025, 0.025]} />
                    <meshBasicMaterial color="#3a5060" transparent opacity={0.3} />
                </mesh>
                <mesh position={[1.5, 0.1, 0]}>
                    <planeGeometry args={[0.025, 0.025]} />
                    <meshBasicMaterial color="#3a5060" transparent opacity={0.3} />
                </mesh>
                <mesh position={[-1.2, -0.15, 0]}>
                    <planeGeometry args={[0.02, 0.02]} />
                    <meshBasicMaterial color="#3a5060" transparent opacity={0.25} />
                </mesh>
                <mesh position={[1.2, -0.15, 0]}>
                    <planeGeometry args={[0.02, 0.02]} />
                    <meshBasicMaterial color="#3a5060" transparent opacity={0.25} />
                </mesh>
            </group>

            {/* Subtle reflection/shadow below */}
            <Text
                {...textProps}
                position={[0, -0.5, -0.15]}
                fontSize={0.35}
            >
                YAAKOB
                <meshBasicMaterial
                    color="#4a6878"
                    transparent
                    opacity={0.08}
                />
            </Text>
        </group>
    )
}
