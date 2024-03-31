import route from "@/routes";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Icon from "../shared/Icon";
import { UseCartStore } from "@/store/store";
import { MyOrder } from "../../../typings";

import placeholder from "../../../public/assets/placeholder.png";
import { postApis } from "@/api/client";

const OrderCard = () => {
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

  // const handleCancelOrder = async (orderId: number) => {
  //   try {
  //     // Call the API function to cancel the order
  //     const cancelResponse = await postApis.postCancelorder(orderId);

  //     // Check if the cancellation was successful
  //     if (cancelResponse?.status === 200) {
  //       console.log("Order cancelled successfully!");
  //       // Handle the cancellation as needed, such as updating UI or showing a success message
  //     } else {
  //       console.error("Order cancellation failed");
  //       // Handle the failure, such as displaying an error message to the user
  //     }
  //   } catch (error) {
  //     console.error("Error cancelling order:", error);
  //     // Handle the error, such as displaying an error message to the user
  //   }
  // };

  const handleCancelOrder = async (orderId: number) => {
    try {
      // Call the API function to cancel the order
      const cancelResponse = await postApis.postCancelorder(orderId);

      // Check if the cancellation was successful
      if (cancelResponse?.status === 200) {
        console.log("Order cancelled successfully!");

        // Update the order status in the state
        const updatedOrders = Allorder.map((item) => {
          if (item.id === orderId) {
            return { ...item, status: "Cancelled" };
          }
          return item;
        });
        setAllOrder(updatedOrders);
      } else {
        console.error("Order cancellation failed");
        // Handle the failure, such as displaying an error message to the user
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      // Handle the error, such as displaying an error message to the user
    }
  };

  return (
    <div>
      <div className="md:w-[500px] lg:w-[800px]   self-stretch flex flex-col items-center justify-start gap-2  text-gray-600">
        {Allorder.map((item: any, index: number) => {
          return (
            <div
              className="self-stretch w-full h-auto flex flex-row p-6 items-start justify-start gap-6 mb-6 bg-white my-2 "
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
              <div className="flex-1 h-auto  flex flex-col items-start justify-between">
                <div className="self-stretch flex-col flex md:flex-row items-baseline justify-start gap-2 md:gap-[16px] text-lg text-gray-default">
                  <div className="flex-1 relative tracking-[-0.4px] leading-[130%] text-lg font-bold">
                    {item.status}
                  </div>
                  <div className="relative  md:text-lg  text-gray-600 text-left md:text-right">
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
                    <Icon name={"ArrowRight"} size={24} />
                  </Link>
                </div>
                <div
                  className=" flex my-10
                 justify-center"
                >
                  <button
                    className="bg-primary py-2 px-6 text-white justify-center"
                    onClick={() => handleCancelOrder(item.id)}
                  >
                    Cancel order
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderCard;
