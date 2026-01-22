import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree, extend } from '@react-three/fiber'
import * as THREE from 'three'
import { Line2 } from 'three/examples/jsm/lines/Line2.js'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js'

extend({ Line2, LineMaterial, LineGeometry })

// ============ PERLIN NOISE IMPLEMENTATION ============
// Classic Perlin noise for smooth, organic directional waves
const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10)
const lerp = (a, b, t) => a + t * (b - a)

// Permutation table for noise
const p = new Array(512)
const permutation = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180]

for (let i = 0; i < 256; i++) {
  p[i] = permutation[i]
  p[256 + i] = permutation[i]
}

const grad3 = (hash, x, y, z) => {
  const h = hash & 15
  const u = h < 8 ? x : y
  const v = h < 4 ? y : h === 12 || h === 14 ? x : z
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v)
}

// 3D Perlin Noise function
const perlin3D = (x, y, z) => {
  const X = Math.floor(x) & 255
  const Y = Math.floor(y) & 255
  const Z = Math.floor(z) & 255

  x -= Math.floor(x)
  y -= Math.floor(y)
  z -= Math.floor(z)

  const u = fade(x)
  const v = fade(y)
  const w = fade(z)

  const A = p[X] + Y, AA = p[A] + Z, AB = p[A + 1] + Z
  const B = p[X + 1] + Y, BA = p[B] + Z, BB = p[B + 1] + Z

  return lerp(
    lerp(
      lerp(grad3(p[AA], x, y, z), grad3(p[BA], x - 1, y, z), u),
      lerp(grad3(p[AB], x, y - 1, z), grad3(p[BB], x - 1, y - 1, z), u),
      v
    ),
    lerp(
      lerp(grad3(p[AA + 1], x, y, z - 1), grad3(p[BA + 1], x - 1, y, z - 1), u),
      lerp(grad3(p[AB + 1], x, y - 1, z - 1), grad3(p[BB + 1], x - 1, y - 1, z - 1), u),
      v
    ),
    w
  )
}

// Fractal Brownian Motion for more organic noise
const fbm = (x, y, z, octaves = 3) => {
  let value = 0
  let amplitude = 1
  let frequency = 1
  let maxValue = 0

  for (let i = 0; i < octaves; i++) {
    value += amplitude * perlin3D(x * frequency, y * frequency, z * frequency)
    maxValue += amplitude
    amplitude *= 0.5
    frequency *= 2
  }

  return value / maxValue
}
// ============ END PERLIN NOISE ============

/**
 * Terrain - Organic Fiber Flow Effect with THICK lines
 * Features:
 * - Real line width control with Line2/LineMaterial
 * - Radial breathing animation (in/out of torus)
 * - Mouse physics interaction
 * - Bottom fade gradient
 */
