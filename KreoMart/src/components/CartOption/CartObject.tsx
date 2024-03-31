"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

// import img2 from "../../../public/assets/img2.png";
// import Icon from "../../../public/assets/Favourite=False.png";
// import LikedIcon from "../../../public/assets/Favourite-liked.png";

import { useRouter } from "next/navigation";
import { UseCartStore } from "@/store/store";
import { CartData, CartResult } from "../../../typings";
import route from "@/routes";
import Link from "next/link";
import WishlistButton from "../shared/WishlistButton ";
import { DropdownMenuSeparator } from "../ui/dropdown-menu";
import Icon from "../shared/Icon";

interface Props {
  data: CartData;
  quantity: any
  setQuantity: any
}

const CartObject: React.FC<Props> = ({ data, quantity, setQuantity }) => {
  const [liked, setLiked] = useState(false);
  const { cart, remOneCart, getAllCart, increaseCartQuant, decreaseCartQuant } =
    UseCartStore((state) => ({
      cart: state.cart,
      remOneCart: state.remOneCart,
      getAllCart: state.getAllCart,
      increaseCartQuant: state.increaseCartQuant,
      decreaseCartQuant: state.decreaseCartQuant,
    }));

  // useEffect(() => {
  //   getAllCart();
  // }, [quantity]);

  // useEffect(() => {
  //   console.log("Cart State has changed:", cart);
  // }, [cart]);

  const handleRemove = async () => {
    try {
      const response = await remOneCart(data.id);
    } catch (err) {
      console.error("Error in handleRemove:", err);
      return err;
    }
  };

  const handleQuantityChange = async (newQuantity: number) => {
    try {
      if (newQuantity > data.quantity) {
        await increaseCartQuant(data.id, newQuantity - data.quantity);
      } else if (newQuantity < data.quantity) {
        await decreaseCartQuant(data.id, data.quantity - newQuantity);
      }

      setQuantity(newQuantity);
    } catch (error) {
      console.error("Error in handleQuantityChange:", error);
    }
  };

  return (
    <div>
      <div className="flex gap-4 text-[14px] w-full mb-4">
        <Link href={`/product/${data.product_variant.product.slug}`}>
          <div className=" cursor-pointer">
            <Image
              src={data.product_variant.preview_image}
              alt="women"
              className="object-cover h-full"
              width={150}
              height={160}
            />
          </div>
        </Link>
        <div className="w-full text-lg font-normal text-gray-default">
          <div className="flex justify-between">
            <div className="relative">
              <div className="flex-row ">
                <div className="mb-1 text-start ">
                  {data.product_variant?.product.name}{" "}
                </div>
              </div>

              <div>
                <div className="flex gap-4 mt-4 ">
                  <div className="flex">
                    <div className="mr-1 text-gray-500">Color: </div>
                    <div className="text-gray-default">
                      {data.product_variant.color}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="mr-1 text-gray-500">Size: </div>
                    <div className="text-gray-default">
                      {data.product_variant.size}
                    </div>
                  </div>
                </div>
                <div className=" mt-4">
                  <div className="flex">
                    <select
                      id="quantity"
                      name="quantity"
                      value={data.quantity}
                      onChange={(e) =>
                        handleQuantityChange(Number(e.target.value))
                      }
                      className="w-[70px] h-[30px] px-2 py-1 my-2 border focus:bg-white text-base focus:outline-none"
                    >
                      {[...Array(10).keys()].map((num) => (
                        <option key={num + 1} value={num + 1}>
                          {num + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-1 mr-4  ">
              <h1>₹{data.product_variant.discount_price}.00</h1>
              {/* <h2 className="line-through text-gray-500">
                {data
                  .product_variant.price}
              </h2> */}
            </div>
          </div>
          <div className="flex gap-6 mt-4">
            {/* <div className="flex gap-2  ">
              <WishlistButton onToggle={handleLikeClick} isLiked={liked} />
              <span>Add to Favourite</span>
            </div> */}

            <div
              className="flex cursor-pointer items-center  "
              onClick={handleRemove}
            >
              <span>
                <Icon name={"Close"} size={20} />
              </span>
              <a className=" text-gray-500 ml-1 ">Remove</a>
            </div>
          </div>
        </div>
      </div>
      <DropdownMenuSeparator className="border-t border-gray-400 my-8" />
    </div>
  );
};

export default CartObject;
