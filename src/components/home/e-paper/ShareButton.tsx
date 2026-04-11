/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useRef, useEffect } from "react";
import { Share2, Copy, Printer } from "lucide-react";
import {
  FacebookIcon,
  LinkedInIcon,
  TwitterIcon,
  WhatsAppIcon,
} from "@/components/ui/Icon";
import { ShareButtonProps } from "@/types/epaper";

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
  const shareImage = activePage?.image || "";
  const shareDescription = `${shareTitle} - পৃষ্ঠা ${activePage?.pageNumber || 1} | ${activePage?.epaperDate || ""}`;

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

  // Facebook share with image
  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=500");
  };

  // Twitter/X share with image (Twitter will fetch OG meta tags)
  const shareOnTwitter = () => {
    const text = `${shareTitle} - পৃষ্ঠা ${activePage?.pageNumber || 1}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=500");
  };

  // LinkedIn share
  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=500");
  };

  // WhatsApp share with image preview
  const shareOnWhatsApp = () => {
    const text = `${shareTitle}\nপৃষ্ঠা: ${activePage?.pageNumber || 1}\nতারিখ: ${activePage?.epaperDate || ""}\n\n${shareUrl}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=500");
  };

  const allButtons = [
    {
      id: "facebook",
      icon: <FacebookIcon />,
      bg: "#1877F2",
      isSocial: true,
      onClick: shareOnFacebook,
    },
    {
      id: "twitter",
      icon: <TwitterIcon />,
      bg: "#000000",
      isSocial: true,
      onClick: shareOnTwitter,
    },
    {
      id: "linkedin",
      icon: <LinkedInIcon />,
      bg: "#0A66C2",
      isSocial: true,
      onClick: shareOnLinkedIn,
    },
    {
      id: "whatsapp",
      icon: <WhatsAppIcon />,
      bg: "#25D366",
      isSocial: true,
      onClick: shareOnWhatsApp,
    },
    {
      id: "copy",
      icon: <Copy size={16} />,
      bg: "#6B7280",
      isSocial: false,
      onClick: handleCopy,
    },
    {
      id: "print",
      icon: <Printer size={16} />,
      bg: "#4B5563",
      isSocial: false,
      onClick: () => {
        handlePrint();
        setShareOpen(false);
      },
    },
  ];

  return (
    <div className="relative" ref={shareRef}>
      <button
        onClick={() => setShareOpen((v) => !v)}
        className={`inline-flex items-center gap-1.5 px-5 py-[5px] border text-sm font-semibold transition-all shadow-sm whitespace-nowrap active:scale-95 ${
          shareOpen
            ? "bg-[#1A73E8] text-white border-[#1A73E8]"
            : "bg-white text-gray-600 border-gray-200 hover:bg-blue-50 hover:border-blue-200"
        }`}
      >
        <Share2 className="w-3 h-3" />
        শেয়ার
      </button>

      {shareOpen && (
        <div
          className="absolute -right-24 top-full mt-2 bg-white rounded-sm shadow-2xl border border-gray-100 py-2 px-4 z-[9999] w-[300px]"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="flex gap-x-4 justify-between items-center">
            {allButtons.map((btn) => (
              <button
                key={btn.id}
                onClick={() => {
                  btn.onClick();
                  if (!btn.isSocial) {
                    if (btn.id === "print") setShareOpen(false);
                  }
                }}
                className="flex flex-col items-center justify-center gap-2 p-2 rounded-full transition-all active:scale-95 hover:opacity-90 hover:scale-105"
                style={{ backgroundColor: btn.bg }}
              >
                <span className="text-white flex items-center justify-center w-4 h-4">
                  {btn.icon}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
