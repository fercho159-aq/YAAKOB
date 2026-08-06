import {
  Clock,
  ColorManagement,
  LinearFilter,
  LinearSRGBColorSpace,
  PerspectiveCamera,
  RGBAFormat,
  Scene,
  UnsignedByteType,
  Vector2,
  WebGLRenderer,
  WebGLRenderTarget,
} from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

import { BackgroundAssets, disposeBackgroundAssets, loadBackgroundAssets } from './assets';
import { BackgroundColor } from './backgroundColor';
import { BackgroundLayers } from './backgroundLayers';
import { CameraControl } from './cameraControl';
import {
  BackgroundVariant,
  BLOOM,
  CAMERA,
  FLUX_DEFAULTS,
  INTRO,
  MAX_PIXEL_RATIO,
  PAGE_PRESETS,
} from './config';
import { FluxGroup } from './flux';
import { GridPass } from './gridPass';
import { Pointer } from './pointer';
import { TweenManager } from './tween';

export const isWebGLAvailable = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl')),
    );
  } catch {
    return false;
  }
};

export interface BackgroundSceneOptions {
  /** Accent colour for the flux; only the second, non-additive flux uses it. */
  fluxColor?: string;
  /** Which of the recovered camera / flux placements to start from. */
  variant?: BackgroundVariant;
  maxPixelRatio?: number;
}

/**
 * Framework-free owner of the whole background: renderer, scene graph and
 * post-processing chain. Nothing here touches React; `Background.tsx` drives it.
 */
export class BackgroundScene {
  private renderer: WebGLRenderer | null = null;
  private scene: Scene | null = null;
  private camera: PerspectiveCamera | null = null;
  private composer: EffectComposer | null = null;

  private assets: BackgroundAssets | null = null;
  private fluxGroup: FluxGroup | null = null;
  private backgroundLayers: BackgroundLayers | null = null;
  private backgroundColor: BackgroundColor | null = null;
  private bloomPass: UnrealBloomPass | null = null;
  private gridPass: GridPass | null = null;
  private cameraControl: CameraControl | null = null;

  private readonly tweens = new TweenManager();
  private readonly pointer = new Pointer();
  private readonly clock = new Clock(false);

  private fluxColor: string;
  private variant: BackgroundVariant;
  private maxPixelRatio: number;
  private pixelRatio = 1;
  private width = 0;
  private height = 0;
  private disposed = false;
  private ready = false;

  constructor(options: BackgroundSceneOptions = {}) {
    this.fluxColor = options.fluxColor ?? FLUX_DEFAULTS.color;
    this.variant = options.variant ?? 'index';
    this.maxPixelRatio = options.maxPixelRatio ?? MAX_PIXEL_RATIO;
  }

  get isReady(): boolean {
    return this.ready;
  }

  async init(canvas: HTMLCanvasElement): Promise<void> {
    if (this.disposed) return;

    // r134 predates three's colour management, and every value in this scene was
    // authored against that. Turning it off keeps the palette identical.
    ColorManagement.enabled = false;

    this.renderer = new WebGLRenderer({ canvas });
    this.renderer.outputColorSpace = LinearSRGBColorSpace;

    this.scene = new Scene();
    this.camera = new PerspectiveCamera(CAMERA.fov, 1, CAMERA.near, CAMERA.far);
    this.camera.position.copy(CAMERA.position);

    this.measure(canvas);
    this.applySize();

    const assets = await loadBackgroundAssets();
    // A dispose() while the textures were in flight.
    if (this.disposed) {
      disposeBackgroundAssets(assets);
      return;
    }
    this.assets = assets;

    const preset = PAGE_PRESETS[this.variant];

    this.fluxGroup = new FluxGroup(this.tweens, assets.flowImageData, {
      position: preset.fluxPosition,
      direction: preset.fluxDirection,
      color: this.fluxColor,
    });
    this.scene.add(this.fluxGroup);

    this.backgroundColor = new BackgroundColor();
    this.scene.add(this.backgroundColor);

    this.backgroundLayers = new BackgroundLayers(assets.backgroundTexture);
    this.scene.add(this.backgroundLayers);

    // The composer's own buffer is 8-bit in r134; three now defaults it to half
    // float, which would let the additive flux push the bloom well past what the
    // original ever saw. Dimensions here are provisional -- applyComposerSize()
    // below sets the real ones once every pass is attached.
    const target = new WebGLRenderTarget(this.width, this.height, {
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      format: RGBAFormat,
      type: UnsignedByteType,
    });

    this.composer = new EffectComposer(this.renderer, target);
    this.composer.addPass(new RenderPass(this.scene, this.camera));

    this.bloomPass = new UnrealBloomPass(
      new Vector2(this.width, this.height),
      BLOOM.strength,
      BLOOM.radius,
      BLOOM.threshold,
    );
    this.composer.addPass(this.bloomPass);

    this.gridPass = new GridPass(this.tweens, {
      shift: assets.shiftTexture,
      grid: assets.gridTexture,
    });
    this.composer.addPass(this.gridPass);

    this.applyComposerSize();
    this.gridPass.resize(this.width, this.height);

    this.cameraControl = new CameraControl(this.camera, this.tweens);
    this.cameraControl.lookAt.copy(preset.cameraLookAt);
    this.cameraControl.initialPosition.x = preset.cameraPosition.x;
    this.cameraControl.initialPosition.y = preset.cameraPosition.y;
    this.cameraControl.initialPosition.z = preset.cameraPosition.z;

    this.pointer.start();
    this.clock.start();
    this.ready = true;
  }

