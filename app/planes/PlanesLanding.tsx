"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import content from "@home/data/content.json";
import legal from "@servicios/data/legal.json";
import { NIVELES, formatearEntero, formatearPrecio, planDe, type Nivel } from "@pagos/planes";
import { SiteHeader } from "@servicios/components/chrome";
import { CheckoutModal } from "./CheckoutModal";
import { HeroWaves } from "./HeroWaves";
import "./planes.css";

/**
 * Landing de venta de la app: la quinta entrega del cliente en su versión
 * «seccion-5-planes». Mismo orden de secciones que la presentación —— hero,
 * confianza, planes, beneficios, pie —— con su dirección de arte: ciudad
 * puntillista y secciones blancas, pero con el texto en fuente llena. Los
 * importes salen del catálogo y los datos de contacto de legal.json, nunca a
 * mano.
 */

const WHATSAPP = "https://wa.me/5215530187711";

const BENEFICIOS = [
  {
    numero: "01.",
    imagen: "/planes/benefit-symbol.webp",
    clase: "symbol",
    titulo: "Entienda sin tecnicismos",
    texto: "Transforme documentos y situaciones fiscales complejas en explicaciones claras.",
  },
  {
    numero: "02.",
    imagen: "/planes/benefit-yaakob.webp",
    clase: "yaakob",
    titulo: "Actúe antes del problema",
    texto: "Identifique riesgos, prioridades y próximos pasos antes de afectar su operación.",
  },
  {
    numero: "03.",
    imagen: "/planes/benefit-flower.webp",
    clase: "flower",
    titulo: "Decida con respaldo",
    texto: "Reciba una ruta práctica para proteger su patrimonio y avanzar con seguridad.",
  },
];

const LEGAL_LINKS = [
  { href: "/terminos", label: "Términos y condiciones" },
  { href: "/privacidad", label: "Aviso de privacidad" },
  { href: "/cancelaciones", label: "Cancelaciones y reembolsos" },
];

const POLITICAS = ["Política de Cookies", "Política de Privacidad", "Política de Confidencialidad"];

const SITE_LINKS = [
  { href: "/apps", label: "Productos" },
  { href: "/servicios", label: "Servicios" },
  { href: "/contacto", label: "Contacto" },
  { href: "/start", label: "Mi cuenta" },
];

// Orden de los cuadros en /planes/redes-sociales.webp.
const SPRITE = ["Instagram", "Facebook", "TikTok", "YouTube", "X", "WhatsApp"];
const REDES = content.social
  .map((s) => ({ name: s.name, url: s.url, cuadro: SPRITE.indexOf(s.name) }))
  .filter((s) => s.cuadro >= 0);

const { responsable } = legal;
const telHref = (tel: string) => `tel:${tel.replace(/[^+\d]/g, "")}`;

function DemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, [onClose]);

  return (
    <dialog
      ref={ref}
      className="pl-demo"
      aria-labelledby="pl-demo-title"
      onClick={(e) => {
        if (e.target === ref.current) ref.current?.close();
      }}
    >
      <button type="button" className="pl-demo__close" aria-label="Cerrar" onClick={() => ref.current?.close()}>
        ×
      </button>
      <h2 id="pl-demo-title">Pruebe la experiencia YAAKOB</h2>
      <img src="/planes/registro-demo.webp" alt="Pantalla de registro de la aplicación YAAKOB" loading="lazy" />
      <Link className="pl-btn pl-btn--primary" href="/contacto">
        Solicitar acceso
      </Link>
    </dialog>
  );
}

