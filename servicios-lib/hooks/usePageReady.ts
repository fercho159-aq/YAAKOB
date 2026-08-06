import { useEffect, useState } from 'react'

/**
 * Only the very first mount of the session waits for the document; later route
 * changes re-mount the layout and must not put the loader back on screen.
 */
let firstLoadComplete = false

/** True once the document has finished loading and `minDuration` has elapsed. */
export function usePageReady(minDuration = 1200): boolean {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (firstLoadComplete) {
      setReady(true)
      return
    }

    const start = performance.now()
    let timer = 0

    const finish = () => {
      timer = window.setTimeout(
        () => {
          firstLoadComplete = true
          setReady(true)
        },
        Math.max(0, minDuration - (performance.now() - start)),
      )
    }

    if (document.readyState === 'complete') {
      finish()
    } else {
      window.addEventListener('load', finish)
    }

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('load', finish)
    }
  }, [minDuration])

  return ready
}
