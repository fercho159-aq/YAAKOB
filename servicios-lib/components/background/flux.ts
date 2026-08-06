import {
  AdditiveBlending,
  Color,
  MathUtils,
  Mesh,
  NormalBlending,
  Object3D,
  ShaderMaterial,
  Vector3,
} from 'three';

import {
  FLUX_DEFAULTS,
  FLUX_GROUP,
  FLUX_INITIAL_TRANSITION,
  FLUX_INITIAL_TRANSLATION_SHIFT,
  SECOND_FLUX,
} from './config';
import { createQuadGeometry, InstancedQuadGeometry } from './geometry';
import { fluxFragmentShader, fluxVertexShader } from './shaders';
import {
  animateVector2,
  animateVector3,
  easeInOut,
  easeOut,
  fluxTransitionEase,
  TweenControls,
  TweenManager,
} from './tween';

export interface FluxOptions {
  fluxImageData: ImageData;
  direction: Vector3;
  particleNbr?: number;
  particleTranslationSpeedMax?: number;
  particleScale?: number;
  blending?: boolean;
  depthWrite?: boolean;
  color?: string;
  opacity?: number;
  scale?: number;
  torsionStrenght?: number;
  waveShift?: number;
  waveLength?: number;
  waveStrenght?: number;
  speed?: number;
  rotationSpeed?: number;
  translationSpeed?: number;
  progressOpacity?: number;
  explodeStrenght?: number;
}

interface AnimateInOptions {
  delay?: number;
  withOpacity?: boolean;
}

interface AnimateInOutOptions {
  delay?: number;
  color?: string;
  multiplier?: number;
  withOpacity?: boolean;
}

/**
 * Rejection-samples a point out of the flow texture: the brighter a texel's red
 * channel, the likelier a particle lands on it.
 *
 * The original indexes rows by `width` rather than `height`; since every source
 * texture is square that is equivalent, and it is kept as-is. The attempt cap
 * replaces the original's unbounded recursion, which would blow the stack on a
 * texture that happened to be mostly black.
 */
const sampleVariation = (imageData: ImageData): { x: number; y: number } => {
  const { width, data } = imageData;

  for (let attempt = 0; attempt < 64; attempt += 1) {
    const x = Math.random();
    const y = Math.random();
    const index = (Math.floor(width * y) * width + Math.floor(width * x)) * 4;
    if (Math.random() < data[index] / 255) return { x, y: 1 - y };
  }

  return { x: 0.5, y: 0.5 };
};

export class Flux extends Mesh<InstancedQuadGeometry, ShaderMaterial> {
  color: string;

  private readonly tweens: TweenManager;
  private readonly speed: number;
  private animateControls: TweenControls | null = null;
  private animateControlsWave: TweenControls | null = null;

  constructor(tweens: TweenManager, options: FluxOptions) {
    const {
      fluxImageData,
      direction,
      particleNbr = FLUX_DEFAULTS.particleNbr,
      particleTranslationSpeedMax = FLUX_DEFAULTS.particleTranslationSpeedMax,
      particleScale = FLUX_DEFAULTS.particleScale,
      blending = FLUX_DEFAULTS.blending,
      depthWrite = FLUX_DEFAULTS.depthWrite,
      color = FLUX_DEFAULTS.color,
      opacity = FLUX_DEFAULTS.opacity,
      scale = FLUX_DEFAULTS.scale,
      torsionStrenght = FLUX_DEFAULTS.torsionStrenght,
      waveShift = FLUX_DEFAULTS.waveShift,
      waveLength = FLUX_DEFAULTS.waveLength,
      waveStrenght = FLUX_DEFAULTS.waveStrenght,
      speed = FLUX_DEFAULTS.speed,
      rotationSpeed = FLUX_DEFAULTS.rotationSpeed,
      translationSpeed = FLUX_DEFAULTS.translationSpeed,
      progressOpacity = FLUX_DEFAULTS.progressOpacity,
      explodeStrenght = FLUX_DEFAULTS.explodeStrenght,
    } = options;

    const geometry = new InstancedQuadGeometry(createQuadGeometry(), particleNbr);
    const variation = geometry.createAttribute('_variation', 2);
    const explodeVariation = geometry.createAttribute('_explodeVariation', 2);
    const progress = geometry.createAttribute('_progress', 1);
    const particleSpeed = geometry.createAttribute('_speed', 1);
    const particleOpacity = geometry.createAttribute('_opacity', 1);

    for (let i = 0; i < particleNbr; i += 1) {
      progress.setX(i, MathUtils.randFloat(0, 1));

      const { x, y } = sampleVariation(fluxImageData);
      variation.setXY(i, x, y);
      explodeVariation.setXY(
        i,
        MathUtils.randFloat(0, 0.5 * x),
        MathUtils.randFloat(0, 0.5 * y),
      );
      particleSpeed.setX(i, MathUtils.randFloat(1, particleTranslationSpeedMax));

      // Anything above 0.6 snaps to fully opaque; the rest stay dim and, per the
      // vertex shader, are drawn larger.
      const alpha = MathUtils.randFloat(0.4, 1);
      particleOpacity.setX(i, alpha > 0.6 ? 1 : alpha);
    }

    super(
      geometry,
      new ShaderMaterial({
        transparent: true,
        depthWrite,
        blending: blending ? AdditiveBlending : NormalBlending,
        uniforms: {
          particleScale: { value: particleScale },
          color: { value: new Color(color) },
          opacity: { value: opacity },
          scale: { value: scale },
          direction: { value: direction },
          torsionStrenght: { value: torsionStrenght },
          waveShift: { value: waveShift },
          waveLength: { value: waveLength },
          waveStrenght: { value: waveStrenght },
          minorWaveSpeed: { value: FLUX_DEFAULTS.minorWaveSpeed },
          minorWaveLength: { value: FLUX_DEFAULTS.minorWaveLength },
          minorWaveStrenght: { value: FLUX_DEFAULTS.minorWaveStrenght },
          time: { value: 0 },
          rotationSpeed: { value: rotationSpeed },
          translationSpeed: { value: translationSpeed },
          transition: { value: FLUX_INITIAL_TRANSITION },
          rotationShift: { value: 0 },
          transitionOpacity: { value: 0 },
          translationShift: { value: FLUX_INITIAL_TRANSLATION_SHIFT },
          progressOpacity: { value: progressOpacity },
          explodeStrenght: { value: explodeStrenght },
        },
        vertexShader: fluxVertexShader,
        fragmentShader: fluxFragmentShader,
      }),
    );

    this.tweens = tweens;
    this.speed = speed;
    this.color = color;
    this.frustumCulled = false;
  }

