import { Icon, type IconProps } from '@chakra-ui/react'
import type { ComponentType, ReactNode } from 'react'

/**
 * The eight glyphs the contact card needs, drawn as 24×24 strokes so they read
 * at the same weight as the rest of the chrome. Chakra's icon pack is not a
 * dependency here, so they ship inline.
 */
function strokeIcon(displayName: string, path: ReactNode): ComponentType<IconProps> {
  function StrokeIcon(props: IconProps) {
    return (
      <Icon
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        {path}
      </Icon>
    )
  }
  StrokeIcon.displayName = displayName
  return StrokeIcon
}

const BuildingIcon = strokeIcon(
  'BuildingIcon',
  <>
    <path d="M4 21V5.5A1.5 1.5 0 0 1 5.5 4h8A1.5 1.5 0 0 1 15 5.5V21" />
    <path d="M15 10h3.5A1.5 1.5 0 0 1 20 11.5V21" />
    <path d="M3 21h18" />
    <path d="M7.5 8h4M7.5 12h4M7.5 16h4" />
  </>,
)

const UserIcon = strokeIcon(
  'UserIcon',
  <>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20a7 7 0 0 1 14 0" />
  </>,
)

const PhoneIcon = strokeIcon(
  'PhoneIcon',
  <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z" />,
)

const ChatIcon = strokeIcon(
  'ChatIcon',
  <path d="M20 12.5c0 3.9-3.6 7-8 7a9.3 9.3 0 0 1-2.9-.45L4 20.5l1.35-3.6A6.6 6.6 0 0 1 4 12.5c0-3.9 3.6-7 8-7s8 3.1 8 7Z" />,
)

const MailIcon = strokeIcon(
  'MailIcon',
  <>
    <rect x="3" y="5.5" width="18" height="13" rx="2" />
    <path d="m3.8 7 7.1 5.4a2 2 0 0 0 2.4 0L20.2 7" />
  </>,
)

const GlobeIcon = strokeIcon(
  'GlobeIcon',
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17" />
    <path d="M12 3.5c2.2 2.3 3.4 5.3 3.4 8.5s-1.2 6.2-3.4 8.5c-2.2-2.3-3.4-5.3-3.4-8.5S9.8 5.8 12 3.5Z" />
  </>,
)

const PinIcon = strokeIcon(
  'PinIcon',
  <>
    <path d="M12 21s6.5-5.6 6.5-10.2A6.5 6.5 0 0 0 5.5 10.8C5.5 15.4 12 21 12 21Z" />
    <circle cx="12" cy="10.5" r="2.5" />
  </>,
)

const ClockIcon = strokeIcon(
  'ClockIcon',
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 1.8" />
  </>,
)

const ScaleIcon = strokeIcon(
  'ScaleIcon',
  <>
    <path d="M12 4v16M7 20h10M4 8h16M8 8l-3 6h6L8 8ZM16 8l-3 6h6l-3-6Z" />
  </>,
)

/** Keyed by the `icon` field each contact row carries in `content.json`. */
export const CONTACT_ICONS: Record<string, ComponentType<IconProps>> = {
  building: BuildingIcon,
  user: UserIcon,
  phone: PhoneIcon,
  chat: ChatIcon,
  mail: MailIcon,
  globe: GlobeIcon,
  pin: PinIcon,
  clock: ClockIcon,
}

export { ScaleIcon }
