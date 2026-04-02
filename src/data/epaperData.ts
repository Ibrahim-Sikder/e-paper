import page1 from "@/assets/middle/page10.webp";
import page2 from "@/assets/middle/page11.jpg";

export const epaperData = [
  {
    id: 1,
    title: "Page 1",
    image: page1,
    articles: [
      {
        id: "a1",
        title: "রাজনীতি খবর",
        x: 50,
        y: 100,
        width: 200,
        height: 120,
        content: "এখানে রাজনীতির পুরো খবর দেখাবে...",
      },
      {
        id: "a2",
        title: "খেলাধুলা",
        x: 300,
        y: 200,
        width: 220,
        height: 140,
        content: "খেলাধুলার বিস্তারিত খবর...",
      },
    ],
  },
  {
    id: 2,
    title: "Page 2",
    image: page2,
    articles: [
      {
        id: "b1",
        title: "আন্তর্জাতিক",
        x: 80,
        y: 150,
        width: 250,
        height: 130,
        content: "আন্তর্জাতিক খবর...",
      },
    ],
  },
];
