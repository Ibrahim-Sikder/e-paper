import { Archive, Languages, Newspaper, ThumbsUp } from "lucide-react";

export const megaMenuColumns = [
  ["সর্বশেষ", "বাণিজ্য", "প্রবাস", "নারী-শিশু"],
  ["জাতীয়", "চাকরি", "লাইফ স্টাইল", "সোশ্যাল মিডিয়া"],
  ["রাজনীতি", "মতামত", "স্বাস্থ্য", "বিচিত্র"],
  ["সারাদেশ", "শিক্ষা", "প্রযুক্তি", "অডিও"],
  ["বিশ্ব", "আইন-আদালত", "শিল্প-সাহিত্য"],
  ["বিনোদন", "অপরাধ", "ধর্ম"],
  ["খেলা", "রাজধানী", "চট্টগ্রাম সারাবেলা"],
];

export const mediaLinks = [
  {
    label: "ভিডিও স্টোরি",
    slug: "video-story",
    color: "#e53e3e",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M8 5v14l11-7z" />
      </svg>
    ),
    bg: "#fff0f0",
  },
  {
    label: "ফটো স্টোরি",
    slug: "photo-story",
    color: "#2b6cb0",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" fill="white" />
        <path
          d="M21 15l-5-5L5 21"
          stroke="white"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    ),
    bg: "#ebf8ff",
  },
  {
    label: "ফটোগ্যালারি",
    slug: "photo-gallery",
    color: "#b7791f",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <rect
          x="5"
          y="7"
          width="6"
          height="5"
          rx="1"
          fill="white"
          opacity="0.7"
        />
        <rect
          x="13"
          y="7"
          width="6"
          height="5"
          rx="1"
          fill="white"
          opacity="0.7"
        />
        <rect
          x="5"
          y="14"
          width="6"
          height="3"
          rx="1"
          fill="white"
          opacity="0.7"
        />
        <rect
          x="13"
          y="14"
          width="6"
          height="3"
          rx="1"
          fill="white"
          opacity="0.7"
        />
      </svg>
    ),
    bg: "#fffff0",
  },
  {
    label: "ভিডিও গ্যালারি",
    slug: "video-gallery",
    color: "#c05621",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <rect x="2" y="4" width="15" height="16" rx="2" />
        <path d="M17 8.5l5-3v13l-5-3V8.5z" />
      </svg>
    ),
    bg: "#fff5f5",
  },
  {
    label: "অডিও",
    slug: "audio",
    color: "#e53e3e",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12 3a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9zm0 4a2 2 0 0 0-2 2v2a2 2 0 0 0 4 0V9a2 2 0 0 0-2-2zm-4 7a4 4 0 0 0 8 0h-1.5a2.5 2.5 0 0 1-5 0H8z" />
      </svg>
    ),
    bg: "#fff5f5",
  },
];
export const categorySlugMap: Record<string, string> = {
  সর্বশেষ: "latest",
  জাতীয়: "national",
  রাজনীতি: "politics",
  সারাদেশ: "country",
  বিশ্ব: "world",
  বিনোদন: "entertainment",
  খেলা: "sports",
  বাণিজ্য: "business",
  চাকরি: "jobs",
  মতামত: "opinion",
  ভিডিও: "video",
  প্রবাস: "probash",
  "লাইফ স্টাইল": "lifestyle",
  স্বাস্থ্য: "health",
  প্রযুক্তি: "technology",
  বিচিত্র: "bizarre",
  অডিও: "audio",
  শিক্ষা: "education",
  "আইন-আদালত": "law-court",
  "শিল্প-সাহিত্য": "arts-literature",
  অপরাধ: "crime",
  ধর্ম: "religion",
  "নারী-শিশু": "women-children",
  "সোশ্যাল মিডিয়া": "social-media",
  রাজধানী: "capital",
  "চট্টগ্রাম সারাবেলা": "chittagong",
  "ভিডিও স্টোরি": "video-story",
  "ফটো স্টোরি": "photo-story",
  ফটোগ্যালারি: "photo-gallery",
  "ভিডিও গ্যালারি": "video-gallery",
};
export const topNavLinks = [
  {
    label: "অনলাইন",
    icon: (
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-600 text-white text-[10px] font-bold">
        ক
      </span>
    ),
    href: "/",
    highlight: true,
  },
  {
    label: "আজকের পত্রিকা",
    icon: <Newspaper size={15} className="text-gray-600" />,
    href: "/epaper",
  },
  {
    label: "আর্কাইভ",
    icon: <Archive size={15} className="text-gray-600" />,
    href: "/archive",
  },
  {
    label: "সোশ্যাল মিডিয়া",
    icon: <ThumbsUp size={15} className="text-gray-600" />,
    href: `/${categorySlugMap["সোশ্যাল মিডিয়া"]}`,
  },
  {
    label: "বাংলা কনভার্টার",
    icon: <Languages size={15} className="text-gray-600" />,
    href: "/converter",
  },
];

export const mainNavLinks = [
  "সর্বশেষ",
  "জাতীয়",
  "রাজনীতি",
  "সারাদেশ",
  "বিশ্ব",
  "বিনোদন",
  "খেলা",
  "বাণিজ্য",
  "চাকরি",
  "মতামত",
  "ভিডিও",
];
