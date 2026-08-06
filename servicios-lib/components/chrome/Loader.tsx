import { useEffect, useState } from 'react'
import { usePageReady } from '@servicios/hooks'
import { Cursor, CURSOR_TYPE, type CursorType } from './Cursor'
import { MotionBox } from './motion'

const variants = {
  hidden: { opacity: 0, transition: { duration: 1 } },
}

export interface LoaderProps {
  /** Leave unset to let the loader watch the document itself. */
  isActive?: boolean
  onAnimationEnd?: () => void
}

export function Loader({ isActive, onAnimationEnd }: LoaderProps) {
  const ready = usePageReady()
  const active = isActive ?? !ready
  const [type, setType] = useState<CursorType>(CURSOR_TYPE.loading)
  // The original leaves the faded-out overlay mounted; it sits at zIndex
  // `loader` over the whole page, so we drop it once it has finished fading.
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (active) return
    setType(CURSOR_TYPE.hidden)
  }, [active])

  if (dismissed) return null

  return (
    <MotionBox
      pos="fixed"
      top="0"
      left="0"
      zIndex="loader"
      w="100%"
      h="100%"
      pointerEvents={active ? undefined : 'none'}
      variants={variants}
      animate={active ? undefined : 'hidden'}
      onAnimationComplete={() => {
        if (active) return
        setDismissed(true)
        onAnimationEnd?.()
      }}
      aria-label="Loading page content"
      role="status"
      aria-live="assertive"
    >
      <Cursor label="Loading" type={type} />
    </MotionBox>
  )
}
