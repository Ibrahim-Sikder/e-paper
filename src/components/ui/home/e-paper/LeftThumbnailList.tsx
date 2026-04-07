"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { EpaperPage } from "@/hooks/useEpaperData";

interface Props {
  pages: EpaperPage[];
  activeIndex: number;
  onPageSelect: (page: EpaperPage) => void;
}

export default function LeftThumbnailList({
  pages,
  activeIndex,
  onPageSelect,
}: Props) {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    itemRefs.current[activeIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [activeIndex]);

  // Apply scrollbar styles
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.scrollbarWidth = "thin";
      scrollContainerRef.current.style.scrollbarColor = "#cbd5e1 #f1f5f9";
    }
  }, []);

  if (!pages.length) return null;

  return (
    <div
      ref={scrollContainerRef}
      className="h-[calc(100vh-120px)] overflow-y-auto pr-1 space-y-3"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "#cbd5e1 #f1f5f9",
      }}
    >
      <style>
        {`
          .custom-scrollbar-thin::-webkit-scrollbar {
            width: 4px;
            height: 4px;
          }
          .custom-scrollbar-thin::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 10px;
          }
          .custom-scrollbar-thin::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 10px;
          }
          .custom-scrollbar-thin::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }
        `}
      </style>

      {pages.map((page, index) => (
        <div
          key={page.id}
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
          onClick={() => onPageSelect(page)}
          className={`
            relative cursor-pointer  overflow-hidden transition-all duration-200 w-[120px]
            ${
              activeIndex === index
                ? "ring-2 ring-blue-500 ring-offset-2 shadow-md"
                : "hover:ring-1 hover:ring-gray-300 hover:shadow-sm opacity-80 hover:opacity-100"
            }
          `}
        >
          <Image
            src={page.thumbnail}
            alt={`Page ${page.pageNumber}`}
            width={300}
            height={400}
            className="w-full h-auto block"
            unoptimized
          />
          <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
            পৃষ্ঠা {page.pageNumber}
          </div>
          {activeIndex === index && (
            <div className="absolute inset-0 bg-blue-500/10 pointer-events-none" />
          )}
        </div>
      ))}
    </div>
  );
}
