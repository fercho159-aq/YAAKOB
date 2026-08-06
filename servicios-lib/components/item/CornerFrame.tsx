import type { BoxProps } from '@chakra-ui/react'
import type { Variants } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { MotionCanvas } from './motion'
import { VARIANTS } from './shared'

const GOLD = '#E0BE7A'
/** Half of the 1.5px stroke, so the line lands on the pixel grid. */
const INSET = 0.75
const ARM = 8

/** Flickers on — three quick blinks — while scaling up to its resting size. */
const frameVariants: Variants = {
  [VARIANTS.hidden]: { scale: 0.95 },
  [VARIANTS.visible]: {
    scale: 1,
    opacity: [0, 1, 0, 1, 0, 1],
    transition: {
      ease: 'easeIn',
      duration: 0.3,
      scale: { ease: [0.25, 0, 0, 1], duration: 1 },
    },
  },
}

/** Gold brackets at each corner of the thumbnail, drawn on a 2D canvas. */
export function CornerFrame(props: BoxProps) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return

    const ratio = window.devicePixelRatio || 1
    const width = canvas.offsetWidth
    const height = canvas.offsetHeight
    canvas.width = width * ratio
    canvas.height = height * ratio

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.scale(ratio, ratio)
    ctx.clearRect(0, 0, width, height)
    ctx.strokeStyle = GOLD
    ctx.lineWidth = 1.5

    const corners: [number, number, number, number, number, number][] = [
      [INSET, INSET + ARM, INSET, INSET, INSET + ARM, INSET],
      [width - INSET - ARM, INSET, width - INSET, INSET, width - INSET, INSET + ARM],
      [
        width - INSET,
        height - INSET - ARM,
        width - INSET,
        height - INSET,
        width - INSET - ARM,
        height - INSET,
      ],
      [INSET, height - INSET - ARM, INSET, height - INSET, INSET + ARM, height - INSET],
    ]

    for (const [x1, y1, x2, y2, x3, y3] of corners) {
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.lineTo(x3, y3)
      ctx.stroke()
    }
  }, [])

  return (
    <MotionCanvas
      pos="absolute"
      w="100%"
      h="100%"
      pointerEvents="none"
      opacity="0"
      variants={frameVariants}
      ref={ref}
      {...props}
    />
  )
}
