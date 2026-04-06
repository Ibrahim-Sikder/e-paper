/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useRef } from "react";
import { epaperPages } from "@/data/epaperData";

import { useParams } from "next/navigation";
import { useEpaperData } from "@/hooks/useEpaperData";
import LeftThumbnailList from "@/components/ui/home/e-paper/LeftThumbnailList";
import MiddleSwiperWithOverlay from "@/components/ui/home/e-paper/MiddleSwiperWithOverlay";
import RightArticlePanel from "@/components/ui/home/e-paper/RightArticlePanel";

export default function NewsPaper() {
  const [selectedPage, setSelectedPage] = useState(epaperPages[0]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const swiperRef = useRef(null);
  const params = useParams();
  const date =
    (params?.date as string) || new Date().toISOString().split("T")[0];

  // Use the hook to fetch data
  const { data, loading, error } = useEpaperData(date);
  console.log("Fetched E-paper Data:", data);
  const handlePageChange = (page: any) => {
    setSelectedPage(page);
    setSelectedArticle(null);
    if (swiperRef.current) {
      const index = epaperPages.findIndex((p) => p.id === page.id);
      swiperRef.current.slideTo(index);
    }
  };

  const handleSlideChange = (swiper: any) => {
    const page = epaperPages[swiper.activeIndex];
    if (page) {
      setSelectedPage(page);
      setSelectedArticle(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-12 gap-5">
        {/* বাম কলাম */}
        <div className="col-span-2">
          <LeftThumbnailList
            pages={epaperPages}
            selectedPage={selectedPage}
            onPageSelect={handlePageChange}
          />
        </div>

        {/* মাঝের কলাম */}
        <div className="col-span-5">
          <MiddleSwiperWithOverlay
            pages={epaperPages}
            onArticleClick={(article: any) => setSelectedArticle(article)}
            onSlideChange={handleSlideChange}
            swiperRef={swiperRef}
          />
        </div>

        {/* ডান কলাম */}
        <div className="col-span-5">
          <RightArticlePanel
            selectedArticle={selectedArticle}
            selectedPage={selectedPage}
          />
        </div>
      </div>
    </div>
  );
}
