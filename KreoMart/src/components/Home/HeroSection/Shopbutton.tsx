import React from "react";
import Icon from "../../shared/Icon";
import Link from "next/link";
import route from "@/routes";

const Shopbutton = () => {
  return (
    <Link href={route.Products}>
      <button className="mt-7 p-2 rounded-none border border-gray-default py-4 px-6 gap-[8px]  text-center flex  justify-center items-center hover:rounded-lg text-lg font-semibold text-gray-default">
        Shop Now
        <Icon name={"arrow-right"} size={24} />
      </button>
    </Link>
  );
};

export default Shopbutton;
