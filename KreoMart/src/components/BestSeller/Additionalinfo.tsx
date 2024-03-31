import React from "react";

interface AdditionalInfoProps {
  data: any;
}

const Additionalinfo: React.FC<AdditionalInfoProps> = ({ data }) => {
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

export default Additionalinfo;
