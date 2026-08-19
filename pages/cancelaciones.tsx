import type { GetStaticProps } from 'next'
import { LegalPage, type LegalDocument } from '@servicios/components/legal'
import legal from '@servicios/data/legal.json'

type CancelacionesProps = { document: LegalDocument }

/**
 * Punto 9 de la validación técnica de Openpay: las políticas de cancelación,
 * reembolso y plazos de entrega tienen que ser localizables por sí mismas, no
 * enterradas dentro de las 41 secciones de los términos.
 */
export default function Cancelaciones({ document }: CancelacionesProps) {
  return <LegalPage document={document} />
}

export const getStaticProps: GetStaticProps<CancelacionesProps> = async () => ({
  props: { document: legal.cancelaciones as LegalDocument },
})
