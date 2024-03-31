import React from "react";
interface TabProps {
  label: string;
  activeTab: string;
  onClick: (label: string) => void;
}
const Tab: React.FC<TabProps> = ({ label, activeTab, onClick }) => {
  const isActive = activeTab === label;

  return (
    <div
      className={`tab ${
        isActive ? "active" : ""
      } font-medium text-xl text-gray-default `}
      onClick={() => onClick(label)}
    >
      {label}
    </div>
  );
};

export default Tab;
