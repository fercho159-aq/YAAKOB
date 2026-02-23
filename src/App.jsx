import { Canvas } from '@react-three/fiber'
import { Suspense, useState, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Experience from './components/Experience'
import ExperienceApps from './components/ExperienceApps'
import UI from './components/UI'
import HexagonBackground from './components/HexagonBackground'
import Preloader from './components/Preloader'
import { TransitionProvider, useTransition } from './context/TransitionContext'

// Code-split pages that aren't needed on first load
const AppsPage = lazy(() => import('./pages/AppsPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const SupportPage = lazy(() => import('./pages/SupportPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const IrisDemoPage = lazy(() => import('./pages/IrisDemoPage'))

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

// AppsPageWithBackground
function AppsPageWithBackground() {
  const { isTransitioning, completeTransition } = useTransition()
  return (
    <>
      <HexagonBackground />
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: '#050100', position: 'fixed', top: 0, left: 0, zIndex: 0 }}
      >
        <Suspense fallback={null}>
          <ExperienceApps isTransitioning={isTransitioning} onTransitionComplete={completeTransition} />
        </Suspense>
      </Canvas>
      <Suspense fallback={null}>
        <AppsPage />
      </Suspense>
    </>
  )
}

function ContactPageWithBackground() {
  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: '#050100', zIndex: -1 }} />
      <HexagonBackground />
      <Suspense fallback={null}>
        <ContactPage />
      </Suspense>
    </>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)

  const handlePreloaderComplete = () => {
    setIsLoading(false)
  }

  return (
    <BrowserRouter>
      <TransitionProvider>
        {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/apps" element={<AppsPageWithBackground />} />
          <Route path="/contacto" element={<ContactPageWithBackground />} />
          <Route path="/nosotros" element={<Suspense fallback={null}><AboutPage /></Suspense>} />
          <Route path="/soporte" element={<Suspense fallback={null}><SupportPage /></Suspense>} />
          <Route path="/iris-demo" element={<Suspense fallback={null}><IrisDemoPage /></Suspense>} />
        </Routes>
      </TransitionProvider>
    </BrowserRouter>
  )
}

export default App
