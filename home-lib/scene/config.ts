/**
 * Every tunable of the landing scene, in one typed place.
 *
 * Two sources fed this file. Most values come from `assets/data/uil.json` —
 * 14,857 keys of baked editor state, 754 of them for this scene, under names
 * like `LandingEyeShader/LandingEyeShader/Element_1_landingeye/uBands1`. Where
 * the running engine disagreed with that file (the site patched the bundle
 * over time) the live values win: they were read back out of the legacy page
 * by wrapping `WebGLRenderer.render` and walking the scene graph.
 *
 * Layer order in the `landingeye` layout: background · eye · lens · splines,
 * with the logo quads sitting in front of all of them.
 */

/** Degrees, as authored in the editor; converted on the way to three. */
export type Vec3 = [number, number, number]

export const DEG = Math.PI / 180

export const camera = {
  /** Group position + local offset from the level's game camera. */
  position: [0, 2, 0] as Vec3,
  lookAt: [0, 2, -6] as Vec3,
  fov: 50,
  near: 0.1,
  far: 1000,
  /**
   * `dynamicFOVCode` from the editor, verbatim in spirit:
   * `50 * Math.max(1, Math.range(aspect, 1.0, 0.5, 1.0, 1.8))` — portrait
   * viewports widen the lens so the eye still fits.
   */
  fovForAspect(aspect: number) {
    const t = 1 + ((aspect - 1) * (1.8 - 1)) / (0.5 - 1)
    return this.fov * Math.max(1, t)
  },
}

/**
 * Layer 0 — inverted sphere painted through a colour ramp.
 *
 * Two of these existed: one inside the `landingeye` layout (blue3 ramp, range
 * 0.82-1) and one on the level itself. The level's wins — higher renderOrder,
 * so it paints last — and it is the pale blue-grey the page actually shows, so
 * that is the one ported. It also stays at world origin, outside the eye group.
 */
export const background = {
  scale: 300,
  colorRamp: '/assets/images/global/colorramp.png',
  uniforms: {
    uColorRange: [0.6, 0.78] as [number, number],
    uBrightness: 0,
    uNoiseScale: 0.25,
    uNoiseSpeed: 0.05,
    uSaturation: 1,
    uContrastAdjust: 0,
  },
}

/**
 * Where the whole `landingeye` layout is parked inside the level. This is the
 * transform the level layout applied to the LandingEye element — without it the
 * camera sits inside the shell and the strands smear across the whole frame.
 */
export const eyeGroup = {
  position: [0, -2, -18] as Vec3,
  rotation: [12, 0, 25] as Vec3,
  scale: 1.15,
}

/** Layer 1 — the strand "eye", a lathe-ish shell with scrolling line texture. */
export const eye = {
  geometry: '/assets/geometry/trackandreact/eye/eye.json',
  map: '/assets/images/trackandreact/eye/strands.png',
  position: [0, 0, 0] as Vec3,
  rotation: [-90, 0, 0] as Vec3,
  scale: [1, 1, 1] as Vec3,
  renderOrder: 1,
  uniforms: {
    uColor: '#7E98A1',
    uTile: [7, 1.45] as [number, number],
    uPinchRange: [0.163, 0.286] as [number, number],
    uFadeRange: [0.249, 0.278, 0.055, 0.725] as [number, number, number, number],
    uBands1: [0.463, 0.3, 0.413, 0.28] as [number, number, number, number],
    uBands2: [0.621, 0.37, 0.462, 0.341] as [number, number, number, number],
  },
  /** LandingEye.animateIn: uTransition 0 -> 1, 12s easeOutSine. */
  transition: { to: 1, duration: 12000, delay: 0 },
}

