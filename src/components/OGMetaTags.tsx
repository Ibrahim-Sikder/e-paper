"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface OGMetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function OGMetaTags({
  title = "ই-পেপার | বাংলা সংবাদপত্র",
  description = "বাংলাদেশের সকল জাতীয়, আন্তর্জাতিক, বাণিজ্য, খেলা ও বিনোদনের খবর পড়ুন",
  image = "/default-og-image.jpg",
  url,
}: OGMetaTagsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentUrl =
    url ||
    `${process.env.NEXT_PUBLIC_SITE_URL || window.location.origin}${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

  useEffect(() => {
    const updateMetaTags = () => {
      const metaTags = [
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: image },
        { property: "og:url", content: currentUrl },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "ই-পেপার" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image },
        { name: "description", content: description },
      ];

      metaTags.forEach(({ property, name, content }) => {
        let meta: HTMLMetaElement | null = null;

        if (property) {
          meta = document.querySelector(`meta[property="${property}"]`);
          if (!meta) {
            meta = document.createElement("meta");
            meta.setAttribute("property", property);
            document.head.appendChild(meta);
          }
        } else if (name) {
          meta = document.querySelector(`meta[name="${name}"]`);
          if (!meta) {
            meta = document.createElement("meta");
            meta.setAttribute("name", name);
            document.head.appendChild(meta);
          }
        }

        if (meta) {
          meta.setAttribute("content", content);
        }
      });
    };

    updateMetaTags();
  }, [title, description, image, currentUrl]);

  return null;
}
