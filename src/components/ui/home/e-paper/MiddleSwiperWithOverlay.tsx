// components/e-paper/MiddleSwiperWithOverlay.tsx
"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// 🔥 এখানে CheckImageSize থেকে পাওয়া সাইজ বসাও
const ORIGINAL_WIDTH = 800; // তোমার ইমেজের আসল width
const ORIGINAL_HEIGHT = 1100; // তোমার ইমেজের আসল height

interface Article {
  id: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  articleImage: string;
}

interface Props {
  pages: any[];
  onArticleClick: (article: Article) => void;
  onSlideChange: (swiper: any) => void;
  swiperRef: React.MutableRefObject<any>;
}

export default function MiddleSwiperWithOverlay({
  pages,
  onArticleClick,
  onSlideChange,
  swiperRef,
}: Props) {
  const [hoveredArticle, setHoveredArticle] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [isReady, setIsReady] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  // ইমেজের বর্তমান সাইজ আপডেট
  const updateSize = useCallback(() => {
    if (imageRef.current && isReady) {
      const rect = imageRef.current.getBoundingClientRect();
      setImageSize({ width: rect.width, height: rect.height });
    }
  }, [isReady]);

  useEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [updateSize]);

  // স্কেল করা পজিশন বের করার ফাংশন
  const getPosition = useCallback(
    (article: Article) => {
      if (imageSize.width === 0 || !isReady) {
        return { left: 0, top: 0, width: 0, height: 0 };
      }
      const scaleX = imageSize.width / ORIGINAL_WIDTH;
      const scaleY = imageSize.height / ORIGINAL_HEIGHT;
      return {
        left: article.x * scaleX,
        top: article.y * scaleY,
        width: article.width * scaleX,
        height: article.height * scaleY,
      };
    },
    [imageSize, isReady],
  );

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        onSwiper={(swiper) => {
          if (swiperRef) swiperRef.current = swiper;
        }}
        onSlideChange={onSlideChange}
        spaceBetween={20}
        slidesPerView={1}
        className="rounded-xl overflow-hidden shadow-lg"
      >
        {pages.map((page) => (
          <SwiperSlide key={page.id}>
            <div className="relative w-full bg-gray-100">
              {/* মূল ইমেজ */}
              <Image
                ref={imageRef as any}
                src={page.image}
                alt={`Page ${page.pageNumber}`}
                className="w-full h-auto"
                priority={page.id === 1}
                onLoad={() => {
                  setIsReady(true);
                  setTimeout(updateSize, 100);
                }}
              />

              {/* ইনভিজিবল ক্লিকেবল এরিয়াস - সম্পূর্ণ স্বচ্ছ */}
              {isReady &&
                page.articles?.map((article: Article, idx: number) => {
                  const pos = getPosition(article);
                  if (pos.width === 0) return null;

                  return (
                    <div
                      key={article.id}
                      onClick={() => {
                        onArticleClick(article);
                      }}
                      onMouseEnter={() => setHoveredArticle(article.id)}
                      onMouseLeave={() => setHoveredArticle(null)}
                      className="absolute cursor-pointer"
                      style={{
                        left: `${pos.left}px`,
                        top: `${pos.top}px`,
                        width: `${pos.width}px`,
                        height: `${pos.height}px`,
                        // 🔥 সম্পূর্ণ স্বচ্ছ - Kalbela-এর মতো
                        backgroundColor: "transparent",
                        zIndex: 10,
                      }}
                    >
                      {/* হোভার করলে শুধু টুলটিপ দেখাবে */}
                      {hoveredArticle === article.id && (
                        <div className="absolute -top-8 left-0 bg-black bg-opacity-75 text-white text-xs px-3 py-1.5 rounded-full whitespace-nowrap z-20 shadow-lg transition-all duration-200">
                          📰 {article.title}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx>{`
        :global(.swiper-pagination-bullet) {
          background: white !important;
          opacity: 0.7 !important;
        }
        :global(.swiper-pagination-bullet-active) {
          background: white !important;
          opacity: 1 !important;
        }
        :global(.swiper-button-next),
        :global(.swiper-button-prev) {
          color: white !important;
          background: rgba(0, 0, 0, 0.4);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          backdrop-filter: blur(4px);
          transition: all 0.3s ease;
        }
        :global(.swiper-button-next:hover),
        :global(.swiper-button-prev:hover) {
          background: rgba(0, 0, 0, 0.7);
        }
        :global(.swiper-button-next:after),
        :global(.swiper-button-prev:after) {
          font-size: 18px;
        }
      `}</style>
    </div>
  );
}
