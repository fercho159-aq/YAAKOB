'use client'

import { useEffect, useState } from 'react'
import { useContactModal } from '@servicios/components/contact'
import { useUiSfx } from '@home/audio/useUiSfx'
import content from '@home/data/content.json'
import { MenuDrawer } from './MenuDrawer'
import { MenuOverlay } from './MenuOverlay'

// Split ring from the services footer: two 150 degree arcs on r=10.5,
// leaving a gap top-right and bottom-left.
const RING =
  '<path class="yk-soc-ring" d="M10.18 22.34A10.5 10.5 0 0 1 8.41 2.13"/>' +
  '<path class="yk-soc-ring" d="M13.82 1.66A10.5 10.5 0 0 1 15.59 21.87"/>'

const DAYS = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB']
const MONTHS = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC']
const pad = (n: number) => (n < 10 ? '0' + n : '' + n)

function isExternal(url: string) {
  return /^https?:/i.test(url)
}

/** Phone-only clock + date; hidden on desktop by the stylesheet. */
function useClock() {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    const tick = () => setNow(new Date())
    tick()
    const iv = setInterval(tick, 1000)
    return () => clearInterval(iv)
  }, [])
  return {
    time: now ? `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}` : '--:--:--',
    date: now ? `${DAYS[now.getDay()]} ${now.getDate()} ${MONTHS[now.getMonth()]}` : '',
  }
}

/**
 * The site header, shared by every page: clock + social (left) · nav + logo
 * (right), over a white band.
 * Menu/social entries come from home-lib/data/content.json — edit them
 * there. Items with `modal: true` raise the shared ContactModal instead of
 * navigating away.
 */
/**
 * The current path, read from the browser: this header ships in both routers,
 * so it cannot lean on either one's hook.
 */
function usePath() {
  const [path, setPath] = useState<string | null>(null)
  useEffect(() => setPath(window.location.pathname), [])
  return path
}

export function SiteHeader() {
  const { open } = useContactModal()
  const path = usePath()
  const { time, date } = useClock()
  const [menuOpen, setMenuOpen] = useState(false)
  const [newsOpen, setNewsOpen] = useState(false)
  // Hover and click sounds for every link and button in the bar.
  const sfx = useUiSfx()

  // A link to the page one is already on is useless: it becomes INICIO, and
  // INICIO always leads the menu.
  const onSelf = content.menu.some((m) => m.url === path)
  const menu = onSelf
    ? [{ name: 'Inicio', url: '/' }, ...content.menu.filter((m) => m.url !== path)]
    : content.menu

  return (
    <div id="yk-hud" {...sfx}>
      <div className="yk-hud-side yk-hud-left">
        {/* Sello del árbol de la vida con su leyenda, como en /servicios. */}
        <a className="yk-seal" href="/" aria-label="YAAKOB, inicio">
          <img src="/logo-xix-xxiii.png" alt="" />
          <span>XIX-XXIII</span>
        </a>
        <div className="yk-time" id="yk-time" suppressHydrationWarning>
          {time}
        </div>
        <div id="yk-social" aria-label="Síguenos">
          {content.social.map((s) => (
            <a
              key={s.name}
              className={`yk-soc${/whatsapp/i.test(s.name) ? ' is-whatsapp' : ''}`}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              title={s.name}
              aria-label={s.name}
            >
              {/* The brand glyph is authored at 24x24, so scale it to ~47% and
                  recentre it inside the ring. */}
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                dangerouslySetInnerHTML={{
                  __html: `${RING}<g class="yk-soc-glyph" transform="translate(6.35 6.35) scale(0.47)">${s.icon}</g>`,
                }}
              />
            </a>
          ))}
        </div>
      </div>
      <div className="yk-hud-side yk-hud-right">
        <div className="yk-date" id="yk-date" suppressHydrationWarning>
          {date}
        </div>
        <div className="yk-hud-row">
          <nav id="yk-nav" aria-label="Navegación">
            {menu.map((m) => (
              <a
                key={m.name}
                className="yk-navlink"
                href={m.url}
                {...(!m.modal && isExternal(m.url)
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                onClick={
                  m.modal
                    ? (e) => {
                        e.preventDefault()
                        open()
                      }
                    : undefined
                }
              >
                {m.name}
              </a>
            ))}
            <a className="yk-logo" href="/" aria-label="YAAKOB, inicio">
              <img src="/logo-yaakob.png" alt="" />
            </a>
          </nav>
          <button
            type="button"
            className="yk-news"
            aria-label="Abrir noticias"
            aria-expanded={newsOpen}
            onClick={() => setNewsOpen((o) => !o)}
          >
            Noticias
          </button>
          <button
            id="yk-burger"
            aria-label="Abrir menú"
            onClick={() => setMenuOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      <MenuDrawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <MenuOverlay isOpen={newsOpen} onClose={() => setNewsOpen(false)} />
    </div>
  )
}
