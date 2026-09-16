"use client";

import React, { useEffect, useState, useRef, useMemo, Suspense, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import Link from "next/link";
import { StartHeader } from "./StartHeader";
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

// ─── Pasarela circular de la app (presentación del cliente) ────
// Orden y títulos de las trece pantallas, tal como los entregó el cliente.
const SLIDES = [
  "YAAKOB",
  "INE",
  "Datos Fiscales",
  "Registro RFC",
  "Bienvenido",
  "Chat Clientes",
  "Requerimiento SAT",
  "Recargos y Actualizaciones",
  "Calculadora RFC",
  "Diario Oficial",
  "Marcos Legales",
  "Cita Presencial",
  "Próximamente",
].map((title, i) => ({
  title,
  src: `/app/pasarela/${String(i + 1).padStart(2, "0")}.webp`,
}));

const SLIDE_COUNT = SLIDES.length;
const ANGLE_STEP = 360 / SLIDE_COUNT;
const AUTOPLAY_MS = 4800;
const MOBILE_BREAKPOINT = 760;

const modulo = (value: number) => ((value % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT;

/** Distancia con signo (−6…6) entre una diapositiva y la activa. */
function signedDistance(index: number, active: number) {
  let value = index - active;
  if (value > SLIDE_COUNT / 2) value -= SLIDE_COUNT;
  if (value < -SLIDE_COUNT / 2) value += SLIDE_COUNT;
  return value;
}

type SlideVars = React.CSSProperties & Record<`--${string}`, string | number>;

function PhoneCarousel({ onEnlarge, frozen }: { onEnlarge: (index: number) => void; frozen: boolean }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(0);
  const [size, setSize] = useState({ width: 0, height: 0, mobile: false });
  const [paused, setPaused] = useState(false);
  const drag = useRef<{ x: number; moved: boolean } | null>(null);
  const wheelLock = useRef(false);
  const lastTap = useRef(0);

  const active = modulo(position);

  // Medida del carrusel: define el radio de la órbita y el desplazamiento vertical.
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const measure = () =>
      setSize({ width: el.clientWidth, height: el.clientHeight, mobile: window.innerWidth <= MOBILE_BREAKPOINT });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener("resize", measure, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const step = useCallback((amount: number) => setPosition((p) => p + amount), []);

  const goTo = useCallback(
    (index: number) => setPosition((p) => p + signedDistance(index, modulo(p))),
    []
  );

  // Avance automático; se reinicia con cada interacción (cambia `position`)
  // y se detiene mientras hay un modal abierto o se arrastra.
  useEffect(() => {
    if (paused || frozen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = window.setInterval(() => step(1), AUTOPLAY_MS);
    const onVisibility = () => {
      window.clearInterval(timer);
      if (!document.hidden) timer = window.setInterval(() => step(1), AUTOPLAY_MS);
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [paused, frozen, position, step]);

  // Flechas del teclado.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (paused || frozen) return;
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paused, frozen, step]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    drag.current = { x: e.clientX, moved: false };
    setPaused(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (drag.current && Math.abs(e.clientX - drag.current.x) > 10) drag.current.moved = true;
  };
  // Con el puntero capturado los eventos apuntan al carrusel, no al teléfono:
  // se resuelve el elemento bajo el cursor por coordenadas.
  const hitsCenter = (x: number, y: number) =>
    Boolean(document.elementFromPoint(x, y)?.closest(".sp-slide.is-center"));

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (drag.current) {
      const delta = e.clientX - drag.current.x;
      const onCenter = hitsCenter(e.clientX, e.clientY);
      if (Math.abs(delta) > 40) step(delta < 0 ? 1 : -1);
      else if (!drag.current.moved && e.pointerType === "touch" && onCenter) {
        const now = e.timeStamp;
        if (now - lastTap.current < 330) {
          onEnlarge(active);
          lastTap.current = 0;
        } else lastTap.current = now;
      }
    }
    drag.current = null;
    setPaused(false);
  };
  const onPointerCancel = () => {
    drag.current = null;
    setPaused(false);
  };
  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (wheelLock.current || Math.abs(e.deltaX) + Math.abs(e.deltaY) < 12) return;
    wheelLock.current = true;
    step((e.deltaX || e.deltaY) > 0 ? 1 : -1);
    window.setTimeout(() => {
      wheelLock.current = false;
    }, 760);
  };
  const onDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hitsCenter(e.clientX, e.clientY)) onEnlarge(active);
  };

  const { width, height, mobile } = size;
  const radius = mobile ? width * 1.05 : Math.min(width * 0.43, 660);

  return (
    <>
      <div
        ref={carouselRef}
        className="sp-carousel"
        role="region"
        aria-roledescription="carrusel"
        aria-label="Funciones de la aplicación YAAKOB"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onWheel={onWheel}
        onDoubleClick={onDoubleClick}
      >
        <div className="sp-slides">
          {SLIDES.map((slide, index) => {
            const relative = signedDistance(index, active);
            const absolute = Math.abs(relative);
            const radians = ((index - position) * ANGLE_STEP * Math.PI) / 180;
            // En teléfono el carrusel ocupa justo el alto disponible: sin
            // desplazamiento vertical para que no invada el título.
            const faceY = mobile || absolute === 0 ? 0 : -height * 0.102;
            const vars: SlideVars = {
              "--orbit-x": `${Math.sin(radians) * radius}px`,
              "--orbit-z": `${(Math.cos(radians) - 1) * radius}px`,
              "--face-scale": absolute === 0 ? 1 : 0.72,
              "--face-y": `${faceY}px`,
              "--opacity": absolute <= 1 ? 1 : 0,
              "--z": absolute === 0 ? 30 : absolute === 1 ? 20 : 1,
            };
            return (
              <article
                key={slide.src}
                className={`sp-slide${relative === 0 ? " is-center" : ""}`}
                style={vars}
                aria-hidden={relative !== 0}
              >
                <div className="sp-orbit-face">
                  <div className="sp-phone">
                    {/* Carga progresiva: sólo las pantallas a dos pasos de la activa. */}
                    {absolute <= 2 && (
                      <img
                        src={slide.src}
                        alt={slide.title}
                        draggable={false}
                        decoding="async"
                        fetchPriority={index === 0 ? "high" : "auto"}
                      />
                    )}
                  </div>
                  <div className="sp-disc" aria-hidden="true">
                    <i />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="sp-nav">
        <button type="button" className="sp-arrow" aria-label="Función anterior" onClick={() => step(-1)}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <div className="sp-caption" aria-live="polite">
          <strong>{SLIDES[active].title}</strong>
          <span>
            <b>{String(active + 1).padStart(2, "0")}</b> / {SLIDE_COUNT}
          </span>
        </div>
        <div className="sp-dots" aria-label="Seleccionar función">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              className={`sp-dot${index === active ? " active" : ""}`}
              aria-label={`Ver ${slide.title}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
        <button type="button" className="sp-arrow" aria-label="Siguiente función" onClick={() => step(1)}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
        </button>
      </div>
    </>
  );
}

// ─── Main Page ──────────────────────────────────────────────────
export default function StartPage() {
  const [showSplash, setShowSplash] = useState(true);
  const [phase, setPhase] = useState(0);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const handleSplashDone = useCallback(() => {
    setShowSplash(false);
    setTimeout(() => setPhase(1), 300);
    setTimeout(() => setPhase(2), 1800);
  }, []);

  // Escape cierra la vista ampliada.
  useEffect(() => {
    if (viewerIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setViewerIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [viewerIndex]);

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
        <StartHeader />

        <header className="sp-heading">
          <p className="sp-sub">Una nueva forma de entender la ley</p>
          <h1 className="sp-title">
            <span className="sp-title__line" data-text="LA APP QUE">LA APP QUE</span>
            <span className="sp-title__line" data-text="CAMBIARÁ TU VIDA">CAMBIARÁ TU VIDA</span>
          </h1>
        </header>

        <PhoneCarousel onEnlarge={setViewerIndex} frozen={viewerIndex !== null} />

        <footer className="sp-footer">
          <p className="sp-instruction">
            <span className="sp-instruction__desktop">Descubra cada función · Doble clic para ampliar</span>
            <span className="sp-instruction__mobile">Arrastre para girar · Doble toque para ampliar</span>
          </p>
          <div className="sp-buttons">
            <Link href="/planes" className="sp-btn sp-btn--primary">
              <span className="sp-btn__text">Contratar suscripción</span>
              <span className="sp-btn__border" />
            </Link>
            <a
              href="https://apps.apple.com/mx/app/yaakob/id6758861392"
              target="_blank"
              rel="noopener noreferrer"
              className="sp-btn sp-btn--store"
            >
              <span className="sp-btn__text">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
                App Store
              </span>
              <span className="sp-btn__border" />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.fernandotrejo.consultora&hl=es_MX"
              target="_blank"
              rel="noopener noreferrer"
              className="sp-btn sp-btn--store"
            >
              <span className="sp-btn__text">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 010 1.38l-2.302 2.302L15.092 12l2.606-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" /></svg>
                Google Play
              </span>
              <span className="sp-btn__border" />
            </a>
          </div>
        </footer>
      </div>

      {/* Vista ampliada de la pantalla activa */}
      {viewerIndex !== null && (
        <div className="sp-viewer" role="dialog" aria-label="Vista ampliada" onClick={() => setViewerIndex(null)}>
          <button className="sp-viewer__close" aria-label="Cerrar" onClick={() => setViewerIndex(null)}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={SLIDES[viewerIndex].src} alt={SLIDES[viewerIndex].title} />
            <figcaption>{SLIDES[viewerIndex].title}</figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
