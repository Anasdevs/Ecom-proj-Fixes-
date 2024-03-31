import React from "react";
import Ticket from "../../../public/assets/Ticket.png";
import Image from "next/image";

import ArrowButton from "./ArrowButton";

function OrderSummary() {
  return (
    
      <div>
        <div className="flex">
          <div>
            <Image src={Ticket} alt="co" />
          </div>
          <div>
            <p>Apply coupon</p>
          </div>
          <div>
            <ArrowButton />
          </div>
        </div>
        <div className="">
          <div className="flex gap-4 justify-between">
            <div className="">Order summary</div>
            <div>AHDT216793SGYEV</div>
          </div>
          <div className="">
            <div className="">
              <div className=" flex justify-between">
                <div className="">Subtotal</div>
                <div className="">₹468</div>
              </div>
              <div className=" flex justify-between">
                <div className="">Discount</div>
                <div className="">
                  {/* <Image className="line" alt="Line" src={Line} /> */}
                  <div className="text-[#11DCAD]">-₹68</div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="">Convenience fee</div>
                <div className="">₹30</div>
              </div>
              <div className="flex text-[#030822] text-xl justify-between">
                <div> You Pay</div>
                <div>₹430</div>
              </div>

              <button
                type="submit"
                className="w-full  bg-[#020044] hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold  px-4 py-3 mt-6"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    
  );
}

export default OrderSummary;
