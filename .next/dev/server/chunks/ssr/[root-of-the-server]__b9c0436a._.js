module.exports = [
"[project]/home-lib/components/LegacyStage.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LegacyStage",
    ()=>LegacyStage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
function LegacyStage() {
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const w = window;
        // ---- Bundle loader (was an inline <script> in app.html) ----
        w._CACHE_ = '1759250767926';
        w._CONFIG_ = {
            ENV: 'production',
            API: '/api',
            SESSIONS: '/api/gcs/airforce-echo.appspot.com',
            CMS: '/api/gcs/airforce-echo.appspot.com/data/index.json',
            AUTH: '/api/auth/',
            PLAYER_API: '/api/player/'
        };
        let p = 'app';
        try {
            eval('let obj = {}; obj?.prop');
        } catch  {
            w._ES5_ = true;
            p = 'es5-' + p;
        }
        const s = document.createElement('script');
        s.src = `assets/js/${p}.${w._CACHE_}.js`;
        s.async = true;
        // The engine boots from window's "load" event. In app.html the script tag
        // was in <head>, so it always registered before load fired; here it is
        // injected from an effect, i.e. after load. Replay the event once the
        // bundle has parsed so its listener runs.
        s.onload = ()=>{
            if (document.readyState === 'complete') {
                window.dispatchEvent(new Event('load'));
            }
        };
        document.head.appendChild(s);
        // ---- Dissolve out of the experience, then leave for /apps ----
        w.__yaakobBegin = ()=>{
            if (w.__yaakobRedirecting) return;
            w.__yaakobRedirecting = true;
            const stage = document.getElementById('Stage');
            const canvas = document.querySelector('canvas');
            const target = stage || canvas || document.body;
            const blackout = document.getElementById('yaakob-blackout');
            // Dispersion: bright flash + blur dissolve
            target.style.animation = 'particleDissolve 1.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
            // Fade to dark underneath
            setTimeout(()=>{
                if (blackout) {
                    blackout.style.transition = 'opacity 0.8s ease';
                    blackout.style.opacity = '1';
                }
            }, 600);
            // Navigate
            setTimeout(()=>{
                window.location.href = '/apps';
            }, 1800);
        };
        // ---- Mobile preloader auto-advance ----
        // On touch devices the experience shows a canvas "_ TOCA PARA COMENZAR _"
        // gate that only advances on a touch of the canvas (the engine binds
        // touch, not mouse, on mobile). We synthesize the touch automatically and
        // retry until the home appears — same page (/), no redirect.
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        let iv;
        if (isTouch) {
            // The home mirrors its GL text into the a11y DOM. The tagline is painted
            // into the logo texture (no DOM text), so key off the logo's own a11y
            // line instead — it only exists once we're past the gate.
            const onHome = ()=>{
                const els = document.querySelectorAll('button, a, span, div');
                for(let i = 0; i < els.length; i++){
                    const el = els[i];
                    if (el.children.length === 0 && /ABUNDANCIA, PROSPERIDAD/i.test(el.textContent || '')) {
                        return true;
                    }
                }
                return false;
            };
            const tapCanvas = ()=>{
                const canvas = document.querySelector('#Stage canvas') || document.querySelector('canvas');
                if (!canvas) return;
                const r = canvas.getBoundingClientRect();
                if (!r.width || !r.height) return;
                // Tap near the top of the canvas, away from the BE FREE button, so a
                // stray late tap can never hit "COMENZAR".
                const x = r.left + r.width / 2;
                const y = r.top + r.height * 0.12;
                try {
                    const t = new Touch({
                        identifier: 1,
                        target: canvas,
                        clientX: x,
                        clientY: y,
                        pageX: x,
                        pageY: y,
                        radiusX: 10,
                        radiusY: 10,
                        force: 1
                    });
                    canvas.dispatchEvent(new TouchEvent('touchstart', {
                        bubbles: true,
                        cancelable: true,
                        composed: true,
                        touches: [
                            t
                        ],
                        targetTouches: [
                            t
                        ],
                        changedTouches: [
                            t
                        ]
                    }));
                    canvas.dispatchEvent(new TouchEvent('touchend', {
                        bubbles: true,
                        cancelable: true,
                        composed: true,
                        touches: [],
                        targetTouches: [],
                        changedTouches: [
                            t
                        ]
                    }));
                } catch  {
                    // No Touch constructor: fall back to pointer + mouse.
                    ;
                    [
                        'pointerdown',
                        'mousedown',
                        'pointerup',
                        'mouseup',
                        'click'
                    ].forEach((type)=>{
                        const Ctor = type.indexOf('pointer') === 0 && window.PointerEvent ? PointerEvent : MouseEvent;
                        try {
                            canvas.dispatchEvent(new Ctor(type, {
                                bubbles: true,
                                cancelable: true,
                                clientX: x,
                                clientY: y
                            }));
                        } catch  {
                        /* ignore */ }
                    });
                }
            };
            let tries = 0;
            iv = setInterval(()=>{
                if (onHome()) {
                    clearInterval(iv);
                    return;
                }
                tapCanvas();
                if (++tries > 50) clearInterval(iv); // ~25s ceiling, then give up
            }, 500);
        }
        return ()=>{
            if (iv) clearInterval(iv);
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        id: "yaakob-blackout"
    }, void 0, false, {
        fileName: "[project]/home-lib/components/LegacyStage.tsx",
        lineNumber: 167,
        columnNumber: 10
    }, this);
}
}),
"[project]/home-lib/components/HebrewSplash.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HebrewSplash",
    ()=>HebrewSplash
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
const FLOATS = [
    {
        glyph: 'נ',
        style: {
            top: '15%',
            left: '70%',
            animationDelay: '0s',
            animationDuration: '3s'
        }
    },
    {
        glyph: 'ח',
        style: {
            top: '25%',
            left: '72%',
            animationDelay: '0.18s',
            animationDuration: '4s'
        }
    },
    {
        glyph: 'ל',
        style: {
            top: '38%',
            left: '58%',
            animationDelay: '0.36s',
            animationDuration: '5s'
        }
    },
    {
        glyph: 'פ',
        style: {
            top: '75%',
            left: '30%',
            animationDelay: '0.54s',
            animationDuration: '3s'
        }
    },
    {
        glyph: 'כ',
        style: {
            top: '20%',
            left: '25%',
            animationDelay: '0.72s',
            animationDuration: '4s'
        }
    },
    {
        glyph: 'ע',
        style: {
            top: '60%',
            left: '78%',
            animationDelay: '0.9s',
            animationDuration: '5s'
        }
    },
    {
        glyph: 'ם',
        style: {
            top: '80%',
            left: '65%',
            animationDelay: '1.08s',
            animationDuration: '3s'
        }
    },
    {
        glyph: 'ד',
        style: {
            top: '50%',
            left: '15%',
            animationDelay: '1.26s',
            animationDuration: '4s'
        }
    },
    {
        glyph: 'ר',
        style: {
            top: '68%',
            left: '45%',
            animationDelay: '1.44s',
            animationDuration: '5s'
        }
    },
    {
        glyph: 'ב',
        style: {
            top: '12%',
            left: '48%',
            animationDelay: '1.62s',
            animationDuration: '3s'
        }
    },
    {
        glyph: 'א',
        style: {
            top: '45%',
            left: '85%',
            animationDelay: '1.8s',
            animationDuration: '4s'
        }
    },
    {
        glyph: 'י',
        style: {
            top: '85%',
            left: '18%',
            animationDelay: '1.98s',
            animationDuration: '5s'
        }
    }
];
function HebrewSplash() {
    const [shown, setShown] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [fading, setFading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [gone, setGone] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const timers = [
            setTimeout(()=>setShown(true), 100),
            setTimeout(()=>setFading(true), 4500),
            setTimeout(()=>setGone(true), 5500)
        ];
        return ()=>timers.forEach(clearTimeout);
    }, []);
    if (gone) return null;
    const show = shown ? ' show' : '';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        id: "hebrew-splash",
        className: fading ? 'fade-out' : undefined,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "hs-bg-glyph",
                children: "מ"
            }, void 0, false, {
                fileName: "[project]/home-lib/components/HebrewSplash.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: `hs-corner hs-corner--tl${show}`
            }, void 0, false, {
                fileName: "[project]/home-lib/components/HebrewSplash.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: `hs-corner hs-corner--tr${show}`
            }, void 0, false, {
                fileName: "[project]/home-lib/components/HebrewSplash.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: `hs-corner hs-corner--bl${show}`
            }, void 0, false, {
                fileName: "[project]/home-lib/components/HebrewSplash.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: `hs-corner hs-corner--br${show}`
            }, void 0, false, {
                fileName: "[project]/home-lib/components/HebrewSplash.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            FLOATS.map((f, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                    className: `hs-float${show}`,
                    style: f.style,
                    children: f.glyph
                }, i, false, {
                    fileName: "[project]/home-lib/components/HebrewSplash.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: `hs-center${show}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "hs-status",
                        children: "מאתחל _"
                    }, void 0, false, {
                        fileName: "[project]/home-lib/components/HebrewSplash.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "hs-status",
                        children: "_ מערכת"
                    }, void 0, false, {
                        fileName: "[project]/home-lib/components/HebrewSplash.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/home-lib/components/HebrewSplash.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: `hs-psalm${show}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        children: "אֱלֹהִים יְחָנֵּנוּ וִיבָרְכֵנוּ יָאֵר פָּנָיו אִתָּנוּ סֶלָה"
                    }, void 0, false, {
                        fileName: "[project]/home-lib/components/HebrewSplash.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        children: "לָדַעַת בָּאָרֶץ דַּרְכֶּךָ בְּכָל גּוֹיִם יְשׁוּעָתֶךָ"
                    }, void 0, false, {
                        fileName: "[project]/home-lib/components/HebrewSplash.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        children: "יוֹדוּךָ עַמִּים אֱלֹהִים יוֹדוּךָ עַמִּים כֻּלָּם"
                    }, void 0, false, {
                        fileName: "[project]/home-lib/components/HebrewSplash.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/home-lib/components/HebrewSplash.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/home-lib/components/HebrewSplash.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
}),
"[project]/home-lib/data/content.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"menu":[{"name":"Servicios","url":"/servicios"},{"name":"Contacto","url":"https://wa.me/5215527416178","modal":true}],"login":{"name":"Consultor","url":"/start"},"social":[{"name":"Instagram","url":"https://www.instagram.com/yaakobeheart/","icon":"<path d=\"M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.8.07-1.1.05-1.7.24-2.1.4-.5.2-.9.44-1.3.83-.4.4-.63.8-.83 1.3-.16.4-.35 1-.4 2.1C2.5 8.5 2.5 8.9 2.5 12s0 3.5.07 4.8c.05 1.1.24 1.7.4 2.1.2.5.44.9.83 1.3.4.4.8.63 1.3.83.4.16 1 .35 2.1.4 1.3.07 1.7.07 4.8.07s3.5 0 4.8-.07c1.1-.05 1.7-.24 2.1-.4.5-.2.9-.44 1.3-.83.4-.4.63-.8.83-1.3.16-.4.35-1 .4-2.1.07-1.3.07-1.7.07-4.8s0-3.5-.07-4.8c-.05-1.1-.24-1.7-.4-2.1a3.5 3.5 0 0 0-.83-1.3 3.5 3.5 0 0 0-1.3-.83c-.4-.16-1-.35-2.1-.4C15.5 4 15.1 4 12 4Zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8Zm0 1.8a3.1 3.1 0 1 0 0 6.2 3.1 3.1 0 0 0 0-6.2Zm5.1-2.1a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z\"/>"},{"name":"Facebook","url":"https://www.facebook.com/profile.php?id=61587552527813&locale=es_LA","icon":"<path d=\"M13.5 21.9V13.9h2.7l.4-3.1h-3.1V8.8c0-.9.25-1.5 1.55-1.5h1.65V4.5c-.29-.04-1.27-.13-2.41-.13-2.39 0-4.02 1.46-4.02 4.13v2.3H7.5v3.1h2.77v8h3.23Z\"/>"},{"name":"TikTok","url":"https://www.tiktok.com/@yaakob_heart","icon":"<path d=\"M16.6 2h-3.1v13.1a2.6 2.6 0 1 1-2.2-2.57v-3.15a5.75 5.75 0 1 0 5.3 5.73V8.87a6.9 6.9 0 0 0 4 1.28V7A3.93 3.93 0 0 1 16.6 2Z\"/>"},{"name":"YouTube","url":"https://www.youtube.com/@YaakobBeHeart","icon":"<path d=\"M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15.2V8.8l5.2 3.2-5.2 3.2Z\"/>"},{"name":"X","url":"https://x.com/yaakob","icon":"<path d=\"M17.53 3h3.06l-6.69 7.64L21.75 21h-6.16l-4.83-6.3L5.24 21H2.18l7.15-8.17L2.25 3h6.31l4.36 5.77L17.53 3Zm-1.07 16.2h1.69L7.62 4.71H5.8l10.66 14.49Z\"/>"},{"name":"WhatsApp","url":"https://wa.me/5215527416178","icon":"<path d=\"M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2.1 22l5.36-1.4a9.8 9.8 0 0 0 4.58 1.15h.01c5.43 0 9.84-4.4 9.84-9.84C21.89 6.4 17.48 2 12.04 2Zm0 17.98h-.01a8.2 8.2 0 0 1-4.16-1.14l-.3-.18-3.18.83.85-3.1-.2-.32a8.15 8.15 0 0 1-1.25-4.35c0-4.51 3.68-8.18 8.2-8.18a8.14 8.14 0 0 1 8.18 8.19c0 4.51-3.67 8.18-8.13 8.18Zm4.49-6.13c-.25-.13-1.45-.71-1.68-.79-.22-.08-.39-.13-.55.12-.16.25-.63.79-.77.95-.14.16-.28.18-.53.06-.25-.13-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.16.04-.31-.02-.43-.06-.13-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03s.87 2.35.99 2.51c.12.16 1.72 2.62 4.16 3.67.58.25 1.03.4 1.39.51.58.18 1.11.16 1.53.1.47-.07 1.45-.59 1.65-1.17.2-.57.2-1.06.14-1.16-.06-.11-.22-.17-.47-.29Z\"/>"}]});}),
"[project]/home-lib/components/Hud.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "Hud",
    ()=>Hud
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/servicios-lib/components/contact/index.ts [ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$ContactModalProvider$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/contact/ContactModalProvider.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$data$2f$content$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/home-lib/data/content.json (json)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$ContactModalProvider$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$ContactModalProvider$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
// Split ring from the services footer: two 150 degree arcs on r=10.5,
// leaving a gap top-right and bottom-left.
const RING = '<path class="yk-soc-ring" d="M10.18 22.34A10.5 10.5 0 0 1 8.41 2.13"/>' + '<path class="yk-soc-ring" d="M13.82 1.66A10.5 10.5 0 0 1 15.59 21.87"/>';
const USER_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true">' + '<path d="M12 12.4a4.7 4.7 0 1 0 0-9.4 4.7 4.7 0 0 0 0 9.4Zm0 1.9c-4.1 0-7.4 2.4-7.4 5.4V21h14.8v-1.3c0-3-3.3-5.4-7.4-5.4Z"/>' + '</svg>';
const DAYS = [
    'DOM',
    'LUN',
    'MAR',
    'MIÉ',
    'JUE',
    'VIE',
    'SÁB'
];
const MONTHS = [
    'ENE',
    'FEB',
    'MAR',
    'ABR',
    'MAY',
    'JUN',
    'JUL',
    'AGO',
    'SEP',
    'OCT',
    'NOV',
    'DIC'
];
const pad = (n)=>n < 10 ? '0' + n : '' + n;
function isExternal(url) {
    return /^https?:/i.test(url);
}
/** Phone-only clock + date; hidden on desktop by the stylesheet. */ function useClock() {
    const [now, setNow] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const tick = ()=>setNow(new Date());
        tick();
        const iv = setInterval(tick, 1000);
        return ()=>clearInterval(iv);
    }, []);
    return {
        time: now ? `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}` : '--:--:--',
        date: now ? `${DAYS[now.getDay()]} ${now.getDate()} ${MONTHS[now.getMonth()]}` : ''
    };
}
function Hud() {
    const { open } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$ContactModalProvider$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["useContactModal"])();
    const { time, date } = useClock();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        id: "yk-hud",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "yk-hud-side yk-hud-left",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "yk-time",
                        id: "yk-time",
                        suppressHydrationWarning: true,
                        children: time
                    }, void 0, false, {
                        fileName: "[project]/home-lib/components/Hud.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        id: "yk-social",
                        "aria-label": "Síguenos",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$data$2f$content$2e$json__$28$json$29$__["default"].social.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                className: `yk-soc${/whatsapp/i.test(s.name) ? ' is-whatsapp' : ''}`,
                                href: s.url,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                title: s.name,
                                "aria-label": s.name,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                                    viewBox: "0 0 24 24",
                                    "aria-hidden": "true",
                                    dangerouslySetInnerHTML: {
                                        __html: `${RING}<g class="yk-soc-glyph" transform="translate(6.35 6.35) scale(0.47)">${s.icon}</g>`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/home-lib/components/Hud.tsx",
                                    lineNumber: 68,
                                    columnNumber: 15
                                }, this)
                            }, s.name, false, {
                                fileName: "[project]/home-lib/components/Hud.tsx",
                                lineNumber: 57,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/home-lib/components/Hud.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/home-lib/components/Hud.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "yk-hud-side yk-hud-right",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "yk-date",
                        id: "yk-date",
                        suppressHydrationWarning: true,
                        children: date
                    }, void 0, false, {
                        fileName: "[project]/home-lib/components/Hud.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "yk-hud-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
                                id: "yk-nav",
                                "aria-label": "Navegación",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$data$2f$content$2e$json__$28$json$29$__["default"].menu.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                        className: "yk-navlink",
                                        href: m.url,
                                        ...!m.modal && isExternal(m.url) ? {
                                            target: '_blank',
                                            rel: 'noopener noreferrer'
                                        } : {},
                                        onClick: m.modal ? (e)=>{
                                            e.preventDefault();
                                            open();
                                        } : undefined,
                                        children: m.name
                                    }, m.name, false, {
                                        fileName: "[project]/home-lib/components/Hud.tsx",
                                        lineNumber: 86,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/home-lib/components/Hud.tsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                id: "yk-login",
                                href: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$data$2f$content$2e$json__$28$json$29$__["default"].login.url,
                                ...isExternal(__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$data$2f$content$2e$json__$28$json$29$__["default"].login.url) ? {
                                    target: '_blank',
                                    rel: 'noopener noreferrer'
                                } : {},
                                dangerouslySetInnerHTML: {
                                    __html: `${USER_ICON}<span>${__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$data$2f$content$2e$json__$28$json$29$__["default"].login.name}</span>`
                                }
                            }, void 0, false, {
                                fileName: "[project]/home-lib/components/Hud.tsx",
                                lineNumber: 106,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/home-lib/components/Hud.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/home-lib/components/Hud.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/home-lib/components/Hud.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/home-lib/components/index.ts [ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$components$2f$LegacyStage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/home-lib/components/LegacyStage.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$components$2f$HebrewSplash$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/home-lib/components/HebrewSplash.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$components$2f$Hud$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/home-lib/components/Hud.tsx [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$components$2f$Hud$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$components$2f$Hud$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/pages/index.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$components$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/home-lib/components/index.ts [ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$components$2f$HebrewSplash$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/home-lib/components/HebrewSplash.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$components$2f$Hud$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/home-lib/components/Hud.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$components$2f$LegacyStage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/home-lib/components/LegacyStage.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$script$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/script.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$components$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$components$2f$Hud$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$components$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$components$2f$Hud$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
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
            description: 'Despacho especializado en protección y defensa fiscal ante el SAT, la UIF y la FGR. Diagnóstico fiscal, auditorías, créditos fiscales, multas, sellos digitales, defensa 69-B, controles volumétricos y regularización fiscal.',
            areaServed: 'MX',
            telephone: '+52 55 9008 6360',
            email: 'contacto@yaakob.com',
            address: {
                '@type': 'PostalAddress',
                streetAddress: 'Alica 40, Lomas de Chapultepec',
                addressLocality: 'Miguel Hidalgo, CDMX',
                postalCode: '11000',
                addressCountry: 'MX'
            },
            openingHours: 'Mo-Fr 09:00-18:00',
            founder: {
                '@type': 'Person',
                name: 'L.C. Juan José de Anda González'
            },
            sameAs: [
                'https://www.instagram.com/yaakobeheart/',
                'https://www.facebook.com/profile.php?id=61587552527813',
                'https://www.tiktok.com/@yaakob_heart',
                'https://www.youtube.com/@YaakobBeHeart',
                'https://x.com/yaakob'
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
                    'Regularización Fiscal'
                ].map((name)=>({
                        '@type': 'Offer',
                        itemOffered: {
                            '@type': 'Service',
                            name
                        }
                    }))
            }
        },
        {
            '@type': 'WebSite',
            '@id': 'https://yaakob.com/#website',
            url: 'https://yaakob.com',
            name: 'Yaakob - XIX - XXIII',
            description: 'Sitio web oficial de Yaakob Consultores S.C. - Protección y defensa fiscal',
            publisher: {
                '@id': 'https://yaakob.com/#organization'
            },
            inLanguage: 'es-MX'
        },
        {
            '@type': 'WebPage',
            '@id': 'https://yaakob.com/#webpage',
            url: 'https://yaakob.com',
            name: 'Yaakob - XIX - XXIII | Protección y Defensa Fiscal en México',
            isPartOf: {
                '@id': 'https://yaakob.com/#website'
            },
            about: {
                '@id': 'https://yaakob.com/#organization'
            },
            description: 'Página oficial de Yaakob Consultores S.C. Despacho de protección y defensa fiscal ante el SAT, la UIF y la FGR, con asesoría de L.C. Juan José de Anda González.',
            inLanguage: 'es-MX'
        }
    ]
};
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
`;
const gtmSnippet = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T52XDQ9');`;
const gtagSnippet = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'DC-4136874');
`;
/**
 * Scopes the engine reset in home-lib/home.css to this page: the class lives
 * on <html> only while the home is mounted, so /servicios never sees it.
 */ function useHomeBodyClass() {
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        document.documentElement.classList.add('yk-home');
        return ()=>document.documentElement.classList.remove('yk-home');
    }, []);
}
function Home() {
    useHomeBodyClass();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                        children: "Yaakob - XIX - XXIII | Protección y Defensa Fiscal en México"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 145,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        httpEquiv: "X-UA-Compatible",
                        content: "IE=edge,chrome=1"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 146,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "google",
                        content: "notranslate"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 147,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "Yaakob Consultores S.C.: despacho especializado en protección y defensa fiscal. Diagnóstico fiscal, auditorías del SAT, créditos fiscales, multas, sellos digitales, defensa 69-B y UIF-FGR. Asesoría con L.C. Juan José de Anda González."
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "keywords",
                        content: "Yaakob Consultores, defensa fiscal, diagnóstico fiscal, auditorías SAT, créditos fiscales, multas fiscales, sellos digitales, defensa 69-B, UIF FGR, controles volumétricos, regularización fiscal, requerimientos SAT, abogado fiscalista CDMX"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "theme-color",
                        content: "#0a0a0a"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:type",
                        content: "website"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:url",
                        content: "https://yaakob.com/"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:title",
                        content: "Yaakob - XIX - XXIII | Protección y Defensa Fiscal en México"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:description",
                        content: "Despacho especializado en defensa fiscal: diagnóstico, auditorías del SAT, créditos fiscales, multas, sellos digitales, defensa 69-B y UIF-FGR."
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 160,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:image",
                        content: "/logo.png"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 164,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:site_name",
                        content: "Yaakob Consultores S.C."
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 165,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:locale",
                        content: "es_MX"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 166,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "twitter:card",
                        content: "summary_large_image"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 167,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "twitter:url",
                        content: "https://yaakob.com/"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 168,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "twitter:title",
                        content: "Yaakob - XIX - XXIII | Protección y Defensa Fiscal en México"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 169,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "twitter:description",
                        content: "Despacho especializado en defensa fiscal ante el SAT. Diagnóstico, auditorías, créditos fiscales, multas y más."
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 170,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "twitter:image",
                        content: "/logo.png"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 174,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("link", {
                        rel: "icon",
                        type: "image/png",
                        href: "/favicon-home.png"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 175,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("link", {
                        rel: "apple-touch-icon",
                        href: "/favicon-home.png"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 176,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("script", {
                        type: "application/ld+json",
                        dangerouslySetInnerHTML: {
                            __html: JSON.stringify(jsonLd)
                        }
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 177,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 144,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$script$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "optanon-wrapper",
                strategy: "afterInteractive",
                dangerouslySetInnerHTML: {
                    __html: optanonWrapper
                }
            }, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 181,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$script$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "onetrust-stub",
                src: "https://cdn.cookielaw.org/scripttemplates/otSDKStub.js",
                "data-domain-script": "ff0445a9-1ea6-4168-89fb-12471f269c18",
                charSet: "UTF-8",
                strategy: "afterInteractive"
            }, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 182,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$script$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "gtm",
                strategy: "afterInteractive",
                dangerouslySetInnerHTML: {
                    __html: gtmSnippet
                }
            }, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 191,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$script$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "gtag",
                src: "https://www.googletagmanager.com/gtag/js?id=DC-4136874",
                strategy: "afterInteractive"
            }, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 192,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$script$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "gtag-config",
                strategy: "afterInteractive",
                dangerouslySetInnerHTML: {
                    __html: gtagSnippet
                }
            }, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 193,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$components$2f$LegacyStage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["LegacyStage"], {}, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 196,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$components$2f$HebrewSplash$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["HebrewSplash"], {}, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 197,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$components$2f$Hud$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["Hud"], {}, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 198,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                id: "ot-sdk-btn",
                className: "ot-sdk-show-settings",
                children: "Cookie Settings"
            }, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 201,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b9c0436a._.js.map