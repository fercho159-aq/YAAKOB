module.exports = [
"[project]/home-lib/scene/config.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Every tunable of the landing scene, in one typed place.
 *
 * These are the values the engine used to read from `assets/data/uil.json` —
 * 14,857 keys of baked editor state, 754 of them for this scene — under names
 * like `LandingEyeShader/LandingEyeShader/Element_1_landingeye/uBands1`. The
 * subset that the landing actually reads is transcribed here so a colour or a
 * position is a one-line edit instead of an archaeology session.
 *
 * Layer names and render order come from the `landingeye` SceneLayout:
 *   0 background · 1 eye · 2 lens · 3 splines (not ported yet)
 */ /** Degrees, as authored in the editor; converted on the way to three. */ __turbopack_context__.s([
    "DEG",
    ()=>DEG,
    "background",
    ()=>background,
    "camera",
    ()=>camera,
    "easeOutSine",
    ()=>easeOutSine,
    "eye",
    ()=>eye,
    "eyeGroup",
    ()=>eyeGroup,
    "lens",
    ()=>lens
]);
const DEG = Math.PI / 180;
const camera = {
    /** Group position + local offset from the level's game camera. */ position: [
        0,
        2,
        0
    ],
    lookAt: [
        0,
        2,
        -6
    ],
    fov: 50,
    near: 0.1,
    far: 1000,
    /**
   * `dynamicFOVCode` from the editor, verbatim in spirit:
   * `50 * Math.max(1, Math.range(aspect, 1.0, 0.5, 1.0, 1.8))` — portrait
   * viewports widen the lens so the eye still fits.
   */ fovForAspect (aspect) {
        const t = 1 + (aspect - 1) * (1.8 - 1) / (0.5 - 1);
        return this.fov * Math.max(1, t);
    }
};
const background = {
    scale: 100,
    colorRamp: '/assets/images/global/colorramp.png',
    uniforms: {
        uColorRange: [
            0.6,
            0.85
        ],
        uBrightness: 0,
        // Engine defaults for the uniforms the landing never overrode.
        uNoiseScale: 0.3,
        uNoiseSpeed: 0.05,
        uSaturation: 1,
        uContrastAdjust: 0
    }
};
const eyeGroup = {
    position: [
        0,
        -2,
        -18
    ],
    rotation: [
        12,
        0,
        25
    ],
    scale: 1.15
};
const eye = {
    geometry: '/assets/geometry/trackandreact/eye/eye.json',
    map: '/assets/images/trackandreact/eye/strands.png',
    position: [
        0,
        0,
        0
    ],
    rotation: [
        -90,
        0,
        0
    ],
    scale: [
        1,
        1,
        1
    ],
    renderOrder: 1,
    uniforms: {
        uColor: '#7E98A1',
        uTile: [
            7,
            1.45
        ],
        uPinchRange: [
            0.163,
            0.286
        ],
        uFadeRange: [
            0.249,
            0.278,
            0.055,
            0.725
        ],
        uBands1: [
            0.463,
            0.3,
            0.413,
            0.28
        ],
        uBands2: [
            0.621,
            0.37,
            0.462,
            0.341
        ]
    },
    /** LandingEye.animateIn: uTransition 0 -> 1, 12s easeOutSine. */ transition: {
        to: 1,
        duration: 12000,
        delay: 0
    }
};
const lens = {
    geometry: '/assets/geometry/landing/hemisphere.json',
    matcap: '/assets/images/landing/lens_matcap.jpg',
    position: [
        0,
        1.42,
        0
    ],
    rotation: [
        0,
        0,
        0
    ],
    scale: [
        4.5,
        1.87,
        4.5
    ],
    renderOrder: 3,
    uniforms: {
        uColor: '#698a97',
        uReflectOffset: [
            0,
            0,
            0
        ]
    },
    /** Same tween as the eye, started 3s later. */ transition: {
        to: 1,
        duration: 12000,
        delay: 3000
    }
};
const easeOutSine = (t)=>Math.sin(t * Math.PI / 2);
}),
"[project]/home-lib/scene/shaders/chunks.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * GLSL helpers recovered from the engine's `assets/shaders/compiled.vs`, where
 * every shader in the build lived concatenated in one 11k-line file and pulled
 * these in with Hydra's `#require(...)` directive.
 *
 * They are copied verbatim except for Hydra's `#test <cond>` blocks, which were
 * a compile-time toggle: the desktop branch is inlined, the mobile one dropped.
 */ /** range.glsl */ __turbopack_context__.s([
    "CONTRAST",
    ()=>CONTRAST,
    "MATCAP",
    ()=>MATCAP,
    "RANGE",
    ()=>RANGE,
    "RGB2HSV",
    ()=>RGB2HSV,
    "SIMPLE_NOISE",
    ()=>SIMPLE_NOISE
]);
const RANGE = /* glsl */ `
float range(float oldValue, float oldMin, float oldMax, float newMin, float newMax) {
    vec3 sub = vec3(oldValue, newMax, oldMax) - vec3(oldMin, newMin, oldMin);
    return sub.x * sub.y / sub.z + newMin;
}

float crange(float oldValue, float oldMin, float oldMax, float newMin, float newMax) {
    return clamp(range(oldValue, oldMin, oldMax, newMin, newMax), min(newMin, newMax), max(newMin, newMax));
}
`;
const SIMPLE_NOISE = /* glsl */ `
#define sinf sin

float getNoise(vec2 uv, float time) {
    float x = uv.x * uv.y * time * 1000.0;
    x = mod(x, 13.0) * mod(x, 123.0);
    float dx = mod(x, 0.01);
    float amount = clamp(0.1 + dx * 100.0, 0.0, 1.0);
    return amount;
}

float cnoise(vec3 v) {
    float t = v.z * 0.3;
    v.y *= 0.8;
    float noise = 0.0;
    float s = 0.5;
    noise += (sinf(v.x * 0.9 / s + t * 10.0) + sinf(v.x * 2.4 / s + t * 15.0) + sinf(v.x * -3.5 / s + t * 4.0) + sinf(v.x * -2.5 / s + t * 7.1)) * 0.3;
    noise += (sinf(v.y * -0.3 / s + t * 18.0) + sinf(v.y * 1.6 / s + t * 18.0) + sinf(v.y * 2.6 / s + t * 8.0) + sinf(v.y * -2.6 / s + t * 4.5)) * 0.3;
    return noise;
}
`;
const RGB2HSV = /* glsl */ `
vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
`;
const CONTRAST = /* glsl */ `
vec3 adjustContrast(vec3 color, float c, float m) {
    color.rgb = color.rgb * c + (0.5 - c * 0.5);
    return color * m;
}
`;
const MATCAP = /* glsl */ `
vec2 reflectMatcap(vec3 position, mat4 modelViewMatrix, vec3 normal) {
    vec3 e = normalize(vec3(modelViewMatrix * vec4(position, 1.0)));
    vec3 n = normalize(normal);
    vec3 r = reflect(e, n);
    float m = 2.0 * sqrt(pow(r.x, 2.0) + pow(r.y, 2.0) + pow(r.z + 1.0, 2.0));
    return r.xy / m + 0.5;
}
`;
}),
"[project]/home-lib/scene/shaders/landing.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "backgroundFragment",
    ()=>backgroundFragment,
    "backgroundVertex",
    ()=>backgroundVertex,
    "eyeFragment",
    ()=>eyeFragment,
    "eyeVertex",
    ()=>eyeVertex,
    "lensFragment",
    ()=>lensFragment,
    "lensVertex",
    ()=>lensVertex
]);
/**
 * The three landing shaders, lifted out of `assets/shaders/compiled.vs`:
 * `BackgroundSphere`, `LandingEyeShader` and `LandingLensShader`.
 *
 * Changes from the originals, all mechanical:
 *  - Hydra's `#!UNIFORMS` / `#!VARYINGS` / `#!SHADER:` banners become plain
 *    vertex/fragment strings, and `#require(x)` becomes a chunk concatenation.
 *  - `#test Tests.backgroundSphereNoise()` is inlined (it is on for desktop).
 *  - `#test Tests.renderMouseFluid()` is dropped for now: it samples the
 *    engine's fluid simulation render targets, which the port does not have yet.
 *  - `time` is a uniform here; Hydra injected it into every shader.
 *
 * Two dead-code oddities are kept verbatim so the look matches: the eye's
 * `noise2` and the lens's vertex `noise` are both computed and then discarded
 * upstream (the `cnoise(...)` call inside the `#test` block never assigns), so
 * `noise2` stays 0 and the lens normal is never perturbed.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$shaders$2f$chunks$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/home-lib/scene/shaders/chunks.ts [ssr] (ecmascript)");
;
const backgroundVertex = /* glsl */ `
varying vec3 vPos;
varying vec2 vUv;

void main() {
    vUv = uv;
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
const backgroundFragment = /* glsl */ `
uniform float time;
uniform float uBrightness;
uniform float uNoiseScale;
uniform float uNoiseSpeed;
uniform sampler2D tColorRamp;
uniform vec2 uColorRange;
uniform float uSaturation;
uniform float uContrastAdjust;

