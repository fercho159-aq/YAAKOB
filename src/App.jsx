import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Experience from './components/Experience'
import ExperienceApps from './components/ExperienceApps'
import UI from './components/UI'
import HexagonBackground from './components/HexagonBackground'
import AppsPage from './pages/AppsPage'
import ContactPage from './pages/ContactPage'
import IrisDemoPage from './pages/IrisDemoPage'
import { TransitionProvider, useTransition } from './context/TransitionContext'

function HomePage() {
  return (
    <>
      <HexagonBackground />
      <UI />
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>
    </>
  )
}

function AppsPageWithBackground() {
  return (
    <>
      <HexagonBackground />
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: '#02050a', position: 'fixed', top: 0, left: 0, zIndex: 0 }}
      >
        <Suspense fallback={null}>
          <ExperienceApps />
        </Suspense>
      </Canvas>
      <AppsPage />
    </>
  )

}

function ContactPageWithBackground() {
  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: '#02050a', zIndex: -1 }} />
      <HexagonBackground />
      <ContactPage />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <TransitionProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/apps" element={<AppsPageWithBackground />} />
          <Route path="/contacto" element={<ContactPageWithBackground />} />
          <Route path="/iris-demo" element={<IrisDemoPage />} />
        </Routes>
      </TransitionProvider>
    </BrowserRouter>
  )
}

export default App
