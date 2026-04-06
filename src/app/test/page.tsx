/* eslint-disable @typescript-eslint/no-explicit-any */
// app/test/page.tsx (একটা টেস্ট পেজ বানাও)
"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import page1Original from "@/assets/epaper/original/epaper.jpg";

export default function TestPage() {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Find Your Image Actual Size</h1>

      <div className="bg-yellow-100 p-4 rounded mb-4">
        <p className="font-bold">Instructions:</p>
        <p>1. এই পেজটা রান করো</p>
        <p>2. নিচের ইমেজ লোড হওয়ার পর নিচের বক্সে সাইজ দেখাবে</p>
        <p>3. সেই সাইজ নোট করে রাখো</p>
      </div>

      <Image
        ref={imageRef as any}
        src={page1Original}
        alt="Find size"
        className="border-2 border-red-500"
        onLoad={() => {
          if (imageRef.current) {
            setImageSize({
              width: imageRef.current.naturalWidth,
              height: imageRef.current.naturalHeight,
            });
          }
        }}
      />

      {imageSize.width > 0 && (
        <div className="mt-4 p-4 bg-green-100 rounded-lg border-2 border-green-500">
          <h2 className="text-xl font-bold text-green-800">
            ✅ Your Image Actual Size:
          </h2>
          <p className="text-2xl font-mono mt-2">
            Width: {imageSize.width}px | Height: {imageSize.height}px
          </p>
          <p className="text-sm text-gray-600 mt-2">
            এই ভ্যালুগুলো ORIGINAL_WIDTH এবং ORIGINAL_HEIGHT এ বসাও!
          </p>
        </div>
      )}
    </div>
  );
}
