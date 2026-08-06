import { Vector3 } from 'three';

/**
 * Every number here was read out of the original compiled bundle. Names are
 * kept as they were shipped, misspellings ("Strenght") included, so that the
 * uniforms line up one-to-one with the recovered GLSL.
 */

export const MAX_PIXEL_RATIO = 1.6;

export const CAMERA = {
  fov: 50,
  near: 1,
  far: 1000,
  position: new Vector3(0, 0, 10),
  /** Pointer parallax applied to the camera, in world units per half-screen. */
  parallaxVelocity: [0.21, -0.21] as [number, number],
};

/** Lerp factor of the smoothed pointer position, one step per frame. */
export const POINTER_VELOCITY = 0.15;

export const BACKGROUND_COLOR = {
  color1: '#0a1a1f',
  sphereScale: 800,
};

export const FLUX_DEFAULTS = {
  particleNbr: 50000,
  particleTranslationSpeedMax: 3,
  particleScale: 0.002,
  blending: true,
  depthWrite: false,
  color: '#C8F6F5',
  opacity: 1,
  scale: 2.5,
  torsionStrenght: 10,
  waveShift: 1.8,
  waveLength: 5,
  waveStrenght: 1.5,
  minorWaveSpeed: 5,
  minorWaveLength: 18,
  minorWaveStrenght: 0.2,
  speed: 1e-4,
  rotationSpeed: 12,
  translationSpeed: 1,
  progressOpacity: 0.6,
  explodeStrenght: 1.5,
};

/**
 * Overrides for the second, non-additive flux. This is the only one that takes
 * the caller's accent colour; the main flux always stays `FLUX_DEFAULTS.color`.
 */
export const SECOND_FLUX = {
  blending: false,
  opacity: 1.1,
  particleNbr: FLUX_DEFAULTS.particleNbr * 0.5,
  particleScale: 0.003,
  speed: FLUX_DEFAULTS.speed,
  rotationSpeed: FLUX_DEFAULTS.rotationSpeed * 0.5,
};

export const FLUX_GROUP = {
  transitionDuration: 2.2,
  transitionStrenght: 1.75,
  directionVelocityDuringAnimation: 0.012,
  directionIncrementDuringAnimation: -0.3,
  slideTransitionVelocity: 0.1,
  directionVelocity: 0.1,
  directionShift: 1e-4,
};

/** Value `transition` is parked at before the intro pulls it down to 0. */
export const FLUX_INITIAL_TRANSITION = 4;
/** Value `translationShift` is parked at until the first direction update. */
export const FLUX_INITIAL_TRANSLATION_SHIFT = -100;

export const BACKGROUND_LAYERS = {
  opacity: 0.15,
  floatingYStrenght: 2,
  waveRotationStrenght: 0.25,
  speed: 0.002,
  layers: [
    { position: new Vector3(-6, -1, 2), rotation: 2.6, opacity: 0.3, scale: 9 },
    { position: new Vector3(-18, -14, -16), rotation: 4.4, opacity: 0.4, scale: 26 },
    { position: new Vector3(50, -12, -100), rotation: 2.5, opacity: 0.3, scale: 100 },
    { position: new Vector3(16, -19, -5), rotation: 4.6, opacity: 0.3, scale: 25 },
  ],
};

export const BLOOM = {
  strength: 0.65,
  radius: 0.4,
  threshold: 0.15,
};

export const GRID_PASS = {
  brightness: -0.28,
  contrast: 0.4,
  /** Target opacity of the whole composite; animated up from 0 by the intro. */
  opacity: 0.8,
  vignetteRadius: 1.1,
  vignetteStrenght: 1.15,
  interactVignetteRadius: 1,
  interactVignetteStrenght: 4,
  interactMouseRadius: 0.9,
  interactMouseStrenght: 2,
  interactStrenght: 0.02,
  gridScale: 3,
};

/** Touch devices ship a different vignette shape and tuning. */
export const GRID_PASS_TOUCH = {
  vignetteRadius: 0.64,
  vignetteStrenght: 1.32,
};

export const INTRO = {
  gridDuration: 2,
  gridDelay: 0,
  fluxDuration: 3,
  fluxDelay: 0.5,
  /** Duration of the camera / lookAt move towards a page preset. */
  cameraDuration: 2,
};

export const TEXTURE_URLS = {
  flow: '/textures/flow-texture.png',
  grid: '/textures/grid-texture.png',
  shift: '/textures/shift-texture.png',
  background: '/textures/background-texture.png',
};

export type BackgroundVariant =
  | 'index'
  | 'play'
  | 'stats'
  | 'leaderboard'
  | 'globalLeaderboard'
  | 'accountSettings';

export interface PagePreset {
  cameraPosition: Vector3;
  cameraLookAt: Vector3;
  fluxPosition: Vector3;
  fluxDirection: Vector3;
  waveStrenght: number;
}

/**
 * Per-route camera and flux placement. The original also layers per-game
 * overrides on top of these; only the base table is reproduced, since the clone
 * addresses pages by variant rather than by route + game slug.
 */
export const PAGE_PRESETS: Record<BackgroundVariant, PagePreset> = {
  index: {
    cameraPosition: new Vector3(0, 0, 10),
    cameraLookAt: new Vector3(0, 0, 0),
    fluxPosition: new Vector3(3.9, 1.2, 2.8),
    fluxDirection: new Vector3(-15, -8, 13),
    waveStrenght: 0.1,
  },
  play: {
    cameraPosition: new Vector3(0.22, -0.4, 8.04),
    cameraLookAt: new Vector3(3.76, -0.59, 0),
    fluxPosition: new Vector3(3.1, 1.1, 2.8),
    fluxDirection: new Vector3(-15, -8, 13),
    waveStrenght: 0.4,
  },
  stats: {
    cameraPosition: new Vector3(-1.3, 0.67, 10),
    cameraLookAt: new Vector3(1.27, 0.45, 0.68),
    fluxPosition: new Vector3(-2.2, 1.4, 2),
    fluxDirection: new Vector3(6, -8, 13),
    waveStrenght: 0.35,
  },
  leaderboard: {
    cameraPosition: new Vector3(4, 1.93, 9.4),
    cameraLookAt: new Vector3(1.47, -0.82, -5),
    fluxPosition: new Vector3(3.9, 1.2, 2.8),
    fluxDirection: new Vector3(-15, -8, 13),
    waveStrenght: 0.15,
  },
  globalLeaderboard: {
    cameraPosition: new Vector3(4, 1.93, 9.4),
    cameraLookAt: new Vector3(1.47, -0.82, -5),
    fluxPosition: new Vector3(3.9, 1.2, 2.8),
    fluxDirection: new Vector3(-15, -8, 13),
    waveStrenght: 0.15,
  },
  accountSettings: {
    cameraPosition: new Vector3(0.5, 0.67, 8.7),
    cameraLookAt: new Vector3(0.67, -1, 0),
    fluxPosition: new Vector3(3.3, 1.2, 2.8),
    fluxDirection: new Vector3(-15, -8, 13),
    waveStrenght: 0.1,
  },
};
