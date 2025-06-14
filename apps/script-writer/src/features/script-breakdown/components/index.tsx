import React, { useState } from 'react'
import { useNavigate,useParams } from 'react-router'
import character from '../../../assets/scriptBreakdown/character.svg'
import rigthIndicator from '../../../assets/scriptBreakdown/rightIndicator.svg'
import comment from '../../../assets/scriptBreakdown/comment.svg'
import gallery from '../../../assets/scriptBreakdown/gallery.svg'
import run from '../../../assets/scriptBreakdown/run.svg'
import avatar from '../../../assets/scriptBreakdown/avatar.svg'
import mic from '../../../assets/scriptBreakdown/mic.svg'
import parentheses from '../../../assets/scriptBreakdown/parentheses.svg'
import message from '../../../assets/scriptBreakdown/message.svg'
import multiComment from '../../../assets/scriptBreakdown/multiComment.svg'
import video from '../../../assets/scriptBreakdown/video.svg'
import threeDots from '../../../assets/scriptBreakdown/threeDots.svg'
import landScape from '../../../assets/scriptBreakdown/landScape.svg';
import leftArrow from '../../../assets/scriptBreakdown/leftArrow.svg';
import rightArrow from '../../../assets/scriptBreakdown/rightArrow.svg'
import backArrow from '../../../assets/scriptBreakdown/backArrow.svg'
import plus from '../../../assets/scriptBreakdown/plus.svg'
import twoWayArrow from '../../../assets/scriptBreakdown/twoWayArrow.svg'
import threeDotsVertical from '../../../assets/scriptBreakdown/threeDotsVertical.svg'
import search from '../../../assets/scriptBreakdown/search.svg'
// import { TopNavbar } from '@/features/file/screenplay/components/editor/components/top-navbar'
import Navbar from '@/components/layouts/file-layout/nav-bar'
import SceneBreakdown from './sceneBreakdown'
import Reports from './reports'
import BreakdownSummary from './breakdownSummary'
const sceneDetails = [
    { label: "Number", value: "1" },
    { label: "Int/Ext", value: "EXT." },
    { label: "Set", value: "Ferry Ramses / Foredeck", className: "w-80" },
    { label: "Day/Night", value: "Day" },
    { label: "Script day", value: "-" },
    { label: "Pages", value: "1" },
];

const metadata = [
    { label: "Estimated time", value: "00:00" },
    { label: "Filming location", value: "-" },
];

const scriptMeta = ["amarnath", "00/00/0000", "00:00", "IST +00"];


const ScriptBreakdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()
    const {fileId} = useParams()
    const [isReports, setIsReports] = useState(false)
    const [isSceneDetails, setIsSceneDetails] = useState(false)
    const [active, setActive] = useState(0)
    const [isAutomaticBreakdown,setIsAutomaticBreakdown]=useState(false)
    return (
        <div className='flex flex-col h-screen overflow-hidden'>
            <div className='h-[10%] w-full border border-black'>
                <Navbar />
            </div>

            <div className='flex flex-row flex-grow overflow-hidden'>
                {/* Sidebar */}
                <div className='w-[20%] min-w-[250px] h-full overflow-y-auto border-r'>
                    <div className="flex flex-col gap-5 mt-8 mx-4">
                        {/* Back button */}
                        <div className="flex items-center gap-2" onClick={()=>navigate(`/file/${fileId}/screenplay`)}>
                            <img src={backArrow} className="w-6 h-6" />
                            <span className="text-gray-800 text-base font-semibold font-['Poppins'] leading-tight">
                                Back to Editor
                            </span>
                        </div>

                        {/* Create Scene + Icons */}
                        <div className="flex justify-between items-center">
                            <div className="flex items-center bg-violet-600 px-5 py-3 rounded-2xl gap-3" onClick={() => setIsOpen(true)}>
                                <img src={plus} className="w-5 h-5" />
                                <span className="text-white text-sm font-semibold font-['Poppins']">
                                    Create Scenes
                                </span>
                            </div>

                            <div className="flex gap-2">
                                <div className="w-12 h-12 flex items-center justify-center rounded-2xl outline outline-1 outline-black/10">
                                    <img src={twoWayArrow} className="w-6 h-6" />
                                </div>
                                <div className="w-12 h-12 flex items-center justify-center rounded-2xl outline outline-1 outline-black/10">
                                    <img src={threeDotsVertical} className="w-6 h-6" />
                                </div>
                            </div>
                        </div>

                        {/* Search */}
                        <div className="flex items-center px-4 h-10 bg-white rounded-2xl outline outline-1 outline-gray-400 gap-3">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="flex-grow outline-none text-sm text-gray-700 font-medium font-['Poppins'] placeholder:text-neutral-400"
                            />
                            <img src={search} alt="search" className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                {/* Main Area */}
                <div className='flex flex-col w-[80%] h-full'>
                    {/* Header */}
                    <div className='h-[10%]  w-full inline-flex justify-start items-start gap-2.5 py-4 px-6'>
                        {/* <div className=" inline-flex justify-start items-start gap-2.5"> */}
                        <div className="flex-1 h-10 px-6 py-3 bg-gray-800 rounded-[72px] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.10)] flex justify-center items-center gap-2 overflow-hidden" onClick={() => setActive(0)}>
                            <div className="text-center justify-start text-white text-xs font-medium font-['Poppins'] leading-none">Scene breakdown</div>
                        </div>
                        <div className="flex-1 h-10 px-6 py-3 bg-white rounded-[72px] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.10)] flex justify-center items-center gap-2 overflow-hidden" onClick={()=>setIsAutomaticBreakdown(true)}>
                            <div className="text-center justify-start text-gray-800 text-xs font-normal font-['Poppins'] leading-none">Automatic Breakdown</div>
                        </div>
                        <div className="flex-1 h-10 px-6 py-3 bg-white rounded-[72px] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.10)] flex justify-center items-center gap-2 overflow-hidden" onClick={() => setActive(2)}>
                            <div className="text-center justify-start text-gray-800 text-xs font-normal font-['Poppins'] leading-none">Breakdown Summary</div>
                        </div>
                        
                        <div className="flex-1 h-10 px-6 py-3 bg-white rounded-[72px] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.10)] flex justify-center items-center gap-2 overflow-hidden" onClick={() => setIsSceneDetails(true)}>
                            <div className="text-center justify-start text-gray-800 text-xs font-normal font-['Poppins'] leading-none">Scene details</div>
                        </div>
                        <div className="flex-1 h-10 px-6 py-3 bg-white rounded-[72px] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.10)] flex justify-center items-center gap-2 overflow-hidden" onClick={() => setActive(5)}>
                            <div className="text-center justify-start text-gray-800 text-xs font-normal font-['Poppins'] leading-none" >Reports</div>
                        </div>
                        {/* </div> */}
                    </div>

                    {active === 0 ? <SceneBreakdown /> :
                        active === 2 ? <BreakdownSummary /> :
                            active == 5 ? <Reports /> : ""}

                </div>

            </div>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                    <div className="w-[50%] h-[90%] bg-white rounded-lg shadow-lg flex flex-col overflow-hidden overflow-y-scroll">
                        <div className=" w-[100%]  px-10 py-6 bg-white rounded-tl-3xl rounded-tr-3xl shadow-md flex flex-col gap-2.5">
                            <div className="flex justify-between items-center">
                                <h3 className="text-gray-800 text-lg font-bold">Create scene</h3>
                                <div className="flex gap-2.5">
                                    <div className="w-5 h-5 border border-black/10 rounded-full flex justify-center items-center">
                                        <div className="w-3 h-3 border border-slate-700 rounded-full" />
                                    </div>
                                    <div className="w-4 h-4 border border-black/10 rounded flex justify-center items-center">
                                        <div className="w-2 h-2 bg-slate-700 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-[100%] inline-flex flex-col justify-start items-start gap-6 mt-6 mx-6">
                            <div className="flex flex-col justify-start items-start gap-1.5">
                                <div className="justify-start text-neutral-400 text-base font-medium font-['Poppins'] leading-tight">Number of script pages </div>
                                <div className="w-60 h-8 relative bg-white rounded-lg border border-black/10" />
                            </div>
                            <div className="inline-flex justify-start items-start gap-7">
                                <div className="inline-flex flex-col justify-start items-start gap-1.5">
                                    <div className="justify-start text-neutral-400 text-base font-medium font-['Poppins'] leading-tight">Set</div>
                                    <div className="w-60 h-8 relative bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-black/10">
                                        <div className="w-1 h-2 left-[232.75px] top-[14.25px] absolute origin-top-left rotate-90 outline outline-1 outline-offset-[-0.56px] outline-slate-700" />
                                    </div>
                                </div>
                                <div className="inline-flex flex-col justify-start items-start gap-1.5">
                                    <div className="flex flex-col justify-start items-start gap-1.5">
                                        <div className="justify-start text-neutral-400 text-base font-medium font-['Poppins'] leading-tight">Environment</div>
                                        <div className="w-60 h-8 relative bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-black/10">
                                            <div className="w-1 h-2 left-[234px] top-[15px] absolute origin-top-left rotate-90 outline outline-1 outline-offset-[-0.56px] outline-slate-700" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="inline-flex justify-start items-start gap-5">
                                <div className="inline-flex flex-col justify-start items-start gap-1.5">
                                    <div className="justify-start text-neutral-400 text-base font-medium font-['Poppins'] leading-tight">Script day</div>
                                    <div className="w-40 h-8 relative bg-white rounded-lg border border-black/10" />
                                </div>
                                <div className="inline-flex flex-col justify-start items-start gap-1.5">
                                    <div className="justify-start text-neutral-400 text-base font-medium font-['Poppins'] leading-tight">Point in time (Flashback, year, etc..)</div>
                                    <div className="w-60 h-8 relative bg-white rounded-lg border border-black/10" />
                                </div>
                            </div>
                            <div className="self-stretch flex flex-col justify-start items-start gap-3">
                                <div className="self-stretch justify-start text-neutral-400 text-base font-medium font-['Poppins'] leading-tight">Description</div>
                                <div className="self-stretch h-48 relative bg-white rounded-lg border border-black/10" />
                            </div>
                            <div className="self-stretch flex flex-col justify-start items-start gap-3">
                                <div className="self-stretch justify-start text-neutral-400 text-base font-medium font-['Poppins'] leading-tight">Note for production</div>
                                <div className="self-stretch h-20 relative bg-white rounded-lg border border-black/10" />
                            </div>
                            <div className="flex flex-col justify-start items-start gap-3">
                                <div className="justify-start text-neutral-400 text-base font-medium font-['Poppins'] leading-tight">Do you want to add more</div>
                                <div className="inline-flex justify-start items-start gap-3">
                                    <div className="w-36 h-11 relative bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-black/10">
                                        <div className="w-6 h-6 left-[10px] top-[10px] absolute overflow-hidden">
                                            <div className="w-6 h-6 left-0 top-0 absolute" />
                                            <div className="w-2 h-2 left-[8px] top-[3px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-500" />
                                            <div className="w-1 h-1.5 left-[6px] top-[15px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-500" />
                                            <div className="w-2 h-2 left-[13.60px] top-[14px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-500" />
                                        </div>
                                        <div className="left-[44px] top-[14px] absolute justify-start text-gray-800 text-sm font-medium font-['Poppins'] leading-none">characters </div>
                                    </div>
                                    <div className="w-24 h-11 relative bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-black/10">
                                        <div className="w-6 h-6 left-[10px] top-[10px] absolute overflow-hidden">
                                            <div className="w-6 h-6 left-0 top-0 absolute" />
                                            <div className="w-2 h-2 left-[8px] top-[3px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-500" />
                                            <div className="w-1 h-1.5 left-[6px] top-[15px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-500" />
                                            <div className="w-2 h-2 left-[13.60px] top-[14px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-500" />
                                        </div>
                                        <div className="left-[44px] top-[14px] absolute justify-start text-gray-800 text-sm font-medium font-['Poppins'] leading-none">Extras</div>
                                    </div>
                                    <div className="w-52 h-11 relative bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-black/10">
                                        <div className="w-6 h-6 left-[10px] top-[10px] absolute overflow-hidden">
                                            <div className="w-6 h-6 left-0 top-0 absolute" />
                                            <div className="w-4 h-4 left-[3px] top-[4px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-500" />
                                            <div className="w-1.5 h-1.5 left-[9px] top-[10px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-500" />
                                        </div>
                                        <div className="left-[44px] top-[14px] absolute justify-start text-gray-800 text-sm font-medium font-['Poppins'] leading-none">Shooting information</div>
                                    </div>
                                    <div className="w-24 h-11 relative bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-black/10">
                                        <div className="w-6 h-6 left-[10px] top-[10px] absolute overflow-hidden">
                                            <div className="w-6 h-6 left-0 top-0 absolute" />
                                            <div className="w-[5px] h-[5px] left-[15px] top-[3px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-500" />
                                            <div className="w-2.5 h-3.5 left-[9px] top-[3px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-500" />
                                            <div className="w-2.5 h-3.5 left-[5px] top-[7px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-500" />
                                        </div>
                                        <div className="left-[44px] top-[14px] absolute justify-start text-gray-800 text-sm font-medium font-['Poppins'] leading-none">Files</div>
                                    </div>
                                </div>

                            </div>


                        </div>
                        <div className="h-20 relative  rounded-bl-3xl rounded-br-3xl mb-2 px-2">
                            <div className="left-[432px] top-[12px] absolute inline-flex justify-start items-center gap-2">
                                <div className="w-40 h-14 px-3.5 py-3 rounded-2xl outline outline-1 outline-offset-[-1px] outline-neutral-400 flex justify-center items-center gap-1.5">
                                    <div className="justify-start text-zinc-500 text-base font-medium font-['Poppins'] leading-tight">Cancel</div>
                                </div>
                                <div className="w-40 h-14 px-3.5 py-3 bg-violet-600 rounded-2xl flex justify-center items-center gap-1.5" onClick={() => setIsOpen(false)}>
                                    <div className="justify-start text-white text-base font-medium font-['Poppins'] leading-tight">Close</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
            {isReports && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                    <Reports />
                </div>
            )}
            {isSceneDetails && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                    <div className="w-[560px] relative bg-white rounded-3xl inline-flex flex-col justify-start items-center gap-6">
                        <div className="self-stretch px-10 py-6 bg-white rounded-tl-3xl rounded-tr-3xl shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] flex flex-col justify-start items-start gap-2.5 overflow-hidden">
                            <div className="self-stretch inline-flex justify-between items-start">
                                <div className="justify-start text-gray-800 text-lg font-bold font-['Poppins'] leading-snug">Scene details</div>
                                <div className="flex justify-start items-start gap-[3px]">
                                    <div className="p-0.5 outline outline-1 outline-offset-[-1px] outline-black/10 flex justify-start items-center gap-2.5">
                                        <div className="w-4 h-4 relative">
                                            <div className="w-2 h-2 left-[3.85px] top-[4px] absolute bg-slate-700" />
                                            <div className="w-2 h-2 left-[3.85px] top-[4px] absolute bg-stone-800" />
                                            <div className="w-4 h-4 left-0 top-0 absolute">
                                                <div className="w-4 h-4 left-0 top-0 absolute bg-slate-700" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch px-10 inline-flex justify-start items-center gap-2.5">
                            <div className="justify-start text-black text-base font-normal font-['Courier_Prime'] tracking-widest">INT. PALACE - DINING HALL - LATER</div>
                        </div>
                        <div className="self-stretch flex flex-col justify-start items-start gap-4">
                            <div className="self-stretch h-12 px-10 flex flex-col justify-center items-start gap-1.5">
                                <div className="self-stretch flex-1 px-3 py-2 rounded-md outline outline-1 outline-offset-[-1px] outline-black/10 inline-flex justify-start items-center gap-2">
                                    <div className="flex-1 flex justify-between items-center">
                                        <div className="justify-start text-gray-800 text-base font-medium font-['Poppins'] leading-tight">Scene Title</div>
                                        <div className="w-4 h-4 relative">
                                            <div className="w-4 h-4 left-0 top-0 absolute">
                                                <div className="w-4 h-4 left-0 top-0 absolute bg-slate-700" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="self-stretch h-12 px-10 flex flex-col justify-center items-start gap-1.5">
                                <div className="self-stretch flex-1 px-3 py-2 rounded-md outline outline-1 outline-offset-[-1px] outline-black/10 inline-flex justify-start items-center gap-2">
                                    <div className="flex-1 flex justify-between items-center">
                                        <div className="justify-start text-gray-800 text-base font-medium font-['Poppins'] leading-tight">Summary</div>
                                        <div className="w-4 h-4 relative">
                                            <div className="w-4 h-4 left-0 top-0 absolute">
                                                <div className="w-4 h-4 left-0 top-0 absolute bg-slate-700" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="self-stretch px-10 flex flex-col justify-center items-start gap-1.5">
                                <div className="self-stretch px-3 py-2 rounded-md outline outline-1 outline-offset-[-1px] outline-black/10 inline-flex justify-start items-center gap-2">
                                    <div className="flex-1 flex justify-between items-center">
                                        <div className="w-96 justify-start text-gray-800 text-sm font-medium font-['Poppins'] leading-tight">The guests rave about Edha's food, and even the king himself is impressed. The critic remains reserved, observing every detail.</div>
                                        <div className="w-4 h-4 relative">
                                            <div className="w-4 h-4 left-0 top-0 absolute">
                                                <div className="w-4 h-4 left-0 top-0 absolute bg-slate-700" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch h-20 relative bg-white rounded-bl-3xl rounded-br-3xl shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden">
                            <div className="left-[208px] top-[12px] absolute inline-flex justify-start items-center gap-2">
                                <div className="w-40 h-14 px-3.5 py-3 rounded-2xl outline outline-1 outline-offset-[-1px] outline-neutral-400 flex justify-center items-center gap-1.5" onClick={() =>
                                    setIsSceneDetails(false)
                                }>
                                    <div className="justify-start text-zinc-500 text-base font-medium font-['Poppins'] leading-tight">Cancel</div>
                                </div>
                                <div className="w-40 h-14 px-3.5 py-3 bg-violet-600 rounded-2xl flex justify-center items-center gap-1.5">
                                    <div className="justify-start text-white text-base font-medium font-['Poppins'] leading-tight">Save</div>
                                </div>
                            </div>
                        </div>
                        <div className="w-48 h-16 left-[404.50px] top-[232px] absolute rounded-2xl shadow-[0px_4px_6px_-2px_rgba(16,24,40,0.03)] shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08)]">
                            <div className="w-4 h-1.5 left-[97.50px] top-[6px] absolute origin-top-left -rotate-180" />

                        </div>
                    </div>
                </div>
            )}
            {
                isAutomaticBreakdown && (
                    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                    <div className="w-[560px] bg-white rounded-3xl inline-flex flex-col justify-start items-center gap-6">
                        <div className="self-stretch px-10 py-6 bg-white rounded-tl-3xl rounded-tr-3xl shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] flex flex-col justify-start items-start gap-2.5 overflow-hidden">
                            <div className="self-stretch inline-flex justify-between items-start">
                                <div className="justify-start text-gray-800 text-lg font-bold font-['Poppins'] leading-snug">Automatic Script Breakdown</div>
                                <div className="flex justify-start items-start gap-[3px]">
                                    <div className="p-0.5 outline outline-1 outline-offset-[-1px] outline-black/10 flex justify-start items-center gap-2.5">
                                        <div className="w-4 h-4 relative">
                                            <div className="w-2 h-2 left-[3.85px] top-[4px] absolute bg-slate-700" />
                                            <div className="w-2 h-2 left-[3.85px] top-[4px] absolute bg-stone-800" />
                                            <div className="w-4 h-4 left-0 top-0 absolute">
                                                <div className="w-4 h-4 left-0 top-0 absolute bg-slate-700" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch pl-10 inline-flex justify-start items-center gap-2.5">
                            <div className="w-[500px] justify-start text-gray-800 text-base font-normal font-['Poppins'] leading-relaxed">Automatic Script Breakdown will collect each scene, analyze it, and output all scene elements. Processing a full-length feature film script typically takes 5 to 10 minutes.</div>
                        </div>
                        <div className="w-[560px] pl-10 inline-flex justify-start items-center gap-2.5">
                            <div className="w-[500px] justify-start text-gray-800 text-base font-semibold font-['Poppins'] leading-relaxed">Attention: Please note that it will override your existing breakdown.</div>
                        </div>
                        <div className="self-stretch h-20 relative bg-white rounded-bl-3xl rounded-br-3xl shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden">
                            <div className="left-[208px] top-[12px] absolute inline-flex justify-start items-center gap-2">
                                <div className="w-40 h-14 px-3.5 py-3 rounded-2xl outline outline-1 outline-offset-[-1px] outline-neutral-400 flex justify-center items-center gap-1.5" onClick={()=>setIsAutomaticBreakdown(false)}>
                                    <div className="justify-start text-zinc-500 text-base font-medium font-['Poppins'] leading-tight">Cancel</div>
                                </div>
                                <div className="w-40 h-14 px-3.5 py-3 bg-violet-600 rounded-2xl flex justify-center items-center gap-1.5">
                                    <div className="justify-start text-white text-base font-medium font-['Poppins'] leading-tight">Submit</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                )
            }
        </div>



    )
}

export default ScriptBreakdown