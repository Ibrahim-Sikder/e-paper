/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import {
  useEpaperData,
  useAvailableDates,
  EpaperPage,
} from "@/hooks/useEpaperData";
import LeftThumbnailList from "./LeftThumbnailList";
import MiddleSwiperWithOverlay from "./MiddleSwiperWithOverlay";
import RightArticlePanel from "./RightArticlePanel";
import NewsTopBar from "./NewsTopBar";

export default function NewspaperViewer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ─── Read filter state from URL ────────────────────────────────────────────
  const urlDate = searchParams.get("date") || undefined;
  const urlEdition = searchParams.get("edition") || undefined;

  // ─── Fetch epaper data filtered by URL params ──────────────────────────────
  const { data, loading, error } = useEpaperData({
    date: urlDate,
    edition: urlEdition,
  });

  // ─── Fetch all available dates/editions for calendar highlighting ──────────
  const { dates: availableDates, editions: availableEditions } =
    useAvailableDates();

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"image" | "text" | "fullpage">(
    "image",
  );
  const swiperRef = useRef<any>(null);

  const pages = data?.pages || [];
  const activePage = pages[activeIndex] || null;

  // Create dummy pages for empty state
  const displayPages = pages.length > 0 ? pages : [];
  const displayActivePage = activePage || displayPages[0] || null;
  const displayActiveIndex =
    activeIndex < displayPages.length ? activeIndex : 0;

  // Reset activeIndex when filtered data changes (new date/edition loaded)
  useEffect(() => {
    setActiveIndex(0);
    if (swiperRef.current) swiperRef.current.slideTo(0, 0);
  }, [urlDate, urlEdition]);

  // Auto-select first article when page changes
  useEffect(() => {
    if (activePage?.articles?.length) {
      setSelectedArticle(activePage.articles[0]);
    } else {
      setSelectedArticle(null);
    }
  }, [activeIndex, activePage?.id]);

  // ─── URL updater — merges new params while keeping others ─────────────────
  const updateUrlParams = useCallback(
    (newParams: Record<string, string | undefined>) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      Object.entries(newParams).forEach(([key, value]) => {
        if (value === undefined || value === "") {
          current.delete(key);
        } else {
          current.set(key, value);
        }
      });
      const query = current.toString();
      router.push(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  // ─── Date change from TopBar calendar ─────────────────────────────────────
  const handleDateChange = useCallback(
    (date: string) => {
      updateUrlParams({ date });
    },
    [updateUrlParams],
  );

  // ─── Edition change from TopBar dropdown ──────────────────────────────────
  const handleEditionChange = useCallback(
    (edition: string) => {
      updateUrlParams({ edition });
    },
    [updateUrlParams],
  );

  // ─── Page navigation ───────────────────────────────────────────────────────
  const handlePageSelect = useCallback(
    (page: EpaperPage) => {
      const index = pages.findIndex((p) => p.id === page.id);
      if (index === -1) return;
      setActiveIndex(index);
      if (swiperRef.current) swiperRef.current.slideTo(index);
    },
    [pages],
  );

  const handleTopBarPageChange = useCallback(
    (pageNumber: number) => {
      const index = pageNumber - 1;
      if (index < 0 || index >= pages.length) return;
      setActiveIndex(index);
      if (swiperRef.current) swiperRef.current.slideTo(index);
    },
    [pages],
  );

  const handleSlideChange = useCallback((swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  }, []);

  const handleViewModeChange = useCallback(
    (mode: "image" | "text" | "fullpage") => {
      setViewMode(mode);
    },
    [],
  );

  const handleArticleClick = useCallback((article: any) => {
    setSelectedArticle(article);
  }, []);

  // ─── Loading Skeleton ──────────────────────────────────────────────────────
  if (loading) {
    return (
      <>
        <NewsTopBar
          pages={[]}
          activeIndex={0}
          viewMode={viewMode}
          activePage={null}
          onPageChange={() => {}}
          onViewModeChange={handleViewModeChange}
          onDateChange={handleDateChange}
          onEditionChange={handleEditionChange}
          availableDates={availableDates}
          availableEditions={availableEditions}
          currentDate={urlDate}
          currentEdition={urlEdition}
          isLoading={true}
        />
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="h-10 bg-gray-200 animate-pulse rounded mb-4" />
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
      </>
    );
  }

  // ─── Empty State with TopBar visible ───────────────────────────────────────
  if (!data || !pages.length) {
    return (
      <>
        <NewsTopBar
          pages={[]}
          activeIndex={0}
          viewMode={viewMode}
          activePage={null}
          onPageChange={() => {}}
          onViewModeChange={handleViewModeChange}
          onDateChange={handleDateChange}
          onEditionChange={handleEditionChange}
          availableDates={availableDates}
          availableEditions={availableEditions}
          currentDate={urlDate}
          currentEdition={urlEdition}
        />
        <div className="max-w-7xl mx-auto px-4 py-6 text-center py-20">
          <div className="text-6xl mb-4">📰</div>
          <h2 className="text-xl font-semibold text-gray-700">
            {urlDate || urlEdition
              ? `${urlDate || ""} ${urlEdition || ""} তারিখের জন্য কোনো ই-পেপার পাওয়া যায়নি`
              : "কোনো ই-পেপার পাওয়া যায়নি"}
          </h2>
          <button
            onClick={() => router.push(pathname)}
            className="mt-4 text-blue-600 text-sm underline"
          >
            সব ই-পেপার দেখুন
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <NewsTopBar
        pages={displayPages}
        activeIndex={displayActiveIndex}
        viewMode={viewMode}
        activePage={displayActivePage}
        onPageChange={handleTopBarPageChange}
        onViewModeChange={handleViewModeChange}
        onDateChange={handleDateChange}
        onEditionChange={handleEditionChange}
        availableDates={availableDates}
        availableEditions={availableEditions}
        currentDate={urlDate || displayActivePage?.epaperDate}
        currentEdition={urlEdition || displayActivePage?.edition}
      />

      {viewMode === "fullpage" && displayActivePage && (
        <FullPageModal
          page={displayActivePage}
          onClose={() => setViewMode("image")}
        />
      )}

      <div className="max-w-[1400px] mx-auto px-4 py-4">
        <div className="flex">
          <div className="">
            <h5 className="bg-[#1A73E8] text-white px-1 py-1 rounded- text-xs text-center mb-2">
              All Page
            </h5>
            <LeftThumbnailList
              pages={displayPages}
              activeIndex={displayActiveIndex}
              onPageSelect={handlePageSelect}
            />
          </div>
          <div className="grid grid-cols-12 gap-2">
            {/* Middle swiper */}
            <div className="col-span-5 shadow-lg">
              <MiddleSwiperWithOverlay
                pages={displayPages}
                initialIndex={displayActiveIndex}
                onArticleClick={handleArticleClick}
                onSlideChange={handleSlideChange}
                swiperRef={swiperRef}
              />
            </div>

            {/* Right article panel */}
            <div className="col-span-7">
              <RightArticlePanel
                selectedArticle={selectedArticle}
                selectedPage={displayActivePage}
                viewMode={viewMode}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Full Page Modal ───────────────────────────────────────────────────────────
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
