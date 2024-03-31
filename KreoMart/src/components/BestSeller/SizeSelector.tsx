import React, { useState } from 'react';

interface SizeSelectorProps {
  sizes: string[]; // Array of size options
  onSelectSize: (size: string) => void; // Callback function to handle size selection
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ sizes, onSelectSize }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    onSelectSize(size);
  };

  return (
    <div>
      Size:
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => handleSizeSelect(size)}
          style={{ backgroundColor: '#E6E1F4', borderRadius: '4px', margin: '0.2rem' }}
        >
          {size}
        </button>
      ))}
    </div>
  );
};

export default SizeSelector;
