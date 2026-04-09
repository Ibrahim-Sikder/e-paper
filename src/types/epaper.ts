/* eslint-disable @typescript-eslint/no-explicit-any */
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
  newsId?: string;
  newsSlug?: string;
  imageSnapshot?: string;
  titleSnapshot?: string;
  contentSnapshot?: string;
}

export interface EpaperPage {
  id: string;
  pageNumber: number;
  image: string;
  thumbnail: string;
  originalWidth: number;
  originalHeight: number;
  articles: EpaperArticle[];
  epaperDate?: string;
  epaperTitle?: string;
  edition?: string;
}

export interface EpaperData {
  pages: EpaperPage[];
  meta: {
    total: number;
    date: string;
    title: string;
  };
}

export interface EpaperFilter {
  date?: string;
  edition?: string;
}

export interface Props {
  pages: EpaperPage[];
  activeIndex: number;
  viewMode: "image" | "text" | "fullpage";
  activePage: EpaperPage | null;
  onPageChange: (pageNumber: number) => void;
  onViewModeChange: (mode: "image" | "text" | "fullpage") => void;
  onDateChange: (date: string) => void;
  onEditionChange: (edition: string) => void;
  availableDates?: string[];
  availableEditions?: string[];
  currentDate?: string;
  currentEdition?: string;
  isLoading?: boolean;
}

export interface PageCardProps {
  pageIndex: number;
  pageNumber: number;
  control: any;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
  onAddArticle: () => void;
  onRemoveArticle: (articleIndex: number) => void;
  onSelectImage: (type: "page" | "thumbnail") => void;
  onSelectArticleImage: (articleIndex: number) => void;
  onUpdateCoordinates: (articleIndex: number, coordinates: { x: number; y: number; width: number; height: number }) => void;
  onSelectNewsForArticle: (pageIndex: number, articleIndex: number) => void;
}

export interface ArticleCardProps {
  pageIndex: number;
  articleIndex: number;
  control: any;
  onRemove: () => void;
  onSelectImage: () => void;
  onOpenCoordinatePicker: () => void;
  onSelectFromNews?: () => void;
}

export interface AddEpaperFormProps {
  initialData?: any;
  isEditing?: boolean;
}


export interface Article {
  id: string;
  title: string;
  content?: string;
  category?: string;
  articleImage?: string;
  newsId?: string;
  newsSlug?: string;
}

export interface FooterInfo {
  editor?: string;
  publisher?: string;
  organization?: string;
  copyright?: string;
}

export interface articleProps {
  selectedArticle: Article | null;
  selectedPage: { pageNumber: number } | null;
  viewMode?: "image" | "text" | "fullpage";
  footerInfo?: FooterInfo | null;
}

export interface ArticleFooterProps {
  footerInfo?: FooterInfo | null;
  className?: string;
}