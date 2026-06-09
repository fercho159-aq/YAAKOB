"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "./servicios.css";

// Sistema de partículas GPU (three.js) — carga solo en cliente
const ParticlesGL = dynamic(() => import("./ParticlesGL"), { ssr: false });

// ─── Áreas y catálogo ──────────────────────────────────────────────
type Area = { key: string; label: string; desc: string };
type Service = { n: string; area: string; title: string; lead: string; items: string[] };

const AREAS: Area[] = [
  { key: "cumplimiento", label: "Cumplimiento", desc: "Orden, presentación y regularización ante el SAT." },
  { key: "defensa", label: "Defensa", desc: "Protección frente a auditorías, restricciones y créditos." },
  { key: "estrategia", label: "Estrategia", desc: "Planeación, estructura y representación profesional." },
];

const SERVICES: Service[] = [
  { n: "01", area: "cumplimiento", title: "Cumplimiento de Obligaciones Fiscales", lead: "Tu situación fiscal, al día y sin sorpresas.", items: [
    "Obtención, descarga y análisis de declaraciones mensuales, provisionales, definitivas y anuales.",
    "Regularización y actualización de obligaciones fiscales.",
    "Revisión integral del cumplimiento tributario de personas físicas y morales.",
    "Elaboración y presentación de declaraciones complementarias.",
    "Gestión de cumplimiento fiscal preventivo.",
  ]},
  { n: "02", area: "cumplimiento", title: "Facturación Electrónica y Comprobantes Fiscales", lead: "Tus CFDI ordenados, válidos y deducibles.", items: [
    "Recuperación, descarga y organización de CFDI en formatos XML y PDF.",
    "Implementación y administración de sistemas de facturación electrónica.",
    "Emisión de CFDI de ingresos, egresos, pagos, nómina y complementos fiscales.",
    "Regularización de comprobantes emitidos con inconsistencias.",
    "Facturación extemporánea y procesos de regularización documental.",
    "Gestión de comprobación de gastos y deducciones fiscales mediante CFDI.",
    "Integración de expedientes fiscales digitales.",
  ]},
  { n: "03", area: "cumplimiento", title: "Firma Electrónica y Certificados Digitales", lead: "Tu identidad digital fiscal, activa y protegida.", items: [
    "Renovación de e.firma (Firma Electrónica Avanzada) para personas físicas y morales.",
    "Recuperación, gestión, renovación y desbloqueo de Sellos Digitales (CSD).",
    "Recuperación de certificados digitales revocados o restringidos.",
    "Asesoría en identidad digital fiscal.",
  ]},
  { n: "04", area: "cumplimiento", title: "Opiniones y Constancias Fiscales", lead: "Los documentos que abren puertas, en tus manos.", items: [
    "Obtención de Opinión de Cumplimiento.",
    "Gestión de Constancia de Situación Fiscal.",
    "Obtención de constancias, certificados y documentos emitidos por autoridades fiscales.",
    "Validación y actualización de datos registrales.",
  ]},
  { n: "05", area: "cumplimiento", title: "Registro Federal de Contribuyentes (RFC)", lead: "Tu registro, correcto desde el origen.", items: [
    "Inscripción de personas físicas y morales en el RFC.",
    "Reanudación de actividades fiscales.",
    "Actualización y ampliación de obligaciones fiscales.",
    "Presentación de avisos al RFC y cambio de domicilio fiscal.",
    "Actualización de actividades económicas.",
    "Corrección de situación registral.",
  ]},
  { n: "06", area: "defensa", title: "Auditorías y Facultades de Comprobación", lead: "Acompañamiento técnico cuando la autoridad revisa.", items: [
    "Defensa y acompañamiento en revisiones electrónicas.",
    "Atención integral de revisiones de gabinete.",
    "Asistencia jurídica en visitas domiciliarias.",
    "Elaboración de escritos, aclaraciones y requerimientos.",
    "Integración de expedientes para atención de facultades de comprobación.",
    "Estrategias de prevención y mitigación de contingencias fiscales.",
    "Representación técnica ante autoridades fiscales.",
  ]},
  { n: "07", area: "defensa", title: "Créditos Fiscales y Multas", lead: "Reducir, regularizar y negociar lo que debes.", items: [
    "Análisis jurídico y fiscal de créditos fiscales.",
    "Gestión para reducción, cancelación o regularización de multas.",
    "Elaboración de medios de defensa administrativa.",
    "Solicitud de condonaciones, reducciones y beneficios fiscales aplicables.",
    "Negociación y regularización de adeudos fiscales.",
    "Estrategias de cumplimiento correctivo.",
  ]},
  { n: "08", area: "defensa", title: "Sello Digital y Restricciones Operativas", lead: "Recupera tu capacidad de facturar y operar.", items: [
    "Atención especializada en procedimientos de restricción temporal de CSD.",
    "Elaboración de aclaraciones para levantamiento de restricciones.",
    "Regularización fiscal para reactivación de operaciones.",
    "Gestión integral para recuperación de capacidad de facturación.",
  ]},
  { n: "09", area: "defensa", title: "EFOS, EDOS y Vigilancia Profunda", lead: "Defensa frente al artículo 69-B y la vigilancia del SAT.", items: [
    "Atención de procedimientos derivados del art. 69-B del Código Fiscal de la Federación.",
    "Defensa de presuntos emisores de operaciones inexistentes (EFOS).",
    "Atención de procedimientos de empresas que deducen operaciones simuladas (EDOS).",
    "Atención de carta invitación SAT y programas de vigilancia profunda.",
    "Integración de materialidad fiscal y soporte documental.",
    "Estrategias de desvirtuación de presunciones fiscales.",
    "Desbloqueo de cuentas bancarias por instrucción SAT.",
  ]},
  { n: "10", area: "defensa", title: "Verificación y Regularización de Domicilio Fiscal", lead: "Acredita tu domicilio y opera sin trabas.", items: [
    "Integración de expedientes para acreditación de domicilio fiscal.",
    "Atención de verificaciones de domicilio realizadas por autoridades fiscales.",
    "Regularización de inconsistencias registrales.",
    "Gestión documental para acreditación de operaciones.",
  ]},
  { n: "11", area: "estrategia", title: "Servicios Corporativos y Empresariales", lead: "Estructura sólida para tu empresa.", items: [
    "Liquidación y disolución de sociedades mercantiles.",
    "Regularización corporativa y fiscal de empresas.",
    "Diagnóstico de riesgos fiscales y corporativos.",
    "Cumplimiento regulatorio para personas morales.",
    "Elaboración de expedientes corporativos.",
  ]},
  { n: "12", area: "estrategia", title: "Representación Fiscal Especializada", lead: "Resolvemos por ti, con respaldo legal.", items: [
    "Gestión de trámites fiscales mediante representación legal.",
    "Obtención de documentación fiscal sin comparecencia directa del contribuyente, bajo normatividad.",
    "Seguimiento de requerimientos emitidos por autoridad fiscal.",
    "Atención integral de procedimientos administrativos fiscales.",
  ]},
  { n: "13", area: "estrategia", title: "Consultoría Fiscal Estratégica", lead: "Decisiones inteligentes, antes de que importen.", items: [
    "Planeación fiscal preventiva.",
    "Diagnóstico de riesgos tributarios.",
    "Auditoría fiscal preventiva.",
    "Reestructuración fiscal y administrativa.",
    "Cumplimiento normativo y gobierno corporativo.",
    "Consultoría para personas físicas, morales, profesionistas y grupos empresariales.",
    "Desbloqueo de cuentas UIF.",
  ]},
];

