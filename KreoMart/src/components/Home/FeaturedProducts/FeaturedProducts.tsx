"use client";
import { useState, useEffect } from "react";
import styles from "./FeaturedProducts.module.css";
import BestSellers from "./BestSellers";
import NewArraivals from "./NewArraivals";
import { BestSeller, NewArrivals } from "../../../../typings";
import axios from "axios";
import { UseCartStore } from "@/store/store";

export const FeaturedProducts = () => {
  const { getbestseller, getnewarrival } = UseCartStore((state) => ({
    getbestseller: state.getbestseller,
    getnewarrival: state.getnewarrival,
  }));
  const [bestSeller, bestSellerView] = useState(true);
  const [newArrivals, newArrvalsView] = useState(false);
  const [bestSellerProduct, setBestSellerProduct] = useState<BestSeller | null>(
    null
  );
  const [newArrivalProduct, setNewArrivalProduct] =
    useState<NewArrivals | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchProd = async () => {
      try {
        const bestprod = await getbestseller();
        const newarrivprod = await getnewarrival();
        if (bestprod) {
          setBestSellerProduct(bestprod);
        } else {
          console.log("No response is coming from Bestseller ");
        }
        if (newarrivprod) {
          setNewArrivalProduct(newarrivprod);
        } else {
          console.log("No response is coming from Newsletter ");
        }
      } catch (error) {
        console.log("Fetching error for best seller and new arrivals: ", error);
      }
    };

    fetchProd();
  }, []);

  return (
    <div className="my-16">
      <div className=" mb-4 ">
        <h1 className="sm:text-xl  hidden sm:block   text-center mb-8 text-[#030822]">
          <span
            className={`${styles.sec_nav} ${
              bestSeller && styles.active
            } hover:font-normal`}
            onClick={() => {
              bestSellerView(true);
              newArrvalsView(false);
            }}
          >
            Best Sellers
          </span>
          <br className="sm:hidden " />
          <span
            className={`${styles.sec_nav} ${
              newArrivals && styles.active
            } hover:font-normal inline-block !mt-4 sm:!mt-0`}
            onClick={() => {
              bestSellerView(false);
              newArrvalsView(true);
            }}
          >
            New Arrivals
          </span>
        </h1>
      </div>

      <div className="hidden sm:block">
        <div>
          {(bestSeller && bestSellerProduct) || isMobile ? (
            <BestSellers product={bestSellerProduct} />
          ) : null}
        </div>
        <div>
          {(newArrivals && newArrivalProduct) || isMobile ? (
            <NewArraivals product={newArrivalProduct} />
          ) : null}
        </div>
      </div>
      <div className="sm:hidden">
        {bestSellerProduct && <BestSellers product={bestSellerProduct} />}
        {newArrivalProduct && <NewArraivals product={newArrivalProduct} />}
      </div>
    </div>
  );
};

function LoadMore() {
  return (
    <div className="flex justify-center my-5 py-6">
      <button className="justify-center items-center text-center text-sm  py-4 px-6 border-2 box-border border-solid border-gray-default font-medium  ">
        Load More
      </button>
    </div>
  );
}
