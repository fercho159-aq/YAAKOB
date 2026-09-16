"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  NIVELES,
  finDelPrimerPeriodo,
  formatearPrecio,
  planDe,
  type Nivel,
  type Periodicidad,
} from "@pagos/planes";

/**
 * Resumen previo a la contratación —— el «checkout» de la presentación del
 * cliente, sin campos de tarjeta falsos: aquí se elige la periodicidad y se ve
 * el desglose (base, IVA, total, siguiente cargo); el botón lleva al
 * formulario real de Openpay en /suscripcion?plan=<id>.
 */

const STORES = [
  {
    href: "https://apps.apple.com/mx/app/yaakob/id6758861392",
    icon: "/planes/app-store-color.webp",
    kicker: "iPhone y iPad",
    name: "App Store",
  },
  {
    href: "https://play.google.com/store/apps/details?id=com.fernandotrejo.consultora&hl=es_MX",
    icon: "/planes/google-play-color.webp",
    kicker: "Android",
    name: "Google Play",
  },
];

function fechaLarga(fecha: Date) {
  return fecha.toLocaleDateString("es-MX", { day: "2-digit", month: "long", year: "numeric" });
}

export function CheckoutModal({
  nivel,
  onClose,
}: {
  nivel: Nivel | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  // La presentación abre en anual por omisión; el usuario puede cambiar.
  const [periodicidad, setPeriodicidad] = useState<Periodicidad>("anual");

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (nivel && !dialog.open) {
      dialog.showModal();
      document.documentElement.classList.add("pl-modal-open");
    } else if (!nivel && dialog.open) {
      dialog.close();
    }
  }, [nivel]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const onCloseEvent = () => {
      document.documentElement.classList.remove("pl-modal-open");
      // La siguiente apertura vuelve a anual, como la presentación.
      setPeriodicidad("anual");
      onClose();
    };
    dialog.addEventListener("close", onCloseEvent);
    return () => dialog.removeEventListener("close", onCloseEvent);
  }, [onClose]);

  const base = nivel ? NIVELES.find((n) => n.nivel === nivel) : undefined;
  const plan = nivel ? planDe(nivel, periodicidad) : undefined;
  const mensual = nivel ? planDe(nivel, "mensual") : undefined;
  const anual = plan?.periodicidad === "anual";

  return (
    <dialog
      ref={ref}
      className="pl-checkout"
      aria-labelledby="pl-checkout-title"
      onClick={(e) => {
        // Clic en el fondo (fuera de la caja) cierra.
        const box = ref.current?.getBoundingClientRect();
        if (!box) return;
        const fuera =
          e.clientX < box.left || e.clientX > box.right || e.clientY < box.top || e.clientY > box.bottom;
        if (e.target === ref.current && fuera) ref.current?.close();
      }}
    >
      {plan && base && mensual && (
        <>
          <button
            type="button"
            className="pl-checkout__close"
            aria-label="Cerrar resumen de compra"
            onClick={() => ref.current?.close()}
          >
            ×
          </button>

          <div className="pl-checkout__heading">
            <span className="pl-kicker">YAAKOB · Su suscripción</span>
            <h2 id="pl-checkout-title">Un paso más hacia su tranquilidad.</h2>
            <p>Revise su plan antes de continuar.</p>
          </div>

          <div className="pl-checkout__layout">
            <div className="pl-checkout__overview">
              <div className="pl-checkout__summary">
                <div className="pl-checkout__plan">
                  <div>
                    <span className="pl-checkout__label">Plan seleccionado</span>
                    <h3>{base.nombre}</h3>
                    <p>{base.audiencia} · {base.usuarios} {base.usuarios === 1 ? "usuario" : "usuarios"}</p>
                  </div>
                  <span className="pl-checkout__period">{anual ? "Anual" : "Mensual"}</span>
                </div>

                <fieldset className="pl-billing">
                  <legend>Elija su periodicidad</legend>
                  <label>
                    <input
                      type="radio"
                      name="pl-billing"
                      value="mensual"
                      checked={!anual}
                      onChange={() => setPeriodicidad("mensual")}
                    />
                    Mensual
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="pl-billing"
                      value="anual"
                      checked={anual}
                      onChange={() => setPeriodicidad("anual")}
                    />
                    Anual
                  </label>
                </fieldset>

                <div className="pl-checkout__price">
                  <strong>{formatearPrecio(mensual.precioBase)}</strong>
                  <span> MXN / mes antes de IVA</span>
                </div>
                <p className="pl-checkout__billing">
                  {anual ? "Referencia mensual · Facturación anual" : "Facturación mensual"}
                </p>

                <dl className="pl-checkout__totals">
                  <div>
                    <dt>{anual ? "Importe anual antes de IVA" : "Importe mensual antes de IVA"}</dt>
                    <dd>{formatearPrecio(plan.precioBase)}</dd>
                  </div>
                  <div>
                    <dt>IVA (16 %)</dt>
                    <dd>{formatearPrecio(plan.iva)}</dd>
                  </div>
                  <div className="pl-checkout__total">
                    <dt>Total a pagar hoy</dt>
                    <dd>{formatearPrecio(plan.precio)} MXN</dd>
                  </div>
                  <div>
                    <dt>Siguiente cargo</dt>
                    <dd>{fechaLarga(finDelPrimerPeriodo(plan))}</dd>
                  </div>
                </dl>
                <p className="pl-checkout__tax">
                  {anual ? "Pago anual · una exhibición" : "Pago mensual"} · Renueva {plan.cadencia} al precio de
                  lista hasta que usted la cancele.
                </p>
              </div>

              <p className="pl-checkout__guarantee">
                La garantía de devolución de dinero de 30 días se aplica solo para planes anuales.
              </p>
            </div>

            <section className="pl-checkout__card" aria-labelledby="pl-card-title">
              <span className="pl-kicker">Forma de pago</span>
              <h3 id="pl-card-title">Tarjeta de crédito o débito</h3>
              <div className="pl-brands" aria-label="Tarjetas aceptadas">
                <img src="/pagos/visa.png" alt="Visa" />
                <img src="/pagos/mastercard.png" alt="Mastercard" />
                <img src="/pagos/amex.png" alt="American Express" />
                <img src="/pagos/openpay.png" alt="Openpay" />
              </div>
              <p className="pl-checkout__note">
                El cobro se procesa con Openpay. Los datos de su tarjeta se capturan en la siguiente
                pantalla y nunca pasan por nuestros servidores.
              </p>

              <Link className="pl-btn pl-btn--primary" href={`/suscripcion?plan=${plan.id}`}>
                Pagar con tarjeta <span aria-hidden="true">↗</span>
              </Link>
              <button type="button" className="pl-btn pl-btn--ghost" onClick={() => ref.current?.close()}>
                Volver a los planes
              </button>

              <div className="pl-stores" aria-label="Descargar YAAKOB">
                {STORES.map((store) => (
                  <a
                    key={store.name}
                    className="pl-store"
                    href={store.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Descargar YAAKOB en ${store.name}`}
                  >
                    <img src={store.icon} alt="" width="42" height="42" />
                    <span>
                      <small>{store.kicker}</small>
                      <strong>{store.name}</strong>
                      <em>Descargar aplicación</em>
                    </span>
                    <span className="pl-store__arrow" aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </section>
          </div>
        </>
      )}
    </dialog>
  );
}
