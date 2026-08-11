import { Box } from '@chakra-ui/react'
import type { Variants } from 'framer-motion'
import type { GetStaticProps } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { GameCarousel } from '@servicios/components/home'
import { VARIANTS } from '@servicios/components/home/constants'
import { MotionArticle } from '@servicios/components/home/motion'
import type { CarouselItem } from '@servicios/components/home/types'
import Layout from '@servicios/components/layout/Layout'
import content from '@servicios/data/content.json'

const { title: SITE_TITLE, description: SITE_DESCRIPTION, url: SITE_URL, shareImage: SHARE_IMAGE } =
  content.site

/** Held at 0 until the loader hands over, then snapped on. */
const articleVariants: Variants = {
  [VARIANTS.hidden]: { opacity: 0 },
  [VARIANTS.visible]: { opacity: 1, transition: { duration: 0.01 } },
  exit: { opacity: 0 },
}

type HomeProps = {
  data: { items: CarouselItem[] }
  animate?: boolean
}

export default function Home({ data, animate = true }: HomeProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <Layout
      backgroundVariant="index"
      animate={animate}
      fluxColor={data.items[activeIndex]?.background?.fluxColor}
    >
      <Head>
        <title>{SITE_TITLE}</title>
        <meta name="title" content={SITE_TITLE} />
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={SITE_TITLE} />
        <meta property="twitter:description" content={SITE_DESCRIPTION} />
        <meta property="twitter:url" content={SITE_URL} />
        <meta property="twitter:image" content={SHARE_IMAGE} />
        <meta property="twitter:image:alt" content={SITE_DESCRIPTION} />
        <meta property="og:title" content={SITE_TITLE} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={SHARE_IMAGE} />
        <meta property="og:image:alt" content={SITE_DESCRIPTION} />
        <meta property="og:type" content="website" />
      </Head>
      <MotionArticle
        display={{ xl: 'flex' }}
        mx="auto"
        h="100%"
        // Nav's logo/menu button are overlaid, not in flow — this pushes the
        // carousel clear of them. Layout's own wrapper handles the scrolling
        // and sizing, so nothing else here needs an explicit height.
        mt={{ base: '3.75rem', md: '4.6875rem' }}
        pb={{ base: '2.1875rem', md: 0 }}
        variants={articleVariants}
        initial={VARIANTS.hidden}
        animate={animate ? VARIANTS.visible : VARIANTS.hidden}
        exit="exit"
      >
        {/* The original also carried an `mt` here, but nested one level too deep,
            so it compiled to a `.css-idxniu mt{…}` rule that matched nothing. */}
        <Box w="100%" m="auto">
          <GameCarousel
            items={data.items}
            animate={animate}
            onActiveIndexChange={setActiveIndex}
          />
        </Box>
      </MotionArticle>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => ({
  props: {
    data: { items: content.items as CarouselItem[] },
  },
})
