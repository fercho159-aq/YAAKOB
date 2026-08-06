import { AspectRatio, chakra, shouldForwardProp, type AspectRatioProps } from '@chakra-ui/react'
import { isValidMotionProp, motion } from 'framer-motion'
import NextLink from 'next/link'
import type { ComponentType } from 'react'

const forwardProp = (prop: string) => isValidMotionProp(prop) || shouldForwardProp(prop)

export const MotionBox = chakra(motion.div, { shouldForwardProp: forwardProp })
export const MotionArticle = chakra(motion.article, { shouldForwardProp: forwardProp })
export const MotionSection = chakra(motion.section, { shouldForwardProp: forwardProp })
export const MotionParagraph = chakra(motion.p, { shouldForwardProp: forwardProp })
export const MotionCanvas = chakra(motion.canvas, { shouldForwardProp: forwardProp })
export const MotionButton = chakra(motion.button, { shouldForwardProp: forwardProp })
export const MotionAnchor = chakra(motion.a, { shouldForwardProp: forwardProp })
// See the comment in `../chrome/motion.ts`: Chakra's `As`-based overload
// resolution combined with React 19 types blows past TS's instantiation
// depth limit here, so the component is widened to a plain `ComponentType`
// before being handed to `motion()`.
export const MotionAspectRatio = motion(AspectRatio as unknown as ComponentType<AspectRatioProps>)

/** Animatable client-side link — `chakra(...)` with `as` would drop the motion props. */
export const MotionNextLink = chakra(motion(NextLink), { shouldForwardProp: forwardProp })
