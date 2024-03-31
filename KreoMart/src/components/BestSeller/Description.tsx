import React from "react";
import { ProductDetail } from "../../../typings";

type DescriptionProps = {
  data: any;
};

const Description: React.FC<DescriptionProps> = ({ data }) => {
  if (!data) {
    return null; // or return a placeholder message, or handle as needed
  }
  const lines = data.split("<br>");
  return (
    <div className="text-lg  gap-x-[76px] my-[40px]">
      {/* <div dangerouslySetInnerHTML={{ __html: data }} /> */}
      {lines.map((line: any, index: any) => (
        <div
          key={index}
          dangerouslySetInnerHTML={{ __html: line }}
          style={{ marginBottom: "1rem" }}
        />
      ))}
    </div>
  );
};

export default Description;
