import { PerspectiveCamera } from '@react-three/drei'
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import Terrain from './Terrain'
import EchoText3D from './EchoText3D'
import { useEffect, useRef, Suspense } from 'react'
import gsap from 'gsap'

export default function Experience() {
    const cameraRef = useRef()

    useEffect(() => {
        if (cameraRef.current) {
            // Intro animation simulating a "landing" or "focus"
            gsap.fromTo(cameraRef.current.position,
                { x: 0, y: 3, z: 8 },
                { x: 0, y: 0.5, z: 5, duration: 4, ease: 'power3.out' }
            )
        }
    }, [])

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 2, 6]} ref={cameraRef} fov={50} />

            {/* Background removed to allow CSS background to show through */}
            {/* <color attach="background" args={['#A8B6BD']} /> */}

            {/* Fog to hide edges of the plane - using transparent-ish color */}
            <fog attach="fog" args={['#A8B6BD', 6, 16]} />


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
