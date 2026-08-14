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
"[project]/home-lib/components/Stage.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Stage",
    ()=>Stage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dynamic$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dynamic.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature();
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
 */ const Scene = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dynamic$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/home-lib/scene/Scene.tsx [client] (ecmascript, next/dynamic entry, async loader)").then((m)=>m.Scene), {
    loadableGenerated: {
        modules: [
            "[project]/home-lib/scene/Scene.tsx [client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c = Scene;
/** Milliseconds; must stay in step with the CSS animation in home.css. */ const DISSOLVE = 1800;
const BLACKOUT_AT = 600;
function Stage() {
    _s();
    const leavingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const begin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Stage.useCallback[begin]": ()=>{
            if (leavingRef.current) return;
            leavingRef.current = true;
            const canvas = document.querySelector('canvas');
            const blackout = document.getElementById('yaakob-blackout');
            // Dispersion: bright flash and blur, then fade to dark underneath.
            if (canvas) {
                canvas.style.animation = 'particleDissolve 1.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
            }
            setTimeout({
                "Stage.useCallback[begin]": ()=>{
                    if (blackout) {
                        blackout.style.transition = 'opacity 0.8s ease';
                        blackout.style.opacity = '1';
                    }
                }
            }["Stage.useCallback[begin]"], BLACKOUT_AT);
            setTimeout({
                "Stage.useCallback[begin]": ()=>{
                    window.location.href = '/apps';
                }
            }["Stage.useCallback[begin]"], DISSOLVE);
        }
    }["Stage.useCallback[begin]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Scene, {
                onBegin: begin
            }, void 0, false, {
                fileName: "[project]/home-lib/components/Stage.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "yaakob-blackout"
            }, void 0, false, {
                fileName: "[project]/home-lib/components/Stage.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(Stage, "haRpeFDLl0oEcWrI8eLlrGnM544=");
_c1 = Stage;
var _c, _c1;
__turbopack_context__.k.register(_c, "Scene");
__turbopack_context__.k.register(_c1, "Stage");
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

__turbopack_context__.v(JSON.parse("{\"site\":{\"title\":\"Yaakob - XIX - XXIII | Protección y Defensa Fiscal en México\",\"description\":\"Yaakob Consultores S.C.: despacho especializado en defensa fiscal. Diagnóstico fiscal, auditorías del SAT, créditos fiscales, multas, sellos digitales, defensa 69-B y UIF-FGR. Asesoría con L.C. Juan José de Anda González.\",\"url\":\"https://yaakob.com\",\"shareImage\":\"https://yaakob.com/logo.png\"},\"items\":[{\"id\":\"diagnostico-fiscal\",\"slug\":\"diagnostico-fiscal\",\"label\":\"Diagnóstico Fiscal\",\"url\":\"/diagnostico-fiscal/view\",\"thumbnail\":{\"src\":\"/servicios/diagnostico-fiscal.jpg\",\"alt\":\"Analista revisando un tablero de cumplimiento fiscal del SAT\"},\"tagline\":\"Panorama real de su situación fiscal\",\"about\":{\"heading\":\"Síntesis\",\"description\":\"Integración de las obligaciones del contribuyente bajo expedientes, notificaciones y posibles riesgos fiscales.\",\"tags\":[\"DIAGNÓSTICO\",\"DICTAMEN\",\"EXPEDIENTE\",\"RIESGO\"]},\"description\":{\"heading\":\"Panorama real de su situación fiscal\",\"body\":\"Integración de las obligaciones del contribuyente bajo expedientes, notificaciones y posibles riesgos fiscales.\"},\"background\":{\"fluxColor\":\"#c94f4f\"}},{\"id\":\"presuntiva-fiscal\",\"slug\":\"presuntiva-fiscal\",\"label\":\"Presuntiva Fiscal\",\"url\":\"/presuntiva-fiscal/view\",\"thumbnail\":{\"src\":\"/servicios/presuntiva-fiscal.jpg\",\"alt\":\"Presuntiva fiscal\"},\"tagline\":\"Modelo de vigilancia profunda\",\"about\":{\"heading\":\"Síntesis\",\"description\":\"Revisión preventiva para identificar diferencias, omisiones e inconsistencias que pueden originar requerimientos, multas, actualizaciones, recargos o actos de fiscalización.\",\"tags\":[\"PREVENCIÓN\",\"ERRORES\",\"DIFERENCIAS\",\"SIMULACIÓN\"]},\"description\":{\"heading\":\"Modelo de vigilancia profunda\",\"body\":\"Revisión preventiva para identificar diferencias, omisiones e inconsistencias que pueden originar requerimientos, multas, actualizaciones, recargos o actos de fiscalización.\"},\"background\":{\"fluxColor\":\"#c98a3a\"}},{\"id\":\"requerimientos-sat\",\"slug\":\"requerimientos-sat\",\"label\":\"Requerimientos SAT\",\"url\":\"/requerimientos-sat/view\",\"thumbnail\":{\"src\":\"/servicios/requerimientos-sat.jpg\",\"alt\":\"Requerimientos del SAT\"},\"tagline\":\"Solución oportuna a cada notificación\",\"about\":{\"heading\":\"Síntesis\",\"description\":\"Apoyo para analizar y solventar requerimientos, cartas invitación, avisos y solicitudes de información emitidas por la autoridad.\",\"tags\":[\"SAT\",\"UIF\",\"FGR\",\"BANCOS\"]},\"description\":{\"heading\":\"Solución oportuna a cada notificación\",\"body\":\"Apoyo para analizar y solventar requerimientos, cartas invitación, avisos y solicitudes de información emitidas por la autoridad.\"},\"background\":{\"fluxColor\":\"#3aa89e\"}},{\"id\":\"auditorias\",\"slug\":\"auditorias\",\"label\":\"Auditorías\",\"url\":\"/auditorias/view\",\"thumbnail\":{\"src\":\"/servicios/auditorias.jpg\",\"alt\":\"Acompañamiento en auditorías\"},\"tagline\":\"Determinación del riesgo fiscal\",\"about\":{\"heading\":\"Síntesis\",\"description\":\"Revisión de gabinete, visitas domiciliarias, revisiones electrónicas y demás actos de auditoría fiscal.\",\"tags\":[\"AUDITORÍA\",\"GABINETE\",\"VISITAS\",\"FISCALIZACIÓN\"]},\"description\":{\"heading\":\"Determinación del riesgo fiscal\",\"body\":\"Revisión de gabinete, visitas domiciliarias, revisiones electrónicas y demás actos de auditoría fiscal.\"},\"background\":{\"fluxColor\":\"#4f74c9\"}},{\"id\":\"multas-fiscales\",\"slug\":\"multas-fiscales\",\"label\":\"Multas Fiscales\",\"url\":\"/multas-fiscales/view\",\"thumbnail\":{\"src\":\"/servicios/multas-fiscales.jpg\",\"alt\":\"Corrección de multas fiscales\"},\"tagline\":\"Disminución de sanciones y recargos\",\"about\":{\"heading\":\"Síntesis\",\"description\":\"Corrección de multas, recargos, actualizaciones y sanciones impuestas al contribuyente.\",\"tags\":[\"MULTAS\",\"RECARGOS\",\"SANCIONES\",\"CORRECCIÓN\"]},\"description\":{\"heading\":\"Disminución de sanciones y recargos\",\"body\":\"Corrección de multas, recargos, actualizaciones y sanciones impuestas al contribuyente.\"},\"background\":{\"fluxColor\":\"#a84f8a\"}},{\"id\":\"creditos-fiscales\",\"slug\":\"creditos-fiscales\",\"label\":\"Créditos Fiscales\",\"url\":\"/creditos-fiscales/view\",\"thumbnail\":{\"src\":\"/servicios/creditos-fiscales.jpg\",\"alt\":\"Créditos fiscales\"},\"tagline\":\"Estrategia de pago, garantía o impugnación\",\"about\":{\"heading\":\"Síntesis\",\"description\":\"Análisis de la determinación de contribuciones, accesorios y créditos fiscales, así como de las alternativas de pago, garantía o impugnación.\",\"tags\":[\"CRÉDITOS\",\"GARANTÍA\",\"IMPUGNACIÓN\",\"PAGO\"]},\"description\":{\"heading\":\"Estrategia de pago, garantía o impugnación\",\"body\":\"Análisis de la determinación de contribuciones, accesorios y créditos fiscales, así como de las alternativas de pago, garantía o impugnación.\"},\"background\":{\"fluxColor\":\"#6fa83a\"}},{\"id\":\"sellos-digitales\",\"slug\":\"sellos-digitales\",\"label\":\"Sellos Digitales\",\"url\":\"/sellos-digitales/view\",\"thumbnail\":{\"src\":\"/servicios/sellos-digitales.jpg\",\"alt\":\"Restricción o cancelación de sellos digitales\"},\"tagline\":\"Recuperación del Certificado de Sello Digital\",\"about\":{\"heading\":\"Síntesis\",\"description\":\"Reactivación del certificado de sello digital, considerando el requerimiento o documento emitido por la autoridad.\",\"tags\":[\"CSD\",\"EFIRMA\",\"SELLOS\",\"RECUPERACIÓN\"]},\"description\":{\"heading\":\"Recuperación del Certificado de Sello Digital\",\"body\":\"Reactivación del certificado de sello digital, considerando el requerimiento o documento emitido por la autoridad.\"},\"background\":{\"fluxColor\":\"#c9793a\"}},{\"id\":\"defensa-69b\",\"slug\":\"defensa-69b\",\"label\":\"Defensa 69-B\",\"url\":\"/defensa-69b/view\",\"thumbnail\":{\"src\":\"/servicios/defensa-69b.jpg\",\"alt\":\"Defensa ante el listado 69-B\"},\"tagline\":\"Defensa legal ante el listado del 69-B\",\"about\":{\"heading\":\"Síntesis\",\"description\":\"Aclaración de presuntivas, preparación de pruebas, escritos y demás medios procedentes.\",\"tags\":[\"69-B\",\"DEFENSA\",\"MATERIALIDAD\",\"CORRECCIÓN\"]},\"description\":{\"heading\":\"Defensa legal ante el listado del 69-B\",\"body\":\"Aclaración de presuntivas, preparación de pruebas, escritos y demás medios procedentes.\"},\"background\":{\"fluxColor\":\"#4f5fc9\"}},{\"id\":\"uif-fgr\",\"slug\":\"uif-fgr\",\"label\":\"Bloqueo  - UIF-FGR\",\"url\":\"/uif-fgr/view\",\"thumbnail\":{\"src\":\"/servicios/uif-fgr.jpg\",\"alt\":\"Debido proceso ante UIF y FGR\"},\"tagline\":\"Prevención financiera y fiscal\",\"about\":{\"heading\":\"Síntesis\",\"description\":\"Resolución definitiva por derechos, legalidad, seguridad y acceso a información ante la UIF y la FGR.\",\"tags\":[\"CNBV\",\"BLOQUEO\",\"GARANTÍA\"]},\"description\":{\"heading\":\"Prevención financiera y fiscal\",\"body\":\"Resolución definitiva por derechos, legalidad, seguridad y acceso a información ante la Unidad de Inteligencia Financiera y la Fiscalía General de la República.\"},\"background\":{\"fluxColor\":\"#7a3ac9\"}},{\"id\":\"controles-volumetricos\",\"slug\":\"controles-volumetricos\",\"label\":\"Controles Volumétricos\",\"url\":\"/controles-volumetricos/view\",\"thumbnail\":{\"src\":\"/servicios/controles-volumetricos.jpg\",\"alt\":\"Controles volumétricos\"},\"tagline\":\"Subsanación de irregularidades\",\"about\":{\"heading\":\"Síntesis\",\"description\":\"Regularización sobre la Ley de Hidrocarburos, ANAM y AGASE.\",\"tags\":[\"SOFTWARE\",\"PEDIMENTOS\",\"REGISTROS\",\"IRREGULARIDADES\"]},\"description\":{\"heading\":\"Subsanación de irregularidades\",\"body\":\"Regularización sobre la Ley de Hidrocarburos, ANAM y AGASE.\"},\"background\":{\"fluxColor\":\"#c93a6f\"}},{\"id\":\"regularizacion-fiscal\",\"slug\":\"regularizacion-fiscal\",\"label\":\"Regularización Fiscal\",\"url\":\"/regularizacion-fiscal/view\",\"thumbnail\":{\"src\":\"/servicios/regularizacion-fiscal.jpg\",\"alt\":\"Regularización fiscal\"},\"tagline\":\"Estrategias para poner al día su situación fiscal\",\"about\":{\"heading\":\"Síntesis\",\"description\":\"Prevenir, identificar y corregir irregularidades, fraudes, incumplimientos y riesgos fiscales.\",\"tags\":[\"DIAGNÓSTICO\",\"ANÁLISIS\",\"CUMPLIMIENTO\"]},\"description\":{\"heading\":\"Estrategias para poner al día su situación fiscal\",\"body\":\"Prevenir, identificar y corregir irregularidades, fraudes, incumplimientos y riesgos fiscales.\"},\"background\":{\"fluxColor\":\"#3ac9a8\"}}],\"detail\":{\"ctas\":{\"primary\":\"Ver servicio\",\"share\":\"Compartir\",\"clipboard\":\"Enlace copiado\"},\"headings\":{\"description\":\"Descripción\",\"login\":\"Solicitar asesoría\"},\"login\":{\"subheading\":\"Hable con un especialista\",\"body\":\"Cada caso es distinto. Agende una consulta para revisar su situación y definir la estrategia adecuada.\",\"ctas\":{\"login\":{\"label\":\"Solicitar consulta\",\"href\":\"/\"},\"register\":{\"label\":\"Más información\",\"href\":\"/\"}}}},\"nav\":{\"primary\":\"Ver servicio\",\"secondary\":\"Detalles\",\"tertiary\":\"Servicios\",\"login\":\"Solicitar asesoría\"},\"news\":{\"label\":\"Noticias\",\"items\":[{\"id\":\"visitas-domiciliarias\",\"title\":\"Ya es oficial: el SAT visitará casa por casa con cámaras especiales y abogados para verificar el cumplimiento de las obligaciones fiscales\",\"source\":\"El Cronista\",\"href\":\"https://www.cronista.com/mexico/finanzas-economia/ya-es-oficial-el-sat-visitara-casa-por-casa-con-camaras-especiales-y-abogados-para-verificar-el-cumplimiento-de-las-obligaciones-fiscales/\"},{\"id\":\"buzon-tributario\",\"title\":\"¿No activaste tu Buzón Tributario? El SAT advierte sanciones desde enero de 2026\",\"source\":\"Google Noticias\",\"href\":\"https://share.google/ZPMBqvkB62SLh6M9u\"},{\"id\":\"transferencias-familiares\",\"title\":\"Oficial | El SAT te puede multar por hacer transferencias a familiares: este es el monto permitido y las sanciones\",\"source\":\"Google Noticias\",\"href\":\"https://share.google/MHcELoupohGI7YVWA\"},{\"id\":\"huachicol-fiscal\",\"title\":\"El SAT le declara la guerra al huachicol fiscal: qué cambia para los transportistas desde el 24 de abril de 2026\",\"source\":\"Transporte.mx\",\"href\":\"https://share.google/d6O8Pdp8RUJsqYk3W\"},{\"id\":\"tarjetas-debito\",\"title\":\"¿Tienes varias tarjetas de débito? Esto es lo que el SAT revisa en agosto de 2026 para no multarte\",\"source\":\"El Informador\",\"href\":\"https://share.google/XUO1Gu2VfrxoG1ZaO\"},{\"id\":\"gastos-escolares\",\"title\":\"SAT permite deducir estos gastos escolares: requisitos y monto máximo\",\"source\":\"Google Noticias\",\"href\":\"https://share.google/ZPtYClBoWl9e0EKEJ\"},{\"id\":\"correo-declaracion-anual\",\"title\":\"Qué pasa cuando el SAT te envía un correo por no presentar tu Declaración Anual\",\"source\":\"Google Noticias\",\"href\":\"https://share.google/UEjclZrcsEASdKdMW\"}]},\"contact\":{\"title\":\"Yaakob Consultores SC\",\"heading\":\"Hablemos sobre su situación fiscal\",\"fields\":[{\"id\":\"despacho\",\"icon\":\"building\",\"label\":\"Despacho\",\"lines\":[\"Yaakob Consultores S.C.\"]},{\"id\":\"especialista\",\"icon\":\"user\",\"label\":\"Especialista\",\"lines\":[\"L.C. Juan José de Anda G.\"]},{\"id\":\"telefono\",\"icon\":\"phone\",\"label\":\"Teléfono\",\"lines\":[\"+52 55 9008 6360\",\"+52 55 9008 7881\"],\"href\":\"tel:+525590086360\"},{\"id\":\"whatsapp\",\"icon\":\"chat\",\"label\":\"WhatsApp\",\"lines\":[\"+52 55 2741 6178\"],\"href\":\"https://wa.me/5215527416178\"},{\"id\":\"correo\",\"icon\":\"mail\",\"label\":\"Correo\",\"lines\":[\"contacto@yaakob.com\"],\"href\":\"mailto:contacto@yaakob.com\"},{\"id\":\"sitio\",\"icon\":\"globe\",\"label\":\"Sitio web\",\"lines\":[\"www.yaakob.com\"],\"href\":\"https://www.yaakob.com\"},{\"id\":\"direccion\",\"icon\":\"pin\",\"label\":\"Dirección\",\"lines\":[\"Alica 40 Lomas de Chapultepec\",\"Miguel Hidalgo CDMX, CP 11040\"]},{\"id\":\"horarios\",\"icon\":\"clock\",\"label\":\"Horarios\",\"lines\":[\"Lunes a Viernes\",\"9:00 A.M. a 6:00 P.M.\"]}],\"qr\":{\"src\":\"/servicios/contacto-qr.svg\",\"href\":\"https://wa.me/5215527416178\",\"caption\":\"Escanea para agendar tu evaluación inicial\"},\"legal\":{\"label\":\"Aviso legal\",\"body\":\"Los servicios ofrecidos se desarrollan dentro del marco jurídico aplicable. Cada asunto se encuentra sujeto al análisis de sus antecedentes, documentación, plazos y circunstancias particulares. La contratación de servicios profesionales no garantiza un resultado determinado y no comprende actos de evasión fiscal, simulación de operaciones, ocultamiento de información ni cualquier otra conducta contraria a la ley.\"},\"signature\":\"Yaakob Consultores SC · Protección y defensa fiscal\"},\"footer\":{\"cookies\":{\"label\":\"Configuración de cookies\"},\"privacy\":{\"label\":\"Aviso de privacidad\",\"href\":\"/privacidad\"},\"ads\":{\"label\":\"Términos\",\"href\":\"/terminos\"},\"logo\":{\"href\":\"/\"},\"contact\":{\"label\":\"Contacto\",\"href\":\"https://wa.me/5215527416178\"},\"social\":{\"instagram\":{\"href\":\"https://www.instagram.com/yaakobeheart/\",\"label\":\"Instagram\"},\"facebook\":{\"href\":\"https://www.facebook.com/profile.php?id=61587552527813&locale=es_LA\",\"label\":\"Facebook\"},\"tiktok\":{\"href\":\"https://www.tiktok.com/@yaakob_heart\",\"label\":\"TikTok\"},\"youtube\":{\"href\":\"https://www.youtube.com/@YaakobBeHeart\",\"label\":\"YouTube\"},\"twitter\":{\"href\":\"https://x.com/yaakob\",\"label\":\"X\"},\"whatsapp\":{\"href\":\"https://wa.me/5215527416178\",\"label\":\"WhatsApp\"}}}}"));}),
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
            bg: 'rgba(255,153,51,0.06)'
        } : undefined,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$KRPLQIP4$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Flex"], {
                align: "center",
                justify: "center",
                flexShrink: 0,
                w: "42px",
                h: "42px",
                borderRadius: "12px",
                bg: "rgba(255,153,51,0.09)",
                border: "1px solid",
                borderColor: "rgba(255,153,51,0.18)",
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
"[project]/servicios-lib/components/chrome/MenuDrawer.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MenuDrawer",
    ()=>MenuDrawer
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
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/servicios-lib/components/contact/index.ts [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$ContactModalProvider$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/contact/ContactModalProvider.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Wordmark$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/Wordmark.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/motion.ts [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
const HAIRLINE = '1px solid rgba(255,255,255,0.2)';
const HIGHLIGHT = 'rgba(255,255,255,0.09)';
/** Small house glyph for the HOME row. */ function HomeGlyph() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        width: "15",
        height: "15",
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
                fileName: "[project]/servicios-lib/components/chrome/MenuDrawer.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
_c = HomeGlyph;
/** The brand flower, tinted via mask so it always follows the accent colour. */ function FlowerGlyph({ size }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Box"], {
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
_c1 = FlowerGlyph;
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
    _s();
    const { open: openContact } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$ContactModalProvider$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useContactModal"])();
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
                        borderBottom: "1.6px solid rgba(255,255,255,0.2)",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["NavLink"], {
                                href: "/servicios",
                                display: "flex",
                                alignItems: "center",
                                h: "100%",
                                fontSize: "0.75rem",
                                letterSpacing: "widest",
                                textTransform: "uppercase",
                                "aria-label": "Go to home page",
                                onClick: onClose,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$Wordmark$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["AnimatedWordmark"], {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$modal$2f$dist$2f$chunk$2d$4FCEGNGT$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__ModalCloseButton__as__DrawerCloseButton$3e$__["DrawerCloseButton"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$modal$2f$dist$2f$chunk$2d$OFOVX77R$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__ModalBody__as__DrawerBody$3e$__["DrawerBody"], {
                        p: "3px 0 0 0",
                        display: "flex",
                        flexDir: "column",
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
                                        fileName: "[project]/servicios-lib/components/chrome/MenuDrawer.tsx",
                                        lineNumber: 129,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Box"], {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Box"], {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Box"], {
                                as: "nav",
                                "aria-label": "Menú principal",
                                children: ENTRIES.map((entry)=>{
                                    const inner = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$KRPLQIP4$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Flex"], {
                                        align: "center",
                                        gap: "0.75rem",
                                        color: "gold",
                                        children: [
                                            entry.icon === 'home' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HomeGlyph, {}, void 0, false, {
                                                fileName: "[project]/servicios-lib/components/chrome/MenuDrawer.tsx",
                                                lineNumber: 150,
                                                columnNumber: 46
                                            }, this) : null,
                                            entry.icon === 'flower' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FlowerGlyph, {
                                                size: "16px"
                                            }, void 0, false, {
                                                fileName: "[project]/servicios-lib/components/chrome/MenuDrawer.tsx",
                                                lineNumber: 151,
                                                columnNumber: 48
                                            }, this) : null,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Box"], {
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
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Box"], {
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
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["NavLink"], {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$KRPLQIP4$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Flex"], {
                                flex: "1",
                                align: "flex-end",
                                justify: "center",
                                pb: "2.5rem",
                                pt: "2rem",
                                borderTop: HAIRLINE,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FlowerGlyph, {
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
_s(MenuDrawer, "xa27MXflA7Xw3uPNIs972ljOWNc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$ContactModalProvider$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useContactModal"]
    ];
});
_c2 = MenuDrawer;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "HomeGlyph");
__turbopack_context__.k.register(_c1, "FlowerGlyph");
__turbopack_context__.k.register(_c2, "MenuDrawer");
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
                                    color: "gold",
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
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/servicios-lib/components/contact/index.ts [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$ContactModalProvider$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/contact/ContactModalProvider.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$MenuDrawer$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/MenuDrawer.tsx [client] (ecmascript)");
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
                lineNumber: 41,
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
_c = HomeIcon;
/** The three animated bars shared by both toggles. */ function Bars() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$KRPLQIP4$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Flex"], {
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
                lineNumber: 69,
                columnNumber: 7
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
                lineNumber: 70,
                columnNumber: 7
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
_c1 = Bars;
function ToggleButton({ label, barsFirst = false, onClick }) {
    const text = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Box"], {
        as: "span",
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["MotionFlex"], {
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
        children: barsFirst ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bars, {}, void 0, false, {
                    fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                    lineNumber: 128,
                    columnNumber: 11
                }, this),
                text
            ]
        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                text,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bars, {}, void 0, false, {
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
_c2 = ToggleButton;
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
    _s();
    const [newsOpen, setNewsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { open: openContact } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$ContactModalProvider$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useContactModal"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const lastSegment = router.asPath.split('/').pop();
    const logoHiddenOnMobile = router.asPath !== '/' && router.asPath !== '/account-settings' && lastSegment !== 'play';
    const topOffset = minimal ? {
        base: '0.5rem',
        xl: '0.5rem'
    } : {
        base: '0.875rem',
        xl: '1.5rem'
    };
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
                    lineNumber: 192,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                lineNumber: 181,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["MotionFlex"], {
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
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToggleButton, {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["MotionFlex"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$K7XRJ7NL$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Link"], {
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
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HomeIcon, {}, void 0, false, {
                            fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                            lineNumber: 233,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                        lineNumber: 222,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["NavLink"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Box"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["NavLink"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$motion$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["NavLink"], {
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
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Box"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Box"], {
                        display: {
                            base: 'none',
                            xl: 'block'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToggleButton, {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$layout$2f$dist$2f$chunk$2d$PULVB27S$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Box"], {
                        display: {
                            base: 'block',
                            xl: 'none'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToggleButton, {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$MenuOverlay$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["MenuOverlay"], {
                isOpen: newsOpen,
                onClose: ()=>setNewsOpen(false),
                footer: menuFooter
            }, void 0, false, {
                fileName: "[project]/servicios-lib/components/chrome/Navigation.tsx",
                lineNumber: 284,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$MenuDrawer$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["MenuDrawer"], {
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
_s(Navigation, "cwDg8OVRosG+u2nzyIM5ligo+10=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$ContactModalProvider$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useContactModal"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c3 = Navigation;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "HomeIcon");
__turbopack_context__.k.register(_c1, "Bars");
__turbopack_context__.k.register(_c2, "ToggleButton");
__turbopack_context__.k.register(_c3, "Navigation");
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
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$MenuDrawer$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/MenuDrawer.tsx [client] (ecmascript)");
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
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/home-lib/data/content.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"menu":[{"name":"Servicios","url":"/servicios"},{"name":"Contacto","url":"https://wa.me/5215527416178","modal":true}],"login":{"name":"Consultor","url":"/start"},"social":[{"name":"Instagram","url":"https://www.instagram.com/yaakobeheart/","icon":"<path d=\"M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.8.07-1.1.05-1.7.24-2.1.4-.5.2-.9.44-1.3.83-.4.4-.63.8-.83 1.3-.16.4-.35 1-.4 2.1C2.5 8.5 2.5 8.9 2.5 12s0 3.5.07 4.8c.05 1.1.24 1.7.4 2.1.2.5.44.9.83 1.3.4.4.8.63 1.3.83.4.16 1 .35 2.1.4 1.3.07 1.7.07 4.8.07s3.5 0 4.8-.07c1.1-.05 1.7-.24 2.1-.4.5-.2.9-.44 1.3-.83.4-.4.63-.8.83-1.3.16-.4.35-1 .4-2.1.07-1.3.07-1.7.07-4.8s0-3.5-.07-4.8c-.05-1.1-.24-1.7-.4-2.1a3.5 3.5 0 0 0-.83-1.3 3.5 3.5 0 0 0-1.3-.83c-.4-.16-1-.35-2.1-.4C15.5 4 15.1 4 12 4Zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8Zm0 1.8a3.1 3.1 0 1 0 0 6.2 3.1 3.1 0 0 0 0-6.2Zm5.1-2.1a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z\"/>"},{"name":"Facebook","url":"https://www.facebook.com/profile.php?id=61587552527813&locale=es_LA","icon":"<path d=\"M13.5 21.9V13.9h2.7l.4-3.1h-3.1V8.8c0-.9.25-1.5 1.55-1.5h1.65V4.5c-.29-.04-1.27-.13-2.41-.13-2.39 0-4.02 1.46-4.02 4.13v2.3H7.5v3.1h2.77v8h3.23Z\"/>"},{"name":"TikTok","url":"https://www.tiktok.com/@yaakob_heart","icon":"<path d=\"M16.6 2h-3.1v13.1a2.6 2.6 0 1 1-2.2-2.57v-3.15a5.75 5.75 0 1 0 5.3 5.73V8.87a6.9 6.9 0 0 0 4 1.28V7A3.93 3.93 0 0 1 16.6 2Z\"/>"},{"name":"YouTube","url":"https://www.youtube.com/@YaakobBeHeart","icon":"<path d=\"M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15.2V8.8l5.2 3.2-5.2 3.2Z\"/>"},{"name":"X","url":"https://x.com/yaakob","icon":"<path d=\"M17.53 3h3.06l-6.69 7.64L21.75 21h-6.16l-4.83-6.3L5.24 21H2.18l7.15-8.17L2.25 3h6.31l4.36 5.77L17.53 3Zm-1.07 16.2h1.69L7.62 4.71H5.8l10.66 14.49Z\"/>"},{"name":"WhatsApp","url":"https://wa.me/5215527416178","icon":"<path d=\"M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2.1 22l5.36-1.4a9.8 9.8 0 0 0 4.58 1.15h.01c5.43 0 9.84-4.4 9.84-9.84C21.89 6.4 17.48 2 12.04 2Zm0 17.98h-.01a8.2 8.2 0 0 1-4.16-1.14l-.3-.18-3.18.83.85-3.1-.2-.32a8.15 8.15 0 0 1-1.25-4.35c0-4.51 3.68-8.18 8.2-8.18a8.14 8.14 0 0 1 8.18 8.19c0 4.51-3.67 8.18-8.13 8.18Zm4.49-6.13c-.25-.13-1.45-.71-1.68-.79-.22-.08-.39-.13-.55.12-.16.25-.63.79-.77.95-.14.16-.28.18-.53.06-.25-.13-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.16.04-.31-.02-.43-.06-.13-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03s.87 2.35.99 2.51c.12.16 1.72 2.62 4.16 3.67.58.25 1.03.4 1.39.51.58.18 1.11.16 1.53.1.47-.07 1.45-.59 1.65-1.17.2-.57.2-1.06.14-1.16-.06-.11-.22-.17-.47-.29Z\"/>"}]});}),
"[project]/home-lib/components/Hud.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Hud",
    ()=>Hud
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/index.ts [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$MenuDrawer$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/chrome/MenuDrawer.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/servicios-lib/components/contact/index.ts [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$ContactModalProvider$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/servicios-lib/components/contact/ContactModalProvider.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$data$2f$content$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/home-lib/data/content.json (json)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
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
    _s();
    const [now, setNow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useClock.useEffect": ()=>{
            const tick = {
                "useClock.useEffect.tick": ()=>setNow(new Date())
            }["useClock.useEffect.tick"];
            tick();
            const iv = setInterval(tick, 1000);
            return ({
                "useClock.useEffect": ()=>clearInterval(iv)
            })["useClock.useEffect"];
        }
    }["useClock.useEffect"], []);
    return {
        time: now ? `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}` : '--:--:--',
        date: now ? `${DAYS[now.getDay()]} ${now.getDate()} ${MONTHS[now.getMonth()]}` : ''
    };
}
_s(useClock, "z7BF03mi9TSA+mHelO7IwQHRwX4=");
function Hud() {
    _s1();
    const { open } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$ContactModalProvider$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useContactModal"])();
    const { time, date } = useClock();
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        id: "yk-hud",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "yk-hud-side yk-hud-left",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "yk-time",
                        id: "yk-time",
                        suppressHydrationWarning: true,
                        children: time
                    }, void 0, false, {
                        fileName: "[project]/home-lib/components/Hud.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        id: "yk-social",
                        "aria-label": "Síguenos",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$data$2f$content$2e$json__$28$json$29$__["default"].social.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                className: `yk-soc${/whatsapp/i.test(s.name) ? ' is-whatsapp' : ''}`,
                                href: s.url,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                title: s.name,
                                "aria-label": s.name,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "yk-hud-side yk-hud-right",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "yk-date",
                        id: "yk-date",
                        suppressHydrationWarning: true,
                        children: date
                    }, void 0, false, {
                        fileName: "[project]/home-lib/components/Hud.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "yk-hud-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                id: "yk-nav",
                                "aria-label": "Navegación",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$data$2f$content$2e$json__$28$json$29$__["default"].menu.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                id: "yk-burger",
                                "aria-label": "Abrir menú",
                                onClick: ()=>setMenuOpen(true),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                        fileName: "[project]/home-lib/components/Hud.tsx",
                                        lineNumber: 121,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                        fileName: "[project]/home-lib/components/Hud.tsx",
                                        lineNumber: 122,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$chrome$2f$MenuDrawer$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["MenuDrawer"], {
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
_s1(Hud, "ARZh5NedZjanN3LX3uRQE/Ilim4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$servicios$2d$lib$2f$components$2f$contact$2f$ContactModalProvider$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useContactModal"],
        useClock
    ];
});
_c = Hud;
var _c;
__turbopack_context__.k.register(_c, "Hud");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/home-lib/components/index.ts [client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$components$2f$Stage$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/home-lib/components/Stage.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$components$2f$Hud$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/home-lib/components/Hud.tsx [client] (ecmascript)");
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/pages/index.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$components$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/home-lib/components/index.ts [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$components$2f$Hud$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/home-lib/components/Hud.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$components$2f$Stage$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/home-lib/components/Stage.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$script$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/script.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
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
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useHomeBodyClass.useEffect": ()=>{
            document.documentElement.classList.add('yk-home');
            return ({
                "useHomeBodyClass.useEffect": ()=>document.documentElement.classList.remove('yk-home')
            })["useHomeBodyClass.useEffect"];
        }
    }["useHomeBodyClass.useEffect"], []);
}
_s(useHomeBodyClass, "OD7bBpZva5O2jO+Puf00hKivP7c=");
function Home() {
    _s1();
    useHomeBodyClass();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                        children: "Yaakob - XIX - XXIII | Protección y Defensa Fiscal en México"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        httpEquiv: "X-UA-Compatible",
                        content: "IE=edge,chrome=1"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "google",
                        content: "notranslate"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "Yaakob Consultores S.C.: despacho especializado en protección y defensa fiscal. Diagnóstico fiscal, auditorías del SAT, créditos fiscales, multas, sellos digitales, defensa 69-B y UIF-FGR. Asesoría con L.C. Juan José de Anda González."
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "keywords",
                        content: "Yaakob Consultores, defensa fiscal, diagnóstico fiscal, auditorías SAT, créditos fiscales, multas fiscales, sellos digitales, defensa 69-B, UIF FGR, controles volumétricos, regularización fiscal, requerimientos SAT, abogado fiscalista CDMX"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "theme-color",
                        content: "#0a0a0a"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:type",
                        content: "website"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:url",
                        content: "https://yaakob.com/"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 126,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:title",
                        content: "Yaakob - XIX - XXIII | Protección y Defensa Fiscal en México"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:description",
                        content: "Despacho especializado en defensa fiscal: diagnóstico, auditorías del SAT, créditos fiscales, multas, sellos digitales, defensa 69-B y UIF-FGR."
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:image",
                        content: "/logo.png"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:site_name",
                        content: "Yaakob Consultores S.C."
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:locale",
                        content: "es_MX"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "twitter:card",
                        content: "summary_large_image"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "twitter:url",
                        content: "https://yaakob.com/"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "twitter:title",
                        content: "Yaakob - XIX - XXIII | Protección y Defensa Fiscal en México"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "twitter:description",
                        content: "Despacho especializado en defensa fiscal ante el SAT. Diagnóstico, auditorías, créditos fiscales, multas y más."
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "twitter:image",
                        content: "/logo.png"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        rel: "icon",
                        type: "image/png",
                        href: "/favicon-home.png"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        rel: "apple-touch-icon",
                        href: "/favicon-home.png"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$script$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$script$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                id: "gtag",
                src: "https://www.googletagmanager.com/gtag/js?id=DC-4136874",
                strategy: "afterInteractive"
            }, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$script$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$components$2f$Stage$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Stage"], {}, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 154,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$components$2f$Hud$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Hud"], {}, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 155,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s1(Home, "MI0vFwKIvlMsru/SQFPlaw+F2sA=", false, function() {
    return [
        useHomeBodyClass
    ];
});
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/index.tsx [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/pages/index.tsx [client] (ecmascript)");
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
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/pages/index\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/index.tsx [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__88d8a65a._.js.map