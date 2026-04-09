/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { articleProps } from "@/types/epaper";
import Image from "next/image";
import { useState, useEffect } from "react";
import ArticleFooter from "./ArticleFooter";

export default function RightArticlePanel({
  selectedArticle,
  selectedPage,
  viewMode = "image",
  footerInfo,
}: articleProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
    setImgError(false);
  }, [selectedArticle?.id]);

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
          <p className="text-gray-500 font-medium">নিউজ সিলেক্ট করুন</p>
        </div>
      </div>
    );
  }

  const isHtml = selectedArticle.content?.trim().startsWith("<");

  if (viewMode === "text") {
    return (
      <div className="bg-white rounded-xl shadow-lg top-4 flex flex-col">
        <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white flex-shrink-0">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            {selectedArticle.category && (
              <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2.5 py-1 rounded-full font-medium">
                {selectedArticle.category}
              </span>
            )}
            {selectedArticle.newsId && (
              <span className="inline-block bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-full">
                📰 নিউজ লিংকযুক্ত
              </span>
            )}
            <span className="text-xs text-gray-500 ml-auto">
              📄 পৃষ্ঠা {selectedPage?.pageNumber}
            </span>
          </div>
          <h3 className="font-bold text-gray-800 text-lg leading-snug">
            {selectedArticle.title}
          </h3>
        </div>

        <div className="p-5 overflow-y-auto flex-1">
          {selectedArticle.content ? (
            isHtml ? (
              <div
                className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
              />
            ) : (
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {selectedArticle.content}
              </p>
            )
          ) : (
            <p className="text-gray-400 italic">
              এই আর্টিকেলে কোনো টেক্সট কন্টেন্ট নেই।
            </p>
          )}
        </div>
        <ArticleFooter footerInfo={footerInfo} className="mt-5" />
      </div>
    );
  }

  // Image/Default View Mode
  return (
    <div className="bg-white rounded-xl shadow-lg flex flex-col">
      {/* Article Image */}
      {selectedArticle.articleImage && !imgError && (
        <div className="relative w-full bg-gray-100">
          <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
            <Image
              src={selectedArticle.articleImage}
              alt={selectedArticle.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImgError(true)}
              unoptimized
              priority
            />
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
        </div>
      )}

      <ArticleFooter footerInfo={footerInfo} />
    </div>
  );
}
