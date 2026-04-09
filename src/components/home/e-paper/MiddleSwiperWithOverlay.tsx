/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EpaperPage } from "@/hooks/useEpaperData";
import "./Epaper.css";

interface RenderedSize {
  displayWidth: number;
  displayHeight: number;
  originalWidth: number;
  originalHeight: number;
  ready: boolean;
}

interface Props {
  pages: EpaperPage[];
  initialIndex: number;
  onArticleClick: (article: EpaperPage["articles"][0]) => void;
  onSlideChange: (swiper: any) => void;
  swiperRef: React.MutableRefObject<any>;
}

export default function MiddleSwiperWithOverlay({
  pages,
  initialIndex,
  onArticleClick,
  onSlideChange,
  swiperRef,
}: Props) {
  const [hoveredArticle, setHoveredArticle] = useState<string | null>(null);
  const [renderedSizes, setRenderedSizes] = useState<
    Record<string, RenderedSize>
  >({});
  const imageRefs = useRef<Record<string, HTMLImageElement | null>>({});

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.activeIndex !== initialIndex) {
      swiperRef.current.slideTo(initialIndex, 300);
    }
  }, [initialIndex, swiperRef]);

  // Measure the rendered size of an image and store it.
  // We use a ResizeObserver so the overlay stays correct when the container resizes.
  const measureImage = useCallback((pageId: string, page: EpaperPage) => {
    const img = imageRefs.current[pageId];
    if (!img) return;

    const doMeasure = () => {
      if (img.offsetWidth === 0) {
        requestAnimationFrame(doMeasure);
        return;
      }
      setRenderedSizes((prev) => ({
        ...prev,
        [pageId]: {
          displayWidth: img.offsetWidth,
          displayHeight: img.offsetHeight,
          originalWidth:
            page.originalWidth > 0 ? page.originalWidth : img.naturalWidth,
          originalHeight:
            page.originalHeight > 0 ? page.originalHeight : img.naturalHeight,
          ready: true,
        },
      }));
    };

    doMeasure();
  }, []);

  const handleImageLoad = useCallback(
    (pageId: string, page: EpaperPage) => {
      measureImage(pageId, page);
    },
    [measureImage],
  );

  useEffect(() => {
    const observers: ResizeObserver[] = [];

    pages.forEach((page) => {
      const img = imageRefs.current[page.id];
      if (!img) return;

      const ro = new ResizeObserver(() => measureImage(page.id, page));
      ro.observe(img);
      observers.push(ro);
    });

    return () => observers.forEach((ro) => ro.disconnect());
  }, [pages, measureImage]);

  const getPosition = useCallback(
    (article: EpaperPage["articles"][0], pageId: string) => {
      const size = renderedSizes[pageId];
      if (!size?.ready) return null;

      const scaleX = size.displayWidth / size.originalWidth;
      const scaleY = size.displayHeight / size.originalHeight;

      return {
        left: article.x * scaleX,
        top: article.y * scaleY,
        width: article.width * scaleX,
        height: article.height * scaleY,
      };
    },
    [renderedSizes],
  );

  if (!pages.length) {
    return (
      <div className="rounded-xl overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center h-[600px]">
        <p className="text-gray-500">কোনো পৃষ্ঠা পাওয়া যায়নি</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation]}
        navigation
        initialSlide={initialIndex}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={onSlideChange}
        spaceBetween={20}
        slidesPerView={1}
        className="epaper-swiper"
      >
        {pages.map((page) => (
          <SwiperSlide key={page.id}>
            <div className="relative w-full bg-gray-100">
              <img
                ref={(el) => {
                  imageRefs.current[page.id] = el;
                }}
                src={page.image}
                alt={`Page ${page.pageNumber}`}
                className="w-full h-auto block"
                onLoad={() => handleImageLoad(page.id, page)}
                draggable={false}
              />

              {renderedSizes[page.id]?.ready &&
                page.articles?.map((article) => {
                  const pos = getPosition(article, page.id);

                  if (!pos || pos.width < 1 || pos.height < 1) return null;

                  return (
                    <div
                      key={article.id}
                      onClick={() => onArticleClick(article)}
                      onMouseEnter={() => setHoveredArticle(article.id)}
                      onMouseLeave={() => setHoveredArticle(null)}
                      className="absolute cursor-pointer"
                      style={{
                        left: pos.left,
                        top: pos.top,
                        width: pos.width,
                        height: pos.height,
                        zIndex: 10,
                      }}
                    >
                      {hoveredArticle === article.id && (
                        <div className="absolute -top-8 left-0 bg-black/75 text-white text-xs px-3 py-1.5 rounded-full whitespace-nowrap z-20 shadow-lg max-w-[200px] truncate">
                          📰 {article.title}
                        </div>
                      )}
                      <div className="w-full h-full border-2 border-transparent hover:border-blue-400/60 hover:bg-blue-400/10 rounded transition-all duration-150" />
                    </div>
                  );
                })}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
