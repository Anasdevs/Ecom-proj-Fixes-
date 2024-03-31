"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
interface FilterComponentProps {
  categories: string[];
  sizes: string[];
  colors: string[];
  handleFilter: (formData: FormData) => void;
}

interface FormData {
  category: string;
  size: string;
  color: string;
  price: string;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  categories,
  sizes,
  colors,
  handleFilter,
}) => {
  const [formData, setFormData] = useState({
    category: "",
    size: "",
    color: "",
    price: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleFilter(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Filter by Category:</h3>
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
        >
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category} value={category}></option>
          ))}
        </select>

        <h3>Filter by Size:</h3>
        <select name="size" value={formData.size} onChange={handleInputChange}>
          <option value="">All</option>
          {sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        <h3>Filter by Color:</h3>
        <select
          name="color"
          value={formData.color}
          onChange={handleInputChange}
        >
          <option value="">All</option>
          {colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>

        <h3>Filter by Price:</h3>
        <select
          name="price"
          value={formData.price}
          onChange={handleInputChange}
        >
          <option value="">All</option>
          <option value="0-500">0 - $20</option>
          <option value="21-50">$21 - $50</option>
          <option value="51-100">$51 - $100</option>
        </select>

        <button type="submit">Apply Filter</button>
      </form>
    </div>
  );
};

export default FilterComponent;
