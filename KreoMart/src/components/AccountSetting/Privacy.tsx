import route from "@/routes";
import Link from "next/link";
import React from "react";

const Privacy = () => {
  return (
    <div className="px-4 mt-10 py-4 bg-white">
      <div className=" bg-white  relative  w-full flex flex-col  box-border items-start justify-start gap-[24px] text-left text-lg text-gray-default ">
        <div className="flex-1 text-xl  font-medium flex items-center ">
          Privacy
        </div>
        <Link href={route.ChangePassword} className=" text-lg  ">
          Change password
        </Link>
      </div>
    </div>
  );
};

export default Privacy;
