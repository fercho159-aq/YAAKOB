import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * TerrainApps - Iris/Radial Disc Effect
 * 
 * Creates a flat disc with radial lines emanating from the center
 * (pupil) outward like an eye iris or sun rays.
 */
const TerrainApps = ({
    position = [3, -2, -3],
    innerRadius = 1.0,      // Pupila - centro vacío
    outerRadius = 12.0,     // Radio exterior
    radialLines = 1500,      // Número de líneas radiales
    pointsPerLine = 100,    // Puntos por línea
    lineColor = '#2d3b48',  // Color azul oscuro tipo E.C.H.O.
}) => {
    const pointsRef = useRef()
    const mouseRef = useRef({ x: 0, y: 0 })
    const smoothMouseRef = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
            mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    // Generate radial lines geometry - rays from center outward
    const geometry = useMemo(() => {
        const totalPoints = radialLines * pointsPerLine
        const positions = new Float32Array(totalPoints * 3)
        const lineIndices = new Float32Array(totalPoints)
        const radiusProgress = new Float32Array(totalPoints)
        const randoms = new Float32Array(totalPoints)
        const indices = [] // Indices for LineSegments

        let idx = 0
        for (let line = 0; line < radialLines; line++) {
            const angle = (line / radialLines) * Math.PI * 2
            const lineRandom = Math.random()

            // Index offsets for this line
            const startIdx = idx

            for (let point = 0; point < pointsPerLine; point++) {
                const t = point / (pointsPerLine - 1)
                const radius = innerRadius + t * (outerRadius - innerRadius)

                const x = Math.cos(angle) * radius
                const y = Math.sin(angle) * radius
                const z = 0

                positions[idx * 3] = x
                positions[idx * 3 + 1] = y
                positions[idx * 3 + 2] = z

                lineIndices[idx] = line / radialLines
                radiusProgress[idx] = t
                randoms[idx] = lineRandom

                // Create segment indices (connecting point i to i+1)
                if (point < pointsPerLine - 1) {
                    indices.push(idx, idx + 1)
                }

                idx++
            }
        }

        const geo = new THREE.BufferGeometry()
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        geo.setAttribute('aLineIndex', new THREE.BufferAttribute(lineIndices, 1))
        geo.setAttribute('aRadiusProgress', new THREE.BufferAttribute(radiusProgress, 1))
        geo.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))
        geo.setIndex(indices) // Set indices for line segments

        return geo
    }, [radialLines, pointsPerLine, innerRadius, outerRadius])

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0, 0) },
            uLineColor: { value: new THREE.Color(lineColor) },
            uInnerRadius: { value: innerRadius },
            uOuterRadius: { value: outerRadius },
        }),
        [lineColor, innerRadius, outerRadius]
    )

    useFrame((state) => {
        if (!pointsRef.current) return

        pointsRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime()

        // Smooth mouse
        const lerpFactor = 0.03
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

        pointsRef.current.material.uniforms.uMouse.value.set(
            smoothMouseRef.current.x,
            smoothMouseRef.current.y
        )

        // Rotación sutil - Mantenlo mayormente plano para efecto 'disco'
        pointsRef.current.rotation.x = -0.2 + smoothMouseRef.current.y * 0.05
        pointsRef.current.rotation.y = smoothMouseRef.current.x * 0.05
    })

    const vertexShader = `
        attribute float aLineIndex;
        attribute float aRadiusProgress;
        attribute float aRandom;
        
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uInnerRadius;
        uniform float uOuterRadius;
        
        varying float vRadiusProgress;
        varying float vLineIndex;
        varying float vAlpha;

        // Simplex noise
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        
        float snoise(vec3 v) {
            const vec2 C = vec2(1.0/6.0, 1.0/3.0);
            const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
            vec3 i = floor(v + dot(v, C.yyy));
            vec3 x0 = v - i + dot(i, C.xxx);
            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min(g.xyz, l.zxy);
            vec3 i2 = max(g.xyz, l.zxy);
            vec3 x1 = x0 - i1 + C.xxx;
            vec3 x2 = x0 - i2 + C.yyy;
            vec3 x3 = x0 - D.yyy;
            i = mod289(i);
            vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));
            float n_ = 0.142857142857;
            vec3 ns = n_ * D.wyz - D.xzx;
            vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_);
            vec4 x = x_ *ns.x + ns.yyyy;
            vec4 y = y_ *ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);
            vec4 b0 = vec4(x.xy, y.xy);
            vec4 b1 = vec4(x.zw, y.zw);
            vec4 s0 = floor(b0)*2.0 + 1.0;
            vec4 s1 = floor(b1)*2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));
            vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
            vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
            vec3 p0 = vec3(a0.xy, h.x);
            vec3 p1 = vec3(a0.zw, h.y);
            vec3 p2 = vec3(a1.xy, h.z);
            vec3 p3 = vec3(a1.zw, h.w);
            vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
            p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
            vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
            m = m * m;
            return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
        }

        void main() {
            vec3 pos = position;
            float radius = length(pos.xy);
            float angle = atan(pos.y, pos.x);
            
            // === ONDAS RADIALES MUY SUTILES EN Z ===
            // Flatten Z to ensure disc look
            float noiseVal = snoise(vec3(
                aLineIndex * 8.0,
                aRadiusProgress * 2.0 + uTime * 0.1,
                aRandom * 5.0
            ));
            
            // Deformación Z pequeña para dar "vida" pero mantener plano
            pos.z = noiseVal * 0.2 * (aRadiusProgress * 0.5 + 0.5);
            
            // Distorsión lateral (XY) ondulada
            // Hace que las líneas vibren como un iris
            float wave = sin(aRadiusProgress * 15.0 - uTime * 2.0) * 0.02;
            float distort = snoise(vec3(pos.xy * 0.5, uTime * 0.2)) * 0.1;
            
            float newRadius = radius + wave + distort;
            pos.x = cos(angle) * newRadius;
            pos.y = sin(angle) * newRadius;
            
            // Mouse influence
            float mouseInfluence = smoothstep(1.0, 0.0, aRadiusProgress);
            pos.x += uMouse.x * mouseInfluence * 0.5;
            pos.y += uMouse.y * mouseInfluence * 0.5;
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            
            vRadiusProgress = aRadiusProgress;
            vLineIndex = aLineIndex;
            
            // Fade en extremos
            float innerFade = smoothstep(0.0, 0.15, aRadiusProgress);
            float outerFade = smoothstep(1.0, 0.8, aRadiusProgress);
            vAlpha = innerFade * outerFade;
        }
    `

    const fragmentShader = `
        uniform vec3 uLineColor;
        
        varying float vRadiusProgress;
        varying float vLineIndex;
        varying float vAlpha;

        void main() {
            // Gradiente simple
            vec3 color = uLineColor;
            
            // Brillo pulsante
            float pulse = 0.8 + 0.2 * sin(vRadiusProgress * 20.0 - 0.0);
            
            // Variación por línea
            float lineVar = 0.1 * sin(vLineIndex * 100.0);
            
            float alpha = vAlpha * (0.6 + lineVar);
            
            if (alpha < 0.01) discard;
            
            gl_FragColor = vec4(color * pulse, alpha);
        }
    `

    return (
        <lineSegments ref={pointsRef} position={position} rotation={[-0.2, 0, 0.0]}>
            <primitive object={geometry} attach="geometry" />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
                depthWrite={false}
                blending={THREE.NormalBlending}
            />
        </lineSegments>
    )
}

export default TerrainApps


