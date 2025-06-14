import React, { useRef } from 'react'
import { FaAnglesLeft, FaAnglesRight } from 'react-icons/fa6';

const ActiveButton = ({
    activeButton,
    setActiveButton
}: {
    activeButton: string;
    setActiveButton: (value: string) => void;
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 220; // Adjust based on your button width
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    const buttonList = [
        "Shot Information",
        "All Elements",
        "Scene Layout and Dynamics",
        "Schedule Shoot",
        "Budget",
        "Tasks & Additional Notes",
        "Take Initiative"
    ];

    return (
        <div className="flex flex-row items-center justify-between gap-1 rounded-xl bg-[#BABABF] w-full p-1">
            <button
                onClick={() => scroll("left")}
                className="p-2.5 border-r border-gray-200 hover:bg-white rounded-l-lg transition-opacity"
            >
                <FaAnglesLeft />
            </button>

            <div
                ref={scrollRef}
                className="hide-scrollbar flex flex-row w-full overflow-x-auto items-center gap-2 scroll-smooth"
            >
                {buttonList.map((btn) => (
                    <button
                        key={btn}
                        onClick={() => setActiveButton(btn)}
                        className={`p-2.5 rounded-xl text-sm whitespace-nowrap transition ${activeButton === btn
                                ? "bg-white text-black font-medium"
                                : "bg-transparent text-gray-800"
                            }`}
                    >
                        {btn}
                    </button>
                ))}
            </div>

            <button
                onClick={() => scroll("right")}
                className="p-2.5 border-l border-gray-200 hover:bg-white rounded-r-lg transition-opacity"
            >
                <FaAnglesRight />
            </button>
        </div>
    );
};

export default ActiveButton;
