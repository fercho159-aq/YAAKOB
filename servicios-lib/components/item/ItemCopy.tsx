import { Box, type BoxProps, Text } from '@chakra-ui/react'
import type { Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { useContactModal } from '@servicios/components/contact'
import { ItemButton } from './ItemButton'
import { MotionParagraph } from './motion'
import { AnimatedHeading, ScrambleText, VARIANTS } from './shared'
import type { Item, ItemDetail } from './types'

/** Body copy simply fades up once the heading above it has finished. */
const bodyVariants: Variants = {
  [VARIANTS.hidden]: { opacity: 0 },
  [VARIANTS.visible]: (delay: number) => ({ opacity: 1, transition: { delay } }),
}

type CopySectionProps = Omit<BoxProps, 'children'> & {
  heading: string
  subheading: string
  body: string
  bodyMaxWidth: string
  animate?: boolean
  delay?: number
  children?: ReactNode
}

/** Bar heading, a large subheading that types itself in, then the paragraph. */
function CopySection({
  heading,
  subheading,
  body,
  bodyMaxWidth,
  animate = true,
  delay = 0,
  children,
  ...rest
}: CopySectionProps) {
  return (
    <Box as="section" {...rest}>
      <AnimatedHeading delay={delay}>{heading}</AnimatedHeading>
      <Text mt="1rem" fontSize="1.5rem" fontWeight="normal" lineHeight="1.75rem">
        <ScrambleText
          text={subheading}
          animate={animate}
          delay={delay + 0.2}
          duration={1}
          display="inline"
        />
      </Text>
      <MotionParagraph
        maxWidth={bodyMaxWidth}
        mt="0.625rem"
        letterSpacing="0.02em"
        lineHeight={{ base: '1.25rem', xl: '1.5rem' }}
        variants={bodyVariants}
        custom={delay + 0.4}
      >
        {body}
      </MotionParagraph>
      {children}
    </Box>
  )
}

export type ItemCopyProps = BoxProps & {
  item: Item
  detail: ItemDetail
  animate?: boolean
  delay?: number
}

/**
 * Right column of the detail page: what the item is, followed by the pitch for
 * signing in. A signed-in player sees personal stats here instead — that half
 * of the original needs the leaderboard API and is not part of this rebuild.
 */
export function ItemCopy({ item, detail, animate = true, delay = 0, ...rest }: ItemCopyProps) {
  const loginDelay = delay + 0.6
  const { open: openContact } = useContactModal()

  return (
    <Box as="section" pos="relative" minH="300px" {...rest}>
      <Box pt="2rem">
        <CopySection
          heading={detail.headings.description}
          subheading={item.description.heading}
          body={item.description.body}
          bodyMaxWidth="26.875rem"
          animate={animate}
          delay={delay}
        />
        <CopySection
          mt="2.5rem"
          heading={detail.headings.login}
          subheading={detail.login.subheading}
          body={detail.login.body}
          bodyMaxWidth="30.4375rem"
          animate={animate}
          delay={loginDelay}
        >
          <Box
            display={{ xl: 'flex' }}
            justifyContent={{ xl: 'space-between' }}
            maxWidth="28rem"
            mt={{ base: '1.875rem', xl: '1.3125rem' }}
          >
            <ItemButton
              w={{ base: '100%', xl: 'calc(50% - 0.625rem)' }}
              minHeight={{ xl: '2.875rem' }}
              fontSize={{ xl: '0.75rem' }}
              bg="goldAlt"
              color="black"
              label={detail.login.ctas.login.label}
              onClick={openContact}
              delay={loginDelay + 0.6}
            />
            <ItemButton
              w={{ base: '100%', xl: 'calc(50% - 0.625rem)' }}
              minHeight={{ xl: '2.875rem' }}
              mt={{ base: '0.625rem', xl: 0 }}
              fontSize={{ xl: '0.75rem' }}
              label={detail.login.ctas.register.label}
              delay={loginDelay + 0.8}
            />
          </Box>
        </CopySection>
      </Box>
    </Box>
  )
}
