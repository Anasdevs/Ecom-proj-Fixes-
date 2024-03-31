"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Ticket from "../../../public/assets/Ticket.png";
import { CartDetail, MyOrderDetails } from "../../../typings";
import Icon from "../shared/Icon";
import { postApis } from "@/api/client";
import useRazorpay from "react-razorpay";
import axios from "axios";
import { useRouter } from "next/navigation";
import { UseCartStore } from "@/store/store";
interface Props {
  data: CartDetail;
  label: string;
  activeTab: string;
  handClick: (label: string) => void;
  selectedPaymentMode: string | null;
}

const Checkout: React.FC<Props> = ({
  data,
  label,
  activeTab,
  handClick,
  selectedPaymentMode,
}) => {
  const isActive = activeTab === label;
  const [coupon, setCoupon] = useState<string>("");
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [address_id, setAddress_id] = useState<number>();
  const [arrowDirection, setArrowDirection] = useState("ArrowRight");
  const router = useRouter();
  const [successData, setSuccessData] = useState({
    id: null,
    order_id: null,
  });
  const [discount, setDiscount] = useState(0);
  const [cartData, setCartData] = useState(data);


  // New code start
  const [Razorpay] = useRazorpay();
  const [Convenience, setConvenience] = useState<number>();
  const [total_amount, setTotalAmount] = useState<number>();

  const { cart, orderaddress } = UseCartStore((state) => ({
    cart: state.cart,
    orderaddress: state.orderaddress,
  }));

  const [sub_total, setSubTotal] = useState<number>(cart?.results.total_amount);

  let orderData: any = {
    address_id: orderaddress?.id,
    total_amount: cartData.results.total_amount,
    sub_total: cartData.results.sub_total,
    convenience_fee: cartData.results.convenvience_fee,
  };
  const isDataValid =
    orderData.address_id !== null &&
    orderData.sub_total !== null &&
    orderData.total_amount !== null &&
    orderData.convenience_fee !== null;

  useEffect(() => {
    const fetchCheckoutDetails = async () => {
      try {
        if (!orderaddress?.id || !isDataValid) {
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

  const razorPay = async () => {
    try {
      if (coupon) {
        orderData = {
          ...orderData,
          coupon_code: coupon,
          discount: discount,
        };
      }

      const Fetchorder = await postApis.postCreateOrder({
        ...orderData,
      });

      // Check if the response is valid and contains order_details
      if (
        !Fetchorder ||
        !Fetchorder.order_details ||
        !Fetchorder.order_details.id
      ) {

        // Handle the error or inform the user accordingly
        return;
      }

      // Extract the order_id from the response
      var order_id = Fetchorder.order_details.id;

      // Setup Razorpay payment options
      const options = {
        key: `${process.env.NEXT_PUBLIC_RAZORPAY_API_KEY}`,
        amount: `${sub_total * 500}`,
        currency: "INR",
        name: "Kreomart",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: `${order_id}`,
        handler: async function (response: {
          razorpay_payment_id: any;
          razorpay_order_id: any;
          razorpay_signature: any;
        }) {
          // Handle the response data from Razorpay
          const data = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };

          // Make the postConfirmOrder request
          const confirmorder = await postApis.postConfirmOrder(
            response.razorpay_order_id,
            response.razorpay_payment_id,
            response.razorpay_signature
          );

          // Handle the confirmation response as needed
          console.log("Confirm Order response: ", confirmorder);

          if (confirmorder?.status == 200) {
            console.log("confirmed. Your order is placed!!!");
            return router.push("/orderplaced");
          } else {
            console.log("Confirmorder data: ", confirmorder);
          }
        },
        prefill: {
          name: "Piyush Garg",
          email: "youremail@example.com",
          contact: "962944104",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      // Create a new instance of Razorpay with the provided options
      const rzp1 = new Razorpay(options);
      // Setup event listener for payment failure
      rzp1.on(
        "payment.failed",
        function (response: {
          error: {
            code: any;
            description: any;
            source: any;
            step: any;
            reason: any;
            metadata: { order_id: any; payment_id: any };
          };
        }) {
          // Handle the payment failure response as needed
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
        }
      );

      // Open the Razorpay payment window
      rzp1.open();
    } catch (error) {
      ``;
      console.error("Error during Razorpay setup:", error);
      // Handle the error or inform the user accordingly
    }
  };

  const COD = async () => {
    try {
      if (
        typeof address_id !== "number" ||
        typeof total_amount !== "number" ||
        typeof sub_total !== "number" ||
        typeof Convenience !== "number"
      ) {
        console.error("Invalid values for COD variables");
        return;
      }

      if (coupon) {
        orderData = {
          ...orderData,
          coupon_code: coupon,
          discount: discount,
        };
      }

      // Call the postCod API function with the required data
      const codResponse = await postApis.postCod(orderData);

      // Handle the response as needed

      if (codResponse?.status == 200) {
        // const orderId = codResponse.order_details.order_id;
        // const orderDetailsId = codResponse.order_details.id;
        console.log("confirmorder is null");
        return router.push("/orderplaced");
      } else {
        console.log("Confirmorder data: ", codResponse);
      }
    } catch (error) {
      console.error("Error during Cash on Delivery setup:", error);
      // Handle the error or inform the user accordingly
    }
  };

  const handleCoupon = () => {
    setIsInputOpen(!isInputOpen);
    setArrowDirection(
      arrowDirection === "ArrowRight" ? "ArrowDown" : "ArrowRight"
    );
  };

  const handleApplyCoupon = async () => {
    try {
      if (coupon && discount === 0) {
        const apiUrl = "https://api.kreomart.com/api/offers/coupons/claim/now/";
        const token = localStorage.getItem("access_token");

        const response = await axios.post(
          apiUrl,
          JSON.stringify({ coupon_code: coupon }),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.discount) {
          setDiscount(response.data.discount);
          setCartData((prevState) => ({
            ...prevState,
            results: {
              ...prevState.results,
              total_amount:
                cartData.results.total_amount - response.data.discount,
            },
          }));

          console.log("response :", response.data);
          console.log("Coupon claimed successfully!");
        } else {
          console.error("Coupon claim failed");
        }
      } else if (!coupon && discount > 0) {

        // handel if user don't apply coupon
        setCartData((prevState) => ({
          ...prevState,
          results: {
            ...prevState.results,
            total_amount: prevState.results.total_amount + discount,
          },
        }));

        setDiscount(0);
      }
    } catch (error) {
      console.error("Error claiming coupon:", error);
      return;
    }
  };

  const handleCouponChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setCoupon(e.target.value);
  };

  return (
    <div className="flex justify-center">
      <div
        className={`text-[14px] md:w-[300px] w-[340px] bg-white text-center justify-center checkout ${isInputOpen ? "h-[320px] mb-2" : "h-[280px]"
          }`}
      >
        <div className="p-4 ">
          <div className="flex gap-4 mb-6">
            <div>
              <Image src={Ticket} alt="co" />
            </div>
            <div
              className="flex justify-between w-full cursor-pointer"
              onClick={handleCoupon}
            >
              <div>Apply coupon</div>
              <div>
                <Icon name={arrowDirection} size={24} />
              </div>
            </div>
          </div>
          <div className="border border-gray-400 border-b-1 mb-6"></div>
          <div className="w-full">
            {isInputOpen && (
              <div className="flex gap-4">
                <input
                  value={coupon}
                  onChange={handleCouponChange}
                  type="text"
                  className="w-full h-14 focus:outline-none border block border-gray-500"
                />
                <button
                  className="bg-primary text-white px-4 py-2 rounded-md"
                  onClick={handleApplyCoupon}
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          <div className="">
            <div className="flex gap-4 justify-between mb-2">
              <div className="font-bold">Order summary</div>
            </div>
            <div className="mb-4">
              <div className=" flex justify-between">
                <div className="">Subtotal</div>
                <div className="">₹{cartData?.results?.sub_total}</div>
              </div>
              <div className=" flex justify-between">
                <div className="">Discount</div>
                <div className="">
                  <div className={`${discount > 0 && "text-[#11DCAD]"}`}>
                    ₹ {discount}
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="">Convenience fee</div>
                <div className="">₹{cartData?.results?.convenvience_fee}</div>
              </div>
              <div className="flex justify-between">
                <div className="">Items</div>
                <div className="">{cart.count}</div>
              </div>
            </div>
            <div className="flex text-[#030822] justify-between items-center font-semibold">
              <div> You Pay</div>
              <div className="text-2xl">₹{cartData?.results?.total_amount}</div>
            </div>
            <button
              type="submit"
              onClick={() => {
                if (selectedPaymentMode === "CashOnDelivery") {
                  COD();
                } else {
                  razorPay();
                }
              }}
              className={`w-full ${isActive && "active"
                } bg-primary text-white font-semibold px-4 py-3 my-6 ${activeTab !== "Payment" && "bg-primary-400"
                }`}
              disabled={activeTab !== "Payment"}
            >
              {selectedPaymentMode === "OnlinePayment"
                ? `You pay ₹${cartData?.results.total_amount}`
                : "Confirm to place order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
