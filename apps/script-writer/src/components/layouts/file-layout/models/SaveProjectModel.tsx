import React from 'react';
import savaicon1 from '@/assets/save-project-icon-1.svg';
import savaicon2 from '@/assets/save-project-icon-2.svg';
import savaicon3 from '@/assets/save-project-icon-3.svg';
import { Modal } from '@/components/ui/modal';
import closeicon from '@/assets/close-icon.svg';

function SaveProjectModel({ isOpen, onClose }: any) {
  if (!isOpen) return null;
  return (
    <>
      <Modal
        isOpen={isOpen}
        className="bg-white rounded-[24px] shadow-md w-[752px]"
      >
        <div>
          <div className="flex justify-between pl-[40px] pr-[24px] py-[24px] items-center] border-b border-b-[#00000036] items-center">
            <h2 className="text-[19px] text-[#212131] font-poppins font-bold">
              Save Project
            </h2>
            <button
              className="bg-white duration-500 text-[#2C3E50] "
              onClick={onClose}
            >
              <img src={closeicon} alt="" />
            </button>
          </div>

          <form className="">
            {/* Format for export */}
            <div className="my-radio-btns pl-[40px] pr-[24px]">
              <p className="text-[16px] text-[#212131] font-poppins font-semibold mt-[40px] mb-[24px]">
                Writer Duet continuously syncs your work to our servers so
                saving manually is unnecessary
              </p>
              <p className="text-[16px] text-[#4D4D5A] font-poppins font-normal pb-3">
                Your document’s sync status is indicated by this icon:
              </p>

              <ul className="mb-6 flex font-poppins">
                <li className="min-w-[204px] max-w-[204px]  text-center pr-6 border-r border-r-[#00000010]">
                  <img src={savaicon1} alt="" className="mx-auto" />
                  <p className="text-[14px] text-[#212131] font-poppins font-normal mt-[4px]">
                    Synced both online and offline
                  </p>
                </li>
                <li className="min-w-[228px] max-w-[228px]  text-center px-6">
                  <img src={savaicon2} alt="" className="mx-auto" />
                  <p className="text-[14px] text-[#212131] font-poppins font-normal mt-[4px]">
                    Synced offline but not online
                  </p>
                </li>
                <li className="min-w-[204px] max-w-[204px]  text-center pl-6 border-l border-l-[#00000010]">
                  <img src={savaicon3} alt="" className="mx-auto" />
                  <p className="text-[14px] text-[#212131] font-poppins font-normal mt-[4px]">
                    Synced neither online and offline
                  </p>
                </li>
              </ul>

              <p className="text-[16px] text-[#4D4D5A] font-poppins font-normal pb-3 flex items-start">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  className="mr-2 h-5 w-5 border-[#00000010] border"
                />
                <span>
                  Create a snapshot of your document on save (this can be
                  changed under Customize &gt; Editing)
                </span>{' '}
              </p>
            </div>
            <div className="flex justify-end py-[12px] border-t border-t-[#00000036] px-[24px]">
              <button
                type="reset"
                className="font-poppins  rounded-[16px] min-w-[160px] text-[#6A6A75] font-medium py-[18px] px-[14px] text-[16px] border border-[#9999A0] mr-auto"
              >
                Setup external project backups
              </button>

              <button
                type="reset"
                className="rounded-[16px] min-w-[160px] text-[#6A6A75] font-medium py-[18px] px-[14px] text-[16px] border border-[#9999A0] font-poppins mr-2" onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="max-w-[160px] py-[18px] font-poppins text-[16px] rounded-[16px] min-w-[160px] bg-[#653EFF] text-white px-0"
              >
                Save Project
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default SaveProjectModel;
