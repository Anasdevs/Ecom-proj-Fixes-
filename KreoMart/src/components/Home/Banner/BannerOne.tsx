"use client";
import Image from "next/image";
import Icon from "../../shared/Icon";
import { useEffect, useState } from "react";
import Link from "next/link";
import route from "@/routes";
import { getApis } from "@/api/client";
import { BannerProduct } from "../../../../typings";

interface BannerData {
  id: number;
  product: {
    name: string;
    slug: string;
    quantity: number;
    ratings: string;
    id: number;
    color: string;
    size: string;
    price: number;
    discount_price: number;
    preview_image: string;
  }[];
  title: string;
  description: string;
  banner_img: string;
  is_active: boolean;
}

const BannerOne = () => {
  const [bannerData, setBannerData] = useState<BannerData>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getApis.getBanner1();
        if (response) {
          const bannerData: BannerData = {
            ...response.results[0],
            product: response.results[0].product.map(
              (product: BannerProduct) => ({
                ...product,
                name: "", // Add the required properties 'name' and 'slug'
                slug: "",
              })
            ),
          };
          setBannerData(bannerData);
        }
        console.log("Bannerone result: ", response);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    };

    fetchData();
  }, []);

  const bannerImage = bannerData?.banner_img || "/default-banner.jpg";

  const bannerStyle = {
    backgroundImage: `url(${bannerImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  console.log("BannerOne component result: ", bannerData);
  return (
    <Link href={`${route.Products}`}>
      <div
        className="   justify-center items-center bg-secondary p-[34px] sm:p-[52px] box-border text-gray-default text-base sm:text-3xl font-medium gap-4"
        style={bannerStyle}
      >
        <div className="flex flex-col-reverse sm:flex-row">
          <div className="flex justify-start items-center md:w-4/5 text-gray-default   ">
            <div className=" mt-8 md:w-[400px]  ">
              <div className=" text-4xl sm:text-5xl uppercase font-normal md:font-normal  ">
                {bannerData?.title}
              </div>
              <div className="mt-4 mb-14 text-lg font-medium ">
                {bannerData?.description}
              </div>
              <Link href={`${route.Products}`}>
                <button className="flex justify-center border-b item-center  border-black font-bold overflow-hidden flex-row items-center  gap-2 text-center text-xl  border-solid ">
                  <div className=" relative leading-[130%] font-medium">
                    Explore Now
                  </div>
                  <div className="">
                    <Icon name={"arrow-right"} size={24} />
                  </div>
                </button>
              </Link>
            </div>
          </div>
          {/* <div className="mx-auto">
          {bannerData?.product.map((product, index) => (
            <div
              key={index}
              className="flex md:justify-center items-center max-w-[24.5rem] sm:max-w-lg relative  object-cover shadow-white shadow-lg  "
            >
              <Image
                className="w-full"
                src={product.preview_image || "/default-product-image.jpg"}
                width={336}
                height={448}
                alt={`product-${index}`}
              />
            </div>
          ))}
        </div> */}
        </div>
      </div>
    </Link>
  );
};

export default BannerOne;
