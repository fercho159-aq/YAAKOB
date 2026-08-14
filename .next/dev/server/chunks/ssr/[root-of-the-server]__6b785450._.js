module.exports = [
"[project]/home-lib/components/Stage.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Stage",
    ()=>Stage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dynamic$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dynamic.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
;
;
/**
 * The home's WebGL stage.
 *
 * Replaces the cloned Hydra engine that used to run here: same scene, rebuilt
 * on react-three-fiber in `home-lib/scene`. The dissolve out to /apps is kept
 * from the old build — the engine fired it from its own UI button, which on
 * this site is the services line, so the scene calls back here instead.
 *
 * Client only: the canvas needs a browser, and pre-rendering it on the server
 * would only produce markup React has to throw away.
 */ const Scene = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dynamic$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/home-lib/scene/Scene.tsx [ssr] (ecmascript, next/dynamic entry, async loader)").then((m)=>m.Scene), {
    loadableGenerated: {
        modules: [
            "[project]/home-lib/scene/Scene.tsx [client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
/** Milliseconds; must stay in step with the CSS animation in home.css. */ const DISSOLVE = 1800;
const BLACKOUT_AT = 600;
function Stage() {
    const leavingRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(false);
    const begin = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])(()=>{
        if (leavingRef.current) return;
        leavingRef.current = true;
        const canvas = document.querySelector('canvas');
        const blackout = document.getElementById('yaakob-blackout');
        // Dispersion: bright flash and blur, then fade to dark underneath.
        if (canvas) {
            canvas.style.animation = 'particleDissolve 1.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
        }
        setTimeout(()=>{
            if (blackout) {
                blackout.style.transition = 'opacity 0.8s ease';
                blackout.style.opacity = '1';
            }
        }, BLACKOUT_AT);
        setTimeout(()=>{
            window.location.href = '/apps';
        }, DISSOLVE);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Scene, {
                onBegin: begin
            }, void 0, false, {
                fileName: "[project]/home-lib/components/Stage.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                id: "yaakob-blackout"
            }, void 0, false, {
                fileName: "[project]/home-lib/components/Stage.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/servicios-lib/components/chrome/Wordmark.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "AnimatedWordmark",
    ()=>AnimatedWordmark
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__ = __turbopack_context__.i("[externals]/@chakra-ui/react [external] (@chakra-ui/react, esm_import, [project]/node_modules/@chakra-ui/react)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/servicios-lib/components/svg/index.ts [ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$PlaceholderWordmark$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/svg/PlaceholderWordmark.tsx [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$PlaceholderWordmark$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$PlaceholderWordmark$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
/**
 * The original reveals its wordmark glyph by glyph — each letter flips in from
 * `rotateY(90deg)` over 0.5s on a 0.05s stagger. `PlaceholderWordmark` draws a
 * single `<text>` between two bracket rules rather than per-letter paths, so
 * the same motion is applied to those three shapes instead.
 */ const reveal = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["keyframes"])({
    from: {
        opacity: 0,
        transform: 'rotateY(90deg)'
    },
    to: {
        opacity: 1,
        transform: 'rotateY(0deg)'
    }
});
const revealStyles = {
    '& > g > path, & > text': {
        animation: `${reveal} 0.5s both`
    },
    '& > g > path:nth-of-type(1)': {
        animationDelay: '0s'
    },
    '& > text': {
        animationDelay: '0.15s'
    },
    '& > g > path:nth-of-type(2)': {
        animationDelay: '0.3s'
    }
};
function AnimatedWordmark({ animate = true, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$PlaceholderWordmark$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["PlaceholderWordmark"], {
        w: "100%",
        h: "100%",
        sx: {
            // Matches `.css-lnibci *` in the compiled stylesheet.
            '& *': {
                transformBox: 'fill-box',
                transformOrigin: 'left !important'
            },
            ...animate ? revealStyles : {}
        },
        ...props
    }, void 0, false, {
        fileName: "[project]/servicios-lib/components/chrome/Wordmark.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/servicios-lib/hooks/useMouseFollower.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isTouchDevice",
    ()=>isTouchDevice,
    "useMouseFollower",
    ()=>useMouseFollower
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
/** The lerp factor the original's mouse ticker uses (`new MouseFollower(0.15)`). */ const VELOCITY = 0.15;
function isTouchDevice() {
    if ("TURBOPACK compile-time truthy", 1) return false;
    //TURBOPACK unreachable
    ;
}
function useMouseFollower(onFrame) {
    const frame = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(onFrame);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        frame.current = onFrame;
    });
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const target = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        };
        const position = {
            ...target
        };
        const touch = isTouchDevice();
        const handleMove = (event)=>{
            target.x = event.clientX;
            target.y = event.clientY;
        };
        const handleResize = ()=>{
            if (!touch) return;
            target.x = window.innerWidth / 2;
            target.y = window.innerHeight / 2;
        };
        if (touch) {
            window.addEventListener('resize', handleResize);
        } else {
            window.addEventListener('mousemove', handleMove);
        }
        let raf = requestAnimationFrame(function tick() {
            position.x += (target.x - position.x) * VELOCITY;
            position.y += (target.y - position.y) * VELOCITY;
            frame.current(position);
            raf = requestAnimationFrame(tick);
        });
        return ()=>{
            cancelAnimationFrame(raf);
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('resize', handleResize);
        };
    }, []);
}
}),
"[project]/servicios-lib/hooks/usePageReady.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePageReady",
    ()=>usePageReady
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
/**
 * Only the very first mount of the session waits for the document; later route
 * changes re-mount the layout and must not put the loader back on screen.
 */ let firstLoadComplete = false;
function usePageReady(minDuration = 1200) {
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (firstLoadComplete) {
            setReady(true);
            return;
        }
        const start = performance.now();
        let timer = 0;
        const finish = ()=>{
            timer = window.setTimeout(()=>{
                firstLoadComplete = true;
                setReady(true);
            }, Math.max(0, minDuration - (performance.now() - start)));
        };
        if (document.readyState === 'complete') {
            finish();
        } else {
            window.addEventListener('load', finish);
        }
        return ()=>{
            window.clearTimeout(timer);
            window.removeEventListener('load', finish);
        };
    }, [
        minDuration
    ]);
    return ready;
}
}),
"[project]/servicios-lib/hooks/index.ts [ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$hooks$2f$useMouseFollower$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/hooks/useMouseFollower.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$hooks$2f$usePageReady$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/hooks/usePageReady.ts [ssr] (ecmascript)");
;
;
}),
"[project]/servicios-lib/components/chrome/motion.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "MotionBox",
    ()=>MotionBox,
    "MotionCenter",
    ()=>MotionCenter,
    "MotionFlex",
    ()=>MotionFlex,
    "MotionListItem",
    ()=>MotionListItem,
    "MotionNavLink",
    ()=>MotionNavLink,
    "NavLink",
    ()=>NavLink
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__ = __turbopack_context__.i("[externals]/@chakra-ui/react [external] (@chakra-ui/react, esm_import, [project]/node_modules/@chakra-ui/react)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__ = __turbopack_context__.i("[externals]/framer-motion [external] (framer-motion, esm_import, [project]/node_modules/framer-motion)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const NavLink = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["chakra"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"]);
const MotionBox = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__["motion"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Box"]);
const MotionFlex = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__["motion"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Flex"]);
const MotionCenter = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__["motion"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Center"]);
const MotionListItem = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__["motion"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["ListItem"]);
const MotionNavLink = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__["motion"])(NavLink);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/servicios-lib/components/chrome/Cursor.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "CURSOR_ARROW_SIZE",
    ()=>CURSOR_ARROW_SIZE,
    "CURSOR_DIAMETER",
    ()=>CURSOR_DIAMETER,
    "CURSOR_STROKE_WIDTH",
    ()=>CURSOR_STROKE_WIDTH,
    "CURSOR_TYPE",
    ()=>CURSOR_TYPE,
    "Cursor",
    ()=>Cursor
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__ = __turbopack_context__.i("[externals]/@chakra-ui/react [external] (@chakra-ui/react, esm_import, [project]/node_modules/@chakra-ui/react)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__ = __turbopack_context__.i("[externals]/framer-motion [external] (framer-motion, esm_import, [project]/node_modules/framer-motion)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$hooks$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/servicios-lib/hooks/index.ts [ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$hooks$2f$useMouseFollower$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/hooks/useMouseFollower.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/motion.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
const CURSOR_DIAMETER = 177;
const CURSOR_ARROW_SIZE = 20;
const CURSOR_STROKE_WIDTH = 2;
const RADIUS = CURSOR_DIAMETER / 2;
const WHITE = '#FFFFFF';
const GOLD = '#FF9933';
const CURSOR_TYPE = {
    label: 'label',
    hidden: 'hidden',
    loading: 'loading',
    arrowLeft: 'arrowLeft',
    arrowRight: 'arrowRight'
};
const EASE = [
    0.25,
    0,
    0,
    1
];
const TRANSITION = {
    ease: EASE,
    duration: 0.8
};
function drawArrow(ctx, fromX, fromY, toX, toY, headSize, color) {
    const angle = Math.atan2(toY - fromY, toX - fromX);
    ctx.lineCap = 'square';
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.moveTo(toX - headSize * Math.cos(angle - Math.PI / 4), toY - headSize * Math.sin(angle - Math.PI / 4));
    ctx.lineTo(toX, toY);
    ctx.moveTo(toX - headSize * Math.cos(angle + Math.PI / 4), toY - headSize * Math.sin(angle + Math.PI / 4));
    ctx.lineTo(toX, toY);
    ctx.strokeStyle = color;
    ctx.stroke();
}
/** Sizes the backing store to the device pixel ratio and returns the context. */ function setCanvas(canvas) {
    const ratio = window.devicePixelRatio || 1;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    ctx?.scale(ratio, ratio);
    return ctx;
}
function randomRotation(previous) {
    return Math.floor(Math.random() * (120 * (previous >= 0 ? -1 : 1)));
}
function usePrevious(value) {
    const ref = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(undefined);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        ref.current = value;
        return ()=>{
            ref.current = undefined;
        };
    });
    return ref.current;
}
const canvasVariants = {
    loading: (degrees)=>({
            rotate: `${degrees}deg`,
            transition: {
                ease: EASE,
                duration: 1.5
            }
        }),
    clicked: {
        scale: [
            1,
            0.95,
            1
        ],
        transition: {
            ease: 'easeIn',
            duration: 0.2
        }
    }
};
const labelVariants = {
    hidden: {
        y: '100%'
    },
    visible: (loading)=>({
            y: '0%',
            scale: loading ? [
                1,
                0.9,
                1
            ] : 1,
            transition: {
                duration: 0.8,
                ease: EASE,
                scale: {
                    repeat: Infinity,
                    duration: 2,
                    delay: 0.8
                }
            }
        })
};
function Cursor({ label, type = CURSOR_TYPE.hidden, animateClick = false, onClickAnimation }) {
    const root = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const canvas = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const ctx = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const size = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])({
        width: 0,
        height: 0
    });
    const [rotation, setRotation] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const controls = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__["useAnimation"])();
    const previousType = usePrevious(type);
    const arrowRight = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__["useMotionValue"])(0);
    const arrowLeft = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__["useMotionValue"])(0);
    const ring = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__["useMotionValue"])(0);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!animateClick) return;
        controls.start('clicked');
        onClickAnimation?.();
    }, [
        animateClick,
        controls,
        onClickAnimation
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (type === previousType) return;
        const wasRight = previousType === CURSOR_TYPE.arrowRight;
        const wasLeft = previousType === CURSOR_TYPE.arrowLeft;
        const isRight = type === CURSOR_TYPE.arrowRight;
        const isLeft = type === CURSOR_TYPE.arrowLeft;
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__["animate"])(ring, type === CURSOR_TYPE.hidden ? 0 : 1, TRANSITION);
        if (isRight || wasRight) (0, __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__["animate"])(arrowRight, isRight ? 1 : 0, TRANSITION);
        if (isLeft || wasLeft) (0, __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__["animate"])(arrowLeft, isLeft ? 1 : 0, TRANSITION);
    }, [
        type,
        previousType,
        ring,
        arrowRight,
        arrowLeft
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!canvas.current) return;
        ctx.current = setCanvas(canvas.current);
        size.current = {
            width: canvas.current.offsetWidth,
            height: canvas.current.offsetHeight
        };
    }, []);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (type !== CURSOR_TYPE.loading) return;
        const interval = window.setInterval(()=>setRotation(randomRotation), 2000);
        return ()=>window.clearInterval(interval);
    }, [
        type
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$hooks$2f$useMouseFollower$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["useMouseFollower"])(({ x, y })=>{
        const context = ctx.current;
        const element = root.current;
        if (!context || !element) return;
        context.clearRect(0, 0, size.current.width, size.current.height);
        const right = arrowRight.get();
        const left = arrowLeft.get();
        const progress = ring.get();
        if (right > 0) {
            drawArrow(context, (RADIUS - CURSOR_ARROW_SIZE) * right, RADIUS, (RADIUS + CURSOR_ARROW_SIZE) * right, RADIUS, 10 * right, WHITE);
        }
        if (left > 0) {
            drawArrow(context, CURSOR_DIAMETER - (RADIUS - CURSOR_ARROW_SIZE) * left, CURSOR_DIAMETER - RADIUS, CURSOR_DIAMETER - (RADIUS + CURSOR_ARROW_SIZE) * left, CURSOR_DIAMETER - RADIUS, 10 * left, WHITE);
        }
        if (progress > 0) {
            context.fillStyle = GOLD;
            context.strokeStyle = GOLD;
            // Inner hairline arc.
            context.beginPath();
            context.arc(RADIUS, RADIUS, RADIUS - CURSOR_STROKE_WIDTH / 2 - 8, 0.5 * Math.PI, 0.5 * Math.PI + 2 * Math.PI * progress);
            context.lineWidth = 1;
            context.stroke();
            // The four tick marks that grow inward from the rim.
            context.beginPath();
            context.moveTo(RADIUS - 5, 9);
            context.lineTo(RADIUS + 5, 9);
            context.lineTo(RADIUS, 9 + 7 * progress);
            context.fill();
            context.beginPath();
            context.moveTo(CURSOR_DIAMETER - 9, RADIUS - 5);
            context.lineTo(CURSOR_DIAMETER - 9, RADIUS + 5);
            context.lineTo(CURSOR_DIAMETER - 9 - 7 * progress, RADIUS);
            context.fill();
            context.beginPath();
            context.moveTo(RADIUS - 5, CURSOR_DIAMETER - 9);
            context.lineTo(RADIUS + 5, CURSOR_DIAMETER - 9);
            context.lineTo(RADIUS, CURSOR_DIAMETER - 9 - 7 * progress);
            context.fill();
            context.beginPath();
            context.moveTo(9, RADIUS - 5);
            context.lineTo(9, RADIUS + 5);
            context.lineTo(9 + 7 * progress, RADIUS);
            context.fill();
            // Outer rim.
            context.beginPath();
            context.arc(RADIUS, RADIUS, RADIUS - CURSOR_STROKE_WIDTH / 2, -0.5 * Math.PI, -0.5 * Math.PI + 2 * Math.PI * progress);
            context.lineWidth = CURSOR_STROKE_WIDTH;
            context.stroke();
        }
        element.style.transform = `translate3d(${x - RADIUS}px, ${y - RADIUS}px, 0)`;
    });
    const labelVisible = type === CURSOR_TYPE.label || type === CURSOR_TYPE.loading;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Box"], {
        ref: root,
        pos: "fixed",
        top: "0",
        left: "0",
        zIndex: "cursor",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "11.0625rem",
        height: "11.0625rem",
        borderRadius: "50%",
        overflow: "hidden",
        transition: "backdrop-filter 0.8s",
        style: {
            backdropFilter: `blur(${type === CURSOR_TYPE.hidden ? '0px' : '6px'})`
        },
        pointerEvents: "none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["MotionBox"], {
                variants: canvasVariants,
                animate: controls,
                pos: "absolute",
                w: "100%",
                h: "100%",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["MotionBox"], {
                    as: "canvas",
                    ref: canvas,
                    variants: canvasVariants,
                    animate: type === CURSOR_TYPE.loading ? 'loading' : undefined,
                    custom: rotation,
                    pos: "absolute",
                    zIndex: -1,
                    w: "100%",
                    h: "100%"
                }, void 0, false, {
                    fileName: "[project]/servicios-lib/components/chrome/Cursor.tsx",
                    lineNumber: 267,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/chrome/Cursor.tsx",
                lineNumber: 266,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Box"], {
                as: "span",
                display: "inline-block",
                overflow: "hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["MotionBox"], {
                    as: "span",
                    display: "inline-block",
                    fontSize: "0.875rem",
                    fontWeight: "semibold",
                    letterSpacing: "widest",
                    textTransform: "uppercase",
                    variants: labelVariants,
                    initial: "hidden",
                    animate: labelVisible ? 'visible' : 'hidden',
                    custom: type === CURSOR_TYPE.loading,
                    children: label
                }, void 0, false, {
                    fileName: "[project]/servicios-lib/components/chrome/Cursor.tsx",
                    lineNumber: 280,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/chrome/Cursor.tsx",
                lineNumber: 279,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/servicios-lib/components/chrome/Cursor.tsx",
        lineNumber: 249,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/servicios-lib/components/chrome/Footer.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "Footer",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__ = __turbopack_context__.i("[externals]/@chakra-ui/react [external] (@chakra-ui/react, esm_import, [project]/node_modules/@chakra-ui/react)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__ = __turbopack_context__.i("[externals]/framer-motion [external] (framer-motion, esm_import, [project]/node_modules/framer-motion)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/servicios-lib/components/contact/index.ts [ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$ContactModalProvider$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/contact/ContactModalProvider.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/servicios-lib/components/svg/index.ts [ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$FacebookLogo$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/svg/FacebookLogo.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$InstagramLogo$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/svg/InstagramLogo.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$PlaceholderWordmark$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/svg/PlaceholderWordmark.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$SocialIcon$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/svg/SocialIcon.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$TiktokLogo$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/svg/TiktokLogo.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$WhatsappLogo$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/svg/WhatsappLogo.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$XLogo$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/svg/XLogo.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$YoutubeLogo$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/svg/YoutubeLogo.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$data$2f$content$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/servicios-lib/data/content.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/motion.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$ContactModalProvider$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$FacebookLogo$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$InstagramLogo$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$PlaceholderWordmark$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$SocialIcon$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$TiktokLogo$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$WhatsappLogo$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$XLogo$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$YoutubeLogo$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$ContactModalProvider$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$FacebookLogo$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$InstagramLogo$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$PlaceholderWordmark$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$SocialIcon$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$TiktokLogo$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$WhatsappLogo$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$XLogo$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$YoutubeLogo$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
/**
 * Chakra v2's `Grid` resolves its `as`-prop overload via a conditional type
 * that, combined with React 19's `ElementType`, blows past TypeScript's
 * instantiation-depth limit (TS2590) when `as="footer"` is applied directly.
 * Widening the component reference to a plain `ComponentType` sidesteps the
 * overload resolution; the `as` prop is still read and honoured at runtime by
 * Chakra exactly as before.
 */ const FooterGrid = __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Grid"];
const IDLE = '#898989';
const ACTIVE = '#FFFFFF';
/** WhatsApp is the one brand that keeps its own colour in the row. */ const WHATSAPP = '#25D366';
const WHATSAPP_ACTIVE = '#4AE98A';
/** `FOOTER_HEIGHT` in the original's constants module. */ const FOOTER_HEIGHT = '80px';
/**
 * Both entries are internal routes, so they use `NextLink` and stay in the tab —
 * unlike the social row, which is external throughout.
 */ const LEGAL_LINKS = [
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$data$2f$content$2e$json__$28$json$29$__["default"].footer.privacy,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$data$2f$content$2e$json__$28$json$29$__["default"].footer.ads
];
/** Same set, in the same order, as the social row on the home page. */ const SOCIALS = [
    {
        key: 'instagram',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$InstagramLogo$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["InstagramLogo"]
    },
    {
        key: 'facebook',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$FacebookLogo$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["FacebookLogo"]
    },
    {
        key: 'tiktok',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$TiktokLogo$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["TiktokLogo"]
    },
    {
        key: 'youtube',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$YoutubeLogo$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["YoutubeLogo"]
    },
    // X ships a 1200-wide viewBox and needs scaling down to match the rest.
    {
        key: 'twitter',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$XLogo$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["XLogo"],
        iconProps: {
            fill: 'none',
            transform: 'scale(0.4)'
        }
    },
    {
        key: 'whatsapp',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$WhatsappLogo$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["WhatsappLogo"],
        colors: {
            idle: WHATSAPP,
            active: WHATSAPP_ACTIVE
        }
    }
];
const iconVariants = {
    initial: {
        scale: 0.4,
        opacity: 0,
        transition: {
            type: 'tween',
            ease: 'easeOut'
        }
    }
};
const ringVariants = {
    initial: {
        rotate: -180,
        opacity: 0
    }
};
function SocialLink({ href, icon: Brand, iconProps, colors, ariaLabel, delay, animate = true, restartId = 0, ...rest }) {
    const [isHovering, setIsHovering] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const controls = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__["useAnimation"])();
    const palette = colors ?? {
        idle: IDLE,
        active: ACTIVE
    };
    const color = isHovering ? palette.active : palette.idle;
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!animate) return;
        controls.set('initial');
        controls.start('inactive', {
            delay
        });
    }, [
        restartId,
        animate,
        delay,
        controls
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["MotionCenter"], {
        w: "40px",
        h: "40px",
        pos: "relative",
        ml: 3,
        onHoverStart: ()=>setIsHovering(true),
        onHoverEnd: ()=>setIsHovering(false),
        initial: "initial",
        animate: animate ? controls : undefined,
        variants: {
            ...iconVariants,
            inactive: {
                scale: 1,
                opacity: 1,
                transition: {
                    duration: 0.6,
                    delay,
                    type: 'tween',
                    ease: 'easeOut'
                }
            }
        },
        ...rest,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Link"], {
            href: href,
            isExternal: true,
            "aria-label": ariaLabel,
            height: "40px",
            width: "40px",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Brand, {
                    w: "40px",
                    h: "auto",
                    pos: "absolute",
                    top: "0",
                    left: "0",
                    background: "transparent",
                    sx: {
                        '& path, & circle': {
                            fill: color,
                            transition: 'fill 0.4s ease-out'
                        }
                    },
                    ...iconProps
                }, void 0, false, {
                    fileName: "[project]/servicios-lib/components/chrome/Footer.tsx",
                    lineNumber: 124,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["MotionBox"], {
                    pos: "absolute",
                    top: "0",
                    left: "0",
                    variants: {
                        ...ringVariants,
                        inactive: {
                            rotate: 0,
                            opacity: 1,
                            transition: {
                                duration: 0.8,
                                delay,
                                type: 'tween',
                                ease: 'easeOut'
                            }
                        },
                        active: {
                            rotate: 180,
                            opacity: 1,
                            transition: {
                                duration: 0.8,
                                delay,
                                type: 'tween',
                                ease: 'easeOut'
                            }
                        }
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["MotionBox"], {
                        animate: animate ? {
                            rotate: 0,
                            transition: {
                                duration: 0.4,
                                ease: 'easeOut'
                            }
                        } : undefined,
                        whileHover: animate ? {
                            rotate: 90,
                            transition: {
                                duration: 0.4,
                                ease: 'easeOut'
                            }
                        } : undefined,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$SocialIcon$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["SocialIcon"], {
                            w: "40px",
                            h: "auto",
                            fill: "none",
                            background: "transparent",
                            stroke: color,
                            strokeWidth: "20px",
                            strokeMiterlimit: 10,
                            transition: "stroke 0.4s ease-out"
                        }, void 0, false, {
                            fileName: "[project]/servicios-lib/components/chrome/Footer.tsx",
                            lineNumber: 156,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/servicios-lib/components/chrome/Footer.tsx",
                        lineNumber: 152,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/servicios-lib/components/chrome/Footer.tsx",
                    lineNumber: 134,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/servicios-lib/components/chrome/Footer.tsx",
            lineNumber: 123,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/servicios-lib/components/chrome/Footer.tsx",
        lineNumber: 104,
        columnNumber: 5
    }, this);
}
function Footer({ delay = 0, animate = true, mobile = false, restartId = 0, ...rest }) {
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const logoControls = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__["useAnimation"])();
    const { open: openContact } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$ContactModalProvider$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["useContactModal"])();
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        setMounted(true);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!mounted || !animate) return;
        const logoDelay = mobile ? delay + 0.8 : delay + 0.5;
        logoControls.set({
            opacity: 0
        });
        logoControls.start({
            opacity: 1,
            transition: {
                duration: 0.5,
                delay: logoDelay
            }
        });
    }, [
        restartId,
        mounted,
        animate,
        mobile,
        delay,
        logoControls
    ]);
    const shouldAnimate = animate && mounted;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(FooterGrid, {
        as: "footer",
        w: "100%",
        h: [
            'auto',
            null,
            null,
            null,
            FOOTER_HEIGHT
        ],
        py: [
            5,
            null,
            2,
            null,
            null,
            0
        ],
        px: [
            0,
            null,
            5
        ],
        templateColumns: "repeat(12, 1fr)",
        templateRows: [
            'repeat(3, 40px)',
            null,
            null,
            null,
            'auto'
        ],
        gap: [
            2,
            null,
            null,
            null,
            6
        ],
        pos: "relative",
        zIndex: "footer",
        ...rest,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["GridItem"], {
                colSpan: [
                    12,
                    null,
                    null,
                    null,
                    4
                ],
                colStart: [
                    'auto',
                    null,
                    null,
                    null,
                    1
                ],
                rowStart: [
                    2,
                    null,
                    null,
                    null,
                    'auto'
                ],
                display: "flex",
                justifyContent: [
                    'center',
                    null,
                    null,
                    null,
                    'flex-start'
                ],
                alignItems: "center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["MotionBox"], {
                    initial: {
                        opacity: 0
                    },
                    animate: logoControls,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Link"], {
                        as: "button",
                        type: "button",
                        onClick: openContact,
                        display: "flex",
                        justifyContent: "center",
                        _hover: {
                            color: 'gold',
                            textDecor: 'none'
                        },
                        "aria-label": "Abrir la tarjeta de contacto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$PlaceholderWordmark$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["PlaceholderWordmark"], {
                            label: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$data$2f$content$2e$json__$28$json$29$__["default"].footer.contact.label.toUpperCase(),
                            title: "Contacto",
                            w: [
                                '63%',
                                null,
                                '249px'
                            ],
                            maxW: "159px",
                            h: "auto",
                            color: "white",
                            background: "transparent",
                            opacity: 0.8,
                            transition: "opacity 0.4s ease-out",
                            _hover: {
                                opacity: 1
                            }
                        }, void 0, false, {
                            fileName: "[project]/servicios-lib/components/chrome/Footer.tsx",
                            lineNumber: 240,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/servicios-lib/components/chrome/Footer.tsx",
                        lineNumber: 231,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/servicios-lib/components/chrome/Footer.tsx",
                    lineNumber: 230,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/chrome/Footer.tsx",
                lineNumber: 222,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["GridItem"], {
                colSpan: [
                    12,
                    null,
                    null,
                    null,
                    4
                ],
                colStart: [
                    'auto',
                    null,
                    null,
                    null,
                    5
                ],
                rowStart: [
                    3,
                    null,
                    null,
                    null,
                    'auto'
                ],
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["MotionBox"], {
                    initial: {
                        opacity: 0
                    },
                    animate: logoControls,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Flex"], {
                        align: "center",
                        gap: [
                            '0.75rem',
                            null,
                            '1.25rem'
                        ],
                        children: LEGAL_LINKS.map((entry)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Link"], {
                                as: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"],
                                href: entry.href,
                                fontSize: [
                                    '0.5625rem',
                                    null,
                                    '0.625rem'
                                ],
                                letterSpacing: "0.16em",
                                textTransform: "uppercase",
                                color: IDLE,
                                whiteSpace: "nowrap",
                                transition: "color 0.4s ease-out",
                                _hover: {
                                    color: ACTIVE,
                                    textDecor: 'none'
                                },
                                children: entry.label
                            }, entry.href, false, {
                                fileName: "[project]/servicios-lib/components/chrome/Footer.tsx",
                                lineNumber: 267,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/servicios-lib/components/chrome/Footer.tsx",
                        lineNumber: 265,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/servicios-lib/components/chrome/Footer.tsx",
                    lineNumber: 264,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/chrome/Footer.tsx",
                lineNumber: 256,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["GridItem"], {
                colSpan: [
                    12,
                    null,
                    null,
                    null,
                    4
                ],
                colStart: [
                    'auto',
                    null,
                    null,
                    null,
                    9
                ],
                rowStart: [
                    1,
                    null,
                    null,
                    null,
                    'auto'
                ],
                display: "flex",
                justifyContent: [
                    'center',
                    null,
                    null,
                    null,
                    'flex-end'
                ],
                alignItems: "center",
                pr: [
                    0,
                    null,
                    null,
                    null,
                    null,
                    '1.875rem'
                ],
                children: SOCIALS.map(({ key, icon, iconProps, colors }, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(SocialLink, {
                        href: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$data$2f$content$2e$json__$28$json$29$__["default"].footer.social[key].href,
                        icon: icon,
                        iconProps: iconProps,
                        colors: colors,
                        ariaLabel: `Go to ${__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$data$2f$content$2e$json__$28$json$29$__["default"].footer.social[key].label}`,
                        animate: shouldAnimate,
                        delay: (mobile ? delay : delay + 0.5) + index * 0.1,
                        restartId: restartId,
                        ml: index === 0 ? 0 : undefined
                    }, key, false, {
                        fileName: "[project]/servicios-lib/components/chrome/Footer.tsx",
                        lineNumber: 296,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/chrome/Footer.tsx",
                lineNumber: 286,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/servicios-lib/components/chrome/Footer.tsx",
        lineNumber: 209,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/servicios-lib/components/chrome/Loader.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "Loader",
    ()=>Loader
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$hooks$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/servicios-lib/hooks/index.ts [ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$hooks$2f$usePageReady$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/hooks/usePageReady.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Cursor$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/Cursor.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/motion.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Cursor$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Cursor$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
const variants = {
    hidden: {
        opacity: 0,
        transition: {
            duration: 1
        }
    }
};
function Loader({ isActive, onAnimationEnd }) {
    const ready = (0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$hooks$2f$usePageReady$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["usePageReady"])();
    const active = isActive ?? !ready;
    const [type, setType] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Cursor$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["CURSOR_TYPE"].loading);
    // The original leaves the faded-out overlay mounted; it sits at zIndex
    // `loader` over the whole page, so we drop it once it has finished fading.
    const [dismissed, setDismissed] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (active) return;
        setType(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Cursor$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["CURSOR_TYPE"].hidden);
    }, [
        active
    ]);
    if (dismissed) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["MotionBox"], {
        pos: "fixed",
        top: "0",
        left: "0",
        zIndex: "loader",
        w: "100%",
        h: "100%",
        pointerEvents: active ? undefined : 'none',
        variants: variants,
        animate: active ? undefined : 'hidden',
        onAnimationComplete: ()=>{
            if (active) return;
            setDismissed(true);
            onAnimationEnd?.();
        },
        "aria-label": "Loading page content",
        role: "status",
        "aria-live": "assertive",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Cursor$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["Cursor"], {
            label: "Loading",
            type: type
        }, void 0, false, {
            fileName: "[project]/servicios-lib/components/chrome/Loader.tsx",
            lineNumber: 51,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/servicios-lib/components/chrome/Loader.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/servicios-lib/components/chrome/MenuDrawer.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "MenuDrawer",
    ()=>MenuDrawer
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__ = __turbopack_context__.i("[externals]/@chakra-ui/react [external] (@chakra-ui/react, esm_import, [project]/node_modules/@chakra-ui/react)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/servicios-lib/components/contact/index.ts [ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$ContactModalProvider$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/contact/ContactModalProvider.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Wordmark$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/Wordmark.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/motion.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$ContactModalProvider$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Wordmark$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$ContactModalProvider$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Wordmark$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
const HAIRLINE = '1px solid rgba(255,255,255,0.2)';
const HIGHLIGHT = 'rgba(255,255,255,0.09)';
/** Small house glyph for the HOME row. */ function HomeGlyph() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        width: "15",
        height: "15",
        fill: "none",
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                d: "M3.5 11.5 12 4l8.5 7.5",
                stroke: "currentColor",
                strokeWidth: "1.6",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/chrome/MenuDrawer.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                d: "M5.5 10v8.5a1 1 0 0 0 1 1H9.5v-6h5v6h3a1 1 0 0 0 1-1V10",
                stroke: "currentColor",
                strokeWidth: "1.6",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/chrome/MenuDrawer.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/servicios-lib/components/chrome/MenuDrawer.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
/** The brand flower, tinted via mask so it always follows the accent colour. */ function FlowerGlyph({ size }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Box"], {
        w: size,
        h: size,
        bg: "gold",
        sx: {
            WebkitMaskImage: 'url(/logo.png)',
            maskImage: 'url(/logo.png)',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
            WebkitMaskPosition: 'center',
            maskPosition: 'center'
        }
    }, void 0, false, {
        fileName: "[project]/servicios-lib/components/chrome/MenuDrawer.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
const ENTRIES = [
    {
        label: 'Home',
        href: '/',
        icon: 'home'
    },
    {
        label: 'Contacto',
        modal: true
    },
    {
        label: 'Servicios',
        href: '/servicios'
    },
    {
        label: 'Consultor',
        href: '/start'
    },
    {
        label: 'App',
        href: '/apps',
        icon: 'flower'
    }
];
function MenuDrawer({ isOpen, onClose }) {
    const { open: openContact } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$ContactModalProvider$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["useContactModal"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Drawer"], {
        isOpen: isOpen,
        placement: "right",
        onClose: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["DrawerOverlay"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["DrawerContent"], {
                maxWidth: {
                    base: '100%',
                    xl: '21.75rem'
                },
                bg: "grey1",
                borderLeft: "1.6px solid rgba(255,255,255,0.2)",
                color: "white",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["DrawerHeader"], {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        position: "relative",
                        p: "1.25rem 1rem 1rem",
                        borderBottom: "1.6px solid rgba(255,255,255,0.2)",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["NavLink"], {
                                href: "/servicios",
                                display: "flex",
                                alignItems: "center",
                                h: "100%",
                                fontSize: "0.75rem",
                                letterSpacing: "widest",
                                textTransform: "uppercase",
                                "aria-label": "Go to home page",
                                onClick: onClose,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Wordmark$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["AnimatedWordmark"], {
                                    animate: isOpen,
                                    label: "YAAKOB CONSULTORES SC",
                                    title: "Yaakob",
                                    w: "auto",
                                    h: "22px"
                                }, void 0, false, {
                                    fileName: "[project]/servicios-lib/components/chrome/MenuDrawer.tsx",
                                    lineNumber: 116,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/servicios-lib/components/chrome/MenuDrawer.tsx",
                                lineNumber: 105,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["DrawerCloseButton"], {
                                pos: "absolute",
                                top: "0.875rem",
                                right: "0.75rem",
                                color: "gold",
                                _hover: {
                                    color: 'white'
                                }
                            }, void 0, false, {
                                fileName: "[project]/servicios-lib/components/chrome/MenuDrawer.tsx",
                                lineNumber: 118,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/servicios-lib/components/chrome/MenuDrawer.tsx",
                        lineNumber: 97,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["DrawerBody"], {
                        p: "3px 0 0 0",
                        display: "flex",
                        flexDir: "column",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Flex"], {
                                align: "center",
                                gap: "0.5rem",
                                px: "1.125rem",
                                pt: "1.5rem",
                                pb: "0.875rem",
                                color: "gold",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Box"], {
                                        as: "span",
                                        fontSize: "0.75rem",
                                        lineHeight: 1,
                                        children: "["
                                    }, void 0, false, {
                                        fileName: "[project]/servicios-lib/components/chrome/MenuDrawer.tsx",
                                        lineNumber: 129,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Box"], {
                                        as: "h2",
                                        fontSize: "0.625rem",
                                        fontWeight: "semibold",
                                        letterSpacing: "0.22em",
                                        textTransform: "uppercase",
                                        children: "Menu"
                                    }, void 0, false, {
                                        fileName: "[project]/servicios-lib/components/chrome/MenuDrawer.tsx",
                                        lineNumber: 132,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Box"], {
                                        as: "span",
                                        fontSize: "0.75rem",
                                        lineHeight: 1,
                                        children: "]"
                                    }, void 0, false, {
                                        fileName: "[project]/servicios-lib/components/chrome/MenuDrawer.tsx",
                                        lineNumber: 141,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/servicios-lib/components/chrome/MenuDrawer.tsx",
                                lineNumber: 128,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Box"], {
                                as: "nav",
                                "aria-label": "Menú principal",
                                children: ENTRIES.map((entry)=>{
                                    const inner = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Flex"], {
                                        align: "center",
                                        gap: "0.75rem",
                                        color: "gold",
                                        children: [
                                            entry.icon === 'home' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(HomeGlyph, {}, void 0, false, {
                                                fileName: "[project]/servicios-lib/components/chrome/MenuDrawer.tsx",
                                                lineNumber: 150,
                                                columnNumber: 46
                                            }, this) : null,
                                            entry.icon === 'flower' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(FlowerGlyph, {
                                                size: "16px"
                                            }, void 0, false, {
                                                fileName: "[project]/servicios-lib/components/chrome/MenuDrawer.tsx",
                                                lineNumber: 151,
                                                columnNumber: 48
                                            }, this) : null,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Box"], {
                                                as: "span",
                                                fontSize: "0.9375rem",
                                                fontWeight: "semibold",
                                                letterSpacing: "0.18em",
                                                textTransform: "uppercase",
                                                children: entry.label
                                            }, void 0, false, {
                                                fileName: "[project]/servicios-lib/components/chrome/MenuDrawer.tsx",
                                                lineNumber: 152,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/servicios-lib/components/chrome/MenuDrawer.tsx",
                                        lineNumber: 149,
                                        columnNumber: 19
                                    }, this);
                                    const rowStyles = {
                                        display: 'block',
                                        width: '100%',
                                        textAlign: 'left',
                                        px: '1.125rem',
                                        py: '1.375rem',
                                        borderTop: HAIRLINE,
                                        transition: 'background 0.2s linear',
                                        _hover: {
                                            bg: HIGHLIGHT,
                                            textDecor: 'none'
                                        }
                                    };
                                    if (entry.modal) {
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Box"], {
                                            as: "button",
                                            ...rowStyles,
                                            onClick: ()=>{
                                                onClose();
                                                openContact();
                                            },
                                            children: inner
                                        }, entry.label, false, {
                                            fileName: "[project]/servicios-lib/components/chrome/MenuDrawer.tsx",
                                            lineNumber: 175,
                                            columnNumber: 21
                                        }, this);
                                    }
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["NavLink"], {
                                        href: entry.href ?? '/',
                                        ...rowStyles,
                                        onClick: onClose,
                                        children: inner
                                    }, entry.label, false, {
                                        fileName: "[project]/servicios-lib/components/chrome/MenuDrawer.tsx",
                                        lineNumber: 189,
                                        columnNumber: 19
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/servicios-lib/components/chrome/MenuDrawer.tsx",
                                lineNumber: 146,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Flex"], {
                                flex: "1",
                                align: "flex-end",
                                justify: "center",
                                pb: "2.5rem",
                                pt: "2rem",
                                borderTop: HAIRLINE,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(FlowerGlyph, {
                                    size: "7.5rem"
                                }, void 0, false, {
                                    fileName: "[project]/servicios-lib/components/chrome/MenuDrawer.tsx",
                                    lineNumber: 197,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/servicios-lib/components/chrome/MenuDrawer.tsx",
                                lineNumber: 196,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/servicios-lib/components/chrome/MenuDrawer.tsx",
                        lineNumber: 127,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/servicios-lib/components/chrome/MenuDrawer.tsx",
                lineNumber: 91,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/servicios-lib/components/chrome/MenuDrawer.tsx",
            lineNumber: 90,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/servicios-lib/components/chrome/MenuDrawer.tsx",
        lineNumber: 89,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/servicios-lib/components/chrome/MenuOverlay.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "MenuOverlay",
    ()=>MenuOverlay
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__ = __turbopack_context__.i("[externals]/@chakra-ui/react [external] (@chakra-ui/react, esm_import, [project]/node_modules/@chakra-ui/react)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$data$2f$content$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/servicios-lib/data/content.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Wordmark$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/Wordmark.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/motion.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Wordmark$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Wordmark$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
const HAIRLINE = '1px solid rgba(255,255,255,0.2)';
const HIGHLIGHT = 'rgba(255,255,255,0.09)';
/**
 * The drawer's only list. The entries are external, so each row
 * opens in its own tab and the drawer stays where the visitor left it.
 */ function NewsSection() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Box"], {
        as: "section",
        borderTop: HAIRLINE,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Flex"], {
                align: "center",
                gap: "0.5rem",
                px: "1.125rem",
                pt: "1.5rem",
                pb: "0.875rem",
                color: "gold",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Box"], {
                        as: "span",
                        fontSize: "0.75rem",
                        lineHeight: 1,
                        children: "["
                    }, void 0, false, {
                        fileName: "[project]/servicios-lib/components/chrome/MenuOverlay.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Box"], {
                        as: "h2",
                        fontSize: "0.625rem",
                        fontWeight: "semibold",
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$data$2f$content$2e$json__$28$json$29$__["default"].news.label
                    }, void 0, false, {
                        fileName: "[project]/servicios-lib/components/chrome/MenuOverlay.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Box"], {
                        as: "span",
                        fontSize: "0.75rem",
                        lineHeight: 1,
                        children: "]"
                    }, void 0, false, {
                        fileName: "[project]/servicios-lib/components/chrome/MenuOverlay.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/servicios-lib/components/chrome/MenuOverlay.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["UnorderedList"], {
                m: 0,
                p: 0,
                listStyleType: "none",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$data$2f$content$2e$json__$28$json$29$__["default"].news.items.map((entry)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["ListItem"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Link"], {
                            href: entry.href,
                            isExternal: true,
                            display: "block",
                            px: "1.125rem",
                            py: "0.875rem",
                            borderTop: HAIRLINE,
                            transition: "background 0.2s linear",
                            _hover: {
                                bg: HIGHLIGHT,
                                textDecor: 'none'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Box"], {
                                    fontSize: "0.5625rem",
                                    letterSpacing: "0.18em",
                                    textTransform: "uppercase",
                                    color: "gold",
                                    mb: "0.375rem",
                                    children: entry.source
                                }, void 0, false, {
                                    fileName: "[project]/servicios-lib/components/chrome/MenuOverlay.tsx",
                                    lineNumber: 70,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Box"], {
                                    fontSize: "0.8125rem",
                                    lineHeight: "1.35",
                                    color: "white",
                                    children: entry.title
                                }, void 0, false, {
                                    fileName: "[project]/servicios-lib/components/chrome/MenuOverlay.tsx",
                                    lineNumber: 79,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/servicios-lib/components/chrome/MenuOverlay.tsx",
                            lineNumber: 60,
                            columnNumber: 13
                        }, this)
                    }, entry.id, false, {
                        fileName: "[project]/servicios-lib/components/chrome/MenuOverlay.tsx",
                        lineNumber: 59,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/chrome/MenuOverlay.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/servicios-lib/components/chrome/MenuOverlay.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
function MenuOverlay({ isOpen, onClose, footer }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Drawer"], {
        isOpen: isOpen,
        placement: "right",
        onClose: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["DrawerOverlay"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["DrawerContent"], {
                maxWidth: {
                    base: '100%',
                    xl: '21.75rem'
                },
                bg: "grey1",
                borderLeft: "1.6px solid rgba(255,255,255,0.2)",
                color: "white",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["DrawerHeader"], {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        position: "relative",
                        p: "1.25rem 1rem 1rem",
                        borderBottom: {
                            base: '1.6px solid rgba(255,255,255,0.2)',
                            xl: 'none'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["NavLink"], {
                                href: "/servicios",
                                display: {
                                    base: 'flex',
                                    xl: 'none'
                                },
                                alignItems: "center",
                                h: "100%",
                                fontSize: "0.75rem",
                                letterSpacing: "widest",
                                textTransform: "uppercase",
                                "aria-label": "Go to home page",
                                onClick: onClose,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Wordmark$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["AnimatedWordmark"], {
                                    animate: isOpen,
                                    label: "YAAKOB CONSULTORES SC",
                                    title: "Yaakob",
                                    w: "auto",
                                    h: "22px"
                                }, void 0, false, {
                                    fileName: "[project]/servicios-lib/components/chrome/MenuOverlay.tsx",
                                    lineNumber: 119,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/servicios-lib/components/chrome/MenuOverlay.tsx",
                                lineNumber: 108,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["DrawerCloseButton"], {
                                pos: "absolute",
                                top: "0.875rem",
                                right: "0.75rem",
                                color: "gold",
                                _hover: {
                                    color: 'white'
                                }
                            }, void 0, false, {
                                fileName: "[project]/servicios-lib/components/chrome/MenuOverlay.tsx",
                                lineNumber: 121,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/servicios-lib/components/chrome/MenuOverlay.tsx",
                        lineNumber: 100,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["DrawerBody"], {
                        p: "3px 0 0 0",
                        display: "flex",
                        flexDir: "column",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(NewsSection, {}, void 0, false, {
                                fileName: "[project]/servicios-lib/components/chrome/MenuOverlay.tsx",
                                lineNumber: 131,
                                columnNumber: 13
                            }, this),
                            footer ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Flex"], {
                                h: "100%",
                                w: "100%",
                                direction: "column",
                                justifyContent: "flex-end",
                                alignItems: "flex-end",
                                minH: "4.6875rem",
                                px: "1.6875rem",
                                py: "0.75rem",
                                children: footer
                            }, void 0, false, {
                                fileName: "[project]/servicios-lib/components/chrome/MenuOverlay.tsx",
                                lineNumber: 134,
                                columnNumber: 15
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/servicios-lib/components/chrome/MenuOverlay.tsx",
                        lineNumber: 130,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/servicios-lib/components/chrome/MenuOverlay.tsx",
                lineNumber: 94,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/servicios-lib/components/chrome/MenuOverlay.tsx",
            lineNumber: 93,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/servicios-lib/components/chrome/MenuOverlay.tsx",
        lineNumber: 92,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/servicios-lib/components/chrome/Navigation.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "Navigation",
    ()=>Navigation
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__ = __turbopack_context__.i("[externals]/@chakra-ui/react [external] (@chakra-ui/react, esm_import, [project]/node_modules/@chakra-ui/react)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/servicios-lib/components/contact/index.ts [ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$ContactModalProvider$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/contact/ContactModalProvider.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$MenuDrawer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/MenuDrawer.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$MenuOverlay$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/MenuOverlay.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Wordmark$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/Wordmark.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/motion.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$ContactModalProvider$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$MenuDrawer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$MenuOverlay$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Wordmark$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$ContactModalProvider$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$MenuDrawer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$MenuOverlay$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Wordmark$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
const EASE = [
    0.25,
    0,
    0,
    1
];
const buttonVariants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.01
        }
    }
};
const menuLabelVariants = {
    hidden: {
        y: '100%'
    },
    visible: {
        y: 0,
        transition: {
            ease: EASE,
            duration: 0.5
        }
    }
};
const barVariants = {
    hidden: {
        scaleX: 0
    },
    visible: (custom)=>({
            scaleX: custom?.visible ?? 1,
            transition: {
                ease: EASE,
                duration: 0.5
            }
        }),
    hover: (custom)=>({
            scaleX: custom?.hover ?? 1
        })
};
/** Simple house glyph — links out to the marketing root, away from `/servicios`. */ function HomeIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        width: "16",
        height: "16",
        fill: "none",
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                d: "M3.5 11.5 12 4l8.5 7.5",
                stroke: "currentColor",
                strokeWidth: "1.6",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                d: "M5.5 10v8.5a1 1 0 0 0 1 1H9.5v-6h5v6h3a1 1 0 0 0 1-1V10",
                stroke: "currentColor",
                strokeWidth: "1.6",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
/** The three animated bars shared by both toggles. */ function Bars() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Flex"], {
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "space-between",
        h: "0.75rem",
        w: "1rem",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["MotionBox"], {
                as: "span",
                display: "block",
                bg: "gold",
                h: "2px",
                variants: barVariants
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["MotionBox"], {
                as: "span",
                display: "block",
                bg: "gold",
                h: "2px",
                transformOrigin: "left",
                variants: barVariants,
                custom: {
                    hover: 0.75
                }
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["MotionBox"], {
                as: "span",
                display: "block",
                bg: "gold",
                h: "2px",
                transformOrigin: "left",
                variants: barVariants,
                custom: {
                    visible: 0.5,
                    hover: 1
                }
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
function ToggleButton({ label, barsFirst = false, onClick }) {
    const text = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Box"], {
        as: "span",
        overflow: "hidden",
        fontSize: "0.75rem",
        lineHeight: "100%",
        letterSpacing: "0.1em",
        fontWeight: "semibold",
        textTransform: "uppercase",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["MotionBox"], {
            as: "span",
            display: "block",
            variants: menuLabelVariants,
            children: label
        }, void 0, false, {
            fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
            lineNumber: 109,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
        lineNumber: 100,
        columnNumber: 5
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["MotionFlex"], {
        as: "button",
        "aria-label": `Toggle ${label}`,
        alignItems: "center",
        gap: {
            base: '0.6875rem',
            xl: '0.875rem'
        },
        h: "2.0625rem",
        p: "0.625rem",
        minWidth: 0,
        whileHover: "hover",
        onClick: onClick,
        children: barsFirst ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Bars, {}, void 0, false, {
                    fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                    lineNumber: 128,
                    columnNumber: 11
                }, this),
                text
            ]
        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
            children: [
                text,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Bars, {}, void 0, false, {
                    fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                    lineNumber: 134,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
        lineNumber: 115,
        columnNumber: 5
    }, this);
}
const NAV_LINK_STYLES = {
    fontSize: '0.75rem',
    lineHeight: '100%',
    letterSpacing: '0.1em',
    fontWeight: 'semibold',
    textTransform: 'uppercase',
    color: 'whiteAlpha.800',
    _hover: {
        color: 'gold',
        textDecor: 'none'
    }
};
function Navigation({ animate = true, minimal = false, menuFooter }) {
    const [newsOpen, setNewsOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const { open: openContact } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$ContactModalProvider$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["useContactModal"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const lastSegment = router.asPath.split('/').pop();
    const logoHiddenOnMobile = router.asPath !== '/' && router.asPath !== '/account-settings' && lastSegment !== 'play';
    const topOffset = minimal ? {
        base: '0.5rem',
        xl: '0.5rem'
    } : {
        base: '0.875rem',
        xl: '1.5rem'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["MotionBox"], {
        as: "nav",
        pos: "relative",
        zIndex: "navigation",
        initial: {
            opacity: 0
        },
        animate: {
            opacity: 1
        },
        exit: {
            opacity: 0
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["NavLink"], {
                href: "/servicios",
                "aria-label": "Go to home page",
                pos: "absolute",
                top: minimal ? {
                    base: '0.9375rem',
                    xl: '0.9375rem'
                } : {
                    base: '1.375rem',
                    xl: '1.875rem'
                },
                left: {
                    base: '1.125rem',
                    xl: '1.875rem'
                },
                w: "20rem",
                mt: "-0.25rem",
                zIndex: "navigation",
                visibility: {
                    base: logoHiddenOnMobile ? 'hidden' : undefined,
                    xl: 'visible'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Wordmark$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["AnimatedWordmark"], {
                    animate: animate,
                    label: "YAAKOB CONSULTORES SC",
                    title: "Yaakob"
                }, void 0, false, {
                    fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                    lineNumber: 192,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                lineNumber: 181,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["MotionFlex"], {
                display: {
                    base: 'flex',
                    xl: 'none'
                },
                alignItems: "center",
                pos: "fixed",
                top: topOffset,
                left: "0.75rem",
                zIndex: "navigation",
                variants: buttonVariants,
                initial: "hidden",
                animate: animate ? 'visible' : undefined,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(ToggleButton, {
                    label: "Noticias",
                    barsFirst: true,
                    onClick: ()=>setNewsOpen((open)=>!open)
                }, void 0, false, {
                    fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                    lineNumber: 207,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                lineNumber: 196,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["MotionFlex"], {
                alignItems: "center",
                gap: {
                    base: '0.75rem',
                    xl: '1.25rem'
                },
                pos: "fixed",
                top: topOffset,
                right: {
                    base: '0.75rem',
                    xl: '1.5rem'
                },
                zIndex: "navigation",
                variants: buttonVariants,
                initial: "hidden",
                animate: animate ? 'visible' : undefined,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Link"], {
                        href: "https://www.yaakob.com/",
                        "aria-label": "Ir al inicio de Yaakob",
                        display: {
                            base: 'none',
                            xl: 'flex'
                        },
                        alignItems: "center",
                        justifyContent: "center",
                        h: "2.0625rem",
                        w: "2.0625rem",
                        color: "whiteAlpha.800",
                        _hover: {
                            color: 'gold'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(HomeIcon, {}, void 0, false, {
                            fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                            lineNumber: 233,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                        lineNumber: 222,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["NavLink"], {
                        href: "/servicios",
                        display: {
                            base: 'none',
                            xl: 'block'
                        },
                        ...NAV_LINK_STYLES,
                        children: "Servicios"
                    }, void 0, false, {
                        fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                        lineNumber: 235,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Box"], {
                        as: "button",
                        display: {
                            base: 'none',
                            xl: 'block'
                        },
                        ...NAV_LINK_STYLES,
                        onClick: openContact,
                        children: "Contacto"
                    }, void 0, false, {
                        fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                        lineNumber: 238,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["NavLink"], {
                        href: "/start",
                        display: {
                            base: 'none',
                            xl: 'block'
                        },
                        ...NAV_LINK_STYLES,
                        children: "Consultor"
                    }, void 0, false, {
                        fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                        lineNumber: 246,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["NavLink"], {
                        href: "/apps",
                        "aria-label": "App",
                        display: {
                            base: 'none',
                            xl: 'flex'
                        },
                        alignItems: "center",
                        justifyContent: "center",
                        h: "2.0625rem",
                        w: "1.5rem",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Box"], {
                            w: "1.25rem",
                            h: "1.25rem",
                            bg: "gold",
                            transition: "background 0.2s linear",
                            _hover: {
                                bg: 'white'
                            },
                            sx: {
                                WebkitMaskImage: 'url(/logo.png)',
                                maskImage: 'url(/logo.png)',
                                WebkitMaskRepeat: 'no-repeat',
                                maskRepeat: 'no-repeat',
                                WebkitMaskSize: 'contain',
                                maskSize: 'contain',
                                WebkitMaskPosition: 'center',
                                maskPosition: 'center'
                            }
                        }, void 0, false, {
                            fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                            lineNumber: 258,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                        lineNumber: 249,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Box"], {
                        display: {
                            base: 'none',
                            xl: 'block'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(ToggleButton, {
                            label: "Noticias",
                            onClick: ()=>setNewsOpen((open)=>!open)
                        }, void 0, false, {
                            fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                            lineNumber: 277,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                        lineNumber: 276,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Box"], {
                        display: {
                            base: 'block',
                            xl: 'none'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(ToggleButton, {
                            label: "Menu",
                            onClick: ()=>setMenuOpen((open)=>!open)
                        }, void 0, false, {
                            fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                            lineNumber: 280,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                        lineNumber: 279,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                lineNumber: 211,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$MenuOverlay$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["MenuOverlay"], {
                isOpen: newsOpen,
                onClose: ()=>setNewsOpen(false),
                footer: menuFooter
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                lineNumber: 284,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$MenuDrawer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["MenuDrawer"], {
                isOpen: menuOpen,
                onClose: ()=>setMenuOpen(false)
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                lineNumber: 285,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
        lineNumber: 173,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/servicios-lib/components/chrome/index.ts [ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Wordmark$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/Wordmark.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Cursor$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/Cursor.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Footer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/Footer.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Loader$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/Loader.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$MenuDrawer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/MenuDrawer.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$MenuOverlay$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/MenuOverlay.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Navigation$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/Navigation.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/motion.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Wordmark$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Cursor$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Footer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Loader$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$MenuDrawer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$MenuOverlay$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Navigation$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Wordmark$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Cursor$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Footer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Loader$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$MenuDrawer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$MenuOverlay$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Navigation$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/home-lib/data/content.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"menu":[{"name":"Servicios","url":"/servicios"},{"name":"Contacto","url":"https://wa.me/5215527416178","modal":true}],"login":{"name":"Consultor","url":"/start"},"social":[{"name":"Instagram","url":"https://www.instagram.com/yaakobeheart/","icon":"<path d=\"M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.8.07-1.1.05-1.7.24-2.1.4-.5.2-.9.44-1.3.83-.4.4-.63.8-.83 1.3-.16.4-.35 1-.4 2.1C2.5 8.5 2.5 8.9 2.5 12s0 3.5.07 4.8c.05 1.1.24 1.7.4 2.1.2.5.44.9.83 1.3.4.4.8.63 1.3.83.4.16 1 .35 2.1.4 1.3.07 1.7.07 4.8.07s3.5 0 4.8-.07c1.1-.05 1.7-.24 2.1-.4.5-.2.9-.44 1.3-.83.4-.4.63-.8.83-1.3.16-.4.35-1 .4-2.1.07-1.3.07-1.7.07-4.8s0-3.5-.07-4.8c-.05-1.1-.24-1.7-.4-2.1a3.5 3.5 0 0 0-.83-1.3 3.5 3.5 0 0 0-1.3-.83c-.4-.16-1-.35-2.1-.4C15.5 4 15.1 4 12 4Zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8Zm0 1.8a3.1 3.1 0 1 0 0 6.2 3.1 3.1 0 0 0 0-6.2Zm5.1-2.1a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z\"/>"},{"name":"Facebook","url":"https://www.facebook.com/profile.php?id=61587552527813&locale=es_LA","icon":"<path d=\"M13.5 21.9V13.9h2.7l.4-3.1h-3.1V8.8c0-.9.25-1.5 1.55-1.5h1.65V4.5c-.29-.04-1.27-.13-2.41-.13-2.39 0-4.02 1.46-4.02 4.13v2.3H7.5v3.1h2.77v8h3.23Z\"/>"},{"name":"TikTok","url":"https://www.tiktok.com/@yaakob_heart","icon":"<path d=\"M16.6 2h-3.1v13.1a2.6 2.6 0 1 1-2.2-2.57v-3.15a5.75 5.75 0 1 0 5.3 5.73V8.87a6.9 6.9 0 0 0 4 1.28V7A3.93 3.93 0 0 1 16.6 2Z\"/>"},{"name":"YouTube","url":"https://www.youtube.com/@YaakobBeHeart","icon":"<path d=\"M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15.2V8.8l5.2 3.2-5.2 3.2Z\"/>"},{"name":"X","url":"https://x.com/yaakob","icon":"<path d=\"M17.53 3h3.06l-6.69 7.64L21.75 21h-6.16l-4.83-6.3L5.24 21H2.18l7.15-8.17L2.25 3h6.31l4.36 5.77L17.53 3Zm-1.07 16.2h1.69L7.62 4.71H5.8l10.66 14.49Z\"/>"},{"name":"WhatsApp","url":"https://wa.me/5215527416178","icon":"<path d=\"M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2.1 22l5.36-1.4a9.8 9.8 0 0 0 4.58 1.15h.01c5.43 0 9.84-4.4 9.84-9.84C21.89 6.4 17.48 2 12.04 2Zm0 17.98h-.01a8.2 8.2 0 0 1-4.16-1.14l-.3-.18-3.18.83.85-3.1-.2-.32a8.15 8.15 0 0 1-1.25-4.35c0-4.51 3.68-8.18 8.2-8.18a8.14 8.14 0 0 1 8.18 8.19c0 4.51-3.67 8.18-8.13 8.18Zm4.49-6.13c-.25-.13-1.45-.71-1.68-.79-.22-.08-.39-.13-.55.12-.16.25-.63.79-.77.95-.14.16-.28.18-.53.06-.25-.13-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.16.04-.31-.02-.43-.06-.13-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03s.87 2.35.99 2.51c.12.16 1.72 2.62 4.16 3.67.58.25 1.03.4 1.39.51.58.18 1.11.16 1.53.1.47-.07 1.45-.59 1.65-1.17.2-.57.2-1.06.14-1.16-.06-.11-.22-.17-.47-.29Z\"/>"}]});}),
"[project]/home-lib/components/Hud.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "Hud",
    ()=>Hud
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/index.ts [ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$MenuDrawer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/MenuDrawer.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/servicios-lib/components/contact/index.ts [ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$ContactModalProvider$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/contact/ContactModalProvider.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$data$2f$content$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/home-lib/data/content.json (json)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$MenuDrawer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$ContactModalProvider$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$MenuDrawer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$ContactModalProvider$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
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
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
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
                        lineNumber: 54,
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
                                    lineNumber: 70,
                                    columnNumber: 15
                                }, this)
                            }, s.name, false, {
                                fileName: "[project]/home-lib/components/Hud.tsx",
                                lineNumber: 59,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/home-lib/components/Hud.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/home-lib/components/Hud.tsx",
                lineNumber: 53,
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
                        lineNumber: 82,
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
                                        lineNumber: 88,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/home-lib/components/Hud.tsx",
                                lineNumber: 86,
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
                                lineNumber: 108,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                id: "yk-burger",
                                "aria-label": "Abrir menú",
                                onClick: ()=>setMenuOpen(true),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {}, void 0, false, {
                                        fileName: "[project]/home-lib/components/Hud.tsx",
                                        lineNumber: 121,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {}, void 0, false, {
                                        fileName: "[project]/home-lib/components/Hud.tsx",
                                        lineNumber: 122,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {}, void 0, false, {
                                        fileName: "[project]/home-lib/components/Hud.tsx",
                                        lineNumber: 123,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/home-lib/components/Hud.tsx",
                                lineNumber: 116,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/home-lib/components/Hud.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/home-lib/components/Hud.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$MenuDrawer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["MenuDrawer"], {
                isOpen: menuOpen,
                onClose: ()=>setMenuOpen(false)
            }, void 0, false, {
                fileName: "[project]/home-lib/components/Hud.tsx",
                lineNumber: 127,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/home-lib/components/Hud.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/home-lib/components/index.ts [ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$components$2f$Stage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/home-lib/components/Stage.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$components$2f$Hud$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/home-lib/components/Hud.tsx [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$components$2f$Hud$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$components$2f$Hud$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
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
var __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$components$2f$Hud$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/home-lib/components/Hud.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$components$2f$Stage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/home-lib/components/Stage.tsx [ssr] (ecmascript)");
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
                postalCode: '11040',
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
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        httpEquiv: "X-UA-Compatible",
                        content: "IE=edge,chrome=1"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "google",
                        content: "notranslate"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "Yaakob Consultores S.C.: despacho especializado en protección y defensa fiscal. Diagnóstico fiscal, auditorías del SAT, créditos fiscales, multas, sellos digitales, defensa 69-B y UIF-FGR. Asesoría con L.C. Juan José de Anda González."
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "keywords",
                        content: "Yaakob Consultores, defensa fiscal, diagnóstico fiscal, auditorías SAT, créditos fiscales, multas fiscales, sellos digitales, defensa 69-B, UIF FGR, controles volumétricos, regularización fiscal, requerimientos SAT, abogado fiscalista CDMX"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "theme-color",
                        content: "#0a0a0a"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:type",
                        content: "website"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:url",
                        content: "https://yaakob.com/"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 126,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:title",
                        content: "Yaakob - XIX - XXIII | Protección y Defensa Fiscal en México"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:description",
                        content: "Despacho especializado en defensa fiscal: diagnóstico, auditorías del SAT, créditos fiscales, multas, sellos digitales, defensa 69-B y UIF-FGR."
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:image",
                        content: "/logo.png"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:site_name",
                        content: "Yaakob Consultores S.C."
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:locale",
                        content: "es_MX"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "twitter:card",
                        content: "summary_large_image"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "twitter:url",
                        content: "https://yaakob.com/"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "twitter:title",
                        content: "Yaakob - XIX - XXIII | Protección y Defensa Fiscal en México"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "twitter:description",
                        content: "Despacho especializado en defensa fiscal ante el SAT. Diagnóstico, auditorías, créditos fiscales, multas y más."
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "twitter:image",
                        content: "/logo.png"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("link", {
                        rel: "icon",
                        type: "image/png",
                        href: "/favicon-home.png"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("link", {
                        rel: "apple-touch-icon",
                        href: "/favicon-home.png"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("script", {
                        type: "application/ld+json",
                        dangerouslySetInnerHTML: {
                            __html: JSON.stringify(jsonLd)
                        }
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 145,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 112,
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
                lineNumber: 149,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$script$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "gtag",
                src: "https://www.googletagmanager.com/gtag/js?id=DC-4136874",
                strategy: "afterInteractive"
            }, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 150,
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
                lineNumber: 151,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$components$2f$Stage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["Stage"], {}, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 154,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$components$2f$Hud$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["Hud"], {}, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 155,
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

//# sourceMappingURL=%5Broot-of-the-server%5D__6b785450._.js.map