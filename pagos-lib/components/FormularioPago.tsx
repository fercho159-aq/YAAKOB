import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import { useMemo, useRef, useState } from 'react'
import { formatearPrecio, type Plan } from '../planes'
import { nuevaReferenciaCliente } from '../referencia'
import { useOpenpay } from '../useOpenpay'
import {
  LARGO_MAX_CVV,
  LARGO_MAX_TARJETA,
  digitosDeTarjeta,
  filtrarAnio,
  filtrarCvv,
  filtrarMes,
  filtrarTarjeta,
  filtrarTelefono,
  hayErrores,
  validarCliente,
  validarTarjeta,
  type CamposCliente,
  type CamposTarjeta,
  type ErroresCliente,
  type ErroresTarjeta,
} from '../validacion'
import { LogosPago } from './LogosPago'

/**
 * Formulario de cobro.
 *
 * Cumple, en un solo lugar, los puntos 1, 6, 7, 12, 13 y 17 de la validación
 * técnica de Openpay:
 *
 *   · el número de tarjeta se tokeniza en el navegador y nunca se manda al
 *     servidor de Yaakob;
 *   · los campos están acotados al escribir y al enviar;
 *   · los mensajes de error son los que devuelve la API ya saneados —— esta
 *     pantalla nunca inventa ni reexpone el texto crudo del emisor;
 *   · el botón se bloquea con el primer clic y no vuelve a habilitarse mientras
 *     la operación siga viva;
 *   · los logos de Openpay y de las marcas están dentro del formulario.
 */

const etiqueta = {
  fontSize: '0.625rem',
  fontWeight: 'semibold',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.6)',
  mb: '0.375rem',
} as const

const campo = {
  bg: 'rgba(255,255,255,0.04)',
  border: '1px solid',
  borderColor: 'rgba(255,255,255,0.16)',
  borderRadius: '2px',
  h: '2.75rem',
  fontSize: '0.9375rem',
  letterSpacing: '0.02em',
  _hover: { borderColor: 'rgba(255,255,255,0.28)' },
  _focus: { borderColor: 'gold' },
  _placeholder: { color: 'rgba(255,255,255,0.28)' },
} as const

const CLIENTE_VACIO: CamposCliente = { nombre: '', apellido: '', correo: '', telefono: '' }
const TARJETA_VACIA: CamposTarjeta = { titular: '', numero: '', mes: '', anio: '', cvv: '' }

type Estado = 'capturando' | 'procesando' | 'redirigiendo'

