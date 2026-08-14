import type { BufferGeometry } from 'three'
import { loadGeometry } from './geometry'

type Entry = { promise: Promise<BufferGeometry>; value?: BufferGeometry; error?: unknown }

const cache = new Map<string, Entry>()

/**
 * Suspense-friendly geometry loader, same shape as R3F's `useLoader`: throws
 * the pending promise so the nearest `<Suspense>` shows the fallback, and
 * returns the geometry once it resolves. Cached per URL for the page's life.
 */
export function useGeometry(url: string): BufferGeometry {
  let entry = cache.get(url)
  if (!entry) {
    entry = {
      promise: loadGeometry(url).then(
        (g) => ((entry as Entry).value = g),
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
