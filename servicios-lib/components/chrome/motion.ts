import {
  Box,
  Center,
  Flex,
  ListItem,
  chakra,
  type BoxProps,
  type CenterProps,
  type FlexProps,
  type ListItemProps,
} from '@chakra-ui/react'
import { motion, type MotionProps } from 'framer-motion'
import NextLink from 'next/link'
import type { ComponentProps, ComponentType, ForwardRefExoticComponent, RefAttributes } from 'react'

/**
 * Props Chakra and framer-motion both declare with incompatible types — Chakra
 * wants CSS strings, framer wants objects. framer wins on a motion component.
 */
type Clashing =
  | 'transition'
  | 'style'
  | 'onDrag'
  | 'onDragStart'
  | 'onDragEnd'
  | 'onDragOver'
  | 'onDragEnter'
  | 'onDragLeave'
  | 'onDrop'
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration'

type Motionify<P> = Omit<P, Clashing> & MotionProps
type MotionComponent<P> = ForwardRefExoticComponent<Motionify<P> & RefAttributes<HTMLElement>>

/** A `next/link` that accepts Chakra style props, as the original's `<Link>` does. */
export const NavLink = chakra(NextLink)
type NavLinkProps = ComponentProps<typeof NavLink>

export type MotionBoxProps = Motionify<BoxProps>
export type MotionFlexProps = Motionify<FlexProps>
export type MotionCenterProps = Motionify<CenterProps>
export type MotionListItemProps = Motionify<ListItemProps>
export type MotionNavLinkProps = Motionify<NavLinkProps>

export const MotionBox = motion(Box) as unknown as MotionComponent<BoxProps>
export const MotionFlex = motion(Flex as unknown as ComponentType<FlexProps>) as unknown as MotionComponent<FlexProps>
export const MotionCenter = motion(Center) as unknown as MotionComponent<CenterProps>
export const MotionListItem = motion(
  ListItem as unknown as ComponentType<ListItemProps>,
) as unknown as MotionComponent<ListItemProps>
export const MotionNavLink = motion(NavLink) as unknown as MotionComponent<NavLinkProps>
