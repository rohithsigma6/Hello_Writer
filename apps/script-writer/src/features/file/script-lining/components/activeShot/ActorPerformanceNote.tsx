import React, { useState } from 'react'
import { GoChevronDown } from 'react-icons/go';

const ActorPerformanceNote = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className='mt-6 border border-gray-400 rounded-2xl p-4'>
            <header onClick={() => setOpen(!open)} className='flex flex-row cursor-pointer items-center justify-between'>
                <label className="text-sm font-semibold block cursor-pointer">Actor's Performance Notes</label>

                <button className={`${open ? "rotate-180" : "rotate-0"}`}>
                    {/* @ts-ignore */}
                    <GoChevronDown className='text-xl' />
                </button>
            </header>

            {open &&
                <textarea
                    placeholder={"Write a actor performance notes"}
                    className="w-full p-2 mt-4 border border-gray-400 text-sm rounded-xl outline-none focus:ring-2 focus:ring-black resize-none"
                />}
        </div>
    )
}

export default ActorPerformanceNote