/** Layer 2 — hemisphere lit by a matcap, the "lens" glint over the eye. */
export const lens = {
  geometry: '/assets/geometry/landing/hemisphere.json',
  matcap: '/assets/images/landing/lens_matcap.jpg',
  position: [0, 1.42, 0] as Vec3,
  rotation: [0, 0, 0] as Vec3,
  scale: [4.5, 1.87, 4.5] as Vec3,
  renderOrder: 3,
  uniforms: {
    uColor: '#698a97',
    uReflectOffset: [0, 0, 0] as Vec3,
  },
  /** Same tween as the eye, started 3s later. */
  transition: { to: 1, duration: 12000, delay: 3000 },
}

/**
 * The logo: five unit quads stacked in depth, all sampling the same 1024px
 * atlas, each slicing a different band of it with `uClamp` (measured from the
 * top). Red channel is the outline, blue the fill. `uOutline: 1` layers draw
 * the outline only — they are the ghosted echoes behind the solid wordmark.
 *
 * Positions, depths and alphas are the live values; the atlas itself is the
 * site's own artwork (symbol, YAAKOB, CONSULTORES, tagline).
 */
export const logo = {
  map: '/assets/images/landing/echo-logo.png',
  /** World position of the stack; each layer overrides z. */
  position: [0, 1.9, 0] as Vec3,
  scale: 5.5,
  layers: [
    { z: -6.0, clamp: [0, 0.49], alpha: 1, outline: 0, renderOrder: 101.08 },
    { z: -5.725, clamp: [0.49, 0.65], alpha: 1.2, outline: 0, renderOrder: 101.17 },
    { z: -6.0, clamp: [0.65, 0.72], alpha: 1, outline: 0, renderOrder: 101.25 },
    { z: -6.275, clamp: [0.49, 0.72], alpha: 0.5, outline: 1, renderOrder: 101.33 },
    { z: -7.1, clamp: [0, 0.72], alpha: 0.25, outline: 1, renderOrder: 101.42 },
  ] as { z: number; clamp: [number, number]; alpha: number; outline: number; renderOrder: number }[],
  /**
   * Black, not the white `uil.json` records: the running engine has no `uColor`
   * uniform bound on these layers at all, so the shader falls back to a
   * zeroed vec3 — which is what paints the wordmark dark on the live page.
   */
  color: '#000000',
  /**
   * `uTransition` wipes the stack in from the bottom. The engine drove it from
   * the level's intro timeline; this matches the pace the live page shows.
   */
  transition: { to: 1, duration: 6000, delay: 800 },
}

/**
 * The spline particles: 65,025 points riding 459 baked splines of 100 points
 * each. The engine ran these through its GPGPU pipeline (a position texture
 * ping-ponged every frame); the port evaluates the same spline lookup straight
 * in the vertex shader, since the motion is a pure function of time.
 */
export const splines = {
  data: '/assets/geometry/landing/eye-SPLINES.json',
  /** Local to the eye group, from the layout's Element_3. */
  position: [0, -2.5, 0] as Vec3,
  scale: [0.78, 1.3, 0.78] as Vec3,
  count: 65025,
  renderOrder: 2,
  /** Radius of the random scatter around each spline (uSplineThickness * 0.5). */
  thickness: 0.5,
  /** Seconds for a particle to travel its spline end to end. */
  lifetime: 14,
  uniforms: {
    uColor: '#adc9e1',
    uSize: 0.3,
    uLifeFade: [0.68, 0.85] as [number, number],
  },
  /** LandingEyeSplines.animateIn: uAlpha 0 -> 0.8, 10s easeInOutSine. */
  transition: { to: 0.8, duration: 10000, delay: 0 },
}

/**
 * The line under the wordmark.
 *
 * On the legacy page this is not artwork but the engine's "begin" UI button,
 * repurposed: a GLUI element carrying the firm's services line in MSDF text.
 * The port draws it as a text mesh parked with the logo instead of in a screen
 * space overlay, so it tracks the logo on resize. Interaction is not wired.
 */
