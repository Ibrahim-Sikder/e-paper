/* eslint-disable @typescript-eslint/no-explicit-any */
// components/e-paper/LeftThumbnailList.tsx
"use client";
import React from "react";
import Image from "next/image";

interface Page {
  id: number;
  pageNumber: number;
  thumbnail: any;
}

interface Props {
  pages: Page[];
  selectedPage: Page;
  onPageSelect: (page: Page) => void;
}

export default function LeftThumbnailList({
  pages,
  selectedPage,
  onPageSelect,
}: Props) {
  return (
    <div className="h-screen overflow-y-auto pr-2 space-y-3 custom-scrollbar">
      {pages.map((page) => (
        <div
          key={page.id}
          onClick={() => onPageSelect(page)}
          className={`
            relative cursor-pointer transition-all duration-200 rounded-lg overflow-hidden
            ${
              selectedPage?.id === page.id
                ? "ring-2 ring-blue-500 ring-offset-2"
                : "hover:opacity-80"
            }
          `}
        >
          <Image
            src={page.thumbnail}
            alt={`Page ${page.pageNumber}`}
            width={150}
            height={200}
            className="w-full h-auto"
            priority={page.id === 1}
          />
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-0.5 rounded">
            {page.pageNumber}
          </div>
        </div>
      ))}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #9ca3af;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
