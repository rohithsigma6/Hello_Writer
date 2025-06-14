import React, { useEffect } from 'react';
import { HiOutlineViewGrid } from 'react-icons/hi';
import { TfiLayoutListThumb } from 'react-icons/tfi';

const ToggleShot = ({
    activebtn,
    setActiveBtn
}: {
    activebtn: string;
    setActiveBtn: (value: "Shot Breakdown" | "Shot List") => void;
}) => {

    return (
        <section className='flex flex-row w-fit gap-x-0 bg-[#E3E3E8] p-1 rounded-2xl'>
            <button
                onClick={() => setActiveBtn("Shot Breakdown")}
                className={`flex flex-row text-sm items-center gap-1 px-3 rounded-xl p-2 ${activebtn === "Shot Breakdown"
                    ? "bg-[#212131] hover:bg-black transition-colors font-medium text-white"
                    : "bg-transparent text-gray-500"
                    }`}
            >
                {/* @ts-ignore */}
                <HiOutlineViewGrid className='text-xl' />
                Shot Breakdown
            </button>
            <button
                onClick={() => setActiveBtn("Shot List")}
                className={`flex flex-row text-sm items-center gap-1 px-3 rounded-xl p-2 ${activebtn === "Shot List"
                    ? "bg-[#212131] hover:bg-black transition-colors font-medium text-white"
                    : "bg-transparent text-gray-500"
                    }`}
            >
                {/* @ts-ignore */}
                <TfiLayoutListThumb className='text-xl' />
                Shot List
            </button>
        </section>
    );
};

export default ToggleShot;
