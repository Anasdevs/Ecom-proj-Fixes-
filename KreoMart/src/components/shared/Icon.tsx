import React from "react";
import Image from "next/image";

interface Props {
  name: string;
  size: number;
  src?: string | null | undefined;
  className?: string; // Optional source for profile pictures
}

const Icon: React.FC<Props> = ({ name, size, src, className }) => {
  if (src) {
    return (
      <Image
        src={src}
        alt=""
        width={size}
        height={size}
        className={className}
      />
    );
  }

  return (
    <svg width={size} height={size}>
      <use xlinkHref={`/sprite.svg#${name}`} />
    </svg>
  );
};

export default Icon;
