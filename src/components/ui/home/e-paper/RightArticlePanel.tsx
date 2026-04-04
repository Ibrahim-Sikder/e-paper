"use client";

import { RightArticlePanelProps } from "@/types/epaper";
import Image from "next/image";

export default function RightArticlePanel({
  selectedArticle,
  selectedPage,
}: RightArticlePanelProps) {
  if (!selectedArticle) {
    return (
      <div className="bg-gray-50 rounded-xl p-6 shadow-lg sticky top-4">
        <div className="text-center py-12">
          <svg
            className="w-16 h-16 mx-auto text-gray-400 mb-4"
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
          <p className="text-gray-500 text-lg">কোনো নিউজ সিলেক্ট করুন</p>
          <p className="text-gray-400 text-sm mt-2">
            পৃষ্ঠার যেকোনো নিউজে ক্লিক করুন
          </p>
          {selectedPage && (
            <p className="text-gray-400 text-xs mt-4">
              বর্তমানে {selectedPage.pageNumber} নম্বর পৃষ্ঠা দেখা যাচ্ছে
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-4">
      {selectedArticle.image && (
        <div className="relative w-full h-48 bg-gray-100">
          <Image
            src={selectedArticle.image}
            alt={selectedArticle.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="px-5 pt-4">
        <span className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
          {selectedArticle.category}
        </span>
      </div>

      <div className="px-5 pt-3">
        <h2 className="text-xl font-bold text-gray-900 leading-tight">
          {selectedArticle.title}
        </h2>
      </div>

      <div className="px-5 py-4">
        <p className="text-gray-700 leading-relaxed">
          {selectedArticle.content}
        </p>
      </div>

      <div className="px-5 pb-5">
        <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium">
          বিস্তারিত পড়ুন →
        </button>
      </div>

      <div className="border-t border-gray-100 px-5 py-4">
        <p className="text-sm text-gray-500 mb-2">শেয়ার করুন</p>
        <div className="flex gap-2">
          <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
          </button>
          <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.385-11.512c0-.213-.005-.425-.015-.636A10.023 10.023 0 0024 4.557z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
