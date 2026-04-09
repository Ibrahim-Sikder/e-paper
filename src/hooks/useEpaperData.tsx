/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

export interface EpaperPage {
  id: string;
  pageNumber: number;
  image: string;
  thumbnail: string;
  originalWidth: number;
  originalHeight: number;
  epaperDate: string;
  epaperTitle: string;
  edition?: string;
  footerInfo?: {
    editor: string;
    publisher: string;
    organization: string;
    copyright: string;
  };
  articles: {
    id: string;
    title: string;
    x: number;
    y: number;
    width: number;
    height: number;
    articleImage: string;
    content: string;
    category: string;
    newsId?: string;
    newsSlug?: string;
  }[];
}

export interface EpaperData {
  pages: EpaperPage[];
  meta: { total: number; date: string; title: string };
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

export function useEpaperData(filter?: EpaperFilter) {
  const [data, setData] = useState<EpaperData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
        const params = new URLSearchParams();
        if (filter?.date) params.set("date", filter.date);
        if (filter?.edition) params.set("edition", filter.edition);
        params.set("isActive", "true");

        const queryString = params.toString();
        const url = `${baseUrl}/epapers${queryString ? `?${queryString}` : ""}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch epaper data");

        const result = await response.json();
        const epapers: any[] = result?.data?.epapers || result?.epapers || [];

        if (!epapers.length) {
          setData(null);
          return;
        }

        const allPages: EpaperPage[] = [];

        epapers.forEach((epaper) => {
          epaper.pages?.forEach((page: any) => {
            allPages.push({
              id: `${epaper._id}_${page.pageNumber}`,
              pageNumber: page.pageNumber,
              image: page.image,
              thumbnail: page.thumbnail,
              originalWidth: page.originalWidth || 1200,
              originalHeight: page.originalHeight || 1800,
              epaperDate: epaper.date,
              epaperTitle: epaper.title,
              edition: epaper.edition || "",
              footerInfo: epaper.footerInfo,
              articles:
                page.articles?.map((a: any) => ({
                  id: a.id,
                  title: a.titleSnapshot || a.title || "",
                  x: a.x || 0,
                  y: a.y || 0,
                  width: a.width || 0,
                  height: a.height || 0,
                  articleImage: a.articleImage || a.imageSnapshot || "",
                  content: a.contentSnapshot || a.content || "",
                  category: a.category || "জাতীয়",
                  newsId: a.newsId,
                  newsSlug: a.newsSlug,
                })) || [],
            });
          });
        });

        setData({
          pages: allPages,
          meta: {
            total: epapers.length,
            date: epapers[0]?.date,
            title: epapers[0]?.title,
          },
          footerInfo: epapers[0]?.footerInfo,
        });
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filter?.date, filter?.edition]);

  return { data, loading, error };
}

// Hook to fetch all available dates
export function useAvailableDates() {
  const [dates, setDates] = useState<string[]>([]);
  const [editions, setEditions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
        const res = await fetch(`${baseUrl}/epapers?limit=100`);
        if (!res.ok) return;

        const result = await res.json();
        const epapers: any[] = result?.data?.epapers || result?.epapers || [];

        const uniqueDates = [...new Set(epapers.map((e: any) => e.date))]
          .sort()
          .reverse();
        const uniqueEditions = [
          ...new Set(epapers.map((e: any) => e.edition).filter(Boolean)),
        ];

        setDates(uniqueDates);
        setEditions(uniqueEditions);
      } catch (error) {
        console.error("Failed to fetch meta:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMeta();
  }, []);

  return { dates, editions, loading };
}
