import { Box, type BoxProps } from '@chakra-ui/react'
import { CornerFrame } from './CornerFrame'
import { ItemThumbnail } from './ItemThumbnail'
import { ShareButton } from './ShareButton'
import type { Item, ItemDetail } from './types'

/** The thumbnail's intrinsic frame, 508 × 406. */
const THUMBNAIL_RATIO = 508 / 406

export type ItemHeroProps = BoxProps & {
  item: Item
  detail: ItemDetail
  /** Sentence handed to the OS share sheet along with the page URL. */
  shareText: string
  animate?: boolean
}

/**
 * Left column of the detail page: the thumbnail and, on desktop, the share
 * CTA under it.
 */
export function ItemHero({ item, detail, shareText, animate = true, ...rest }: ItemHeroProps) {
  return (
    <Box pos="relative" p={{ base: '1.5rem 1.625rem', xl: 0 }} pt={{ xl: '2rem' }} {...rest}>
      <CornerFrame
        top={{ base: 0, xl: '0.1875rem' }}
        left={{ base: 0, xl: '-1.375rem' }}
        w={{ base: '100%', xl: 'calc(100% + 3rem)' }}
        h={{ base: 'calc(100% + 0.9375rem)', xl: 'calc(100% + 3rem)' }}
      />
      <ItemThumbnail
        src={item.thumbnail.src}
        alt={item.thumbnail.alt}
        ratio={THUMBNAIL_RATIO}
        animate={animate}
        delay={0.5}
      />
      {/* En celular va al final de la página, bajo ItemCopy. */}
      <ShareButton
        display={{ base: 'none', xl: 'inline-flex' }}
        w="100%"
        mt={{ base: '0.625rem', xl: '1.3125rem' }}
        label={detail.ctas.share}
        confirmation={detail.ctas.clipboard}
        text={shareText}
        delay={1.2}
        ariaLabel={`${detail.ctas.share}: ${item.label}`}
      />
    </Box>
  )
}
