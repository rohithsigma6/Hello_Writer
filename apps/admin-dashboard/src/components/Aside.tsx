// import React from 'react'

import { FiBarChart2, FiCrop } from "react-icons/fi";
import { IoDocumentTextOutline, IoLayersOutline } from "react-icons/io5"
import { LuClock3 } from "react-icons/lu";
import { MdWeb } from "react-icons/md";
import { BiCommentDetail } from "react-icons/bi";

const Aside = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (activeTab: string) => void; }) => {
    const buttonStyle = "flex text-base flex-row gap-1.5 items-center font-medium cursor-pointer";
    const iconStyle = "text-xl";

    return (
        <div className="min-h-[90vh] bg-white py-10 px-6 pr-20 font-['Poppins']">
            <div className="flex flex-col gap-6">
                {["Dashboard Overview",
                    "User Management",
                    "User Feedback",
                    "Projects Management",
                    "Subscription Management",
                    "Analytics & Reports",
                    "Support Requests",
                    "Enterprise Solutions",
                    "Server Monitoring"
                ].map((buttonName) => (
                    <button
                        key={buttonName}
                        onClick={() => setActiveTab(buttonName)}
                        className={buttonStyle + ` ${activeTab === buttonName ? "text-[#653EFF]" : "text-black"}`}>
                        <span className={iconStyle + ` ${activeTab === buttonName ? "text-[#653EFF]" : "text-[#747475]"}`}>
                            <SideIcon buttonName={buttonName} />
                        </span>
                        {buttonName}
                    </button>)
                )}
            </div>
        </div>
    )
}

const SideIcon = ({ buttonName }: { buttonName: string }) => {
    return (
        buttonName === "Dashboard Overview" ?
            <IoDocumentTextOutline /> :
            buttonName === "User Management" ?
                <LuClock3 /> :
            buttonName === "User Feedback" ?
                <BiCommentDetail /> :
                buttonName === "Projects Management" ?
                    <MdWeb /> :
                    buttonName === "Subscription Management" ?
                        <IoLayersOutline /> :
                        buttonName === "Analytics & Reports" ?
                            <FiCrop /> :
                            buttonName === "Support Requests" ?
                                <FiCrop /> :
                                buttonName === "Enterprise Solutions" ?
                                    <FiBarChart2 /> :
                                    buttonName === "Server Monitoring" ?
                                        <FiBarChart2 /> :
                                        ""
    )
}

export default Aside