  abortAnimation(): void {
    this.animateControls?.stop();
    this.animateControls = null;
  }

  /** Pulls `transition` down to 0, fading the particles in as it goes. */
  animateIn(duration: number, { delay = 0, withOpacity = true }: AnimateInOptions = {}): void {
    this.abortAnimation();
    this.visible = true;

    const from = this.material.uniforms.transition.value as number;
    this.animateControls = this.tweens.animate(from, 0, {
      duration,
      delay,
      ease: fluxTransitionEase,
      onUpdate: (value) => this.updateTransition(value, withOpacity, from),
    });
  }

  animateOut(
    duration: number,
    {
      delay = 0,
      multiplier = 1,
      withOpacity = true,
      onComplete,
    }: AnimateInOutOptions & { onComplete?: () => void } = {},
  ): void {
    this.abortAnimation();

    const from = this.material.uniforms.transition.value as number;
    this.animateControls = this.tweens.animate(from, multiplier, {
      duration,
      delay,
      ease: fluxTransitionEase,
      onUpdate: (value) => this.updateTransition(value, withOpacity),
      onComplete,
    });
  }

  /**
   * The "explode" transition: `transition` sweeps 0 -> PI and is fed through
   * sin(), so the particles blow apart and settle back. The colour is swapped at
   * the peak, while they are at their most scattered.
   */
  animateInOut(
    duration: number,
    { delay = 0, color = this.color, multiplier = 1, withOpacity = true }: AnimateInOutOptions = {},
  ): void {
    this.abortAnimation();

    let swapped = false;
    const from = this.material.uniforms.transition.value as number;

    this.animateControls = this.tweens.animate(from, Math.PI, {
      duration,
      delay,
      ease: fluxTransitionEase,
      onUpdate: (value) => {
        if (!swapped && value > 0.5 * Math.PI) {
          swapped = true;
          this.setColor(color);
        }
        this.updateTransition(Math.sin(value) * multiplier, withOpacity);
      },
    });
  }

  animateWaveStrenght(duration: number, target = FLUX_DEFAULTS.minorWaveStrenght): void {
    this.animateControlsWave?.stop();
    this.animateControlsWave = this.tweens.animate(
      this.material.uniforms.minorWaveStrenght.value as number,
      target,
      {
        duration,
        ease: easeInOut,
        onUpdate: (value) => {
          this.material.uniforms.minorWaveStrenght.value = value;
        },
      },
    );
  }

  setColor(color: string): void {
    this.color = color;
    this.material.uniforms.color.value = new Color(color);
  }

  /**
   * `initial` is the value `transition` started from, so the opacity ramp always
   * spans the full travel of the animation that is driving it.
   */
  updateTransition = (value: number, withOpacity = true, initial = 1): void => {
    this.material.uniforms.transition.value = value;
    if (withOpacity) {
      this.material.uniforms.transitionOpacity.value = 1 - Math.min(1, value / initial);
    }
  };

  updateDirectionShift(shift: number): void {
    this.material.uniforms.translationShift.value = 0.4 * shift;
    this.material.uniforms.rotationShift.value = 10 * shift;
  }

