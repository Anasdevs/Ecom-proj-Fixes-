import React, { useState, ChangeEvent } from "react";

interface RadioButtonProps {
  options: { label: string; value: string }[];
}

function RadioButton({ options }: RadioButtonProps) {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="flex flex-col">
      {options.map((option) => (
        <label key={option.value} className="block my-2">
          <input
            type="radio"
            value={option.value}
            checked={selectedOption === option.value}
            onChange={handleOptionChange}
            className="mr-2 cursor-pointer"
          />
          {option.label}
        </label>
      ))} 
    </div>
  );
}

export default RadioButton;
