import { Box, Link, Spinner, Text } from '@chakra-ui/react'
import Head from 'next/head'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { MotionArticle } from '@servicios/components/home/motion'
import { ScrambleText } from '@servicios/components/ui/ScrambleText'
import Layout from '@servicios/components/layout/Layout'
import content from '@servicios/data/content.json'
import { vaciarCarrito } from '@pagos/carrito'

/**
 * Retorno de 3D Secure.
 *
 * El banco devuelve al usuario aquí con el identificador del cargo en la URL.
 * Esta pantalla NO decide nada por sí misma: le pasa ese identificador al
 * servidor, que consulta el cargo directamente a Openpay. Cualquier otro
 * parámetro de la URL se ignora —— un `?status=completed` puesto a mano no debe
 * poder abrir una suscripción.
 *
 * Si el cargo sigue en proceso, reintenta unas cuantas veces antes de mandar al
 * usuario a soporte, en vez de dejarlo mirando una ruleta indefinida.
 */

const COLUMN_WIDTH = { base: `${(315 / 375) * 100}%`, xl: '34rem' }
const HAIRLINE = '1px solid rgba(255,255,255,0.14)'
const REINTENTOS = 5
const ESPERA_MS = 2500

const etiqueta = {
  fontSize: '0.625rem',
  fontWeight: 'semibold',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'goldAlt',
} as const

const cuerpo = {
  fontSize: { base: '0.8125rem', xl: '0.875rem' },
  lineHeight: { base: '1.375rem', xl: '1.5rem' },
  letterSpacing: '0.02em',
  color: 'rgba(255,255,255,0.78)',
} as const

type PlanContratado = {
  id?: string
  nombre?: string
  cadencia?: string
  cantidad?: number
  importe?: string
  proximoCargo?: string
  suscripciones?: string[]
}

type Respuesta = {
  ok?: boolean
  estado?: string
  mensaje?: string
  importe?: string
  suscripcionId?: string
  planes?: PlanContratado[]
}

type Vista = 'consultando' | 'activa' | 'pendiente' | 'rechazada' | 'sin-referencia'

/** Openpay puede devolver el identificador con distintos nombres según el flujo. */
function leerCargoId(query: Record<string, string | string[] | undefined>): string | undefined {
  for (const clave of ['id', 'transaction_id', 'charge_id']) {
    const valor = query[clave]
    if (typeof valor === 'string' && valor) return valor
  }
  return undefined
}

