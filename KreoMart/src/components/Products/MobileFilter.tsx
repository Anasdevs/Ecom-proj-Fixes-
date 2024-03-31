"use client";
import React, { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FilterProductMobile from "./FilterProductMobile";
import SortProductMobile from "./SortProductMobile";
import Icon from "../shared/Icon";

const MobileFilter = () => {
  const [isFilterFixed, setIsFilterFixed] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.getElementById("footer");
      const filterContainer = document.getElementById("filter-container");
      if (footer && filterContainer) {
        const footerTop = footer.getBoundingClientRect().top;
        const filterContainerHeight = filterContainer.offsetHeight;

        setIsFilterFixed(footerTop > filterContainerHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div
        id="filter-container"
        className={`flex justify-between fixed bottom-0 w-full md:hidden bg-white z-50 ${
          isFilterFixed ? "block" : "hidden"
        }`}
      >
        <div className="flex-item mx-auto p-4">
          <Dialog>
            <DialogTrigger asChild>
              <button>
                Filter
                <Icon name={"Filter"} size={24} />
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Filter</DialogTitle>
              </DialogHeader>
              <FilterProductMobile />
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex-item mx-auto p-4">
          <Dialog>
            <DialogTrigger asChild>
              <button>
                Sort
                {/* <img src="./assests/Sort.png" alt="Sort" /> */}
                <Icon name={"Sort"} size={24} />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Sort</DialogTitle>
              </DialogHeader>
              <SortProductMobile />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default MobileFilter;
