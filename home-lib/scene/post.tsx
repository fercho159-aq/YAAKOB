import { useFrame, useThree } from '@react-three/fiber'
import { BlendFunction, Effect } from 'postprocessing'
import { forwardRef, useMemo } from 'react'
import { Uniform, Vector2, type Texture } from 'three'

import { composite } from './config'
import { rawColor } from './rawColor'
import { RANGE, SIMPLE_NOISE } from './shaders/chunks'
import type { Fluid } from './fluid'

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
 */
const fragmentShader = /* glsl */ `
uniform float uRGBStrength;
uniform float uNoise;
uniform float uVignette;
uniform float uDistortion;
uniform vec2 uContrast;
uniform float uHexScale;
uniform float uOverlayMix;
uniform vec3 uOverlayColor;
uniform sampler2D tFluid;

${RANGE}
${SIMPLE_NOISE}

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
`

class CompositeEffect extends Effect {
  constructor(fluidTexture: Texture) {
    super('Composite', fragmentShader, {
      blendFunction: BlendFunction.NORMAL,
      uniforms: new Map<string, Uniform>([
        ['uRGBStrength', new Uniform(composite.uRGBStrength)],
        ['uNoise', new Uniform(composite.uNoise)],
        ['uVignette', new Uniform(composite.uVignette)],
        ['uDistortion', new Uniform(composite.uDistortion)],
        ['uContrast', new Uniform(new Vector2(...composite.uContrast))],
        ['uHexScale', new Uniform(composite.uHexScale)],
        ['uOverlayMix', new Uniform(composite.uOverlayMix)],
        ['uOverlayColor', new Uniform(rawColor(composite.uOverlayColor))],
        ['tFluid', new Uniform(fluidTexture)],
      ]),
    })
  }

  setFluid(texture: Texture) {
    this.uniforms.get('tFluid')!.value = texture
  }

  setHexScale(scale: number) {
    this.uniforms.get('uHexScale')!.value = scale
  }
}

/**
 * Hex scale is a screen-space constant on desktop and coarser on phones, the
 * way the engine picked it (`Device.mobile.phone ? 0.07 : 0.035`).
 */
export const Composite = forwardRef<CompositeEffect, { fluid: Fluid }>(function Composite(
  { fluid },
  ref
) {
  const size = useThree((state) => state.size)
  const effect = useMemo(() => new CompositeEffect(fluid.texture), [fluid])

  useFrame(() => {
    effect.setFluid(fluid.texture)
    effect.setHexScale(size.width < 700 ? composite.uHexScalePhone : composite.uHexScale)
  })

  return <primitive ref={ref} object={effect} dispose={null} />
})
