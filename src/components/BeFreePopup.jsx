import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Center } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import ParticleLogo from './ParticleLogo'

// El objeto 3D hecho de puntos (ahora un Recuadro/Caja)
const PointsMesh = () => {
    const meshRef = useRef()

    // Geometria: Caja rectangular plana (tipo ventana modal)
    // Args: Width, Height, Depth, SegmentsWidth, SegmentsHeight, SegmentsDepth
    // Aumentamos segmentos para que se vea tupido como un "panel de energia"
    const geometry = useMemo(() => new THREE.BoxGeometry(3.5, 2, 0.5, 64, 32, 8), [])

    useFrame((state) => {
        if (meshRef.current) {
            // Rotación sutil "respirando" o flotando, no girando locamente
            const t = state.clock.getElapsedTime();
            // Muy poca rotacion para que parezca una ventana UI flotante
            meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.05;
            meshRef.current.rotation.y = Math.sin(t * 0.3) * 0.1;
        }
    })

    return (
        <points ref={meshRef}>
            <primitive object={geometry} attach="geometry" />
            <pointsMaterial
                size={0.03}
                color="#00ffff"
                transparent
                opacity={0.8}
                sizeAttenuation={true}
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}

// Scene setup with lights/environment if needed
const Scene = ({ onClose }) => {
    const groupRef = useRef()

    useEffect(() => {
        // Entrance animation
        gsap.fromTo(groupRef.current.scale,
            { x: 0, y: 0, z: 0 },
            { x: 1, y: 1, z: 1, duration: 1.5, ease: "elastic.out(1, 0.5)" }
        )
    }, [])

    return (
        <group ref={groupRef}>
            <PointsMesh />

            {/* HTML UI inside canvas for correct z-indexing relative to 3D if desired, 
          but usually easier to overlay standard HTML.
          However, putting text inside can be cool. */}
            {/* <Html center>
        <div style={{ color: 'white', textAlign: 'center', pointerEvents: 'none' }}>
          <h2>FREEDOM</h2>
        </div>
      </Html> */}
        </group>
    )
}

export default function BeFreePopup({ onClose }) {
    const containerRef = useRef()

    useEffect(() => {
        // Fade in background
        gsap.fromTo(containerRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5 }
        )
    }, [])

    const handleClose = () => {
        gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.5,
            onComplete: onClose
        })
    }

    return (
        <div
            ref={containerRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0,0,0,0.85)',
                zIndex: 3000,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backdropFilter: 'blur(5px)'
            }}
        >
            <div style={{ position: 'absolute', top: '20px', right: '40px', zIndex: 3001 }}>
                <button
                    onClick={handleClose}
                    style={{
                        background: 'transparent',
                        border: '1px solid #00ffff',
                        color: '#00ffff',
                        padding: '10px 20px',
                        borderRadius: '50px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#00ffff'; e.currentTarget.style.color = '#000'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#00ffff'; }}
                >
                    Cerrar
                </button>
            </div>

            {/* 3D Background removed as requested */}
            {/* <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
                <Canvas camera={{ position: [0, 0, 4] }} gl={{ alpha: true }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <Scene onClose={onClose} />
                </Canvas>
            </div> */}

            {/* Content Overlay */}
            <div style={{
                zIndex: 3002,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '30px',
                textAlign: 'center',
                color: '#fff',
                fontFamily: "'Orbitron', sans-serif" // Assuming font is available or fallback
            }}>
                <h2 style={{
                    fontSize: '2.5rem',
                    fontWeight: '700',
                    letterSpacing: '0.3rem',
                    marginBottom: '10px',
                    textShadow: '0 0 20px #00ffff',
                    margin: 0
                }}>
                    YAAKOB APP
                </h2>
                <p style={{
                    fontSize: '1rem',
                    letterSpacing: '0.1rem',
                    color: '#a0a0a0',
                    maxWidth: '400px',
                    lineHeight: '1.5'
                }}>
                    Lleva la experiencia inmersiva a donde vayas. <br /> Disponible ahora.
                </p>



                <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                    {/* App Store Button */}
                    <button
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            background: 'rgba(0, 0, 0, 0.6)',
                            border: '1px solid #00ffff',
                            padding: '10px 24px', // Reduced vertical padding slightly
                            borderRadius: '12px',
                            color: '#fff',
                            cursor: 'pointer',
                            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                            height: '70px', // Fixed height for consistency
                            minWidth: '220px'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        {/* 3D Apple Logo */}
                        <div style={{ width: '40px', height: '40px', position: 'relative' }}>
                            <Canvas camera={{ position: [0, 0, 3] }} gl={{ alpha: true }} dpr={[1, 2]}>
                                <ambientLight intensity={1} />
                                <ParticleLogo type="apple" />
                            </Canvas>
                        </div>

                        <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: '10px', textTransform: 'uppercase' }}>Download on the</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>App Store</div>
                        </div>
                    </button>

                    {/* Google Play Button */}
                    <button
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            background: 'rgba(0, 0, 0, 0.6)',
                            border: '1px solid #00ffff',
                            padding: '10px 24px',
                            borderRadius: '12px',
                            color: '#fff',
                            cursor: 'pointer',
                            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                            height: '70px',
                            minWidth: '220px'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        {/* 3D Play Logo */}
                        <div style={{ width: '40px', height: '40px', position: 'relative' }}>
                            <Canvas camera={{ position: [0, 0, 3] }} gl={{ alpha: true }} dpr={[1, 2]}>
                                <ambientLight intensity={1} />
                                <ParticleLogo type="google" />
                            </Canvas>
                        </div>

                        <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: '10px', textTransform: 'uppercase' }}>Get it on</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>Google Play</div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}
