"use client";
import React from "react";
import leftarrow from "../../../public/assets/arrow-left.png";
import rightarrow from "../../../public/assets/arrow-right.png";

import selected from "../../../public/assets/Selected=True.png";
import shape from "../../../public/assets/Shape.png";
import Image from "next/image";



const Pagination = () => {
  return (
    <div className="relative w-full flex flex-row items-center justify-end gap-[16px]">
      <button>
        <Image
          className="relative w-6 h-6 overflow-hidden shrink-0"
          alt=""
          src={leftarrow}
        />
      </button>

      <div className="flex flex-row items-center justify-start gap-[12px]">
        <button>
          <Image
            className="relative rounded-[100px] w-[17px] h-[17px]"
            alt=""
            src={selected}
          />
        </button>
        <button>
          <Image className="relative w-1.5 h-1.5" alt="" src={shape} />
        </button>
      </div>
      <button>
        <Image
          className="relative w-6 h-6 overflow-hidden shrink-0"
          alt=""
          src={rightarrow}
        />
      </button>
    </div>
  );
};

export default Pagination;
