/**
 * Pieces the detail page borrows rather than duplicates. The scramble text and
 * the bar heading are one component each in the original bundle (modules 56817
 * and 21143), shared with the home page; the cursor lives with the chrome.
 */
export { AnimatedHeading } from '@servicios/components/home/AnimatedHeading'
export { ScrambleText } from '@servicios/components/ui/ScrambleText'
export { CURSOR_TYPE, type CursorType } from '@servicios/components/chrome'

/** Variant names every reveal on the page is keyed by. */
export const VARIANTS = {
  hidden: 'hidden',
  visible: 'visible',
} as const

export { useIsTouchDevice } from './hooks'
