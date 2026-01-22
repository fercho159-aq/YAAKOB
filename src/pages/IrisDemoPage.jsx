import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import TerrainApps from '../components/TerrainApps'

const IrisDemoPage = () => {
    return (
        <div className="iris-demo-page">
            <div className="iris-canvas-container">
                <Canvas
                    camera={{ position: [0, 0, 18], fov: 60 }} // Camera slightly closer for disc
                    gl={{ alpha: true, antialias: true }}
                >
                    {/* Ambient lighting */}
                    <ambientLight intensity={0.2} />
                    <pointLight position={[0, 0, 10]} intensity={0.5} />

                    {/* The Radial Iris Disc Effect */}
                    <TerrainApps
                        position={[0, 0, 0]}
                        outerRadius={11}
                        innerRadius={0.5}
                        radialLines={180}
                        pointsPerLine={120}
                        lineColor="#5a7a9a" // Gris-azul YAAKOB
                    />

                    {/* Post-processing - más sutil para tema claro */}
                    <EffectComposer>
                        {/* Bloom: muy sutil para el tema claro */}
                        <Bloom
                            luminanceThreshold={0.6}   // Threshold alto - solo brillos muy intensos
                            mipmapBlur={true}
                            intensity={0.4}            // Glow muy sutil
                            radius={0.3}               // Dispersión pequeña
                            levels={5}
                        />

                        {/* Noise: grano muy sutil */}
                        <Noise
                            opacity={0.02}
                        />

                        {/* Vignette: muy suave */}
                        <Vignette
                            eskil={false}
                            offset={0.3}
                            darkness={0.4}
                        />
                    </EffectComposer>

                    {/* Optional: Enable orbit controls for exploration */}
                    <OrbitControls
                        enableZoom={true}
                        enablePan={false}
                        minDistance={5}
                        maxDistance={50}
                    />
                </Canvas>
            </div>

            {/* Overlay UI */}
            <div className="iris-demo-overlay">
                <h1>YAAKOB</h1>
                <p className="iris-subtitle">Be Free</p>
                <div className="iris-info">
                    <span>Tunnel Effect Demo</span>
                </div>
            </div>

            <style>{`
        .iris-demo-page {
          width: 100vw;
          height: 100vh;
          position: relative;
          background: radial-gradient(ellipse at center, #ffffff 0%, #e8ecf0 50%, #d0d8e0 100%);
          overflow: hidden;
        }
        
        .iris-canvas-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        
        .iris-demo-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          z-index: 10;
          pointer-events: none;
        }
        
        .iris-demo-overlay h1 {
          font-family: 'Zen Dots', 'Orbitron', 'Inter', sans-serif;
          font-size: clamp(3rem, 10vw, 7rem);
          font-weight: 700;
          letter-spacing: 0.2em;
          color: #2a3a4a;
          margin: 0;
          text-shadow: 
            2px 2px 4px rgba(255, 255, 255, 0.8),
            -1px -1px 2px rgba(90, 122, 154, 0.2);
        }
        
        .iris-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.8rem, 2vw, 1.2rem);
          letter-spacing: 0.8em;
          color: #5a7a9a;
          text-transform: uppercase;
          margin-top: 1.5rem;
          font-weight: 300;
        }
        
        .iris-info {
          position: absolute;
          bottom: -150px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 2rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          color: rgba(90, 122, 154, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.3em;
        }
      `}</style>
        </div>
    )
}

export default IrisDemoPage
