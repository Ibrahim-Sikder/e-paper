/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { Home, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  categorySlugMap,
  mainNavLinks,
  mediaLinks,
  megaMenuColumns,
  topNavLinks,
} from "./Menu";
import TopBar from "./TopBar";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleNavClick = (label: string) => {
    const slug = categorySlugMap[label] || label.toLowerCase();
    router.push(`/${slug}`);
  };

  const todayBn = (() => {
    const days = [
      "রবিবার",
      "সোমবার",
      "মঙ্গলবার",
      "বুধবার",
      "বৃহস্পতিবার",
      "শুক্রবার",
      "শনিবার",
    ];
    const months = [
      "জানুয়ারি",
      "ফেব্রুয়ারি",
      "মার্চ",
      "এপ্রিল",
      "মে",
      "জুন",
      "জুলাই",
      "আগস্ট",
      "সেপ্টেম্বর",
      "অক্টোবর",
      "নভেম্বর",
      "ডিসেম্বর",
    ];
    const now = new Date();
    const tobn = (n: number) =>
      n
        .toString()
        .split("")
        .map((d) => "০১২৩৪৫৬৭৮৯"[+d])
        .join("");
    return `${days[now.getDay()]}, ${tobn(now.getDate())} ${months[now.getMonth()]} ${tobn(now.getFullYear())}`;
  })();

  return (
    <header className="w-full font-sans border-b border-gray-200 bg-white">
      <TopBar />

      <div className="bg-white font-bold">
        <div className="max-w-5xl mx-auto px-4 flex items-center h-[44px]">
          <a
            href="/"
            className="mr-5 text-gray-700 hover:text-red-600 transition-colors"
            aria-label="Home"
          >
            <Home size={18} strokeWidth={2} />
          </a>

          <div className="h-5 w-px bg-gray-300 mr-5" />

          <nav className="flex items-center gap-x-4 flex-1 overflow-x-auto scrollbar-none">
            {mainNavLinks.map((label, i) => {
              const slug = categorySlugMap[label] || label.toLowerCase();
              return (
                <a
                  key={i}
                  href={`/${slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(label);
                  }}
                  className="font-bold text-[16px] text-gray-800 hover:text-red-600 whitespace-nowrap px-3 py-1 transition-colors relative group"
                >
                  {label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-red-600 group-hover:w-full transition-all duration-200" />
                </a>
              );
            })}
          </nav>

          {/* Hamburger */}
          <div className="relative ml-4" ref={megaRef}>
            <button
              className="text-gray-700 hover:text-red-600 transition-colors cursor-pointer"
              onClick={() => setMegaMenuOpen((v) => !v)}
              aria-label="More menu"
            >
              {megaMenuOpen ? (
                <X size={20} strokeWidth={2} />
              ) : (
                <Menu size={20} strokeWidth={2} />
              )}
            </button>

            {megaMenuOpen && (
              <div
                className="absolute right-0 top-full mt-2 z-[9999] bg-white border border-gray-200 shadow-2xl rounded-sm"
                style={{ width: "1200px", maxWidth: "95vw" }}
              >
                <div className="px-5 py-2 border-b border-gray-100 text-[12px] text-gray-500 font-normal">
                  {todayBn}
                </div>

                <div className="px-5 py-4 grid grid-cols-7 gap-x-5 gap-y-0 border-b border-gray-100">
                  {megaMenuColumns.map((col, ci) => (
                    <div key={ci} className="flex flex-col gap-y-2">
                      {col.map((label) => {
                        const slug =
                          categorySlugMap[label] || label.toLowerCase();
                        const isFirst = ci === 0 && label === col[0];
                        return (
                          <a
                            key={label}
                            href={`/${slug}`}
                            onClick={(e) => {
                              e.preventDefault();
                              setMegaMenuOpen(false);
                              router.push(`/${slug}`);
                            }}
                            className={`text-[16px] whitespace-nowrap transition-colors hover:text-red-600 ${
                              isFirst
                                ? "font-bold text-gray-900"
                                : "text-gray-800 font-semibold"
                            }`}
                          >
                            {label}
                          </a>
                        );
                      })}
                    </div>
                  ))}
                </div>
                <div className="px-5 py-3 flex items-center gap-6">
                  {mediaLinks.map((m) => (
                    <a
                      key={m.label}
                      href={`/${m.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setMegaMenuOpen(false);
                        router.push(`/${m.slug}`);
                      }}
                      className="flex items-center gap-2 text-[12px] font-medium hover:opacity-80 transition-opacity whitespace-nowrap"
                      style={{ color: m.color }}
                    >
                      <span
                        className="flex items-center justify-center w-6 h-6 rounded-sm flex-shrink-0"
                        style={{ backgroundColor: m.bg, color: m.color }}
                      >
                        {m.icon}
                      </span>
                      {m.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown  */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white shadow-md">
          <div className="px-4 py-3 flex flex-col gap-2">
            {topNavLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className={`flex items-center gap-2 text-[14px] py-1 ${
                  link.highlight
                    ? "text-red-600 font-semibold"
                    : "text-gray-700"
                }`}
              >
                {link.icon}
                {link.label}
              </a>
            ))}
            <hr className="border-gray-200 my-1" />
            {mainNavLinks.map((label, i) => {
              const slug = categorySlugMap[label] || label.toLowerCase();
              return (
                <a
                  key={i}
                  href={`/${slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    router.push(`/${slug}`);
                  }}
                  className="text-[14px] text-gray-800 hover:text-red-600 py-1"
                >
                  {label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
