"use client";

import NewsPaper from "@/components/ui/home/e-paper/NewsPaper";
import NewsTopBar from "@/components/ui/home/NewsTopBar";
export default function NewspaperViewer() {
  return (
    <div>
      <NewsTopBar />
      <NewsPaper />
    </div>
  );
}
