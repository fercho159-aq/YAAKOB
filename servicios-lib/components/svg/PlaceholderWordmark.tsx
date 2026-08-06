import { Icon, type IconProps } from '@chakra-ui/react'

type PlaceholderWordmarkProps = IconProps & {
  /** Text to draw. Kept short — the mark is laid out on a 126×23 grid. */
  label?: string
  title?: string
}

/**
 * Stand-in for the brand mark the layout expects: a bracketed wordmark that
 * fills the same box the original logo did, so nav and footer keep their
 * proportions without borrowing anyone's identity.
 */
export function PlaceholderWordmark({
  label = 'PLACEHOLDER',
  title = 'Placeholder wordmark',
  ...props
}: PlaceholderWordmarkProps) {
  return (
    <Icon viewBox="0 0 193 23" focusable="false" {...props}>
      <title>{title}</title>
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6.5 1.5H1.5v20h5" />
        <path d="M186.5 1.5h5v20h-5" />
      </g>
      <text
        x="96.5"
        y="16"
        textAnchor="middle"
        fill="currentColor"
        fontSize="12"
        fontFamily="var(--font-gridnik), var(--font-din-ot), sans-serif"
        letterSpacing="2"
      >
        {label}
      </text>
    </Icon>
  )
}

export default PlaceholderWordmark
