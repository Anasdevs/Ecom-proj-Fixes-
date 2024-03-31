"use client";
import Icon from "@/components/shared/Icon";
import React, { useState } from "react";
import { contactUs } from "../../../../typings";
import { postApis } from "@/api/client";

const Contact = () => {
  const [formData, setFormData] = useState<contactUs | any>({
    subject: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await postApis.postContactUs(formData);
      setFormData({ subject: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting contact form:", error);
    }
  };

  return (
    <div className="p-6 text-center text-gray-default">
      <h1 className="text-2xl mx-auto  font-bold mb-4">
        Share Your Thoughts with Us
      </h1>
      <form className="mx-auto max-w-[700px] text-lg" onSubmit={handleSubmit}>
        <div className="flex gap-6 justify-between">
          <div className="mb-4 w-full">
            <label htmlFor="name" className="text-left block  mb-1">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-400  shadow-lg "
              required
            />
          </div>

          <div className="mb-4 w-full">
            <label htmlFor="email" className="text-left block  mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-400  shadow-lg "
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block mb-1">
            Message
          </label>
          <textarea
            typeof="text"
            name="message" // Add the name attribute
            value={formData.message}
            onChange={handleChange}
            className="w-full h-40 px-4 py-2 border border-gray-400 shadow-lg  "
            required
          ></textarea>
        </div>

        <div className="justify-center">
          <button type="submit" className="bg-primary py-2 px-6 text-white ">
            <div className="flex items-center">
              <div className=" text-lg">Send Message</div>
              <div>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.5 16L18.5 12M18.5 12L14.5 8M18.5 12L6.5 12"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </button>
        </div>
      </form>
      <div className="mt-10 ">
        <div className="mb-1  text-xl font-semibold text-gray-default">
          For any query you can
        </div>
        <div className="flex justify-center text-gray-default ">
          <div className="text-lg ">Whatsapp </div>{" "}
          <div className="mx-1">
            <Icon name={"whatsapp"} size={24} />
          </div>{" "}
          <div className="text-lg"> or call us on 8976723743</div>{" "}
        </div>
        <div className="mt-4 text-gray-default">
          <div className="mb-1 text-xl font-semibold">Opening hours</div>
          <div className="text-lg">Sunday - Saturday: 8:00am - 11pm</div>
        </div>
      </div>

      <div className="font-semibold text-xl mt-10 text-gray-default">
        Want to reach us old style? Here is our postal address
        <h1 className="my-4 text-gray-default text-lg font-medium">
          98-Vatsala Tai Naik Nagar <br /> S.G Barve Road <br /> Chembur ,
          Mumbai-400071 .<br /> Maharashtra, India
        </h1>
      </div>
    </div>
  );
};

export default Contact;
