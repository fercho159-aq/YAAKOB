import { layoutText, loadFont, type TextLayout } from './text'

type Entry = { promise: Promise<TextLayout>; value?: TextLayout; error?: unknown }

const cache = new Map<string, Entry>()

/** Suspense-friendly text layout: loads the BMFont descriptor, lays the line out. */
export function useText(fontUrl: string, text: string, letterSpacing: number): TextLayout {
  const key = `${fontUrl}|${letterSpacing}|${text}`
  let entry = cache.get(key)
  if (!entry) {
    entry = {
      promise: loadFont(fontUrl)
        .then((font) => layoutText(font, text, letterSpacing))
        .then(
          (l) => ((entry as Entry).value = l),
          (e) => {
            ;(entry as Entry).error = e
            throw e
          }
        ),
    }
    cache.set(key, entry)
  }
  if (entry.error) throw entry.error
  if (!entry.value) throw entry.promise
  return entry.value
}
