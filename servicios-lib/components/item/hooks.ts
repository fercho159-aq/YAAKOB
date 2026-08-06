import { useEffect, useState } from 'react'

/**
 * False on the server and for the first client render, so hydration matches;
 * the pointer bubble it gates is desktop-only anyway.
 */
export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  return isTouch
}
