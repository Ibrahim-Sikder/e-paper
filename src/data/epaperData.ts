// data/epaperData.ts
import page1Original from "@/assets/epaper/original/page11.webp";
import page1Thumb from "@/assets/epaper/thumbnail/page11.webp";
import page2Original from "@/assets/epaper/original/page11.webp";
import page2Thumb from "@/assets/epaper/thumbnail/page11.webp";
import { EpaperPage } from "@/types/epaper";

export const epaperPages: EpaperPage[] = [
  {
    id: 1,
    pageNumber: 1,
    image: page1Original,
    thumbnail: page1Thumb,
    articles: [
      {
        id: "a1",
        title: "জাতীয় বাজেট ২০২৬: কী পেলেন সাধারণ মানুষ?",
        x: 50,
        y: 100,
        width: 500,
        height: 200,
        content:
          "সরকার আজ জাতীয় সংসদে ৭ লাখ ৯৭ হাজার কোটি টাকার বাজেট পেশ করেছে। সাধারণ মানুষের জন্য নতুন কর ছাড় ঘোষণা করা হয়েছে। মধ্যবিত্তদের জন্য করের হার কমানো হয়েছে। স্বাস্থ্য ও শিক্ষা খাতে বরাদ্দ বাড়ানো হয়েছে।",
        category: "জাতীয়",
        articleImage: "/images/budget.jpg",
      },
      {
        id: "a2",
        title: "ক্রিকেট বিশ্বকাপ: বাংলাদেশের প্রথম জয়",
        x: 580,
        y: 100,
        width: 550,
        height: 200,
        content:
          "টাইগাররা আজ ঐতিহাসিক জয় পেয়েছে। ৫ উইকেটে শক্তিশালী প্রতিপক্ষকে হারিয়েছে তারা। ওপেনাররা দারুণ শুরু এনে দেন। মিডল অর্ডার ব্যাটসম্যানরা দায়িত্ব নিয়ে দলকে জয় এনে দেন।",
        category: "খেলা",
        articleImage: "/images/cricket.jpg",
      },
      {
        id: "a3",
        title: "শেয়ারবাজারে রেকর্ড পতন",
        x: 50,
        y: 330,
        width: 350,
        height: 180,
        content:
          "ঢাকা স্টক এক্সচেঞ্জে আজ ৪০০ পয়েন্ট পতন হয়েছে। বিনিয়োগকারীরা ক্ষতির মুখে পড়েছেন। পুঁজিবাজার বিশ্লেষকরা বলেছেন, সাম্প্রতিক অস্থিরতার কারণে এই পতন হয়েছে।",
        category: "বাণিজ্য",
        articleImage: "/images/stock.jpg",
      },
      {
        id: "a4",
        title: "নতুন শিক্ষানীতি ২০২৬ অনুমোদন",
        x: 430,
        y: 330,
        width: 350,
        height: 180,
        content:
          "মন্ত্রিসভায় আজ নতুন শিক্ষানীতি অনুমোদন দেওয়া হয়েছে। এসএসসি ও এইচএসসিতে বড় পরিবর্তন আনা হচ্ছে। শিক্ষার্থীদের উপর চাপ কমানোর জন্য নতুন পদ্ধতি চালু হচ্ছে।",
        category: "শিক্ষা",
        articleImage: "/images/education.jpg",
      },
      {
        id: "a5",
        title: "বিদেশি বিনিয়োগ বাড়ছে",
        x: 810,
        y: 330,
        width: 320,
        height: 180,
        content:
          "গত তিন মাসে বিদেশি বিনিয়োগ ২৫% বৃদ্ধি পেয়েছে। বিশেষ অর্থনৈতিক অঞ্চলে বিনিয়োগ বাড়ছে। সরকার বিদেশি বিনিয়োগকারীদের জন্য নতুন নীতি ঘোষণা করেছে।",
        category: "অর্থনীতি",
        articleImage: "/images/investment.jpg",
      },
    ],
  },
  {
    id: 2,
    pageNumber: 2,
    image: page2Original,
    thumbnail: page2Thumb,
    articles: [
      {
        id: "b1",
        title: "পৃষ্ঠা ২: প্রধান সংবাদ",
        x: 50,
        y: 100,
        width: 1100,
        height: 250,
        content:
          "দ্বিতীয় পৃষ্ঠার প্রধান সংবাদ এখানে লেখা হবে। বিস্তারিত পরে আসছে।",
        category: "জাতীয়",
        articleImage: "/images/news2.jpg",
      },
      {
        id: "b2",
        title: "পৃষ্ঠা ২: দ্বিতীয় সংবাদ",
        x: 50,
        y: 380,
        width: 540,
        height: 300,
        content:
          "দ্বিতীয় পৃষ্ঠার দ্বিতীয় সংবাদ এখানে লেখা হবে। বিস্তারিত পরে আসছে।",
        category: "আন্তর্জাতিক",
        articleImage: "/images/news3.jpg",
      },
      {
        id: "b3",
        title: "পৃষ্ঠা ২: তৃতীয় সংবাদ",
        x: 610,
        y: 380,
        width: 540,
        height: 300,
        content:
          "দ্বিতীয় পৃষ্ঠার তৃতীয় সংবাদ এখানে লেখা হবে। বিস্তারিত পরে আসছে।",
        category: "বাণিজ্য",
        articleImage: "/images/news4.jpg",
      },
    ],
  },
];
