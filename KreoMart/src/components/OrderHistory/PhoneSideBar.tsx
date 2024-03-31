"use client";

import route from "@/routes";
import Link from "next/link";
import Icon from "../shared/Icon";
import { signOut } from "next-auth/react";
import React from "react";

interface Props {
  activeTab: string;
}

const PhoneSideBar: React.FC<Props> = ({ activeTab }) => {
  return (
    <div className=" bg-white p-4 relative h-2/5 gap-12">
      <div
        className={`cursor-pointer flex w-full justify-between items-center text-lg  my-12 text-gray-default ${
          activeTab === "OrderHistory" ? "font-bold text-xl" : ""
        }`}
      >
        <div>My Orders</div>
        <Link href={route.OrderHistory}>
          <Icon name="ArrowRight" size={24} />
        </Link>
      </div>
      <div
        className={`cursor-pointer flex  w-full justify-between items-center  text-lg my-12 text-gray-default ${
          activeTab === "Profile" ? "font-bold" : ""
        }`}
      >
        <div>Account settings</div>
        <Link href={route.Profile}>
          <Icon name="ArrowRight" size={24} />
        </Link>
      </div>
      <div
        className={`cursor-pointer flex  w-full justify-between items-center text-lg  my-12 text-gray-default ${
          activeTab === "Contact" ? "font-bold" : ""
        }`}
      >
        <div>Contact us</div>
        <Link href={route.Contact}>
          <Icon name="ArrowRight" size={24} />
        </Link>
      </div>
      <div className="flex  w-full justify-between items-center  text-lg my-12 text-gray-default">
        <button
          onClick={() => {
            localStorage.removeItem("access_token");

            signOut({
              redirect: false,
              callbackUrl: "http://localhost:3000",
            });
          }}
          className="cursor-pointer text-xl font-normal text-white bg-red-default"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default PhoneSideBar;
