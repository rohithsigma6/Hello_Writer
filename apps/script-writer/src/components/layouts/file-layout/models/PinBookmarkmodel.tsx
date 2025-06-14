import { Modal } from '@/components/ui/modal'
import React from 'react'
import closeicon from '@/assets/close-icon.svg';

function PinBookmarkmodel({ isOpen, onClose }:any) {
    if (!isOpen) return null;
  return (
   <>
       <Modal className="bg-white rounded-[24px] shadow-md w-[560px]" isOpen={isOpen}>
        <form action="">
            <div className="flex justify-between pl-[40px] pr-[24px] py-[24px] items-center] border-b border-b-[#00000036]">
              <h2 className="text-xl font-bold text-[#000]">Inser Bookmark</h2>
              <button className="border border-[#00000036] bg-white duration-500 text-[#2C3E50]" onClick={onClose}>
              <img src={closeicon} alt="" />
              </button>
            </div>
            <div className="pl-[40px] pr-[24px] py-[24px]">
              <label className="block text-sm mb-1 tracking-wider">
                Bookmark name:
              </label>
              <input
                id="title"
                type="text"
                className="w-full px-3 py-4 border border-gray-300 rounded-[16px]"
                placeholder="Bookmark_name_goes_here"
              />
            </div>

            <div className="flex justify-end py-[12px] border-t border-t-[#00000036] pr-[24px]">
              <button
                type="reset"
                className=" font-poppins rounded-[16px] min-w-[160px] text-[#6A6A75] font-medium py-[18px] px-[52px] text-[16px] border border-[#9999A0] max-w-[160px] mr-2 ' disabled:text-gray-500 disabled:hover:bg-none'"
                onClick={onClose}>
                Cancel
              </button>
              <button
                type="submit"
                className=" py-[18px] font-poppins text-[16px] rounded-[16px] min-w-[160px] max-w-[160px] bg-[#653EFF] text-white ' disabled:text-gray-500 disabled:hover:bg-none'"
              >
                ok
              </button>
            </div>
        </form>
      </Modal>
   </>
  )
}

export default PinBookmarkmodel