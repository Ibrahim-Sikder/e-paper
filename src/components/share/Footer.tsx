"use client";

import { Mail, Smartphone } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
  YouTubeIcon,
} from "../ui/Icon";

export default function Footer() {
  const footerLinks = [
    { label: "Dailytimes", href: "/" },
    { label: "গোপনীয়তার নীতি", href: "/privacy-policy" },
    { label: "শর্তাবলি", href: "/terms" },
    { label: "মতব্য প্রকাশের নীতিমালা", href: "/comment-policy" },
    { label: "বাংলা কনভার্টার", href: "/converter" },
    { label: "বিজ্ঞাপন", href: "/advertisement" },
    { label: "যোগাযোগ", href: "/contact" },
  ];

  const socialLinks = [
    {
      icon: <FacebookIcon />,
      href: "#",
      color: "#1877F2",
      bg: "#1877F2",
    },
    {
      icon: <YouTubeIcon />,
      href: "#",
      color: "#FF0000",
      bg: "#FF0000",
    },
    {
      icon: <TwitterIcon />,
      href: "#",
      color: "#000000",
      bg: "#000000",
    },
    {
      icon: <LinkedInIcon />,
      href: "#",
      color: "#0A66C2",
      bg: "#0A66C2",
    },
    {
      icon: <InstagramIcon />,
      href: "#",
      color: "#E1306C",
      bg: "#E1306C",
    },
  ];

  return (
    <footer className="max-w-[1400px] mx-auto w-full bg-white border-t border-gray-200 font-sans">
      <div className="border-b border-gray-200">
        <div className=" mx-auto px-6 py-6 flex items-start justify-between gap-8">
          {/* Left: description */}
          <p className="text-[13px] text-gray-700 leading-relaxed max-w-xs">
            আজকের বাংলাদেশ ও বিশ্বের সকল খবর, রাজনীতি , বাণিজ্যবেলা, খেলা, বিশেষ
            আয়োজনসহ সকল সর্বশেষ সংবাদ সবার আগে পড়তে ক্লিক করুন Dailytimes
            ই-পেপার।
          </p>
          <nav className="hidden md:flex items-center gap-5 flex-wrap justify-end">
            {footerLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-[13px] font-medium text-gray-800 hover:text-red-600 whitespace-nowrap transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
      <div className="border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto px-6 py-5 flex flex-col md:flex-row gap-6 md:gap-12">
          {/* Left: Editor / Publisher */}
          <div className="flex-1 text-[12.5px] text-gray-700 leading-relaxed">
            <p className="font-bold text-gray-900 mb-1">
              সম্পাদক: সাজ্জায় শর্মা । প্রকাশক: মিয়া নুরুদ্দিন আহাম্মেদ অপু
            </p>
            <p>
              Dailytimes মিডিয়া লিমিটেডের পক্ষে প্রকাশক কর্তৃক নিউমার্কেট সিটি
              কমপ্লেক্স, ৪৪/১, রহিম স্কয়ার, নিউমার্কেট, ঢাকা থেকে প্রকাশিত এবং
              ২৮/বি, টয়েনবি সার্কুলার রোড, মতিঝিল ঢাকা, শরীয়তপুর প্রিন্টিং
              প্রেস থেকে মুদ্রিত।
            </p>
          </div>
          <div className="flex-1 text-[12.5px] text-gray-700 leading-[1.9]">
            <p>ফোন : +88 88 9876678, +77 88 888888 ।</p>
            <p>ফ্যাক্স : +77 77 777 । ই-মেইল: news@dailytimes.com.</p>
            <p>
              বিজ্ঞাপন বিভাগ: ফোন: +88 02 44617005, 01730 093038 । ই-মেইল:
              ads@dailytimes.com.
            </p>
            <p>
              সার্কুলেশন : ফোন: 777 7777 । Dailytimes মিডিয়া লিমিটেডের একটি
              প্রকাশনা।
            </p>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto px-6 py-5 flex flex-col md:flex-row items-start gap-8 md:gap-0 md:justify-between">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[13px] font-semibold text-gray-800">
                সোশ্যাল মিডিয়া
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              {socialLinks.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-85"
                  style={{ backgroundColor: s.bg }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 mb-0.5">
              <Mail className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
              <span className="text-[13px] font-semibold text-gray-800">
                নিউজলেটার
              </span>
            </div>
            <p className="text-[12.5px] text-gray-600 leading-relaxed">
              Dailytimes থেকে প্রতিদিন মেইলে আপডেট পেতে
              <br />
              সাবস্ক্রাইব করুন।
            </p>
          </div>

          {/* Mobile App */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 mb-0.5">
              <Smartphone className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
              <span className="text-[13px] font-semibold text-gray-800">
                মোবাইল অ্যাপস
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <a
                href="#"
                className="flex items-center gap-1.5 text-[12.5px] text-gray-700 hover:text-red-600 transition-colors"
              >
                {/* Android icon */}
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 flex-shrink-0"
                  fill="currentColor"
                >
                  <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48A5.84 5.84 0 0 0 12 1.5c-.96 0-1.86.23-2.66.63L7.85.65c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31A5.948 5.948 0 0 0 6 7h12a5.96 5.96 0 0 0-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z" />
                </svg>
                আন্ড্রয়েড
              </a>
              <a
                href="#"
                className="flex items-center gap-1.5 text-[12.5px] text-gray-700 hover:text-red-600 transition-colors"
              >
                {/* Apple icon */}
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 flex-shrink-0"
                  fill="currentColor"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                আইফোন
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 4: Copyright ──────────────────────────────────────────── */}
      <div className="max-w-screen-xl mx-auto px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="text-[12px] text-gray-600">
          স্বত্ব © Dailytimes লিমিটেড ২০২৬
        </p>
        <p className="text-[12px] text-gray-600 text-right">
          এই ওয়েবসাইটের কোনো লেখা, ছবি, ভিডিও অনুমতি ছাড়া ব্যবহার বেআইনি।
        </p>
      </div>
    </footer>
  );
}
