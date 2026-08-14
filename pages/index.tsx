import { HebrewSplash, Hud, Stage } from '@home/components'
import Head from 'next/head'
import Script from 'next/script'
import { useEffect } from 'react'

// JSON-LD Structured Data for Google (same graph the old app.html/layout shipped)
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LegalService',
      '@id': 'https://yaakob.com/#organization',
      name: 'Yaakob Consultores S.C.',
      alternateName: 'Yaakob - XIX - XXIII',
      url: 'https://yaakob.com',
      logo: 'https://yaakob.com/logo.png',
      image: 'https://yaakob.com/logo.png',
      description:
        'Despacho especializado en protección y defensa fiscal ante el SAT, la UIF y la FGR. Diagnóstico fiscal, auditorías, créditos fiscales, multas, sellos digitales, defensa 69-B, controles volumétricos y regularización fiscal.',
      areaServed: 'MX',
      telephone: '+52 55 9008 6360',
      email: 'contacto@yaakob.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Alica 40, Lomas de Chapultepec',
        addressLocality: 'Miguel Hidalgo, CDMX',
        postalCode: '11000',
        addressCountry: 'MX',
      },
      openingHours: 'Mo-Fr 09:00-18:00',
      founder: { '@type': 'Person', name: 'L.C. Juan José de Anda González' },
      sameAs: [
        'https://www.instagram.com/yaakobeheart/',
        'https://www.facebook.com/profile.php?id=61587552527813',
        'https://www.tiktok.com/@yaakob_heart',
        'https://www.youtube.com/@YaakobBeHeart',
        'https://x.com/yaakob',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Servicios de defensa fiscal',
        itemListElement: [
          'Diagnóstico Fiscal',
          'Presuntiva Fiscal',
          'Requerimientos SAT',
          'Auditorías',
          'Multas Fiscales',
          'Créditos Fiscales',
          'Sellos Digitales',
          'Defensa 69-B',
          'UIF - FGR',
          'Controles Volumétricos',
          'Regularización Fiscal',
        ].map((name) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name },
        })),
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://yaakob.com/#website',
      url: 'https://yaakob.com',
      name: 'Yaakob - XIX - XXIII',
      description: 'Sitio web oficial de Yaakob Consultores S.C. - Protección y defensa fiscal',
      publisher: { '@id': 'https://yaakob.com/#organization' },
      inLanguage: 'es-MX',
    },
    {
      '@type': 'WebPage',
      '@id': 'https://yaakob.com/#webpage',
      url: 'https://yaakob.com',
      name: 'Yaakob - XIX - XXIII | Protección y Defensa Fiscal en México',
      isPartOf: { '@id': 'https://yaakob.com/#website' },
      about: { '@id': 'https://yaakob.com/#organization' },
      description:
        'Página oficial de Yaakob Consultores S.C. Despacho de protección y defensa fiscal ante el SAT, la UIF y la FGR, con asesoría de L.C. Juan José de Anda González.',
      inLanguage: 'es-MX',
    },
  ],
}

// OneTrust callback, verbatim from the old app.html: translates the cookie
// banner to Spanish once it mounts.
const optanonWrapper = `
function OptanonWrapper() {
    (function translateBanner() {
        var banner = document.getElementById('onetrust-banner-sdk');
        if (!banner) { setTimeout(translateBanner, 200); return; }
        var policy = banner.querySelector('#onetrust-policy-text');
        if (policy) policy.innerHTML = 'Este sitio web utiliza cookies para mejorar la experiencia del usuario y analizar el rendimiento y tráfico en nuestro sitio. También compartimos información sobre el uso de nuestro sitio con nuestros socios de redes sociales, publicidad y análisis.';
        var acceptBtn = banner.querySelector('#onetrust-accept-btn-handler');
        if (acceptBtn) acceptBtn.textContent = 'ACEPTAR COOKIES';
        var settingsLink = banner.querySelector('#onetrust-pc-btn-handler');
        if (settingsLink) settingsLink.textContent = 'No vender ni compartir mi información personal';
    })();

    if (window.self == window.top) {
        for (i = 0; i < window.frames.length; i++) {
            window.frames[i].postMessage('cookieGroupsUpdated', '*');
        }
    } else {
        document.getElementById("onetrust-consent-sdk").style.display = "none";
        window.addEventListener('message', function(event) {
            if (~event.origin.match(/airforceaircade\\.com/) && event.data == 'cookieGroupsUpdated') {
                location.reload();
            } else {
                return;
            }
        });
    }
}
`

