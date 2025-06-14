import { Modal } from '@/components/ui/modal';
import React, { useState } from 'react';
import closeicon from '@/assets/close-icon.svg';
import { IoCloseSharp } from 'react-icons/io5';

function NamesDatabase({ isOpen, onClose }: any) {
  if (!isOpen) return null;

  const [currentName, setCurrentName] = useState<string>(prefixes[0])

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex justify-center items-start bg-black bg-opacity-40 p-10 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-xl rounded-2xl overflow-hidden shadow-md font-poppins"
      >
        <div className="flex justify-between items-center border-b border-b-[#00000036] pl-9 pr-6 py-5">
          <h2 className="text-xl font-semibold text-black">Names Database</h2>

          <button
            onClick={onClose}
            className="hover:bg-black hover:text-white p-1.5 rounded-full transition-colors"
          >
            <IoCloseSharp className="text-lg" />
          </button>
        </div>

        <div className="px-9 py-6">
          <p className="text-[#212131] font-normal mb-6">
            Find that perfect name from our list of 90,000 names. Type in
            thefirst few characters of the name and click “Look Up”
          </p>
          <label className="block text-sm mb-1 tracking-wider font-medium text-[#212131]">
            Name Prefix:
          </label>
          <input
            id="title"
            type="text"
            className="w-full p-3 border border-gray-300 rounded-2xl"
            value={currentName}
            disabled
          />

          <section className="flex flex-col mt-4 rounded-xl border border-gray-300 min-h-48 max-h-48 overflow-y-auto">
            {prefixes.map((item) => (
              <button
                key={item}
                onClick={() => setCurrentName(item)}
                className={`px-4 py-2 text-start ${item === currentName ? "bg-gray-200 font-medium" : "bg-transparent"}`}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </section>
        </div>

        <div className="flex justify-end py-4 border-t border-t-[#00000036] pr-[24px]">
          <button
            type="reset"
            className="rounded-2xl min-w-[170px] text-gray-600 hover:bg-gray-600 hover:text-white transition-colors font-medium py-3 border border-[#9999A0] max-w-[170px] font-poppins mr-2 ' disabled:text-gray-500 disabled:hover:bg-none'"
          >
            Add to SmartType
          </button>
          <button
            type="submit"
            className=" py-3 font-poppins rounded-2xl min-w-[170px] max-w-[170px] bg-[#653EFF] hover:bg-[#5835e3] transition-colors text-white disabled:text-gray-500 disabled:hover:bg-none'"
          >
            Look Up
          </button>
        </div>
      </div>
    </div>
  );
}

const prefixes = ["VEDA", "Govardhan", "Sulochana", "Forest Minister", "Subba Raja", "Bhanu", "Lead Goon", "Prime Minister", "Officer Yash"];


export default NamesDatabase;
