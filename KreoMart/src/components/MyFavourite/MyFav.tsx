"use client";
import React, { useEffect, useState } from "react";
import Products from "../BestSeller/Products";
import Myfav_Card from "./Myfav_Card";
import { UseCartStore } from "@/store/store";
import { GetMyFav } from "../../../typings";

const MyFav = () => {
  const { getFav } = UseCartStore((state) => ({ getFav: state.getFav }));
  const [favdata, setFavData] = useState<GetMyFav | undefined>();
  useEffect(() => {
    try {
      const GetFav = async () => {
        const myFav = await getFav();
        setFavData(myFav);
        console.log("My favourite data: ", favdata);
      };
      GetFav();
    } catch (error) {
      console.log("Getting all Favourite: ", error);
    }
  }, []);
  return (
    <div className=" py-8">
      <div className="container">
        {/* <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> */}
        <div className="flex flex-wrap gap-2 justify-center ">
          {favdata?.results.map((data, index) => (
            <div key={index}>
              <Myfav_Card data={data} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyFav;
