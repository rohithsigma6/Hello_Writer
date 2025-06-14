
import rigthIndicator from '../../../assets/scriptBreakdown/rightIndicator.svg'
import comment from '../../../assets/scriptBreakdown/comment.svg'
const SceneBreakdown = () => {
    return (

        <div className='flex flex-row h-[100%] w-full'>
            <div className='w-[70%] h-full'>
                <div className='h-auto w-[90%] mx-auto mt-4 border border-grey p-4 rounded-[20px] bg-white shadow'>

                    {/* Header: Scene Number + Icons */}
                    <div className='flex justify-between items-center mb-4'>
                        <div className='flex items-center gap-2'>
                            <h1 className='text-lg font-semibold'>1</h1>
                            <img src={rigthIndicator} alt='Right Indicator' className='w-5 h-5' />
                        </div>
                        <div>
                            <img src={comment} alt='Comment' className='w-5 h-5' />
                        </div>
                    </div>

                    {/* Scene Info Row */}
                    <div className="flex items-end justify-between w-full gap-1 text-sm font-medium font-['Poppins'] relative">

                        {/* Number */}
                        <div className="flex flex-col w-[8%]">
                            <label className="text-xs text-gray-500 mb-1">Number</label>
                            <input
                                type="text"
                                value="1"
                                className="h-8 px-2 border border-gray-300 rounded-md focus:outline-none w-full"
                            />
                        </div>

                        {/* Int/Ext */}
                        <div className="flex flex-col w-[10%]">
                            <label className="text-xs text-gray-500 mb-1">Int/Ext</label>
                            <input
                                type="text"
                                value="EXT."
                                className="h-8 px-2 border border-gray-300 rounded-md focus:outline-none w-full"
                            />
                        </div>

                        {/* Set */}
                        <div className="flex flex-col w-[40%] relative">
                            <label className="text-xs text-gray-500 mb-1">Set</label>
                            <input
                                type="text"
                                value="Ferry Ramses / Foredeck"
                                className="h-8 px-2 border border-gray-300 rounded-md focus:outline-none w-full"
                            />

                        </div>

                        {/* Day/Night */}
                        <div className="flex flex-col w-[12%]">
                            <label className="text-xs text-gray-500 mb-1">Day/Night</label>
                            <input
                                type="text"
                                value="Day"
                                className="h-8 px-2 border border-gray-300 rounded-md focus:outline-none w-full"
                            />
                        </div>

                        {/* Script Day */}
                        <div className="flex flex-col w-[10%]">
                            <label className="text-xs text-gray-500 mb-1">Script day</label>
                            <input
                                type="text"
                                value="-"
                                className="h-8 px-2 border border-gray-300 rounded-md focus:outline-none w-full"
                            />
                        </div>

                        {/* Pages */}
                        <div className="flex flex-col w-[10%]">
                            <label className="text-xs text-gray-500 mb-1">Pages</label>
                            <input
                                type="text"
                                value="1"
                                className="h-8 px-2 border border-gray-300 rounded-md focus:outline-none w-full"
                            />
                        </div>

                    </div>
                    <div className="flex flex-col w-[100%] mt-4">
                        <label className="text-xs text-gray-500 mb-1">Description</label>
                        <input
                            type="text"
                            value="1"
                            className="h-8 px-2 border border-gray-300 rounded-md focus:outline-none w-full"
                        />
                    </div>
                    <div className="flex flex-col w-[100%] mt-4">
                        <label className="text-xs text-gray-500 mb-1">Characters</label>
                        <input
                            type="text"
                            value="1"
                            className="h-8 px-2 border border-gray-300 rounded-md focus:outline-none w-full"
                        />
                    </div>
                    <div className="flex items-end justify-between w-full gap-2 text-sm font-medium font-['Poppins'] relative mt-4">
                        <div className="flex flex-col w-[30%]">
                            <label className="text-xs text-gray-500 mb-1">Estimated Time</label>
                            <input
                                type="text"
                                value="00:00"
                                className="h-8 px-2 border border-gray-300 rounded-md focus:outline-none w-full"
                            />
                        </div>
                        <div className="flex flex-col w-[70%]">
                            <label className="text-xs text-gray-500 mb-1">Filming Location</label>
                            <input
                                type="text"
                                value="1"
                                className="h-8 px-2 border bord er-gray-300 rounded-md focus:outline-none w-full"
                            />
                        </div>

                    </div>
                    <div className="flex flex-col w-[100%] mt-4">
                        <label className="text-xs text-gray-500 mb-1">Note for production</label>
                        <input
                            type="text"
                            value="1"
                            className="h-8 px-2 border border-gray-300 rounded-md focus:outline-none w-full"
                        />
                    </div>
                </div>
            </div>

            <div className="w-[25%] h-full bg-white flex flex-col px-3 py-4 gap-3 border-r">

                {/* Header */}
                <div className="flex items-center justify-between h-12 px-4 py-2 bg-white rounded-md shadow-sm border">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                            {/* Grid dots icon substitute */}
                            <div className="w-3 h-3 grid grid-cols-2 gap-[1px]">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="w-1.5 h-1.5 bg-neutral-400 rounded-sm" />
                                ))}
                            </div>
                        </div>
                        <span className="font-bold text-sm text-gray-800">All Elements</span>
                    </div>
                    <span className="font-medium text-sm text-gray-800">115</span>
                </div>

                {/* Add Button */}
                <button className="w-full h-10 px-4 flex justify-between items-center bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-800 shadow-sm">
                    Add element to scene
                    <span className="text-xl leading-none">+</span>
                </button>

                {/* Section Title */}
                <div className="text-xs font-semibold text-gray-500 px-1 uppercase tracking-wide">
                    Categories
                </div>

                {/* Category List */}
                <div className="flex flex-col gap-1">
                    {[
                        { name: "Characters", count: 0, color: "bg-blue-400" },
                        { name: "Extras", count: 0, color: "bg-blue-500" },
                        { name: "Costumes", count: 0, color: "bg-pink-500" },
                        { name: "Makeup", count: 0, color: "bg-purple-500" },
                        { name: "Constructions", count: 0, color: "bg-orange-400" },
                        { name: "Set Dressing", count: 0, color: "bg-orange-500" },
                        { name: "Props", count: 1, color: "bg-red-500" },
                        { name: "Graphics", count: 0, color: "bg-rose-500" },
                        { name: "Vehicles", count: 0, color: "bg-orange-600" },
                        { name: "Animal Elements", count: 0, color: "bg-blue-700" },
                        { name: "Visual effects", count: 0, color: "bg-lime-500" },
                        { name: "Special effects", count: 0, color: "bg-emerald-500" },
                    ].map((cat, i) => (
                        <div key={i} className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-100 rounded-md shadow-sm hover:bg-gray-50 cursor-pointer">
                            <div className="flex items-center gap-2">
                                <div className={`w-6 h-6 ${cat.color} rounded-full flex items-center justify-center`}>
                                    <span className="text-white text-xs font-bold">🎯</span> {/* You can replace with real icons */}
                                </div>
                                <span className="text-sm font-medium text-gray-800">{cat.name} ({cat.count})</span>
                            </div>
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    ))}
                </div>
            </div>

        </div>


    )
}

export default SceneBreakdown