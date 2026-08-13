import type { GetStaticProps } from 'next'
import { LegalPage, type LegalDocument } from '@servicios/components/legal'
import legal from '@servicios/data/legal.json'

type PrivacidadProps = { document: LegalDocument }

export default function Privacidad({ document }: PrivacidadProps) {
  return <LegalPage document={document} />
}

export const getStaticProps: GetStaticProps<PrivacidadProps> = async () => ({
  props: { document: legal.privacidad as LegalDocument },
})
