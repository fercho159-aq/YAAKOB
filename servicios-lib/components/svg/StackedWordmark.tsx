import { Box, type BoxProps } from '@chakra-ui/react'

/**
 * The face is drawn narrow for its weight; widening the rows horizontally gets
 * it to the logotype proportions the layout is built around.
 */
const STRETCH = 1.18

/**
 * Row length that gets the full size; longer rows scale down in proportion so a
 * label like `REGULARIZACIÓN` lands on the same width as a short one instead of
 * running past the slot that clips it.
 */
const REFERENCE_ROW_LENGTH = 10
const FONT_SIZE_BASE_REM = 2
const FONT_SIZE_XL_REM = 4.5

type StackedWordmarkProps = Omit<BoxProps, 'title'> & {
  label?: string
  title?: string
}

/**
 * Splits on the first space, so `DIAGNÓSTICO FISCAL` sets as `DIAGNÓSTICO` over
 * `FISCAL`. A hyphen used as a separator is the break itself and is dropped, so
 * `UIF - FGR` stacks as two clean rows. Single-word labels get the solid row.
 */
function splitLines(label: string): [string, string] | [string] {
  const dash = label.indexOf(' - ')
  if (dash !== -1) return [label.slice(0, dash), label.slice(dash + 3).trim()]
  const at = label.indexOf(' ')
  if (at === -1) return [label]
  return [label.slice(0, at), label.slice(at + 1).trim()]
}

/**
 * Hero mark for the carousel: the first line drawn as an outline, the rest
 * solid beneath it. Both rows are set at one size and flush left, so the
 * glyphs keep their drawn widths and the rows end ragged.
 */
export function StackedWordmark({
  label = 'PLACEHOLDER',
  title = 'Placeholder wordmark',
  ...props
}: StackedWordmarkProps) {
  const lines = splitLines(label)
  const solid = lines.length === 2 ? lines[1] : lines[0]
  const outline = lines.length === 2 ? lines[0] : null

  const longestRow = Math.max(...lines.map((line) => line.length))
  const scale = Math.min(1, REFERENCE_ROW_LENGTH / longestRow)
  const row = {
    display: 'block',
    transform: `scaleX(${STRETCH})`,
    transformOrigin: 'left center',
  } as const

  return (
    <Box
      role="img"
      aria-label={title}
      fontFamily="var(--font-wordmark), var(--font-gridnik), sans-serif"
      fontWeight={700}
      fontSize={{
        base: `${FONT_SIZE_BASE_REM * scale}rem`,
        xl: `${FONT_SIZE_XL_REM * scale}rem`,
      }}
      lineHeight="0.95"
      textAlign="left"
      whiteSpace="nowrap"
      {...props}
    >
      {/* Fill is cleared rather than the colour, so the stroke still reads `currentColor`. */}
      {outline && (
        <Box
          {...row}
          sx={{
            WebkitTextFillColor: 'transparent',
            WebkitTextStrokeWidth: '0.045em',
            WebkitTextStrokeColor: 'currentColor',
          }}
        >
          {outline}
        </Box>
      )}
      <Box {...row}>{solid}</Box>
    </Box>
  )
}

export default StackedWordmark
