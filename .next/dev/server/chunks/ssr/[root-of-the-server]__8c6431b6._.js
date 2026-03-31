module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/app/apps/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AppsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-ssr] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-ssr] (ecmascript) <export C as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$PerspectiveCamera$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/PerspectiveCamera.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/postprocessing/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$postprocessing$2f$build$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/postprocessing/build/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
// ─── Mouse world position ─────────────────────────────────────────
const mouseWorld = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](0, -999, 0);
function MouseTracker() {
    const { camera, gl } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])();
    const raycaster = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Raycaster"](), []);
    const plane = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Plane"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0), 3), []);
    const ndc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"](), []);
    const onMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        const rect = gl.domElement.getBoundingClientRect();
        ndc.x = (e.clientX - rect.left) / rect.width * 2 - 1;
        ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(ndc, camera);
        const target = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]();
        if (raycaster.ray.intersectPlane(plane, target)) {
            mouseWorld.copy(target);
        }
    }, [
        camera,
        gl,
        raycaster,
        ndc,
        plane
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        gl.domElement.addEventListener("pointermove", onMove);
        return ()=>gl.domElement.removeEventListener("pointermove", onMove);
    }, [
        gl,
        onMove
    ]);
    return null;
}
// ─── Noise GLSL ───────────────────────────────────────────────────
const noiseGLSL = `
  vec3 permute(vec3 x){return mod(((x*34.0)+1.0)*x,289.0);}
  float snoise(vec2 v){
    const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
    vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);vec2 i1;
    i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
    vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod(i,289.0);
    vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
    vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
    m=m*m;m=m*m;
    vec3 x=2.0*fract(p*C.www)-1.0;vec3 h=abs(x)-0.5;vec3 ox=floor(x+0.5);vec3 a0=x-ox;
    m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
    vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;
    return 130.0*dot(m,g);
  }
`;
// ─── Shared explosion state ──────────────────────────────────────
const explosionState = {
    value: 0
};
// ─── Terrain ──────────────────────────────────────────────────────
function Terrain() {
    const pointsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { positions, randoms } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const geo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PlaneGeometry"](70, 70, 600, 600);
        const pos = geo.attributes.position.array;
        const count = pos.length / 3;
        const rands = new Float32Array(count);
        for(let i = 0; i < count; i++)rands[i] = Math.random();
        return {
            positions: pos,
            randoms: rands
        };
    }, []);
    const vertexShader = `
    uniform float uTime;
    uniform vec3 uMouse;
    uniform float uExplosion;
    attribute float aRandom;
    varying float vElevation;
    varying float vMouseProximity;
    varying float vEdgeFade;
    varying float vDepth;
    varying float vExplosion;
    ${noiseGLSL}
    void main(){
      vec3 pos = position;
      vec4 mp = modelMatrix * vec4(pos, 1.0);
      float dc = length(pos.xy);

      // large flowing waves (slow, organic)
      float t = uTime * 0.4;
      float wave1 = snoise(mp.xz * 0.08 + t * 0.3) * 2.0;
      float wave2 = snoise(mp.xz * 0.15 + vec2(t * 0.2, -t * 0.15)) * 1.2;
      float wave3 = snoise(mp.xz * 0.3 + vec2(-t * 0.1, t * 0.25)) * 0.5;

      // fine detail ripples
      float detail1 = snoise(mp.xz * 0.6 + t * 0.5) * 0.25;
      float detail2 = snoise(mp.xz * 1.2 + vec2(t * 0.3, t * 0.4)) * 0.12;

      // gentle concentric pulse from center
      float pulse = sin(dc * 0.4 - uTime * 0.8) * 0.4 * (1.0 - smoothstep(10.0, 30.0, dc));

      float el = wave1 + wave2 + wave3 + detail1 + detail2 + pulse;

      // edge fade
      float edgeDist = max(abs(pos.x), abs(pos.y));
      vEdgeFade = 1.0 - smoothstep(25.0, 35.0, edgeDist);

      // mouse interaction
      vec2 toMouse = uMouse.xz - mp.xz;
      float dm = length(toMouse);
      float gravity = smoothstep(4.0, 0.2, dm);
      vMouseProximity = gravity;

      float seed = aRandom * 6.2831;
      vec2 pullDir = normalize(toMouse + 0.001);
      mp.xz += pullDir * gravity * 0.6;

      float scatterAngle = seed + uTime * 2.0 + dm * 1.5;
      vec2 scatter = vec2(cos(scatterAngle), sin(scatterAngle));
      mp.xz += scatter * gravity * 1.8 * (0.5 + aRandom);

      float vertScatter = sin(seed * 3.7 + uTime * 4.0) * gravity * 1.5 * (0.3 + aRandom);
      el += vertScatter;
      el += gravity * gravity * 1.2;

      // ─── EXPLOSION ─────────────────────────────────────────
      vExplosion = uExplosion;
      if (uExplosion > 0.0) {
        // Eased explosion curve (starts slow, accelerates violently)
        float ex = uExplosion * uExplosion * uExplosion;
        float ex2 = uExplosion * uExplosion;

        // Each particle gets a unique explosion direction
        float angle1 = seed * 2.7 + aRandom * 19.3;
        float angle2 = seed * 4.1 + aRandom * 7.7;
        vec3 explodeDir = normalize(vec3(
          cos(angle1) * sin(angle2),
          sin(angle1) * 0.6 + 0.4,
          cos(angle2) * sin(angle1)
        ));

        // Radial burst from center + random scatter
        float burstForce = 60.0 * ex * (0.3 + aRandom * 0.7);
        mp.xyz += explodeDir * burstForce;

        // Chaotic spin
        float spinSpeed = uTime * (3.0 + aRandom * 8.0);
        mp.x += sin(spinSpeed + seed) * ex2 * 8.0;
        mp.z += cos(spinSpeed + seed * 1.3) * ex2 * 8.0;
        mp.y += sin(spinSpeed * 0.7 + seed * 2.1) * ex2 * 12.0;

        // Override elevation with upward surge
        el += ex * 20.0 * (0.5 + aRandom);

        // Disable edge fade during explosion
        vEdgeFade = mix(vEdgeFade, 1.0, ex2);
      }

      mp.y += el;
      vElevation = el;
      vDepth = -mp.z;

      vec4 vp = viewMatrix * mp;

      // Point size grows during explosion
      float baseSize = 18.0 * (1.0 / -vp.z);
      float explosionSize = baseSize * (1.0 + uExplosion * uExplosion * 6.0);
      gl_PointSize = mix(baseSize, explosionSize, step(0.001, uExplosion));
      gl_Position = projectionMatrix * vp;
    }`;
    const fragmentShader = `
    varying float vElevation;
    varying float vMouseProximity;
    varying float vEdgeFade;
    varying float vDepth;
    varying float vExplosion;
    void main(){
      if(vEdgeFade < 0.01 && vExplosion < 0.01) discard;

      float d = distance(gl_PointCoord, vec2(0.5));
      // Softer particles during explosion
      float softness = mix(0.5, 0.7, vExplosion);
      float alpha = 1.0 - smoothstep(0.25, softness, d);
      if(alpha < 0.01) discard;

      // monochrome elevation palette
      vec3 cDeep = vec3(0.08, 0.08, 0.08);
      vec3 cMid = vec3(0.30, 0.30, 0.30);
      vec3 cPeak = vec3(0.65, 0.65, 0.65);
      vec3 cBright = vec3(0.90, 0.90, 0.90);

      float elNorm = clamp((vElevation + 2.0) * 0.22, 0.0, 1.0);
      vec3 col;
      if(elNorm < 0.3) {
        col = mix(cDeep, cMid, elNorm / 0.3);
      } else if(elNorm < 0.7) {
        col = mix(cMid, cPeak, (elNorm - 0.3) / 0.4);
      } else {
        col = mix(cPeak, cBright, (elNorm - 0.7) / 0.3);
      }

      // subtle depth fog
      float fog = 1.0 - smoothstep(5.0, 50.0, vDepth) * 0.6;

      // mouse glow
      col = mix(col, vec3(0.95, 0.95, 0.95), vMouseProximity * 0.4);

      // ─── EXPLOSION COLOR ───────────────────────────────────
      if (vExplosion > 0.0) {
        float ex = vExplosion * vExplosion;
        // Shift to brilliant white
        vec3 explosionColor = vec3(0.95, 0.95, 0.95);
        col = mix(col, explosionColor, ex);
        // Boost brightness dramatically
        col += ex * 0.6;
        // Override fog
        fog = mix(fog, 1.0, ex);
      }

      float a = alpha * vEdgeFade * fog * (0.7 + elNorm * 0.3);

      // Boost alpha during explosion
      if (vExplosion > 0.0) {
        a = mix(a, alpha * 0.9, vExplosion * vExplosion);
      }

      gl_FragColor = vec4(col, a);
    }`;
    const uniforms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            uTime: {
                value: 0
            },
            uMouse: {
                value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](0, -999, 0)
            },
            uExplosion: {
                value: 0
            }
        }), []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])((state)=>{
        if (pointsRef.current) {
            const mat = pointsRef.current.material;
            mat.uniforms.uTime.value = state.clock.getElapsedTime();
            mat.uniforms.uMouse.value.copy(mouseWorld);
            mat.uniforms.uExplosion.value = explosionState.value;
        }
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("points", {
        ref: pointsRef,
        rotation: [
            -Math.PI / 2,
            0,
            0
        ],
        position: [
            0,
            -3,
            -8
        ],
        renderOrder: 0,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("bufferGeometry", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("bufferAttribute", {
                        attach: "attributes-position",
                        args: [
                            positions,
                            3
                        ]
                    }, void 0, false, {
                        fileName: "[project]/app/apps/page.tsx",
                        lineNumber: 248,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("bufferAttribute", {
                        attach: "attributes-aRandom",
                        args: [
                            randoms,
                            1
                        ]
                    }, void 0, false, {
                        fileName: "[project]/app/apps/page.tsx",
                        lineNumber: 249,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/apps/page.tsx",
                lineNumber: 247,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("shaderMaterial", {
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                uniforms: uniforms,
                transparent: true,
                depthWrite: false,
                blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdditiveBlending"]
            }, void 0, false, {
                fileName: "[project]/app/apps/page.tsx",
                lineNumber: 251,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/apps/page.tsx",
        lineNumber: 246,
        columnNumber: 5
    }, this);
}
// ─── Explosion Animator ──────────────────────────────────────────
function ExplosionAnimator({ trigger }) {
    const startTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const DURATION = 1.4; // seconds for the explosion ramp
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])((state)=>{
        if (trigger) {
            if (startTime.current === null) {
                startTime.current = state.clock.getElapsedTime();
            }
            const elapsed = state.clock.getElapsedTime() - startTime.current;
            const progress = Math.min(elapsed / DURATION, 1.0);
            explosionState.value = progress;
        }
    });
    return null;
}
function AppsPage() {
    const [exploding, setExploding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [whiteout, setWhiteout] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Trigger explosion at 4 seconds
        const explosionTimer = setTimeout(()=>{
            setExploding(true);
        }, 4000);
        // Start whiteout flash at 4.8 seconds
        const whiteoutTimer = setTimeout(()=>{
            setWhiteout(true);
        }, 4800);
        // Navigate at 5.5 seconds
        const navTimer = setTimeout(()=>{
            window.location.href = '/start';
        }, 5500);
        return ()=>{
            clearTimeout(explosionTimer);
            clearTimeout(whiteoutTimer);
            clearTimeout(navTimer);
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
                dpr: [
                    1,
                    2
                ],
                gl: {
                    alpha: true,
                    antialias: true
                },
                style: {
                    background: "#050505",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$PerspectiveCamera$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PerspectiveCamera"], {
                        makeDefault: true,
                        position: [
                            0,
                            2.5,
                            12
                        ],
                        fov: 55
                    }, void 0, false, {
                        fileName: "[project]/app/apps/page.tsx",
                        lineNumber: 317,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MouseTracker, {}, void 0, false, {
                        fileName: "[project]/app/apps/page.tsx",
                        lineNumber: 318,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ExplosionAnimator, {
                        trigger: exploding
                    }, void 0, false, {
                        fileName: "[project]/app/apps/page.tsx",
                        lineNumber: 319,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
                        fallback: null,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Terrain, {}, void 0, false, {
                            fileName: "[project]/app/apps/page.tsx",
                            lineNumber: 321,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/apps/page.tsx",
                        lineNumber: 320,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EffectComposer"], {
                        enableNormalPass: false,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Noise"], {
                            opacity: 0.03,
                            blendFunction: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$postprocessing$2f$build$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BlendFunction"].OVERLAY
                        }, void 0, false, {
                            fileName: "[project]/app/apps/page.tsx",
                            lineNumber: 324,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/apps/page.tsx",
                        lineNumber: 323,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/apps/page.tsx",
                lineNumber: 312,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 10,
                    pointerEvents: "none",
                    backgroundColor: "#b0b0b0",
                    opacity: whiteout ? 1 : 0,
                    transition: "opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)"
                }
            }, void 0, false, {
                fileName: "[project]/app/apps/page.tsx",
                lineNumber: 329,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8c6431b6._.js.map