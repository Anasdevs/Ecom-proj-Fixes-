import React from "react";
import RadioButton from "./RadioButton";
const SortProductMobile = () => {
  const radioOptions = [
    { label: "lowest price", value: "lowest price" },
    { label: "highest price", value: "highest price" },
    { label: "recommended", value: "recommended" },
    { label: "What's new", value: "What's new" },
    { label: "discount", value: "option3" },
  ];
  return (
    <div className="flex-row justify-center text-base">
      <RadioButton options={radioOptions} />
      <div className=" w-5/6 fixed bottom-14 flex justify-center">
        <button className=" w-5/6 h-14 bg-primary text-white">
          Show 4 items
        </button>
      </div>
    </div>
  );
};

export default SortProductMobile;
