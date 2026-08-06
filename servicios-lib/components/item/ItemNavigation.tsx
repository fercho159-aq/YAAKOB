import { Flex, type FlexProps, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import type { ComponentType, ElementType } from 'react'
import { PlaceholderWordmark } from '@servicios/components/svg'

export type ItemNavigationProps = FlexProps & {
  slug: string
  label: string
}

/**
 * Chakra v2's `Flex` resolves its `as`-prop overload via a conditional type
 * that, combined with React 19's `ElementType`, blows past TypeScript's
 * instantiation-depth limit (TS2590) when `as` is set directly. Widening the
 * component reference to a plain `ComponentType` sidesteps the overload
 * resolution; the `as` prop is still read and honoured at runtime by Chakra
 * exactly as before.
 */
const AsFlex = Flex as unknown as ComponentType<Omit<FlexProps, 'as'> & { as?: ElementType }>

/**
 * The item's own wordmark, pinned above the page and shown from `xl` up.
 *
 * The layout this is modelled on resolves the current entry from the router
 * inside an effect, so its server-rendered markup ships a dead link and an
 * "undefined" label until hydration. Here the slug is a build-time prop, so
 * the link and the label are correct in the served HTML.
 */
export function ItemNavigation({ slug, label, ...rest }: ItemNavigationProps) {
  return (
    <AsFlex
      as="nav"
      pos="fixed"
      top="1.25rem"
      left={{ base: '1rem', xl: 0 }}
      direction="column"
      alignItems={{ xl: 'center' }}
      justifyContent={{ base: 'center', xl: 'unset' }}
      w="100%"
      pointerEvents="none"
      zIndex="navigation"
      {...rest}
    >
      <Link
        as={NextLink}
        href={`/servicios/${slug}`}
        aria-label={`Go to item page: ${label}`}
        lineHeight={0}
        pointerEvents="auto"
        textAlign={{ base: 'left', xl: 'center' }}
        display={['none', null, null, null, 'inherit']}
      >
        <PlaceholderWordmark
          label={label.toUpperCase()}
          title={`${label} wordmark`}
          flexShrink={0}
          w={{ base: '5.875rem', xl: '100%' }}
          h={{ base: '100%', xl: '1.625rem' }}
        />
      </Link>
    </AsFlex>
  )
}
