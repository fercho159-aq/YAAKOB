import { PerspectiveCamera } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { Suspense, useEffect, useMemo, useRef } from 'react'
import {
  AdditiveBlending,
  BackSide,
  LinearSRGBColorSpace,
  NoToneMapping,
  Vector2,
  Vector3,
  Vector4,
  type PerspectiveCamera as PerspectiveCameraImpl,
  type ShaderMaterial,
} from 'three'

import {
  background,
  camera as cameraConfig,
  composite,
  DEG,
  easeInOutSine,
  easeOutSine,
  eye,
  eyeGroup,
  floaters,
  lens,
  logo,
  parallax,
  splines,
  tagline,
} from './config'
import { createFloaterGeometry } from './floaterData'
import { useFluid, type Fluid } from './fluid'
import { Composite } from './post'
import {
  backgroundFragment,
  backgroundVertex,
  eyeFragment,
  eyeVertex,
  lensFragment,
  lensVertex,
  logoFragment,
  logoVertex,
  floaterFragment,
  floaterVertex,
  splineFragment,
  splineVertex,
  textFragment,
  textVertex,
} from './shaders/landing'
import { createSplineGeometry, SPLINE_TEX_SIZE } from './splineData'
import { useText } from './useFont'
import { rawColor } from './rawColor'
import { useGeometry } from './useGeometry'
import { useSplineData } from './useSplines'
import { useTexture } from './useTexture'

type Transition = { to: number; duration: number; delay: number }

/**
 * Replays one of the engine's shader tweens: 0 -> to over `duration` after
 * `delay`, in ms.
 */
function transitionAt(elapsed: number, { to, duration, delay }: Transition, ease = easeOutSine) {
  const t = elapsed - delay
  return ease(t <= 0 ? 0 : Math.min(1, t / duration)) * to
}

interface LayerProps {
  fluid: Fluid
}

function BackgroundSphere() {
  const ramp = useTexture(background.colorRamp)
  const materialRef = useRef<ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      tColorRamp: { value: ramp },
      uColorRange: { value: new Vector2(...background.uniforms.uColorRange) },
      uBrightness: { value: background.uniforms.uBrightness },
      uNoiseScale: { value: background.uniforms.uNoiseScale },
      uNoiseSpeed: { value: background.uniforms.uNoiseSpeed },
      uSaturation: { value: background.uniforms.uSaturation },
      uContrastAdjust: { value: background.uniforms.uContrastAdjust },
    }),
    [ramp]
  )

  useFrame(({ clock }) => {
    const material = materialRef.current
    if (material) material.uniforms.time.value = clock.elapsedTime
  })

  return (
    <mesh scale={background.scale} renderOrder={0}>
      <sphereGeometry args={[1, 16, 16]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={backgroundVertex}
        fragmentShader={backgroundFragment}
        uniforms={uniforms}
        side={BackSide}
        depthWrite={false}
      />
    </mesh>
  )
}

function Eye({ fluid }: LayerProps) {
  const geometry = useGeometry(eye.geometry)
  const map = useTexture(eye.map, { repeat: true })
  const materialRef = useRef<ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      tMap: { value: map },
      tFluid: { value: fluid.texture },
      uResolution: { value: new Vector2(1, 1) },
      uColor: { value: rawColor(eye.uniforms.uColor) },
      uTile: { value: new Vector2(...eye.uniforms.uTile) },
      uPinchRange: { value: new Vector2(...eye.uniforms.uPinchRange) },
      uFadeRange: { value: new Vector4(...eye.uniforms.uFadeRange) },
      uBands1: { value: new Vector4(...eye.uniforms.uBands1) },
      uBands2: { value: new Vector4(...eye.uniforms.uBands2) },
      uTransition: { value: 0 },
    }),
    [map, fluid]
  )

  useFrame(({ clock, size, viewport }) => {
    const material = materialRef.current
    if (!material) return
    material.uniforms.time.value = clock.elapsedTime
    material.uniforms.tFluid.value = fluid.texture
    // Device pixels, not CSS pixels: the shader divides gl_FragCoord by this,
    // and gl_FragCoord counts the drawing buffer. Feeding it the CSS size makes
    // the lookup run off the end of the fluid texture on any DPR above 1.
    material.uniforms.uResolution.value.set(
      size.width * viewport.dpr,
      size.height * viewport.dpr
    )
    material.uniforms.uTransition.value = transitionAt(clock.elapsedTime * 1000, eye.transition)
  })

  return (
    <mesh
      geometry={geometry}
      position={eye.position}
      rotation={[eye.rotation[0] * DEG, eye.rotation[1] * DEG, eye.rotation[2] * DEG]}
      scale={eye.scale}
      renderOrder={eye.renderOrder}
    >
      {/* The shell folds over itself many times. The engine kept depth writes
          on here, so the near turns occlude the far ones instead of every layer
          blending together — without it the strands read far denser. */}
      <shaderMaterial
        ref={materialRef}
        vertexShader={eyeVertex}
        fragmentShader={eyeFragment}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  )
}

