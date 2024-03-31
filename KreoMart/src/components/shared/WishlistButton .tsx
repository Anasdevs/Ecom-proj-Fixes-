// WishlistButton.tsx
import React from "react";
import Image from "next/image";
import LikedIcon from "../../../public/assets/Favourite-liked.png";
import UnlikedIcon from "../../../public/assets/Favourite=False.png";

interface WishlistButtonProps {
  onToggle: () => void;
  isLiked: boolean;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({
  onToggle,
  isLiked,
}) => {
  const handleButtonClick = () => {
    onToggle();
  };

  return (
    <button onClick={handleButtonClick}>
      <Image
        className="relative w-6 h-6 overflow-hidden shrink-0"
        src={isLiked ? LikedIcon : UnlikedIcon}
        alt="Wishlist"
        width={20}
        height={20}
      />
    </button>
  );
};

export default WishlistButton;