export default function Resultado() {
  const router = useRouter()
  const [vista, setVista] = useState<Vista>('consultando')
  const [datos, setDatos] = useState<Respuesta | null>(null)
  const consultado = useRef(false)

  useEffect(() => {
    if (!router.isReady || consultado.current) return
    consultado.current = true

    const cargoId = leerCargoId(router.query)
    if (!cargoId) {
      setVista('sin-referencia')
      return
    }

    let vivo = true

    async function consultar(intento: number): Promise<void> {
      try {
        const respuesta = await fetch('/api/pagos/estado', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cargoId }),
        })
        const cuerpoRespuesta = (await respuesta.json()) as Respuesta
        if (!vivo) return

        if (cuerpoRespuesta.estado === 'pendiente' && intento < REINTENTOS) {
          setTimeout(() => {
            if (vivo) void consultar(intento + 1)
          }, ESPERA_MS)
          return
        }

        setDatos(cuerpoRespuesta)
        if (cuerpoRespuesta.ok && cuerpoRespuesta.estado === 'activa') {
          // Lo que estaba en el carrito ya se cobró: se vacía aquí y no antes,
          // para que un cobro rechazado en el banco no le borre la orden a nadie.
          vaciarCarrito()
          setVista('activa')
        }
        else if (cuerpoRespuesta.ok && cuerpoRespuesta.estado === 'pagado_sin_suscripcion')
          setVista('pendiente')
        else if (cuerpoRespuesta.estado === 'pendiente') setVista('pendiente')
        else setVista('rechazada')
      } catch {
        if (!vivo) return
        setVista('rechazada')
        setDatos({
          mensaje:
            'No pudimos confirmar el estado de su pago. Escríbanos a contacto@yaakob.com antes de ' +
            'intentar de nuevo, para evitar un cargo duplicado.',
        })
      }
    }

    void consultar(0)
    return () => {
      vivo = false
    }
  }, [router.isReady, router.query])

  const titulos: Record<Vista, string> = {
    consultando: 'Confirmando su pago',
    activa: 'Suscripción activa',
    pendiente: 'Pago recibido',
    rechazada: 'No se completó el cobro',
    'sin-referencia': 'Operación no identificada',
  }

  return (
    <Layout backgroundVariant="play">
      <Head>
        <title key="page-title">{`${content.site.title} | ${titulos[vista]}`}</title>
        <meta key="robots" name="robots" content="noindex, nofollow" />
        <link key="icon" rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <MotionArticle
        w={COLUMN_WIDTH}
        mx="auto"
        mt={{ base: '4.5rem', md: '5.625rem' }}
        pb={{ base: '3rem', xl: '4rem' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Box as="header" pb="1.5rem" borderBottom={HAIRLINE}>
          <Text {...etiqueta}>Contratación</Text>
          <Box
            as="h1"
            mt="0.625rem"
            fontSize={{ base: '1.5rem', xl: '2rem' }}
            fontWeight="normal"
            lineHeight={{ base: '1.875rem', xl: '2.375rem' }}
          >
            <ScrambleText text={titulos[vista]} duration={1} display="inline" />
          </Box>
        </Box>

        <Box mt="2rem">
          {vista === 'consultando' ? (
            <Box display="flex" alignItems="center" gap="0.75rem">
              <Spinner size="sm" color="gold" />
              <Text {...cuerpo}>Estamos confirmando la operación con su banco. No cierre esta ventana.</Text>
            </Box>
          ) : null}

          {vista === 'activa' ? (
            <>
              <Text {...cuerpo}>
                Su pago de {datos?.importe} quedó confirmado y{' '}
                {(datos?.planes?.length ?? 0) > 1
                  ? 'sus suscripciones están activas'
                  : 'su suscripción está activa'}
                . Cada una renueva en su propia periodicidad hasta que usted la cancele.
              </Text>

              {datos?.planes?.map((plan) => (
                <Box key={plan.id ?? plan.nombre} mt="1.25rem" p="1rem" border={HAIRLINE} borderRadius="2px">
                  <Text {...etiqueta}>
                    {plan.nombre}
                    {(plan.cantidad ?? 1) > 1 ? ` × ${plan.cantidad}` : ''}
                  </Text>
                  <Text {...cuerpo} mt="0.375rem">
                    {plan.importe} · renovación {plan.cadencia} a partir del {plan.proximoCargo}.
                  </Text>
                  {plan.suscripciones?.length ? (
                    <>
                      <Text {...cuerpo} mt="0.75rem" fontSize="0.75rem" color="rgba(255,255,255,0.6)">
                        {plan.suscripciones.length > 1 ? 'Folios' : 'Folio'}
                      </Text>
                      {plan.suscripciones.map((folio) => (
                        <Text key={folio} {...cuerpo} color="white">
                          {folio}
                        </Text>
                      ))}
                    </>
                  ) : null}
                </Box>
              ))}

              <Text {...cuerpo} mt="1rem" fontSize="0.75rem">
                Guarde los folios: junto con su correo son lo que necesita para cancelar desde el
                sitio. También se los enviamos por correo electrónico.
              </Text>
            </>
          ) : null}

          {vista === 'pendiente' ? (
            <Text {...cuerpo}>
              {datos?.mensaje ??
                'Su banco todavía está confirmando la operación. En cuanto se confirme le enviaremos el acceso por correo. Si en unas horas no recibe nada, escríbanos a contacto@yaakob.com.'}
            </Text>
          ) : null}

          {vista === 'rechazada' ? (
            <>
              <Text {...cuerpo}>{datos?.mensaje ?? 'El cobro no se completó y no se le hizo ningún cargo.'}</Text>
              <Link
                as={NextLink}
                href="/planes"
                display="inline-block"
                mt="1.25rem"
                fontSize="0.75rem"
                letterSpacing="0.16em"
                textTransform="uppercase"
                color="gold"
                _hover={{ color: 'white', textDecor: 'none' }}
              >
                Volver a los planes →
              </Link>
            </>
          ) : null}

          {vista === 'sin-referencia' ? (
            <Text {...cuerpo}>
              Esta página sólo se abre al volver del proceso de pago. Si llegó aquí por error,
              consulte los planes disponibles o escríbanos a contacto@yaakob.com.
            </Text>
          ) : null}
        </Box>

        <Box mt="2.5rem" pt="1.5rem" borderTop={HAIRLINE}>
          <Text {...cuerpo} fontSize="0.75rem">
            Se hace uso de Openpay como pasarela de pagos. Cualquier aclaración sobre un cargo:
            contacto@yaakob.com · +52 55 9008 6360.
          </Text>
        </Box>
      </MotionArticle>
    </Layout>
  )
}
