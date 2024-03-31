"use client";

import route from "@/routes";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Icon from "../shared/Icon";
import placeholder from "../../../public/assets/placeholder.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { UseCartStore } from "@/store/store";
import { MyOrder } from "../../../typings";
import Breadcrumb from "../shared/Breadcrumb/Breadcrumb";
import Breadcrumbs from "../shared/Breadcrumb/Breadcrumb";
import SideBar from "./SideBar";
import OrderCard from "./OrderCard";

const OrderHistory = () => {
  const [Allorder, setAllOrder] = useState<MyOrder[]>([]);
  const { order, getAllOrder } = UseCartStore((state) => ({
    order: state.order,
    getAllOrder: state.getAllOrder,
  }));

  useEffect(() => {
    const fetchorders = async () => {
      const response = await getAllOrder();
      if (response) {
        setAllOrder(response);
      }
    };
    fetchorders();
  }, [getAllOrder]);
  console.log("this is cart store data: ", order);

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" });

    const getOrdinalSuffix = (number: number) => {
      if (number >= 11 && number <= 13) {
        return "th";
      }
      const lastDigit = number % 10;
      switch (lastDigit) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    // Format the date as desired
    const ordinalSuffix = getOrdinalSuffix(day);
    const formattedDate = `${day}${ordinalSuffix} ${new Intl.DateTimeFormat(
      "en-US",
      {
        month: "short",
      }
    ).format(date)} ${year}, ${dayOfWeek}`;

    return formattedDate;
  };

  return (
    <div>
      <div className=" hidden md:block">
        <div className="flex flex-row items-center justify-center mt-4 text-lg font-medium">
          <Breadcrumbs
            paths={[
              { label: "Home" },
              { label: "My Orders", href: route.OrderHistory },
            ]}
          />
        </div>
        <div className="flex justify-center gap-12 p-20">
          {/* <div className=" bg-white p-4 relative h-2/5 gap-12">
            <div className="flex w-96 justify-between items-center text-lg font-medium mb-5">
              <div>My Orders</div>
              <Link href={route.OrderHistory}>
                <Icon name="ArrowRight" size={24} />
              </Link>
            </div>
            <div className="flex w-96 justify-between items-center text-lg my-5">
              <div>Account settings</div>
              <Link href={route.Profile}>
                <Icon name="ArrowRight" size={24} />
              </Link>
            </div>
            <div className="flex w-96 justify-between items-center text-lg my-5">
              <div>Contact us</div>
              <Link href={route.Contact}>
                <Icon name="ArrowRight" size={24} />
              </Link>
            </div>
            <div className="flex w-96 justify-between items-center text-lg my-5">
              <button>Log out</button>
            </div>
          </div> */}
          <SideBar activeTab={"OrderHIstory"} />
          <div className="md:w-[500px] lg:w-[800px] flex flex-col items-center justify-start gap-[24px] text-sm">
            <div className="self-stretch flex flex-row items-start justify-center gap-[24px] text-base">
              <div className="flex-1 items-center  box-border  overflow-hidden flex flex-row p-3  justify-end gap-[12px] border-[1px] border-solid border-gray-500 text-gray-600">
                <Icon name={"search"} size={20} />
                <input
                  type="text"
                  placeholder=" Search in orders"
                  className="flex-1 relative leading-[130%] bg-transparent outline-none flex items-center h-[22.67px] bg-background"
                />
              </div>
              <Dialog>
                <DialogTrigger
                  asChild
                  className="flex flex-row py-4 items-center justify-center gap-1 text-gray-default border-[1px]  border-solid border-gray-500"
                >
                  <Button
                    variant="outline"
                    className="relative  text-lg font-normal py-7 rounded-none justify-center text-center items-center"
                  >
                    {" "}
                    Filter <Icon name={"Filters"} size={20} />{" "}
                  </Button>
                </DialogTrigger>
                <DialogContent className="right-3/4 top-20 center transform  h-56 ">
                  <DialogHeader>
                    <DialogTitle> Status</DialogTitle>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
            {/* <div className="  self-stretch flex flex-col items-center justify-start gap-2  text-gray-600">
              {Allorder.map((item: any, index: number) => {
                return (
                  <div
                    className="self-stretch  flex flex-row p-6 items-start justify-start gap-6 mb-6 bg-white my-2 "
                    key={index}
                  >
                    <Image
                      alt=""
                      src={item.product.preview_image}
                      placeholder="blur"
                      blurDataURL={placeholder.src}
                      width={98}
                      height={115}
                    />
                    <div className="flex-1 h-[115px] flex flex-col items-start justify-between">
                      <div className="self-stretch flex flex-row items-baseline justify-start gap-[16px] text-lg text-gray-default">
                        <div className="flex-1 relative tracking-[-0.4px] leading-[130%] text-lg font-bold">
                          {item.status}
                        </div>
                        <div className="relative text-lg leading-[130%] text-gray-600 text-right">
                          Order ID: {item.order_id}
                        </div>
                      </div>
                      <div className="self-stretch flex flex-col items-start justify-start gap-2 text-lg  text-gray-600">
                        <div className="self-stretch relative leading-[130%]">
                          {item.product.product.name}
                        </div>
                        <div className="self-stretch relative leading-[130%]">
                          Size: {item.product.size}
                        </div>
                      </div>
                      <div className="self-stretch flex flex-row items-center justify-start  gap-6">
                        <div className="flex-1 relative leading-[130%] text-lg text-gray-600">
                          {formatDate(item.created)}
                        </div>
                        <Link
                          href={{
                            pathname: route.OrderDetails,
                            query: { orderId: item.id },
                          }}
                        >
                          <Image
                            className="relative w-6 h-6 overflow-hidden shrink-0 object-cover"
                            alt=""
                            src="/assets/Arrow Right.png"
                            width={24}
                            height={24}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div> */}
            <OrderCard />
            <div className="flex flex-row py-4 px-6 items-center justify-center text-base text-center text-gray-default border-[1px] border-solid border-gray-default">
              <div className="relative leading-[130%]">Load more</div>
            </div>
          </div>
        </div>
      </div>

      {/*  mobile view  */}

      <div className="block md:hidden ">
        <div className="flex flex-row items-center justify-center mt-4 text-lg font-medium">
          <Breadcrumbs
            paths={[
              { label: "Home" },
              { label: "My Orders", href: route.OrderHistory },
            ]}
          />
        </div>

        <div className=" flex flex-col items-center justify-start gap-[24px] text-sm text-gray-500 p-8">
          <div className="self-stretch flex flex-row items-start justify-center gap-[24px] text-base">
            <div className="flex-1 bg-background box-border  overflow-hidden flex flex-row p-3 items-end justify-end gap-[12px] border-[1px] border-solid border-gray-500">
              <Icon name={"search"} size={20} />
              <input
                type="text"
                placeholder=" Search in orders"
                className=" flex-1 relative leading-[130%] flex items-center h-[22.67px] outline-none bg-background text-gray-600 "
              />
            </div>
            <div className=" flex flex-row p-3 items-center justify-center gap-[4px] text-gray-700 border-[1px] border-solid border-gray-500">
              <div className="relative leading-[130%]">Filter</div>

              <Icon name={"Filters"} size={20} />
            </div>
          </div>
          <div className="self-stretch flex flex-col items-center justify-start gap-[8px] text-gray-500 text-base font-normal">
            <OrderCard />
          </div>
          <div className="flex flex-row py-4 px-6 items-center justify-center text-center text-gray-default border-2 border-solid border-gray-default">
            <div className="relative leading-[130%] text-base font-normal">
              Load more
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
