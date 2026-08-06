import { Texture, Vector2 } from 'three';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

import { GRID_PASS, GRID_PASS_TOUCH } from './config';
import { isTouchDevice } from './pointer';
import {
  createGridFinalPassFragmentShader,
  gridFinalPassVertexShader,
  VIGNETTE_STYLE_POINTER,
  VIGNETTE_STYLE_TOUCH,
} from './shaders';
import { easeOut, TweenManager } from './tween';

export interface GridPassTextures {
  shift: Texture;
  grid: Texture;
}

/**
 * The last pass: overlays the grid texture, shifts the UVs around the pointer,
 * then applies brightness/contrast, the vignette and the global opacity. The
 * whole background fades in through this pass's `opacity`, which starts at 0.
 */
export class GridPass extends ShaderPass {
  private readonly tweens: TweenManager;

  constructor(tweens: TweenManager, textures: GridPassTextures) {
    const touch = isTouchDevice();
    const settings = touch ? { ...GRID_PASS, ...GRID_PASS_TOUCH } : GRID_PASS;

    super({
      uniforms: {
        tDiffuse: { value: null },
        vignetteRadius: { value: settings.vignetteRadius },
        vignetteStrenght: { value: settings.vignetteStrenght },
        mousePosition: { value: new Vector2() },
        interactVignetteRadius: { value: settings.interactVignetteRadius },
        interactVignetteStrenght: { value: settings.interactVignetteStrenght },
        interactMouseRadius: { value: settings.interactMouseRadius },
        interactMouseStrenght: { value: settings.interactMouseStrenght },
        interactStrenght: { value: settings.interactStrenght },
        tShift: { value: null },
        tGrid: { value: null },
        gridScale: { value: settings.gridScale },
        gridRatio: { value: 1 },
        brightness: { value: settings.brightness },
        contrast: { value: settings.contrast },
        opacity: { value: 0 },
      },
      vertexShader: gridFinalPassVertexShader,
      fragmentShader: createGridFinalPassFragmentShader(
        touch ? VIGNETTE_STYLE_TOUCH : VIGNETTE_STYLE_POINTER,
      ),
    });

    this.tweens = tweens;
    this.material.uniforms.tShift.value = textures.shift;
    this.material.uniforms.tGrid.value = textures.grid;
  }

  animateIn(duration: number, delay = 0): void {
    this.tweens.animate(0, GRID_PASS.opacity, {
      duration,
      delay,
      ease: easeOut,
      onUpdate: (value) => {
        this.material.uniforms.opacity.value = value;
      },
    });
  }

  /** `normalY` is flipped here because screen Y grows downwards. */
  updateMousePosition(normalX: number, normalY: number): void {
    const mousePosition = this.material.uniforms.mousePosition.value as Vector2;
    mousePosition.x = normalX;
    mousePosition.y = -normalY;
  }

  resize(viewportWidth: number, viewportHeight: number): void {
    this.material.uniforms.gridRatio.value = viewportWidth / viewportHeight;
  }
}
