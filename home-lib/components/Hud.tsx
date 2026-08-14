import { MenuDrawer } from '@servicios/components/chrome'
import { useContactModal } from '@servicios/components/contact'
import { useEffect, useState } from 'react'
import { useUiSfx } from '../audio/useUiSfx'
import content from '../data/content.json'

// Split ring from the services footer: two 150 degree arcs on r=10.5,
// leaving a gap top-right and bottom-left.
const RING =
  '<path class="yk-soc-ring" d="M10.18 22.34A10.5 10.5 0 0 1 8.41 2.13"/>' +
  '<path class="yk-soc-ring" d="M13.82 1.66A10.5 10.5 0 0 1 15.59 21.87"/>'

const USER_ICON =
  '<svg viewBox="0 0 24 24" aria-hidden="true">' +
  '<path d="M12 12.4a4.7 4.7 0 1 0 0-9.4 4.7 4.7 0 0 0 0 9.4Zm0 1.9c-4.1 0-7.4 2.4-7.4 5.4V21h14.8v-1.3c0-3-3.3-5.4-7.4-5.4Z"/>' +
  '</svg>'

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
 * HUD header: clock + social (left) · nav + login (right).
 * Menu/login/social entries come from home-lib/data/content.json — edit them
 * there. Items with `modal: true` raise the shared ContactModal instead of
 * navigating away.
 */
export function Hud() {
  const { open } = useContactModal()
  const { time, date } = useClock()
  const [menuOpen, setMenuOpen] = useState(false)
  // Hover and click sounds for every link and button in the bar.
  const sfx = useUiSfx()

  return (
    <div id="yk-hud" {...sfx}>
      <div className="yk-hud-side yk-hud-left">
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
            {content.menu.map((m) => (
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
          </nav>
          <a
            id="yk-login"
            href={content.login.url}
            {...(isExternal(content.login.url)
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
            dangerouslySetInnerHTML={{ __html: `${USER_ICON}<span>${content.login.name}</span>` }}
          />
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
    </div>
  )
}
