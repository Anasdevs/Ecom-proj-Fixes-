"use client";
import React, { useState } from "react";
import Image from "next/image";
import imgrp from "../../../public/assets/Imgrp.png";
import Icon from "../../../public/assets/Favourite=False.png";
import LikedIcon from "../../../public/assets/Favourite-liked.png";

import { GetFavResult } from "../../../typings";
interface Props {
  Favdata: GetFavResult;
}
const Products: React.FC<Props> = ({ Favdata }) => {
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  return (
    <div className="w-[200px] text-[12px]">
      <div className="relative">
        <Image
          className="object-cover w-full h-auto mr-0"
          src={Favdata.product.preview_image}
          alt="product-related"
          width={260}
          height={320}
        />
        <Image
          className="absolute bottom-5 right-5 cursor-pointer"
          src={liked ? LikedIcon : Icon}
          onClick={handleLikeClick}
          alt="Like"
        />
      </div>
      <div>
        <div className="text-lg text-primary font-normal ">
          {Favdata.product.name}
        </div>
        <span className="text-base">
          ₹{Favdata.product.product_variant[0].price}
        </span>
        {""}
        <span className="line-through font-medium text-gray-500 mr-2 text-base">
          ₹{Favdata.product.product_variant[0].discount_price}
        </span>
      </div>
      <div>
        <button className="w-2 h-2 mx-0.5 rounded-full bg-red-default text-white hover:bg-blue-600 focus:outline-none"></button>
        <button className="w-2 h-2 mx-0.5 rounded-full bg-orange-default text-white hover:bg-blue-600 focus:outline-none"></button>
        <button className="w-2 h-2 mx-0.5 rounded-full bg-blue-default text-white hover:bg-blue-600 focus:outline-none"></button>
        <button className="w-2 h-2 mx-0.5 rounded-full bg-yellow-default text-white hover:bg-blue-600 focus:outline-none"></button>
        <button className="w-2 h-2 mx-0.5 rounded-full bg-secondary text-white hover:bg-blue-600 focus:outline-none"></button>
      </div>
    </div>
  );
};

export default Products;
