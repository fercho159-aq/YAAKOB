import { Box, Button, chakra, type SystemStyleObject } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useCallback, useEffect, useMemo, useState, type MouseEvent } from 'react'
import type { Swiper as SwiperClass } from 'swiper'
import { A11y, Keyboard, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Cursor } from '@servicios/components/chrome'
import {
  CURSOR_TYPE,
  SLIDES_OFFSET_BASE,
  SLIDES_OFFSET_XL,
  SLIDER_EASING,
  SLIDE_WIDTH_BASE,
  SLIDE_WIDTH_XL,
  WIDTH_BASE,
  WIDTH_XL,
  BREAKPOINT_XL,
  type CursorType,
} from './constants'
import { GameSlide } from './GameSlide'
import { useWindowSize } from './hooks'
import type { CarouselItem } from './types'

// Swiper ships its layout CSS as plain stylesheets; Next allows global CSS from
// node_modules to be imported by a component.
import 'swiper/css'
import 'swiper/css/pagination'

const SwiperContainer = chakra(Swiper)
const SlideLink = chakra(NextLink)

/** The `.css-942crq` rule set from the original, minus what maps to style props. */
const swiperSx: SystemStyleObject = {
  '@media (min-width: 62.0625em) and (min-height: 900px)': {
    marginBottom: '5rem',
    paddingTop: '4.375rem',
    paddingBottom: '4.375rem',
  },
  '& .swiper-wrapper': {
    transitionTimingFunction: SLIDER_EASING,
  },
  '& .swiper-pagination': {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    textAlign: 'center',
    '& .swiper-pagination-bullet': {
      position: 'relative',
      display: 'inline-block',
      width: '0.6875rem',
      height: '0.125rem',
      marginRight: '0.5rem',
      marginLeft: '0.5rem',
      backgroundColor: '#ffffff',
      opacity: 0.6,
      boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.6)',
      transition: 'opacity 0.2s linear, width 0.3s ease-in-out',
      cursor: 'pointer',
      // Widens the hit area well past the 2px-tall bullet.
      '&:before': {
        position: 'absolute',
        content: "''",
        top: 0,
        left: 0,
        width: 'calc(100% + 1.25rem)',
        height: 'calc(100% + 1.25rem)',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        transform: 'translate(-0.625rem, -0.625rem)',
      },
      '&.swiper-pagination-bullet-active': {
        width: '1.875rem',
        backgroundColor: '#E0BE7A',
        opacity: 1,
        boxShadow: 'none',
      },
      '&:hover': {
        opacity: 1,
      },
    },
  },
}

/** Full-height, invisible click targets down either edge of the carousel. */
const edgeButtonProps = {
  pos: 'absolute',
  top: 0,
  zIndex: 'buttonSlider',
  w: '15%',
  h: '100%',
  tabIndex: -1,
  // The original asks for `background-color: var(--chakra-colors-red)`, a token
  // that does not exist, so the declaration drops out and the button paints
  // transparent. Ask for that outright instead of inheriting Chakra's grey.
  bg: 'transparent',
  _hover: { bg: 'transparent' },
  _active: { bg: 'transparent' },
  _focusVisible: { outline: 'none', outlineOffset: 0 },
} as const

export type GameCarouselProps = {
  items: CarouselItem[]
  animate?: boolean
  /** Lets the page follow the carousel — the backdrop tints per item. */
  onActiveIndexChange?: (index: number) => void
}

/**
 * The original ran Swiper 8 with `loopedSlides: 1`; Swiper 11 spells the same
 * thing `loopAdditionalSlides`.
 */
