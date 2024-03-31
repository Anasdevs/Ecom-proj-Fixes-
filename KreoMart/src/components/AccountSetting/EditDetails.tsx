"use client";
import React, { useState } from "react";
interface EditProps {
  handleDetails: () => void;
  firstname: string;
  lastname: string;
  email: string;
  phone: number;
}
const EditDetails: React.FC<EditProps> = ({
  handleDetails,
  firstname,
  lastname,
  email,
  phone,
}) => {
  const [first_name, setFirstname] = useState(firstname);
  const [last_name, setLastname] = useState(lastname);
  const [phone_number, setPhone] = useState<number | any>(phone);
  const [email_id, setEmail] = useState(email);
  return (
    <div className="text-base">
      <form onSubmit={handleDetails}>
        <div className="  w-full flex flex-col p-6 box-border text-lg text-gray-default py-2 ">
          <div>
            <label className="block w-full text-gray-700">First Name</label>
            <input
              type="firstname"
              value={first_name}
              onChange={(e) => setFirstname(e.target.value)}
              className="w-full px-4 py-3  mb-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="block w-full text-gray-700">Last Name</label>
            <input
              type="lastname"
              value={last_name}
              onChange={(e) => setLastname(e.target.value)}
              className="w-full px-4 py-3  mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block w-full text-gray-700">Phone number</label>
            <input
              type="number"
              value={phone_number}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3  mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block w-full text-gray-700">Email</label>
            <input
              type="email"
              value={email_id}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3  mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
            />
            <div className=" text-base font-medium text-gray-500 py-2 ">
              After you change your email, make sure you click on the link in
              the confirmation email we sent you.
            </div>
          </div>
          <div className=" flex flex-row items-start justify-start gap-[24px] text-center text-sm text-gray-default">
            <button
              type="submit"
              className="flex-1 flex flex-row py-4 px-6 items-center justify-center border-[1px] border-solid border-grey-scale-black-russian"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-primary flex flex-row py-4 px-6 items-center justify-center text-white w-full"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditDetails;
