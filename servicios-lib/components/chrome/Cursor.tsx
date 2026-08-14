import { Box } from '@chakra-ui/react'
import { animate, useAnimation, useMotionValue, type Variants } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useMouseFollower } from '@servicios/hooks'
import { MotionBox } from './motion'

export const CURSOR_DIAMETER = 177
export const CURSOR_ARROW_SIZE = 20
export const CURSOR_STROKE_WIDTH = 2

const RADIUS = CURSOR_DIAMETER / 2

const WHITE = '#FFFFFF'
const GOLD = '#FF9933'

export const CURSOR_TYPE = {
  label: 'label',
  hidden: 'hidden',
  loading: 'loading',
  arrowLeft: 'arrowLeft',
  arrowRight: 'arrowRight',
} as const

export type CursorType = (typeof CURSOR_TYPE)[keyof typeof CURSOR_TYPE]

const EASE: [number, number, number, number] = [0.25, 0, 0, 1]
const TRANSITION = { ease: EASE, duration: 0.8 }

function drawArrow(
  ctx: CanvasRenderingContext2D,
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  headSize: number,
  color: string,
) {
  const angle = Math.atan2(toY - fromY, toX - fromX)
  ctx.lineCap = 'square'
  ctx.beginPath()
  ctx.moveTo(fromX, fromY)
  ctx.lineTo(toX, toY)
  ctx.moveTo(toX - headSize * Math.cos(angle - Math.PI / 4), toY - headSize * Math.sin(angle - Math.PI / 4))
  ctx.lineTo(toX, toY)
  ctx.moveTo(toX - headSize * Math.cos(angle + Math.PI / 4), toY - headSize * Math.sin(angle + Math.PI / 4))
  ctx.lineTo(toX, toY)
  ctx.strokeStyle = color
  ctx.stroke()
}

/** Sizes the backing store to the device pixel ratio and returns the context. */
function setCanvas(canvas: HTMLCanvasElement): CanvasRenderingContext2D | null {
  const ratio = window.devicePixelRatio || 1
  const ctx = canvas.getContext('2d')
  canvas.width = canvas.offsetWidth * ratio
  canvas.height = canvas.offsetHeight * ratio
  ctx?.scale(ratio, ratio)
  return ctx
}

function randomRotation(previous: number) {
  return Math.floor(Math.random() * (120 * (previous >= 0 ? -1 : 1)))
}

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined)
  useEffect(() => {
    ref.current = value
    return () => {
      ref.current = undefined
    }
  })
  return ref.current
}

const canvasVariants: Variants = {
  loading: (degrees: number) => ({
    rotate: `${degrees}deg`,
    transition: { ease: EASE, duration: 1.5 },
  }),
  clicked: { scale: [1, 0.95, 1], transition: { ease: 'easeIn', duration: 0.2 } },
}

const labelVariants: Variants = {
  hidden: { y: '100%' },
  visible: (loading: boolean) => ({
    y: '0%',
    scale: loading ? [1, 0.9, 1] : 1,
    transition: {
      duration: 0.8,
      ease: EASE,
      scale: { repeat: Infinity, duration: 2, delay: 0.8 },
    },
  }),
}

export interface CursorProps {
  /** Word shown inside the bubble — "Select" on the home page, "Play" on a game page. */
  label?: string
  type?: CursorType
  /** Flip to true for one render to play the click pulse. */
  animateClick?: boolean
  onClickAnimation?: () => void
}

