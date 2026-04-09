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
  epaperDate: string; // Changed from optional to required
  epaperTitle: string; // Changed from optional to required
  edition?: string;
  footerInfo?: {
    editor: string;
    publisher: string;
    organization: string;
    copyright: string;
  };
}

export interface EpaperData {
  pages: EpaperPage[];
  meta: {
    total: number;
    date: string;
    title: string;
  };
  footerInfo?: {
    editor: string;
    publisher: string;
    organization: string;
    copyright: string;
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

export interface PaginationProps {
  pages: any[];
  activeIndex: number;
  currentPageNumber: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface EditionSelectorProps {
  editions: string[];
  pages: any[];
  currentEdition?: string;
  displayEdition: string;
  onEditionChange?: (edition: string) => void;
}

export interface ShareButtonProps {
  activePage?: any;
}

export interface leftSideProps {
  pages: EpaperPage[];
  activeIndex: number;
  onPageSelect: (page: EpaperPage) => void;
}

export interface DatePickerProps {
  currentDate?: string;
  availableDates: string[];
  onDateChange?: (date: string) => void;
}