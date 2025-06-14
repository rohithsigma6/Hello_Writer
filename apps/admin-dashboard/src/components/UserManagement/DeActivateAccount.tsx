// import React from 'react'

import { IoCloseSharp } from "react-icons/io5";
import DropDown from "../DropDown";
import { useState } from "react";

const DeActivateAccount = ({ showDeactivateModal, closeDeactivateModal }: { showDeactivateModal: string; closeDeactivateModal: () => void; }) => {
    const [reason, setReason] = useState("Abusive");

    console.log(reason);

    return (
        <div className="bg-white rounded-2xl min-w-lg font-['Poppins']">
            <header className="flex flex-row justify-between p-4 border-b border-gray-300">
                <h1 className="text-lg font-semibold ml-4">De-Activate Account</h1>

                <button onClick={closeDeactivateModal} className="cursor-pointer rounded-full hover:bg-black hover:text-white transition-colors p-2 ">
                    <IoCloseSharp />
                </button>
            </header>

            <section className="px-6 py-4">
                <p className="font-medium">Are you sure? You want to De-active account?</p>
                <p className="font-medium"><span className="text-gray-600 font-normal">User id:-</span> {showDeactivateModal}</p>

                <div className="mt-4">
                    <p className="font-medium mb-1">Select Reason:</p>
                    <DropDown setValue={setReason} ArrayObj={["Abusive", "Others"]} />
                </div>

                <div className="mt-4">
                    <p className="font-medium mb-1">Notes:</p>
                    <textarea name="notes" id=""
                        className="p-3 w-full resize-none border border-gray-300 rounded-xl"
                        placeholder="notes_goes_here"
                    ></textarea>
                </div>
            </section>

            <section className="flex flex-row justify-end gap-3 border-t border-gray-300 py-4 px-6">
                <button onClick={closeDeactivateModal} className="py-3 px-8 cursor-pointer border border-gray-400 hover:text-white hover:bg-gray-400 transition-colors rounded-xl text-gray-600">Cancel</button>
                <button className="py-3 px-8 cursor-pointer bg-[#643EFF] hover:bg-[#661EFF] transition-colors rounded-xl text-white">De-Activate</button>
            </section>
        </div>
    )
}

export default DeActivateAccount