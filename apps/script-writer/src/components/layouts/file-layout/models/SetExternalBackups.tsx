import { Modal } from '@/components/ui/modal';
import React from 'react';
import closeicon from '@/assets/close-icon.svg';

function SetExternalBackups({ isOpen, onClose }: any) {
  if (!isOpen) return null;
  return (
    <>
      <Modal
        isOpen={isOpen}
        className="bg-white rounded-[24px] shadow-md w-[600px]"
      >
        <div>
          <div className="flex justify-between pl-[40px] pr-[24px] py-[24px] items-center] items-center">
            <h2 className="text-[19px] text-[#212131] font-poppins font-bold">
              External backups
            </h2>
            <button
              className=" bg-white duration-500 text-[#2C3E50] "
              onClick={onClose}
            >
              <img src={closeicon} alt="" />
            </button>
          </div>

          <form className="px-[24px]">
            <div>
              <label
                className="block text-sm mb-1 tracking-wider font-semibold"
                htmlFor="title"
              >
                File name
              </label>
              <input
                id="theme"
                type="text"
                className="w-full px-3 py-4 border border-gray-300 rounded-[16px]"
                placeholder="Eg:- Suttebazz (Backup)"
              />
            </div>
            <div className="mt-4">
              <label
                className="block text-sm mb-1 tracking-wider font-semibold" 
                htmlFor="title"
              >
                File name
              </label>
              <input
                id="theme"
                type="text"
                className="w-full px-3 py-4 border border-gray-300 rounded-[16px]"
                placeholder="Eg:- Suttebazz (Backup)"
              />
            </div>
            <div className="mt-4">
              <label
                className="block text-sm mb-1 tracking-wider font-semibold"
                htmlFor="title"
              >
                Save frequency
              </label>
              <input
                id="theme"
                type="text"
                className="w-full px-3 py-4 border border-gray-300 rounded-[16px]"
                placeholder="Do Not set backups - backups DISABLED"
              />
            </div>

            <div className="mt-4">
              <label
                className="block text-sm mb-1 tracking-wider font-semibold"
                htmlFor="title"
              >
                File Type
              </label>
              <input
                id="theme"
                type="text"
                className="w-full px-3 py-4 border border-gray-300 rounded-[16px]"
                placeholder="Screenplay.Ink"
              />
            </div>

            <div className="mt-4">
              <label
                className="block text-sm mb-1 tracking-wider font-semibold"
                htmlFor="title"
              >
                Storage
              </label>
              <input
                id="theme"
                type="text"
                className="w-full px-3 py-4 border border-gray-300 rounded-[16px]"
                placeholder="Hard Drive"
              />
            </div>

            <div className="flex justify-end py-[12px]">
              <button
                type="reset"
                className="rounded-[16px] min-w-[160px] text-[#6A6A75] font-medium py-[18px] px-[14px] text-[16px] font-poppins mr-2 border-solid border-[1px] border-[#9999A0]"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="max-w-[160px] py-[18px] font-poppins text-[16px] rounded-[16px] min-w-[160px] bg-[#653EFF] text-white px-0"
              >
                ok
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default SetExternalBackups;
