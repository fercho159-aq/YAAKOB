(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/servicios-lib/components/home/constants.ts [client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/home/motion.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$ZVFRDZZY$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/layout/dist/chunk-ZVFRDZZY.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$system$2f$dist$2f$chunk$2d$ZHQNHOQS$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/system/dist/chunk-ZHQNHOQS.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$system$2f$dist$2f$chunk$2d$FDQH4LQI$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/system/dist/chunk-FDQH4LQI.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$valid$2d$prop$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/motion/utils/valid-prop.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$motion$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/dom/motion.mjs [client] (ecmascript)");
;
;
const forwardProp = (prop)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$valid$2d$prop$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["isValidMotionProp"])(prop) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$system$2f$dist$2f$chunk$2d$FDQH4LQI$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["shouldForwardProp"])(prop);
const MotionBox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$system$2f$dist$2f$chunk$2d$ZHQNHOQS$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["chakra"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$motion$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].div, {
    shouldForwardProp: forwardProp
});
const MotionSpan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$system$2f$dist$2f$chunk$2d$ZHQNHOQS$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["chakra"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$motion$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].span, {
    shouldForwardProp: forwardProp
});
const MotionParagraph = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$system$2f$dist$2f$chunk$2d$ZHQNHOQS$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["chakra"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$motion$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].p, {
    shouldForwardProp: forwardProp
});
const MotionArticle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$system$2f$dist$2f$chunk$2d$ZHQNHOQS$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["chakra"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$motion$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].article, {
    shouldForwardProp: forwardProp
});
const MotionCanvas = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$system$2f$dist$2f$chunk$2d$ZHQNHOQS$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["chakra"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$motion$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].canvas, {
    shouldForwardProp: forwardProp
});
const MotionAspectRatio = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$motion$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$ZVFRDZZY$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["AspectRatio"]);
_c = MotionAspectRatio;
var _c;
__turbopack_context__.k.register(_c, "MotionAspectRatio");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/ui/ScrambleText.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrambleText",
    ()=>ScrambleText
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/layout/dist/chunk-PULVB27S.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const scrambler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // The server renders the first value so the text is present without JS; the
    // scrambler blanks it on mount and types it back in.
    const [initialText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(text);
    const [box, setBox] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        width: 0,
        height: 0
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "ScrambleText.useLayoutEffect": ()=>{
            const measure = {
                "ScrambleText.useLayoutEffect.measure": ()=>{
                    const rect = ref.current?.getBoundingClientRect();
                    if (rect) setBox({
                        width: rect.width,
                        height: rect.height
                    });
                }
            }["ScrambleText.useLayoutEffect.measure"];
            let timer = null;
            const onResize = {
                "ScrambleText.useLayoutEffect.onResize": ()=>{
                    if (timer) clearTimeout(timer);
                    timer = setTimeout(measure, 200);
                }
            }["ScrambleText.useLayoutEffect.onResize"];
            measure();
            window.addEventListener('resize', onResize);
            return ({
                "ScrambleText.useLayoutEffect": ()=>{
                    if (timer) clearTimeout(timer);
                    window.removeEventListener('resize', onResize);
                }
            })["ScrambleText.useLayoutEffect"];
        }
    }["ScrambleText.useLayoutEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ScrambleText.useEffect": ()=>{
            if (!ref.current) return;
            const instance = new Scrambler(ref.current, duration, chars);
            scrambler.current = instance;
            instance.reset();
            return ({
                "ScrambleText.useEffect": ()=>{
                    instance.disable();
                    scrambler.current = null;
                }
            })["ScrambleText.useEffect"];
        }
    }["ScrambleText.useEffect"], [
        chars,
        duration
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ScrambleText.useEffect": ()=>{
            if (!scrambler.current || !animate) return;
            if (restart !== undefined) scrambler.current.reset();
            if (!delay) {
                scrambler.current.animate(text);
                return;
            }
            const timer = setTimeout({
                "ScrambleText.useEffect.timer": ()=>scrambler.current?.animate(text)
            }["ScrambleText.useEffect.timer"], delay * 1000);
            return ({
                "ScrambleText.useEffect": ()=>clearTimeout(timer)
            })["ScrambleText.useEffect"];
        }
    }["ScrambleText.useEffect"], [
        animate,
        delay,
        text,
        restart
    ]);
    // A hidden tab suspends requestAnimationFrame, which leaves a half-typed word
    // frozen on screen. Replay it as soon as the tab comes back.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ScrambleText.useEffect": ()=>{
            if (!animate) return;
            const replay = {
                "ScrambleText.useEffect.replay": ()=>{
                    if (!document.hidden) scrambler.current?.animate(text);
                }
            }["ScrambleText.useEffect.replay"];
            document.addEventListener('visibilitychange', replay);
            return ({
                "ScrambleText.useEffect": ()=>document.removeEventListener('visibilitychange', replay)
            })["ScrambleText.useEffect"];
        }
    }["ScrambleText.useEffect"], [
        animate,
        text
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Box"], {
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
_s(ScrambleText, "XQJA6vG7Iv+axsnmCoeEBqG1xDg=");
_c = ScrambleText;
var _c;
__turbopack_context__.k.register(_c, "ScrambleText");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/home/AnimatedHeading.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnimatedHeading",
    ()=>AnimatedHeading
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$7OLJDQMT$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/layout/dist/chunk-7OLJDQMT.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/home/constants.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$motion$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/home/motion.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$ui$2f$ScrambleText$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/ui/ScrambleText.tsx [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
 */ const AsHeading = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$7OLJDQMT$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Heading"];
/** The tinted bar wipes in from the left; the text starts once it is half open. */ const barVariants = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["VARIANTS"].hidden]: {
        scaleX: 0
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$constants$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["VARIANTS"].visible]: (delay)=>({
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
    _s();
    const [textVisible, setTextVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AsHeading, {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$motion$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["MotionSpan"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$ui$2f$ScrambleText$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["ScrambleText"], {
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
_s(AnimatedHeading, "d2oFvknV1LNFWcPIIjbuNO5ZlkY=");
_c = AnimatedHeading;
var _c;
__turbopack_context__.k.register(_c, "AnimatedHeading");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/background/config.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [client] (ecmascript)");
;
const MAX_PIXEL_RATIO = 1.6;
const CAMERA = {
    fov: 50,
    near: 1,
    far: 1000,
    position: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 10),
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
            position: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector3"](-6, -1, 2),
            rotation: 2.6,
            opacity: 0.3,
            scale: 9
        },
        {
            position: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector3"](-18, -14, -16),
            rotation: 4.4,
            opacity: 0.4,
            scale: 26
        },
        {
            position: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector3"](50, -12, -100),
            rotation: 2.5,
            opacity: 0.3,
            scale: 100
        },
        {
            position: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector3"](16, -19, -5),
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
        cameraPosition: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 10),
        cameraLookAt: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 0),
        fluxPosition: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector3"](3.9, 1.2, 2.8),
        fluxDirection: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector3"](-15, -8, 13),
        waveStrenght: 0.1
    },
    play: {
        cameraPosition: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector3"](0.22, -0.4, 8.04),
        cameraLookAt: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector3"](3.76, -0.59, 0),
        fluxPosition: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector3"](3.1, 1.1, 2.8),
        fluxDirection: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector3"](-15, -8, 13),
        waveStrenght: 0.4
    },
    stats: {
        cameraPosition: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector3"](-1.3, 0.67, 10),
        cameraLookAt: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector3"](1.27, 0.45, 0.68),
        fluxPosition: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector3"](-2.2, 1.4, 2),
        fluxDirection: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector3"](6, -8, 13),
        waveStrenght: 0.35
    },
    leaderboard: {
        cameraPosition: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector3"](4, 1.93, 9.4),
        cameraLookAt: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector3"](1.47, -0.82, -5),
        fluxPosition: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector3"](3.9, 1.2, 2.8),
        fluxDirection: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector3"](-15, -8, 13),
        waveStrenght: 0.15
    },
    globalLeaderboard: {
        cameraPosition: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector3"](4, 1.93, 9.4),
        cameraLookAt: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector3"](1.47, -0.82, -5),
        fluxPosition: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector3"](3.9, 1.2, 2.8),
        fluxDirection: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector3"](-15, -8, 13),
        waveStrenght: 0.15
    },
    accountSettings: {
        cameraPosition: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector3"](0.5, 0.67, 8.7),
        cameraLookAt: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector3"](0.67, -1, 0),
        fluxPosition: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector3"](3.3, 1.2, 2.8),
        fluxDirection: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector3"](-15, -8, 13),
        waveStrenght: 0.1
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/background/assets.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "disposeBackgroundAssets",
    ()=>disposeBackgroundAssets,
    "loadBackgroundAssets",
    ()=>loadBackgroundAssets
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/config.ts [client] (ecmascript)");
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
    const loader = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["TextureLoader"]();
    const [flowImage, gridTexture, shiftTexture, backgroundTexture] = await Promise.all([
        loadImage(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["TEXTURE_URLS"].flow),
        loadTexture(loader, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["TEXTURE_URLS"].grid),
        loadTexture(loader, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["TEXTURE_URLS"].shift),
        loadTexture(loader, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["TEXTURE_URLS"].background)
    ]);
    // The grid pass samples both of these well outside 0..1.
    gridTexture.wrapS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["RepeatWrapping"];
    gridTexture.wrapT = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["RepeatWrapping"];
    shiftTexture.wrapS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["RepeatWrapping"];
    shiftTexture.wrapT = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["RepeatWrapping"];
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/background/shaders/lib.ts [client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/background/shaders/flux.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fluxFragmentShader",
    ()=>fluxFragmentShader,
    "fluxVertexShader",
    ()=>fluxVertexShader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$lib$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/shaders/lib.ts [client] (ecmascript)");
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

        ${__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$lib$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["rotate2D"]}

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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/background/shaders/backgroundLayers.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "backgroundLayersFragmentShader",
    ()=>backgroundLayersFragmentShader,
    "backgroundLayersVertexShader",
    ()=>backgroundLayersVertexShader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$lib$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/shaders/lib.ts [client] (ecmascript)");
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

        ${__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$lib$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["rotate2D"]}

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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/background/shaders/backgroundColor.ts [client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/background/shaders/gridFinalPass.ts [client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$lib$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/shaders/lib.ts [client] (ecmascript)");
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

          ${__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$lib$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["drawVignette"]}
          ${__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$lib$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["drawRadialGradient"]}
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/background/shaders/index.ts [client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$lib$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/shaders/lib.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$flux$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/shaders/flux.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$backgroundLayers$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/shaders/backgroundLayers.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$backgroundColor$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/shaders/backgroundColor.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$gridFinalPass$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/shaders/gridFinalPass.ts [client] (ecmascript)");
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/background/backgroundColor.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BackgroundColor",
    ()=>BackgroundColor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/config.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/shaders/index.ts [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$backgroundColor$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/shaders/backgroundColor.ts [client] (ecmascript)");
;
;
;
class BackgroundColor extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Mesh"] {
    constructor(color1 = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["BACKGROUND_COLOR"].color1, color2 = color1){
        super(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SphereGeometry"](1, 32, 16), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]({
            side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["BackSide"],
            uniforms: {
                color1: {
                    value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Color"](color1)
                },
                color2: {
                    value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Color"](color2)
                },
                transition: {
                    value: 0
                }
            },
            vertexShader: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$backgroundColor$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["backgroundColorVertexShader"],
            fragmentShader: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$backgroundColor$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["backgroundColorFragmentShader"]
        }));
        this.scale.multiplyScalar(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["BACKGROUND_COLOR"].sphereScale);
    }
    dispose() {
        this.geometry.dispose();
        this.material.dispose();
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/background/geometry.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InstancedQuadGeometry",
    ()=>InstancedQuadGeometry,
    "createQuadGeometry",
    ()=>createQuadGeometry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [client] (ecmascript)");
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
    const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
    geometry.setAttribute('position', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["BufferAttribute"](new Float32Array(QUAD_VERTICES), 3));
    return geometry;
};
class InstancedQuadGeometry extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["InstancedBufferGeometry"] {
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
        const attribute = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["InstancedBufferAttribute"](new Float32Array(this.maxInstancedCount * itemSize), itemSize);
        this.setAttribute(name, attribute);
        return attribute;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/background/backgroundLayers.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BackgroundLayers",
    ()=>BackgroundLayers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/config.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$geometry$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/geometry.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/shaders/index.ts [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$backgroundLayers$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/shaders/backgroundLayers.ts [client] (ecmascript)");
;
;
;
;
class BackgroundLayers extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Mesh"] {
    constructor(map){
        const { layers } = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["BACKGROUND_LAYERS"];
        const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$geometry$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["InstancedQuadGeometry"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$geometry$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["createQuadGeometry"])(), layers.length);
        const position = geometry.createAttribute('_position', 3);
        const rotation = geometry.createAttribute('_rotation', 1);
        const scale = geometry.createAttribute('_scale', 1);
        const opacity = geometry.createAttribute('_opacity', 1);
        layers.forEach((layer, i)=>{
            position.setXYZ(i, layer.position.x, layer.position.y, layer.position.z);
            scale.setX(i, layer.scale);
            rotation.setX(i, layer.rotation);
            opacity.setX(i, layer.opacity * __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["BACKGROUND_LAYERS"].opacity);
        });
        super(geometry, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]({
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
                    value: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["BACKGROUND_LAYERS"].floatingYStrenght
                },
                waveRotationStrenght: {
                    value: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["BACKGROUND_LAYERS"].waveRotationStrenght
                }
            },
            vertexShader: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$backgroundLayers$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["backgroundLayersVertexShader"],
            fragmentShader: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$backgroundLayers$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["backgroundLayersFragmentShader"]
        }));
        this.frustumCulled = false;
    }
    update = ()=>{
        this.material.uniforms.time.value += __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["BACKGROUND_LAYERS"].speed;
    };
    dispose() {
        this.geometry.dispose();
        this.material.dispose();
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/background/tween.ts [client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/background/cameraControl.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CameraControl",
    ()=>CameraControl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/config.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$tween$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/tween.ts [client] (ecmascript)");
;
;
;
class CameraControl {
    initialPosition;
    lookAt = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector3"]();
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
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$tween$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["animateVector3"])(this.tweens, this.initialPosition, position, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["INTRO"].cameraDuration, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$tween$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["easeOut"]);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$tween$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["animateVector3"])(this.tweens, this.lookAt, lookAt, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["INTRO"].cameraDuration, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$tween$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["easeOut"]);
    }
    update(normalX, normalY) {
        const [velocityX, velocityY] = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CAMERA"].parallaxVelocity;
        this.camera.position.x = this.initialPosition.x + normalX * velocityX;
        this.camera.position.y = this.initialPosition.y + normalY * velocityY;
        this.camera.position.z = this.initialPosition.z;
        this.camera.lookAt(this.lookAt);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/background/flux.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Flux",
    ()=>Flux,
    "FluxGroup",
    ()=>FluxGroup
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/config.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$geometry$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/geometry.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/shaders/index.ts [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$flux$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/shaders/flux.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$tween$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/tween.ts [client] (ecmascript)");
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
class Flux extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Mesh"] {
    color;
    tweens;
    speed;
    animateControls = null;
    animateControlsWave = null;
    constructor(tweens, options){
        const { fluxImageData, direction, particleNbr = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].particleNbr, particleTranslationSpeedMax = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].particleTranslationSpeedMax, particleScale = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].particleScale, blending = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].blending, depthWrite = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].depthWrite, color = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].color, opacity = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].opacity, scale = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].scale, torsionStrenght = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].torsionStrenght, waveShift = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].waveShift, waveLength = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].waveLength, waveStrenght = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].waveStrenght, speed = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].speed, rotationSpeed = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].rotationSpeed, translationSpeed = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].translationSpeed, progressOpacity = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].progressOpacity, explodeStrenght = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].explodeStrenght } = options;
        const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$geometry$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["InstancedQuadGeometry"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$geometry$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["createQuadGeometry"])(), particleNbr);
        const variation = geometry.createAttribute('_variation', 2);
        const explodeVariation = geometry.createAttribute('_explodeVariation', 2);
        const progress = geometry.createAttribute('_progress', 1);
        const particleSpeed = geometry.createAttribute('_speed', 1);
        const particleOpacity = geometry.createAttribute('_opacity', 1);
        for(let i = 0; i < particleNbr; i += 1){
            progress.setX(i, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["MathUtils"].randFloat(0, 1));
            const { x, y } = sampleVariation(fluxImageData);
            variation.setXY(i, x, y);
            explodeVariation.setXY(i, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["MathUtils"].randFloat(0, 0.5 * x), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["MathUtils"].randFloat(0, 0.5 * y));
            particleSpeed.setX(i, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["MathUtils"].randFloat(1, particleTranslationSpeedMax));
            // Anything above 0.6 snaps to fully opaque; the rest stay dim and, per the
            // vertex shader, are drawn larger.
            const alpha = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["MathUtils"].randFloat(0.4, 1);
            particleOpacity.setX(i, alpha > 0.6 ? 1 : alpha);
        }
        super(geometry, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]({
            transparent: true,
            depthWrite,
            blending: blending ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["AdditiveBlending"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["NormalBlending"],
            uniforms: {
                particleScale: {
                    value: particleScale
                },
                color: {
                    value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Color"](color)
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
                    value: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].minorWaveSpeed
                },
                minorWaveLength: {
                    value: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].minorWaveLength
                },
                minorWaveStrenght: {
                    value: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].minorWaveStrenght
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
                    value: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FLUX_INITIAL_TRANSITION"]
                },
                rotationShift: {
                    value: 0
                },
                transitionOpacity: {
                    value: 0
                },
                translationShift: {
                    value: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FLUX_INITIAL_TRANSLATION_SHIFT"]
                },
                progressOpacity: {
                    value: progressOpacity
                },
                explodeStrenght: {
                    value: explodeStrenght
                }
            },
            vertexShader: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$flux$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fluxVertexShader"],
            fragmentShader: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$flux$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fluxFragmentShader"]
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
            ease: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$tween$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fluxTransitionEase"],
            onUpdate: (value)=>this.updateTransition(value, withOpacity, from)
        });
    }
    animateOut(duration, { delay = 0, multiplier = 1, withOpacity = true, onComplete } = {}) {
        this.abortAnimation();
        const from = this.material.uniforms.transition.value;
        this.animateControls = this.tweens.animate(from, multiplier, {
            duration,
            delay,
            ease: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$tween$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fluxTransitionEase"],
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
            ease: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$tween$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fluxTransitionEase"],
            onUpdate: (value)=>{
                if (!swapped && value > 0.5 * Math.PI) {
                    swapped = true;
                    this.setColor(color);
                }
                this.updateTransition(Math.sin(value) * multiplier, withOpacity);
            }
        });
    }
    animateWaveStrenght(duration, target = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].minorWaveStrenght) {
        this.animateControlsWave?.stop();
        this.animateControlsWave = this.tweens.animate(this.material.uniforms.minorWaveStrenght.value, target, {
            duration,
            ease: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$tween$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["easeInOut"],
            onUpdate: (value)=>{
                this.material.uniforms.minorWaveStrenght.value = value;
            }
        });
    }
    setColor(color) {
        this.color = color;
        this.material.uniforms.color.value = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Color"](color);
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
class FluxGroup extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Object3D"] {
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
        this.currentDirectionVelocity = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FLUX_GROUP"].directionVelocity;
        const shared = {
            fluxImageData: imageData,
            direction: this.direction
        };
        this.mainFlux = new Flux(tweens, shared);
        this.mainFlux.name = '_mainFlux';
        this.add(this.mainFlux);
        this.secondFlux = new Flux(tweens, {
            ...shared,
            ...__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["SECOND_FLUX"],
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
        this.directionShiftTargeted += direction * __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FLUX_GROUP"].directionShift;
    }
    handleSliderEnabled(enabled) {
        this.isSliderEnabled = enabled;
        if (enabled) this.currentDirectionVelocity = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FLUX_GROUP"].directionVelocity;
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
        this.mainFlux.animateInOut(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FLUX_GROUP"].transitionDuration, {
            multiplier: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FLUX_GROUP"].transitionStrenght,
            withOpacity: false
        });
        this.secondFlux.animateInOut(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FLUX_GROUP"].transitionDuration, {
            multiplier: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FLUX_GROUP"].transitionStrenght,
            color
        });
        this.currentDirectionVelocity = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FLUX_GROUP"].directionVelocityDuringAnimation;
        this.directionShiftTargeted += __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FLUX_GROUP"].directionIncrementDuringAnimation;
    }
    animatePosition(position, direction, waveStrenght) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$tween$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["animateVector3"])(this.tweens, this.position, position, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FLUX_GROUP"].transitionDuration, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$tween$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["easeOut"]);
        // The Z of the direction is left where it is, exactly as in the original.
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$tween$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["animateVector2"])(this.tweens, this.direction, direction, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FLUX_GROUP"].transitionDuration, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$tween$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["easeOut"]);
        this.mainFlux.animateWaveStrenght(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FLUX_GROUP"].transitionDuration, waveStrenght);
        this.secondFlux.animateWaveStrenght(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FLUX_GROUP"].transitionDuration, waveStrenght);
    }
    update = ()=>{
        this.mainFlux.update();
        this.secondFlux.update();
        if (this.isSliderEnabled) {
            this.slideTransition += (this.slideTransitionTargeted - this.slideTransition) * __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FLUX_GROUP"].slideTransitionVelocity;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/background/pointer.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Pointer",
    ()=>Pointer,
    "isTouchDevice",
    ()=>isTouchDevice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/config.ts [client] (ecmascript)");
;
const isTouchDevice = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    // The last probe is the legacy IE/Edge counterpart the original still checks.
    const legacyTouchPoints = navigator.msMaxTouchPoints;
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || (legacyTouchPoints ?? 0) > 0;
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
        if (this.listening || ("TURBOPACK compile-time value", "object") === 'undefined' || isTouchDevice()) return;
        window.addEventListener('mousemove', this.handleMouseMove);
        this.listening = true;
    }
    stop() {
        if (!this.listening) return;
        window.removeEventListener('mousemove', this.handleMouseMove);
        this.listening = false;
    }
    /** One lerp step per frame, matching the original's frame-based smoothing. */ update() {
        this.x += (this.targetX - this.x) * __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["POINTER_VELOCITY"];
        this.y += (this.targetY - this.y) * __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["POINTER_VELOCITY"];
        this.normalX = this.x / window.innerWidth - 0.5;
        this.normalY = this.y / window.innerHeight - 0.5;
    }
    handleMouseMove = (event)=>{
        this.targetX = event.clientX;
        this.targetY = event.clientY;
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/background/gridPass.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GridPass",
    ()=>GridPass
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$ShaderPass$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/examples/jsm/postprocessing/ShaderPass.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/config.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$pointer$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/pointer.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/shaders/index.ts [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$gridFinalPass$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/shaders/gridFinalPass.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$tween$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/tween.ts [client] (ecmascript)");
;
;
;
;
;
;
class GridPass extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$ShaderPass$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ShaderPass"] {
    tweens;
    constructor(tweens, textures){
        const touch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$pointer$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["isTouchDevice"])();
        const settings = touch ? {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["GRID_PASS"],
            ...__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["GRID_PASS_TOUCH"]
        } : __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["GRID_PASS"];
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
                    value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector2"]()
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
            vertexShader: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$gridFinalPass$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["gridFinalPassVertexShader"],
            fragmentShader: (0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$gridFinalPass$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["createGridFinalPassFragmentShader"])(touch ? __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$gridFinalPass$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["VIGNETTE_STYLE_TOUCH"] : __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$shaders$2f$gridFinalPass$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["VIGNETTE_STYLE_POINTER"])
        });
        this.tweens = tweens;
        this.material.uniforms.tShift.value = textures.shift;
        this.material.uniforms.tGrid.value = textures.grid;
    }
    animateIn(duration, delay = 0) {
        this.tweens.animate(0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["GRID_PASS"].opacity, {
            duration,
            delay,
            ease: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$tween$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["easeOut"],
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/background/scene.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BackgroundScene",
    ()=>BackgroundScene,
    "isWebGLAvailable",
    ()=>isWebGLAvailable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.module.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$EffectComposer$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/examples/jsm/postprocessing/EffectComposer.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$RenderPass$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/examples/jsm/postprocessing/RenderPass.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$UnrealBloomPass$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$assets$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/assets.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$backgroundColor$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/backgroundColor.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$backgroundLayers$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/backgroundLayers.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$cameraControl$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/cameraControl.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/config.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$flux$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/flux.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$gridPass$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/gridPass.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$pointer$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/pointer.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$tween$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/tween.ts [client] (ecmascript)");
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
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const canvas = document.createElement('canvas');
        return Boolean(window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')));
    } catch  {
        return false;
    }
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
    tweens = new __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$tween$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["TweenManager"]();
    pointer = new __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$pointer$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Pointer"]();
    clock = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Clock"](false);
    fluxColor;
    variant;
    maxPixelRatio;
    pixelRatio = 1;
    width = 0;
    height = 0;
    disposed = false;
    ready = false;
    constructor(options = {}){
        this.fluxColor = options.fluxColor ?? __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FLUX_DEFAULTS"].color;
        this.variant = options.variant ?? 'index';
        this.maxPixelRatio = options.maxPixelRatio ?? __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["MAX_PIXEL_RATIO"];
    }
    get isReady() {
        return this.ready;
    }
    async init(canvas) {
        if (this.disposed) return;
        // r134 predates three's colour management, and every value in this scene was
        // authored against that. Turning it off keeps the palette identical.
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ColorManagement"].enabled = false;
        this.renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["WebGLRenderer"]({
            canvas
        });
        this.renderer.outputColorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["LinearSRGBColorSpace"];
        this.scene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Scene"]();
        this.camera = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"](__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CAMERA"].fov, 1, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CAMERA"].near, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CAMERA"].far);
        this.camera.position.copy(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CAMERA"].position);
        this.measure(canvas);
        this.applySize();
        const assets = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$assets$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["loadBackgroundAssets"])();
        // A dispose() while the textures were in flight.
        if (this.disposed) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$assets$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["disposeBackgroundAssets"])(assets);
            return;
        }
        this.assets = assets;
        const preset = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["PAGE_PRESETS"][this.variant];
        this.fluxGroup = new __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$flux$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FluxGroup"](this.tweens, assets.flowImageData, {
            position: preset.fluxPosition,
            direction: preset.fluxDirection,
            color: this.fluxColor
        });
        this.scene.add(this.fluxGroup);
        this.backgroundColor = new __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$backgroundColor$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["BackgroundColor"]();
        this.scene.add(this.backgroundColor);
        this.backgroundLayers = new __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$backgroundLayers$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["BackgroundLayers"](assets.backgroundTexture);
        this.scene.add(this.backgroundLayers);
        // The composer's own buffer is 8-bit in r134; three now defaults it to half
        // float, which would let the additive flux push the bloom well past what the
        // original ever saw. Dimensions here are provisional -- applyComposerSize()
        // below sets the real ones once every pass is attached.
        const target = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WebGLRenderTarget"](this.width, this.height, {
            minFilter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["LinearFilter"],
            magFilter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["LinearFilter"],
            format: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["RGBAFormat"],
            type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["UnsignedByteType"]
        });
        this.composer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$EffectComposer$2e$js__$5b$client$5d$__$28$ecmascript$29$__["EffectComposer"](this.renderer, target);
        this.composer.addPass(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$RenderPass$2e$js__$5b$client$5d$__$28$ecmascript$29$__["RenderPass"](this.scene, this.camera));
        this.bloomPass = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$postprocessing$2f$UnrealBloomPass$2e$js__$5b$client$5d$__$28$ecmascript$29$__["UnrealBloomPass"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector2"](this.width, this.height), __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["BLOOM"].strength, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["BLOOM"].radius, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["BLOOM"].threshold);
        this.composer.addPass(this.bloomPass);
        this.gridPass = new __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$gridPass$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["GridPass"](this.tweens, {
            shift: assets.shiftTexture,
            grid: assets.gridTexture
        });
        this.composer.addPass(this.gridPass);
        this.applyComposerSize();
        this.gridPass.resize(this.width, this.height);
        this.cameraControl = new __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$cameraControl$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CameraControl"](this.camera, this.tweens);
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
        this.gridPass?.animateIn(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["INTRO"].gridDuration, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["INTRO"].gridDelay);
        this.fluxGroup?.animateIn(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["INTRO"].fluxDuration, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["INTRO"].fluxDelay, this.fluxColor);
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
        const preset = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["PAGE_PRESETS"][variant];
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
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$assets$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["disposeBackgroundAssets"])(this.assets);
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/background/Background.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Background",
    ()=>Background,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/layout/dist/chunk-PULVB27S.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$scene$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/scene.ts [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
const Background = ({ fluxColor, variant = 'index', enabled = true })=>{
    _s();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const sceneRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const loopRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const enabledRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(enabled);
    enabledRef.current = enabled;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Background.useEffect": ()=>{
            const container = containerRef.current;
            if (!container) return undefined;
            // Nothing to fall back to and nothing to clean up: the container keeps its
            // flat colour and the page carries on without a canvas.
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$scene$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["isWebGLAvailable"])()) return undefined;
            // The canvas is created here rather than in JSX so that every mount gets a
            // fresh one: a canvas hands back the same WebGL context forever, so reusing
            // the element across a remount would hand the new scene the old context.
            const canvas = document.createElement('canvas');
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.display = 'block';
            container.appendChild(canvas);
            const scene = new __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$scene$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["BackgroundScene"]({
                fluxColor,
                variant
            });
            sceneRef.current = scene;
            let frame = 0;
            const loop = {
                "Background.useEffect.loop": (time)=>{
                    frame = window.requestAnimationFrame(loop);
                    scene.render(time);
                }
            }["Background.useEffect.loop"];
            const start = {
                "Background.useEffect.start": ()=>{
                    if (frame !== 0 || document.hidden || !enabledRef.current || !scene.isReady) return;
                    // Swallow the gap the pause left behind before stepping again.
                    scene.resetClock();
                    frame = window.requestAnimationFrame(loop);
                }
            }["Background.useEffect.start"];
            const stop = {
                "Background.useEffect.stop": ()=>{
                    if (frame === 0) return;
                    window.cancelAnimationFrame(frame);
                    frame = 0;
                }
            }["Background.useEffect.stop"];
            loopRef.current = {
                start,
                stop
            };
            const handleVisibilityChange = {
                "Background.useEffect.handleVisibilityChange": ()=>{
                    if (document.hidden) stop();
                    else if (scene.isReady) start();
                }
            }["Background.useEffect.handleVisibilityChange"];
            const observer = new ResizeObserver({
                "Background.useEffect": ()=>scene.resize()
            }["Background.useEffect"]);
            observer.observe(container);
            document.addEventListener('visibilitychange', handleVisibilityChange);
            scene.init(canvas).then({
                "Background.useEffect": ()=>{
                    if (sceneRef.current !== scene) return;
                    scene.resize();
                    start();
                    scene.playIntro();
                }
            }["Background.useEffect"]).catch({
                "Background.useEffect": (error)=>{
                    console.error('Background scene failed to initialise', error);
                    canvas.remove();
                }
            }["Background.useEffect"]);
            return ({
                "Background.useEffect": ()=>{
                    stop();
                    observer.disconnect();
                    document.removeEventListener('visibilitychange', handleVisibilityChange);
                    sceneRef.current = null;
                    loopRef.current = null;
                    scene.dispose();
                    canvas.remove();
                }
            })["Background.useEffect"];
        // fluxColor and variant are pushed through the imperative API below rather
        // than rebuilding the scene, which would mean re-seeding 75k particles.
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["Background.useEffect"], []);
    const lastColor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(fluxColor);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Background.useEffect": ()=>{
            const scene = sceneRef.current;
            if (!fluxColor || !scene?.isReady) return;
            // The first colour is already baked into the scene; later ones arrive as a
            // page change, which is what the explode transition exists for.
            scene.setFluxColor(fluxColor, {
                animate: fluxColor !== lastColor.current
            });
            lastColor.current = fluxColor;
        }
    }["Background.useEffect"], [
        fluxColor
    ]);
    const lastVariant = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(variant);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Background.useEffect": ()=>{
            if (variant === lastVariant.current) return;
            lastVariant.current = variant;
            sceneRef.current?.setVariant(variant);
        }
    }["Background.useEffect"], [
        variant
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Background.useEffect": ()=>{
            if (enabled) loopRef.current?.start();
            else loopRef.current?.stop();
        }
    }["Background.useEffect"], [
        enabled
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Box"], {
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
_s(Background, "74cALOZoINPhiZurMPSAKjWDOh8=");
_c = Background;
const __TURBOPACK__default__export__ = Background;
var _c;
__turbopack_context__.k.register(_c, "Background");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/background/index.ts [client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$Background$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/Background.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$scene$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/scene.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/config.ts [client] (ecmascript)");
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/svg/FacebookLogo.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FacebookLogo",
    ()=>FacebookLogo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$icon$2f$dist$2f$chunk$2d$2GBDXOMA$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/icon/dist/chunk-2GBDXOMA.mjs [client] (ecmascript)");
;
;
function FacebookLogo(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$icon$2f$dist$2f$chunk$2d$2GBDXOMA$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Icon"], {
        viewBox: "0 0 625.52 625.52",
        focusable: "false",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                children: "Facebook Logo"
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/svg/FacebookLogo.tsx",
                lineNumber: 6,
                columnNumber: 1
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M463.85,310.9c0-85.5-69.31-154.81-154.81-154.81S154.23,225.4,154.23,310.9 c0,77.27,56.61,141.31,130.62,152.93V355.65h-39.31V310.9h39.31v-34.11c0-38.8,23.11-60.23,58.47-60.23 c16.94,0,34.65,3.02,34.65,3.02v38.1h-19.52c-19.23,0-25.23,11.93-25.23,24.18v29.04h42.94l-6.86,44.75h-36.07v108.18 C407.24,452.21,463.85,388.17,463.85,310.9z"
                }, void 0, false, {
                    fileName: "[project]/servicios-lib/components/svg/FacebookLogo.tsx",
                    lineNumber: 6,
                    columnNumber: 32
                }, this)
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/svg/FacebookLogo.tsx",
                lineNumber: 6,
                columnNumber: 29
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/servicios-lib/components/svg/FacebookLogo.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
_c = FacebookLogo;
var _c;
__turbopack_context__.k.register(_c, "FacebookLogo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/svg/InstagramLogo.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InstagramLogo",
    ()=>InstagramLogo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$icon$2f$dist$2f$chunk$2d$2GBDXOMA$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/icon/dist/chunk-2GBDXOMA.mjs [client] (ecmascript)");
;
;
function InstagramLogo(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$icon$2f$dist$2f$chunk$2d$2GBDXOMA$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Icon"], {
        viewBox: "0 0 625.52 625.52",
        focusable: "false",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                children: "Instagram Logo"
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/svg/InstagramLogo.tsx",
                lineNumber: 6,
                columnNumber: 1
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M312.76,212.16c35.75,0,39.99,0.14,54.11,0.78c13.05,0.6,20.14,2.78,24.86,4.61    c6.25,2.43,10.71,5.33,15.4,10.02c4.69,4.69,7.59,9.15,10.02,15.4c1.83,4.72,4.01,11.81,4.61,24.86    c0.64,14.12,0.78,18.35,0.78,54.11s-0.14,39.99-0.78,54.11c-0.6,13.05-2.78,20.14-4.61,24.86c-2.43,6.25-5.33,10.71-10.02,15.4    c-4.69,4.69-9.15,7.59-15.4,10.02c-4.72,1.83-11.81,4.01-24.86,4.61c-14.12,0.64-18.35,0.78-54.11,0.78s-39.99-0.14-54.11-0.78    c-13.05-0.6-20.14-2.78-24.86-4.61c-6.25-2.43-10.71-5.33-15.4-10.02c-4.69-4.69-7.59-9.15-10.02-15.4    c-1.83-4.72-4.01-11.81-4.61-24.86c-0.64-14.12-0.78-18.35-0.78-54.11s0.14-39.99,0.78-54.11c0.6-13.05,2.78-20.14,4.61-24.86    c2.43-6.25,5.33-10.71,10.02-15.4c4.69-4.69,9.15-7.59,15.4-10.02c4.72-1.83,11.81-4.01,24.86-4.61    C272.77,212.3,277.01,212.16,312.76,212.16 M312.76,188.04c-36.36,0-40.92,0.15-55.21,0.81c-14.25,0.65-23.98,2.91-32.5,6.22    c-8.8,3.42-16.27,8-23.72,15.44c-7.44,7.44-12.02,14.91-15.44,23.72c-3.31,8.52-5.57,18.25-6.22,32.5    c-0.65,14.28-0.81,18.84-0.81,55.21c0,36.36,0.15,40.92,0.81,55.21c0.65,14.25,2.91,23.98,6.22,32.5c3.42,8.8,8,16.27,15.44,23.72    c7.44,7.44,14.91,12.02,23.72,15.44c8.52,3.31,18.25,5.57,32.5,6.22c14.28,0.65,18.84,0.81,55.21,0.81s40.92-0.15,55.21-0.81    c14.25-0.65,23.98-2.91,32.5-6.22c8.8-3.42,16.27-8,23.72-15.44c7.44-7.44,12.02-14.91,15.44-23.72    c3.31-8.52,5.57-18.25,6.22-32.5c0.65-14.28,0.81-18.84,0.81-55.21s-0.15-40.92-0.81-55.21c-0.65-14.25-2.91-23.98-6.22-32.5    c-3.42-8.8-8-16.27-15.44-23.72c-7.44-7.44-14.91-12.02-23.72-15.44c-8.52-3.31-18.25-5.57-32.5-6.22    C353.68,188.19,349.12,188.04,312.76,188.04L312.76,188.04z"
                        }, void 0, false, {
                            fileName: "[project]/servicios-lib/components/svg/InstagramLogo.tsx",
                            lineNumber: 6,
                            columnNumber: 36
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M312.76,253.18c-37.97,0-68.76,30.78-68.76,68.76c0,37.97,30.78,68.76,68.76,68.76s68.76-30.78,68.76-68.76    C381.52,283.96,350.73,253.18,312.76,253.18z M312.76,366.56c-24.65,0-44.63-19.98-44.63-44.63c0-24.65,19.98-44.63,44.63-44.63    c24.65,0,44.63,19.98,44.63,44.63C357.39,346.58,337.41,366.56,312.76,366.56z"
                        }, void 0, false, {
                            fileName: "[project]/servicios-lib/components/svg/InstagramLogo.tsx",
                            lineNumber: 6,
                            columnNumber: 1670
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                            cx: "384.23",
                            cy: "250.46",
                            r: "16.07"
                        }, void 0, false, {
                            fileName: "[project]/servicios-lib/components/svg/InstagramLogo.tsx",
                            lineNumber: 6,
                            columnNumber: 1997
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/servicios-lib/components/svg/InstagramLogo.tsx",
                    lineNumber: 6,
                    columnNumber: 33
                }, this)
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/svg/InstagramLogo.tsx",
                lineNumber: 6,
                columnNumber: 30
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/servicios-lib/components/svg/InstagramLogo.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
_c = InstagramLogo;
var _c;
__turbopack_context__.k.register(_c, "InstagramLogo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/svg/PlaceholderWordmark.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlaceholderWordmark",
    ()=>PlaceholderWordmark,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$icon$2f$dist$2f$chunk$2d$2GBDXOMA$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/icon/dist/chunk-2GBDXOMA.mjs [client] (ecmascript)");
;
;
const FONT_SIZE = 12;
const TRACKING = 2;
/** Rough advance per glyph of the wordmark face at `FONT_SIZE`, plus tracking. */ const GLYPH_ADVANCE = FONT_SIZE * 0.72 + TRACKING;
/** Horizontal arm of each bracket, and the air between it and the word. */ const BRACKET_ARM = 5;
const BRACKET_GAP = 26;
function PlaceholderWordmark({ label = 'PLACEHOLDER', title = 'Placeholder wordmark', ...props }) {
    const width = Math.round(label.length * GLYPH_ADVANCE) + 2 * (BRACKET_ARM + BRACKET_GAP) + 3;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$icon$2f$dist$2f$chunk$2d$2GBDXOMA$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Icon"], {
        viewBox: `0 0 ${width} 23`,
        focusable: "false",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                children: title
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/svg/PlaceholderWordmark.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "1.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: `M${1.5 + BRACKET_ARM} 1.5H1.5v20h${BRACKET_ARM}`
                    }, void 0, false, {
                        fileName: "[project]/servicios-lib/components/svg/PlaceholderWordmark.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: `M${width - 1.5 - BRACKET_ARM} 1.5h${BRACKET_ARM}v20h-${BRACKET_ARM}`
                    }, void 0, false, {
                        fileName: "[project]/servicios-lib/components/svg/PlaceholderWordmark.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/servicios-lib/components/svg/PlaceholderWordmark.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                x: width / 2,
                y: "16",
                textAnchor: "middle",
                fill: "currentColor",
                fontSize: FONT_SIZE,
                fontFamily: "var(--font-wordmark), var(--font-gridnik), sans-serif",
                fontWeight: "600",
                letterSpacing: TRACKING,
                children: label
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/svg/PlaceholderWordmark.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/servicios-lib/components/svg/PlaceholderWordmark.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_c = PlaceholderWordmark;
const __TURBOPACK__default__export__ = PlaceholderWordmark;
var _c;
__turbopack_context__.k.register(_c, "PlaceholderWordmark");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/svg/SocialIcon.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SocialIcon",
    ()=>SocialIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$icon$2f$dist$2f$chunk$2d$2GBDXOMA$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/icon/dist/chunk-2GBDXOMA.mjs [client] (ecmascript)");
;
;
function SocialIcon(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$icon$2f$dist$2f$chunk$2d$2GBDXOMA$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Icon"], {
        viewBox: "0 0 625.52 625.52",
        focusable: "false",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                children: "Social Icon"
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/svg/SocialIcon.tsx",
                lineNumber: 6,
                columnNumber: 1
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                "data-v-39b9ec21": "",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                    "data-v-39b9ec21": "",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            "data-v-39b9ec21": "",
                            d: "M72.17,424.54c-15.81-33.97-24.63-71.84-24.63-111.78c0-146.48,118.75-265.23,265.23-265.23    c45.78,0,88.84,11.6,126.42,32.01"
                        }, void 0, false, {
                            fileName: "[project]/servicios-lib/components/svg/SocialIcon.tsx",
                            lineNumber: 6,
                            columnNumber: 71
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            "data-v-39b9ec21": "",
                            d: "M554.07,202.54c15.36,33.57,23.92,70.89,23.92,110.22c0,146.48-118.75,265.23-265.23,265.23    c-47.43,0-91.95-12.45-130.48-34.26"
                        }, void 0, false, {
                            fileName: "[project]/servicios-lib/components/svg/SocialIcon.tsx",
                            lineNumber: 6,
                            columnNumber: 232
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/servicios-lib/components/svg/SocialIcon.tsx",
                    lineNumber: 6,
                    columnNumber: 49
                }, this)
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/svg/SocialIcon.tsx",
                lineNumber: 6,
                columnNumber: 27
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/servicios-lib/components/svg/SocialIcon.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
_c = SocialIcon;
var _c;
__turbopack_context__.k.register(_c, "SocialIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/svg/StackedWordmark.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StackedWordmark",
    ()=>StackedWordmark,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/layout/dist/chunk-PULVB27S.mjs [client] (ecmascript)");
;
;
/**
 * The face is drawn narrow for its weight; widening the rows horizontally gets
 * it to the logotype proportions the layout is built around.
 */ const STRETCH = 1.18;
/**
 * Row length that gets the full size; longer rows scale down in proportion so a
 * label like `REGULARIZACIÓN` lands on the same width as a short one instead of
 * running past the slot that clips it.
 */ const REFERENCE_ROW_LENGTH = 10;
const FONT_SIZE_BASE_REM = 2;
const FONT_SIZE_XL_REM = 4.5;
/**
 * Splits on the first space, so `DIAGNÓSTICO FISCAL` sets as `DIAGNÓSTICO` over
 * `FISCAL`. A hyphen used as a separator is the break itself and is dropped, so
 * `UIF - FGR` stacks as two clean rows. Single-word labels get the solid row.
 */ function splitLines(label) {
    const dash = label.indexOf(' - ');
    if (dash !== -1) return [
        label.slice(0, dash),
        label.slice(dash + 3).trim()
    ];
    const at = label.indexOf(' ');
    if (at === -1) return [
        label
    ];
    return [
        label.slice(0, at),
        label.slice(at + 1).trim()
    ];
}
function StackedWordmark({ label = 'PLACEHOLDER', title = 'Placeholder wordmark', ...props }) {
    const lines = splitLines(label);
    const solid = lines.length === 2 ? lines[1] : lines[0];
    const outline = lines.length === 2 ? lines[0] : null;
    const longestRow = Math.max(...lines.map((line)=>line.length));
    const scale = Math.min(1, REFERENCE_ROW_LENGTH / longestRow);
    const row = {
        display: 'block',
        transform: `scaleX(${STRETCH})`,
        transformOrigin: 'left center'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Box"], {
        role: "img",
        "aria-label": title,
        fontFamily: "var(--font-wordmark), var(--font-gridnik), sans-serif",
        fontWeight: 700,
        fontSize: {
            base: `${FONT_SIZE_BASE_REM * scale}rem`,
            xl: `${FONT_SIZE_XL_REM * scale}rem`
        },
        lineHeight: "0.95",
        textAlign: "left",
        whiteSpace: "nowrap",
        ...props,
        children: [
            outline && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Box"], {
                ...row,
                sx: {
                    WebkitTextFillColor: 'transparent',
                    WebkitTextStrokeWidth: '0.045em',
                    WebkitTextStrokeColor: 'currentColor'
                },
                children: outline
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/svg/StackedWordmark.tsx",
                lineNumber: 75,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Box"], {
                ...row,
                children: solid
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/svg/StackedWordmark.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/servicios-lib/components/svg/StackedWordmark.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
_c = StackedWordmark;
const __TURBOPACK__default__export__ = StackedWordmark;
var _c;
__turbopack_context__.k.register(_c, "StackedWordmark");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/svg/TiktokLogo.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TiktokLogo",
    ()=>TiktokLogo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$icon$2f$dist$2f$chunk$2d$2GBDXOMA$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/icon/dist/chunk-2GBDXOMA.mjs [client] (ecmascript)");
;
;
function TiktokLogo(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$icon$2f$dist$2f$chunk$2d$2GBDXOMA$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Icon"], {
        viewBox: "0 0 625.52 625.52",
        focusable: "false",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                children: "TikTok Logo"
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/svg/TiktokLogo.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                transform: "translate(126.76 126.76) scale(15.5)",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M16.6 2h-3.1v13.1a2.6 2.6 0 1 1-2.2-2.57v-3.15a5.75 5.75 0 1 0 5.3 5.73V8.87a6.9 6.9 0 0 0 4 1.28V7A3.93 3.93 0 0 1 16.6 2Z"
                }, void 0, false, {
                    fileName: "[project]/servicios-lib/components/svg/TiktokLogo.tsx",
                    lineNumber: 13,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/svg/TiktokLogo.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/servicios-lib/components/svg/TiktokLogo.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_c = TiktokLogo;
var _c;
__turbopack_context__.k.register(_c, "TiktokLogo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/svg/WhatsappLogo.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WhatsappLogo",
    ()=>WhatsappLogo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$icon$2f$dist$2f$chunk$2d$2GBDXOMA$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/icon/dist/chunk-2GBDXOMA.mjs [client] (ecmascript)");
;
;
function WhatsappLogo(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$icon$2f$dist$2f$chunk$2d$2GBDXOMA$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Icon"], {
        viewBox: "0 0 625.52 625.52",
        focusable: "false",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                children: "WhatsApp Logo"
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/svg/WhatsappLogo.tsx",
                lineNumber: 7,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                transform: "translate(126.76 126.76) scale(15.5)",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2.1 22l5.36-1.4a9.8 9.8 0 0 0 4.58 1.15h.01c5.43 0 9.84-4.4 9.84-9.84C21.89 6.4 17.48 2 12.04 2Zm0 17.98h-.01a8.2 8.2 0 0 1-4.16-1.14l-.3-.18-3.18.83.85-3.1-.2-.32a8.15 8.15 0 0 1-1.25-4.35c0-4.51 3.68-8.18 8.2-8.18a8.14 8.14 0 0 1 8.18 8.19c0 4.51-3.67 8.18-8.13 8.18Zm4.49-6.13c-.25-.13-1.45-.71-1.68-.79-.22-.08-.39-.13-.55.12-.16.25-.63.79-.77.95-.14.16-.28.18-.53.06-.25-.13-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.16.04-.31-.02-.43-.06-.13-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03s.87 2.35.99 2.51c.12.16 1.72 2.62 4.16 3.67.58.25 1.03.4 1.39.51.58.18 1.11.16 1.53.1.47-.07 1.45-.59 1.65-1.17.2-.57.2-1.06.14-1.16-.06-.11-.22-.17-.47-.29Z"
                }, void 0, false, {
                    fileName: "[project]/servicios-lib/components/svg/WhatsappLogo.tsx",
                    lineNumber: 9,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/svg/WhatsappLogo.tsx",
                lineNumber: 8,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/servicios-lib/components/svg/WhatsappLogo.tsx",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
_c = WhatsappLogo;
var _c;
__turbopack_context__.k.register(_c, "WhatsappLogo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/svg/XLogo.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "XLogo",
    ()=>XLogo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$icon$2f$dist$2f$chunk$2d$2GBDXOMA$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/icon/dist/chunk-2GBDXOMA.mjs [client] (ecmascript)");
;
;
function XLogo(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$icon$2f$dist$2f$chunk$2d$2GBDXOMA$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Icon"], {
        viewBox: "0 0 1200 1227",
        focusable: "false",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                children: "X Logo"
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/svg/XLogo.tsx",
                lineNumber: 6,
                columnNumber: 1
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z",
                fill: "#898989"
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/svg/XLogo.tsx",
                lineNumber: 6,
                columnNumber: 22
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/servicios-lib/components/svg/XLogo.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
_c = XLogo;
var _c;
__turbopack_context__.k.register(_c, "XLogo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/svg/YoutubeLogo.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "YoutubeLogo",
    ()=>YoutubeLogo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$icon$2f$dist$2f$chunk$2d$2GBDXOMA$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/icon/dist/chunk-2GBDXOMA.mjs [client] (ecmascript)");
;
;
function YoutubeLogo(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$icon$2f$dist$2f$chunk$2d$2GBDXOMA$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Icon"], {
        viewBox: "0 0 625.52 625.52",
        focusable: "false",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                children: "YouTube Logo"
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/svg/YoutubeLogo.tsx",
                lineNumber: 6,
                columnNumber: 1
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M451.85,242.88c-3.34-12.49-13.18-22.33-25.67-25.67c-22.64-6.07-113.42-6.07-113.42-6.07   s-90.78,0-113.42,6.07c-12.49,3.34-22.33,13.18-25.67,25.67c-6.07,22.64-6.07,69.88-6.07,69.88s0,47.24,6.07,69.88   c3.34,12.49,13.18,22.33,25.67,25.67c22.64,6.07,113.42,6.07,113.42,6.07s90.78,0,113.42-6.07c12.49-3.34,22.33-13.18,25.67-25.67   c6.07-22.64,6.07-69.88,6.07-69.88S457.91,265.52,451.85,242.88z M283.73,356.31v-87.09l75.42,43.55L283.73,356.31z"
                }, void 0, false, {
                    fileName: "[project]/servicios-lib/components/svg/YoutubeLogo.tsx",
                    lineNumber: 6,
                    columnNumber: 31
                }, this)
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/svg/YoutubeLogo.tsx",
                lineNumber: 6,
                columnNumber: 28
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/servicios-lib/components/svg/YoutubeLogo.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
_c = YoutubeLogo;
var _c;
__turbopack_context__.k.register(_c, "YoutubeLogo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/svg/index.ts [client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$FacebookLogo$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/svg/FacebookLogo.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$InstagramLogo$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/svg/InstagramLogo.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$PlaceholderWordmark$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/svg/PlaceholderWordmark.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$SocialIcon$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/svg/SocialIcon.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$StackedWordmark$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/svg/StackedWordmark.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$TiktokLogo$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/svg/TiktokLogo.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$WhatsappLogo$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/svg/WhatsappLogo.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$XLogo$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/svg/XLogo.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$YoutubeLogo$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/svg/YoutubeLogo.tsx [client] (ecmascript)");
;
;
;
;
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/chrome/Wordmark.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnimatedWordmark",
    ()=>AnimatedWordmark
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$emotion$2f$react$2f$dist$2f$emotion$2d$react$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@emotion/react/dist/emotion-react.browser.esm.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/servicios-lib/components/svg/index.ts [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$PlaceholderWordmark$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/svg/PlaceholderWordmark.tsx [client] (ecmascript)");
;
;
;
/**
 * The original reveals its wordmark glyph by glyph — each letter flips in from
 * `rotateY(90deg)` over 0.5s on a 0.05s stagger. `PlaceholderWordmark` draws a
 * single `<text>` between two bracket rules rather than per-letter paths, so
 * the same motion is applied to those three shapes instead.
 */ const reveal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$emotion$2f$react$2f$dist$2f$emotion$2d$react$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["keyframes"])({
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$PlaceholderWordmark$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["PlaceholderWordmark"], {
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
_c = AnimatedWordmark;
var _c;
__turbopack_context__.k.register(_c, "AnimatedWordmark");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/hooks/useMouseFollower.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isTouchDevice",
    ()=>isTouchDevice,
    "useMouseFollower",
    ()=>useMouseFollower
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
/** The lerp factor the original's mouse ticker uses (`new MouseFollower(0.15)`). */ const VELOCITY = 0.15;
function isTouchDevice() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}
function useMouseFollower(onFrame) {
    _s();
    const frame = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(onFrame);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMouseFollower.useEffect": ()=>{
            frame.current = onFrame;
        }
    }["useMouseFollower.useEffect"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMouseFollower.useEffect": ()=>{
            const target = {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2
            };
            const position = {
                ...target
            };
            const touch = isTouchDevice();
            const handleMove = {
                "useMouseFollower.useEffect.handleMove": (event)=>{
                    target.x = event.clientX;
                    target.y = event.clientY;
                }
            }["useMouseFollower.useEffect.handleMove"];
            const handleResize = {
                "useMouseFollower.useEffect.handleResize": ()=>{
                    if (!touch) return;
                    target.x = window.innerWidth / 2;
                    target.y = window.innerHeight / 2;
                }
            }["useMouseFollower.useEffect.handleResize"];
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
            return ({
                "useMouseFollower.useEffect": ()=>{
                    cancelAnimationFrame(raf);
                    window.removeEventListener('mousemove', handleMove);
                    window.removeEventListener('resize', handleResize);
                }
            })["useMouseFollower.useEffect"];
        }
    }["useMouseFollower.useEffect"], []);
}
_s(useMouseFollower, "WO3ECHXDmpYoYiRlRYDZbkZ4bZ4=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/hooks/usePageReady.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePageReady",
    ()=>usePageReady
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
/**
 * Only the very first mount of the session waits for the document; later route
 * changes re-mount the layout and must not put the loader back on screen.
 */ let firstLoadComplete = false;
function usePageReady(minDuration = 1200) {
    _s();
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePageReady.useEffect": ()=>{
            if (firstLoadComplete) {
                setReady(true);
                return;
            }
            const start = performance.now();
            let timer = 0;
            const finish = {
                "usePageReady.useEffect.finish": ()=>{
                    timer = window.setTimeout({
                        "usePageReady.useEffect.finish": ()=>{
                            firstLoadComplete = true;
                            setReady(true);
                        }
                    }["usePageReady.useEffect.finish"], Math.max(0, minDuration - (performance.now() - start)));
                }
            }["usePageReady.useEffect.finish"];
            if (document.readyState === 'complete') {
                finish();
            } else {
                window.addEventListener('load', finish);
            }
            return ({
                "usePageReady.useEffect": ()=>{
                    window.clearTimeout(timer);
                    window.removeEventListener('load', finish);
                }
            })["usePageReady.useEffect"];
        }
    }["usePageReady.useEffect"], [
        minDuration
    ]);
    return ready;
}
_s(usePageReady, "KuazqYXqOk+6VRk8yHVvoClyoeE=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/hooks/index.ts [client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$hooks$2f$useMouseFollower$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/hooks/useMouseFollower.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$hooks$2f$usePageReady$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/hooks/usePageReady.ts [client] (ecmascript)");
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/chrome/motion.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/layout/dist/chunk-PULVB27S.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$FAWTVNS3$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/layout/dist/chunk-FAWTVNS3.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$KRPLQIP4$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/layout/dist/chunk-KRPLQIP4.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$46CXQZ4E$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/layout/dist/chunk-46CXQZ4E.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$system$2f$dist$2f$chunk$2d$ZHQNHOQS$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/system/dist/chunk-ZHQNHOQS.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$motion$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/dom/motion.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [client] (ecmascript)");
;
;
;
const NavLink = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$system$2f$dist$2f$chunk$2d$ZHQNHOQS$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["chakra"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"]);
_c = NavLink;
const MotionBox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$motion$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Box"]);
_c1 = MotionBox;
const MotionFlex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$motion$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$KRPLQIP4$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Flex"]);
_c2 = MotionFlex;
const MotionCenter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$motion$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$FAWTVNS3$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Center"]);
_c3 = MotionCenter;
const MotionListItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$motion$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$46CXQZ4E$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["ListItem"]);
_c4 = MotionListItem;
const MotionNavLink = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$motion$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"])(NavLink);
_c5 = MotionNavLink;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "NavLink");
__turbopack_context__.k.register(_c1, "MotionBox");
__turbopack_context__.k.register(_c2, "MotionFlex");
__turbopack_context__.k.register(_c3, "MotionCenter");
__turbopack_context__.k.register(_c4, "MotionListItem");
__turbopack_context__.k.register(_c5, "MotionNavLink");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/chrome/Cursor.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/layout/dist/chunk-PULVB27S.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/animation/animate.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$hooks$2f$use$2d$animation$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/animation/hooks/use-animation.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-motion-value.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$hooks$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/servicios-lib/hooks/index.ts [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$hooks$2f$useMouseFollower$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/hooks/useMouseFollower.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/motion.ts [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
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
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePrevious.useEffect": ()=>{
            ref.current = value;
            return ({
                "usePrevious.useEffect": ()=>{
                    ref.current = undefined;
                }
            })["usePrevious.useEffect"];
        }
    }["usePrevious.useEffect"]);
    return ref.current;
}
_s(usePrevious, "8uVE59eA/r6b92xF80p7sH8rXLk=");
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
    _s1();
    const root = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const canvas = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const size = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])({
        width: 0,
        height: 0
    });
    const [rotation, setRotation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const controls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$hooks$2f$use$2d$animation$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useAnimation"])();
    const previousType = usePrevious(type);
    const arrowRight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const arrowLeft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const ring = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Cursor.useEffect": ()=>{
            if (!animateClick) return;
            controls.start('clicked');
            onClickAnimation?.();
        }
    }["Cursor.useEffect"], [
        animateClick,
        controls,
        onClickAnimation
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Cursor.useEffect": ()=>{
            if (type === previousType) return;
            const wasRight = previousType === CURSOR_TYPE.arrowRight;
            const wasLeft = previousType === CURSOR_TYPE.arrowLeft;
            const isRight = type === CURSOR_TYPE.arrowRight;
            const isLeft = type === CURSOR_TYPE.arrowLeft;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["animate"])(ring, type === CURSOR_TYPE.hidden ? 0 : 1, TRANSITION);
            if (isRight || wasRight) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["animate"])(arrowRight, isRight ? 1 : 0, TRANSITION);
            if (isLeft || wasLeft) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["animate"])(arrowLeft, isLeft ? 1 : 0, TRANSITION);
        }
    }["Cursor.useEffect"], [
        type,
        previousType,
        ring,
        arrowRight,
        arrowLeft
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Cursor.useEffect": ()=>{
            if (!canvas.current) return;
            ctx.current = setCanvas(canvas.current);
            size.current = {
                width: canvas.current.offsetWidth,
                height: canvas.current.offsetHeight
            };
        }
    }["Cursor.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Cursor.useEffect": ()=>{
            if (type !== CURSOR_TYPE.loading) return;
            const interval = window.setInterval({
                "Cursor.useEffect.interval": ()=>setRotation(randomRotation)
            }["Cursor.useEffect.interval"], 2000);
            return ({
                "Cursor.useEffect": ()=>window.clearInterval(interval)
            })["Cursor.useEffect"];
        }
    }["Cursor.useEffect"], [
        type
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$hooks$2f$useMouseFollower$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["useMouseFollower"])({
        "Cursor.useMouseFollower": ({ x, y })=>{
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
        }
    }["Cursor.useMouseFollower"]);
    const labelVisible = type === CURSOR_TYPE.label || type === CURSOR_TYPE.loading;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Box"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["MotionBox"], {
                variants: canvasVariants,
                animate: controls,
                pos: "absolute",
                w: "100%",
                h: "100%",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["MotionBox"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Box"], {
                as: "span",
                display: "inline-block",
                overflow: "hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["MotionBox"], {
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
_s1(Cursor, "hxzUw4HZHoSsWsjM84Z/bxdRABE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$hooks$2f$use$2d$animation$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useAnimation"],
        usePrevious,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useMotionValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useMotionValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useMotionValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$hooks$2f$useMouseFollower$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["useMouseFollower"]
    ];
});
_c = Cursor;
var _c;
__turbopack_context__.k.register(_c, "Cursor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/data/content.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"site\":{\"title\":\"Yaakob - XIX - XXIII | Protección y Defensa Fiscal en México\",\"description\":\"Yaakob Consultores S.C.: despacho especializado en defensa fiscal. Diagnóstico fiscal, auditorías del SAT, créditos fiscales, multas, sellos digitales, defensa 69-B y UIF-FGR. Asesoría con L.C. Juan José de Anda González.\",\"url\":\"https://yaakob.com\",\"shareImage\":\"https://yaakob.com/logo.png\"},\"items\":[{\"id\":\"diagnostico-fiscal\",\"slug\":\"diagnostico-fiscal\",\"label\":\"Diagnóstico Fiscal\",\"url\":\"/diagnostico-fiscal/view\",\"thumbnail\":{\"src\":\"/servicios/diagnostico-fiscal.jpg\",\"alt\":\"Analista revisando un tablero de cumplimiento fiscal del SAT\"},\"tagline\":\"Panorama real de su situación fiscal\",\"about\":{\"heading\":\"Síntesis\",\"description\":\"Integración de las obligaciones del contribuyente bajo expedientes, notificaciones y posibles riesgos fiscales.\",\"tags\":[\"DIAGNÓSTICO\",\"DICTAMEN\",\"EXPEDIENTE\",\"RIESGO\"]},\"description\":{\"heading\":\"Panorama real de su situación fiscal\",\"body\":\"Integración de las obligaciones del contribuyente bajo expedientes, notificaciones y posibles riesgos fiscales.\"},\"background\":{\"fluxColor\":\"#c94f4f\"}},{\"id\":\"presuntiva-fiscal\",\"slug\":\"presuntiva-fiscal\",\"label\":\"Presuntiva Fiscal\",\"url\":\"/presuntiva-fiscal/view\",\"thumbnail\":{\"src\":\"/servicios/presuntiva-fiscal.jpg\",\"alt\":\"Presuntiva fiscal\"},\"tagline\":\"Modelo de vigilancia profunda\",\"about\":{\"heading\":\"Síntesis\",\"description\":\"Revisión preventiva para identificar diferencias, omisiones e inconsistencias que pueden originar requerimientos, multas, actualizaciones, recargos o actos de fiscalización.\",\"tags\":[\"PREVENCIÓN\",\"ERRORES\",\"DIFERENCIAS\",\"SIMULACIÓN\"]},\"description\":{\"heading\":\"Modelo de vigilancia profunda\",\"body\":\"Revisión preventiva para identificar diferencias, omisiones e inconsistencias que pueden originar requerimientos, multas, actualizaciones, recargos o actos de fiscalización.\"},\"background\":{\"fluxColor\":\"#c98a3a\"}},{\"id\":\"requerimientos-sat\",\"slug\":\"requerimientos-sat\",\"label\":\"Requerimientos SAT\",\"url\":\"/requerimientos-sat/view\",\"thumbnail\":{\"src\":\"/servicios/requerimientos-sat.jpg\",\"alt\":\"Requerimientos del SAT\"},\"tagline\":\"Solución oportuna a cada notificación\",\"about\":{\"heading\":\"Síntesis\",\"description\":\"Apoyo para analizar y solventar requerimientos, cartas invitación, avisos y solicitudes de información emitidas por la autoridad.\",\"tags\":[\"SAT\",\"UIF\",\"FGR\",\"BANCOS\"]},\"description\":{\"heading\":\"Solución oportuna a cada notificación\",\"body\":\"Apoyo para analizar y solventar requerimientos, cartas invitación, avisos y solicitudes de información emitidas por la autoridad.\"},\"background\":{\"fluxColor\":\"#3aa89e\"}},{\"id\":\"auditorias\",\"slug\":\"auditorias\",\"label\":\"Auditorías\",\"url\":\"/auditorias/view\",\"thumbnail\":{\"src\":\"/servicios/auditorias.jpg\",\"alt\":\"Acompañamiento en auditorías\"},\"tagline\":\"Determinación del riesgo fiscal\",\"about\":{\"heading\":\"Síntesis\",\"description\":\"Revisión de gabinete, visitas domiciliarias, revisiones electrónicas y demás actos de auditoría fiscal.\",\"tags\":[\"AUDITORÍA\",\"GABINETE\",\"VISITAS\",\"FISCALIZACIÓN\"]},\"description\":{\"heading\":\"Determinación del riesgo fiscal\",\"body\":\"Revisión de gabinete, visitas domiciliarias, revisiones electrónicas y demás actos de auditoría fiscal.\"},\"background\":{\"fluxColor\":\"#4f74c9\"}},{\"id\":\"multas-fiscales\",\"slug\":\"multas-fiscales\",\"label\":\"Multas Fiscales\",\"url\":\"/multas-fiscales/view\",\"thumbnail\":{\"src\":\"/servicios/multas-fiscales.jpg\",\"alt\":\"Corrección de multas fiscales\"},\"tagline\":\"Disminución de sanciones y recargos\",\"about\":{\"heading\":\"Síntesis\",\"description\":\"Corrección de multas, recargos, actualizaciones y sanciones impuestas al contribuyente.\",\"tags\":[\"MULTAS\",\"RECARGOS\",\"SANCIONES\",\"CORRECCIÓN\"]},\"description\":{\"heading\":\"Disminución de sanciones y recargos\",\"body\":\"Corrección de multas, recargos, actualizaciones y sanciones impuestas al contribuyente.\"},\"background\":{\"fluxColor\":\"#a84f8a\"}},{\"id\":\"creditos-fiscales\",\"slug\":\"creditos-fiscales\",\"label\":\"Créditos Fiscales\",\"url\":\"/creditos-fiscales/view\",\"thumbnail\":{\"src\":\"/servicios/creditos-fiscales.jpg\",\"alt\":\"Créditos fiscales\"},\"tagline\":\"Estrategia de pago, garantía o impugnación\",\"about\":{\"heading\":\"Síntesis\",\"description\":\"Análisis de la determinación de contribuciones, accesorios y créditos fiscales, así como de las alternativas de pago, garantía o impugnación.\",\"tags\":[\"CRÉDITOS\",\"GARANTÍA\",\"IMPUGNACIÓN\",\"PAGO\"]},\"description\":{\"heading\":\"Estrategia de pago, garantía o impugnación\",\"body\":\"Análisis de la determinación de contribuciones, accesorios y créditos fiscales, así como de las alternativas de pago, garantía o impugnación.\"},\"background\":{\"fluxColor\":\"#6fa83a\"}},{\"id\":\"sellos-digitales\",\"slug\":\"sellos-digitales\",\"label\":\"Sellos Digitales\",\"url\":\"/sellos-digitales/view\",\"thumbnail\":{\"src\":\"/servicios/sellos-digitales.jpg\",\"alt\":\"Restricción o cancelación de sellos digitales\"},\"tagline\":\"Recuperación del Certificado de Sello Digital\",\"about\":{\"heading\":\"Síntesis\",\"description\":\"Reactivación del certificado de sello digital, considerando el requerimiento o documento emitido por la autoridad.\",\"tags\":[\"CSD\",\"EFIRMA\",\"SELLOS\",\"RECUPERACIÓN\"]},\"description\":{\"heading\":\"Recuperación del Certificado de Sello Digital\",\"body\":\"Reactivación del certificado de sello digital, considerando el requerimiento o documento emitido por la autoridad.\"},\"background\":{\"fluxColor\":\"#c9793a\"}},{\"id\":\"defensa-69b\",\"slug\":\"defensa-69b\",\"label\":\"Defensa 69-B\",\"url\":\"/defensa-69b/view\",\"thumbnail\":{\"src\":\"/servicios/defensa-69b.jpg\",\"alt\":\"Defensa ante el listado 69-B\"},\"tagline\":\"Defensa legal ante el listado del 69-B\",\"about\":{\"heading\":\"Síntesis\",\"description\":\"Aclaración de presuntivas, preparación de pruebas, escritos y demás medios procedentes.\",\"tags\":[\"69-B\",\"DEFENSA\",\"MATERIALIDAD\",\"CORRECCIÓN\"]},\"description\":{\"heading\":\"Defensa legal ante el listado del 69-B\",\"body\":\"Aclaración de presuntivas, preparación de pruebas, escritos y demás medios procedentes.\"},\"background\":{\"fluxColor\":\"#4f5fc9\"}},{\"id\":\"uif-fgr\",\"slug\":\"uif-fgr\",\"label\":\"Bloqueo  - UIF-FGR\",\"url\":\"/uif-fgr/view\",\"thumbnail\":{\"src\":\"/servicios/uif-fgr.jpg\",\"alt\":\"Debido proceso ante UIF y FGR\"},\"tagline\":\"Prevención financiera y fiscal\",\"about\":{\"heading\":\"Síntesis\",\"description\":\"Resolución definitiva por derechos, legalidad, seguridad y acceso a información ante la UIF y la FGR.\",\"tags\":[\"CNBV\",\"BLOQUEO\",\"GARANTÍA\"]},\"description\":{\"heading\":\"Prevención financiera y fiscal\",\"body\":\"Resolución definitiva por derechos, legalidad, seguridad y acceso a información ante la Unidad de Inteligencia Financiera y la Fiscalía General de la República.\"},\"background\":{\"fluxColor\":\"#7a3ac9\"}},{\"id\":\"controles-volumetricos\",\"slug\":\"controles-volumetricos\",\"label\":\"Controles Volumétricos\",\"url\":\"/controles-volumetricos/view\",\"thumbnail\":{\"src\":\"/servicios/controles-volumetricos.jpg\",\"alt\":\"Controles volumétricos\"},\"tagline\":\"Subsanación de irregularidades\",\"about\":{\"heading\":\"Síntesis\",\"description\":\"Regularización sobre la Ley de Hidrocarburos, ANAM y AGASE.\",\"tags\":[\"SOFTWARE\",\"PEDIMENTOS\",\"REGISTROS\",\"IRREGULARIDADES\"]},\"description\":{\"heading\":\"Subsanación de irregularidades\",\"body\":\"Regularización sobre la Ley de Hidrocarburos, ANAM y AGASE.\"},\"background\":{\"fluxColor\":\"#c93a6f\"}},{\"id\":\"regularizacion-fiscal\",\"slug\":\"regularizacion-fiscal\",\"label\":\"Regularización Fiscal\",\"url\":\"/regularizacion-fiscal/view\",\"thumbnail\":{\"src\":\"/servicios/regularizacion-fiscal.jpg\",\"alt\":\"Regularización fiscal\"},\"tagline\":\"Estrategias para poner al día su situación fiscal\",\"about\":{\"heading\":\"Síntesis\",\"description\":\"Prevenir, identificar y corregir irregularidades, fraudes, incumplimientos y riesgos fiscales.\",\"tags\":[\"DIAGNÓSTICO\",\"ANÁLISIS\",\"CUMPLIMIENTO\"]},\"description\":{\"heading\":\"Estrategias para poner al día su situación fiscal\",\"body\":\"Prevenir, identificar y corregir irregularidades, fraudes, incumplimientos y riesgos fiscales.\"},\"background\":{\"fluxColor\":\"#3ac9a8\"}}],\"detail\":{\"ctas\":{\"primary\":\"Ver servicio\",\"share\":\"Compartir\",\"clipboard\":\"Enlace copiado\"},\"headings\":{\"description\":\"Descripción\",\"login\":\"Solicitar asesoría\"},\"login\":{\"subheading\":\"Hable con un especialista\",\"body\":\"Cada caso es distinto. Agende una consulta para revisar su situación y definir la estrategia adecuada.\",\"ctas\":{\"login\":{\"label\":\"Solicitar consulta\",\"href\":\"/\"},\"register\":{\"label\":\"Más información\",\"href\":\"/\"}}}},\"nav\":{\"primary\":\"Ver servicio\",\"secondary\":\"Detalles\",\"tertiary\":\"Servicios\",\"login\":\"Solicitar asesoría\"},\"news\":{\"label\":\"Noticias\",\"items\":[{\"id\":\"visitas-domiciliarias\",\"title\":\"Ya es oficial: el SAT visitará casa por casa con cámaras especiales y abogados para verificar el cumplimiento de las obligaciones fiscales\",\"source\":\"El Cronista\",\"href\":\"https://www.cronista.com/mexico/finanzas-economia/ya-es-oficial-el-sat-visitara-casa-por-casa-con-camaras-especiales-y-abogados-para-verificar-el-cumplimiento-de-las-obligaciones-fiscales/\"},{\"id\":\"buzon-tributario\",\"title\":\"¿No activaste tu Buzón Tributario? El SAT advierte sanciones desde enero de 2026\",\"source\":\"Google Noticias\",\"href\":\"https://share.google/ZPMBqvkB62SLh6M9u\"},{\"id\":\"transferencias-familiares\",\"title\":\"Oficial | El SAT te puede multar por hacer transferencias a familiares: este es el monto permitido y las sanciones\",\"source\":\"Google Noticias\",\"href\":\"https://share.google/MHcELoupohGI7YVWA\"},{\"id\":\"huachicol-fiscal\",\"title\":\"El SAT le declara la guerra al huachicol fiscal: qué cambia para los transportistas desde el 24 de abril de 2026\",\"source\":\"Transporte.mx\",\"href\":\"https://share.google/d6O8Pdp8RUJsqYk3W\"},{\"id\":\"tarjetas-debito\",\"title\":\"¿Tienes varias tarjetas de débito? Esto es lo que el SAT revisa en agosto de 2026 para no multarte\",\"source\":\"El Informador\",\"href\":\"https://share.google/XUO1Gu2VfrxoG1ZaO\"},{\"id\":\"gastos-escolares\",\"title\":\"SAT permite deducir estos gastos escolares: requisitos y monto máximo\",\"source\":\"Google Noticias\",\"href\":\"https://share.google/ZPtYClBoWl9e0EKEJ\"},{\"id\":\"correo-declaracion-anual\",\"title\":\"Qué pasa cuando el SAT te envía un correo por no presentar tu Declaración Anual\",\"source\":\"Google Noticias\",\"href\":\"https://share.google/UEjclZrcsEASdKdMW\"}]},\"contact\":{\"title\":\"Yaakob Consultores SC\",\"heading\":\"Hablemos sobre su situación fiscal\",\"fields\":[{\"id\":\"despacho\",\"icon\":\"building\",\"label\":\"Despacho\",\"lines\":[\"Yaakob Consultores S.C.\"]},{\"id\":\"especialista\",\"icon\":\"user\",\"label\":\"Especialista\",\"lines\":[\"L.C. Juan José de Anda González\"]},{\"id\":\"telefono\",\"icon\":\"phone\",\"label\":\"Teléfono\",\"lines\":[\"+52 55 9008 6360\",\"+52 55 9008 7881\"],\"href\":\"tel:+525590086360\"},{\"id\":\"whatsapp\",\"icon\":\"chat\",\"label\":\"WhatsApp\",\"lines\":[\"+52 55 2741 6178\"],\"href\":\"https://wa.me/5215527416178\"},{\"id\":\"correo\",\"icon\":\"mail\",\"label\":\"Correo\",\"lines\":[\"contacto@yaakob.com\"],\"href\":\"mailto:contacto@yaakob.com\"},{\"id\":\"sitio\",\"icon\":\"globe\",\"label\":\"Sitio web\",\"lines\":[\"www.yaakob.com\"],\"href\":\"https://www.yaakob.com\"},{\"id\":\"direccion\",\"icon\":\"pin\",\"label\":\"Dirección\",\"lines\":[\"Alica 40 Lomas de Chapultepec\",\"Miguel Hidalgo CDMX, CP 11000\"]},{\"id\":\"horarios\",\"icon\":\"clock\",\"label\":\"Horarios\",\"lines\":[\"9:00 A.M. a 6:00 P.M.\"]}],\"qr\":{\"src\":\"/servicios/contacto-qr.svg\",\"href\":\"https://wa.me/5215527416178\",\"caption\":\"Escanea para agendar tu evaluación inicial\"},\"legal\":{\"label\":\"Aviso legal\",\"body\":\"Los servicios ofrecidos se desarrollan dentro del marco jurídico aplicable. Cada asunto se encuentra sujeto al análisis de sus antecedentes, documentación, plazos y circunstancias particulares. La contratación de servicios profesionales no garantiza un resultado determinado y no comprende actos de evasión fiscal, simulación de operaciones, ocultamiento de información ni cualquier otra conducta contraria a la ley.\"},\"signature\":\"Yaakob Consultores SC · Protección y defensa fiscal\"},\"footer\":{\"cookies\":{\"label\":\"Configuración de cookies\"},\"privacy\":{\"label\":\"Aviso de privacidad\",\"href\":\"/privacidad\"},\"ads\":{\"label\":\"Términos\",\"href\":\"/terminos\"},\"logo\":{\"href\":\"/\"},\"contact\":{\"label\":\"Contacto\",\"href\":\"https://wa.me/5215527416178\"},\"social\":{\"instagram\":{\"href\":\"https://www.instagram.com/yaakobeheart/\",\"label\":\"Instagram\"},\"facebook\":{\"href\":\"https://www.facebook.com/profile.php?id=61587552527813&locale=es_LA\",\"label\":\"Facebook\"},\"tiktok\":{\"href\":\"https://www.tiktok.com/@yaakob_heart\",\"label\":\"TikTok\"},\"youtube\":{\"href\":\"https://www.youtube.com/@YaakobBeHeart\",\"label\":\"YouTube\"},\"twitter\":{\"href\":\"https://x.com/yaakob\",\"label\":\"X\"},\"whatsapp\":{\"href\":\"https://wa.me/5215527416178\",\"label\":\"WhatsApp\"}}}}"));}),
"[project]/servicios-lib/components/contact/icons.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CONTACT_ICONS",
    ()=>CONTACT_ICONS,
    "ScaleIcon",
    ()=>ScaleIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$icon$2f$dist$2f$chunk$2d$2GBDXOMA$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/icon/dist/chunk-2GBDXOMA.mjs [client] (ecmascript)");
