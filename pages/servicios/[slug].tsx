import { Box, Flex } from '@chakra-ui/react'
import type { Variants } from 'framer-motion'
import type { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { ItemCopy, ItemHero, ItemNavigation, type ItemPageData } from '@servicios/components/item'
import { MotionArticle, MotionBox } from '@servicios/components/item/motion'
import type { Item, ItemDetail } from '@servicios/components/item/types'
import Layout from '@servicios/components/layout/Layout'
import content from '@servicios/data/content.json'

/** Column widths, authored against a 375 / 1440 reference viewport. */
const CONTENT_WIDTH = { base: `${(315 / 375) * 100}%`, xl: `${(1132 / 1440) * 100}%` }
const HERO_WIDTH = { base: '100%', xl: `${(508 / 1132) * 100}%` }
const COPY_WIDTH = { base: '100%', xl: `${(516 / 1132) * 100}%` }

const pageVariants: Variants = { hidden: { opacity: 0 } }

/** The article itself only gates its children; the reveal is per element. */
const articleVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
  exit: { opacity: 0 },
}

type ItemPageProps = { data: ItemPageData }

export default function ItemPage({ data }: ItemPageProps) {
  const { item, detail } = data
  const { site } = content
  const title = `${site.title} | ${item.label}`
  const url = `${site.url}/${item.slug}`

  return (
    <Layout fluxColor={item.background?.fluxColor} backgroundVariant="play">
      <Head>
        <title key="page-title">{title}</title>
        <meta key="page-title-meta" name="title" content={title} />
        <meta key="description" name="description" content={site.description} />
        <link key="icon" rel="icon" type="image/png" href="/favicon.png" />
        <meta key="twitter-card" property="twitter:card" content="summary_large_image" />
        <meta key="twitter-image" property="twitter:image" content={site.shareImage} />
        <meta key="twitter-image-alt" property="twitter:image:alt" content={site.description} />
        <meta key="twitter-url" property="twitter:url" content={url} />
        <meta key="twitter-title" property="twitter:title" content={title} />
        <meta
          key="twitter-description"
          property="twitter:description"
          content={item.description.body}
        />
        <meta key="og-type" property="og:type" content="website" />
        <meta key="og-image" property="og:image" content={site.shareImage} />
        <meta key="og-image-alt" property="og:image:alt" content={site.description} />
        <meta key="og-title" property="og:title" content={title} />
        <meta key="og-description" property="og:description" content={item.description.body} />
        <meta key="og-url" property="og:url" content={url} />
      </Head>

      {/*
       * Layout's own wrapper is what pins the footer to the bottom of the
       * viewport and absorbs any overflow now — this only needs to clear the
       * overlaid nav (mt) and lay out its own two columns.
       */}
      <MotionBox variants={pageVariants} exit="hidden" h="100%" display="flex" flexDirection="column">
        <ItemNavigation slug={item.slug} label={item.label} />
        <Box
          flex="1 1 auto"
          minH={0}
          sx={{ '@media screen and (min-width: 90em)': { paddingInline: '8rem' } }}
        >
          <MotionArticle
            mx="auto"
            display={{ xl: 'flex' }}
            h={{ xl: '100%' }}
            pt={{ base: '1.125rem', xl: '1rem' }}
            mt={{ base: '6.375rem', md: '7.5rem' }}
            variants={articleVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Flex
              flexDirection={{ base: 'column', xl: 'row' }}
              alignItems={{ base: 'center', xl: 'flex-start' }}
              justifyContent="space-between"
              w={CONTENT_WIDTH}
              mx="auto"
              mb="auto"
              pb={{ base: '2.5rem', xl: 0 }}
            >
              <ItemHero w={HERO_WIDTH} item={item} detail={detail} shareText={title} />
              <ItemCopy
                w={COPY_WIDTH}
                mt={{ base: '0.9375rem', xl: 0 }}
                item={item}
                detail={detail}
                delay={1.5}
              />
            </Flex>
          </MotionArticle>
        </Box>
      </MotionBox>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: content.items.map((item) => ({ params: { slug: item.slug } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<ItemPageProps, { slug: string }> = async ({
  params,
}) => {
  const item = content.items.find((entry) => entry.slug === params?.slug)
  if (!item) return { notFound: true }

  return {
    props: {
      data: {
        item: item as Item,
        detail: content.detail as ItemDetail,
      },
    },
  }
}
