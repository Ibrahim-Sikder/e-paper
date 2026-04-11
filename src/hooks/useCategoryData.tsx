/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

interface UseSpecificCategoryDataProps {
  slug?: string;
  limit?: string;
}

export const useCategoryData = ({
  slug,
  limit = "30",
}: UseSpecificCategoryDataProps) => {
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = new URL(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/categories`,
        );
        const params = new URLSearchParams({});

        if (slug) params.append("slug", slug);
        if (limit) params.append("limit", limit);

        url.search = params.toString();

        const response = await fetch(url.toString(), { cache: "no-store" });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (!data?.data?.categories) {
          throw new Error("No news data found!");
        }

        setCategoryData(data.data.categories);
      } catch (err: any) {
        setError(err.message || "Failed to load category data!");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [slug]);

  return { categoryData, loading, error };
};
