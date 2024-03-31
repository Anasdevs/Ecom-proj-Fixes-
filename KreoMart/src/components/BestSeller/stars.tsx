// import React from "react";
// import stars from "../../../public/assets/Star.png";
// import halfstar from "../../../public/assets/Half star.png";
// import Image from "next/image";
// import Icon from "../shared/Icon";

// const Stars = () => {
//   return (
//     <div>
//       <div className="flex">
//         <Icon name="Star" size={24} />
//         <Icon name="Star" size={24} />
//         <Icon name="Star" size={24} />
//         <Icon name="Star" size={24} />
//         <Icon name="Halfstar" size={24} />
//       </div>
//     </div>
//   );
// };

// export default Stars;

import React from "react";
import Icon from "../shared/Icon";

interface StarsProps {
  ratingCount: number;
}

const Stars: React.FC<StarsProps> = ({ ratingCount }) => {
  const filledStars = Math.floor(ratingCount);
  const hasHalfStar = ratingCount - filledStars >= 0.5;

  const renderStars = () => {
    const starArray = [];

    for (let i = 0; i < filledStars; i++) {
      starArray.push(<Icon key={i} name="Star" size={24} />);
    }

    if (hasHalfStar) {
      starArray.push(<Icon key="half" name="Halfstar" size={24} />);
    }

    return starArray;
  };

  return <div className="flex">{renderStars()}</div>;
};

export default Stars;