export function GameCarousel({
  items,
  animate = true,
  onActiveIndexChange,
}: GameCarouselProps) {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [slideWidth, setSlideWidth] = useState<number | null>(null)
  const [spaceBetween, setSpaceBetween] = useState(0)
  const [cursorType, setCursorType] = useState<CursorType>(CURSOR_TYPE.hidden)
  const [animateClick, setAnimateClick] = useState(false)
  const size = useWindowSize()

  // Slide width and gap are both a fixed fraction of the viewport, so they are
  // recomputed rather than expressed as breakpoints.
  useEffect(() => {
    if (!size.width) return
    const isDesktop = size.width >= BREAKPOINT_XL
    setSlideWidth(
      isDesktop
        ? (SLIDE_WIDTH_XL / WIDTH_XL) * 100
        : (SLIDE_WIDTH_BASE / WIDTH_BASE) * 100,
    )
    setSpaceBetween(
      isDesktop
        ? (size.width / WIDTH_XL) * SLIDES_OFFSET_XL
        : (size.width / WIDTH_BASE) * SLIDES_OFFSET_BASE,
    )
  }, [size])

  const hideCursor = useCallback(() => setCursorType(CURSOR_TYPE.hidden), [])

  const onEdgeClick = useCallback(
    ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
      if (currentTarget.dataset.direction === 'prev') swiper?.slidePrev()
      else swiper?.slideNext()
      setAnimateClick(true)
    },
    [swiper],
  )

  const onEdgeEnter = useCallback(({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    setCursorType(
      currentTarget.dataset.direction === 'prev'
        ? CURSOR_TYPE.arrowLeft
        : CURSOR_TYPE.arrowRight,
    )
  }, [])

  const onSlideEnter = useCallback(
    ({ currentTarget }: MouseEvent<HTMLDivElement>) => {
      if (Number(currentTarget.dataset.swiperSlideIndex) === activeIndex) {
        setCursorType(CURSOR_TYPE.label)
      }
    },
    [activeIndex],
  )

  const a11y = useMemo(
    () => ({
      enabled: true,
      slideLabelMessage: 'Game slide {{index}} / {{slidesLength}}',
      containerRoleDescriptionMessage: 'Game slide carousel region',
      containerMessage: 'Game slide carousel',
      paginationBulletMessage: 'Go to slide {{index}}',
    }),
    [],
  )

  return (
    <Box
      pos="relative"
      overflowX="hidden"
      style={{ WebkitTapHighlightColor: 'transparent' }}
      onMouseLeave={hideCursor}
    >
      <Button
        {...edgeButtonProps}
        left={0}
        data-direction="prev"
        aria-label="Go to previous slide"
        onMouseEnter={onEdgeEnter}
        onMouseLeave={hideCursor}
        onClick={onEdgeClick}
      />
      <Button
        {...edgeButtonProps}
        right={0}
        data-direction="next"
        aria-label="Go to next slide"
        onMouseEnter={onEdgeEnter}
        onMouseLeave={hideCursor}
        onClick={onEdgeClick}
      />
      <SwiperContainer
        modules={[Pagination, Keyboard, A11y]}
        loop
        speed={1500}
        keyboard
        grabCursor
        slidesPerView="auto"
        longSwipesRatio={0.1}
        loopAdditionalSlides={1}
        centeredSlides
        pagination={{ enabled: true, clickable: true }}
        spaceBetween={spaceBetween}
        threshold={5}
        a11y={a11y}
        role="region"
        onSwiper={setSwiper}
        onBeforeTransitionStart={(instance) => {
          setActiveIndex(instance.realIndex)
          onActiveIndexChange?.(instance.realIndex)
        }}
        onSliderMove={hideCursor}
        pt={{ base: '2.625rem', xl: '2.5rem' }}
        pb={{ base: '2rem', xl: '4.375rem' }}
        userSelect="none"
        sx={swiperSx}
      >
        {items.map((item, index) => (
          <SwiperSlide
            key={item.id}
            style={{
              width: slideWidth === null ? undefined : `${slideWidth}%`,
              zIndex: index === activeIndex ? 1 : 0,
            }}
            onMouseEnter={onSlideEnter}
            onMouseLeave={hideCursor}
            aria-current={index === activeIndex ? 'true' : 'false'}
            aria-hidden={index === activeIndex ? undefined : 'true'}
          >
            <SlideLink
              href={`/servicios/${item.slug}`}
              aria-label={`Go to ${item.label}`}
              display="block"
              onClick={hideCursor}
            >
              <GameSlide
                id={item.id}
                index={index}
                label={item.label}
                isActive={index === activeIndex && slideWidth !== null && animate}
                animateThumbnail={animate}
                thumbnail={item.thumbnail}
                tagline={item.tagline}
                about={item.about}
              />
            </SlideLink>
          </SwiperSlide>
        ))}
      </SwiperContainer>
      <Cursor
        type={cursorType}
        label="Select"
        animateClick={animateClick}
        onClickAnimation={() => setAnimateClick(false)}
      />
    </Box>
  )
}
