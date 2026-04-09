/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ArticleFooterProps } from "@/types/epaper";

export default function ArticleFooter({
  footerInfo,
  className = "",
}: ArticleFooterProps) {
  if (!footerInfo) return null;

  return (
    <div className={`flex-shrink-0 mt-5 ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center px-4">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-2 bg-white text-gray-400">প্রকাশনা তথ্য</span>
        </div>
      </div>
      <div className="py-4 px-4 bg-gray-50">
        <div className="text-center">
          <div className="text-xs text-gray-500 space-y-1">
            {footerInfo.editor && <p>সম্পাদক: {footerInfo.editor}</p>}
            {footerInfo.publisher && <p>প্রকাশক: {footerInfo.publisher}</p>}
            {footerInfo.organization && (
              <p>প্রকাশনায়: {footerInfo.organization}</p>
            )}
            {footerInfo.copyright && (
              <p className="text-gray-400 mt-2">{footerInfo.copyright}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
