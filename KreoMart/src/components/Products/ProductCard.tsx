"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Icon from "../../../public/assets/Favourite=False.png";
import LikedIcon from "../../../public/assets/Favourite-liked.png";
import placeholder from "../../../public/assets/placeholder.png";

import { BestSellerResult } from "../../../typings";
import { getApis } from "@/api/client";
import Link from "next/link";
import route from "@/routes";

interface ProductCardProps {
  product: BestSellerResult;
}
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  console.log(product, "product");
  const [liked, setLiked] = useState(false);
  const router = useRouter();

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  return (
    <Link href={` ${route.Product}/${product.product?.slug}`}>
      <div className="w-[100%] cursor-pointer ">
        <div className="w-full relative h-auto">
          <div className="   flex-shrink-0   overflow-hidden">
            <div className="flex aspect-[11/15] w-full  ">
              <Image
                placeholder="blur"
                blurDataURL={placeholder?.src}
                src={product?.product?.preview_image}
                alt="Product Image"
                className="object-cover  w-full h-full  "
                width={260}
                height={320}
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </div>
          </div>

          {/* <Image
            className="absolute bottom-5 right-5 cursor-pointer"
            src={liked ? LikedIcon : Icon}
            onClick={handleLikeClick}
            alt="Like"
          /> */}
        </div>
        <div className="cursor-pointer gap-2">
          <div>
            <div className="text-lg leading-[130%] text-gray-default ">
              {product.product?.name}
            </div>

            <span className=" text-base font-medium text-primary-500 mr-2">
              ₹ {product.product?.product_variant?.[0]?.discount_price}
            </span>
            <span className="line-through text-base font-medium text-gray-500 mr-2">
              ₹ {product.product?.product_variant?.[0]?.price}
            </span>
          </div>
          {/* <div>
            <button className="w-2 h-2 mx-0.5 rounded-full bg-red-default text-white hover:bg-blue-600 focus:outline-none"></button>
            <button className="w-2 h-2 mx-0.5 rounded-full bg-orange-default text-white hover:bg-blue-600 focus:outline-none"></button>
            <button className="w-2 h-2 mx-0.5 rounded-full bg-blue-default text-white hover:bg-blue-600 focus:outline-none"></button>
            <button className="w-2 h-2 mx-0.5 rounded-full bg-yellow-default text-white hover:bg-blue-600 focus:outline-none"></button>
            <button className="w-2 h-2 mx-0.5 rounded-full bg-secondary text-white hover:bg-blue-600 focus:outline-none"></button>
          </div> */}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
