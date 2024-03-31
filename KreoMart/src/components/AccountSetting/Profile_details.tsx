"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Button from "../shared/Button/Button";
import Icon from "../shared/Icon";

import route from "@/routes";
import Privacy from "./Privacy";
import Detailform from "./Detailform";
import EditDetails from "./EditDetails";
import { UseCartStore } from "@/store/store";
import { AddressFormData, GetAddress } from "../../../typings";
import AddressForm from "./AddressForm";
import { UserData } from "@/store/userData";

const Profile_details = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState<number | any>();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(false);
  const [editdetails, seteditlDetails] = useState(false);
  const [editaddress, setEditAddress] = useState(false);
  const [allAddress, setAllAddresses] = useState<GetAddress[] | any>([]);
  const [userDetails, setUserDetails] = useState<any>([]);
  const { getAllAddress } = UseCartStore((state) => ({
    getAllAddress: state.getAllAddress,
  }));

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await getAllAddress();
  //       console.log("Saved Address data:", data);
  //       setAllAddresses(data);
  //     } catch (error) {
  //       console.error("Error fetching address data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [getAllAddress]);
  // const handleAddress = () => {
  //   setEditAddress(!editaddress);
  // };

  const { getUserData } = UserData((state) => ({
    UserData: state.userData,
    getUserData: state.getUserData,
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllAddress();
        const userData = await getUserData();
        console.log("123 data :", userData);
        console.log("Saved Address data:", data);

        const { profile } = userData;
        setUserDetails(profile);

        setFirstname(profile?.first_name || "");
        setLastname(profile?.last_name || "");
        setPhone(profile?.phone_number || "");
        setEmail(profile?.email || "");
        setStatus(profile?.is_email_verified || "");

        setAllAddresses(data);
      } catch (error) {
        console.error("Error fetching address data:", error);
      }
    };

    fetchData();
  }, [getAllAddress]);
  const handleAddress = () => {
    setEditAddress(!editaddress);
  };

  const handleDetails = () => {
    seteditlDetails(!editdetails);
  };
  console.log("alladdress: ", allAddress);
  return (
    <div className=" px-6 gap-4">
      <div className=" bg-white flex flex-col py-4  box-border justify-between px-6 gap-[24px]  text-gray-default font-book-16">
        <div className="flex flex-row items-start justify-start gap-[24px]">
          <div className="flex-1  text-2xl md:text-lg font-medium">
            Personal details
          </div>
          <div className="overflow-hidden flex flex-row items-center justify-center text-center text-sm text-primary-cetacean-blue-10 border-solid border-primary">
            {/* <button
              className=" text-xl md:text-lg underline underline-offset-2 font-medium"
              onClick={handleDetails}
            >
              Edit
            </button> */}
          </div>
        </div>
        {!editdetails ? (
          <Detailform
            firstname={firstname}
            lastname={lastname}
            email={email}
            phone={phone}
            status={status}
          />
        ) : (
          <EditDetails
            handleDetails={handleDetails}
            firstname={firstname}
            lastname={lastname}
            email={email}
            phone={phone}
          />
        )}
      </div>
      <div className="  mt-10 px-6 py-4 bg-white ">
        <div className="    text-xl items-center font-medium">Address book</div>
        {!editaddress ? (
          <div className="  text-base">
            {allAddress?.map((address: GetAddress, index: any) => {
              return (
                <div
                  key={index}
                  className="border-b-[1px]  border-gray-400 py-6"
                >
                  <div className="w-full text-xl py-2 ">
                    <div className="flex justify-between self-stretch relative  font-medium">
                      {address.user}
                      {/* <button
                        className="text-xl md:text-lg underline underline-offset-2 font-medium"
                        onClick={handleAddress}
                      >
                        Edit
                      </button> */}
                    </div>
                    <div className=" ">
                      <div className="">
                        {address.address_line1} {address.address_line2}{" "}
                        {address.landmark} {address.city} {address.distic}{" "}
                        {address.state}
                      </div>
                      <div className="">{address.pincode}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <AddressForm handleAddress={handleAddress} />
          </div>
        )}
      </div>
      <Privacy />
    </div>
  );
};

export default Profile_details;
