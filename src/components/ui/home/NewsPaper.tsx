/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { epaperData } from "@/data/epaperData";
import LeftSidebar from "./e-paper/LeftSidebar";
import MiddleViewer from "./e-paper/MiddleViewer";
import RightViewer from "./RightViewer";

export default function EPaperPage() {
  const [selectedPage, setSelectedPage] = useState(epaperData[0]);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      {/* LEFT */}
      <div className="col-span-2">
        <LeftSidebar
          data={epaperData}
          onSelect={(page) => {
            setSelectedPage(page);
            setSelectedArticle(null);
          }}
        />
      </div>

      {/* MIDDLE */}
      <div className="col-span-6">
        <MiddleViewer
          page={selectedPage}
          onSelectArticle={setSelectedArticle}
        />
      </div>

      {/* RIGHT */}
      <div className="col-span-4">
        <RightViewer article={selectedArticle} />
      </div>
    </div>
  );
}
