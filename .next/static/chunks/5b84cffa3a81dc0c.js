(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,20976,e=>{"use strict";var t=e.i(43476),s=e.i(71645),a=e.i(75056),r=e.i(71753),i=e.i(15080),o=e.i(82897),l=e.i(90072);let n=`
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
`;function c(){let e=(0,s.useRef)(null),{positions:a,seeds:i}=(0,s.useMemo)(()=>{let e=new Float32Array(393216),t=new Float32Array(393216);for(let s=0;s<131072;s++){let a=3*s;e[a]=(Math.random()-.5)*5,e[a+1]=(Math.random()-.5)*.3,e[a+2]=(Math.random()-.5)*5,t[a]=Math.random(),t[a+1]=Math.random(),t[a+2]=Math.random()}return{positions:e,seeds:t}},[]),o=`
    uniform float uTime;
    uniform vec3 uAttractors[3];
    uniform vec3 uAttractorAxes[3];
    attribute vec3 aSeed;
    varying float vSpeed;
    varying float vLife;
    varying float vDistCenter;
    ${n}

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
  `,d=(0,s.useMemo)(()=>({uTime:{value:0},uAttractors:{value:[new l.Vector3(-3,-.5,.5),new l.Vector3(2.8,.3,-1.5),new l.Vector3(.5,-1,2.5)]},uAttractorAxes:{value:[new l.Vector3(.1,1,.2).normalize(),new l.Vector3(-.3,1,.1).normalize(),new l.Vector3(.2,1,-.4).normalize()]}}),[]);return(0,r.useFrame)(t=>{e.current&&(e.current.material.uniforms.uTime.value=t.clock.getElapsedTime())}),(0,t.jsxs)("points",{ref:e,children:[(0,t.jsxs)("bufferGeometry",{children:[(0,t.jsx)("bufferAttribute",{attach:"attributes-position",args:[a,3]}),(0,t.jsx)("bufferAttribute",{attach:"attributes-aSeed",args:[i,3]})]}),(0,t.jsx)("shaderMaterial",{vertexShader:o,fragmentShader:c,uniforms:d,transparent:!0,depthWrite:!1,blending:l.AdditiveBlending})]})}function d(){let{camera:e,gl:t}=(0,i.useThree)(),a=(0,s.useRef)({x:0,y:0}),o=(0,s.useRef)({x:0,y:0}),l=(0,s.useCallback)(e=>{let s=t.domElement.getBoundingClientRect();a.current.x=((e.clientX-s.left)/s.width-.5)*2,a.current.y=((e.clientY-s.top)/s.height-.5)*2},[t]);return(0,s.useEffect)(()=>(t.domElement.addEventListener("pointermove",l),()=>t.domElement.removeEventListener("pointermove",l)),[t,l]),(0,r.useFrame)(()=>{o.current.x+=(a.current.x-o.current.x)*.02,o.current.y+=(a.current.y-o.current.y)*.02,e.position.x=.5*o.current.x,e.position.y=2.5+-.3*o.current.y,e.lookAt(0,0,0)}),null}let p=["נ","ח","ל","פ","כ","ע","ם","ד","ר","ב","א","י"];function m({onDone:e}){let[a,r]=(0,s.useState)(0);return(0,s.useEffect)(()=>{let t=setTimeout(()=>r(1),100),s=setTimeout(()=>r(2),4500),a=setTimeout(()=>e(),5500);return()=>{clearTimeout(t),clearTimeout(s),clearTimeout(a)}},[e]),(0,t.jsxs)("div",{className:`splash splash--phase-${a}`,children:[(0,t.jsx)("div",{className:"splash-bg-glyph",children:"מ"}),(0,t.jsx)("div",{className:"splash-corner splash-corner--tl"}),(0,t.jsx)("div",{className:"splash-corner splash-corner--tr"}),(0,t.jsx)("div",{className:"splash-corner splash-corner--bl"}),(0,t.jsx)("div",{className:"splash-corner splash-corner--br"}),p.map((e,s)=>(0,t.jsx)("span",{className:"splash-float",style:{top:`${12+7*s%76}%`,left:`${8+(13*s+5)%84}%`,animationDelay:`${.18*s}s`,animationDuration:`${3+s%3}s`},children:e},s)),(0,t.jsxs)("div",{className:"splash-center",children:[(0,t.jsx)("p",{className:"splash-psalm-line",children:"אֱלֹהִים יְחָנֵּנוּ וִיבָרְכֵנוּ יָאֵר פָּנָיו אִתָּנוּ סֶלָה"}),(0,t.jsx)("p",{className:"splash-psalm-line",children:"לָדַעַת בָּאָרֶץ דַּרְכֶּךָ בְּכָל גּוֹיִם יְשׁוּעָתֶךָ"}),(0,t.jsx)("p",{className:"splash-psalm-line",children:"יוֹדוּךָ עַמִּים אֱלֹהִים יוֹדוּךָ עַמִּים כֻּלָּם"})]})]})}function x(){let[e,r]=(0,s.useState)(!0),[i,l]=(0,s.useState)(0),[n,p]=(0,s.useState)(!1),x=(0,s.useCallback)(()=>{r(!1),setTimeout(()=>l(1),300),setTimeout(()=>l(2),1800)},[]);return(0,t.jsxs)("div",{className:"sp",children:[e&&(0,t.jsx)(m,{onDone:x}),(0,t.jsxs)(a.Canvas,{dpr:[1,2],gl:{alpha:!0,antialias:!0},className:"sp-canvas",style:{position:"absolute",inset:0,zIndex:0,background:"#0a0a0a"},children:[(0,t.jsx)(o.PerspectiveCamera,{makeDefault:!0,position:[0,2,6],fov:55}),(0,t.jsx)(d,{}),(0,t.jsx)(s.Suspense,{fallback:null,children:(0,t.jsx)(c,{})})]}),(0,t.jsx)("div",{className:"sp-vignette"}),(0,t.jsxs)("svg",{className:"sp-hex sp-hex--tl",viewBox:"0 0 120 120",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,t.jsx)("path",{d:"M60 5 L110 30 L110 80 L60 105 L10 80 L10 30 Z",stroke:"rgba(180,180,180,0.08)",strokeWidth:"0.5"}),(0,t.jsx)("path",{d:"M60 20 L95 38 L95 72 L60 90 L25 72 L25 38 Z",stroke:"rgba(180,180,180,0.05)",strokeWidth:"0.5"})]}),(0,t.jsx)("svg",{className:"sp-hex sp-hex--br",viewBox:"0 0 120 120",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,t.jsx)("path",{d:"M60 5 L110 30 L110 80 L60 105 L10 80 L10 30 Z",stroke:"rgba(180,180,180,0.06)",strokeWidth:"0.5"})}),(0,t.jsxs)("div",{className:`sp-content sp-phase-${i}`,children:[(0,t.jsxs)("h1",{className:"sp-title","data-text":"COMIENZA AHORA",children:[(0,t.jsx)("span",{className:"sp-title__line",children:"COMIENZA"}),(0,t.jsx)("span",{className:"sp-title__line",children:"AHORA"})]}),(0,t.jsx)("p",{className:"sp-sub",children:"BE FREE"}),(0,t.jsx)("div",{className:"sp-buttons",children:(0,t.jsxs)("button",{onClick:()=>p(!0),className:"sp-btn",children:[(0,t.jsx)("span",{className:"sp-btn__text",children:"COMIENZA AHORA"}),(0,t.jsx)("span",{className:"sp-btn__border"})]})})]}),n&&(0,t.jsx)("div",{className:"sp-modal-overlay",onClick:()=>p(!1),children:(0,t.jsxs)("div",{className:"sp-modal",onClick:e=>e.stopPropagation(),children:[(0,t.jsx)("button",{className:"sp-modal__close",onClick:()=>p(!1),children:"✕"}),(0,t.jsx)("h2",{className:"sp-modal__title",children:"DESCARGA LA APP"}),(0,t.jsx)("p",{className:"sp-modal__sub",children:"Elige tu plataforma"}),(0,t.jsxs)("div",{className:"sp-modal__links",children:[(0,t.jsxs)("a",{href:"https://apps.apple.com/mx/app/yaakob/id6758861392",target:"_blank",rel:"noopener noreferrer",className:"sp-modal__btn",children:[(0,t.jsx)("svg",{viewBox:"0 0 24 24",width:"24",height:"24",fill:"currentColor",children:(0,t.jsx)("path",{d:"M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"})}),(0,t.jsx)("span",{children:"App Store"})]}),(0,t.jsxs)("a",{href:"https://play.google.com/store/apps/details?id=com.fernandotrejo.consultora&hl=es_MX",target:"_blank",rel:"noopener noreferrer",className:"sp-modal__btn",children:[(0,t.jsx)("svg",{viewBox:"0 0 24 24",width:"24",height:"24",fill:"currentColor",children:(0,t.jsx)("path",{d:"M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 010 1.38l-2.302 2.302L15.092 12l2.606-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"})}),(0,t.jsx)("span",{children:"Google Play"})]})]})]})})]})}e.s(["default",()=>x])}]);