;
;
/**
 * The eight glyphs the contact card needs, drawn as 24×24 strokes so they read
 * at the same weight as the rest of the chrome. Chakra's icon pack is not a
 * dependency here, so they ship inline.
 */ function strokeIcon(displayName, path) {
    function StrokeIcon(props) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$icon$2f$dist$2f$chunk$2d$2GBDXOMA$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Icon"], {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 1.6,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            ...props,
            children: path
        }, void 0, false, {
            fileName: "[project]/servicios-lib/components/contact/icons.tsx",
            lineNumber: 12,
            columnNumber: 7
        }, this);
    }
    StrokeIcon.displayName = displayName;
    return StrokeIcon;
}
const BuildingIcon = strokeIcon('BuildingIcon', /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
    children: [
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M4 21V5.5A1.5 1.5 0 0 1 5.5 4h8A1.5 1.5 0 0 1 15 5.5V21"
        }, void 0, false, {
            fileName: "[project]/servicios-lib/components/contact/icons.tsx",
            lineNumber: 32,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M15 10h3.5A1.5 1.5 0 0 1 20 11.5V21"
        }, void 0, false, {
            fileName: "[project]/servicios-lib/components/contact/icons.tsx",
            lineNumber: 33,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M3 21h18"
        }, void 0, false, {
            fileName: "[project]/servicios-lib/components/contact/icons.tsx",
            lineNumber: 34,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M7.5 8h4M7.5 12h4M7.5 16h4"
        }, void 0, false, {
            fileName: "[project]/servicios-lib/components/contact/icons.tsx",
            lineNumber: 35,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    ]
}, void 0, true));
const UserIcon = strokeIcon('UserIcon', /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
    children: [
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
            cx: "12",
            cy: "8",
            r: "3.5"
        }, void 0, false, {
            fileName: "[project]/servicios-lib/components/contact/icons.tsx",
            lineNumber: 42,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M5 20a7 7 0 0 1 14 0"
        }, void 0, false, {
            fileName: "[project]/servicios-lib/components/contact/icons.tsx",
            lineNumber: 43,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    ]
}, void 0, true));
const PhoneIcon = strokeIcon('PhoneIcon', /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
    d: "M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z"
}, void 0, false, {
    fileName: "[project]/servicios-lib/components/contact/icons.tsx",
    lineNumber: 49,
    columnNumber: 3
}, ("TURBOPACK compile-time value", void 0)));
const ChatIcon = strokeIcon('ChatIcon', /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
    d: "M20 12.5c0 3.9-3.6 7-8 7a9.3 9.3 0 0 1-2.9-.45L4 20.5l1.35-3.6A6.6 6.6 0 0 1 4 12.5c0-3.9 3.6-7 8-7s8 3.1 8 7Z"
}, void 0, false, {
    fileName: "[project]/servicios-lib/components/contact/icons.tsx",
    lineNumber: 54,
    columnNumber: 3
}, ("TURBOPACK compile-time value", void 0)));
const MailIcon = strokeIcon('MailIcon', /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
    children: [
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
            x: "3",
            y: "5.5",
            width: "18",
            height: "13",
            rx: "2"
        }, void 0, false, {
            fileName: "[project]/servicios-lib/components/contact/icons.tsx",
            lineNumber: 60,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "m3.8 7 7.1 5.4a2 2 0 0 0 2.4 0L20.2 7"
        }, void 0, false, {
            fileName: "[project]/servicios-lib/components/contact/icons.tsx",
            lineNumber: 61,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    ]
}, void 0, true));
const GlobeIcon = strokeIcon('GlobeIcon', /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
    children: [
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
            cx: "12",
            cy: "12",
            r: "8.5"
        }, void 0, false, {
            fileName: "[project]/servicios-lib/components/contact/icons.tsx",
            lineNumber: 68,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M3.5 12h17"
        }, void 0, false, {
            fileName: "[project]/servicios-lib/components/contact/icons.tsx",
            lineNumber: 69,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M12 3.5c2.2 2.3 3.4 5.3 3.4 8.5s-1.2 6.2-3.4 8.5c-2.2-2.3-3.4-5.3-3.4-8.5S9.8 5.8 12 3.5Z"
        }, void 0, false, {
            fileName: "[project]/servicios-lib/components/contact/icons.tsx",
            lineNumber: 70,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    ]
}, void 0, true));
const PinIcon = strokeIcon('PinIcon', /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
    children: [
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M12 21s6.5-5.6 6.5-10.2A6.5 6.5 0 0 0 5.5 10.8C5.5 15.4 12 21 12 21Z"
        }, void 0, false, {
            fileName: "[project]/servicios-lib/components/contact/icons.tsx",
            lineNumber: 77,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
            cx: "12",
            cy: "10.5",
            r: "2.5"
        }, void 0, false, {
            fileName: "[project]/servicios-lib/components/contact/icons.tsx",
            lineNumber: 78,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    ]
}, void 0, true));
const ClockIcon = strokeIcon('ClockIcon', /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
    children: [
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
            cx: "12",
            cy: "12",
            r: "8.5"
        }, void 0, false, {
            fileName: "[project]/servicios-lib/components/contact/icons.tsx",
            lineNumber: 85,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M12 7.5V12l3 1.8"
        }, void 0, false, {
            fileName: "[project]/servicios-lib/components/contact/icons.tsx",
            lineNumber: 86,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    ]
}, void 0, true));
const ScaleIcon = strokeIcon('ScaleIcon', /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
        d: "M12 4v16M7 20h10M4 8h16M8 8l-3 6h6L8 8ZM16 8l-3 6h6l-3-6Z"
    }, void 0, false, {
        fileName: "[project]/servicios-lib/components/contact/icons.tsx",
        lineNumber: 93,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0))
}, void 0, false));
const CONTACT_ICONS = {
    building: BuildingIcon,
    user: UserIcon,
    phone: PhoneIcon,
    chat: ChatIcon,
    mail: MailIcon,
    globe: GlobeIcon,
    pin: PinIcon,
    clock: ClockIcon
};
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/contact/ContactModal.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ContactModal",
    ()=>ContactModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/layout/dist/chunk-PULVB27S.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$KRPLQIP4$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/layout/dist/chunk-KRPLQIP4.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$JARCRF6W$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/layout/dist/chunk-JARCRF6W.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$image$2f$dist$2f$chunk$2d$QINAG4RG$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/image/dist/chunk-QINAG4RG.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$K7XRJ7NL$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/layout/dist/chunk-K7XRJ7NL.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$modal$2f$dist$2f$chunk$2d$MSA2NPQT$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/modal/dist/chunk-MSA2NPQT.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$modal$2f$dist$2f$chunk$2d$OFOVX77R$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/modal/dist/chunk-OFOVX77R.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$modal$2f$dist$2f$chunk$2d$4FCEGNGT$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/modal/dist/chunk-4FCEGNGT.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$modal$2f$dist$2f$chunk$2d$EL2VKIZQ$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/modal/dist/chunk-EL2VKIZQ.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$modal$2f$dist$2f$chunk$2d$JQMJHPZH$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/modal/dist/chunk-JQMJHPZH.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$2OOHT3W5$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/layout/dist/chunk-2OOHT3W5.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/servicios-lib/components/svg/index.ts [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$WhatsappLogo$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/svg/WhatsappLogo.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$data$2f$content$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/servicios-lib/data/content.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$icons$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/contact/icons.tsx [client] (ecmascript)");
;
;
;
;
;
const { contact } = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$data$2f$content$2e$json__$28$json$29$__["default"];
const CARD_BORDER = 'rgba(255,255,255,0.07)';
const CARD_BG = 'rgba(255,255,255,0.025)';
const LABEL = '#8A8F99';
/** Every row is the same card; only the ones with an `href` are clickable. */ function ContactCard({ field }) {
    const Glyph = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$icons$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["CONTACT_ICONS"][field.icon];
    const isExternal = Boolean(field.href?.startsWith('http'));
    const card = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$KRPLQIP4$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Flex"], {
        align: "center",
        gap: 4,
        h: "100%",
        px: 4,
        py: 3,
        bg: CARD_BG,
        border: "1px solid",
        borderColor: CARD_BORDER,
        borderRadius: "14px",
        transition: "border-color 0.3s ease-out, background 0.3s ease-out",
        _hover: field.href ? {
            borderColor: 'goldAlt',
            bg: 'rgba(224,190,122,0.06)'
        } : undefined,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$KRPLQIP4$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Flex"], {
                align: "center",
                justify: "center",
                flexShrink: 0,
                w: "42px",
                h: "42px",
                borderRadius: "12px",
                bg: "rgba(224,190,122,0.09)",
                border: "1px solid",
                borderColor: "rgba(224,190,122,0.18)",
                color: "gold",
                children: Glyph ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Glyph, {
                    w: "20px",
                    h: "20px"
                }, void 0, false, {
                    fileName: "[project]/servicios-lib/components/contact/ContactModal.tsx",
                    lineNumber: 63,
                    columnNumber: 18
                }, this) : null
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/contact/ContactModal.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Box"], {
                minW: 0,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$2OOHT3W5$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Text"], {
                        fontFamily: "var(--font-gridnik)",
                        fontSize: "0.5625rem",
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: LABEL,
                        mb: 1,
                        children: field.label
                    }, void 0, false, {
                        fileName: "[project]/servicios-lib/components/contact/ContactModal.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    field.lines.map((line)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$2OOHT3W5$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Text"], {
                            fontSize: "0.875rem",
                            lineHeight: "1.35",
                            color: "white",
                            children: line
                        }, line, false, {
                            fileName: "[project]/servicios-lib/components/contact/ContactModal.tsx",
                            lineNumber: 77,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/servicios-lib/components/contact/ContactModal.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/servicios-lib/components/contact/ContactModal.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
    if (!field.href) return card;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$K7XRJ7NL$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Link"], {
        href: field.href,
        isExternal: isExternal,
        display: "block",
        h: "100%",
        _hover: {
            textDecor: 'none'
        },
        _focusVisible: {
            boxShadow: 'outline',
            borderRadius: '14px'
        },
        children: card
    }, void 0, false, {
        fileName: "[project]/servicios-lib/components/contact/ContactModal.tsx",
        lineNumber: 88,
        columnNumber: 5
    }, this);
}
_c = ContactCard;
function ContactModal({ isOpen, onClose }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$modal$2f$dist$2f$chunk$2d$MSA2NPQT$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Modal"], {
        isOpen: isOpen,
        onClose: onClose,
        isCentered: true,
        scrollBehavior: "inside",
        size: "5xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$modal$2f$dist$2f$chunk$2d$JQMJHPZH$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["ModalOverlay"], {
                bg: "rgba(0,0,0,0.78)",
                backdropFilter: "blur(6px)"
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/contact/ContactModal.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$modal$2f$dist$2f$chunk$2d$EL2VKIZQ$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["ModalContent"], {
                bg: "grey1",
                color: "white",
                border: "1px solid",
                borderColor: "rgba(255,255,255,0.09)",
                borderRadius: "18px",
                overflow: "hidden",
                mx: [
                    3,
                    null,
                    6
                ],
                my: [
                    4,
                    null,
                    8
                ],
                maxH: "calc(var(--vh, 1vh) * 92)",
                boxShadow: "2xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$KRPLQIP4$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Flex"], {
                        align: "center",
                        gap: 3,
                        px: [
                            4,
                            null,
                            6
                        ],
                        py: 4,
                        borderBottom: "1px solid",
                        borderColor: "rgba(255,255,255,0.08)",
                        flexShrink: 0,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$KRPLQIP4$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Flex"], {
                                align: "center",
                                justify: "center",
                                flexShrink: 0,
                                w: "36px",
                                h: "36px",
                                borderRadius: "full",
                                bg: "white",
                                overflow: "hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$image$2f$dist$2f$chunk$2d$QINAG4RG$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Image"], {
                                    src: "/logo.png",
                                    alt: "",
                                    w: "30px",
                                    h: "30px",
                                    objectFit: "contain"
                                }, void 0, false, {
                                    fileName: "[project]/servicios-lib/components/contact/ContactModal.tsx",
                                    lineNumber: 143,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/servicios-lib/components/contact/ContactModal.tsx",
                                lineNumber: 133,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$2OOHT3W5$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Text"], {
                                fontSize: "1rem",
                                fontWeight: "medium",
                                letterSpacing: "0.01em",
                                children: contact.title
                            }, void 0, false, {
                                fileName: "[project]/servicios-lib/components/contact/ContactModal.tsx",
                                lineNumber: 145,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/servicios-lib/components/contact/ContactModal.tsx",
                        lineNumber: 123,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$modal$2f$dist$2f$chunk$2d$4FCEGNGT$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["ModalCloseButton"], {
                        top: 4,
                        right: 4,
                        color: LABEL,
                        _hover: {
                            color: 'white',
                            bg: 'transparent'
                        }
                    }, void 0, false, {
                        fileName: "[project]/servicios-lib/components/contact/ContactModal.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$modal$2f$dist$2f$chunk$2d$OFOVX77R$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["ModalBody"], {
                        px: [
                            4,
                            null,
                            8
                        ],
                        py: [
                            5,
                            null,
                            6
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$2OOHT3W5$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Text"], {
                                as: "h2",
                                fontFamily: "heading",
                                fontWeight: "bold",
                                fontSize: [
                                    '1.5rem',
                                    null,
                                    '1.875rem',
                                    null,
                                    '2.25rem'
                                ],
                                lineHeight: "1.1",
                                letterSpacing: "-0.02em",
                                mb: [
                                    5,
                                    null,
                                    6
                                ],
                                children: contact.heading
                            }, void 0, false, {
                                fileName: "[project]/servicios-lib/components/contact/ContactModal.tsx",
                                lineNumber: 152,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$JARCRF6W$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Grid"], {
                                templateColumns: [
                                    '1fr',
                                    null,
                                    null,
                                    '1fr 1fr 0.85fr'
                                ],
                                gap: [
                                    3,
                                    null,
                                    3.5
                                ],
                                alignItems: "stretch",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$JARCRF6W$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Grid"], {
                                        templateColumns: [
                                            '1fr',
                                            null,
                                            '1fr 1fr',
                                            null,
                                            null
                                        ],
                                        gap: [
                                            3,
                                            null,
                                            3.5
                                        ],
                                        gridColumn: [
                                            null,
                                            null,
                                            null,
                                            'span 2'
                                        ],
                                        gridAutoRows: "1fr",
                                        children: contact.fields.map((field)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ContactCard, {
                                                field: field
                                            }, field.id, false, {
                                                fileName: "[project]/servicios-lib/components/contact/ContactModal.tsx",
                                                lineNumber: 172,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/servicios-lib/components/contact/ContactModal.tsx",
                                        lineNumber: 165,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$KRPLQIP4$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Flex"], {
                                        direction: "column",
                                        align: "center",
                                        justify: "center",
                                        gap: 5,
                                        px: 5,
                                        py: 7,
                                        bg: CARD_BG,
                                        border: "1px solid",
                                        borderColor: CARD_BORDER,
                                        borderRadius: "14px",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$K7XRJ7NL$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Link"], {
                                                href: contact.qr.href,
                                                isExternal: true,
                                                pos: "relative",
                                                p: 4,
                                                bg: "white",
                                                borderRadius: "10px",
                                                border: "2px dashed",
                                                borderColor: "rgba(255,255,255,0.35)",
                                                "aria-label": "Abrir WhatsApp",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$image$2f$dist$2f$chunk$2d$QINAG4RG$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Image"], {
                                                        src: contact.qr.src,
                                                        alt: "Código QR de WhatsApp de Yaakob Consultores",
                                                        w: [
                                                            '150px',
                                                            null,
                                                            '180px'
                                                        ],
                                                        h: [
                                                            '150px',
                                                            null,
                                                            '180px'
                                                        ]
                                                    }, void 0, false, {
                                                        fileName: "[project]/servicios-lib/components/contact/ContactModal.tsx",
                                                        lineNumber: 199,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$KRPLQIP4$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Flex"], {
                                                        pos: "absolute",
                                                        top: "50%",
                                                        left: "50%",
                                                        transform: "translate(-50%, -50%)",
                                                        align: "center",
                                                        justify: "center",
                                                        w: "44px",
                                                        h: "44px",
                                                        borderRadius: "full",
                                                        bg: "white",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$WhatsappLogo$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["WhatsappLogo"], {
                                                            w: "34px",
                                                            h: "34px",
                                                            background: "transparent"
                                                        }, void 0, false, {
                                                            fileName: "[project]/servicios-lib/components/contact/ContactModal.tsx",
                                                            lineNumber: 217,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/servicios-lib/components/contact/ContactModal.tsx",
                                                        lineNumber: 205,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/servicios-lib/components/contact/ContactModal.tsx",
                                                lineNumber: 188,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$2OOHT3W5$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Text"], {
                                                fontSize: "0.8125rem",
                                                color: "#B9BDC6",
                                                textAlign: "center",
                                                maxW: "14rem",
                                                children: contact.qr.caption
                                            }, void 0, false, {
                                                fileName: "[project]/servicios-lib/components/contact/ContactModal.tsx",
                                                lineNumber: 220,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/servicios-lib/components/contact/ContactModal.tsx",
                                        lineNumber: 176,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/servicios-lib/components/contact/ContactModal.tsx",
                                lineNumber: 164,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/servicios-lib/components/contact/ContactModal.tsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Box"], {
                        px: [
                            4,
                            null,
                            8
                        ],
                        py: 5,
                        borderTop: "1px solid",
                        borderColor: "rgba(255,255,255,0.08)",
                        bg: "rgba(255,255,255,0.02)",
                        flexShrink: 0,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$KRPLQIP4$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Flex"], {
                                align: "center",
                                gap: 2,
                                mb: 2,
                                color: "gold",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$icons$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["ScaleIcon"], {
                                        w: "16px",
                                        h: "16px"
                                    }, void 0, false, {
                                        fileName: "[project]/servicios-lib/components/contact/ContactModal.tsx",
                                        lineNumber: 236,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$2OOHT3W5$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Text"], {
                                        fontFamily: "var(--font-gridnik)",
                                        fontSize: "0.5625rem",
                                        letterSpacing: "0.22em",
                                        textTransform: "uppercase",
                                        children: contact.legal.label
                                    }, void 0, false, {
                                        fileName: "[project]/servicios-lib/components/contact/ContactModal.tsx",
                                        lineNumber: 237,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/servicios-lib/components/contact/ContactModal.tsx",
                                lineNumber: 235,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$2OOHT3W5$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Text"], {
                                fontSize: "0.6875rem",
                                lineHeight: "1.7",
                                color: LABEL,
                                children: contact.legal.body
                            }, void 0, false, {
                                fileName: "[project]/servicios-lib/components/contact/ContactModal.tsx",
                                lineNumber: 246,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$2OOHT3W5$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Text"], {
                                mt: 4,
                                fontFamily: "var(--font-gridnik)",
                                fontSize: "0.5625rem",
                                letterSpacing: "0.18em",
                                textTransform: "uppercase",
                                color: "#6C717B",
                                textAlign: "center",
                                children: [
                                    "[ ",
                                    contact.signature,
                                    " ]"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/servicios-lib/components/contact/ContactModal.tsx",
                                lineNumber: 249,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/servicios-lib/components/contact/ContactModal.tsx",
                        lineNumber: 227,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/servicios-lib/components/contact/ContactModal.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/servicios-lib/components/contact/ContactModal.tsx",
        lineNumber: 109,
        columnNumber: 5
    }, this);
}
_c1 = ContactModal;
var _c, _c1;
__turbopack_context__.k.register(_c, "ContactCard");
__turbopack_context__.k.register(_c1, "ContactModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/contact/ContactModalProvider.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ContactModalProvider",
    ()=>ContactModalProvider,
    "useContactModal",
    ()=>useContactModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$ContactModal$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/contact/ContactModal.tsx [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
;
const ContactModalContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function ContactModalProvider({ children }) {
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const open = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ContactModalProvider.useCallback[open]": ()=>setIsOpen(true)
    }["ContactModalProvider.useCallback[open]"], []);
    const close = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ContactModalProvider.useCallback[close]": ()=>setIsOpen(false)
    }["ContactModalProvider.useCallback[close]"], []);
    // A route change under an open overlay would leave it floating over a page
    // the visitor never asked it for.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContactModalProvider.useEffect": ()=>{
            router.events.on('routeChangeStart', close);
            return ({
                "ContactModalProvider.useEffect": ()=>router.events.off('routeChangeStart', close)
            })["ContactModalProvider.useEffect"];
        }
    }["ContactModalProvider.useEffect"], [
        router.events,
        close
    ]);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ContactModalProvider.useMemo[value]": ()=>({
                isOpen,
                open,
                close
            })
    }["ContactModalProvider.useMemo[value]"], [
        isOpen,
        open,
        close
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ContactModalContext.Provider, {
        value: value,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$ContactModal$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["ContactModal"], {
                isOpen: isOpen,
                onClose: close
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/contact/ContactModalProvider.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/servicios-lib/components/contact/ContactModalProvider.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
_s(ContactModalProvider, "gg/ndnoWb1wDKfGZTjuZlhubarA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = ContactModalProvider;
function useContactModal() {
    _s1();
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useContext"])(ContactModalContext);
    if (!value) throw new Error('useContactModal must be used inside <ContactModalProvider>');
    return value;
}
_s1(useContactModal, "ksutO2/Ix3UeCrGnhyM+QEP505Y=");
var _c;
__turbopack_context__.k.register(_c, "ContactModalProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/contact/index.ts [client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$ContactModal$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/contact/ContactModal.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$ContactModalProvider$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/contact/ContactModalProvider.tsx [client] (ecmascript)");
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/chrome/Footer.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Footer",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$KRPLQIP4$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/layout/dist/chunk-KRPLQIP4.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$JARCRF6W$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/layout/dist/chunk-JARCRF6W.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$ZPFGWTBB$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/layout/dist/chunk-ZPFGWTBB.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$K7XRJ7NL$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/layout/dist/chunk-K7XRJ7NL.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$hooks$2f$use$2d$animation$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/animation/hooks/use-animation.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/servicios-lib/components/contact/index.ts [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$ContactModalProvider$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/contact/ContactModalProvider.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/servicios-lib/components/svg/index.ts [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$FacebookLogo$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/svg/FacebookLogo.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$InstagramLogo$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/svg/InstagramLogo.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$PlaceholderWordmark$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/svg/PlaceholderWordmark.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$SocialIcon$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/svg/SocialIcon.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$TiktokLogo$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/svg/TiktokLogo.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$WhatsappLogo$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/svg/WhatsappLogo.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$XLogo$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/svg/XLogo.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$YoutubeLogo$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/svg/YoutubeLogo.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$data$2f$content$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/servicios-lib/data/content.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/motion.ts [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
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
 */ const FooterGrid = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$JARCRF6W$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Grid"];
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
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$InstagramLogo$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["InstagramLogo"]
    },
    {
        key: 'facebook',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$FacebookLogo$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["FacebookLogo"]
    },
    {
        key: 'tiktok',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$TiktokLogo$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["TiktokLogo"]
    },
    {
        key: 'youtube',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$YoutubeLogo$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["YoutubeLogo"]
    },
    // X ships a 1200-wide viewBox and needs scaling down to match the rest.
    {
        key: 'twitter',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$XLogo$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["XLogo"],
        iconProps: {
            fill: 'none',
            transform: 'scale(0.4)'
        }
    },
    {
        key: 'whatsapp',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$WhatsappLogo$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["WhatsappLogo"],
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
    _s();
    const [isHovering, setIsHovering] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const controls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$hooks$2f$use$2d$animation$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useAnimation"])();
    const palette = colors ?? {
        idle: IDLE,
        active: ACTIVE
    };
    const color = isHovering ? palette.active : palette.idle;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SocialLink.useEffect": ()=>{
            if (!animate) return;
            controls.set('initial');
            controls.start('inactive', {
                delay
            });
        }
    }["SocialLink.useEffect"], [
        restartId,
        animate,
        delay,
        controls
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["MotionCenter"], {
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
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$K7XRJ7NL$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Link"], {
            href: href,
            isExternal: true,
            "aria-label": ariaLabel,
            height: "40px",
            width: "40px",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Brand, {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["MotionBox"], {
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
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["MotionBox"], {
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
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$SocialIcon$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["SocialIcon"], {
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
_s(SocialLink, "u7hmnbeeQHWyiKix5tEXU6PvcFQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$hooks$2f$use$2d$animation$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useAnimation"]
    ];
});
_c = SocialLink;
function Footer({ delay = 0, animate = true, mobile = false, restartId = 0, ...rest }) {
    _s1();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const logoControls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$hooks$2f$use$2d$animation$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useAnimation"])();
    const { open: openContact } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$ContactModalProvider$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useContactModal"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Footer.useEffect": ()=>{
            setMounted(true);
        }
    }["Footer.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Footer.useEffect": ()=>{
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
        }
    }["Footer.useEffect"], [
        restartId,
        mounted,
        animate,
        mobile,
        delay,
        logoControls
    ]);
    const shouldAnimate = animate && mounted;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterGrid, {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$ZPFGWTBB$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["GridItem"], {
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
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["MotionBox"], {
                    initial: {
                        opacity: 0
                    },
                    animate: logoControls,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$K7XRJ7NL$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Link"], {
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
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$svg$2f$PlaceholderWordmark$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["PlaceholderWordmark"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$ZPFGWTBB$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["GridItem"], {
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
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["MotionBox"], {
                    initial: {
                        opacity: 0
                    },
                    animate: logoControls,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$KRPLQIP4$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Flex"], {
                        align: "center",
                        gap: [
                            '0.75rem',
                            null,
                            '1.25rem'
                        ],
                        children: LEGAL_LINKS.map((entry)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$K7XRJ7NL$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Link"], {
                                as: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"],
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$ZPFGWTBB$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["GridItem"], {
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
                children: SOCIALS.map(({ key, icon, iconProps, colors }, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SocialLink, {
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
_s1(Footer, "cCF9uTAZhS4wY1e9xvXZRGW8ZJI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$hooks$2f$use$2d$animation$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useAnimation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$ContactModalProvider$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useContactModal"]
    ];
});
_c1 = Footer;
var _c, _c1;
__turbopack_context__.k.register(_c, "SocialLink");
__turbopack_context__.k.register(_c1, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/chrome/Loader.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Loader",
    ()=>Loader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$hooks$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/servicios-lib/hooks/index.ts [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$hooks$2f$usePageReady$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/hooks/usePageReady.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Cursor$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/Cursor.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/motion.ts [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
    _s();
    const ready = (0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$hooks$2f$usePageReady$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["usePageReady"])();
    const active = isActive ?? !ready;
    const [type, setType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Cursor$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["CURSOR_TYPE"].loading);
    // The original leaves the faded-out overlay mounted; it sits at zIndex
    // `loader` over the whole page, so we drop it once it has finished fading.
    const [dismissed, setDismissed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Loader.useEffect": ()=>{
            if (active) return;
            setType(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Cursor$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["CURSOR_TYPE"].hidden);
        }
    }["Loader.useEffect"], [
        active
    ]);
    if (dismissed) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["MotionBox"], {
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
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Cursor$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Cursor"], {
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
_s(Loader, "Z9/AlhJxT9cj/NrIak5TArYTbvs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$hooks$2f$usePageReady$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["usePageReady"]
    ];
});
_c = Loader;
var _c;
__turbopack_context__.k.register(_c, "Loader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/chrome/MenuOverlay.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MenuOverlay",
    ()=>MenuOverlay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/layout/dist/chunk-PULVB27S.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$modal$2f$dist$2f$chunk$2d$MCHDHFCQ$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/modal/dist/chunk-MCHDHFCQ.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$modal$2f$dist$2f$chunk$2d$OFOVX77R$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__ModalBody__as__DrawerBody$3e$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/modal/dist/chunk-OFOVX77R.mjs [client] (ecmascript) <export ModalBody as DrawerBody>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$modal$2f$dist$2f$chunk$2d$4FCEGNGT$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__ModalCloseButton__as__DrawerCloseButton$3e$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/modal/dist/chunk-4FCEGNGT.mjs [client] (ecmascript) <export ModalCloseButton as DrawerCloseButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$modal$2f$dist$2f$chunk$2d$65IR7CTH$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/modal/dist/chunk-65IR7CTH.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$modal$2f$dist$2f$chunk$2d$5FG5SY5K$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__ModalHeader__as__DrawerHeader$3e$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/modal/dist/chunk-5FG5SY5K.mjs [client] (ecmascript) <export ModalHeader as DrawerHeader>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$modal$2f$dist$2f$chunk$2d$JQMJHPZH$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__ModalOverlay__as__DrawerOverlay$3e$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/modal/dist/chunk-JQMJHPZH.mjs [client] (ecmascript) <export ModalOverlay as DrawerOverlay>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$KRPLQIP4$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/layout/dist/chunk-KRPLQIP4.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$K7XRJ7NL$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/layout/dist/chunk-K7XRJ7NL.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$46CXQZ4E$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/layout/dist/chunk-46CXQZ4E.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$data$2f$content$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/servicios-lib/data/content.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Wordmark$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/Wordmark.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/motion.ts [client] (ecmascript)");
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Box"], {
        as: "section",
        borderTop: HAIRLINE,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$KRPLQIP4$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Flex"], {
                align: "center",
                gap: "0.5rem",
                px: "1.125rem",
                pt: "1.5rem",
                pb: "0.875rem",
                color: "gold",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Box"], {
                        as: "span",
                        fontSize: "0.75rem",
                        lineHeight: 1,
                        children: "["
                    }, void 0, false, {
                        fileName: "[project]/servicios-lib/components/chrome/MenuOverlay.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Box"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Box"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$46CXQZ4E$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["UnorderedList"], {
                m: 0,
                p: 0,
                listStyleType: "none",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$data$2f$content$2e$json__$28$json$29$__["default"].news.items.map((entry)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$46CXQZ4E$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["ListItem"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$K7XRJ7NL$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Link"], {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Box"], {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Box"], {
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
_c = NewsSection;
function MenuOverlay({ isOpen, onClose, footer }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$modal$2f$dist$2f$chunk$2d$MCHDHFCQ$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Drawer"], {
        isOpen: isOpen,
        placement: "right",
        onClose: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$modal$2f$dist$2f$chunk$2d$JQMJHPZH$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__ModalOverlay__as__DrawerOverlay$3e$__["DrawerOverlay"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$modal$2f$dist$2f$chunk$2d$65IR7CTH$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["DrawerContent"], {
                maxWidth: {
                    base: '100%',
                    xl: '21.75rem'
                },
                bg: "grey1",
                borderLeft: "1.6px solid rgba(255,255,255,0.2)",
                color: "white",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$modal$2f$dist$2f$chunk$2d$5FG5SY5K$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__ModalHeader__as__DrawerHeader$3e$__["DrawerHeader"], {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["NavLink"], {
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
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Wordmark$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["AnimatedWordmark"], {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$modal$2f$dist$2f$chunk$2d$4FCEGNGT$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__ModalCloseButton__as__DrawerCloseButton$3e$__["DrawerCloseButton"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$modal$2f$dist$2f$chunk$2d$OFOVX77R$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__ModalBody__as__DrawerBody$3e$__["DrawerBody"], {
                        p: "3px 0 0 0",
                        display: "flex",
                        flexDir: "column",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NewsSection, {}, void 0, false, {
                                fileName: "[project]/servicios-lib/components/chrome/MenuOverlay.tsx",
                                lineNumber: 131,
                                columnNumber: 13
                            }, this),
                            footer ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$KRPLQIP4$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Flex"], {
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
_c1 = MenuOverlay;
var _c, _c1;
__turbopack_context__.k.register(_c, "NewsSection");
__turbopack_context__.k.register(_c1, "MenuOverlay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/chrome/Navigation.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Navigation",
    ()=>Navigation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/layout/dist/chunk-PULVB27S.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$KRPLQIP4$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/layout/dist/chunk-KRPLQIP4.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$K7XRJ7NL$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/layout/dist/chunk-K7XRJ7NL.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$MenuOverlay$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/MenuOverlay.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Wordmark$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/Wordmark.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/motion.ts [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        width: "16",
        height: "16",
        fill: "none",
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M3.5 11.5 12 4l8.5 7.5",
                stroke: "currentColor",
                strokeWidth: "1.6",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M5.5 10v8.5a1 1 0 0 0 1 1H9.5v-6h5v6h3a1 1 0 0 0 1-1V10",
                stroke: "currentColor",
                strokeWidth: "1.6",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_c = HomeIcon;
function MenuToggle({ animate = true, minimal = false, onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["MotionFlex"], {
        alignItems: "center",
        gap: {
            base: '0.75rem',
            xl: '1rem'
        },
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
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$K7XRJ7NL$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Link"], {
                href: "https://www.yaakob.com/",
                "aria-label": "Ir al inicio de Yaakob",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                h: "2.0625rem",
                w: "2.0625rem",
                color: "whiteAlpha.800",
                _hover: {
                    color: 'gold'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HomeIcon, {}, void 0, false, {
                    fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                    lineNumber: 87,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["MotionFlex"], {
                as: "button",
                "aria-label": "Toggle menu",
                h: "2.0625rem",
                p: "0.625rem",
                minWidth: 0,
                whileHover: "hover",
                onClick: onClick,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Box"], {
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
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["MotionBox"], {
                            as: "span",
                            display: "block",
                            variants: menuLabelVariants,
                            children: "Noticias"
                        }, void 0, false, {
                            fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                            lineNumber: 108,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$KRPLQIP4$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Flex"], {
                        flexDirection: "column",
                        alignItems: "stretch",
                        justifyContent: "space-between",
                        h: "0.75rem",
                        w: "1rem",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["MotionBox"], {
                                as: "span",
                                display: "block",
                                bg: "gold",
                                h: "2px",
                                variants: barVariants
                            }, void 0, false, {
                                fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                                lineNumber: 119,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["MotionBox"], {
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
                                lineNumber: 120,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["MotionBox"], {
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
                                lineNumber: 129,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
        lineNumber: 65,
        columnNumber: 5
    }, this);
}
_c1 = MenuToggle;
function Navigation({ animate = true, minimal = false, menuFooter }) {
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const lastSegment = router.asPath.split('/').pop();
    const logoHiddenOnMobile = router.asPath !== '/' && router.asPath !== '/account-settings' && lastSegment !== 'play';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["MotionBox"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["NavLink"], {
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
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Wordmark$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["AnimatedWordmark"], {
                    animate: animate,
                    label: "YAAKOB CONSULTORES SC",
                    title: "Yaakob"
                }, void 0, false, {
                    fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                    lineNumber: 181,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                lineNumber: 170,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuToggle, {
                animate: animate,
                minimal: minimal,
                onClick: ()=>setIsOpen((open)=>!open)
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                lineNumber: 184,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$MenuOverlay$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["MenuOverlay"], {
                isOpen: isOpen,
                onClose: ()=>setIsOpen(false),
                footer: menuFooter
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                lineNumber: 186,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
        lineNumber: 162,
        columnNumber: 5
    }, this);
}
_s(Navigation, "RsVkOkXxbdBLTf2FWUN5SPp7/OY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c2 = Navigation;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "HomeIcon");
__turbopack_context__.k.register(_c1, "MenuToggle");
__turbopack_context__.k.register(_c2, "Navigation");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/chrome/index.ts [client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Wordmark$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/Wordmark.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Cursor$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/Cursor.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Footer$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/Footer.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Loader$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/Loader.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$MenuOverlay$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/MenuOverlay.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Navigation$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/Navigation.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/motion.ts [client] (ecmascript)");
;
;
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/layout/Layout.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Layout",
    ()=>Layout,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/layout/dist/chunk-PULVB27S.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/index.ts [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$Background$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/background/Background.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/index.ts [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Footer$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/Footer.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Loader$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/Loader.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Navigation$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/Navigation.tsx [client] (ecmascript)");
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$background$2f$Background$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Background"], {
                fluxColor: fluxColor,
                variant: backgroundVariant
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/layout/Layout.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Box"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        mode: "wait",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Navigation$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Navigation"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Box"], {
                        as: "main",
                        flex: "1 1 auto",
                        minH: 0,
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Box"], {
                                flex: "1 1 auto",
                                minH: 0,
                                overflow: "auto",
                                children: children
                            }, void 0, false, {
                                fileName: "[project]/servicios-lib/components/layout/Layout.tsx",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this),
                            footer ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Footer$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Footer"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Loader$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Loader"], {}, void 0, false, {
                fileName: "[project]/servicios-lib/components/layout/Layout.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_c = Layout;
const __TURBOPACK__default__export__ = Layout;
var _c;
__turbopack_context__.k.register(_c, "Layout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/legal/LegalPage.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LegalPage",
    ()=>LegalPage,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/layout/dist/chunk-PULVB27S.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$K7XRJ7NL$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/layout/dist/chunk-K7XRJ7NL.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$46CXQZ4E$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/layout/dist/chunk-46CXQZ4E.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$2OOHT3W5$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chakra-ui/layout/dist/chunk-2OOHT3W5.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$AnimatedHeading$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/home/AnimatedHeading.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$motion$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/home/motion.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$ui$2f$ScrambleText$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/ui/ScrambleText.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$layout$2f$Layout$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/layout/Layout.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$data$2f$content$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/servicios-lib/data/content.json (json)");
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$46CXQZ4E$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["UnorderedList"], {
        m: 0,
        mt: "0.75rem",
        p: 0,
        listStyleType: "none",
        children: items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$46CXQZ4E$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["ListItem"], {
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
_c = Bullets;
function Section({ section }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Box"], {
        as: "section",
        id: section.id,
        mt: "2.5rem",
        scrollMarginTop: "6rem",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$AnimatedHeading$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["AnimatedHeading"], {
                children: section.heading
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            section.paragraphs.map((paragraph)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$2OOHT3W5$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Text"], {
                    ...bodyProps,
                    children: paragraph
                }, paragraph, false, {
                    fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                    lineNumber: 69,
                    columnNumber: 9
                }, this)),
            section.items ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bullets, {
                items: section.items
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                lineNumber: 74,
                columnNumber: 24
            }, this) : null,
            section.secondary ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Box"], {
                mt: "1.25rem",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$2OOHT3W5$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Text"], {
                        ...bodyProps,
                        mt: 0,
                        children: section.secondary.paragraph
                    }, void 0, false, {
                        fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                        lineNumber: 78,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bullets, {
                        items: section.secondary.items
                    }, void 0, false, {
                        fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                        lineNumber: 81,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$2OOHT3W5$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Text"], {
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
            section.note ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Box"], {
                mt: "1rem",
                pl: "0.875rem",
                borderLeft: "2px solid",
                borderColor: "goldAlt",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$2OOHT3W5$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Text"], {
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
            section.link ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$K7XRJ7NL$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Link"], {
                as: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"],
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
_c1 = Section;
function LegalPage({ document: doc }) {
    const { site } = __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$data$2f$content$2e$json__$28$json$29$__["default"];
    const title = `${site.title} | ${doc.label}`;
    const url = `${site.url}/${doc.slug}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$layout$2f$Layout$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
        backgroundVariant: "play",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                        children: title
                    }, "page-title", false, {
                        fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                        lineNumber: 130,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "title",
                        content: title
                    }, "page-title-meta", false, {
                        fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: doc.description
                    }, "description", false, {
                        fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        rel: "icon",
                        type: "image/png",
                        href: "/favicon.png"
                    }, "icon", false, {
                        fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        rel: "canonical",
                        href: url
                    }, "canonical", false, {
                        fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:type",
                        content: "article"
                    }, "og-type", false, {
                        fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:title",
                        content: title
                    }, "og-title", false, {
                        fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:description",
                        content: doc.description
                    }, "og-description", false, {
                        fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:url",
                        content: url
                    }, "og-url", false, {
                        fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:image",
                        content: site.shareImage
                    }, "og-image", false, {
                        fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "twitter:card",
                        content: "summary_large_image"
                    }, "twitter-card", false, {
                        fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                        lineNumber: 140,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "twitter:title",
                        content: title
                    }, "twitter-title", false, {
                        fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "twitter:description",
                        content: doc.description
                    }, "twitter-description", false, {
                        fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$home$2f$motion$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["MotionArticle"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Box"], {
                        as: "header",
                        pb: "1.5rem",
                        borderBottom: HAIRLINE,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$2OOHT3W5$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Text"], {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Box"], {
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
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$ui$2f$ScrambleText$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["ScrambleText"], {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$2OOHT3W5$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Text"], {
                                ...bodyProps,
                                mt: "1rem",
                                children: doc.intro
                            }, void 0, false, {
                                fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                                lineNumber: 175,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$2OOHT3W5$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Text"], {
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
                    doc.sections.map((section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                            section: section
                        }, section.id, false, {
                            fileName: "[project]/servicios-lib/components/legal/LegalPage.tsx",
                            lineNumber: 184,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Box"], {
                        mt: "3rem",
                        pt: "1.5rem",
                        borderTop: HAIRLINE,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$K7XRJ7NL$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Link"], {
                            as: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"],
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
_c2 = LegalPage;
const __TURBOPACK__default__export__ = LegalPage;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Bullets");
__turbopack_context__.k.register(_c1, "Section");
__turbopack_context__.k.register(_c2, "LegalPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/servicios-lib/components/legal/index.ts [client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$legal$2f$LegalPage$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/legal/LegalPage.tsx [client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/pages/privacidad.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__N_SSG",
    ()=>__N_SSG,
    "default",
    ()=>Privacidad
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$legal$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/servicios-lib/components/legal/index.ts [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$legal$2f$LegalPage$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/legal/LegalPage.tsx [client] (ecmascript)");
;
;
var __N_SSG = true;
function Privacidad({ document }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$legal$2f$LegalPage$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["LegalPage"], {
        document: document
    }, void 0, false, {
        fileName: "[project]/pages/privacidad.tsx",
        lineNumber: 8,
        columnNumber: 10
    }, this);
}
_c = Privacidad;
var _c;
__turbopack_context__.k.register(_c, "Privacidad");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/privacidad.tsx [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/privacidad";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/pages/privacidad.tsx [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/pages/privacidad\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/privacidad.tsx [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__61a086c1._.js.map