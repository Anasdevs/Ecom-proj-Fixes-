"use client";

import React from "react";
import Products from "../BestSeller/Products";
import Icon from "../shared/Icon";
import Image from "next/image";
import { GetFavResult } from "../../../typings";
import Link from "next/link";
import route from "@/routes";

interface Props {
  data: GetFavResult;
}

const Myfav_Card: React.FC<Props> = ({ data }) => {
  // const handleSizeChange = (newSize) => {
  //   setSize(newSize);
  // };

  return (
    <div className="w-[200px] text-[14px]">
      <Link href={`${route.Product}/${data.product.slug}`}>
        <Products Favdata={data} />
      </Link>
      <div className="">
        <select
          name="size"
          id="size-select"
          className="flex gap-2 p-2 w-full h-auto text-base"
        >
          <option value="">Select size</option>
          <option value="xs">XS</option>
          <option value="s">S</option>
          <option value="m">M</option>
          <option value="l">L</option>
          <option value="xl">XL</option>
          <option value="xxl">XXL</option>
        </select>
      </div>
      <div className=" mt-4 w-full relative bg-primary flex flex-row items-center justify-center py-4 px-6 box-border gap-[8px] text-center text-sm text-grey-scale-white font-semi-14">
        <Image
          className="relative w-5 h-5 object-cover"
          alt=""
          src="/assets/BagCart.svg"
          height={10}
          width={10}
        />
        <div className="relative leading-[130%] text-white text-base">Add</div>
      </div>
    </div>
  );
};

export default Myfav_Card;
