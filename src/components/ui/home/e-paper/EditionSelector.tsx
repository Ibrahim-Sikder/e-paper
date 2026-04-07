/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Newspaper } from "lucide-react";

interface EditionSelectorProps {
  editions: string[];
  pages: any[];
  currentEdition?: string;
  displayEdition: string;
  onEditionChange?: (edition: string) => void;
}

export function EditionSelector({
  editions,
  pages,
  currentEdition,
  displayEdition,
  onEditionChange,
}: EditionSelectorProps) {
  const [editionOpen, setEditionOpen] = useState(false);
  const editionRef = useRef<HTMLDivElement>(null);

  const finalEditions =
    editions.length > 0
      ? editions
      : [
          ...new Set(
            pages.map((page) => page.edition).filter(Boolean) as string[],
          ),
        ];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (editionRef.current && !editionRef.current.contains(e.target as Node))
        setEditionOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const pill =
    "inline-flex items-center gap-1.5 px-3 py-[7px] rounded-sm border border-gray-200 bg-white text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-300 active:scale-95 transition-all select-none cursor-pointer whitespace-nowrap";

  return (
    <div className="relative flex-shrink-0" ref={editionRef}>
      <button onClick={() => setEditionOpen(!editionOpen)} className={pill}>
        <Newspaper className="w-3.5 h-3.5 text-gray-500" />
        <span>{displayEdition}</span>
        <ChevronDown
          className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${editionOpen ? "rotate-180" : ""}`}
        />
      </button>

      {editionOpen && finalEditions.length > 0 && (
        <div className="absolute left-0 top-full mt-2 bg-white rounded shadow-2xl border border-gray-100 py-1.5 z-[9999] min-w-[160px]">
          {finalEditions.map((edition) => (
            <button
              key={edition}
              onClick={() => {
                if (onEditionChange) onEditionChange(edition);
                setEditionOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                displayEdition === edition
                  ? "bg-[#1A73E8] text-white font-semibold"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {edition}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
