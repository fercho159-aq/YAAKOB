import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Experience from './components/Experience'
import UI from './components/UI'

function App() {
  return (
    <>
      <UI />
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>
    </>
  )
}

export default App
