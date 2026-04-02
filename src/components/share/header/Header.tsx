"use client";

import {
  Archive,
  Home,
  Languages,
  Menu,
  Newspaper,
  Search,
  ThumbsUp,
} from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const topNavLinks = [
    {
      label: "অনলাইন",
      icon: (
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-600 text-white text-[10px] font-bold">
          ক
        </span>
      ),
      href: "#",
      highlight: true,
    },
    {
      label: "আজকের পত্রিকা",
      icon: <Newspaper size={15} className="text-gray-600" />,
      href: "#",
    },
    {
      label: "আর্কাইভ",
      icon: <Archive size={15} className="text-gray-600" />,
      href: "#",
    },
    {
      label: "সোশ্যাল মিডিয়া",
      icon: <ThumbsUp size={15} className="text-gray-600" />,
      href: "#",
    },
    {
      label: "বাংলা কনভার্টার",
      icon: <Languages size={15} className="text-gray-600" />,
      href: "#",
    },
  ];

  const mainNavLinks = [
    { label: "সর্বশেষ", href: "#" },
    { label: "জাতীয়", href: "#" },
    { label: "রাজনীতি", href: "#" },
    { label: "সারাদেশ", href: "#" },
    { label: "বিশ্ব", href: "#" },
    { label: "বিনোদন", href: "#" },
    { label: "খেলা", href: "#" },
    { label: "বাণিজ্য", href: "#" },
    { label: "চাকরি", href: "#" },
    { label: "মতামত", href: "#" },
    { label: "ভিডিও", href: "#" },
  ];

  return (
    <header className="w-full font-sans border-b border-gray-200 bg-white">
      {/* Top Bar */}
      <div className="border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between h-[70px]">
          {/* Logo */}
          <a href="#" className="flex items-center shrink-0">
            <div className="flex flex-col leading-none select-none">
              <div className="flex items-center">
                <span
                  className="text-[36px] font-extrabold tracking-tight"
                  style={{
                    color: "#111",
                    lineHeight: 1,
                  }}
                >
                  ডেইলি
                </span>
                <span className="relative mx-0.5">
                  <span
                    className="text-[36px] font-extrabold"
                    style={{ color: "#111", lineHeight: 1 }}
                  >
                    টা
                  </span>
                  {/* Circle accent like the original */}
                  <span
                    className="absolute"
                    style={{
                      width: "28px",
                      height: "28px",
                      border: "3px solid #dc2626",
                      borderRadius: "50%",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      pointerEvents: "none",
                    }}
                  />
                </span>
                <span
                  className="text-[36px] font-extrabold tracking-tight"
                  style={{
                    color: "#111",
                    lineHeight: 1,
                  }}
                >
                  ইমস
                </span>
              </div>
            </div>
          </a>

          {/* Top Navigation Links */}
          <nav className="hidden font-semibold md:flex items-center gap-5">
            {topNavLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className={`flex items-center gap-1.5  whitespace-nowrap transition-colors hover:text-red-600 ${
                  link.highlight
                    ? "text-red-600 font-semibold"
                    : "text-gray-700"
                }`}
              >
                {link.icon}
                {link.label}
              </a>
            ))}
          </nav>

          {/* Search Icon */}
          <button
            className="ml-4 text-gray-700 hover:text-red-600 transition-colors"
            aria-label="Search"
          >
            <Search size={20} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Bottom Main Nav Bar */}
      <div className="bg-white font-bold ">
        <div className="max-w-5xl mx-auto px-4 flex items-center h-[44px]">
          {/* Home Icon */}
          <a
            href="#"
            className="mr-5 text-gray-700 hover:text-red-600 transition-colors"
            aria-label="Home"
          >
            <Home size={18} strokeWidth={2} />
          </a>

          {/* Divider */}
          <div className="font-bold h-5 w-px bg-gray-300 mr-5" />

          {/* Main Nav Links */}
          <nav className="font-bold flex items-center gap-x-5 flex-1 overflow-x-auto scrollbar-none">
            {mainNavLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className=" font-bold text-gray-800 hover:text-red-600 whitespace-nowrap px-3 py-1 transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-red-600 group-hover:w-full transition-all duration-200" />
              </a>
            ))}
          </nav>

          {/* Hamburger Menu */}
          <button
            className="ml-4 text-gray-700 hover:text-red-600 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="More menu"
          >
            <Menu size={20} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown (optional) */}
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
            {mainNavLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-[14px] text-gray-800 hover:text-red-600 py-1"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Google Fonts for Bengali */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;500;600;700&family=Noto+Serif+Bengali:wght@700;800;900&display=swap');
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </header>
  );
}
