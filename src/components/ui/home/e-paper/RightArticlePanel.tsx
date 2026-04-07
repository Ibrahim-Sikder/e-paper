"use client";
import Image from "next/image";

interface Article {
  id: string;
  title: string;
  content?: string;
  category?: string;
  articleImage?: string;
}

interface Props {
  selectedArticle: Article | null;
  selectedPage: { pageNumber: number } | null;
  viewMode?: "image" | "text" | "fullpage";
}

export default function RightArticlePanel({
  selectedArticle,
  selectedPage,
  viewMode = "image",
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
          <p className="text-gray-500 font-medium">নিউজ সিলেক্ট করুন</p>
          <p className="text-gray-400 text-sm mt-1">
            পৃষ্ঠার যেকোনো জায়গায় ক্লিক করুন
          </p>
        </div>
      </div>
    );
  }

  const isHtml = selectedArticle.content?.trim().startsWith("<");
  if (viewMode === "text") {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-4 max-h-[90vh] flex flex-col">
        {/* Teal header */}
        <div className="px-4 py-3 border-b border-teal-100 bg-teal-50 flex-shrink-0 flex items-center gap-2">
          {selectedArticle.category && (
            <span className="inline-block bg-teal-100 text-teal-700 text-xs px-2 py-0.5 rounded-full font-medium">
              {selectedArticle.category}
            </span>
          )}
          <span className="text-xs text-teal-500 ml-auto">
            📄 পৃষ্ঠা {selectedPage?.pageNumber}
          </span>
        </div>

        {/* Text only */}
        <div className="p-4 overflow-y-auto flex-1">
          <h3 className="font-bold text-gray-800 text-base leading-snug mb-3">
            {selectedArticle.title}
          </h3>

          {selectedArticle.content ? (
            isHtml ? (
              <div
                className="text-sm text-gray-700 leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
              />
            ) : (
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {selectedArticle.content}
              </p>
            )
          ) : (
            <p className="text-sm text-gray-400 italic">
              এই আর্টিকেলে কোনো টেক্সট কন্টেন্ট নেই।
            </p>
          )}

          <p className="text-xs text-gray-400 mt-4 pt-3 border-t border-gray-100">
            📄 পৃষ্ঠা {selectedPage?.pageNumber} • ই-পেপার থেকে সংগৃহীত
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-4 max-h-[90vh] flex flex-col">
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
    </div>
  );
}
