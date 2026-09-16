import type { Metadata } from "next";
import { PlanesLanding } from "./PlanesLanding";

/**
 * /planes — landing de venta de los paquetes de la app (quinta entrega del
 * cliente, «YAAKOB-Codigo-Final»), adaptada al sitio: hero, mensaje de
 * confianza, tres planes, beneficios y pie. El catálogo y los importes viven
 * en pagos-lib/planes.ts; el cobro real sigue en /suscripcion con Openpay.
 *
 * Punto 4 de la validación técnica: los precios tienen que ser públicos y
 * consultables ANTES de contratar, con IVA, periodicidad y condiciones de
 * renovación. Esta página los muestra desde el catálogo, sin copias a mano.
 */

const TITLE = "Planes y precios | YAAKOB";
const DESCRIPTION =
  "Suscripciones Esencial, Avanzado y Único de la app YAAKOB: precios mensuales y anuales, IVA, usuarios incluidos y funciones de inteligencia fiscal.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://yaakob.com/planes" },
  openGraph: {
    type: "website",
    url: "https://yaakob.com/planes",
    title: TITLE,
    description: DESCRIPTION,
    images: "/logo.png",
    siteName: "Yaakob Consultores S.C.",
    locale: "es_MX",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: "/logo.png",
  },
};

export default function PlanesPage() {
  return <PlanesLanding />;
}
