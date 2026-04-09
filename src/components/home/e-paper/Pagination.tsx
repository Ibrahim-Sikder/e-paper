/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { PaginationProps } from "@/types/epaper";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({
  pages,
  activeIndex,
  currentPageNumber,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const goToPrev = () => {
    if (currentPageNumber > 1) onPageChange(currentPageNumber - 1);
  };

  const goToNext = () => {
    if (currentPageNumber < totalPages) onPageChange(currentPageNumber + 1);
  };

  return (
    <>
      <button
        onClick={goToPrev}
        disabled={currentPageNumber <= 1}
        className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-sm border border-gray-200 bg-white shadow-sm hover:bg-gray-50 hover:border-gray-300 disabled:opacity-35 disabled:cursor-not-allowed active:scale-95 transition-all"
      >
        <ChevronLeft className="w-3.5 h-3.5 text-gray-600" />
      </button>

      <div className="flex items-center gap-1 flex-wrap">
        {pages.map((_, index) => (
          <button
            key={`pg-${index}`}
            onClick={() => onPageChange(index + 1)}
            className={`w-7 h-7 text-sm font-semibold rounded-sm border transition-all active:scale-95 shadow-sm ${
              activeIndex === index
                ? "bg-[#1A73E8] text-white border-[#1A73E8]"
                : "bg-white text-gray-700 border-gray-200 hover:bg-blue-50 hover:border-blue-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <button
        onClick={goToNext}
        disabled={currentPageNumber >= totalPages}
        className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-sm border border-gray-200 bg-white shadow-sm hover:bg-gray-50 hover:border-gray-300 disabled:opacity-35 disabled:cursor-not-allowed active:scale-95 transition-all"
      >
        <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
      </button>
    </>
  );
}
