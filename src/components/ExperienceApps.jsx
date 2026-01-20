import { PerspectiveCamera } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import TerrainApps from './TerrainApps'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function ExperienceApps() {
    const cameraRef = useRef()

    useEffect(() => {
        if (cameraRef.current) {
            // Subtle zoom animation for apps page
            gsap.fromTo(cameraRef.current.position,
                { x: 0, y: 2, z: 7 },
                { x: 0, y: 0.8, z: 5.5, duration: 3, ease: 'power2.out' }
            )
        }
    }, [])

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 1.5, 6]} ref={cameraRef} fov={50} />

            {/* Light fog matching home page */}
            <fog attach="fog" args={['#c5d3da', 6, 16]} />

            {/* Bright, clean lighting */}
            <ambientLight intensity={1.2} />
            <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />

            <TerrainApps />

            <EffectComposer disableNormalPass>
                <Bloom luminanceThreshold={0.5} mipmapBlur intensity={0.8} radius={0.6} />
                <Noise opacity={0.03} blendFunction={BlendFunction.OVERLAY} />
                <Vignette eskil={false} offset={0.1} darkness={0.8} />
            </EffectComposer>
        </>
    )
}
