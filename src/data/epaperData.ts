/* eslint-disable @typescript-eslint/no-explicit-any */
import page1Original from "@/assets/epaper/original/epaper.jpg";
import page1Thumb from "@/assets/epaper/thumbnail/epaper.jpg";

import article1Img from "@/assets/epaper/cropped/epaper.jpg";
import article2Img from "@/assets/epaper/cropped/epaper2.jpg";
import article3Img from "@/assets/epaper/cropped/epaper3.jpg";
import article4Img from "@/assets/epaper/cropped/epaper4.jpg";
import article5Img from "@/assets/epaper/cropped/epaper5.jpg";

export const epaperPages: any[] = [
  {
    id: 1,
    pageNumber: 1,
    image: page1Original,
    thumbnail: page1Thumb,
    articles: [
      {
        id: "a1",
        title: "প্রধান শিরোনাম - দেশের অর্থনীতিতে নতুন দিগন্ত",
        x: 50,
        y: 80,
        width: 700,
        height: 100,
        // 🔥 ক্রপ করা ইমেজ ব্যবহার করো
        articleImage: article1Img,
      },
      {
        id: "a2",
        title: "বাম দিকের প্রধান সংবাদ",
        x: 50,
        y: 200,
        width: 340,
        height: 250,
        articleImage: article2Img,
      },
      {
        id: "a3",
        title: "ডান দিকের প্রধান সংবাদ",
        x: 410,
        y: 200,
        width: 340,
        height: 250,
        articleImage: article3Img,
      },
      {
        id: "a4",
        title: "নিচের বামের সংবাদ",
        x: 50,
        y: 470,
        width: 340,
        height: 200,
        articleImage: article4Img,
      },
      {
        id: "a5",
        title: "নিচের ডানের সংবাদ",
        x: 410,
        y: 470,
        width: 340,
        height: 200,
        articleImage: article5Img,
      },
    ],
  },
];
