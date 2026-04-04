// components/e-paper/LeftThumbnailList.jsx
import React from "react";
import Image from "next/image";

export default function LeftThumbnailList({
  pages,
  selectedPage,
  onPageSelect,
}) {
  return (
    <div className="h-screen overflow-y-auto custom-scrollbar pr-2">
      <div className="space-y-3">
        {pages.map((page) => (
          <div
            key={page.id}
            onClick={() => onPageSelect(page)}
            className={`
              relative cursor-pointer transition-all duration-300
              ${
                selectedPage?.id === page.id
                  ? "ring-2 ring-blue-500 ring-offset-2 scale-105"
                  : "hover:scale-102 hover:shadow-lg"
              }
            `}
          >
            <Image
              src={page.thumbnail}
              alt={`Page ${page.pageNumber}`}
              width={150}
              height={200}
              className="w-full h-auto rounded-lg shadow-md"
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
              Page {page.pageNumber}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: thin;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
