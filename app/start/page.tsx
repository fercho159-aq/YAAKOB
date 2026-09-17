"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { SiteHeader } from "@servicios/components/chrome";
import "./start.css";

// ─── Floating Hebrew letters ───────────────────────────────────
const FLOAT_LETTERS = ["נ", "ח", "ל", "פ", "כ", "ע", "ם", "ד", "ר", "ב", "א", "י"];

function HebrewSplash({ onDone }: { onDone: () => void }) {
  const [splashPhase, setSplashPhase] = useState(0);

  useEffect(() => {
    const t0 = setTimeout(() => setSplashPhase(1), 100);   // text appears
    const t1 = setTimeout(() => setSplashPhase(2), 4500);  // fade out
    const t2 = setTimeout(() => onDone(), 5500);            // remove
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div className={`splash splash--phase-${splashPhase}`}>
      {/* Large background glyph */}
      <div className="splash-bg-glyph">מ</div>

      {/* Corner markers */}
      <div className="splash-corner splash-corner--tl" />
      <div className="splash-corner splash-corner--tr" />
      <div className="splash-corner splash-corner--bl" />
      <div className="splash-corner splash-corner--br" />

      {/* Floating letters */}
      {FLOAT_LETTERS.map((letter, i) => (
        <span
          key={i}
          className="splash-float"
          style={{
            top: `${12 + (i * 7) % 76}%`,
            left: `${8 + ((i * 13 + 5) % 84)}%`,
            animationDelay: `${i * 0.18}s`,
            animationDuration: `${3 + (i % 3)}s`,
          }}
        >
          {letter}
        </span>
      ))}

      {/* Center text — Psalm */}
      <div className="splash-center">
        <p className="splash-psalm-line">אֱלֹהִים יְחָנֵּנוּ וִיבָרְכֵנוּ יָאֵר פָּנָיו אִתָּנוּ סֶלָה</p>
        <p className="splash-psalm-line">לָדַעַת בָּאָרֶץ דַּרְכֶּךָ בְּכָל גּוֹיִם יְשׁוּעָתֶךָ</p>
        <p className="splash-psalm-line">יוֹדוּךָ עַמִּים אֱלֹהִים יוֹדוּךָ עַמִּים כֻּלָּם</p>
      </div>
    </div>
  );
}

// ─── Pasarela circular de la app (presentación del cliente) ────
// Orden y títulos de las trece pantallas, tal como los entregó el cliente.
const SLIDES = [
  "YAAKOB",
  "INE",
  "Datos Fiscales",
  "Registro RFC",
  "Bienvenido",
  "Chat Clientes",
  "Requerimiento SAT",
  "Recargos y Actualizaciones",
  "Calculadora RFC",
  "Diario Oficial",
  "Marcos Legales",
  "Cita Presencial",
  "Próximamente",
].map((title, i) => ({
  title,
  src: `/app/pasarela/${String(i + 1).padStart(2, "0")}.webp`,
}));

const SLIDE_COUNT = SLIDES.length;
const ANGLE_STEP = 360 / SLIDE_COUNT;
const AUTOPLAY_MS = 4800;
const MOBILE_BREAKPOINT = 760;

const modulo = (value: number) => ((value % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT;

/** Distancia con signo (−6…6) entre una diapositiva y la activa. */
function signedDistance(index: number, active: number) {
  let value = index - active;
  if (value > SLIDE_COUNT / 2) value -= SLIDE_COUNT;
  if (value < -SLIDE_COUNT / 2) value += SLIDE_COUNT;
  return value;
}

type SlideVars = React.CSSProperties & Record<`--${string}`, string | number>;

function PhoneCarousel({ onEnlarge, frozen }: { onEnlarge: (index: number) => void; frozen: boolean }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(0);
  const [size, setSize] = useState({ width: 0, height: 0, mobile: false });
  const [paused, setPaused] = useState(false);
  const drag = useRef<{ x: number; moved: boolean } | null>(null);
  const wheelLock = useRef(false);
  const lastTap = useRef(0);

  const active = modulo(position);

  // Medida del carrusel: define el radio de la órbita y el desplazamiento vertical.
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const measure = () =>
      setSize({ width: el.clientWidth, height: el.clientHeight, mobile: window.innerWidth <= MOBILE_BREAKPOINT });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener("resize", measure, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const step = useCallback((amount: number) => setPosition((p) => p + amount), []);

  const goTo = useCallback(
    (index: number) => setPosition((p) => p + signedDistance(index, modulo(p))),
    []
  );

  // Avance automático; se reinicia con cada interacción (cambia `position`)
  // y se detiene mientras hay un modal abierto o se arrastra.
  useEffect(() => {
    if (paused || frozen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = window.setInterval(() => step(1), AUTOPLAY_MS);
    const onVisibility = () => {
      window.clearInterval(timer);
      if (!document.hidden) timer = window.setInterval(() => step(1), AUTOPLAY_MS);
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [paused, frozen, position, step]);

  // Flechas del teclado.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (paused || frozen) return;
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paused, frozen, step]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    drag.current = { x: e.clientX, moved: false };
    setPaused(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (drag.current && Math.abs(e.clientX - drag.current.x) > 10) drag.current.moved = true;
  };
  // Con el puntero capturado los eventos apuntan al carrusel, no al teléfono:
  // se resuelve el elemento bajo el cursor por coordenadas.
  const hitsCenter = (x: number, y: number) =>
    Boolean(document.elementFromPoint(x, y)?.closest(".sp-slide.is-center"));

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (drag.current) {
      const delta = e.clientX - drag.current.x;
      const onCenter = hitsCenter(e.clientX, e.clientY);
      if (Math.abs(delta) > 40) step(delta < 0 ? 1 : -1);
      else if (!drag.current.moved && e.pointerType === "touch" && onCenter) {
        const now = e.timeStamp;
        if (now - lastTap.current < 330) {
          onEnlarge(active);
          lastTap.current = 0;
        } else lastTap.current = now;
      }
    }
    drag.current = null;
    setPaused(false);
  };
  const onPointerCancel = () => {
    drag.current = null;
    setPaused(false);
  };
  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (wheelLock.current || Math.abs(e.deltaX) + Math.abs(e.deltaY) < 12) return;
    wheelLock.current = true;
    step((e.deltaX || e.deltaY) > 0 ? 1 : -1);
    window.setTimeout(() => {
      wheelLock.current = false;
    }, 760);
  };
  const onDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hitsCenter(e.clientX, e.clientY)) onEnlarge(active);
  };

  const { width, height, mobile } = size;
  const radius = mobile ? width * 1.05 : Math.min(width * 0.43, 660);

  return (
    <>
      <div
        ref={carouselRef}
        className="sp-carousel"
        role="region"
        aria-roledescription="carrusel"
        aria-label="Funciones de la aplicación YAAKOB"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onWheel={onWheel}
        onDoubleClick={onDoubleClick}
      >
        <div className="sp-slides">
          {SLIDES.map((slide, index) => {
            const relative = signedDistance(index, active);
            const absolute = Math.abs(relative);
            const radians = ((index - position) * ANGLE_STEP * Math.PI) / 180;
            // En teléfono el carrusel ocupa justo el alto disponible: sin
            // desplazamiento vertical para que no invada el título.
            const faceY = mobile || absolute === 0 ? 0 : -height * 0.102;
            const vars: SlideVars = {
              "--orbit-x": `${Math.sin(radians) * radius}px`,
              "--orbit-z": `${(Math.cos(radians) - 1) * radius}px`,
              "--face-scale": absolute === 0 ? 1 : 0.72,
              "--face-y": `${faceY}px`,
              "--opacity": absolute <= 1 ? 1 : 0,
              "--z": absolute === 0 ? 30 : absolute === 1 ? 20 : 1,
            };
            return (
              <article
                key={slide.src}
                className={`sp-slide${relative === 0 ? " is-center" : ""}`}
                style={vars}
                aria-hidden={relative !== 0}
              >
                <div className="sp-orbit-face">
                  <div className="sp-phone">
                    {/* Carga progresiva: sólo las pantallas a dos pasos de la activa. */}
                    {absolute <= 2 && (
                      <img
                        src={slide.src}
                        alt={slide.title}
                        draggable={false}
                        decoding="async"
                        fetchPriority={index === 0 ? "high" : "auto"}
                      />
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="sp-nav">
        <button type="button" className="sp-arrow" aria-label="Función anterior" onClick={() => step(-1)}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <div className="sp-caption" aria-live="polite">
          <strong>{SLIDES[active].title}</strong>
          <span>
            <b>{String(active + 1).padStart(2, "0")}</b> / {SLIDE_COUNT}
          </span>
        </div>
        <div className="sp-dots" aria-label="Seleccionar función">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              className={`sp-dot${index === active ? " active" : ""}`}
              aria-label={`Ver ${slide.title}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
        <button type="button" className="sp-arrow" aria-label="Siguiente función" onClick={() => step(1)}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
        </button>
      </div>
    </>
  );
}

// ─── Main Page ──────────────────────────────────────────────────
export default function StartPage({ splash = true }: { splash?: boolean }) {
  const [showSplash, setShowSplash] = useState(splash);
  const [phase, setPhase] = useState(splash ? 0 : 2);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const handleSplashDone = useCallback(() => {
    setShowSplash(false);
    setTimeout(() => setPhase(1), 300);
    setTimeout(() => setPhase(2), 1800);
  }, []);

  // Escape cierra la vista ampliada.
  useEffect(() => {
    if (viewerIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setViewerIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [viewerIndex]);

  return (
    <div className="sp">
      {/* Hebrew splash intro */}
      {showSplash && <HebrewSplash onDone={handleSplashDone} />}

      {/* Fondo plano: se retiró el lienzo de partículas. */}
      <div className="sp-canvas" />

      {/* Radial vignette */}
      <div className="sp-vignette" />

      {/* Corner hex accents */}
      <svg className="sp-hex sp-hex--tl" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M60 5 L110 30 L110 80 L60 105 L10 80 L10 30 Z" stroke="rgba(26,26,26,0.10)" strokeWidth="0.5"/>
        <path d="M60 20 L95 38 L95 72 L60 90 L25 72 L25 38 Z" stroke="rgba(26,26,26,0.07)" strokeWidth="0.5"/>
      </svg>
      <svg className="sp-hex sp-hex--br" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M60 5 L110 30 L110 80 L60 105 L10 80 L10 30 Z" stroke="rgba(26,26,26,0.08)" strokeWidth="0.5"/>
      </svg>

      {/* Content */}
      <div className={`sp-content sp-phase-${phase}`}>
        <SiteHeader />

        <header className="sp-heading">
          <p className="sp-sub">Una nueva forma de entender la ley</p>
          <h1 className="sp-title">
            <span className="sp-title__line" data-text="LA APP QUE">LA APP QUE</span>
            <span className="sp-title__line" data-text="CAMBIARÁ TU VIDA">CAMBIARÁ TU VIDA</span>
          </h1>
        </header>

        <PhoneCarousel onEnlarge={setViewerIndex} frozen={viewerIndex !== null} />

        <footer className="sp-footer">
          <p className="sp-instruction">
            <span className="sp-instruction__desktop">Descubra cada función · Doble clic para ampliar</span>
            <span className="sp-instruction__mobile">Arrastre para girar · Doble toque para ampliar</span>
          </p>
        </footer>
      </div>

      {/* Vista ampliada de la pantalla activa */}
      {viewerIndex !== null && (
        <div className="sp-viewer" role="dialog" aria-label="Vista ampliada" onClick={() => setViewerIndex(null)}>
          <button className="sp-viewer__close" aria-label="Cerrar" onClick={() => setViewerIndex(null)}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={SLIDES[viewerIndex].src} alt={SLIDES[viewerIndex].title} />
            <figcaption>{SLIDES[viewerIndex].title}</figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
