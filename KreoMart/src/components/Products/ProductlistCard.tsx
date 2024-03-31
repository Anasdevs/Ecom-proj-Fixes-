"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import placeholder from "../../../public/assets/placeholder.png";
import { product_data } from "../../../typings";
import Link from "next/link";
import route from "@/routes";
import WishlistButton from "../shared/WishlistButton ";
import NoData from "../shared/NoData";

interface ProductListCardProps {
  product: product_data;
}

const ProductListCard: React.FC<ProductListCardProps> = ({ product }) => {
  console.log(product, "product");
  console.log(product.product_variant[0], "product variant");
  const [liked, setLiked] = useState(false);
  const router = useRouter();

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const isOutOfStock = product.product_variant[0]?.quantity <= 0;

  console.log(" Product is outofstock : ", isOutOfStock);

  return (
    <Link href={` ${route.Product}/${product.slug}`}>
      <div
        className={`w-[100%] cursor-pointer ${
          isOutOfStock ? " opacity-50" : ""
        }`}
      >
        <div className="w-full relative h-auto">
          <div className="   flex-shrink-0   overflow-hidden">
            <div className="flex aspect-[11/15] w-full  ">
              <Image
                placeholder="blur"
                blurDataURL={placeholder.src}
                src={product.preview_image}
                alt="Product Image"
                className="object-cover  w-full h-full  "
                width={260}
                height={320}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </div>
          </div>
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center text-white  w-full text-xl  font-bold bg-bannerOverlay ">
              <p className=" flex items-center justify-center text-white  w-full text-xl bg-red-default">
                Out of Stock
              </p>
            </div>
          )}
          {/* <div className="absolute bottom-5 right-5 cursor-pointer">
            <WishlistButton onToggle={handleLikeClick} isLiked={liked} />
          </div> */}
        </div>
        <div className="cursor-pointer gap-2">
          <div>
            <div className="text-lg leading-[130%] text-gray-default ">
              {product.name}
            </div>
            <div
              className="text-lg leading-[130%] text-gray-default overflow-hidden max-h-[40px]"
              dangerouslySetInnerHTML={{ __html: product.short_description }}
            ></div>
            <span className=" text-base font-medium text-primary-500 mr-2">
              ₹{" "}
              {product.product_variant.length > 0 &&
                product.product_variant[0].discount_price}
            </span>
            <span className="line-through text-base font-medium text-gray-500 mr-2">
              ₹{" "}
              {product.product_variant.length > 0 &&
                product.product_variant[0].price}
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

export default ProductListCard;
