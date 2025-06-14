import { Modal } from '@/components/ui/modal';
import React from 'react';
import closeicon from '@/assets/close-icon.svg';


function DeleteFile({ isOpen, onClose }: any) {
  if (!isOpen) return null;
  return (
    <>
      <Modal
        className="bg-white rounded-[24px] shadow-md w-[560px]"
        isOpen={isOpen}
      >
        <form>
          <div>
            <div className="flex justify-between pl-[40px] pr-[24px] py-[24px] items-center] border-b border-b-[#00000036]">
              <h2 className="text-[19px] text-[#212131] font-poppins font-bold">
                Move “accidentalkarma Copy” to Trash ?
              </h2>
              <button
                className="bg-white duration-500 text-[#2C3E50] "
                onClick={onClose}
              >
                <img src={closeicon} alt="" />
              </button>
            </div>
            <div className="my-radio-btns pl-[40px] pr-[24px] pt-[24px] pb-[26px]">
              <p className="text-[16px] text-[#212131] font-poppins font-normal pb-3">
                You are about to move accidentalkarma Copy to Trash.
              </p>
              <p className="text-[16px] text-[#212131] font-poppins font-normal pb-3">
                Once moved the project cannot be edited, all collaborators will
                lose acces to the project.
              </p>
              <p className="text-[16px] text-[#212131] font-poppins font-semibold">
                Note: Projects will remain in Trash for 90 days and then auto
                deleted.
              </p>
            </div>
            <div className="flex justify-end py-[12px] border-t border-t-[#00000036] pr-[24px]">
              <button
                type="reset"
                className="rounded-[16px] min-w-[160px] text-[#6A6A75] font-medium py-[18px] px-[14px] text-[16px] border border-[#9999A0] font-poppins mr-2"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="max-w-[160px] py-[18px] font-poppins text-[16px] rounded-[16px] min-w-[160px] bg-[#653EFF] text-white px-0"
              >
                Move to Trash
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default DeleteFile;