const gtmSnippet = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T52XDQ9');`

const gtagSnippet = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'DC-4136874');
`

/**
 * Scopes the engine reset in home-lib/home.css to this page: the class lives
 * on <html> only while the home is mounted, so /servicios never sees it.
 */
function useHomeBodyClass() {
  useEffect(() => {
    document.documentElement.classList.add('yk-home')
    return () => document.documentElement.classList.remove('yk-home')
  }, [])
}

export default function Home() {
  useHomeBodyClass()

  return (
    <>
      <Head>
        <title>Yaakob - XIX - XXIII | Protección y Defensa Fiscal en México</title>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="google" content="notranslate" />
        <meta
          name="description"
          content="Yaakob Consultores S.C.: despacho especializado en protección y defensa fiscal. Diagnóstico fiscal, auditorías del SAT, créditos fiscales, multas, sellos digitales, defensa 69-B y UIF-FGR. Asesoría con L.C. Juan José de Anda González."
        />
        <meta
          name="keywords"
          content="Yaakob Consultores, defensa fiscal, diagnóstico fiscal, auditorías SAT, créditos fiscales, multas fiscales, sellos digitales, defensa 69-B, UIF FGR, controles volumétricos, regularización fiscal, requerimientos SAT, abogado fiscalista CDMX"
        />
        <meta name="theme-color" content="#0a0a0a" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yaakob.com/" />
        <meta property="og:title" content="Yaakob - XIX - XXIII | Protección y Defensa Fiscal en México" />
        <meta
          property="og:description"
          content="Despacho especializado en defensa fiscal: diagnóstico, auditorías del SAT, créditos fiscales, multas, sellos digitales, defensa 69-B y UIF-FGR."
        />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:site_name" content="Yaakob Consultores S.C." />
        <meta property="og:locale" content="es_MX" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://yaakob.com/" />
        <meta property="twitter:title" content="Yaakob - XIX - XXIII | Protección y Defensa Fiscal en México" />
        <meta
          property="twitter:description"
          content="Despacho especializado en defensa fiscal ante el SAT. Diagnóstico, auditorías, créditos fiscales, multas y más."
        />
        <meta property="twitter:image" content="/logo.png" />
        <link rel="icon" type="image/png" href="/favicon-home.png" />
        <link rel="apple-touch-icon" href="/favicon-home.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      {/* OneTrust Cookies Consent Notice start */}
      <Script id="optanon-wrapper" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: optanonWrapper }} />
      <Script
        id="onetrust-stub"
        src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
        data-domain-script="ff0445a9-1ea6-4168-89fb-12471f269c18"
        charSet="UTF-8"
        strategy="afterInteractive"
      />
      {/* OneTrust Cookies Consent Notice end */}
      {/* Google Tag Manager */}
      <Script id="gtm" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: gtmSnippet }} />
      <Script id="gtag" src="https://www.googletagmanager.com/gtag/js?id=DC-4136874" strategy="afterInteractive" />
      <Script id="gtag-config" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: gtagSnippet }} />

      {/* WebGL scene (react-three-fiber; see home-lib/scene) */}
      <Stage />
      <HebrewSplash />
      <Hud />

      {/* OneTrust Cookies Settings button */}
      <button id="ot-sdk-btn" className="ot-sdk-show-settings">
        Cookie Settings
      </button>
    </>
  )
}
