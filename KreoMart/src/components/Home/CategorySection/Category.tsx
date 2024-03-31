"use client";

import { Category } from "../../../../typings";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay } from "swiper/modules";
import CategoryCard from "./CategoryCard";

export const Categories = ({ data }: { data: Category | undefined }) => {
  console.log(data, "data is comming");
  return (
    <>
      <div className="relative  w-full  items-start justify-start mb-[52px] mt-[52px] box-border gap-[24px] text-left text-13xl text-gray-default font-medium-18">
        <div className="flex mb-16  justify-between  items-start  box-border ">
          <h1 className="  relative text-3xl font-bold tracking-[-0.6px] leading-[120%]  text-left inline-block text-gray-default">
            Shop By Category
          </h1>
          {/* <Pagination /> */}
        </div>
        <Swiper
          slidesPerView={5}
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
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 5,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
          loop
        >
          {data &&
            data?.results?.map((ele) => {
              console.log(ele, "in map");
              return (
                <SwiperSlide key={ele.id}>
                  <CategoryCard data={ele} />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </>
  );
};
