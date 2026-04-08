// types/epaper.ts
export interface EpaperArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  articleImage: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface EpaperPage {
  id: string; // Change this from 'number' to 'string'
  pageNumber: number;
  image: string;
  thumbnail: string;
  articles: EpaperArticle[];
  epaperDate?: string;
  epaperTitle?: string;
  edition?: string;
}

export interface Props {
  pages: EpaperPage[];
  activeIndex: number;
  viewMode: "image" | "text" | "fullpage";
  activePage: EpaperPage | null;
  onPageChange: (pageNumber: number) => void;
  onViewModeChange: (mode: "image" | "text" | "fullpage") => void;
  onDateChange?: (date: string) => void;
  onEditionChange?: (edition: string) => void;
  availableDates?: string[];
  availableEditions?: string[];
  currentDate?: string;
  currentEdition?: string;
  isLoading?: boolean;
}
