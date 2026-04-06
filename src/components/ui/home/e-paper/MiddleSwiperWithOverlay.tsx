// components/epaper/MiddleSwiperWithOverlay.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EpaperPage } from "@/hooks/useEpaperData";

interface PageSize {
  width: number;
  height: number;
  naturalWidth: number;
  naturalHeight: number;
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
  const [pageSizes, setPageSizes] = useState<Record<string, PageSize>>({});
  const imageRefs = useRef<Record<string, HTMLImageElement | null>>({});

  // External index change (left thumbnail click) → slide
  useEffect(() => {
    if (swiperRef.current && swiperRef.current.activeIndex !== initialIndex) {
      swiperRef.current.slideTo(initialIndex, 300);
    }
  }, [initialIndex, swiperRef]);

  // const handleImageLoad = useCallback((pageId: string) => {
  //   const img = imageRefs.current[pageId];
  //   if (!img) return;
  //   const rect = img.getBoundingClientRect();
  //   setPageSizes((prev) => ({
  //     ...prev,
  //     [pageId]: {
  //       width: rect.width,
  //       height: rect.height,
  //       naturalWidth: img.naturalWidth,
  //       naturalHeight: img.naturalHeight,
  //       ready: true,
  //     },
  //   }));
  // }, []);

  // MiddleSwiperWithOverlay.tsx — handleImageLoad fixed
  const handleImageLoad = useCallback((pageId: string) => {
    const img = imageRefs.current[pageId];
    if (!img) return;

    // getBoundingClientRect() দেওয়ার বদলে img.width/height ব্যবহার করুন
    // কারণ rect এ CSS-scaled size আসে যা সঠিক — কিন্তু
    // naturalWidth/naturalHeight দিয়ে আমরা scale calculate করব

    const updateSize = () => {
      // img এখনো layout পায়নি হলে retry
      if (img.offsetWidth === 0) {
        requestAnimationFrame(updateSize);
        return;
      }
      setPageSizes((prev) => ({
        ...prev,
        [pageId]: {
          width: img.offsetWidth, // CSS-rendered width (screen এ যতটুকু দেখাচ্ছে)
          height: img.offsetHeight, // CSS-rendered height
          naturalWidth: img.naturalWidth, // original image width
          naturalHeight: img.naturalHeight, // original image height
          ready: true,
        },
      }));
    };

    updateSize();
  }, []);

  const getPosition = useCallback(
    (article: EpaperPage["articles"][0], pageId: string) => {
      const size = pageSizes[pageId];
      if (!size?.ready || !size.naturalWidth)
        return { left: 0, top: 0, width: 0, height: 0 };
      const scaleX = size.width / size.naturalWidth;
      const scaleY = size.height / size.naturalHeight;
      return {
        left: article.x * scaleX,
        top: article.y * scaleY,
        width: article.width * scaleX,
        height: article.height * scaleY,
      };
    },
    [pageSizes],
  );

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        initialSlide={initialIndex}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={onSlideChange}
        spaceBetween={20}
        slidesPerView={1}
        className="rounded-xl overflow-hidden shadow-lg"
      >
        {pages.map((page) => (
          <SwiperSlide key={page.id}>
            <div className="relative w-full bg-gray-100">
              <Image
                ref={(el) => {
                  imageRefs.current[page.id] = el;
                }}
                src={page.image}
                alt={`Page ${page.pageNumber}`}
                width={800}
                height={1100}
                className="w-full h-auto"
                unoptimized
                onLoad={() => handleImageLoad(page.id)}
              />

              {pageSizes[page.id]?.ready &&
                page.articles.map((article) => {
                  const pos = getPosition(article, page.id);
                  if (!pos.width || !pos.height) return null;
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

      <style jsx>{`
        :global(.swiper-button-next),
        :global(.swiper-button-prev) {
          color: white !important;
          background: rgba(0, 0, 0, 0.45);
          width: 36px;
          height: 36px;
          border-radius: 50%;
        }
        :global(.swiper-button-next:after),
        :global(.swiper-button-prev:after) {
          font-size: 16px;
        }
        :global(.swiper-pagination-bullet) {
          background: white !important;
          opacity: 0.6 !important;
        }
        :global(.swiper-pagination-bullet-active) {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}
