module.exports = [
"[project]/app/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootLayout,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
;
const metadata = {
    title: "Yaakob - XIX - XXIII | Protección y Defensa Fiscal en México",
    description: "Yaakob Consultores S.C.: despacho especializado en protección y defensa fiscal. Diagnóstico fiscal, auditorías del SAT, créditos fiscales, multas, sellos digitales, defensa 69-B, UIF-FGR, controles volumétricos y regularización fiscal. Asesoría con L.C. Juan José de Anda González en CDMX.",
    keywords: "Yaakob Consultores, defensa fiscal, diagnóstico fiscal, auditorías SAT, créditos fiscales, multas fiscales, sellos digitales, defensa 69-B, UIF FGR, controles volumétricos, regularización fiscal, requerimientos SAT, abogado fiscalista CDMX",
    authors: [
        {
            name: "Yaakob Consultores S.C.",
            url: "https://yaakob.com"
        }
    ],
    robots: "index, follow",
    icons: {
        icon: "/logo.png",
        apple: "/logo.png"
    },
    metadataBase: new URL("https://yaakob.com"),
    alternates: {
        canonical: "https://yaakob.com"
    },
    category: "legal services",
    openGraph: {
        type: "website",
        url: "https://yaakob.com/",
        title: "Yaakob - XIX - XXIII | Protección y Defensa Fiscal en México",
        description: "Despacho especializado en defensa fiscal: diagnóstico, auditorías del SAT, créditos fiscales, multas, sellos digitales, defensa 69-B y UIF-FGR.",
        images: "/logo.png",
        siteName: "Yaakob Consultores S.C.",
        locale: "es_MX"
    },
    twitter: {
        card: "summary_large_image",
        title: "Yaakob - XIX - XXIII | Protección y Defensa Fiscal en México",
        description: "Despacho especializado en defensa fiscal ante el SAT. Diagnóstico, auditorías, créditos fiscales, multas y más.",
        images: "/logo.png"
    },
    other: {
        "theme-color": "#0a0a0a",
        "msapplication-TileColor": "#0a0a0a"
    }
};
// JSON-LD Structured Data for Google
const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "LegalService",
            "@id": "https://yaakob.com/#organization",
            name: "Yaakob Consultores S.C.",
            alternateName: "Yaakob - XIX - XXIII",
            url: "https://yaakob.com",
            logo: "https://yaakob.com/logo.png",
            image: "https://yaakob.com/logo.png",
            description: "Despacho especializado en protección y defensa fiscal ante el SAT, la UIF y la FGR. Diagnóstico fiscal, auditorías, créditos fiscales, multas, sellos digitales, defensa 69-B, controles volumétricos y regularización fiscal.",
            areaServed: "MX",
            telephone: "+52 55 9008 6360",
            email: "contacto@yaakob.com",
            address: {
                "@type": "PostalAddress",
                streetAddress: "Alica 40, Lomas de Chapultepec",
                addressLocality: "Miguel Hidalgo, CDMX",
                postalCode: "11000",
                addressCountry: "MX"
            },
            openingHours: "Mo-Fr 09:00-18:00",
            founder: {
                "@type": "Person",
                name: "L.C. Juan José de Anda González"
            },
            sameAs: [
                "https://www.instagram.com/yaakobeheart/",
                "https://www.facebook.com/profile.php?id=61587552527813",
                "https://www.tiktok.com/@yaakob_heart",
                "https://www.youtube.com/@YaakobBeHeart",
                "https://x.com/yaakob"
            ],
            hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Servicios de defensa fiscal",
                itemListElement: [
                    "Diagnóstico Fiscal",
                    "Presuntiva Fiscal",
                    "Requerimientos SAT",
                    "Auditorías",
                    "Multas Fiscales",
                    "Créditos Fiscales",
                    "Sellos Digitales",
                    "Defensa 69-B",
                    "UIF - FGR",
                    "Controles Volumétricos",
                    "Regularización Fiscal"
                ].map((name)=>({
                        "@type": "Offer",
                        itemOffered: {
                            "@type": "Service",
                            name
                        }
                    }))
            }
        },
        {
            "@type": "WebSite",
            "@id": "https://yaakob.com/#website",
            url: "https://yaakob.com",
            name: "Yaakob - XIX - XXIII",
            description: "Sitio web oficial de Yaakob Consultores S.C. - Protección y defensa fiscal",
            publisher: {
                "@id": "https://yaakob.com/#organization"
            },
            inLanguage: "es-MX"
        },
        {
            "@type": "WebPage",
            "@id": "https://yaakob.com/#webpage",
            url: "https://yaakob.com",
            name: "Yaakob - XIX - XXIII | Protección y Defensa Fiscal en México",
            isPartOf: {
                "@id": "https://yaakob.com/#website"
            },
            about: {
                "@id": "https://yaakob.com/#organization"
            },
            description: "Página oficial de Yaakob Consultores S.C. Despacho de protección y defensa fiscal ante el SAT, la UIF y la FGR, con asesoría de L.C. Juan José de Anda González.",
            inLanguage: "es-MX"
        }
    ]
};
function RootLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: "es",
        suppressHydrationWarning: true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("head", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
                    type: "application/ld+json",
                    dangerouslySetInnerHTML: {
                        __html: JSON.stringify(jsonLd)
                    }
                }, void 0, false, {
                    fileName: "[project]/app/layout.tsx",
                    lineNumber: 128,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/layout.tsx",
                lineNumber: 127,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
                children: children
            }, void 0, false, {
                fileName: "[project]/app/layout.tsx",
                lineNumber: 133,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/layout.tsx",
        lineNumber: 126,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-rsc] (ecmascript)").vendored['react-rsc'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
];

//# sourceMappingURL=_8c848469._.js.map