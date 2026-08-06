import { Box, type BoxProps } from '@chakra-ui/react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const CHAR_SETS = {
  alphabetic: 'abcdefghijklmnopqrstuvwxyz',
  numeric: '0123456789',
  special: '~`!@#$%^&*()-_+={}[]|\\/:;"\'<>,.?',
} as const

type CharSet = keyof typeof CHAR_SETS

type QueueEntry = {
  startChar: string
  endChar: string
  startTime: number
  endTime: number
}

/**
 * Retypes the element one character at a time, showing a random glyph while a
 * slot is in flight. Writes to `innerHTML` directly rather than through React —
 * a frame-by-frame re-render of every character would be far more expensive.
 */
class Scrambler {
  private el: HTMLElement
  private chars: string
  private endTime: number
  private queue: QueueEntry[] = []
  private startTime = 0
  private frame: number | null = null

  constructor(el: HTMLElement, duration: number | undefined, chars: CharSet | undefined) {
    this.el = el
    this.chars = (chars && CHAR_SETS[chars]) || CHAR_SETS.alphabetic
    this.endTime = (duration ?? 0) * 1000 || 500
  }

  disable(): void {
    if (this.frame !== null) cancelAnimationFrame(this.frame)
    this.frame = null
  }

  reset(): void {
    this.el.textContent = ''
  }

  animate(text: string): void {
    this.disable()
    const from = this.el.innerText
    const slots = Math.max(from.length, text.length)
    const step = this.endTime / slots

    this.queue = []
    for (let i = 0; i < slots; i++) {
      this.queue.push({
        startChar: from[i] || '',
        endChar: text[i] || '',
        startTime: i * step,
        endTime: i * step + step,
      })
    }

    this.startTime = 0
    this.frame = requestAnimationFrame(this.update)
  }

  private update = (timestamp: number): void => {
    if (this.startTime === 0) this.startTime = timestamp
    const elapsed = timestamp - this.startTime

    let html = ''
    let done = 0
    for (const entry of this.queue) {
      if (elapsed >= entry.endTime) {
        done++
        html += entry.endChar
      } else if (elapsed >= entry.startTime) {
        html += `<span style="opacity: 0.5">${this.randomChar()}</span>`
      } else {
        html += entry.startChar
      }
    }
    this.el.innerHTML = html

    if (done === this.queue.length) {
      this.frame = null
      return
    }
    this.frame = requestAnimationFrame(this.update)
  }

  private randomChar(): string {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}

export type ScrambleTextProps = Omit<BoxProps, 'children'> & {
  text: string
  animate?: boolean
  delay?: number
  duration?: number
  chars?: CharSet
  /** Change this to replay the animation for an unchanged `text`. */
  restart?: number | string
}

export function ScrambleText({
  text,
  animate = true,
  delay = 0,
  duration,
  chars,
  restart,
  ...rest
}: ScrambleTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const scrambler = useRef<Scrambler | null>(null)
  // The server renders the first value so the text is present without JS; the
  // scrambler blanks it on mount and types it back in.
  const [initialText] = useState(text)
  const [box, setBox] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    const measure = () => {
      const rect = ref.current?.getBoundingClientRect()
      if (rect) setBox({ width: rect.width, height: rect.height })
    }
    let timer: ReturnType<typeof setTimeout> | null = null
    const onResize = () => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(measure, 200)
    }
    measure()
    window.addEventListener('resize', onResize)
    return () => {
      if (timer) clearTimeout(timer)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    if (!ref.current) return
    const instance = new Scrambler(ref.current, duration, chars)
    scrambler.current = instance
    instance.reset()
    return () => {
      instance.disable()
      scrambler.current = null
    }
  }, [chars, duration])

  useEffect(() => {
    if (!scrambler.current || !animate) return
    if (restart !== undefined) scrambler.current.reset()
    if (!delay) {
      scrambler.current.animate(text)
      return
    }
    const timer = setTimeout(() => scrambler.current?.animate(text), delay * 1000)
    return () => clearTimeout(timer)
  }, [animate, delay, text, restart])

  // A hidden tab suspends requestAnimationFrame, which leaves a half-typed word
  // frozen on screen. Replay it as soon as the tab comes back.
  useEffect(() => {
    if (!animate) return
    const replay = () => {
      if (!document.hidden) scrambler.current?.animate(text)
    }
    document.addEventListener('visibilitychange', replay)
    return () => document.removeEventListener('visibilitychange', replay)
  }, [animate, text])

  return (
    <Box
      as="span"
      display="inline-block"
      style={{ minHeight: `${box.height / 16}rem`, minWidth: `${box.width / 16}rem` }}
      ref={ref}
      {...rest}
    >
      {initialText}
    </Box>
  )
}
