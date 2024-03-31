"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Icon from "../shared/Icon";
import axios from "axios";
interface Props {
  params: {
    uid: string;
    token: string;
  };
}
const Reset = ({ params }: Props) => {
  console.log(params.uid, params.token);
  const [createpassword, setcreatePassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const router = useRouter();
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);
  const [showcreatePassword, setShowcreatePassword] = useState(false);
  const [createpasswordError, setcreatePasswordError] = useState<
    JSX.Element | string
  >("");
  const [confirmpasswordError, setconfirmPasswordError] = useState<
    JSX.Element | string
  >("");

  const handlecreatePasswordToggle = () => {
    setShowcreatePassword(!showcreatePassword);
  };
  const handleconfirmPasswordToggle = () => {
    setShowconfirmPassword(!showconfirmPassword);
  };

  const validatePassword = (password: string) => {
    // Use a regular expression to check if the password meets the criteria
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    return passwordPattern.test(password);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Submitting form...");
    const fetchActivation = async ({
      uid,
      token,
    }: {
      uid: string;
      token: string;
    }) => {
      try {
        const response = await axios({
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          url: `https://api.kreomart.com/api/accounts/user/password/reset/confirm/${uid}/${token}/`,
          data: {
            new_password: createpassword,
            confirm_new_password: confirmpassword,
          },
        });

        if (response.status === 200) {
          console.log(response);
          router.push("/login");
        } else {
          console.log("Error");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    try {
      await fetchActivation(params);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className=" flex items-center justify-center">
      <div className=" rounded-2xl items-center max-w-lg sm:max-w-4xl w-full">
        <div className="items-center  text-sm md:text-md">
          <form
            className="mt-6 mx-20 "
            onSubmit={handleSubmit}
            action="#"
            method="POST"
          >
            <div>
              <div className="text-center justify-center">
                <Image
                  className="mx-auto p-2"
                  src="./assets/logo-mobo.svg"
                  alt="Logo"
                  width={50}
                  height={50}
                />
              </div>
              <h2 className="text-2xl mb-4 font-bold text-[#030822] text-center ">
                Reset Password
              </h2>
            </div>

            <label className="block w-full text-gray-700">New Password</label>
            <div className=" relative">
              <input
                type={showcreatePassword ? "text" : "password"}
                value={createpassword}
                onChange={(e) => setcreatePassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full px-4 py-3 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              />
              <button
                type="button"
                onClick={handlecreatePasswordToggle}
                className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-600 cursor-pointer"
              >
                {showcreatePassword ? (
                  <Image
                    src="/assets/Eye Open.png"
                    className="items-center pt-2"
                    alt={""}
                    width={20}
                    height={20}
                  />
                ) : (
                  <Image
                    src="/assets/Eye cross.png"
                    className=" items-center pt-2"
                    alt={""}
                    width={20}
                    height={20}
                  />
                )}
              </button>
            </div>
            {createpasswordError && (
              <p className="text-sm mt-1">{createpasswordError}</p>
            )}
            <label className="block w-full text-gray-700">
              Confirm Password
            </label>
            <div className=" relative">
              <input
                type={showconfirmPassword ? "text" : "password"}
                value={confirmpassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full px-4 py-3 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              />
              <button
                type="button"
                onClick={handleconfirmPasswordToggle}
                className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-600 cursor-pointer"
              >
                {showconfirmPassword ? (
                  <Image
                    src="/assets/Eye Open.png"
                    className="items-center pt-2"
                    alt={""}
                    width={20}
                    height={20}
                  />
                ) : (
                  <Image
                    src="/assets/Eye cross.png"
                    className=" items-center pt-2"
                    alt={""}
                    width={20}
                    height={20}
                  />
                )}
              </button>
            </div>
            {confirmpasswordError && (
              <p className="text-sm mt-1">{confirmpasswordError}</p>
            )}
            <button
              type="submit"
              className="w-full  bg-[#020044] hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold  px-4 py-3 mt-6"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reset;
