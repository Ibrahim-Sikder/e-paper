"use client";

import { ChevronLeft, ChevronRight, Download, Share2 } from "lucide-react";
import { useState } from "react";

const PAGES = [
  { id: 1, label: "1" },
  { id: 2, label: "2" },
  { id: 3, label: "3" },
  { id: 4, label: "4" },
  { id: 5, label: "৫" },
  { id: 6, label: "৬" },
];

type ViewMode = "image" | "text" | "fullpage";

export default function NewsTopBar() {
  const [selectedPage, setSelectedPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<ViewMode>("image");

  const goToPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setSelectedPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < PAGES.length) {
      setCurrentPage(currentPage + 1);
      setSelectedPage(currentPage + 1);
    }
  };

  return (
    <div className="container mx-auto bg-gray-100 font-sans">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-300 px-3 py-2 flex items-center gap-2 flex-wrap">
        {/* Edition selector */}
        <div className="flex items-center gap-1 border border-gray-300 rounded px-2 py-1 text-sm bg-white cursor-pointer">
          <span>📰</span>
          <span className="text-gray-700">২য় সংস্করণ</span>
          <ChevronRight className="w-3 h-3 rotate-90 text-gray-500" />
        </div>

        {/* Magazine selector */}
        <div className="flex items-center gap-1 border border-gray-300 rounded px-2 py-1 text-sm bg-white cursor-pointer">
          <span>📚</span>
          <span className="text-gray-700">ম্যাগাজিন</span>
          <ChevronRight className="w-3 h-3 rotate-90 text-gray-500" />
        </div>

        {/* Date */}
        <div className="flex items-center gap-1 border border-gray-300 rounded px-2 py-1 text-sm bg-white">
          <span>📅</span>
          <span className="text-gray-700">০১-০৪-২০২৬</span>
        </div>

        {/* Page navigation */}
        <button
          onClick={goToPrev}
          className="p-1 hover:bg-gray-100 rounded border border-gray-300"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {PAGES.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setCurrentPage(p.id);
              setSelectedPage(p.id);
            }}
            className={`w-7 h-7 text-sm rounded border font-medium transition-all ${
              currentPage === p.id
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {p.label}
          </button>
        ))}

        <button
          onClick={goToNext}
          className="p-1 hover:bg-gray-100 rounded border border-gray-300"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setViewMode("image")}
            className={`px-3 py-1.5 text-sm rounded font-medium transition-all ${
              viewMode === "image"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            ইমেজ ভিউ
          </button>
          <button
            onClick={() => setViewMode("text")}
            className={`px-3 py-1.5 text-sm rounded font-medium transition-all ${
              viewMode === "text"
                ? "bg-teal-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            টেক্সট ভিউ
          </button>
          <button
            onClick={() => setViewMode("fullpage")}
            className={`px-3 py-1.5 text-sm rounded font-medium transition-all ${
              viewMode === "fullpage"
                ? "bg-gray-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            ফুল পেজ ভিউ
          </button>
          <button className="px-3 py-1.5 text-sm rounded font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 flex items-center gap-1">
            <Share2 className="w-3 h-3" /> শেয়ার
          </button>
          <button className="px-3 py-1.5 text-sm rounded font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 flex items-center gap-1">
            <Download className="w-3 h-3" /> ডাউনলোড
          </button>
        </div>
      </div>
    </div>
  );
}
