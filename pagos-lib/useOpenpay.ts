import { useCallback, useEffect, useRef, useState } from 'react'
import { SCRIPTS_OPENPAY, esSandbox, llavePublica, merchantId } from './config'

/**
 * Carga de `openpay.js` y tokenización en el navegador — punto 1 de la
 * validación técnica.
 *
 * Todo el objetivo del token es que el número de tarjeta no pase por nuestro
 * servidor: se captura en el formulario, se manda directo a Openpay desde el
 * navegador y lo que sigue el viaje hacia `/api/pagos` es un identificador de
 * un solo uso. Sin esto, el comercio necesitaría certificación PCI DSS nivel 1.
 *
 * `openpay-data.js` es el recolector antifraude: devuelve el `device_session_id`
 * que Openpay exige en el alta de tarjeta y en el cargo.
 */

type DatosTarjetaOpenpay = {
  card_number: string
  holder_name: string
  expiration_year: string
  expiration_month: string
  cvv2: string
}

type RespuestaToken = { data: { id: string } }
type ErrorToken = { data?: { error_code?: number; description?: string }; message?: string }

type OpenPayGlobal = {
  setId: (id: string) => void
  setApiKey: (clave: string) => void
  setSandboxMode: (activo: boolean) => void
  token: {
    create: (
      datos: DatosTarjetaOpenpay,
      exito: (respuesta: RespuestaToken) => void,
      fallo: (error: ErrorToken) => void,
    ) => void
  }
  deviceData: { setup: (formId?: string, campoId?: string) => string }
}

declare global {
  interface Window {
    OpenPay?: OpenPayGlobal
  }
}

function cargarScript(src: string): Promise<void> {
  return new Promise((resolver, rechazar) => {
    const existente = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`)
    if (existente) {
      if (existente.dataset.cargado === '1') resolver()
      else {
        existente.addEventListener('load', () => resolver())
        existente.addEventListener('error', () => rechazar(new Error(`No cargó ${src}`)))
      }
      return
    }
    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.addEventListener('load', () => {
      script.dataset.cargado = '1'
      resolver()
    })
    script.addEventListener('error', () => rechazar(new Error(`No cargó ${src}`)))
    document.head.appendChild(script)
  })
}

export type EstadoOpenpay = 'cargando' | 'listo' | 'error' | 'sin-configurar'

export function useOpenpay() {
  const [estado, setEstado] = useState<EstadoOpenpay>('cargando')
  const deviceSessionId = useRef<string | null>(null)

  useEffect(() => {
    let vivo = true

    if (!merchantId || !llavePublica) {
      // Falta configuración: mejor decirlo claro en consola que fallar con un
      // «no se pudo procesar» opaco en medio de la cita de validación.
      console.error(
        '[pagos] Faltan NEXT_PUBLIC_OPENPAY_MERCHANT_ID o NEXT_PUBLIC_OPENPAY_PUBLIC_KEY.',
      )
      setEstado('sin-configurar')
      return
    }

    Promise.all([cargarScript(SCRIPTS_OPENPAY.core), cargarScript(SCRIPTS_OPENPAY.antifraude)])
      .then(() => {
        if (!vivo) return
        const openpay = window.OpenPay
        if (!openpay) throw new Error('openpay.js cargó pero no expuso OpenPay')

        openpay.setId(merchantId)
        openpay.setApiKey(llavePublica)
        // Punto 2: durante la cita de validación esto tiene que estar en true.
        openpay.setSandboxMode(esSandbox)

        deviceSessionId.current = openpay.deviceData.setup()
        setEstado('listo')
      })
      .catch((fallo) => {
        if (!vivo) return
        console.error('[pagos] no se pudo inicializar Openpay', fallo)
        setEstado('error')
      })

    return () => {
      vivo = false
    }
  }, [])

  /**
   * Devuelve el `token_id`. Rechaza con el `error_code` de Openpay para que la
   * pantalla pueda decidir si el usuario debe corregir el formulario.
   */
  const tokenizar = useCallback((datos: DatosTarjetaOpenpay): Promise<string> => {
    return new Promise((resolver, rechazar) => {
      const openpay = window.OpenPay
      if (!openpay) {
        rechazar(new Error('Openpay no está inicializado'))
        return
      }
      openpay.token.create(
        datos,
        (respuesta) => resolver(respuesta.data.id),
        (error) => {
          const codigo = error?.data?.error_code
          const fallo = new Error(String(codigo ?? 'token')) as Error & { codigo?: number }
          fallo.codigo = codigo
          rechazar(fallo)
        },
      )
    })
  }, [])

  return {
    estado,
    listo: estado === 'listo',
    esSandbox,
    tokenizar,
    obtenerDeviceSessionId: () => deviceSessionId.current,
  }
}
