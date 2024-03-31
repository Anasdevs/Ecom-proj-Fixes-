"use client";
import React, { useEffect } from "react";
import { UseCartStore } from "@/store/store";
import ArrowButton from "./ArrowButton";
import Image from "next/image";
import Ticket from "../../../public/assets/Ticket.png";
import "./Payment.Module.css";
import { useState } from "react";
import useRazorpay from "react-razorpay";
import { postApis } from "@/api/client";
import Icon from "../shared/Icon";
import OrderPlaced from "./OrderPlaced";
import { useRouter } from "next/navigation";
import { CartDetail } from "../../../typings";

interface Props {
  data: CartDetail;
  handlePaymentModeChange: (value: string) => void;
  selectedPaymentMode: string | null;
}

const Payment: React.FC<Props> = ({
  data,
  handlePaymentModeChange,
  selectedPaymentMode,
}) => {
  const router = useRouter();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [coupon, setCoupon] = useState<string>("");
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [arrowDirection, setArrowDirection] = useState("ArrowRight");
  const [Razorpay] = useRazorpay();
  const [Convenience, setConvenience] = useState<number>();
  const [total_amount, setTotalAmount] = useState<number>();
  const [address_id, setAddress_id] = useState<number>();
  const { cart, orderaddress } = UseCartStore((state) => ({
    cart: state.cart,
    orderaddress: state.orderaddress,
  }));
  // const totalDiscountPrice = cart?.results?.reduce(
  //   (acc, result) =>
  //     acc + result.product_variant.discount_price * result.quantity,
  //   0
  // );
  const [sub_total, setSubTotal] = useState<number>(cart?.results?.total_amount);

  const orderData = {
    address_id: orderaddress?.id,
    total_amount: total_amount,
    sub_total: sub_total,
    convenience_fee: Convenience,
  };



  // Validate that all required fields are present and not null or undefined
  const isDataValid =
    orderData.address_id !== null &&
    orderData.sub_total !== null &&
    orderData.total_amount !== null &&
    orderData.convenience_fee !== null;

  useEffect(() => {
    const fetchCheckoutDetails = async () => {
      try {
        if (!orderaddress?.id || !isDataValid) {
          console.error("Invalid orderaddress or orderData");
          return;
        }

        const response = await postApis.postCheckout(orderaddress?.id);

        if (response) {
          setConvenience(response.convenience_fee);
          setTotalAmount(response.total_amount);
          setSubTotal(response.sub_total);
          setAddress_id(response.delivery_address_id);
        } else {
          console.error("Invalid response format from postCheckout");
        }
      } catch (error) {
        console.error("Error during checkout:", error);
      }
    };

    fetchCheckoutDetails();
  }, [orderaddress?.id, isDataValid]);

  return (
    <>
      <div className="flex-item w-[340px] md:w-[600px] relative bg-white flex-row p-6 box-border mx-auto md:mx-0  gap-[24px] text-left text-base text-grey-scale-black-russian font-medium-16">
        <div className="self-stretch relative text-2xl font-medium mb-8">
          Payment mode
        </div>
        <div className="text-start mb-6">How would you like to pay?</div>
        <div>
          <label className="custom-radio">
            <input
              type="radio"
              name="OnlinePayment"
              checked={selectedPaymentMode === "OnlinePayment"}
              onChange={() => handlePaymentModeChange("OnlinePayment")}
            />
            <div className="radio-label self-stretch flex justify-between items-start  gap-[16px] mb-16">
              <div className="self-stretch items-center justify-start gap-[24px] ">
                <div className="relative tracking-[-0.4px] leading-[130%] font-medium mb-6">
                  Online Payment
                </div>

                <div className="flex items-center justify-start gap-[12px]">
                  <Image
                    className="relative w-[43.73px] h-8 "
                    alt=""
                    src="assets/visa.svg"
                    width={25}
                    height={25}
                  />
                  <Image
                    className="relative w-[43.73px] h-8 "
                    alt=""
                    src="assets/mastercard.svg"
                    width={25}
                    height={25}
                  />
                  <Image
                    className="relative w-[43.73px] h-8 "
                    alt=""
                    src="assets/rupay.svg"
                    width={25}
                    height={25}
                  />
                  <Image
                    className="relative w-[43.73px] h-8 "
                    alt=""
                    src="assets/upi.svg"
                    width={25}
                    height={25}
                  />
                </div>
              </div>
            </div>
          </label>
        </div>
        <div>
          <label className="custom-radio">
            <input
              type="radio"
              name="CashOnDelivery"
              checked={selectedPaymentMode === "CashOnDelivery"}
              onChange={() => handlePaymentModeChange("CashOnDelivery")}
            />
            <div className="radio-label self-stretch flex flex-row items-center justify-start gap-[24px]">
              <div className="flex-1 relative tracking-[-0.4px] leading-[130%] font-medium">
                Cash on Delivery
              </div>
            </div>
          </label>
        </div>
      </div>
    </>
  );
};

export default Payment;
