// components/e-paper/NewsPaper.jsx
import React, { useState, useRef, useEffect } from "react";
import Container from "@/components/share/container";
import { epaperPages } from "@/data/epaperData";
import LeftThumbnailList from "./LeftThumbnailList";
import MiddleSwiperWithOverlay from "./MiddleSwiperWithOverlay";
import RightArticlePanel from "./RightArticlePanel";

export default function NewsPaper() {
  const [selectedPage, setSelectedPage] = useState(epaperPages[0]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const swiperRef = useRef(null);

  // Handle page change from left thumbnail
  const handlePageChange = (page) => {
    setSelectedPage(page);
    setSelectedArticle(null);

    // Sync swiper if needed
    if (swiperRef.current) {
      const pageIndex = epaperPages.findIndex((p) => p.id === page.id);
      swiperRef.current.slideTo(pageIndex);
    }
  };

  // Handle article click from middle overlay
  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  // Handle swiper slide change
  const handleSlideChange = (swiper) => {
    const page = epaperPages[swiper.activeIndex];
    if (page) {
      setSelectedPage(page);
      setSelectedArticle(null);
    }
  };

  return (
    <Container>
      <div className="grid grid-cols-12 gap-6">
        {/* LEFT COLUMN - Thumbnail List */}
        <div className="col-span-2">
          <LeftThumbnailList
            pages={epaperPages}
            selectedPage={selectedPage}
            onPageSelect={handlePageChange}
          />
        </div>

        {/* MIDDLE COLUMN - Main Viewer with Clickable Overlay */}
        <div className="col-span-7">
          <MiddleSwiperWithOverlay
            pages={epaperPages}
            selectedPage={selectedPage}
            onArticleClick={handleArticleClick}
            onSlideChange={handleSlideChange}
            swiperRef={swiperRef}
          />
        </div>

        {/* RIGHT COLUMN - Article Details */}
        <div className="col-span-3">
          <RightArticlePanel
            selectedArticle={selectedArticle}
            selectedPage={selectedPage}
          />
        </div>
      </div>
    </Container>
  );
}