  /** Fades the composite up and pulls the particles in out of the explode pose. */
  playIntro(): void {
    if (!this.ready) return;
    this.gridPass?.animateIn(INTRO.gridDuration, INTRO.gridDelay);
    this.fluxGroup?.animateIn(INTRO.fluxDuration, INTRO.fluxDelay, this.fluxColor);
  }

  /**
   * `animate` runs the site's explode transition, swapping the colour at the
   * peak of the blowout; without it the colour changes on the spot.
   */
  setFluxColor(color: string, { animate = false }: { animate?: boolean } = {}): void {
    this.fluxColor = color;
    if (!this.fluxGroup) return;

    if (animate) this.fluxGroup.animateTransition(color);
    else this.fluxGroup.handleColorChanges(color);
  }

  /**
   * Home-page carousel hooks. While enabled, the fluxes track `progress`
   * directly through their `transition` uniform instead of being tweened, so
   * dragging the slider scatters and re-forms the particles under the pointer.
   */
  setSliderEnabled(enabled: boolean): void {
    this.fluxGroup?.handleSliderEnabled(enabled);
  }

  setSliderProgress(progress: number, direction: number): void {
    this.fluxGroup?.handleSliderProgress(progress, direction);
  }

  setVariant(variant: BackgroundVariant): void {
    this.variant = variant;
    if (!this.ready) return;

    const preset = PAGE_PRESETS[variant];
    this.cameraControl?.animatePosition(preset.cameraPosition, preset.cameraLookAt);
    this.fluxGroup?.animatePosition(
      preset.fluxPosition,
      preset.fluxDirection,
      preset.waveStrenght,
    );
  }

  resize(width?: number, height?: number): void {
    if (!this.renderer || !this.camera) return;

    if (width !== undefined && height !== undefined) {
      this.width = Math.max(1, Math.floor(width));
      this.height = Math.max(1, Math.floor(height));
      this.pixelRatio = Math.min(this.maxPixelRatio, window.devicePixelRatio) || 1;
    } else {
      this.measure(this.renderer.domElement as HTMLCanvasElement);
    }

    this.applySize();
    this.applyComposerSize();
    this.gridPass?.resize(this.width, this.height);
  }

  /** `time` is the rAF timestamp; the scene only needs it to detect stalls. */
  render(_time?: number): void {
    if (!this.ready || !this.composer) return;

    const delta = this.clock.getDelta();

    this.tweens.update(delta);

    this.pointer.update();
    this.gridPass?.updateMousePosition(this.pointer.normalX, this.pointer.normalY);
    this.cameraControl?.update(this.pointer.normalX, this.pointer.normalY);

    this.fluxGroup?.update();
    this.backgroundLayers?.update();

    this.composer.render(delta);
  }

  /** Call when resuming after a pause so the tweens do not jump a whole gap. */
  resetClock(): void {
    this.clock.getDelta();
  }

  dispose(): void {
    this.disposed = true;
    this.ready = false;

    this.clock.stop();
    this.pointer.stop();
    this.tweens.stopAll();

    if (this.fluxGroup) {
      this.scene?.remove(this.fluxGroup);
      this.fluxGroup.dispose();
      this.fluxGroup = null;
    }
    if (this.backgroundLayers) {
      this.scene?.remove(this.backgroundLayers);
      this.backgroundLayers.dispose();
      this.backgroundLayers = null;
    }
    if (this.backgroundColor) {
      this.scene?.remove(this.backgroundColor);
      this.backgroundColor.dispose();
      this.backgroundColor = null;
    }

    this.bloomPass?.dispose();
    this.gridPass?.dispose();
    this.composer?.dispose();
    this.renderer?.dispose();

    if (this.assets) {
      disposeBackgroundAssets(this.assets);
      this.assets = null;
    }

    this.bloomPass = null;
    this.gridPass = null;
    this.composer = null;
    this.cameraControl = null;
    this.camera = null;
    this.scene = null;
    this.renderer = null;
  }

  private measure(canvas: HTMLCanvasElement): void {
    this.width = Math.max(1, canvas.clientWidth || window.innerWidth);
    this.height = Math.max(1, canvas.clientHeight || window.innerHeight);
    this.pixelRatio = Math.min(this.maxPixelRatio, window.devicePixelRatio) || 1;
  }

  private applySize(): void {
    if (!this.renderer || !this.camera) return;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(this.pixelRatio);
    // `false` because the canvas is sized by CSS, not by the renderer.
    this.renderer.setSize(this.width, this.height, false);
  }

  /**
   * EffectComposer multiplies whatever it is given by its own pixel ratio, so it
   * takes CSS pixels here and scales the buffers and every pass itself.
   */
  private applyComposerSize(): void {
    if (!this.composer) return;
    this.composer.setPixelRatio(this.pixelRatio);
    this.composer.setSize(this.width, this.height);
  }
}
