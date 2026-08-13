import type { GetStaticProps } from 'next'
import { LegalPage, type LegalDocument } from '@servicios/components/legal'
import legal from '@servicios/data/legal.json'

type TerminosProps = { document: LegalDocument }

export default function Terminos({ document }: TerminosProps) {
  return <LegalPage document={document} />
}

export const getStaticProps: GetStaticProps<TerminosProps> = async () => ({
  props: { document: legal.terminos as LegalDocument },
})
