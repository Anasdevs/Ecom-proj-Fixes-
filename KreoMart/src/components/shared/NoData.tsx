import React, { useEffect, useState } from "react";

const NoData = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prevVisible) => !prevVisible);
    }, 2000); // Change the duration of each animation cycle (in milliseconds) as needed

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
      {/* First column */}
      <div className="w-3/5 bg-secondary-200 rounded-lg p-20 ">
        {/* <div
          className={`h-8 w-1/2 px-10 bg-gray-200 rounded-t-lg ${
            isVisible ? "opacity-0" : "opacity-100"
          } transition-opacity duration-500`}
        ></div> */}

        {/* This div will occupy 60% of the width and display a blue background color */}
        <div className="flex justify-center items-center h-16 bg-white rounded-t-lg">
          <h2
            className={`text-2xl font-bold text-gray-800 ${
              isVisible ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300`}
          >
            Oops! Looks like there are no products here.
          </h2>
        </div>
        <div className="bg-white rounded-b-lg p-4 justify-center items-center ">
          <p className="text-gray-700 text-lg font-medium">
            Don&apos;t worry, we&apos;re constantly updating our inventory to
            provide you with the best products. Check back later!
          </p>
        </div>
      </div>

      {/* Second column
      <div className="w-2/5 flex flex-col justify-center items-center">
        <img
          src="/path/to/your/image.svg"
          alt="No data illustration"
          className="w-48 h-48"
        />
      </div> */}
    </div>
  );
};

export default NoData;
