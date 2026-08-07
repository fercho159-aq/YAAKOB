import { Icon, type IconProps } from '@chakra-ui/react'

/**
 * Drawn on a 24-unit grid like the mark on the home page, then scaled into the
 * 625.52 box the other social glyphs use so all six sit the same size inside
 * their rings.
 */
export function TiktokLogo(props: IconProps) {
  return (
    <Icon viewBox="0 0 625.52 625.52" focusable="false" {...props}>
      <title>TikTok Logo</title>
      <g transform="translate(126.76 126.76) scale(15.5)">
        <path d="M16.6 2h-3.1v13.1a2.6 2.6 0 1 1-2.2-2.57v-3.15a5.75 5.75 0 1 0 5.3 5.73V8.87a6.9 6.9 0 0 0 4 1.28V7A3.93 3.93 0 0 1 16.6 2Z" />
      </g>
    </Icon>
  )
}
