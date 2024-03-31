import React from "react";
import RadioButton from "../Products/RadioButton";

const Filter = () => {
  const radioOptions = [
    { label: "All", value: "All" },
    { label: "On the way", value: "On the way" },
    { label: "Delivered", value: "Delivered" },
    { label: "Cancelled", value: "Cancelled" },
    { label: "Returned", value: "Returned" },
    { label: "All time", value: "All time" },
    { label: "Last 30 days", value: "Last 30 days" },
    { label: "Last 6 months", value: "Last 6 months" },
    { label: "Last year", value: "Last year" },
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

export default Filter;
