import React from 'react';
import noShots from '@/assets/script-lining/shot.svg'
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ShotSuggestion = () => {
    return (
        <div className='mt-6 border border-gray-400 rounded-2xl p-4'>
            <header className="flex flex-row justify-between items-center">
                <label className="text-sm font-semibold block mb-2">Shot Suggestion</label>

                <div className="flex gap-x-2">
                    <button className="p-2 rounded-full h-fit border border-gray-700 hover:bg-black hover:text-white transition-colors">
                        <ChevronLeft size={18} />
                    </button>
                    <button className="p-2 rounded-full h-fit border border-gray-700 hover:bg-black hover:text-white transition-colors">
                        <ChevronRight size={18} />
                    </button>
                </div>
            </header>

            <div className="flex justify-center py-6">
                <div className="flex flex-col gap-2 items-center">
                    <img src={noShots} alt="No Shots" className="" />
                    <p className='text-center font-medium text-sm'>There are not Shots</p>
                    <button className="bg-gray-900 hover:bg-black transition-colors px-6 py-2 rounded-full text-white text-sm">
                        Suggest Shot +
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ShotSuggestion