function Lens() {
  const geometry = useGeometry(lens.geometry)
  const matcap = useTexture(lens.matcap)
  const materialRef = useRef<ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({
      tMatcap: { value: matcap },
      uColor: { value: rawColor(lens.uniforms.uColor) },
      uReflectOffset: { value: new Vector3(...lens.uniforms.uReflectOffset) },
      uTransition: { value: 0 },
    }),
    [matcap]
  )

  useFrame(({ clock }) => {
    const material = materialRef.current
    if (!material) return
    material.uniforms.uTransition.value = transitionAt(clock.elapsedTime * 1000, lens.transition)
  })

  return (
    <mesh
      geometry={geometry}
      position={lens.position}
      scale={lens.scale}
      renderOrder={lens.renderOrder}
    >
      <shaderMaterial
        ref={materialRef}
        vertexShader={lensVertex}
        fragmentShader={lensFragment}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  )
}

/** 65,025 points riding the baked splines around the eye. */
function Splines({ fluid }: LayerProps) {
  const data = useSplineData(splines.data)
  const materialRef = useRef<ShaderMaterial>(null)

  const geometry = useMemo(
    () => createSplineGeometry(splines.count, data.splineCount),
    [data.splineCount]
  )

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      tSpline: { value: data.texture },
      tFluid: { value: fluid.texture },
      uSplineTexSize: { value: SPLINE_TEX_SIZE },
      uPerSpline: { value: data.perSpline },
      uColor: { value: rawColor(splines.uniforms.uColor) },
      uSize: { value: splines.uniforms.uSize },
      uLifeFade: { value: new Vector2(...splines.uniforms.uLifeFade) },
      uThickness: { value: splines.thickness },
      uLifetime: { value: splines.lifetime },
      uAlpha: { value: 0 },
      uMouseStrength: { value: 1 },
    }),
    [data, fluid]
  )

  useFrame(({ clock }) => {
    const material = materialRef.current
    if (!material) return
    material.uniforms.time.value = clock.elapsedTime
    material.uniforms.tFluid.value = fluid.texture
    material.uniforms.uAlpha.value = transitionAt(
      clock.elapsedTime * 1000,
      splines.transition,
      easeInOutSine
    )
  })

  return (
    <points
      geometry={geometry}
      position={splines.position}
      scale={splines.scale}
      renderOrder={splines.renderOrder}
      // Real positions live in the spline texture, so the CPU-side bounds are
      // meaningless and three would cull the whole cloud.
      frustumCulled={false}
    >
      <shaderMaterial
        ref={materialRef}
        vertexShader={splineVertex}
        fragmentShader={splineFragment}
        uniforms={uniforms}
        transparent
        depthTest={false}
        depthWrite={false}
      />
    </points>
  )
}

/**
 * The environment dust. Spawn points are fixed, so the geometry is built once
 * and the only per-frame work is the pointer push in the vertex shader.
 */
function Floaters({ fluid }: LayerProps) {
  const materialRef = useRef<ShaderMaterial>(null)

  const geometry = useMemo(() => createFloaterGeometry(floaters.count), [])

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      tFluid: { value: fluid.texture },
      uColor: { value: rawColor(floaters.color) },
      uSize: { value: floaters.uniforms.uSize },
      uScale: { value: new Vector2(...floaters.uniforms.uScale) },
      uAlpha: { value: floaters.uniforms.uAlpha },
      uMouseStrength: { value: 1 },
      DPR: { value: 1 },
    }),
    [fluid]
  )

  useFrame(({ clock, viewport }) => {
    const material = materialRef.current
    if (!material) return
    material.uniforms.time.value = clock.elapsedTime
    material.uniforms.tFluid.value = fluid.texture
    material.uniforms.DPR.value = viewport.dpr
  })

  return (
    <points geometry={geometry} scale={floaters.scale} renderOrder={floaters.renderOrder}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={floaterVertex}
        fragmentShader={floaterFragment}
        uniforms={uniforms}
        transparent
        blending={AdditiveBlending}
        depthTest={false}
        depthWrite={false}
      />
    </points>
  )
}

