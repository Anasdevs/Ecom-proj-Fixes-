import Image from "next/image";
import React from "react";

import placeholder from "../../../public/assets/placeholder.png";

const EventImage = () => {
  return (
    <div>
      <div className="flex items-center w=full h=full ">
        <Image
          src="/assets/combo.jpg"
          className=" max-h-[450px] object-cover  "
          alt="hero"
          height={450}
          width={450}
          // placeholder="blur"
          // blurDataURL={placeholder.src}
        />
      </div>
    </div>
  );
};

export default EventImage;
