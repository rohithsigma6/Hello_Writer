import React, { useEffect, useState } from 'react';
import { shots } from './shotsList';
import { FaArrowLeft } from 'react-icons/fa';
import { BiPlus } from 'react-icons/bi';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ActiveButton from './components/activeShot/ActiveButton';
import { FaLocationDot } from 'react-icons/fa6';
import TimeInput from './components/activeShot/TimeInput';
import Actors from './components/activeShot/Actors';
import TextArea from './components/activeShot/TextArea';
import MediaUpload from './components/activeShot/MediaUpload';
import ShotSuggestion from './components/activeShot/ShotSuggestion';
import ActorPerformanceNote from './components/activeShot/ActorPerformanceNote';
import EquipmentReq from './components/activeShot/EquipmentReq';
import ShootingInfo from './components/activeShot/ShootingInfo';
import NewShot from './modal/NewShot';


const ActiveShot = ({ activeShot, setActiveShot }: { activeShot: string; setActiveShot: (value: string) => void; }) => {
    const [activeButton, setActiveButton] = useState("Shot Information");
    const [showAddNewShot, setShowAddNewShot] = useState(false);
    const [showShotsList, setShowShotsList] = useState(false);

    const currentIndex = shots.findIndex((shot) => shot._id === activeShot);
    const currentActiveShot = shots[currentIndex];

    const [shotDescription, setShotDescription] = useState(currentActiveShot.description)
    const [visual, setVisual] = useState(currentActiveShot.description)
    const [audio, setAudio] = useState("")
    const [cameraInfo, setCameraInfo] = useState("")
    const [lightingInfo, setLightingInfo] = useState("")

    const goToPreviousShot = () => {
        if (currentIndex > 0) {
            setActiveShot(shots[currentIndex - 1]._id);
        }
    };

    const goToNextShot = () => {
        if (currentIndex < shots.length - 1) {
            setActiveShot(shots[currentIndex + 1]._id);
        }
    };

    useEffect(() => {
        setShotDescription(currentActiveShot.description);
        setVisual("");
        setAudio("");
        setCameraInfo("");
        setLightingInfo("")
    }, [activeShot])

    return (
        <div className="bg-white rounded-2xl p-4 font-['Poppins']">
            <header className="flex flex-row justify-between">
                <section className="flex flex-row gap-2 items-center">
                    <button
                        onClick={() => setActiveShot("")}
                        className="bg-white hover:border-gray-400 border border-white transition-colors rounded-full p-2"
                    >
                        {/* @ts-ignore */}
                        <FaArrowLeft />
                    </button>
                    <h1 className="font-semibold text-base">Back to Shot list</h1>
                </section>

                <section className="flex flex-row items-center gap-3">
                    <button onClick={goToPreviousShot} className="p-2 rounded-full h-fit border border-gray-700 hover:bg-black hover:text-white transition-colors">
                        <ChevronLeft size={18} />
                    </button>

                    <h1 className='font-semibold text-sm'>
                        Shot - {shots.findIndex(shot => shot._id === currentActiveShot?._id) + 1}
                    </h1>

                    <button onClick={goToNextShot} className="p-2 rounded-full h-fit border border-gray-700 hover:bg-black hover:text-white transition-colors">
                        <ChevronRight size={18} />
                    </button>

                    <div className="relative">
                        <button
                            onClick={() => setShowShotsList(true)}
                            className="border border-black px-2 py-1 rounded-md text-sm font-semibold hover:bg-black hover:text-white transition-colors"
                        >
                            {currentIndex + 1} - {shots.length}
                        </button>

                        {showShotsList && (
                            <div
                                className="absolute -translate-x-6 z-10 mt-2 bg-black text-white shadow-lg rounded-lg max-h-60 w-40 overflow-y-auto border border-black"
                                onMouseLeave={() => setShowShotsList(false)} // optional auto-close
                            >
                                {shots.map((shot, index) => (
                                    <button
                                        key={shot._id}
                                        onClick={() => {
                                            setActiveShot(shot._id);
                                            setShowShotsList(false);
                                        }}
                                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-300 hover:text-black ${activeShot === shot._id ? 'bg-white text-black font-semibold' : ''
                                            }`}
                                    >
                                        Shot {index + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                <button onClick={() => setShowAddNewShot(true)} className="text-sm text-white bg-gray-800 hover:bg-black transition-colors px-6 py-3 rounded-full flex flex-row items-center gap-2">
                    Add Shot
                    {/* @ts-ignore */}
                    <BiPlus className='text-lg' />
                </button>
            </header>

            <div className="h-[1px] bg-slate-400 my-6"></div>

            <ActiveButton activeButton={activeButton} setActiveButton={setActiveButton} />

            <div className="flex items-center justify-start border border-black px-3 py-2 my-6 rounded-full w-fit">
                <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="custom-primary-checkbox" />
                    <span className="ml-2 text-sm font-medium text-gray-900">
                        Collect no suggestions for this object
                    </span>
                </label>
            </div>

            <TextArea value={shotDescription} setValue={setShotDescription} label="Shot Description" placeholder="Write a shot description" />

            <section className="grid grid-cols-4 gap-3 p-4 mt-6 border border-gray-400 rounded-2xl">
                {/* Filmed */}
                <div className="flex flex-col justify-between p-2 border-r border-gray-300">
                    <label className="text-sm font-semibold mb-3">Filmed</label>
                    <div className="flex gap-2">
                        <label className="inline-flex items-center gap-2 border border-gray-400 px-3 py-1.5 text-sm rounded-full">
                            <input type="radio" name="filmed" value="yes" className="accent-black custom-radio" />
                            Yes
                        </label>
                        <label className="inline-flex items-center gap-2 border border-gray-400 px-3 py-1.5 text-sm rounded-full">
                            <input type="radio" name="filmed" value="no" className="accent-black custom-radio" />
                            No
                        </label>
                    </div>
                </div>

                {/* Duration */}
                <div className="flex flex-col justify-between p-2 border-r border-gray-300">
                    <label className="text-sm font-semibold mb-1">Duration</label>
                    <TimeInput />
                </div>

                {/* Time Required */}
                <div className="flex flex-col justify-between p-2 border-r border-gray-300">
                    <label className="text-sm font-semibold mb-1">Time Required</label>
                    <TimeInput />
                </div>

                {/* Location */}
                <div className="flex flex-col justify-between p-2 text-sm">
                    <label className="font-semibold mb-3">Location</label>
                    <button className="inline-flex w-fit items-center gap-1 px-5 py-2.5 border border-gray-300 rounded-full hover:bg-gray-100 text-sm">
                        {/* @ts-ignore */}
                        Add Location <FaLocationDot className="text-lg" />
                    </button>
                </div>
            </section>

            {/* Visual & Audio */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <TextArea value={visual} setValue={setVisual} label="Visual" placeholder="Write about visual" />
                <TextArea value={audio} setValue={setAudio} label="Audio" placeholder="Write about audio" />
            </div>

            {/* Camera Info & Lighting Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <TextArea value={cameraInfo} setValue={setCameraInfo} label="Camera Information" placeholder="Write a camera information" />
                <TextArea value={lightingInfo} setValue={setLightingInfo} label="Lighting Information" placeholder="Write a lighting information" />
            </div>

            <Actors />

            <ActorPerformanceNote />

            <ShootingInfo />

            <EquipmentReq />

            <MediaUpload />

            <ShotSuggestion />

            {showAddNewShot &&
                <NewShot
                    showAddNewShot={showAddNewShot}
                    setShowAddNewShot={setShowAddNewShot}
                />
            }
        </div >
    )
};

export default ActiveShot