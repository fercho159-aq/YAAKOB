import { useEffect, useState } from 'react'
import { NavLink } from '@servicios/components/chrome/motion'
import { DEMO_HREF } from './data'

/** Alto del pie en escritorio; en móvil se mide, porque ahí es `auto`. */
const FOOTER_FALLBACK = 80

/** Botón fijo "Probar Demo" del póster; siempre queda encima del pie de página. */
export function DemoCta() {
  const [footerHeight, setFooterHeight] = useState(FOOTER_FALLBACK)

  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return
    const measure = () => setFooterHeight(footer.getBoundingClientRect().height || FOOTER_FALLBACK)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(footer)
    return () => ro.disconnect()
  }, [])

  return (
    <NavLink
      href={DEMO_HREF}
      pos="fixed"
      right={{ base: '1rem', xl: '1.5rem' }}
      style={{ bottom: `calc(${footerHeight}px + 1rem)` }}
      zIndex={5}
      display="inline-flex"
      alignItems="center"
      gap="0.6rem"
      h="3.25rem"
      px="1.75rem"
      borderRadius="full"
      bg="linear-gradient(180deg, #2bd36a 0%, #17a34a 100%)"
      color="white"
      fontFamily="var(--font-din-ot)"
      fontWeight={700}
      fontSize="1rem"
      letterSpacing="0.01em"
      boxShadow="0 14px 30px -10px rgba(23,163,74,0.75), inset 0 1px 0 rgba(255,255,255,0.45), 0 0 0 1px rgba(0,0,0,0.25)"
      transition="transform 0.2s ease, filter 0.2s ease"
      _hover={{ transform: 'translateY(-2px)', filter: 'brightness(1.06)', textDecor: 'none' }}
      _active={{ transform: 'translateY(0)' }}
    >
      Probar Demo
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
        <path d="M5 12h13M12 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </NavLink>
  )
}
