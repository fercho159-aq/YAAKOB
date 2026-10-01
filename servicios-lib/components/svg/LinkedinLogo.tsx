import { Icon, type IconProps } from '@chakra-ui/react'

/**
 * Drawn on a 24-unit grid like the mark on the home page, then scaled into the
 * 625.52 box the other social glyphs use so it sits the same size inside its ring.
 */
export function LinkedinLogo(props: IconProps) {
  return (
    <Icon viewBox="0 0 625.52 625.52" focusable="false" {...props}>
      <title>LinkedIn Logo</title>
      <g transform="translate(126.76 126.76) scale(15.5)">
        <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68Z" />
      </g>
    </Icon>
  )
}
