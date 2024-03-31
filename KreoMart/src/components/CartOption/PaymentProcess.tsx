import React from "react";
import Spinner from "../shared/Spinner/Spinner";

const PaymentProcess = () => {
  return (
    <div className=" bg-white w-full h-826 opacity-95">
      <Spinner size="small" />
      <h1 className="text-center  relative text-5xl tracking-tight leading-120 font-medium text-black-russian ">
        We are processing your payment
      </h1>
      <p className="w-full relative text-2xl leading-normal font-normal text-carbon text-center inline-block">
        This may take a few seconds, so please be patient. Don’t close window or
        hit the back button
      </p>
    </div>
  );
};

export default PaymentProcess;
