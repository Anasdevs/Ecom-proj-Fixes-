import React from 'react'
import './tab.css'

interface TabProps {
  label: string;
  activeTab: string;
  onClick: (label: string) => void;
}

const Tab: React.FC<TabProps> = ({ label, activeTab, onClick }) => {
  const isActive = activeTab === label;

  return (
    <div
      className={`tab ${isActive ? "active" : ""} font-medium text-[16px]`}
      onClick={() => onClick(label)}
    >
      {label}
    </div>
  );
};

export default Tab;
