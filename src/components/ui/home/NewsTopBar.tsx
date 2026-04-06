// components/ui/home/NewsTopBar.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
  X,
  Copy,
  Printer,
} from "lucide-react";
import { EpaperPage } from "@/hooks/useEpaperData";

interface Props {
  pages: EpaperPage[];
  activeIndex: number;
  viewMode: "image" | "text" | "fullpage";
  activePage: EpaperPage | null;
  onPageChange: (pageNumber: number) => void;
  onViewModeChange: (mode: "image" | "text" | "fullpage") => void;
}

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);
const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.117 1.534 5.845L.057 23.428a.5.5 0 00.614.614l5.583-1.477A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.96 0-3.807-.535-5.39-1.467l-.385-.23-3.994 1.056 1.056-3.994-.23-.385A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
  </svg>
);

export default function NewsTopBar({
  pages,
  activeIndex,
  viewMode,
  activePage,
  onPageChange,
  onViewModeChange,
}: Props) {
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);

  const totalPages = pages.length;
  const currentPageNumber = activeIndex + 1;

  // outside click → close share dropdown
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) {
        setShareOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const goToPrev = () => {
    if (currentPageNumber > 1) onPageChange(currentPageNumber - 1);
  };
  const goToNext = () => {
    if (currentPageNumber < totalPages) onPageChange(currentPageNumber + 1);
  };

  // ── Download ────────────────────────────────────────────
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

  // ── Copy link ────────────────────────────────────────────
  const handleCopy = () => {
    const url = window.location.href;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      // fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // ── Print ────────────────────────────────────────────────
  const handlePrint = () => {
    if (!activePage?.image) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html>
        <head>
          <title>ই-পেপার — পৃষ্ঠা ${activePage.pageNumber}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { display: flex; justify-content: center; align-items: flex-start; background: #fff; }
            img { max-width: 100%; height: auto; display: block; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <img src="${activePage.image}" onload="window.print(); window.close();" />
        </body>
      </html>
    `);
    win.document.close();
  };

  // ── Share URLs ───────────────────────────────────────────
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = activePage?.epaperTitle || "ই-পেপার";
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(shareTitle);

  const socialLinks = [
    {
      name: "Facebook",
      icon: <FacebookIcon />,
      bg: "#1877F2",
      hover: "#166fe5",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "Twitter / X",
      icon: <TwitterIcon />,
      bg: "#000000",
      hover: "#333333",
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    },
    {
      name: "LinkedIn",
      icon: <LinkedInIcon />,
      bg: "#0A66C2",
      hover: "#095ba9",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: "WhatsApp",
      icon: <WhatsAppIcon />,
      bg: "#25D366",
      hover: "#1ebe57",
      url: `https://wa.me/?text=${encodeURIComponent(shareTitle + " " + shareUrl)}`,
    },
  ];

  const handleSocialShare = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=500");
  };

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-3 py-1.5 flex items-center gap-1.5 flex-wrap">
        {/* Edition */}
        <div className="flex items-center gap-1 border border-gray-300 rounded px-2 py-1 text-xs bg-white cursor-pointer hover:bg-gray-50 transition-all select-none">
          <span className="text-gray-500">🔒</span>
          <span className="text-gray-700 font-medium">
            {activePage?.edition || "২য় সংস্করণ"}
          </span>
          <ChevronRight className="w-3 h-3 rotate-90 text-gray-400" />
        </div>

        {/* Magazine */}
        <div className="flex items-center gap-1 border border-gray-300 rounded px-2 py-1 text-xs bg-white cursor-pointer hover:bg-gray-50 transition-all select-none">
          <span className="text-gray-500">📋</span>
          <span className="text-gray-700 font-medium">ম্যাগাজিন</span>
          <ChevronRight className="w-3 h-3 rotate-90 text-gray-400" />
        </div>

        {/* Date */}
        {activePage?.epaperDate && (
          <div className="flex items-center gap-1 border border-gray-200 rounded px-2 py-1 text-xs bg-gray-50 select-none">
            <span>📅</span>
            <span className="text-gray-700 font-medium">
              {activePage.epaperDate}
            </span>
          </div>
        )}

        {/* Prev */}
        <button
          onClick={goToPrev}
          disabled={currentPageNumber <= 1}
          className="p-1 hover:bg-gray-100 rounded border border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-3.5 h-3.5 text-gray-600" />
        </button>

        {/* Page serial buttons */}
        <div className="flex items-center gap-0.5 flex-wrap">
          {pages.map((_, index) => (
            <button
              key={`pg-${index}`}
              onClick={() => onPageChange(index + 1)}
              className={`min-w-[24px] h-6 px-1 text-xs rounded border font-medium transition-all ${
                activeIndex === index
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-blue-50 hover:border-blue-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Next */}
        <button
          onClick={goToNext}
          disabled={currentPageNumber >= totalPages}
          className="p-1 hover:bg-gray-100 rounded border border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
        </button>

        {/* Right group: view modes + share + download */}
        <div className="ml-auto flex items-center divide-x divide-gray-200 rounded border border-gray-200 overflow-visible">
          {/* Image View */}
          <button
            onClick={() => onViewModeChange("image")}
            className={`px-3 py-1.5 text-xs font-medium transition-all ${
              viewMode === "image"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-blue-50"
            }`}
          >
            ইমেজ ভিউ
          </button>

          {/* Text View */}
          <button
            onClick={() => onViewModeChange("text")}
            className={`px-3 py-1.5 text-xs font-medium transition-all ${
              viewMode === "text"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-blue-50"
            }`}
          >
            টেক্সট ভিউ
          </button>

          {/* Full Page */}
          <button
            onClick={() => onViewModeChange("fullpage")}
            className={`px-3 py-1.5 text-xs font-medium transition-all ${
              viewMode === "fullpage"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-blue-50"
            }`}
          >
            ফুল পেজ ভিউ
          </button>

          {/* ── Share button + dropdown ── */}
          <div className="relative" ref={shareRef}>
            <button
              onClick={() => setShareOpen((v) => !v)}
              className={`px-3 py-1.5 text-xs font-medium transition-all flex items-center gap-1.5 ${
                shareOpen
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-blue-50"
              }`}
            >
              <Share2 className="w-3.5 h-3.5" />
              শেয়ার
            </button>

            {/* Dropdown — z-[9999] so it floats above everything */}
            {shareOpen && (
              <div
                className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-[9999]"
                style={{ width: "220px" }}
                // stop clicks inside from bubbling to document handler
                onMouseDown={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-semibold text-gray-800">
                    শেয়ার করুন
                  </span>
                  <button
                    onClick={() => setShareOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={15} />
                  </button>
                </div>

                {/* Social grid */}
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {socialLinks.map((s) => (
                    <button
                      key={s.name}
                      title={s.name}
                      onClick={() => {
                        handleSocialShare(s.url);
                        setShareOpen(false);
                      }}
                      className="rounded-lg p-2.5 flex items-center justify-center text-white transition-opacity hover:opacity-90 active:opacity-75"
                      style={{ backgroundColor: s.bg }}
                    >
                      {s.icon}
                    </button>
                  ))}
                </div>

                {/* Social labels */}
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {socialLinks.map((s) => (
                    <span
                      key={s.name + "-label"}
                      className="text-[9px] text-center text-gray-500 leading-tight"
                    >
                      {s.name === "Twitter / X" ? "Twitter" : s.name}
                    </span>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-3 space-y-1.5">
                  {/* Copy link */}
                  <button
                    onClick={handleCopy}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <Copy size={14} className="text-gray-500 flex-shrink-0" />
                    <span className="text-gray-700">
                      {copied ? "✅ কপি হয়েছে!" : "লিংক কপি করুন"}
                    </span>
                  </button>

                  {/* Print */}
                  <button
                    onClick={() => {
                      handlePrint();
                      setShareOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <Printer
                      size={14}
                      className="text-gray-500 flex-shrink-0"
                    />
                    <span className="text-gray-700">প্রিন্ট করুন</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Download */}
          <button
            onClick={handleDownload}
            className="px-3 py-1.5 text-xs font-medium bg-white text-gray-600 hover:bg-blue-50 transition-all flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            ডাউনলোড
          </button>
        </div>
      </div>
    </div>
  );
}
