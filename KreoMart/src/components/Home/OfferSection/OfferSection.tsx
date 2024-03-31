"use client";

import RemainTime from "./RemainTime";
import Shopbutton from "../HeroSection/Shopbutton";
import Image from "next/image";
import placeholder from "../../../public/assets/placeholder.png";

const OfferSection = () => {
  return (
    <>
      {" "}
      <div className="relative  w-full flex flex-row items-center justify-center  box-border text-left text-base text-gray-default ">
        <div className="flex flex-col sm:flex-row gap-6 my-12 mt-7 justify-between items-center bg-white w-full">
          <div className=" object-cover sm:w-3/6  ">
            <div className="flex items-center w=full h=full ">
              <Image
                src="/assets/watch.png"
                className=" max-h-[450px] object-cover  "
                alt="hero"
                height={450}
                width={450}
              />
            </div>
          </div>

          <div className="sm:w-2/4    ">
            <div className="p-8">
              <p className=" text-[16px] font-semibold">EXCLUSIVE OFFER</p>
              <p className="md:text-[52px] text-[40px] font-bold uppercase mb-1 ">
                WATCHES FOR MEN
              </p>
              <p className="my-4 text-[14px] md:text-[18px] text-yellow-default">
                <span className="text-gray-300 line-through">$78.00 </span>
                $45.00 You Save: $33.00 (43%)
              </p>

              <p className=" font-bold text-primary mb-2">
                Hurry up!{" "}
                <span className="text-[#8991A4]">Offer expires in:</span>
              </p>

              <RemainTime />
              <Shopbutton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfferSection;
