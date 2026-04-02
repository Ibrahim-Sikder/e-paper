import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, FreeMode } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

// Import middle column images
import epaper from "@/assets/middle/page10.webp";
import epaper2 from "@/assets/middle/page11.jpg";
import epaper3 from "@/assets/middle/page12.webp";

// Middle column image data
const middleImages = [
  {
    id: 1,
    image: epaper,
    alt: "Page 10",
    title: "Page 10",
  },
  {
    id: 2,
    image: epaper2,
    alt: "Page 11",
    title: "Page 11",
  },
  {
    id: 3,
    image: epaper3,
    alt: "Page 12",
    title: "Page 12",
  },
];

export default function MiddleSwiper() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="space-y-4">
      {/* Main Slider */}
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Thumbs]}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          pagination={{ clickable: true }}
          thumbs={{ swiper: thumbsSwiper }}
          loop={true}
          spaceBetween={20}
          slidesPerView={1}
          className="main-swiper"
        >
          {middleImages.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="relative w-full">
                <Image
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-auto rounded-lg shadow-lg"
                  priority={item.id === 1}
                  loading={item.id === 1 ? "eager" : "lazy"}
                />
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
      </div>

      {/* Custom Styles */}
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
