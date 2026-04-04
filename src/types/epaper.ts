/* eslint-disable @typescript-eslint/no-explicit-any */
// types/epaper.ts
export interface Article {
  id: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
  category: string;
  image?: string;
}

export interface EpaperPage {
  id: number;
  pageNumber: number;
  image: any;
  thumbnail: any;
  articles: Article[];
}

export interface LeftThumbnailListProps {
  pages: EpaperPage[];
  selectedPage: EpaperPage;
  onPageSelect: (page: EpaperPage) => void;
}

export interface RightArticlePanelProps {
  selectedArticle: Article | null;
  selectedPage: EpaperPage;
}
