import React, { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const ParticleLogo = ({ type = 'apple' }) => {
    const pointsRef = useRef()

    // Generate points based on Signed Distance Functions (SDF) or simple math forms
    const { positions, originalPositions } = useMemo(() => {
        const tempPositions = []
        const count = 1200 // Number of dots
        const gridDensity = 40 // Grid resolution

        // Helper to check if point is inside shape
        const isInside = (x, y) => {
            if (type === 'google') {
                // Triangle pointing right
                // Vertices roughly: (-0.5, 0.5), (-0.5, -0.5), (0.5, 0)
                // x range -0.4 to 0.4 ideally
                // Simple inequalities for a triangle tip at (0.4, 0), base at x=-0.4
                // y goes from -0.4 to 0.4

                // Shift x to center
                const px = x + 0.1
                // Check bounds
                if (px > 0.5 || px < -0.3) return false

                // Top edge: y = -x + 0.5 (roughly) -> y < -x + offset
                // Bottom edge: y > x - offset
                const slope = 0.8
                if (Math.abs(y) < (0.5 - px) * slope) return true

                return false
            } else {
                // Apple Logo Approximation
                // Body: Heart-ish shape + Bite + Leaf

                // 1. Leaf
                // Ellipse at top right
                // Center (0.1, 0.45), radii (0.15, 0.08) rotated
                const lx = x - 0.05
                const ly = y - 0.45
                // Rotate 45 deg
                const rlx = lx * 0.707 - ly * 0.707
                const rly = lx * 0.707 + ly * 0.707
                if ((rlx * rlx) / (0.005) + (rly * rly) / (0.03) < 1) return true

                // 2. Body
                // Shift down
                const by = y + 0.1
                const bx = x

                // Bite (Circle subtraction)
                if ((bx - 0.25) * (bx - 0.25) + (by - 0.05) * (by - 0.05) < 0.09) return false;

                // Main body (Simplified rounded shape/cardioid-ish)
                // Two circles?
                // Left circle (-0.15, 0), r=0.25
                // Right circle (0.15, 0), r=0.25
                // But needs to be flatter
                // Let's use a superellipse or just a circle that is wider

                // Simple approximation: Circle radius 0.35, squeezed/distorted
                // (x)^2 + (y*1.2)^2 < 0.15 ?

                // Better: Implicit heart equation modified
                // (x^2 + y^2 - 0.3)^3 - x^2 * y^3 < 0 ? (too complex to tune)

                // Constructive Solid Geometry:
                // Box roundness
                const d = Math.sqrt(bx * bx + by * by)

                // Apple shape: squarish circle with dimples top/bottom
                // r = 0.35
                let angle = Math.atan2(by, bx)
                let r = 0.35 - 0.05 * Math.cos(2 * angle) // Simple dimple top/bottom
                // widen top
                if (by > 0) r += 0.05 * Math.abs(Math.sin(angle))

                if (d < r) return true;

                return false
            }
        }

        // Scan a grid
        for (let i = 0; i < gridDensity; i++) {
            for (let j = 0; j < gridDensity; j++) {
                // Normalize to -0.5 to 0.5
                const x = (i / gridDensity) - 0.5
                const y = (j / gridDensity) - 0.5

                // Add some jitter
                if (isInside(x, y)) {
                    tempPositions.push(x * 3, y * 3, 0) // Scale up to fit view
                }
            }
        }

        return {
            positions: new Float32Array(tempPositions),
            originalPositions: new Float32Array(tempPositions)
        }
    }, [type])

    useFrame((state) => {
        if (!pointsRef.current) return

        const positionsAttribute = pointsRef.current.geometry.attributes.position
        const t = state.clock.getElapsedTime()

        // Animation loop
        for (let i = 0; i < positionsAttribute.count; i++) {
            // Target
            const tx = originalPositions[i * 3]
            const ty = originalPositions[i * 3 + 1]
            const tz = originalPositions[i * 3 + 2]

            // "Assemble" effect:
            // Lerp from a scattered position based on time
            // Let's say animation takes 1.5 seconds.
            // Using a simple dampening or noise

            // We can just add noise that decreases over time?
            // User said "assemble as popup comes out"
            // We assume component mounts when popup mounts.

            // Current pos
            // We can simulate "flying in" by adding an offset that decays
            const progress = Math.min(t * 0.8, 1.0) // 0 to 1 over 1.25s
            const ease = 1 - Math.pow(1 - progress, 3) // Cubic out

            // Scatter start: random places
            // Actually, let's just use shader-like logic in JS for simplicity (low particle count)
            // Start z = 5 (towards camera), x, y random
            // End z = 0

            // Deterministic random pseudo based on index
            const rndX = Math.sin(i) * 5
            const rndY = Math.cos(i) * 5
            const rndZ = Math.sin(i * 1.3) * 5

            const x = THREE.MathUtils.lerp(rndX, tx, ease)
            const y = THREE.MathUtils.lerp(rndY, ty, ease)
            const z = THREE.MathUtils.lerp(rndZ, tz, ease)

            positionsAttribute.setXYZ(i, x, y, z)
        }
        positionsAttribute.needsUpdate = true

        // Rotate slightly
        pointsRef.current.rotation.y = Math.sin(t * 0.5) * 0.2
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
                color={type === 'google' ? "#ffffff" : "#ffffff"} // White dots for logos
                transparent
                opacity={0.9}
                sizeAttenuation={true}
            />
        </points>
    )
}

export default ParticleLogo