const AREA_LABEL: Record<string, string> = Object.fromEntries(AREAS.map((a) => [a.key, a.label]));

const STORE_LINKS = {
  ios: "https://apps.apple.com/mx/app/yaakob/id6758861392",
  android: "https://play.google.com/store/apps/details?id=com.fernandotrejo.consultora&hl=es_MX",
};

type Orden = "Por área" | "Grid" | "Acordeón";

// ─── Iconos tiendas ────────────────────────────────────────────────
const AppleGlyph = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
);
const PlayGlyph = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 010 1.38l-2.302 2.302L15.092 12l2.606-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/></svg>
);

// ─── Topbar ────────────────────────────────────────────────────────
function Topbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={"topbar" + (scrolled ? " scrolled" : "")}>
      <a className="brand" href="/" style={{ textDecoration: "none", color: "inherit" }}>
        <img src="/logo.png" alt="YAAKOB" />
        <span className="wm">YAAKOB</span>
        <span className="tg">PROTECCIÓN FISCAL</span>
      </a>
      <a className="nav-cta" href={STORE_LINKS.ios} target="_blank" rel="noopener noreferrer">Descargar la app</a>
    </header>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="hero">
      <span className="kicker">Servicios Especializados</span>
      <h1>
        <span className="ln" data-ghost="MATERIA FISCAL">MATERIA FISCAL</span>
        <span className="ln" data-ghost="Y CUMPLIMIENTO">Y CUMPLIMIENTO</span>
      </h1>
      <p className="lede">
        Atención integral en materia <b>fiscal, tributaria y de cumplimiento</b> para personas
        físicas, morales, profesionistas y grupos empresariales. Donde otros ven un problema con
        el SAT, nosotros construimos una estrategia.
      </p>
      <p className="hebrew">אֱלֹהִים יְחָנֵּנוּ וִיבָרְכֵנוּ</p>
      <div className="actions">
        <a className="btn btn--solid" href="#servicios">Ver servicios</a>
        <a className="btn" href={STORE_LINKS.ios} target="_blank" rel="noopener noreferrer">Descargar la app</a>
      </div>
      <div className="meta-row">
        <span>◇ 13 áreas de servicio</span>
        <span>◇ Presencial y remoto</span>
        <span>◇ Cobertura nacional</span>
      </div>
    </section>
  );
}

