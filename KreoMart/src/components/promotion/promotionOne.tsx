"use client";
import { useState } from "react";
import Icon from "../shared/Icon";

export default function PromotionOne() {
  const [isPromotionVisible, setPromotionVisible] = useState(true);

  const handleClose = () => {
    setPromotionVisible(false);
  };

  return (
    <>
      {isPromotionVisible && (
        <div className="flex p-3 justify-start items-center bg-gradient-to-r from-yellow-300 to-yellow-500 text-white font-bold text-lg md:text-xl mx-auto max-w-screen-3xl rounded-md shadow-lg">
          <div className="flex items-center" style={{ width: "70%" }}>
            <img
              src="/assets/womensFootweaarCat.PNG"
              alt="Product 1"
              className="h-[200px] w-full mr-4"
            />
            {/* <span>Check out our latest collection!</span> */}
          </div>
          <div className="flex items-center" style={{ width: "30%" }}>
            {/* <span>Don't miss our exclusive deals!</span> */}
            <img
              src="/assets/productBnner.PNG"
              alt="Product 2"
              className="h-[200px] w-full  ml-4"
            />
          </div>
          {/* <button onClick={handleClose}>
            <Icon name={"Close"} size={24} />
          </button> */}
        </div>
      )}
    </>
  );
}
