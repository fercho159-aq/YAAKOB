import { Barlow, Archivo, Chakra_Petch } from 'next/font/google'

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

/**
 * Hero wordmark only: a squared face with chamfered corners, so the stacked
 * outline/solid mark on the carousel reads as a logotype rather than as body
 * copy set large.
 */
export const wordmark = Chakra_Petch({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-wordmark',
  display: 'swap',
})