  update = (): void => {
    this.material.uniforms.time.value -= this.speed;
  };

  dispose(): void {
    this.abortAnimation();
    this.animateControlsWave?.stop();
    this.geometry.dispose();
    this.material.dispose();
  }
}

export interface FluxGroupOptions {
  position: Vector3;
  direction: Vector3;
  color: string;
  sliderEnabled?: boolean;
  sliderProgress?: number;
  directionStrength?: number;
}

/**
 * The two fluxes that make up the visible stream, and the shared state that
 * drives them: a slider progress (home page) and a rolling direction shift.
 */
export class FluxGroup extends Object3D {
  readonly mainFlux: Flux;
  readonly secondFlux: Flux;
  readonly direction: Vector3;

  private readonly tweens: TweenManager;
  private isSliderEnabled: boolean;
  private slideTransition: number;
  private slideTransitionTargeted: number;
  private directionShift: number;
  private directionShiftTargeted: number;
  private currentDirectionVelocity: number;

  constructor(tweens: TweenManager, imageData: ImageData, options: FluxGroupOptions) {
    super();

    const {
      position,
      direction,
      color,
      sliderEnabled = false,
      sliderProgress = 0,
      directionStrength = 0,
    } = options;

    this.tweens = tweens;
    this.position.copy(position);
    this.direction = direction.clone();
    this.isSliderEnabled = sliderEnabled;
    this.slideTransition = sliderProgress;
    this.slideTransitionTargeted = sliderProgress;
    this.directionShift = directionStrength;
    this.directionShiftTargeted = directionStrength;
    this.currentDirectionVelocity = FLUX_GROUP.directionVelocity;

    const shared = { fluxImageData: imageData, direction: this.direction };

    this.mainFlux = new Flux(tweens, shared);
    this.mainFlux.name = '_mainFlux';
    this.add(this.mainFlux);

    this.secondFlux = new Flux(tweens, { ...shared, ...SECOND_FLUX, color });
    this.secondFlux.name = '_secondFlux';
    this.add(this.secondFlux);
  }

  /** Only the second flux carries the caller's accent colour. */
  handleColorChanges(color: string): void {
    this.secondFlux.setColor(color);
  }

  handleSliderProgress(progress: number, direction: number): void {
    this.slideTransitionTargeted = progress;
    this.directionShiftTargeted += direction * FLUX_GROUP.directionShift;
  }

  handleSliderEnabled(enabled: boolean): void {
    this.isSliderEnabled = enabled;
    if (enabled) this.currentDirectionVelocity = FLUX_GROUP.directionVelocity;
  }

  animateIn(duration: number, delay: number, color: string): void {
    this.mainFlux.animateIn(duration, { delay });
    this.secondFlux.setColor(color);
    this.secondFlux.animateIn(duration, { delay });
  }

  animateTransition(color: string): void {
    this.isSliderEnabled = false;
    this.mainFlux.animateInOut(FLUX_GROUP.transitionDuration, {
      multiplier: FLUX_GROUP.transitionStrenght,
      withOpacity: false,
    });
    this.secondFlux.animateInOut(FLUX_GROUP.transitionDuration, {
      multiplier: FLUX_GROUP.transitionStrenght,
      color,
    });
    this.currentDirectionVelocity = FLUX_GROUP.directionVelocityDuringAnimation;
    this.directionShiftTargeted += FLUX_GROUP.directionIncrementDuringAnimation;
  }

  animatePosition(position: Vector3, direction: Vector3, waveStrenght: number): void {
    animateVector3(
      this.tweens,
      this.position,
      position,
      FLUX_GROUP.transitionDuration,
      easeOut,
    );
    // The Z of the direction is left where it is, exactly as in the original.
    animateVector2(
      this.tweens,
      this.direction,
      direction,
      FLUX_GROUP.transitionDuration,
      easeOut,
    );
    this.mainFlux.animateWaveStrenght(FLUX_GROUP.transitionDuration, waveStrenght);
    this.secondFlux.animateWaveStrenght(FLUX_GROUP.transitionDuration, waveStrenght);
  }

  update = (): void => {
    this.mainFlux.update();
    this.secondFlux.update();

    if (this.isSliderEnabled) {
      this.slideTransition +=
        (this.slideTransitionTargeted - this.slideTransition) *
        FLUX_GROUP.slideTransitionVelocity;
      this.mainFlux.updateTransition(this.slideTransition, false);
      this.secondFlux.updateTransition(this.slideTransition);
    }

    this.directionShift +=
      (this.directionShiftTargeted - this.directionShift) * this.currentDirectionVelocity;
    this.mainFlux.updateDirectionShift(this.directionShift);
    this.secondFlux.updateDirectionShift(this.directionShift);
  };

  dispose(): void {
    this.mainFlux.dispose();
    this.secondFlux.dispose();
  }
}
