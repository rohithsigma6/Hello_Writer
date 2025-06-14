import { Modal } from '@/components/ui/modal';
import React from 'react';
import closeicon from '@/assets/close-icon.svg';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { IoCloseSharp } from 'react-icons/io5';

function GrammarCheck({ isOpen, onClose }: any) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex justify-center items-start bg-black bg-opacity-40 p-10 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-xl rounded-2xl overflow-hidden shadow-md font-poppins"
      >
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
              <span>Grammer Check</span>
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
          <div className="flex mb-6 justify-between">
            <button
              type="reset"
              className="rounded-[16px] w-1/3 mr-1 text-gray-600 hover:bg-gray-600 hover:text-white transition-colors font-medium p-3.5 border border-[#9999A0]"
            >
              Grammar Check
            </button>
            <button
              type="reset"
              className="rounded-[16px] w-1/3 mr-1 text-gray-600 hover:bg-gray-600 hover:text-white transition-colors font-medium p-3.5 border border-[#9999A0]"
            >
              Options
            </button>
          </div>

          <h3 className="text-[#212131 font-medium inline-block">
            Incorrect Phrase:
          </h3>
          <p className="text-[#212131] text-lg font-semibold block mt-1">
            She is walking to the store
          </p>

          <p className="text-[#212131 font-medium mt-4">
            Change to:
          </p>
          <input
            id="title"
            type="text"
            className="w-full px-3 py-4 border border-gray-300 rounded-[16px] mt-2"
            placeholder=""
          />

          <p className="text-[#212131 font-medium mb-2 mt-4">
            Suggestions
          </p>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-[16px] mb-6"
            rows={7}
          />

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
        </div>
      </div>
    </div>
  );
}

export default GrammarCheck;
