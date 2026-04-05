/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useEpaperData.ts
import { useState, useEffect } from "react";

export function useEpaperData(date: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
        const response = await fetch(`${baseUrl}/epaper`);

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const result = await response.json();
        const epaper = result.data;

        // Transform data
        const transformedData = {
          original: epaper,
          pages:
            epaper?.pages?.map((page: any) => ({
              id: page.pageNumber,
              pageNumber: page.pageNumber,
              image: page.image,
              thumbnail: page.thumbnail,
              articles:
                page.articles?.map((article: any) => ({
                  id: article.id,
                  title: article.title,
                  x: article.x,
                  y: article.y,
                  width: article.width,
                  height: article.height,
                  articleImage: article.articleImage,
                  content: article.content,
                  category: article.category,
                })) || [],
            })) || [],
          meta: {
            date: epaper?.date,
            title: epaper?.title,
            isActive: epaper?.isActive,
          },
        };

        setData(transformedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (date) {
      fetchData();
    }
  }, [date]);

  return { data, loading, error };
}