const Terrain = ({
  position = [6, -5, -18],
  rotation = [-1.2, -0.2, Math.PI],
  torusRadius = 11,
  tubeRadius = 5,
  numLines = 450,
  pointsPerLine = 150, // Aumentado para eliminar los "puntos" y suavizar las curvas
  lineWidth = 2.8,
  shadowColor = '#3a4a52',
  midColor = '#5a6a72',
  highlightColor = '#A8B6BD',
}) => {
  const groupRef = useRef()
  const mouseRef = useRef({ x: 0, y: 0 })
  const smoothMouseRef = useRef({ x: 0, y: 0 })
  const { size } = useThree()

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Generate line data with Z positions for fade effect and VERTEX COLORS
  const linesData = useMemo(() => {
    const lines = []

    // Colores para el degradado estilo "Tinta sobre Papel" (E.C.H.O. style)
    // Líneas oscuras sobre fondo claro para máximo contraste y elegancia
    const colorInside = new THREE.Color('#0f172a')  // Dark Slate / Casi negro (el color de las líneas fuertes)
    const colorOutside = new THREE.Color('#A8B6BD') // Color del fondo (para que se desvanezca suavemente)
    const maxRadius = torusRadius + tubeRadius + 2

    for (let i = 0; i < numLines; i++) {
      const lineRandom = Math.random()
      const lineRandom2 = Math.random()
      const lineRandom3 = Math.random()

      const startToroidal = (i / numLines) * Math.PI * 2
      const toroidalOffset = (Math.random() - 0.5) * 0.25
      const lineLength = 0.35 + lineRandom2 * 0.5
      const lineNoiseOffset = (lineRandom3 - 0.5) * 0.5

      const points = []
      const colors = []  // Array para vertex colors [r, g, b, r, g, b...]
      const zPositions = []

      for (let j = 0; j < pointsPerLine; j++) {
        const t = j / (pointsPerLine - 1)

        const noiseOffset = (Math.sin(i * 0.1 + t * 4) * 0.06) + lineNoiseOffset * t
        // Limit poloidal angle to upper half (0 to PI) for top-only view
        const poloidalAngle = t * Math.PI * lineLength + noiseOffset

        const toroidalDrift = Math.sin(t * Math.PI * 2) * 0.05 + (lineRandom - 0.5) * 0.06 * t
        const toroidalAngle = startToroidal + toroidalOffset + toroidalDrift

        const radiusNoise = (Math.sin(i * 0.3 + t * 3) * 0.15) * lineRandom
        const effectiveRadius = torusRadius + (tubeRadius + radiusNoise) * Math.cos(poloidalAngle)

        const x = effectiveRadius * Math.cos(toroidalAngle)
        const y = effectiveRadius * Math.sin(toroidalAngle)
        const z = tubeRadius * Math.sin(poloidalAngle)

        points.push(x, y, z)
        zPositions.push(z)

        // === VERTEX COLOR CALCULATION ===
        // Calcular distancia al centro (0,0) en el plano XY
        const dist = Math.sqrt(x * x + y * y)

        // Normalizar distancia (0 = centro, 1 = borde)
        const tColor = Math.min(1, dist / maxRadius)

        // Factor adicional basado en Z (puntos más altos = más brillantes)
        const zFactor = Math.max(0, z / tubeRadius) * 0.3

        // Interpolación de color (centro brillante → borde oscuro)
        const pixelColor = new THREE.Color().lerpColors(colorInside, colorOutside, tColor - zFactor)

        // Guardar colores en array plano
        colors.push(pixelColor.r, pixelColor.g, pixelColor.b)
      }

      // Calculate average Z for this line (for visibility)
      const avgZ = zPositions.reduce((a, b) => a + b, 0) / zPositions.length
      const normalizedZ = avgZ / tubeRadius

      // BOTTOM FADE: Hide lines below middle completely
      const bottomFade = normalizedZ < 0 ? 0 : Math.max(0.3, Math.min(1, normalizedZ * 2 + 0.5))

      lines.push({
        points,
        colors,  // Añadir array de colores
        zPositions,
        random: lineRandom,
        phase: lineRandom * Math.PI * 2,
        bottomFade,
        avgZ: normalizedZ
      })
    }

    return lines
  }, [numLines, pointsPerLine, torusRadius, tubeRadius])

  // Create Line2 instances with VERTEX COLORS
  const lineObjects = useMemo(() => {
    return linesData.map((lineData) => {
      const geometry = new LineGeometry()
      geometry.setPositions(lineData.points)
      geometry.setColors(lineData.colors)  // Aplicar colores por vértice

      // Opacity for bottom fade (still useful for hiding bottom lines)
      const baseOpacity = 0.8 + lineData.random * 0.2
      const fadedOpacity = baseOpacity * lineData.bottomFade

      const material = new LineMaterial({
        color: 0xffffff,
        vertexColors: true,
        linewidth: lineWidth,
        dashed: false,
        alphaToCoverage: true, // Ayuda con los bordes suaves
        transparent: false, // CLAVE: Desactivar transparencia real elimina los "nudos"
        depthWrite: true,   // CLAVE: Las líneas se ocluyen correctamente entre sí
        worldUnits: false,
      })

      material.resolution.set(size.width, size.height)

      const line = new Line2(geometry, material)
      line.computeLineDistances()

      return {
        line,
        geometry,
        material,
        data: lineData,
        originalPositions: [...lineData.points],
        baseOpacity
      }
    })
  }, [linesData, lineWidth, size])

  useEffect(() => {
    lineObjects.forEach(({ material }) => {
      material.resolution.set(size.width, size.height)
    })
  }, [size, lineObjects])

  // Animation with mouse physics and radial breathing
  useFrame((state) => {
    if (!groupRef.current) return

    const time = state.clock.getElapsedTime()

    // Smooth mouse with faster response
    const lerpFactor = 0.06
    smoothMouseRef.current.x = THREE.MathUtils.lerp(smoothMouseRef.current.x, mouseRef.current.x, lerpFactor)
    smoothMouseRef.current.y = THREE.MathUtils.lerp(smoothMouseRef.current.y, mouseRef.current.y, lerpFactor)

    // Parallax tilt
    const tiltStrength = 0.15
    groupRef.current.rotation.x = rotation[0] + smoothMouseRef.current.y * tiltStrength
    groupRef.current.rotation.y = rotation[1] + smoothMouseRef.current.x * tiltStrength
    groupRef.current.rotation.z = rotation[2]

    // Animate each line with DIRECTIONAL PERLIN NOISE
    lineObjects.forEach(({ geometry, material, data, originalPositions, baseOpacity }) => {
      const newPositions = []

      // Flow direction - constant direction for waves
      const flowSpeed = 0.25  // Speed of wave travel
      const flowDirection = time * flowSpeed  // Waves travel in one direction

      // Noise parameters
      const noiseScale = 0.10  // Scale of noise features
      const waveAmplitude = 2  // Strength of displacement

      for (let i = 0; i < originalPositions.length; i += 3) {
        const x = originalPositions[i]
        const y = originalPositions[i + 1]
        const z = originalPositions[i + 2]

        const progress = (i / 3) / (originalPositions.length / 3)

        // Calculate direction from center for radial displacement
        const centerDist = Math.sqrt(x * x + y * y)
        const normalizedX = centerDist > 0 ? x / centerDist : 0
        const normalizedY = centerDist > 0 ? y / centerDist : 0

        // === DIRECTIONAL PERLIN NOISE ===
        // Noise coordinates travel in one direction over time
        const noiseX = x * noiseScale + flowDirection
        const noiseY = y * noiseScale + flowDirection * 0.5
        const noiseZ = z * noiseScale + data.phase * 0.1

        // Multi-octave noise for organic waves
        const primaryNoise = fbm(noiseX, noiseY, noiseZ, 3) * waveAmplitude
        const secondaryNoise = fbm(noiseX * 2, noiseY * 2, noiseZ + time * 0.1, 2) * waveAmplitude * 0.3

        // Combine noise layers
        const totalNoise = primaryNoise + secondaryNoise

        // Bell curve - stronger displacement at middle of fiber
        const bellCurve = Math.sin(progress * Math.PI)

        // Radial displacement based on noise
        const radialDisplacement = totalNoise * bellCurve

        // === SUBTLE MOUSE INFLUENCE ===
        const mouseInfluence = progress * 0.3
        const mouseX = smoothMouseRef.current.x * mouseInfluence
        const mouseY = smoothMouseRef.current.y * mouseInfluence

        // Z displacement using noise (directional flow)
        const zNoise = fbm(noiseX * 0.5, noiseY * 0.5, flowDirection * 0.3, 2) * 0.4 * bellCurve

        newPositions.push(
          x + normalizedX * radialDisplacement + mouseX,
          y + normalizedY * radialDisplacement + mouseY,
          z + zNoise + smoothMouseRef.current.y * 0.05 * mouseInfluence
        )
      }

      geometry.setPositions(newPositions)

      // Dynamic opacity based on Z position (real-time fade)
      // Calculate current average Z
      let totalZ = 0
      for (let i = 2; i < newPositions.length; i += 3) {
        totalZ += newPositions[i]
      }
      const currentAvgZ = totalZ / (newPositions.length / 3)
      const normalizedCurrentZ = currentAvgZ / tubeRadius

      // Top-only: hide lines with negative Z completely
      const dynamicFade = normalizedCurrentZ < 0 ? 0 : Math.max(0.3, Math.min(1, normalizedCurrentZ * 2 + 0.5))
      material.opacity = baseOpacity * dynamicFade
    })
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {lineObjects.map(({ line }, index) => (
        <primitive key={index} object={line} />
      ))}
    </group>
  )
}

export default Terrain
