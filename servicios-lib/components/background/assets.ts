import { RepeatWrapping, Texture, TextureLoader } from 'three';

import { TEXTURE_URLS } from './config';

export interface BackgroundAssets {
  /** Pixel data of the flow texture, sampled to place particles across the tube. */
  flowImageData: ImageData;
  gridTexture: Texture;
  shiftTexture: Texture;
  backgroundTexture: Texture;
}

const loadTexture = (loader: TextureLoader, url: string): Promise<Texture> =>
  new Promise((resolve, reject) => {
    loader.load(url, resolve, undefined, () =>
      reject(new Error(`Failed to load texture: ${url}`)),
    );
  });

const loadImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    image.src = url;
  });

const toImageData = (image: HTMLImageElement): ImageData => {
  const { width, height } = image;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');
  if (!context) throw new Error('Could not acquire a 2D context for the flow texture');

  context.drawImage(image, 0, 0, width, height);
  return context.getImageData(0, 0, width, height);
};

export const loadBackgroundAssets = async (): Promise<BackgroundAssets> => {
  const loader = new TextureLoader();

  const [flowImage, gridTexture, shiftTexture, backgroundTexture] = await Promise.all([
    loadImage(TEXTURE_URLS.flow),
    loadTexture(loader, TEXTURE_URLS.grid),
    loadTexture(loader, TEXTURE_URLS.shift),
    loadTexture(loader, TEXTURE_URLS.background),
  ]);

  // The grid pass samples both of these well outside 0..1.
  gridTexture.wrapS = RepeatWrapping;
  gridTexture.wrapT = RepeatWrapping;
  shiftTexture.wrapS = RepeatWrapping;
  shiftTexture.wrapT = RepeatWrapping;

  return {
    flowImageData: toImageData(flowImage),
    gridTexture,
    shiftTexture,
    backgroundTexture,
  };
};

export const disposeBackgroundAssets = (assets: BackgroundAssets): void => {
  assets.gridTexture.dispose();
  assets.shiftTexture.dispose();
  assets.backgroundTexture.dispose();
};
