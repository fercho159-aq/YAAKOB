/** The subset of a `content.json` item the detail page consumes. */
export type Item = {
  id: string
  slug: string
  label: string
  /** Where the primary CTA goes — a separate build, not a route of this app. */
  url: string
  thumbnail: {
    src: string
    alt: string
  }
  tagline: string
  description: {
    heading: string
    body: string
  }
  /** Drives the colour of the particle backdrop on this page. */
  background?: {
    fluxColor: string
  }
}

/** `content.detail` — the copy every detail page shares. */
export type ItemDetail = {
  ctas: {
    primary: string
    share: string
    clipboard: string
  }
  headings: {
    description: string
    login: string
  }
  login: {
    subheading: string
    body: string
    ctas: {
      login: { label: string; href: string }
      register: { label: string; href: string }
    }
  }
}

export type ItemPageData = {
  item: Item
  detail: ItemDetail
}
