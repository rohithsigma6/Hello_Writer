const BreakdownSummary = () => {
    return (
        <div className="w-[100%] h-[100%] flex flex-row">
            <div className="w-[70%] h-[90%] flex flex-col justify-start items-start gap-10  mx-6 px-6 py-4 border border-black rounded-[20px]">
                <div className="self-stretch px-2.5 py-[5px] flex flex-col justify-start items-start ">
                    <div className="py-[5px] inline-flex justify-start items-center gap-3 overflow-hidden">
                        <div className="justify-center text-black text-lg font-semibold font-['Poppins']">View</div>
                        <div className="w-24 px-2.5 py-[5px] bg-gray-800 rounded-[70px] flex justify-start items-center gap-[5px] ">
                            <div className="w-2.5 h-2.5 relative bg-zinc-500 rounded-[10px]" />
                            <div className="justify-center text-white text-[10px] font-semibold font-['Poppins']">One Scene</div>
                        </div>
                        <div className="w-24 px-2.5 py-[5px] bg-gray-800 rounded-[70px] flex justify-start items-center gap-[5px]">
                            <div className="w-2.5 h-2.5 relative bg-zinc-500 rounded-[10px]" />
                            <div className="justify-center text-white text-[10px] font-semibold font-['Poppins']">Full Script</div>
                        </div>
                    </div>
                </div>
                <div className="self-stretch pb-6 border-b border-black/10 inline-flex justify-start items-start gap-3">
                    <div className="flex-1 flex justify-between items-start">
                        <div className="flex-1 inline-flex flex-col justify-start items-start gap-4">
                            <div className="justify-start text-gray-800 text-2xl font-semibold font-['Poppins'] leading-7">Breakdown Summary</div>
                            <div className="self-stretch flex flex-col justify-start items-start gap-2">
                                <div className="justify-start"><span className="text-black/20 text-sm font-medium font-['Poppins'] leading-none">Project Name:</span><span className="text-zinc-500 text-sm font-medium font-['Poppins'] leading-none"> </span><span className="text-zinc-500 text-sm font-normal font-['Poppins'] leading-none">Demo: Forrest Gump</span></div>
                                <div className="justify-start"><span className="text-black/20 text-sm font-medium font-['Poppins'] leading-none">Created:</span><span className="text-zinc-500 text-sm font-medium font-['Poppins'] leading-none"> </span><span className="text-zinc-500 text-sm font-normal font-['Poppins'] leading-none">October 9, 2024</span></div>
                                <div className="justify-start"><span className="text-black/20 text-sm font-medium font-['Poppins'] leading-none">Scene:</span><span className="text-zinc-500 text-sm font-medium font-['Poppins'] leading-none"> </span><span className="text-zinc-500 text-sm font-normal font-['Poppins'] leading-none">4</span></div>
                                <div className="self-stretch flex flex-col justify-start items-start gap-1">
                                    <div className="self-stretch justify-start text-neutral-400 text-xs font-normal font-['Poppins'] leading-none">Automatic script breakdown was created using Screenplayink</div>
                                    <div className="self-stretch justify-start text-neutral-400 text-xs font-normal font-['Poppins'] leading-none">Screennplayink.com</div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="self-stretch inline-flex flex-col justify-between items-end">
                            <div className="flex flex-col justify-start items-start gap-5">
                                <div className="text-center justify-start text-zinc-950 text-[4.20px] font-normal font-['Courier_Prime']">Write, Collaborate, Create</div>
                                <div className="w-3 h-5 bg-black" />
                                <div className="w-3 h-5 bg-black" />
                                <div className="w-2.5 h-4 bg-black" />
                                <div className="w-2.5 h-4 bg-black" />
                                <div className="w-2.5 h-4 bg-black" />
                                <div className="w-2 h-4 bg-black" />
                                <div className="w-2 h-5 bg-black" />
                                <div className="w-2.5 h-5 bg-black" />
                                <div className="w-3 h-5 bg-black" />
                                <div className="w-1 h-1 bg-black" />
                                <div className="w-0.5 h-2 bg-black" />
                                <div className="w-1.5 h-2 bg-black" />
                                <div className="w-1.5 h-2 bg-black" />
                                <div className="w-2 h-[1.54px] bg-black" />
                                <div className="w-2 h-[1.54px] bg-black" />
                                <div className="w-2.5 h-4 bg-black" />
                            </div>
                            <div className="inline-flex justify-start items-center gap-2">
                                <div className="w-5 h-5 relative overflow-hidden">
                                    <div className="w-3 h-4 left-[2.22px] top-[2.22px] absolute bg-zinc-600" />
                                    <div className="w-2.5 h-1.5 left-[9.44px] top-[8.95px] absolute bg-zinc-600" />
                                    <div className="w-5 h-5 left-0 top-0 absolute" />
                                </div>
                                <div className="justify-start text-zinc-600 text-sm font-normal font-['Poppins'] leading-none">Export</div>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className="w-[100%] overflow-y-scroll">
                    <div className="self-stretch flex flex-col justify-start items-start gap-8">
                        <div className="inline-flex justify-start items-start gap-3">
                            <div className="w-8 h-8 p-2.5 bg-zinc-600 rounded-lg inline-flex flex-col justify-center items-center gap-2.5">
                                <div className="justify-start text-white text-base font-medium font-['Poppins'] leading-tight">1</div>
                            </div>
                            <div className="w-96 inline-flex flex-col justify-start items-start gap-3">
                                <div className="self-stretch justify-start text-gray-800 text-base font-medium font-['Poppins'] leading-tight">EXT.CHAI.TAPRI-DAY</div>
                                <div className="self-stretch justify-start text-zinc-500 text-sm font-medium font-['Poppins'] leading-none">Pages: 4</div>
                                <div className="self-stretch justify-start text-zinc-500 text-sm font-medium font-['Poppins'] leading-none">A feature floats through the air. The falling feather.</div>
                            </div>
                        </div>
                        <div className="self-stretch flex flex-col justify-start items-start gap-8">
                            <div className="self-stretch flex flex-col justify-start items-start gap-6">
                                <div className="self-stretch inline-flex justify-center items-start gap-6">
                                    <div className="flex-1 inline-flex flex-col justify-start items-start gap-4">
                                        <div className="self-stretch p-2.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-blue-400 flex flex-col justify-start items-start gap-2.5">
                                            <div className="self-stretch inline-flex justify-between items-center">
                                                <div className="flex justify-start items-center gap-1">
                                                    <div className="w-6 h-6 p-2 bg-blue-400 rounded-[50px] flex justify-center items-center gap-2">
                                                        <div className="w-4 h-4 relative overflow-hidden">
                                                            <div className="w-3 h-3.5 left-[1.65px] top-[1.18px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-white" />
                                                        </div>
                                                    </div>
                                                    <div className="justify-start text-blue-400 text-sm font-medium font-['Poppins'] leading-none">CHARACTERS (5)</div>
                                                </div>
                                                <div className="w-6 h-6 p-2.5 bg-blue-400 rounded-md outline outline-1 outline-offset-[-1px] outline-blue-400 flex justify-center items-center gap-2.5">
                                                    <div className="w-5 h-5 relative">
                                                        <div className="w-3 h-3.5 left-[3.21px] top-[3.33px] absolute bg-stone-800" />
                                                        <div className="w-3 h-3.5 left-[3.21px] top-[3.33px] absolute bg-stone-800" />
                                                        <div className="w-5 h-5 left-0 top-0 absolute">
                                                            <div className="w-5 h-5 left-0 top-0 absolute bg-fffffff" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="self-stretch p-2.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-black/10 flex flex-col justify-center items-start gap-3">
                                            <div className="self-stretch inline-flex justify-start items-center gap-2">
                                                <div className="flex-1 h-6 px-4 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-violet-600 flex justify-center items-center gap-2">
                                                    <div className="text-center justify-center text-violet-600 text-xs font-medium font-['Poppins'] leading-none">Group Delete</div>
                                                </div>
                                                <div className="flex-1 h-6 px-3 py-2 opacity-50 rounded-lg outline outline-1 outline-offset-[-1px] outline-violet-600 flex justify-center items-center gap-2">
                                                    <div className="text-center justify-center text-violet-600 text-xs font-medium font-['Poppins'] leading-none">Merge</div>
                                                </div>
                                            </div>
                                            <div className="self-stretch flex flex-col justify-start items-start">
                                                <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-between items-center">
                                                    <div className="flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 p-1 rounded shadow-[0px_1px_4px_0px_rgba(101,62,255,1.00)] outline outline-1 outline-offset-[-1px] outline-violet-600 flex justify-center items-center gap-2.5">
                                                            <div className="w-2.5 h-2.5 relative">
                                                                <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                                <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                                <div className="w-2.5 h-2.5 left-0 top-0 absolute">
                                                                    <div className="w-2.5 h-2.5 left-0 top-0 absolute bg-white" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="justify-start text-black text-base font-normal font-['Poppins'] leading-tight">1. Farid</div>
                                                    </div>
                                                    <div className="flex justify-start items-center gap-1.5">
                                                        <div className="w-7 h-7 p-2.5 rounded outline outline-1 outline-offset-[-1px] outline-black/10 flex justify-center items-center gap-2.5">
                                                            <div className="w-5 h-5 relative">
                                                                <div className="w-5 h-5 left-0 top-0 absolute">
                                                                    <div className="w-5 h-5 left-0 top-0 absolute bg-black/20" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="w-7 h-7 p-2.5 rounded outline outline-1 outline-offset-[-1px] outline-black/10 flex justify-center items-center gap-2.5">
                                                            <div className="w-5 h-5 relative">
                                                                <div className="w-5 h-5 left-0 top-0 absolute">
                                                                    <div className="w-5 h-5 left-0 top-0 absolute bg-black/20" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                    <div className="w-4 h-4 p-1 bg-violet-600 rounded flex justify-center items-center gap-2.5">
                                                        <div className="w-2.5 h-2.5 relative">
                                                            <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                            <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                            <div className="w-2.5 h-2.5 left-0 top-0 absolute">
                                                                <div className="w-2.5 h-2.5 left-0 top-0 absolute bg-white" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="justify-start text-black text-base font-normal font-['Poppins'] leading-tight">2. Rakesh</div>
                                                </div>
                                                <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                    <div className="w-4 h-4 rounded border border-neutral-400" />
                                                    <div className="justify-start text-black text-base font-normal font-['Poppins'] leading-tight">3. Saurabh</div>
                                                </div>
                                                <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                    <div className="w-4 h-4 rounded border border-neutral-400" />
                                                    <div className="justify-start text-black text-base font-normal font-['Poppins'] leading-tight">4. Mohit</div>
                                                </div>
                                                <div className="self-stretch h-10 p-2.5 inline-flex justify-start items-center gap-2">
                                                    <div className="w-4 h-4 rounded border border-neutral-400" />
                                                    <div className="justify-start text-black text-base font-normal font-['Poppins'] leading-tight">5. Surya</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1 self-stretch inline-flex flex-col justify-start items-start gap-4">
                                        <div className="self-stretch p-2.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-slate-500 flex flex-col justify-start items-start gap-2.5">
                                            <div className="self-stretch inline-flex justify-between items-center">
                                                <div className="flex justify-start items-center gap-1">
                                                    <div className="w-6 h-6 p-2 bg-slate-500 rounded-[50px] flex justify-center items-center gap-2">
                                                        <div className="w-4 h-4 relative overflow-hidden">
                                                            <div className="w-3 h-3.5 left-[1.65px] top-[1.18px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-white" />
                                                        </div>
                                                    </div>
                                                    <div className="justify-start text-slate-500 text-sm font-medium font-['Poppins'] leading-none">EXTRAS (1)</div>
                                                </div>
                                                <div className="w-6 h-6 p-2.5 bg-slate-500 rounded-md outline outline-1 outline-offset-[-1px] outline-slate-500 flex justify-center items-center gap-2.5">
                                                    <div className="w-5 h-5 relative">
                                                        <div className="w-3 h-3.5 left-[3.21px] top-[3.33px] absolute bg-stone-800" />
                                                        <div className="w-3 h-3.5 left-[3.21px] top-[3.33px] absolute bg-stone-800" />
                                                        <div className="w-5 h-5 left-0 top-0 absolute">
                                                            <div className="w-5 h-5 left-0 top-0 absolute bg-fffffff" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="self-stretch flex-1 p-2.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-black/10 flex flex-col justify-start items-center gap-3">
                                            <div className="self-stretch inline-flex justify-start items-center gap-2">
                                                <div className="flex-1 h-6 px-4 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-violet-600 flex justify-center items-center gap-2">
                                                    <div className="text-center justify-center text-violet-600 text-xs font-medium font-['Poppins'] leading-none">Group Delete</div>
                                                </div>
                                                <div className="flex-1 h-6 px-3 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-violet-600 flex justify-center items-center gap-2">
                                                    <div className="text-center justify-center text-violet-600 text-xs font-medium font-['Poppins'] leading-none">Merge</div>
                                                </div>
                                            </div>
                                            <div className="self-stretch flex flex-col justify-start items-start">
                                                <div className="self-stretch flex flex-col justify-start items-start">
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 p-1 bg-violet-600 rounded flex justify-center items-center gap-2.5">
                                                            <div className="w-2.5 h-2.5 relative">
                                                                <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                                <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                                <div className="w-2.5 h-2.5 left-0 top-0 absolute">
                                                                    <div className="w-2.5 h-2.5 left-0 top-0 absolute bg-white" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">People</div>
                                                    </div>
                                                </div>
                                                <div className="self-stretch flex flex-col justify-start items-start">
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 p-1 bg-violet-600 rounded flex justify-center items-center gap-2.5">
                                                            <div className="w-2.5 h-2.5 relative">
                                                                <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                                <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                                <div className="w-2.5 h-2.5 left-0 top-0 absolute">
                                                                    <div className="w-2.5 h-2.5 left-0 top-0 absolute bg-white" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Furnitures</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1 inline-flex flex-col justify-start items-start gap-4">
                                        <div className="self-stretch p-2.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-red-500 flex flex-col justify-start items-start gap-2.5">
                                            <div className="self-stretch inline-flex justify-between items-center">
                                                <div className="flex justify-start items-center gap-1">
                                                    <div className="w-6 h-6 p-2 bg-red-500 rounded-[50px] flex justify-center items-center gap-2">
                                                        <div className="w-4 h-4 relative overflow-hidden">
                                                            <div className="w-3 h-3.5 left-[1.65px] top-[1.18px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-white" />
                                                        </div>
                                                    </div>
                                                    <div className="justify-start text-red-500 text-sm font-medium font-['Poppins'] leading-none">PROPS (13)</div>
                                                </div>
                                                <div className="w-6 h-6 p-2.5 bg-red-500 rounded-md outline outline-1 outline-offset-[-1px] outline-red-500 flex justify-center items-center gap-2.5">
                                                    <div className="w-5 h-5 relative">
                                                        <div className="w-3 h-3.5 left-[3.21px] top-[3.33px] absolute bg-stone-800" />
                                                        <div className="w-3 h-3.5 left-[3.21px] top-[3.33px] absolute bg-stone-800" />
                                                        <div className="w-5 h-5 left-0 top-0 absolute">
                                                            <div className="w-5 h-5 left-0 top-0 absolute bg-fffffff" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="self-stretch h-64 p-2.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-black/10 flex flex-col justify-start items-center gap-3">
                                            <div className="self-stretch inline-flex justify-start items-center gap-2">
                                                <div className="flex-1 h-6 px-4 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-violet-600 flex justify-center items-center gap-2">
                                                    <div className="text-center justify-center text-violet-600 text-xs font-medium font-['Poppins'] leading-none">Group Delete</div>
                                                </div>
                                                <div className="flex-1 h-6 px-3 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-violet-600 flex justify-center items-center gap-2">
                                                    <div className="text-center justify-center text-violet-600 text-xs font-medium font-['Poppins'] leading-none">Merge</div>
                                                </div>
                                            </div>
                                            <div className="self-stretch flex flex-col justify-start items-start">
                                                <div className="self-stretch flex flex-col justify-start items-start">
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 p-1 bg-violet-600 rounded flex justify-center items-center gap-2.5">
                                                            <div className="w-2.5 h-2.5 relative">
                                                                <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                                <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                                <div className="w-2.5 h-2.5 left-0 top-0 absolute">
                                                                    <div className="w-2.5 h-2.5 left-0 top-0 absolute bg-white" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Books</div>
                                                    </div>
                                                </div>
                                                <div className="self-stretch flex flex-col justify-start items-start">
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 p-1 bg-violet-600 rounded flex justify-center items-center gap-2.5">
                                                            <div className="w-2.5 h-2.5 relative">
                                                                <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                                <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                                <div className="w-2.5 h-2.5 left-0 top-0 absolute">
                                                                    <div className="w-2.5 h-2.5 left-0 top-0 absolute bg-white" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Chocolates</div>
                                                    </div>
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 rounded border border-neutral-400" />
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Magazines</div>
                                                    </div>
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 rounded border border-neutral-400" />
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Old suitcase</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="self-stretch flex flex-col justify-start items-start gap-6">
                                <div className="self-stretch inline-flex justify-start items-center gap-6">
                                    <div className="flex-1 inline-flex flex-col justify-start items-start gap-4">
                                        <div className="self-stretch p-2.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-amber-700 flex flex-col justify-start items-start gap-2.5">
                                            <div className="self-stretch inline-flex justify-between items-center">
                                                <div className="flex justify-start items-center gap-1">
                                                    <div className="w-6 h-6 p-2 bg-amber-700 rounded-[50px] flex justify-center items-center gap-2">
                                                        <div className="w-4 h-4 relative overflow-hidden">
                                                            <div className="w-3 h-3.5 left-[1.65px] top-[1.18px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-white" />
                                                        </div>
                                                    </div>
                                                    <div className="justify-start text-amber-700 text-sm font-medium font-['Poppins'] leading-none">LOCATIONS (5)</div>
                                                </div>
                                                <div className="w-6 h-6 p-2.5 bg-amber-700 rounded-md outline outline-1 outline-offset-[-1px] outline-amber-700 flex justify-center items-center gap-2.5">
                                                    <div className="w-5 h-5 relative">
                                                        <div className="w-3 h-3.5 left-[3.21px] top-[3.33px] absolute bg-stone-800" />
                                                        <div className="w-3 h-3.5 left-[3.21px] top-[3.33px] absolute bg-stone-800" />
                                                        <div className="w-5 h-5 left-0 top-0 absolute">
                                                            <div className="w-5 h-5 left-0 top-0 absolute bg-fffffff" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="self-stretch h-64 p-2.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-black/10 flex flex-col justify-start items-center gap-3">
                                            <div className="self-stretch inline-flex justify-start items-center gap-2">
                                                <div className="flex-1 h-6 px-4 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-violet-600 flex justify-center items-center gap-2">
                                                    <div className="text-center justify-center text-violet-600 text-xs font-medium font-['Poppins'] leading-none">Group Delete</div>
                                                </div>
                                                <div className="flex-1 h-6 px-3 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-violet-600 flex justify-center items-center gap-2">
                                                    <div className="text-center justify-center text-violet-600 text-xs font-medium font-['Poppins'] leading-none">Merge</div>
                                                </div>
                                            </div>
                                            <div className="self-stretch flex flex-col justify-start items-start">
                                                <div className="self-stretch flex flex-col justify-start items-start">
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 p-1 bg-violet-600 rounded flex justify-center items-center gap-2.5">
                                                            <div className="w-2.5 h-2.5 relative">
                                                                <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                                <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                                <div className="w-2.5 h-2.5 left-0 top-0 absolute">
                                                                    <div className="w-2.5 h-2.5 left-0 top-0 absolute bg-white" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">City</div>
                                                    </div>
                                                </div>
                                                <div className="self-stretch flex flex-col justify-start items-start">
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 p-1 bg-violet-600 rounded flex justify-center items-center gap-2.5">
                                                            <div className="w-2.5 h-2.5 relative">
                                                                <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                                <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                                <div className="w-2.5 h-2.5 left-0 top-0 absolute">
                                                                    <div className="w-2.5 h-2.5 left-0 top-0 absolute bg-white" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Forest</div>
                                                    </div>
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 rounded border border-neutral-400" />
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Streets</div>
                                                    </div>
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 rounded border border-neutral-400" />
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Hotels</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1 inline-flex flex-col justify-start items-start gap-4">
                                        <div className="self-stretch p-2.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-emerald-400 flex flex-col justify-start items-start gap-2.5">
                                            <div className="self-stretch inline-flex justify-between items-center">
                                                <div className="flex justify-start items-center gap-1">
                                                    <div className="w-6 h-6 p-2 bg-emerald-400 rounded-[50px] flex justify-center items-center gap-2">
                                                        <div className="w-4 h-4 relative overflow-hidden">
                                                            <div className="w-3 h-3.5 left-[1.65px] top-[1.18px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-white" />
                                                        </div>
                                                    </div>
                                                    <div className="justify-start text-emerald-400 text-sm font-medium font-['Poppins'] leading-none">SOUND (1)</div>
                                                </div>
                                                <div className="w-6 h-6 p-2.5 bg-emerald-400 rounded-md outline outline-1 outline-offset-[-1px] outline-emerald-400 flex justify-center items-center gap-2.5">
                                                    <div className="w-5 h-5 relative">
                                                        <div className="w-3 h-3.5 left-[3.21px] top-[3.33px] absolute bg-stone-800" />
                                                        <div className="w-3 h-3.5 left-[3.21px] top-[3.33px] absolute bg-stone-800" />
                                                        <div className="w-5 h-5 left-0 top-0 absolute">
                                                            <div className="w-5 h-5 left-0 top-0 absolute bg-fffffff" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="self-stretch h-64 p-2.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-black/10 flex flex-col justify-between items-center">
                                            <div className="self-stretch opacity-50 inline-flex justify-start items-center gap-2">
                                                <div className="flex-1 h-6 px-4 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-violet-600 flex justify-center items-center gap-2">
                                                    <div className="text-center justify-center text-violet-600 text-xs font-medium font-['Poppins'] leading-none">Group Delete</div>
                                                </div>
                                                <div className="flex-1 h-6 px-3 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-violet-600 flex justify-center items-center gap-2">
                                                    <div className="text-center justify-center text-violet-600 text-xs font-medium font-['Poppins'] leading-none">Merge</div>
                                                </div>
                                            </div>
                                            <div className="self-stretch flex flex-col justify-start items-start">
                                                <div className="self-stretch flex flex-col justify-start items-start">
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 rounded border border-neutral-400" />
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Sound of Train</div>
                                                    </div>
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 rounded border border-neutral-400" />
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Buzzer</div>
                                                    </div>
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 rounded border border-neutral-400" />
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Air horn</div>
                                                    </div>
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 rounded border border-neutral-400" />
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Gun Firing sound</div>
                                                    </div>
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 rounded border border-neutral-400" />
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Music instrument</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1 inline-flex flex-col justify-start items-start gap-4">
                                        <div className="self-stretch p-2.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-pink-600 flex flex-col justify-start items-start gap-2.5">
                                            <div className="self-stretch inline-flex justify-between items-center">
                                                <div className="flex justify-start items-center gap-1">
                                                    <div className="w-6 h-6 p-2 bg-pink-600 rounded-[50px] flex justify-center items-center gap-2">
                                                        <div className="w-4 h-4 relative overflow-hidden">
                                                            <div className="w-3 h-3.5 left-[1.65px] top-[1.18px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-white" />
                                                        </div>
                                                    </div>
                                                    <div className="justify-start text-pink-600 text-sm font-medium font-['Poppins'] leading-none">COSTUMES (5)</div>
                                                </div>
                                                <div className="w-6 h-6 p-2.5 bg-pink-600 rounded-md outline outline-1 outline-offset-[-1px] outline-pink-600 flex justify-center items-center gap-2.5">
                                                    <div className="w-5 h-5 relative">
                                                        <div className="w-3 h-3.5 left-[3.21px] top-[3.33px] absolute bg-stone-800" />
                                                        <div className="w-3 h-3.5 left-[3.21px] top-[3.33px] absolute bg-stone-800" />
                                                        <div className="w-5 h-5 left-0 top-0 absolute">
                                                            <div className="w-5 h-5 left-0 top-0 absolute bg-fffffff" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="self-stretch h-64 p-2.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-black/10 flex flex-col justify-start items-center gap-3">
                                            <div className="self-stretch inline-flex justify-start items-center gap-2">
                                                <div className="flex-1 h-6 px-4 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-violet-600 flex justify-center items-center gap-2">
                                                    <div className="text-center justify-center text-violet-600 text-xs font-medium font-['Poppins'] leading-none">Group Delete</div>
                                                </div>
                                                <div className="flex-1 h-6 px-3 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-violet-600 flex justify-center items-center gap-2">
                                                    <div className="text-center justify-center text-violet-600 text-xs font-medium font-['Poppins'] leading-none">Merge</div>
                                                </div>
                                            </div>
                                            <div className="self-stretch flex flex-col justify-start items-start">
                                                <div className="self-stretch flex flex-col justify-start items-start">
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 p-1 bg-violet-600 rounded flex justify-center items-center gap-2.5">
                                                            <div className="w-2.5 h-2.5 relative">
                                                                <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                                <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                                <div className="w-2.5 h-2.5 left-0 top-0 absolute">
                                                                    <div className="w-2.5 h-2.5 left-0 top-0 absolute bg-white" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Clothes</div>
                                                    </div>
                                                </div>
                                                <div className="self-stretch flex flex-col justify-start items-start">
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 p-1 bg-violet-600 rounded flex justify-center items-center gap-2.5">
                                                            <div className="w-2.5 h-2.5 relative">
                                                                <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                                <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                                <div className="w-2.5 h-2.5 left-0 top-0 absolute">
                                                                    <div className="w-2.5 h-2.5 left-0 top-0 absolute bg-white" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Shoes</div>
                                                    </div>
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 rounded border border-neutral-400" />
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">T-Shirts</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="self-stretch flex flex-col justify-start items-start gap-6">
                                <div className="self-stretch inline-flex justify-start items-center gap-6">
                                    <div className="w-56 inline-flex flex-col justify-start items-start gap-4">
                                        <div className="self-stretch p-2.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-red-500 flex flex-col justify-start items-start gap-2.5">
                                            <div className="self-stretch inline-flex justify-between items-center">
                                                <div className="flex justify-start items-center gap-1">
                                                    <div className="w-6 h-6 p-2 bg-red-500 rounded-[50px] flex justify-center items-center gap-2">
                                                        <div className="w-4 h-4 relative overflow-hidden">
                                                            <div className="w-3 h-3.5 left-[1.65px] top-[1.18px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-white" />
                                                        </div>
                                                    </div>
                                                    <div className="justify-start text-red-500 text-sm font-medium font-['Poppins'] leading-none">VEHICLES. (5)</div>
                                                </div>
                                                <div className="w-6 h-6 p-2.5 bg-red-500 rounded-md outline outline-1 outline-offset-[-1px] outline-red-500 flex justify-center items-center gap-2.5">
                                                    <div className="w-5 h-5 relative">
                                                        <div className="w-3 h-3.5 left-[3.21px] top-[3.33px] absolute bg-stone-800" />
                                                        <div className="w-3 h-3.5 left-[3.21px] top-[3.33px] absolute bg-stone-800" />
                                                        <div className="w-5 h-5 left-0 top-0 absolute">
                                                            <div className="w-5 h-5 left-0 top-0 absolute bg-fffffff" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="self-stretch h-64 p-2.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-black/10 flex flex-col justify-start items-center gap-3">
                                            <div className="self-stretch inline-flex justify-start items-center gap-2">
                                                <div className="flex-1 h-6 px-4 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-violet-600 flex justify-center items-center gap-2">
                                                    <div className="text-center justify-center text-violet-600 text-xs font-medium font-['Poppins'] leading-none">Group Delete</div>
                                                </div>
                                                <div className="flex-1 h-6 px-3 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-violet-600 flex justify-center items-center gap-2">
                                                    <div className="text-center justify-center text-violet-600 text-xs font-medium font-['Poppins'] leading-none">Merge</div>
                                                </div>
                                            </div>
                                            <div className="self-stretch flex flex-col justify-start items-start">
                                                <div className="self-stretch flex flex-col justify-start items-start">
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 p-1 bg-violet-600 rounded flex justify-center items-center gap-2.5">
                                                            <div className="w-2.5 h-2.5 relative">
                                                                <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                                <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                                <div className="w-2.5 h-2.5 left-0 top-0 absolute">
                                                                    <div className="w-2.5 h-2.5 left-0 top-0 absolute bg-white" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Cars</div>
                                                    </div>
                                                </div>
                                                <div className="self-stretch flex flex-col justify-start items-start">
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 p-1 bg-violet-600 rounded flex justify-center items-center gap-2.5">
                                                            <div className="w-2.5 h-2.5 relative">
                                                                <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                                <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                                <div className="w-2.5 h-2.5 left-0 top-0 absolute">
                                                                    <div className="w-2.5 h-2.5 left-0 top-0 absolute bg-white" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Motorcycle</div>
                                                    </div>
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 rounded border border-neutral-400" />
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Bus</div>
                                                    </div>
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 rounded border border-neutral-400" />
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Stopped Cars</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-56 inline-flex flex-col justify-start items-start gap-4">
                                        <div className="self-stretch p-2.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-cyan-800 flex flex-col justify-start items-start gap-2.5">
                                            <div className="self-stretch inline-flex justify-between items-center">
                                                <div className="flex justify-start items-center gap-1">
                                                    <div className="w-6 h-6 p-2 bg-cyan-800 rounded-[50px] flex justify-center items-center gap-2">
                                                        <div className="w-4 h-4 relative overflow-hidden">
                                                            <div className="w-3 h-3.5 left-[1.65px] top-[1.18px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-white" />
                                                        </div>
                                                    </div>
                                                    <div className="justify-start text-cyan-800 text-sm font-medium font-['Poppins'] leading-none">NUDITY (1)</div>
                                                </div>
                                                <div className="w-6 h-6 p-2.5 bg-cyan-800 rounded-md outline outline-1 outline-offset-[-1px] outline-cyan-800 flex justify-center items-center gap-2.5">
                                                    <div className="w-5 h-5 relative">
                                                        <div className="w-3 h-3.5 left-[3.21px] top-[3.33px] absolute bg-stone-800" />
                                                        <div className="w-3 h-3.5 left-[3.21px] top-[3.33px] absolute bg-stone-800" />
                                                        <div className="w-5 h-5 left-0 top-0 absolute">
                                                            <div className="w-5 h-5 left-0 top-0 absolute bg-fffffff" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="self-stretch h-64 p-2.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-black/10 flex flex-col justify-start items-center gap-3">
                                            <div className="self-stretch inline-flex justify-start items-center gap-2">
                                                <div className="flex-1 h-6 px-4 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-violet-600 flex justify-center items-center gap-2">
                                                    <div className="text-center justify-center text-violet-600 text-xs font-medium font-['Poppins'] leading-none">Group Delete</div>
                                                </div>
                                                <div className="flex-1 h-6 px-3 py-2 opacity-50 rounded-lg outline outline-1 outline-offset-[-1px] outline-violet-600 flex justify-center items-center gap-2">
                                                    <div className="text-center justify-center text-violet-600 text-xs font-medium font-['Poppins'] leading-none">Merge</div>
                                                </div>
                                            </div>
                                            <div className="self-stretch flex flex-col justify-start items-start">
                                                <div className="self-stretch flex flex-col justify-start items-start">
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 p-1 bg-violet-600 rounded flex justify-center items-center gap-2.5">
                                                            <div className="w-2.5 h-2.5 relative">
                                                                <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                                <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                                <div className="w-2.5 h-2.5 left-0 top-0 absolute">
                                                                    <div className="w-2.5 h-2.5 left-0 top-0 absolute bg-white" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Man</div>
                                                    </div>
                                                </div>
                                                <div className="self-stretch flex flex-col justify-start items-start">
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 rounded border border-neutral-400" />
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Women</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch flex flex-col justify-start items-start gap-8">
                        <div className="inline-flex justify-start items-start gap-3">
                            <div className="w-8 h-8 p-2.5 bg-zinc-600 rounded-lg inline-flex flex-col justify-center items-center gap-2.5">
                                <div className="justify-start text-white text-base font-medium font-['Poppins'] leading-tight">2</div>
                            </div>
                            <div className="w-96 inline-flex flex-col justify-start items-start gap-3">
                                <div className="self-stretch justify-start text-gray-800 text-base font-medium font-['Poppins'] leading-tight">INT.MAHESH’S HOUSE - Day</div>
                                <div className="self-stretch justify-start text-zinc-500 text-sm font-medium font-['Poppins'] leading-none">Pages: 4</div>
                                <div className="self-stretch justify-start text-zinc-500 text-sm font-medium font-['Poppins'] leading-none">A feature floats through the air. The falling feather.</div>
                            </div>
                        </div>
                        <div className="self-stretch flex flex-col justify-start items-start gap-8">
                            <div className="self-stretch flex flex-col justify-start items-start gap-6">
                                <div className="self-stretch inline-flex justify-center items-start gap-6">
                                    <div className="flex-1 inline-flex flex-col justify-start items-start gap-4">
                                        <div className="self-stretch p-2.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-blue-400 flex flex-col justify-start items-start gap-2.5">
                                            <div className="self-stretch inline-flex justify-between items-center">
                                                <div className="flex justify-start items-center gap-1">
                                                    <div className="w-6 h-6 p-2 bg-blue-400 rounded-[50px] flex justify-center items-center gap-2">
                                                        <div className="w-4 h-4 relative overflow-hidden">
                                                            <div className="w-3 h-3.5 left-[1.65px] top-[1.18px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-white" />
                                                        </div>
                                                    </div>
                                                    <div className="justify-start text-blue-400 text-sm font-medium font-['Poppins'] leading-none">CHARACTERS (5)</div>
                                                </div>
                                                <div className="w-6 h-6 p-2.5 bg-blue-400 rounded-md outline outline-1 outline-offset-[-1px] outline-blue-400 flex justify-center items-center gap-2.5">
                                                    <div className="w-5 h-5 relative">
                                                        <div className="w-3 h-3.5 left-[3.21px] top-[3.33px] absolute bg-stone-800" />
                                                        <div className="w-3 h-3.5 left-[3.21px] top-[3.33px] absolute bg-stone-800" />
                                                        <div className="w-5 h-5 left-0 top-0 absolute">
                                                            <div className="w-5 h-5 left-0 top-0 absolute bg-fffffff" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="self-stretch p-2.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-black/10 flex flex-col justify-center items-start gap-3">
                                            <div className="self-stretch opacity-50 inline-flex justify-start items-center gap-2">
                                                <div className="flex-1 h-6 px-4 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-violet-600 flex justify-center items-center gap-2">
                                                    <div className="text-center justify-center text-violet-600 text-xs font-medium font-['Poppins'] leading-none">Group Delete</div>
                                                </div>
                                                <div className="flex-1 h-6 px-3 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-violet-600 flex justify-center items-center gap-2">
                                                    <div className="text-center justify-center text-violet-600 text-xs font-medium font-['Poppins'] leading-none">Merge</div>
                                                </div>
                                            </div>
                                            <div className="self-stretch flex flex-col justify-start items-start">
                                                <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                    <div className="w-4 h-4 rounded border border-neutral-400" />
                                                    <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">1. Farid</div>
                                                </div>
                                                <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                    <div className="w-4 h-4 rounded border border-neutral-400" />
                                                    <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">2. Rakesh</div>
                                                </div>
                                                <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                    <div className="w-4 h-4 rounded border border-neutral-400" />
                                                    <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">3. Saurabh</div>
                                                </div>
                                                <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                    <div className="w-4 h-4 rounded border border-neutral-400" />
                                                    <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">4. Mohit</div>
                                                </div>
                                                <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                    <div className="w-4 h-4 rounded border border-neutral-400" />
                                                    <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">5. Surya</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1 self-stretch inline-flex flex-col justify-start items-start gap-4">
                                        <div className="self-stretch p-2.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-slate-500 flex flex-col justify-start items-start gap-2.5">
                                            <div className="self-stretch inline-flex justify-between items-center">
                                                <div className="flex justify-start items-center gap-1">
                                                    <div className="w-6 h-6 p-2 bg-slate-500 rounded-[50px] flex justify-center items-center gap-2">
                                                        <div className="w-4 h-4 relative overflow-hidden">
                                                            <div className="w-3 h-3.5 left-[1.65px] top-[1.18px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-white" />
                                                        </div>
                                                    </div>
                                                    <div className="justify-start text-slate-500 text-sm font-medium font-['Poppins'] leading-none">EXTRAS (1)</div>
                                                </div>
                                                <div className="w-6 h-6 p-2.5 bg-slate-500 rounded-md outline outline-1 outline-offset-[-1px] outline-slate-500 flex justify-center items-center gap-2.5">
                                                    <div className="w-5 h-5 relative">
                                                        <div className="w-3 h-3.5 left-[3.21px] top-[3.33px] absolute bg-stone-800" />
                                                        <div className="w-3 h-3.5 left-[3.21px] top-[3.33px] absolute bg-stone-800" />
                                                        <div className="w-5 h-5 left-0 top-0 absolute">
                                                            <div className="w-5 h-5 left-0 top-0 absolute bg-fffffff" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="self-stretch flex-1 p-2.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-black/10 flex flex-col justify-start items-center gap-3">
                                            <div className="self-stretch inline-flex justify-start items-center gap-2">
                                                <div className="flex-1 h-6 px-4 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-violet-600 flex justify-center items-center gap-2">
                                                    <div className="text-center justify-center text-violet-600 text-xs font-medium font-['Poppins'] leading-none">Group Delete</div>
                                                </div>
                                                <div className="flex-1 h-6 px-3 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-violet-600 flex justify-center items-center gap-2">
                                                    <div className="text-center justify-center text-violet-600 text-xs font-medium font-['Poppins'] leading-none">Merge</div>
                                                </div>
                                            </div>
                                            <div className="self-stretch flex flex-col justify-start items-start">
                                                <div className="self-stretch flex flex-col justify-start items-start">
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 p-1 bg-violet-600 rounded flex justify-center items-center gap-2.5">
                                                            <div className="w-2.5 h-2.5 relative">
                                                                <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                                <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                                <div className="w-2.5 h-2.5 left-0 top-0 absolute">
                                                                    <div className="w-2.5 h-2.5 left-0 top-0 absolute bg-white" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">People</div>
                                                    </div>
                                                </div>
                                                <div className="self-stretch flex flex-col justify-start items-start">
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 p-1 bg-violet-600 rounded flex justify-center items-center gap-2.5">
                                                            <div className="w-2.5 h-2.5 relative">
                                                                <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                                <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                                <div className="w-2.5 h-2.5 left-0 top-0 absolute">
                                                                    <div className="w-2.5 h-2.5 left-0 top-0 absolute bg-white" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Furnitures</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1 inline-flex flex-col justify-start items-start gap-4">
                                        <div className="self-stretch p-2.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-red-500 flex flex-col justify-start items-start gap-2.5">
                                            <div className="self-stretch inline-flex justify-between items-center">
                                                <div className="flex justify-start items-center gap-1">
                                                    <div className="w-6 h-6 p-2 bg-red-500 rounded-[50px] flex justify-center items-center gap-2">
                                                        <div className="w-4 h-4 relative overflow-hidden">
                                                            <div className="w-3 h-3.5 left-[1.65px] top-[1.18px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-white" />
                                                        </div>
                                                    </div>
                                                    <div className="justify-start text-red-500 text-sm font-medium font-['Poppins'] leading-none">PROPS (13)</div>
                                                </div>
                                                <div className="w-6 h-6 p-2.5 bg-red-500 rounded-md outline outline-1 outline-offset-[-1px] outline-red-500 flex justify-center items-center gap-2.5">
                                                    <div className="w-5 h-5 relative">
                                                        <div className="w-3 h-3.5 left-[3.21px] top-[3.33px] absolute bg-stone-800" />
                                                        <div className="w-3 h-3.5 left-[3.21px] top-[3.33px] absolute bg-stone-800" />
                                                        <div className="w-5 h-5 left-0 top-0 absolute">
                                                            <div className="w-5 h-5 left-0 top-0 absolute bg-fffffff" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="self-stretch h-64 p-2.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-black/10 flex flex-col justify-start items-center gap-3">
                                            <div className="self-stretch inline-flex justify-start items-center gap-2">
                                                <div className="flex-1 h-6 px-4 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-violet-600 flex justify-center items-center gap-2">
                                                    <div className="text-center justify-center text-violet-600 text-xs font-medium font-['Poppins'] leading-none">Group Delete</div>
                                                </div>
                                                <div className="flex-1 h-6 px-3 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-violet-600 flex justify-center items-center gap-2">
                                                    <div className="text-center justify-center text-violet-600 text-xs font-medium font-['Poppins'] leading-none">Merge</div>
                                                </div>
                                            </div>
                                            <div className="self-stretch flex flex-col justify-start items-start">
                                                <div className="self-stretch flex flex-col justify-start items-start">
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 p-1 bg-violet-600 rounded flex justify-center items-center gap-2.5">
                                                            <div className="w-2.5 h-2.5 relative">
                                                                <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                                <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                                <div className="w-2.5 h-2.5 left-0 top-0 absolute">
                                                                    <div className="w-2.5 h-2.5 left-0 top-0 absolute bg-white" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Box</div>
                                                    </div>
                                                </div>
                                                <div className="self-stretch flex flex-col justify-start items-start">
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 p-1 bg-violet-600 rounded flex justify-center items-center gap-2.5">
                                                            <div className="w-2.5 h-2.5 relative">
                                                                <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                                <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                                <div className="w-2.5 h-2.5 left-0 top-0 absolute">
                                                                    <div className="w-2.5 h-2.5 left-0 top-0 absolute bg-white" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Tree </div>
                                                    </div>
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 rounded border border-neutral-400" />
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Cardboard</div>
                                                    </div>
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 rounded border border-neutral-400" />
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Old suitcase</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="self-stretch flex flex-col justify-start items-start gap-6">
                                <div className="self-stretch inline-flex justify-start items-center gap-6">
                                    <div className="w-56 inline-flex flex-col justify-start items-start gap-4">
                                        <div className="self-stretch p-2.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-amber-700 flex flex-col justify-start items-start gap-2.5">
                                            <div className="self-stretch inline-flex justify-between items-center">
                                                <div className="flex justify-start items-center gap-1">
                                                    <div className="w-6 h-6 p-2 bg-amber-700 rounded-[50px] flex justify-center items-center gap-2">
                                                        <div className="w-4 h-4 relative overflow-hidden">
                                                            <div className="w-3 h-3.5 left-[1.65px] top-[1.18px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-white" />
                                                        </div>
                                                    </div>
                                                    <div className="justify-start text-amber-700 text-sm font-medium font-['Poppins'] leading-none">LOCATIONS (5)</div>
                                                </div>
                                                <div className="w-6 h-6 p-2.5 bg-amber-700 rounded-md outline outline-1 outline-offset-[-1px] outline-amber-700 flex justify-center items-center gap-2.5">
                                                    <div className="w-5 h-5 relative">
                                                        <div className="w-3 h-3.5 left-[3.21px] top-[3.33px] absolute bg-stone-800" />
                                                        <div className="w-3 h-3.5 left-[3.21px] top-[3.33px] absolute bg-stone-800" />
                                                        <div className="w-5 h-5 left-0 top-0 absolute">
                                                            <div className="w-5 h-5 left-0 top-0 absolute bg-fffffff" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="self-stretch h-64 p-2.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-black/10 flex flex-col justify-start items-center gap-3">
                                            <div className="self-stretch inline-flex justify-start items-center gap-2">
                                                <div className="flex-1 h-6 px-4 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-violet-600 flex justify-center items-center gap-2">
                                                    <div className="text-center justify-center text-violet-600 text-xs font-medium font-['Poppins'] leading-none">Group Delete</div>
                                                </div>
                                                <div className="flex-1 h-6 px-3 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-violet-600 flex justify-center items-center gap-2">
                                                    <div className="text-center justify-center text-violet-600 text-xs font-medium font-['Poppins'] leading-none">Merge</div>
                                                </div>
                                            </div>
                                            <div className="self-stretch flex flex-col justify-start items-start">
                                                <div className="self-stretch flex flex-col justify-start items-start">
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 p-1 bg-violet-600 rounded flex justify-center items-center gap-2.5">
                                                            <div className="w-2.5 h-2.5 relative">
                                                                <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                                <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                                <div className="w-2.5 h-2.5 left-0 top-0 absolute">
                                                                    <div className="w-2.5 h-2.5 left-0 top-0 absolute bg-white" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Hill Station</div>
                                                    </div>
                                                </div>
                                                <div className="self-stretch flex flex-col justify-start items-start">
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 p-1 bg-violet-600 rounded flex justify-center items-center gap-2.5">
                                                            <div className="w-2.5 h-2.5 relative">
                                                                <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                                <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                                <div className="w-2.5 h-2.5 left-0 top-0 absolute">
                                                                    <div className="w-2.5 h-2.5 left-0 top-0 absolute bg-white" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Forest</div>
                                                    </div>
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 rounded border border-neutral-400" />
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Streets</div>
                                                    </div>
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 rounded border border-neutral-400" />
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Hotels</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-56 inline-flex flex-col justify-start items-start gap-4">
                                        <div className="self-stretch p-2.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-emerald-400 flex flex-col justify-start items-start gap-2.5">
                                            <div className="self-stretch inline-flex justify-between items-center">
                                                <div className="flex justify-start items-center gap-1">
                                                    <div className="w-6 h-6 p-2 bg-emerald-400 rounded-[50px] flex justify-center items-center gap-2">
                                                        <div className="w-4 h-4 relative overflow-hidden">
                                                            <div className="w-3 h-3.5 left-[1.65px] top-[1.18px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-white" />
                                                        </div>
                                                    </div>
                                                    <div className="justify-start text-emerald-400 text-sm font-medium font-['Poppins'] leading-none">SOUND (1)</div>
                                                </div>
                                                <div className="w-6 h-6 p-2.5 bg-emerald-400 rounded-md outline outline-1 outline-offset-[-1px] outline-emerald-400 flex justify-center items-center gap-2.5">
                                                    <div className="w-5 h-5 relative">
                                                        <div className="w-3 h-3.5 left-[3.21px] top-[3.33px] absolute bg-stone-800" />
                                                        <div className="w-3 h-3.5 left-[3.21px] top-[3.33px] absolute bg-stone-800" />
                                                        <div className="w-5 h-5 left-0 top-0 absolute">
                                                            <div className="w-5 h-5 left-0 top-0 absolute bg-fffffff" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="self-stretch h-64 p-2.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-black/10 flex flex-col justify-start items-center gap-3">
                                            <div className="self-stretch opacity-50 inline-flex justify-start items-center gap-2">
                                                <div className="flex-1 h-6 px-4 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-violet-600 flex justify-center items-center gap-2">
                                                    <div className="text-center justify-center text-violet-600 text-xs font-medium font-['Poppins'] leading-none">Group Delete</div>
                                                </div>
                                                <div className="flex-1 h-6 px-3 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-violet-600 flex justify-center items-center gap-2">
                                                    <div className="text-center justify-center text-violet-600 text-xs font-medium font-['Poppins'] leading-none">Merge</div>
                                                </div>
                                            </div>
                                            <div className="self-stretch flex flex-col justify-start items-start">
                                                <div className="self-stretch flex flex-col justify-start items-start">
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 rounded border border-neutral-400" />
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Sound of Train</div>
                                                    </div>
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 rounded border border-neutral-400" />
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Buzzer</div>
                                                    </div>
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 rounded border border-neutral-400" />
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Air horn</div>
                                                    </div>
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 rounded border border-neutral-400" />
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Gun Firing sound</div>
                                                    </div>
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 rounded border border-neutral-400" />
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Music instrument</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch flex flex-col justify-start items-start gap-8">
                        <div className="inline-flex justify-start items-start gap-3">
                            <div className="w-8 h-8 p-2.5 bg-zinc-600 rounded-lg inline-flex flex-col justify-center items-center gap-2.5">
                                <div className="justify-start text-white text-base font-medium font-['Poppins'] leading-tight">3</div>
                            </div>
                            <div className="w-96 inline-flex flex-col justify-start items-start gap-3">
                                <div className="self-stretch justify-start text-gray-800 text-base font-medium font-['Poppins'] leading-tight">EXT. UNDER A TREE - Day</div>
                                <div className="self-stretch justify-start text-zinc-500 text-sm font-medium font-['Poppins'] leading-none">Pages: 4</div>
                                <div className="self-stretch justify-start text-zinc-500 text-sm font-medium font-['Poppins'] leading-none">A feature floats through the air. The falling feather.</div>
                            </div>
                        </div>
                        <div className="self-stretch flex flex-col justify-start items-start gap-8">
                            <div className="self-stretch flex flex-col justify-start items-start gap-6">
                                <div className="self-stretch inline-flex justify-center items-start gap-6">
                                    <div className="flex-1 inline-flex flex-col justify-start items-start gap-4">
                                        <div className="self-stretch p-2.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-blue-400 flex flex-col justify-start items-start gap-2.5">
                                            <div className="self-stretch inline-flex justify-between items-center">
                                                <div className="flex justify-start items-center gap-1">
                                                    <div className="w-6 h-6 p-2 bg-blue-400 rounded-[50px] flex justify-center items-center gap-2">
                                                        <div className="w-4 h-4 relative overflow-hidden">
                                                            <div className="w-3 h-3.5 left-[1.65px] top-[1.18px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-white" />
                                                        </div>
                                                    </div>
                                                    <div className="justify-start text-blue-400 text-sm font-medium font-['Poppins'] leading-none">CHARACTERS (5)</div>
                                                </div>
                                                <div className="w-6 h-6 p-2.5 bg-blue-400 rounded-md outline outline-1 outline-offset-[-1px] outline-blue-400 flex justify-center items-center gap-2.5">
                                                    <div className="w-5 h-5 relative">
                                                        <div className="w-3 h-3.5 left-[3.21px] top-[3.33px] absolute bg-stone-800" />
                                                        <div className="w-3 h-3.5 left-[3.21px] top-[3.33px] absolute bg-stone-800" />
                                                        <div className="w-5 h-5 left-0 top-0 absolute">
                                                            <div className="w-5 h-5 left-0 top-0 absolute bg-fffffff" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="self-stretch p-2.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-black/10 flex flex-col justify-center items-start gap-3">
                                            <div className="self-stretch opacity-50 inline-flex justify-start items-center gap-2">
                                                <div className="flex-1 h-6 px-4 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-violet-600 flex justify-center items-center gap-2">
                                                    <div className="text-center justify-center text-violet-600 text-xs font-medium font-['Poppins'] leading-none">Group Delete</div>
                                                </div>
                                                <div className="flex-1 h-6 px-3 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-violet-600 flex justify-center items-center gap-2">
                                                    <div className="text-center justify-center text-violet-600 text-xs font-medium font-['Poppins'] leading-none">Merge</div>
                                                </div>
                                            </div>
                                            <div className="self-stretch flex flex-col justify-start items-start">
                                                <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                    <div className="w-4 h-4 rounded border border-neutral-400" />
                                                    <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">1. Farid</div>
                                                </div>
                                                <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                    <div className="w-4 h-4 rounded border border-neutral-400" />
                                                    <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">2. Rakesh</div>
                                                </div>
                                                <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                    <div className="w-4 h-4 rounded border border-neutral-400" />
                                                    <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">3. Saurabh</div>
                                                </div>
                                                <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                    <div className="w-4 h-4 rounded border border-neutral-400" />
                                                    <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">4. Mohit</div>
                                                </div>
                                                <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                    <div className="w-4 h-4 rounded border border-neutral-400" />
                                                    <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">5. Surya</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1 self-stretch inline-flex flex-col justify-start items-start gap-4">
                                        <div className="self-stretch p-2.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-slate-500 flex flex-col justify-start items-start gap-2.5">
                                            <div className="self-stretch inline-flex justify-between items-center">
                                                <div className="flex justify-start items-center gap-1">
                                                    <div className="w-6 h-6 p-2 bg-slate-500 rounded-[50px] flex justify-center items-center gap-2">
                                                        <div className="w-4 h-4 relative overflow-hidden">
                                                            <div className="w-3 h-3.5 left-[1.65px] top-[1.18px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-white" />
                                                        </div>
                                                    </div>
                                                    <div className="justify-start text-slate-500 text-sm font-medium font-['Poppins'] leading-none">EXTRAS (1)</div>
                                                </div>
                                                <div className="w-6 h-6 p-2.5 bg-slate-500 rounded-md outline outline-1 outline-offset-[-1px] outline-slate-500 flex justify-center items-center gap-2.5">
                                                    <div className="w-5 h-5 relative">
                                                        <div className="w-3 h-3.5 left-[3.21px] top-[3.33px] absolute bg-stone-800" />
                                                        <div className="w-3 h-3.5 left-[3.21px] top-[3.33px] absolute bg-stone-800" />
                                                        <div className="w-5 h-5 left-0 top-0 absolute">
                                                            <div className="w-5 h-5 left-0 top-0 absolute bg-fffffff" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="self-stretch flex-1 p-2.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-black/10 flex flex-col justify-start items-center gap-3">
                                            <div className="self-stretch inline-flex justify-start items-center gap-2">
                                                <div className="flex-1 h-6 px-4 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-violet-600 flex justify-center items-center gap-2">
                                                    <div className="text-center justify-center text-violet-600 text-xs font-medium font-['Poppins'] leading-none">Group Delete</div>
                                                </div>
                                                <div className="flex-1 h-6 px-3 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-violet-600 flex justify-center items-center gap-2">
                                                    <div className="text-center justify-center text-violet-600 text-xs font-medium font-['Poppins'] leading-none">Merge</div>
                                                </div>
                                            </div>
                                            <div className="self-stretch flex flex-col justify-start items-start">
                                                <div className="self-stretch flex flex-col justify-start items-start">
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 p-1 bg-violet-600 rounded flex justify-center items-center gap-2.5">
                                                            <div className="w-2.5 h-2.5 relative">
                                                                <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                                <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                                <div className="w-2.5 h-2.5 left-0 top-0 absolute">
                                                                    <div className="w-2.5 h-2.5 left-0 top-0 absolute bg-white" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">People</div>
                                                    </div>
                                                </div>
                                                <div className="self-stretch flex flex-col justify-start items-start">
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 p-1 bg-violet-600 rounded flex justify-center items-center gap-2.5">
                                                            <div className="w-2.5 h-2.5 relative">
                                                                <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                                <div className="w-1.5 h-[5px] left-[1.60px] top-[2.50px] absolute bg-stone-800" />
                                                                <div className="w-2.5 h-2.5 left-0 top-0 absolute">
                                                                    <div className="w-2.5 h-2.5 left-0 top-0 absolute bg-white" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Furnitures</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-56 inline-flex flex-col justify-start items-start gap-4">
                                        <div className="self-stretch p-2.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-emerald-400 flex flex-col justify-start items-start gap-2.5">
                                            <div className="self-stretch inline-flex justify-between items-center">
                                                <div className="flex justify-start items-center gap-1">
                                                    <div className="w-6 h-6 p-2 bg-emerald-400 rounded-[50px] flex justify-center items-center gap-2">
                                                        <div className="w-4 h-4 relative overflow-hidden">
                                                            <div className="w-3 h-3.5 left-[1.65px] top-[1.18px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-white" />
                                                        </div>
                                                    </div>
                                                    <div className="justify-start text-emerald-400 text-sm font-medium font-['Poppins'] leading-none">SOUND (1)</div>
                                                </div>
                                                <div className="w-6 h-6 p-2.5 bg-emerald-400 rounded-md outline outline-1 outline-offset-[-1px] outline-emerald-400 flex justify-center items-center gap-2.5">
                                                    <div className="w-5 h-5 relative">
                                                        <div className="w-3 h-3.5 left-[3.21px] top-[3.33px] absolute bg-stone-800" />
                                                        <div className="w-3 h-3.5 left-[3.21px] top-[3.33px] absolute bg-stone-800" />
                                                        <div className="w-5 h-5 left-0 top-0 absolute">
                                                            <div className="w-5 h-5 left-0 top-0 absolute bg-fffffff" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="self-stretch h-64 p-2.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-black/10 flex flex-col justify-start items-center gap-3">
                                            <div className="self-stretch opacity-50 inline-flex justify-start items-center gap-2">
                                                <div className="flex-1 h-6 px-4 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-violet-600 flex justify-center items-center gap-2">
                                                    <div className="text-center justify-center text-violet-600 text-xs font-medium font-['Poppins'] leading-none">Group Delete</div>
                                                </div>
                                                <div className="flex-1 h-6 px-3 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-violet-600 flex justify-center items-center gap-2">
                                                    <div className="text-center justify-center text-violet-600 text-xs font-medium font-['Poppins'] leading-none">Merge</div>
                                                </div>
                                            </div>
                                            <div className="self-stretch flex flex-col justify-start items-start">
                                                <div className="self-stretch flex flex-col justify-start items-start">
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 rounded border border-neutral-400" />
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Sound of Train</div>
                                                    </div>
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 rounded border border-neutral-400" />
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Buzzer</div>
                                                    </div>
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 rounded border border-neutral-400" />
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Air horn</div>
                                                    </div>
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 rounded border border-neutral-400" />
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Gun Firing sound</div>
                                                    </div>
                                                    <div className="self-stretch h-10 p-2.5 border-b border-black/10 inline-flex justify-start items-center gap-2">
                                                        <div className="w-4 h-4 rounded border border-neutral-400" />
                                                        <div className="justify-start text-black text-sm font-normal font-['Poppins'] leading-none">Music instrument</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[20%] h-fit p-2.5 flex flex-col gap-4 border  rounded-[20px]">
                <div className="flex flex-col gap-3">
                    <div className="flex justify-start items-start gap-2">
                        <div className="flex flex-col gap-0.5">
                            <div className="text-gray-800 text-sm font-bold font-['Poppins'] leading-none">
                                Notes: Scene10
                            </div>
                        </div>
                    </div>
                    <textarea
                        placeholder="Enter scene notes..."
                        className="w-full h-28 p-2 border  text-xs text-gray-800 font-medium font-['Poppins'] resize-none focus:outline-none"
                    />
                </div>
            </div>

        </div>

    )
}
export default BreakdownSummary