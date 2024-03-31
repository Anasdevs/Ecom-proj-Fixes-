"use client";

import { CategResult, Category } from "../../../../typings";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay } from "swiper/modules";
import MensCategoryCard from "./MensCategoryCard";

const MensCategory = ({ data }: { data: Category | undefined }) => {
  console.log(data, "data is comming");
  const shouldRenderSlider = data && data.results && data.results.length > 4;

  return (
    <>
      <div className="relative w-full items-start justify-start mb-[52px] mt-[52px] box-border gap-[24px] text-left text-13xl text-gray-default font-medium-18">
        <div className="flex mb-16 justify-between items-start box-border">
          <h1 className="relative text-3xl font-bold tracking-[-0.6px] leading-[120%] text-left inline-block text-gray-default">
            Mens Category
          </h1>
        </div>

        {shouldRenderSlider ? (
          <Swiper
            slidesPerView={2}
            spaceBetween={20}
            keyboard
            mousewheel
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            onSwiper={(swiper) => console.log(swiper)}
            pagination={{ clickable: true }}
            // breakpoints={{
            //   320: {
            //     slidesPerView: 2,
            //     spaceBetween: 5,
            //   },
            //   480: {
            //     slidesPerView: 2,
            //     spaceBetween: 20,
            //   },
            //   768: {
            //     slidesPerView: 4,
            //     spaceBetween: 20,
            //   },
            //   1024: {
            //     slidesPerView: 2,
            //     spaceBetween: 20,
            //   },
            // }}
            loop
          >
            {data?.results?.map((ele) => (
              <SwiperSlide key={ele.id}>
                <MensCategoryCard data={ele} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="flex">
            {/* Render categories without Swiper */}
            {data?.results?.map((ele) => (
              <MensCategoryCard key={ele.id} data={ele} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
export default MensCategory;
