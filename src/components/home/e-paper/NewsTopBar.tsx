/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Props } from "@/types/epaper";
import { Download } from "lucide-react";
import { EditionSelector } from "./EditionSelector";
import { DatePicker } from "./DatePicker";
import { Pagination } from "./Pagination";
import { ShareButton } from "./ShareButton";

export default function NewsTopBar({
  pages,
  activeIndex,
  viewMode,
  activePage,
  onPageChange,
  onViewModeChange,
  onDateChange,
  onEditionChange,
  availableDates = [],
  availableEditions = [],
  currentDate,
  currentEdition,
  isLoading = false,
}: Props) {
  const totalPages = pages.length;
  const currentPageNumber = activeIndex + 1;

  const handleDownload = async () => {
    if (!activePage?.image) return;
    try {
      const res = await fetch(activePage.image);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `epaper-page-${activePage.pageNumber}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      window.open(activePage.image, "_blank");
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white border-b border-gray-100 shadow-[0_2px_12px_0_rgba(0,0,0,0.07)] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center gap-2">
          <div className="h-8 w-32 bg-gray-200 animate-pulse rounded" />
          <div className="h-8 w-32 bg-gray-200 animate-pulse rounded" />
          <div className="h-8 w-48 bg-gray-200 animate-pulse rounded ml-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-b border-gray-100 shadow-[0_2px_12px_0_rgba(0,0,0,0.07)] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <EditionSelector
            editions={availableEditions}
            pages={pages}
            currentEdition={currentEdition}
            displayEdition={currentEdition || activePage?.edition || "সংস্করণ"}
            onEditionChange={onEditionChange}
          />

          <DatePicker
            currentDate={currentDate}
            availableDates={availableDates}
            onDateChange={onDateChange}
          />
        </div>
        {pages.length > 0 && (
          <div className="h-5 w-px bg-gray-200 flex-shrink-0" />
        )}
        {pages.length > 0 && (
          <Pagination
            pages={pages}
            activeIndex={activeIndex}
            currentPageNumber={currentPageNumber}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
        <div className="ml-auto flex items-center  flex-shrink-0 flex-wrap">
          <div className="flex items-center rounded- border border-gray-200 bg-white shadow-sm overflow-hidden">
            {[
              { mode: "image" as const, label: "ইমেজ ভিউ" },
              { mode: "text" as const, label: "টেক্সট ভিউ" },
              { mode: "fullpage" as const, label: "ফুল পেজ ভিউ" },
            ].map(({ mode, label }, i, arr) => (
              <button
                key={mode}
                onClick={() => onViewModeChange(mode)}
                className={`px-8 py-[5px] text-sm font-semibold transition-all whitespace-nowrap
                  ${i < arr.length - 1 ? "border-r border-gray-200" : ""}
                  ${
                    viewMode === mode
                      ? "bg-[#1A73E8] text-white"
                      : "text-gray-600 hover:bg-blue-50"
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
          <ShareButton activePage={activePage} />
          {activePage?.image && (
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-5 py-[5px] border border-gray-200 bg-white text-sm font-semibold text-gray-600 shadow-sm hover:bg-blue-50 hover:border-blue-200 active:scale-95 transition-all whitespace-nowrap"
            >
              <Download className="w-3.5 h-4" />
              ডাউনলোড
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
