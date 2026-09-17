"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FacebookGlyph,
  InstagramGlyph,
  SocialRing,
  TiktokGlyph,
  WhatsappGlyph,
  XGlyph,
  YoutubeGlyph,
} from "./socialIcons";
import "./start.css";

/**
 * Barra superior de /start, /apps y /planes: redes a la izquierda, enlaces y
 * logo a la derecha; en teléfono, logo + hamburguesa con menú desplegable.
 * Los estilos (`.sp-topbar`, `.sp-social`, `.sp-links`…) viven en start.css.
 */

const MOBILE_BREAKPOINT = 760;

const NAV_LINKS = [
  { label: "Servicios", href: "/servicios" },
  { label: "Planes", href: "/planes" },
  { label: "Contacto", href: "/contacto" },
  { label: "App", href: "/apps" },
];

// Mismas redes que el resto del sitio (servicios-lib/data/content.json → site.social).
const SOCIAL_LINKS: { label: string; href: string; icon: React.ReactNode; whatsapp?: boolean }[] = [
  { label: "Instagram", href: "https://www.instagram.com/yaakobeheart/", icon: <InstagramGlyph /> },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61587552527813&locale=es_LA", icon: <FacebookGlyph /> },
  { label: "TikTok", href: "https://www.tiktok.com/@yaakob_heart", icon: <TiktokGlyph /> },
  { label: "YouTube", href: "https://www.youtube.com/@YaakobBeHeart", icon: <YoutubeGlyph /> },
  { label: "X", href: "https://x.com/yaakob", icon: <XGlyph /> },
  { label: "WhatsApp", href: "https://wa.me/5215530187711", whatsapp: true, icon: <WhatsappGlyph /> },
];

export function StartHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Escape cierra el menú del teléfono; al pasar a escritorio también se cierra.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const socials = (className: string) => (
    <nav className={className} aria-label="Redes sociales">
      {SOCIAL_LINKS.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className={s.whatsapp ? "is-whatsapp" : undefined}
        >
          {s.icon}
          <SocialRing />
        </a>
      ))}
    </nav>
  );

  return (
    <header className="sp-topbar">
      <div className="sp-topbar__desktop">
        {socials("sp-social")}
        <nav className="sp-links" aria-label="Navegación principal">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ))}
          <Link className="sp-logo" href="/" aria-label="YAAKOB, inicio">
            <img src="/logo.png" alt="" />
          </Link>
        </nav>
      </div>

      <div className="sp-topbar__mobile">
        <Link className="sp-logo" href="/" aria-label="YAAKOB, inicio">
          <img src="/logo.png" alt="" />
        </Link>
        <button
          type="button"
          className={`sp-burger${menuOpen ? " is-open" : ""}`}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-controls="sp-mobile-menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
      </div>

      <div
        id="sp-mobile-menu"
        className={`sp-mobile-menu${menuOpen ? " is-open" : ""}`}
        aria-hidden={!menuOpen}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) setMenuOpen(false);
        }}
      >
        <nav className="sp-mobile-links" aria-label="Navegación del teléfono">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ))}
        </nav>
        {socials("sp-social sp-social--mobile")}
      </div>
    </header>
  );
}
