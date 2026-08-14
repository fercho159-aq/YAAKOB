import { RepeatWrapping, SRGBColorSpace, TextureLoader, type Texture } from 'three'

export interface TextureOptions {
  /**
   * Decode as sRGB on sample. Off by default, and the landing leaves it off
   * everywhere: these custom shaders write straight to the framebuffer without
   * three's `colorspace_fragment` re-encode, exactly like the engine, so a
   * texture that gets decoded here would come out ~70/255 too dark.
   */
  color?: boolean
  /** The eye tiles its map 7x around, so it needs repeat wrapping. */
  repeat?: boolean
}

type Entry = { promise: Promise<Texture>; value?: Texture; error?: unknown }

const cache = new Map<string, Entry>()

function loadTexture(url: string, options: TextureOptions): Promise<Texture> {
  return new Promise((resolve, reject) => {
    new TextureLoader().load(
      url,
      (texture) => {
        if (options.color) texture.colorSpace = SRGBColorSpace
        if (options.repeat) texture.wrapS = texture.wrapT = RepeatWrapping
        resolve(texture)
      },
      undefined,
      reject
    )
  })
}

/**
 * Suspense-friendly texture loader. Unlike R3F's `useLoader` it hands back a
 * texture that is already configured, so components never have to mutate one.
 */
export function useTexture(url: string, options: TextureOptions = {}): Texture {
  let entry = cache.get(url)
  if (!entry) {
    entry = {
      promise: loadTexture(url, options).then(
        (t) => ((entry as Entry).value = t),
        (e) => {
          ;(entry as Entry).error = e
          throw e
        }
      ),
    }
    cache.set(url, entry)
  }
  if (entry.error) throw entry.error
  if (!entry.value) throw entry.promise
  return entry.value
}
