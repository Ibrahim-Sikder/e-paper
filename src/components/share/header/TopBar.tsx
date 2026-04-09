/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { Search } from "lucide-react";
import { topNavLinks } from "./Menu";

export default function TopBar() {
  return (
    <div className="border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between h-[70px]">
        <a href="/" className="flex items-center shrink-0">
          <div className="flex flex-col leading-none select-none">
            <div className="flex items-center">
              <span
                className="text-[36px] font-extrabold tracking-tight"
                style={{ color: "#111", lineHeight: 1 }}
              >
                ডেইলি
              </span>

              <span
                className="text-[36px] font-extrabold tracking-tight"
                style={{ color: "#111", lineHeight: 1 }}
              >
                টাইমস
              </span>
            </div>
          </div>
        </a>

        <nav className="hidden font-semibold md:flex items-center gap-5">
          {topNavLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className={`flex items-center gap-x-4 whitespace-nowrap transition-colors hover:text-red-600 text-[16px] ${
                link.highlight ? "text-red-600 font-semibold" : "text-gray-700"
              }`}
            >
              {link.icon}
              {link.label}
            </a>
          ))}
        </nav>

        <button
          className="ml-4 text-gray-700 hover:text-red-600 transition-colors"
          aria-label="Search"
        >
          <Search size={20} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
