import { useEffect, useRef } from 'react'

export interface Point {
  x: number
  y: number
}

/** The lerp factor the original's mouse ticker uses (`new MouseFollower(0.15)`). */
const VELOCITY = 0.15

export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

/**
 * Calls `onFrame` on every animation frame with an eased pointer position.
 *
 * On touch devices the position stays pinned to the centre of the viewport —
 * the compiled site never starts its mousemove ticker there, it only runs the
 * rAF loop against a fixed centre point.
 */
export function useMouseFollower(onFrame: (point: Point) => void): void {
  const frame = useRef(onFrame)

  useEffect(() => {
    frame.current = onFrame
  })

  useEffect(() => {
    const target: Point = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const position: Point = { ...target }
    const touch = isTouchDevice()

    const handleMove = (event: MouseEvent) => {
      target.x = event.clientX
      target.y = event.clientY
    }

    const handleResize = () => {
      if (!touch) return
      target.x = window.innerWidth / 2
      target.y = window.innerHeight / 2
    }

    if (touch) {
      window.addEventListener('resize', handleResize)
    } else {
      window.addEventListener('mousemove', handleMove)
    }

    let raf = requestAnimationFrame(function tick() {
      position.x += (target.x - position.x) * VELOCITY
      position.y += (target.y - position.y) * VELOCITY
      frame.current(position)
      raf = requestAnimationFrame(tick)
    })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])
}
