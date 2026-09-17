import { useRouter } from 'next/compat/router'
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { ContactModal } from './ContactModal'

interface ContactModalValue {
  isOpen: boolean
  open: () => void
  close: () => void
}

const ContactModalContext = createContext<ContactModalValue | null>(null)

/**
 * Mounted once in `_app`, so the card is one overlay shared by every page
 * instead of a copy per route — any component can raise it through
 * `useContactModal()`.
 */
export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  // A route change under an open overlay would leave it floating over a page
  // the visitor never asked it for.
  // `next/compat/router` devuelve null en el App Router, donde cada
  // navegación remonta el árbol y cierra la tarjeta por sí sola.
  useEffect(() => {
    if (!router) return
    router.events.on('routeChangeStart', close)
    return () => router.events.off('routeChangeStart', close)
  }, [router, close])

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close])

  return (
    <ContactModalContext.Provider value={value}>
      {children}
      <ContactModal isOpen={isOpen} onClose={close} />
    </ContactModalContext.Provider>
  )
}

export function useContactModal(): ContactModalValue {
  const value = useContext(ContactModalContext)
  if (!value) throw new Error('useContactModal must be used inside <ContactModalProvider>')
  return value
}
