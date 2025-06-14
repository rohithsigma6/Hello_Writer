// import React from 'react'
import YellowStar from "@/assets/userFeedback/yellow-star.svg"
import GreyStar from "@/assets/userFeedback/grey-star.svg"

const StarRating = ({ rating = 4 }: { rating?: number }) => {
    const totalStars = 5;

    return (
        <div className="flex flex-row gap-1 items-center">
            {Array.from({ length: totalStars }).map((_, index) => (
                <img
                    key={index}
                    src={index < rating ? YellowStar : GreyStar}
                    alt="star"
                    className="w-5 h-5"
                />
            ))}
        </div>
    );
};

export default StarRating