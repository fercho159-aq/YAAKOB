import { Icon, type IconProps } from '@chakra-ui/react'

type PlaceholderWordmarkProps = IconProps & {
  /** Text to draw. The mark sizes its own viewBox around it. */
  label?: string
  title?: string
}

const FONT_SIZE = 12
const TRACKING = 2
/** Rough advance per glyph of the wordmark face at `FONT_SIZE`, plus tracking. */
const GLYPH_ADVANCE = FONT_SIZE * 0.72 + TRACKING
/** Horizontal arm of each bracket, and the air between it and the word. */
const BRACKET_ARM = 5
const BRACKET_GAP = 26

/**
 * The bracketed brand mark the layout is built around. Callers set a width and
 * let the height follow, so the viewBox has to hug the label — a six-letter
 * word in a box cut for eleven would float in the middle of its own brackets.
 */
export function PlaceholderWordmark({
  label = 'PLACEHOLDER',
  title = 'Placeholder wordmark',
  ...props
}: PlaceholderWordmarkProps) {
  const width = Math.round(label.length * GLYPH_ADVANCE) + 2 * (BRACKET_ARM + BRACKET_GAP) + 3

  return (
    <Icon viewBox={`0 0 ${width} 23`} focusable="false" {...props}>
      <title>{title}</title>
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d={`M${1.5 + BRACKET_ARM} 1.5H1.5v20h${BRACKET_ARM}`} />
        <path d={`M${width - 1.5 - BRACKET_ARM} 1.5h${BRACKET_ARM}v20h-${BRACKET_ARM}`} />
      </g>
      <text
        x={width / 2}
        y="16"
        textAnchor="middle"
        fill="currentColor"
        fontSize={FONT_SIZE}
        fontFamily="var(--font-wordmark), var(--font-gridnik), sans-serif"
        fontWeight="600"
        letterSpacing={TRACKING}
      >
        {label}
      </text>
    </Icon>
  )
}

export default PlaceholderWordmark
