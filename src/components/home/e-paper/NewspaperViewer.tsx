/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  EpaperPage,
  useAvailableDates,
  useEpaperData,
} from "@/hooks/useEpaperData";
import FullPageImageViewer from "./FullPageImageViewer";
import LeftThumbnailList from "./LeftThumbnailList";
import MiddleSwiperWithOverlay from "./MiddleSwiperWithOverlay";
import NewsTopBar from "./NewsTopBar";
import RightArticlePanel from "./RightArticlePanel";
import OGMetaTags from "@/components/OGMetaTags";

export default function NewspaperViewer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPageUrl =
    typeof window !== "undefined" ? window.location.href : "";
  const urlDate = searchParams.get("date") || undefined;
  const urlEdition = searchParams.get("edition") || undefined;

  const { data, loading, error } = useEpaperData({
    date: urlDate,
    edition: urlEdition,
  });

  const { dates: availableDates, editions: availableEditions } =
    useAvailableDates();

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"image" | "text" | "fullpage">(
    "image",
  );
  const [fullPageImage, setFullPageImage] = useState<EpaperPage | null>(null);
  const swiperRef = useRef<any>(null);

  const pages = data?.pages || [];
  const activePage = pages[activeIndex] || null;

  const displayPages = pages.length > 0 ? pages : [];
  const displayActivePage = activePage || displayPages[0] || null;
  const displayActiveIndex =
    activeIndex < displayPages.length ? activeIndex : 0;

  useEffect(() => {
    setActiveIndex(0);
    if (swiperRef.current) swiperRef.current.slideTo(0, 0);
  }, [urlDate, urlEdition]);

  useEffect(() => {
    if (activePage?.articles?.length) {
      setSelectedArticle(activePage.articles[0]);
    } else {
      setSelectedArticle(null);
    }
  }, [activeIndex, activePage?.id]);

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

  const handleDateChange = useCallback(
    (date: string) => {
      updateUrlParams({ date });
    },
    [updateUrlParams],
  );

  const handleEditionChange = useCallback(
    (edition: string) => {
      updateUrlParams({ edition });
    },
    [updateUrlParams],
  );

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
      if (mode === "fullpage" && displayActivePage) {
        setFullPageImage(displayActivePage);
      } else {
        setFullPageImage(null);
        setViewMode(mode);
      }
    },
    [displayActivePage],
  );

  const handleArticleClick = useCallback((article: any) => {
    setSelectedArticle(article);
  }, []);

  const handleCloseFullPage = useCallback(() => {
    setFullPageImage(null);
    setViewMode("image");
  }, []);

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
    <>
      <OGMetaTags
        title={
          displayActivePage
            ? `${displayActivePage.epaperTitle} - পৃষ্ঠা ${displayActivePage.pageNumber + 1} | ই-পেপার`
            : "ই-পেপার"
        }
        description={
          displayActivePage?.articles?.[0]?.content?.substring(0, 200) ||
          `${displayActivePage?.epaperTitle || "ই-পেপার"} - ${displayActivePage?.epaperDate || ""} তারিখের ই-পেপার`
        }
        image={displayActivePage?.image || "/default-og-image.jpg"}
        url={currentPageUrl}
      />
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

        <div className="max-w-[1400px] mx-auto px-4 py-4">
          <div className="flex gap-4">
            <div className="w-[120px] flex-shrink-0">
              <h5 className="bg-[#1A73E8] text-white px-1 py-1 rounded text-xs text-center mb-2">
                সকল পাতা
              </h5>
              <LeftThumbnailList
                pages={displayPages}
                activeIndex={displayActiveIndex}
                onPageSelect={handlePageSelect}
              />
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-5">
                  <MiddleSwiperWithOverlay
                    pages={displayPages}
                    initialIndex={displayActiveIndex}
                    onArticleClick={handleArticleClick}
                    onSlideChange={handleSlideChange}
                    swiperRef={swiperRef}
                  />
                </div>

                <div className="col-span-7">
                  <RightArticlePanel
                    selectedArticle={selectedArticle}
                    selectedPage={displayActivePage}
                    viewMode={viewMode}
                    footerInfo={data?.footerInfo}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full Page Image Viewer */}
        {fullPageImage && (
          <FullPageImageViewer
            page={fullPageImage}
            onClose={handleCloseFullPage}
          />
        )}
      </div>
    </>
  );
}
