import { PerspectiveCamera } from '@react-three/drei'
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import Terrain from './Terrain'
import EchoText3D from './EchoText3D'
import { useRef, Suspense, useEffect } from 'react'
import gsap from 'gsap'
import { useTransition } from '../context/TransitionContext'

export default function Experience() {
    const cameraRef = useRef()
    const { isTransitioning, completeTransition } = useTransition()

    useEffect(() => {
        if (cameraRef.current && !isTransitioning) {
            // Intro animation simulating a "landing" or "focus"
            gsap.fromTo(cameraRef.current.position,
                { x: 0, y: 3, z: 8 },
                { x: 0, y: 0.5, z: 5, duration: 4, ease: 'power3.out' }
            )
        }
    }, [isTransitioning])

    useEffect(() => {
        if (isTransitioning && cameraRef.current) {
            // TRANSITION EFFECT: WARP SPEED INTO THE TOROID
            // Toroid is at [4, -5, -13]

            const tl = gsap.timeline({
                onComplete: () => {
                    completeTransition()
                }
            })

            // 1. Point camera towards Toroid center roughly
            // slightly offset to fly "through" visible part if needed, but center is better for "portal" feel.

            // Warp Effect: Increase FOV and move Camera
            tl.to(cameraRef.current, {
                fov: 100,
                duration: 1.5,
                ease: 'power2.in',
                onUpdate: () => cameraRef.current.updateProjectionMatrix()
            }, 0)

            tl.to(cameraRef.current.position, {
                x: 4,
                y: -5,
                z: -15, // Go inside/past it
                duration: 2,
                ease: 'expo.in'
            }, 0)
        }
    }, [isTransitioning, completeTransition])

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 2, 6]} ref={cameraRef} fov={50} />

            {/* Background removed to allow CSS background to show through */}
            {/* <color attach="background" args={['#A8B6BD']} /> */}

            {/* Fog to hide edges of the plane - using transparent-ish color */}
            <fog attach="fog" args={['#D4C5C5', 6, 16]} />


            <ambientLight intensity={1.2} />
            <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />

            <Terrain />
            <Suspense fallback={null}>
                <EchoText3D />
            </Suspense>

            <EffectComposer disableNormalPass>
                {/* Subtle effects for clean look */}
                <Bloom luminanceThreshold={0.9} mipmapBlur intensity={0.3} radius={0.4} />
                <Noise opacity={0.02} blendFunction={BlendFunction.OVERLAY} />
            </EffectComposer>
        </>
    )
}
