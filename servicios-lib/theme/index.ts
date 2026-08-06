import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

/**
 * Tokens below mirror the compiled theme of airforceaircade.com — only the
 * entries that differ from Chakra's defaults are listed.
 */
export const theme = extendTheme({
  config,
  colors: {
    blackAlt: '#111316',
    grey1: '#0D0F15',
    grey2: '#9d9d9d',
    gold: '#E0BE7A',
    goldAlt: '#A18855',
    focus: '#E0BE7A',
  },
  fonts: {
    heading: 'var(--font-din-ot),-apple-system,BlinkMacSystemFont,Helvetica,Arial,sans-serif',
    body: 'var(--font-din-ot),-apple-system,system-ui,sans-serif',
  },
  fontSizes: {
    '3xs': '0.45rem',
    '2xs': '0.625rem',
    '4xl': '36px',
    '5xl': '48px',
  },
  radii: {
    base: '0.75rem',
    md: '6px',
    lg: '12px',
    xl: '18px',
    '2xl': '2.5rem',
    '3xl': '3.5rem',
  },
  shadows: {
    lg: '0 6px 15px -3px rgba(0, 0, 0, 0.1),0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 8px 25px -5px rgba(0, 0, 0, 0.1),0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 15px 50px -12px rgba(0, 0, 0, 0.25)',
    outline: '0 0 0 3px rgba(125, 125, 125, 0.3)',
    surface: '0 0 0 1px rgba(63,63,68,0.05),0 1px 35px 0 rgba(63,63,68,0.05)',
    surfaceDark: '0 0 0 1px rgba(195,195,195,0.045),0 1px 35px 0 rgba(0,0,0,0.1)',
  },
  zIndices: {
    backgroundGrid: -1,
    buttonSlider: 2,
    cursor: 5,
    navigation: 6,
    footer: 6,
    loader: 7,
  },
  breakpoints: {
    base: '0em',
    sm: '23.4375em',
    md: '36.0625em',
    lg: '48em',
    xl: '62.0625em',
    '2xl': '75em',
    '3xl': '98.75em',
    '4xl': '125em',
  },
  styles: {
    global: {
      body: {
        backgroundColor: '#000',
      },
      'body *': {
        boxSizing: 'border-box',
        wordWrap: 'break-word',
      },
      'div#__next': {
        width: '100%',
        height: 'auto',
        minHeight: 'calc(var(--vh, 1vh) * 100)',
        boxSizing: 'border-box',
        wordWrap: 'break-word',
        color: '#fff',
        fontFamily: 'var(--font-din-ot),sans-serif',
      },
      'body .dg.ac': {
        zIndex: 999,
        opacity: 0.3,
        transition: 'opacity 0.2s',
      },
      "body .dg.ac .c input[type='text']": {
        height: '27px',
        margin: 0,
        padding: 0,
      },
      'body .dg.ac:hover': {
        opacity: 1,
      },
      '*:focus': {
        boxShadow: 'none !important',
        outline: 'none',
      },
      '*[data-focus]': {
        boxShadow: 'none !important',
      },
      "a:focus-visible, button:focus-visible, [role='button']:focus-visible": {
        boxShadow: 'none',
        outline: '#E0BE7A solid 2px',
        outlineOffset: '1px',
      },
    },
  },
})

export default theme
