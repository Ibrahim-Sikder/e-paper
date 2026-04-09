/* eslint-disable @next/next/no-img-element */
import { EpaperPage } from "@/types/epaper";
import { useEffect, useRef, useState } from "react";

import {
  X,
  Download,
  Copy,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  Check,
} from "lucide-react";

function FullPageImageViewer({
  page,
  onClose,
}: {
  page: EpaperPage;
  onClose: () => void;
}) {
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleZoomReset = () => {
    setZoom(1);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(page.image);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `epaper-page-${page.pageNumber}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      window.open(page.image, "_blank");
    }
  };

  const handleCopyImage = async () => {
    try {
      const imageUrl = page.image;

      await navigator.clipboard.writeText(imageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      console.log("Image URL copied:", imageUrl);
    } catch (error) {
      console.error("Failed to copy:", error);
      const textarea = document.createElement("textarea");
      textarea.value = page.image;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black/95 flex flex-col"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 bg-black/50 backdrop-blur-sm border-b border-white/10">
        <div className="text-white">
          <h3 className="font-medium text-sm">
            পৃষ্ঠা {page.pageNumber} - {page.epaperTitle}
          </h3>
          <p className="text-xs text-gray-400">{page.epaperDate}</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-white/10 rounded-lg">
            <button
              onClick={handleZoomOut}
              className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
              title="জুম আউট"
            >
              <ZoomOut size={18} />
            </button>
            <span className="text-white text-xs min-w-[50px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
              title="জুম ইন"
            >
              <ZoomIn size={18} />
            </button>
            <button
              onClick={handleZoomReset}
              className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
              title="রিসেট জুম"
            >
              <Maximize size={16} />
            </button>
          </div>
          <button
            onClick={handleCopyImage}
            className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors relative group"
            title="ছবির লিংক কপি করুন"
          >
            {copied ? (
              <Check size={18} className="text-green-400" />
            ) : (
              <Copy size={18} />
            )}
            {copied && (
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                লিংক কপি হয়েছে!
              </span>
            )}
          </button>
          <button
            onClick={handleDownload}
            className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
            title="ডাউনলোড করুন"
          >
            <Download size={18} />
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
            title={isFullscreen ? "ফুলস্ক্রিন ছাড়ুন" : "ফুলস্ক্রিন দেখুন"}
          >
            {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>
          <button
            onClick={onClose}
            className="p-2 text-white hover:bg-red-500/50 rounded-lg transition-colors ml-2"
            title="বন্ধ করুন"
          >
            <X size={20} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto flex items-center justify-center p-4">
        <div
          className="transition-transform duration-200 ease-out"
          style={{ transform: `scale(${zoom})` }}
        >
          <img
            ref={imageRef}
            src={page.image}
            alt={`Page ${page.pageNumber}`}
            className="max-w-full h-auto rounded-lg shadow-2xl"
            style={{ maxHeight: "calc(100vh - 80px)" }}
          />
        </div>
      </div>
      <div className="px-4 py-2 bg-black/50 backdrop-blur-sm border-t border-white/10 text-center">
        <p className="text-xs text-gray-400">
          📄 পৃষ্ঠা {page.pageNumber} / {page.epaperTitle} • {page.epaperDate}
        </p>
      </div>
      <div className="absolute bottom-4 right-4 text-xs text-gray-500 bg-black/50 px-2 py-1 rounded">
        ESC কী প্রেস করে বন্ধ করুন
      </div>
    </div>
  );
}
export default FullPageImageViewer;
