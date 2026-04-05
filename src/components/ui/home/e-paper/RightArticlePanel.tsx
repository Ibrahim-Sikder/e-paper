// components/e-paper/RightArticlePanel.tsx
"use client";
import React from "react";
import Image from "next/image";

interface Article {
  id: string;
  title: string;
  articleImage: any; // StaticImageData টাইপ
}

interface Props {
  selectedArticle: Article | null;
  selectedPage: { pageNumber: number };
}

export default function RightArticlePanel({
  selectedArticle,
  selectedPage,
}: Props) {
  if (!selectedArticle) {
    return (
      <div className="bg-gray-50 rounded-xl shadow-lg sticky top-4">
        <div className="text-center py-16 px-6">
          <div className="w-20 h-20 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <p className="text-gray-500">নিউজ সিলেক্ট করুন</p>
          <p className="text-gray-400 text-sm mt-1">
            পৃষ্ঠার যেকোনো জায়গায় ক্লিক করুন
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-4">
      <div className="relative bg-gray-100">
        <Image
          src={selectedArticle.articleImage}
          alt={selectedArticle.title}
          className="w-full h-auto"
          priority
        />
      </div>
      <div className="p-4 border-t border-gray-100">
        <h3 className="font-medium text-gray-800">{selectedArticle.title}</h3>
        <p className="text-xs text-gray-400 mt-1">ই-পেপার থেকে সংগৃহীত</p>
      </div>
    </div>
  );
}