export function FormularioPago({ plan }: { plan: Plan }) {
  const { listo, estado: estadoOpenpay, esSandbox, tokenizar, obtenerDeviceSessionId } = useOpenpay()

  const [cliente, setCliente] = useState<CamposCliente>(CLIENTE_VACIO)
  const [tarjeta, setTarjeta] = useState<CamposTarjeta>(TARJETA_VACIA)
  const [erroresCliente, setErroresCliente] = useState<ErroresCliente>({})
  const [erroresTarjeta, setErroresTarjeta] = useState<ErroresTarjeta>({})
  const [aviso, setAviso] = useState<string | null>(null)
  const [estado, setEstado] = useState<Estado>('capturando')

  /**
   * Punto 12. La referencia se fija UNA vez, al montar: mientras el usuario
   * siga en esta pantalla, todo reintento viaja con el mismo `order_id` y
   * Openpay rechaza el segundo cargo. El botón deshabilitado evita el doble
   * clic; esto evita el doble cobro.
   */
  const referencia = useMemo(() => nuevaReferenciaCliente(), [])

  /** Segundo cerrojo, por si un evento se cuela antes del re-render. */
  const enVuelo = useRef(false)

  const bloqueado = estado !== 'capturando'

  async function enviar(evento: React.FormEvent) {
    evento.preventDefault()
    if (enVuelo.current || bloqueado) return

    const fallosCliente = validarCliente(cliente)
    const fallosTarjeta = validarTarjeta(tarjeta)
    setErroresCliente(fallosCliente)
    setErroresTarjeta(fallosTarjeta)
    if (hayErrores(fallosCliente) || hayErrores(fallosTarjeta)) return

    const deviceSessionId = obtenerDeviceSessionId()
    if (!listo || !deviceSessionId) {
      setAviso('El sistema de pagos aún no termina de cargar. Espere un momento e intente de nuevo.')
      return
    }

    enVuelo.current = true
    setEstado('procesando')
    setAviso(null)

    try {
      const token = await tokenizar({
        card_number: digitosDeTarjeta(tarjeta.numero),
        holder_name: tarjeta.titular.trim(),
        expiration_month: tarjeta.mes,
        expiration_year: tarjeta.anio,
        cvv2: tarjeta.cvv,
      })

      const respuesta = await fetch('/api/pagos/suscripcion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: plan.id,
          token,
          deviceSessionId,
          referencia,
          cliente: {
            nombre: cliente.nombre.trim(),
            apellido: cliente.apellido.trim(),
            correo: cliente.correo.trim(),
            telefono: cliente.telefono.trim(),
          },
        }),
      })

      const datos = (await respuesta.json()) as {
        ok?: boolean
        estado?: string
        url?: string
        cargoId?: string
        mensaje?: string
        corregible?: boolean
      }

      if (datos.ok && datos.estado === '3ds' && datos.url) {
        // Punto 14: el usuario se va al banco. El botón queda bloqueado hasta
        // que el navegador abandone la página.
        setEstado('redirigiendo')
        window.location.assign(datos.url)
        return
      }

      if (datos.ok && datos.estado === 'confirmar' && datos.cargoId) {
        setEstado('redirigiendo')
        window.location.assign(`/suscripcion/resultado?id=${encodeURIComponent(datos.cargoId)}`)
        return
      }

      // Punto 7: se muestra tal cual lo que devuelve la API, que ya viene
      // saneado. Aquí no se traduce ni se adorna nada.
      setAviso(datos.mensaje ?? 'No pudimos procesar el cobro. Intente de nuevo.')
      setEstado('capturando')
      enVuelo.current = false
    } catch (fallo) {
      const codigo = (fallo as { codigo?: number }).codigo
      setAviso(
        codigo
          ? 'Revise los datos de la tarjeta: no pudimos validarla.'
          : 'No pudimos conectar con el procesador de pagos. Intente de nuevo en un momento.',
      )
      setEstado('capturando')
      enVuelo.current = false
    }
  }

  const textoBoton =
    estado === 'procesando'
      ? 'Procesando…'
      : estado === 'redirigiendo'
        ? 'Redirigiendo a su banco…'
        : `Contratar por ${formatearPrecio(plan.precio, plan.moneda)}`

  return (
    <Box as="form" onSubmit={enviar} noValidate>
      {esSandbox ? (
        <Alert status="info" bg="rgba(255,153,51,0.12)" color="gold" borderRadius="2px" mb="1.5rem">
          <AlertIcon color="gold" />
          <Text fontSize="0.75rem" letterSpacing="0.04em">
            Ambiente de pruebas (sandbox). No se realizan cobros reales.
          </Text>
        </Alert>
      ) : null}

      {estadoOpenpay === 'sin-configurar' || estadoOpenpay === 'error' ? (
        <Alert status="error" bg="rgba(210,86,79,0.14)" color="#ffb4ae" borderRadius="2px" mb="1.5rem">
          <AlertIcon color="#ffb4ae" />
          <Text fontSize="0.75rem">
            El sistema de pagos no está disponible en este momento. Escríbanos a contacto@yaakob.com.
          </Text>
        </Alert>
      ) : null}

      {aviso ? (
        <Alert status="error" bg="rgba(210,86,79,0.14)" color="#ffb4ae" borderRadius="2px" mb="1.5rem">
          <AlertIcon color="#ffb4ae" />
          <Text fontSize="0.8125rem">{aviso}</Text>
        </Alert>
      ) : null}

      <Text {...etiqueta} mb="1rem" color="goldAlt">
        Datos del titular
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing="1rem">
        <FormControl isInvalid={Boolean(erroresCliente.nombre)}>
          <FormLabel {...etiqueta}>Nombre</FormLabel>
          <Input
            {...campo}
            value={cliente.nombre}
            autoComplete="given-name"
            maxLength={60}
            onChange={(e) => setCliente({ ...cliente, nombre: e.target.value })}
          />
          <FormErrorMessage fontSize="0.75rem">{erroresCliente.nombre}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(erroresCliente.apellido)}>
          <FormLabel {...etiqueta}>Apellidos</FormLabel>
          <Input
            {...campo}
            value={cliente.apellido}
            autoComplete="family-name"
            maxLength={60}
            onChange={(e) => setCliente({ ...cliente, apellido: e.target.value })}
          />
          <FormErrorMessage fontSize="0.75rem">{erroresCliente.apellido}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(erroresCliente.correo)}>
          <FormLabel {...etiqueta}>Correo electrónico</FormLabel>
          <Input
            {...campo}
            type="email"
            inputMode="email"
            value={cliente.correo}
            autoComplete="email"
            maxLength={120}
            onChange={(e) => setCliente({ ...cliente, correo: e.target.value })}
          />
          <FormErrorMessage fontSize="0.75rem">{erroresCliente.correo}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(erroresCliente.telefono)}>
          <FormLabel {...etiqueta}>Teléfono</FormLabel>
          <Input
            {...campo}
            type="tel"
            inputMode="tel"
            value={cliente.telefono}
            autoComplete="tel"
            onChange={(e) => setCliente({ ...cliente, telefono: filtrarTelefono(e.target.value) })}
          />
          <FormErrorMessage fontSize="0.75rem">{erroresCliente.telefono}</FormErrorMessage>
        </FormControl>
      </SimpleGrid>

      <Text {...etiqueta} mt="2rem" mb="1rem" color="goldAlt">
        Datos de la tarjeta
      </Text>

      <FormControl isInvalid={Boolean(erroresTarjeta.titular)}>
        <FormLabel {...etiqueta}>Nombre como aparece en la tarjeta</FormLabel>
        <Input
          {...campo}
          value={tarjeta.titular}
          autoComplete="cc-name"
          maxLength={60}
          onChange={(e) => setTarjeta({ ...tarjeta, titular: e.target.value })}
        />
        <FormErrorMessage fontSize="0.75rem">{erroresTarjeta.titular}</FormErrorMessage>
      </FormControl>

      <FormControl mt="1rem" isInvalid={Boolean(erroresTarjeta.numero)}>
        <FormLabel {...etiqueta}>Número de tarjeta</FormLabel>
        <Input
          {...campo}
          value={tarjeta.numero}
          // Punto 6: sólo dígitos, tope de 16. El filtro corre en cada tecla y
          // en cada pegado, no sólo con `maxLength`.
          inputMode="numeric"
          autoComplete="cc-number"
          placeholder="0000 0000 0000 0000"
          maxLength={LARGO_MAX_TARJETA + 3}
          onChange={(e) => setTarjeta({ ...tarjeta, numero: filtrarTarjeta(e.target.value) })}
        />
        <FormErrorMessage fontSize="0.75rem">{erroresTarjeta.numero}</FormErrorMessage>
      </FormControl>

      <SimpleGrid columns={3} spacing="1rem" mt="1rem">
        <FormControl isInvalid={Boolean(erroresTarjeta.mes)}>
          <FormLabel {...etiqueta}>Mes</FormLabel>
          <Input
            {...campo}
            value={tarjeta.mes}
            inputMode="numeric"
            autoComplete="cc-exp-month"
            placeholder="MM"
            maxLength={2}
            onChange={(e) => setTarjeta({ ...tarjeta, mes: filtrarMes(e.target.value) })}
          />
          <FormErrorMessage fontSize="0.75rem">{erroresTarjeta.mes}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(erroresTarjeta.anio)}>
          <FormLabel {...etiqueta}>Año</FormLabel>
          <Input
            {...campo}
            value={tarjeta.anio}
            inputMode="numeric"
            autoComplete="cc-exp-year"
            placeholder="AA"
            maxLength={2}
            onChange={(e) => setTarjeta({ ...tarjeta, anio: filtrarAnio(e.target.value) })}
          />
          <FormErrorMessage fontSize="0.75rem">{erroresTarjeta.anio}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(erroresTarjeta.cvv)}>
          <FormLabel {...etiqueta}>CVV</FormLabel>
          <Input
            {...campo}
            value={tarjeta.cvv}
            type="password"
            inputMode="numeric"
            autoComplete="cc-csc"
            placeholder="•••"
            maxLength={LARGO_MAX_CVV}
            onChange={(e) => setTarjeta({ ...tarjeta, cvv: filtrarCvv(e.target.value) })}
          />
          <FormErrorMessage fontSize="0.75rem">{erroresTarjeta.cvv}</FormErrorMessage>
        </FormControl>
      </SimpleGrid>

      <Button
        type="submit"
        mt="2rem"
        w="100%"
        h="3rem"
        borderRadius="2px"
        bg="gold"
        color="#111316"
        fontSize="0.75rem"
        fontWeight="bold"
        letterSpacing="0.18em"
        textTransform="uppercase"
        // Punto 12: bloqueado desde el primer clic y mientras dure la operación.
        isDisabled={bloqueado || !listo}
        isLoading={estado === 'procesando'}
        loadingText="Procesando…"
        _hover={{ bg: 'goldAlt' }}
        _disabled={{ bg: 'rgba(255,153,51,0.35)', cursor: 'not-allowed' }}
      >
        {textoBoton}
      </Button>

      <Text mt="1rem" fontSize="0.6875rem" lineHeight="1.125rem" color="rgba(255,255,255,0.55)">
        Al contratar autoriza un cargo de {formatearPrecio(plan.precio, plan.moneda)} y su renovación{' '}
        {plan.cadencia} hasta que usted la cancele. Puede cancelar en cualquier momento sin
        penalización. Su banco le pedirá confirmar la operación mediante 3D Secure.
      </Text>

      {/* Puntos 13 y 17 */}
      <LogosPago />
    </Box>
  )
}

export default FormularioPago
