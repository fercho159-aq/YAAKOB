import { Box, type BoxProps } from '@chakra-ui/react'
import { useState } from 'react'
import { Cursor } from '@servicios/components/chrome'
import { CornerFrame } from './CornerFrame'
import { ItemButton } from './ItemButton'
import { ItemThumbnail } from './ItemThumbnail'
import { CURSOR_TYPE, type CursorType, useIsTouchDevice } from './shared'
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
 * Left column of the detail page: the thumbnail that doubles as the primary
 * link, the two CTAs under it, and the label bubble that follows the pointer
 * while it is over the thumbnail.
 */
export function ItemHero({ item, detail, shareText, animate = true, ...rest }: ItemHeroProps) {
  const [cursorType, setCursorType] = useState<CursorType>(CURSOR_TYPE.hidden)
  const isTouch = useIsTouchDevice()

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
        href={item.url}
        ratio={THUMBNAIL_RATIO}
        animate={animate}
        delay={0.5}
        onMouseEnter={() => setCursorType(CURSOR_TYPE.label)}
        onMouseLeave={() => setCursorType(CURSOR_TYPE.hidden)}
      />
      <ItemButton
        w="100%"
        mt={{ base: '0.625rem', xl: '1.3125rem' }}
        bg="goldAlt"
        color="black"
        label={detail.ctas.primary}
        href={item.url}
        delay={1}
        ariaLabel={`${detail.ctas.primary} ${item.label}`}
      />
      <ShareButton
        w="100%"
        mt={{ base: '0.5rem', xl: '0.875rem' }}
        label={detail.ctas.share}
        confirmation={detail.ctas.clipboard}
        text={shareText}
        delay={1.2}
        ariaLabel={`${detail.ctas.share}: ${item.label}`}
      />
      {!isTouch && <Cursor type={cursorType} label={detail.ctas.primary} />}
    </Box>
  )
}
