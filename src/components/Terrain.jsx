import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const Terrain = () => {
  const meshRef = useRef()
  const mouseRef = useRef({ x: 0, y: 0 })

  // Mouse tracking for tilt effect
  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    })
  }

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      // Colores ajustados para contraste en fondo claro
      uBaseColor: { value: new THREE.Color('#eef2f5') },
      uLineColor: { value: new THREE.Color('#4a6a7a') }, // Azul más oscuro para que se vea
    }),
    []
  )

  // Base rotation values
  const baseRotation = [-4.2, 0.5, 0.5]

  useFrame((state) => {
    meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime()

    // Tilt effect following mouse - synced with other elements
    const targetRotationX = baseRotation[0] + mouseRef.current.y * 0.2
    const targetRotationY = baseRotation[1] + mouseRef.current.x * 0.2

    meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * 0.08
    meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * 0.08
  })

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vNormal;
    uniform float uTime;

    void main() {
      vUv = uv;
      vec3 pos = position;

      // Dinámica de torsión física
      float twist = pos.z * 0.4;
      float s = sin(twist + uTime * 0.40);
      float c = cos(twist + uTime * 0.40);
      mat2 m = mat2(c, -s, s, c);
      pos.xy = m * pos.xy;

      vNormal = normalMatrix * normal;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `

  const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  uniform float uTime;
  uniform vec3 uBaseColor;
  uniform vec3 uLineColor;

  void main() {
    // === CAMBIO A LÍNEAS VERTICALES ===
    // Al usar vUv.x como base principal, las líneas fluyen 
    // a lo largo del recorrido del vórtice.
    float verticalCoord = vUv.x; 
    
    // Si quieres que tengan una ligera inclinación (estilo fibra orgánica)
    // sumamos una pequeña fracción de vUv.y
    float flow = verticalCoord + (vUv.y * 0.1) - uTime * 0.05;

    // Frecuencia alta para muchas líneas finas
    float lines = sin(flow * 400.0); 
    lines += sin(flow * 800.0) * 0.5; // Capa de detalle extra
    
    // Definición de la línea (mantiene el aspecto de seda)
    float pattern = smoothstep(0.7, 1.0, lines);
    
    // Opacidad: desvanecer en los extremos Y ADEMAS en la parte inferior
    // vUv.y va de 0 a 1 alrededor del tubo del toroide
    // Agregamos un fade mas fuerte en la mitad inferior para que se pierda
    
    // Suavizado general en extremos
    float edge = smoothstep(0.0, 0.1, vUv.y) * smoothstep(1.0, 0.9, vUv.y);
    
    // Máscara para borrar la parte "inferior" o trasera visualmente
    // Ajusta el 0.4 y 0.6 para controlar dónde empieza y termina el desvanecido
    float bottomMask = smoothstep(0.5, 0.7, vUv.y); 
    
    float alpha = pattern * edge * bottomMask * 0.6;

    // Color final
    vec3 finalColor = mix(uBaseColor, uLineColor, pattern);

    // Brillo sutil (Efecto Fresnel para realzar el volumen)
    float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0,0,1))), 2.0);
    finalColor += fresnel * 0.15;

    gl_FragColor = vec4(finalColor, alpha);
    
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`

  return (
    <mesh ref={meshRef} rotation={[-4.2, 0.5, 0.5]} position={[2, -6, -15]}>
      {/* Más resolución para evitar dientes de sierra */}
      <torusGeometry args={[10, 6, 128, 512]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        side={THREE.DoubleSide}
        depthWrite={false}
        // Cambiado a NormalBlending para que los oscuros se vean sobre blanco
        blending={THREE.NormalBlending}
      />
    </mesh>
  )
}

export default Terrain