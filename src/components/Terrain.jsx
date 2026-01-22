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
 * Terrain - E.C.H.O. Style
 * Features:
 * - Sparse, organic fibers (hair-like)
 * - Gentle flow and breathing
 * - High elegance, low noise
 * - "Ink on Paper" aesthetic (Dark lines, Light background)
 */
const Terrain = ({
  position = [4, -5, -13],
  rotation = [-1.2, -0.2, Math.PI],
  torusRadius = 10, // Wider, more expansive
  tubeRadius = 5,   // Flatter
  numLines = 200,   // Much more sparse (E.C.H.O. style is clean)
  pointsPerLine = 100, // Very smooth curves
  lineWidth = 1.6,  // Thinner lines
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

    // Paleta E.C.H.O. Refinada
    // Fondo: #A8B6BD (Gris Azulado Claro)
    // Líneas: #1e293b (Slate oscuro) a #A8B6BD (Fade)
    const colorInside = new THREE.Color('#1e293b')  // Dark, but not pitch black
    const colorOutside = new THREE.Color('#A8B6BD') // Matches background exactly

    for (let i = 0; i < numLines; i++) {
      const lineRandom = Math.random()

      const startToroidal = (i / numLines) * Math.PI * 2
      const toroidalOffset = (Math.random() - 0.5) * 0.5 // More random distribution

      const lineLength = 0.7 + Math.random() * 0.3 // Long, flowing lines

      const points = []
      const colors = []
      const zPositions = []

      for (let j = 0; j < pointsPerLine; j++) {
        const t = j / (pointsPerLine - 1)

        // De PI (Centro) hacia afuera, suave
        const poloidalAngle = Math.PI - (t * Math.PI * lineLength)

        // Less jitter, more flow
        const toroidalDrift = Math.sin(t * Math.PI) * 0.1 * (lineRandom - 0.5)
        const toroidalAngle = startToroidal + toroidalOffset + toroidalDrift

        // Radius variation - organic swelling
        const resultRadius = torusRadius + (tubeRadius * Math.cos(poloidalAngle))

        const x = resultRadius * Math.cos(toroidalAngle)
        const y = resultRadius * Math.sin(toroidalAngle)
        const z = tubeRadius * Math.sin(poloidalAngle)

        // Recorte MENOS agresivo para permitir fade progresivo desde abajo
        if (z < 0.5) continue;

        points.push(x, y, z)
        zPositions.push(z)

        // Degradado muy suave y PROGRESIVO
        // z va de ~0.5 a 5 (tubeRadius)
        // tColor 0 = abajo (fade), 1 = arriba (oscuro)

        let tColor = (z - 0.5) / 3.0
        tColor = Math.max(0, Math.min(1, tColor))

        // "Menor transparencia" -> Llevar a color full más rápido
        // "Aparecer progresivamente" -> Empieza suave, pero la curva se satura rápido
        // Power < 1 hace que llegue a oscuro mas rapido (ej. sqrt)
        // Power > 1 hace que se mantenga claro mas tiempo

        // Usamos power pequeño (0.4) para que sea "progressivo" al inicio pero gane opacidad rapido
        const mixFactor = Math.pow(tColor, 0.4)

        // Lerp from Background (invisible) to Dark
        const pixelColor = new THREE.Color().lerpColors(colorOutside, colorInside, mixFactor)

        colors.push(pixelColor.r, pixelColor.g, pixelColor.b)
      }

      if (points.length < 10) continue;

      lines.push({
        points,
        colors,
        zPositions,
        random: lineRandom,
        phase: lineRandom * Math.PI * 2,
      })
    }

    return lines
  }, [numLines, pointsPerLine, torusRadius, tubeRadius])

  // Create Line2 instances
  const lineObjects = useMemo(() => {
    return linesData.map((lineData) => {
      const geometry = new LineGeometry()
      geometry.setPositions(lineData.points)
      geometry.setColors(lineData.colors)

      const material = new LineMaterial({
        color: 0xffffff,
        vertexColors: true,
        linewidth: lineWidth,
        dashed: false,
        alphaToCoverage: true,
        transparent: false, // Solid lines for clarity, fade handled by color
        depthWrite: true,
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
      }
    })
  }, [linesData, lineWidth, size])

  useEffect(() => {
    lineObjects.forEach(({ material }) => {
      material.resolution.set(size.width, size.height)
    })
  }, [size, lineObjects])

  useFrame((state) => {
    if (!groupRef.current) return

    const time = state.clock.getElapsedTime()

    const lerpFactor = 0.05
    smoothMouseRef.current.x = THREE.MathUtils.lerp(smoothMouseRef.current.x, mouseRef.current.x, lerpFactor)
    smoothMouseRef.current.y = THREE.MathUtils.lerp(smoothMouseRef.current.y, mouseRef.current.y, lerpFactor)

    // Gentle Sway
    groupRef.current.rotation.x = rotation[0] + Math.sin(time * 0.2) * 0.02 + smoothMouseRef.current.y * 0.05
    groupRef.current.rotation.y = rotation[1] + Math.cos(time * 0.15) * 0.02 + smoothMouseRef.current.x * 0.05
    groupRef.current.rotation.z = rotation[2]

    lineObjects.forEach(({ geometry, material, data, originalPositions }) => {
      const newPositions = []

      // Extremely slow, graceful flow
      const flowTime = time * 0.1

      // Large soft noise
      const noiseScale = 0.04
      const waveAmp = 1.0

      for (let i = 0; i < originalPositions.length; i += 3) {
        const x = originalPositions[i]
        const y = originalPositions[i + 1]
        const z = originalPositions[i + 2]

        // Directional Noise Flow
        const nX = x * noiseScale + flowTime
        const nY = y * noiseScale
        const nZ = z * noiseScale

        // FBM for detail using very smooth settings
        const displacement = fbm(nX, nY, nZ, 2) * waveAmp

        // Apply displacement mostly in Z/Normal direction to simulate "breathing" or "swelling"
        // Also a bit of lateral movement

        newPositions.push(
          x + displacement * 0.5,
          y + displacement * 0.5,
          z + displacement
        )
      }

      geometry.setPositions(newPositions)
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
