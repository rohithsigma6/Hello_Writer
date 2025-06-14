import { useState } from 'react';

import StarIcon from '@/assets/dashboard/feedback/star.svg';
import RatedStarIcon from '@/assets/dashboard/feedback/yellow-star.svg';
interface StarRatingProps {
  maxStars?: number; // Maximum number of stars
  rating: number; // Current rating
  onRatingChange: (rating: number) => void; // Callback when rating changes
}
export const StarRating: React.FC<StarRatingProps> = ({
  maxStars = 5,
  rating,
  onRatingChange,
}) => {
  const [hover, setHover] = useState<number | null>(null);

  const handleClick = (star: number) => {
    onRatingChange(star);
  };

  return (
    <div className="flex flex-row gap-1">
      {Array.from({ length: maxStars }, (_, index) => {
        const starValue = index + 1;
        const isHighlighted =
          hover !== null ? hover >= starValue : rating >= starValue;

        return (
          <img
            key={index}
            src={isHighlighted ? RatedStarIcon : StarIcon}
            alt={`Star ${starValue}`}
            className="w-10 h-10 cursor-pointer"
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(null)}
            onClick={() => handleClick(starValue)}
          />
        );
      })}
    </div>
  );
};
