// import React from 'react'

import { useState } from "react"
import { RxCopy } from "react-icons/rx";
import DropDown from "../DropDown";
import { LuSend } from "react-icons/lu";
import FeaturesSelector from "../FeaturesSelector";

const users = [
    {
        id: "#0963",
        initials: "HJ",
        name: "Johnson H",
        email: "Johnsonh@example.com",
        plan: "Free",
        status: "Pending",
        statusColor: "bg-yellow-100 text-yellow-800",
        date: "16-11-2021",
    },
    // You can add more users here
];

const OnboardNewUser = () => {
    const [activeSide, setActiveSide] = useState("register");
    const [registerSide, setRegisterSide] = useState("predefined");
    const [showTable, setShowTable] = useState(false);
    const [subsPlan, setSubsPlan] = useState("Free");
    const [duration, setDuration] = useState("1 Day");
    const [features, setFeatures] = useState<string[]>([])

    const [copied, setCopied] = useState(false);

    const textToCopy = "copied link from backend"

    function handleTrackStatus() {
        setShowTable(true);
    }

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setCopied(true);

            // revert "Copied!" message after 2s
            setTimeout(() => setCopied(false), 1000);
        } catch (err) {
            console.error("Failed to copy!", err);
        }
    };

    console.log(subsPlan, duration, features);

    return (
        <div className="p-4 flex-1 w-full border-[1px] border-gray-300 rounded-xl">
            <h1 className="font-semibold text-lg">Onboard New User</h1>

            <section className="flex flex-row gap-x-4 mt-4">
                <button className={"cursor-pointer px-4 py-2 border-b-3 font-medium" + ` ${activeSide === "register" ? "border-[#653EFF] text-[#653EFF]" : "border-transparent text-gray-600"}`} onClick={() => setActiveSide("register")}>
                    <p>Register New User</p>
                </button>
                <button className={"cursor-pointer px-4 py-2 border-b-3 font-medium" + ` ${activeSide === "track" ? "border-[#653EFF] text-[#653EFF]" : "border-transparent text-gray-600"}`} onClick={() => setActiveSide("track")}>
                    <p>Track Status</p>
                </button>
            </section>

            {activeSide == "register" ?
                <>
                    <section className="flex flex-row gap-x-4 mt-6">
                        <div className="flex flex-row items-center gap-x-2">
                            <input
                                type="radio"
                                name="register"
                                value="predefined"
                                checked={registerSide === "predefined"}
                                onChange={(e) => setRegisterSide(e.target.value)}
                                className="custom-radio"
                            />
                            <p>Predefined Plan</p>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <input
                                type="radio"
                                name="register"
                                value="custom"
                                checked={registerSide === "custom"}
                                onChange={(e) => setRegisterSide(e.target.value)}
                                className="custom-radio"
                            />
                            <p>Custom Plan</p>
                        </div>
                    </section>

                    <section className="flex flex-col gap-y-4">
                        <div className="flex flex-row gap-x-4 mt-4 w-full">
                            <div className="flex-1">
                                <p className="font-medium text-base mb-1">Email</p>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="youremail@add.ress"
                                    className="p-2.5 text-sm w-full border-[1px] border-gray-300 rounded-xl" id=""
                                />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-base mb-1">Password</p>
                                <input
                                    type="password"
                                    name="email"
                                    placeholder="Your Password"
                                    className="p-2.5 text-sm w-full border-[1px] border-gray-300 rounded-xl" id=""
                                />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-base mb-1">Phone number</p>
                                <input
                                    type="number"
                                    name="phone"
                                    placeholder="+91 XXXXX XXXXX"
                                    className="p-2.5  text-sm w-full border-[1px] border-gray-300 rounded-xl" id=""
                                />
                            </div>
                        </div>

                        {registerSide === "predefined" ?
                            <div className="flex flex-row gap-x-4 w-[90%]">
                                <div className="flex-1">
                                    <p className="font-medium text-base mb-1">Duration</p>
                                    <DropDown setValue={setDuration} ArrayObj={["1 Month", "3 Months", "6 Months", "1 Year"]} />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-base mb-1">Subscription Plan</p>
                                    <DropDown setValue={setSubsPlan} ArrayObj={["Free", "Free - access", "Beta", "Regular", "Life Time"]} />
                                </div>
                            </div> : (
                                <>
                                    <div>
                                        <p className="font-medium text-base my-2">Select Features</p>

                                        <FeaturesSelector setFeatures={setFeatures} ArrayObj={["Collaborative Editing", "Script Writting", "Feature 3", "Feature 4"]} />
                                    </div>

                                    <div>
                                        <p className="font-medium text-base my-2">Custom Expiry Date</p>

                                        <div className="flex flex-row gap-4 w-[66%]">
                                            <section className="w-full flex-1">
                                                <p className="text-sm text-gray-600 mb-1">From</p>
                                                <input type="date" name="expiry-from" className="p-2 w-full border border-gray-300 rounded-xl" id="" />
                                            </section>
                                            <section className="w-full flex-1">
                                                <p className="text-sm text-gray-600 mb-1">From</p>
                                                <input type="date" name="expiry-from" className="p-2 w-full border border-gray-300 rounded-xl" id="" />
                                            </section>
                                        </div>
                                    </div>
                                </>
                            )}
                    </section>

                    <section className="mt-6">
                        <button className="p-3 rounded-2xl bg-[#653EFF] hover:bg-[#654EFF] text-white cursor-pointer">
                            <p className="text-sm">Generate Payment Link</p>
                        </button>

                        <div className="p-3 mt-4 bg-[#F5F2FF] flex flex-row items-center justify-between w-full border-[1px] border-[#D6CCFF] rounded-xl">
                            <div className="font-medium">
                                <p className="text-sm mb-1">Generated Link:</p>
                                <p>https://app.example.com/subscribe/abc123def456</p>
                            </div>

                            <div className="flex flex-row gap-3">
                                <button onClick={handleCopy} className="group cursor-pointer border-[1px] border-[#653EFF] hover:bg-[#653EFF] transition-colors rounded-xl text-base px-2.5 py-1.5 text-[#653EFF] hover:text-white font-medium flex flex-row items-center gap-x-1">
                                    <span className="text-[#643EFF] group-hover:text-white text-lg">
                                        <RxCopy />
                                    </span>
                                    {!copied ? "Copy Link" : "Copied"}
                                </button>

                                <button className="group cursor-pointer border-[1px] border-[#653EFF] hover:bg-[#653EFF] transition-colors rounded-xl text-base px-2.5 py-1.5 text-[#653EFF] hover:text-white font-medium flex flex-row items-center gap-x-1">
                                    <span className="text-[#643EFF] group-hover:text-white text-lg">
                                        <LuSend />
                                    </span>
                                    Send Mail
                                </button>
                            </div>
                        </div>
                    </section>
                </>
                :
                <>
                    <div className="flex flex-row gap-x-4 mt-4 w-[50%]">
                        <div className="flex-1">
                            <p className="font-medium text-base mb-1">Email</p>
                            <input
                                type="email"
                                name="email"
                                placeholder="youremail@add.ress"
                                className="p-2.5 text-sm w-full border-[1px] border-gray-300 rounded-xl" id=""
                            />
                        </div>
                    </div>

                    <button onClick={handleTrackStatus} className="p-3 mt-6 rounded-2xl bg-[#653EFF] hover:bg-[#654EFF] text-white cursor-pointer">
                        <p className="text-sm">Track Status</p>
                    </button>

                    {showTable &&
                        <section className="mt-6">
                            <TrackStatusTable />
                        </section>
                    }
                </>
            }
        </div>
    )
}

