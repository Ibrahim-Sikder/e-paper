// components/epaper/LeftThumbnailList.tsx
"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { EpaperPage } from "@/hooks/useEpaperData";

interface Props {
  pages: EpaperPage[];
  activeIndex: number; // index-based sync — string id না
  onPageSelect: (page: EpaperPage) => void;
}

export default function LeftThumbnailList({
  pages,
  activeIndex,
  onPageSelect,
}: Props) {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Active page scroll into view automatically
  useEffect(() => {
    itemRefs.current[activeIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [activeIndex]);

  if (!pages.length) return null;

  // date অনুযায়ী group
  const grouped: {
    date: string;
    title: string;
    items: { page: EpaperPage; index: number }[];
  }[] = [];
  pages.forEach((page, index) => {
    const last = grouped[grouped.length - 1];
    if (last && last.date === page.epaperDate) {
      last.items.push({ page, index });
    } else {
      grouped.push({
        date: page.epaperDate,
        title: page.epaperTitle,
        items: [{ page, index }],
      });
    }
  });

  return (
    <div className="h-[85vh] overflow-y-auto pr-1 space-y-4 scrollbar-thin scrollbar-thumb-gray-300">
      {grouped.map((group) => (
        <div key={group.date}>
          {/* Date group header */}
          <div className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded mb-2 sticky top-0 z-10 truncate">
            {group.date}
          </div>

          <div className="space-y-2">
            {group.items.map(({ page, index }) => (
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
                      ? "ring-2 ring-blue-500 ring-offset-1 shadow-md"
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
                {/* Page number badge */}
                <div className="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">
                  {page.pageNumber}
                </div>
                {/* Active indicator */}
                {activeIndex === index && (
                  <div className="absolute inset-0 bg-blue-500/10 pointer-events-none" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
