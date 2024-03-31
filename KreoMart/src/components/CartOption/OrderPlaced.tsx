import React from "react";
import Link from "next/link";
import route from "@/routes";
import PrimaryButton from "../shared/Button/PrimaryButton";
import Button from "../shared/Button/Button";
import Icon from "../shared/Icon";
import Image from "next/image";

const OrderPlaced = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start gap-[48px] text-center text-13xl text-gray-default font-medium p-6 md:p-10  mt-10">
      <Image
        className="relative overflow-hidden shrink-0"
        alt=""
        height={100}
        width={100}
        src="/assets/done 2.svg"
      />
      <div className="self-stretch flex flex-col items-center justify-start gap-[16px]">
        <div className="self-stretch relative tracking-[-0.6px] leading-[120%] text-base">
          Order Placed!
        </div>
        <div className="self-stretch relative text-base leading-[130%] text-grey-scale-carbon-gray">
          <p className="m-0">
            Thank’s for your order at Kreomart e-commerce. Your order will be
            processed as soon as possible.
          </p>
          {/* <p className="m-0">Your order number is ORDR31796HGU.</p> */}
          <p className="m-0">
            You will be receiving an email shortly with an invoice for your
            order.
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-start gap-[32px] text-sm">
        <Link href={route.Products}>
          <PrimaryButton className="flex flex-row items-center w-[186px] h-[52px] justify-center py-4 px-6 gap-[8px] border-[1px] border-solid border-grey-scale-black-russian">
            {/* <img
            className="relative w-5 h-5 overflow-hidden shrink-0"
            alt=""
            src="/assets/arrow-left.svg"
          /> */}
            <Icon name={"arrow-left"} size={20} />
            <div className="relative leading-[130%] text-lg">
              Back to shopping
            </div>
          </PrimaryButton>
        </Link>
        {/* <Link href={route.OrderDetails}>
          <Button className="bg-primary-cetacean-blue-10 w-[186px] h-[52px] flex flex-row items-center justify-center py-4 px-6 box-border text-grey-scale-white">
            <div className="relative leading-[130%] text-lg">
              Track your order
            </div>
          </Button>
        </Link> */}
      </div>
      {/* <div>
        <Link href={route.Products}>
          <PrimaryButton className="my-4 bg-primary-cetacean-blue-10 text-grey-scale-white py-2 px-4 rounded-md">
            Back to Shopping
          </PrimaryButton>
        </Link>
        <Link href={route.OrderDetails}>
          <Button className="my-4 bg-primary-cetacean-blue-10 text-grey-scale-white py-2 px-4 rounded-md">
            Track your order
          </Button>
        </Link>
      </div> */}
    </div>
  );
};

export default OrderPlaced;