const TrackStatusTable = () => {
    return (
        <div className="overflow-x-auto bg-white rounded-xl border border-gray-300 shadow">
            <table className="min-w-full text-left ">
                <thead className="bg-gray-200 text-gray-700 border-b border-gray-300 text-sm font-semibold">
                    <tr>
                        <th className="py-3 px-4 font-medium rounded-tl-xl">User ID</th>
                        <th className="py-3 px-4 font-medium">Name</th>
                        <th className="py-3 px-4 font-medium">Email</th>
                        <th className="py-3 px-4 font-medium">Plan Type</th>
                        <th className="py-3 px-4 font-medium">Payment Status</th>
                        <th className="py-3 px-4 font-medium">Link sent Date</th>
                        <th className="py-3 px-4 font-medium rounded-tr-xl">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr
                            key={index}
                            className="bg-white rounded-xl shadow-sm hover:shadow-md transition"
                        >
                            <td className="py-3 px-4 text-sm text-gray-700">{user.id}</td>
                            <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-purple-200 text-purple-800 font-bold flex items-center justify-center text-sm">
                                        {user.initials}
                                    </div>
                                    <span className="text-sm font-medium text-gray-800">
                                        {user.name}
                                    </span>
                                </div>
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-600">{user.email}</td>
                            <td className="py-3 px-4 text-sm text-gray-800">{user.plan}</td>
                            <td className="py-3 px-4">
                                <span
                                    className={`text-xs font-semibold px-3 py-1 rounded-full ${user.statusColor}`}
                                >
                                    {user.status}
                                </span>
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-700">{user.date}</td>
                            <td className="py-3 px-4">
                                <button className="text-sm font-medium text-[#653EFF] border border-[#654EFF] hover:bg-[#653EFF] hover:text-white cursor-pointer rounded-md px-3 py-1 transition">
                                    Resend Mail
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default OnboardNewUser