import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'

const TerrainApps = ({ isTransitioning, onTransitionComplete }) => {
    // 1. Setup refs
    const pointsRef = useRef()

    // 2. Setup Geometry
    //    Use a PlaneGeometry with high segments to get a lot of vertices (points)
    const { positions, uvs, randoms } = useMemo(() => {
        // Width, Height, SegmentsW, SegmentsH
        // 50 x 50 size, with 128 segments = ~16k points
        const geo = new THREE.PlaneGeometry(50, 50, 128, 128)
        const pos = geo.attributes.position.array
        const uv = geo.attributes.uv.array
        const count = pos.length / 3
        const rands = new Float32Array(count)
        for (let i = 0; i < count; i++) {
            rands[i] = Math.random()
        }
        return { positions: pos, uvs: uv, randoms: rands }
    }, [])

    // Raycaster for interaction
    const raycaster = useMemo(() => new THREE.Raycaster(), [])
    const interactionPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), [])
    const mousePosition = useRef(new THREE.Vector3(9999, 9999, 9999)) // Start far away

    // 3. Setup Shaders
    //    Vertex Shader: Displaces points Z based on noise/time
    //    Fragment Shader: Renders circular points with softer edges
    const vertexShader = `
    uniform float uTime;
    uniform vec3 uMouse;
    uniform float uTransition; // 0.0 to 1.0
    attribute float aRandom;
    
    varying float vElevation;

    // Classic Perlin/Simplex Noise function (simplified)
    // Source: https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83
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

      // Create elevation based on Noise
      // Frequency (position * 0.2)
      // Speed (uTime * 0.2)
      // Amplitude ( * 1.5 )
      float elevation = snoise(modelPosition.xz * 0.15 + uTime * 0.15) * 1.5;
      
      // Secondary layer of noise for detail
      elevation += snoise(modelPosition.xz * 0.6 + uTime * 0.05) * 0.2;

      // --- MOUSE INTERACTION ---
      // Distancia entre el punto y el mouse (en espacio local o mundo relativo)
      // Como uMouse ya viene transformado al espacio local del plano en el JS, podemos
      // comparar directamente con 'position' (que es local)
      
      float dist = distance(position.xy, uMouse.xy);
      float radius = 6.0; // Radio más suave
      float interaction = smoothstep(radius, 0.0, dist);
      
      // Ondulatorio orgánico
      // Menos frecuencia espacial (dist * 1.0) para ondas más largas
      float wave = sin(dist * 1.0 - uTime * 5.0) * interaction;
      
      // "Magnetismo" muy sutil (base lift)
      elevation += interaction * 0.5; 
      // Movimiento fluido principal
      elevation += wave * 0.8; 
      
      // --- EXPLOSION TRANSITION ---
      // When uTransition increases, animate particles upwards wildly
      if (uTransition > 0.0) {
        float explosionSpeed = 40.0;
        // Randomize speed based on aRandom attribute
        float randomSpeed = 10.0 + aRandom * 30.0;
        
        // Upward movement
        elevation += uTransition * randomSpeed; 
        
        // Add some random scatter in XZ
        float scatter = snoise(vec2(modelPosition.x + uTime, modelPosition.z)) * uTransition * 15.0;
        modelPosition.x += scatter * 0.5;
        modelPosition.z += scatter * 0.5;
      }

      modelPosition.y += elevation;
      
      // Pass elevation to fragment for coloring
      vElevation = elevation;

      vec4 viewPosition = viewMatrix * modelPosition;
      
      // Size attenuation: Points further away appear smaller
      // 100.0 is base size factor
      gl_PointSize = 150.0 * (1.0 / -viewPosition.z);
      
      gl_Position = projectionMatrix * viewPosition;
    }
  `

    const fragmentShader = `
    varying float vElevation;

    void main() {
      // 1. Make points circular
      // distance from center of point (0.5, 0.5)
      float d = distance(gl_PointCoord, vec2(0.5));
      
      // If outside circle, discard
      // Use smoothstep for soft edges
      float alpha = 1.0 - smoothstep(0.3, 0.5, d);
      
      if(alpha < 0.01) discard;

      // 2. Coloring (DARK MODE - FIERY)
      // High: Bright Orange/Red glow
      vec3 colorHigh = vec3(1.0, 0.4, 0.0); 
      // Low: Deep Red abyss
      vec3 colorLow = vec3(0.3, 0.0, 0.0); 

      // Mix based on elevation (range approx -1.5 to 1.5)
      float mixStrength = (vElevation + 1.0) * 0.5;
      vec3 color = mix(colorLow, colorHigh, mixStrength);

      gl_FragColor = vec4(color, alpha * 0.8);
      
      // Optional: Add simple fog manually if needed, or rely on scene fog (handled by transparent materials usually)
      #include <fog_fragment>
    }
  `

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector3(9999, 9999, 9999) },
            uTransition: { value: 0 }
        }),
        []
    )

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime()

            // Raycasting logic
            // 1. Setup raycaster from camera
            raycaster.setFromCamera(state.pointer, state.camera)

            // 2. We need to intersect with the ANALYTICAL plane of our terrain
            // The terrain is at position [0, -2, -10] and rotated [-Math.PI / 2.5, 0, 0]
            // It's easier to create a temporary Invisible Mesh for raycasting or do math
            // Let's use the math way: transform ray to local space of the points object

            const pointsLocalMatrixInv = pointsRef.current.matrixWorld.clone().invert()
            raycaster.ray.applyMatrix4(pointsLocalMatrixInv)

            // intersect with local plane Z=0 (since PlaneGeometry is on XY locally)
            const target = new THREE.Vector3()
            // Plane defined by normal (0,0,1) because PlaneGeometry is created on XY plane
            const localPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)

            const intersection = raycaster.ray.intersectPlane(localPlane, target)

            if (intersection) {
                // Lerp for smooth movement
                mousePosition.current.lerp(intersection, 0.1)
                pointsRef.current.material.uniforms.uMouse.value.copy(mousePosition.current)
            }
        }
    })

    // Animation Effect
    useEffect(() => {
        if (isTransitioning) {
            console.log("Starting particles explosion!");
            gsap.to(uniforms.uTransition, {
                value: 1,
                duration: 2.5,
                ease: "power2.in",
                onComplete: () => {
                    if (onTransitionComplete) onTransitionComplete()
                }
            })
        }
    }, [isTransitioning, onTransitionComplete, uniforms.uTransition])

    return (
        <points ref={pointsRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, -10]} renderOrder={0}>
            {/* 
        Using bufferGeometry directly to pass attributes 
        Instead of <planeGeometry> to make sure we have control
      */}
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-uv"
                    count={uvs.length / 2}
                    array={uvs}
                    itemSize={2}
                />
                <bufferAttribute
                    attach="attributes-aRandom"
                    count={randoms.length}
                    array={randoms}
                    itemSize={1}
                />
            </bufferGeometry>

            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}

export default TerrainApps
