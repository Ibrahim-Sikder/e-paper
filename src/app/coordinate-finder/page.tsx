// app/coordinate-finder/page.tsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import page1Original from "@/assets/epaper/original/epaper.jpg";

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
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selection, setSelection] = useState({
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
  });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // ইমেজ লোড হলে ন্যাচারাল সাইজ স্টোর
  const handleImageLoad = () => {
    if (imageRef.current) {
      setImageSize({
        width: imageRef.current.naturalWidth,
        height: imageRef.current.naturalHeight,
      });
    }
  };

  // মাউসের পজিশন (আসল কো-অর্ডিনেটে)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current || imageSize.width === 0) return;
    const rect = imageRef.current.getBoundingClientRect();
    const scaleX = imageSize.width / rect.width;
    const scaleY = imageSize.height / rect.height;
    const actualX = Math.round((e.clientX - rect.left) * scaleX);
    const actualY = Math.round((e.clientY - rect.top) * scaleY);
    setMousePos({ x: actualX, y: actualY });
  };

  // সিলেকশন শুরু
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!imageRef.current || imageSize.width === 0) return;
    const rect = imageRef.current.getBoundingClientRect();
    const scaleX = imageSize.width / rect.width;
    const scaleY = imageSize.height / rect.height;
    const actualX = Math.round((e.clientX - rect.left) * scaleX);
    const actualY = Math.round((e.clientY - rect.top) * scaleY);
    setIsSelecting(true);
    setSelection({
      start: { x: actualX, y: actualY },
      end: { x: actualX, y: actualY },
    });
  };

  // সিলেকশন ড্র্যাগ
  const handleMouseMoveSelect = (e: React.MouseEvent) => {
    if (!isSelecting || !imageRef.current || imageSize.width === 0) return;
    const rect = imageRef.current.getBoundingClientRect();
    const scaleX = imageSize.width / rect.width;
    const scaleY = imageSize.height / rect.height;
    const actualX = Math.round((e.clientX - rect.left) * scaleX);
    const actualY = Math.round((e.clientY - rect.top) * scaleY);
    setSelection((prev) => ({ ...prev, end: { x: actualX, y: actualY } }));
  };

  // সিলেকশন শেষ
  const handleMouseUp = () => {
    if (!isSelecting) return;

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
              width,
              height,
              content,
            },
          ]);
        }
      }
    }
    setIsSelecting(false);
  };

  // ডিসপ্লেতে বক্স দেখানোর জন্য স্কেল করা পজিশন
  const getDisplayPosition = (box: Box) => {
    if (!imageRef.current || imageSize.width === 0)
      return { left: 0, top: 0, width: 0, height: 0 };
    const rect = imageRef.current.getBoundingClientRect();
    const scaleX = rect.width / imageSize.width;
    const scaleY = rect.height / imageSize.height;
    return {
      left: box.x * scaleX,
      top: box.y * scaleY,
      width: box.width * scaleX,
      height: box.height * scaleY,
    };
  };

  // কো-অর্ডিনেট কপি
  const copyCoordinates = () => {
    boxes.forEach((box, idx) => {});
  };

  const clearAll = () => {
    if (confirm("Clear all boxes?")) setBoxes([]);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🎯 Coordinate Finder Tool</h1>

      {/* Info Panel */}
      <div className="bg-blue-50 p-4 rounded-lg mb-4 border border-blue-200">
        <p className="font-bold">📐 Image Information:</p>
        <p>
          Natural Size:{" "}
          <span className="font-mono font-bold text-green-600">
            {imageSize.width || "Loading..."} x{" "}
            {imageSize.height || "Loading..."}
          </span>
        </p>
        <p>
          Mouse Position:{" "}
          <span className="font-mono">
            X={mousePos.x}, Y={mousePos.y}
          </span>
        </p>
        <p className="text-sm text-gray-600 mt-2">
          💡 ইমেজের যেখানে আর্টিকেল আছে সেখানে ক্লিক করে ড্র্যাগ করুন
        </p>
      </div>

      {/* Image Container */}
      <div
        ref={containerRef}
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

        {/* Saved Boxes */}
        {boxes.map((box, idx) => {
          const pos = getDisplayPosition(box);
          return (
            <div
              key={box.id}
              className="absolute border-2 border-green-500 bg-green-200 bg-opacity-30"
              style={{
                left: pos.left,
                top: pos.top,
                width: pos.width,
                height: pos.height,
              }}
            >
              <div className="absolute -top-6 left-0 bg-green-600 text-white text-[10px] px-1 rounded whitespace-nowrap">
                #{idx + 1}: {box.title.substring(0, 20)}
              </div>
            </div>
          );
        })}

        {/* Current Selection */}
        {isSelecting && (
          <div
            className="absolute border-2 border-blue-500 bg-blue-200 bg-opacity-30"
            style={{
              left:
                Math.min(selection.start.x, selection.end.x) *
                (imageRef.current
                  ? imageRef.current.getBoundingClientRect().width /
                    imageSize.width
                  : 1),
              top:
                Math.min(selection.start.y, selection.end.y) *
                (imageRef.current
                  ? imageRef.current.getBoundingClientRect().height /
                    imageSize.height
                  : 1),
              width:
                Math.abs(selection.end.x - selection.start.x) *
                (imageRef.current
                  ? imageRef.current.getBoundingClientRect().width /
                    imageSize.width
                  : 1),
              height:
                Math.abs(selection.end.y - selection.start.y) *
                (imageRef.current
                  ? imageRef.current.getBoundingClientRect().height /
                    imageSize.height
                  : 1),
            }}
          />
        )}
      </div>

      {/* Buttons */}
      <div className="mt-4 space-x-2">
        <button
          onClick={copyCoordinates}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          📋 Copy Coordinates to Console
        </button>
        <button
          onClick={clearAll}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          🗑️ Clear All
        </button>
      </div>

      {/* Boxes List */}
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
