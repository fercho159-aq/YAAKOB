module.exports = [
"[project]/servicios-lib/components/home/constants.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Layout constants lifted from the compiled site (module 33069). The slide
 * geometry is expressed against these two reference viewports; every width in
 * the carousel is a percentage of `SLIDE_WIDTH_XL`.
 */ __turbopack_context__.s([
    "BREAKPOINT_XL",
    ()=>BREAKPOINT_XL,
    "CURSOR_TYPE",
    ()=>CURSOR_TYPE,
    "SLIDER_EASING",
    ()=>SLIDER_EASING,
    "SLIDES_OFFSET_BASE",
    ()=>SLIDES_OFFSET_BASE,
    "SLIDES_OFFSET_XL",
    ()=>SLIDES_OFFSET_XL,
    "SLIDE_HEIGHT_XL",
    ()=>SLIDE_HEIGHT_XL,
    "SLIDE_WIDTH_BASE",
    ()=>SLIDE_WIDTH_BASE,
    "SLIDE_WIDTH_XL",
    ()=>SLIDE_WIDTH_XL,
    "VARIANTS",
    ()=>VARIANTS,
    "WIDTH_BASE",
    ()=>WIDTH_BASE,
    "WIDTH_XL",
    ()=>WIDTH_XL,
    "slideWidthPct",
    ()=>slideWidthPct
]);
const WIDTH_BASE = 375;
const WIDTH_XL = 1440;
const SLIDE_WIDTH_BASE = 262;
const SLIDE_WIDTH_XL = 390;
const SLIDE_HEIGHT_XL = 520;
const SLIDES_OFFSET_BASE = 42;
const SLIDES_OFFSET_XL = 412;
const BREAKPOINT_XL = 993;
const SLIDER_EASING = 'cubic-bezier(0.2, 0, 0, 1)';
const CURSOR_TYPE = {
    label: 'label',
    hidden: 'hidden',
    loading: 'loading',
    arrowLeft: 'arrowLeft',
    arrowRight: 'arrowRight'
};
const VARIANTS = {
    hidden: 'hidden',
    visible: 'visible'
};
function slideWidthPct(px) {
    return `${px / SLIDE_WIDTH_XL * 100}%`;
}
}),
"[project]/servicios-lib/components/home/motion.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "MotionArticle",
    ()=>MotionArticle,
    "MotionAspectRatio",
    ()=>MotionAspectRatio,
    "MotionBox",
    ()=>MotionBox,
    "MotionCanvas",
    ()=>MotionCanvas,
    "MotionParagraph",
    ()=>MotionParagraph,
    "MotionSpan",
    ()=>MotionSpan
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__ = __turbopack_context__.i("[externals]/@chakra-ui/react [external] (@chakra-ui/react, esm_import, [project]/node_modules/@chakra-ui/react)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__ = __turbopack_context__.i("[externals]/framer-motion [external] (framer-motion, esm_import, [project]/node_modules/framer-motion)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const forwardProp = (prop)=>(0, __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__["isValidMotionProp"])(prop) || (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["shouldForwardProp"])(prop);
const MotionBox = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["chakra"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__["motion"].div, {
    shouldForwardProp: forwardProp
});
const MotionSpan = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["chakra"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__["motion"].span, {
    shouldForwardProp: forwardProp
});
const MotionParagraph = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["chakra"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__["motion"].p, {
    shouldForwardProp: forwardProp
});
const MotionArticle = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["chakra"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__["motion"].article, {
    shouldForwardProp: forwardProp
});
const MotionCanvas = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["chakra"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__["motion"].canvas, {
    shouldForwardProp: forwardProp
});
const MotionAspectRatio = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__["motion"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["AspectRatio"]);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/servicios-lib/components/ui/ScrambleText.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "ScrambleText",
    ()=>ScrambleText
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__ = __turbopack_context__.i("[externals]/@chakra-ui/react [external] (@chakra-ui/react, esm_import, [project]/node_modules/@chakra-ui/react)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const CHAR_SETS = {
    alphabetic: 'abcdefghijklmnopqrstuvwxyz',
    numeric: '0123456789',
    special: '~`!@#$%^&*()-_+={}[]|\\/:;"\'<>,.?'
};
/**
 * Retypes the element one character at a time, showing a random glyph while a
 * slot is in flight. Writes to `innerHTML` directly rather than through React —
 * a frame-by-frame re-render of every character would be far more expensive.
 */ class Scrambler {
    el;
    chars;
    endTime;
    queue = [];
    startTime = 0;
    frame = null;
    constructor(el, duration, chars){
        this.el = el;
        this.chars = chars && CHAR_SETS[chars] || CHAR_SETS.alphabetic;
        this.endTime = (duration ?? 0) * 1000 || 500;
    }
    disable() {
        if (this.frame !== null) cancelAnimationFrame(this.frame);
        this.frame = null;
    }
    reset() {
        this.el.textContent = '';
    }
    animate(text) {
        this.disable();
        const from = this.el.innerText;
        const slots = Math.max(from.length, text.length);
        const step = this.endTime / slots;
        this.queue = [];
        for(let i = 0; i < slots; i++){
            this.queue.push({
                startChar: from[i] || '',
                endChar: text[i] || '',
                startTime: i * step,
                endTime: i * step + step
            });
        }
        this.startTime = 0;
        this.frame = requestAnimationFrame(this.update);
    }
    update = (timestamp)=>{
        if (this.startTime === 0) this.startTime = timestamp;
        const elapsed = timestamp - this.startTime;
        let html = '';
        let done = 0;
        for (const entry of this.queue){
            if (elapsed >= entry.endTime) {
                done++;
                html += entry.endChar;
            } else if (elapsed >= entry.startTime) {
                html += `<span style="opacity: 0.5">${this.randomChar()}</span>`;
            } else {
                html += entry.startChar;
            }
        }
        this.el.innerHTML = html;
        if (done === this.queue.length) {
            this.frame = null;
            return;
        }
        this.frame = requestAnimationFrame(this.update);
    };
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}
function ScrambleText({ text, animate = true, delay = 0, duration, chars, restart, ...rest }) {
    const ref = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const scrambler = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    // The server renders the first value so the text is present without JS; the
    // scrambler blanks it on mount and types it back in.
    const [initialText] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(text);
    const [box, setBox] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        width: 0,
        height: 0
    });
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useLayoutEffect"])(()=>{
        const measure = ()=>{
            const rect = ref.current?.getBoundingClientRect();
            if (rect) setBox({
                width: rect.width,
                height: rect.height
            });
        };
        let timer = null;
        const onResize = ()=>{
            if (timer) clearTimeout(timer);
            timer = setTimeout(measure, 200);
        };
        measure();
        window.addEventListener('resize', onResize);
        return ()=>{
            if (timer) clearTimeout(timer);
            window.removeEventListener('resize', onResize);
        };
    }, []);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!ref.current) return;
        const instance = new Scrambler(ref.current, duration, chars);
        scrambler.current = instance;
        instance.reset();
        return ()=>{
            instance.disable();
            scrambler.current = null;
        };
    }, [
        chars,
        duration
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!scrambler.current || !animate) return;
        if (restart !== undefined) scrambler.current.reset();
        if (!delay) {
            scrambler.current.animate(text);
            return;
        }
        const timer = setTimeout(()=>scrambler.current?.animate(text), delay * 1000);
        return ()=>clearTimeout(timer);
    }, [
        animate,
        delay,
        text,
        restart
    ]);
    // A hidden tab suspends requestAnimationFrame, which leaves a half-typed word
    // frozen on screen. Replay it as soon as the tab comes back.
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!animate) return;
        const replay = ()=>{
            if (!document.hidden) scrambler.current?.animate(text);
        };
        document.addEventListener('visibilitychange', replay);
        return ()=>document.removeEventListener('visibilitychange', replay);
    }, [
        animate,
        text
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Box"], {
        as: "span",
        display: "inline-block",
        style: {
            minHeight: `${box.height / 16}rem`,
            minWidth: `${box.width / 16}rem`
        },
        ref: ref,
        ...rest,
        children: initialText
    }, void 0, false, {
        fileName: "[project]/servicios-lib/components/ui/ScrambleText.tsx",
        lineNumber: 175,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/servicios-lib/components/home/AnimatedHeading.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "AnimatedHeading",
    ()=>AnimatedHeading
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__ = __turbopack_context__.i("[externals]/@chakra-ui/react [external] (@chakra-ui/react, esm_import, [project]/node_modules/@chakra-ui/react)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/home/constants.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/home/motion.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$ui$2f$ScrambleText$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/ui/ScrambleText.tsx [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$ui$2f$ScrambleText$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$ui$2f$ScrambleText$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
/**
 * Chakra v2's `Heading` resolves its `as`-prop overload via a conditional
 * type that, combined with React 19's `ElementType`, blows past TypeScript's
 * instantiation-depth limit (TS2590) when `as` is given a union of tag names.
 * Widening the component reference to a plain `ComponentType` sidesteps the
 * overload resolution; the `as` prop is still read and honoured at runtime by
 * Chakra exactly as before.
 */ const AsHeading = __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Heading"];
/** The tinted bar wipes in from the left; the text starts once it is half open. */ const barVariants = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["VARIANTS"].hidden]: {
        scaleX: 0
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["VARIANTS"].visible]: (delay)=>({
            scaleX: 1,
            transition: {
                duration: 0.8,
                ease: [
                    0.25,
                    0,
                    0,
                    1
                ],
                delay
            }
        })
};
function AnimatedHeading({ children, type = 'h2', delay = 0, ...rest }) {
    const [textVisible, setTextVisible] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(AsHeading, {
        as: type,
        pos: "relative",
        h: "2.1875rem",
        pl: {
            base: '0.625rem',
            xl: '0.75rem'
        },
        fontSize: "0.75rem",
        fontWeight: "semibold",
        lineHeight: "2.1875rem",
        textTransform: "uppercase",
        letterSpacing: "widest",
        ...rest,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["MotionSpan"], {
                pos: "absolute",
                top: "0",
                left: "0",
                w: "100%",
                h: "100%",
                bg: "rgba(255,255,255,0.08)",
                transformOrigin: "left",
                variants: barVariants,
                custom: delay,
                onUpdate: ({ scaleX })=>setTextVisible(Number(scaleX) > 0.5)
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/home/AnimatedHeading.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$ui$2f$ScrambleText$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["ScrambleText"], {
                text: children,
                animate: textVisible
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/home/AnimatedHeading.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/servicios-lib/components/home/AnimatedHeading.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/servicios-lib/components/background/config.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "BACKGROUND_COLOR",
    ()=>BACKGROUND_COLOR,
    "BACKGROUND_LAYERS",
    ()=>BACKGROUND_LAYERS,
    "BLOOM",
    ()=>BLOOM,
    "CAMERA",
    ()=>CAMERA,
    "FLUX_DEFAULTS",
    ()=>FLUX_DEFAULTS,
    "FLUX_GROUP",
    ()=>FLUX_GROUP,
    "FLUX_INITIAL_TRANSITION",
    ()=>FLUX_INITIAL_TRANSITION,
    "FLUX_INITIAL_TRANSLATION_SHIFT",
    ()=>FLUX_INITIAL_TRANSLATION_SHIFT,
    "GRID_PASS",
    ()=>GRID_PASS,
    "GRID_PASS_TOUCH",
    ()=>GRID_PASS_TOUCH,
    "INTRO",
    ()=>INTRO,
    "MAX_PIXEL_RATIO",
    ()=>MAX_PIXEL_RATIO,
    "PAGE_PRESETS",
    ()=>PAGE_PRESETS,
    "POINTER_VELOCITY",
    ()=>POINTER_VELOCITY,
    "SECOND_FLUX",
    ()=>SECOND_FLUX,
    "TEXTURE_URLS",
    ()=>TEXTURE_URLS
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__ = __turbopack_context__.i("[externals]/three [external] (three, esm_import, [project]/node_modules/three)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const MAX_PIXEL_RATIO = 1.6;
const CAMERA = {
    fov: 50,
    near: 1,
    far: 1000,
    position: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector3"](0, 0, 10),
    /** Pointer parallax applied to the camera, in world units per half-screen. */ parallaxVelocity: [
        0.21,
        -0.21
    ]
};
const POINTER_VELOCITY = 0.15;
const BACKGROUND_COLOR = {
    color1: '#0a1a1f',
    sphereScale: 800
};
const FLUX_DEFAULTS = {
    particleNbr: 50000,
    particleTranslationSpeedMax: 3,
    particleScale: 0.002,
    blending: true,
    depthWrite: false,
    color: '#C8F6F5',
    opacity: 1,
    scale: 2.5,
    torsionStrenght: 10,
    waveShift: 1.8,
    waveLength: 5,
    waveStrenght: 1.5,
    minorWaveSpeed: 5,
    minorWaveLength: 18,
    minorWaveStrenght: 0.2,
    speed: 1e-4,
    rotationSpeed: 12,
    translationSpeed: 1,
    progressOpacity: 0.6,
    explodeStrenght: 1.5
};
const SECOND_FLUX = {
    blending: false,
    opacity: 1.1,
    particleNbr: FLUX_DEFAULTS.particleNbr * 0.5,
    particleScale: 0.003,
    speed: FLUX_DEFAULTS.speed,
    rotationSpeed: FLUX_DEFAULTS.rotationSpeed * 0.5
};
const FLUX_GROUP = {
    transitionDuration: 2.2,
    transitionStrenght: 1.75,
    directionVelocityDuringAnimation: 0.012,
    directionIncrementDuringAnimation: -0.3,
    slideTransitionVelocity: 0.1,
    directionVelocity: 0.1,
    directionShift: 1e-4
};
const FLUX_INITIAL_TRANSITION = 4;
const FLUX_INITIAL_TRANSLATION_SHIFT = -100;
const BACKGROUND_LAYERS = {
    opacity: 0.15,
    floatingYStrenght: 2,
    waveRotationStrenght: 0.25,
    speed: 0.002,
    layers: [
        {
            position: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector3"](-6, -1, 2),
            rotation: 2.6,
            opacity: 0.3,
            scale: 9
        },
        {
            position: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector3"](-18, -14, -16),
            rotation: 4.4,
            opacity: 0.4,
            scale: 26
        },
        {
            position: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector3"](50, -12, -100),
            rotation: 2.5,
            opacity: 0.3,
            scale: 100
        },
        {
            position: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector3"](16, -19, -5),
            rotation: 4.6,
            opacity: 0.3,
            scale: 25
        }
    ]
};
const BLOOM = {
    strength: 0.65,
    radius: 0.4,
    threshold: 0.15
};
const GRID_PASS = {
    brightness: -0.28,
    contrast: 0.4,
    /** Target opacity of the whole composite; animated up from 0 by the intro. */ opacity: 0.8,
    vignetteRadius: 1.1,
    vignetteStrenght: 1.15,
    interactVignetteRadius: 1,
    interactVignetteStrenght: 4,
    interactMouseRadius: 0.9,
    interactMouseStrenght: 2,
    interactStrenght: 0.02,
    gridScale: 3
};
const GRID_PASS_TOUCH = {
    vignetteRadius: 0.64,
    vignetteStrenght: 1.32
};
const INTRO = {
    gridDuration: 2,
    gridDelay: 0,
    fluxDuration: 3,
    fluxDelay: 0.5,
    /** Duration of the camera / lookAt move towards a page preset. */ cameraDuration: 2
};
const TEXTURE_URLS = {
    flow: '/textures/flow-texture.png',
    grid: '/textures/grid-texture.png',
    shift: '/textures/shift-texture.png',
    background: '/textures/background-texture.png'
};
const PAGE_PRESETS = {
    index: {
        cameraPosition: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector3"](0, 0, 10),
        cameraLookAt: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector3"](0, 0, 0),
        fluxPosition: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector3"](3.9, 1.2, 2.8),
        fluxDirection: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector3"](-15, -8, 13),
        waveStrenght: 0.1
    },
    play: {
        cameraPosition: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector3"](0.22, -0.4, 8.04),
        cameraLookAt: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector3"](3.76, -0.59, 0),
        fluxPosition: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector3"](3.1, 1.1, 2.8),
        fluxDirection: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector3"](-15, -8, 13),
        waveStrenght: 0.4
    },
    stats: {
        cameraPosition: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector3"](-1.3, 0.67, 10),
        cameraLookAt: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector3"](1.27, 0.45, 0.68),
        fluxPosition: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector3"](-2.2, 1.4, 2),
        fluxDirection: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector3"](6, -8, 13),
        waveStrenght: 0.35
    },
    leaderboard: {
        cameraPosition: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector3"](4, 1.93, 9.4),
        cameraLookAt: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector3"](1.47, -0.82, -5),
        fluxPosition: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector3"](3.9, 1.2, 2.8),
        fluxDirection: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector3"](-15, -8, 13),
        waveStrenght: 0.15
    },
    globalLeaderboard: {
        cameraPosition: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector3"](4, 1.93, 9.4),
        cameraLookAt: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector3"](1.47, -0.82, -5),
        fluxPosition: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector3"](3.9, 1.2, 2.8),
        fluxDirection: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector3"](-15, -8, 13),
        waveStrenght: 0.15
    },
    accountSettings: {
        cameraPosition: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector3"](0.5, 0.67, 8.7),
        cameraLookAt: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector3"](0.67, -1, 0),
        fluxPosition: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector3"](3.3, 1.2, 2.8),
        fluxDirection: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector3"](-15, -8, 13),
        waveStrenght: 0.1
    }
};
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/servicios-lib/components/background/assets.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "disposeBackgroundAssets",
    ()=>disposeBackgroundAssets,
    "loadBackgroundAssets",
    ()=>loadBackgroundAssets
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__ = __turbopack_context__.i("[externals]/three [external] (three, esm_import, [project]/node_modules/three)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/config.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const loadTexture = (loader, url)=>new Promise((resolve, reject)=>{
        loader.load(url, resolve, undefined, ()=>reject(new Error(`Failed to load texture: ${url}`)));
    });
const loadImage = (url)=>new Promise((resolve, reject)=>{
        const image = new Image();
        image.crossOrigin = 'anonymous';
        image.onload = ()=>resolve(image);
        image.onerror = ()=>reject(new Error(`Failed to load image: ${url}`));
        image.src = url;
    });
const toImageData = (image)=>{
    const { width, height } = image;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Could not acquire a 2D context for the flow texture');
    context.drawImage(image, 0, 0, width, height);
    return context.getImageData(0, 0, width, height);
};
const loadBackgroundAssets = async ()=>{
    const loader = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["TextureLoader"]();
    const [flowImage, gridTexture, shiftTexture, backgroundTexture] = await Promise.all([
        loadImage(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["TEXTURE_URLS"].flow),
        loadTexture(loader, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["TEXTURE_URLS"].grid),
        loadTexture(loader, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["TEXTURE_URLS"].shift),
        loadTexture(loader, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["TEXTURE_URLS"].background)
    ]);
    // The grid pass samples both of these well outside 0..1.
    gridTexture.wrapS = __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["RepeatWrapping"];
    gridTexture.wrapT = __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["RepeatWrapping"];
    shiftTexture.wrapS = __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["RepeatWrapping"];
    shiftTexture.wrapT = __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["RepeatWrapping"];
    return {
        flowImageData: toImageData(flowImage),
        gridTexture,
        shiftTexture,
        backgroundTexture
    };
};
const disposeBackgroundAssets = (assets)=>{
    assets.gridTexture.dispose();
    assets.shiftTexture.dispose();
    assets.backgroundTexture.dispose();
};
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/servicios-lib/components/background/shaders/lib.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Shared GLSL helpers.
 *
 * The original bundle keeps these as standalone template literals and splices
 * them into each shader, so they are reproduced here the same way.
 */ /** Rotates a point around (0.5, 0.5). Injected into the two instanced vertex shaders. */ __turbopack_context__.s([
    "drawRadialGradient",
    ()=>drawRadialGradient,
    "drawVignette",
    ()=>drawVignette,
    "rotate2D",
    ()=>rotate2D
]);
const rotate2D = /* glsl */ `
vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}
`;
const drawVignette = /* glsl */ `
  float drawVignette(vec2 center, vec2 currentPosition, float scale, float strength) {
    float dist = distance(center, currentPosition) + 0.5 - scale;
    return max(0.0, dist) * strength;
  }
`;
const drawRadialGradient = /* glsl */ `
  float drawRadialGradient(vec2 center, vec2 currentPosition, float scale, float strength) {
    float dist = distance(center, currentPosition) * (2.0 / scale);
    return (1.0 - min(1., dist)) * strength;
  }
`;
}),
"[project]/servicios-lib/components/background/shaders/flux.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fluxFragmentShader",
    ()=>fluxFragmentShader,
    "fluxVertexShader",
    ()=>fluxVertexShader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$lib$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/shaders/lib.ts [ssr] (ecmascript)");
;
const fluxVertexShader = /* glsl */ `
        attribute vec2 _variation;
        attribute vec2 _explodeVariation;
        attribute float _progress;
        attribute float _speed;
        attribute float _opacity;

        // Particle
        uniform float particleScale;

        // Global Shape
        uniform float scale;
        uniform vec3 direction;
        uniform float torsionStrenght;
        uniform float waveShift;
        uniform float waveLength;
        uniform float waveStrenght;
        uniform float minorWaveSpeed;
        uniform float minorWaveLength;
        uniform float minorWaveStrenght;

        // Animation
        uniform float time;
        uniform float rotationSpeed;
        uniform float translationSpeed;

        // Interaction
        uniform float rotationShift;
        uniform float translationShift;

        uniform float transition;
        uniform float explodeStrenght;

        varying vec2 vUv;
        varying float vOpacity;
        varying float vProgress;

        ${__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$lib$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["rotate2D"]}

        void main () {
          vUv = vec2(
            position.x * 0.5 + 0.5,
            position.y * 0.5 + 0.5
          );

          // --- PROGRESS: The position in the flux from -0.5 to 0.5
          float progress = mod(_progress + time * _speed * translationSpeed + translationShift, 1.0) - 0.5;

          // Define the transformed position
          vec3 transformed = position;

          // particle Scale
          transformed *= particleScale;

          // Increase the scale of transparent particles
          if (_opacity < 1.) {
            transformed *= 4. * _opacity;
          }

          // Apply a unique position in the flux based on progress and the direction needed
          transformed += direction * progress;

          // --- VARIATION: Apply the variations
          vec2 variation = _variation;

          // Explode transition
          variation += transition * _explodeVariation * explodeStrenght;

          // Rotate around the central axis
          variation = rotate2D(variation, progress * torsionStrenght + (time * rotationSpeed) + rotationShift);

          // Global Scale
          variation *= scale;

          // Main Wavy flux
          variation.xy += cos((waveShift + progress) * waveLength) * waveStrenght;

          // Minor wavy flux
          variation.xy += sin((minorWaveSpeed * time + progress) * minorWaveLength) * minorWaveStrenght;

          // --- FINAL: Apply the unique variations from X and Y for each particles
          transformed.xy += variation;

          vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
          gl_Position = projectionMatrix * mvPosition;

          vOpacity = _opacity;
          vProgress = progress;
        }
`;
const fluxFragmentShader = /* glsl */ `
      // Global Shape
      uniform vec3 color;
      uniform float opacity;
      // Interaction
      uniform float transitionOpacity;
      uniform float progressOpacity;

      varying vec2 vUv;
      varying float vOpacity;
      varying float vProgress;

      void main() {
        if ( length( vUv - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
        vec4 transformed = vec4(color, vOpacity * opacity * transitionOpacity);

        // Apply a color variation along the flux
        transformed.a -= transformed.a * (1.0 - vProgress) * progressOpacity;

        gl_FragColor = transformed;
      }
`;
}),
"[project]/servicios-lib/components/background/shaders/backgroundLayers.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "backgroundLayersFragmentShader",
    ()=>backgroundLayersFragmentShader,
    "backgroundLayersVertexShader",
    ()=>backgroundLayersVertexShader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$lib$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/shaders/lib.ts [ssr] (ecmascript)");
;
const backgroundLayersVertexShader = /* glsl */ `
        attribute vec3 _position;
        attribute float _rotation;
        attribute float _scale;
        attribute float _opacity;

        uniform float time;
        uniform float floatingYStrenght;
        uniform float waveRotationStrenght;

        varying vec2 vUv;
        varying float vOpacity;

        ${__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$lib$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["rotate2D"]}

        void main () {
          vec3 transformed = position;

          // Time variation
          float timeVariation = sin(_scale + time);

          // Scale
          transformed *= _scale;
          transformed.x *= 2.0;

          // Rotation
          transformed.xy = rotate2D(transformed.xy, _rotation + timeVariation * waveRotationStrenght);

          // Position
          transformed += _position;

          // Wave effect
          transformed.y += timeVariation * floatingYStrenght;

          vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
          gl_Position = projectionMatrix * mvPosition;

          vOpacity = _opacity;
          vUv = vec2(
            position.x * 0.5 + 0.5,
            position.y * 0.5 + 0.5
          );
        }
`;
const backgroundLayersFragmentShader = /* glsl */ `
        uniform sampler2D map;

        varying vec2 vUv;
        varying float vOpacity;

        void main() {
          float alpha = 1.0 - texture2D(map, vUv).x;
          alpha *= vOpacity;

          gl_FragColor = vec4(vec3(0.0), alpha);
        }
`;
}),
"[project]/servicios-lib/components/background/shaders/backgroundColor.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Solid backdrop, drawn on the inside of a large sphere.
 *
 * The color1 -> color2 crossfade is present but commented out in the shipped
 * bundle, so only `color1` is ever visible. Kept verbatim.
 */ __turbopack_context__.s([
    "backgroundColorFragmentShader",
    ()=>backgroundColorFragmentShader,
    "backgroundColorVertexShader",
    ()=>backgroundColorVertexShader
]);
const backgroundColorVertexShader = /* glsl */ `
      precision highp float;

      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }
`;
const backgroundColorFragmentShader = /* glsl */ `
      precision highp float;

      uniform vec3 color1;
      uniform vec3 color2;
      uniform float transition;

      void main() {
        gl_FragColor = vec4(color1, 1.0);
        // gl_FragColor = vec4(mix(color1, color2, transition), 1.0);
      }
`;
}),
"[project]/servicios-lib/components/background/shaders/gridFinalPass.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VIGNETTE_STYLE_POINTER",
    ()=>VIGNETTE_STYLE_POINTER,
    "VIGNETTE_STYLE_TOUCH",
    ()=>VIGNETTE_STYLE_TOUCH,
    "createGridFinalPassFragmentShader",
    ()=>createGridFinalPassFragmentShader,
    "gridFinalPassVertexShader",
    ()=>gridFinalPassVertexShader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$lib$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/shaders/lib.ts [ssr] (ecmascript)");
