import { useEffect, useRef } from 'react'

import { markUnlocked, play, preload } from './sfx'

/**
 * How long a followed link waits before it leaves, in ms.
 *
 * The click sound runs 2.7s and a page load cuts it dead, so a menu link used
 * to sound like nothing while the burger — which goes nowhere — rang in full.
 * Holding the navigation lets the attack land; the tail keeps playing until
 * the next document commits. Short enough not to read as lag.
 */
const NAVIGATION_HOLD = 320

export interface UiSfxOptions {
  /**
   * How to follow a held link. Defaults to a plain document load; a caller
   * that owns a router can route in-app instead.
   */
  navigate?: (href: string, link: HTMLAnchorElement) => void
}

/**
 * Hover and click sounds for a whole panel, by delegation.
 *
 * Spread the result onto a container and every link and button inside it is
 * covered, including ones added later — cheaper and less error-prone than
 * handing every control its own pair of listeners. React bubbles events
 * through portals, so a drawer rendered from inside the container counts too.
 *
 * Hover is mouse-only: on a touch screen `pointerover` fires as part of the
 * tap, so honouring it there would double every press with a hover sound.
 */
export function useUiSfx({ navigate }: UiSfxOptions = {}) {
  const last = useRef<Element | null>(null)
  const leaving = useRef(false)

  // Every page that carries the panel fetches the sounds up front. Without it
  // the first press pays for the round trip and the page is gone before the
  // file arrives.
  useEffect(preload, [])

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
    /**
     * Capture, so this runs before the link's own handler: `next/link` skips
     * its navigation once the default is prevented, and the link's `onClick`
     * (closing the drawer) still fires on the way down.
     */
    onClickCapture: (e: React.MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = (e.target as Element).closest<HTMLAnchorElement>('a[href]')
      // `data-modal` links open a dialog instead of leaving; new tabs and
      // downloads keep this page — and its sound — alive on their own.
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return
      if (link.dataset.modal !== undefined) return

      const url = new URL(link.href, window.location.href)
      if (url.origin !== window.location.origin) return
      // Same document: a hash jump or a link to where we already are.
      if (url.pathname === window.location.pathname && url.search === window.location.search) return

      e.preventDefault()
      // A second press while the first is still held must not queue another load.
      if (leaving.current) return
      leaving.current = true

      // Keyboard activation has no pointerdown behind it, so nothing has played yet.
      if (e.detail === 0) play('click')

      const href = url.pathname + url.search + url.hash
      window.setTimeout(() => {
        leaving.current = false
        if (navigate) navigate(href, link)
        else window.location.assign(href)
      }, NAVIGATION_HOLD)
    },
  }
}
