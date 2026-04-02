/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";

export default function MiddleViewer({ page, onSelectArticle }: any) {
  return (
    <div className="relative border rounded-xl overflow-hidden">
      {/* Main Image */}
      <Image src={page.image} alt="" className="w-full h-auto" />

      {/* Clickable Areas */}
      {page.articles.map((item: any) => (
        <div
          key={item.id}
          onClick={() => onSelectArticle(item)}
          className="absolute cursor-pointer"
          style={{
            top: item.y,
            left: item.x,
            width: item.width,
            height: item.height,
            background: "rgba(255,0,0,0.2)", // debug (remove later)
          }}
        />
      ))}
    </div>
  );
}
