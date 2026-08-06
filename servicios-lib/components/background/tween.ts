/**
 * A tiny tween runner.
 *
 * The original drives its uniform animations with framer-motion's imperative
 * `animate()`, which owns its own rAF loop. Here the tweens are stepped from
 * the scene's render loop instead, so that hiding the tab freezes the
 * animations along with the rendering rather than letting them run on unseen.
 */

export type Easing = (t: number) => number;

const NEWTON_ITERATIONS = 8;
const SUBDIVISION_EPSILON = 1e-7;

const bezier = (t: number, a: number, b: number): number =>
  (((1 - 3 * b + 3 * a) * t + (3 * b - 6 * a)) * t + 3 * a) * t;

const bezierSlope = (t: number, a: number, b: number): number =>
  3 * (1 - 3 * b + 3 * a) * t * t + 2 * (3 * b - 6 * a) * t + 3 * a;

/** Same curve model the CSS/framer easings use, solved with Newton-Raphson. */
export const cubicBezier = (x1: number, y1: number, x2: number, y2: number): Easing => {
  if (x1 === y1 && x2 === y2) return (t) => t;

  return (t: number) => {
    if (t <= 0) return 0;
    if (t >= 1) return 1;

    let guess = t;
    for (let i = 0; i < NEWTON_ITERATIONS; i += 1) {
      const slope = bezierSlope(guess, x1, x2);
      if (Math.abs(slope) < SUBDIVISION_EPSILON) break;
      guess -= (bezier(guess, x1, x2) - t) / slope;
    }

    return bezier(guess, y1, y2);
  };
};

export const easeOut = cubicBezier(0, 0, 0.58, 1);
export const easeInOut = cubicBezier(0.42, 0, 0.58, 1);
/** The site's own curve for every flux transition: cubic-bezier(.2,.4,.35,1). */
export const fluxTransitionEase = cubicBezier(0.2, 0.4, 0.35, 1);

export interface TweenOptions {
  duration: number;
  delay?: number;
  ease?: Easing;
  onUpdate: (value: number) => void;
  onComplete?: () => void;
}

export interface TweenControls {
  stop: () => void;
}

interface ActiveTween extends TweenControls {
  from: number;
  to: number;
  duration: number;
  delay: number;
  ease: Easing;
  elapsed: number;
  stopped: boolean;
  onUpdate: (value: number) => void;
  onComplete?: () => void;
}

export class TweenManager {
  private tweens: ActiveTween[] = [];

  animate(from: number, to: number, options: TweenOptions): TweenControls {
    const tween: ActiveTween = {
      from,
      to,
      duration: options.duration,
      delay: options.delay ?? 0,
      ease: options.ease ?? easeOut,
      elapsed: 0,
      stopped: false,
      onUpdate: options.onUpdate,
      onComplete: options.onComplete,
      stop: () => {
        tween.stopped = true;
      },
    };

    this.tweens.push(tween);
    return tween;
  }

  /** Advances every running tween by `delta` seconds. */
  update(delta: number): void {
    if (this.tweens.length === 0) return;

    for (let i = this.tweens.length - 1; i >= 0; i -= 1) {
      const tween = this.tweens[i];

      if (tween.stopped) {
        this.tweens.splice(i, 1);
        continue;
      }

      tween.elapsed += delta;
      const time = tween.elapsed - tween.delay;
      if (time < 0) continue;

      const progress = tween.duration > 0 ? Math.min(1, time / tween.duration) : 1;
      tween.onUpdate(tween.from + (tween.to - tween.from) * tween.ease(progress));

      if (progress >= 1) {
        this.tweens.splice(i, 1);
        tween.onComplete?.();
      }
    }
  }

  stopAll(): void {
    this.tweens.length = 0;
  }
}

/** Mutable XYZ target, so the same helper can drive a Vector3 or a plain point. */
export interface MutableVec3 {
  x: number;
  y: number;
  z: number;
}

export const animateVector3 = (
  manager: TweenManager,
  target: MutableVec3,
  to: MutableVec3,
  duration: number,
  ease: Easing = easeOut,
): void => {
  manager.animate(target.x, to.x, { duration, ease, onUpdate: (v) => (target.x = v) });
  manager.animate(target.y, to.y, { duration, ease, onUpdate: (v) => (target.y = v) });
  manager.animate(target.z, to.z, { duration, ease, onUpdate: (v) => (target.z = v) });
};

export const animateVector2 = (
  manager: TweenManager,
  target: MutableVec3,
  to: MutableVec3,
  duration: number,
  ease: Easing = easeOut,
): void => {
  manager.animate(target.x, to.x, { duration, ease, onUpdate: (v) => (target.x = v) });
  manager.animate(target.y, to.y, { duration, ease, onUpdate: (v) => (target.y = v) });
};
