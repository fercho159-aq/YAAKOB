/**
 * Copy de la página /apps. Los textos son los del póster "La app que te
 * acompaña" y de los globos descriptivos que mandó el cliente; las capturas
 * salen de `scripts/optimize-app-screens.mjs` (mismo orden que el póster).
 */

export interface Screen {
  src: string
  alt: string
  width: number
  height: number
}

export interface Feature {
  id: string
  title: string
  body: string
  screen: Screen
}

export const HERO = {
  titleStrong: 'La app',
  titleRest: 'que te acompaña',
  subtitle: 'Consulta, calcula, comprende y actúa desde una sola app.',
  body: 'Herramientas creadas para convertir procesos fiscales complejos en decisiones claras, rápidas y seguras.',
}

export const FEATURES: Feature[] = [
  {
    id: 'presentacion',
    title: 'Asesoría fiscal integral',
    body: 'Defensa, regularización, prevención y asesoría en un solo lugar.',
    screen: { src: '/app/screens/01-presentacion.webp', alt: 'Pantalla de inicio de la app Yaakob Consultores', width: 692, height: 1400 },
  },
  {
    id: 'registro-rfc',
    title: 'Registro fiscal seguro',
    body: 'Consulta y valida tu RFC con información del SAT.',
    screen: { src: '/app/screens/02-registro-rfc.webp', alt: 'Registro: la app consulta los datos del RFC en el SAT', width: 628, height: 1331 },
  },
  {
    id: 'bienvenida',
    title: 'Acceso confirmado',
    body: 'Recibe los términos y continúa de forma segura.',
    screen: { src: '/app/screens/03-bienvenida.webp', alt: 'Pantalla de bienvenida con el envío de términos y condiciones', width: 709, height: 1400 },
  },
  {
    id: 'chat-consultor',
    title: 'Atención personalizada',
    body: 'Conversa con tu consultor fiscal desde la aplicación.',
    screen: { src: '/app/screens/04-chat-consultor.webp', alt: 'Lista de chats con el consultor fiscal', width: 613, height: 1356 },
  },
  {
    id: 'resumen-sat',
    title: 'Resumen fiscal inteligente',
    body: 'Analiza documentos del SAT y descarga un informe claro y fácil de entender.',
    screen: { src: '/app/screens/05-resumen-sat.webp', alt: 'Resumen ejecutivo de un documento del SAT listo para descargar', width: 589, height: 1222 },
  },
  {
    id: 'consulta-rfc',
    title: 'Consulta de RFC',
    body: 'Verifica datos fiscales, situación y publicaciones oficiales.',
    screen: { src: '/app/screens/06-consulta-rfc.webp', alt: 'Buscador de RFC con datos fiscales y situación', width: 563, height: 1217 },
  },
  {
    id: 'calculadora-rfc',
    title: 'Calcula tu RFC',
    body: 'Genera una referencia informativa con tus datos personales.',
    screen: { src: '/app/screens/07-calculadora-rfc.webp', alt: 'Calculadora de RFC para persona física', width: 638, height: 1395 },
  },
  {
    id: 'calculadora-adeudos',
    title: 'Calcula tus adeudos',
    body: 'Estima actualización y recargos de obligaciones fiscales.',
    screen: { src: '/app/screens/08-calculadora-adeudos.webp', alt: 'Calculadora fiscal de adeudos con actualización y recargos', width: 621, height: 1338 },
  },
  {
    id: 'validacion-biometrica',
    title: 'Identidad protegida',
    body: 'Confirma identidad mediante biometría y prueba de vida.',
    screen: { src: '/app/screens/09-validacion-biometrica.webp', alt: 'Validación biométrica con credencial INE y reconocimiento facial', width: 573, height: 1249 },
  },
  {
    id: 'consulta-dof',
    title: 'Consulta el DOF',
    body: 'Localiza publicaciones oficiales relacionadas con tu RFC.',
    screen: { src: '/app/screens/10-consulta-dof.webp', alt: 'Revisión de publicaciones del Diario Oficial de la Federación por RFC', width: 624, height: 1400 },
  },
  {
    id: 'explicacion-legal',
    title: 'Leyes sin tecnicismos',
    body: 'Analiza documentos fiscales y recibe una explicación sencilla.',
    screen: { src: '/app/screens/11-explicacion-legal.webp', alt: 'Explicación sencilla de un documento legal subido a la app', width: 680, height: 1400 },
  },
  {
    id: 'agenda-cita',
    title: 'Agenda tu cita',
    body: 'Selecciona fecha y hora para recibir asesoría fiscal personalizada.',
    screen: { src: '/app/screens/12-agenda-cita.webp', alt: 'Agenda de citas presenciales con calendario y horarios', width: 531, height: 1190 },
  },
]

export interface Step {
  title: string
  body: string
  cta: string
}

/** Onboarding "Paso n de 5" del Resumen SAT, tal cual lo mandó el cliente. */
export const STEPS: Step[] = [
  {
    title: 'Descarga el documento original',
    body: 'Entra a tu Buzón Tributario y descarga directamente el oficio del SAT en formato PDF. No utilices capturas de pantalla, fotografías ni copias.',
    cta: 'Siguiente',
  },
  {
    title: 'Guárdalo en los archivos del teléfono',
    body: 'Guarda el PDF completo en la aplicación Archivos de tu celular. No lo edites, recortes, comprimas ni conviertas a otro formato.',
    cta: 'Siguiente',
  },
  {
    title: 'Abre el selector de documentos',
    body: 'En la aplicación, pulsa «Adjuntar documento» y después selecciona «Archivos» para acceder a los documentos guardados en tu teléfono.',
    cta: 'Siguiente',
  },
  {
    title: 'Selecciona el PDF original',
    body: 'Localiza el archivo descargado del Buzón Tributario. Verifica que sea el documento completo, que conserve el formato PDF y que abra correctamente.',
    cta: 'Siguiente',
  },
  {
    title: 'Genera el resumen del documento',
    body: 'Pulsa «Resumir». Recibirás una explicación clara con autoridad emisora, asunto, fechas, obligaciones, plazos, importes y posibles riesgos.',
    cta: 'Probar Demo',
  },
]

export const DEMO_HREF = '/start'
export const APP_LOGO = { src: '/app/logo-app.webp', width: 512, height: 431 }
