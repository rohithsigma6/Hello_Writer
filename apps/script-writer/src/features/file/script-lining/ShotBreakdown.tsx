import React, { useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { FiPlus } from 'react-icons/fi';
import ToggleShot from './ToggleShot';

const ShotBreakdown = ({ activebtn, setActiveBtn }: { activebtn: string, setActiveBtn: (value: "Shot Breakdown" | "Shot List") => void; }) => {
    const appearenNoneForNumber = "appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

    return (
        <div className="p-6 rounded-3xl h-fit flex flex-row gap-10 bg-white">
            <div className='h-fit font-["Poppins"] flex flex-col'>
                <ToggleShot activebtn={activebtn} setActiveBtn={setActiveBtn} />

                <div className='mt-2 flex-1 overflow-y-auto relative bg-white p-3  rounded-2xl shadow-lg border border-gray-200'>
                    {activebtn === "Shot Breakdown" ?
                        <>
                            <section className="mb-4">
                                <p className='font-semibold'>Scene: 1</p>
                            </section>

                            <section className="mb-4">
                                <p className='font-semibold mb-2'>Select Shot</p>
                                <div className='bg-[#E9E9EA] rounded-xl p-1 px-3'>1A</div>
                            </section>

                            {/* Camera */}
                            <section className="mb-4">
                                <p className='font-semibold mb-2'>Add Camera</p>
                                <button className="text-[#643EFF] text-xl hover:bg-[#643EFF] hover:text-white rounded-full p-0.5 transition-colors">
                                    {/* @ts-ignore */}
                                    <FiPlus />
                                </button>
                            </section>

                            {/* Colors */}
                            <section className="mb-4">
                                <p className='font-semibold mb-2'>Select Color</p>
                                <div className="flex flex-row gap-2">
                                    {["#2563EB", "#F97316", "#FACC15", "#22C55E", "#22C55E", "#3B82F6"].map((color, index) => (
                                        <button style={{ backgroundColor: color }} key={index} className="w-4 h-4 rounded-full"></button>
                                    ))}
                                </div>
                            </section>

                            {/* Character */}
                            <section className="mb-4">
                                <p className='font-semibold mb-2'>Character</p>

                                {[{ character: "Edha", flag: false }, { character: "Critic", flag: false }].map(({ character, flag }) => (
                                    <div className="flex flex-row items-start justify-between mt-2 ml-1.5" key={character}>
                                        <span className='text-gray-700 text-sm'>{character}</span>
                                        <ToggleButton />
                                    </div>
                                ))}
                            </section>

                            {/* Time */}
                            <section className="my-10 flex flex-row items-end gap-4">
                                <div className='flex flex-col gap-2'>
                                    <span className="text-gray-600 text-xs">Minutes</span>
                                    <div className="flex flex-row gap-2">
                                        <input
                                            type="number"
                                            placeholder='0'
                                            className={"border border-gray-400 rounded-lg w-9 h-9 flex justify-center items-center text-center text-xl placeholder-slate-500 " + appearenNoneForNumber}
                                        />
                                        <input
                                            type="number"
                                            placeholder='0'
                                            className={"border border-gray-400 rounded-lg w-9 h-9 flex justify-center items-center text-center text-xl placeholder-slate-500 " + appearenNoneForNumber}
                                        />
                                    </div>
                                </div>
                                <span className='text-gray-500 font-bold mb-2'>:</span>
                                <div className='flex flex-col gap-2'>
                                    <span className="text-gray-600 text-xs">Seconds</span>
                                    <div className="flex flex-row gap-2">
                                        <input
                                            type="number"
                                            placeholder='0'
                                            className={"border border-gray-400 rounded-lg w-9 h-9 flex justify-center items-center text-center text-xl placeholder-slate-500 " + appearenNoneForNumber}
                                        />
                                        <input
                                            type="number"
                                            placeholder='0'
                                            className={"border border-gray-400 rounded-lg w-9 h-9 flex justify-center items-center text-center text-xl placeholder-slate-500 " + appearenNoneForNumber}
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Collapsebale divs */}
                            <section className="flex flex-col gap-2 mb-4">
                                {sectionData.map((section, idx) => (
                                    <CollapsibleSection
                                        key={idx}
                                        header={section.header}
                                        groups={section.groups}
                                    />
                                ))}
                            </section>
                        </>
                        :
                        <>
                        </>
                    }

                    <button className="bg-[#653EFF] hover:bg-[#6342e8] transition-colors text-white rounded-xl w-full py-2.5 font-medium">Create Shot</button>
                </div>
            </div>

            <div
                className="h-full w-full flex-1 p-6 rounded-3xl"
            // style={{ boxShadow: '0px 0px 15px 2px #e3e3e3' }}
            >
                Editor
            </div>
        </div>
    )
}

