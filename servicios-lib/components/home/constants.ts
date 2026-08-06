/**
 * Layout constants lifted from the compiled site (module 33069). The slide
 * geometry is expressed against these two reference viewports; every width in
 * the carousel is a percentage of `SLIDE_WIDTH_XL`.
 */
export const WIDTH_BASE = 375
export const WIDTH_XL = 1440
export const SLIDE_WIDTH_BASE = 262
export const SLIDE_WIDTH_XL = 390
export const SLIDE_HEIGHT_XL = 520
export const SLIDES_OFFSET_BASE = 42
export const SLIDES_OFFSET_XL = 412

/** `xl` breakpoint in px — 62.0625em against a 16px root. */
export const BREAKPOINT_XL = 993

export const SLIDER_EASING = 'cubic-bezier(0.2, 0, 0, 1)'

export const CURSOR_TYPE = {
  label: 'label',
  hidden: 'hidden',
  loading: 'loading',
  arrowLeft: 'arrowLeft',
  arrowRight: 'arrowRight',
} as const

export type CursorType = (typeof CURSOR_TYPE)[keyof typeof CURSOR_TYPE]

export const VARIANTS = {
  hidden: 'hidden',
  visible: 'visible',
} as const

/** Percentage of `SLIDE_WIDTH_XL`, the unit the original authored widths in. */
export function slideWidthPct(px: number): string {
  return `${(px / SLIDE_WIDTH_XL) * 100}%`
}
