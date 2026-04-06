// components/epaper/RightArticlePanel.tsx
"use client";
import React from "react";
import Image from "next/image";
import { EpaperPage } from "@/hooks/useEpaperData";

interface Article {
  id: string;
  title: string;
  content?: string;
  category?: string;
  articleImage?: string;
}

interface Props {
  selectedArticle: Article | null;
  selectedPage: EpaperPage | null;
  // ✅ NEW: viewMode prop যোগ করা হয়েছে
  viewMode?: "image" | "text" | "fullpage";
}

export default function RightArticlePanel({
  selectedArticle,
  selectedPage,
  viewMode = "image",
}: Props) {
  // ✅ FIX: text mode এ page এর সব articles দেখাবে
  if (viewMode === "text") {
    return <TextViewPanel page={selectedPage} />;
  }

  // image/fullpage mode এ article select না থাকলে placeholder
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
          <p className="text-gray-400 text-sm mt-1">
            পৃষ্ঠার যেকোনো জায়গায় ক্লিক করুন
          </p>
        </div>
      </div>
    );
  }

  // ✅ Selected article detail view
  const isHtml = selectedArticle.content?.trim().startsWith("<");

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-4 max-h-[90vh] flex flex-col">
      {/* Article Image */}
      {selectedArticle.articleImage && (
        <div className="relative bg-gray-100 flex-shrink-0">
          <Image
            src={selectedArticle.articleImage}
            alt={selectedArticle.title}
            width={600}
            height={400}
            className="w-full h-auto max-h-56 object-cover"
            unoptimized
            priority
          />
        </div>
      )}

      {/* Scrollable Content */}
      <div className="p-4 overflow-y-auto flex-1">
        {selectedArticle.category && (
          <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full mb-2">
            {selectedArticle.category}
          </span>
        )}

        <h3 className="font-bold text-gray-800 text-base leading-snug mb-3">
          {selectedArticle.title}
        </h3>

        {selectedArticle.content &&
          (isHtml ? (
            <div
              className="text-sm text-gray-700 leading-relaxed prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
            />
          ) : (
            <p className="text-sm text-gray-700 leading-relaxed">
              {selectedArticle.content}
            </p>
          ))}

        <p className="text-xs text-gray-400 mt-4 pt-3 border-t border-gray-100">
          📄 পৃষ্ঠা {selectedPage?.pageNumber} • ই-পেপার থেকে সংগৃহীত
        </p>
      </div>
    </div>
  );
}

// ✅ Text View — page এর সব articles list করে দেখায়
function TextViewPanel({ page }: { page: EpaperPage | null }) {
  if (!page) {
    return (
      <div className="bg-gray-50 rounded-xl shadow-lg sticky top-4">
        <div className="text-center py-16 px-6">
          <p className="text-gray-400 text-sm">কোনো পৃষ্ঠা নির্বাচিত নয়</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-4 max-h-[90vh] flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100 bg-teal-50 flex-shrink-0">
        <h2 className="text-sm font-bold text-teal-700 flex items-center gap-2">
          <span className="w-5 h-5 bg-teal-500 text-white rounded text-xs flex items-center justify-center font-bold">
            {page.pageNumber}
          </span>
          পৃষ্ঠা {page.pageNumber} — আর্টিকেলসমূহ
        </h2>
        <p className="text-xs text-teal-600 mt-0.5">
          {page.articles.length} টি সংবাদ পাওয়া গেছে
        </p>
      </div>

      {/* Articles list */}
      <div className="p-4 overflow-y-auto flex-1">
        {page.articles.length === 0 && (
          <p className="text-gray-400 text-sm text-center py-8">
            এই পৃষ্ঠায় কোনো আর্টিকেল নেই।
          </p>
        )}
        <div className="space-y-5">
          {page.articles.map((article) => {
            const isHtml = article.content?.trim().startsWith("<");
            return (
              <div
                key={article.id}
                className="border-b border-gray-100 pb-5 last:border-0"
              >
                {article.category && (
                  <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full mb-1">
                    {article.category}
                  </span>
                )}
                <h3 className="font-semibold text-gray-800 text-sm mb-2">
                  {article.title}
                </h3>
                {article.content &&
                  (isHtml ? (
                    <div
                      className="text-sm text-gray-600 leading-relaxed prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                  ) : (
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {article.content}
                    </p>
                  ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