export const tagline = {
  text: 'ASESORÍA · PREVENCIÓN · REGULARIZACIÓN · DEFENSA FISCAL',
  font: '/assets/fonts/TTMussels-Bold.json',
  atlas: '/assets/fonts/TTMussels-Bold.png',
  /** Matches the wordmark's ink — the slate blue it shipped with read as a
   *  second colour next to the black logo. */
  color: '#000000',
  alpha: 0.96,
  /**
   * Fraction of the font's line height added between glyphs. The engine's own
   * `letterSpacing: 0.6` is in GLUI's units, not these; 0.125 reproduces the
   * pitch the live page measures (55 glyphs over 548px at 1440 wide).
   */
  letterSpacing: 0.125,
  /** World width of the laid-out line, and where it sits on the logo plane. */
  width: 3.41,
  position: [0, 0.216, -6] as Vec3,
  renderOrder: 101.5,
  /** Height of the invisible click target, comfortably taller than the caps. */
  hitHeight: 0.22,
  /**
   * The legacy engine swapped in a `-portrait` layout on phones: the services
   * stacked one per line, most urgent first, each wrapped in interpuncts.
   */
  portrait: {
    lines: ['· DEFENSA FISCAL ·', '· REGULARIZACIÓN ·', '· PREVENCIÓN ·', '· ASESORÍA ·'],
    /** World y of the first line, and the drop per line. */
    top: 0.24,
    lineStep: 0.18,
  },
}

/**
 * Pointer parallax, from the level's game camera (`moveXY`, `deltaLerp`).
 *
 * The camera slides against the pointer while still aiming at `camera.lookAt`,
 * so the logo — which sits on that axis — stays put and only the depth behind
 * it swings. Range checked against the live page: pointer in the top-left
 * corner puts the camera at (1.94, 1.04).
 */
export const parallax = {
  move: [-2, -1] as [number, number],
  lerp: 0.02,
}

/**
 * The environment dust: 4,000 additive points filling a box around the camera.
 *
 * Part of the engine's BaseEnvironment rather than the landing layout, but it
 * is on screen the whole time and its additive contribution is what lifts the
 * frame's overall brightness.
 */
export const floaters = {
  count: 4000,
  /** Half-extents of the spawn box, from the layout's world scale. */
  scale: [40, 20, 40] as Vec3,
  color: '#3c464f',
  uniforms: {
    uSize: 8,
    uScale: [1, 1] as [number, number],
    uAlpha: 0.4,
  },
  renderOrder: 1,
}

/**
 * The composite pass — the engine's `NukePass("Composite", ...)`, the last
 * thing it drew and the source of the glass hexagons in the corners.
 *
 * Values read live off the running page, which is where the level's VFX
 * override had already settled. `bloom` feeds the UnrealBloom the engine ran
 * ahead of the composite (3 mips, threshold from the same override).
 */
export const composite = {
  uRGBStrength: 0.1,
  uNoise: 0.02,
  uVignette: 0,
  uDistortion: 1.02,
  uContrast: [1, 1] as [number, number],
  /** Screen-space hexagon size; the engine coarsened it on phones. */
  uHexScale: 0.035,
  uHexScalePhone: 0.07,
  uOverlayMix: 1,
  uOverlayColor: '#ffffff',
  bloom: {
    /**
     * `bloomStrength` from the level's VFX override. The engine's composite
     * weighted its single blur mip by `lerpBloomFactor(1.0)` = 0.52 on top of
     * this, so the port's effective glow is trimmed by `strength` below.
     */
    intensity: 1,
    /**
     * The engine's 0.52 mip weight, further scaled to land on the live frame's
     * brightness: its luminosity pass and blur chain are not the ones
     * postprocessing runs, so the nominal value glows an order of magnitude too
     * hard on a scene this bright.
     */
    strength: 0.0002,
    luminanceThreshold: 0.29,
    radius: 0.6,
  },
}

/** t in [0,1] -> eased, matching the engine's easeOutSine. */
export const easeOutSine = (t: number) => Math.sin((t * Math.PI) / 2)

/** easeInOutSine, used by the spline fade-in. */
export const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2
