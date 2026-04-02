/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";

export default function LeftSidebar({ data, onSelect }: any) {
  return (
    <div className="h-screen overflow-y-auto space-y-3">
      {data.map((item: any) => (
        <div
          key={item.id}
          onClick={() => onSelect(item)}
          className="cursor-pointer border rounded-lg overflow-hidden hover:shadow"
        >
          <Image src={item.image} alt="" className="w-full h-auto" />
          <p className="text-xs text-center py-1">{item.title}</p>
        </div>
      ))}
    </div>
  );
}
