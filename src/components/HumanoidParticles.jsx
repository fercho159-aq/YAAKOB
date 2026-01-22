import { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

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
const HumanoidParticles = ({ isTransitioning }) => {
    const pointsRef = useRef()
    const groupRef = useRef()
    const raycaster = useMemo(() => new THREE.Raycaster(), [])
    const mousePosition = useRef(new THREE.Vector3(9999, 9999, 9999))

    // Audio Analysis State
    const [audioVolume, setAudioVolume] = useState(0)
    const audioRef = useRef(null)
    const analyserRef = useRef(null)
    const audioContextRef = useRef(null)
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
                                // Sample every 3rd vertex to reduce density
                                // Sample every 45th vertex (Balanced density)
                                // i += 45 because each vertex has 3 components (x,y,z)
                                for (let i = 0; i < attr.array.length; i += 45) {
                                    // Add vertex (3 values)
                                    allPositions.push(attr.array[i])
                                    allPositions.push(attr.array[i + 1])
                                    allPositions.push(attr.array[i + 2])
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
    uniform float uAudioVolume;
    uniform float uTransition; // 0.0 to 1.0
    
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
      // 1. Copia local para aplicar Físicas de Viento (antes de transformar al mundo)
      vec3 pos = position;

      // === INTERACCIÓN MOUSE (VIENTO) ===
      // uMouse viene en coordenadas locales gracias al raycaster en JS
      float dMouse = distance(pos, uMouse);
      float radius = 0.5; 
      float influence = smoothstep(radius, 0.0, dMouse); 

      if (influence > 0.001) {
          // ELEGANCIA: En lugar de explotar, ondulamos como agua/energía
          
          // 1. Ondulación concéntrica suave
          float wave = sin(dMouse * 15.0 - uTime * 8.0);
          
          // 2. Ruido sutil para "vida"
          float turb = snoise(vec2(pos.x * 2.0, pos.y * 2.0 + uTime));

          // Desplazamiento PRINCIPAL en Z (hacia el usuario, sin romper silueta lateral)
          pos.z += influence * 0.4; 
          
          // Vibración sutil
          pos.x += turb * influence * 0.05;
          pos.y += turb * influence * 0.05;
          
          // Modulación del tamaño (puntos activos crecen un poco)
          gl_PointSize *= (1.0 + influence * 0.5);
      }

      vec4 modelPosition = modelMatrix * vec4(pos, 1.0);

      // Glitch / Cyber effect
      // Displace XZ based on Y height + Time
      float glitch = snoise(vec2(modelPosition.y * 3.0, uTime * 0.5)) * 0.1;
      
      // Breathing effect (expansion)
      float breath = sin(uTime * 1.5) * 0.02;
      
      modelPosition.x += glitch + breath * position.x;
      modelPosition.z += glitch + breath * position.z;
      
      // === AUDIO LIP SYNC ===
      float mouthRegion = 0.0;
      
      // Elipse refinada
      float dx = position.x;
      float dy = position.y - 0.52; 
      float ellipseCheck = (dx * dx) / (0.14 * 0.14) + (dy * dy) / (0.05 * 0.05);

      if (ellipseCheck < 1.0 && position.z > 0.02) {
          mouthRegion = smoothstep(1.0, 0.2, ellipseCheck); 
      }
      
      // Movimiento Boca
      if (mouthRegion > 0.01 && uAudioVolume > 0.01) {
          modelPosition.z += mouthRegion * uAudioVolume * 2.5; 
          modelPosition.y -= mouthRegion * uAudioVolume * 0.5;
          gl_PointSize *= 2.0; 
      }
      
      // Calculate elevation equivalent for coloring (relative to center)
      vElevation = modelPosition.y;

      // === EXPLOSION TRANSITION ===
      if (uTransition > 0.0) {
          // Explode outwards from center (0, y, 0)
          vec3 center = vec3(0.0, position.y, 0.0);
          vec3 dir = normalize(position - center + vec3(0.001)); // Avoid div by zero
          
          float explosionSpeed = 15.0; // Fast explosion
          float randomDelay = snoise(position.xy * 10.0) * 0.5 + 0.5; // 0..1
          
          // Disperse mainly outwards and slightly upwards
          vec3 explosionVec = dir * uTransition * explosionSpeed * (0.5 + randomDelay);
          explosionVec.y += uTransition * 5.0 * randomDelay; // Upward drift
          
          modelPosition.xyz += explosionVec;
          
          // Fade out size
          gl_PointSize *= (1.0 - uTransition); 
      }

      vec4 viewPosition = viewMatrix * modelPosition;
      
      // Size attenuation - TAMAÑO REDUCIDO para nitidez holográfica (85.0)
      gl_PointSize = 85.0 * (1.0 / -viewPosition.z);
      
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

      // Deep Fiery Red/Orange
      vec3 color = vec3(1.0, 0.2, 0.05);

      // Alpha reducido para evitar saturación blanca
      gl_FragColor = vec4(color, alpha * 0.5);
    }
  `

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector3(9999, 9999, 9999) },
            uAudioVolume: { value: 0 },
            uTransition: { value: 0 }
        }),
        []
    )

    // Audio now managed by AppsPage - we just read from window.sharedAnalyser

    useFrame((state) => {
        // Update uniforms directly on the material
        uniforms.uTime.value = state.clock.getElapsedTime()

        // Audio Analysis - usando el analyser compartido desde AppsPage
        if (window.sharedAnalyser) {
            const dataArray = new Uint8Array(window.sharedAnalyser.frequencyBinCount)
            window.sharedAnalyser.getByteFrequencyData(dataArray)

            // Get average volume (focusing on voice frequencies 80-255Hz range)
            let sum = 0
            for (let i = 10; i < 30; i++) { // Voice range approximation
                sum += dataArray[i]
            }
            const avgVolume = sum / 20 / 255 // Normalize to 0-1

            // Smooth and amplify MUCHO MÁS para que sea visible
            const smoothVolume = avgVolume * 8.0 // Amplify MUCH more for visible effect
            uniforms.uAudioVolume.value = smoothVolume

            // Debug: Log cuando hay volumen significativo
            if (smoothVolume > 0.1) {
                console.log('Audio Volume:', smoothVolume.toFixed(2))
            }
        }

        if (pointsRef.current && groupRef.current) {
            // Raycasting from camera
            raycaster.setFromCamera(state.pointer, state.camera)

            // We need to raycast against the humanoid positioned in 3D space
            // Method: Create a bounding sphere around the model and get intersection point
            // Transform ray to local space of the group
            const groupMatrixInv = groupRef.current.matrixWorld.clone().invert()
            const localRay = raycaster.ray.clone()
            localRay.applyMatrix4(groupMatrixInv)

            // Intersectamos con un PLANO imaginario en Z=0 (frente del modelo)
            // Esto nos da la coordenada precisa donde el mouse "toca" el cristal
            const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
            const target = new THREE.Vector3()

            // Si el rayo corta el plano, usamos ese punto
            if (localRay.intersectPlane(planeZ, target)) {
                mousePosition.current.lerp(target, 0.15) // Lerp más rápido para respuesta ágil
            }

            // Update uniform
            uniforms.uMouse.value.copy(mousePosition.current)
        }
    })

    // Animation Effect for Explosion
    useEffect(() => {
        if (isTransitioning) {
            gsap.to(uniforms.uTransition, {
                value: 1,
                duration: 2.0,
                ease: "power2.inOut"
            })
        }
    }, [isTransitioning, uniforms.uTransition])

    // If no positions (loading or error), render nothing or fallback
    if (!geometricData) return null

    return (
        <group ref={groupRef} position={[0, -1, -25]} scale={[3.0, 3.0, 3.0]}>
            <points ref={pointsRef} rotation={[-Math.PI / 2, 0, 0]} renderOrder={1}>
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
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </group>
    )
}

// Preload to avoid waterfall if file exists
useGLTF.preload('/human.glb')

export default HumanoidParticles
