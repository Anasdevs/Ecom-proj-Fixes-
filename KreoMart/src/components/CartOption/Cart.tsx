"use client";
import React, { useEffect, useState } from "react";

import CartObject from "./CartObject";

import { UseCartStore } from "@/store/store";
interface CartProps {
  label: string;
  activeTab: string;
  handClick: (label: string) => void;
  reload: boolean;
  setReload: (val: boolean) => void
}

const Cart: React.FC<CartProps> = ({ label, activeTab, handClick, reload, setReload }) => {
  const [quantity, setQuantity] = useState();
  const [loading, setLoading] = useState(false);

  const { cart, getAllCart } = UseCartStore((state) => ({
    cart: state.cart,
    getAllCart: state.getAllCart,
  }));

  useEffect(() => {
    getAllCart();
    setReload(!reload);
  }, [quantity]);
  return (
    <>
      <div className="flex-item w-[340px] md:w-[600px] relative bg-white flex-row mx-auto md:mx-0 justify-center gap-[12px] p-4 text-base ">
        {cart?.results?.cart_data?.map((item, index) => (
          <div key={index}>
            <CartObject data={item} quantity={item.quantity} setQuantity={setQuantity} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Cart;
