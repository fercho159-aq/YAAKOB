import { useEffect, useState } from 'react'
import { BREAKPOINT_XL } from './constants'

type Size = { width: number; height: number }

function readSize(): Size {
  return {
    width: Math.max(document.documentElement.clientWidth, window.innerWidth) || 0,
    height: Math.max(document.documentElement.clientHeight, window.innerHeight) || 0,
  }
}

/**
 * Viewport size, debounced. Starts at 0/0 so the server and the first client
 * render agree; the carousel treats a zero width as "geometry not known yet".
 */
export function useWindowSize(delay = 200): Size {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 })

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null
    const update = () => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => setSize(readSize()), delay)
    }
    setSize(readSize())
    window.addEventListener('resize', update)
    return () => {
      if (timer) clearTimeout(timer)
      window.removeEventListener('resize', update)
    }
  }, [delay])

  return size
}

export function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const query = window.matchMedia(`(min-width: ${BREAKPOINT_XL}px)`)
    const update = () => setIsDesktop(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return isDesktop
}

export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  return isTouch
}