export function Cursor({
  label,
  type = CURSOR_TYPE.hidden,
  animateClick = false,
  onClickAnimation,
}: CursorProps) {
  const root = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const ctx = useRef<CanvasRenderingContext2D | null>(null)
  const size = useRef({ width: 0, height: 0 })
  const [rotation, setRotation] = useState(0)
  const controls = useAnimation()
  const previousType = usePrevious(type)

  const arrowRight = useMotionValue(0)
  const arrowLeft = useMotionValue(0)
  const ring = useMotionValue(0)

  useEffect(() => {
    if (!animateClick) return
    controls.start('clicked')
    onClickAnimation?.()
  }, [animateClick, controls, onClickAnimation])

  useEffect(() => {
    if (type === previousType) return
    const wasRight = previousType === CURSOR_TYPE.arrowRight
    const wasLeft = previousType === CURSOR_TYPE.arrowLeft
    const isRight = type === CURSOR_TYPE.arrowRight
    const isLeft = type === CURSOR_TYPE.arrowLeft

    animate(ring, type === CURSOR_TYPE.hidden ? 0 : 1, TRANSITION)
    if (isRight || wasRight) animate(arrowRight, isRight ? 1 : 0, TRANSITION)
    if (isLeft || wasLeft) animate(arrowLeft, isLeft ? 1 : 0, TRANSITION)
  }, [type, previousType, ring, arrowRight, arrowLeft])

  useEffect(() => {
    if (!canvas.current) return
    ctx.current = setCanvas(canvas.current)
    size.current = { width: canvas.current.offsetWidth, height: canvas.current.offsetHeight }
  }, [])

  useEffect(() => {
    if (type !== CURSOR_TYPE.loading) return
    const interval = window.setInterval(() => setRotation(randomRotation), 2000)
    return () => window.clearInterval(interval)
  }, [type])

  useMouseFollower(({ x, y }) => {
    const context = ctx.current
    const element = root.current
    if (!context || !element) return

    context.clearRect(0, 0, size.current.width, size.current.height)

    const right = arrowRight.get()
    const left = arrowLeft.get()
    const progress = ring.get()

    if (right > 0) {
      drawArrow(
        context,
        (RADIUS - CURSOR_ARROW_SIZE) * right,
        RADIUS,
        (RADIUS + CURSOR_ARROW_SIZE) * right,
        RADIUS,
        10 * right,
        WHITE,
      )
    }

    if (left > 0) {
      drawArrow(
        context,
        CURSOR_DIAMETER - (RADIUS - CURSOR_ARROW_SIZE) * left,
        CURSOR_DIAMETER - RADIUS,
        CURSOR_DIAMETER - (RADIUS + CURSOR_ARROW_SIZE) * left,
        CURSOR_DIAMETER - RADIUS,
        10 * left,
        WHITE,
      )
    }

    if (progress > 0) {
      context.fillStyle = GOLD
      context.strokeStyle = GOLD

      // Inner hairline arc.
      context.beginPath()
      context.arc(
        RADIUS,
        RADIUS,
        RADIUS - CURSOR_STROKE_WIDTH / 2 - 8,
        0.5 * Math.PI,
        0.5 * Math.PI + 2 * Math.PI * progress,
      )
      context.lineWidth = 1
      context.stroke()

      // The four tick marks that grow inward from the rim.
      context.beginPath()
      context.moveTo(RADIUS - 5, 9)
      context.lineTo(RADIUS + 5, 9)
      context.lineTo(RADIUS, 9 + 7 * progress)
      context.fill()

      context.beginPath()
      context.moveTo(CURSOR_DIAMETER - 9, RADIUS - 5)
      context.lineTo(CURSOR_DIAMETER - 9, RADIUS + 5)
      context.lineTo(CURSOR_DIAMETER - 9 - 7 * progress, RADIUS)
      context.fill()

      context.beginPath()
      context.moveTo(RADIUS - 5, CURSOR_DIAMETER - 9)
      context.lineTo(RADIUS + 5, CURSOR_DIAMETER - 9)
      context.lineTo(RADIUS, CURSOR_DIAMETER - 9 - 7 * progress)
      context.fill()

      context.beginPath()
      context.moveTo(9, RADIUS - 5)
      context.lineTo(9, RADIUS + 5)
      context.lineTo(9 + 7 * progress, RADIUS)
      context.fill()

      // Outer rim.
      context.beginPath()
      context.arc(
        RADIUS,
        RADIUS,
        RADIUS - CURSOR_STROKE_WIDTH / 2,
        -0.5 * Math.PI,
        -0.5 * Math.PI + 2 * Math.PI * progress,
      )
      context.lineWidth = CURSOR_STROKE_WIDTH
      context.stroke()
    }

    element.style.transform = `translate3d(${x - RADIUS}px, ${y - RADIUS}px, 0)`
  })

  const labelVisible = type === CURSOR_TYPE.label || type === CURSOR_TYPE.loading

  return (
    <Box
      ref={root}
      pos="fixed"
      top="0"
      left="0"
      zIndex="cursor"
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="11.0625rem"
      height="11.0625rem"
      borderRadius="50%"
      overflow="hidden"
      transition="backdrop-filter 0.8s"
      style={{ backdropFilter: `blur(${type === CURSOR_TYPE.hidden ? '0px' : '6px'})` }}
      pointerEvents="none"
    >
      <MotionBox variants={canvasVariants} animate={controls} pos="absolute" w="100%" h="100%">
        <MotionBox
          as="canvas"
          ref={canvas}
          variants={canvasVariants}
          animate={type === CURSOR_TYPE.loading ? 'loading' : undefined}
          custom={rotation}
          pos="absolute"
          zIndex={-1}
          w="100%"
          h="100%"
        />
      </MotionBox>
      <Box as="span" display="inline-block" overflow="hidden">
        <MotionBox
          as="span"
          display="inline-block"
          fontSize="0.875rem"
          fontWeight="semibold"
          letterSpacing="widest"
          textTransform="uppercase"
          variants={labelVariants}
          initial="hidden"
          animate={labelVisible ? 'visible' : 'hidden'}
          custom={type === CURSOR_TYPE.loading}
        >
          {label}
        </MotionBox>
      </Box>
    </Box>
  )
}
