import { Box } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'
import { Background, type BackgroundVariant } from '@servicios/components/background'
import { Footer, Loader, Navigation, type FooterProps } from '@servicios/components/chrome'

/**
 * The original carries the OneTrust banner height here and shifts the footer up
 * by it. The mirror never loads OneTrust, so it is pinned at zero — pages can
 * still read `var(--cookie-banner-height)`.
 */
const rootStyle = { '--cookie-banner-height': '0px' } as unknown as CSSProperties

/**
 * Only a top margin — the footer is the last item in a flex column that
 * exactly fills the viewport, so its own bottom edge is already flush with
 * the screen. A bottom margin here would pull it up and leave a gap under it.
 */
const defaultFooterProps: FooterProps = { mt: [8, null, null, null, 4] }

export interface LayoutProps {
  children: ReactNode
  /** Per-page colour of the particle backdrop. */
  fluxColor?: string
  /** Which recovered camera placement the backdrop uses. */
  backgroundVariant?: BackgroundVariant
  /** Set false to skip every reveal animation. */
  animate?: boolean
  footer?: boolean
  footerProps?: FooterProps
  minimalNav?: boolean
  /** Bottom slot of the menu drawer — see `MenuOverlayProps.footer`. */
  menuFooter?: ReactNode
}

export function Layout({
  children,
  fluxColor,
  backgroundVariant = 'index',
  animate = true,
  footer = true,
  footerProps,
  minimalNav = false,
  menuFooter,
}: LayoutProps) {
  return (
    <>
      <Background fluxColor={fluxColor} variant={backgroundVariant} />
      <Box
        pos="absolute"
        top={0}
        left={0}
        w="100%"
        // Always exactly the viewport, at every breakpoint — the page itself
        // never scrolls; only the content strip between nav and footer does.
        h="calc(var(--vh, 1vh) * 100)"
        overflow="hidden"
        display="flex"
        flexDirection="column"
        style={rootStyle}
      >
        <AnimatePresence mode="wait">
          <Navigation
            key={minimalNav ? 'nav-minimal' : 'nav-default'}
            animate={animate}
            minimal={minimalNav}
            menuFooter={menuFooter}
          />
        </AnimatePresence>
        {/*
         * No AnimatePresence around the page. Layout lives *inside* the page
         * in the Pages Router, so it unmounts with it and could never play an
         * exit anyway — and pages pass `<Head>` alongside their article, so a
         * "wait"-mode presence would warn about multiple unkeyed children.
         * Route transitions belong in _app, wrapping a keyed <Component/>.
         *
         * `nav` above is a zero-height overlay (its logo/menu button are
         * absolute/fixed), so it takes no space here — `main` gets the full
         * column and splits it into a content strip that absorbs whatever
         * space is left, plus a footer that is always flush with the bottom.
         */}
        <Box as="main" flex="1 1 auto" minH={0} display="flex" flexDirection="column" overflow="hidden">
          <Box flex="1 1 auto" minH={0} overflow="auto">
            {children}
          </Box>
          {footer ? (
            <Footer animate={animate} delay={1} flexShrink={0} {...defaultFooterProps} {...footerProps} />
          ) : null}
        </Box>
      </Box>
      <Loader />
    </>
  )
}

export default Layout
