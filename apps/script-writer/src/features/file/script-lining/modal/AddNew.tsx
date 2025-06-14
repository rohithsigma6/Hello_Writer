import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi';
import { RiCloseFill } from 'react-icons/ri';

const AddNew = ({
    title,
    showAddNewModal,
    setShowAddNewModal,
    itemsList,
}: {
    title: string;
    showAddNewModal: boolean;
    setShowAddNewModal: (value: boolean) => void;
    itemsList: any[]
}) => {
    const [showAddManual, setShowAddManual] = useState(true);
    const [options, setOptions] = useState(itemsList);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");

    const toggleCheckbox = (item: string) => {
        setSelectedItems(prev =>
            prev.includes(item)
                ? prev.filter(i => i !== item)
                : [item, ...prev]
        );
    };

    const handleManualAdd = () => {
        if (inputValue.trim() !== "" && !options.includes(inputValue)) {
            setOptions(prev => [inputValue.trim(), ...prev]);
            setSelectedItems(prev => [inputValue.trim(), ...prev]);
            setInputValue("");
        }
    };

    const handleSave = () => {
        console.log("Selected Items:", selectedItems);
        setShowAddNewModal(false);
    };

    return (
        <div
            className={`${showAddNewModal ? "block " : "hidden "}py-16 px-20 z-10 w-full h-full fixed left-0 right-0 top-0 bg-[#0000004f] overflow-auto font-poppins flex items-start justify-center`}
            onClick={() => setShowAddNewModal(false)}
        >
            <div
                className="w-full max-w-lg p-0 rounded-2xl bg-white flex flex-col gap-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-row justify-between items-center py-3 px-6 border-b border-gray-300">
                    <h1 className="font-semibold text-base">Add {title}</h1>
                    <button
                        onClick={() => setShowAddNewModal(false)}
                        className="bg-white text-lg hover:border-gray-400 border border-white transition-colors rounded-full p-2"
                    >
                        {/* @ts-ignore */}
                        <RiCloseFill />
                    </button>
                </div>

                <section className="p-6 py-0">
                    <div className="flex flex-row items-center relative w-full">
                        <input
                            type="text"
                            name="search"
                            className="p-3 w-full rounded-xl bg-[#FFF] border border-gray-400 font-normal pr-10"
                            placeholder="Search"
                        />
                        <span className="absolute right-4 text-xl">
                            {/* @ts-ignore */}
                            <FiSearch />
                        </span>
                    </div>
                </section>

                <section className="px-6">
                    <div className="flex flex-col gap-4 border border-gray-400 p-4 rounded-xl max-h-52 overflow-y-auto">
                        {options.map((item) => (
                            <div key={item} className="flex flex-row gap-2 items-center">
                                <input
                                    type="checkbox"
                                    name="select"
                                    checked={selectedItems.includes(item)}
                                    onChange={() => toggleCheckbox(item)}
                                    className="custom-primary-checkbox"
                                />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="px-6">
                    {showAddManual ? (
                        <div className="flex flex-row items-center space-x-3">
                            <input
                                type="text"
                                placeholder="Add Name"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="p-3 border border-gray-400 rounded-xl flex-1"
                            />
                            <button
                                onClick={handleManualAdd}
                                className="border border-primary-blue p-3 px-6 text-primary-blue rounded-xl font-medium hover:bg-primary-blue hover:text-white"
                            >
                                Add
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowAddManual(true)}
                            className="border border-primary-blue text-primary-blue font-medium text-base w-full p-3 hover:bg-primary-cta hover:text-white transition-colors rounded-xl"
                        >
                            Add Manually +
                        </button>
                    )}
                </section>

                <section className="px-6 border-t border-gray-400 py-4">
                    <div className="flex flex-row items-center justify-end space-x-3">
                        <button
                            onClick={() => setShowAddNewModal(false)}
                            className="font-poppins rounded-xl px-14 text-center text-[#6A6A75] hover:bg-gray-500 hover:text-white transition-colors font-medium py-3 border border-[#9999A0]"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="py-3 font-poppins rounded-xl px-14 text-center max-w-[160px] bg-[#653EFF] hover:bg-[#5835e3] transition-colors text-white"
                        >
                            Save
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AddNew;
