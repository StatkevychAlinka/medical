import React from "react";

interface RatingProps {
  rating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex space-x-1">
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <div
          style={{
            clipPath:
              'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
           
          }}
            key={`full-${i}`}
            className="w-3 h-3 bg-yellow-400 clip-star"
          ></div>
        ))}
      {hasHalfStar && (
        <div
         style={{
    clipPath:
      'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
   
  }}
        
        className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-gray-300 clip-star"></div>
      )}
      {Array(emptyStars)
        .fill(0)
        .map((_, i) => (
          <div
          style={{
            clipPath:
              'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
           
          }}
            key={`empty-${i}`}
            className="w-3 h-3 bg-gray-300 clip-star"
          ></div>
        ))}
    </div>
  );
};

export default Rating;
