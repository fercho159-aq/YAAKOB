import { POINTER_VELOCITY } from './config';

export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  // The last probe is the legacy IE/Edge counterpart the original still checks.
  const legacyTouchPoints = (navigator as Navigator & { msMaxTouchPoints?: number })
    .msMaxTouchPoints;
  return (
    'ontouchstart' in window || navigator.maxTouchPoints > 0 || (legacyTouchPoints ?? 0) > 0
  );
};

/**
 * Smoothed pointer position, exposed as `normalX` / `normalY` in -0.5..0.5.
 *
 * Matching the original, the listener is only attached on pointer devices and
 * the starting position is the untouched (0, 0) client corner, which reads as
 * (-0.5, -0.5) until the user first moves the mouse.
 */
export class Pointer {
  normalX = -0.5;
  normalY = -0.5;

  private x = 0;
  private y = 0;
  private targetX = 0;
  private targetY = 0;
  private listening = false;

  start(): void {
    if (this.listening || typeof window === 'undefined' || isTouchDevice()) return;
    window.addEventListener('mousemove', this.handleMouseMove);
    this.listening = true;
  }

  stop(): void {
    if (!this.listening) return;
    window.removeEventListener('mousemove', this.handleMouseMove);
    this.listening = false;
  }

  /** One lerp step per frame, matching the original's frame-based smoothing. */
  update(): void {
    this.x += (this.targetX - this.x) * POINTER_VELOCITY;
    this.y += (this.targetY - this.y) * POINTER_VELOCITY;
    this.normalX = this.x / window.innerWidth - 0.5;
    this.normalY = this.y / window.innerHeight - 0.5;
  }

  private handleMouseMove = (event: MouseEvent): void => {
    this.targetX = event.clientX;
    this.targetY = event.clientY;
  };
}
