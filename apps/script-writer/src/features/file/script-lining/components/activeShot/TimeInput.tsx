import React from 'react'

const TimeInput = () => {
    const appearenNoneForNumber = "appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

    return (
        <section className="flex flex-row items-end gap-4">
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
        </section>
    )
}

export default TimeInput