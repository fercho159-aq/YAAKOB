import { Box, Link, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import type { Variants } from 'framer-motion'
import Head from 'next/head'
import NextLink from 'next/link'
import { AnimatedHeading } from '@servicios/components/home/AnimatedHeading'
import { MotionArticle } from '@servicios/components/home/motion'
import { ScrambleText } from '@servicios/components/ui/ScrambleText'
import Layout from '@servicios/components/layout/Layout'
import content from '@servicios/data/content.json'
import type { LegalDocument, LegalSection } from './types'

/** Reading column, authored against the same 1440 reference as the detail page. */
const COLUMN_WIDTH = { base: `${(315 / 375) * 100}%`, xl: '46rem' }

const HAIRLINE = '1px solid rgba(255,255,255,0.14)'

/** Gates the children so the section headings can play their own bar wipe. */
const articleVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
  exit: { opacity: 0 },
}

const bodyProps = {
  mt: '0.875rem',
  fontSize: { base: '0.8125rem', xl: '0.875rem' },
  lineHeight: { base: '1.375rem', xl: '1.5rem' },
  letterSpacing: '0.02em',
  color: 'rgba(255,255,255,0.78)',
} as const

/** Bulleted list — the gold marker is drawn by hand, `listStyleType` cannot be tinted. */
function Bullets({ items }: { items: string[] }) {
  return (
    <UnorderedList m={0} mt="0.75rem" p={0} listStyleType="none">
      {items.map((item) => (
        <ListItem
          key={item}
          pos="relative"
          pl="1.125rem"
          mt="0.5rem"
          fontSize={bodyProps.fontSize}
          lineHeight={bodyProps.lineHeight}
          letterSpacing={bodyProps.letterSpacing}
          color={bodyProps.color}
          _before={{
            content: '""',
            pos: 'absolute',
            left: 0,
            top: '0.5625rem',
            w: '0.3125rem',
            h: '0.3125rem',
            bg: 'goldAlt',
          }}
        >
          {item}
        </ListItem>
      ))}
    </UnorderedList>
  )
}

function Section({ section }: { section: LegalSection }) {
  return (
    <Box as="section" id={section.id} mt="2.5rem" scrollMarginTop="6rem">
      <AnimatedHeading>{section.heading}</AnimatedHeading>

      {section.paragraphs.map((paragraph) => (
        <Text key={paragraph} {...bodyProps}>
          {paragraph}
        </Text>
      ))}

      {section.items ? <Bullets items={section.items} /> : null}

      {section.secondary ? (
        <Box mt="1.25rem">
          <Text {...bodyProps} mt={0}>
            {section.secondary.paragraph}
          </Text>
          <Bullets items={section.secondary.items} />
          <Text {...bodyProps}>{section.secondary.optOut}</Text>
        </Box>
      ) : null}

      {section.note ? (
        <Box mt="1rem" pl="0.875rem" borderLeft="2px solid" borderColor="goldAlt">
          <Text {...bodyProps} mt={0} color="rgba(255,255,255,0.62)" fontStyle="italic">
            {section.note}
          </Text>
        </Box>
      ) : null}

      {section.link ? (
        <Link
          as={NextLink}
          href={section.link.href}
          display="inline-block"
          mt="0.875rem"
          fontSize="0.75rem"
          letterSpacing="0.16em"
          textTransform="uppercase"
          color="gold"
          _hover={{ color: 'white', textDecor: 'none' }}
        >
          {section.link.label} →
        </Link>
      ) : null}
    </Box>
  )
}

export type LegalPageProps = {
  document: LegalDocument
}

/**
 * Long-form legal copy on the site's own chrome. Layout pins the nav and the
 * footer to the viewport and hands this component the scrolling strip between
 * them, so the page only has to clear the overlaid nav and centre its column.
 */
export function LegalPage({ document: doc }: LegalPageProps) {
  const { site } = content
  const title = `${site.title} | ${doc.label}`
  const url = `${site.url}/${doc.slug}`

  return (
    <Layout backgroundVariant="play">
      <Head>
        <title key="page-title">{title}</title>
        <meta key="page-title-meta" name="title" content={title} />
        <meta key="description" name="description" content={doc.description} />
        <link key="icon" rel="icon" type="image/png" href="/favicon.png" />
        <link key="canonical" rel="canonical" href={url} />
        <meta key="og-type" property="og:type" content="article" />
        <meta key="og-title" property="og:title" content={title} />
        <meta key="og-description" property="og:description" content={doc.description} />
        <meta key="og-url" property="og:url" content={url} />
        <meta key="og-image" property="og:image" content={site.shareImage} />
        <meta key="twitter-card" property="twitter:card" content="summary_large_image" />
        <meta key="twitter-title" property="twitter:title" content={title} />
        <meta key="twitter-description" property="twitter:description" content={doc.description} />
        <meta key="twitter-image" property="twitter:image" content={site.shareImage} />
      </Head>

      <MotionArticle
        w={COLUMN_WIDTH}
        mx="auto"
        mt={{ base: '4.5rem', md: '5.625rem' }}
        pb={{ base: '3rem', xl: '4rem' }}
        variants={articleVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Box as="header" pb="1.5rem" borderBottom={HAIRLINE}>
          <Text
            fontSize="0.625rem"
            fontWeight="semibold"
            letterSpacing="0.22em"
            textTransform="uppercase"
            color="goldAlt"
          >
            {doc.subheading}
          </Text>
          <Box
            as="h1"
            mt="0.625rem"
            fontSize={{ base: '1.5rem', xl: '2rem' }}
            fontWeight="normal"
            lineHeight={{ base: '1.875rem', xl: '2.375rem' }}
          >
            <ScrambleText text={doc.heading} duration={1} display="inline" />
          </Box>
          <Text {...bodyProps} mt="1rem">
            {doc.intro}
          </Text>
          <Text mt="1rem" fontSize="0.6875rem" letterSpacing="0.16em" textTransform="uppercase" color="grey2">
            {doc.updatedLabel}: {doc.updated}
          </Text>
        </Box>

        {doc.sections.map((section) => (
          <Section key={section.id} section={section} />
        ))}

        <Box mt="3rem" pt="1.5rem" borderTop={HAIRLINE}>
          <Link
            as={NextLink}
            href="/servicios"
            fontSize="0.75rem"
            letterSpacing="0.16em"
            textTransform="uppercase"
            color="gold"
            _hover={{ color: 'white', textDecor: 'none' }}
          >
            ← Volver al inicio
          </Link>
        </Box>
      </MotionArticle>
    </Layout>
  )
}

export default LegalPage
