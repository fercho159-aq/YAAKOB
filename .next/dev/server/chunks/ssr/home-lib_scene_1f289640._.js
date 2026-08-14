module.exports = [
"[project]/home-lib/scene/config.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Every tunable of the landing scene, in one typed place.
 *
 * Two sources fed this file. Most values come from `assets/data/uil.json` —
 * 14,857 keys of baked editor state, 754 of them for this scene, under names
 * like `LandingEyeShader/LandingEyeShader/Element_1_landingeye/uBands1`. Where
 * the running engine disagreed with that file (the site patched the bundle
 * over time) the live values win: they were read back out of the legacy page
 * by wrapping `WebGLRenderer.render` and walking the scene graph.
 *
 * Layer order in the `landingeye` layout: background · eye · lens · splines,
 * with the logo quads sitting in front of all of them.
 */ /** Degrees, as authored in the editor; converted on the way to three. */ __turbopack_context__.s([
    "DEG",
    ()=>DEG,
    "background",
    ()=>background,
    "camera",
    ()=>camera,
    "composite",
    ()=>composite,
    "easeInOutSine",
    ()=>easeInOutSine,
    "easeOutSine",
    ()=>easeOutSine,
    "eye",
    ()=>eye,
    "eyeGroup",
    ()=>eyeGroup,
    "floaters",
    ()=>floaters,
    "lens",
    ()=>lens,
    "logo",
    ()=>logo,
    "parallax",
    ()=>parallax,
    "splines",
    ()=>splines,
    "tagline",
    ()=>tagline
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
    scale: 300,
    colorRamp: '/assets/images/global/colorramp.png',
    uniforms: {
        uColorRange: [
            0.6,
            0.78
        ],
        uBrightness: 0,
        uNoiseScale: 0.25,
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
const logo = {
    map: '/assets/images/landing/echo-logo.png',
    /** World position of the stack; each layer overrides z. */ position: [
        0,
        1.9,
        0
    ],
    scale: 5.5,
    layers: [
        {
            z: -6.0,
            clamp: [
                0,
                0.49
            ],
            alpha: 1,
            outline: 0,
            renderOrder: 101.08
        },
        {
            z: -5.725,
            clamp: [
                0.49,
                0.65
            ],
            alpha: 1.2,
            outline: 0,
            renderOrder: 101.17
        },
        {
            z: -6.0,
            clamp: [
                0.65,
                0.72
            ],
            alpha: 1,
            outline: 0,
            renderOrder: 101.25
        },
        {
            z: -6.275,
            clamp: [
                0.49,
                0.72
            ],
            alpha: 0.5,
            outline: 1,
            renderOrder: 101.33
        },
        {
            z: -7.1,
            clamp: [
                0,
                0.72
            ],
            alpha: 0.25,
            outline: 1,
            renderOrder: 101.42
        }
    ],
    /**
   * Black, not the white `uil.json` records: the running engine has no `uColor`
   * uniform bound on these layers at all, so the shader falls back to a
   * zeroed vec3 — which is what paints the wordmark dark on the live page.
   */ color: '#000000',
    /**
   * `uTransition` wipes the stack in from the bottom. The engine drove it from
   * the level's intro timeline; this matches the pace the live page shows.
   */ transition: {
        to: 1,
        duration: 6000,
        delay: 800
    }
};
const splines = {
    data: '/assets/geometry/landing/eye-SPLINES.json',
    /** Local to the eye group, from the layout's Element_3. */ position: [
        0,
        -2.5,
        0
    ],
    scale: [
        0.78,
        1.3,
        0.78
    ],
    count: 65025,
    renderOrder: 2,
    /** Radius of the random scatter around each spline (uSplineThickness * 0.5). */ thickness: 0.5,
    /** Seconds for a particle to travel its spline end to end. */ lifetime: 14,
    uniforms: {
        uColor: '#adc9e1',
        uSize: 0.3,
        uLifeFade: [
            0.68,
            0.85
        ]
    },
    /** LandingEyeSplines.animateIn: uAlpha 0 -> 0.8, 10s easeInOutSine. */ transition: {
        to: 0.8,
        duration: 10000,
        delay: 0
    }
};
const tagline = {
    text: 'ASESORÍA · PREVENCIÓN · REGULARIZACIÓN · DEFENSA FISCAL',
    font: '/assets/fonts/TTMussels-Bold.json',
    atlas: '/assets/fonts/TTMussels-Bold.png',
    color: '#13343f',
    alpha: 0.96,
    /**
   * Fraction of the font's line height added between glyphs. The engine's own
   * `letterSpacing: 0.6` is in GLUI's units, not these; 0.125 reproduces the
   * pitch the live page measures (55 glyphs over 548px at 1440 wide).
   */ letterSpacing: 0.125,
    /** World width of the laid-out line, and where it sits on the logo plane. */ width: 3.41,
    position: [
        0,
        0.216,
        -6
    ],
    renderOrder: 101.5
};
const parallax = {
    move: [
        -2,
        -1
    ],
    lerp: 0.02
};
const floaters = {
    count: 4000,
    /** Half-extents of the spawn box, from the layout's world scale. */ scale: [
        40,
        20,
        40
    ],
    color: '#3c464f',
    uniforms: {
        uSize: 8,
        uScale: [
            1,
            1
        ],
        uAlpha: 0.4
    },
    renderOrder: 1
};
const composite = {
    uRGBStrength: 0.1,
    uNoise: 0.02,
    uVignette: 0,
    uDistortion: 1.02,
    uContrast: [
        1,
        1
    ],
    /** Screen-space hexagon size; the engine coarsened it on phones. */ uHexScale: 0.035,
    uHexScalePhone: 0.07,
    uOverlayMix: 1,
    uOverlayColor: '#ffffff',
    bloom: {
        /**
     * `bloomStrength` from the level's VFX override. The engine's composite
     * weighted its single blur mip by `lerpBloomFactor(1.0)` = 0.52 on top of
     * this, so the port's effective glow is trimmed by `strength` below.
     */ intensity: 1,
        /**
     * The engine's 0.52 mip weight, further scaled to land on the live frame's
     * brightness: its luminosity pass and blur chain are not the ones
     * postprocessing runs, so the nominal value glows about five times too hard.
     */ strength: 0.1,
        luminanceThreshold: 0.29,
        radius: 0.6
    }
};
const easeOutSine = (t)=>Math.sin(t * Math.PI / 2);
const easeInOutSine = (t)=>-(Math.cos(Math.PI * t) - 1) / 2;
}),
"[project]/home-lib/scene/fluid.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "useFluid",
    ()=>useFluid
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$fiber__$5b$external$5d$__$2840$react$2d$three$2f$fiber$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$29$__ = __turbopack_context__.i("[externals]/@react-three/fiber [external] (@react-three/fiber, cjs, [project]/node_modules/@react-three/fiber)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__ = __turbopack_context__.i("[externals]/three [external] (three, esm_import, [project]/node_modules/three)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
/**
 * Pointer fluid.
 *
 * The engine ran a full Navier-Stokes solver (advect, divergence, pressure,
 * gradient subtract) and handed every shader two textures: `tFluid` with the
 * velocity field and `tFluidMask` with where the pointer has been. What the
 * landing does with them is small — a sub-pixel uv nudge on the eye, a sparkle
 * on the logo fill, a shove on the particles — so this is the cheap version:
 * self-advection plus decay, no pressure projection.
 *
 * One difference the shaders have to know about: the engine kept the mask in
 * its own texture, this packs it into the blue channel of the same one. Ported
 * GLSL therefore reads the mask from `.b`, not `.r`.
 */ const SIZE = 256;
const simVertex = /* glsl */ `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;
const simFragment = /* glsl */ `
uniform sampler2D tPrev;
uniform vec2 uPointer;
uniform vec2 uVelocity;
uniform float uRadius;
uniform float uDecay;
uniform float uAspect;

varying vec2 vUv;

void main() {
    // Self-advection: step back along the field and pick up what was there.
    vec2 prevVelocity = texture2D(tPrev, vUv).xy;
    vec2 source = vUv - prevVelocity * 0.6;
    vec4 prev = texture2D(tPrev, source) * uDecay;

    vec2 delta = (vUv - uPointer) * vec2(uAspect, 1.0);
    float splat = exp(-dot(delta, delta) / uRadius);

    vec2 velocity = prev.xy + uVelocity * splat;
    float mask = max(prev.z, splat);

    gl_FragColor = vec4(clamp(velocity, -1.0, 1.0), mask, 1.0);
}
`;
class FluidSim {
    scene = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Scene"]();
    camera = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["OrthographicCamera"](-1, 1, 1, -1, 0, 1);
    material;
    targets;
    current = 0;
    constructor(){
        const options = {
            type: __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["HalfFloatType"],
            minFilter: __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["NearestFilter"],
            magFilter: __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["NearestFilter"],
            depthBuffer: false
        };
        this.targets = [
            new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["WebGLRenderTarget"](SIZE, SIZE, options),
            new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["WebGLRenderTarget"](SIZE, SIZE, options)
        ];
        this.material = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["ShaderMaterial"]({
            vertexShader: simVertex,
            fragmentShader: simFragment,
            uniforms: {
                tPrev: {
                    value: this.targets[1].texture
                },
                uPointer: {
                    value: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector2"](0.5, 0.5)
                },
                uVelocity: {
                    value: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector2"]()
                },
                // Tuned against the live page: the pointer leaves a trail about this
                // wide, and it clears in roughly a second.
                uRadius: {
                    value: 0.004
                },
                uDecay: {
                    value: 0.955
                },
                uAspect: {
                    value: 1
                }
            },
            depthTest: false,
            depthWrite: false
        });
        this.scene.add(new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["PlaneGeometry"](2, 2), this.material));
    }
    /** The texture the scene shaders sample: xy velocity, z mask. */ get texture() {
        return this.targets[this.current].texture;
    }
    swap() {
        this.material.uniforms.tPrev.value = this.targets[this.current].texture;
        this.current = 1 - this.current;
    }
    get target() {
        return this.targets[this.current];
    }
    dispose() {
        this.targets[0].dispose();
        this.targets[1].dispose();
        this.material.dispose();
    }
}
function useFluid() {
    const gl = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$fiber__$5b$external$5d$__$2840$react$2d$three$2f$fiber$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$29$__["useThree"])((state)=>state.gl);
    const size = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$fiber__$5b$external$5d$__$2840$react$2d$three$2f$fiber$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$29$__["useThree"])((state)=>state.size);
    const pointer = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$fiber__$5b$external$5d$__$2840$react$2d$three$2f$fiber$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$29$__["useThree"])((state)=>state.pointer);
    const simRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    simRef.current ??= new FluidSim();
    const state = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>({
            last: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector2"](0.5, 0.5),
            velocity: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector2"]()
        }), []);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>()=>simRef.current?.dispose(), []);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$fiber__$5b$external$5d$__$2840$react$2d$three$2f$fiber$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$29$__["useFrame"])(()=>{
        const sim = simRef.current;
        if (!sim) return;
        // R3F's pointer is -1..1 with y up; the sim works in uv space.
        const x = pointer.x * 0.5 + 0.5;
        const y = pointer.y * 0.5 + 0.5;
        state.velocity.set(x - state.last.x, y - state.last.y).multiplyScalar(6);
        state.last.set(x, y);
        const uniforms = sim.material.uniforms;
        uniforms.uPointer.value.set(x, y);
        uniforms.uVelocity.value.copy(state.velocity);
        uniforms.uAspect.value = size.width / size.height;
        sim.swap();
        const previous = gl.getRenderTarget();
        gl.setRenderTarget(sim.target);
        gl.render(sim.scene, sim.camera);
        gl.setRenderTarget(previous);
    }, -1);
    return simRef.current;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
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

float cnoise(vec2 v) {
    float t = v.x * 0.3;
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
"[project]/home-lib/scene/post.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "Composite",
    ()=>Composite
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$fiber__$5b$external$5d$__$2840$react$2d$three$2f$fiber$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$29$__ = __turbopack_context__.i("[externals]/@react-three/fiber [external] (@react-three/fiber, cjs, [project]/node_modules/@react-three/fiber)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$postprocessing__$5b$external$5d$__$28$postprocessing$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$postprocessing$29$__ = __turbopack_context__.i("[externals]/postprocessing [external] (postprocessing, esm_import, [project]/node_modules/postprocessing)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__ = __turbopack_context__.i("[externals]/three [external] (three, esm_import, [project]/node_modules/three)");
var __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/home-lib/scene/config.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$shaders$2f$chunks$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/home-lib/scene/shaders/chunks.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$postprocessing__$5b$external$5d$__$28$postprocessing$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$postprocessing$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$postprocessing__$5b$external$5d$__$28$postprocessing$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$postprocessing$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
/**
 * The engine's `Composite` pass, the last thing it drew.
 *
 * This is where the glass hexagons live: `getHexagons` tiles the frame, and the
 * result is soft-light blended over the image weighted by `smoothstep(0.3, 1.4,
 * len)` — zero in the middle of the screen, strongest in the corners. The same
 * pass carries the film grain, the barrel distortion, the chromatic split and
 * the contrast trim.
 *
 * Dropped from the original: the ripple, error and success states, which the
 * game fired on events the site has no equivalent for and which sit at 0 the
 * whole time on the live page.
 */ const fragmentShader = /* glsl */ `
uniform float uRGBStrength;
uniform float uNoise;
uniform float uVignette;
uniform float uDistortion;
uniform vec2 uContrast;
uniform float uHexScale;
uniform float uOverlayMix;
uniform vec3 uOverlayColor;
uniform sampler2D tFluid;

${__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$shaders$2f$chunks$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["RANGE"]}
${__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$shaders$2f$chunks$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["SIMPLE_NOISE"]}

float sineIn(float t) {
    return sin((t - 1.0) * 1.5707963267948966) + 1.0;
}

vec2 scaleUV(vec2 uv, vec2 scale, vec2 origin) {
    vec2 st = uv - origin;
    st /= scale;
    return st + origin;
}

vec2 scaleUV(vec2 uv, vec2 scale) {
    return scaleUV(uv, scale, vec2(0.5));
}

vec3 adjustContrast(vec3 color, float c, float m) {
    color.rgb = color.rgb * c + (0.5 - c * 0.5);
    return color * m;
}

float blendSoftLight(float base, float blend) {
    return (blend < 0.5)
        ? (2.0 * base * blend + base * base * (1.0 - 2.0 * blend))
        : (sqrt(base) * (2.0 * blend - 1.0) + 2.0 * base * (1.0 - blend));
}

vec3 blendSoftLight(vec3 base, vec3 blend) {
    return vec3(
        blendSoftLight(base.r, blend.r),
        blendSoftLight(base.g, blend.g),
        blendSoftLight(base.b, blend.b)
    );
}

vec4 getRGB(sampler2D tex, vec2 uv, float angle, float amount) {
    vec2 offset = vec2(cos(angle), sin(angle)) * amount;
    vec4 r = texture2D(tex, uv + offset);
    vec4 g = texture2D(tex, uv);
    vec4 b = texture2D(tex, uv - offset);
    return vec4(r.r, g.g, b.b, g.a);
}

const vec2 s = vec2(1, 1.7320508);
const float borderThickness = 0.02;

float calcHexDistance(vec2 p) {
    p = abs(p);
    return max(dot(p, s * 0.5), p.x);
}

float hexRandom(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

vec4 sround(vec4 i) {
    return floor(i + 0.5);
}

vec4 calcHexInfo(vec2 uv) {
    vec4 hexCenter = sround(vec4(uv, uv - vec2(0.5, 1.0)) / s.xyxy);
    vec4 offset = vec4(uv - hexCenter.xy * s, uv - (hexCenter.zw + 0.5) * s);
    return dot(offset.xy, offset.xy) < dot(offset.zw, offset.zw)
        ? vec4(offset.xy, hexCenter.xy)
        : vec4(offset.zw, hexCenter.zw);
}

vec3 getHexagons(vec2 uv) {
    float distort = 0.2 + sin(time * 0.15) * 0.1;
    float distortion2 = 1.0 + smoothstep(0.1, 1.1, length(uv - 0.5)) * distort + sin(time * 0.15) * 0.04;

    vec2 hexUV = scaleUV(uv, vec2(1.0, resolution.x / resolution.y));
    hexUV = scaleUV(hexUV, vec2(distortion2));
    hexUV = scaleUV(hexUV, vec2(uHexScale));
    vec4 hexInfo = calcHexInfo(hexUV);

    float totalDist = calcHexDistance(hexInfo.xy) + borderThickness;
    float rand = hexRandom(hexInfo.zw);
    float aa = 5.0 / resolution.y;

    vec3 hexagons = vec3(0.0);
    hexagons.x = 1.0 - smoothstep(0.51, 0.51 - aa, totalDist);
    hexagons.y = pow(1.0 - max(0.0, 0.5 - totalDist), 10.0) * 1.5;
    hexagons.z = sin(time * 0.2 + rand * 8.0);

    return hexagons;
}

void mainUv(inout vec2 uv) {
    float len = length(uv - 0.5);
    vec3 hexagons = getHexagons(uv);

    // The hex ridges push the image around a little, more towards the edges.
    uv *= 1.0 + hexagons.y * hexagons.z * 0.04 * smoothstep(0.4, 1.4, len);
    uv = scaleUV(uv, vec2(sineIn(crange(len, 0.0, 0.8, 1.0, uDistortion))));
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    float len = length(uv - 0.5);
    vec3 hexagons = getHexagons(uv);

    // inputColor already carries the bloom the composer added ahead of this
    // pass, so the chromatic split has to be applied as a delta against the raw
    // buffer. Sampling inputBuffer for the base instead would silently throw
    // the bloom away.
    vec3 base = texture2D(inputBuffer, uv).rgb;
    vec3 shifted = getRGB(inputBuffer, uv, 0.3, 0.001 * uRGBStrength).rgb;
    vec3 color = inputColor.rgb + (shifted - base);

    color = adjustContrast(color, uContrast.x, uContrast.y);

    color += clamp((getNoise(uv, time) - 0.5) * uNoise, -uNoise * 0.5, uNoise * 0.5);
    color = mix(color, color * smoothstep(0.7, 0.3, len), uVignette);

    float fluidMask = smoothstep(0.0, 1.0, texture2D(tFluid, uv).z);

    vec3 hexColor = uOverlayColor * hexagons.x;
    hexColor *= clamp(cnoise(uv * 20.0 + time * 0.1) * 0.45 + 0.55, 0.1, 1.0);
    hexColor += hexagons.z * mix(0.05, 0.3, fluidMask);
    hexColor += hexagons.y * 0.3;

    float mixOverlay = uOverlayMix * 0.5 + fluidMask;
    mixOverlay *= clamp(cnoise(uv * 2.2 + time * 0.1) * 0.25 + 0.75, 0.5, 1.0);
    mixOverlay *= smoothstep(0.3, 1.4, len);

    color = mix(color, blendSoftLight(color, hexColor), mixOverlay);

    outputColor = vec4(color, inputColor.a);
}
`;
class CompositeEffect extends __TURBOPACK__imported__module__$5b$externals$5d2f$postprocessing__$5b$external$5d$__$28$postprocessing$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$postprocessing$29$__["Effect"] {
    constructor(fluidTexture){
        super('Composite', fragmentShader, {
            blendFunction: __TURBOPACK__imported__module__$5b$externals$5d2f$postprocessing__$5b$external$5d$__$28$postprocessing$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$postprocessing$29$__["BlendFunction"].NORMAL,
            uniforms: new Map([
                [
                    'uRGBStrength',
                    new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Uniform"](__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["composite"].uRGBStrength)
                ],
                [
                    'uNoise',
                    new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Uniform"](__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["composite"].uNoise)
                ],
                [
                    'uVignette',
                    new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Uniform"](__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["composite"].uVignette)
                ],
                [
                    'uDistortion',
                    new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Uniform"](__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["composite"].uDistortion)
                ],
                [
                    'uContrast',
                    new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Uniform"](new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector2"](...__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["composite"].uContrast))
                ],
                [
                    'uHexScale',
                    new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Uniform"](__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["composite"].uHexScale)
                ],
                [
                    'uOverlayMix',
                    new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Uniform"](__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["composite"].uOverlayMix)
                ],
                [
                    'uOverlayColor',
                    new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Uniform"](new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Color"](__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["composite"].uOverlayColor))
                ],
                [
                    'tFluid',
                    new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Uniform"](fluidTexture)
                ]
            ])
        });
    }
    setFluid(texture) {
        this.uniforms.get('tFluid').value = texture;
    }
    setHexScale(scale) {
        this.uniforms.get('uHexScale').value = scale;
    }
}
const Composite = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["forwardRef"])(function Composite({ fluid }, ref) {
    const size = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$fiber__$5b$external$5d$__$2840$react$2d$three$2f$fiber$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$29$__["useThree"])((state)=>state.size);
    const effect = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>new CompositeEffect(fluid.texture), [
        fluid
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$fiber__$5b$external$5d$__$2840$react$2d$three$2f$fiber$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$29$__["useFrame"])(()=>{
        effect.setFluid(fluid.texture);
        effect.setHexScale(size.width < 700 ? __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["composite"].uHexScalePhone : __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["composite"].uHexScale);
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("primitive", {
        ref: ref,
        object: effect,
        dispose: null
    }, void 0, false, {
        fileName: "[project]/home-lib/scene/post.tsx",
        lineNumber: 209,
        columnNumber: 10
    }, this);
});
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
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
    "floaterFragment",
    ()=>floaterFragment,
    "floaterVertex",
    ()=>floaterVertex,
    "lensFragment",
    ()=>lensFragment,
    "lensVertex",
    ()=>lensVertex,
    "logoFragment",
    ()=>logoFragment,
    "logoVertex",
    ()=>logoVertex,
    "splineFragment",
    ()=>splineFragment,
    "splineVertex",
    ()=>splineVertex,
    "textFragment",
    ()=>textFragment,
    "textVertex",
    ()=>textVertex
]);
/**
 * The landing shaders, lifted out of `assets/shaders/compiled.vs`:
 * `BackgroundSphere`, `LandingEyeShader`, `LandingLensShader`, `LandingLogo`
 * and `DomeLinesShader`.
 *
 * Changes from the originals, all mechanical:
 *  - Hydra's `#!UNIFORMS` / `#!VARYINGS` / `#!SHADER:` banners become plain
 *    vertex/fragment strings, and `#require(x)` becomes a chunk concatenation.
 *  - `#test Tests.backgroundSphereNoise()` is inlined (it is on for desktop).
 *  - `#test Tests.renderMouseFluid()` is inlined too, against the port's own
 *    fluid (see `fluid.ts`), which packs velocity and mask into one texture:
 *    `tFluid.xy` is the velocity, `tFluid.z` the mask the engine kept apart in
 *    `tFluidMask`.
 *  - `time` and `uResolution` are uniforms here; Hydra injected both.
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
uniform sampler2D tFluid;
uniform vec2 uResolution;
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

    // Pointer fluid: the engine nudged the strand lookup by the velocity field.
    vec2 fluidUV = gl_FragCoord.xy / uResolution;
    float fluidMask = smoothstep(0.0, 1.0, texture2D(tFluid, fluidUV).z);
    uv += texture2D(tFluid, vUv).xy * fluidMask * 0.0005;

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
const logoVertex = /* glsl */ `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
const logoFragment = /* glsl */ `
uniform float time;
uniform sampler2D tMap;
uniform sampler2D tFluid;
uniform vec2 uResolution;
uniform float uAlpha;
uniform float uTransition;
uniform float uOutline;
uniform float uFlipClamp;
uniform float uInvertAnim;
uniform vec2 uClamp;
uniform vec3 uColor;

varying vec2 vUv;

${__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$shaders$2f$chunks$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["RANGE"]}
${__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$shaders$2f$chunks$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["SIMPLE_NOISE"]}

float randomf(in float x) {
    return fract(sin(x) * 1e4);
}

float randomf(in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float pattern(vec2 st, vec2 v, float t) {
    vec2 p = floor(st + v);
    return step(t, randomf(100.0 + p * 0.000001) + randomf(p.x) * 0.5);
}

void main() {
    vec2 fluidUV = gl_FragCoord.xy / uResolution;
    float fluidMask = smoothstep(0.0, 0.1, texture2D(tFluid, fluidUV).z);
    vec2 fluid = texture2D(tFluid, vUv).xy * fluidMask;

    float mixFluid = smoothstep(0.0, 0.0005, fluid.x * fluid.y);
    mixFluid = mix(mixFluid, 0.0, 0.3);
    fluidMask = mix(fluidMask, 1.0, smoothstep(0.5, 0.0, uTransition));
    mixFluid = max(fluidMask, mixFluid);

    float noise = cnoise(vUv * 3.0 - time * 0.15);
    vec4 tex = texture2D(tMap, vUv);

    float outline = tex.r;
    outline = mix(outline * mixFluid, outline, uOutline);

    float fill = tex.b;

    vec2 st = vUv;
    vec2 grid = mix(vec2(140.0, 200.0), vec2(250.0, 3000.0), uInvertAnim);
    st *= grid;
    vec2 ipos = floor(st);
    vec2 fpos = fract(st);
    vec2 vel = vec2(((time * mix(0.1, 0.07, uInvertAnim)) / 2.0 * max(grid.x, grid.y)));

    vec2 horizontal = vec2(-1.0, 0.0) * randomf(1.0 + ipos.y);
    vec2 vertical = vec2(0.0, -1.0) * randomf(1.0 + ipos.x);
    vel *= mix(horizontal, vertical, uInvertAnim);

    vec2 offset = mix(vec2(0.1, -0.5), vec2(-0.5, 0.1), uInvertAnim);
    float c = clamp(pattern(st + offset, vel, 0.7), 0.0, 1.0);
    float a = step(0.6, mix(fpos.y, fpos.x, uInvertAnim));
    outline += c * a * fill * (1.0 - uOutline);
    fill = mix(fill, outline, mixFluid);

    float alpha = mix(fill, outline, uOutline);

    float transition = 1.0 - uTransition;
    float fade = smoothstep(transition - 0.5, transition, 1.0 - vUv.y) * smoothstep(0.0, 0.2, uTransition);
    alpha *= fade;
    alpha *= 0.85 + noise * 0.2;

    float clampAlpha = smoothstep(uClamp.x - 0.001, uClamp.x + 0.001, 1.0 - vUv.y)
        * smoothstep(uClamp.y + 0.001, uClamp.y - 0.001, 1.0 - vUv.y);
    alpha *= mix(clampAlpha, 1.0 - clampAlpha, uFlipClamp);
    alpha = mix(alpha, outline * alpha, smoothstep(0.8, 0.0, alpha));

    gl_FragColor.rgb = uColor;
    gl_FragColor.a = alpha * uAlpha;

    gl_FragColor = mix(gl_FragColor, vec4(1.0), (1.0 - c) * a * fill * mixFluid * uTransition);
}
`;
const splineVertex = /* glsl */ `
uniform float time;
uniform sampler2D tSpline;
uniform sampler2D tFluid;
uniform float uSplineTexSize;
uniform float uPerSpline;
uniform float uSize;
uniform float uAlpha;
uniform float uThickness;
uniform float uLifetime;
uniform vec2 uLifeFade;
uniform float uMouseStrength;

attribute vec4 random;
attribute vec3 origin;
attribute float splineIndex;

varying float vAlpha;
varying vec4 vRandom;
varying vec3 vPos;

${__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$shaders$2f$chunks$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["RANGE"]}

vec2 getSplineLookupUV(float index, float t) {
    float pixel = uPerSpline * (index + t);
    return vec2(mod(pixel, uSplineTexSize), floor(pixel / uSplineTexSize)) / uSplineTexSize;
}

vec3 getSplinePos(float index, float t) {
    float stepSize = 1.0 / uPerSpline;
    float next = min(t + stepSize, 1.0);
    vec3 cpos = texture2D(tSpline, getSplineLookupUV(index, t)).xyz;
    vec3 npos = texture2D(tSpline, getSplineLookupUV(index, next)).xyz;
    return mix(cpos, npos, mod(t, stepSize) * uPerSpline);
}

void main() {
    // life runs 0 -> 1 and wraps; the engine's travel was its complement.
    float life = fract(random.w + time / uLifetime);
    float travel = 1.0 - life;

    vec3 pos = getSplinePos(splineIndex, travel);
    pos += normalize(origin) * uThickness * 0.5 * mix(1.0, random.y, 0.5);

    // Pointer fluid, projected to screen space the way the engine's
    // glscreenprojection snippet did before sampling the velocity field.
    vec4 clip = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    vec2 screenUV = (clip.xy / clip.w) * 0.5 + 0.5;
    vec3 flow = texture2D(tFluid, screenUV).xyz;
    pos += vec3(flow.xy, 0.0) * flow.z * uMouseStrength * random.x * 20.0;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 0.06 * uSize * (1000.0 / length(mvPosition.xyz));
    gl_Position = projectionMatrix * mvPosition;

    vPos = pos;
    vRandom = random;

    vAlpha = uAlpha;
    vAlpha *= crange(life, uLifeFade.y, 0.99, 1.0, 0.0);
    vAlpha *= crange(life, 0.01, uLifeFade.x, 0.0, 1.0);

    float depth = length(cameraPosition - vec3(modelMatrix * vec4(pos, 1.0)));
    vAlpha *= smoothstep(6.0, 15.0, depth);
}
`;
const splineFragment = /* glsl */ `
uniform float time;
uniform vec3 uColor;

varying float vAlpha;
varying vec4 vRandom;
varying vec3 vPos;

${__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$shaders$2f$chunks$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["RANGE"]}
${__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$shaders$2f$chunks$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["SIMPLE_NOISE"]}

void main() {
    vec2 uv = vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y);
    float dist = 1.0 - distance(uv, vec2(0.5));
    dist = smoothstep(0.4, 0.9, dist);

    gl_FragColor.rgb = mix(vec3(1.0), uColor, step(vRandom.x, 0.5));
    gl_FragColor.a = vAlpha * dist;
    gl_FragColor.a *= 0.5 + sin(time * 15.0 + vRandom.y * 20.0) * 0.5;
    gl_FragColor.a *= crange(cnoise(vPos * 0.3 + time * 0.2), -1.0, 1.0, 0.1, 1.0);
}
`;
const textVertex = /* glsl */ `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
const textFragment = /* glsl */ `
uniform sampler2D tMap;
uniform vec3 uColor;
uniform float uAlpha;

varying vec2 vUv;

float msdf(sampler2D tex, vec2 uv) {
    vec3 texel = texture2D(tex, uv).rgb;
    float signedDist = max(min(texel.r, texel.g), min(max(texel.r, texel.g), texel.b)) - 0.5;
    float d = fwidth(signedDist);
    float alpha = smoothstep(-d, d, signedDist);
    if (alpha < 0.01) discard;
    return alpha;
}

void main() {
    gl_FragColor = vec4(uColor, msdf(tMap, vUv) * uAlpha);
}
`;
const floaterVertex = /* glsl */ `
uniform float uSize;
uniform vec2 uScale;
uniform float uAlpha;
uniform float uMouseStrength;
uniform float DPR;
uniform sampler2D tFluid;

attribute vec4 random;

varying float vAlpha;
varying vec4 vRandom;

${__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$shaders$2f$chunks$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["RANGE"]}

float expoIn(float t) {
    return t == 0.0 ? t : pow(2.0, 10.0 * (t - 1.0));
}

void main() {
    vec3 pos = position;

    vec4 clip = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    vec2 screenUV = (clip.xy / clip.w) * 0.5 + 0.5;
    vec3 flow = texture2D(tFluid, screenUV).xyz;
    pos += vec3(flow.xy, 0.0) * flow.z * uMouseStrength * 20.0;

    vec4 mPosition = modelMatrix * vec4(pos, 1.0);
    vec4 mvPosition = viewMatrix * mPosition;

    vRandom = random;
    vAlpha = uAlpha;
    vAlpha *= smoothstep(1.0, 6.0, length(mPosition.xyz - cameraPosition));

    float size = 1000.0 / length(mvPosition.xyz) * 0.01 * DPR;
    size *= uSize * crange(expoIn(random.w), 0.0, 1.0, uScale.x, uScale.y);

    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = size;
}
`;
const floaterFragment = /* glsl */ `
uniform float time;
uniform vec3 uColor;

varying float vAlpha;
varying vec4 vRandom;

void main() {
    vec3 color = uColor;
    color *= 0.7 + smoothstep(0.8, 1.0, abs(sin(time + vRandom.y * 20.0)));

    vec2 uv = vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y);
    float alpha = smoothstep(0.5, 0.0, length(uv - 0.5));
    alpha *= 0.5 + sin(time + vRandom.x * 20.0) * 0.5;

    gl_FragColor = vec4(color, clamp(alpha * vAlpha, 0.0, 1.0));
}
`;
}),
"[project]/home-lib/scene/splineData.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "SPLINE_TEX_SIZE",
    ()=>SPLINE_TEX_SIZE,
    "createSplineGeometry",
    ()=>createSplineGeometry,
    "loadSplineTexture",
    ()=>loadSplineTexture
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__ = __turbopack_context__.i("[externals]/three [external] (three, esm_import, [project]/node_modules/three)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const SPLINE_TEX_SIZE = 512;
async function loadSplineTexture(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`splines ${url}: ${res.status}`);
    const splines = await res.json();
    const perSpline = splines[0].length / 3;
    const data = new Float32Array(SPLINE_TEX_SIZE * SPLINE_TEX_SIZE * 4);
    let texel = 0;
    for (const spline of splines){
        for(let i = 0; i < spline.length; i += 3){
            data[texel * 4] = spline[i];
            data[texel * 4 + 1] = spline[i + 1];
            data[texel * 4 + 2] = spline[i + 2];
            data[texel * 4 + 3] = 1;
            texel++;
        }
    }
    const texture = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["DataTexture"](data, SPLINE_TEX_SIZE, SPLINE_TEX_SIZE, __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["RGBAFormat"], __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["FloatType"]);
    // Points are interpolated by hand in the shader, so no filtering here.
    texture.minFilter = texture.magFilter = __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["NearestFilter"];
    texture.needsUpdate = true;
    return {
        texture,
        splineCount: splines.length,
        perSpline
    };
}
function createSplineGeometry(count, splineCount) {
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count * 4);
    const origins = new Float32Array(count * 3);
    const indices = new Float32Array(count);
    for(let i = 0; i < count; i++){
        randoms[i * 4] = Math.random();
        randoms[i * 4 + 1] = Math.random();
        randoms[i * 4 + 2] = Math.random();
        randoms[i * 4 + 3] = Math.random();
        origins[i * 3] = Math.random() * 2 - 1;
        origins[i * 3 + 1] = Math.random() * 2 - 1;
        origins[i * 3 + 2] = Math.random() * 2 - 1;
        indices[i] = Math.floor(Math.random() * splineCount);
    }
    const geometry = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["BufferGeometry"]();
    geometry.setAttribute('position', new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["BufferAttribute"](positions, 3));
    geometry.setAttribute('random', new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["BufferAttribute"](randoms, 4));
    geometry.setAttribute('origin', new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["BufferAttribute"](origins, 3));
    geometry.setAttribute('splineIndex', new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["BufferAttribute"](indices, 1));
    return geometry;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/home-lib/scene/text.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "layoutText",
    ()=>layoutText,
    "loadFont",
    ()=>loadFont
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__ = __turbopack_context__.i("[externals]/three [external] (three, esm_import, [project]/node_modules/three)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
async function loadFont(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`font ${url}: ${res.status}`);
    return await res.json();
}
function layoutText(font, text, letterSpacing = 0) {
    const byChar = new Map(font.chars.map((c)=>[
            c.char,
            c
        ]));
    const kernings = new Map((font.kernings ?? []).map((k)=>[
            `${k.first}:${k.second}`,
            k.amount
        ]));
    const tracking = letterSpacing * font.common.lineHeight;
    const glyphs = [];
    let cursor = 0;
    let previous;
    for (const character of text){
        const glyph = byChar.get(character);
        if (!glyph) continue;
        if (previous) cursor += kernings.get(`${previous.id}:${glyph.id}`) ?? 0;
        if (glyph.width > 0 && glyph.height > 0) glyphs.push({
            char: glyph,
            x: cursor
        });
        cursor += glyph.xadvance + tracking;
        previous = glyph;
    }
    const width = cursor - tracking;
    const { scaleW, scaleH, base } = font.common;
    const positions = new Float32Array(glyphs.length * 4 * 3);
    const uvs = new Float32Array(glyphs.length * 4 * 2);
    const indices = new Uint16Array(glyphs.length * 6);
    glyphs.forEach(({ char, x }, i)=>{
        // Centre the line horizontally and sit the baseline on the origin.
        const x0 = x + char.xoffset - width / 2;
        const x1 = x0 + char.width;
        const y0 = base - char.yoffset;
        const y1 = y0 - char.height;
        const u0 = char.x / scaleW;
        const u1 = (char.x + char.width) / scaleW;
        // BMFont measures v from the top; three's textures start at the bottom.
        const v0 = 1 - char.y / scaleH;
        const v1 = 1 - (char.y + char.height) / scaleH;
        const p = i * 12;
        positions.set([
            x0,
            y1,
            0,
            x1,
            y1,
            0,
            x1,
            y0,
            0,
            x0,
            y0,
            0
        ], p);
        const t = i * 8;
        uvs.set([
            u0,
            v1,
            u1,
            v1,
            u1,
            v0,
            u0,
            v0
        ], t);
        const v = i * 4;
        indices.set([
            v,
            v + 1,
            v + 2,
            v,
            v + 2,
            v + 3
        ], i * 6);
    });
    const geometry = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["BufferGeometry"]();
    geometry.setAttribute('position', new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["BufferAttribute"](positions, 3));
    geometry.setAttribute('uv', new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["BufferAttribute"](uvs, 2));
    geometry.setIndex(new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["BufferAttribute"](indices, 1));
    geometry.computeBoundingSphere();
    return {
        geometry,
        width
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/home-lib/scene/useFont.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "useText",
    ()=>useText
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$text$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/home-lib/scene/text.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$text$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$text$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const cache = new Map();
function useText(fontUrl, text, letterSpacing) {
    const key = `${fontUrl}|${letterSpacing}|${text}`;
    let entry = cache.get(key);
    if (!entry) {
        entry = {
            promise: (0, __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$text$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["loadFont"])(fontUrl).then((font)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$text$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["layoutText"])(font, text, letterSpacing)).then((l)=>entry.value = l, (e)=>{
                ;
                entry.error = e;
                throw e;
            })
        };
        cache.set(key, entry);
    }
    if (entry.error) throw entry.error;
    if (!entry.value) throw entry.promise;
    return entry.value;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
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
"[project]/home-lib/scene/useSplines.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "useSplineData",
    ()=>useSplineData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$splineData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/home-lib/scene/splineData.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$splineData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$splineData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const cache = new Map();
function useSplineData(url) {
    let entry = cache.get(url);
    if (!entry) {
        entry = {
            promise: (0, __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$splineData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["loadSplineTexture"])(url).then((d)=>entry.value = d, (e)=>{
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
var __TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$postprocessing__$5b$external$5d$__$2840$react$2d$three$2f$postprocessing$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$29$__ = __turbopack_context__.i("[externals]/@react-three/postprocessing [external] (@react-three/postprocessing, esm_import, [project]/node_modules/@react-three/postprocessing)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__ = __turbopack_context__.i("[externals]/three [external] (three, esm_import, [project]/node_modules/three)");
var __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/home-lib/scene/config.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$fluid$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/home-lib/scene/fluid.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$post$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/home-lib/scene/post.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$shaders$2f$landing$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/home-lib/scene/shaders/landing.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$splineData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/home-lib/scene/splineData.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$useFont$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/home-lib/scene/useFont.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$useGeometry$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/home-lib/scene/useGeometry.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$useSplines$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/home-lib/scene/useSplines.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$useTexture$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/home-lib/scene/useTexture.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$postprocessing__$5b$external$5d$__$2840$react$2d$three$2f$postprocessing$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$fluid$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$post$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$splineData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$useFont$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$useGeometry$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$useSplines$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$useTexture$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$postprocessing__$5b$external$5d$__$2840$react$2d$three$2f$postprocessing$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$fluid$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$post$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$splineData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$useFont$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$useGeometry$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$useSplines$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$useTexture$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
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
;
;
/**
 * The engine had no colour management: hex values went to the GPU untouched.
 * three converts hex to its linear working space by default, which handed these
 * shaders a `#7E98A1` that reaches the framebuffer as `#37515C` — the eye's
 * strands came out roughly twice as dark as the real page's. The rest of the
 * pipeline is already unmanaged (see the renderer's `outputColorSpace`), so
 * this switches the last piece off too.
 */ __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["ColorManagement"].enabled = false;
/**
 * Replays one of the engine's shader tweens: 0 -> to over `duration` after
 * `delay`, in ms.
 */ function transitionAt(elapsed, { to, duration, delay }, ease = __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["easeOutSine"]) {
    const t = elapsed - delay;
    return ease(t <= 0 ? 0 : Math.min(1, t / duration)) * to;
}
function BackgroundSphere() {
    const ramp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$useTexture$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["useTexture"])(__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["background"].colorRamp);
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
                lineNumber: 111,
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
                lineNumber: 112,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/home-lib/scene/Scene.tsx",
        lineNumber: 110,
        columnNumber: 5
    }, this);
}
function Eye({ fluid }) {
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
            tFluid: {
                value: fluid.texture
            },
            uResolution: {
                value: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector2"](1, 1)
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
        map,
        fluid
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$fiber__$5b$external$5d$__$2840$react$2d$three$2f$fiber$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$29$__["useFrame"])(({ clock, size })=>{
        const material = materialRef.current;
        if (!material) return;
        material.uniforms.time.value = clock.elapsedTime;
        material.uniforms.tFluid.value = fluid.texture;
        material.uniforms.uResolution.value.set(size.width, size.height);
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
            transparent: true
        }, void 0, false, {
            fileName: "[project]/home-lib/scene/Scene.tsx",
            lineNumber: 166,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/home-lib/scene/Scene.tsx",
        lineNumber: 156,
        columnNumber: 5
    }, this);
}
function Lens() {
    const geometry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$useGeometry$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["useGeometry"])(__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["lens"].geometry);
    const matcap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$useTexture$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["useTexture"])(__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["lens"].matcap);
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
            transparent: true
        }, void 0, false, {
            fileName: "[project]/home-lib/scene/Scene.tsx",
            lineNumber: 205,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/home-lib/scene/Scene.tsx",
        lineNumber: 199,
        columnNumber: 5
    }, this);
}
/** 65,025 points riding the baked splines around the eye. */ function Splines({ fluid }) {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$useSplines$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["useSplineData"])(__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["splines"].data);
    const materialRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const geometry = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$splineData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["createSplineGeometry"])(__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["splines"].count, data.splineCount), [
        data.splineCount
    ]);
    const uniforms = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>({
            time: {
                value: 0
            },
            tSpline: {
                value: data.texture
            },
            tFluid: {
                value: fluid.texture
            },
            uSplineTexSize: {
                value: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$splineData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["SPLINE_TEX_SIZE"]
            },
            uPerSpline: {
                value: data.perSpline
            },
            uColor: {
                value: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Color"](__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["splines"].uniforms.uColor)
            },
            uSize: {
                value: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["splines"].uniforms.uSize
            },
            uLifeFade: {
                value: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector2"](...__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["splines"].uniforms.uLifeFade)
            },
            uThickness: {
                value: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["splines"].thickness
            },
            uLifetime: {
                value: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["splines"].lifetime
            },
            uAlpha: {
                value: 0
            },
            uMouseStrength: {
                value: 1
            }
        }), [
        data,
        fluid
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$fiber__$5b$external$5d$__$2840$react$2d$three$2f$fiber$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$29$__["useFrame"])(({ clock })=>{
        const material = materialRef.current;
        if (!material) return;
        material.uniforms.time.value = clock.elapsedTime;
        material.uniforms.tFluid.value = fluid.texture;
        material.uniforms.uAlpha.value = transitionAt(clock.elapsedTime * 1000, __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["splines"].transition, __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["easeInOutSine"]);
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("points", {
        geometry: geometry,
        position: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["splines"].position,
        scale: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["splines"].scale,
        renderOrder: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["splines"].renderOrder,
        // Real positions live in the spline texture, so the CPU-side bounds are
        // meaningless and three would cull the whole cloud.
        frustumCulled: false,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("shaderMaterial", {
            ref: materialRef,
            vertexShader: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$shaders$2f$landing$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["splineVertex"],
            fragmentShader: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$shaders$2f$landing$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["splineFragment"],
            uniforms: uniforms,
            transparent: true,
            depthTest: false,
            depthWrite: false
        }, void 0, false, {
            fileName: "[project]/home-lib/scene/Scene.tsx",
            lineNumber: 266,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/home-lib/scene/Scene.tsx",
        lineNumber: 257,
        columnNumber: 5
    }, this);
}
/**
 * The environment dust. Spawn points are fixed, so the geometry is built once
 * and the only per-frame work is the pointer push in the vertex shader.
 */ function Floaters({ fluid }) {
    const materialRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const geometry = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>{
        const positions = new Float32Array(__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["floaters"].count * 3);
        const randoms = new Float32Array(__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["floaters"].count * 4);
        for(let i = 0; i < __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["floaters"].count; i++){
            positions[i * 3] = Math.random() * 2 - 1;
            positions[i * 3 + 1] = Math.random() * 2 - 1;
            positions[i * 3 + 2] = Math.random() * 2 - 1;
            for(let k = 0; k < 4; k++)randoms[i * 4 + k] = Math.random();
        }
        const g = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["BufferGeometry"]();
        g.setAttribute('position', new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["BufferAttribute"](positions, 3));
        g.setAttribute('random', new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["BufferAttribute"](randoms, 4));
        return g;
    }, []);
    const uniforms = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>({
            time: {
                value: 0
            },
            tFluid: {
                value: fluid.texture
            },
            uColor: {
                value: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Color"](__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["floaters"].color)
            },
            uSize: {
                value: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["floaters"].uniforms.uSize
            },
            uScale: {
                value: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector2"](...__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["floaters"].uniforms.uScale)
            },
            uAlpha: {
                value: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["floaters"].uniforms.uAlpha
            },
            uMouseStrength: {
                value: 1
            },
            DPR: {
                value: 1
            }
        }), [
        fluid
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$fiber__$5b$external$5d$__$2840$react$2d$three$2f$fiber$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$29$__["useFrame"])(({ clock, viewport })=>{
        const material = materialRef.current;
        if (!material) return;
        material.uniforms.time.value = clock.elapsedTime;
        material.uniforms.tFluid.value = fluid.texture;
        material.uniforms.DPR.value = viewport.dpr;
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("points", {
        geometry: geometry,
        scale: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["floaters"].scale,
        renderOrder: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["floaters"].renderOrder,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("shaderMaterial", {
            ref: materialRef,
            vertexShader: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$shaders$2f$landing$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["floaterVertex"],
            fragmentShader: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$shaders$2f$landing$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["floaterFragment"],
            uniforms: uniforms,
            transparent: true,
            blending: __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["AdditiveBlending"],
            depthTest: false,
            depthWrite: false
        }, void 0, false, {
            fileName: "[project]/home-lib/scene/Scene.tsx",
            lineNumber: 325,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/home-lib/scene/Scene.tsx",
        lineNumber: 324,
        columnNumber: 5
    }, this);
}
/** One quad of the logo stack: same atlas, its own band, depth and alpha. */ function LogoLayer({ layer, fluid }) {
    const map = (0, __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$useTexture$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["useTexture"])(__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["logo"].map);
    const materialRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const uniforms = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>({
            time: {
                value: 0
            },
            tMap: {
                value: map
            },
            tFluid: {
                value: fluid.texture
            },
            uResolution: {
                value: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector2"](1, 1)
            },
            uColor: {
                value: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Color"](__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["logo"].color)
            },
            uClamp: {
                value: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Vector2"](...layer.clamp)
            },
            uAlpha: {
                value: layer.alpha
            },
            uOutline: {
                value: layer.outline
            },
            uFlipClamp: {
                value: 0
            },
            uInvertAnim: {
                value: 0
            },
            uTransition: {
                value: 0
            }
        }), [
        map,
        fluid,
        layer
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$fiber__$5b$external$5d$__$2840$react$2d$three$2f$fiber$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$29$__["useFrame"])(({ clock, size })=>{
        const material = materialRef.current;
        if (!material) return;
        material.uniforms.time.value = clock.elapsedTime;
        material.uniforms.tFluid.value = fluid.texture;
        material.uniforms.uResolution.value.set(size.width, size.height);
        material.uniforms.uTransition.value = transitionAt(clock.elapsedTime * 1000, __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["logo"].transition);
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("mesh", {
        position: [
            __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["logo"].position[0],
            __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["logo"].position[1],
            layer.z
        ],
        scale: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["logo"].scale,
        renderOrder: layer.renderOrder,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("planeGeometry", {
                args: [
                    1,
                    1
                ]
            }, void 0, false, {
                fileName: "[project]/home-lib/scene/Scene.tsx",
                lineNumber: 379,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("shaderMaterial", {
                ref: materialRef,
                vertexShader: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$shaders$2f$landing$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["logoVertex"],
                fragmentShader: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$shaders$2f$landing$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["logoFragment"],
                uniforms: uniforms,
                transparent: true,
                depthWrite: false
            }, void 0, false, {
                fileName: "[project]/home-lib/scene/Scene.tsx",
                lineNumber: 380,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/home-lib/scene/Scene.tsx",
        lineNumber: 374,
        columnNumber: 5
    }, this);
}
function Logo({ fluid }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["logo"].layers.map((layer, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(LogoLayer, {
                layer: layer,
                fluid: fluid
            }, i, false, {
                fileName: "[project]/home-lib/scene/Scene.tsx",
                lineNumber: 396,
                columnNumber: 9
            }, this))
    }, void 0, false);
}
/** The services line under the wordmark. */ function Tagline() {
    const layout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$useFont$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["useText"])(__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["tagline"].font, __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["tagline"].text, __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["tagline"].letterSpacing);
    const atlas = (0, __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$useTexture$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["useTexture"])(__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["tagline"].atlas);
    const uniforms = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>({
            tMap: {
                value: atlas
            },
            uColor: {
                value: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["Color"](__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["tagline"].color)
            },
            uAlpha: {
                value: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["tagline"].alpha
            }
        }), [
        atlas
    ]);
    // The layout is in font units; scale the whole line to its world width.
    const scale = __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["tagline"].width / layout.width;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("mesh", {
        geometry: layout.geometry,
        position: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["tagline"].position,
        scale: scale,
        renderOrder: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["tagline"].renderOrder,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("shaderMaterial", {
            vertexShader: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$shaders$2f$landing$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["textVertex"],
            fragmentShader: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$shaders$2f$landing$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["textFragment"],
            uniforms: uniforms,
            transparent: true,
            depthWrite: false
        }, void 0, false, {
            fileName: "[project]/home-lib/scene/Scene.tsx",
            lineNumber: 426,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/home-lib/scene/Scene.tsx",
        lineNumber: 420,
        columnNumber: 5
    }, this);
}
/**
 * Camera placement, the editor's aspect-driven FOV (which widens the lens on
 * portrait viewports), and the pointer parallax the level's game camera ran.
 * The level's lookAt sits straight down -Z, so the default orientation matches.
 */ function CameraRig() {
    const size = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$fiber__$5b$external$5d$__$2840$react$2d$three$2f$fiber$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$29$__["useThree"])((state)=>state.size);
    const pointer = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$fiber__$5b$external$5d$__$2840$react$2d$three$2f$fiber$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$29$__["useThree"])((state)=>state.pointer);
    const cameraRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$fiber__$5b$external$5d$__$2840$react$2d$three$2f$fiber$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$29$__["useFrame"])(()=>{
        const camera = cameraRef.current;
        if (!camera) return;
        const targetX = __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["camera"].position[0] + pointer.x * __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["parallax"].move[0];
        const targetY = __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["camera"].position[1] + pointer.y * __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["parallax"].move[1];
        camera.position.x += (targetX - camera.position.x) * __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["parallax"].lerp;
        camera.position.y += (targetY - camera.position.y) * __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["parallax"].lerp;
        // Keep aiming at the level's target, so the logo holds its place.
        camera.lookAt(...__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["camera"].lookAt);
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$drei__$5b$external$5d$__$2840$react$2d$three$2f$drei$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$29$__["PerspectiveCamera"], {
        ref: cameraRef,
        makeDefault: true,
        position: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["camera"].position,
        fov: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["camera"].fovForAspect(size.width / size.height),
        near: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["camera"].near,
        far: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["camera"].far
    }, void 0, false, {
        fileName: "[project]/home-lib/scene/Scene.tsx",
        lineNumber: 459,
        columnNumber: 5
    }, this);
}
function Landing() {
    const fluid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$fluid$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["useFluid"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(BackgroundSphere, {}, void 0, false, {
                fileName: "[project]/home-lib/scene/Scene.tsx",
                lineNumber: 475,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Floaters, {
                fluid: fluid
            }, void 0, false, {
                fileName: "[project]/home-lib/scene/Scene.tsx",
                lineNumber: 476,
                columnNumber: 7
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Eye, {
                        fluid: fluid
                    }, void 0, false, {
                        fileName: "[project]/home-lib/scene/Scene.tsx",
                        lineNumber: 486,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Lens, {}, void 0, false, {
                        fileName: "[project]/home-lib/scene/Scene.tsx",
                        lineNumber: 487,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Splines, {
                        fluid: fluid
                    }, void 0, false, {
                        fileName: "[project]/home-lib/scene/Scene.tsx",
                        lineNumber: 488,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/home-lib/scene/Scene.tsx",
                lineNumber: 477,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Logo, {
                fluid: fluid
            }, void 0, false, {
                fileName: "[project]/home-lib/scene/Scene.tsx",
                lineNumber: 490,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Tagline, {}, void 0, false, {
                fileName: "[project]/home-lib/scene/Scene.tsx",
                lineNumber: 491,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$postprocessing__$5b$external$5d$__$2840$react$2d$three$2f$postprocessing$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$29$__["EffectComposer"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$postprocessing__$5b$external$5d$__$2840$react$2d$three$2f$postprocessing$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$29$__["Bloom"], {
                        intensity: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["composite"].bloom.intensity * __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["composite"].bloom.strength,
                        luminanceThreshold: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["composite"].bloom.luminanceThreshold,
                        radius: __TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$config$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["composite"].bloom.radius,
                        mipmapBlur: true
                    }, void 0, false, {
                        fileName: "[project]/home-lib/scene/Scene.tsx",
                        lineNumber: 495,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$home$2d$lib$2f$scene$2f$post$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["Composite"], {
                        fluid: fluid
                    }, void 0, false, {
                        fileName: "[project]/home-lib/scene/Scene.tsx",
                        lineNumber: 501,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/home-lib/scene/Scene.tsx",
                lineNumber: 494,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
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
        // The engine wrote straight to the backbuffer: no filmic curve, and no
        // colour management either. Leaving the renderer on sRGB output makes the
        // post chain re-encode values that were never linear, washing the frame
        // out by ~30/255.
        gl: {
            antialias: true,
            toneMapping: __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["NoToneMapping"],
            outputColorSpace: __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$three$29$__["LinearSRGBColorSpace"]
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(CameraRig, {}, void 0, false, {
                fileName: "[project]/home-lib/scene/Scene.tsx",
                lineNumber: 529,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["Suspense"], {
                fallback: null,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Landing, {}, void 0, false, {
                    fileName: "[project]/home-lib/scene/Scene.tsx",
                    lineNumber: 531,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/home-lib/scene/Scene.tsx",
                lineNumber: 530,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/home-lib/scene/Scene.tsx",
        lineNumber: 520,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/home-lib/scene/Scene.tsx [ssr] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/home-lib/scene/Scene.tsx [ssr] (ecmascript)"));
}),
];

//# sourceMappingURL=home-lib_scene_1f289640._.js.map