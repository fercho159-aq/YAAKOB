import { Box } from '@chakra-ui/react';
import { useEffect, useRef, type JSX } from 'react';

import type { BackgroundVariant } from './config';
import { BackgroundScene, isWebGLAvailable } from './scene';

export interface BackgroundProps {
  /**
   * Accent colour for the flux, supplied by the caller. It tints the second,
   * non-additive flux only; the main one always stays the recovered default.
   * Omit it and the whole stream renders in that default.
   */
  fluxColor?: string;
  /** Which recovered camera / flux placement to use. Defaults to the home page. */
  variant?: BackgroundVariant;
  /**
   * Set false to hold the scene back (the original keeps an equivalent
   * `webGLEnabled` flag in context). The canvas fades out and the loop stops.
   */
  enabled?: boolean;
}

/**
 * Full-viewport WebGL backdrop.
 *
 * Owns the rAF loop and hands everything else to `BackgroundScene`. If WebGL is
 * missing, or the scene fails to come up, the container's flat colour is all
 * that is left behind.
 */
export const Background = ({
  fluxColor,
  variant = 'index',
  enabled = true,
}: BackgroundProps): JSX.Element => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<BackgroundScene | null>(null);
  const loopRef = useRef<{ start: () => void; stop: () => void } | null>(null);
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    // Nothing to fall back to and nothing to clean up: the container keeps its
    // flat colour and the page carries on without a canvas.
    if (!isWebGLAvailable()) return undefined;

    // The canvas is created here rather than in JSX so that every mount gets a
    // fresh one: a canvas hands back the same WebGL context forever, so reusing
    // the element across a remount would hand the new scene the old context.
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.appendChild(canvas);

    const scene = new BackgroundScene({ fluxColor, variant });
    sceneRef.current = scene;

    let frame = 0;

    const loop = (time: number) => {
      frame = window.requestAnimationFrame(loop);
      scene.render(time);
    };

    const start = () => {
      if (frame !== 0 || document.hidden || !enabledRef.current || !scene.isReady) return;
      // Swallow the gap the pause left behind before stepping again.
      scene.resetClock();
      frame = window.requestAnimationFrame(loop);
    };

    const stop = () => {
      if (frame === 0) return;
      window.cancelAnimationFrame(frame);
      frame = 0;
    };

    loopRef.current = { start, stop };

    const handleVisibilityChange = () => {
      if (document.hidden) stop();
      else if (scene.isReady) start();
    };

    const observer = new ResizeObserver(() => scene.resize());
    observer.observe(container);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    scene
      .init(canvas)
      .then(() => {
        if (sceneRef.current !== scene) return;
        scene.resize();
        start();
        scene.playIntro();
      })
      .catch((error: unknown) => {
        console.error('Background scene failed to initialise', error);
        canvas.remove();
      });

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      sceneRef.current = null;
      loopRef.current = null;
      scene.dispose();
      canvas.remove();
    };
    // fluxColor and variant are pushed through the imperative API below rather
    // than rebuilding the scene, which would mean re-seeding 75k particles.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lastColor = useRef(fluxColor);
  useEffect(() => {
    const scene = sceneRef.current;
    if (!fluxColor || !scene?.isReady) return;
    // The first colour is already baked into the scene; later ones arrive as a
    // page change, which is what the explode transition exists for.
    scene.setFluxColor(fluxColor, { animate: fluxColor !== lastColor.current });
    lastColor.current = fluxColor;
  }, [fluxColor]);

  const lastVariant = useRef(variant);
  useEffect(() => {
    if (variant === lastVariant.current) return;
    lastVariant.current = variant;
    sceneRef.current?.setVariant(variant);
  }, [variant]);

  useEffect(() => {
    if (enabled) loopRef.current?.start();
    else loopRef.current?.stop();
  }, [enabled]);

  return (
    <Box
      ref={containerRef}
      position="absolute"
      top="0"
      left="0"
      w="100%"
      h="100%"
      backgroundColor="#050e12"
      zIndex="backgroundGrid"
      opacity={enabled ? 1 : 0}
      transition={enabled ? 'opacity 0.5s ease' : 'opacity 2s ease'}
    />
  );
};

export default Background;
