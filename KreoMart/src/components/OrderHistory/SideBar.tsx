"use client";

import route from "@/routes";
import Link from "next/link";
import Icon from "../shared/Icon";
import { signOut } from "next-auth/react";
import React from "react";

interface Props {
  activeTab: string;
  // label: string;
  // onClick: (label: string) => void;
}

const SideBar: React.FC<Props> = ({ activeTab }) => {
  return (
    <div className="bg-white p-4 relative h-2/5 gap-12">
      <Link href={route.OrderHistory}>
        <button
          className={`flex w-96 justify-between items-center text-lg mb-5 py-4 text-gray-default ${
            activeTab === "OrderHistory" ? "font-bold" : ""
          } hover:bg-gray-100 transition-colors duration-300 cursor-pointer`}
          // onClick={() => onClick("OrderHistory")}
        >
          <label className=" text-xl px-2">My Orders</label>

          <Icon name="ArrowRight" size={24} />
        </button>
      </Link>

      <Link href={route.Profile}>
        <button
          className={`flex w-96 justify-between items-center text-lg my-5  py-4 text-gray-default ${
            activeTab === "Profile" ? "font-bold" : ""
          } hover:bg-gray-100 transition-colors duration-300 cursor-pointer`}
          // onClick={() => onClick("Profile")}
        >
          <label className=" text-xl px-2">Account settings</label>

          <Icon name="ArrowRight" size={24} />
        </button>
      </Link>
      <Link href={route.Contact}>
        <button
          className={`flex w-96 justify-between items-center text-lg my-5  py-4 text-gray-default ${
            activeTab === "Contact" ? "font-bold" : ""
          }hover:bg-gray-100 transition-colors duration-300 cursor-pointer`}
          // onClick={() => onClick("Contact")}
        >
          <label className=" text-xl px-2">Contact us</label>

          <Icon name="ArrowRight" size={24} />
        </button>
      </Link>
      <div className="flex w-full justify-between items-center text-lg my-5  py-4 text-gray-default">
        <button
          onClick={() => {
            localStorage.removeItem("access_token");
            signOut({
              redirect: true,
              callbackUrl: "http://localhost:3000",
            });
          }}
          className=" px-2 text-xl font-normal text-white bg-red-default"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideBar;
