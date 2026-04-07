// components/ui/home/NewsTopBar.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
  X,
  Copy,
  Printer,
  ChevronDown,
  Calendar as CalendarIcon,
  Newspaper,
} from "lucide-react";
import { EpaperPage } from "@/hooks/useEpaperData";
import { FacebookIcon, LinkedInIcon, TwitterIcon, WhatsAppIcon } from "../Icon";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Props } from "@/types/epaper";

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
}: Props) {
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [editionOpen, setEditionOpen] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);
  const editionRef = useRef<HTMLDivElement>(null);

  const totalPages = pages.length;
  const currentPageNumber = activeIndex + 1;

  const editions =
    availableEditions.length > 0
      ? availableEditions
      : [
          ...new Set(
            pages.map((page) => page.edition).filter(Boolean) as string[],
          ),
        ];

  const displayEdition = currentEdition || activePage?.edition || "সংস্করণ";

  const selectedDate = currentDate
    ? new Date(currentDate + "T00:00:00")
    : undefined;

  const isDateAvailable = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return availableDates.includes(dateStr);
  };

  // Check if date is future (greater than today)
  const isFutureDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date > today;
  };

  // Check if date should be disabled (future dates)
  const isDateDisabled = (date: Date) => {
    return isFutureDate(date);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date && onDateChange && !isFutureDate(date)) {
      onDateChange(format(date, "yyyy-MM-dd"));
    }
  };

  const handleEditionSelect = (edition: string) => {
    if (onEditionChange) onEditionChange(edition);
    setEditionOpen(false);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(e.target as Node))
        setShareOpen(false);
      if (editionRef.current && !editionRef.current.contains(e.target as Node))
        setEditionOpen(false);
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

  const handleCopy = () => {
    const url = window.location.href;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
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

  const handlePrint = () => {
    if (!activePage?.image) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html>
        <head><title>ই-পেপার — পৃষ্ঠা ${activePage.pageNumber}</title>
        <style>* { margin:0;padding:0;box-sizing:border-box; } body { display:flex;justify-content:center;background:#fff; } img { max-width:100%;height:auto; } @media print { body { margin:0; } }</style>
        </head>
        <body><img src="${activePage.image}" onload="window.print();window.close();" /></body>
      </html>
    `);
    win.document.close();
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = activePage?.epaperTitle || "ই-পেপার";
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(shareTitle);

  const socialLinks = [
    {
      name: "Facebook",
      icon: <FacebookIcon />,
      bg: "#1877F2",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "Twitter",
      icon: <TwitterIcon />,
      bg: "#000000",
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    },
    {
      name: "LinkedIn",
      icon: <LinkedInIcon />,
      bg: "#0A66C2",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: "WhatsApp",
      icon: <WhatsAppIcon />,
      bg: "#25D366",
      url: `https://wa.me/?text=${encodeURIComponent(shareTitle + " " + shareUrl)}`,
    },
  ];

  const handleSocialShare = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=500");
  };

  // Reusable pill style
  const pill =
    "inline-flex items-center gap-1.5 px-3 py-[7px] rounded-sm border border-gray-200 bg-white text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-300 active:scale-95 transition-all select-none cursor-pointer whitespace-nowrap";

  return (
    <div className="bg-white border-b border-gray-100 shadow-[0_2px_12px_0_rgba(0,0,0,0.07)] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center gap-2">
        <div className="relative flex-shrink-0" ref={editionRef}>
          <button onClick={() => setEditionOpen(!editionOpen)} className={pill}>
            <Newspaper className="w-3.5 h-3.5 text-gray-500" />
            <span>{displayEdition}</span>
            <ChevronDown
              className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${editionOpen ? "rotate-180" : ""}`}
            />
          </button>

          {editionOpen && editions.length > 0 && (
            <div className="absolute left-0 top-full mt-2 bg-white rounded- shadow-2xl border border-gray-100 py-1.5 z-[9999] min-w-[160px]">
              {editions.map((edition) => (
                <button
                  key={edition}
                  onClick={() => handleEditionSelect(edition)}
                  className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                    displayEdition === edition
                      ? "bg-[#1A73E8] text-white font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {edition}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Date Picker pill with future dates disabled ───────────────────────────── */}
        <Popover>
          <PopoverTrigger asChild>
            <button className={`${pill} flex-shrink-0`}>
              <CalendarIcon className="w-3.5 h-3.5 text-gray-500" />
              <span>
                {currentDate
                  ? format(new Date(currentDate + "T00:00:00"), "dd-MM-yyyy")
                  : "তারিখ নির্বাচন"}
              </span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0 z-[9999] rounded-md shadow-2xl border border-gray-100 overflow-hidden"
            align="start"
          >
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="rounded-2xl"
              modifiers={{
                available: (date) => isDateAvailable(date),
                future: (date) => isFutureDate(date),
              }}
              modifiersClassNames={{
                available: "bg-green-100 text-green-700 font-medium rounded-sm",
                future:
                  "bg-gray-100 text-gray-400 line-through cursor-not-allowed opacity-50",
              }}
              disabled={(date) => isDateDisabled(date)}
              initialFocus
            />
            <div className="px-4 py-2.5 border-t border-gray-100 flex items-center justify-center gap-4 text-[11px]">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-[#1A73E8] rounded-sm" />
                <span className="text-gray-500">নির্বাচিত</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-green-100 border border-green-300 rounded-full" />
                <span className="text-gray-500">উপলব্ধ</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-gray-100 border border-gray-200 rounded-full" />
                <span className="text-gray-400">ভবিষ্যৎ</span>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* ── Thin separator ────────────────────────────────────────────── */}
        <div className="h-5 w-px bg-gray-200 flex-shrink-0" />

        {/* ── Prev arrow pill ───────────────────────────────────────────── */}
        <button
          onClick={goToPrev}
          disabled={currentPageNumber <= 1}
          className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-sm border border-gray-200 bg-white shadow-sm hover:bg-gray-50 hover:border-gray-300 disabled:opacity-35 disabled:cursor-not-allowed active:scale-95 transition-all"
        >
          <ChevronLeft className="w-3.5 h-3.5 text-gray-600" />
        </button>

        {/* ── Page number pills ─────────────────────────────────────────── */}
        <div className="flex items-center gap-1 flex-wrap">
          {pages.map((_, index) => (
            <button
              key={`pg-${index}`}
              onClick={() => onPageChange(index + 1)}
              className={`w-7 h-7 text-xs rounded-sm border font-medium transition-all active:scale-95 shadow-sm ${
                activeIndex === index
                  ? "bg-[#1A73E8] text-white border-[#1A73E8]"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-blue-50 hover:border-blue-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* ── Next arrow pill ───────────────────────────────────────────── */}
        <button
          onClick={goToNext}
          disabled={currentPageNumber >= totalPages}
          className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-sm border border-gray-200 bg-white shadow-sm hover:bg-gray-50 hover:border-gray-300 disabled:opacity-35 disabled:cursor-not-allowed active:scale-95 transition-all"
        >
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
        </button>

        {/* ── Right actions ─────────────────────────────────────────────── */}
        <div className="ml-auto flex items-center gap-1.5 flex-shrink-0">
          {/* View mode — joined pill group */}
          <div className="flex items-center rounded-sm border border-gray-200 bg-white shadow-sm overflow-hidden">
            {[
              { mode: "image" as const, label: "ইমেজ ভিউ" },
              { mode: "text" as const, label: "টেক্সট ভিউ" },
              { mode: "fullpage" as const, label: "ফুল পেজ ভিউ" },
            ].map(({ mode, label }, i, arr) => (
              <button
                key={mode}
                onClick={() => onViewModeChange(mode)}
                className={`px-5 py-[7px] text-xs font-medium transition-all whitespace-nowrap
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

          {/* Share pill */}
          <div className="relative" ref={shareRef}>
            <button
              onClick={() => setShareOpen((v) => !v)}
              className={`inline-flex items-center gap-1.5 px-5 py-[7px] rounded-sm border text-xs font-medium transition-all shadow-sm whitespace-nowrap active:scale-95 ${
                shareOpen
                  ? "bg-[#1A73E8] text-white border-[#1A73E8]   "
                  : "bg-white text-gray-600 border-gray-200 hover:bg-blue-50 hover:border-blue-200"
              }`}
            >
              <Share2 className="w-3.5 h-3.5" />
              শেয়ার
            </button>

            {shareOpen && (
              <div
                className="absolute right-0 top-full mt-2 bg-white rounded-sm shadow-2xl border border-gray-100 py-4 px-5 z-[9999] w-[220px]"
                onMouseDown={(e) => e.stopPropagation()}
              >
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

                <div className="grid grid-cols-4 gap-2 mb-2">
                  {socialLinks.map((s) => (
                    <button
                      key={s.name}
                      title={s.name}
                      onClick={() => {
                        handleSocialShare(s.url);
                        setShareOpen(false);
                      }}
                      className="rounded-xl p-2.5 flex items-center justify-center text-white hover:opacity-85 active:scale-95 transition-all"
                      style={{ backgroundColor: s.bg }}
                    >
                      {s.icon}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {socialLinks.map((s) => (
                    <span
                      key={s.name + "-label"}
                      className="text-[9px] text-center text-gray-400"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-3 space-y-1.5">
                  <button
                    onClick={handleCopy}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <Copy size={14} className="text-gray-500" />
                    <span className="text-gray-700">
                      {copied ? "✅ কপি হয়েছে!" : "লিংক কপি করুন"}
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      handlePrint();
                      setShareOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <Printer size={14} className="text-gray-500" />
                    <span className="text-gray-700">প্রিন্ট করুন</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-4 py-[7px] rounded-sm border border-gray-200 bg-white text-xs font-medium text-gray-600 shadow-sm hover:bg-blue-50 hover:border-blue-200 active:scale-95 transition-all whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            ডাউনলোড
          </button>
        </div>
      </div>
    </div>
  );
}
