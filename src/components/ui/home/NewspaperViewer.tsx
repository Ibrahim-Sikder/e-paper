// components/epaper/NewspaperViewer.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useRef, useCallback } from "react";
import NewsTopBar from "./NewsTopBar";
import { useEpaperData, EpaperPage } from "@/hooks/useEpaperData";
import LeftThumbnailList from "./e-paper/LeftThumbnailList";
import MiddleSwiperWithOverlay from "./e-paper/MiddleSwiperWithOverlay";
import RightArticlePanel from "./e-paper/RightArticlePanel";

export default function NewspaperViewer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"image" | "text" | "fullpage">(
    "image",
  );
  const swiperRef = useRef<any>(null);
  const { data, loading, error } = useEpaperData();

  const pages = data?.pages || [];
  const activePage = pages[activeIndex] || null;

  const handlePageSelect = useCallback(
    (page: EpaperPage) => {
      const index = pages.findIndex((p) => p.id === page.id);
      if (index === -1) return;
      setActiveIndex(index);
      setSelectedArticle(null);
      if (swiperRef.current) swiperRef.current.slideTo(index);
    },
    [pages],
  );

  const handleTopBarPageChange = useCallback(
    (pageNumber: number) => {
      const index = pageNumber - 1;
      if (index < 0 || index >= pages.length) return;
      setActiveIndex(index);
      setSelectedArticle(null);
      if (swiperRef.current) swiperRef.current.slideTo(index);
    },
    [pages],
  );

  const handleSlideChange = useCallback((swiper: any) => {
    setActiveIndex(swiper.activeIndex);
    setSelectedArticle(null);
  }, []);

  // ✅ FIX: viewMode change হলে selectedArticle clear করি না,
  // কিন্তু text mode এ RightArticlePanel এ page articles দেখাব
  const handleViewModeChange = useCallback(
    (mode: "image" | "text" | "fullpage") => {
      setViewMode(mode);
      // text mode এ article selection clear করি যাতে page content দেখায়
      if (mode === "text") {
        setSelectedArticle(null);
      }
    },
    [],
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="h-12 bg-gray-200 animate-pulse rounded mb-4" />
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-2 space-y-3">
            {[1, 2, 3].map((i) => (
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
    <div className="bg-gray-50 min-h-screen">
      <NewsTopBar
        pages={pages}
        activeIndex={activeIndex}
        viewMode={viewMode}
        activePage={activePage}
        onPageChange={handleTopBarPageChange}
        onViewModeChange={handleViewModeChange}
      />

      {/* Full Page View Modal */}
      {viewMode === "fullpage" && activePage && (
        <FullPageModal page={activePage} onClose={() => setViewMode("image")} />
      )}

      <div className="max-w-7xl mx-auto px-4 py-4">
        {activePage?.epaperTitle && (
          <h1 className="text-xl font-bold text-gray-800 mb-3">
            📰 {activePage.epaperTitle}
            <span className="text-sm font-normal text-gray-400 ml-2">
              ({activePage.epaperDate})
            </span>
          </h1>
        )}

        <div className="grid grid-cols-12 gap-5">
          {/* Left thumbnails */}
          <div className="col-span-2">
            <LeftThumbnailList
              pages={pages}
              activeIndex={activeIndex}
              onPageSelect={handlePageSelect}
            />
          </div>

          {/* ✅ FIX: Middle — text mode এ সবসময় image/swiper দেখাব,
              text content শুধু RightArticlePanel এ যাবে */}
          <div className="col-span-5">
            <MiddleSwiperWithOverlay
              pages={pages}
              initialIndex={activeIndex}
              onArticleClick={(article) => {
                setSelectedArticle(article);
                // image mode এ click করলে text mode এ switch করি না
              }}
              onSlideChange={handleSlideChange}
              swiperRef={swiperRef}
            />
          </div>

          {/* ✅ FIX: Right panel — text mode এ page articles দেখাবে,
              image mode এ selected article দেখাবে */}
          <div className="col-span-5">
            <RightArticlePanel
              selectedArticle={selectedArticle}
              selectedPage={activePage}
              viewMode={viewMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Full Page Modal ──────────────────────────────────────
function FullPageModal({
  page,
  onClose,
}: {
  page: EpaperPage;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white bg-white/20 hover:bg-white/40 rounded-full w-10 h-10 flex items-center justify-center text-xl transition-all z-10"
      >
        ✕
      </button>
      <div
        className="max-w-3xl w-full max-h-screen overflow-y-auto px-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={page.image}
          alt={`Page ${page.pageNumber}`}
          className="w-full h-auto rounded-lg"
        />
      </div>
    </div>
  );
}