function TarjetaPlan({ nivel, onBuy }: { nivel: (typeof NIVELES)[number]; onBuy: (n: Nivel) => void }) {
  const mensual = planDe(nivel.nivel, "mensual");
  const anual = planDe(nivel.nivel, "anual");

  return (
    <article className={`pl-plan${nivel.destacado ? " is-featured" : ""}`}>
      <div className="pl-plan__summary">
        {nivel.destacado && <span className="pl-plan__popular">Popular</span>}
        <h3>{nivel.nombre}</h3>
        <p>{nivel.audiencia}</p>
        <strong>
          {formatearEntero(mensual.precioBase)}
          <small>/Mes</small>
        </strong>
        {anual.ahorro ? <em>{anual.ahorro}</em> : <span className="pl-plan__space" aria-hidden="true" />}
        <small className="pl-plan__billing">
          Facturado anualmente. Usted paga {formatearEntero(anual.precioBase)} hoy.
          <br />
          Con IVA: {formatearPrecio(anual.precio)}
          {anual.ahorro && (
            <>
              <br />
              Oferta válida 2026.
            </>
          )}
        </small>
      </div>

      <button type="button" className="pl-plan__buy" aria-haspopup="dialog" onClick={() => onBuy(nivel.nivel)}>
        Compre ahora
      </button>

      <b className="pl-plan__users">
        ♟&nbsp; {nivel.usuarios} {nivel.usuarios === 1 ? "Usuario" : "usuarios"}
      </b>
      {nivel.destacado && (
        <small className="pl-plan__unlimited">ilimitado · Usuarios, clientes y proveedores</small>
      )}

      <h4>Características</h4>
      <ul>
        {nivel.funciones.map((f) => (
          <li key={f.nombre} className={f.incluida ? undefined : "is-off"}>
            {f.nombre}
            {!f.incluida && <span className="pl-sr"> (no incluida)</span>}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function PlanesLanding() {
  const [checkoutNivel, setCheckoutNivel] = useState<Nivel | null>(null);
  const [demoOpen, setDemoOpen] = useState(false);

  const closeCheckout = useCallback(() => setCheckoutNivel(null), []);
  const closeDemo = useCallback(() => setDemoOpen(false), []);

  return (
    <div className="pl">
      <SiteHeader />

      <main>
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="pl-hero" id="inicio">
          <HeroWaves />
          <nav className="pl-hero__nav" aria-label="Contenido">
            <a className="pl-outline" href="#planes">Ver planes</a>
          </nav>
          <div className="pl-hero__copy">
            <p className="pl-eyebrow">Inteligencia fiscal en México</p>
            {/* Como el wordmark de /servicios: primera línea en contorno, segunda sólida. */}
            <h1>
              <span className="pl-hero__outline">Tranquilidad</span>{" "}
              <span className="pl-hero__solid">en sus manos</span>
            </h1>
            <h2>Proteja su patrimonio.</h2>
            <p className="pl-hero__lead">Comprenda su situación fiscal, actúe a tiempo.</p>
            <p className="pl-hero__steps">Entienda + Avance + Resuelva + Blíndese</p>
          </div>
          <div className="pl-hero__device" aria-label="Aplicación YAAKOB">
            <img
              src="/planes/telefono-restaurado-alpha.webp"
              alt="Teléfono con la app YAAKOB: defensa fiscal, regularización, prevención y asesoría"
              fetchPriority="high"
            />
          </div>
        </section>

        {/* ── Confianza ────────────────────────────────────── */}
        <section className="pl-trust pl-light" id="confianza">
          <span className="pl-ring pl-ring--right" aria-hidden="true" />
          <img className="pl-trust__logo" src="/planes/logo-puntos-claro.webp" alt="Símbolo YAAKOB" loading="lazy" />
          <div className="pl-trust__title">
            <h2>
              Su patrimonio
              <br />
              merece decisiones
              <br />
              informadas.
            </h2>
          </div>
          <p className="pl-trust__message">
            No espere a que una notificación se convierta en una contingencia. Comprenda hoy. Resuelva hoy.
          </p>
        </section>

        {/* ── Planes ───────────────────────────────────────── */}
        <section className="pl-pricing" id="planes">
          <div className="pl-pricing__intro">
            <h2>Seleccione su plan</h2>
          </div>
          <div className="pl-pricing__content">
            <p className="pl-pricing__note">◷ Garantía de devolución de 30 días</p>

            <div className="pl-plans">
              {NIVELES.map((nivel) => (
                <TarjetaPlan key={nivel.nivel} nivel={nivel} onBuy={setCheckoutNivel} />
              ))}
            </div>

            <div className="pl-pricing__legal">
              <p>
                Los precios anteriores no incluyen el Impuesto al Valor Agregado (IVA); el total con IVA se
                indica junto a cada importe y se confirma en la página de pago. A menos que se especifique lo
                contrario, los precios están en moneda nacional. Todas las suscripciones se renuevan según su
                ciclo de facturación al precio de lista hasta que usted las cancele.
              </p>
              <p>La garantía de devolución de dinero de 30 días se aplica solo para planes anuales.</p>
            </div>

            {/* Demo y WhatsApp: esquinas de la sección; en móvil, fila bajo el aviso. */}
            <div className="pl-pricing__actions">
              <button
                type="button"
                className="pl-floating pl-floating--demo"
                aria-label="Probar demostración"
                onClick={() => setDemoOpen(true)}
              >
                ✧
              </button>
              <a
                className="pl-floating pl-floating--wa"
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contactar por WhatsApp"
              >
                <span aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* ── Beneficios ───────────────────────────────────── */}
        <section className="pl-services pl-light" id="servicios">
          <span className="pl-ring pl-ring--left" aria-hidden="true" />
          <div className="pl-services__title">
            <p className="pl-eyebrow">Claridad que protege</p>
            <h2>
              Lo fiscal deja de
              <br />
              sentirse complicado.
            </h2>
            <p>YAAKOB transforma información compleja en decisiones simples y oportunas.</p>
          </div>
          <div className="pl-benefits">
            {BENEFICIOS.map((b) => (
              <article key={b.numero}>
                <span className="pl-benefit__number">{b.numero}</span>
                <i className={`pl-benefit__logo pl-benefit__logo--${b.clase}`}>
                  <img src={b.imagen} alt="" loading="lazy" />
                </i>
                <h3>{b.titulo}</h3>
                <p>{b.texto}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* ── Pie ────────────────────────────────────────────── */}
      <div className="pl-footer-scroll">
        <footer className="pl-footer">
          <div className="pl-footer__start">
            <div className="pl-social">
              {REDES.map((red) => (
                <a key={red.name} href={red.url} target="_blank" rel="noopener noreferrer" aria-label={red.name}>
                  <span
                    className="pl-social__icon"
                    style={{ backgroundPosition: `${red.cuadro * 20}% 0` }}
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
            <div className="pl-footer__payments" aria-label="Formas de pago">
              <img src="/planes/pago-visa.png" alt="Visa" loading="lazy" />
              <img src="/planes/pago-mastercard.png" alt="Mastercard" loading="lazy" />
              <img src="/planes/pago-amex.png" alt="American Express" loading="lazy" />
              <a href="https://www.openpay.mx/" target="_blank" rel="noopener noreferrer" aria-label="Openpay">
                <img src="/planes/pago-openpay.png" alt="Openpay" loading="lazy" />
              </a>
            </div>
            <nav className="pl-footer__legal" aria-label="Condiciones legales">
              {LEGAL_LINKS.map((l) => (
                <Link key={l.href} href={l.href}>{l.label}</Link>
              ))}
            </nav>
          </div>

          <div className="pl-footer__company">
            {responsable.denominacion}
            {POLITICAS.map((p) => (
              <Link key={p} href="/privacidad">{p}</Link>
            ))}
          </div>

          <address>{responsable.domicilioAtencion}</address>

          <div className="pl-footer__contact">
            <a href={`mailto:${responsable.correo}`}>{responsable.correo}</a>
            <a href="mailto:soporte@yaakob.com">soporte@yaakob.com</a>
            {responsable.telefonos.map((tel) => (
              <a key={tel} href={telHref(tel)}>{tel}</a>
            ))}
          </div>

          <nav className="pl-footer__links" aria-label="Enlaces YAAKOB">
            {SITE_LINKS.map((l) => (
              <Link key={l.href} href={l.href}>{l.label}</Link>
            ))}
          </nav>

          <div className="pl-footer__logo">
            <img src="/planes/logo-footer.webp" alt="YAAKOB" loading="lazy" />
          </div>

          <div className="pl-footer__bottom">
            2026 - 2027 · <a href="https://www.yaakob.com/">www.yaakob.com</a> ·{" "}
            <Link href="/terminos">Información legal</Link> ©
          </div>
        </footer>
      </div>

      <DemoModal open={demoOpen} onClose={closeDemo} />
      <CheckoutModal nivel={checkoutNivel} onClose={closeCheckout} />
    </div>
  );
}
