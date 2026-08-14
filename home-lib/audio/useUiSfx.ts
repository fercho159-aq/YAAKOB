import { useRef } from 'react'

import { markUnlocked, play } from './sfx'

/**
 * Hover and click sounds for a whole panel, by delegation.
 *
 * Spread the result onto a container and every link and button inside it is
 * covered, including ones added later — cheaper and less error-prone than
 * handing every control its own pair of listeners.
 *
 * Hover is mouse-only: on a touch screen `pointerover` fires as part of the
 * tap, so honouring it there would double every press with a hover sound.
 */
export function useUiSfx() {
  const last = useRef<Element | null>(null)

  return {
    onPointerOver: (e: React.PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const hit = (e.target as Element).closest('a, button')
      // Moving between children of the same control is not a new hover.
      if (!hit || hit === last.current) return
      last.current = hit
      play('hover')
    },
    onPointerOut: (e: React.PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const hit = (e.target as Element).closest('a, button')
      if (hit && hit === last.current) last.current = null
    },
    onPointerDown: (e: React.PointerEvent) => {
      // Any press is the gesture that lets the page make noise from here on.
      markUnlocked()
      if (!(e.target as Element).closest('a, button')) return
      play('click')
    },
  }
}
