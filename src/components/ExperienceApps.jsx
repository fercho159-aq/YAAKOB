import { PerspectiveCamera } from '@react-three/drei'
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import TerrainApps from './TerrainApps'
import HumanoidParticles from './HumanoidParticles'
import { useEffect, useRef, Suspense } from 'react'
import gsap from 'gsap'

export default function ExperienceApps({ isTransitioning, onTransitionComplete }) {
    const cameraRef = useRef()

    useEffect(() => {
        if (cameraRef.current) {
            // Smoother, slower zoom animation
            gsap.fromTo(cameraRef.current.position,
                { x: 0, y: 1.2, z: 6 },
                { x: 0, y: 0.8, z: 5.5, duration: 4, ease: 'power1.out', delay: 0.2 }
            )
        }
    }, [])

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 1.2, 6]} ref={cameraRef} fov={50} />

            {/* Light fog matching home page */}
            <fog attach="fog" args={['#A8B6BD', 6, 16]} />

            {/* Bright, clean lighting */}
            <ambientLight intensity={1.2} />
            <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />

            <TerrainApps isTransitioning={isTransitioning} onTransitionComplete={onTransitionComplete} />

            <Suspense fallback={null}>
                <HumanoidParticles />
            </Suspense>

            <EffectComposer disableNormalPass>
                <Bloom luminanceThreshold={0.8} mipmapBlur intensity={0.4} radius={0.4} />
                <Noise opacity={0.02} blendFunction={BlendFunction.OVERLAY} />
            </EffectComposer>
        </>
    )
}
