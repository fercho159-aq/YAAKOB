/**
 * Punto 7 de la validación técnica.
 *
 * Openpay devuelve en el cargo un `error_code` y una `description` bastante
 * explícita. Openpay pide expresamente que «Fondos insuficientes» y «Tarjeta
 * reportada como perdida o robada» NO se muestren al tarjetahabiente —
 * decirle a quien está frente a la pantalla que la tarjeta está reportada como
 * robada es información que el comercio no debe revelar — y que se sustituyan
 * por «Tarjeta declinada».
 *
 * La regla que se aplica aquí es más estricta que el mínimo: el servidor nunca
 * devuelve al navegador el texto crudo de Openpay ni del emisor. Sólo devuelve
 * uno de los mensajes de este archivo. Si aparece un código desconocido, cae en
 * el mensaje genérico.
 */

/** Lo que se muestra siempre que el motivo no deba revelarse. */
export const DECLINADA_GENERICA = 'Tarjeta declinada. Verifique con su banco o intente con otra tarjeta.'

/**
 * Códigos de error de Openpay → mensaje que ve el usuario.
 * Referencia: https://documents.openpay.mx/docs/errors.html
 */
const MENSAJES: Record<string, string> = {
  // --- Errores de la petición / de la tarjeta capturada -------------------
  '2004': 'El número de tarjeta no es válido. Revíselo e intente de nuevo.',
  '2005': 'La fecha de vencimiento es anterior a la fecha actual.',
  '2006': 'Falta el código de seguridad (CVV) de la tarjeta.',
  '2007': 'Esta tarjeta es de prueba y sólo funciona en el ambiente de pruebas.',
  '2008': 'La tarjeta no es válida para esta operación.',
  '2009': 'El código de seguridad (CVV) no es válido.',
  '2010': 'La autenticación 3D Secure no se completó. Intente de nuevo.',
  '2011': 'El tipo de tarjeta no está soportado.',

  // --- Declinaciones del emisor -------------------------------------------
  '3001': DECLINADA_GENERICA,
  '3002': 'La tarjeta está vencida.',
  // 3003 = fondos insuficientes → Openpay pide ocultarlo.
  '3003': DECLINADA_GENERICA,
  // 3004 = reportada como robada / 3009 = reportada como perdida → ocultarlos.
  '3004': DECLINADA_GENERICA,
  '3005': DECLINADA_GENERICA,
  '3006': 'La operación no está permitida para esta tarjeta.',
  '3008': 'La tarjeta no está habilitada para compras en línea.',
  '3009': DECLINADA_GENERICA,
  '3010': DECLINADA_GENERICA,
  '3011': 'Su banco requiere autorización para este cargo. Comuníquese con el emisor.',
  '3012': 'Su banco requiere autorización para este cargo. Comuníquese con el emisor.',

  // --- 3D Secure -----------------------------------------------------------
  '3201': 'No se pudo completar la autenticación con su banco. Intente de nuevo.',
  '3203': 'La autenticación 3D Secure fue rechazada por su banco.',
}

/**
 * Nunca reciba el error crudo el navegador: esta función es el único punto por
 * el que un fallo de cobro se convierte en texto para el usuario.
 */
export function mensajeDeDeclinacion(codigo?: string | number | null): string {
  if (codigo === undefined || codigo === null) return DECLINADA_GENERICA
  return MENSAJES[String(codigo)] ?? DECLINADA_GENERICA
}

/**
 * `true` cuando el fallo es de captura y vale la pena que el usuario corrija el
 * formulario, en vez de mandarlo a hablar con su banco.
 */
export function esErrorDeCaptura(codigo?: string | number | null): boolean {
  const c = String(codigo ?? '')
  return c.startsWith('2')
}