;
const gridFinalPassVertexShader = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;
/**
 * The original assembles this fragment shader out of a generic pass template
 * plus three injected chunks (`fragUniforms`, `fragUv`, `fragTransform`), and
 * swaps a single expression -- the vignette -- between pointer and touch
 * devices. That structure is preserved so the touch variant stays a one-line
 * substitution rather than a second copy of the shader.
 */ const template = ({ fragUniforms, fragUv, fragTransform })=>/* glsl */ `
  uniform sampler2D tDiffuse;

  varying vec2 vUv;

  ${fragUniforms}

  void main() {
    vec2 uv = vUv;

    ${fragUv}

    vec4 transformed = texture2D(tDiffuse, uv);

    ${fragTransform}

    gl_FragColor = transformed;
  }
`;
const VIGNETTE_STYLE_POINTER = 'max(0.0, 1.0 - pow(abs(uv.x * 2.0 - 1.0) * vignetteStrenght, vignetteRadius))';
const VIGNETTE_STYLE_TOUCH = '1.0 - drawVignette(vec2(0.5, 0.5), uv, vignetteRadius, vignetteStrenght)';
const createGridFinalPassFragmentShader = (vignetteStyle)=>template({
        fragUniforms: /* glsl */ `
          uniform vec2 mousePosition;

          uniform float interactVignetteRadius;
          uniform float interactVignetteStrenght;
          uniform float interactMouseRadius;
          uniform float interactMouseStrenght;
          uniform float interactStrenght;

          uniform float vignetteRadius;
          uniform float vignetteStrenght;

          uniform sampler2D tShift;
          uniform sampler2D tGrid;

          uniform float gridScale;
          uniform float gridRatio;

          // FINAL PASS
          uniform float brightness;
          uniform float contrast;
          uniform float opacity;

          ${__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$lib$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["drawVignette"]}
          ${__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$lib$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["drawRadialGradient"]}
        `,
        fragUv: /* glsl */ `
          // Compute the squaredUv
          vec2 squaredUv = uv;
          squaredUv.x *= gridRatio;

          // Interactive Zone
          vec2 reversedMousePos = 0.5 - mousePosition;
          float interactiveZone = drawVignette(reversedMousePos, uv, interactVignetteRadius, interactVignetteStrenght);
          vec2 squaredMousePos = mousePosition + 0.5;
          squaredMousePos.x *= gridRatio;
          interactiveZone *= drawRadialGradient(squaredMousePos, squaredUv, interactMouseRadius, interactMouseStrenght);
          interactiveZone *= interactStrenght;

          // Grid texture
          squaredUv *= gridScale;
          squaredUv -= mousePosition * 0.1;
          vec2 shiftTexture = texture2D(tShift, squaredUv).xy - 0.5;

          // Apply a shift on the Uvs to have some parts shifted
          uv += shiftTexture * interactiveZone;
        `,
        fragTransform: /* glsl */ `
          // GLOBAL PASS
          transformed += brightness;
          transformed = (transformed - 0.5) / (1.0 - contrast) + 0.5;

          // GRID
          transformed += texture2D(tGrid, squaredUv).x * 0.5;

          // VIGNETTE
          float vignette = ${vignetteStyle};
          transformed *= vignette;

          // OPACITY
          transformed *= opacity;
        `
    });
}),
"[project]/servicios-lib/components/background/shaders/index.ts [ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$lib$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/shaders/lib.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$flux$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/shaders/flux.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$backgroundLayers$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/shaders/backgroundLayers.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$backgroundColor$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/shaders/backgroundColor.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$gridFinalPass$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/shaders/gridFinalPass.ts [ssr] (ecmascript)");
;
;
;
;
;
}),
"[project]/servicios-lib/components/background/backgroundColor.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "BackgroundColor",
    ()=>BackgroundColor
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__ = __turbopack_context__.i("[externals]/three [external] (three, esm_import, [project]/node_modules/three)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/config.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/shaders/index.ts [ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$backgroundColor$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/shaders/backgroundColor.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
class BackgroundColor extends __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Mesh"] {
    constructor(color1 = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["BACKGROUND_COLOR"].color1, color2 = color1){
        super(new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["SphereGeometry"](1, 32, 16), new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["ShaderMaterial"]({
            side: __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["BackSide"],
            uniforms: {
                color1: {
                    value: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Color"](color1)
                },
                color2: {
                    value: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Color"](color2)
                },
                transition: {
                    value: 0
                }
            },
            vertexShader: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$backgroundColor$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["backgroundColorVertexShader"],
            fragmentShader: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$backgroundColor$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["backgroundColorFragmentShader"]
        }));
        this.scale.multiplyScalar(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["BACKGROUND_COLOR"].sphereScale);
    }
    dispose() {
        this.geometry.dispose();
        this.material.dispose();
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/servicios-lib/components/background/geometry.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "InstancedQuadGeometry",
    ()=>InstancedQuadGeometry,
    "createQuadGeometry",
    ()=>createQuadGeometry
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__ = __turbopack_context__.i("[externals]/three [external] (three, esm_import, [project]/node_modules/three)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
/** Two triangles spanning -1..1 on XY. Both instanced passes share this quad. */ const QUAD_VERTICES = [
    -1,
    -1,
    0,
    1,
    -1,
    0,
    1,
    1,
    0,
    -1,
    -1,
    0,
    1,
    1,
    0,
    -1,
    1,
    0
];
const createQuadGeometry = ()=>{
    const geometry = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["BufferGeometry"]();
    geometry.setAttribute('position', new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["BufferAttribute"](new Float32Array(QUAD_VERTICES), 3));
    return geometry;
};
class InstancedQuadGeometry extends __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["InstancedBufferGeometry"] {
    maxInstancedCount;
    constructor(source, count){
        super();
        this.maxInstancedCount = count;
        this.instanceCount = count;
        Object.keys(source.attributes).forEach((name)=>{
            this.setAttribute(name, source.attributes[name].clone());
        });
        this.groups = [
            ...source.groups
        ];
        this.setIndex(source.getIndex());
    }
    createAttribute(name, itemSize) {
        const attribute = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["InstancedBufferAttribute"](new Float32Array(this.maxInstancedCount * itemSize), itemSize);
        this.setAttribute(name, attribute);
        return attribute;
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/servicios-lib/components/background/backgroundLayers.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "BackgroundLayers",
    ()=>BackgroundLayers
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__ = __turbopack_context__.i("[externals]/three [external] (three, esm_import, [project]/node_modules/three)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/config.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$geometry$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/geometry.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/shaders/index.ts [ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$backgroundLayers$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/shaders/backgroundLayers.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$geometry$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$geometry$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
class BackgroundLayers extends __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Mesh"] {
    constructor(map){
        const { layers } = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["BACKGROUND_LAYERS"];
        const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$geometry$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["InstancedQuadGeometry"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$geometry$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["createQuadGeometry"])(), layers.length);
        const position = geometry.createAttribute('_position', 3);
        const rotation = geometry.createAttribute('_rotation', 1);
        const scale = geometry.createAttribute('_scale', 1);
        const opacity = geometry.createAttribute('_opacity', 1);
        layers.forEach((layer, i)=>{
            position.setXYZ(i, layer.position.x, layer.position.y, layer.position.z);
            scale.setX(i, layer.scale);
            rotation.setX(i, layer.rotation);
            opacity.setX(i, layer.opacity * __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["BACKGROUND_LAYERS"].opacity);
        });
        super(geometry, new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["ShaderMaterial"]({
            transparent: true,
            depthWrite: false,
            uniforms: {
                map: {
                    value: map
                },
                time: {
                    value: 0
                },
                floatingYStrenght: {
                    value: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["BACKGROUND_LAYERS"].floatingYStrenght
                },
                waveRotationStrenght: {
                    value: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["BACKGROUND_LAYERS"].waveRotationStrenght
                }
            },
            vertexShader: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$backgroundLayers$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["backgroundLayersVertexShader"],
            fragmentShader: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$backgroundLayers$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["backgroundLayersFragmentShader"]
        }));
        this.frustumCulled = false;
    }
    update = ()=>{
        this.material.uniforms.time.value += __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["BACKGROUND_LAYERS"].speed;
    };
    dispose() {
        this.geometry.dispose();
        this.material.dispose();
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/servicios-lib/components/background/tween.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * A tiny tween runner.
 *
 * The original drives its uniform animations with framer-motion's imperative
 * `animate()`, which owns its own rAF loop. Here the tweens are stepped from
 * the scene's render loop instead, so that hiding the tab freezes the
 * animations along with the rendering rather than letting them run on unseen.
 */ __turbopack_context__.s([
    "TweenManager",
    ()=>TweenManager,
    "animateVector2",
    ()=>animateVector2,
    "animateVector3",
    ()=>animateVector3,
    "cubicBezier",
    ()=>cubicBezier,
    "easeInOut",
    ()=>easeInOut,
    "easeOut",
    ()=>easeOut,
    "fluxTransitionEase",
    ()=>fluxTransitionEase
]);
const NEWTON_ITERATIONS = 8;
const SUBDIVISION_EPSILON = 1e-7;
const bezier = (t, a, b)=>(((1 - 3 * b + 3 * a) * t + (3 * b - 6 * a)) * t + 3 * a) * t;
const bezierSlope = (t, a, b)=>3 * (1 - 3 * b + 3 * a) * t * t + 2 * (3 * b - 6 * a) * t + 3 * a;
const cubicBezier = (x1, y1, x2, y2)=>{
    if (x1 === y1 && x2 === y2) return (t)=>t;
    return (t)=>{
        if (t <= 0) return 0;
        if (t >= 1) return 1;
        let guess = t;
        for(let i = 0; i < NEWTON_ITERATIONS; i += 1){
            const slope = bezierSlope(guess, x1, x2);
            if (Math.abs(slope) < SUBDIVISION_EPSILON) break;
            guess -= (bezier(guess, x1, x2) - t) / slope;
        }
        return bezier(guess, y1, y2);
    };
};
const easeOut = cubicBezier(0, 0, 0.58, 1);
const easeInOut = cubicBezier(0.42, 0, 0.58, 1);
const fluxTransitionEase = cubicBezier(0.2, 0.4, 0.35, 1);
class TweenManager {
    tweens = [];
    animate(from, to, options) {
        const tween = {
            from,
            to,
            duration: options.duration,
            delay: options.delay ?? 0,
            ease: options.ease ?? easeOut,
            elapsed: 0,
            stopped: false,
            onUpdate: options.onUpdate,
            onComplete: options.onComplete,
            stop: ()=>{
                tween.stopped = true;
            }
        };
        this.tweens.push(tween);
        return tween;
    }
    /** Advances every running tween by `delta` seconds. */ update(delta) {
        if (this.tweens.length === 0) return;
        for(let i = this.tweens.length - 1; i >= 0; i -= 1){
            const tween = this.tweens[i];
            if (tween.stopped) {
                this.tweens.splice(i, 1);
                continue;
            }
            tween.elapsed += delta;
            const time = tween.elapsed - tween.delay;
            if (time < 0) continue;
            const progress = tween.duration > 0 ? Math.min(1, time / tween.duration) : 1;
            tween.onUpdate(tween.from + (tween.to - tween.from) * tween.ease(progress));
            if (progress >= 1) {
                this.tweens.splice(i, 1);
                tween.onComplete?.();
            }
        }
    }
    stopAll() {
        this.tweens.length = 0;
    }
}
const animateVector3 = (manager, target, to, duration, ease = easeOut)=>{
    manager.animate(target.x, to.x, {
        duration,
        ease,
        onUpdate: (v)=>target.x = v
    });
    manager.animate(target.y, to.y, {
        duration,
        ease,
        onUpdate: (v)=>target.y = v
    });
    manager.animate(target.z, to.z, {
        duration,
        ease,
        onUpdate: (v)=>target.z = v
    });
};
const animateVector2 = (manager, target, to, duration, ease = easeOut)=>{
    manager.animate(target.x, to.x, {
        duration,
        ease,
        onUpdate: (v)=>target.x = v
    });
    manager.animate(target.y, to.y, {
        duration,
        ease,
        onUpdate: (v)=>target.y = v
    });
};
}),
"[project]/servicios-lib/components/background/cameraControl.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "CameraControl",
    ()=>CameraControl
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__ = __turbopack_context__.i("[externals]/three [external] (three, esm_import, [project]/node_modules/three)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/config.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$tween$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/tween.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
class CameraControl {
    initialPosition;
    lookAt = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector3"]();
    camera;
    tweens;
    constructor(camera, tweens){
        this.camera = camera;
        this.tweens = tweens;
        this.initialPosition = {
            x: camera.position.x,
            y: camera.position.y,
            z: camera.position.z
        };
    }
    animatePosition(position, lookAt) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$tween$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["animateVector3"])(this.tweens, this.initialPosition, position, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["INTRO"].cameraDuration, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$tween$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["easeOut"]);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$tween$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["animateVector3"])(this.tweens, this.lookAt, lookAt, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["INTRO"].cameraDuration, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$tween$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["easeOut"]);
    }
    update(normalX, normalY) {
        const [velocityX, velocityY] = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CAMERA"].parallaxVelocity;
        this.camera.position.x = this.initialPosition.x + normalX * velocityX;
        this.camera.position.y = this.initialPosition.y + normalY * velocityY;
        this.camera.position.z = this.initialPosition.z;
        this.camera.lookAt(this.lookAt);
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/servicios-lib/components/background/flux.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "Flux",
    ()=>Flux,
    "FluxGroup",
    ()=>FluxGroup
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__ = __turbopack_context__.i("[externals]/three [external] (three, esm_import, [project]/node_modules/three)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/config.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$geometry$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/geometry.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/shaders/index.ts [ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$flux$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/shaders/flux.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$tween$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/tween.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$geometry$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$geometry$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
/**
 * Rejection-samples a point out of the flow texture: the brighter a texel's red
 * channel, the likelier a particle lands on it.
 *
 * The original indexes rows by `width` rather than `height`; since every source
 * texture is square that is equivalent, and it is kept as-is. The attempt cap
 * replaces the original's unbounded recursion, which would blow the stack on a
 * texture that happened to be mostly black.
 */ const sampleVariation = (imageData)=>{
    const { width, data } = imageData;
    for(let attempt = 0; attempt < 64; attempt += 1){
        const x = Math.random();
        const y = Math.random();
        const index = (Math.floor(width * y) * width + Math.floor(width * x)) * 4;
        if (Math.random() < data[index] / 255) return {
            x,
            y: 1 - y
        };
    }
    return {
        x: 0.5,
        y: 0.5
    };
};
class Flux extends __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Mesh"] {
    color;
    tweens;
    speed;
    animateControls = null;
    animateControlsWave = null;
    constructor(tweens, options){
        const { fluxImageData, direction, particleNbr = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].particleNbr, particleTranslationSpeedMax = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].particleTranslationSpeedMax, particleScale = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].particleScale, blending = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].blending, depthWrite = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].depthWrite, color = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].color, opacity = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].opacity, scale = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].scale, torsionStrenght = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].torsionStrenght, waveShift = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].waveShift, waveLength = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].waveLength, waveStrenght = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].waveStrenght, speed = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].speed, rotationSpeed = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].rotationSpeed, translationSpeed = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].translationSpeed, progressOpacity = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].progressOpacity, explodeStrenght = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].explodeStrenght } = options;
        const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$geometry$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["InstancedQuadGeometry"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$geometry$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["createQuadGeometry"])(), particleNbr);
        const variation = geometry.createAttribute('_variation', 2);
        const explodeVariation = geometry.createAttribute('_explodeVariation', 2);
        const progress = geometry.createAttribute('_progress', 1);
        const particleSpeed = geometry.createAttribute('_speed', 1);
        const particleOpacity = geometry.createAttribute('_opacity', 1);
        for(let i = 0; i < particleNbr; i += 1){
            progress.setX(i, __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["MathUtils"].randFloat(0, 1));
            const { x, y } = sampleVariation(fluxImageData);
            variation.setXY(i, x, y);
            explodeVariation.setXY(i, __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["MathUtils"].randFloat(0, 0.5 * x), __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["MathUtils"].randFloat(0, 0.5 * y));
            particleSpeed.setX(i, __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["MathUtils"].randFloat(1, particleTranslationSpeedMax));
            // Anything above 0.6 snaps to fully opaque; the rest stay dim and, per the
            // vertex shader, are drawn larger.
            const alpha = __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["MathUtils"].randFloat(0.4, 1);
            particleOpacity.setX(i, alpha > 0.6 ? 1 : alpha);
        }
        super(geometry, new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["ShaderMaterial"]({
            transparent: true,
            depthWrite,
            blending: blending ? __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["AdditiveBlending"] : __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["NormalBlending"],
            uniforms: {
                particleScale: {
                    value: particleScale
                },
                color: {
                    value: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Color"](color)
                },
                opacity: {
                    value: opacity
                },
                scale: {
                    value: scale
                },
                direction: {
                    value: direction
                },
                torsionStrenght: {
                    value: torsionStrenght
                },
                waveShift: {
                    value: waveShift
                },
                waveLength: {
                    value: waveLength
                },
                waveStrenght: {
                    value: waveStrenght
                },
                minorWaveSpeed: {
                    value: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].minorWaveSpeed
                },
                minorWaveLength: {
                    value: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].minorWaveLength
                },
                minorWaveStrenght: {
                    value: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].minorWaveStrenght
                },
                time: {
                    value: 0
                },
                rotationSpeed: {
                    value: rotationSpeed
                },
                translationSpeed: {
                    value: translationSpeed
                },
                transition: {
                    value: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FLUX_INITIAL_TRANSITION"]
                },
                rotationShift: {
                    value: 0
                },
                transitionOpacity: {
                    value: 0
                },
                translationShift: {
                    value: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FLUX_INITIAL_TRANSLATION_SHIFT"]
                },
                progressOpacity: {
                    value: progressOpacity
                },
                explodeStrenght: {
                    value: explodeStrenght
                }
            },
            vertexShader: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$flux$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["fluxVertexShader"],
            fragmentShader: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$flux$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["fluxFragmentShader"]
        }));
        this.tweens = tweens;
        this.speed = speed;
        this.color = color;
        this.frustumCulled = false;
    }
    abortAnimation() {
        this.animateControls?.stop();
        this.animateControls = null;
    }
    /** Pulls `transition` down to 0, fading the particles in as it goes. */ animateIn(duration, { delay = 0, withOpacity = true } = {}) {
        this.abortAnimation();
        this.visible = true;
        const from = this.material.uniforms.transition.value;
        this.animateControls = this.tweens.animate(from, 0, {
            duration,
            delay,
            ease: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$tween$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["fluxTransitionEase"],
            onUpdate: (value)=>this.updateTransition(value, withOpacity, from)
        });
    }
    animateOut(duration, { delay = 0, multiplier = 1, withOpacity = true, onComplete } = {}) {
        this.abortAnimation();
        const from = this.material.uniforms.transition.value;
        this.animateControls = this.tweens.animate(from, multiplier, {
            duration,
            delay,
            ease: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$tween$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["fluxTransitionEase"],
            onUpdate: (value)=>this.updateTransition(value, withOpacity),
            onComplete
        });
    }
    /**
   * The "explode" transition: `transition` sweeps 0 -> PI and is fed through
   * sin(), so the particles blow apart and settle back. The colour is swapped at
   * the peak, while they are at their most scattered.
   */ animateInOut(duration, { delay = 0, color = this.color, multiplier = 1, withOpacity = true } = {}) {
        this.abortAnimation();
        let swapped = false;
        const from = this.material.uniforms.transition.value;
        this.animateControls = this.tweens.animate(from, Math.PI, {
            duration,
            delay,
            ease: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$tween$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["fluxTransitionEase"],
            onUpdate: (value)=>{
                if (!swapped && value > 0.5 * Math.PI) {
                    swapped = true;
                    this.setColor(color);
                }
                this.updateTransition(Math.sin(value) * multiplier, withOpacity);
            }
        });
    }
    animateWaveStrenght(duration, target = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].minorWaveStrenght) {
        this.animateControlsWave?.stop();
        this.animateControlsWave = this.tweens.animate(this.material.uniforms.minorWaveStrenght.value, target, {
            duration,
            ease: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$tween$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["easeInOut"],
            onUpdate: (value)=>{
                this.material.uniforms.minorWaveStrenght.value = value;
            }
        });
    }
    setColor(color) {
        this.color = color;
        this.material.uniforms.color.value = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Color"](color);
    }
    /**
   * `initial` is the value `transition` started from, so the opacity ramp always
   * spans the full travel of the animation that is driving it.
   */ updateTransition = (value, withOpacity = true, initial = 1)=>{
        this.material.uniforms.transition.value = value;
        if (withOpacity) {
            this.material.uniforms.transitionOpacity.value = 1 - Math.min(1, value / initial);
        }
    };
    updateDirectionShift(shift) {
        this.material.uniforms.translationShift.value = 0.4 * shift;
        this.material.uniforms.rotationShift.value = 10 * shift;
    }
    update = ()=>{
        this.material.uniforms.time.value -= this.speed;
    };
    dispose() {
        this.abortAnimation();
        this.animateControlsWave?.stop();
        this.geometry.dispose();
        this.material.dispose();
    }
}
class FluxGroup extends __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Object3D"] {
    mainFlux;
    secondFlux;
    direction;
    tweens;
    isSliderEnabled;
    slideTransition;
    slideTransitionTargeted;
    directionShift;
    directionShiftTargeted;
    currentDirectionVelocity;
    constructor(tweens, imageData, options){
        super();
        const { position, direction, color, sliderEnabled = false, sliderProgress = 0, directionStrength = 0 } = options;
        this.tweens = tweens;
        this.position.copy(position);
        this.direction = direction.clone();
        this.isSliderEnabled = sliderEnabled;
        this.slideTransition = sliderProgress;
        this.slideTransitionTargeted = sliderProgress;
        this.directionShift = directionStrength;
        this.directionShiftTargeted = directionStrength;
        this.currentDirectionVelocity = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FLUX_GROUP"].directionVelocity;
        const shared = {
            fluxImageData: imageData,
            direction: this.direction
        };
        this.mainFlux = new Flux(tweens, shared);
        this.mainFlux.name = '_mainFlux';
        this.add(this.mainFlux);
        this.secondFlux = new Flux(tweens, {
            ...shared,
            ...__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["SECOND_FLUX"],
            color
        });
        this.secondFlux.name = '_secondFlux';
        this.add(this.secondFlux);
    }
    /** Only the second flux carries the caller's accent colour. */ handleColorChanges(color) {
        this.secondFlux.setColor(color);
    }
    handleSliderProgress(progress, direction) {
        this.slideTransitionTargeted = progress;
        this.directionShiftTargeted += direction * __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FLUX_GROUP"].directionShift;
    }
    handleSliderEnabled(enabled) {
        this.isSliderEnabled = enabled;
        if (enabled) this.currentDirectionVelocity = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FLUX_GROUP"].directionVelocity;
    }
    animateIn(duration, delay, color) {
        this.mainFlux.animateIn(duration, {
            delay
        });
        this.secondFlux.setColor(color);
        this.secondFlux.animateIn(duration, {
            delay
        });
    }
    animateTransition(color) {
        this.isSliderEnabled = false;
        this.mainFlux.animateInOut(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FLUX_GROUP"].transitionDuration, {
            multiplier: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FLUX_GROUP"].transitionStrenght,
            withOpacity: false
        });
        this.secondFlux.animateInOut(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FLUX_GROUP"].transitionDuration, {
            multiplier: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FLUX_GROUP"].transitionStrenght,
            color
        });
        this.currentDirectionVelocity = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FLUX_GROUP"].directionVelocityDuringAnimation;
        this.directionShiftTargeted += __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FLUX_GROUP"].directionIncrementDuringAnimation;
    }
    animatePosition(position, direction, waveStrenght) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$tween$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["animateVector3"])(this.tweens, this.position, position, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FLUX_GROUP"].transitionDuration, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$tween$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["easeOut"]);
        // The Z of the direction is left where it is, exactly as in the original.
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$tween$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["animateVector2"])(this.tweens, this.direction, direction, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FLUX_GROUP"].transitionDuration, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$tween$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["easeOut"]);
        this.mainFlux.animateWaveStrenght(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FLUX_GROUP"].transitionDuration, waveStrenght);
        this.secondFlux.animateWaveStrenght(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FLUX_GROUP"].transitionDuration, waveStrenght);
    }
    update = ()=>{
        this.mainFlux.update();
        this.secondFlux.update();
        if (this.isSliderEnabled) {
            this.slideTransition += (this.slideTransitionTargeted - this.slideTransition) * __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FLUX_GROUP"].slideTransitionVelocity;
            this.mainFlux.updateTransition(this.slideTransition, false);
            this.secondFlux.updateTransition(this.slideTransition);
        }
        this.directionShift += (this.directionShiftTargeted - this.directionShift) * this.currentDirectionVelocity;
        this.mainFlux.updateDirectionShift(this.directionShift);
        this.secondFlux.updateDirectionShift(this.directionShift);
    };
    dispose() {
        this.mainFlux.dispose();
        this.secondFlux.dispose();
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/servicios-lib/components/background/pointer.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "Pointer",
    ()=>Pointer,
    "isTouchDevice",
    ()=>isTouchDevice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/config.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const isTouchDevice = ()=>{
    if ("TURBOPACK compile-time truthy", 1) return false;
    //TURBOPACK unreachable
    ;
    // The last probe is the legacy IE/Edge counterpart the original still checks.
    const legacyTouchPoints = undefined;
};
class Pointer {
    normalX = -0.5;
    normalY = -0.5;
    x = 0;
    y = 0;
    targetX = 0;
    targetY = 0;
    listening = false;
    start() {
        if (this.listening || ("TURBOPACK compile-time value", "undefined") === 'undefined' || isTouchDevice()) return;
        //TURBOPACK unreachable
        ;
    }
    stop() {
        if (!this.listening) return;
        window.removeEventListener('mousemove', this.handleMouseMove);
        this.listening = false;
    }
    /** One lerp step per frame, matching the original's frame-based smoothing. */ update() {
        this.x += (this.targetX - this.x) * __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["POINTER_VELOCITY"];
        this.y += (this.targetY - this.y) * __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["POINTER_VELOCITY"];
        this.normalX = this.x / window.innerWidth - 0.5;
        this.normalY = this.y / window.innerHeight - 0.5;
    }
    handleMouseMove = (event)=>{
        this.targetX = event.clientX;
        this.targetY = event.clientY;
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/servicios-lib/components/background/gridPass.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GridPass",
    ()=>GridPass
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__ = __turbopack_context__.i("[externals]/three [external] (three, esm_import, [project]/node_modules/three)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$ShaderPass$2e$js__$5b$external$5d$__$28$three$2f$examples$2f$jsm$2f$postprocessing$2f$ShaderPass$2e$js$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__ = __turbopack_context__.i("[externals]/three/examples/jsm/postprocessing/ShaderPass.js [external] (three/examples/jsm/postprocessing/ShaderPass.js, esm_import, [project]/node_modules/three)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/config.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$pointer$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/pointer.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/shaders/index.ts [ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$gridFinalPass$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/shaders/gridFinalPass.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$tween$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/tween.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$ShaderPass$2e$js__$5b$external$5d$__$28$three$2f$examples$2f$jsm$2f$postprocessing$2f$ShaderPass$2e$js$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$pointer$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$ShaderPass$2e$js__$5b$external$5d$__$28$three$2f$examples$2f$jsm$2f$postprocessing$2f$ShaderPass$2e$js$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$pointer$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
class GridPass extends __TURBOPACK__imported__module__$5b$externals$5d2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$ShaderPass$2e$js__$5b$external$5d$__$28$three$2f$examples$2f$jsm$2f$postprocessing$2f$ShaderPass$2e$js$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["ShaderPass"] {
    tweens;
    constructor(tweens, textures){
        const touch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$pointer$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["isTouchDevice"])();
        const settings = touch ? {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["GRID_PASS"],
            ...__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["GRID_PASS_TOUCH"]
        } : __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["GRID_PASS"];
        super({
            uniforms: {
                tDiffuse: {
                    value: null
                },
                vignetteRadius: {
                    value: settings.vignetteRadius
                },
                vignetteStrenght: {
                    value: settings.vignetteStrenght
                },
                mousePosition: {
                    value: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector2"]()
                },
                interactVignetteRadius: {
                    value: settings.interactVignetteRadius
                },
                interactVignetteStrenght: {
                    value: settings.interactVignetteStrenght
                },
                interactMouseRadius: {
                    value: settings.interactMouseRadius
                },
                interactMouseStrenght: {
                    value: settings.interactMouseStrenght
                },
                interactStrenght: {
                    value: settings.interactStrenght
                },
                tShift: {
                    value: null
                },
                tGrid: {
                    value: null
                },
                gridScale: {
                    value: settings.gridScale
                },
                gridRatio: {
                    value: 1
                },
                brightness: {
                    value: settings.brightness
                },
                contrast: {
                    value: settings.contrast
                },
                opacity: {
                    value: 0
                }
            },
            vertexShader: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$gridFinalPass$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["gridFinalPassVertexShader"],
            fragmentShader: (0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$gridFinalPass$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["createGridFinalPassFragmentShader"])(touch ? __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$gridFinalPass$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["VIGNETTE_STYLE_TOUCH"] : __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$gridFinalPass$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["VIGNETTE_STYLE_POINTER"])
        });
        this.tweens = tweens;
        this.material.uniforms.tShift.value = textures.shift;
        this.material.uniforms.tGrid.value = textures.grid;
    }
    animateIn(duration, delay = 0) {
        this.tweens.animate(0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["GRID_PASS"].opacity, {
            duration,
            delay,
            ease: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$tween$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["easeOut"],
            onUpdate: (value)=>{
                this.material.uniforms.opacity.value = value;
            }
        });
    }
    /** `normalY` is flipped here because screen Y grows downwards. */ updateMousePosition(normalX, normalY) {
        const mousePosition = this.material.uniforms.mousePosition.value;
        mousePosition.x = normalX;
        mousePosition.y = -normalY;
    }
    resize(viewportWidth, viewportHeight) {
        this.material.uniforms.gridRatio.value = viewportWidth / viewportHeight;
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/servicios-lib/components/background/scene.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "BackgroundScene",
    ()=>BackgroundScene,
    "isWebGLAvailable",
    ()=>isWebGLAvailable
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__ = __turbopack_context__.i("[externals]/three [external] (three, esm_import, [project]/node_modules/three)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$EffectComposer$2e$js__$5b$external$5d$__$28$three$2f$examples$2f$jsm$2f$postprocessing$2f$EffectComposer$2e$js$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__ = __turbopack_context__.i("[externals]/three/examples/jsm/postprocessing/EffectComposer.js [external] (three/examples/jsm/postprocessing/EffectComposer.js, esm_import, [project]/node_modules/three)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$RenderPass$2e$js__$5b$external$5d$__$28$three$2f$examples$2f$jsm$2f$postprocessing$2f$RenderPass$2e$js$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__ = __turbopack_context__.i("[externals]/three/examples/jsm/postprocessing/RenderPass.js [external] (three/examples/jsm/postprocessing/RenderPass.js, esm_import, [project]/node_modules/three)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$UnrealBloomPass$2e$js__$5b$external$5d$__$28$three$2f$examples$2f$jsm$2f$postprocessing$2f$UnrealBloomPass$2e$js$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__ = __turbopack_context__.i("[externals]/three/examples/jsm/postprocessing/UnrealBloomPass.js [external] (three/examples/jsm/postprocessing/UnrealBloomPass.js, esm_import, [project]/node_modules/three)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$assets$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/assets.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$backgroundColor$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/backgroundColor.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$backgroundLayers$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/backgroundLayers.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$cameraControl$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/cameraControl.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/config.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$flux$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/flux.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$gridPass$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/gridPass.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$pointer$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/pointer.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$tween$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/tween.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$EffectComposer$2e$js__$5b$external$5d$__$28$three$2f$examples$2f$jsm$2f$postprocessing$2f$EffectComposer$2e$js$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$RenderPass$2e$js__$5b$external$5d$__$28$three$2f$examples$2f$jsm$2f$postprocessing$2f$RenderPass$2e$js$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$UnrealBloomPass$2e$js__$5b$external$5d$__$28$three$2f$examples$2f$jsm$2f$postprocessing$2f$UnrealBloomPass$2e$js$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$assets$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$backgroundColor$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$backgroundLayers$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$cameraControl$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$flux$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$gridPass$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$pointer$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$EffectComposer$2e$js__$5b$external$5d$__$28$three$2f$examples$2f$jsm$2f$postprocessing$2f$EffectComposer$2e$js$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$RenderPass$2e$js__$5b$external$5d$__$28$three$2f$examples$2f$jsm$2f$postprocessing$2f$RenderPass$2e$js$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$UnrealBloomPass$2e$js__$5b$external$5d$__$28$three$2f$examples$2f$jsm$2f$postprocessing$2f$UnrealBloomPass$2e$js$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$assets$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$backgroundColor$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$backgroundLayers$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$cameraControl$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$flux$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$gridPass$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$pointer$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
;
;
;
;
const isWebGLAvailable = ()=>{
    if ("TURBOPACK compile-time truthy", 1) return false;
    //TURBOPACK unreachable
    ;
};
class BackgroundScene {
    renderer = null;
    scene = null;
    camera = null;
    composer = null;
    assets = null;
    fluxGroup = null;
    backgroundLayers = null;
    backgroundColor = null;
    bloomPass = null;
    gridPass = null;
    cameraControl = null;
    tweens = new __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$tween$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["TweenManager"]();
    pointer = new __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$pointer$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["Pointer"]();
    clock = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Clock"](false);
    fluxColor;
    variant;
    maxPixelRatio;
    pixelRatio = 1;
    width = 0;
    height = 0;
    disposed = false;
    ready = false;
    constructor(options = {}){
        this.fluxColor = options.fluxColor ?? __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].color;
        this.variant = options.variant ?? 'index';
        this.maxPixelRatio = options.maxPixelRatio ?? __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["MAX_PIXEL_RATIO"];
    }
    get isReady() {
        return this.ready;
    }
    async init(canvas) {
        if (this.disposed) return;
        // r134 predates three's colour management, and every value in this scene was
        // authored against that. Turning it off keeps the palette identical.
        __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["ColorManagement"].enabled = false;
        this.renderer = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["WebGLRenderer"]({
            canvas
        });
        this.renderer.outputColorSpace = __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["LinearSRGBColorSpace"];
        this.scene = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Scene"]();
        this.camera = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["PerspectiveCamera"](__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CAMERA"].fov, 1, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CAMERA"].near, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CAMERA"].far);
        this.camera.position.copy(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CAMERA"].position);
        this.measure(canvas);
        this.applySize();
        const assets = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$assets$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["loadBackgroundAssets"])();
        // A dispose() while the textures were in flight.
        if (this.disposed) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$assets$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["disposeBackgroundAssets"])(assets);
            return;
        }
        this.assets = assets;
        const preset = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["PAGE_PRESETS"][this.variant];
        this.fluxGroup = new __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$flux$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FluxGroup"](this.tweens, assets.flowImageData, {
            position: preset.fluxPosition,
            direction: preset.fluxDirection,
            color: this.fluxColor
        });
        this.scene.add(this.fluxGroup);
        this.backgroundColor = new __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$backgroundColor$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["BackgroundColor"]();
        this.scene.add(this.backgroundColor);
        this.backgroundLayers = new __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$backgroundLayers$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["BackgroundLayers"](assets.backgroundTexture);
        this.scene.add(this.backgroundLayers);
        // The composer's own buffer is 8-bit in r134; three now defaults it to half
        // float, which would let the additive flux push the bloom well past what the
        // original ever saw. Dimensions here are provisional -- applyComposerSize()
        // below sets the real ones once every pass is attached.
        const target = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["WebGLRenderTarget"](this.width, this.height, {
            minFilter: __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["LinearFilter"],
            magFilter: __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["LinearFilter"],
            format: __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["RGBAFormat"],
            type: __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["UnsignedByteType"]
        });
        this.composer = new __TURBOPACK__imported__module__$5b$externals$5d2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$EffectComposer$2e$js__$5b$external$5d$__$28$three$2f$examples$2f$jsm$2f$postprocessing$2f$EffectComposer$2e$js$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["EffectComposer"](this.renderer, target);
        this.composer.addPass(new __TURBOPACK__imported__module__$5b$externals$5d2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$RenderPass$2e$js__$5b$external$5d$__$28$three$2f$examples$2f$jsm$2f$postprocessing$2f$RenderPass$2e$js$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["RenderPass"](this.scene, this.camera));
        this.bloomPass = new __TURBOPACK__imported__module__$5b$externals$5d2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$UnrealBloomPass$2e$js__$5b$external$5d$__$28$three$2f$examples$2f$jsm$2f$postprocessing$2f$UnrealBloomPass$2e$js$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["UnrealBloomPass"](new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector2"](this.width, this.height), __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["BLOOM"].strength, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["BLOOM"].radius, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["BLOOM"].threshold);
        this.composer.addPass(this.bloomPass);
        this.gridPass = new __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$gridPass$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["GridPass"](this.tweens, {
            shift: assets.shiftTexture,
            grid: assets.gridTexture
        });
        this.composer.addPass(this.gridPass);
        this.applyComposerSize();
        this.gridPass.resize(this.width, this.height);
        this.cameraControl = new __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$cameraControl$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CameraControl"](this.camera, this.tweens);
        this.cameraControl.lookAt.copy(preset.cameraLookAt);
        this.cameraControl.initialPosition.x = preset.cameraPosition.x;
        this.cameraControl.initialPosition.y = preset.cameraPosition.y;
        this.cameraControl.initialPosition.z = preset.cameraPosition.z;
        this.pointer.start();
        this.clock.start();
        this.ready = true;
    }
    /** Fades the composite up and pulls the particles in out of the explode pose. */ playIntro() {
        if (!this.ready) return;
        this.gridPass?.animateIn(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["INTRO"].gridDuration, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["INTRO"].gridDelay);
        this.fluxGroup?.animateIn(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["INTRO"].fluxDuration, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["INTRO"].fluxDelay, this.fluxColor);
    }
    /**
   * `animate` runs the site's explode transition, swapping the colour at the
   * peak of the blowout; without it the colour changes on the spot.
   */ setFluxColor(color, { animate = false } = {}) {
        this.fluxColor = color;
        if (!this.fluxGroup) return;
        if (animate) this.fluxGroup.animateTransition(color);
        else this.fluxGroup.handleColorChanges(color);
    }
    /**
   * Home-page carousel hooks. While enabled, the fluxes track `progress`
   * directly through their `transition` uniform instead of being tweened, so
   * dragging the slider scatters and re-forms the particles under the pointer.
   */ setSliderEnabled(enabled) {
        this.fluxGroup?.handleSliderEnabled(enabled);
    }
    setSliderProgress(progress, direction) {
        this.fluxGroup?.handleSliderProgress(progress, direction);
    }
    setVariant(variant) {
        this.variant = variant;
        if (!this.ready) return;
        const preset = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["PAGE_PRESETS"][variant];
        this.cameraControl?.animatePosition(preset.cameraPosition, preset.cameraLookAt);
        this.fluxGroup?.animatePosition(preset.fluxPosition, preset.fluxDirection, preset.waveStrenght);
    }
    resize(width, height) {
        if (!this.renderer || !this.camera) return;
        if (width !== undefined && height !== undefined) {
            this.width = Math.max(1, Math.floor(width));
            this.height = Math.max(1, Math.floor(height));
            this.pixelRatio = Math.min(this.maxPixelRatio, window.devicePixelRatio) || 1;
        } else {
            this.measure(this.renderer.domElement);
        }
        this.applySize();
        this.applyComposerSize();
        this.gridPass?.resize(this.width, this.height);
    }
    /** `time` is the rAF timestamp; the scene only needs it to detect stalls. */ render(_time) {
        if (!this.ready || !this.composer) return;
        const delta = this.clock.getDelta();
        this.tweens.update(delta);
        this.pointer.update();
        this.gridPass?.updateMousePosition(this.pointer.normalX, this.pointer.normalY);
        this.cameraControl?.update(this.pointer.normalX, this.pointer.normalY);
        this.fluxGroup?.update();
        this.backgroundLayers?.update();
        this.composer.render(delta);
    }
    /** Call when resuming after a pause so the tweens do not jump a whole gap. */ resetClock() {
        this.clock.getDelta();
    }
    dispose() {
        this.disposed = true;
        this.ready = false;
        this.clock.stop();
        this.pointer.stop();
        this.tweens.stopAll();
        if (this.fluxGroup) {
            this.scene?.remove(this.fluxGroup);
            this.fluxGroup.dispose();
            this.fluxGroup = null;
        }
        if (this.backgroundLayers) {
            this.scene?.remove(this.backgroundLayers);
            this.backgroundLayers.dispose();
            this.backgroundLayers = null;
        }
        if (this.backgroundColor) {
            this.scene?.remove(this.backgroundColor);
            this.backgroundColor.dispose();
            this.backgroundColor = null;
        }
        this.bloomPass?.dispose();
        this.gridPass?.dispose();
        this.composer?.dispose();
        this.renderer?.dispose();
        if (this.assets) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$assets$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["disposeBackgroundAssets"])(this.assets);
            this.assets = null;
        }
        this.bloomPass = null;
        this.gridPass = null;
        this.composer = null;
        this.cameraControl = null;
        this.camera = null;
        this.scene = null;
        this.renderer = null;
    }
    measure(canvas) {
        this.width = Math.max(1, canvas.clientWidth || window.innerWidth);
        this.height = Math.max(1, canvas.clientHeight || window.innerHeight);
        this.pixelRatio = Math.min(this.maxPixelRatio, window.devicePixelRatio) || 1;
    }
    applySize() {
        if (!this.renderer || !this.camera) return;
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setPixelRatio(this.pixelRatio);
        // `false` because the canvas is sized by CSS, not by the renderer.
        this.renderer.setSize(this.width, this.height, false);
    }
    /**
   * EffectComposer multiplies whatever it is given by its own pixel ratio, so it
   * takes CSS pixels here and scales the buffers and every pass itself.
   */ applyComposerSize() {
        if (!this.composer) return;
        this.composer.setPixelRatio(this.pixelRatio);
        this.composer.setSize(this.width, this.height);
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/servicios-lib/components/background/Background.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "Background",
    ()=>Background,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__ = __turbopack_context__.i("[externals]/@chakra-ui/react [external] (@chakra-ui/react, esm_import, [project]/node_modules/@chakra-ui/react)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$scene$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/scene.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$scene$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$scene$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
const Background = ({ fluxColor, variant = 'index', enabled = true })=>{
    const containerRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const sceneRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const loopRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const enabledRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(enabled);
    enabledRef.current = enabled;
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const container = containerRef.current;
        if (!container) return undefined;
        // Nothing to fall back to and nothing to clean up: the container keeps its
        // flat colour and the page carries on without a canvas.
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$scene$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["isWebGLAvailable"])()) return undefined;
        // The canvas is created here rather than in JSX so that every mount gets a
        // fresh one: a canvas hands back the same WebGL context forever, so reusing
        // the element across a remount would hand the new scene the old context.
        const canvas = document.createElement('canvas');
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.display = 'block';
        container.appendChild(canvas);
        const scene = new __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$scene$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["BackgroundScene"]({
            fluxColor,
            variant
        });
        sceneRef.current = scene;
        let frame = 0;
        const loop = (time)=>{
            frame = window.requestAnimationFrame(loop);
            scene.render(time);
        };
        const start = ()=>{
            if (frame !== 0 || document.hidden || !enabledRef.current || !scene.isReady) return;
            // Swallow the gap the pause left behind before stepping again.
            scene.resetClock();
            frame = window.requestAnimationFrame(loop);
        };
        const stop = ()=>{
            if (frame === 0) return;
            window.cancelAnimationFrame(frame);
            frame = 0;
        };
        loopRef.current = {
            start,
            stop
        };
        const handleVisibilityChange = ()=>{
            if (document.hidden) stop();
            else if (scene.isReady) start();
        };
        const observer = new ResizeObserver(()=>scene.resize());
        observer.observe(container);
        document.addEventListener('visibilitychange', handleVisibilityChange);
        scene.init(canvas).then(()=>{
            if (sceneRef.current !== scene) return;
            scene.resize();
            start();
            scene.playIntro();
        }).catch((error)=>{
            console.error('Background scene failed to initialise', error);
            canvas.remove();
        });
        return ()=>{
            stop();
            observer.disconnect();
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            sceneRef.current = null;
            loopRef.current = null;
            scene.dispose();
            canvas.remove();
        };
    // fluxColor and variant are pushed through the imperative API below rather
    // than rebuilding the scene, which would mean re-seeding 75k particles.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const lastColor = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(fluxColor);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const scene = sceneRef.current;
        if (!fluxColor || !scene?.isReady) return;
        // The first colour is already baked into the scene; later ones arrive as a
        // page change, which is what the explode transition exists for.
        scene.setFluxColor(fluxColor, {
            animate: fluxColor !== lastColor.current
        });
        lastColor.current = fluxColor;
    }, [
        fluxColor
    ]);
    const lastVariant = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(variant);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (variant === lastVariant.current) return;
        lastVariant.current = variant;
        sceneRef.current?.setVariant(variant);
    }, [
        variant
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (enabled) loopRef.current?.start();
        else loopRef.current?.stop();
    }, [
        enabled
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Box"], {
        ref: containerRef,
        position: "absolute",
        top: "0",
        left: "0",
        w: "100%",
        h: "100%",
        backgroundColor: "#050e12",
        zIndex: "backgroundGrid",
        opacity: enabled ? 1 : 0,
        transition: enabled ? 'opacity 0.5s ease' : 'opacity 2s ease'
    }, void 0, false, {
        fileName: "[project]/servicios-lib/components/background/Background.tsx",
        lineNumber: 142,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = Background;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/servicios-lib/components/background/index.ts [ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$Background$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/Background.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$scene$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/scene.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/config.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$Background$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$scene$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$Background$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$scene$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
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
"[project]/servicios-lib/components/layout/Layout.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "Layout",
    ()=>Layout,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__ = __turbopack_context__.i("[externals]/@chakra-ui/react [external] (@chakra-ui/react, esm_import, [project]/node_modules/@chakra-ui/react)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__ = __turbopack_context__.i("[externals]/framer-motion [external] (framer-motion, esm_import, [project]/node_modules/framer-motion)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/index.ts [ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$Background$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/Background.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/index.ts [ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Footer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/Footer.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Loader$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/Loader.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Navigation$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/Navigation.tsx [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$Background$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Footer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Loader$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Navigation$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$Background$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Footer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Loader$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Navigation$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
/**
 * The original carries the OneTrust banner height here and shifts the footer up
 * by it. The mirror never loads OneTrust, so it is pinned at zero — pages can
 * still read `var(--cookie-banner-height)`.
 */ const rootStyle = {
    '--cookie-banner-height': '0px'
};
/**
 * Only a top margin — the footer is the last item in a flex column that
 * exactly fills the viewport, so its own bottom edge is already flush with
 * the screen. A bottom margin here would pull it up and leave a gap under it.
 */ const defaultFooterProps = {
    mt: [
        8,
        null,
        null,
        null,
        4
    ]
};
function Layout({ children, fluxColor, backgroundVariant = 'index', animate = true, footer = true, footerProps, minimalNav = false, menuFooter }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$Background$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["Background"], {
                fluxColor: fluxColor,
                variant: backgroundVariant
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/layout/Layout.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Box"], {
                pos: "absolute",
                top: 0,
                left: 0,
                w: "100%",
                // Always exactly the viewport, at every breakpoint — the page itself
                // never scrolls; only the content strip between nav and footer does.
                h: "calc(var(--vh, 1vh) * 100)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                style: rootStyle,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__["AnimatePresence"], {
                        mode: "wait",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Navigation$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["Navigation"], {
                            animate: animate,
                            minimal: minimalNav,
                            menuFooter: menuFooter
                        }, minimalNav ? 'nav-minimal' : 'nav-default', false, {
                            fileName: "[project]/servicios-lib/components/layout/Layout.tsx",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/servicios-lib/components/layout/Layout.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Box"], {
                        as: "main",
                        flex: "1 1 auto",
                        minH: 0,
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Box"], {
                                flex: "1 1 auto",
                                minH: 0,
                                overflow: "auto",
                                children: children
                            }, void 0, false, {
                                fileName: "[project]/servicios-lib/components/layout/Layout.tsx",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this),
                            footer ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Footer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["Footer"], {
                                animate: animate,
                                delay: 1,
                                flexShrink: 0,
                                ...defaultFooterProps,
                                ...footerProps
                            }, void 0, false, {
                                fileName: "[project]/servicios-lib/components/layout/Layout.tsx",
                                lineNumber: 87,
                                columnNumber: 13
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/servicios-lib/components/layout/Layout.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/servicios-lib/components/layout/Layout.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Loader$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["Loader"], {}, void 0, false, {
                fileName: "[project]/servicios-lib/components/layout/Layout.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
const __TURBOPACK__default__export__ = Layout;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/servicios-lib/components/legal/LegalPage.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "LegalPage",
    ()=>LegalPage,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__ = __turbopack_context__.i("[externals]/@chakra-ui/react [external] (@chakra-ui/react, esm_import, [project]/node_modules/@chakra-ui/react)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$AnimatedHeading$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/home/AnimatedHeading.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/home/motion.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$ui$2f$ScrambleText$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/ui/ScrambleText.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$layout$2f$Layout$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/layout/Layout.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$data$2f$content$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/servicios-lib/data/content.json (json)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$AnimatedHeading$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$ui$2f$ScrambleText$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$layout$2f$Layout$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$AnimatedHeading$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$ui$2f$ScrambleText$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$layout$2f$Layout$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
/** Reading column, authored against the same 1440 reference as the detail page. */ const COLUMN_WIDTH = {
    base: `${315 / 375 * 100}%`,
    xl: '46rem'
};
const HAIRLINE = '1px solid rgba(255,255,255,0.14)';
/** Gates the children so the section headings can play their own bar wipe. */ const articleVariants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.01
        }
    },
    exit: {
        opacity: 0
    }
};
const bodyProps = {
    mt: '0.875rem',
    fontSize: {
        base: '0.8125rem',
        xl: '0.875rem'
    },
    lineHeight: {
        base: '1.375rem',
        xl: '1.5rem'
    },
    letterSpacing: '0.02em',
    color: 'rgba(255,255,255,0.78)'
};
/** Bulleted list — the gold marker is drawn by hand, `listStyleType` cannot be tinted. */ function Bullets({ items }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["UnorderedList"], {
        m: 0,
        mt: "0.75rem",
        p: 0,
        listStyleType: "none",
        children: items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["ListItem"], {
                pos: "relative",
                pl: "1.125rem",
                mt: "0.5rem",
                fontSize: bodyProps.fontSize,
                lineHeight: bodyProps.lineHeight,
                letterSpacing: bodyProps.letterSpacing,
                color: bodyProps.color,
                _before: {
                    content: '""',
                    pos: 'absolute',
                    left: 0,
                    top: '0.5625rem',
                    w: '0.3125rem',
                    h: '0.3125rem',
                    bg: 'goldAlt'
                },
                children: item
            }, item, false, {
                fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                lineNumber: 37,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
function Section({ section }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Box"], {
        as: "section",
        id: section.id,
        mt: "2.5rem",
        scrollMarginTop: "6rem",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$AnimatedHeading$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["AnimatedHeading"], {
                children: section.heading
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            section.paragraphs.map((paragraph)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Text"], {
                    ...bodyProps,
                    children: paragraph
                }, paragraph, false, {
                    fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                    lineNumber: 69,
                    columnNumber: 9
                }, this)),
            section.items ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Bullets, {
                items: section.items
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                lineNumber: 74,
                columnNumber: 24
            }, this) : null,
            section.secondary ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Box"], {
                mt: "1.25rem",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Text"], {
                        ...bodyProps,
                        mt: 0,
                        children: section.secondary.paragraph
                    }, void 0, false, {
                        fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                        lineNumber: 78,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Bullets, {
                        items: section.secondary.items
                    }, void 0, false, {
                        fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                        lineNumber: 81,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Text"], {
                        ...bodyProps,
                        children: section.secondary.optOut
                    }, void 0, false, {
                        fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                        lineNumber: 82,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                lineNumber: 77,
                columnNumber: 9
            }, this) : null,
            section.note ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Box"], {
                mt: "1rem",
                pl: "0.875rem",
                borderLeft: "2px solid",
                borderColor: "goldAlt",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Text"], {
                    ...bodyProps,
                    mt: 0,
                    color: "rgba(255,255,255,0.62)",
                    fontStyle: "italic",
                    children: section.note
                }, void 0, false, {
                    fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                    lineNumber: 88,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                lineNumber: 87,
                columnNumber: 9
            }, this) : null,
            section.link ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Link"], {
                as: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"],
                href: section.link.href,
                display: "inline-block",
                mt: "0.875rem",
                fontSize: "0.75rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "gold",
                _hover: {
                    color: 'white',
                    textDecor: 'none'
                },
                children: [
                    section.link.label,
                    " →"
                ]
            }, void 0, true, {
                fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                lineNumber: 95,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
        lineNumber: 65,
        columnNumber: 5
    }, this);
}
function LegalPage({ document: doc }) {
    const { site } = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$data$2f$content$2e$json__$28$json$29$__["default"];
    const title = `${site.title} | ${doc.label}`;
    const url = `${site.url}/${doc.slug}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$layout$2f$Layout$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
        backgroundVariant: "play",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                        children: title
                    }, "page-title", false, {
                        fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                        lineNumber: 130,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "title",
                        content: title
                    }, "page-title-meta", false, {
                        fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: doc.description
                    }, "description", false, {
                        fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("link", {
                        rel: "icon",
                        type: "image/png",
                        href: "/favicon.png"
                    }, "icon", false, {
                        fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("link", {
                        rel: "canonical",
                        href: url
                    }, "canonical", false, {
                        fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:type",
                        content: "article"
                    }, "og-type", false, {
                        fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:title",
                        content: title
                    }, "og-title", false, {
                        fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:description",
                        content: doc.description
                    }, "og-description", false, {
                        fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:url",
                        content: url
                    }, "og-url", false, {
                        fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:image",
                        content: site.shareImage
                    }, "og-image", false, {
                        fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "twitter:card",
                        content: "summary_large_image"
                    }, "twitter-card", false, {
                        fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                        lineNumber: 140,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "twitter:title",
                        content: title
                    }, "twitter-title", false, {
                        fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "twitter:description",
                        content: doc.description
                    }, "twitter-description", false, {
                        fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "twitter:image",
                        content: site.shareImage
                    }, "twitter-image", false, {
                        fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                lineNumber: 129,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["MotionArticle"], {
                w: COLUMN_WIDTH,
                mx: "auto",
                mt: {
                    base: '4.5rem',
                    md: '5.625rem'
                },
                pb: {
                    base: '3rem',
                    xl: '4rem'
                },
                variants: articleVariants,
                initial: "hidden",
                animate: "visible",
                exit: "exit",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Box"], {
                        as: "header",
                        pb: "1.5rem",
                        borderBottom: HAIRLINE,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Text"], {
                                fontSize: "0.625rem",
                                fontWeight: "semibold",
                                letterSpacing: "0.22em",
                                textTransform: "uppercase",
                                color: "goldAlt",
                                children: doc.subheading
                            }, void 0, false, {
                                fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                                lineNumber: 157,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Box"], {
                                as: "h1",
                                mt: "0.625rem",
                                fontSize: {
                                    base: '1.5rem',
                                    xl: '2rem'
                                },
                                fontWeight: "normal",
                                lineHeight: {
                                    base: '1.875rem',
                                    xl: '2.375rem'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$ui$2f$ScrambleText$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["ScrambleText"], {
                                    text: doc.heading,
                                    duration: 1,
                                    display: "inline"
                                }, void 0, false, {
                                    fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                                    lineNumber: 173,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                                lineNumber: 166,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Text"], {
                                ...bodyProps,
                                mt: "1rem",
                                children: doc.intro
                            }, void 0, false, {
                                fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                                lineNumber: 175,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Text"], {
                                mt: "1rem",
                                fontSize: "0.6875rem",
                                letterSpacing: "0.16em",
                                textTransform: "uppercase",
                                color: "grey2",
                                children: [
                                    doc.updatedLabel,
                                    ": ",
                                    doc.updated
                                ]
                            }, void 0, true, {
                                fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                                lineNumber: 178,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this),
                    doc.sections.map((section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Section, {
                            section: section
                        }, section.id, false, {
                            fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                            lineNumber: 184,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Box"], {
                        mt: "3rem",
                        pt: "1.5rem",
                        borderTop: HAIRLINE,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Link"], {
                            as: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"],
                            href: "/servicios",
                            fontSize: "0.75rem",
                            letterSpacing: "0.16em",
                            textTransform: "uppercase",
                            color: "gold",
                            _hover: {
                                color: 'white',
                                textDecor: 'none'
                            },
                            children: "← Volver al inicio"
                        }, void 0, false, {
                            fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                            lineNumber: 188,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                        lineNumber: 187,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                lineNumber: 146,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
        lineNumber: 128,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = LegalPage;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/servicios-lib/components/legal/index.ts [ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$legal$2f$LegalPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/legal/LegalPage.tsx [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$legal$2f$LegalPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$legal$2f$LegalPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/servicios-lib/data/legal.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"responsable\":{\"denominacion\":\"Yaakob Consultores, S.C.\",\"rfc\":\"YCO2604212U8\",\"regimenCapital\":\"Sociedad Civil\",\"domicilioFiscal\":\"Cerrada Durango Sur, Manzana 4, Lote 22, sin número interior, Colonia Unidad Bonito Ecatepec, Ecatepec de Morelos, Estado de México, C.P. 55090\",\"domicilioAtencion\":\"Alica 40, Lomas de Chapultepec, Miguel Hidalgo, Ciudad de México, C.P. 11000\",\"correo\":\"contacto@yaakob.com\",\"telefonos\":[\"+52 55 9008 6360\",\"+52 55 9008 7881\"],\"whatsapp\":\"+52 55 2741 6178\",\"sitio\":\"https://www.yaakob.com\"},\"privacidad\":{\"slug\":\"privacidad\",\"label\":\"Aviso de privacidad\",\"heading\":\"Aviso de privacidad integral\",\"subheading\":\"Yaakob Consultores, S.C.\",\"description\":\"Aviso de privacidad integral de Yaakob Consultores, S.C. conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.\",\"updatedLabel\":\"Última actualización\",\"updated\":\"13 de agosto de 2026\",\"intro\":\"Yaakob Consultores, S.C. (en adelante, “YAAKOB”, “nosotros” o el “Responsable”) reconoce la importancia de la protección de los datos personales y está comprometida con su tratamiento legítimo, controlado, informado y seguro. El presente aviso se emite de conformidad con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, su normativa aplicable y los Lineamientos del Aviso de Privacidad. Este aviso explica qué datos personales podemos recabar, para qué los utilizamos, cómo los protegemos, con quién podemos compartirlos y cuáles son los derechos que usted puede ejercer respecto de sus datos personales.\",\"sections\":[{\"id\":\"responsable\",\"heading\":\"1. Identidad y domicilio del responsable\",\"paragraphs\":[\"Yaakob Consultores, S.C., con Registro Federal de Contribuyentes YCO2604212U8, constituida bajo el régimen de sociedad civil y dedicada, entre otras actividades, a la prestación de servicios de consultoría, asesoría, acompañamiento y defensa en materia fiscal, administrativa, financiera y relacionada, es responsable del tratamiento de los datos personales que recabe.\",\"Domicilio fiscal: Cerrada Durango Sur, Manzana 4, Lote 22, Colonia Unidad Bonito Ecatepec, Ecatepec de Morelos, Estado de México, C.P. 55090.\",\"Domicilio de atención y oficina de contacto: Alica 40, Lomas de Chapultepec, Miguel Hidalgo, Ciudad de México, C.P. 11000.\",\"Correo electrónico para asuntos relacionados con privacidad y protección de datos personales: contacto@yaakob.com. El presente aviso se encuentra disponible permanentemente en www.yaakob.com.\"]},{\"id\":\"datos-recabados\",\"heading\":\"2. Datos personales que podemos recabar\",\"paragraphs\":[\"Para cumplir con las finalidades descritas en este aviso, YAAKOB podrá recabar, dependiendo de la naturaleza de la relación con usted y de los servicios solicitados, las siguientes categorías de datos personales:\"],\"items\":[\"Datos de identificación: nombre completo, firma, nacionalidad, fecha de nacimiento, CURP cuando resulte necesaria, datos e imagen contenidos en identificaciones oficiales y, en su caso, información relativa a la representación legal, poderes y facultades.\",\"Datos de contacto: domicilio, correo electrónico, teléfonos fijo y móvil, datos de contacto profesional e información necesaria para establecer comunicación mediante herramientas de mensajería electrónica.\",\"Datos fiscales: RFC, Constancia de Situación Fiscal, Opinión de Cumplimiento, régimen y domicilio fiscal, CFDI, declaraciones, acuses y constancias, papeles de trabajo, contabilidad y contabilidad electrónica, información sobre obligaciones fiscales, créditos fiscales, multas, recargos, actualizaciones y accesorios, así como información de auditorías, revisiones, requerimientos, expedientes y comunicaciones con autoridades fiscales.\",\"Datos patrimoniales y financieros: información sobre bienes, ingresos y egresos, estados financieros, información bancaria y cuentas, créditos, obligaciones financieras, garantías, embargos, información patrimonial y económica necesaria para elaborar diagnósticos, estrategias, opiniones o defensas. Su tratamiento observará las disposiciones aplicables y, cuando legalmente corresponda, se recabará el consentimiento expreso del titular.\",\"Datos laborales y profesionales: profesión, puesto, actividad profesional o empresarial, giro, empresa u organización a la que pertenece e información relacionada con su función o representación dentro de una persona moral.\",\"Datos relacionados con procedimientos y asuntos jurídicos o fiscales: expedientes administrativos y fiscales, resoluciones, oficios, requerimientos, actas, notificaciones, demandas, recursos, medios de defensa, resoluciones judiciales e información de procedimientos administrativos o jurisdiccionales.\",\"Datos de terceros proporcionados por usted: representantes legales, socios, accionistas, administradores, apoderados, beneficiarios controladores, trabajadores, asesores, proveedores, clientes y personas relacionadas con el asunto encomendado.\"],\"note\":\"Cuando usted proporcione información personal de terceros, manifiesta que cuenta con las facultades, autorizaciones o bases jurídicas necesarias para proporcionarla a YAAKOB y se obliga a comunicar a dichas personas el tratamiento correspondiente cuando resulte exigible. YAAKOB podrá solicitar documentación que acredite la legitimidad de dicha transmisión cuando las circunstancias del asunto lo requieran.\"},{\"id\":\"datos-sensibles\",\"heading\":\"3. Datos personales sensibles\",\"paragraphs\":[\"YAAKOB no recaba de manera ordinaria datos personales sensibles.\",\"Cuando, excepcionalmente, la atención de un asunto requiera conocer información que tenga el carácter de dato personal sensible conforme a la legislación aplicable, YAAKOB limitará su tratamiento a lo estrictamente necesario para la finalidad correspondiente y recabará el consentimiento que legalmente resulte exigible, salvo que exista una excepción prevista expresamente por la legislación aplicable.\"]},{\"id\":\"fuentes\",\"heading\":\"4. Fuentes de obtención de los datos\",\"paragraphs\":[\"Los datos personales podrán obtenerse:\"],\"items\":[\"Directamente del titular.\",\"Mediante formularios físicos o electrónicos.\",\"Por correo electrónico.\",\"Mediante llamadas telefónicas o medios de comunicación electrónica.\",\"Mediante reuniones presenciales o virtuales.\",\"A través de documentación proporcionada por el cliente.\",\"Mediante documentos o información proporcionados por representantes legalmente facultados.\",\"De autoridades, tribunales u organismos públicos cuando ello sea legalmente procedente.\",\"De fuentes públicas permitidas por la legislación aplicable.\",\"De terceros legalmente facultados para proporcionar la información.\"]},{\"id\":\"finalidades-primarias\",\"heading\":\"5. Finalidades primarias\",\"paragraphs\":[\"Los datos personales serán tratados para las siguientes finalidades necesarias para la prestación de los servicios y, en su caso, para el establecimiento, mantenimiento y cumplimiento de la relación jurídica con usted:\"],\"items\":[\"Atención y contratación: atender solicitudes de información y de consulta, elaborar cotizaciones y propuestas, identificar al cliente, verificar la información proporcionada, evaluar la naturaleza y alcance del servicio, formalizar contratos y cartas compromiso, gestionar pagos y facturación, y dar seguimiento a la relación contractual.\",\"Consultoría y asesoría: elaborar diagnósticos fiscales, administrativos, financieros o relacionados; analizar información fiscal, contable, financiera y patrimonial; elaborar opiniones, recomendaciones, estrategias y planes de acción; y proporcionar asesoría y consultoría especializada.\",\"Defensa fiscal y administrativa: preparar promociones; elaborar y presentar recursos administrativos; atender requerimientos, revisiones y auditorías; analizar créditos fiscales; preparar medios de defensa y demandas de nulidad; atender procedimientos ante el Tribunal Federal de Justicia Administrativa; preparar y dar seguimiento a juicios de amparo; atender procedimientos ante juzgados, tribunales y autoridades competentes; dar seguimiento a procedimientos administrativos de ejecución; atender cartas invitación; analizar procedimientos relacionados con el artículo 69-B y demás disposiciones aplicables del Código Fiscal de la Federación; atender procedimientos sobre restricción o cancelación de certificados de sello digital; y analizar y atender actos de autoridades fiscales y administrativas.\",\"Cumplimiento de obligaciones legales: cumplir obligaciones fiscales, contables, mercantiles, administrativas y legales aplicables; atender requerimientos de autoridades competentes; cumplir obligaciones de conservación documental y las relacionadas con la prevención de operaciones con recursos de procedencia ilícita cuando resulten aplicables; integrar expedientes de identificación cuando exista obligación legal; y cumplir obligaciones derivadas de procedimientos administrativos o judiciales.\",\"Administración interna: facturación, cobranza, administración de cuentas, contabilidad del despacho, control administrativo, auditoría interna, gestión documental, seguridad de la información y prevención y detección de actividades fraudulentas o ilícitas.\"]},{\"id\":\"finalidades-secundarias\",\"heading\":\"6. Finalidades secundarias\",\"paragraphs\":[\"Adicionalmente, y siempre que usted no manifieste su oposición, podremos utilizar sus datos de contacto para:\"],\"items\":[\"Enviar boletines fiscales.\",\"Enviar alertas sobre cambios legislativos o regulatorios.\",\"Compartir información relacionada con temas fiscales, financieros, administrativos o empresariales.\",\"Invitar a conferencias, cursos, seminarios y eventos.\",\"Realizar encuestas de satisfacción.\",\"Evaluar y mejorar nuestros servicios.\",\"Elaborar estadísticas internas.\",\"Realizar actividades de comunicación institucional y comercial relacionadas con los servicios de YAAKOB.\"],\"note\":\"El tratamiento para estas finalidades secundarias no es necesario para la prestación de los servicios principales. Usted puede manifestar su negativa enviando un correo electrónico a contacto@yaakob.com con el asunto “OPOSICIÓN A FINALIDADES SECUNDARIAS”. La negativa para finalidades secundarias no condicionará la prestación de los servicios contratados o solicitados.\"},{\"id\":\"consentimiento\",\"heading\":\"7. Consentimiento\",\"paragraphs\":[\"YAAKOB obtendrá los consentimientos que sean legalmente necesarios para el tratamiento de datos personales. Cuando la legislación requiera consentimiento expreso, YAAKOB implementará mecanismos que permitan obtener y conservar evidencia de dicho consentimiento.\",\"La entrega voluntaria de información no se interpretará automáticamente como consentimiento expreso cuando la legislación exija una manifestación expresa, inequívoca o por escrito. El consentimiento podrá no ser necesario cuando el tratamiento se encuentre dentro de alguno de los supuestos de excepción establecidos por la legislación aplicable.\"]},{\"id\":\"transferencias\",\"heading\":\"8. Transferencias de datos personales\",\"paragraphs\":[\"YAAKOB podrá realizar transferencias de datos personales cuando exista una base jurídica que lo permita y, cuando sea necesario, con el consentimiento correspondiente. Las transferencias podrán realizarse, entre otros, a:\"],\"items\":[\"Servicio de Administración Tributaria.\",\"Autoridades fiscales federales, estatales o municipales.\",\"Secretaría de Hacienda y Crédito Público y demás autoridades competentes.\",\"Tribunal Federal de Justicia Administrativa.\",\"Juzgados y tribunales.\",\"Autoridades administrativas.\",\"Instituto Mexicano del Seguro Social e INFONAVIT.\",\"Autoridades encargadas de procuración y administración de justicia.\",\"Autoridades competentes en materia de prevención y detección de operaciones con recursos de procedencia ilícita.\",\"Notarios y corredores públicos cuando su intervención sea necesaria.\",\"Peritos, abogados, contadores, auditores, corresponsales o profesionistas externos que participen en la atención del asunto.\"],\"note\":\"Estas transferencias podrán realizarse sin consentimiento cuando se actualice alguno de los supuestos establecidos por la legislación aplicable, incluyendo los relacionados con el cumplimiento de obligaciones legales, la administración o procuración de justicia, la defensa de derechos, el cumplimiento de una relación jurídica o los demás supuestos legalmente previstos. Cuando una transferencia requiera consentimiento y no exista una excepción legal aplicable, YAAKOB solicitará dicho consentimiento.\"},{\"id\":\"encargados\",\"heading\":\"9. Remisiones a encargados\",\"paragraphs\":[\"YAAKOB podrá utilizar proveedores de servicios que traten datos personales por cuenta y bajo instrucciones de YAAKOB, incluyendo, entre otros: proveedores de correo electrónico, servicios de alojamiento, almacenamiento en la nube, respaldo de información, sistemas administrativos y contables, herramientas de gestión documental, herramientas de comunicación y proveedores tecnológicos.\",\"Cuando estos proveedores actúen como encargados del tratamiento, estarán sujetos a las obligaciones correspondientes de confidencialidad, seguridad y tratamiento conforme a las instrucciones de YAAKOB y a la legislación aplicable.\"]},{\"id\":\"derechos-arco\",\"heading\":\"10. Derechos ARCO\",\"paragraphs\":[\"El titular de los datos personales tiene derecho a:\"],\"items\":[\"Acceso: conocer qué datos personales tenemos, para qué los utilizamos y las condiciones del tratamiento.\",\"Rectificación: solicitar la corrección de sus datos cuando sean inexactos, incompletos o se encuentren desactualizados.\",\"Cancelación: solicitar la eliminación de sus datos personales cuando considere que no están siendo tratados conforme a la legislación aplicable.\",\"Oposición: oponerse al tratamiento de sus datos personales para determinadas finalidades cuando exista causa legítima para ello.\"]},{\"id\":\"procedimiento-arco\",\"heading\":\"11. Procedimiento para ejercer los derechos ARCO\",\"paragraphs\":[\"Para ejercer cualquiera de sus derechos ARCO, deberá presentar una solicitud a través del correo electrónico contacto@yaakob.com o directamente en el domicilio de atención señalado en este aviso. La solicitud deberá contener, al menos:\"],\"items\":[\"Nombre del titular.\",\"Medio para recibir la respuesta.\",\"Documentos que acrediten la identidad del titular o, en su caso, la representación legal.\",\"Descripción clara y precisa del derecho que pretende ejercer.\",\"Descripción de los datos personales respecto de los cuales solicita el ejercicio del derecho.\",\"Cualquier otro elemento que facilite la localización de los datos.\"],\"note\":\"YAAKOB podrá solicitar información adicional cuando sea necesaria para acreditar la identidad, representación o procedencia de la solicitud. La respuesta se emitirá dentro de los plazos establecidos por la legislación aplicable y, cuando resulte procedente, la determinación se hará efectiva dentro del plazo legal correspondiente. El ejercicio de los derechos ARCO será gratuito, salvo los casos y gastos permitidos por la legislación aplicable.\"},{\"id\":\"limitaciones-arco\",\"heading\":\"12. Limitaciones al ejercicio de derechos ARCO\",\"paragraphs\":[\"Los derechos de acceso, rectificación, cancelación u oposición podrán estar sujetos a las limitaciones y excepciones previstas por la legislación aplicable. En particular, podrán existir restricciones cuando:\"],\"items\":[\"Exista una obligación legal de conservar la información.\",\"El tratamiento sea necesario para cumplir obligaciones fiscales.\",\"La información sea necesaria para el ejercicio o defensa de derechos.\",\"Exista un procedimiento administrativo o judicial.\",\"La cancelación pueda obstaculizar actuaciones de autoridad.\",\"Exista una relación contractual vigente que requiera el tratamiento.\",\"Exista cualquier otra excepción prevista expresamente por la legislación aplicable.\"],\"note\":\"Cuando legalmente corresponda, los datos podrán ser bloqueados y posteriormente suprimidos una vez concluidos los plazos de conservación aplicables.\"},{\"id\":\"revocacion\",\"heading\":\"13. Revocación del consentimiento\",\"paragraphs\":[\"Cuando el tratamiento se base en el consentimiento del titular, éste podrá solicitar su revocación en cualquier momento mediante correo electrónico a contacto@yaakob.com. La revocación no tendrá efectos retroactivos.\",\"La revocación no procederá cuando el tratamiento sea necesario para el cumplimiento de obligaciones legales, para el ejercicio o defensa de derechos, para la ejecución de una relación jurídica o cuando exista cualquier otra excepción legal aplicable. La revocación podrá estar sujeta a los mismos plazos y requisitos de identificación establecidos para las solicitudes correspondientes.\"]},{\"id\":\"limitacion-uso\",\"heading\":\"14. Limitación del uso o divulgación\",\"paragraphs\":[\"El titular podrá solicitar la limitación del uso o divulgación de sus datos personales para determinadas finalidades mediante solicitud dirigida a contacto@yaakob.com. Asimismo, podrá solicitar su inclusión en los mecanismos internos de exclusión que, en su caso, YAAKOB establezca para dejar de recibir comunicaciones promocionales o informativas.\",\"La limitación no afectará los tratamientos necesarios para cumplir obligaciones legales, contractuales o para la defensa de derechos.\"]},{\"id\":\"conservacion\",\"heading\":\"15. Plazo de conservación\",\"paragraphs\":[\"YAAKOB conservará los datos personales únicamente durante el tiempo que resulte necesario para cumplir las finalidades para las cuales fueron recabados y, posteriormente, durante los plazos establecidos por las disposiciones legales aplicables.\",\"Dependiendo de la naturaleza de la información, podrán resultar aplicables obligaciones de conservación derivadas, entre otras, de la legislación fiscal, mercantil, civil o administrativa, de la legislación relacionada con la prevención de operaciones con recursos de procedencia ilícita, de obligaciones contractuales y de procedimientos administrativos o judiciales.\",\"Una vez concluido el periodo de conservación aplicable, los datos serán suprimidos o, cuando corresponda, bloqueados y posteriormente eliminados de conformidad con las políticas y procedimientos internos de YAAKOB.\"]},{\"id\":\"seguridad\",\"heading\":\"16. Medidas de seguridad\",\"paragraphs\":[\"YAAKOB implementará y mantendrá medidas de seguridad administrativas, técnicas y físicas razonables y proporcionales a los riesgos asociados al tratamiento de los datos personales. Estas medidas podrán incluir, de acuerdo con la naturaleza de la información y los sistemas utilizados: controles de acceso, gestión de usuarios y contraseñas, restricciones de acceso a expedientes, resguardo físico de documentación, mecanismos de respaldo, medidas de seguridad informática, protección de comunicaciones, procedimientos internos de confidencialidad, acuerdos de confidencialidad con colaboradores y proveedores, y controles para prevenir accesos, usos, alteraciones, pérdidas o tratamientos no autorizados.\",\"YAAKOB revisará periódicamente sus medidas de seguridad y podrá actualizarlas conforme evolucionen los riesgos, las tecnologías y las obligaciones legales.\"]},{\"id\":\"vulneraciones\",\"heading\":\"17. Vulneraciones de seguridad\",\"paragraphs\":[\"En caso de que ocurra una vulneración de seguridad que pueda afectar significativamente los derechos patrimoniales o morales de los titulares, YAAKOB actuará conforme a las obligaciones establecidas por la legislación aplicable y, cuando corresponda, notificará al titular afectado y a las autoridades competentes.\",\"La notificación, cuando resulte legalmente exigible, contendrá la información y medidas previstas por la legislación aplicable.\"]},{\"id\":\"cookies\",\"heading\":\"18. Cookies, web beacons y tecnologías similares\",\"paragraphs\":[\"El sitio www.yaakob.com podrá utilizar cookies, archivos de registro, tecnologías de almacenamiento local, web beacons, píxeles u otras tecnologías similares necesarias para el funcionamiento, seguridad y mejora del sitio. Estas tecnologías podrán permitir obtener información como:\"],\"items\":[\"Tipo de navegador y sistema operativo.\",\"Dispositivo utilizado.\",\"Dirección IP.\",\"Páginas consultadas.\",\"Fecha y hora de acceso, y duración de la visita.\",\"Interacciones realizadas en el sitio.\",\"Información técnica relacionada con el funcionamiento del sitio.\"],\"note\":\"Dependiendo de las herramientas implementadas, cierta información podrá asociarse a identificadores técnicos que permitan distinguir un dispositivo o sesión. YAAKOB podrá utilizar cookies necesarias (funcionamiento, seguridad y navegación del sitio), cookies de análisis o estadísticas (comprender el uso del sitio y mejorarlo) y cookies de terceros, las cuales podrán establecer sus propias tecnologías de rastreo conforme a sus respectivos términos y políticas. El titular podrá configurar su navegador para bloquear, eliminar o limitar las cookies; sin embargo, algunas funciones del sitio podrían verse afectadas. Cuando las tecnologías utilizadas requieran consentimiento conforme a la legislación aplicable, YAAKOB implementará el mecanismo correspondiente.\"},{\"id\":\"menores\",\"heading\":\"19. Menores de edad\",\"paragraphs\":[\"Los servicios ofrecidos por YAAKOB están dirigidos principalmente a personas mayores de edad, empresas, empresarios, profesionistas y personas morales. YAAKOB no recaba intencionalmente datos personales de menores de edad.\",\"Cuando la atención de un asunto requiera tratar información de una persona menor de edad, el tratamiento se realizará conforme a la legislación aplicable y, cuando corresponda, a través de quien ejerza legalmente la patria potestad, tutela o representación.\"]},{\"id\":\"personas-morales\",\"heading\":\"20. Información de personas morales\",\"paragraphs\":[\"Cuando YAAKOB preste servicios a una persona moral, podrá tratar datos personales de las personas físicas relacionadas con ésta, incluyendo representantes legales, socios, accionistas, administradores, apoderados, trabajadores y beneficiarios controladores, en la medida en que resulte necesario para la prestación del servicio y exista una base jurídica para ello.\",\"La persona que proporcione datos personales de terceros manifiesta que cuenta con facultades suficientes para hacerlo cuando así sea requerido por la legislación aplicable.\"]},{\"id\":\"terceros\",\"heading\":\"21. Sitios web y servicios de terceros\",\"paragraphs\":[\"El sitio www.yaakob.com podrá contener enlaces, herramientas o servicios proporcionados por terceros. YAAKOB no será responsable por las prácticas de privacidad, contenidos, políticas o tratamientos realizados directamente por terceros fuera de sus sistemas y control.\",\"Cuando el titular acceda a sitios o servicios de terceros, deberá consultar las políticas de privacidad y términos correspondientes de dichos terceros.\"]},{\"id\":\"comunicaciones\",\"heading\":\"22. Comunicaciones electrónicas\",\"paragraphs\":[\"Cuando el titular proporcione un correo electrónico, teléfono o medio de comunicación electrónica, autoriza su utilización para las finalidades relacionadas con la atención de la solicitud, prestación de servicios, seguimiento de asuntos y demás finalidades previstas en este aviso.\",\"Las comunicaciones comerciales o informativas estarán sujetas a las preferencias y derechos que correspondan al titular conforme a la legislación aplicable. El titular podrá solicitar en cualquier momento dejar de recibir comunicaciones de carácter comercial o informativo.\"]},{\"id\":\"servicios-sitio\",\"heading\":\"23. Servicios contratados a través del sitio web\",\"paragraphs\":[\"Cuando YAAKOB permita solicitar, contratar, reservar o pagar servicios mediante www.yaakob.com, la operación podrá estar sujeta adicionalmente a términos y condiciones de contratación, políticas de cancelación y de reembolso, condiciones particulares del servicio, políticas de cookies, condiciones de los proveedores de pago y demás documentos jurídicos que resulten aplicables.\",\"El tratamiento de datos personales derivado de una operación electrónica se realizará conforme a este aviso y a las condiciones particulares aplicables.\"],\"link\":{\"label\":\"Consultar términos y condiciones\",\"href\":\"/terminos\"}},{\"id\":\"pagos\",\"heading\":\"24. Pagos y proveedores de servicios de pago\",\"paragraphs\":[\"Cuando YAAKOB habilite pagos electrónicos, los datos de pago podrán ser tratados directamente por proveedores especializados de servicios de pago. YAAKOB procurará no almacenar datos completos de tarjetas bancarias cuando la operación pueda procesarse directamente mediante un proveedor especializado.\",\"Los proveedores de pago podrán tratar información conforme a sus propias políticas de privacidad, términos y condiciones y obligaciones legales.\"]},{\"id\":\"confidencialidad\",\"heading\":\"25. Propiedad y confidencialidad de la información\",\"paragraphs\":[\"La información proporcionada por el cliente será tratada con carácter confidencial, sin perjuicio de las comunicaciones que resulten necesarias para prestar los servicios, cumplir obligaciones legales, atender requerimientos de autoridad, ejercer o defender derechos o cumplir las finalidades previstas en este aviso.\",\"La obligación de confidencialidad continuará después de concluida la relación de servicios, en los términos establecidos por la legislación aplicable y por las obligaciones contractuales correspondientes.\"]},{\"id\":\"pld\",\"heading\":\"26. Prevención de operaciones con recursos de procedencia ilícita\",\"paragraphs\":[\"Cuando alguna actividad, servicio u operación realizada por YAAKOB se encuentre dentro del ámbito de aplicación de la legislación relacionada con la prevención e identificación de operaciones con recursos de procedencia ilícita, YAAKOB podrá recabar, conservar, verificar y, en su caso, transmitir la información necesaria para cumplir las obligaciones legales correspondientes.\",\"El tratamiento realizado para cumplir dichas obligaciones podrá efectuarse aun cuando el titular se oponga a determinados usos de sus datos, cuando exista una obligación legal que así lo permita o exija.\"]},{\"id\":\"modificaciones\",\"heading\":\"27. Actualizaciones y modificaciones al aviso\",\"paragraphs\":[\"YAAKOB podrá modificar o actualizar este aviso de privacidad cuando resulte necesario por cambios legislativos o regulatorios, cambios en los servicios o en los procesos internos, incorporación de nuevas tecnologías, cambios en el modelo de negocio, incorporación de nuevos proveedores o encargados, o modificaciones en las finalidades del tratamiento.\",\"Las modificaciones estarán disponibles en www.yaakob.com, indicando la fecha de última actualización. Cuando una modificación requiera una nueva puesta a disposición o consentimiento conforme a la legislación aplicable, YAAKOB implementará el mecanismo correspondiente.\"]},{\"id\":\"autoridad\",\"heading\":\"28. Autoridad competente\",\"paragraphs\":[\"Cuando el titular considere que se ha vulnerado su derecho a la protección de datos personales, podrá ejercer los medios de defensa, procedimientos o presentar las denuncias que correspondan ante la autoridad competente en materia de protección de datos personales, de conformidad con la legislación vigente.\",\"La autoridad garante federal competente será la que determine la legislación vigente al momento de la presentación de la solicitud, procedimiento, denuncia o recurso correspondiente.\"]},{\"id\":\"aceptacion\",\"heading\":\"29. Aceptación y puesta a disposición\",\"paragraphs\":[\"El presente aviso de privacidad integral se encuentra permanentemente disponible en www.yaakob.com. La puesta a disposición de este aviso se realizará mediante los mecanismos previstos por la legislación aplicable.\",\"Cuando un tratamiento requiera consentimiento, YAAKOB utilizará el mecanismo correspondiente para obtenerlo y conservar evidencia de éste.\",\"Fecha de última actualización: 13 de agosto de 2026. Yaakob Consultores, S.C. — contacto@yaakob.com — www.yaakob.com.\"]}]},\"terminos\":{\"slug\":\"terminos\",\"label\":\"Términos y condiciones\",\"heading\":\"Términos y condiciones de uso, suscripción y contratación de servicios\",\"subheading\":\"Yaakob Consultores, S.C.\",\"description\":\"Términos y condiciones de uso, suscripción y contratación de servicios de Yaakob Consultores, S.C.\",\"updatedLabel\":\"Última actualización\",\"updated\":\"13 de agosto de 2026\",\"intro\":\"Los presentes términos y condiciones regulan el acceso, navegación y utilización del sitio web de Yaakob Consultores, S.C., así como, en su caso, la contratación de la suscripción de contenido informativo disponible a través del sitio y el proceso de contacto y contratación de servicios profesionales de consultoría fiscal, contable, financiera y demás servicios que, en su caso, sean ofrecidos por Yaakob Consultores, S.C. El acceso y utilización del sitio implica la aceptación de estos términos en la versión vigente al momento de su acceso. En caso de que el usuario no esté de acuerdo con alguno de estos términos, deberá abstenerse de utilizar el sitio y sus servicios.\",\"sections\":[{\"id\":\"titular\",\"heading\":\"1. Titular del sitio\",\"paragraphs\":[\"El sitio web yaakob.com es operado por Yaakob Consultores, S.C., con Registro Federal de Contribuyentes YCO2604212U8.\",\"Domicilio fiscal: Cerrada Durango Sur, Manzana 4, Lote 22, Colonia Unidad Bonito Ecatepec, Ecatepec de Morelos, Estado de México, C.P. 55090.\",\"Domicilio de atención: Alica 40, Lomas de Chapultepec, Miguel Hidalgo, Ciudad de México, C.P. 11000.\",\"Correo electrónico de contacto: contacto@yaakob.com. Teléfonos: +52 55 9008 6360 y +52 55 9008 7881. Horario de atención: lunes a viernes, de 9:00 a 18:00 horas, tiempo del centro de México, salvo días inhábiles o festivos.\",\"Para efectos de estos términos, se entenderá por “Yaakob”, “el despacho”, “nosotros” o “el titular” a Yaakob Consultores, S.C.\"]},{\"id\":\"definiciones\",\"heading\":\"2. Definiciones\",\"paragraphs\":[\"Para efectos de estos términos y condiciones:\"],\"items\":[\"Sitio: el portal web operado por Yaakob Consultores, S.C.\",\"Usuario: toda persona que acceda, navegue, consulte o utilice el sitio.\",\"Suscriptor: usuario que contrate una suscripción de acceso a contenidos informativos mediante el sitio.\",\"Suscripción: servicio digital mediante el cual el suscriptor obtiene acceso, durante el periodo contratado, a contenidos, materiales, publicaciones, herramientas, actualizaciones o información que Yaakob determine y ponga a disposición de los suscriptores.\",\"Servicios profesionales: servicios de consultoría, asesoría, diagnóstico, análisis, acompañamiento, elaboración de informes, estrategias y demás servicios profesionales que Yaakob pueda prestar de conformidad con una propuesta y un contrato específico.\",\"Cliente: persona física o moral que haya formalizado con Yaakob un contrato de prestación de servicios profesionales.\",\"Diagnóstico: proceso previo de análisis de la situación, necesidades, información y documentación proporcionada por un prospecto, cuyo objetivo es determinar, cuando resulte procedente, el alcance y características de una eventual propuesta de servicios.\",\"Propuesta de servicios: documento mediante el cual Yaakob presenta al prospecto el alcance, actividades, entregables, honorarios, condiciones y demás características de los servicios profesionales que, en su caso, se propone contratar.\"]},{\"id\":\"aceptacion\",\"heading\":\"3. Aceptación de los términos\",\"paragraphs\":[\"El acceso al sitio, su navegación, la utilización de sus funcionalidades o la contratación de una suscripción implican la aceptación de los presentes términos y condiciones. Cuando la contratación de un servicio requiera una aceptación expresa, el usuario deberá realizar las acciones que el sitio establezca para manifestar dicha aceptación.\",\"La aceptación electrónica, incluyendo la selección de casillas, botones de aceptación, confirmaciones electrónicas, órdenes de contratación o mecanismos equivalentes, podrá constituir evidencia de la manifestación de voluntad del usuario, en los términos permitidos por la legislación aplicable. El usuario deberá leer estos términos antes de contratar cualquier servicio.\"]},{\"id\":\"naturaleza\",\"heading\":\"4. Naturaleza del sitio y de los contenidos\",\"paragraphs\":[\"El sitio tiene como finalidad proporcionar información general relacionada principalmente con materias fiscales, contables, financieras, empresariales y administrativas, así como poner a disposición determinados contenidos mediante suscripción y facilitar el contacto entre potenciales clientes y Yaakob.\",\"Los contenidos publicados gratuitamente o proporcionados mediante suscripción tienen carácter general e informativo. Salvo que expresamente se indique lo contrario dentro de un contrato de prestación de servicios profesionales, dichos contenidos:\"],\"items\":[\"No constituyen asesoría fiscal personalizada.\",\"No constituyen opinión jurídica o contable respecto de un caso concreto.\",\"No constituyen representación ante autoridades.\",\"No constituyen dictamen profesional respecto de la situación particular del usuario.\",\"No sustituyen el análisis individual de las circunstancias y documentación de cada contribuyente.\"],\"note\":\"La utilización de cualquier contenido del sitio es responsabilidad del usuario.\"},{\"id\":\"actualizacion\",\"heading\":\"5. Actualización de la información\",\"paragraphs\":[\"Yaakob procura que los contenidos publicados sean elaborados con base en fuentes y disposiciones vigentes al momento de su preparación. Sin embargo, las disposiciones fiscales, legales, administrativas, contables y financieras pueden modificarse, derogarse, sustituirse o interpretarse de manera diferente por las autoridades competentes.\",\"Por ello, la publicación de un contenido no implica que éste permanecerá vigente indefinidamente. La fecha de publicación o actualización de cada contenido deberá considerarse para determinar su contexto temporal. Yaakob podrá actualizar, modificar, sustituir o retirar contenidos cuando lo considere necesario.\"]},{\"id\":\"suscripcion\",\"heading\":\"6. Suscripción de contenidos\",\"paragraphs\":[\"Yaakob podrá ofrecer mediante el sitio determinadas modalidades de suscripción para acceder a contenidos informativos. Las características específicas de cada suscripción serán informadas antes de su contratación e incluirán, cuando corresponda: nombre o descripción del servicio, contenido incluido, duración o periodo de vigencia, precio, impuestos aplicables, periodicidad del cobro cuando exista, fecha o momento de cobro, forma de pago, condiciones de renovación, procedimiento de cancelación y restricciones o limitaciones de uso.\",\"La contratación de una suscripción no constituye contratación de servicios profesionales de consultoría fiscal personalizada. El suscriptor tendrá acceso únicamente a los contenidos y funcionalidades expresamente incluidos en la modalidad contratada.\"]},{\"id\":\"cobro-recurrente\",\"heading\":\"7. Suscripciones con cobro recurrente\",\"paragraphs\":[\"Cuando una suscripción implique cobros periódicos o recurrentes, esta circunstancia será informada al usuario de manera clara antes de concluir la contratación. Antes de contratar, el usuario deberá poder conocer, cuando corresponda: el monto del cargo, la periodicidad del cobro, la fecha o momento aproximado del cargo, las condiciones de renovación y el procedimiento para cancelar la suscripción.\",\"La autorización para realizar un pago recurrente no implica autorización para modificar unilateralmente el precio, periodicidad o características esenciales de la suscripción. Cualquier modificación que requiera una nueva autorización será comunicada previamente al suscriptor.\"]},{\"id\":\"cancelacion\",\"heading\":\"8. Cancelación de la suscripción\",\"paragraphs\":[\"El suscriptor podrá cancelar su suscripción mediante el mecanismo de cancelación habilitado por Yaakob. Cuando la modalidad contratada implique pagos recurrentes, Yaakob proporcionará un mecanismo que permita solicitar la cancelación de manera clara y accesible. La cancelación evitará los cargos futuros que correspondan conforme a la modalidad contratada.\",\"La cancelación no implica automáticamente la devolución de cantidades correspondientes a periodos ya iniciados o consumidos, salvo que exista disposición legal aplicable, una condición específica de la suscripción o una circunstancia que expresamente genere derecho a reembolso. Cuando proceda un reembolso, éste se realizará conforme al método de pago utilizado o al mecanismo que resulte aplicable, dentro del plazo correspondiente.\"]},{\"id\":\"precios\",\"heading\":\"9. Precios, impuestos y pagos\",\"paragraphs\":[\"Los precios de las suscripciones serán informados antes de finalizar la contratación. Salvo que expresamente se indique lo contrario, los precios se expresarán en pesos mexicanos. Cuando corresponda, los precios indicarán de manera clara si incluyen o no el Impuesto al Valor Agregado u otros impuestos aplicables.\",\"Los pagos podrán procesarse mediante las plataformas, instituciones financieras o proveedores de servicios de pago que Yaakob determine. Yaakob no almacena información de tarjetas bancarias cuando el procesamiento del pago sea realizado directamente por un tercero especializado, salvo que el proveedor tecnológico utilizado contemple legalmente dicho tratamiento. El usuario deberá consultar también los términos, condiciones y políticas de seguridad de la plataforma de pago utilizada.\"]},{\"id\":\"facturacion\",\"heading\":\"10. Facturación\",\"paragraphs\":[\"Cuando el usuario requiera un comprobante fiscal por los servicios contratados, deberá proporcionar a Yaakob la información fiscal correcta y completa que resulte necesaria para su emisión. La emisión del comprobante fiscal estará sujeta a la información proporcionada por el usuario y a las disposiciones fiscales aplicables. El usuario será responsable de verificar que los datos fiscales proporcionados sean correctos.\"]},{\"id\":\"contratacion-servicios\",\"heading\":\"11. Contratación de servicios profesionales de consultoría\",\"paragraphs\":[\"Los servicios profesionales de Yaakob se contratan mediante un proceso diferente a la suscripción informativa. En términos generales, el proceso podrá comprender:\"],\"items\":[\"Contacto inicial: el interesado podrá solicitar información mediante el sitio, correo electrónico, teléfono, mensajería u otros medios habilitados.\",\"Diagnóstico: Yaakob podrá realizar un diagnóstico preliminar de la situación y necesidades del prospecto, con base en la información y documentación que éste proporcione.\",\"Propuesta de servicios: cuando Yaakob determine que puede atender el asunto, podrá elaborar una propuesta en la que se establecerán, entre otros elementos, alcance, objetivos, actividades, entregables, honorarios, gastos cuando existan, calendario, obligaciones de las partes, condiciones de pago, vigencia de la propuesta y demás condiciones particulares.\",\"Contratación: la prestación de servicios profesionales comenzará únicamente después de que se hayan cumplido las condiciones de contratación establecidas por Yaakob, incluyendo la aceptación de la propuesta de servicios y la formalización del contrato correspondiente.\",\"Acuerdo de confidencialidad: cuando corresponda, las partes suscribirán el acuerdo de confidencialidad respectivo.\"]},{\"id\":\"sin-relacion-automatica\",\"heading\":\"12. Ausencia de relación profesional automática\",\"paragraphs\":[\"El acceso al sitio, la consulta de contenidos, la contratación de una suscripción, el envío de un correo electrónico, la utilización de un formulario de contacto, una llamada telefónica o cualquier comunicación inicial no generan por sí mismos una relación profesional entre el usuario y Yaakob. Tampoco implican aceptación del asunto, obligación de representación, de defensa, de comparecer ante autoridades, de emitir opiniones profesionales, ni obligación de contratar los servicios profesionales.\",\"La relación profesional únicamente se entenderá formalizada cuando Yaakob haya aceptado expresamente el asunto y se hayan cumplido las condiciones establecidas en la propuesta de servicios, contrato de prestación de servicios y demás documentos aplicables.\"]},{\"id\":\"diagnostico-aceptacion\",\"heading\":\"13. Diagnóstico previo y aceptación del asunto\",\"paragraphs\":[\"La realización de un diagnóstico preliminar no obliga a Yaakob a aceptar la prestación de servicios profesionales. Yaakob podrá determinar que un asunto se encuentra fuera de su ámbito de especialidad, requiere servicios que no ofrece, presenta información insuficiente, presenta posibles conflictos de interés, requiere documentación adicional, implica riesgos legales, fiscales o profesionales incompatibles con las políticas del despacho, o no resulta conveniente aceptar por cualquier otra causa legítima.\",\"La decisión de aceptar o no un asunto corresponde exclusivamente a Yaakob, sin que ello implique obligación de justificar públicamente sus criterios internos.\"]},{\"id\":\"conflictos\",\"heading\":\"14. Conflictos de interés\",\"paragraphs\":[\"Antes de aceptar formalmente un asunto, Yaakob podrá realizar las revisiones necesarias para identificar posibles conflictos de interés. El usuario deberá proporcionar información veraz y suficiente para permitir, cuando resulte necesario, dicha revisión.\",\"La existencia de un conflicto de interés podrá ser motivo para rechazar un asunto o para adoptar las medidas que resulten procedentes conforme a la legislación y a las obligaciones profesionales aplicables.\"]},{\"id\":\"informacion-usuario\",\"heading\":\"15. Información proporcionada por el usuario\",\"paragraphs\":[\"El usuario y, en su caso, el cliente, se obliga a proporcionar información verdadera, completa, exacta y actualizada. Yaakob podrá basar sus análisis, recomendaciones y servicios en la información y documentación proporcionada por el cliente.\",\"Yaakob no será responsable por consecuencias derivadas de información falsa, incompleta, incorrecta, alterada, desactualizada, proporcionada fuera de plazo o cuya autenticidad no pueda razonablemente verificarse. El cliente deberá informar oportunamente cualquier circunstancia que pueda modificar sustancialmente la situación objeto del servicio.\"]},{\"id\":\"confidencialidad-previa\",\"heading\":\"16. Confidencialidad de las comunicaciones previas\",\"paragraphs\":[\"La información que el usuario proporcione a través del sitio, formularios, correo electrónico, teléfono o cualquier otro medio de contacto será tratada conforme al aviso de privacidad de Yaakob y, cuando corresponda, bajo las obligaciones de confidencialidad legalmente aplicables. No obstante, el envío de información durante una etapa preliminar no sustituye el acuerdo de confidencialidad que, en su caso, deba celebrarse entre las partes.\",\"Por razones de seguridad, el usuario deberá evitar proporcionar información innecesaria, contraseñas, claves privadas, certificados digitales, accesos a sistemas o documentación altamente sensible durante las primeras comunicaciones, salvo que Yaakob lo solicite expresamente mediante un canal autorizado. La información necesaria para el diagnóstico y prestación de servicios será tratada conforme a los documentos contractuales correspondientes.\"]},{\"id\":\"obligacion-medios\",\"heading\":\"17. Obligaciones de medios y ausencia de garantía de resultados\",\"paragraphs\":[\"Los servicios profesionales de Yaakob se prestan, salvo pacto expreso en contrario y dentro de los límites legalmente permitidos, bajo una obligación de medios y no de resultado. Yaakob realizará sus servicios con la diligencia profesional que corresponda al servicio contratado.\",\"Sin embargo, determinados resultados pueden depender de factores ajenos al control de Yaakob, incluyendo criterios de autoridades, resoluciones administrativas o jurisdiccionales, cambios legislativos, información proporcionada por el cliente, cumplimiento de obligaciones por parte del cliente, actuaciones de terceros, plazos legales, hechos posteriores a la prestación del servicio y demás circunstancias propias de cada asunto.\",\"Por ello, ningún contenido del sitio, antecedente, caso, experiencia, porcentaje, cifra, testimonio o resultado previo constituye garantía de que otro cliente obtendrá un resultado igual o similar.\"]},{\"id\":\"responsabilidad\",\"heading\":\"18. Responsabilidad profesional\",\"paragraphs\":[\"Las limitaciones previstas en estos términos no tendrán por objeto excluir responsabilidades que legalmente no puedan ser excluidas o limitadas. Las obligaciones específicas de Yaakob respecto de cada cliente serán las establecidas en el contrato de prestación de servicios correspondiente.\",\"En caso de existir contradicción entre estos términos y un contrato específico celebrado posteriormente entre Yaakob y el cliente, prevalecerán las disposiciones del contrato específico respecto del servicio contratado.\"]},{\"id\":\"no-permitidos\",\"heading\":\"19. Servicios y actividades no permitidos\",\"paragraphs\":[\"Yaakob presta sus servicios dentro del marco jurídico aplicable. En consecuencia, Yaakob no ofrece ni realizará servicios destinados a:\"],\"items\":[\"Evasión fiscal.\",\"Simulación de operaciones.\",\"Ocultamiento deliberado de ingresos.\",\"Generación o utilización de documentación falsa.\",\"Expedición o adquisición de comprobantes fiscales que amparen operaciones inexistentes.\",\"Alteración o manipulación fraudulenta de registros.\",\"Ocultamiento de información a autoridades.\",\"Lavado de dinero u operaciones con recursos de procedencia ilícita.\",\"Cualquier otra conducta contraria a la legislación aplicable.\"],\"note\":\"Yaakob podrá rechazar, suspender o terminar un servicio cuando detecte que el encargo pudiera implicar conductas ilícitas o información deliberadamente falsa o incompleta. Cuando resulte aplicable, Yaakob cumplirá las obligaciones que le correspondan conforme a la legislación en materia de prevención e identificación de operaciones con recursos de procedencia ilícita.\"},{\"id\":\"propiedad-intelectual\",\"heading\":\"20. Propiedad intelectual\",\"paragraphs\":[\"Todos los elementos del sitio, incluyendo, entre otros, textos, artículos, análisis, metodologías, modelos, bases de datos, documentos, presentaciones, gráficos, fotografías, videos, logotipos, marcas, nombres comerciales, diseños, interfaces, código fuente, materiales descargables, contenidos de las suscripciones y demás elementos protegibles, son propiedad de Yaakob o de terceros que hayan autorizado su utilización.\",\"El acceso al sitio o la contratación de una suscripción no implica transmisión de derechos de propiedad intelectual. Salvo autorización expresa y por escrito de Yaakob, queda prohibido reproducir masivamente los contenidos, comercializarlos, revenderlos, distribuirlos, incorporarlos a productos de terceros, publicarlos nuevamente, modificar sustancialmente su contenido, utilizarlos para crear servicios competidores, extraer sistemáticamente información mediante procesos automatizados o utilizarlos con fines distintos de los permitidos por estos términos.\",\"El contenido proporcionado mediante suscripción está destinado exclusivamente al suscriptor contratado y no podrá compartirse con terceros. Lo anterior se establece sin perjuicio de los derechos que correspondan conforme a la legislación aplicable en materia de derechos de autor y propiedad industrial.\"]},{\"id\":\"uso-contenidos\",\"heading\":\"21. Uso de los contenidos de la suscripción\",\"paragraphs\":[\"El acceso a los contenidos mediante suscripción es personal e intransferible, salvo autorización expresa de Yaakob. El suscriptor no podrá compartir sus credenciales con terceros. Yaakob podrá establecer mecanismos razonables de seguridad para proteger el acceso al contenido.\",\"Cuando existan indicios razonables de uso fraudulento, acceso no autorizado o distribución indebida de contenidos, Yaakob podrá adoptar medidas de protección, incluyendo la suspensión temporal del acceso y, cuando corresponda, la terminación de la suscripción, sin perjuicio de las acciones legales que pudieran proceder.\"]},{\"id\":\"uso-permitido\",\"heading\":\"22. Uso permitido del sitio\",\"paragraphs\":[\"El usuario se obliga a utilizar el sitio conforme a la ley, la buena fe y estos términos. Queda prohibido:\"],\"items\":[\"Utilizar el sitio con fines ilícitos.\",\"Afectar derechos de terceros.\",\"Intentar acceder a áreas restringidas.\",\"Introducir código malicioso.\",\"Afectar deliberadamente la disponibilidad del sitio.\",\"Intentar vulnerar sus mecanismos de seguridad.\",\"Utilizar procesos automatizados para extraer información de manera sistemática sin autorización.\",\"Suplantar la identidad de terceros.\",\"Proporcionar información deliberadamente falsa.\",\"Utilizar los contenidos para actividades fraudulentas.\",\"Compartir indebidamente credenciales de acceso.\",\"Reproducir o comercializar contenidos protegidos sin autorización.\"]},{\"id\":\"disponibilidad\",\"heading\":\"23. Disponibilidad del sitio\",\"paragraphs\":[\"Yaakob realizará esfuerzos razonables para mantener disponible el sitio. No obstante, no garantiza que éste opere de manera ininterrumpida o libre de errores. La disponibilidad podrá verse afectada por mantenimiento, actualizaciones, fallas de proveedores, problemas de conectividad, fallas de servidores, ataques informáticos, acontecimientos de fuerza mayor, actos de autoridad o circunstancias ajenas al control razonable de Yaakob.\",\"Yaakob procurará restablecer el servicio en el menor tiempo razonablemente posible.\"]},{\"id\":\"enlaces\",\"heading\":\"24. Enlaces a sitios de terceros\",\"paragraphs\":[\"El sitio podrá contener enlaces hacia sitios web, plataformas, autoridades, instituciones, medios de comunicación, redes sociales u otros servicios de terceros. Estos enlaces se proporcionan como referencia o herramienta de utilidad.\",\"Yaakob no controla necesariamente dichos sitios y no será responsable por su contenido, disponibilidad, seguridad, políticas de privacidad, prácticas comerciales o funcionamiento. El acceso a sitios de terceros será responsabilidad del usuario.\"]},{\"id\":\"datos-personales\",\"heading\":\"25. Protección de datos personales\",\"paragraphs\":[\"El tratamiento de los datos personales recabados a través del sitio se realizará conforme al aviso de privacidad de Yaakob, disponible en yaakob.com/privacidad. El aviso de privacidad forma parte del marco jurídico aplicable al tratamiento de datos personales realizado por Yaakob.\",\"El usuario deberá consultar dicho documento antes de proporcionar información personal. Cuando el tratamiento de datos requiera consentimiento, Yaakob utilizará los mecanismos correspondientes conforme a la legislación aplicable.\"],\"link\":{\"label\":\"Consultar aviso de privacidad\",\"href\":\"/privacidad\"}},{\"id\":\"seguridad\",\"heading\":\"26. Seguridad de la información\",\"paragraphs\":[\"Yaakob implementará medidas administrativas, técnicas y físicas razonables para proteger la información bajo su responsabilidad, de conformidad con la naturaleza de los datos y las obligaciones legales aplicables. No obstante, ningún sistema conectado a internet puede garantizar seguridad absoluta.\",\"El usuario deberá mantener bajo resguardo sus contraseñas y demás elementos de autenticación y deberá informar inmediatamente a Yaakob cualquier uso no autorizado de sus credenciales.\"]},{\"id\":\"comunicaciones\",\"heading\":\"27. Comunicaciones electrónicas\",\"paragraphs\":[\"El usuario acepta que determinadas comunicaciones relacionadas con el sitio, suscripciones, solicitudes, contratación, facturación, soporte y demás servicios puedan realizarse mediante medios electrónicos, incluyendo correo electrónico, notificaciones dentro del sitio, mensajes, confirmaciones electrónicas, comprobantes, avisos relacionados con la suscripción y otros medios digitales habilitados.\",\"El usuario será responsable de proporcionar y mantener actualizados sus datos de contacto.\"]},{\"id\":\"registros\",\"heading\":\"28. Registros electrónicos\",\"paragraphs\":[\"Cuando el usuario realice una contratación electrónica, Yaakob podrá conservar registros relacionados con la operación, incluyendo, cuando resulte técnicamente posible y legalmente procedente: fecha y hora, datos de identificación, aceptación de términos, versión de los términos aceptada, confirmaciones, información de la operación, comprobantes, comunicaciones y demás registros necesarios para acreditar la operación.\",\"Estos registros podrán utilizarse como evidencia de las operaciones realizadas mediante el sitio, conforme a la legislación aplicable.\"]},{\"id\":\"capacidad\",\"heading\":\"29. Capacidad para contratar\",\"paragraphs\":[\"El usuario declara que cuenta con capacidad legal suficiente para aceptar estos términos y, cuando corresponda, para contratar los servicios ofrecidos mediante el sitio. Cuando una persona actúe en representación de una persona moral, deberá contar con facultades suficientes para realizar la operación correspondiente.\"]},{\"id\":\"modificaciones\",\"heading\":\"30. Modificaciones al sitio y a estos términos\",\"paragraphs\":[\"Yaakob podrá modificar, actualizar, complementar o retirar contenidos y funcionalidades del sitio. Asimismo, podrá actualizar estos términos cuando resulte necesario por cambios legales, tecnológicos, comerciales o en los servicios ofrecidos.\",\"La versión modificada surtirá efectos a partir de su publicación en el sitio, salvo que la legislación aplicable o la naturaleza de una relación contractual requieran un tratamiento distinto. Las modificaciones no tendrán efectos retroactivos sobre obligaciones contractuales ya perfeccionadas, salvo que exista fundamento legal o acuerdo expreso de las partes. La fecha de última actualización será indicada al inicio del documento.\"]},{\"id\":\"fuerza-mayor\",\"heading\":\"31. Fuerza mayor\",\"paragraphs\":[\"Yaakob no será responsable por incumplimientos o retrasos derivados de acontecimientos imprevisibles, inevitables o fuera de su control razonable, incluyendo, entre otros: desastres naturales, incendios, inundaciones, pandemias o emergencias sanitarias, interrupciones generalizadas de telecomunicaciones, fallas de proveedores críticos, ataques cibernéticos, actos de autoridad, conflictos sociales o laborales, actos de terceros o cualquier otro acontecimiento que razonablemente impida o dificulte el cumplimiento de una obligación.\",\"Una vez superada la circunstancia, Yaakob procurará reanudar sus actividades.\"]},{\"id\":\"nulidad-parcial\",\"heading\":\"32. Nulidad parcial\",\"paragraphs\":[\"Si alguna disposición de estos términos fuera declarada inválida, ilegal o inaplicable por autoridad competente, dicha circunstancia no afectará la validez de las demás disposiciones. La disposición afectada se interpretará, en la medida legalmente posible, de manera que conserve su finalidad original.\"]},{\"id\":\"no-renuncia\",\"heading\":\"33. No renuncia\",\"paragraphs\":[\"La falta de ejercicio inmediato de cualquier derecho previsto en estos términos no constituirá una renuncia al mismo. La renuncia a un derecho deberá constar expresamente y por escrito cuando así lo exija la legislación aplicable.\"]},{\"id\":\"relacion-contratos\",\"heading\":\"34. Relación entre estos términos y los contratos de servicios\",\"paragraphs\":[\"Estos términos regulan principalmente el uso del sitio y la contratación de las suscripciones. Los servicios profesionales de consultoría se regirán además por la propuesta de servicios, el contrato de prestación de servicios profesionales, el acuerdo de confidencialidad y demás documentos que, en su caso, sean suscritos entre Yaakob y el cliente.\",\"En caso de contradicción respecto de un servicio profesional específico, prevalecerán las disposiciones expresamente pactadas en el contrato correspondiente.\"]},{\"id\":\"consumidores\",\"heading\":\"35. Derechos de los consumidores\",\"paragraphs\":[\"Cuando una operación realizada mediante el sitio se encuentre dentro del ámbito de aplicación de la legislación mexicana de protección al consumidor, Yaakob respetará los derechos que correspondan al usuario conforme a dicha legislación. Nada de lo previsto en estos términos deberá interpretarse como una renuncia o limitación de derechos que legalmente tengan carácter irrenunciable.\",\"En particular, cuando resulte aplicable, Yaakob proporcionará información clara sobre las características de la suscripción, precio, cargos, periodicidad, condiciones de contratación y mecanismos de cancelación.\"]},{\"id\":\"aclaraciones\",\"heading\":\"36. Atención de aclaraciones y reclamaciones\",\"paragraphs\":[\"El usuario podrá presentar dudas, aclaraciones, solicitudes o reclamaciones relacionadas con el sitio o los servicios mediante el correo electrónico contacto@yaakob.com o los teléfonos +52 55 9008 6360 y +52 55 9008 7881, en horario de atención de lunes a viernes, de 9:00 a 18:00 horas, tiempo del centro de México.\",\"Yaakob procurará atender las solicitudes dentro de un plazo razonable, considerando su naturaleza y complejidad.\"]},{\"id\":\"legislacion\",\"heading\":\"37. Legislación aplicable\",\"paragraphs\":[\"Estos términos se regirán e interpretarán conforme a las leyes aplicables de los Estados Unidos Mexicanos. Cuando corresponda, serán aplicables, entre otras disposiciones, las normas mexicanas relativas a comercio electrónico, protección al consumidor, protección de datos personales, propiedad intelectual, prestación de servicios, obligaciones civiles y mercantiles, y demás legislación aplicable a la relación concreta.\"]},{\"id\":\"jurisdiccion\",\"heading\":\"38. Jurisdicción\",\"paragraphs\":[\"Para la interpretación y cumplimiento de estos términos, las partes se someterán a la jurisdicción de los tribunales competentes de la Ciudad de México, salvo que la legislación aplicable establezca una jurisdicción distinta o que existan derechos del consumidor que no puedan ser válidamente renunciados.\",\"Lo anterior se entiende sin perjuicio de los mecanismos administrativos o alternativos de solución de controversias que legalmente resulten aplicables.\"]},{\"id\":\"idioma\",\"heading\":\"39. Idioma\",\"paragraphs\":[\"Estos términos se encuentran redactados en idioma español. En caso de que Yaakob publique una traducción a otro idioma, la versión en español será la versión de referencia para efectos de interpretación, salvo que la legislación aplicable disponga lo contrario.\"]},{\"id\":\"vigencia\",\"heading\":\"40. Fecha de vigencia\",\"paragraphs\":[\"Los presentes términos y condiciones entran en vigor a partir de su publicación en el sitio. Última actualización: 13 de agosto de 2026.\"]},{\"id\":\"contacto\",\"heading\":\"41. Contacto\",\"paragraphs\":[\"Para cualquier duda, aclaración, comentario o solicitud relacionada con estos términos y condiciones: Yaakob Consultores, S.C. Correo electrónico: contacto@yaakob.com. Teléfonos: +52 55 9008 6360 y +52 55 9008 7881. Horario de atención: lunes a viernes de 9:00 a 18:00 horas, tiempo del centro de México.\",\"Domicilio fiscal: Cerrada Durango Sur, Manzana 4, Lote 22, Colonia Unidad Bonito Ecatepec, Ecatepec de Morelos, Estado de México, C.P. 55090. Domicilio de atención: Alica 40, Lomas de Chapultepec, Miguel Hidalgo, Ciudad de México, C.P. 11000.\",\"Documentos relacionados: aviso de privacidad, política de cookies, política de suscripción, cancelación y reembolsos, propuesta de servicios profesionales, contrato de prestación de servicios profesionales y acuerdo de confidencialidad.\"],\"link\":{\"label\":\"Consultar aviso de privacidad\",\"href\":\"/privacidad\"}}]}}"));}),
"[project]/pages/privacidad.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>Privacidad,
    "getStaticProps",
    ()=>getStaticProps
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$legal$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/servicios-lib/components/legal/index.ts [ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$legal$2f$LegalPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/legal/LegalPage.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$data$2f$legal$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/servicios-lib/data/legal.json (json)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$legal$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$legal$2f$LegalPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$legal$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$legal$2f$LegalPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
function Privacidad({ document }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$legal$2f$LegalPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["LegalPage"], {
        document: document
    }, void 0, false, {
        fileName: "[project]/pages/privacidad.tsx",
        lineNumber: 8,
        columnNumber: 10
    }, this);
}
const getStaticProps = async ()=>({
        props: {
            document: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$data$2f$legal$2e$json__$28$json$29$__["default"].privacidad
        }
    });
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8f85801f._.js.map