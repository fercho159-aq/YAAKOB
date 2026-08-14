"use client";

import React, { useEffect, useState, useRef, useMemo, Suspense, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import "./start.css";

// ─── Attractor particle system ──────────────────────────────────
const PARTICLE_COUNT = 2 ** 17; // 131072

const attractorNoiseGLSL = `
  vec3 permute3(vec3 x){return mod(((x*34.0)+1.0)*x,289.0);}
  float snoise2(vec2 v){
    const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
    vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);
    vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
    vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod(i,289.0);
    vec3 p=permute3(permute3(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
    vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
    m=m*m;m=m*m;
    vec3 x3=2.0*fract(p*C.www)-1.0;vec3 h=abs(x3)-0.5;vec3 ox=floor(x3+0.5);vec3 a0=x3-ox;
    m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
    vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;
    return 130.0*dot(m,g);
  }
`;

function AttractorParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, seeds } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const sds = new Float32Array(PARTICLE_COUNT * 3); // 3 random seeds per particle
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      // Start in a compressed volume
      pos[i3] = (Math.random() - 0.5) * 5;
      pos[i3 + 1] = (Math.random() - 0.5) * 0.3;
      pos[i3 + 2] = (Math.random() - 0.5) * 5;
      sds[i3] = Math.random();
      sds[i3 + 1] = Math.random();
      sds[i3 + 2] = Math.random();
    }
    return { positions: pos, seeds: sds };
  }, []);

  const vertexShader = `
    uniform float uTime;
    uniform vec3 uAttractors[3];
    uniform vec3 uAttractorAxes[3];
    attribute vec3 aSeed;
    varying float vSpeed;
    varying float vLife;
    varying float vDistCenter;
    ${attractorNoiseGLSL}

    void main() {
      float t = uTime;
      float s1 = aSeed.x;
      float s2 = aSeed.y;
      float s3 = aSeed.z;

      // Which attractor this particle orbits (0, 1, or 2)
      int att = int(floor(s1 * 3.0));
      vec3 center = uAttractors[att];
      vec3 axis = uAttractorAxes[att];

      // Orbital parameters unique to each particle
      float orbitRadius = 1.0 + s2 * 3.0;
      float orbitSpeed = 0.3 + s3 * 0.9;
      float phase = s1 * 6.2831 + s2 * 3.14159;
      float tilt = (s3 - 0.5) * 1.6;

      // Varying orbit over time
      float radiusPulse = orbitRadius + sin(t * 0.3 + phase) * 0.6 * s2;
      float angle = t * orbitSpeed + phase;

      // Create orbital position around attractor
      // Build a frame from the axis
      vec3 up = axis;
      vec3 right = normalize(cross(up, vec3(0.0, 0.0, 1.0) + 0.001));
      vec3 forward = cross(right, up);

      vec3 orbitPos = center
        + right * cos(angle) * radiusPulse
        + forward * sin(angle) * radiusPulse
        + up * tilt * sin(t * 0.5 + phase * 2.0) * 0.6;

      // Add noise perturbation for organic feel
      float n1 = snoise2(vec2(s1 * 10.0 + t * 0.15, s2 * 10.0));
      float n2 = snoise2(vec2(s2 * 10.0, s3 * 10.0 + t * 0.12));
      float n3 = snoise2(vec2(s3 * 10.0 + t * 0.1, s1 * 10.0));
      orbitPos += vec3(n1, n2, n3) * 0.6;

      // Occasional particle "migration" between attractors
      float migrate = smoothstep(0.92, 1.0, sin(t * 0.2 + phase * 5.0));
      int nextAtt = int(mod(float(att) + 1.0, 3.0));
      vec3 nextCenter = uAttractors[nextAtt];
      orbitPos = mix(orbitPos, nextCenter + vec3(n1, n2, n3) * 0.5, migrate * 0.4);

      // Speed proxy for coloring
      vSpeed = orbitSpeed * radiusPulse + migrate * 2.0;
      vLife = s1;
      vDistCenter = length(orbitPos);

      vec4 mvPos = modelViewMatrix * vec4(orbitPos, 1.0);

      // Size: closer = bigger, with random variation
      float baseSize = (4.5 + s3 * 14.0);
      gl_PointSize = baseSize * (1.0 / -mvPos.z);
      gl_Position = projectionMatrix * mvPos;
    }
  `;

  const fragmentShader = `
    varying float vSpeed;
    varying float vLife;
    varying float vDistCenter;

    void main() {
      float d = length(gl_PointCoord - 0.5);
      float alpha = 1.0 - smoothstep(0.15, 0.5, d);
      if (alpha < 0.01) discard;

      // Monochrome palette
      vec3 cDeep  = vec3(0.12, 0.12, 0.12);   // deep black
      vec3 cMid   = vec3(0.35, 0.35, 0.35);    // mid gray
      vec3 cBright= vec3(0.70, 0.70, 0.70);    // light gray
      vec3 cWhite = vec3(0.95, 0.95, 0.95);    // near-white

      float t = clamp(vSpeed * 0.4, 0.0, 1.0);
      vec3 col;
      if (t < 0.33) {
        col = mix(cDeep, cMid, t / 0.33);
      } else if (t < 0.66) {
        col = mix(cMid, cBright, (t - 0.33) / 0.33);
      } else {
        col = mix(cBright, cWhite, (t - 0.66) / 0.34);
      }

      // Subtle flicker
      col += 0.12 * sin(vLife * 100.0 + vSpeed * 5.0);

      // Subtle core glow
      float core = 1.0 - smoothstep(0.0, 0.2, d);
      col += core * 0.15;

      float a = alpha * (0.4 + vLife * 0.4) * 0.8;
      gl_FragColor = vec4(col, a);
    }
  `;

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uAttractors: {
      value: [
        new THREE.Vector3(-3.0, -0.5, 0.5),
        new THREE.Vector3(2.8, 0.3, -1.5),
        new THREE.Vector3(0.5, -1.0, 2.5),
      ],
    },
    uAttractorAxes: {
      value: [
        new THREE.Vector3(0.1, 1, 0.2).normalize(),
        new THREE.Vector3(-0.3, 1, 0.1).normalize(),
        new THREE.Vector3(0.2, 1, -0.4).normalize(),
      ],
    },
  }), []);

  useFrame((state) => {
    if (pointsRef.current) {
      const mat = pointsRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 3]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ─── Mouse-driven camera drift ──────────────────────────────────
function CameraDrift() {
  const { camera, gl } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  const onMove = useCallback((e: PointerEvent) => {
    const rect = gl.domElement.getBoundingClientRect();
    mouse.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    mouse.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  }, [gl]);

  useEffect(() => {
    gl.domElement.addEventListener("pointermove", onMove);
    return () => gl.domElement.removeEventListener("pointermove", onMove);
  }, [gl, onMove]);

  useFrame(() => {
    target.current.x += (mouse.current.x - target.current.x) * 0.02;
    target.current.y += (mouse.current.y - target.current.y) * 0.02;
    camera.position.x = target.current.x * 0.5;
    camera.position.y = 2.5 + target.current.y * -0.3;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── Floating Hebrew letters ───────────────────────────────────
const FLOAT_LETTERS = ["נ", "ח", "ל", "פ", "כ", "ע", "ם", "ד", "ר", "ב", "א", "י"];

function HebrewSplash({ onDone }: { onDone: () => void }) {
  const [splashPhase, setSplashPhase] = useState(0);

  useEffect(() => {
    const t0 = setTimeout(() => setSplashPhase(1), 100);   // text appears
    const t1 = setTimeout(() => setSplashPhase(2), 4500);  // fade out
    const t2 = setTimeout(() => onDone(), 5500);            // remove
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div className={`splash splash--phase-${splashPhase}`}>
      {/* Large background glyph */}
      <div className="splash-bg-glyph">מ</div>

      {/* Corner markers */}
      <div className="splash-corner splash-corner--tl" />
      <div className="splash-corner splash-corner--tr" />
      <div className="splash-corner splash-corner--bl" />
      <div className="splash-corner splash-corner--br" />

      {/* Floating letters */}
      {FLOAT_LETTERS.map((letter, i) => (
        <span
          key={i}
          className="splash-float"
          style={{
            top: `${12 + (i * 7) % 76}%`,
            left: `${8 + ((i * 13 + 5) % 84)}%`,
            animationDelay: `${i * 0.18}s`,
            animationDuration: `${3 + (i % 3)}s`,
          }}
        >
          {letter}
        </span>
      ))}

      {/* Center text — Psalm */}
      <div className="splash-center">
        <p className="splash-psalm-line">אֱלֹהִים יְחָנֵּנוּ וִיבָרְכֵנוּ יָאֵר פָּנָיו אִתָּנוּ סֶלָה</p>
        <p className="splash-psalm-line">לָדַעַת בָּאָרֶץ דַּרְכֶּךָ בְּכָל גּוֹיִם יְשׁוּעָתֶךָ</p>
        <p className="splash-psalm-line">יוֹדוּךָ עַמִּים אֱלֹהִים יוֹדוּךָ עַמִּים כֻּלָּם</p>
      </div>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────
export default function StartPage() {
  const [showSplash, setShowSplash] = useState(true);
  const [phase, setPhase] = useState(0);
  const [showDownload, setShowDownload] = useState(false);

  const handleSplashDone = useCallback(() => {
    setShowSplash(false);
    setTimeout(() => setPhase(1), 300);
    setTimeout(() => setPhase(2), 1800);
  }, []);

  return (
    <div className="sp">
      {/* Hebrew splash intro */}
      {showSplash && <HebrewSplash onDone={handleSplashDone} />}

      {/* Three.js attractor particles background */}
      <Canvas
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        className="sp-canvas"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background: "#0a0a0a",
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 2, 6]} fov={55} />
        <CameraDrift />
        <Suspense fallback={null}>
          <AttractorParticles />
        </Suspense>
      </Canvas>

      {/* Radial vignette */}
      <div className="sp-vignette" />

      {/* Corner hex accents */}
      <svg className="sp-hex sp-hex--tl" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M60 5 L110 30 L110 80 L60 105 L10 80 L10 30 Z" stroke="rgba(180,180,180,0.08)" strokeWidth="0.5"/>
        <path d="M60 20 L95 38 L95 72 L60 90 L25 72 L25 38 Z" stroke="rgba(180,180,180,0.05)" strokeWidth="0.5"/>
      </svg>
      <svg className="sp-hex sp-hex--br" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M60 5 L110 30 L110 80 L60 105 L10 80 L10 30 Z" stroke="rgba(180,180,180,0.06)" strokeWidth="0.5"/>
      </svg>

      {/* Content */}
      <div className={`sp-content sp-phase-${phase}`}>
        <h1 className="sp-title" data-text="COMIENZA AHORA">
          <span className="sp-title__line">COMIENZA</span>
          <span className="sp-title__line">AHORA</span>
        </h1>

        <div className="sp-buttons">
          <button onClick={() => setShowDownload(true)} className="sp-btn">
            <span className="sp-btn__text">COMIENZA AHORA</span>
            <span className="sp-btn__border" />
          </button>
        </div>
      </div>

      {/* Download modal */}
      {showDownload && (
        <div className="sp-modal-overlay" onClick={() => setShowDownload(false)}>
          <div className="sp-modal" onClick={(e) => e.stopPropagation()}>
            <button className="sp-modal__close" onClick={() => setShowDownload(false)}>✕</button>
            <h2 className="sp-modal__title">DESCARGA LA APP</h2>
            <p className="sp-modal__sub">Elige tu plataforma</p>
            <div className="sp-modal__links">
              <a href="https://apps.apple.com/mx/app/yaakob/id6758861392" target="_blank" rel="noopener noreferrer" className="sp-modal__btn">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                <span>App Store</span>
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.fernandotrejo.consultora&hl=es_MX" target="_blank" rel="noopener noreferrer" className="sp-modal__btn">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 010 1.38l-2.302 2.302L15.092 12l2.606-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/></svg>
                <span>Google Play</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