varying vec3 vPos;
varying vec2 vUv;

${__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$shaders$2f$chunks$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["RANGE"]}
${__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$shaders$2f$chunks$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["SIMPLE_NOISE"]}
${__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$shaders$2f$chunks$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["RGB2HSV"]}
${__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$shaders$2f$chunks$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CONTRAST"]}

void main() {
    float noise = cnoise(vPos * uNoiseScale * 2.0 + time * uNoiseSpeed * 0.1 + uColorRange.x + uColorRange.y);

    float bgNoise = crange(noise, -1.0, 1.0, uColorRange.x, uColorRange.y);
    bgNoise += getNoise(vUv, time) * 0.01;
    bgNoise += uBrightness;

    vec3 color = texture2D(tColorRamp, vec2(bgNoise, 0.0)).rgb;

    color = rgb2hsv(color);
    color.y *= uSaturation;
    color = hsv2rgb(color);

    color = mix(color, adjustContrast(color, 0.5, 0.5), uContrastAdjust);

    gl_FragColor = vec4(color, 1.0);
}
`;
const eyeVertex = /* glsl */ `
uniform vec2 uPinchRange;

varying vec2 vUv;
varying vec3 vPos;

void main() {
    float pinch = 1.0 - smoothstep(uPinchRange.x, uPinchRange.y, uv.y);
    vec3 pos = position * mix(1.0, 0.0, pinch);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    vUv = uv;
    vPos = pos;
}
`;
const eyeFragment = /* glsl */ `
uniform float time;
uniform sampler2D tMap;
uniform vec2 uTile;
uniform vec4 uFadeRange;
uniform vec4 uBands1;
uniform vec4 uBands2;
uniform vec3 uColor;
uniform float uTransition;

varying vec2 vUv;
varying vec3 vPos;

${__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$shaders$2f$chunks$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["RANGE"]}
${__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$shaders$2f$chunks$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["SIMPLE_NOISE"]}
${__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$shaders$2f$chunks$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["RGB2HSV"]}

void main() {
    float noise = 0.5;
    noise *= cnoise(vPos * 0.25 + vec3(0.0, 0.0, -time * 0.3));
    noise += 0.5;
    noise *= 0.3;

    float distort = smoothstep(uTransition - 0.6, uTransition, vUv.y);
    vec2 uv = vUv * uTile + vec2(noise * 0.1, -time * 0.05 + distort);
    vec2 uv2 = vUv;

    vec4 tex = texture2D(tMap, uv);
    float linesSharp = tex.r;
    float linesBlur = tex.g * 4.0;

    float innerGradient = smoothstep(uFadeRange.x, uFadeRange.y, uv2.y);
    float outerGradient = 1.0 - smoothstep(uFadeRange.z, uFadeRange.w, uv2.y);
    float gradient = innerGradient * outerGradient;

    vec3 color = uColor;
    color *= 1.0 + noise * 0.3;

    // Left as-is: upstream computes a second noise but never assigns it.
    float noise2 = 0.0;
    color = mix(color, vec3(1.0), smoothstep(0.0, 1.0, noise2));

    color = rgb2hsv(color);
    color = hsv2rgb(color);

    float alpha = linesBlur;
    alpha *= gradient;
    alpha *= 1.0 - smoothstep(uFadeRange.z, uFadeRange.w, uv2.y);
    alpha -= smoothstep(uBands1.x, uBands1.y, uv2.y) - smoothstep(uBands1.z, uBands1.w, uv2.y);
    alpha += smoothstep(uBands2.x, uBands2.y, uv2.y) - smoothstep(uBands2.z, uBands2.w, uv2.y);
    alpha += linesSharp * gradient * 0.8;
    alpha -= noise * alpha;
    alpha += noise * gradient;
    alpha += (0.5 * sin(time) + 0.5) * 0.1 * gradient;
    alpha *= 1.0 - distort;

    gl_FragColor.rgb = color;
    gl_FragColor.a = clamp(alpha, 0.0, 1.0);
}
`;
const lensVertex = /* glsl */ `
uniform vec3 uReflectOffset;

varying vec2 vUv;
varying vec2 vMuv;

${__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$shaders$2f$chunks$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["MATCAP"]}

void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vUv = uv;
    vMuv = reflectMatcap(position + uReflectOffset, modelViewMatrix, normalize(normalMatrix * normal));
}
`;
const lensFragment = /* glsl */ `
uniform sampler2D tMatcap;
uniform vec3 uColor;
uniform float uTransition;

