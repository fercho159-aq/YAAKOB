/**
 * Punto 6 de la validación técnica: límites del formulario de cobro.
 *
 *   · número de tarjeta — máximo 16 dígitos numéricos, sin letras;
 *   · CVV — máximo 4 dígitos;
 *   · vencimiento — 2 dígitos de mes y 2 de año.
 *
 * Los límites se aplican al escribir (los `filtrar*`) y se vuelven a comprobar
 * al enviar (los `validar*`). Sólo con `maxLength` no basta: un pegado desde el
 * portapapeles o un autocompletado del navegador se lo salta.
 */

export const LARGO_MAX_TARJETA = 16
export const LARGO_MAX_CVV = 4
export const LARGO_MIN_CVV = 3

const soloDigitos = (valor: string) => valor.replace(/\D/g, '')

/* ------------------------------------------------------------------ filtros */

/** Deja sólo dígitos, corta a 16 y agrupa de cuatro en cuatro para leerlo. */
export function filtrarTarjeta(valor: string): string {
  const digitos = soloDigitos(valor).slice(0, LARGO_MAX_TARJETA)
  return digitos.replace(/(\d{4})(?=\d)/g, '$1 ').trim()
}

export function filtrarCvv(valor: string): string {
  return soloDigitos(valor).slice(0, LARGO_MAX_CVV)
}

export function filtrarMes(valor: string): string {
  return soloDigitos(valor).slice(0, 2)
}

export function filtrarAnio(valor: string): string {
  return soloDigitos(valor).slice(0, 2)
}

export function digitosDeTarjeta(valor: string): string {
  return soloDigitos(valor)
}

/* -------------------------------------------------------------- validación */

/** Luhn. Openpay lo revalida, pero atajarlo aquí evita un viaje y un error 2004. */
export function pasaLuhn(numero: string): boolean {
  const digitos = soloDigitos(numero)
  if (digitos.length < 13) return false
  let suma = 0
  let alterna = false
  for (let i = digitos.length - 1; i >= 0; i -= 1) {
    let d = Number(digitos[i])
    if (alterna) {
      d *= 2
      if (d > 9) d -= 9
    }
    suma += d
    alterna = !alterna
  }
  return suma % 10 === 0
}

export type CamposTarjeta = {
  titular: string
  numero: string
  mes: string
  anio: string
  cvv: string
}

export type ErroresTarjeta = Partial<Record<keyof CamposTarjeta, string>>

/** Devuelve un objeto vacío cuando todo está bien. */
export function validarTarjeta(campos: CamposTarjeta, ahora = new Date()): ErroresTarjeta {
  const errores: ErroresTarjeta = {}

  if (campos.titular.trim().length < 3) {
    errores.titular = 'Escriba el nombre como aparece en la tarjeta.'
  }

  const numero = soloDigitos(campos.numero)
  if (numero.length < 13 || numero.length > LARGO_MAX_TARJETA) {
    errores.numero = 'El número de tarjeta debe tener entre 13 y 16 dígitos.'
  } else if (!pasaLuhn(numero)) {
    errores.numero = 'El número de tarjeta no es válido.'
  }

  const mes = Number(campos.mes)
  if (!/^\d{2}$/.test(campos.mes) || mes < 1 || mes > 12) {
    errores.mes = 'Mes inválido (01–12).'
  }

  if (!/^\d{2}$/.test(campos.anio)) {
    errores.anio = 'Año inválido (AA).'
  }

  if (!errores.mes && !errores.anio) {
    const anioCompleto = 2000 + Number(campos.anio)
    // Una tarjeta vence al final de su mes de vencimiento.
    const vence = new Date(anioCompleto, mes, 0, 23, 59, 59)
    if (vence < ahora) {
      errores.anio = 'La tarjeta está vencida.'
    }
  }

  if (campos.cvv.length < LARGO_MIN_CVV || campos.cvv.length > LARGO_MAX_CVV) {
    errores.cvv = 'El código de seguridad debe tener 3 o 4 dígitos.'
  }

  return errores
}

/** Sirve igual para los errores de la tarjeta y para los del titular. */
export function hayErrores<T extends object>(errores: T): boolean {
  return Object.keys(errores).length > 0
}

/* ------------------------------------------------------------ datos cliente */

export type CamposCliente = {
  nombre: string
  apellido: string
  correo: string
  telefono: string
}

export type ErroresCliente = Partial<Record<keyof CamposCliente, string>>

const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function filtrarTelefono(valor: string): string {
  return valor.replace(/[^\d+\s()-]/g, '').slice(0, 20)
}

export function validarCliente(campos: CamposCliente): ErroresCliente {
  const errores: ErroresCliente = {}
  if (campos.nombre.trim().length < 2) errores.nombre = 'Escriba su nombre.'
  if (campos.apellido.trim().length < 2) errores.apellido = 'Escriba sus apellidos.'
  if (!CORREO.test(campos.correo.trim())) errores.correo = 'Escriba un correo electrónico válido.'
  if (soloDigitos(campos.telefono).length < 10) errores.telefono = 'Escriba un teléfono a 10 dígitos.'
  return errores
}
