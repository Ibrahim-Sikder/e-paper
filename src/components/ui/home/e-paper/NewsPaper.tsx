// components/epaper/NewsPaper.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useRef, useCallback } from "react";
import LeftThumbnailList from "./LeftThumbnailList";
import MiddleSwiperWithOverlay from "./MiddleSwiperWithOverlay";
import RightArticlePanel from "./RightArticlePanel";
import { useEpaperData, EpaperPage } from "@/hooks/useEpaperData";

export default function NewsPaper() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const swiperRef = useRef<any>(null);
  const { data, loading, error } = useEpaperData();

  const pages = data?.pages || [];
  const activePage = pages[activeIndex] || null;

  // Left thumbnail click → move swiper
  const handlePageSelect = useCallback(
    (page: EpaperPage) => {
      const index = pages.findIndex((p) => p.id === page.id);
      if (index === -1) return;
      setActiveIndex(index);
      setSelectedArticle(null);
      // Swiper slide করুন
      if (swiperRef.current) {
        swiperRef.current.slideTo(index);
      }
    },
    [pages],
  );

  // Swiper slide change → update left thumbnail highlight
  const handleSlideChange = useCallback((swiper: any) => {
    setActiveIndex(swiper.activeIndex);
    setSelectedArticle(null);
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-2 space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-full h-40 bg-gray-200 animate-pulse rounded-lg"
              />
            ))}
          </div>
          <div className="col-span-5">
            <div className="w-full h-[600px] bg-gray-200 animate-pulse rounded-xl" />
          </div>
          <div className="col-span-5">
            <div className="w-full h-[600px] bg-gray-200 animate-pulse rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6 text-center py-20">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          ডেটা লোড করতে সমস্যা হয়েছে
        </h2>
        <p className="text-gray-500 text-sm">{error}</p>
      </div>
    );
  }

  if (!data || !pages.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6 text-center py-20">
        <div className="text-6xl mb-4">📰</div>
        <h2 className="text-xl font-semibold text-gray-700">
          কোনো ই-পেপার পাওয়া যায়নি
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {activePage?.epaperTitle && (
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          📰 {activePage.epaperTitle}
          <span className="text-sm font-normal text-gray-400 ml-2">
            ({activePage.epaperDate})
          </span>
        </h1>
      )}

      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-2">
          <LeftThumbnailList
            pages={pages}
            activeIndex={activeIndex}
            onPageSelect={handlePageSelect}
          />
        </div>
        <div className="col-span-5">
          <MiddleSwiperWithOverlay
            pages={pages}
            initialIndex={activeIndex}
            onArticleClick={(article) => setSelectedArticle(article)}
            onSlideChange={handleSlideChange}
            swiperRef={swiperRef}
          />
        </div>
        <div className="col-span-5">
          <RightArticlePanel
            selectedArticle={selectedArticle}
            selectedPage={activePage}
          />
        </div>
      </div>
    </div>
  );
}
