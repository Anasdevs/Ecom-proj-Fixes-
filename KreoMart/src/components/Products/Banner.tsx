"use client";
import route from "@/routes";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { getApis } from "@/api/client";
import { useState, useEffect } from "react";
import { ProductBanner } from "../../../typings";

interface BannerData {
  data: ProductBanner;
}

const Banner = () => {
  const [bannerData, setBannerData] = useState<ProductBanner>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getApis.getProductBanner();
        if (response) {
          setBannerData(response);
        }
        console.log("Bannerone result: ", response);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    };

    fetchData();
  }, []);
  console.log("Product Banner component result: ", bannerData);

  return (
    <Link href={route.Products}>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          dynamicBullets: true,
          clickable: true,
          renderBullet: function (index, className) {
            return `<span class="${className}" style="background-color: #F9F9FB;"></span>`;
          },
        }}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
      >
        {bannerData?.results?.map((item) => (
          <SwiperSlide key={item.order_no}>
            <Image
              className=" md:h-[250px] lg:h-[300px] w-full h-full"
              src={item.image}
              alt=""
              height={300}
              width={250}
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
              }}
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center responsive-image-container">
              {/* <h1 className="text-[25px] md:text-6xl mb-4 italic text-[#BFD9FF] font-bold text-shadow-md">
                {item.title}
              </h1>
              <div className="text-2xl md:text-4xl mb-8 italic font-bold">
                {item.sub_title}
              </div> */}
              {/* <Link href={route.Products}>
                <button className="px-4 md:px-6 py-2 md:py-4 mt-4 md:mt-4 font-bold text-lg text-primary bg-white">
                  Explore now
                </button>
              </Link> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Link>
  );
};

export default Banner;
