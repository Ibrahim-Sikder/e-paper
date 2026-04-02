import React from "react";
import Container from "@/components/share/container";
import ScrollableImageList from "./e-paper/ScrollableImageList";
import { newspaperData } from "@/components/newspaperData";
import MiddleSwiper from "./e-paper/MiddleSwiper";
export default function NewsPaper() {
  return (
    <Container>
      <div className="grid grid-cols-12 gap-4">
        {/* Left Column - Scrollable Images */}
        <div className="col-span-2">
          <ScrollableImageList data={newspaperData} />
        </div>

        {/* Middle Column - Swiper Slider */}
        <div className="col-span-5">
          <MiddleSwiper />
          {/* OR for thumbnails version: */}
          {/* <MiddleSwiperWithThumbs /> */}
        </div>

        {/* Right Column */}
        <div className="col-span-5">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Side Content</h2>
            <p>Your side content goes here...</p>
          </div>
        </div>
      </div>
    </Container>
  );
}
