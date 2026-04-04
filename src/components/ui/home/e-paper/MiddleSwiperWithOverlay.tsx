// components/e-paper/MiddleSwiperWithOverlay.tsx
"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// 🔥 তোমার ইমেজের আসল সাইজ (ImageSizeChecker থেকে পাওয়া)
const ORIGINAL_WIDTH = 1200;
const ORIGINAL_HEIGHT = 1800;

export default function MiddleSwiperWithOverlay({
  pages,
  onArticleClick,
  onSlideChange,
  swiperRef,
}: any) {
  const [hoveredArticle, setHoveredArticle] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isImageReady, setIsImageReady] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (imageRef.current && isImageReady) {
        const rect = imageRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("📐 SCALE CALCULATION:");
        console.log(`Original: ${ORIGINAL_WIDTH}x${ORIGINAL_HEIGHT}`);
        console.log(
          `Rendered: ${Math.round(rect.width)}x${Math.round(rect.height)}`,
        );
        console.log(`Scale: ${(rect.width / ORIGINAL_WIDTH).toFixed(3)}`);
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [isImageReady]);

  const getScaledPosition = useCallback(
    (article: any) => {
      if (dimensions.width === 0 || !isImageReady) {
        return { left: 0, top: 0, width: 0, height: 0 };
      }
      const scale = dimensions.width / ORIGINAL_WIDTH;
      return {
        left: article.x * scale,
        top: article.y * scale,
        width: article.width * scale,
        height: article.height * scale,
      };
    },
    [dimensions, isImageReady],
  );

  return (
    <div className="relative">
      {/* ডিবাগ প্যানেল */}
      <div className="absolute top-2 right-2 z-30 bg-black bg-opacity-80 text-white text-[10px] p-2 rounded shadow-lg">
        <div>Scale: {(dimensions.width / ORIGINAL_WIDTH).toFixed(3)}x</div>
        <div>Articles: {pages[0]?.articles?.length || 0}</div>
        <div>Ready: {isImageReady ? "✅" : "❌"}</div>
      </div>

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
        className="rounded-xl overflow-hidden"
      >
        {pages.map((page: any) => (
          <SwiperSlide key={page.id}>
            <div className="relative w-full bg-gray-100 rounded-xl overflow-hidden">
              <div className="relative">
                <Image
                  ref={imageRef as any}
                  src={page.image}
                  alt={`Page ${page.pageNumber}`}
                  width={ORIGINAL_WIDTH}
                  height={ORIGINAL_HEIGHT}
                  className="w-full h-auto"
                  priority={page.id === 1}
                  onLoad={() => {
                    console.log("✅ Image loaded");
                    setIsImageReady(true);
                    setTimeout(() => {
                      if (imageRef.current) {
                        const rect = imageRef.current.getBoundingClientRect();
                        setDimensions({
                          width: rect.width,
                          height: rect.height,
                        });
                      }
                    }, 100);
                  }}
                />

                {/* ক্লিকেবল এরিয়াস - লাল বক্স */}
                {isImageReady &&
                  page.articles?.map((article: any, idx: number) => {
                    const pos = getScaledPosition(article);
                    if (pos.width === 0 || pos.height === 0) return null;

                    return (
                      <div
                        key={article.id}
                        onClick={() => {
                          console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
                          console.log("✅ CLICKED:", article.title);
                          console.log(`   Position: (${pos.left}, ${pos.top})`);
                          console.log(`   Size: ${pos.width}x${pos.height}`);
                          console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
                          onArticleClick(article);
                        }}
                        onMouseEnter={() => setHoveredArticle(article.id)}
                        onMouseLeave={() => setHoveredArticle(null)}
                        className="absolute cursor-pointer transition-all duration-200"
                        style={{
                          left: `${pos.left}px`,
                          top: `${pos.top}px`,
                          width: `${pos.width}px`,
                          height: `${pos.height}px`,
                          backgroundColor: "rgba(255, 0, 0, 0.25)",
                          border: "2px solid red",
                          zIndex: 10,
                        }}
                      >
                        <div className="absolute top-0 left-0 bg-red-600 text-white text-[9px] px-1 rounded-br font-bold">
                          #{idx + 1}
                        </div>
                        {hoveredArticle === article.id && (
                          <div className="absolute -top-7 left-0 bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap z-20 shadow-lg">
                            📰 {article.title.substring(0, 35)}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
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
          background: rgba(0, 0, 0, 0.5);
          width: 36px;
          height: 36px;
          border-radius: 50%;
        }
        :global(.swiper-button-next:after),
        :global(.swiper-button-prev:after) {
          font-size: 16px;
        }
      `}</style>
    </div>
  );
}
