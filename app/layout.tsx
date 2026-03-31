import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YAAKOB | Be Free - Bienestar, Desarrollo Personal y Crecimiento Espiritual",
  description:
    "YAAKOB es una aplicación móvil legítima de bienestar y desarrollo personal disponible en App Store y Google Play. Ofrece herramientas de meditación, reflexión espiritual y crecimiento personal basadas en valores bíblicos. No vendemos productos físicos. Descarga gratuita.",
  keywords:
    "YAAKOB, bienestar, desarrollo personal, meditación, crecimiento espiritual, app móvil, aplicación gratuita, reflexión bíblica, salmos, prosperidad espiritual",
  authors: [{ name: "YAAKOB", url: "https://yaakob.com" }],
  robots: "index, follow",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  metadataBase: new URL("https://yaakob.com"),
  alternates: {
    canonical: "https://yaakob.com",
  },
  category: "lifestyle",
  openGraph: {
    type: "website",
    url: "https://yaakob.com/",
    title: "YAAKOB | Be Free - Bienestar y Desarrollo Personal",
    description:
      "Aplicación móvil gratuita de bienestar y desarrollo personal. Meditación, reflexión espiritual y crecimiento personal. Disponible en App Store y Google Play.",
    images: "/logo.png",
    siteName: "YAAKOB",
    locale: "es_MX",
  },
  twitter: {
    card: "summary_large_image",
    title: "YAAKOB | Be Free - Bienestar y Desarrollo Personal",
    description:
      "Aplicación móvil gratuita de bienestar y desarrollo personal. Disponible en App Store y Google Play.",
    images: "/logo.png",
  },
  other: {
    "theme-color": "#0a0a0a",
    "msapplication-TileColor": "#0a0a0a",
  },
};

// JSON-LD Structured Data for Google
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://yaakob.com/#organization",
      name: "YAAKOB",
      url: "https://yaakob.com",
      logo: "https://yaakob.com/logo.png",
      description:
        "YAAKOB es un proyecto de desarrollo personal y bienestar espiritual. Ofrecemos una aplicación móvil gratuita con herramientas de meditación y reflexión basadas en valores bíblicos. No vendemos productos físicos ni servicios engañosos. Nuestra misión es promover el bienestar integral de las personas.",
      foundingDate: "2024",
      sameAs: [
        "https://apps.apple.com/mx/app/yaakob/id6758861392",
        "https://play.google.com/store/apps/details?id=com.fernandotrejo.consultora&hl=es_MX",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://yaakob.com/#website",
      url: "https://yaakob.com",
      name: "YAAKOB",
      description: "Sitio web oficial de la aplicación YAAKOB - Bienestar y desarrollo personal",
      publisher: { "@id": "https://yaakob.com/#organization" },
      inLanguage: "es-MX",
    },
    {
      "@type": "MobileApplication",
      "@id": "https://yaakob.com/#app",
      name: "YAAKOB",
      operatingSystem: "iOS, Android",
      applicationCategory: "LifestyleApplication",
      description:
        "Aplicación de bienestar y desarrollo personal con herramientas de meditación, reflexión espiritual y crecimiento personal basadas en textos bíblicos como los Salmos. Aplicación gratuita, sin contenido engañoso ni productos ilegales.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "MXN",
        availability: "https://schema.org/InStock",
      },
      installUrl: [
        "https://apps.apple.com/mx/app/yaakob/id6758861392",
        "https://play.google.com/store/apps/details?id=com.fernandotrejo.consultora&hl=es_MX",
      ],
      creator: { "@id": "https://yaakob.com/#organization" },
      aggregateRating: {
        "@type": "AggregateRating",
        worstRating: 1,
        bestRating: 5,
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://yaakob.com/#webpage",
      url: "https://yaakob.com",
      name: "YAAKOB | Be Free",
      isPartOf: { "@id": "https://yaakob.com/#website" },
      about: { "@id": "https://yaakob.com/#app" },
      description:
        "Página oficial de YAAKOB. Aplicación legítima de bienestar personal disponible en las tiendas oficiales de Apple y Google. No se venden productos ilegales ni se engaña a los usuarios. Contenido basado en reflexiones bíblicas y herramientas de desarrollo personal.",
      inLanguage: "es-MX",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