// ─── Iconos de servicio (línea, monocromo) ─────────────────────────
const I = {
  fill: "none", stroke: "currentColor", strokeWidth: 1.5,
  strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
};
const ICONS: Record<string, React.ReactNode> = {
  // 01 Cumplimiento — documento con check
  "01": (<svg viewBox="0 0 24 24" {...I}><path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5"/><path d="m8.5 14 2 2 3.5-4"/></svg>),
  // 02 CFDI — comprobante / recibo
  "02": (<svg viewBox="0 0 24 24" {...I}><path d="M6 3v18l2-1.2L10 21l2-1.2L14 21l2-1.2L18 21V3l-2 1.2L14 3l-2 1.2L10 3 8 4.2z"/><path d="M9 8h6"/><path d="M9 11.5h6"/><path d="M9 15h4"/></svg>),
  // 03 Firma / Certificados — escudo con cerradura
  "03": (<svg viewBox="0 0 24 24" {...I}><path d="M12 3 5 6v5c0 4.2 3 7.4 7 8.4 4-1 7-4.2 7-8.4V6z"/><circle cx="12" cy="10.5" r="1.6"/><path d="M12 12.1V14.5"/></svg>),
  // 04 Opiniones y Constancias — sello con listón
  "04": (<svg viewBox="0 0 24 24" {...I}><circle cx="12" cy="9.5" r="5.5"/><path d="m9 13.5-1.5 6 4.5-2.2 4.5 2.2L15 13.5"/><path d="m9.7 9.4 1.6 1.6 3-3.2"/></svg>),
  // 05 RFC — credencial / ID
  "05": (<svg viewBox="0 0 24 24" {...I}><rect x="3" y="5" width="18" height="14" rx="1.6"/><circle cx="8.5" cy="11" r="2.2"/><path d="M5 16.2a3.6 3.6 0 0 1 7 0"/><path d="M15 10h4"/><path d="M15 13.5h4"/></svg>),
  // 06 Auditorías — lupa sobre documento
  "06": (<svg viewBox="0 0 24 24" {...I}><circle cx="10.5" cy="10.5" r="6.2"/><path d="m20.5 20.5-4.4-4.4"/><path d="M8 10.5h5"/><path d="M10.5 8v5"/></svg>),
  // 07 Créditos y Multas — balanza
  "07": (<svg viewBox="0 0 24 24" {...I}><path d="M12 3v18"/><path d="M8 21h8"/><path d="M4.5 7h15"/><path d="M7 4.5 4.5 7"/><path d="M4.5 7 2 12h5z"/><path d="M19.5 7 17 12h5z"/></svg>),
  // 08 Sello Digital / Restricciones — candado
  "08": (<svg viewBox="0 0 24 24" {...I}><rect x="5" y="11" width="14" height="9.5" rx="1.6"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/><path d="M12 15v2.2"/></svg>),
  // 09 EFOS/EDOS / Vigilancia — ojo / radar
  "09": (<svg viewBox="0 0 24 24" {...I}><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="2.6"/></svg>),
  // 10 Domicilio Fiscal — pin de mapa
  "10": (<svg viewBox="0 0 24 24" {...I}><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>),
  // 11 Corporativo — edificio
  "11": (<svg viewBox="0 0 24 24" {...I}><rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/><path d="M10 21v-3h4v3"/></svg>),
  // 12 Representación — usuario con check
  "12": (<svg viewBox="0 0 24 24" {...I}><circle cx="9" cy="8" r="3.3"/><path d="M3.4 20a5.7 5.7 0 0 1 11.2 0"/><path d="m15.5 12.8 2 2 3.3-3.6"/></svg>),
  // 13 Consultoría Estratégica — tendencia al alza
  "13": (<svg viewBox="0 0 24 24" {...I}><path d="M4 19h16"/><path d="m5 15 4-4 3 3 6-7"/><path d="M18 7h3v3"/></svg>),
};

function ServiceCard({ s, showArea }: { s: Service; showArea?: boolean }) {
  return (
    <article className="card">
      <span className="card-ghost" aria-hidden>{ICONS[s.n]}</span>
      <div className="card-h">
        <span className="card-ic"><i>{ICONS[s.n]}</i></span>
        <span className="card-n">{s.n}</span>
        {showArea && <span className="area-tag">{AREA_LABEL[s.area]}</span>}
        <span className="card-rule" />
      </div>
      <h3>{s.title}</h3>
      <p className="lead">{s.lead}</p>
      <ul>{s.items.map((it, i) => <li key={i}>{it}</li>)}</ul>
    </article>
  );
}

function ByArea() {
  return (
    <div>
      {AREAS.map((a, ai) => {
        const list = SERVICES.filter((s) => s.area === a.key);
        return (
          <div className="area-band reveal" key={a.key}>
            <div className="ab-head">
              <span className="ab-n">{String(ai + 1).padStart(2, "0")}</span>
              <div className="ab-txt">
                <h3>{a.label}</h3>
                <p>{a.desc}</p>
              </div>
            </div>
            <div className="grid">{list.map((s) => <ServiceCard key={s.n} s={s} />)}</div>
          </div>
        );
      })}
    </div>
  );
}

function GridMode() {
  const [filter, setFilter] = useState("todos");
  const list = filter === "todos" ? SERVICES : SERVICES.filter((s) => s.area === filter);
  return (
    <div>
      <div className="filters">
        <button className={"chip" + (filter === "todos" ? " on" : "")} onClick={() => setFilter("todos")}>Todos</button>
        {AREAS.map((a) => (
          <button key={a.key} className={"chip" + (filter === a.key ? " on" : "")} onClick={() => setFilter(a.key)}>{a.label}</button>
        ))}
      </div>
      <div className="grid">{list.map((s) => <ServiceCard key={s.n} s={s} showArea />)}</div>
    </div>
  );
}

function Accordion() {
  const [open, setOpen] = useState<string | null>(SERVICES[0].n);
  return (
    <div className="acc">
      {SERVICES.map((s) => {
        const isOpen = open === s.n;
        return (
          <div className={"acc-item" + (isOpen ? " open" : "")} key={s.n}>
            <button className="acc-row" onClick={() => setOpen(isOpen ? null : s.n)}>
              <span className="a-n">{s.n}</span>
              <span className="a-t">{s.title}<small>{s.lead}</small></span>
              <span className="a-plus" />
            </button>
            <div className="acc-panel" style={{ maxHeight: isOpen ? "640px" : "0" }}>
              <div className="acc-panel-inner">
                <ul>{s.items.map((it, i) => <li key={i}>{it}</li>)}</ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Services({ orden }: { orden: Orden }) {
  return (
    <section className="section" id="servicios">
      <div className="section-head">
        <div><h2>Áreas de Servicio</h2></div>
        <span className="idx">13 ÁREAS · CUMPLIMIENTO / DEFENSA / ESTRATEGIA</span>
      </div>
      {orden === "Grid" && <GridMode />}
      {orden === "Acordeón" && <Accordion />}
      {orden === "Por área" && <ByArea />}
    </section>
  );
}

function CTA() {
  return (
    <section className="cta reveal">
      <div className="be">BE FREE<span className="ghost">BE FREE</span></div>
      <p className="sub">Lleva el control de tu situación fiscal en el bolsillo.</p>
      <p className="hebrew">בְּכָל גּוֹיִם יְשׁוּעָתֶךָ</p>
      <div className="stores">
        <a className="store-btn" href={STORE_LINKS.ios} target="_blank" rel="noopener noreferrer">
          <AppleGlyph />
          <span className="st"><small>Descárgala en</small><span>App Store</span></span>
        </a>
        <a className="store-btn" href={STORE_LINKS.android} target="_blank" rel="noopener noreferrer">
          <PlayGlyph />
          <span className="st"><small>Disponible en</small><span>Google Play</span></span>
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="foot-top">
        <div className="foot-brand">
          <img src="/logo.png" alt="YAAKOB" />
          <span className="wm">YAAKOB</span>
        </div>
        <div className="foot-cov">
          <div className="c-k">Cobertura</div>
          <div className="c-v">Servicios <b>presenciales y remotos</b> a nivel nacional.<br />Protección fiscal para personas físicas, morales y grupos empresariales.</div>
        </div>
      </div>
      <div className="foot-bottom">
        <span>© 2026 YAAKOB · Protección Fiscal</span>
        <span className="heb">יוֹדוּךָ עַמִּים אֱלֹהִים</span>
      </div>
    </footer>
  );
}

function useReveal(dep: unknown) {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.in)");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}


// ─── Página ────────────────────────────────────────────────────────
const MONO_RGB: [number, number, number] = [226, 226, 226];

export default function ServiciosPage() {
  useReveal("Por área");
  return (
    <div className="exp" data-glitch="on">
      <ParticlesGL density={0.95} accent={MONO_RGB} mono />
      <div className="bg-vignette" />
      <div className="bg-grain" />

      <div className="frame-corner fc-tl" />
      <div className="frame-corner fc-tr" />
      <div className="frame-corner fc-bl" />
      <div className="frame-corner fc-br" />

      <div className="stage">
        <Topbar />
        <Hero />
        <Services orden="Por área" />
        <CTA />
        <Footer />
      </div>
    </div>
  );
}
