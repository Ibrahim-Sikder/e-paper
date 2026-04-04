import page1 from "@/assets/middle/page10.webp";
import page2 from "@/assets/middle/page11.jpg";

export const epaperPages = [
  {
    id: 1,
    pageNumber: 1,
    image: page1,
    thumbnail: page2,
    articles: [
      {
        id: "a1",
        title: "জাতীয় বাজেট ২০২৬: কী পেলেন সাধারণ মানুষ?",
        x: 50, // left position in pixels
        y: 200, // top position in pixels
        width: 350, // width of clickable area
        height: 150, // height of clickable area
        content:
          "সরকার আজ জাতীয় সংসদে ৭ লাখ ৯৭ হাজার কোটি টাকার বাজেট পেশ করেছে। সাধারণ মানুষের জন্য নতুন কর ছাড় ঘোষণা করা হয়েছে...",
        category: "National",
        image: "/images/news1.jpg",
      },
      {
        id: "a2",
        title: "ক্রিকেট বিশ্বকাপ: বাংলাদেশের প্রথম জয়",
        x: 450,
        y: 400,
        width: 280,
        height: 120,
        content:
          "টাইগাররা আজ ঐতিহাসিক জয় পেয়েছে। ৫ উইকেটে শক্তিশালী প্রতিপক্ষকে হারিয়েছে তারা...",
        category: "Sports",
        image: "/images/sports1.jpg",
      },
      {
        id: "a3",
        title: "শেয়ারবাজারে রেকর্ড পতন",
        x: 100,
        y: 600,
        width: 300,
        height: 100,
        content:
          "ঢাকা স্টক এক্সচেঞ্জে আজ ৪০০ পয়েন্ট পতন হয়েছে। বিনিয়োগকারীরা ক্ষতির মুখে পড়েছেন...",
        category: "Business",
        image: "/images/business1.jpg",
      },
      {
        id: "a4",
        title: "নতুন শিক্ষানীতি ২০২৬ অনুমোদন",
        x: 500,
        y: 180,
        width: 250,
        height: 130,
        content:
          "মন্ত্রিসভায় আজ নতুন শিক্ষানীতি অনুমোদন দেওয়া হয়েছে। এসএসসি ও এইচএসসিতে বড় পরিবর্তন আনা হচ্ছে...",
        category: "Education",
        image: "/images/edu1.jpg",
      },
    ],
  },
  {
    id: 2,
    pageNumber: 2,
    image: "/images/page2.jpg",
    thumbnail: "/images/thumb2.jpg",
    articles: [
      {
        id: "b1",
        title: "বিদ্যুৎ-জ্বালানি খাতে বড় প্রকল্প",
        x: 80,
        y: 250,
        width: 320,
        height: 140,
        content:
          "সরকার সোলার পাওয়ার প্ল্যান্ট স্থাপনে ৫ হাজার কোটি টাকার প্রকল্প হাতে নিয়েছে...",
        category: "Development",
        image: "/images/power1.jpg",
      },
      {
        id: "b2",
        title: "রেমালের প্রভাবে উপকূলে ভারী বর্ষণ",
        x: 420,
        y: 350,
        width: 280,
        height: 110,
        content:
          "ঘূর্ণিঝড় রেমালের প্রভাবে দেশের উপকূলীয় জেলাগুলোতে ভারী বর্ষণ ও দমকা হাওয়া বইছে...",
        category: "Weather",
        image: "/images/weather1.jpg",
      },
    ],
  },
];
