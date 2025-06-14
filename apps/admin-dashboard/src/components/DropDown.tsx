import { useState } from 'react'
import { IoChevronDown } from 'react-icons/io5';

const DropDown = ({ ArrayObj, setValue }: { ArrayObj: any[], setValue: (value: string) => void; }) => {
    const [rangeType, setRangeType] = useState(ArrayObj[0]);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleSelect = (option: string) => {
        setRangeType(option);
        setShowDropdown(false);
        setValue(option);
    };

    return (
        <section className="relative w-full min-w-30">
            <button
                className="w-full border-[1px] border-gray-300 rounded-xl py-2.5 px-3 text-sm font-medium flex flex-row justify-between items-center gap-2 hover:text-white hover:bg-black cursor-pointer transition-colors"
                onClick={() => setShowDropdown(!showDropdown)}
            >
                {rangeType}
                <span className="text-lg">
                    <IoChevronDown />
                </span>
            </button>

            {showDropdown && (
                <div className="absolute w-full min-w-40 z-[999] mt-0.5 bg-white border border-gray-300 rounded-xl shadow-lg">
                    {ArrayObj.map((option: string) => (
                        <div
                            key={option}
                            className="p-2 px-3 w-full text-sm hover:bg-gray-100 cursor-pointer rounded-xl"
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
};

export default DropDown