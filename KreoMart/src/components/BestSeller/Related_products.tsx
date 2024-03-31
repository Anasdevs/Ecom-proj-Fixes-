"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import placeholder from "../../../public/assets/placeholder.png";
import { RelatedProduct } from "../../../typings";
import { UseCartStore } from "@/store/store";
import WishlistButton from "../shared/WishlistButton ";
import Link from "next/link";
import route from "@/routes";
import Swiper from "swiper";

interface RelatedProductsProps {
  category?: string;
  product_id?: number;
}

const Related_products: React.FC<RelatedProductsProps> = ({
  category,
  product_id,
}) => {
  const [liked, setLiked] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<
    RelatedProduct | undefined
  >();
  const { getRelatedProd } = UseCartStore((state) => ({
    getRelatedProd: state.getRelatedProd,
  }));

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const response = await getRelatedProd(product_id, category);
        setRelatedProducts(response);
      } catch (error) {
        console.log("Related Product error on fetching data: ", error);
      }
    };
    fetchRelated();
  }, [category, getRelatedProd, product_id]);

  // const handleLikeClick = () => {
  //   setLiked(!liked);
  // };

  useEffect(() => {
    if (!relatedProducts?.results) return;

    const swiper = new Swiper(".swiper-container", {
      loop: true,
      autoplay: {
        delay: 1000,
        disableOnInteraction: false,
      },
      slidesPerView: 2,
      spaceBetween: 20,
      keyboard: {
        enabled: true,
      },
      mousewheel: true,
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 10,
        },

        480: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },
      // Add other Swiper options here
    });

    // Ensure swiper is destroyed when component unmounts
    return () => {
      swiper.destroy();
    };
  }, [relatedProducts]);

  if (!relatedProducts?.results || relatedProducts.results.length === 0)
    return null;

  return (
    <main className="xl:max-w-[1100px] mx-auto">
      <div className="flex justify-between px-6">
        <div className="font-semibold md:text-4xl text-2xl py-10 text-gray-default ">
          You may also like
        </div>
      </div>
      <div className="overflow-hidden  swiper-container">
        <div className="flex transition-transform ease-out duration-500  swiper-wrapper">
          {relatedProducts.results.map((item: any, i) => (
            <Link
              href={` ${route.Product}/${item.slug}`}
              className="w-full sm:w-1/6 md:w-1/3 lg:w-1/4  h-auto m-4 text-[12px] swiper-slide"
              key={i}
            >
              <div className="relative w-full h-400 justify-center mx-auto">
                <div className="   flex-shrink-0   overflow-hidden">
                  <div className="flex aspect-[11/15] w-full  ">
                    <Image
                      placeholder="blur"
                      blurDataURL={placeholder.src}
                      src={item.preview_image}
                      alt="Product Image"
                      className="object-cover  w-full h-full  "
                      width={260}
                      height={320}
                    />
                  </div>
                </div>
                {/* <div className="absolute bottom-5 right-5 cursor-pointer">
                  <WishlistButton onToggle={handleLikeClick} isLiked={liked} />
                </div> */}
              </div>

              <div className="cursor-pointer gap-2">
                <div>
                  <div className="text-lg leading-[130%] text-gray-default ">
                    {item.name}
                  </div>
                  <div
                    className="text-lg leading-[130%] text-gray-default overflow-hidden max-h-[40px]"
                    dangerouslySetInnerHTML={{
                      __html: item.short_description,
                    }}
                  ></div>
                  <span className=" text-base font-medium text-primary-500 mr-2">
                    ₹{" "}
                    {item.product_variant.length > 0 &&
                      item.product_variant[0].discount_price}
                  </span>
                  <span className="line-through text-base font-medium text-gray-500 mr-2">
                    ₹{" "}
                    {item.product_variant.length > 0 &&
                      item.product_variant[0].price}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Related_products;
