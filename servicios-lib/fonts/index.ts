import { Barlow, Archivo } from 'next/font/google'

/**
 * The original ships licensed foundry fonts (DIN OT and Foundry Gridnik). This
 * rebuild keeps the design, not the licences, so it uses the closest open
 * substitutes through the same two CSS variables the layout reads.
 */
export const dinOT = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-din-ot',
  display: 'swap',
})

export const gridnik = Archivo({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-gridnik',
  display: 'swap',
})
