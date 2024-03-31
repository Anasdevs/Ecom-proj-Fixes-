import Icon from "../shared/Icon";
import styles from "./Feature.module.css";
import Image from "next/image";

export const Feature = () => {
  return (
    <div className="my-16 flex flex-wrap  justify-between items-center  gap-y-8 p-6">
      <div className="flex-row md:flex justify-center items-center flex-wrap basis-[49%] xl:basis-auto align-middle p-5 ">
        <div className="md:mr-3 flex justify-center">
          <Icon name={"money"} size={24} />
        </div>
        <div className="mt-3 sm:min-w-[11rem] text-center text-base ">
          <h1 className="text-primary font-semibold">Secure Payment</h1>
          <p className="text-gray-600">Secured by Stripe</p>
        </div>
      </div>

      <div className="w-[1px] h-10 "></div>

      <div className="flex-row md:flex justify-center items-center flex-wrap basis-[49%] xl:basis-auto  align-middle p-5  ">
        <div className="md:mr-3 flex justify-center">
          <Icon name={"lock"} size={24} />
        </div>
        <div className="mt-3 sm:min-w-[11rem] text-center text-base ">
          <h1 className="text-primary font-semibold">Money-Back</h1>
          <p className="text-gray-600">30 day Guarantee</p>
        </div>
      </div>

      <div className="w-[1px] hidden xl:block h-10 "></div>

      <div className="flex-row md:flex justify-center items-center flex-wrap basis-[49%] xl:basis-auto align-middle p-5  ">
        <div className="md:mr-3 flex justify-center">
          <Icon name={"headphones"} size={24} />
        </div>
        <div className="mt-3 sm:min-w-[11rem] text-center text-base">
          <h1 className="text-primary font-semibold">Premium Support</h1>
          <p className="text-gray-600">Phone and email support</p>
        </div>
      </div>

      <div className="w-[1px]  h-10 "></div>

      <div className="flex-row md:flex justify-center items-center flex-wrap basis-1/2 xl:basis-auto align-middle p-5 ">
        <div className="md:mr-3 flex justify-center">
          <Icon name={"delivery"} size={24} />
        </div>
        <div className="mt-3 sm:min-w-[11rem] text-center text-base">
          <h1 className="text-primary font-semibold ">Free Shipping</h1>
          <p className="text-gray-600">Orders above $200</p>
        </div>
      </div>
    </div>
  );
};
