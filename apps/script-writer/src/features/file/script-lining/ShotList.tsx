import React, { useEffect, useState } from 'react'
import { BiPlus } from 'react-icons/bi';
import { FaRegFilePdf, FaRegStar, FaStar, FaThList } from 'react-icons/fa';
import { FiDownload, FiGrid, FiSearch } from 'react-icons/fi';
import { HiOutlinePaintBrush } from 'react-icons/hi2';
import { IoGrid } from 'react-icons/io5';
import { RiSortNumberAsc } from 'react-icons/ri';
import { PiDotsThreeOutlineVerticalDuotone } from "react-icons/pi";
import ToggleShot from './ToggleShot';
import { useEditorStore } from '@/store/editor';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { ChevronLeft, ChevronRight, Settings } from 'lucide-react';
import NewShot from './modal/NewShot';
import { shots } from './shotsList';


interface ShotItem {
    _id: string;
    [key: string]: string | number | boolean | string[] | undefined;
    image: string;
    tags: string[]
}

const ShotList = ({ activebtn, setActiveBtn, setActiveShot }: { activebtn: string, setActiveBtn: (value: "Shot Breakdown" | "Shot List") => void; setActiveShot: (value: string) => void }) => {
    const [viewMode, setViewMode] = useState<"table" | "grid">("grid")
    const [showAddNewShot, setShowAddNewShot] = useState(false);
    const [showExportOptions, setShowExportOptions] = useState(false);

    useEffect(() => {
        console.log(showAddNewShot);
    }, [showAddNewShot])

    return (
        <>
            <div className="p-6 rounded-3xl bg-white w-full h-fit font-['Poppins']">
                <section className="flex flex-row justify-between">
                    <div className="flex flex-row gap-2 items-center">
                        {/* @ts-ignore */}
                        <FiGrid className="text-primary-cta text-2xl" />
                        <h1 className='font-bold text-lg'>Shots {`(12)`}</h1>
                    </div>

                    <div className="flex flex-row gap-3 items-center">
                        <button className="bg-gray-800 hover:bg-black transition-colors text-white text-sm font-medium flex flex-row items-center gap-2 rounded-full px-7 py-2.5">
                            Add
                            {/* @ts-ignore */}
                            <BiPlus />
                        </button>

                        <div className="relative">
                            <button onClick={() => setShowExportOptions(true)} className="text-sm border border-black rounded-full px-7 py-2.5 flex flex-row items-center gap-2 hover:bg-black hover:text-white transition-colors">
                                Export
                                {/* @ts-ignore */}
                                <FiDownload />
                            </button>
                            {showExportOptions && <ExportOptions setShowExportOptions={setShowExportOptions} />}
                        </div>

                        <div className="w-[3px] bg-gray-200 h-full" />

                        {/* People */}
                        <div className="flex items-center space-x-[-10px] px-2 py-2 bg-white rounded-full w-fit border border-gray-300">
                            {avatars.slice(0, 6).map((src, index) => (
                                <img
                                    key={index}
                                    src={src}
                                    alt={`Avatar ${index + 1}`}
                                    className="w-6 h-6 rounded-full border-2 border-white object-cover bg-white"
                                />
                            ))}
                            {avatars.length > 6 ?
                                <span className="pl-4 pr-2">
                                    +{avatars.slice(6, avatars.length - 1).length}
                                </span>
                                : ""
                            }
                        </div>

                        <button className="border border-primary-blue text-primary-blue rounded-full p-3 hover:bg-primary-blue hover:text-white transition-colors">
                            {/* @ts-ignore */}
                            <BiPlus className='text-lg' />
                        </button>
                    </div>
                </section>

                <section className="flex flex-row justify-between mt-4">
                    <div className="flex flex-row items-center gap-2">
                        <button
                            className={
                                `${viewMode === 'grid' ? 'bg-black text-white' : 'bg-white text-black'} ` +
                                ' p-3 border border-gray-400 text-sm rounded-full transition max-w-10'
                            }
                            onClick={() => setViewMode('grid')}
                        >
                            {/* @ts-ignore */}
                            <IoGrid />
                        </button>
                        <button
                            className={
                                `${viewMode === 'table' ? 'bg-black text-white' : 'bg-white text-black'} ` +
                                ' p-3 border border-gray-400 text-sm rounded-full transition max-w-10'
                            }
                            onClick={() => setViewMode('table')}
                        >
                            {/* @ts-ignore */}
                            <FaThList />
                        </button>

                        <div className="flex flex-row items-center relative">
                            <input type="text" name="search" id="" className="ml-2 py-2.5 px-4 text-sm rounded-xl bg-[#E9E9EA] font-semibold pr-10 placeholder-gray-700" placeholder="Search" />
                            <span className="absolute right-4 text-xl">
                                {/* @ts-ignore */}
                                <FiSearch />
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-row items-center gap-2">
                        <button className="text-sm border border-black rounded-full px-7 py-2.5 flex flex-row items-center gap-2 hover:bg-black hover:text-white transition-colors">
                            Renumber shots
                            {/* @ts-ignore */}
                            <RiSortNumberAsc className="text-lg" />
                        </button>
                        <button className="text-sm border border-black rounded-full px-7 py-2.5 flex flex-row items-center gap-2 hover:bg-black hover:text-white transition-colors">
                            {/* @ts-ignore */}Bulk edit colors
                            <HiOutlinePaintBrush className="text-lg" />
                        </button>

                        <button className="border border-black text-black rounded-full p-3 hover:bg-black hover:text-white transition-colors">
                            {/* @ts-ignore */}
                            <PiDotsThreeOutlineVerticalDuotone className='text-lg' />
                        </button>
                    </div>
                </section>
            </div>

            <div className="p-6 rounded-3xl bg-white w-full h-fit font-['Poppins'] mt-4">
                <ToggleShot activebtn={activebtn} setActiveBtn={setActiveBtn} />

                {viewMode === "grid" ?
                    <GridView
                        setShowAddNewShot={setShowAddNewShot}
                        setActiveShot={setActiveShot}
                    />
                    :
                    <ShotTable
                        setShowAddNewShot={setShowAddNewShot}
                        setActiveShot={setActiveShot}
                    />
                }
            </div>

            {showAddNewShot &&
                <NewShot
                    showAddNewShot={showAddNewShot}
                    setShowAddNewShot={setShowAddNewShot}
                />
            }
        </>
    )
}

