import { Modal } from '@/components/ui/modal';
import React, { useState } from 'react';
import { IoChevronDown, IoCloseSharp } from 'react-icons/io5';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

type SpellCheckProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SpellCheck: React.FC<SpellCheckProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<"Spell Check" | "Options">("Spell Check")

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex justify-center items-start bg-black bg-opacity-40 p-10 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-xl rounded-2xl overflow-hidden shadow-md font-poppins"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-b-[#00000036] px-5 py-5">
          <section className='flex flex-row items-center gap-4'>
            <div className='flex flex-row text-xl gap-x-1'>
              <button className="cursor-pointer hover:bg-black hover:text-white transition-colors py-1 rounded-md">
                <LuChevronLeft />
              </button>
              <button className="cursor-pointer hover:bg-black hover:text-white transition-colors py-1 rounded-md">
                <LuChevronRight />
              </button>
            </div>

            <h2 className="text-xl font-bold text-[#000] flex items-center gap-2">
              <span>Spell Check</span>
              <span className="w-6 h-6 text-[10px] text-white bg-[#E86B84] rounded-full font-normal flex justify-center items-center">999</span>
              <span className="w-6 h-6 text-[10px] text-white bg-[#40BB7B] rounded-full font-normal flex justify-center items-center">0</span>
            </h2>
          </section>
          <button
            onClick={onClose}
            className="hover:bg-black hover:text-white p-1.5 rounded-full transition-colors"
          >
            <IoCloseSharp className="text-lg" />
          </button>
        </div>

        <div className="p-9">
          {/* Tabs */}
          <div className="flex justify-start mb-6">
            <div className="bg-[#E9E9EA] p-[6px] rounded-lg inline-flex">
              {["Spell Check", "Options"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as "Spell Check" | "Options")}
                  className={`${activeTab === tab ? "bg-white text-primary-blue font-medium" : "bg-transparent text-[#6A6A75]"} rounded-lg block py-2.5 px-12`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {activeTab === "Spell Check"
            ?
            <>
              <section className="mb-4">
                <h3 className="text-[#000] font-medium inline-block">Misspelled Word:</h3>
                <p className="text-[#4D4D5A] text-sm font-normal inline-block pl-2">tagginchu</p>
              </section>

              <section className="mb-6">
                <p className="text-[#212131] font-medium mb-2">Change to:</p>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                  placeholder="VEDA"
                />
              </section>

              <button className="w-full text-gray-700 bg-[#00000010] hover:bg-gray-700 hover:text-white transition-colors rounded-xl font-medium py-4 mb-6">
                Replace
              </button>

              <p className="text-[#212131] font-medium mb-2">Suggestions</p>
              <textarea
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl mb-6"
                placeholder="Suggested corrections..."
              />

              {/* Actions */}
              <section className="grid grid-cols-2 gap-3">
                {["Replace all", "Learn", "Ignore all", "Ignore"].map((label, i) => (
                  <button
                    key={i}
                    className="w-full border border-[#9999A0] text-gray-600 hover:bg-gray-600 hover:text-white font-medium py-3.5 rounded-xl transition-colors"
                  >
                    {label}
                  </button>
                ))}
              </section>
            </>
            :
            <>
              <section>
                <p className='font-medium mb-1'>Language:</p>
                <button className='cursor-pointer w-full border border-gray-300 rounded-xl flex flex-row items-center justify-between p-3.5'>
                  <span></span>

                  <button className='text-lg'><IoChevronDown /></button>
                </button>
              </section>

              <section className='mt-4'>
                {[
                  { checked: true, text: "Check capitalization" },
                  { checked: true, text: "Check repeated words" },
                  { checked: true, text: "Check capitalization" }
                ].map((item) => (
                  <div className="flex flex-row items-center gap-1.5">
                    <input type="checkbox" checked={item.checked} className='custom-primary-checkbox' />
                    <span>{item.text}</span>
                  </div>
                ))}
              </section>
            </>
          }
        </div>
      </div>
    </div >
  );
};

export default SpellCheck;