function ToggleButton() {
    const [active, setActive] = useState(false);

    return (
        <button
            type="button"
            // value={isOneEighthPageOn}
            // handleToggleStateChange={(checked) => setIsOneEighthPageOn(checked)}
            className={`toggle-button w-10 h-5 rounded-full flex items-center ${active
                ? "justify-end bg-green-200 shadow-neumorphism-green border border-green-600"
                : "justify-start bg-gray-200 shadow-neumorphism-gray border border-slate-400"
                } p-1 transition-transform duration-500 ease-in-out`}
            onClick={() => {
                setActive(!active);
            }}
        >
            <div
                className={`toggle-inner w-3.5 h-3.5 rounded-full shadow-neumorphism-inner ${active ? "bg-green-500" : "bg-slate-400"
                    }`}
            ></div>
        </button>
    )
};

const CollapsibleSection = ({ header, groups }: { header: string, groups: any }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-300 rounded-xl p-3">
            <header className="flex flex-row justify-between items-center">
                <p className="font-semibold text-sm">{header}</p>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="hover:bg-gray-900 hover:text-white transition-colors rounded-full p-1"
                >
                    {/* @ts-ignore */}
                    {isOpen ? <AiOutlineMinus className="text-lg" /> : <AiOutlinePlus className="text-lg" />}
                </button>
            </header>

            {isOpen && (
                <div className="mt-4 flex flex-col gap-4">
                    {groups.map((group: any, idx: number) => (
                        <div key={idx}>
                            {group.subHeader &&
                                <p className="font-medium mb-2 text-sm">{group.subHeader}</p>
                            }
                            <div className="ml-2 flex flex-col gap-2">
                                {group.options.map((option: string) => (
                                    <label key={option} className="flex flex-row gap-2 items-center">
                                        <input
                                            type="radio"
                                            name={group.name}
                                            className="custom-radio"
                                        />
                                        <span className="text-sm">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


const sectionData = [
    {
        header: "Shot Size",
        groups: [
            {
                subHeader: "Close-ups",
                name: "close-ups",
                options: ["Close-up", "Medium Close-up", "Extreme Close-up", "Wide Close-up"]
            }
        ]
    },
    {
        header: "Shot Movement",
        groups: [
            {
                subHeader: "Camera Movement",
                name: "camera-movement",
                options: ["Static", "Pan", "Tilt", "Swish Pan", "Swish Tilt", "Tracking"]
            }
        ]
    },
    {
        header: "VFX",
        groups: [
            {
                subHeader: "",
                name: "vfx",
                options: ["Motion Graphics", "Matte Painting", "Composite"]
            }
        ]
    },
    {
        header: "Shot Type",
        groups: [
            {
                subHeader: "Camera Higlight",
                name: "cmaera-highlight",
                options: ["Eye Level", "Low Level", "High Level", "Overhead", "Shoulder Level", "Hip Level", "Knee Level", "Ground Level"]
            },
            {
                subHeader: "Framing",
                name: "framing",
                options: ["Signal Shot", "Two Shot", "Three Shot", "Over-the-Shoulder", "Over-the-Hip", "Point of View",]
            },
            {
                subHeader: "Dutch angle",
                name: "dutch-angle",
                options: ["Dutch (Left)", "Dutch (Right)",]
            },
            {
                subHeader: "Focus/Dof",
                name: "focus-dof",
                options: ["Rank Focus", "Shallow Focus", "Deep Focus", "Tilt-Shift", "Zoom"]
            },
        ]
    },
    {
        header: "Specials equipment",
        groups: [
            {
                subHeader: "",
                name: "specials-equipment",
                options: ["GoPro", "Drone", "High Speed", "360 VR", "Under-Water", "Hand Cracked", "3D", "IMAX"]
            },
        ]
    },
    {
        header: "Camera",
        groups: [
            {
                subHeader: "",
                name: "camera",
                options: ["CAM A", "CAM B", "CAM C", "CAM D", "CAM E", "CAM F", "CAM G", "CAM H", "CAM I"]
            },
        ]
    },
    {
        header: "Frame rate",
        groups: [
            {
                subHeader: "",
                name: "frame-rate",
                options: ["24 fps", "23.98 fps", "25 fps", "30 fps", "29.97 fps", "48 fps", "47.95 fps", "50 fps", "59.94 fps", "60 fps", "75 fps", "100 fps", "120 fps", "240 fps", "300 fps"]
            },
        ]
    },
];

export default ShotBreakdown