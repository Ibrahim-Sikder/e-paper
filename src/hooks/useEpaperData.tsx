// hooks/useEpaperData.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

export interface EpaperPage {
  id: string;
  pageNumber: number;
  image: string;
  thumbnail: string;
  epaperDate: string;
  epaperTitle: string;
  edition?: string;
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
  }[];
}

export interface EpaperData {
  pages: EpaperPage[];
  meta: { total: number; date: string; title: string };
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

        const queryString = params.toString();
        const url = `${baseUrl}/epaper${queryString ? `?${queryString}` : ""}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch epaper data");

        const result = await response.json();
        const epapers: any[] = result?.data?.epapers || [];

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
              epaperDate: epaper.date,
              epaperTitle: epaper.title,
              edition: epaper.edition || "", // ✅
              articles:
                page.articles?.map((a: any) => ({
                  id: a.id,
                  title: a.title,
                  x: a.x,
                  y: a.y,
                  width: a.width,
                  height: a.height,
                  articleImage: a.articleImage,
                  content: a.content || "",
                  category: a.category || "জাতীয়",
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
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filter?.date, filter?.edition]);

  return { data, loading, error };
}