const GridView = ({ setShowAddNewShot, setActiveShot }: { setShowAddNewShot: (value: boolean) => void; setActiveShot: (value: string) => void }) => {
    const [showMoreOptions, setShowMoreOptions] = useState("");

    return (
        <div className="flex flex-row gap-6 mt-6 flex-wrap">
            {shots && shots.map((shot, index) => (
                <ShotCard
                    key={index}
                    shot={shot}
                    setActiveShot={setActiveShot}
                    showMoreOptions={showMoreOptions}
                    setShowMoreOptions={setShowMoreOptions}
                    setShowAddNewShot={setShowAddNewShot}
                />
            ))}
        </div>
    )
}

const ShotCard = ({ shot, setShowAddNewShot, showMoreOptions, setShowMoreOptions, setActiveShot }: { shot: ShotItem; setShowAddNewShot: (value: boolean) => void; setShowMoreOptions: (value: string) => void; showMoreOptions: string, setActiveShot: (value: string) => void }) => {
    const { image, shotName, duration, requiredTime, filmed, tags, stared, _id } = shot;
    const [star, setStar] = useState(stared);

    const [showMoreTags, setShowMoreTags] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (
                !target.closest(".grid-options-dropdown") &&
                !target.closest(".grid-options-button")
            ) {
                setShowMoreTags(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={"flex flex-col relative gap-0 rounded-2xl shadow-md w-[31%]"}>
            <img
                onClick={() => setActiveShot(_id)}
                src={image}
                className="w-full cursor-pointer h-60 rounded-t-xl object-cover" alt="Image for shot"
            />

            <section className="flex flex-row justify-between bg-transparent absolute top-0 left-0 right-0 p-2">
                <button onClick={() => setStar(!star)} className="bg-[#212131] hover:bg-black transition-colors text-lg rounded-full p-2">
                    {!star ?
                        <>
                            {/* @ts-ignore */}
                            <FaRegStar className="text-white" />
                        </>
                        :
                        <>
                            {/* @ts-ignore */}
                            <FaStar className="text-yellow-500" />
                        </>
                    }
                </button>
                <div className="relative">
                    <button onClick={() => setShowMoreOptions(_id)} className="bg-[#212131] text-lg hover:bg-black transition-colors rounded-full p-2 text-white">
                        {/* @ts-ignore */}
                        <BsThreeDotsVertical />
                    </button>
                    {showMoreOptions === _id &&
                        <Moreoptions
                            // don't pass index
                            setShowAddNewShot={setShowAddNewShot}
                            setShowMoreoptions={setShowMoreOptions}
                        />
                    }
                </div>
            </section>
            <div className="flex flex-col gap-2 p-4">
                <p className="font-semibold text-base">Shot: {shotName}</p>
                <p className="text-gray-400 text-sm">Duration: <span className="text-black">{duration} minutes</span> </p>
                <p className="text-gray-400 text-sm">Required Time: <span className="text-black">{requiredTime} hours</span> </p>
                <p className="text-gray-400 text-sm">Filmed: <span className="text-black">{filmed ? "Yes" : "No"}</span> </p>

                <section className="relative flex flex-row flex-wrap gap-2">
                    {tags.slice(0, 3).map((tag, idx) => (
                        <div
                            key={idx}
                            className="border border-gray-400 text-gray-700 rounded-full px-3 py-1.5 text-xs"
                        >
                            {tag}
                        </div>
                    ))}

                    {tags.length > 4 && (
                        <div className="relative">
                            <button
                                onClick={() => setShowMoreTags(!showMoreTags)}
                                className={"text-xs text-gray-900 hover:bg-black hover:text-white transition-colors border border-gray-400 rounded-full px-3 py-1.5 " + `${showMoreTags ? "bg-black text-white" : ""}`}
                            >
                                +{tags.length - 4} More
                            </button>

                            {showMoreTags && (
                                <div className="grid-options-dropdown absolute left-1/2 top-full translate-x-[-15%] mt-3 bg-gray-900 rounded-xl p-3 z-10 flex flex-row flex-wrap min-w-60 max-w-72 gap-1.5 shadow-lg">
                                    {/* Arrow on top */}
                                    <div className="absolute -top-2 left-10 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-gray-900"></div>

                                    {tags.slice(4).map((tag, idx) => (
                                        <div
                                            key={idx}
                                            className="grid-options-button border border-gray-400 text-white rounded-full px-3 py-1.5 text-xs whitespace-nowrap"
                                        >
                                            {tag}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}

const columnGroups = [
    ["image", "shotName", "description", "shotSize", "movement", "estimatedTime", "shotType"],
    ["duration", "requiredTime", "filmed", "shotSize", "tags",]
];

const ShotTable = ({ setShowAddNewShot, setActiveShot }: { setShowAddNewShot: (value: boolean) => void; setActiveShot: (value: string) => void; }) => {
    const { editorLeftSidebar } = useEditorStore((state) => state);
    const [showMoreOptions, setShowMoreOptions] = useState<string>("");
    const [currentGroupIndex, setCurrentGroupIndex] = useState(0);

    const nextGroup = () => {
        setCurrentGroupIndex((prev) => (prev + 1 < columnGroups.length ? prev + 1 : 0));
    };

    const prevGroup = () => {
        setCurrentGroupIndex((prev) => (prev - 1 >= 0 ? prev - 1 : columnGroups.length - 1));
    };

    const currentColumns = columnGroups[currentGroupIndex];

    function handleShowMoreOptions(e: any, _id: string) {
        e.stopPropagation();
        setShowMoreOptions(_id)
    }

    return (
        <section className="mt-8">
            {/* Header */}
            <div
                className={`hidden md:grid items-center px-4 py-3 bg-gray-200 rounded-xl text-sm font-semibold text-gray-800 ${editorLeftSidebar ? "gap-0" : "gap-4"
                    }`}
                style={{
                    gridTemplateColumns: `repeat(${currentColumns.length}, minmax(0, 1fr)) auto`,
                }}
            >
                {currentColumns.map((col) => (
                    <div key={col} className="truncate capitalize">
                        {col}
                    </div>
                ))}
                <div className="flex justify-end gap-2">
                    <button onClick={prevGroup} className="p-2 rounded-full border border-gray-700 hover:bg-black hover:text-white transition-colors">
                        <ChevronLeft size={18} />
                    </button>
                    <button onClick={nextGroup} className="p-2 rounded-full border border-gray-700 hover:bg-black hover:text-white transition-colors">
                        <ChevronRight size={18} />
                    </button>
                    <button className="p-2 rounded-full border border-gray-700 hover:bg-black hover:text-white transition-colors">
                        <Settings size={18} />
                    </button>
                </div>
            </div>

            {/* Data rows */}
            <div>
                {shots.map((item, index) => (
                    <div
                        key={item._id}
                        onClick={() => setActiveShot(item._id)}
                        className={`grid cursor-pointer px-4 py-3 items-center hover:bg-gray-50 border border-gray-400 rounded-xl my-2 gap-4`}
                        style={{
                            gridTemplateColumns: `repeat(${currentColumns.length}, minmax(0, 1fr)) auto`,
                        }}
                    >
                        {currentColumns.map((col) => (
                            <div key={col} className="truncate text-sm">
                                {col === "image" ? (
                                    <img src={item[col]} alt="avatar" className="w-10 h-10 rounded-xl" />
                                ) : Array.isArray(item[col]) ? (
                                    item[col].join(", ")
                                ) : typeof item[col] === "boolean" ? (
                                    item[col] ? "Yes" : "No"
                                ) : (
                                    item[col]
                                )}
                            </div>
                        ))}

                        <div className="text-right relative w-28 flex justify-end">
                            <button
                                onClick={(e) => handleShowMoreOptions(e, item._id)}
                                className="p-2 w-fit hover:bg-black hover:text-white transition-colors rounded-full"
                            >
                                {/* @ts-ignore */}
                                <BsThreeDotsVertical size={18} />
                            </button>
                            {showMoreOptions === item._id && (
                                <Moreoptions
                                    index={index}
                                    setShowAddNewShot={setShowAddNewShot}
                                    setShowMoreoptions={setShowMoreOptions}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const Moreoptions = ({
    setShowAddNewShot,
    setShowMoreoptions,
    index,
}: {
    setShowAddNewShot: (value: boolean) => void;
    setShowMoreoptions: (value: string) => void;
    index?: number;
}) => {
    const isBottomDrop = index === undefined || (shots.length - 2 > index);

    function openNewShotModal(e: any) {
        e.stopPropagation();
        setShowMoreoptions("");
        setShowAddNewShot(true);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (
                !target.closest(".more-options-dropdown") &&
                !target.closest(".more-options-button")
            ) {
                setShowMoreoptions("");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={`more-options-dropdown absolute w-fit right-6 z-50 rounded-2xl flex flex-col items-start bg-[#212131] text-white shadow options-dropdown ${isBottomDrop ? "top-6 rounded-tr-[0]" : "bottom-5 rounded-br-[0]"}`}>
            <button
                onClick={(e) => openNewShotModal(e)}
                className={`more-options-button options-button text-sm text-nowrap p-3 px-4 pr-6 pt-4 border-b border-gray-300 w-full text-left hover:bg-black transition-colors cursor-pointer ${isBottomDrop ? "rounded-tl-2xl" : "rounded-t-2xl"}`}
            >
                Add new shot after this
            </button>
            <button className="more-options-button options-button text-sm text-nowrap p-3 px-4 pr-6 border-b border-gray-300 w-full text-left hover:bg-black transition-colors cursor-pointer">
                Edit shot
            </button>
            <button className="more-options-button options-button text-sm text-nowrap p-3 px-4 pr-6 border-b border-gray-300 w-full text-left hover:bg-black transition-colors cursor-pointer">
                Duplicate shot
            </button>
            <button
                className={`more-options-button options-button text-sm text-nowrap p-3 px-4 pr-6 pb-4 w-full text-left hover:bg-black transition-colors cursor-pointer ${isBottomDrop ? "rounded-b-2xl" : "rounded-bl-2xl"
                    }`}
            >
                Delete shot
            </button>
        </div>
    );
};

const ExportOptions = ({ setShowExportOptions }: { setShowExportOptions: (value: boolean) => void }) => {
    const options = [
        {
            title: "PDF-Exports",
            options: ["Download Shot List", "Download AV Script"]
        },
        {
            title: "Other Exports",
            options: ["Download as CSV file", "Download Excel File"]
        },
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (
                !target.closest(".export-options-dropdown") &&
                !target.closest(".export-options-button")
            ) {
                setShowExportOptions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="export-options-dropdown py-2 bg-white z-10 text-sm translate-x-[-20%] shadow-md rounded-xl absolute top-12 w-72 border">
            {options.map((op, sectionIndex) => (
                <div key={sectionIndex}>
                    <p className='export-options-button py-2.5 px-4 text-gray-600 border-b'>{op.title}</p>
                    {op.options.map((opp, optionIndex) => {
                        const isLastSection = sectionIndex === options.length - 1;
                        const isLastOption = optionIndex === op.options.length - 1;
                        const isFinalItem = isLastSection && isLastOption;

                        return (
                            <button
                                key={opp}
                                className={`export-options-button flex py-2.5 px-4 w-full flex-row items-center justify-between ${isFinalItem ? '' : 'border-b'
                                    } hover:bg-gray-100`}
                            >
                                <p className="text-nowrap">{opp}</p>
                                {/* @ts-ignore */}
                                <FaRegFilePdf className="text-lg" />
                            </button>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

const avatars = [
    "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359554_1280.png",
    "https://cdn-icons-png.flaticon.com/512/219/219969.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXSTblEVkkdJh15jlAbC3FpvuzCKb1o-pQQA&s",
    "https://freesvg.org/img/1459344336.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXSTblEVkkdJh15jlAbC3FpvuzCKb1o-pQQA&s",
    "https://cdn-icons-png.flaticon.com/512/219/219969.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXSTblEVkkdJh15jlAbC3FpvuzCKb1o-pQQA&s",
    "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359554_1280.png",
];


export default ShotList