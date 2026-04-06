/* eslint-disable @typescript-eslint/no-explicit-any */

// এই কম্পোনেন্ট দিয়ে আসল সাইজ জেনে নাও
"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import page1Original from "@/assets/epaper/original/page11.webp";

export default function ImageSizeChecker() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  const checkSize = () => {
    if (imageRef.current) {
      setSize({
        width: imageRef.current.naturalWidth,
        height: imageRef.current.naturalHeight,
      });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Check Original Image Size</h2>
      <Image
        ref={imageRef as any}
        src={page1Original}
        alt="Check size"
        onLoad={checkSize}
        className="border-2 border-gray-300"
      />
      {size.width > 0 && (
        <div className="mt-4 p-3 bg-green-100 rounded">
          <p className="font-bold">Your Image Actual Size:</p>
          <p>Width: {size.width}px</p>
          <p>Height: {size.height}px</p>
          <p className="text-sm text-gray-600 mt-2">
            Use these values for ORIGINAL_WIDTH and ORIGINAL_HEIGHT
          </p>
        </div>
      )}
    </div>
  );
}
