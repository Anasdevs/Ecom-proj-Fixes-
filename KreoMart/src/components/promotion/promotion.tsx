"use client";
import { useState } from "react";
import Icon from "../shared/Icon";

export default function Promotion() {
  const [isPromotionVisible, setPromotionVisible] = useState(true);

  const handleClose = () => {
    setPromotionVisible(false);
  };

  return (
    <>
      {isPromotionVisible && (
        <div className="flex p-3 justify-between items-center bg-secondary bg-gradient-to-r from-yellow-300 to-yellow-500 text-white font-bold text-lg md:text-xl mx-auto max-w-screen-3xl rounded-md shadow-lg">
          <div className="flex-grow text-center max-w-screen-3xl">
            <span className="mr-2">🎉</span>
            Enjoy a special promotion: 70% off on orders above Rs. 2499!
            <span className="ml-2">🎉</span>
          </div>
          <button onClick={handleClose}>
            <Icon name={"Close"} size={24} />
          </button>
        </div>
      )}
    </>
  );
}
