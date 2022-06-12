import React from "react";

const Rating = ({ children, rating }) => {
  return (
    <div
      className={`${
        rating > 3
          ? "text-green-600"
          : rating === 3
          ? "text-yellow-600"
          : "text-red-600"
      } flex text-lg`}
    >
      {children}
    </div>
  );
};

export default Rating;
