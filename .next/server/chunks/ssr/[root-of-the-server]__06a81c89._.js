module.exports=[18622,(a,b,c)=>{b.exports=a.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},42602,(a,b,c)=>{"use strict";b.exports=a.r(18622)},87924,(a,b,c)=>{"use strict";b.exports=a.r(42602).vendored["react-ssr"].ReactJsxRuntime},72131,(a,b,c)=>{"use strict";b.exports=a.r(42602).vendored["react-ssr"].React},74389,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(10129),e=a.i(12303),f=a.i(52253),g=a.i(43657),h=a.i(35258);let i=`
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
`;function j(){let a=(0,c.useRef)(null),{positions:d,seeds:f}=(0,c.useMemo)(()=>{let a=new Float32Array(393216),b=new Float32Array(393216);for(let c=0;c<131072;c++){let d=3*c;a[d]=(Math.random()-.5)*5,a[d+1]=(Math.random()-.5)*.3,a[d+2]=(Math.random()-.5)*5,b[d]=Math.random(),b[d+1]=Math.random(),b[d+2]=Math.random()}return{positions:a,seeds:b}},[]),g=`
    uniform float uTime;
    uniform vec3 uAttractors[3];
    uniform vec3 uAttractorAxes[3];
    attribute vec3 aSeed;
    varying float vSpeed;
    varying float vLife;
    varying float vDistCenter;
    ${i}

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
  `,j=`
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
  `,k=(0,c.useMemo)(()=>({uTime:{value:0},uAttractors:{value:[new h.Vector3(-3,-.5,.5),new h.Vector3(2.8,.3,-1.5),new h.Vector3(.5,-1,2.5)]},uAttractorAxes:{value:[new h.Vector3(.1,1,.2).normalize(),new h.Vector3(-.3,1,.1).normalize(),new h.Vector3(.2,1,-.4).normalize()]}}),[]);return(0,e.useFrame)(b=>{a.current&&(a.current.material.uniforms.uTime.value=b.clock.getElapsedTime())}),(0,b.jsxs)("points",{ref:a,children:[(0,b.jsxs)("bufferGeometry",{children:[(0,b.jsx)("bufferAttribute",{attach:"attributes-position",args:[d,3]}),(0,b.jsx)("bufferAttribute",{attach:"attributes-aSeed",args:[f,3]})]}),(0,b.jsx)("shaderMaterial",{vertexShader:g,fragmentShader:j,uniforms:k,transparent:!0,depthWrite:!1,blending:h.AdditiveBlending})]})}function k(){let{camera:a,gl:b}=(0,f.useThree)(),d=(0,c.useRef)({x:0,y:0}),g=(0,c.useRef)({x:0,y:0}),h=(0,c.useCallback)(a=>{let c=b.domElement.getBoundingClientRect();d.current.x=((a.clientX-c.left)/c.width-.5)*2,d.current.y=((a.clientY-c.top)/c.height-.5)*2},[b]);return(0,c.useEffect)(()=>(b.domElement.addEventListener("pointermove",h),()=>b.domElement.removeEventListener("pointermove",h)),[b,h]),(0,e.useFrame)(()=>{g.current.x+=(d.current.x-g.current.x)*.02,g.current.y+=(d.current.y-g.current.y)*.02,a.position.x=.5*g.current.x,a.position.y=2.5+-.3*g.current.y,a.lookAt(0,0,0)}),null}function l(){let[a,e]=(0,c.useState)(0);return(0,c.useEffect)(()=>{let a=setTimeout(()=>e(1),300),b=setTimeout(()=>e(2),1800);return()=>{clearTimeout(a),clearTimeout(b)}},[]),(0,b.jsxs)("div",{className:"sp",children:[(0,b.jsxs)(d.Canvas,{dpr:[1,2],gl:{alpha:!0,antialias:!0},className:"sp-canvas",style:{position:"absolute",inset:0,zIndex:0,background:"#0a0a0a"},children:[(0,b.jsx)(g.PerspectiveCamera,{makeDefault:!0,position:[0,2,6],fov:55}),(0,b.jsx)(k,{}),(0,b.jsx)(c.Suspense,{fallback:null,children:(0,b.jsx)(j,{})})]}),(0,b.jsx)("div",{className:"sp-vignette"}),(0,b.jsxs)("svg",{className:"sp-hex sp-hex--tl",viewBox:"0 0 120 120",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,b.jsx)("path",{d:"M60 5 L110 30 L110 80 L60 105 L10 80 L10 30 Z",stroke:"rgba(180,180,180,0.08)",strokeWidth:"0.5"}),(0,b.jsx)("path",{d:"M60 20 L95 38 L95 72 L60 90 L25 72 L25 38 Z",stroke:"rgba(180,180,180,0.05)",strokeWidth:"0.5"})]}),(0,b.jsx)("svg",{className:"sp-hex sp-hex--br",viewBox:"0 0 120 120",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,b.jsx)("path",{d:"M60 5 L110 30 L110 80 L60 105 L10 80 L10 30 Z",stroke:"rgba(180,180,180,0.06)",strokeWidth:"0.5"})}),(0,b.jsxs)("div",{className:`sp-content sp-phase-${a}`,children:[(0,b.jsxs)("h1",{className:"sp-title","data-text":"COMIENZA AHORA",children:[(0,b.jsx)("span",{className:"sp-title__line",children:"COMIENZA"}),(0,b.jsx)("span",{className:"sp-title__line",children:"AHORA"})]}),(0,b.jsx)("p",{className:"sp-sub",children:"BE FREE"}),(0,b.jsxs)("div",{className:"sp-buttons",children:[(0,b.jsxs)("a",{href:"https://apps.apple.com/mx/app/yakoob/id6758861392",target:"_blank",rel:"noopener noreferrer",className:"sp-btn",children:[(0,b.jsx)("span",{className:"sp-btn__text",children:"COMIENZA AHORA"}),(0,b.jsx)("span",{className:"sp-btn__border"})]}),(0,b.jsxs)("a",{href:"#",className:"sp-btn sp-btn--ghost",children:[(0,b.jsx)("span",{className:"sp-btn__text",children:"CONTACTO"}),(0,b.jsx)("span",{className:"sp-btn__border"})]})]})]})]})}a.s(["default",()=>l])}];

//# sourceMappingURL=%5Broot-of-the-server%5D__06a81c89._.js.map