import { useEffect, useRef, useState } from 'react'
import { ItemButton, type ItemButtonProps } from './ItemButton'

/** How long the "Link copied" confirmation stays up, in ms. */
const CONFIRMATION_MS = 3000

export type ShareButtonProps = Omit<ItemButtonProps, 'href' | 'isExternal' | 'onClick'> & {
  /** Sentence handed to the Web Share API alongside the page URL. */
  text: string
  /** Label swapped in after a copy, e.g. "Link copied to clipboard". */
  confirmation: string
}

/**
 * Hands the page to the OS share sheet where one exists, and falls back to
 * copying the URL. The original only ever puts the URL on the clipboard — the
 * `text` sentence reaches the Web Share API alone.
 */
export function ShareButton({ text, label, confirmation, delay = 0, ...rest }: ShareButtonProps) {
  const [currentLabel, setCurrentLabel] = useState(label)
  const [currentDelay, setCurrentDelay] = useState(delay)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  async function share() {
    try {
      await navigator.share({ text, url: window.location.href })
    } catch (error) {
      console.warn(error)
    }
  }

  function onClick() {
    if (typeof navigator.share === 'function') {
      void share()
      return
    }
    void navigator.clipboard?.writeText(window.location.href)
    if (currentLabel !== label) return
    // Negative delay so the button re-runs its stretch already part-way open.
    setCurrentDelay(-0.5)
    setCurrentLabel(confirmation)
    timer.current = setTimeout(() => setCurrentLabel(label), CONFIRMATION_MS)
  }

  return <ItemButton label={currentLabel} delay={currentDelay} onClick={onClick} {...rest} />
}
