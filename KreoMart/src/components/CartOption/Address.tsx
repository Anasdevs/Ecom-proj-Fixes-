// "use client";

import React, { useEffect, useState } from "react";
import Checkout from "./Checkout";
import StateInput from "./StateInput";
import "./Address.Module.css";
import { UseCartStore } from "@/store/store";
import { AddressFormData } from "../../../typings";
interface AddressProps {
  label: string;
  activeTab: string;
  handClick: (label: string) => void;
}
const Address: React.FC<AddressProps> = ({ label, activeTab, handClick }) => {
  const [clickbox, setClickbox] = useState(false);
  const [defaultAddressId, setDefaultAddressId] = useState<string | null>(null);
  const { getAllAddress, postAddress, orderaddress, setOrderAddress } =
    UseCartStore((state) => ({
      getAllAddress: state.getAllAddress,
      postAddress: state.postAddress,
      orderaddress: state.orderaddress,
      setOrderAddress: state.setOrderAddress,
    }));

  const [selectedSavedAddress, setSelectedSavedAddress] =
    useState<AddressFormData | null>(null);
  const [toggle, setToggle] = useState(false);
  const [isAddressSaved, setAddressSaved] = useState(false);
  const [allAddress, setAllAddresses] = useState<AddressFormData[] | any>([]);
  const initialaddress = {
    first_name: "",
    last_name: "",
    email_id: "",
    phone_number: "",
    address_line1: "",
    distic: "",
    state: "",
    city: "",
    landmark: "",
    pincode: "",
  };
  const [formData, setFormData] = useState<AddressFormData | any>(
    initialaddress
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllAddress();
        console.log("Saved Address data:", data);
        setAllAddresses(data);
      } catch (error) {
        console.error("Error fetching address data:", error);
      }
    };

    fetchData();
  }, [getAllAddress]);

  useEffect(() => {
    // Populate form data with persisted orderaddress when available
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      ...orderaddress,
    }));
  }, [orderaddress]);

  const { cart } = UseCartStore((state) => ({
    cart: state.cart,
  }));

  const handleStateChange = (selectedOption: string) => {
    setFormData({ ...formData, state: selectedOption });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    if (name === "defaultAddress" && checked) {
      setDefaultAddressId(selectedSavedAddress?.id.toString() || null);
    }

    setFormData({ ...formData, [name]: newValue });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log("form data: ", formData);
      const data = await postAddress(formData);

      if (data) {
        setAddressSaved(true);
        setTimeout(() => {
          setAddressSaved(false);
        }, 3000);
        console.log("Post Address response data:", data);
      } else {
        console.log("Invalid response format from postAddress");
      }
    } catch (error) {
      console.error("Error during postAddress:", error);
    }
  };

  const handleSavedAddressChange = (
    selectedAddress: AddressFormData | null
  ) => {
    setSelectedSavedAddress(selectedAddress);
    setOrderAddress(selectedAddress);
    localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
  };

  const resetFormFields = () => {
    setFormData(initialaddress);
  };

  useEffect(() => {
    // Retrieve selected address from local storage
    const storedAddress = localStorage.getItem("selectedAddress");
    if (storedAddress) {
      setSelectedSavedAddress(JSON.parse(storedAddress));
    }
  }, []);

  useEffect(() => {
    console.log("selectedSavedAddress:", selectedSavedAddress);

    setToggle(selectedSavedAddress ? true : false);
  }, [selectedSavedAddress]);

  useEffect(() => {
    console.log("selectedSavedAddress: ", selectedSavedAddress);
    console.log("orderaddress: ", orderaddress);
  }, [orderaddress, selectedSavedAddress]);

  return (
    <div className="flex-item w-[340px] md:w-[600px] relative bg-white flex-row p-6 box-border items-start mx-auto md:mx-0 justify-center gap-[24px] text-left text-base text-grey-scale-black-russian font-medium-16">
      <form className="mx-auto w-full  bg-white p-4" method="POST">
        <div className="justify-center ">
          <div className="  mb-4">
            {allAddress?.length != 0 ? (
              <p>
                {toggle ? (
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-[#030822] ">
                      Saved Address
                    </h2>
                    <div
                      onClick={() => {
                        setToggle(!toggle);
                        setFormData(initialaddress);
                      }}
                      className="cursor-pointer"
                    >
                      New Address
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-[#030822] ">
                      Billing Address
                    </h2>
                    <div
                      onClick={() => setToggle(!toggle)}
                      className="cursor-pointer"
                    >
                      Saved Address
                    </div>
                  </div>
                )}
              </p>
            ) : (
              <h2 className="text-xl font-bold text-[#030822] ">
                Billing Address
              </h2>
            )}
          </div>
          {toggle ? (
            <div>
              <ul>
                {allAddress.map((address: AddressFormData, index: any) => (
                  <li key={index}>
                    <label className="custom-radio">
                      <input
                        type="radio"
                        name="savedAddress"
                        checked={address.id === selectedSavedAddress?.id}
                        onChange={() => {
                          console.log("Selected Address:", address);
                          handleSavedAddressChange(address);
                        }}
                      />
                      <span className="radio-label">
                        {address.address_line1} {address.distic} {address.city}{" "}
                        {address.state}, {address.pincode}
                      </span>
                    </label>
                    {/* <div className="justify-end">Edit</div> */}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <div className="flex gap-2 my-2">
                <div className="flex-1">
                  <label className="block w-full text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    placeholder="john"
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 mt-2 border   focus:border-blue-500 focus:bg-white focus:outline-none"
                    required
                  />
                </div>{" "}
                <div className="flex-1">
                  <label className="block w-full text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    placeholder="doe"
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-2 my-2">
                <div className="flex-1">
                  <div className="mt-2">
                    <label className="block w-full text-gray-700">Email</label>
                    <input
                      type="text"
                      name="email_id"
                      value={formData.email_id}
                      placeholder="abc@gmail.com"
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 mt-2 border  focus:border-blue-500 focus:bg-white focus:outline-none"
                      required
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="mt-2">
                    <label className="block w-full text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone_number"
                      value={formData.phone_number}
                      placeholder=" +91 8652460736"
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 mt-2 border  focus:border-blue-500 focus:bg-white focus:outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <label className="block w-full text-gray-700">
                  Address line 1
                </label>
                <input
                  type="text"
                  name="address_line1"
                  value={formData.address_line1}
                  placeholder="Address line 1"
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 mt-2 border  focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <div className="mt-2">
                <label className="block w-full text-gray-700">
                  Address line 2
                </label>
                <input
                  type="text"
                  name="address_line2"
                  value={formData.address_line2}
                  placeholder="Flat no./House name"
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 mt-2 border  focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>

              {/* <div className="mt-2">
                <label className="block w-full text-gray-700">Landmark</label>
                <input
                  type="text"
                  name="landmark"
                  placeholder="Flat no./House name"
                  value={formData.landmark}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 mt-2 border  focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div> */}

              <div className="mt-2">
                <label className="block w-full text-gray-700">State</label>
                <StateInput
                  selectedState={formData.state}
                  onStateChange={handleStateChange}
                />
              </div>
              <div className="flex gap-2 my-2">
                <div className="flex-1">
                  <label className="block w-full text-gray-700">Landmark</label>
                  <input
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    placeholder="Example: Irani Cafe"
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 mt-2 border   focus:border-blue-500 focus:bg-white focus:outline-none"
                  />
                </div>{" "}
                <div className="flex-1">
                  <label className="block w-full text-gray-700">Distirct</label>
                  <input
                    type="text"
                    name="distic"
                    value={formData.distic}
                    placeholder="Example: Mumbai"
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex gap-2 my-2">
                <div className="flex-1">
                  <label className="block w-full text-gray-700">
                    City/Town
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    placeholder="Example: Mumbai"
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 mt-2 border   focus:border-blue-500 focus:bg-white focus:outline-none"
                  />
                </div>{" "}
                <div className="flex-1">
                  <label className="block w-full text-gray-700">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    placeholder="Example: 400019"
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex gap-2 my-4">
                <input
                  type="checkbox"
                  name="defaultAddress"
                  className="accent-secondary-900"
                  onChange={handleInputChange}
                />
                <p>Use this as your default Address</p>
              </div>
              <div>
                {isAddressSaved ? (
                  <button className="bg-[#CFF8EF] w-full my-4 p-3">
                    Address saved successfully!
                  </button>
                ) : (
                  <div className="flex gap-2 ">
                    <div className="flex-1  text-center ">
                      <button
                        onClick={resetFormFields}
                        className="border border-black w-full h-full py-3"
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="flex-1  text-center">
                      <button
                        onClick={handleSave}
                        className="bg-primary text-white w-full h-full py-3"
                      >
                        Save Address
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Address;
