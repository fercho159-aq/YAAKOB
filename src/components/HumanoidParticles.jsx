import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

/**
 * HumanoidParticles
 * Helper component that renders a 3D model as a Point Cloud.
 * 
 * INSTRUCTIONS:
 * 1. Download the GLB/GLTF model.
 * 2. Save it as "human.glb" in your "public" folder.
 * 3. This component will automatically load it.
 * 
 * While the model is missing, it renders a TorusKnot as a placeholder.
 */
const HumanoidParticles = () => {
    const groupRef = useRef()
    const { nodes } = useGLTF('/human.glb', undefined, (error) => {
        // Error handling ignored to prevent crash loop, fallback logic handled by existence check
    })

    // Finding the main mesh in the GLTF
    const geometricData = useMemo(() => {
        // Fallback Geometry (TorusKnot) if model not found or parsing
        const fallbackGeo = new THREE.TorusKnotGeometry(1, 0.3, 150, 20)

        if (nodes) {
            const allPositions = []

            // Traverse all nodes to find Meshes and collect positions
            // This ensures we get body, eyes, hair, clothes etc.
            if (nodes) {
                // Convert nodes object to array if needed, or iterate
                Object.values(nodes).forEach(node => {
                    if (node.isMesh || node.isSkinnedMesh) {
                        const attr = node.geometry.attributes.position
                        if (attr) {
                            // Apply world matrix if possible? 
                            // Doing raw merge is faster but might miss local transforms if hierarchy is complex.
                            // For a simple character, often just merging is enough or we might need to applyMatrix4.
                            // Let's keep it simple: merge raw.

                            // We must safeguard against interleaved buffers or missing attributes
                            if (attr.array) {
                                // Add all vertices
                                for (let i = 0; i < attr.array.length; i++) {
                                    allPositions.push(attr.array[i])
                                }
                            }
                        }
                    }
                })
            }

            if (allPositions.length > 0) {
                return new Float32Array(allPositions)
            }
        }

        return fallbackGeo.attributes.position.array // Fallback
    }, [nodes])

    // Shader logic - Same as TerrainApps but adapted for 3D Volume
    const vertexShader = `
    uniform float uTime;
    uniform vec3 uMouse;
    
    varying float vElevation;

    // Simplex Noise
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
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
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);

      // Glitch / Cyber effect
      // Displace XZ based on Y height + Time
      float glitch = snoise(vec2(modelPosition.y * 3.0, uTime * 0.5)) * 0.1;
      
      // Breathing effect (expansion)
      float breath = sin(uTime * 1.5) * 0.02;
      
      modelPosition.x += glitch + breath * position.x;
      modelPosition.z += glitch + breath * position.z;
      
      // Calculate elevation equivalent for coloring (relative to center)
      vElevation = modelPosition.y;

      vec4 viewPosition = viewMatrix * modelPosition;
      
      // Size attenuation
      gl_PointSize = 100.0 * (1.0 / -viewPosition.z);
      
      gl_Position = projectionMatrix * viewPosition;
    }
  `

    const fragmentShader = `
    varying float vElevation;

    void main() {
      // Circular points
      float d = distance(gl_PointCoord, vec2(0.5));
      float alpha = 1.0 - smoothstep(0.3, 0.5, d);
      
      if(alpha < 0.01) discard;

      // Solid black color
      vec3 color = vec3(0.0, 0.0, 0.0);

      gl_FragColor = vec4(color, alpha * 0.95);
    }
  `

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
        }),
        []
    )

    useFrame((state) => {
        // Update uniforms directly on the material
        uniforms.uTime.value = state.clock.getElapsedTime()
    })

    // If no positions (loading or error), render nothing or fallback
    if (!geometricData) return null

    return (
        <group ref={groupRef} position={[0, -1, -25]} scale={[3.0, 3.0, 3.0]}>
            <points rotation={[-Math.PI / 2, 0, 0]} renderOrder={1}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={geometricData.length / 3}
                        array={geometricData}
                        itemSize={3}
                    />
                </bufferGeometry>
                <shaderMaterial
                    uniforms={uniforms} // We need to update time here? No, uniforms is a const ref
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    transparent={true}
                    depthWrite={false}
                    blending={THREE.NormalBlending}
                />
            </points>
        </group>
    )
}

// Preload to avoid waterfall if file exists
useGLTF.preload('/human.glb')

export default HumanoidParticles