/** One quad of the logo stack: same atlas, its own band, depth and alpha. */
function LogoLayer({
  layer,
  fluid,
}: LayerProps & { layer: (typeof logo.layers)[number] }) {
  const map = useTexture(logo.map)
  const materialRef = useRef<ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      tMap: { value: map },
      tFluid: { value: fluid.texture },
      uResolution: { value: new Vector2(1, 1) },
      uColor: { value: rawColor(logo.color) },
      uClamp: { value: new Vector2(...layer.clamp) },
      uAlpha: { value: layer.alpha },
      uOutline: { value: layer.outline },
      uFlipClamp: { value: 0 },
      uInvertAnim: { value: 0 },
      uTransition: { value: 0 },
    }),
    [map, fluid, layer]
  )

  useFrame(({ clock, size, viewport }) => {
    const material = materialRef.current
    if (!material) return
    material.uniforms.time.value = clock.elapsedTime
    material.uniforms.tFluid.value = fluid.texture
    // Device pixels; see the note in Eye.
    material.uniforms.uResolution.value.set(
      size.width * viewport.dpr,
      size.height * viewport.dpr
    )
    material.uniforms.uTransition.value = transitionAt(clock.elapsedTime * 1000, logo.transition)
  })

  return (
    <mesh
      position={[logo.position[0], logo.position[1], layer.z]}
      scale={logo.scale}
      renderOrder={layer.renderOrder}
    >
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={logoVertex}
        fragmentShader={logoFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}

function Logo({ fluid }: LayerProps) {
  return (
    <>
      {logo.layers.map((layer, i) => (
        <LogoLayer key={i} layer={layer} fluid={fluid} />
      ))}
    </>
  )
}

/**
 * The services line under the wordmark.
 *
 * In the engine this was a UI button, and clicking it left for /apps. The hit
 * target is a plain invisible quad rather than the glyphs themselves: raycasts
 * against the text geometry only connect on the letter strokes, so the gaps
 * between characters would swallow half the clicks.
 */
function TaglineLine({
  text,
  y,
  scale,
  uniforms,
}: {
  text: string
  y: number
  scale: number
  uniforms: Record<string, { value: unknown }>
}) {
  const layout = useText(tagline.font, text, tagline.letterSpacing)
  return (
    <mesh
      geometry={layout.geometry}
      position={[tagline.position[0], y, tagline.position[2]]}
      scale={scale}
      renderOrder={tagline.renderOrder}
    >
      <shaderMaterial
        vertexShader={textVertex}
        fragmentShader={textFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}

function Tagline({ onBegin, fluid }: { onBegin?: () => void; fluid: Fluid }) {
  const layout = useText(tagline.font, tagline.text, tagline.letterSpacing)
  const atlas = useTexture(tagline.atlas)
  const size = useThree((state) => state.size)
  // The legacy engine's portrait breakpoint: phones get the stacked layout.
  const portrait = size.width < size.height

  // One uniforms object shared by every line's material, so the per-frame
  // update below reaches all of them at once.
  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      tMap: { value: atlas },
      tFluid: { value: fluid.texture },
      uResolution: { value: new Vector2(1, 1) },
      uColor: { value: rawColor(tagline.color) },
      uAlpha: { value: tagline.alpha },
    }),
    [atlas, fluid]
  )

  useFrame(({ clock, size: frameSize, viewport }) => {
    uniforms.time.value = clock.elapsedTime
    uniforms.tFluid.value = fluid.texture
    // Device pixels; see the note in Eye.
    uniforms.uResolution.value.set(frameSize.width * viewport.dpr, frameSize.height * viewport.dpr)
  })

  // The layout is in font units; scale the whole line to its world width. The
  // portrait lines reuse the same factor so every glyph keeps its size.
  const scale = tagline.width / layout.width

  const { lines, top, lineStep } = tagline.portrait
  const hitHeight = portrait ? lineStep * (lines.length - 1) + tagline.hitHeight : tagline.hitHeight
  const hitY = portrait ? top - (lineStep * (lines.length - 1)) / 2 : tagline.position[1]

  return (
    <>
      {portrait ? (
        lines.map((line, i) => (
          <TaglineLine key={line} text={line} y={top - i * lineStep} scale={scale} uniforms={uniforms} />
        ))
      ) : (
        <mesh
          geometry={layout.geometry}
          position={tagline.position}
          scale={scale}
          renderOrder={tagline.renderOrder}
        >
          <shaderMaterial
            vertexShader={textVertex}
            fragmentShader={textFragment}
            uniforms={uniforms}
            transparent
            depthWrite={false}
          />
        </mesh>
      )}

      {onBegin ? (
        <mesh
          position={[tagline.position[0], hitY, tagline.position[2] + 0.01]}
          onClick={onBegin}
          onPointerOver={() => {
            document.body.style.cursor = 'pointer'
          }}
          onPointerOut={() => {
            document.body.style.cursor = ''
          }}
        >
          <planeGeometry args={[tagline.width * 1.04, hitHeight]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      ) : null}
    </>
  )
}

/**
 * Camera placement, the editor's aspect-driven FOV (which widens the lens on
 * portrait viewports), and the pointer parallax the level's game camera ran.
 * The level's lookAt sits straight down -Z, so the default orientation matches.
 */
function CameraRig() {
  const size = useThree((state) => state.size)
  const pointer = useThree((state) => state.pointer)
  const cameraRef = useRef<PerspectiveCameraImpl>(null)

  // R3F's pointer keeps its last value when the cursor leaves the window, so
  // the parallax would park the whole scene off to one side indefinitely —
  // the background at z=-18 swings hard enough to read as "the page broke".
  // Ease back to centre whenever the pointer is gone.
  const pointerActive = useRef(false)
  useEffect(() => {
    const on = () => {
      pointerActive.current = true
    }
    const off = () => {
      pointerActive.current = false
    }
    window.addEventListener('pointermove', on)
    document.documentElement.addEventListener('pointerleave', off)
    window.addEventListener('blur', off)
    return () => {
      window.removeEventListener('pointermove', on)
      document.documentElement.removeEventListener('pointerleave', off)
      window.removeEventListener('blur', off)
    }
  }, [])

  useFrame(() => {
    const camera = cameraRef.current
    if (!camera) return
    const px = pointerActive.current ? pointer.x : 0
    const py = pointerActive.current ? pointer.y : 0
    const targetX = cameraConfig.position[0] + px * parallax.move[0]
    const targetY = cameraConfig.position[1] + py * parallax.move[1]
    camera.position.x += (targetX - camera.position.x) * parallax.lerp
    camera.position.y += (targetY - camera.position.y) * parallax.lerp
    // Keep aiming at the level's target, so the logo holds its place.
    camera.lookAt(...cameraConfig.lookAt)
  })

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={cameraConfig.position}
      fov={cameraConfig.fovForAspect(size.width / size.height)}
      near={cameraConfig.near}
      far={cameraConfig.far}
    />
  )
}

