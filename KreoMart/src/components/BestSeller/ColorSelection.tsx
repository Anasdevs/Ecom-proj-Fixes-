import React, { useState } from "react";
import { ChangeEvent } from 'react';

const ColorSelection = () => {
  const options = ['Red', 'Blue', 'Green', 'Yellow', 'Purple'];
  const [selectedColor, setSelectedColor] = useState('');

  const onColorChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedColorValue = event.target.value;
    setSelectedColor(selectedColorValue);
  };

  return (
    <>
      <center>
        <h1>Welcome to Color Selection</h1>
        <h3>Select a color from the dropdown:</h3>

        <select onChange={onColorChangeHandler}>
          <option>Please choose a color</option>
          {options.map((color, index) => (
            <option key={index}>{color}</option>
          ))}
        </select>

        <div style={{ color: selectedColor.toLowerCase() }}>
          Color
        </div>
      </center>
    </>
  );
};

export default ColorSelection;
