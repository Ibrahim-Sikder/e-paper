// types/epaper.ts
export interface Article {
  id: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  articleImage: string; // আর্টিকেলের ছবি (ePaper এর অংশ)
}

export interface EpaperPage {
  id: number;
  pageNumber: number;
  image: any; // পুরো পৃষ্ঠার ছবি
  thumbnail: any; // থাম্বনেইল ছবি
  articles: Article[];
}