function Landing({ onBegin }: SceneProps) {
  const fluid = useFluid()

  return (
    <>
      <BackgroundSphere />
      <Floaters fluid={fluid} />
      <group
        position={eyeGroup.position}
        rotation={[
          eyeGroup.rotation[0] * DEG,
          eyeGroup.rotation[1] * DEG,
          eyeGroup.rotation[2] * DEG,
        ]}
        scale={eyeGroup.scale}
      >
        <Eye fluid={fluid} />
        <Lens />
        <Splines fluid={fluid} />
      </group>
      <Logo fluid={fluid} />
      <Tagline onBegin={onBegin} fluid={fluid} />

      {/* The engine's post chain: UnrealBloom, then the Composite pass. */}
      <EffectComposer>
        <Bloom
          intensity={composite.bloom.intensity * composite.bloom.strength}
          luminanceThreshold={composite.bloom.luminanceThreshold}
          radius={composite.bloom.radius}
          mipmapBlur
        />
        <Composite fluid={fluid} />
      </EffectComposer>
    </>
  )
}

export interface SceneProps {
  /**
   * Called when the services line is clicked. The engine drove this from its
   * own UI button; pass a handler to keep that route alive, or leave it out and
   * the line renders as plain text.
   */
  onBegin?: () => void
}

/**
 * The landing scene, rebuilt on react-three-fiber: background sphere, eye,
 * lens, spline particles, logo stack, services line, pointer fluid and camera
 * parallax.
 *
 * One thing the legacy engine had that this does not: a portrait breakpoint.
 * The engine swapped in its own `-portrait` transforms, while this only widens
 * the FOV the way the editor's `dynamicFOVCode` did.
 */
export function Scene({ onBegin }: SceneProps = {}) {
  return (
    <Canvas
      style={{ position: 'fixed', inset: 0 }}
      dpr={[1, 2]}
      // The engine wrote straight to the backbuffer: no filmic curve, and no
      // colour management either. Leaving the renderer on sRGB output makes the
      // post chain re-encode values that were never linear, washing the frame
      // out by ~30/255.
      gl={{ antialias: true, toneMapping: NoToneMapping, outputColorSpace: LinearSRGBColorSpace }}
    >
      <CameraRig />
      <Suspense fallback={null}>
        <Landing onBegin={onBegin} />
      </Suspense>
    </Canvas>
  )
}
