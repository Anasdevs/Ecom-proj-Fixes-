// "use client";
import route from "@/routes";
import React from "react";

import Profile_details from "./Profile_details";

import SideBar from "../OrderHistory/SideBar";
import Breadcrumbs from "../shared/Breadcrumb/Breadcrumb";

import { getServerSession } from "next-auth";
import { POST } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const AccountSetting = async () => {
  const session = await getServerSession(POST);
  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <div className="">
        <div className="flex flex-row items-center justify-center mt-4 text-lg font-medium">
          <Breadcrumbs
            paths={[
              { label: "Home" },
              { label: "My Account" },
              { label: "Account Setting", href: route.Profile },
            ]}
          />
        </div>
        <div className="md:flex hidden justify-center gap-8 p-20">
          <SideBar activeTab={"Profile"} />
          <div className="md:w-[500px] lg:w-[800px]">
            <Profile_details />
          </div>
        </div>
      </div>
      <div className="block md:hidden">
        <Profile_details />
      </div>
    </div>
  );
};

export default AccountSetting;
