import React from "react";
import ReviewContent from "./ReviewContent";
interface ReviewProps {
  data: number|undefined;
}
const Review: React.FC<ReviewProps> = ({data}) => {
  return (
    <div>
      <ReviewContent revid = {data} />
    </div>
  );
};

export default Review;
