import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  UnorderedList,
  type IconProps,
} from '@chakra-ui/react'
import type { ComponentType, ReactNode } from 'react'
import { AnimatedWordmark } from './Wordmark'
import { MotionBox, MotionListItem, NavLink, type MotionBoxProps } from './motion'

const HAIRLINE = '1px solid rgba(255,255,255,0.2)'
const HIGHLIGHT = 'rgba(255,255,255,0.09)'

export interface MenuItemLink {
  label: string
  href: string
}

export interface MenuItem {
  id: string
  slug: string
  label: string
  tagline: string
  /**
   * The item's three sub-routes, built as the compiled Navigation builds them.
   * The original drawer never renders them — the whole row is a single link to
   * `/${slug}` — but they are part of the item model, so they stay.
   */
  links: MenuItemLink[]
  icon: ComponentType<IconProps>
  iconWidth: number
}

export interface MenuOverlayProps {
  items: MenuItem[]
  isOpen: boolean
  /** `router.asPath`; an item is current when its slug appears in the path. */
  activePath: string
  onClose: () => void
  /**
   * Bottom-right slot of the drawer. The original puts the "Background
   * animation" toggle here, which needs the WebGL context.
   */
  footer?: ReactNode
}

interface TaglineProps extends MotionBoxProps {
  text: string
  isSelected?: boolean
}

/** Game tagline with the gold rule underneath that stretches on hover. */
function Tagline({ text, isSelected = false, ...rest }: TaglineProps) {
  return (
    <MotionBox
      pos="relative"
      letterSpacing="0.02em"
      lineHeight="1.375rem"
      pb="0.75rem"
      sx={{ transition: 'background 0.2s linear' }}
      {...rest}
    >
      {text}
      <MotionBox
        pos="absolute"
        bottom="0"
        w={isSelected ? '2.5rem' : '0.6875rem'}
        h="0.125rem"
        bg="gold"
        variants={
          isSelected ? undefined : { initial: { width: '0.6875rem' }, animate: { width: '2.5rem' } }
        }
        transition={{ type: 'tween', duration: 0.2, ease: 'easeInOut' }}
      />
    </MotionBox>
  )
}

export function MenuOverlay({ items, isOpen, activePath, onClose, footer }: MenuOverlayProps) {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent
          maxWidth={{ base: '100%', xl: '21.75rem' }}
          bg="grey1"
          borderLeft="1.6px solid rgba(255,255,255,0.2)"
          color="white"
        >
          <DrawerHeader
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            position="relative"
            p="1.25rem 1rem 1rem"
            borderBottom={{ base: '1.6px solid rgba(255,255,255,0.2)', xl: 'none' }}
          >
            <NavLink
              href="/servicios"
              display={{ base: 'flex', xl: 'none' }}
              alignItems="center"
              h="100%"
              fontSize="0.75rem"
              letterSpacing="widest"
              textTransform="uppercase"
              aria-label="Go to home page"
              onClick={onClose}
            >
              <AnimatedWordmark animate={isOpen} w="auto" h="22px" />
            </NavLink>
            <DrawerCloseButton
              pos="absolute"
              top="0.875rem"
              right="0.75rem"
              color="gold"
              _hover={{ color: 'white' }}
            />
          </DrawerHeader>

          <DrawerBody p="3px 0 0 0" display="flex" flexDir="column">
            <UnorderedList m={0} p={0} listStyleType="none">
              {items.map((item, index) => {
                const isSelected = activePath.indexOf(item.slug) > -1
                const Icon = item.icon

                return (
                  <MotionListItem key={item.id} initial="initial" whileHover="animate">
                    <NavLink
                      href={`/servicios/${item.slug}`}
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      pt="1.875rem"
                      pb={isSelected ? '1.25rem' : '1.875rem'}
                      px="1.125rem"
                      textAlign="left"
                      transition="background 0.2s linear"
                      borderTop={HAIRLINE}
                      borderBottom={index === items.length - 1 ? HAIRLINE : undefined}
                      bg={isSelected ? HIGHLIGHT : undefined}
                      _hover={{ bg: HIGHLIGHT }}
                      onClick={onClose}
                      aria-current={isSelected ? 'page' : undefined}
                      aria-label={`Go to ${item.label} page`}
                    >
                      <Icon w={`${item.iconWidth / 16}rem`} h="auto" display="block" />
                      <Tagline text={item.tagline} isSelected={isSelected} mt="1.125rem" />
                    </NavLink>
                  </MotionListItem>
                )
              })}
            </UnorderedList>

            {footer ? (
              <Flex
                h="100%"
                w="100%"
                direction="column"
                justifyContent="flex-end"
                alignItems="flex-end"
                minH="4.6875rem"
                px="1.6875rem"
                py="0.75rem"
              >
                {footer}
              </Flex>
            ) : null}
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}
