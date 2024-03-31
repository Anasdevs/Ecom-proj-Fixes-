"use client";
import React, { useEffect, useState } from "react";

import Tab from "./tab";
import Payment from "./Payment";
import Address from "./Address";
import Cart from "./Cart";
import { useRouter } from "next/navigation";

import { UseCartStore } from "@/store/store";
import { AddressFormData } from "../../../typings";
import Checkout from "./Checkout";

const ProgressBar = () => {
  const [activeTab, setActiveTab] = useState("Cart");
  const [title, setTitle] = useState<string>("cart");
  const [isAddressChecked, setIsAddressChecked] = useState(false);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState<string | null>(
    null
  ); encodeURI

  const [reload, setReload] = useState(false)
  const { cart, orderaddress, getAllCart } = UseCartStore((state) => ({
    cart: state.cart,
    orderaddress: state.orderaddress,
    getAllCart: state.getAllCart,
  }));

  const initialaddress = {
    id: 0,
    address_line1: "",
    distic: "",
    state: "",
    city: "",
    landmark: "",
    pincode: "",
  };
  const [selectedSavedAddress, setSelectedSavedAddress] =
    useState<AddressFormData | null>(null);


  useEffect(() => {
    setSelectedSavedAddress(orderaddress);
    getAllCart();
    console.log('Reload....', cart)
  }, [orderaddress, reload]);

  useEffect(() => {

    console.log('Reload....', cart)
  }, [cart, reload]);


  useEffect(() => {
    setIsAddressChecked(selectedSavedAddress !== initialaddress);
  }, [selectedSavedAddress]);

  const router = useRouter();
  const handleTabClick = (label: string) => {
    setActiveTab(label);
  };
  const handleShop = () => {
    router.push("/products");
  };

  const handlePaymentModeChange = (mode: string) => {
    setSelectedPaymentMode(mode);
  };
  return (
    <>
      {cart?.results?.cart_data?.length === 0 ? (
        <div className="flex items-center justify-center h-screen-1/2 mt-5">
          <div className="rounded-md w-[600px] bg-secondary-200 p-8 text-center">
            <div className="text-4xl font-bold mb-4">Oops!</div>
            <div className="text-lg text-gray-600">Your cart is empty</div>
            <button
              className="mt-6 px-8 py-3 bg-primary-800 hover:bg-blue-600 text-white rounded-md focus:outline-none"
              onClick={handleShop}
            >
              Shop now
            </button>
          </div>
        </div>
      ) : (
        <div className="tabs-container my-[52px] ">
          <div className="tabs flex  gap-2 justify-center items-center">
            <div className="flex-item">
              <Tab
                index={1}
                label="Cart"
                activeTab={activeTab}
                onClick={handleTabClick}
                hasContent={cart?.results?.cart_data?.length !== 0}
              />
            </div>
            <div className="flex-item mb-2 hidden md:block">
              .......................................
            </div>
            <div className="flex-item mb-2 block md:hidden">.............</div>
            <div className="flex-item">
              <Tab
                index={2}
                label="Address"
                activeTab={activeTab}
                onClick={handleTabClick}
                hasContent={selectedSavedAddress ? true : false}
              />
            </div>
            <div className="flex-item mb-2 hidden md:block">
              .......................................
            </div>
            <div className="flex-item mb-2 block md:hidden">.............</div>
            <div className="flex-item">
              <Tab
                index={3}
                label="Payment"
                activeTab={activeTab}
                onClick={handleTabClick}
                hasContent={false}
              />
            </div>
          </div>
          <div className="tab-content flex flex-col gap-6 md:flex-row m-auto justify-center p-4 text-center">
            {activeTab === "Cart" && (
              <Cart
                label="Address"
                activeTab={activeTab}
                handClick={handleTabClick}
                reload={reload}
                setReload={setReload}
              />
            )}
            {activeTab === "Address" && (
              <Address
                label="Payment"
                activeTab={activeTab}
                handClick={handleTabClick}
              />
            )}
            {activeTab === "Payment" && (
              <Payment
                data={cart}
                handlePaymentModeChange={handlePaymentModeChange}
                selectedPaymentMode={selectedPaymentMode}
              />
            )}

            <Checkout
              data={cart}
              label={activeTab.toLowerCase()}
              activeTab={activeTab}
              handClick={handleTabClick}
              selectedPaymentMode={selectedPaymentMode}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProgressBar;
