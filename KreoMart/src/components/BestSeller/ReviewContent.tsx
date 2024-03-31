import React, { useState, useEffect } from "react";
import Stars from "./stars";
import { ReviewResult } from "../../../typings";
import Image from "next/image";

interface ReviewProps {
  revid: number | undefined;
}

const ReviewContent: React.FC<ReviewProps> = ({ revid }) => {
  const [reviews, setReviews] = useState<ReviewResult[]>();

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const response = await fetch(
          `https://api.kreomart.com/api/products/all/rating/${revid}`
        );
        const data = await response.json();
        console.log("Fetched review data:", data);
        setReviews(data.results);
      } catch (error) {
        console.error("Error fetching review data", error);
      }
    };

    fetchReviewData();
  }, [revid]);

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" });

    const getOrdinalSuffix = (number: number) => {
      if (number >= 11 && number <= 13) {
        return "th";
      }
      const lastDigit = number % 10;
      switch (lastDigit) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    // Format the date as desired
    const ordinalSuffix = getOrdinalSuffix(day);
    const formattedDate = `${day}${ordinalSuffix} ${new Intl.DateTimeFormat(
      "en-US",
      {
        month: "short",
      }
    ).format(date)} ${year}, ${dayOfWeek}`;

    return formattedDate;
  };
  return (
    <div>
      <div></div>
      {reviews?.map((review) => (
        <div key={review.id} className="flex  flex-col gap-x-[76px] my-[40px] ">
          <div className="flex flex-col  mb-4">
            <div className="flex  items-center mb-4">
              <Image
                height={28}
                width={28}
                src={review.user?.profile_img || "/user.png"}
                alt="User Profile"
                className="rounded-full h-14 w-14 object-cover mr-2"
              />
              <span className="text-xl font-medium text-black">
                {review.user?.full_name}
              </span>
            </div>
            <div className="flex items-basline mb-4 ">
              <Stars ratingCount={review.rating} />
              <div className="text-lg ml-2">
                {formatDate(review.created_at)}
              </div>
            </div>
          </div>
          <div className="  items-center">
            <span className="text-lg font-normal">
              Bought: {review.product.name}
            </span>
            <p className="text-lg font-normal">{review.review}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewContent;
