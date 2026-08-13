/** Shape of a single entry in `servicios-lib/data/legal.json`. */
export type LegalSection = {
  id: string
  heading: string
  paragraphs: string[]
  /** Bulleted list rendered after the paragraphs. */
  items?: string[]
  /** Closing caveat, set apart from the body copy. */
  note?: string
  /** Secondary block — used by the "finalidades" section for its opt-out. */
  secondary?: {
    paragraph: string
    items: string[]
    optOut: string
  }
  /** Cross-reference to another legal page. */
  link?: { label: string; href: string }
}

export type LegalDocument = {
  slug: string
  label: string
  heading: string
  subheading: string
  description: string
  updatedLabel: string
  updated: string
  intro: string
  sections: LegalSection[]
}
