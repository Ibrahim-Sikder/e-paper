// components/e-paper/MiddleSwiperWithOverlay.jsx
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function MiddleSwiperWithOverlay({
  pages,
  onArticleClick,
  onSlideChange,
  swiperRef,
}: any) {
  const [hoveredArticle, setHoveredArticle] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const imageRef = React.useRef(null);

  // Calculate scaling factor if image is responsive
  useEffect(() => {
    const updateDimensions = () => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: rect.height,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [pages]);

  // Calculate scaled coordinates based on actual image size
  const getScaledPosition = (
    article,
    originalImageWidth = 800,
    originalImageHeight = 1100,
  ) => {
    const scaleX = dimensions.width / originalImageWidth;
    const scaleY = dimensions.height / originalImageHeight;

    return {
      left: article.x * scaleX,
      top: article.y * scaleY,
      width: article.width * scaleX,
      height: article.height * scaleY,
    };
  };

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        pagination={{ clickable: true, dynamicBullets: true }}
        onSwiper={(swiper) => {
          if (swiperRef) swiperRef.current = swiper;
        }}
        onSlideChange={onSlideChange}
        loop={false}
        spaceBetween={20}
        slidesPerView={1}
        className="main-swiper"
      >
        {pages.map((page) => (
          <SwiperSlide key={page.id}>
            <div className="relative w-full bg-gray-100 rounded-xl overflow-hidden">
              {/* Main Image */}
              <div className="relative">
                <Image
                  ref={imageRef}
                  src={page.image}
                  alt={`Page ${page.pageNumber}`}
                  width={800}
                  height={1100}
                  className="w-full h-auto"
                  priority={page.id === 1}
                />

                {/* Clickable Overlay Areas */}
                {page.articles.map((article) => {
                  const position = getScaledPosition(article);
                  return (
                    <div
                      key={article.id}
                      onClick={() => onArticleClick(article)}
                      onMouseEnter={() => setHoveredArticle(article.id)}
                      onMouseLeave={() => setHoveredArticle(null)}
                      className="absolute cursor-pointer transition-all duration-200"
                      style={{
                        left: position.left,
                        top: position.top,
                        width: position.width,
                        height: position.height,
                        backgroundColor:
                          hoveredArticle === article.id
                            ? "rgba(59, 130, 246, 0.2)"
                            : "rgba(255, 255, 255, 0)",
                        border:
                          hoveredArticle === article.id
                            ? "2px solid rgba(59, 130, 246, 0.6)"
                            : "none",
                      }}
                    >
                      {/* Optional: Show title on hover */}
                      {hoveredArticle === article.id && (
                        <div className="absolute -top-8 left-0 bg-blue-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                          {article.title.substring(0, 40)}...
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

      {/* Custom Navigation Buttons */}
      <button className="custom-prev custom-nav-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button className="custom-next custom-nav-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>

      <style jsx>{`
        .main-swiper {
          border-radius: 12px;
          overflow: hidden;
          position: relative;
        }
        .custom-nav-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          background: rgba(0, 0, 0, 0.6);
          color: white;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          backdrop-filter: blur(4px);
        }
        .custom-prev {
          left: 16px;
        }
        .custom-next {
          right: 16px;
        }
        .custom-nav-button:hover {
          background: rgba(0, 0, 0, 0.9);
          transform: translateY(-50%) scale(1.1);
        }
        :global(.swiper-pagination-bullet) {
          background: white !important;
          opacity: 0.7 !important;
        }
        :global(.swiper-pagination-bullet-active) {
          background: white !important;
          opacity: 1 !important;
          transform: scale(1.2) !important;
        }
      `}</style>
    </div>
  );
}
