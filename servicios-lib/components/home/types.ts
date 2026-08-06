/** The subset of a `content.json` entry the home carousel consumes. */
export type CarouselItem = {
  id: string
  slug: string
  label: string
  tagline: string
  thumbnail: {
    src: string
    alt: string
  }
  about: {
    heading: string
    description: string
    tags: string[]
  }
  /** Tints the particle backdrop while this item is the active slide. */
  background?: {
    fluxColor?: string
  }
}

export type HomePageData = {
  items: CarouselItem[]
}
