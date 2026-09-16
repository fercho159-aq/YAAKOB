"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import legal from "@servicios/data/legal.json";
import { NIVELES, formatearEntero, formatearPrecio, planDe, type Nivel } from "@pagos/planes";
import { StartHeader } from "../start/StartHeader";
import { CheckoutModal } from "./CheckoutModal";
import "./planes.css";

/**
 * Landing de venta de la app: la quinta entrega del cliente («YAAKOB-Codigo-
 * Final») llevada al lenguaje del sitio. Mismo orden de secciones que la
 * presentación —— hero, confianza, planes, beneficios, pie —— con los micro
 * puntos y el cyan de la referencia sobre el fondo y la tipografía de /start.
 */

const WHATSAPP = "https://wa.me/5215530077441";

const BENEFICIOS = [
  {
    numero: "01.",
    imagen: "/planes/benefit-symbol.png",
    titulo: "Entienda sin tecnicismos",
    texto: "Transforme documentos y situaciones fiscales complejas en explicaciones claras.",
  },
  {
    numero: "02.",
    imagen: "/planes/benefit-yaakob.png",
    titulo: "Actúe antes del problema",
    texto: "Identifique riesgos, prioridades y próximos pasos antes de afectar su operación.",
  },
  {
    numero: "03.",
    imagen: "/planes/benefit-flower.png",
    titulo: "Decida con respaldo",
    texto: "Reciba una ruta práctica para proteger su patrimonio y avanzar con seguridad.",
  },
];

const LEGAL_LINKS = [
  { href: "/terminos", label: "Términos y condiciones" },
  { href: "/privacidad", label: "Aviso de privacidad" },
  { href: "/cancelaciones", label: "Cancelaciones y reembolsos" },
];

const SITE_LINKS = [
  { href: "/apps", label: "Productos" },
  { href: "/servicios", label: "Servicios" },
  { href: "/contacto", label: "Contacto" },
  { href: "/start", label: "Mi cuenta" },
];

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
          <small>/mes</small>
        </strong>
        {anual.ahorro ? <em>{anual.ahorro}</em> : <span className="pl-plan__space" aria-hidden="true" />}
        <small className="pl-plan__iva">
          + IVA · {formatearPrecio(mensual.precio)} al mes
          <br />
          Anual: {formatearEntero(anual.precioBase)} + IVA · {formatearPrecio(anual.precio)}
          {anual.ahorro && (
            <>
              <br />
              Oferta válida 2026.
            </>
          )}
        </small>
      </div>

      <button type="button" className="pl-plan__buy" onClick={() => onBuy(nivel.nivel)}>
        Compre ahora
      </button>

      <b className="pl-plan__users">
        <span aria-hidden="true">♟</span> {nivel.usuarios} {nivel.usuarios === 1 ? "usuario" : "usuarios"}
      </b>
      {nivel.destacado && <small className="pl-plan__unlimited">Ilimitado · usuarios, clientes y proveedores</small>}

      <h4>Características</h4>
      <ul>
        {nivel.funciones.map((f) => (
          <li key={f.nombre} className={f.incluida ? undefined : "is-off"}>
            {f.nombre}
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
      <StartHeader />

      <main>
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="pl-hero pl-dots" id="inicio">
          <nav className="pl-hero__nav" aria-label="Contenido">
            <a className="pl-outline" href="#planes">Ver planes</a>
          </nav>
          <div className="pl-hero__copy">
            <p className="pl-eyebrow">Inteligencia fiscal en México</p>
            <h1>
              Tranquilidad
              <br />
              en sus manos
            </h1>
            <h2>Proteja su patrimonio.</h2>
            <p>Comprenda su situación fiscal, actúe a tiempo.</p>
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
        <section className="pl-trust" id="confianza">
          <span className="pl-ring pl-ring--right" aria-hidden="true" />
          <img className="pl-trust__logo" src="/planes/logo-puntos.png" alt="Símbolo YAAKOB" loading="lazy" />
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
        <section className="pl-pricing pl-dots" id="planes">
          <div className="pl-pricing__intro">
            <h2>Seleccione su plan</h2>
          </div>
          <div className="pl-pricing__content">
            <p className="pl-pricing__note">
              <span aria-hidden="true">◷</span> Garantía de devolución de 30 días
            </p>

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
          </div>
        </section>

        {/* ── Beneficios ───────────────────────────────────── */}
        <section className="pl-services" id="servicios">
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
                <i className="pl-benefit__logo">
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
      <footer className="pl-footer">
        <div className="pl-footer__grid">
          <div className="pl-footer__col">
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

          <div className="pl-footer__col">
            <strong>{responsable.denominacion}</strong>
            <address>{responsable.domicilioAtencion}</address>
          </div>

          <div className="pl-footer__col pl-footer__contact">
            <a href={`mailto:${responsable.correo}`}>{responsable.correo}</a>
            <a href="mailto:soporte@yaakob.com">soporte@yaakob.com</a>
            {responsable.telefonos.map((tel) => (
              <a key={tel} href={telHref(tel)}>{tel}</a>
            ))}
          </div>

          <nav className="pl-footer__col pl-footer__links" aria-label="Enlaces YAAKOB">
            {SITE_LINKS.map((l) => (
              <Link key={l.href} href={l.href}>{l.label}</Link>
            ))}
          </nav>
        </div>
        <div className="pl-footer__bottom">
          2026 - 2027 · <a href="https://www.yaakob.com/">www.yaakob.com</a> ·{" "}
          <Link href="/terminos">Información legal</Link> ©
        </div>
      </footer>

      {/* ── Botones flotantes (demo y WhatsApp) ──────────── */}
      <div className="pl-floating">
        <button
          type="button"
          className="pl-floating__btn pl-floating__demo"
          aria-label="Probar demostración"
          onClick={() => setDemoOpen(true)}
        >
          ✧
        </button>
        <a
          className="pl-floating__btn pl-floating__wa"
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2m0 1.67c4.54 0 8.24 3.7 8.24 8.24s-3.7 8.24-8.24 8.24c-1.48 0-2.93-.4-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m-3.4 4.42c-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.26s.97 2.62 1.1 2.8c.14.18 1.88 2.98 4.63 4.06 2.29.9 2.75.72 3.25.68.5-.05 1.6-.65 1.83-1.29.22-.63.22-1.17.16-1.29-.07-.11-.25-.18-.52-.31-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.13-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.72-1.34-1.6-1.5-1.87-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.13-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.13-.61-1.47-.84-2.01-.22-.53-.44-.46-.61-.47h-.53" />
          </svg>
        </a>
      </div>

      <DemoModal open={demoOpen} onClose={closeDemo} />
      <CheckoutModal nivel={checkoutNivel} onClose={closeCheckout} />
    </div>
  );
}