varying vec2 vUv;
varying vec2 vMuv;

void main() {
    float alpha = texture2D(tMatcap, vMuv).r;
    alpha *= 0.85;
    alpha *= uTransition;
    gl_FragColor = vec4(uColor, alpha);
}
`;
}),
"[project]/home-lib/scene/geometry.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "loadGeometry",
    ()=>loadGeometry
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__ = __turbopack_context__.i("[externals]/three [external] (three, esm_import, [project]/node_modules/three)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
async function loadGeometry(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`geometry ${url}: ${res.status}`);
    const json = await res.json();
    const geometry = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["BufferGeometry"]();
    geometry.setAttribute('position', new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["BufferAttribute"](new Float32Array(json.position), 3));
    if (json.uv) geometry.setAttribute('uv', new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["BufferAttribute"](new Float32Array(json.uv), 2));
    if (json.normal) {
        geometry.setAttribute('normal', new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["BufferAttribute"](new Float32Array(json.normal), 3));
    } else {
        geometry.computeVertexNormals();
    }
    geometry.computeBoundingSphere();
    return geometry;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/home-lib/scene/useGeometry.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "useGeometry",
    ()=>useGeometry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$geometry$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/home-lib/scene/geometry.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$geometry$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$geometry$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const cache = new Map();
function useGeometry(url) {
    let entry = cache.get(url);
    if (!entry) {
        entry = {
            promise: (0, __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$geometry$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["loadGeometry"])(url).then((g)=>entry.value = g, (e)=>{
                ;
                entry.error = e;
                throw e;
            })
        };
        cache.set(url, entry);
    }
    if (entry.error) throw entry.error;
    if (!entry.value) throw entry.promise;
    return entry.value;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/home-lib/scene/useTexture.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "useTexture",
    ()=>useTexture
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__ = __turbopack_context__.i("[externals]/three [external] (three, esm_import, [project]/node_modules/three)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const cache = new Map();
function loadTexture(url, options) {
    return new Promise((resolve, reject)=>{
        new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["TextureLoader"]().load(url, (texture)=>{
            if (options.color) texture.colorSpace = __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["SRGBColorSpace"];
            if (options.repeat) texture.wrapS = texture.wrapT = __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["RepeatWrapping"];
            resolve(texture);
        }, undefined, reject);
    });
}
function useTexture(url, options = {}) {
    let entry = cache.get(url);
    if (!entry) {
        entry = {
            promise: loadTexture(url, options).then((t)=>entry.value = t, (e)=>{
                ;
                entry.error = e;
                throw e;
            })
        };
        cache.set(url, entry);
    }
    if (entry.error) throw entry.error;
    if (!entry.value) throw entry.promise;
    return entry.value;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/home-lib/scene/Scene.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "Scene",
    ()=>Scene
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$drei__$5b$external$5d$__$2840$react$2d$three$2f$drei$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$29$__ = __turbopack_context__.i("[externals]/@react-three/drei [external] (@react-three/drei, cjs, [project]/node_modules/@react-three/drei)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$fiber__$5b$external$5d$__$2840$react$2d$three$2f$fiber$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$29$__ = __turbopack_context__.i("[externals]/@react-three/fiber [external] (@react-three/fiber, cjs, [project]/node_modules/@react-three/fiber)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__ = __turbopack_context__.i("[externals]/three [external] (three, esm_import, [project]/node_modules/three)");
var __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/home-lib/scene/config.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$shaders$2f$landing$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/home-lib/scene/shaders/landing.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$useGeometry$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/home-lib/scene/useGeometry.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$useTexture$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/home-lib/scene/useTexture.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$useGeometry$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$useTexture$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$useGeometry$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$useTexture$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
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
 * Replays one of the engine's shader tweens: `uTransition` 0 -> to over
 * `duration`, easeOutSine, after `delay`. Takes elapsed ms, returns the value.
 */ function transitionAt(elapsed, { to, duration, delay }) {
    const t = elapsed - delay;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["easeOutSine"])(t <= 0 ? 0 : Math.min(1, t / duration)) * to;
}
function BackgroundSphere() {
    const ramp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$useTexture$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["useTexture"])(__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["background"].colorRamp, {
        color: true
    });
    const materialRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const uniforms = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>({
            time: {
                value: 0
            },
            tColorRamp: {
                value: ramp
            },
            uColorRange: {
                value: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector2"](...__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["background"].uniforms.uColorRange)
            },
            uBrightness: {
                value: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["background"].uniforms.uBrightness
            },
            uNoiseScale: {
                value: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["background"].uniforms.uNoiseScale
            },
            uNoiseSpeed: {
                value: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["background"].uniforms.uNoiseSpeed
            },
            uSaturation: {
                value: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["background"].uniforms.uSaturation
            },
            uContrastAdjust: {
                value: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["background"].uniforms.uContrastAdjust
            }
        }), [
        ramp
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$fiber__$5b$external$5d$__$2840$react$2d$three$2f$fiber$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$29$__["useFrame"])(({ clock })=>{
        const material = materialRef.current;
        if (material) material.uniforms.time.value = clock.elapsedTime;
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("mesh", {
        scale: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["background"].scale,
        renderOrder: 0,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("sphereGeometry", {
                args: [
                    1,
                    16,
                    16
                ]
            }, void 0, false, {
                fileName: "[project]/home-lib/scene/Scene.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("shaderMaterial", {
                ref: materialRef,
                vertexShader: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$shaders$2f$landing$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["backgroundVertex"],
                fragmentShader: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$shaders$2f$landing$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["backgroundFragment"],
                uniforms: uniforms,
                side: __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["BackSide"],
                depthWrite: false
            }, void 0, false, {
                fileName: "[project]/home-lib/scene/Scene.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/home-lib/scene/Scene.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
function Eye() {
    const geometry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$useGeometry$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["useGeometry"])(__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["eye"].geometry);
    const map = (0, __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$useTexture$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["useTexture"])(__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["eye"].map, {
        repeat: true
    });
    const materialRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const uniforms = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>({
            time: {
                value: 0
            },
            tMap: {
                value: map
            },
            uColor: {
                value: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Color"](__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["eye"].uniforms.uColor)
            },
            uTile: {
                value: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector2"](...__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["eye"].uniforms.uTile)
            },
            uPinchRange: {
                value: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector2"](...__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["eye"].uniforms.uPinchRange)
            },
            uFadeRange: {
                value: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector4"](...__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["eye"].uniforms.uFadeRange)
            },
            uBands1: {
                value: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector4"](...__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["eye"].uniforms.uBands1)
            },
            uBands2: {
                value: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector4"](...__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["eye"].uniforms.uBands2)
            },
            uTransition: {
                value: 0
            }
        }), [
        map
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$fiber__$5b$external$5d$__$2840$react$2d$three$2f$fiber$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$29$__["useFrame"])(({ clock })=>{
        const material = materialRef.current;
        if (!material) return;
        material.uniforms.time.value = clock.elapsedTime;
        material.uniforms.uTransition.value = transitionAt(clock.elapsedTime * 1000, __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["eye"].transition);
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("mesh", {
        geometry: geometry,
        position: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["eye"].position,
        rotation: [
            __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["eye"].rotation[0] * __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["DEG"],
            __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["eye"].rotation[1] * __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["DEG"],
            __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["eye"].rotation[2] * __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["DEG"]
        ],
        scale: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["eye"].scale,
        renderOrder: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["eye"].renderOrder,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("shaderMaterial", {
            ref: materialRef,
            vertexShader: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$shaders$2f$landing$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["eyeVertex"],
            fragmentShader: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$shaders$2f$landing$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["eyeFragment"],
            uniforms: uniforms,
            transparent: true,
            depthWrite: false
        }, void 0, false, {
            fileName: "[project]/home-lib/scene/Scene.tsx",
            lineNumber: 111,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/home-lib/scene/Scene.tsx",
        lineNumber: 104,
        columnNumber: 5
    }, this);
}
function Lens() {
    const geometry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$useGeometry$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["useGeometry"])(__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["lens"].geometry);
    const matcap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$useTexture$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["useTexture"])(__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["lens"].matcap, {
        color: true
    });
    const materialRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const uniforms = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>({
            tMatcap: {
                value: matcap
            },
            uColor: {
                value: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Color"](__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["lens"].uniforms.uColor)
            },
            uReflectOffset: {
                value: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector3"](...__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["lens"].uniforms.uReflectOffset)
            },
            uTransition: {
                value: 0
            }
        }), [
        matcap
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$fiber__$5b$external$5d$__$2840$react$2d$three$2f$fiber$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$29$__["useFrame"])(({ clock })=>{
        const material = materialRef.current;
        if (!material) return;
        material.uniforms.uTransition.value = transitionAt(clock.elapsedTime * 1000, __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["lens"].transition);
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("mesh", {
        geometry: geometry,
        position: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["lens"].position,
        scale: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["lens"].scale,
        renderOrder: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["lens"].renderOrder,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("shaderMaterial", {
            ref: materialRef,
            vertexShader: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$shaders$2f$landing$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["lensVertex"],
            fragmentShader: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$shaders$2f$landing$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["lensFragment"],
            uniforms: uniforms,
            transparent: true,
            depthWrite: false
        }, void 0, false, {
            fileName: "[project]/home-lib/scene/Scene.tsx",
            lineNumber: 151,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/home-lib/scene/Scene.tsx",
        lineNumber: 145,
        columnNumber: 5
    }, this);
}
/**
 * Camera placement plus the editor's aspect-driven FOV, which widens the lens
 * on portrait viewports. The level's lookAt sits straight down -Z from the
 * camera, so the default orientation already matches it.
 */ function CameraRig() {
    const size = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$fiber__$5b$external$5d$__$2840$react$2d$three$2f$fiber$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$29$__["useThree"])((state)=>state.size);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$drei__$5b$external$5d$__$2840$react$2d$three$2f$drei$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$29$__["PerspectiveCamera"], {
        makeDefault: true,
        position: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["camera"].position,
        fov: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["camera"].fovForAspect(size.width / size.height),
        near: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["camera"].near,
        far: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["camera"].far
    }, void 0, false, {
        fileName: "[project]/home-lib/scene/Scene.tsx",
        lineNumber: 172,
        columnNumber: 5
    }, this);
}
function Scene() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$fiber__$5b$external$5d$__$2840$react$2d$three$2f$fiber$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$29$__["Canvas"], {
        style: {
            position: 'fixed',
            inset: 0
        },
        dpr: [
            1,
            2
        ],
        // The engine wrote straight to the backbuffer; no filmic curve on top.
        gl: {
            antialias: true,
            toneMapping: __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["NoToneMapping"]
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(CameraRig, {}, void 0, false, {
                fileName: "[project]/home-lib/scene/Scene.tsx",
                lineNumber: 198,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["Suspense"], {
                fallback: null,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(BackgroundSphere, {}, void 0, false, {
                        fileName: "[project]/home-lib/scene/Scene.tsx",
                        lineNumber: 200,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("group", {
                        position: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["eyeGroup"].position,
                        rotation: [
                            __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["eyeGroup"].rotation[0] * __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["DEG"],
                            __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["eyeGroup"].rotation[1] * __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["DEG"],
                            __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["eyeGroup"].rotation[2] * __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["DEG"]
                        ],
                        scale: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["eyeGroup"].scale,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Eye, {}, void 0, false, {
                                fileName: "[project]/home-lib/scene/Scene.tsx",
                                lineNumber: 210,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Lens, {}, void 0, false, {
                                fileName: "[project]/home-lib/scene/Scene.tsx",
                                lineNumber: 211,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/home-lib/scene/Scene.tsx",
                        lineNumber: 201,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/home-lib/scene/Scene.tsx",
                lineNumber: 199,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/home-lib/scene/Scene.tsx",
        lineNumber: 192,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/home-lib/scene/Scene.tsx [ssr] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/home-lib/scene/Scene.tsx [ssr] (ecmascript)"));
}),
"[externals]/@react-three/drei [external] (@react-three/drei, cjs, [project]/node_modules/@react-three/drei)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@react-three/drei-55417cbbf7f59941", () => require("@react-three/drei-55417cbbf7f59941"));

module.exports = mod;
}),
"[externals]/@react-three/fiber [external] (@react-three/fiber, cjs, [project]/node_modules/@react-three/fiber)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@react-three/fiber-1ddc862b4060bf54", () => require("@react-three/fiber-1ddc862b4060bf54"));

module.exports = mod;
}),
"[externals]/three [external] (three, esm_import, [project]/node_modules/three)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("three-055b82e065a9f10e");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ba32ccf7._.js.map