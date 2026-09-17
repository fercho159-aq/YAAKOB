"use client";

import { useEffect, useRef } from "react";

/**
 * Olas de partículas al pie del hero. Misma idea que el «flux» de /servicios
 * —— una ola mayor y otra menor moviendo puntos —— pero sin su escena: aquel
 * fondo es opaco, a pantalla completa y carga three.js con postproceso; aquí
 * basta una malla de puntos en WebGL puro, con lienzo transparente y una sola
 * llamada de dibujo, sobre un degradado negro que tapa las olas fijas de la
 * ilustración.
 *
 * Sin WebGL no se monta nada y la ilustración se queda como está.
 */

const VERTEX = /* glsl */ `
  attribute vec2 aGrid; // x: -1..1 a lo ancho · y: 0 (cerca) .. 1 (lejos)
  attribute float aRand;

  uniform float uTime;
  uniform float uDpr;

  varying float vAlpha;

  const float NEAR = 1.0;
  const float FAR = 6.0;
  const float HORIZON = 0.5;
  const float CAMERA = 1.87;

  void main () {
    float depth = mix(NEAR, FAR, aGrid.y);
    float p = 1.0 / depth;

    // Cada fila cubre el ancho completo; la ola se evalúa en coordenadas de
    // mundo, así que al fondo caben más crestas que al frente.
    float x = aGrid.x * depth * 3.0;

    // Ola mayor + ola menor, como en el flux de /servicios, más un oleaje
    // largo que cruza en diagonal para que las crestas no se repitan.
    float major = x * 0.9 + depth * 0.7 + uTime * 1.25;
    float h = sin(major) * 0.65
            + sin(x * 0.37 - depth * 1.3 - uTime * 0.8) * 0.85
            + sin(x * 0.18 + depth * 0.45 + uTime * 0.5) * 0.5
            + sin(x * 2.3 + depth * 2.9 + uTime * 2.4) * 0.2;

    float y = HORIZON - CAMERA * p + h * 0.72 * p;
    // Vaivén orbital: el punto avanza en la cresta y retrocede en el valle.
    float sway = cos(major) * 0.022 * p;
    gl_Position = vec4(aGrid.x + sway, y, 0.0, 1.0);

    // Unos pocos puntos destellan, como las luces de la ilustración.
    float spark = step(0.988, aRand);
    float twinkle = 0.5 + 0.5 * sin(uTime * 3.2 + aRand * 400.0);

    float crest = smoothstep(-1.2, 1.6, h);
    vAlpha = (0.22 + 0.78 * p) * (0.45 + 0.55 * crest);
    vAlpha = mix(vAlpha, min(1.0, vAlpha + 0.6) * twinkle, spark);

    gl_PointSize = (0.9 + 2.2 * p) * uDpr * (1.0 + spark * 1.2);
  }
`;

const FRAGMENT = /* glsl */ `
  precision mediump float;
  varying float vAlpha;

  void main () {
    float d = length(gl_PointCoord - 0.5);
    float a = vAlpha * (1.0 - smoothstep(0.32, 0.5, d));
    if (a < 0.01) discard;
    // Alfa premultiplicado.
    gl_FragColor = vec4(vec3(0.93, 0.95, 0.98) * a, a);
  }
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("HeroWaves: shader", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/** Malla escalonada con un leve desorden, para que no se lea como rejilla. */
function buildGrid(cols: number, rows: number) {
  const data = new Float32Array(cols * rows * 3);
  let i = 0;
  for (let r = 0; r < rows; r++) {
    const stagger = r % 2 === 0 ? 0 : 0.5;
    for (let c = 0; c < cols; c++) {
      const jitter = (Math.random() - 0.5) * 0.6;
      data[i++] = ((c + stagger + jitter) / cols) * 2.2 - 1.1;
      data[i++] = (r + (Math.random() - 0.5) * 0.5) / (rows - 1);
      data[i++] = Math.random();
    }
  }
  return data;
}

export function HeroWaves() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return undefined;

    // Lienzo nuevo en cada montaje: un canvas devuelve siempre el mismo contexto.
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false });
    if (!gl) return undefined;

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return undefined;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("HeroWaves: program", gl.getProgramInfoLog(program));
      return undefined;
    }
    gl.useProgram(program);

    const small = window.matchMedia("(max-width: 600px)").matches;
    const cols = small ? 120 : 260;
    const rows = small ? 28 : 40;
    const count = cols * rows;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, buildGrid(cols, rows), gl.STATIC_DRAW);
    const stride = 3 * Float32Array.BYTES_PER_ELEMENT;
    const aGrid = gl.getAttribLocation(program, "aGrid");
    const aRand = gl.getAttribLocation(program, "aRand");
    gl.enableVertexAttribArray(aGrid);
    gl.vertexAttribPointer(aGrid, 2, gl.FLOAT, false, stride, 0);
    gl.enableVertexAttribArray(aRand);
    gl.vertexAttribPointer(aRand, 1, gl.FLOAT, false, stride, 2 * Float32Array.BYTES_PER_ELEMENT);

    const uTime = gl.getUniformLocation(program, "uTime");
    const uDpr = gl.getUniformLocation(program, "uDpr");

    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    wrap.appendChild(canvas);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const height = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, width, height);
      gl.uniform1f(uDpr, dpr);
    };

    const draw = (seconds: number) => {
      gl.uniform1f(uTime, seconds);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.POINTS, 0, count);
    };

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let visible = true;
    let lost = false;

    const loop = (time: number) => {
      frame = window.requestAnimationFrame(loop);
      draw(time / 1000);
    };
    const start = () => {
      if (frame !== 0 || still || lost || !visible || document.hidden) return;
      frame = window.requestAnimationFrame(loop);
    };
    const stop = () => {
      if (frame === 0) return;
      window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      // Con movimiento reducido no hay bucle: se repinta el cuadro fijo.
      if (still && !lost) draw(12);
    });
    resizeObserver.observe(canvas);

    // Fuera de pantalla no se anima.
    const viewObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    viewObserver.observe(wrap);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    const onLost = (event: Event) => {
      event.preventDefault();
      lost = true;
      stop();
      wrap.classList.remove("is-live");
    };
    canvas.addEventListener("webglcontextlost", onLost);

    resize();
    if (still) draw(12);
    else start();
    wrap.classList.add("is-live");

    return () => {
      stop();
      resizeObserver.disconnect();
      viewObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onLost);
      wrap.classList.remove("is-live");
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      canvas.remove();
    };
  }, []);

  return <div ref={wrapRef} className="pl-hero__waves" aria-hidden="true" />;
}
