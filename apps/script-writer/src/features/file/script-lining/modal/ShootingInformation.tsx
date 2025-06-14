import React, { useEffect, useState } from 'react'
import DropdownSelector from '../components/DropDownSelector';
import InputField from '../components/InputField';
import { FaArrowLeft } from 'react-icons/fa';
import { BsExclamationCircle } from 'react-icons/bs';
import { HiOutlinePaintBrush } from 'react-icons/hi2';

const ShootingInformation = ({ showShootingInfoModal, setShowShootingInfoModal }: { showShootingInfoModal: boolean; setShowShootingInfoModal: (value: boolean) => void; }) => {
    const appearenNoneForNumber = "appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";
    const [showOptionsFor, setShowOptionsFor] = useState("");

    const [size, setSize] = useState<string>("")
    const [type, setType] = useState<string>("")
    const [movement, setMovement] = useState<string>("")
    const [equipment, setEquipment] = useState<string>("")
    const [vfx, setVfx] = useState<string>("")
    const [camera, setCamera] = useState<string>("")
    const [lens, setLens] = useState<string>("")
    const [framerates, setFramerates] = useState<string>("")
    const [specialEquipment, setSpecialEquipment] = useState<string>("")
    const [sound, setSound] = useState<string>("")
    const [lighting, setLighting] = useState<string>("")
    const [position, setPosition] = useState<string>("")
    const [setupID, setSetupID] = useState<string>("")

    const [hours, setHours] = useState<string>("0");
    const [minutes, setMinutes] = useState<string>("0");
    const [note, setNote] = useState<string>("")
    const [unit, setUnit] = useState<string>("")

    function handleOptionsOpen(value: string) {
        if (showOptionsFor === "") {
            setShowOptionsFor(value)
        } else {
            setShowOptionsFor("")
        }
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (
                !target.closest(".new-shoot-options-dropdown") &&
                !target.closest(".new-shoot-options-button")
            ) {
                setShowOptionsFor("");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div
            className={
                `${showShootingInfoModal ? "block " : "hidden "}` +
                "py-16 px-20 z-20 w-full h-full fixed left-0 right-0 top-0 bg-[#0000004f] overflow-auto font-poppins flex items-start justify-center"
            }
        // onClick={() => setShowShootingInfoModal(false)}
        >
            <div
                className="w-full max-w-2xl p-6 rounded-2xl bg-white flex flex-col gap-4"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="flex flex-row gap-2 items-center">
                    <button
                        onClick={() => setShowShootingInfoModal(false)}
                        className="bg-white hover:border-gray-400 border border-white transition-colors rounded-full p-2"
                    >
                        {/* @ts-ignore */}
                        <FaArrowLeft />
                    </button>
                    <h1 className="font-semibold text-lg">Shooting information</h1>
                </header>

                {/* Size */}
                <DropdownSelector
                    label="Size"
                    data={shootSize}
                    selected={size}
                    onSelect={(val) => {
                        setSize(val);
                        setShowOptionsFor("");
                    }}
                    isOpen={showOptionsFor === "size"}
                    onOpen={() => handleOptionsOpen("size")}
                    onCreateNew={() => console.log("Create new Size clicked")}
                />

                <DropdownSelector
                    label="Type"
                    data={shootType}
                    selected={type}
                    onSelect={(val) => {
                        setType(val);
                        setShowOptionsFor("");
                    }}
                    isOpen={showOptionsFor === "type"}
                    onOpen={() => handleOptionsOpen("type")}
                    onCreateNew={() => console.log("Create new Type clicked")}
                />

                <DropdownSelector
                    label="Movement"
                    data={shootMovement}
                    selected={movement}
                    onSelect={(val) => {
                        setMovement(val);
                        setShowOptionsFor("");
                    }}
                    onOpen={() => handleOptionsOpen("movement")}
                    isOpen={showOptionsFor === "movement"}
                    onCreateNew={() => console.log("Create new Movement clicked")}
                />

                <DropdownSelector
                    label="Equipment"
                    data={shootEquipment}
                    selected={equipment}
                    onSelect={(val) => {
                        setEquipment(val);
                        setShowOptionsFor("");
                    }}
                    onOpen={() => handleOptionsOpen("equipment")}
                    isOpen={showOptionsFor === "equipment"}
                    onCreateNew={() => console.log("Create new Equipment clicked")}
                />

                <DropdownSelector
                    label="VFX"
                    data={shootVFX}
                    selected={vfx}
                    onSelect={(val) => {
                        setVfx(val);
                        setShowOptionsFor("");
                    }}
                    onOpen={() => handleOptionsOpen("vfx")}
                    isOpen={showOptionsFor === "vfx"}
                    onCreateNew={() => console.log("Create new VFX clicked")}
                />

                <DropdownSelector
                    label="Camera"
                    data={shootCamera}
                    selected={camera}
                    onSelect={(val) => {
                        setCamera(val);
                        setShowOptionsFor("");
                    }}
                    onOpen={() => handleOptionsOpen("camera")}
                    isOpen={showOptionsFor === "camera"}
                    onCreateNew={() => console.log("Create new camera clicked")}
                />

                <DropdownSelector
                    label="Lens"
                    data={shootLens}
                    selected={lens}
                    onSelect={(val) => {
                        setLens(val);
                        setShowOptionsFor("");
                    }}
                    onOpen={() => handleOptionsOpen("lens")}
                    isOpen={showOptionsFor === "lens"}
                    onCreateNew={() => console.log("Create new lens clicked")}
                />

                <DropdownSelector
                    label="Framerates"
                    data={shootFramerates}
                    selected={framerates}
                    onSelect={(val) => {
                        setFramerates(val);
                        setShowOptionsFor("");
                    }}
                    onOpen={() => handleOptionsOpen("framerates")}
                    isOpen={showOptionsFor === "framerates"}
                    onCreateNew={() => console.log("Create new frame Rates clicked")}
                />

                <DropdownSelector
                    label="Special Equipment"
                    data={shootSpecialEquipment}
                    selected={specialEquipment}
                    onSelect={(val) => {
                        setSpecialEquipment(val);
                        setShowOptionsFor("");
                    }}
                    onOpen={() => handleOptionsOpen("specialequipment")}
                    isOpen={showOptionsFor === "specialequipment"}
                    onCreateNew={() => console.log("Create new frame Rates clicked")}
                />

                <InputField
                    title='Sound'
                    value={sound}
                    setValue={setSound}
                    placeholder='Enter a Sound'
                />

                <InputField
                    title='Lighting'
                    value={lighting}
                    setValue={setLighting}
                    placeholder='Enter Lighting Setup'
                />

                <InputField
                    title='Position'
                    value={position}
                    setValue={setPosition}
                    placeholder='Enter Camera Position'
                />

                <InputField
                    title='Setup ID'
                    value={setupID}
                    setValue={setSetupID}
                    placeholder='Enter Setup ID'
                />

                <div className="flex justify-between items-center border border-gray-400 rounded-xl px-4 py-4 w-full">
                    <label className="text-base font-semibold">
                        Scheduled duration (hh:mm)
                    </label>
                    <div className="flex items-center space-x-2">
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
                        <span className='text-gray-500 font-bold mb-2'>:</span>
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
                </div>

                <DropdownSelector
                    label="Unit"
                    data={shootUnit}
                    selected={unit}
                    onSelect={(val) => {
                        setUnit(val);
                        setShowOptionsFor("");
                    }}
                    onOpen={() => handleOptionsOpen("unit")}
                    isOpen={showOptionsFor === "unit"}
                    onCreateNew={() => console.log("Create new unit clicked")}
                    icon
                />

                <InputField
                    title='Note'
                    value={note}
                    setValue={setNote}
                    placeholder='Add a note'
                />

                <section className="flex flex-col gap-2">
                    <label htmlFor="shot id" className="font-medium">Do you want to add more?</label>

                    <div className="flex flex-row gap-3">
                        <button className="text-sm border border-black rounded-full px-7 py-2.5 w-fit flex flex-row items-center gap-2 hover:bg-black hover:text-white transition-colors">
                            {/* @ts-ignore */} General Information
                            <BsExclamationCircle className="text-lg" />
                        </button>

                        <button className="text-sm border border-black rounded-full px-7 py-2.5 w-fit flex flex-row items-center gap-2 hover:bg-black hover:text-white transition-colors">
                            {/* @ts-ignore */} Colors
                            <HiOutlinePaintBrush className="text-lg" />
                        </button>
                    </div>
                </section>


                <section className="flex flex-row justify-between mt-6">
                    <div className="flex flex-row items-center gap-3">
                        <input type="checkbox" name="create another" className="custom-primary-checkbox" id="" />
                        <span>Create another</span>
                    </div>

                    <div className="flex flex-row gap-x-2 items-center ">
                        <button
                            onClick={() => setShowShootingInfoModal(false)}
                            className="border border-gray-500 hover:bg-gray-600 hover:text-white transition-colors px-6 py-3 font-medium rounded-2xl bg-white text-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-gray-800 hover:bg-black hover:text-white transition-colors px-6 py-3 font-medium rounded-2xl text-white"
                        >
                            Create as draft
                        </button>
                        <button
                            // onClick={handleSubmit}
                            className="px-6 py-3 font-medium rounded-2xl bg-primary-blue hover:bg-[#4e28e7] transition-colors text-white"
                        // disabled={isLoading} // Disable button while loading
                        >
                            Send
                        </button>
                    </div>
                </section>
            </div>
        </div>
    )
};


const shootSize = [
    {
        title: "Close-ups",
        values: ["Medium Close-up", "Extreme Close-up", "Wide Close-up"]
    },
    {
        title: "Medium-shots",
        values: ["Close Shots", "Medium Shots", "Medium Close-Shots"]
    },
    {
        title: "Long shots",
        values: ["Wide Shots", "Extreme Wide Shots", "Full Shots", "Medium Full Shots", "Long Shots", "Extreme Long Shots"]
    },
]

const shootType = [
    {
        title: "Camera Highlight",
        values: ["Eye Level", "Low Level", "High Level", "Overhead", "Shoulder Level", "Hip Level", "Knee Level", "Ground Level"]
    },
    {
        title: "Framing",
        values: ["Signal Shot", "Two Shot", "Three Shot", "Over-the-Shoulder", "Over-the-Hip", "Point of view"]
    },
    {
        title: "Dutch angle",
        values: ["Dutch (Left)", "Dutch (Right)"]
    },
    {
        title: "Focus/DOF",
        values: ["Rank Focus", "Shallow Focus", "Deep Focus", "Tilt-Shift", "Zoom"]
    },
]

const shootMovement = [
    {
        title: "Camera Movement",
        values: ["Static", "Pan", "Tilt", "Swish Pan", "Swish Tilt", "Tracking"]
    },
]

const shootEquipment = [
    {
        title: "MECHANISM",
        values: ["Sticks", "Hand Held", "Gimbal", "Slider", "Jib", "Drone", "Dolly", "Steadicam", "Crane"]
    },
    {
        title: "Direction",
        values: ["Forward", "Backward", "Left", "Right", "Up", "Down"]
    }, {
        title: "Tracks",
        values: ["Straight", "Circular"]
    }
]

const shootVFX = [
    {
        title: "vfx",
        values: ["Motion Graphics", "Matte Painting", "Composite",]
    },
]

const shootCamera = [
    {
        title: "Camera",
        values: [
            "CAM A", "CAM B", "CAM C", "CAM D", "CAM E", "CAM F", "CAM G", "CAM H", "CAM I", "CAM J",
            "CAM K", "CAM L", "CAM M", "CAM N", "CAM O", "CAM P", "CAM Q", "CAM R", "CAM S", "CAM T",
            "CAM U", "CAM V", "CAM W", "CAM X", "CAM Y", "CAM Z"
        ]
    },
]

const shootLens = [
    {
        title: "Angle of view",
        values: [
            "Normal",
            "Telephoto",
            "Wide angle",
            "Fish eye",
            "Zoom"
        ]
    },
    {
        title: "Primes",
        values: [
            "10mm", "12mm", "14mm", "16mm", "18mm", "20mm", "24mm", "28mm", "30mm",
            "32mm", "35mm", "40mm", "50mm", "65mm", "75mm", "85mm", "100mm",
            "135mm", "150mm", "180mm"
        ]
    }
];

const shootFramerates = [
    {
        title: "Frame rate",
        values: [
            "24 fps",
            "23.98 fps",
            "25 fps",
            "30 fps",
            "29.97 fps",
            "48 fps",
            "47.95 fps",
            "50 fps",
            "59.94 fps",
            "60 fps",
            "75 fps",
            "100 fps",
            "120 fps",
            "240 fps",
            "300 fps"
        ]
    }
];

const shootSpecialEquipment = [
    {
        title: "Specials equipment",
        values: [
            "GoPro",
            "Drone",
            "High Speed",
            "360 VR",
            "Under-Water",
            "Hand Cracked",
            "3D",
            "IMAX"
        ]
    }
];

const shootUnit = [
    {
        title: "Unit",
        values: ["All"]
    }
]


export default ShootingInformation