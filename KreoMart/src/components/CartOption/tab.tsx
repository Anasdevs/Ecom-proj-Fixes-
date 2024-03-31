import React from "react";
import "./tab.css"; 
import Image from "next/image";

interface TabProps {
  index: number;
  label: string;
  activeTab: string;
  onClick: (label: string) => void;
  hasContent: boolean; 
}

const Tab: React.FC<TabProps> = ({ index, label, activeTab, onClick, hasContent }) => {
  const isActive = activeTab === label; 
  return (
    <div
      className={`tab ${
        isActive ? "active" : ""
      }  font-medium md:text-[14px] text-[10px] justify-center`}
      onClick={() => onClick(label)}
    >
      <div className="flex gap-2 ">
        <div className=" justify-center ">
        {hasContent ? (
            <Image src="/assets/Success.svg" alt="Success" className="w-8 h-8" height={2} width={2}/>
          ) : (
            <div className="w-8 flex items-center justify-center rounded-full bg-[#2222] ">
              {index}
            </div>
          )}
        </div>
        <div className="justify-center">{label}</div>
      </div>
    </div>
  );
};

export default Tab;
