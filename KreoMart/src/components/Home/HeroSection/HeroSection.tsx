"use client";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import Link from "next/link";
import route from "@/routes";
import useBanners from "@/hooks/useBanners";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

interface HeroProps {}

const HeroSection: React.FC<HeroProps> = () => {
  const { data: banners } = useBanners();

  console.log(banners, "banners");

  return (
    <div className="my-4 ">
      <Swiper
        keyboard
        mousewheel
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        onSwiper={(swiper) => console.log(swiper)}
        className="carousel-container"
      >
        {banners &&
          banners?.results?.map((banner: any) => (
            <SwiperSlide key={banner?.id}>
              <Link href={route.Products}>
                <div className="  flex flex-col-reverse sm:flex-row justify-between items-center  w-full gap-16  mt-10">
                  <div className="  w-full h-full md:w-5/12  aspect-square  overflow-hidden mx-auto flex justify-center items-center pl-5">
                    <Image
                      src={banner?.image}
                      className=" w-full h-full "
                      alt="hero"
                      fill={true}
                      quality={100}
                      priority={true}
                    />
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
