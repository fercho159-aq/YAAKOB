import type { BoxProps } from '@chakra-ui/react'
import type { Variants } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { VARIANTS } from './constants'
import { MotionCanvas } from './motion'

const GOLD = '#FF9933'
const ARM = 8
/** Half of the 1.5px stroke, so the corner sits fully inside the canvas. */
const INSET = 0.75

const variants: Variants = {
  [VARIANTS.hidden]: { scale: 0.95 },
  [VARIANTS.visible]: {
    scale: 1,
    opacity: [0, 1, 0, 1, 0, 1],
    transition: { ease: 'easeIn', duration: 0.3, scale: { ease: [0.25, 0, 0, 1], duration: 1 } },
  },
}

/** The four gold brackets that flicker on around the active slide's thumbnail. */
export function SlideCorners(props: BoxProps) {
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

    const corner = (x: number, y: number, dx: number, dy: number) => {
      ctx.beginPath()
      ctx.moveTo(x, y + dy * ARM)
      ctx.lineTo(x, y)
      ctx.lineTo(x + dx * ARM, y)
      ctx.stroke()
    }

    corner(INSET, INSET, 1, 1)
    corner(width - INSET, INSET, -1, 1)
    corner(width - INSET, height - INSET, -1, -1)
    corner(INSET, height - INSET, 1, -1)
  }, [])

  return (
    <MotionCanvas
      pos="absolute"
      w="100%"
      h="100%"
      pointerEvents="none"
      opacity="0"
      variants={variants}
      ref={ref}
      {...props}
    />
  )
}
