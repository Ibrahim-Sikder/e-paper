/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React from "react";

export default function ScrollableImageList({
  data,
  className = "",
}: {
  data: any[];
  className?: string;
}) {
  return (
    <div className={`h-screen overflow-y-auto custom-scrollbar ${className}`}>
      <div className="space-y-4">
        {data.map((item: any) => (
          <div key={item.id} className="relative w-full group">
            <Image
              src={item.image}
              alt={item.alt}
              className="w-full h-auto cursor-pointer hover:opacity-90 transition-opacity"
              priority={item.id === 1}
              loading={item.id === 1 ? "eager" : "lazy"}
            />
            {/* Overlay with title on hover */}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {item.title}
            </div>
          </div>
        ))}
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #888 #f1f1f1;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
}
