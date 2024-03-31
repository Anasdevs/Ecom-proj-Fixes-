"use client";

import route from "@/routes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Icon from "../shared/Icon";
import Image from "next/image";
import { UseCartStore } from "@/store/store";
import { MyOrderDetails } from "../../../typings";
import { useSearchParams } from "next/navigation";
import { postApis } from "@/api/client";
import Breadcrumbs from "../shared/Breadcrumb/Breadcrumb";
import SideBar from "./SideBar";

const OrderDetail = () => {
  const { getOrderDetail } = UseCartStore((state: any) => ({
    getOrderDetail: state.getOrderDetail,
  }));
  const [detail, setDetail] = useState<MyOrderDetails>();
  const searchParams = useSearchParams();
  console.log("Search parameters:", searchParams);
  // const orderId = searchParams.get("orderId");
  const orderId = searchParams.get("orderId");
  console.log("orderid in orderdetail: ", orderId);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        if (orderId) {
          const orderIdNumber = Array.isArray(orderId)
            ? Number(orderId[0])
            : Number(orderId);
          const response = await getOrderDetail(orderIdNumber);
          if (response) {
            setDetail(response);
            console.log(response);
          } else {
            console.error("Failed to get order detail. Response is falsy.");
          }
        } else {
          console.error("orderId is not available.");
        }
      } catch (error) {
        console.error("Error fetching order detail:", error);
      }
    };
    fetchOrderDetail();
  }, [getOrderDetail, orderId]);

  // if (!orderId) {
  //   return <p>Loading...</p>;
  // }

  const formatDate = (dateString: any) => {
    try {
      const date = new Date(dateString);

      // Check if the date is valid
      if (isNaN(date.getTime())) {
        console.error("Invalid date:", dateString);
        return "Invalid Date";
      }

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
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Error";
    }
  };

  let totalSavings = 0;
  if (detail && detail?.order_details.payment_details) {
    const totalAmount = detail?.order_details.payment_details.total_amount ?? 0;
    const discountAmount =
      detail?.order_details.payment_details.discount_amount ?? 0; // Corrected
    totalSavings = totalAmount - discountAmount;
  }

  console.log(detail?.order_details);
  console.log(detail?.order_details.payment_details);

  const handleDownloadInvoice = async () => {
    try {
      // Assuming you have the `user_id` and `payment_mode` available in your component state or props
      const user_id = detail?.order_details.user;
      const payment_mode = detail?.order_details.payment_details.payment_mode;

      // Call the API function to download the invoice
      const invoiceData = await postApis.postDownloadInvoice(
        user_id,
        payment_mode
      );

      // Check if invoiceData is a valid PDF
      if (
        invoiceData instanceof Blob &&
        invoiceData.type === "application/pdf"
      ) {
        // Create a temporary <a> element to trigger the download
        const a = document.createElement("a");
        const timestamp = new Date().toISOString().replace(/[-:.]/g, ""); // Format current date and time
        const filename = `Kreo_${payment_mode}_${timestamp}.pdf`; // Construct filename with payment mode and timestamp
        a.href = window.URL.createObjectURL(invoiceData);
        a.download = filename; // Set the filename
        a.click();

        // Clean up by revoking the object URL
        window.URL.revokeObjectURL(a.href);
      } else {
        console.error(
          "Invalid invoice data. Expected a Blob of type 'application/pdf'."
        );
      }
    } catch (error) {
      console.error("Error downloading invoice:", error);
      // Handle errors, such as displaying an error message to the user
    }
  };

  return (
    <div>
      <div className="hidden md:block">
        <div className="flex flex-row items-center justify-center mt-4 ">
          <Breadcrumbs
            paths={[
              { label: "Home" },
              { label: "My Orders", href: route.OrderHistory },
              { label: "Order Details", href: route.OrderDetails },
            ]}
          />
        </div>

        <div className="flex justify-center gap-8 p-20">
          <SideBar activeTab={"OrderDetail"} />
          <div className="bg-white md:w-[500px] lg:w-[800px]  flex flex-col p-6 box-border items-start justify-start gap-[24px] text-sm">
            <div className="self-stretch flex flex-row items-start justify-start gap-[24px] text-lg">
              <div className="flex-1 relative tracking-[-0.4px] leading-[130%] font-medium">
                Order details
              </div>
              <div className="overflow-hidden flex flex-row items-center justify-center text-center text-sm text-primary border-b-[1px] border-solid border-primary">
                <button
                  className="relative leading-[130%] font-medium"
                  onClick={handleDownloadInvoice}
                >
                  Download invoice
                </button>
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start justify-start gap-[8px] text-gray-600 text-base">
              <div className="self-stretch relative leading-[130%]">
                Order ID: {detail?.order_details.order_id}
              </div>
              <div className="self-stretch relative leading-[130%]">
                Order placed: {formatDate(detail?.order_details.created)}
              </div>
            </div>
            <div className="self-stretch relative box-border h-px border-t-2 border-solid border-gray-400" />
            <div className="self-stretch flex flex-col items-start justify-start gap-2 text-right">
              <div className="relative leading-[130%] font-medium text-gray-default text-lg">
                Shipping address
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-1 text-left text-gray-600">
                <div className="self-stretch relative leading-[130%]">
                  {detail?.order_details.delivery_address.user}
                </div>
                <div className="self-stretch relative leading-[130%]">
                  {detail?.order_details.delivery_address.address_line1},{" "}
                  {detail?.order_details.delivery_address.address_line2},{" "}
                  {detail?.order_details.delivery_address.landmark},
                  {detail?.order_details.delivery_address.city},{" "}
                  {detail?.order_details.delivery_address.distic},{" "}
                  {detail?.order_details.delivery_address.state}{" "}
                  {detail?.order_details.delivery_address.pincode}
                </div>
              </div>
            </div>
            <div className="self-stretch relative box-border h-px border-t-2 border-solid border-gray-400" />
            <div className="self-stretch flex flex-col items-start justify-start gap-[8px] text-right">
              <div className="relative leading-[130%] font-medium text-gray-default">
                {detail?.order_details.quantity} item(s){" "}
                {(detail && detail?.order_status_details?.status) || "Pending"}
              </div>
              <div className="self-stretch relative leading-[130%] text-gray-600 text-left text-base">
                Package delivered: 6th May 2023, Wed
              </div>
            </div>
            <div className="self-stretch h-[102px] flex flex-col items-start justify-between relative text-gray-600">
              <div className="self-stretch flex flex-row items-center justify-start gap-6 z-[0]">
                <div className="flex-1 flex flex-row items-center justify-start gap-4">
                  <Icon name={"Success"} size={18} />
                  <div className="flex-1 relative text-base leading-[130%]">
                    Order confirmed
                  </div>
                </div>
                <div className="relative leading-[130%]  text-base text-center">
                  {formatDate(detail?.order_details.created)}
                </div>
              </div>
              <div className="self-stretch flex flex-row items-center justify-start gap-[24px] z-[1]">
                <div className="flex-1 flex flex-row items-center justify-start gap-[8px]">
                  <Icon name={"Success"} size={18} />
                  <div className="flex-1 relative leading-[130%] text-base">
                    Shipped
                  </div>
                </div>
                <div className="relative leading-[130%] text-center text-base">
                  {formatDate(detail?.order_details.created)}
                </div>
              </div>
              <div className="self-stretch flex flex-row items-center justify-start gap-[24px] z-[2]">
                <div className="flex-1 flex flex-row items-center justify-start gap-[8px]">
                  <Icon name={"Success"} size={18} />
                  <div className="flex-1 relative leading-[130%] text-base">
                    Delivered
                  </div>
                </div>
                <div className="relative leading-[130%] text-center text-base">
                  {formatDate(detail?.order_details.created)}
                </div>
              </div>
              <div className="absolute my-0 mx-[!important] top-[23.5px] left-[6.5px] box-border w-px h-[13px] z-[3] border-r-[1px] border-solid border-seagreen" />
              <div className="absolute my-0 mx-[!important] top-[65.5px] left-[6.5px] box-border w-px h-[13px] z-[4] border-r-[1px] border-solid border-seagreen" />
            </div>
            <div className="self-stretch relative box-border h-px border-t-2 border-solid border-gray-400" />
            <div className="self-stretch flex flex-row items-start justify-start gap-[16px] text-grey-scale-carbon-gray">
              <Image
                height={83}
                width={70}
                className="relative w-[69.88px] h-[82px] object-cover"
                alt="productimg"
                src={
                  detail?.order_details?.product?.preview_image ??
                  "/assets/bag.png"
                }
              />

              <div className="flex-1 flex flex-col items-start justify-start gap-[8px]">
                <div className="self-stretch flex flex-row items-start justify-start gap-[24px] text-base">
                  <div className="flex-1 relative leading-[130%] text-gray-600 ">
                    {detail?.order_details.product.product.name}
                  </div>
                  <div className="relative leading-[130%] font-medium text-grey-scale-black-russian">
                    ₹{detail?.order_details.product.discount_price}
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-start justify-start gap-[16px] text-base">
                  <div className="flex flex-row items-start justify-start gap-1 ">
                    <div className="relative leading-[130%] text-gray-600">{`Colour: `}</div>
                    <div className="relative leading-[130%] text-gray-default">
                      {detail?.order_details.product.color}
                    </div>
                  </div>
                  <div className="flex flex-row items-start justify-start gap-2">
                    <div className="relative leading-[130%] text-gray-600">
                      Size:
                    </div>
                    <div className="relative leading-[130%] text-gray-default">
                      {detail?.order_details.product.size}
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-baseline justify-start gap-[4px] text-gray-default text-base">
                  <div className="relative leading-[130%] ">{`Qty: `}</div>
                  <div className="relative leading-[130%]">
                    {detail?.order_details.quantity}
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch relative box-border h-px border-t-2 border-solid border-gray-400" />
            <div className="self-stretch flex flex-col items-start justify-start gap-[8px] text-right">
              <div className="relative leading-[130%] text-lg font-medium text-gray-default">
                Payment details
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-[16px] text-left">
                <div className="self-stretch flex flex-col items-start justify-start gap-[8px] text-base">
                  <div className="self-stretch flex flex-col items-start justify-start">
                    <div className="self-stretch flex flex-row items-start justify-start gap-[24px] ">
                      <div className="flex-1 relative leading-[130%] text-gray-500">
                        Payment method
                      </div>
                      <div className="relative leading-[130%] font-medium text-gray-default text-right">
                        {detail &&
                          detail?.order_details?.payment_details?.payment_mode}
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch flex flex-row items-center justify-between">
                    <div className="relative leading-[130%] text-gray-500">
                      Subtotal
                    </div>
                    <div className="relative leading-[130%] font-medium  text-gray-default text-right">
                      ₹{detail?.order_details?.payment_details?.sub_total || 0}
                      .00
                    </div>
                  </div>
                  <div className="self-stretch flex flex-row items-center justify-between">
                    <div className="relative leading-[130%] text-gray-500  ">
                      Discount
                    </div>
                    <div className="flex flex-row items-center justify-start gap-[4px] text-right text-secondary">
                      <div className="relative box-border w-[7px] h-px border-t-[1px] border-solid border-x-secondary" />
                      <div className="relative leading-[130%] font-medium">
                        - ₹
                        {detail?.order_details?.payment_details
                          ?.discount_amount || 0}
                        .00
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch flex flex-row items-center justify-between">
                    <div className="relative leading-[130%] text-gray-500">
                      Convenience fee
                    </div>
                    <div className="relative leading-[130%] font-medium text-grey-scale-black-russian text-right">
                      ₹
                      {detail?.order_details?.payment_details
                        ?.convenience_fee || 0}
                      .00
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-baseline justify-between text-base text-gray-default">
                  <div className="relative tracking-[-0.4px] leading-[130%] text-lg font-medium">
                    Total
                  </div>
                  <div className="relative text-3xl leading-[130%] font-medium text-right">
                    ₹{detail?.order_details?.payment_details?.total_amount || 0}
                    .00
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch bg-secondary-200 flex flex-row py-2 px-6 items-start justify-start text-center text-primary text-lg">
              <div className="flex-1 relative leading-[130%] font-medium">
                Total savings: ₹{totalSavings}.00
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE VIEW*/}
      <div className="block md:hidden">
        <div className="bg-white  flex flex-col p-6 box-border items-start justify-start gap-[24px] text-sm">
          <div className="self-stretch flex flex-row items-start justify-start gap-[24px] text-lg">
            <div className="flex-1 relative tracking-[-0.4px] leading-[130%] text-lg font-medium">
              Order details
            </div>
            <div className="overflow-hidden flex flex-row items-center justify-center text-center text-sm text-primary border-b-2 border-solid border-primary">
              <div className="relative leading-[130%] text-lg font-medium">
                Download invoice
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start gap-2 text-base text-gray-600">
            <div className="self-stretch relative leading-[130%]">
              Order ID: {detail?.order_details.order_id}
            </div>
            <div className="self-stretch relative leading-[130%]">
              Order placed: {detail?.order_details.created}
            </div>
          </div>
          <div className="self-stretch relative box-border h-px border-t-2 border-solid border-gray-400" />
          <div className="self-stretch flex flex-col items-start justify-start gap-2  text-right">
            <div className="relative leading-[130%] text-lg font-medium">
              Shipping address
            </div>
            <div className="self-stretch flex flex-col items-start justify-start gap-[4px] text-left text-base text-gray-600">
              <div className="self-stretch relative leading-[130%]">
                {detail?.order_details.delivery_address.user}
              </div>
              <div className="self-stretch relative leading-[130%]">
                {detail?.order_details.delivery_address.address_line1},{" "}
                {detail?.order_details.delivery_address.address_line2},{" "}
                {detail?.order_details.delivery_address.landmark},
                {detail?.order_details.delivery_address.city},{" "}
                {detail?.order_details.delivery_address.distic},{" "}
                {detail?.order_details.delivery_address.state}{" "}
                {detail?.order_details.delivery_address.pincode}
              </div>
              {/* <div className="self-stretch relative leading-[130%]">
                8652392200
              </div> */}
            </div>
          </div>
          <div className="self-stretch relative box-border h-px border-t-2 border-solid border-gray-400" />
          <div className="self-stretch flex flex-col items-start justify-start gap-[8px] text-right">
            <div className="relative leading-[130%] text-lg font-medium">
              {detail?.order_details.quantity} item(s){" "}
              {(detail && detail?.order_status_details?.status) || ""}
            </div>
            <div className="self-stretch relative leading-[130%] text-gray-600 text-start">
              Package delivered: 6th May 2023, Wed
            </div>
          </div>
          <div className="self-stretch h-[102px] flex flex-col items-start justify-between relative text-gray-600">
            <div className="self-stretch flex flex-row items-center justify-start gap-[24px] z-[0]">
              <div className="flex-1 flex flex-row items-center justify-start gap-[8px]">
                <Icon name={"Success"} size={20} />
                <div className="flex-1 relative leading-[130%] text-base">
                  Order confirmed
                </div>
              </div>
              <div className="relative leading-[130%] text-center">
                {formatDate(detail?.order_details.created)}
              </div>
            </div>
            <div className="self-stretch flex flex-row items-center justify-start gap-[24px] z-[1]">
              <div className="flex-1 flex flex-row items-center justify-start gap-[8px]">
                <Icon name={"Success"} size={20} />
                <div className="flex-1 relative leading-[130%] text-base">
                  Shipped
                </div>
              </div>
              <div className="relative leading-[130%] text-center">
                {formatDate(detail?.order_details.created)}
              </div>
            </div>
            <div className="self-stretch flex flex-row items-center justify-start gap-[24px] z-[2]">
              <div className="flex-1 flex flex-row items-center justify-start gap-[8px]">
                <Icon name={"Success"} size={20} />
                <div className="flex-1 relative leading-[130%] text-base">
                  Delivered
                </div>
              </div>
              <div className="relative leading-[130%] text-center">
                {formatDate(detail?.order_details.created)}
              </div>
            </div>
            <div className="absolute my-0 mx-[!important] top-[23.5px] left-[6.5px] box-border w-px h-[13px] z-[3] border-r-[1px] border-solid border-seagreen" />
            <div className="absolute my-0 mx-[!important] top-[65.5px] left-[6.5px] box-border w-px h-[13px] z-[4] border-r-[1px] border-solid border-seagreen" />
          </div>
          <div className="self-stretch relative box-border h-px border-t-2 border-solid border-gray-400" />
          <div className="self-stretch flex flex-row items-start justify-start gap-[16px] text-grey-scale-carbon-gray">
            <Image
              height={83}
              width={70}
              className="relative w-[69.88px] h-[82px] object-cover"
              alt="productimg"
              src={
                detail?.order_details?.product?.preview_image ??
                "/assets/bag.png"
              }
            />
            <div className="flex-1 flex flex-col items-start justify-start gap-[8px] text-base">
              <div className="self-stretch flex flex-row items-start justify-start gap-[24px] text-base">
                <div className="flex-1 relative leading-[130%] text-gray-600">
                  {detail?.order_details.product.product.name}
                </div>
                <div className="relative leading-[130%] font-medium text-gray-default">
                  ₹{detail?.order_details.product.discount_price}
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-start gap-[16px]">
                <div className="flex flex-row items-start justify-start gap-[4px]">
                  <div className="relative leading-[130%] text-gray-600">{`Colour: `}</div>
                  <div className="relative leading-[130%] text-gray-default">
                    {detail?.order_details.product.color}
                  </div>
                </div>
                <div className="flex flex-row items-start justify-start gap-[4px]">
                  <div className="relative leading-[130%] text-gray-600">
                    Size:
                  </div>
                  <div className="relative leading-[130%] text-gray-default">
                    {detail?.order_details.product.size}
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-row items-baseline justify-start gap-[4px] text-gray-default">
                <div className="relative leading-[130%]">{`Qty: `}</div>
                <div className="relative leading-[130%]">
                  {detail?.order_details.quantity}
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch relative box-border h-px border-t-2 border-solid border-gray-400" />
          <div className="self-stretch flex flex-col items-start justify-start gap-[8px] text-right">
            <div className="relative leading-[130%] text-lg font-medium">
              Payment details
            </div>
            <div className="self-stretch flex flex-col items-start justify-start gap-[16px] text-left text-grey-scale-cool-gray">
              <div className="self-stretch flex flex-col items-start justify-start gap-[8px]">
                <div className="self-stretch flex flex-col items-start justify-start">
                  <div className="self-stretch flex flex-row items-start justify-start text-base gap-[24px]">
                    <div className="flex-1 relative leading-[130%] text-gray-500">
                      Payment method
                    </div>
                    <div className="relative leading-[130%] font-medium text-gray-default text-right">
                      {(detail &&
                        detail?.order_details?.payment_details?.payment_mode) ||
                        ""}
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-center justify-between text-base">
                  <div className="relative leading-[130%] text-gray-500">
                    Subtotal
                  </div>
                  <div className="relative leading-[130%] font-medium text-gray-default text-right">
                    ₹{detail?.order_details?.payment_details?.sub_total || 0}.00
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-center justify-between text-base">
                  <div className="relative leading-[130%]  text-gray-500">
                    Discount
                  </div>
                  <div className="flex flex-row items-center justify-start gap-[4px] text-right text-secondary">
                    <div className="relative leading-[130%] font-medium">
                      - ₹
                      {detail?.order_details?.payment_details
                        ?.discount_amount || 0}
                      .00
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-center justify-between">
                  <div className="relative leading-[130%] text-base text-gray-500">
                    Convenience fee
                  </div>
                  <div className="relative leading-[130%] font-medium text-gray-default text-right">
                    ₹
                    {detail?.order_details?.payment_details?.convenience_fee ||
                      0}
                    .00
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-row items-baseline justify-between text-base text-grey-scale-black-russian">
                <div className="relative tracking-[-0.4px] leading-[130%] text-lg font-medium">
                  Total
                </div>
                <div className="relative text-2xl leading-[130%] font-medium text-right">
                  ₹{detail?.order_details?.payment_details?.total_amount || 0}
                  .00
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch bg-secondary-800-2 flex flex-row py-2 px-6 items-start justify-start text-center text-gray-default bg-secondary-200">
            <div className="flex-1 relative leading-[130%] text-base font-medium">
              Total savings: ₹{totalSavings}.00
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
