/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import page1Original from "@/assets/epaper/original/page11.webp";

export default function CropHelper() {
  const [crops, setCrops] = useState<any[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selection, setSelection] = useState({
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
  });
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setIsSelecting(true);
    setSelection({ start: { x, y }, end: { x, y } });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isSelecting || !imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setSelection((prev) => ({ ...prev, end: { x, y } }));
  };

  const handleMouseUp = () => {
    if (!isSelecting) return;
    const startX = Math.min(selection.start.x, selection.end.x);
    const startY = Math.min(selection.start.y, selection.end.y);
    const width = Math.abs(selection.end.x - selection.start.x);
    const height = Math.abs(selection.end.y - selection.start.y);

    const title = prompt("Enter article title:");
    if (title && width > 10 && height > 10) {
      setCrops([...crops, { title, x: startX, y: startY, width, height }]);
    }
    setIsSelecting(false);
  };

  const downloadCrops = () => {
    alert("Check console for coordinates!");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Crop Helper Tool</h1>
      <p className="mb-4">আর্টিকেল এরিয়া সিলেক্ট করে Crop করুন</p>

      <div
        className="relative inline-block border-2 border-gray-300"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Image
          ref={imageRef as any}
          src={page1Original}
          alt="Crop"
          className="cursor-crosshair"
        />

        {crops.map((crop, i) => (
          <div
            key={i}
            className="absolute border-2 border-green-500 bg-green-200 bg-opacity-30"
            style={{
              left: crop.x,
              top: crop.y,
              width: crop.width,
              height: crop.height,
            }}
          >
            <div className="absolute -top-6 left-0 bg-green-600 text-white text-xs px-1 rounded">
              {crop.title}
            </div>
          </div>
        ))}

        {isSelecting && (
          <div
            className="absolute border-2 border-blue-500 bg-blue-200 bg-opacity-30"
            style={{
              left: Math.min(selection.start.x, selection.end.x),
              top: Math.min(selection.start.y, selection.end.y),
              width: Math.abs(selection.end.x - selection.start.x),
              height: Math.abs(selection.end.y - selection.start.y),
            }}
          />
        )}
      </div>

      <div className="mt-4 space-x-2">
        <button
          onClick={downloadCrops}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Get Coordinates
        </button>
        <button
          onClick={() => setCrops([])}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Clear
        </button>
      </div>

      <div className="mt-4 p-3 bg-gray-100 rounded">
        <p className="font-bold">How to use:</p>
        <ol className="text-sm list-decimal pl-5">
          <li>ইমেজে ক্লিক করে ড্র্যাগ করে আর্টিকেল এরিয়া সিলেক্ট করো</li>
          <li>টাইটেল দাও</li>
          <li>Get Coordinates বাটনে ক্লিক করো</li>
          <li>F12 → Console → কো-অর্ডিনেট কপি করো</li>
          <li>একই জায়গা থেকে ইমেজ ক্রপ করে assets/epaper/cropped/ এ রাখো</li>
        </ol>
      </div>
    </div>
  );
}
