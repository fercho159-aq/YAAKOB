"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/* ───────────────────────────────────────────────────────────────
   YAAKOB — Campo de partículas GPU
   ~250k puntos advectados por un campo curl-noise (flujo turbulento),
   con repulsión del cursor, atenuación por profundidad y bloom.
   Toda la animación vive en el vertex shader → corre en la GPU.
   ─────────────────────────────────────────────────────────────── */

const MAX = 260000;

// Ruido simplex 3D (Ashima/McEwan) + curl noise por diferencias finitas.
const NOISE_GLSL = /* glsl */ `
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+1.0*C.xxx; vec3 x2=x0-i2+2.0*C.xxx; vec3 x3=x0-1.0+3.0*C.xxx;
  i=mod(i,289.0);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=1.0/7.0; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
vec3 snoiseVec3(vec3 x){
  return vec3(snoise(x), snoise(x+vec3(123.4,-98.7,55.1)), snoise(x+vec3(-12.3,77.7,-3.4)));
}
vec3 curl(vec3 p){
  const float e=0.12;
  vec3 dx=vec3(e,0.0,0.0), dy=vec3(0.0,e,0.0), dz=vec3(0.0,0.0,e);
  vec3 px0=snoiseVec3(p-dx), px1=snoiseVec3(p+dx);
  vec3 py0=snoiseVec3(p-dy), py1=snoiseVec3(p+dy);
  vec3 pz0=snoiseVec3(p-dz), pz1=snoiseVec3(p+dz);
  float x=(py1.z-py0.z)-(pz1.y-pz0.y);
  float y=(pz1.x-pz0.x)-(px1.z-px0.z);
  float z=(px1.y-px0.y)-(py1.x-py0.x);
  return normalize(vec3(x,y,z)/(2.0*e)+1e-6);
}
`;

const VERT = /* glsl */ `
uniform float uTime;
uniform vec2  uMouse;     // -1..1
uniform float uMouseAmt;
varying float vGlow;
varying float vDepth;
varying float vRnd;
${NOISE_GLSL}
void main(){
  vec3 seed = position;                       // 0..1 por partícula
  vRnd = seed.z;
  // relleno parejo y alto para que NO se formen bandas ancladas a la pantalla
  vec3 base = (seed - 0.5) * vec3(66.0, 46.0, 24.0);
  float t = uTime * 0.05;

  // advección por curl-noise (suave) → flujo orgánico sin grandes vacíos
  vec3 p = base;
  vec3 c1 = curl(p*0.05 + vec3(0.0, t*0.35, t));
  p += c1 * 2.6;
  vec3 c2 = curl(p*0.12 - vec3(t*0.5, 0.0, t*1.2));
  p += c2 * 1.0;

  // remolino global lento
  float a = t*0.25;
  mat2 rot = mat2(cos(a),-sin(a),sin(a),cos(a));
  p.xy = rot * p.xy;

  // repulsión del cursor
  vec2 m = uMouse * vec2(20.0, 12.0);
  vec2 d = p.xy - m;
  float dl = length(d);
  p.xy += normalize(d+1e-4) * (uMouseAmt * 6.0 / (1.0 + dl*dl*0.04));

  vGlow = clamp(length(c1)*0.7 + length(c2)*0.3, 0.0, 1.5);

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vDepth = -mv.z;
  gl_PointSize = (seed.z*1.8 + 0.35) * (62.0 / max(vDepth, 0.1));
  gl_Position = projectionMatrix * mv;
}
`;

const FRAG = /* glsl */ `
precision highp float;
uniform vec3  uAccent;     // 0..1
uniform float uMonoMix;    // 0 mono · 1 acento
uniform float uOpacity;
varying float vGlow;
varying float vDepth;
varying float vRnd;
void main(){
  vec2 uv = gl_PointCoord - 0.5;
  float d2 = dot(uv, uv);
  float a = exp(-d2 * 6.5);
  if (a < 0.02) discard;

  float g = clamp(vGlow, 0.0, 1.0);
  vec3 mono = mix(vec3(0.14,0.14,0.15), vec3(0.80), g);
  vec3 acc  = mix(uAccent*0.30, uAccent, g);
  vec3 col  = mix(mono, acc, uMonoMix);
  col += pow(g, 3.5) * 0.22;                   // núcleos brillantes (alimentan el bloom)

  float fade = smoothstep(52.0, 4.0, vDepth);  // niebla por profundidad
  float twinkle = 0.7 + 0.3 * sin(vRnd*90.0 + vGlow*7.0);
  gl_FragColor = vec4(col, a * fade * uOpacity * twinkle);
}
`;

function FlowField({
  density, accent, mono,
}: { density: number; accent: [number, number, number]; mono: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { camera } = useThree();
  const mouse = useRef(new THREE.Vector2(0, 0));
  const mouseAmt = useRef(0);

  const positions = useMemo(() => {
    const arr = new Float32Array(MAX * 3);
    for (let i = 0; i < arr.length; i++) arr[i] = Math.random();
    return arr;
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMouseAmt: { value: 0 },
      uAccent: { value: new THREE.Color(accent[0] / 255, accent[1] / 255, accent[2] / 255) },
      uMonoMix: { value: mono ? 0 : 1 },
      uOpacity: { value: 0.10 },
    }),
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  // densidad → drawRange
  const count = Math.min(MAX, Math.max(8000, Math.floor((MAX * density) / 1.6)));
  if (ref.current) ref.current.geometry.setDrawRange(0, count);

  // accent / mono en vivo
  if (matRef.current) {
    (matRef.current.uniforms.uAccent.value as THREE.Color).setRGB(accent[0] / 255, accent[1] / 255, accent[2] / 255);
    matRef.current.uniforms.uMonoMix.value = mono ? 0 : 1;
  }

  useFrame((state, delta) => {
    const m = matRef.current;
    if (!m) return;
    m.uniforms.uTime.value += delta;
    // suaviza el cursor
    const px = state.pointer.x, py = state.pointer.y;
    mouse.current.x += (px - mouse.current.x) * 0.05;
    mouse.current.y += (py - mouse.current.y) * 0.05;
    const target = state.pointer.x === 0 && state.pointer.y === 0 ? 0 : 1;
    mouseAmt.current += (target - mouseAmt.current) * 0.04;
    m.uniforms.uMouse.value.copy(mouse.current);
    m.uniforms.uMouseAmt.value = mouseAmt.current;
    // parallax sutil de cámara
    camera.position.x += (px * 1.6 - camera.position.x) * 0.03;
    camera.position.y += (py * 1.0 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        depthTest={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ParticlesGL({
  density, accent, mono,
}: { density: number; accent: [number, number, number]; mono: boolean }) {
  return (
    <Canvas
      className="bg-particles"
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 26], fov: 55 }}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", background: "transparent" }}
    >
      <FlowField density={density} accent={accent} mono={mono} />
      <EffectComposer>
        <Bloom intensity={0.28} luminanceThreshold={0.5} luminanceSmoothing={0.8} mipmapBlur radius={0.38} />
      </EffectComposer>
    </Canvas>
  );
}
