import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import {
  HalfFloatType,
  Mesh,
  NearestFilter,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderTarget,
  type Texture,
} from 'three'

/**
 * Pointer fluid.
 *
 * The engine ran a full Navier-Stokes solver (advect, divergence, pressure,
 * gradient subtract) and handed every shader two textures: `tFluid` with the
 * velocity field and `tFluidMask` with where the pointer has been. What the
 * landing does with them is small — a sub-pixel uv nudge on the eye, a sparkle
 * on the logo fill, a shove on the particles — so this is the cheap version:
 * self-advection plus decay, no pressure projection.
 *
 * One difference the shaders have to know about: the engine kept the mask in
 * its own texture, this packs it into the blue channel of the same one. Ported
 * GLSL therefore reads the mask from `.b`, not `.r`.
 */
const SIZE = 256

const simVertex = /* glsl */ `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
}
`

const simFragment = /* glsl */ `
uniform sampler2D tPrev;
uniform vec2 uPointer;
uniform vec2 uPointerPrev;
uniform vec2 uVelocity;
uniform float uAdvect;
uniform float uRadius;
uniform float uDecay;
uniform float uMaskGain;
uniform float uMaskDecay;
uniform float uAspect;

varying vec2 vUv;

void main() {
    // Self-advection: step back along the field and pick up what was there.
    // The step has to stay within a few texels. The velocity saturates on a
    // fast flick, and a large factor here samples most of a screen away, which
    // wipes the trail instead of carrying it.
    vec2 prevVelocity = texture2D(tPrev, vUv).xy;
    vec2 source = vUv - prevVelocity * uAdvect;
    vec4 prev = texture2D(tPrev, source);

    // Splat along the segment the pointer covered since the last frame, not at
    // a single point: a fast flick moves hundreds of pixels between frames, and
    // a point splat would leave the trail full of gaps.
    vec2 pa = vUv - uPointerPrev;
    vec2 ba = uPointer - uPointerPrev;
    float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-6), 0.0, 1.0);
    vec2 delta = (pa - ba * h) * vec2(uAspect, 1.0);
    float splat = exp(-dot(delta, delta) / uRadius);

    vec2 velocity = prev.xy * uDecay + uVelocity * splat;

    // The mask is deliberately weak and short-lived. Consumers run it through
    // smoothstep(0.0, 0.1, mask), so a mask that reached 1 would saturate them
    // across the whole pointer trail — on the logo that swaps the letters'
    // solid fill for the dissolve pattern and eats the wordmark.
    float mask = max(prev.z * uMaskDecay, splat * uMaskGain);

    gl_FragColor = vec4(clamp(velocity, -1.0, 1.0), mask, 1.0);
}
`

class FluidSim {
  readonly scene = new Scene()
  readonly camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
  readonly material: ShaderMaterial
  private targets: [WebGLRenderTarget, WebGLRenderTarget]
  private current = 0

  constructor() {
    const options = {
      type: HalfFloatType,
      minFilter: NearestFilter,
      magFilter: NearestFilter,
      depthBuffer: false,
    }
    this.targets = [
      new WebGLRenderTarget(SIZE, SIZE, options),
      new WebGLRenderTarget(SIZE, SIZE, options),
    ]
    this.material = new ShaderMaterial({
      vertexShader: simVertex,
      fragmentShader: simFragment,
      uniforms: {
        tPrev: { value: this.targets[1].texture },
        uPointer: { value: new Vector2(0.5, 0.5) },
        uPointerPrev: { value: new Vector2(0.5, 0.5) },
        uVelocity: { value: new Vector2() },
        /** Advection step, in uv units per frame. Keep it small. */
        uAdvect: { value: 0.015 },
        // Tuned against the live page: the pointer leaves a trail about this
        // wide, and it clears in roughly a second.
        uRadius: { value: 0.004 },
        uDecay: { value: 0.955 },
        // Full strength, like the engine: the dissolve is meant to take over
        // the letters it touches, not tint them. Holding the mask below the
        // 0.1 the consumers ramp over leaves a half dissolved rectangle
        // instead, which reads as a smudge rather than an effect.
        uMaskGain: { value: 1 },
        uMaskDecay: { value: 0.955 },
        uAspect: { value: 1 },
      },
      depthTest: false,
      depthWrite: false,
    })
    this.scene.add(new Mesh(new PlaneGeometry(2, 2), this.material))
  }

  /** The texture the scene shaders sample: xy velocity, z mask. */
  get texture(): Texture {
    return this.targets[this.current].texture
  }

  swap() {
    this.material.uniforms.tPrev.value = this.targets[this.current].texture
    this.current = 1 - this.current
  }

  get target() {
    return this.targets[this.current]
  }

  dispose() {
    this.targets[0].dispose()
    this.targets[1].dispose()
    this.material.dispose()
  }
}

export interface Fluid {
  /**
   * xy = velocity, z = mask. The sim ping-pongs, so this changes identity every
   * frame: consumers must re-read it each frame rather than capture it once.
   */
  readonly texture: Texture
}

/**
 * Runs the sim ahead of the scene render (negative `useFrame` priority) and
 * returns the texture to hand the landing shaders.
 */
export function useFluid(): Fluid {
  const gl = useThree((state) => state.gl)
  const size = useThree((state) => state.size)
  const pointer = useThree((state) => state.pointer)

  const simRef = useRef<FluidSim>(null)
  simRef.current ??= new FluidSim()
  const state = useMemo(() => ({ last: new Vector2(0.5, 0.5), velocity: new Vector2() }), [])

  useEffect(() => () => simRef.current?.dispose(), [])

  useFrame(() => {
    const sim = simRef.current
    if (!sim) return

    // R3F's pointer is -1..1 with y up; the sim works in uv space.
    const x = pointer.x * 0.5 + 0.5
    const y = pointer.y * 0.5 + 0.5
    state.velocity.set(x - state.last.x, y - state.last.y).multiplyScalar(6)

    const uniforms = sim.material.uniforms
    uniforms.uPointerPrev.value.copy(state.last)
    uniforms.uPointer.value.set(x, y)
    uniforms.uVelocity.value.copy(state.velocity)
    uniforms.uAspect.value = size.width / size.height

    state.last.set(x, y)

    sim.swap()
    const previous = gl.getRenderTarget()
    gl.setRenderTarget(sim.target)
    gl.render(sim.scene, sim.camera)
    gl.setRenderTarget(previous)
  }, -1)

  return simRef.current
}
