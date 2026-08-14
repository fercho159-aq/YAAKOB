module.exports=[35025,(a,b,c)=>{b.exports=a.x("@react-three/drei-55417cbbf7f59941",()=>require("@react-three/drei-55417cbbf7f59941"))},12393,(a,b,c)=>{b.exports=a.x("@react-three/fiber-1ddc862b4060bf54",()=>require("@react-three/fiber-1ddc862b4060bf54"))},24511,a=>a.a(async(b,c)=>{try{let b=await a.y("@react-three/postprocessing-3adc17d099ef3f70");a.n(b),c()}catch(a){c(a)}},!0),40971,a=>{"use strict";let b=Math.PI/180;a.s(["DEG",0,b,"background",0,{scale:300,colorRamp:"/assets/images/global/colorramp.png",uniforms:{uColorRange:[.6,.78],uBrightness:0,uNoiseScale:.25,uNoiseSpeed:.05,uSaturation:1,uContrastAdjust:0}},"camera",0,{position:[0,2,0],lookAt:[0,2,-6],fov:50,near:.1,far:1e3,fovForAspect(a){return this.fov*Math.max(1,1+-((a-1)*.8/.5))}},"composite",0,{uRGBStrength:.1,uNoise:.02,uVignette:0,uDistortion:1.02,uContrast:[1,1],uHexScale:.035,uHexScalePhone:.07,uOverlayMix:1,uOverlayColor:"#ffffff",bloom:{intensity:1,strength:2e-4,luminanceThreshold:.29,radius:.6}},"easeInOutSine",0,a=>-(Math.cos(Math.PI*a)-1)/2,"easeOutSine",0,a=>Math.sin(a*Math.PI/2),"eye",0,{geometry:"/assets/geometry/trackandreact/eye/eye.json",map:"/assets/images/trackandreact/eye/strands.png",position:[0,0,0],rotation:[-90,0,0],scale:[1,1,1],renderOrder:1,uniforms:{uColor:"#7E98A1",uTile:[7,1.45],uPinchRange:[.163,.286],uFadeRange:[.249,.278,.055,.725],uBands1:[.463,.3,.413,.28],uBands2:[.621,.37,.462,.341]},transition:{to:1,duration:12e3,delay:0}},"eyeGroup",0,{position:[0,-2,-18],rotation:[12,0,25],scale:1.15},"floaters",0,{count:4e3,scale:[40,20,40],color:"#3c464f",uniforms:{uSize:8,uScale:[1,1],uAlpha:.4},renderOrder:1},"lens",0,{geometry:"/assets/geometry/landing/hemisphere.json",matcap:"/assets/images/landing/lens_matcap.jpg",position:[0,1.42,0],rotation:[0,0,0],scale:[4.5,1.87,4.5],renderOrder:3,uniforms:{uColor:"#698a97",uReflectOffset:[0,0,0]},transition:{to:1,duration:12e3,delay:3e3}},"logo",0,{map:"/assets/images/landing/echo-logo.png",position:[0,1.9,0],scale:5.5,layers:[{z:-6,clamp:[0,.49],alpha:1,outline:0,renderOrder:101.08},{z:-5.725,clamp:[.49,.65],alpha:1.2,outline:0,renderOrder:101.17},{z:-6,clamp:[.65,.72],alpha:1,outline:0,renderOrder:101.25},{z:-6.275,clamp:[.49,.72],alpha:.5,outline:1,renderOrder:101.33},{z:-7.1,clamp:[0,.72],alpha:.25,outline:1,renderOrder:101.42}],color:"#000000",transition:{to:1,duration:6e3,delay:800}},"parallax",0,{move:[-2,-1],lerp:.02},"splines",0,{data:"/assets/geometry/landing/eye-SPLINES.json",position:[0,-2.5,0],scale:[.78,1.3,.78],count:65025,renderOrder:2,thickness:.5,lifetime:14,uniforms:{uColor:"#adc9e1",uSize:.3,uLifeFade:[.68,.85]},transition:{to:.8,duration:1e4,delay:0}},"tagline",0,{text:"ASESORÍA · PREVENCIÓN · REGULARIZACIÓN · DEFENSA FISCAL",font:"/assets/fonts/TTMussels-Bold.json",atlas:"/assets/fonts/TTMussels-Bold.png",color:"#13343f",alpha:.96,letterSpacing:.125,width:3.41,position:[0,.216,-6],renderOrder:101.5,hitHeight:.22}])},21281,a=>a.a(async(b,c)=>{try{var d=a.i(24552),e=b([d]);function f(a){let b=new Float32Array(3*a),c=new Float32Array(4*a);for(let d=0;d<a;d++){b[3*d]=2*Math.random()-1,b[3*d+1]=2*Math.random()-1,b[3*d+2]=2*Math.random()-1;for(let a=0;a<4;a++)c[4*d+a]=Math.random()}let e=new d.BufferGeometry;return e.setAttribute("position",new d.BufferAttribute(b,3)),e.setAttribute("random",new d.BufferAttribute(c,4)),e}[d]=e.then?(await e)():e,a.s(["createFloaterGeometry",()=>f]),c()}catch(a){c(a)}},!1),82806,a=>a.a(async(b,c)=>{try{var d=a.i(12393),e=a.i(27669),f=a.i(24552),g=b([f]);[f]=g.then?(await g)():g;let i=`
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,j=`
uniform sampler2D tPrev;
uniform vec2 uPointer;
uniform vec2 uPointerPrev;
uniform vec2 uVelocity;
uniform float uAdvect;
uniform float uRadius;
uniform float uDecay;
uniform float uMaskGain;
uniform float uMaskDecay;
uniform float uAspect;

varying vec2 vUv;

void main() {
    // Self-advection: step back along the field and pick up what was there.
    // The step has to stay within a few texels. The velocity saturates on a
    // fast flick, and a large factor here samples most of a screen away, which
    // wipes the trail instead of carrying it.
    vec2 prevVelocity = texture2D(tPrev, vUv).xy;
    vec2 source = vUv - prevVelocity * uAdvect;
    vec4 prev = texture2D(tPrev, source);

    // Splat along the segment the pointer covered since the last frame, not at
    // a single point: a fast flick moves hundreds of pixels between frames, and
    // a point splat would leave the trail full of gaps.
    vec2 pa = vUv - uPointerPrev;
    vec2 ba = uPointer - uPointerPrev;
    float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-6), 0.0, 1.0);
    vec2 delta = (pa - ba * h) * vec2(uAspect, 1.0);
    float splat = exp(-dot(delta, delta) / uRadius);

    vec2 velocity = prev.xy * uDecay + uVelocity * splat;

    // The mask is deliberately weak and short-lived. Consumers run it through
    // smoothstep(0.0, 0.1, mask), so a mask that reached 1 would saturate them
    // across the whole pointer trail — on the logo that swaps the letters'
    // solid fill for the dissolve pattern and eats the wordmark.
    float mask = max(prev.z * uMaskDecay, splat * uMaskGain);

    gl_FragColor = vec4(clamp(velocity, -1.0, 1.0), mask, 1.0);
}
`;class k{scene=new f.Scene;camera=new f.OrthographicCamera(-1,1,1,-1,0,1);material;targets;current=0;constructor(){const a={type:f.HalfFloatType,minFilter:f.NearestFilter,magFilter:f.NearestFilter,depthBuffer:!1};this.targets=[new f.WebGLRenderTarget(256,256,a),new f.WebGLRenderTarget(256,256,a)],this.material=new f.ShaderMaterial({vertexShader:i,fragmentShader:j,uniforms:{tPrev:{value:this.targets[1].texture},uPointer:{value:new f.Vector2(.5,.5)},uPointerPrev:{value:new f.Vector2(.5,.5)},uVelocity:{value:new f.Vector2},uAdvect:{value:.015},uRadius:{value:.004},uDecay:{value:.955},uMaskGain:{value:1},uMaskDecay:{value:.955},uAspect:{value:1}},depthTest:!1,depthWrite:!1}),this.scene.add(new f.Mesh(new f.PlaneGeometry(2,2),this.material))}get texture(){return this.targets[this.current].texture}swap(){this.material.uniforms.tPrev.value=this.targets[this.current].texture,this.current=1-this.current}get target(){return this.targets[this.current]}dispose(){this.targets[0].dispose(),this.targets[1].dispose(),this.material.dispose()}}function h(){let a=(0,d.useThree)(a=>a.gl),b=(0,d.useThree)(a=>a.size),c=(0,d.useThree)(a=>a.pointer),g=(0,e.useRef)(null);g.current??=new k;let h=(0,e.useMemo)(()=>({last:new f.Vector2(.5,.5),velocity:new f.Vector2}),[]);return(0,e.useEffect)(()=>()=>g.current?.dispose(),[]),(0,d.useFrame)(()=>{let d=g.current;if(!d)return;let e=.5*c.x+.5,f=.5*c.y+.5;h.velocity.set(e-h.last.x,f-h.last.y).multiplyScalar(6);let i=d.material.uniforms;i.uPointerPrev.value.copy(h.last),i.uPointer.value.set(e,f),i.uVelocity.value.copy(h.velocity),i.uAspect.value=b.width/b.height,h.last.set(e,f),d.swap();let j=a.getRenderTarget();a.setRenderTarget(d.target),a.render(d.scene,d.camera),a.setRenderTarget(j)},-1),g.current}a.s(["useFluid",()=>h]),c()}catch(a){c(a)}},!1),21617,a=>a.a(async(b,c)=>{try{let b=await a.y("postprocessing-6968e1cdcc7f3946");a.n(b),c()}catch(a){c(a)}},!0),42468,a=>a.a(async(b,c)=>{try{var d=a.i(24552),e=b([d]);function f(a){return new d.Color().setStyle(a,d.LinearSRGBColorSpace)}[d]=e.then?(await e)():e,a.s(["rawColor",()=>f]),c()}catch(a){c(a)}},!1),64120,a=>{"use strict";let b=`
float range(float oldValue, float oldMin, float oldMax, float newMin, float newMax) {
    vec3 sub = vec3(oldValue, newMax, oldMax) - vec3(oldMin, newMin, oldMin);
    return sub.x * sub.y / sub.z + newMin;
}

float crange(float oldValue, float oldMin, float oldMax, float newMin, float newMax) {
    return clamp(range(oldValue, oldMin, oldMax, newMin, newMax), min(newMin, newMax), max(newMin, newMax));
}
`,c=`
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
`,d=`
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
`,e=`
vec3 adjustContrast(vec3 color, float c, float m) {
    color.rgb = color.rgb * c + (0.5 - c * 0.5);
    return color * m;
}
`,f=`
vec2 reflectMatcap(vec3 position, mat4 modelViewMatrix, vec3 normal) {
    vec3 e = normalize(vec3(modelViewMatrix * vec4(position, 1.0)));
    vec3 n = normalize(normal);
    vec3 r = reflect(e, n);
    float m = 2.0 * sqrt(pow(r.x, 2.0) + pow(r.y, 2.0) + pow(r.z + 1.0, 2.0));
    return r.xy / m + 0.5;
}
`;a.s(["CONTRAST",0,e,"MATCAP",0,f,"RANGE",0,b,"RGB2HSV",0,d,"SIMPLE_NOISE",0,c])},77414,a=>a.a(async(b,c)=>{try{var d=a.i(8171),e=a.i(12393),f=a.i(21617),g=a.i(27669),h=a.i(24552),i=a.i(40971),j=a.i(42468),k=a.i(64120),l=b([f,h,j]);[f,h,j]=l.then?(await l)():l;let m=`
uniform float uRGBStrength;
uniform float uNoise;
uniform float uVignette;
uniform float uDistortion;
uniform vec2 uContrast;
uniform float uHexScale;
uniform float uOverlayMix;
uniform vec3 uOverlayColor;
uniform sampler2D tFluid;

${k.RANGE}
${k.SIMPLE_NOISE}

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
`;class n extends f.Effect{constructor(a){super("Composite",m,{blendFunction:f.BlendFunction.NORMAL,uniforms:new Map([["uRGBStrength",new h.Uniform(i.composite.uRGBStrength)],["uNoise",new h.Uniform(i.composite.uNoise)],["uVignette",new h.Uniform(i.composite.uVignette)],["uDistortion",new h.Uniform(i.composite.uDistortion)],["uContrast",new h.Uniform(new h.Vector2(...i.composite.uContrast))],["uHexScale",new h.Uniform(i.composite.uHexScale)],["uOverlayMix",new h.Uniform(i.composite.uOverlayMix)],["uOverlayColor",new h.Uniform((0,j.rawColor)(i.composite.uOverlayColor))],["tFluid",new h.Uniform(a)]])})}setFluid(a){this.uniforms.get("tFluid").value=a}setHexScale(a){this.uniforms.get("uHexScale").value=a}}let o=(0,g.forwardRef)(function({fluid:a},b){let c=(0,e.useThree)(a=>a.size),f=(0,g.useMemo)(()=>new n(a.texture),[a]);return(0,e.useFrame)(()=>{f.setFluid(a.texture),f.setHexScale(c.width<700?i.composite.uHexScalePhone:i.composite.uHexScale)}),(0,d.jsx)("primitive",{ref:b,object:f,dispose:null})});a.s(["Composite",0,o]),c()}catch(a){c(a)}},!1),21646,a=>{"use strict";var b=a.i(64120);let c=`
varying vec3 vPos;
varying vec2 vUv;

void main() {
    vUv = uv;
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,d=`
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

${b.RANGE}
${b.SIMPLE_NOISE}
${b.RGB2HSV}
${b.CONTRAST}

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
`,e=`
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
`,f=`
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

${b.RANGE}
${b.SIMPLE_NOISE}
${b.RGB2HSV}

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
`,g=`
uniform vec3 uReflectOffset;

varying vec2 vUv;
varying vec2 vMuv;

${b.MATCAP}

void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vUv = uv;
    vMuv = reflectMatcap(position + uReflectOffset, modelViewMatrix, normalize(normalMatrix * normal));
}
`,h=`
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
`,i=`
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,j=`
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

${b.RANGE}
${b.SIMPLE_NOISE}

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
`,k=`
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

${b.RANGE}

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
`,l=`
uniform float time;
uniform vec3 uColor;

varying float vAlpha;
varying vec4 vRandom;
varying vec3 vPos;

${b.RANGE}
${b.SIMPLE_NOISE}

void main() {
    vec2 uv = vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y);
    float dist = 1.0 - distance(uv, vec2(0.5));
    dist = smoothstep(0.4, 0.9, dist);

    gl_FragColor.rgb = mix(vec3(1.0), uColor, step(vRandom.x, 0.5));
    gl_FragColor.a = vAlpha * dist;
    gl_FragColor.a *= 0.5 + sin(time * 15.0 + vRandom.y * 20.0) * 0.5;
    gl_FragColor.a *= crange(cnoise(vPos * 0.3 + time * 0.2), -1.0, 1.0, 0.1, 1.0);
}
`,m=`
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,n=`
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
`,o=`
uniform float uSize;
uniform vec2 uScale;
uniform float uAlpha;
uniform float uMouseStrength;
uniform float DPR;
uniform sampler2D tFluid;

attribute vec4 random;

varying float vAlpha;
varying vec4 vRandom;

${b.RANGE}

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
`,p=`
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
`;a.s(["backgroundFragment",0,d,"backgroundVertex",0,c,"eyeFragment",0,f,"eyeVertex",0,e,"floaterFragment",0,p,"floaterVertex",0,o,"lensFragment",0,h,"lensVertex",0,g,"logoFragment",0,j,"logoVertex",0,i,"splineFragment",0,l,"splineVertex",0,k,"textFragment",0,n,"textVertex",0,m])},69819,a=>a.a(async(b,c)=>{try{var d=a.i(24552),e=b([d]);async function f(a){let b=await fetch(a);if(!b.ok)throw Error(`splines ${a}: ${b.status}`);let c=await b.json(),e=c[0].length/3,f=new Float32Array(1048576),g=0;for(let a of c)for(let b=0;b<a.length;b+=3)f[4*g]=a[b],f[4*g+1]=a[b+1],f[4*g+2]=a[b+2],f[4*g+3]=1,g++;let h=new d.DataTexture(f,512,512,d.RGBAFormat,d.FloatType);return h.minFilter=h.magFilter=d.NearestFilter,h.needsUpdate=!0,{texture:h,splineCount:c.length,perSpline:e}}function g(a,b){let c=new Float32Array(3*a),e=new Float32Array(4*a),f=new Float32Array(3*a),g=new Float32Array(a);for(let c=0;c<a;c++)e[4*c]=Math.random(),e[4*c+1]=Math.random(),e[4*c+2]=Math.random(),e[4*c+3]=Math.random(),f[3*c]=2*Math.random()-1,f[3*c+1]=2*Math.random()-1,f[3*c+2]=2*Math.random()-1,g[c]=Math.floor(Math.random()*b);let h=new d.BufferGeometry;return h.setAttribute("position",new d.BufferAttribute(c,3)),h.setAttribute("random",new d.BufferAttribute(e,4)),h.setAttribute("origin",new d.BufferAttribute(f,3)),h.setAttribute("splineIndex",new d.BufferAttribute(g,1)),h}[d]=e.then?(await e)():e,a.s(["SPLINE_TEX_SIZE",0,512,"createSplineGeometry",()=>g,"loadSplineTexture",()=>f]),c()}catch(a){c(a)}},!1),78703,a=>a.a(async(b,c)=>{try{var d=a.i(24552),e=b([d]);async function f(a){let b=await fetch(a);if(!b.ok)throw Error(`font ${a}: ${b.status}`);return await b.json()}function g(a,b,c=0){let e,f=new Map(a.chars.map(a=>[a.char,a])),h=new Map((a.kernings??[]).map(a=>[`${a.first}:${a.second}`,a.amount])),i=c*a.common.lineHeight,j=[],k=0;for(let a of b){let b=f.get(a);b&&(e&&(k+=h.get(`${e.id}:${b.id}`)??0),b.width>0&&b.height>0&&j.push({char:b,x:k}),k+=b.xadvance+i,e=b)}let l=k-i,{scaleW:m,scaleH:n,base:o}=a.common,p=new Float32Array(4*j.length*3),q=new Float32Array(4*j.length*2),r=new Uint16Array(6*j.length);j.forEach(({char:a,x:b},c)=>{let d=b+a.xoffset-l/2,e=d+a.width,f=o-a.yoffset,g=f-a.height,h=a.x/m,i=(a.x+a.width)/m,j=1-a.y/n,k=1-(a.y+a.height)/n;p.set([d,g,0,e,g,0,e,f,0,d,f,0],12*c),q.set([h,k,i,k,i,j,h,j],8*c);let s=4*c;r.set([s,s+1,s+2,s,s+2,s+3],6*c)});let s=new d.BufferGeometry;return s.setAttribute("position",new d.BufferAttribute(p,3)),s.setAttribute("uv",new d.BufferAttribute(q,2)),s.setIndex(new d.BufferAttribute(r,1)),s.computeBoundingSphere(),{geometry:s,width:l}}[d]=e.then?(await e)():e,a.s(["layoutText",()=>g,"loadFont",()=>f]),c()}catch(a){c(a)}},!1),75514,a=>a.a(async(b,c)=>{try{var d=a.i(78703),e=b([d]);[d]=e.then?(await e)():e;let g=new Map;function f(a,b,c){let e=`${a}|${c}|${b}`,f=g.get(e);if(f||(f={promise:(0,d.loadFont)(a).then(a=>(0,d.layoutText)(a,b,c)).then(a=>f.value=a,a=>{throw f.error=a,a})},g.set(e,f)),f.error)throw f.error;if(!f.value)throw f.promise;return f.value}a.s(["useText",()=>f]),c()}catch(a){c(a)}},!1),35414,a=>a.a(async(b,c)=>{try{var d=a.i(24552),e=b([d]);async function f(a){let b=await fetch(a);if(!b.ok)throw Error(`geometry ${a}: ${b.status}`);let c=await b.json(),e=new d.BufferGeometry;return e.setAttribute("position",new d.BufferAttribute(new Float32Array(c.position),3)),c.uv&&e.setAttribute("uv",new d.BufferAttribute(new Float32Array(c.uv),2)),c.normal?e.setAttribute("normal",new d.BufferAttribute(new Float32Array(c.normal),3)):e.computeVertexNormals(),e.computeBoundingSphere(),e}[d]=e.then?(await e)():e,a.s(["loadGeometry",()=>f]),c()}catch(a){c(a)}},!1),54556,a=>a.a(async(b,c)=>{try{var d=a.i(35414),e=b([d]);[d]=e.then?(await e)():e;let g=new Map;function f(a){let b=g.get(a);if(b||(b={promise:(0,d.loadGeometry)(a).then(a=>b.value=a,a=>{throw b.error=a,a})},g.set(a,b)),b.error)throw b.error;if(!b.value)throw b.promise;return b.value}a.s(["useGeometry",()=>f]),c()}catch(a){c(a)}},!1),11393,a=>a.a(async(b,c)=>{try{var d=a.i(69819),e=b([d]);[d]=e.then?(await e)():e;let g=new Map;function f(a){let b=g.get(a);if(b||(b={promise:(0,d.loadSplineTexture)(a).then(a=>b.value=a,a=>{throw b.error=a,a})},g.set(a,b)),b.error)throw b.error;if(!b.value)throw b.promise;return b.value}a.s(["useSplineData",()=>f]),c()}catch(a){c(a)}},!1),4060,a=>a.a(async(b,c)=>{try{var d=a.i(24552),e=b([d]);[d]=e.then?(await e)():e;let g=new Map;function f(a,b={}){let c=g.get(a);!c&&(c={promise:new Promise((c,e)=>{new d.TextureLoader().load(a,a=>{b.color&&(a.colorSpace=d.SRGBColorSpace),b.repeat&&(a.wrapS=a.wrapT=d.RepeatWrapping),c(a)},void 0,e)}).then(a=>c.value=a,a=>{throw c.error=a,a})},g.set(a,c));if(c.error)throw c.error;if(!c.value)throw c.promise;return c.value}a.s(["useTexture",()=>f]),c()}catch(a){c(a)}},!1),99391,a=>a.a(async(b,c)=>{try{var d=a.i(8171),e=a.i(35025),f=a.i(12393),g=a.i(24511),h=a.i(27669),i=a.i(24552),j=a.i(40971),k=a.i(21281),l=a.i(82806),m=a.i(77414),n=a.i(21646),o=a.i(69819),p=a.i(75514),q=a.i(42468),r=a.i(54556),s=a.i(11393),t=a.i(4060),u=b([g,i,k,l,m,o,p,q,r,s,t]);function v(a,{to:b,duration:c,delay:d},e=j.easeOutSine){let f=a-d;return e(f<=0?0:Math.min(1,f/c))*b}function w(){let a=(0,t.useTexture)(j.background.colorRamp),b=(0,h.useRef)(null),c=(0,h.useMemo)(()=>({time:{value:0},tColorRamp:{value:a},uColorRange:{value:new i.Vector2(...j.background.uniforms.uColorRange)},uBrightness:{value:j.background.uniforms.uBrightness},uNoiseScale:{value:j.background.uniforms.uNoiseScale},uNoiseSpeed:{value:j.background.uniforms.uNoiseSpeed},uSaturation:{value:j.background.uniforms.uSaturation},uContrastAdjust:{value:j.background.uniforms.uContrastAdjust}}),[a]);return(0,f.useFrame)(({clock:a})=>{let c=b.current;c&&(c.uniforms.time.value=a.elapsedTime)}),(0,d.jsxs)("mesh",{scale:j.background.scale,renderOrder:0,children:[(0,d.jsx)("sphereGeometry",{args:[1,16,16]}),(0,d.jsx)("shaderMaterial",{ref:b,vertexShader:n.backgroundVertex,fragmentShader:n.backgroundFragment,uniforms:c,side:i.BackSide,depthWrite:!1})]})}function x({fluid:a}){let b=(0,r.useGeometry)(j.eye.geometry),c=(0,t.useTexture)(j.eye.map,{repeat:!0}),e=(0,h.useRef)(null),g=(0,h.useMemo)(()=>({time:{value:0},tMap:{value:c},tFluid:{value:a.texture},uResolution:{value:new i.Vector2(1,1)},uColor:{value:(0,q.rawColor)(j.eye.uniforms.uColor)},uTile:{value:new i.Vector2(...j.eye.uniforms.uTile)},uPinchRange:{value:new i.Vector2(...j.eye.uniforms.uPinchRange)},uFadeRange:{value:new i.Vector4(...j.eye.uniforms.uFadeRange)},uBands1:{value:new i.Vector4(...j.eye.uniforms.uBands1)},uBands2:{value:new i.Vector4(...j.eye.uniforms.uBands2)},uTransition:{value:0}}),[c,a]);return(0,f.useFrame)(({clock:b,size:c,viewport:d})=>{let f=e.current;f&&(f.uniforms.time.value=b.elapsedTime,f.uniforms.tFluid.value=a.texture,f.uniforms.uResolution.value.set(c.width*d.dpr,c.height*d.dpr),f.uniforms.uTransition.value=v(1e3*b.elapsedTime,j.eye.transition))}),(0,d.jsx)("mesh",{geometry:b,position:j.eye.position,rotation:[j.eye.rotation[0]*j.DEG,j.eye.rotation[1]*j.DEG,j.eye.rotation[2]*j.DEG],scale:j.eye.scale,renderOrder:j.eye.renderOrder,children:(0,d.jsx)("shaderMaterial",{ref:e,vertexShader:n.eyeVertex,fragmentShader:n.eyeFragment,uniforms:g,transparent:!0})})}function y(){let a=(0,r.useGeometry)(j.lens.geometry),b=(0,t.useTexture)(j.lens.matcap),c=(0,h.useRef)(null),e=(0,h.useMemo)(()=>({tMatcap:{value:b},uColor:{value:(0,q.rawColor)(j.lens.uniforms.uColor)},uReflectOffset:{value:new i.Vector3(...j.lens.uniforms.uReflectOffset)},uTransition:{value:0}}),[b]);return(0,f.useFrame)(({clock:a})=>{let b=c.current;b&&(b.uniforms.uTransition.value=v(1e3*a.elapsedTime,j.lens.transition))}),(0,d.jsx)("mesh",{geometry:a,position:j.lens.position,scale:j.lens.scale,renderOrder:j.lens.renderOrder,children:(0,d.jsx)("shaderMaterial",{ref:c,vertexShader:n.lensVertex,fragmentShader:n.lensFragment,uniforms:e,transparent:!0})})}function z({fluid:a}){let b=(0,s.useSplineData)(j.splines.data),c=(0,h.useRef)(null),e=(0,h.useMemo)(()=>(0,o.createSplineGeometry)(j.splines.count,b.splineCount),[b.splineCount]),g=(0,h.useMemo)(()=>({time:{value:0},tSpline:{value:b.texture},tFluid:{value:a.texture},uSplineTexSize:{value:o.SPLINE_TEX_SIZE},uPerSpline:{value:b.perSpline},uColor:{value:(0,q.rawColor)(j.splines.uniforms.uColor)},uSize:{value:j.splines.uniforms.uSize},uLifeFade:{value:new i.Vector2(...j.splines.uniforms.uLifeFade)},uThickness:{value:j.splines.thickness},uLifetime:{value:j.splines.lifetime},uAlpha:{value:0},uMouseStrength:{value:1}}),[b,a]);return(0,f.useFrame)(({clock:b})=>{let d=c.current;d&&(d.uniforms.time.value=b.elapsedTime,d.uniforms.tFluid.value=a.texture,d.uniforms.uAlpha.value=v(1e3*b.elapsedTime,j.splines.transition,j.easeInOutSine))}),(0,d.jsx)("points",{geometry:e,position:j.splines.position,scale:j.splines.scale,renderOrder:j.splines.renderOrder,frustumCulled:!1,children:(0,d.jsx)("shaderMaterial",{ref:c,vertexShader:n.splineVertex,fragmentShader:n.splineFragment,uniforms:g,transparent:!0,depthTest:!1,depthWrite:!1})})}function A({fluid:a}){let b=(0,h.useRef)(null),c=(0,h.useMemo)(()=>(0,k.createFloaterGeometry)(j.floaters.count),[]),e=(0,h.useMemo)(()=>({time:{value:0},tFluid:{value:a.texture},uColor:{value:(0,q.rawColor)(j.floaters.color)},uSize:{value:j.floaters.uniforms.uSize},uScale:{value:new i.Vector2(...j.floaters.uniforms.uScale)},uAlpha:{value:j.floaters.uniforms.uAlpha},uMouseStrength:{value:1},DPR:{value:1}}),[a]);return(0,f.useFrame)(({clock:c,viewport:d})=>{let e=b.current;e&&(e.uniforms.time.value=c.elapsedTime,e.uniforms.tFluid.value=a.texture,e.uniforms.DPR.value=d.dpr)}),(0,d.jsx)("points",{geometry:c,scale:j.floaters.scale,renderOrder:j.floaters.renderOrder,children:(0,d.jsx)("shaderMaterial",{ref:b,vertexShader:n.floaterVertex,fragmentShader:n.floaterFragment,uniforms:e,transparent:!0,blending:i.AdditiveBlending,depthTest:!1,depthWrite:!1})})}function B({layer:a,fluid:b}){let c=(0,t.useTexture)(j.logo.map),e=(0,h.useRef)(null),g=(0,h.useMemo)(()=>({time:{value:0},tMap:{value:c},tFluid:{value:b.texture},uResolution:{value:new i.Vector2(1,1)},uColor:{value:(0,q.rawColor)(j.logo.color)},uClamp:{value:new i.Vector2(...a.clamp)},uAlpha:{value:a.alpha},uOutline:{value:a.outline},uFlipClamp:{value:0},uInvertAnim:{value:0},uTransition:{value:0}}),[c,b,a]);return(0,f.useFrame)(({clock:a,size:c,viewport:d})=>{let f=e.current;f&&(f.uniforms.time.value=a.elapsedTime,f.uniforms.tFluid.value=b.texture,f.uniforms.uResolution.value.set(c.width*d.dpr,c.height*d.dpr),f.uniforms.uTransition.value=v(1e3*a.elapsedTime,j.logo.transition))}),(0,d.jsxs)("mesh",{position:[j.logo.position[0],j.logo.position[1],a.z],scale:j.logo.scale,renderOrder:a.renderOrder,children:[(0,d.jsx)("planeGeometry",{args:[1,1]}),(0,d.jsx)("shaderMaterial",{ref:e,vertexShader:n.logoVertex,fragmentShader:n.logoFragment,uniforms:g,transparent:!0,depthWrite:!1})]})}function C({fluid:a}){return(0,d.jsx)(d.Fragment,{children:j.logo.layers.map((b,c)=>(0,d.jsx)(B,{layer:b,fluid:a},c))})}function D({onBegin:a}){let b=(0,p.useText)(j.tagline.font,j.tagline.text,j.tagline.letterSpacing),c=(0,t.useTexture)(j.tagline.atlas),e=(0,h.useMemo)(()=>({tMap:{value:c},uColor:{value:(0,q.rawColor)(j.tagline.color)},uAlpha:{value:j.tagline.alpha}}),[c]),f=j.tagline.width/b.width;return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("mesh",{geometry:b.geometry,position:j.tagline.position,scale:f,renderOrder:j.tagline.renderOrder,children:(0,d.jsx)("shaderMaterial",{vertexShader:n.textVertex,fragmentShader:n.textFragment,uniforms:e,transparent:!0,depthWrite:!1})}),a?(0,d.jsxs)("mesh",{position:[j.tagline.position[0],j.tagline.position[1],j.tagline.position[2]+.01],onClick:a,onPointerOver:()=>{document.body.style.cursor="pointer"},onPointerOut:()=>{document.body.style.cursor=""},children:[(0,d.jsx)("planeGeometry",{args:[1.04*j.tagline.width,j.tagline.hitHeight]}),(0,d.jsx)("meshBasicMaterial",{transparent:!0,opacity:0,depthWrite:!1})]}):null]})}function E(){let a=(0,f.useThree)(a=>a.size),b=(0,f.useThree)(a=>a.pointer),c=(0,h.useRef)(null);return(0,f.useFrame)(()=>{let a=c.current;if(!a)return;let d=j.camera.position[0]+b.x*j.parallax.move[0],e=j.camera.position[1]+b.y*j.parallax.move[1];a.position.x+=(d-a.position.x)*j.parallax.lerp,a.position.y+=(e-a.position.y)*j.parallax.lerp,a.lookAt(...j.camera.lookAt)}),(0,d.jsx)(e.PerspectiveCamera,{ref:c,makeDefault:!0,position:j.camera.position,fov:j.camera.fovForAspect(a.width/a.height),near:j.camera.near,far:j.camera.far})}function F({onBegin:a}){let b=(0,l.useFluid)();return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(w,{}),(0,d.jsx)(A,{fluid:b}),(0,d.jsxs)("group",{position:j.eyeGroup.position,rotation:[j.eyeGroup.rotation[0]*j.DEG,j.eyeGroup.rotation[1]*j.DEG,j.eyeGroup.rotation[2]*j.DEG],scale:j.eyeGroup.scale,children:[(0,d.jsx)(x,{fluid:b}),(0,d.jsx)(y,{}),(0,d.jsx)(z,{fluid:b})]}),(0,d.jsx)(C,{fluid:b}),(0,d.jsx)(D,{onBegin:a}),(0,d.jsxs)(g.EffectComposer,{children:[(0,d.jsx)(g.Bloom,{intensity:j.composite.bloom.intensity*j.composite.bloom.strength,luminanceThreshold:j.composite.bloom.luminanceThreshold,radius:j.composite.bloom.radius,mipmapBlur:!0}),(0,d.jsx)(m.Composite,{fluid:b})]})]})}function G({onBegin:a}={}){return(0,d.jsxs)(f.Canvas,{style:{position:"fixed",inset:0},dpr:[1,2],gl:{antialias:!0,toneMapping:i.NoToneMapping,outputColorSpace:i.LinearSRGBColorSpace},children:[(0,d.jsx)(E,{}),(0,d.jsx)(h.Suspense,{fallback:null,children:(0,d.jsx)(F,{onBegin:a})})]})}[g,i,k,l,m,o,p,q,r,s,t]=u.then?(await u)():u,a.s(["Scene",()=>G]),c()}catch(a){c(a)}},!1),27778,a=>{a.n(a.i(99391))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__03f6303b._.js.map