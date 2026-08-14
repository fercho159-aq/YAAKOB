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
 */

import { CONTRAST, MATCAP, RANGE, RGB2HSV, SIMPLE_NOISE } from './chunks'

// ---------------------------------------------------------------- background

export const backgroundVertex = /* glsl */ `
varying vec3 vPos;
varying vec2 vUv;

void main() {
    vUv = uv;
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const backgroundFragment = /* glsl */ `
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

${RANGE}
${SIMPLE_NOISE}
${RGB2HSV}
${CONTRAST}

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
`

// ----------------------------------------------------------------------- eye

export const eyeVertex = /* glsl */ `
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
`

export const eyeFragment = /* glsl */ `
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

${RANGE}
${SIMPLE_NOISE}
${RGB2HSV}

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
`

// ---------------------------------------------------------------------- lens

export const lensVertex = /* glsl */ `
uniform vec3 uReflectOffset;

varying vec2 vUv;
varying vec2 vMuv;

${MATCAP}

void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vUv = uv;
    vMuv = reflectMatcap(position + uReflectOffset, modelViewMatrix, normalize(normalMatrix * normal));
}
`

export const lensFragment = /* glsl */ `
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
`

// ---------------------------------------------------------------------- logo

export const logoVertex = /* glsl */ `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

/**
 * LandingLogo. The fluid branch is live here: `mixFluid` drives the sparkle
 * that lights up the fill where the pointer has stirred the surface.
 */
export const logoFragment = /* glsl */ `
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

${RANGE}
${SIMPLE_NOISE}

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
    // Both lookups are screen space. Upstream sampled the velocity with the
    // quad's own vUv, which worked there because the logo was a screen aligned
    // UI element; here it is a quad in the scene, so vUv would smear the whole
    // fluid field across the wordmark.
    vec2 fluidUV = gl_FragCoord.xy / uResolution;
    float fluidMask = smoothstep(0.0, 0.1, texture2D(tFluid, fluidUV).z);
    vec2 fluid = texture2D(tFluid, fluidUV).xy * fluidMask;

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
`

// ------------------------------------------------------------------- splines

/**
 * DomeLinesShader, with the engine's GPGPU position lookup replaced by a direct
 * spline evaluation.
 *
 * The engine stored every particle's position in a texture it re-simulated each
 * frame (`tPos`), fed by the `splineparticles.fs` snippet: travel along the
 * spline is just `1 - life`, so the same position can be computed here from the
 * particle's own seed and the clock. `getSplineLookupUV` is copied as-is, since
 * the spline texture keeps the engine's layout: `uPerSpline * (index + t)`
 * texels, row-major.
 */
export const splineVertex = /* glsl */ `
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

${RANGE}

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
`

export const splineFragment = /* glsl */ `
uniform float time;
uniform vec3 uColor;

varying float vAlpha;
varying vec4 vRandom;
varying vec3 vPos;

${RANGE}
${SIMPLE_NOISE}

void main() {
    vec2 uv = vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y);
    float dist = 1.0 - distance(uv, vec2(0.5));
    dist = smoothstep(0.4, 0.9, dist);

    gl_FragColor.rgb = mix(vec3(1.0), uColor, step(vRandom.x, 0.5));
    gl_FragColor.a = vAlpha * dist;
    gl_FragColor.a *= 0.5 + sin(time * 15.0 + vRandom.y * 20.0) * 0.5;
    gl_FragColor.a *= crange(cnoise(vPos * 0.3 + time * 0.2), -1.0, 1.0, 0.1, 1.0);
}
`

// ------------------------------------------------------------------- tagline

export const textVertex = /* glsl */ `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

/**
 * msdf.glsl wrapped in the engine's flat-colour text fragment, plus the same
 * pointer-fluid dissolve the logo runs: where the pointer has stirred the
 * surface, scanline bands displace and drop out of the glyphs.
 */
export const textFragment = /* glsl */ `
uniform float time;
uniform sampler2D tMap;
uniform sampler2D tFluid;
uniform vec2 uResolution;
uniform vec3 uColor;
uniform float uAlpha;

varying vec2 vUv;

float msdf(sampler2D tex, vec2 uv) {
    vec3 texel = texture2D(tex, uv).rgb;
    float signedDist = max(min(texel.r, texel.g), min(max(texel.r, texel.g), texel.b)) - 0.5;
    float d = fwidth(signedDist);
    return smoothstep(-d, d, signedDist);
}

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
    vec2 fluid = texture2D(tFluid, fluidUV).xy * fluidMask;

    float mixFluid = smoothstep(0.0, 0.0005, fluid.x * fluid.y);
    mixFluid = mix(mixFluid, 0.0, 0.3);
    mixFluid = max(fluidMask, mixFluid);

    float fill = msdf(tMap, vUv);
    if (fill < 0.01) discard;

    // The wordmark's dissolve, in screen space: the logo quad runs its
    // 140x200 grid over roughly half the frame, so ~4x3 device-pixel cells
    // reproduce the same grain here.
    vec2 st = gl_FragCoord.xy * vec2(0.22, 0.31);
    vec2 ipos = floor(st);
    vec2 fpos = fract(st);
    vec2 vel = vec2(time * 0.05 * 200.0);
    vel *= vec2(-1.0, 0.0) * randomf(1.0 + ipos.y);

    float c = clamp(pattern(st + vec2(0.1, -0.5), vel, 0.7), 0.0, 1.0);
    float a = step(0.6, fpos.y);
    float outline = c * a * fill;
    fill = mix(fill, outline, mixFluid);

    gl_FragColor.rgb = uColor;
    gl_FragColor.a = fill * uAlpha;

    gl_FragColor = mix(gl_FragColor, vec4(1.0), (1.0 - c) * a * fill * mixFluid);
}
`

// ---------------------------------------------------------------- floaters

/**
 * RootStructureParticles, the environment's dust.
 *
 * The engine ran these through the same GPGPU pipeline as the splines, but with
 * `uCurlNoiseSpeed: 0` the curl term cancels and every particle just sits at
 * its spawn point, nudged only by the pointer. So the port keeps the spawn
 * position in the vertex buffer and applies the fluid offset directly.
 */
export const floaterVertex = /* glsl */ `
uniform float uSize;
uniform vec2 uScale;
uniform float uAlpha;
uniform float uMouseStrength;
uniform float DPR;
uniform sampler2D tFluid;

attribute vec4 random;

varying float vAlpha;
varying vec4 vRandom;

${RANGE}

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
`

export const floaterFragment = /* glsl */ `
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
`
