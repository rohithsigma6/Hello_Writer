import { useEffect, useState } from "react";
import { IoChevronDown, IoCloseSharp } from "react-icons/io5";

interface Props {
    setFeatures: (features: string[]) => void;
    ArrayObj: string[];
}

const FeaturesSelector = ({ setFeatures, ArrayObj }: Props) => {
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    useEffect(() => {
        setFeatures(selectedFeatures);
    }, [selectedFeatures]);

    const handleSelect = (option: string) => {
        if (selectedFeatures.includes(option)) {
            setSelectedFeatures(prev => prev.filter(item => item !== option));
        } else {
            setSelectedFeatures(prev => [...prev, option]);
        }
    };

    const handleRemove = (option: string) => {
        setSelectedFeatures(prev => prev.filter(item => item !== option));
    };

    return (
        <section className="relative w-fit min-w-56">
            <button
                type="button"
                className="w-full border-[1px] border-gray-300 rounded-xl p-3 text-sm font-medium flex flex-row justify-between items-center gap-2 cursor-pointer transition-colors"
                onClick={() => setShowDropdown(!showDropdown)}
            >
                {selectedFeatures.length > 0 ? (
                    <div className="flex items-center gap-2">
                        <div className="flex flex-row items-center gap-2 border border-gray-300 rounded-3xl px-3 py-1">
                            <p className="text-sm">{selectedFeatures[0]}</p>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemove(selectedFeatures[0]);
                                }}
                                className="cursor-pointer hover:bg-[#000] hover:text-white rounded-2xl p-0.5"
                            >
                                <IoCloseSharp />
                            </button>
                        </div>
                        {selectedFeatures.length > 1 && (
                            <span className="border border-gray-300 px-2 py-1 rounded-full text-xs">
                                +{selectedFeatures.length - 1}
                            </span>
                        )}
                    </div>
                ) : (
                    "Select Feature"
                )}
                <span className="text-lg">
                    <IoChevronDown />
                </span>
            </button>

            {showDropdown && (
                <div className="absolute w-full z-[999] mt-0.5 bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                    {ArrayObj.map(option => (
                        <div
                            key={option}
                            className={`p-2 px-3 w-full text-sm cursor-pointer rounded-xl hover:bg-gray-100 ${selectedFeatures.includes(option) ? "font-medium" : ""
                                }`}
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default FeaturesSelector;
