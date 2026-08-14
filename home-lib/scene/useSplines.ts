import { loadSplineTexture, type SplineData } from './splineData'

type Entry = { promise: Promise<SplineData>; value?: SplineData; error?: unknown }

const cache = new Map<string, Entry>()

/** Suspense-friendly loader for the baked spline texture. */
export function useSplineData(url: string): SplineData {
  let entry = cache.get(url)
  if (!entry) {
    entry = {
      promise: loadSplineTexture(url).then(
        (d) => ((entry as Entry).value = d),
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
