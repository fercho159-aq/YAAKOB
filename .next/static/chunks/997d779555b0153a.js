(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,20976,e=>{"use strict";var t=e.i(43476),a=e.i(71645),s=e.i(75056),r=e.i(71753),i=e.i(15080),o=e.i(82897),n=e.i(90072);let l=`
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
`;function c(){let e=(0,a.useRef)(null),{positions:s,seeds:i}=(0,a.useMemo)(()=>{let e=new Float32Array(393216),t=new Float32Array(393216);for(let a=0;a<131072;a++){let s=3*a;e[s]=(Math.random()-.5)*5,e[s+1]=(Math.random()-.5)*.3,e[s+2]=(Math.random()-.5)*5,t[s]=Math.random(),t[s+1]=Math.random(),t[s+2]=Math.random()}return{positions:e,seeds:t}},[]),o=`
    uniform float uTime;
    uniform vec3 uAttractors[3];
    uniform vec3 uAttractorAxes[3];
    attribute vec3 aSeed;
    varying float vSpeed;
    varying float vLife;
    varying float vDistCenter;
    ${l}

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
  `,c=`
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
  `,x=(0,a.useMemo)(()=>({uTime:{value:0},uAttractors:{value:[new n.Vector3(-3,-.5,.5),new n.Vector3(2.8,.3,-1.5),new n.Vector3(.5,-1,2.5)]},uAttractorAxes:{value:[new n.Vector3(.1,1,.2).normalize(),new n.Vector3(-.3,1,.1).normalize(),new n.Vector3(.2,1,-.4).normalize()]}}),[]);return(0,r.useFrame)(t=>{e.current&&(e.current.material.uniforms.uTime.value=t.clock.getElapsedTime())}),(0,t.jsxs)("points",{ref:e,children:[(0,t.jsxs)("bufferGeometry",{children:[(0,t.jsx)("bufferAttribute",{attach:"attributes-position",args:[s,3]}),(0,t.jsx)("bufferAttribute",{attach:"attributes-aSeed",args:[i,3]})]}),(0,t.jsx)("shaderMaterial",{vertexShader:o,fragmentShader:c,uniforms:x,transparent:!0,depthWrite:!1,blending:n.AdditiveBlending})]})}function x(){let{camera:e,gl:t}=(0,i.useThree)(),s=(0,a.useRef)({x:0,y:0}),o=(0,a.useRef)({x:0,y:0}),n=(0,a.useCallback)(e=>{let a=t.domElement.getBoundingClientRect();s.current.x=((e.clientX-a.left)/a.width-.5)*2,s.current.y=((e.clientY-a.top)/a.height-.5)*2},[t]);return(0,a.useEffect)(()=>(t.domElement.addEventListener("pointermove",n),()=>t.domElement.removeEventListener("pointermove",n)),[t,n]),(0,r.useFrame)(()=>{o.current.x+=(s.current.x-o.current.x)*.02,o.current.y+=(s.current.y-o.current.y)*.02,e.position.x=.5*o.current.x,e.position.y=2.5+-.3*o.current.y,e.lookAt(0,0,0)}),null}function d(){let[e,r]=(0,a.useState)(0);return(0,a.useEffect)(()=>{let e=setTimeout(()=>r(1),300),t=setTimeout(()=>r(2),1800);return()=>{clearTimeout(e),clearTimeout(t)}},[]),(0,t.jsxs)("div",{className:"sp",children:[(0,t.jsxs)(s.Canvas,{dpr:[1,2],gl:{alpha:!0,antialias:!0},className:"sp-canvas",style:{position:"absolute",inset:0,zIndex:0,background:"#0a0a0a"},children:[(0,t.jsx)(o.PerspectiveCamera,{makeDefault:!0,position:[0,2,6],fov:55}),(0,t.jsx)(x,{}),(0,t.jsx)(a.Suspense,{fallback:null,children:(0,t.jsx)(c,{})})]}),(0,t.jsx)("div",{className:"sp-vignette"}),(0,t.jsxs)("svg",{className:"sp-hex sp-hex--tl",viewBox:"0 0 120 120",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,t.jsx)("path",{d:"M60 5 L110 30 L110 80 L60 105 L10 80 L10 30 Z",stroke:"rgba(180,180,180,0.08)",strokeWidth:"0.5"}),(0,t.jsx)("path",{d:"M60 20 L95 38 L95 72 L60 90 L25 72 L25 38 Z",stroke:"rgba(180,180,180,0.05)",strokeWidth:"0.5"})]}),(0,t.jsx)("svg",{className:"sp-hex sp-hex--br",viewBox:"0 0 120 120",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,t.jsx)("path",{d:"M60 5 L110 30 L110 80 L60 105 L10 80 L10 30 Z",stroke:"rgba(180,180,180,0.06)",strokeWidth:"0.5"})}),(0,t.jsxs)("div",{className:`sp-content sp-phase-${e}`,children:[(0,t.jsxs)("h1",{className:"sp-title","data-text":"COMIENZA AHORA",children:[(0,t.jsx)("span",{className:"sp-title__line",children:"COMIENZA"}),(0,t.jsx)("span",{className:"sp-title__line",children:"AHORA"})]}),(0,t.jsx)("p",{className:"sp-sub",children:"BE FREE"}),(0,t.jsxs)("div",{className:"sp-buttons",children:[(0,t.jsxs)("a",{href:"https://apps.apple.com/mx/app/yakoob/id6758861392",target:"_blank",rel:"noopener noreferrer",className:"sp-btn",children:[(0,t.jsx)("span",{className:"sp-btn__text",children:"COMIENZA AHORA"}),(0,t.jsx)("span",{className:"sp-btn__border"})]}),(0,t.jsxs)("a",{href:"#",className:"sp-btn sp-btn--ghost",children:[(0,t.jsx)("span",{className:"sp-btn__text",children:"CONTACTO"}),(0,t.jsx)("span",{className:"sp-btn__border"})]})]})]})]})}e.s(["default",()=>d])}]);