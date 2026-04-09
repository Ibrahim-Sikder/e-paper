/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useRef, useEffect } from "react";
import { Share2, X, Copy, Printer } from "lucide-react";
import {
  FacebookIcon,
  LinkedInIcon,
  TwitterIcon,
  WhatsAppIcon,
} from "@/components/ui/Icon";

interface ShareButtonProps {
  activePage?: any;
}

export function ShareButton({ activePage }: ShareButtonProps) {
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(e.target as Node))
        setShareOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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

  return (
    <div className="relative" ref={shareRef}>
      <button
        onClick={() => setShareOpen((v) => !v)}
        className={`inline-flex items-center gap-1.5 px-5 py-[7px] rounded-sm border text-xs font-medium transition-all shadow-sm whitespace-nowrap active:scale-95 ${
          shareOpen
            ? "bg-[#1A73E8] text-white border-[#1A73E8]"
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
  );
}
