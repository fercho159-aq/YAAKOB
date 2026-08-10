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
const GOLD = '#E0BE7A';
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
                    lineNumber: 117,
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
                            lineNumber: 149,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/servicios-lib/components/chrome/Footer.tsx",
                        lineNumber: 145,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/servicios-lib/components/chrome/Footer.tsx",
                    lineNumber: 127,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/servicios-lib/components/chrome/Footer.tsx",
            lineNumber: 116,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/servicios-lib/components/chrome/Footer.tsx",
        lineNumber: 97,
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
                    5
                ],
                rowStart: [
                    2,
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
                                '90%',
                                null,
                                '355px'
                            ],
                            maxW: "355px",
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
                            lineNumber: 233,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/servicios-lib/components/chrome/Footer.tsx",
                        lineNumber: 224,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/servicios-lib/components/chrome/Footer.tsx",
                    lineNumber: 223,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/chrome/Footer.tsx",
                lineNumber: 215,
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
                        lineNumber: 258,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/chrome/Footer.tsx",
                lineNumber: 249,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/servicios-lib/components/chrome/Footer.tsx",
        lineNumber: 202,
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
                                    color: "goldAlt",
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
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$MenuOverlay$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/MenuOverlay.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Wordmark$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/Wordmark.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/motion.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$MenuOverlay$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Wordmark$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$MenuOverlay$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Wordmark$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
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
function MenuToggle({ animate = true, minimal = false, onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["MotionFlex"], {
        as: "button",
        "aria-label": "Toggle menu",
        h: "2.0625rem",
        p: "0.625rem",
        minWidth: 0,
        pos: "fixed",
        top: minimal ? {
            base: '0.5rem',
            xl: '0.5rem'
        } : {
            base: '0.875rem',
            xl: '1.5rem'
        },
        right: {
            base: '0.75rem',
            xl: '1.5rem'
        },
        zIndex: "navigation",
        variants: buttonVariants,
        initial: "hidden",
        animate: animate ? 'visible' : undefined,
        whileHover: "hover",
        onClick: onClick,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Box"], {
                as: "span",
                mr: {
                    base: '0.6875rem',
                    xl: '0.875rem'
                },
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
                    children: "Menu"
                }, void 0, false, {
                    fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                    lineNumber: 69,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Flex"], {
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
                        lineNumber: 80,
                        columnNumber: 9
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
                        lineNumber: 81,
                        columnNumber: 9
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
                        lineNumber: 90,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
function Navigation({ animate = true, minimal = false, menuFooter }) {
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const lastSegment = router.asPath.split('/').pop();
    const logoHiddenOnMobile = router.asPath !== '/' && router.asPath !== '/account-settings' && lastSegment !== 'play';
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
                w: "8rem",
                mt: "-0.25rem",
                zIndex: "navigation",
                visibility: {
                    base: logoHiddenOnMobile ? 'hidden' : undefined,
                    xl: 'visible'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Wordmark$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["AnimatedWordmark"], {
                    animate: animate,
                    label: "YAAKOB",
                    title: "Yaakob"
                }, void 0, false, {
                    fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                    lineNumber: 141,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(MenuToggle, {
                animate: animate,
                minimal: minimal,
                onClick: ()=>setIsOpen((open)=>!open)
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                lineNumber: 144,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$MenuOverlay$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["MenuOverlay"], {
                isOpen: isOpen,
                onClose: ()=>setIsOpen(false),
                footer: menuFooter
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                lineNumber: 146,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
        lineNumber: 122,
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
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$MenuOverlay$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/MenuOverlay.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Navigation$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/Navigation.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/motion.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Wordmark$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Cursor$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Footer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Loader$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$MenuOverlay$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Navigation$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Wordmark$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Cursor$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Footer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Loader$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$MenuOverlay$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Navigation$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/servicios-lib/components/home/hooks.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useIsDesktop",
    ()=>useIsDesktop,
    "useIsTouchDevice",
    ()=>useIsTouchDevice,
    "useWindowSize",
    ()=>useWindowSize
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/home/constants.ts [ssr] (ecmascript)");
;
;
function readSize() {
    return {
        width: Math.max(document.documentElement.clientWidth, window.innerWidth) || 0,
        height: Math.max(document.documentElement.clientHeight, window.innerHeight) || 0
    };
}
function useWindowSize(delay = 200) {
    const [size, setSize] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        width: 0,
        height: 0
    });
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        let timer = null;
        const update = ()=>{
            if (timer) clearTimeout(timer);
            timer = setTimeout(()=>setSize(readSize()), delay);
        };
        setSize(readSize());
        window.addEventListener('resize', update);
        return ()=>{
            if (timer) clearTimeout(timer);
            window.removeEventListener('resize', update);
        };
    }, [
        delay
    ]);
    return size;
}
function useIsDesktop() {
    const [isDesktop, setIsDesktop] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const query = window.matchMedia(`(min-width: ${__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["BREAKPOINT_XL"]}px)`);
        const update = ()=>setIsDesktop(query.matches);
        update();
        query.addEventListener('change', update);
        return ()=>query.removeEventListener('change', update);
    }, []);
    return isDesktop;
}
function useIsTouchDevice() {
    const [isTouch, setIsTouch] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, []);
    return isTouch;
}
}),
"[project]/servicios-lib/components/home/SlideCorners.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "SlideCorners",
    ()=>SlideCorners
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/home/constants.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/home/motion.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
const GOLD = '#E0BE7A';
const ARM = 8;
/** Half of the 1.5px stroke, so the corner sits fully inside the canvas. */ const INSET = 0.75;
const variants = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["VARIANTS"].hidden]: {
        scale: 0.95
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["VARIANTS"].visible]: {
        scale: 1,
        opacity: [
            0,
            1,
            0,
            1,
            0,
            1
        ],
        transition: {
            ease: 'easeIn',
            duration: 0.3,
            scale: {
                ease: [
                    0.25,
                    0,
                    0,
                    1
                ],
                duration: 1
            }
        }
    }
};
function SlideCorners(props) {
    const ref = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const canvas = ref.current;
        if (!canvas) return;
        const ratio = window.devicePixelRatio || 1;
        const width = canvas.offsetWidth;
        const height = canvas.offsetHeight;
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.scale(ratio, ratio);
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = GOLD;
        ctx.lineWidth = 1.5;
        const corner = (x, y, dx, dy)=>{
            ctx.beginPath();
            ctx.moveTo(x, y + dy * ARM);
            ctx.lineTo(x, y);
            ctx.lineTo(x + dx * ARM, y);
            ctx.stroke();
        };
        corner(INSET, INSET, 1, 1);
        corner(width - INSET, INSET, -1, 1);
        corner(width - INSET, height - INSET, -1, -1);
        corner(INSET, height - INSET, 1, -1);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["MotionCanvas"], {
        pos: "absolute",
        w: "100%",
        h: "100%",
        pointerEvents: "none",
        opacity: "0",
        variants: variants,
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/servicios-lib/components/home/SlideCorners.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/servicios-lib/components/home/GameSlide.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GameSlide",
    ()=>GameSlide
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__ = __turbopack_context__.i("[externals]/@chakra-ui/react [external] (@chakra-ui/react, esm_import, [project]/node_modules/@chakra-ui/react)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/servicios-lib/components/svg/index.ts [ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$StackedWordmark$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/svg/StackedWordmark.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$AnimatedHeading$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/home/AnimatedHeading.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/home/constants.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$hooks$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/home/hooks.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/home/motion.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$SlideCorners$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/home/SlideCorners.tsx [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$StackedWordmark$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$AnimatedHeading$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$SlideCorners$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$StackedWordmark$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$AnimatedHeading$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$SlideCorners$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
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
/**
 * The wordmark slot overhangs the thumbnail. It is one width for every item —
 * the mark is set at a fixed size and left-aligned, so rows end where the label
 * ends instead of being fitted to a per-item box. Authored against a 390px-wide
 * slide, sized for the longest label in the set.
 */ const WORDMARK_SLOT_XL = 565;
/** The slide itself: dims to 0.6 when it is not the active one. */ const slideVariants = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["VARIANTS"].hidden]: {
        x: 0,
        opacity: 0.6,
        transition: {
            duration: 1,
            ease: [
                0.2,
                0,
                0,
                1
            ]
        }
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["VARIANTS"].visible]: (isDesktop)=>({
            x: isDesktop ? -20 : 0,
            opacity: 1,
            transition: {
                duration: 1,
                ease: [
                    0.2,
                    0,
                    0,
                    1
                ]
            }
        })
};
/**
 * Two empty layers the original hung decorative art on, one behind the
 * thumbnail and one in front. The art is not part of this rebuild, but the
 * slots stay: they are load-bearing for the stacking order around the
 * thumbnail, and are where a neutral flourish would go.
 */ const overlayVariants = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["VARIANTS"].hidden]: {
        opacity: 0
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["VARIANTS"].visible]: {
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: 'linear',
            delay: 1,
            staggerChildren: 1,
            delayChildren: 0
        }
    }
};
/** Thumbnail: the frame drops in from above while the image slides up inside it. */ const thumbnailFrameVariants = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["VARIANTS"].hidden]: {
        y: '-100%'
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["VARIANTS"].visible]: {
        y: '0%',
        transition: {
            ease: [
                0.25,
                0,
                0,
                1
            ],
            duration: 1
        }
    }
};
const thumbnailImageVariants = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["VARIANTS"].hidden]: {
        y: '100%'
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["VARIANTS"].visible]: {
        y: '0%',
        transition: {
            ease: [
                0.25,
                0,
                0,
                1
            ],
            duration: 1
        }
    }
};
/** Logo and tagline rise into their clipping mask. */ const riseVariants = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["VARIANTS"].hidden]: {
        y: '100%',
        opacity: 0
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["VARIANTS"].visible]: (delay)=>({
            y: '0%',
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [
                    0,
                    0,
                    0,
                    1
                ],
                delay: delay + 0.5 || 0.5
            }
        })
};
const fadeVariants = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["VARIANTS"].hidden]: {
        opacity: 0
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["VARIANTS"].visible]: ({ delay, duration })=>({
            opacity: 1,
            transition: {
                duration,
                delay
            }
        })
};
const pillVariants = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["VARIANTS"].hidden]: {
        scale: 0
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["VARIANTS"].visible]: (delay)=>({
            scale: 1,
            transition: {
                duration: 0.3,
                delay
            }
        })
};
const pillLabelVariants = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["VARIANTS"].hidden]: {
        opacity: 0
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["VARIANTS"].visible]: (delay)=>({
            opacity: [
                0,
                1,
                0.5,
                1,
                0.5,
                1
            ],
            transition: {
                ease: 'linear',
                duration: 0.25,
                delay
            }
        })
};
function Thumbnail({ src, alt, animate = true }) {
    const [loaded, setLoaded] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["MotionBox"], {
        variants: thumbnailFrameVariants,
        initial: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["VARIANTS"].hidden,
        animate: animate && loaded ? __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["VARIANTS"].visible : __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["VARIANTS"].hidden,
        overflow: "hidden",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["MotionAspectRatio"], {
            variants: thumbnailImageVariants,
            ratio: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["SLIDE_WIDTH_XL"] / __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["SLIDE_HEIGHT_XL"],
            w: "100%",
            border: "1px solid rgba(255,255,255,0.2)",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                src: src,
                fill: true,
                sizes: "100vw",
                style: {
                    objectFit: 'cover'
                },
                alt: alt,
                onLoad: ()=>setLoaded(true)
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/home/GameSlide.tsx",
                lineNumber: 103,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/servicios-lib/components/home/GameSlide.tsx",
            lineNumber: 97,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/servicios-lib/components/home/GameSlide.tsx",
        lineNumber: 91,
        columnNumber: 5
    }, this);
}
function WordmarkAndTagline({ label, tagline, isActive }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Box"], {
        pos: "absolute",
        bottom: {
            base: '0.9375rem',
            xl: 'auto'
        },
        top: {
            xl: '16.5rem'
        },
        left: {
            base: '-1.625rem',
            xl: '-16.125rem'
        },
        w: {
            base: 'calc(100% + 3.25rem)',
            xl: (0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["slideWidthPct"])(WORDMARK_SLOT_XL)
        },
        pointerEvents: isActive ? undefined : 'none',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Box"], {
                overflow: "hidden",
                w: "100%",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["MotionBox"], {
                    variants: riseVariants,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$StackedWordmark$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["StackedWordmark"], {
                        label: label.toUpperCase(),
                        title: `${label} wordmark`
                    }, void 0, false, {
                        fileName: "[project]/servicios-lib/components/home/GameSlide.tsx",
                        lineNumber: 137,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/servicios-lib/components/home/GameSlide.tsx",
                    lineNumber: 136,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/home/GameSlide.tsx",
                lineNumber: 135,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Box"], {
                mt: {
                    base: '0.6875rem',
                    xl: '1.875rem'
                },
                overflow: "hidden",
                fontSize: {
                    base: '1.125rem',
                    xl: '1.5rem'
                },
                lineHeight: {
                    base: '1.375rem',
                    xl: '1.75rem'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["MotionBox"], {
                    _after: {
                        content: '""',
                        display: 'block',
                        w: '0.9375rem',
                        h: '0.1875rem',
                        mt: '1.125rem',
                        bg: 'gold'
                    },
                    variants: riseVariants,
                    custom: 0.3,
                    children: tagline
                }, void 0, false, {
                    fileName: "[project]/servicios-lib/components/home/GameSlide.tsx",
                    lineNumber: 146,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/home/GameSlide.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/servicios-lib/components/home/GameSlide.tsx",
        lineNumber: 126,
        columnNumber: 5
    }, this);
}
function TagPill({ label, delay = 0 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["MotionBox"], {
        display: "inline-flex",
        alignItems: "center",
        h: "1.5625rem",
        px: "0.5rem",
        border: "1px solid rgba(224,190,122,0.4)",
        fontSize: "0.6875rem",
        fontWeight: "semibold",
        textAlign: "center",
        textTransform: "uppercase",
        variants: pillVariants,
        custom: delay,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["MotionSpan"], {
            variants: pillLabelVariants,
            custom: delay + 0.3,
            children: label
        }, void 0, false, {
            fileName: "[project]/servicios-lib/components/home/GameSlide.tsx",
            lineNumber: 180,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/servicios-lib/components/home/GameSlide.tsx",
        lineNumber: 167,
        columnNumber: 5
    }, this);
}
function AboutPanel({ heading, description, tags, isActive, delay = 0 }) {
    // Inactive slides scramble their heading away to nothing.
    const [visibleHeading, setVisibleHeading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(heading);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        setVisibleHeading(isActive ? heading : '');
    }, [
        heading,
        isActive
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["MotionBox"], {
        variants: fadeVariants,
        custom: {
            delay: 0,
            duration: 0.01
        },
        pos: {
            base: 'relative',
            xl: 'absolute'
        },
        bottom: "0",
        left: {
            base: '-1.625rem',
            xl: '100%'
        },
        mt: {
            base: '4.25rem',
            xl: 0
        },
        pl: {
            xl: '4rem'
        },
        w: {
            base: 'calc(100% + 3.25rem)',
            xl: (0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["slideWidthPct"])(348)
        },
        pointerEvents: isActive ? 'none' : undefined,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$AnimatedHeading$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["AnimatedHeading"], {
                type: "h2",
                delay: delay + 1,
                children: visibleHeading
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/home/GameSlide.tsx",
                lineNumber: 213,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["MotionParagraph"], {
                mt: {
                    base: '1.125rem',
                    xl: '0.8125rem'
                },
                fontSize: {
                    base: 'sm',
                    xl: 'md'
                },
                lineHeight: {
                    base: '1.25rem',
                    xl: '1.375rem'
                },
                letterSpacing: "0.02em",
                variants: fadeVariants,
                custom: {
                    delay: delay + 1.2,
                    duration: 0.5
                },
                children: description
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/home/GameSlide.tsx",
                lineNumber: 216,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["List"], {
                display: "flex",
                flexWrap: "wrap",
                mt: {
                    base: '0.625rem',
                    xl: '0.75rem'
                },
                children: tags.map((tag, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["ListItem"], {
                        mt: "0.5rem",
                        mr: "0.625rem",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(TagPill, {
                            label: tag,
                            delay: delay + 1.4 + 0.1 * index
                        }, void 0, false, {
                            fileName: "[project]/servicios-lib/components/home/GameSlide.tsx",
                            lineNumber: 229,
                            columnNumber: 13
                        }, this)
                    }, tag, false, {
                        fileName: "[project]/servicios-lib/components/home/GameSlide.tsx",
                        lineNumber: 228,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/home/GameSlide.tsx",
                lineNumber: 226,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/servicios-lib/components/home/GameSlide.tsx",
        lineNumber: 202,
        columnNumber: 5
    }, this);
}
function GameSlide({ id, index, label, thumbnail, tagline, about, isActive, animateThumbnail = true }) {
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const isDesktop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$hooks$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["useIsDesktop"])();
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        setMounted(true);
    }, []);
    const overlayState = isActive && mounted ? __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["VARIANTS"].visible : __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["VARIANTS"].hidden;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["MotionBox"], {
        custom: isDesktop,
        variants: slideVariants,
        initial: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["VARIANTS"].hidden,
        animate: isActive ? __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["VARIANTS"].visible : __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["VARIANTS"].hidden,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Box"], {
                pos: "relative",
                children: [
                    isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$SlideCorners$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["SlideCorners"], {
                        top: {
                            base: '-1.5rem',
                            xl: '-2.1875rem'
                        },
                        left: {
                            base: '-1.5625rem',
                            xl: '-2.125rem'
                        },
                        w: {
                            base: 'calc(100% + 3.125rem)',
                            xl: 'calc(100% + 4.25rem)'
                        },
                        h: {
                            base: 'calc(100% + 3.25rem)',
                            xl: 'calc(100% + 4.625rem)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/servicios-lib/components/home/GameSlide.tsx",
                        lineNumber: 277,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["MotionBox"], {
                        variants: overlayVariants,
                        custom: isActive,
                        initial: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["VARIANTS"].hidden,
                        animate: overlayState,
                        pointerEvents: "none"
                    }, void 0, false, {
                        fileName: "[project]/servicios-lib/components/home/GameSlide.tsx",
                        lineNumber: 284,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Thumbnail, {
                        src: thumbnail.src,
                        alt: thumbnail.alt,
                        animate: animateThumbnail
                    }, void 0, false, {
                        fileName: "[project]/servicios-lib/components/home/GameSlide.tsx",
                        lineNumber: 291,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["MotionBox"], {
                        variants: overlayVariants,
                        custom: isActive,
                        initial: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["VARIANTS"].hidden,
                        animate: overlayState,
                        pointerEvents: "none"
                    }, void 0, false, {
                        fileName: "[project]/servicios-lib/components/home/GameSlide.tsx",
                        lineNumber: 292,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(WordmarkAndTagline, {
                        label: label,
                        tagline: tagline,
                        isActive: isActive
                    }, void 0, false, {
                        fileName: "[project]/servicios-lib/components/home/GameSlide.tsx",
                        lineNumber: 299,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/servicios-lib/components/home/GameSlide.tsx",
                lineNumber: 275,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(AboutPanel, {
                isActive: isActive,
                heading: about.heading,
                description: about.description,
                tags: about.tags
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/home/GameSlide.tsx",
                lineNumber: 301,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/servicios-lib/components/home/GameSlide.tsx",
        lineNumber: 269,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/servicios-lib/components/home/GameCarousel.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GameCarousel",
    ()=>GameCarousel
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__ = __turbopack_context__.i("[externals]/@chakra-ui/react [external] (@chakra-ui/react, esm_import, [project]/node_modules/@chakra-ui/react)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$swiper$2f$modules__$5b$external$5d$__$28$swiper$2f$modules$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$swiper$29$__ = __turbopack_context__.i("[externals]/swiper/modules [external] (swiper/modules, esm_import, [project]/node_modules/swiper)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$swiper$2f$react__$5b$external$5d$__$28$swiper$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$swiper$29$__ = __turbopack_context__.i("[externals]/swiper/react [external] (swiper/react, esm_import, [project]/node_modules/swiper)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/index.ts [ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Cursor$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/Cursor.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/home/constants.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$GameSlide$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/home/GameSlide.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$hooks$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/home/hooks.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$swiper$2f$modules__$5b$external$5d$__$28$swiper$2f$modules$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$swiper$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$swiper$2f$react__$5b$external$5d$__$28$swiper$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$swiper$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Cursor$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$GameSlide$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$swiper$2f$modules__$5b$external$5d$__$28$swiper$2f$modules$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$swiper$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$swiper$2f$react__$5b$external$5d$__$28$swiper$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$swiper$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Cursor$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$GameSlide$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
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
const SwiperContainer = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["chakra"])(__TURBOPACK__imported__module__$5b$externals$5d2f$swiper$2f$react__$5b$external$5d$__$28$swiper$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$swiper$29$__["Swiper"]);
const SlideLink = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["chakra"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"]);
/** The `.css-942crq` rule set from the original, minus what maps to style props. */ const swiperSx = {
    '@media (min-width: 62.0625em) and (min-height: 900px)': {
        marginBottom: '5rem',
        paddingTop: '4.375rem',
        paddingBottom: '4.375rem'
    },
    '& .swiper-wrapper': {
        transitionTimingFunction: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["SLIDER_EASING"]
    },
    '& .swiper-pagination': {
        position: 'absolute',
        // Sits in the gap between the top of the carousel and the slide image.
        top: 0,
        bottom: 'auto',
        width: '100%',
        textAlign: 'center',
        '& .swiper-pagination-bullet': {
            position: 'relative',
            display: 'inline-block',
            width: '0.6875rem',
            height: '0.125rem',
            marginRight: '0.5rem',
            marginLeft: '0.5rem',
            backgroundColor: '#ffffff',
            opacity: 0.6,
            boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.6)',
            transition: 'opacity 0.2s linear, width 0.3s ease-in-out',
            cursor: 'pointer',
            // Widens the hit area well past the 2px-tall bullet.
            '&:before': {
                position: 'absolute',
                content: "''",
                top: 0,
                left: 0,
                width: 'calc(100% + 1.25rem)',
                height: 'calc(100% + 1.25rem)',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                transform: 'translate(-0.625rem, -0.625rem)'
            },
            '&.swiper-pagination-bullet-active': {
                width: '1.875rem',
                backgroundColor: '#E0BE7A',
                opacity: 1,
                boxShadow: 'none'
            },
            '&:hover': {
                opacity: 1
            }
        }
    }
};
/** Full-height, invisible click targets down either edge of the carousel. */ const edgeButtonProps = {
    pos: 'absolute',
    top: 0,
    zIndex: 'buttonSlider',
    w: '15%',
    h: '100%',
    tabIndex: -1,
    // The original asks for `background-color: var(--chakra-colors-red)`, a token
    // that does not exist, so the declaration drops out and the button paints
    // transparent. Ask for that outright instead of inheriting Chakra's grey.
    bg: 'transparent',
    _hover: {
        bg: 'transparent'
    },
    _active: {
        bg: 'transparent'
    },
    _focusVisible: {
        outline: 'none',
        outlineOffset: 0
    }
};
function GameCarousel({ items, animate = true, onActiveIndexChange }) {
    const [swiper, setSwiper] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [activeIndex, setActiveIndex] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [slideWidth, setSlideWidth] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [spaceBetween, setSpaceBetween] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [cursorType, setCursorType] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CURSOR_TYPE"].hidden);
    const [animateClick, setAnimateClick] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const size = (0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$hooks$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["useWindowSize"])();
    // Slide width and gap are both a fixed fraction of the viewport, so they are
    // recomputed rather than expressed as breakpoints.
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!size.width) return;
        const isDesktop = size.width >= __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["BREAKPOINT_XL"];
        setSlideWidth(isDesktop ? __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["SLIDE_WIDTH_XL"] / __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["WIDTH_XL"] * 100 : __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["SLIDE_WIDTH_BASE"] / __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["WIDTH_BASE"] * 100);
        setSpaceBetween(isDesktop ? size.width / __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["WIDTH_XL"] * __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["SLIDES_OFFSET_XL"] : size.width / __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["WIDTH_BASE"] * __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["SLIDES_OFFSET_BASE"]);
    }, [
        size
    ]);
    const hideCursor = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])(()=>setCursorType(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CURSOR_TYPE"].hidden), []);
    const onEdgeClick = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])(({ currentTarget })=>{
        if (currentTarget.dataset.direction === 'prev') swiper?.slidePrev();
        else swiper?.slideNext();
        setAnimateClick(true);
    }, [
        swiper
    ]);
    const onEdgeEnter = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])(({ currentTarget })=>{
        setCursorType(currentTarget.dataset.direction === 'prev' ? __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CURSOR_TYPE"].arrowLeft : __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CURSOR_TYPE"].arrowRight);
    }, []);
    const onSlideEnter = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])(({ currentTarget })=>{
        if (Number(currentTarget.dataset.swiperSlideIndex) === activeIndex) {
            setCursorType(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CURSOR_TYPE"].label);
        }
    }, [
        activeIndex
    ]);
    const a11y = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>({
            enabled: true,
            slideLabelMessage: 'Game slide {{index}} / {{slidesLength}}',
            containerRoleDescriptionMessage: 'Game slide carousel region',
            containerMessage: 'Game slide carousel',
            paginationBulletMessage: 'Go to slide {{index}}'
        }), []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Box"], {
        pos: "relative",
        overflowX: "hidden",
        style: {
            WebkitTapHighlightColor: 'transparent'
        },
        onMouseLeave: hideCursor,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Button"], {
                ...edgeButtonProps,
                left: 0,
                "data-direction": "prev",
                "aria-label": "Go to previous slide",
                onMouseEnter: onEdgeEnter,
                onMouseLeave: hideCursor,
                onClick: onEdgeClick
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/home/GameCarousel.tsx",
                lineNumber: 189,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Button"], {
                ...edgeButtonProps,
                right: 0,
                "data-direction": "next",
                "aria-label": "Go to next slide",
                onMouseEnter: onEdgeEnter,
                onMouseLeave: hideCursor,
                onClick: onEdgeClick
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/home/GameCarousel.tsx",
                lineNumber: 198,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(SwiperContainer, {
                modules: [
                    __TURBOPACK__imported__module__$5b$externals$5d2f$swiper$2f$modules__$5b$external$5d$__$28$swiper$2f$modules$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$swiper$29$__["Pagination"],
                    __TURBOPACK__imported__module__$5b$externals$5d2f$swiper$2f$modules__$5b$external$5d$__$28$swiper$2f$modules$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$swiper$29$__["Keyboard"],
                    __TURBOPACK__imported__module__$5b$externals$5d2f$swiper$2f$modules__$5b$external$5d$__$28$swiper$2f$modules$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$swiper$29$__["A11y"]
                ],
                loop: true,
                speed: 1500,
                keyboard: true,
                grabCursor: true,
                slidesPerView: "auto",
                longSwipesRatio: 0.1,
                loopAdditionalSlides: 1,
                centeredSlides: true,
                pagination: {
                    enabled: true,
                    clickable: true
                },
                spaceBetween: spaceBetween,
                threshold: 5,
                a11y: a11y,
                role: "region",
                onSwiper: setSwiper,
                onBeforeTransitionStart: (instance)=>{
                    setActiveIndex(instance.realIndex);
                    onActiveIndexChange?.(instance.realIndex);
                },
                onSliderMove: hideCursor,
                pt: {
                    base: '2.625rem',
                    xl: '2.5rem'
                },
                pb: {
                    base: '2rem',
                    xl: '4.375rem'
                },
                userSelect: "none",
                sx: swiperSx,
                children: items.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$swiper$2f$react__$5b$external$5d$__$28$swiper$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$swiper$29$__["SwiperSlide"], {
                        style: {
                            width: slideWidth === null ? undefined : `${slideWidth}%`,
                            zIndex: index === activeIndex ? 1 : 0
                        },
                        onMouseEnter: onSlideEnter,
                        onMouseLeave: hideCursor,
                        "aria-current": index === activeIndex ? 'true' : 'false',
                        "aria-hidden": index === activeIndex ? undefined : 'true',
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(SlideLink, {
                            href: `/servicios/${item.slug}`,
                            "aria-label": `Go to ${item.label}`,
                            display: "block",
                            onClick: hideCursor,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$GameSlide$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["GameSlide"], {
                                id: item.id,
                                index: index,
                                label: item.label,
                                isActive: index === activeIndex && slideWidth !== null && animate,
                                animateThumbnail: animate,
                                thumbnail: item.thumbnail,
                                tagline: item.tagline,
                                about: item.about
                            }, void 0, false, {
                                fileName: "[project]/servicios-lib/components/home/GameCarousel.tsx",
                                lineNumber: 251,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/servicios-lib/components/home/GameCarousel.tsx",
                            lineNumber: 245,
                            columnNumber: 13
                        }, this)
                    }, item.id, false, {
                        fileName: "[project]/servicios-lib/components/home/GameCarousel.tsx",
                        lineNumber: 234,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/home/GameCarousel.tsx",
                lineNumber: 207,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Cursor$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["Cursor"], {
                type: cursorType,
                label: "Select",
                animateClick: animateClick,
                onClickAnimation: ()=>setAnimateClick(false)
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/home/GameCarousel.tsx",
                lineNumber: 265,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/servicios-lib/components/home/GameCarousel.tsx",
        lineNumber: 183,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/servicios-lib/components/home/index.ts [ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$AnimatedHeading$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/home/AnimatedHeading.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$GameCarousel$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/home/GameCarousel.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$GameSlide$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/home/GameSlide.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$ui$2f$ScrambleText$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/ui/ScrambleText.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$SlideCorners$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/home/SlideCorners.tsx [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$AnimatedHeading$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$GameCarousel$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$GameSlide$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$ui$2f$ScrambleText$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$SlideCorners$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$AnimatedHeading$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$GameCarousel$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$GameSlide$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$ui$2f$ScrambleText$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$SlideCorners$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
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
"[project]/pages/servicios/index.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>Home,
    "getStaticProps",
    ()=>getStaticProps
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__ = __turbopack_context__.i("[externals]/@chakra-ui/react [external] (@chakra-ui/react, esm_import, [project]/node_modules/@chakra-ui/react)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/servicios-lib/components/home/index.ts [ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$GameCarousel$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/home/GameCarousel.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/home/constants.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/home/motion.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$layout$2f$Layout$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/layout/Layout.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$data$2f$content$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/servicios-lib/data/content.json (json)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$GameCarousel$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$layout$2f$Layout$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$GameCarousel$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$layout$2f$Layout$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
const { title: SITE_TITLE, description: SITE_DESCRIPTION, url: SITE_URL, shareImage: SHARE_IMAGE } = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$data$2f$content$2e$json__$28$json$29$__["default"].site;
/** Held at 0 until the loader hands over, then snapped on. */ const articleVariants = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["VARIANTS"].hidden]: {
        opacity: 0
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["VARIANTS"].visible]: {
        opacity: 1,
        transition: {
            duration: 0.01
        }
    },
    exit: {
        opacity: 0
    }
};
function Home({ data, animate = true }) {
    const [activeIndex, setActiveIndex] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$layout$2f$Layout$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
        backgroundVariant: "index",
        animate: animate,
        fluxColor: data.items[activeIndex]?.background?.fluxColor,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                        children: SITE_TITLE
                    }, void 0, false, {
                        fileName: "[project]/pages/servicios/index.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "title",
                        content: SITE_TITLE
                    }, void 0, false, {
                        fileName: "[project]/pages/servicios/index.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: SITE_DESCRIPTION
                    }, void 0, false, {
                        fileName: "[project]/pages/servicios/index.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("link", {
                        rel: "icon",
                        href: "/favicon.svg"
                    }, void 0, false, {
                        fileName: "[project]/pages/servicios/index.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "twitter:card",
                        content: "summary_large_image"
                    }, void 0, false, {
                        fileName: "[project]/pages/servicios/index.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "twitter:title",
                        content: SITE_TITLE
                    }, void 0, false, {
                        fileName: "[project]/pages/servicios/index.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "twitter:description",
                        content: SITE_DESCRIPTION
                    }, void 0, false, {
                        fileName: "[project]/pages/servicios/index.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "twitter:url",
                        content: SITE_URL
                    }, void 0, false, {
                        fileName: "[project]/pages/servicios/index.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "twitter:image",
                        content: SHARE_IMAGE
                    }, void 0, false, {
                        fileName: "[project]/pages/servicios/index.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "twitter:image:alt",
                        content: SITE_DESCRIPTION
                    }, void 0, false, {
                        fileName: "[project]/pages/servicios/index.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:title",
                        content: SITE_TITLE
                    }, void 0, false, {
                        fileName: "[project]/pages/servicios/index.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:description",
                        content: SITE_DESCRIPTION
                    }, void 0, false, {
                        fileName: "[project]/pages/servicios/index.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:url",
                        content: SITE_URL
                    }, void 0, false, {
                        fileName: "[project]/pages/servicios/index.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:image",
                        content: SHARE_IMAGE
                    }, void 0, false, {
                        fileName: "[project]/pages/servicios/index.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:image:alt",
                        content: SITE_DESCRIPTION
                    }, void 0, false, {
                        fileName: "[project]/pages/servicios/index.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:type",
                        content: "website"
                    }, void 0, false, {
                        fileName: "[project]/pages/servicios/index.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/servicios/index.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$motion$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["MotionArticle"], {
                display: {
                    xl: 'flex'
                },
                mx: "auto",
                h: "100%",
                // Nav's logo/menu button are overlaid, not in flow — this pushes the
                // carousel clear of them. Layout's own wrapper handles the scrolling
                // and sizing, so nothing else here needs an explicit height.
                mt: {
                    base: '3.75rem',
                    md: '4.6875rem'
                },
                pb: {
                    base: '2.1875rem',
                    md: 0
                },
                variants: articleVariants,
                initial: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["VARIANTS"].hidden,
                animate: animate ? __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["VARIANTS"].visible : __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["VARIANTS"].hidden,
                exit: "exit",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$chakra$2d$ui$2f$react__$5b$external$5d$__$2840$chakra$2d$ui$2f$react$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$29$__["Box"], {
                    w: "100%",
                    m: "auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$GameCarousel$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["GameCarousel"], {
                        items: data.items,
                        animate: animate,
                        onActiveIndexChange: setActiveIndex
                    }, void 0, false, {
                        fileName: "[project]/pages/servicios/index.tsx",
                        lineNumber: 72,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/pages/servicios/index.tsx",
                    lineNumber: 71,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/servicios/index.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/servicios/index.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
const getStaticProps = async ()=>({
        props: {
            data: {
                items: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$data$2f$content$2e$json__$28$json$29$__["default"].items
            }
        }
    });
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ebbe0644._.js.map