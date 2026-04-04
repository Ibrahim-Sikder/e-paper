export interface Article {
  id: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
  category: string;
  articleImage?: string;
  reporter?: string;
  publishTime?: string;
}

export interface EpaperPage {
  id: number;
  pageNumber: number;
  pageTitle?: string;
  image: any;
  thumbnail: any;
  articles: Article[];
}
