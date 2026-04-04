// app/coordinate-finder/page.tsx
"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import page1Original from "@/assets/epaper/original/page11.webp";

interface Box {
  id: number;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
}

export default function CoordinateFinder() {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [isSelecting, setIsSelecting] = useState(false);
  const [selection, setSelection] = useState<{
    start: { x: number; y: number } | null;
    end: { x: number; y: number } | null;
  }>({
    start: null,
    end: null,
  });
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [imageNaturalSize, setImageNaturalSize] = useState({
    width: 0,
    height: 0,
  });
  const imageRef = useRef<HTMLImageElement>(null);

  // ইমেজ লোড হলে আসল সাইজ স্টোর করো
  const handleImageLoad = () => {
    if (imageRef.current) {
      const naturalWidth = imageRef.current.naturalWidth;
      const naturalHeight = imageRef.current.naturalHeight;
      setImageNaturalSize({ width: naturalWidth, height: naturalHeight });
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("📷 Image Natural Size:", naturalWidth, "x", naturalHeight);
      console.log("✅ Use these values in MiddleSwiperWithOverlay");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    }
  };

  // ডিসপ্লে কো-অর্ডিনেটকে আসল কো-অর্ডিনেটে কনভার্ট
  const getActualCoordinates = (displayX: number, displayY: number) => {
    if (!imageRef.current || imageNaturalSize.width === 0) {
      return { x: displayX, y: displayY };
    }
    const rect = imageRef.current.getBoundingClientRect();
    const scaleX = imageNaturalSize.width / rect.width;
    const scaleY = imageNaturalSize.height / rect.height;
    return {
      x: Math.round(displayX * scaleX),
      y: Math.round(displayY * scaleY),
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const displayX = e.clientX - rect.left;
    const displayY = e.clientY - rect.top;
    const actual = getActualCoordinates(displayX, displayY);
    setCoordinates({ x: actual.x, y: actual.y });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const displayX = e.clientX - rect.left;
    const displayY = e.clientY - rect.top;
    const actual = getActualCoordinates(displayX, displayY);
    setIsSelecting(true);
    setSelection({ start: actual, end: actual });
  };

  const handleMouseMoveSelect = (e: React.MouseEvent) => {
    if (!isSelecting || !imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const displayX = e.clientX - rect.left;
    const displayY = e.clientY - rect.top;
    const actual = getActualCoordinates(displayX, displayY);
    setSelection((prev) => ({ ...prev, end: actual }));
  };

  const handleMouseUp = () => {
    if (!isSelecting || !selection.start || !selection.end) return;

    const startX = Math.min(selection.start.x, selection.end.x);
    const startY = Math.min(selection.start.y, selection.end.y);
    const width = Math.abs(selection.end.x - selection.start.x);
    const height = Math.abs(selection.end.y - selection.start.y);

    if (width > 10 && height > 10) {
      const title = prompt("Enter article title:");
      if (title) {
        const content = prompt("Enter article content:");
        if (content) {
          setBoxes((prev) => [
            ...prev,
            {
              id: Date.now(),
              title,
              x: startX,
              y: startY,
              width: width,
              height: height,
              content,
            },
          ]);
        }
      }
    }
    setIsSelecting(false);
    setSelection({ start: null, end: null });
  };

  const copyCoordinates = () => {
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📋 COPY THESE COORDINATES TO epaperData.ts");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(
      `// Image Size: ${imageNaturalSize.width}x${imageNaturalSize.height}`,
    );
    console.log("");
    console.log("articles: [");

    boxes.forEach((box, idx) => {
      console.log(`  {
    id: "a${idx + 1}",
    title: "${box.title}",
    x: ${box.x},
    y: ${box.y},
    width: ${box.width},
    height: ${box.height},
    content: "${box.content.replace(/"/g, '\\"')}",
    category: "জাতীয়",
  },`);
    });

    console.log("]");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    alert(
      `✅ ${boxes.length} articles copied to console!\n\nPress F12 and copy the coordinates!`,
    );
  };

  const clearAll = () => {
    if (confirm("Are you sure you want to clear all boxes?")) {
      setBoxes([]);
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🎯 Coordinate Finder Tool</h1>

      {/* তথ্য প্যানেল */}
      <div className="bg-blue-50 p-4 rounded-lg mb-4 border border-blue-200">
        <p className="font-bold text-lg">📐 Image Information:</p>
        <p>
          Natural Size:{" "}
          <span className="font-mono font-bold text-green-600 text-xl">
            {imageNaturalSize.width || "Loading..."} x{" "}
            {imageNaturalSize.height || "Loading..."}
          </span>
        </p>
        <p>
          Mouse Position (Actual):{" "}
          <span className="font-mono">
            X={coordinates.x}, Y={coordinates.y}
          </span>
        </p>
        <p className="text-sm text-gray-600 mt-2">
          💡 Tip: ইমেজের যেখানে আর্টিকেল আছে সেখানে ক্লিক করে ড্র্যাগ করুন
        </p>
      </div>

      {/* ইমেজ কন্টেইনার */}
      <div
        className="relative inline-block border-2 border-gray-300 rounded-lg overflow-hidden shadow-lg"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseMoveCapture={handleMouseMoveSelect}
        onMouseUp={handleMouseUp}
      >
        <Image
          ref={imageRef as any}
          src={page1Original}
          alt="Find coordinates"
          className="cursor-crosshair"
          onLoad={handleImageLoad}
          priority
        />

        {/* সেভ করা বক্সগুলো */}
        {boxes.map((box, idx) => {
          if (!imageRef.current || imageNaturalSize.width === 0) return null;
          const rect = imageRef.current.getBoundingClientRect();
          const scaleX = rect.width / imageNaturalSize.width;
          const scaleY = rect.height / imageNaturalSize.height;

          return (
            <div
              key={box.id}
              className="absolute border-2 border-green-500 bg-green-200 bg-opacity-30"
              style={{
                left: box.x * scaleX,
                top: box.y * scaleY,
                width: box.width * scaleX,
                height: box.height * scaleY,
              }}
            >
              <div className="absolute -top-6 left-0 bg-green-600 text-white text-[10px] px-1 rounded whitespace-nowrap">
                #{idx + 1}: {box.title.substring(0, 25)}
              </div>
              <div className="absolute bottom-0 right-0 bg-green-800 text-white text-[8px] px-1 rounded-tl">
                {box.width}x{box.height}
              </div>
            </div>
          );
        })}

        {/* বর্তমান সিলেকশন */}
        {isSelecting &&
          selection.start &&
          selection.end &&
          imageRef.current &&
          imageNaturalSize.width > 0 &&
          (() => {
            const rect = imageRef.current.getBoundingClientRect();
            const scaleX = rect.width / imageNaturalSize.width;
            const scaleY = rect.height / imageNaturalSize.height;
            const startX = Math.min(selection.start.x, selection.end.x);
            const startY = Math.min(selection.start.y, selection.end.y);
            const width = Math.abs(selection.end.x - selection.start.x);
            const height = Math.abs(selection.end.y - selection.start.y);

            return (
              <div
                className="absolute border-2 border-blue-500 bg-blue-200 bg-opacity-30"
                style={{
                  left: startX * scaleX,
                  top: startY * scaleY,
                  width: width * scaleX,
                  height: height * scaleY,
                }}
              >
                <div className="absolute -top-5 left-0 bg-blue-600 text-white text-[8px] px-1 rounded">
                  {width}x{height}
                </div>
              </div>
            );
          })()}
      </div>

      {/* বাটন */}
      <div className="mt-4 space-x-2">
        <button
          onClick={copyCoordinates}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          📋 Copy Coordinates to Console
        </button>
        <button
          onClick={clearAll}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          🗑️ Clear All
        </button>
      </div>

      {/* বক্স লিস্ট */}
      {boxes.length > 0 && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <p className="font-bold">📝 Selected Articles: {boxes.length}</p>
          <div className="max-h-40 overflow-y-auto mt-2">
            {boxes.map((box, idx) => (
              <div
                key={box.id}
                className="text-sm py-1 border-b border-gray-200"
              >
                {idx + 1}. {box.title} - ({box.x},{box.y}) {box.width}x
                {box.height}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
