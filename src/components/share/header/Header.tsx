/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { Home, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  categorySlugMap,
  mainNavLinks as staticMainNavLinks,
  mediaLinks,
  megaMenuColumns as staticMegaMenuColumns,
  topNavLinks,
} from "./Menu";
import TopBar from "./TopBar";
import { useCategoryData } from "@/hooks/useCategoryData";
import Link from "next/link";

import "./header.css";
import { sortByDate } from "@/utils/sort";
import { todayBn } from "@/constant/today";
const STICKY_THRESHOLD = 100;

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [stickyHeight, setStickyHeight] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { categoryData } = useCategoryData({});
  const sortCategoryData = sortByDate(categoryData, "updatedAt");

  const dynamicMainNavLinks = sortCategoryData.map((cat: any) => cat.name);
  const mainNavLinks =
    dynamicMainNavLinks.length > 0 ? dynamicMainNavLinks : staticMainNavLinks;

  const generateDynamicMegaMenuColumns = () => {
    if (sortCategoryData.length === 0) return staticMegaMenuColumns;
    const columns: string[][] = [[], [], [], [], [], [], []];
    sortCategoryData.forEach((cat: any, index: number) => {
      columns[index % 7].push(cat.name);
    });
    return columns.filter((col) => col.length > 0);
  };

  const dynamicMegaMenuColumns = generateDynamicMegaMenuColumns();

  const dynamicCategorySlugMap: Record<string, string> = {};
  sortCategoryData.forEach((cat: any) => {
    dynamicCategorySlugMap[cat.name] = cat.slug;
  });

  const mergedCategorySlugMap = {
    ...categorySlugMap,
    ...dynamicCategorySlugMap,
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > STICKY_THRESHOLD);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (headerRef.current) {
      setStickyHeight(headerRef.current.offsetHeight);
    }
  }, [isSticky]);

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor && isSticky) {
        e.preventDefault();
        const hash = anchor.getAttribute("href");
        if (hash && hash !== "#") {
          const element = document.querySelector(hash);
          if (element) {
            const offsetPosition =
              element.getBoundingClientRect().top +
              window.scrollY -
              stickyHeight;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
          }
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, [isSticky, stickyHeight]);

  // Mega menu outside click close
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Desktop resize এ mobile menu close
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mobile menu body scroll lock
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (label: string) => {
    const slug = mergedCategorySlugMap[label] || label.toLowerCase();
    router.push(`/${slug}`);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`w-full font-sans border-b border-gray-200 bg-white transition-all duration-300 ${
          isSticky
            ? "fixed top-0 left-0 right-0 z-[10000] shadow-lg animate-slideDown"
            : "relative shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]"
        }`}
      >
        {!isSticky && <TopBar />}

        <div className="bg-white font-bold">
          <div className="max-w-6xl mx-auto px-4 flex items-center h-[60px]">
            <button
              className="md:hidden text-gray-700 hover:text-red-600 transition-colors mr-3 flex-shrink-0"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X size={22} strokeWidth={2} />
              ) : (
                <Menu size={22} strokeWidth={2} />
              )}
            </button>
            <Link
              href="/"
              className="mr-5 text-gray-700 hover:text-red-600 transition-colors flex-shrink-0"
              aria-label="Home"
            >
              <Home size={18} strokeWidth={2} />
            </Link>

            <div className="hidden md:block h-5 w-px bg-gray-300 mr-5 flex-shrink-0" />

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-x-4 flex-1 overflow-x-auto scrollbar-none">
              {mainNavLinks.slice(0, 9).map((label: string, i: number) => {
                const slug =
                  mergedCategorySlugMap[label] || label.toLowerCase();
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
            <div className="flex-1 md:hidden" />

            {/* Mega menu */}
            <div className="relative ml-4 flex-shrink-0" ref={megaRef}>
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
                  style={{ width: "min(1200px, 95vw)" }}
                >
                  <div className="px-5 py-2 border-b border-gray-100 text-[12px] text-gray-500 font-normal">
                    {todayBn}
                  </div>

                  <div className="px-5 py-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-x-5 gap-y-3 border-b border-gray-100">
                    {(dynamicMegaMenuColumns.length > 0
                      ? dynamicMegaMenuColumns
                      : staticMegaMenuColumns
                    ).map((col, ci) => (
                      <div key={ci} className="flex flex-col gap-y-2">
                        {col.map((label) => {
                          const slug =
                            mergedCategorySlugMap[label] || label.toLowerCase();
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
                              className={`text-[15px] whitespace-nowrap transition-colors hover:text-red-600 ${
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

                  <div className="px-5 py-3 flex flex-wrap items-center gap-4">
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

        {/* Mobile slide-down menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white shadow-md max-h-[80vh] overflow-y-auto">
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
              {mainNavLinks.map((label: string, i: number) => {
                const slug =
                  mergedCategorySlugMap[label] || label.toLowerCase();
                return (
                  <a
                    key={i}
                    href={`/${slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                      router.push(`/${slug}`);
                    }}
                    className="text-[14px] text-gray-800 hover:text-red-600 py-1 font-semibold border-b border-gray-100 last:border-0"
                  >
                    {label}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {isSticky && <div style={{ height: `${stickyHeight}px` }} />}
    </>
  );
}
