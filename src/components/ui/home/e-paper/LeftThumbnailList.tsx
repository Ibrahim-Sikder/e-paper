// components/epaper/LeftThumbnailList.tsx
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

  useEffect(() => {
    itemRefs.current[activeIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [activeIndex]);

  if (!pages.length) return null;

  return (
    <div className="h-[85vh] overflow-y-auto pr-1 space-y-2 scrollbar-thin scrollbar-thumb-gray-300">
      {pages.map((page, index) => (
        <div
          key={page.id}
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
          onClick={() => onPageSelect(page)}
          className={`
            relative cursor-pointer rounded-lg overflow-hidden transition-all duration-200
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
            width={150}
            height={200}
            className="w-full h-auto block"
            unoptimized
          />
          <div className="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">
            {page.pageNumber}
          </div>
          {activeIndex === index && (
            <div className="absolute inset-0 bg-blue-500/10 pointer-events-none" />
          )}
        </div>
      ))}
    </div>
  );
}
