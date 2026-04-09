/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { leftSideProps } from "@/types/epaper";

export default function LeftThumbnailList({
  pages,
  activeIndex,
  onPageSelect,
}: leftSideProps) {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    itemRefs.current[activeIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [activeIndex]);

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
      className="h-[calc(100vh-120px)] overflow-y-auto pr-1 space-y-3 w-[120px]"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "#cbd5e1 #f1f5f9",
      }}
    >
      {pages.map((page, index) => {
        const isActive = activeIndex === index;

        return (
          <div
            key={page.id}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            onClick={() => onPageSelect(page)}
            className={`
              relative cursor-pointer overflow-hidden transition-all duration-200 
              ${
                isActive
                  ? "ring-2 ring-red-500 ring-offset-2 shadow-md"
                  : "hover:ring-1 hover:ring-gray-300 hover:shadow-sm opacity-80 hover:opacity-100"
              }
            `}
          >
            <Image
              src={page.thumbnail}
              alt={`Page ${page.pageNumber}`}
              width={120}
              height={160}
              className="w-full h-auto block"
              unoptimized
            />

            <div
              className={`
                absolute bottom-2 left-2 text-white text-xs px-2 py-1 font-medium
                transition-all duration-200
                ${
                  isActive
                    ? "bg-red-600 ring-1 ring-red-400"
                    : "bg-black/70 ring-1 ring-gray-500/30"
                }
              `}
            >
              {page.pageNumber + 1}
            </div>

            {/* Active overlay */}
            {isActive && (
              <div className="absolute inset-0 bg-red-500/5 pointer-events-none" />
            )}
          </div>
        );
      })}
    </div>
  );
}
