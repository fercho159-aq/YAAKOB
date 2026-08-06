import { PerspectiveCamera, Vector3 } from 'three';

import { CAMERA, INTRO } from './config';
import { animateVector3, easeOut, MutableVec3, TweenManager } from './tween';

/**
 * Holds the camera's resting place and its look-at target, and offsets the
 * former by the smoothed pointer for a slight parallax.
 */
export class CameraControl {
  readonly initialPosition: MutableVec3;
  readonly lookAt = new Vector3();

  private readonly camera: PerspectiveCamera;
  private readonly tweens: TweenManager;

  constructor(camera: PerspectiveCamera, tweens: TweenManager) {
    this.camera = camera;
    this.tweens = tweens;
    this.initialPosition = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,
    };
  }

  animatePosition(position: Vector3, lookAt: Vector3): void {
    animateVector3(this.tweens, this.initialPosition, position, INTRO.cameraDuration, easeOut);
    animateVector3(this.tweens, this.lookAt, lookAt, INTRO.cameraDuration, easeOut);
  }

  update(normalX: number, normalY: number): void {
    const [velocityX, velocityY] = CAMERA.parallaxVelocity;
    this.camera.position.x = this.initialPosition.x + normalX * velocityX;
    this.camera.position.y = this.initialPosition.y + normalY * velocityY;
    this.camera.position.z = this.initialPosition.z;
    this.camera.lookAt(this.lookAt);
  }
}
