import { Modal } from '@/components/ui/modal';
import React from 'react';
import closeicon from '@/assets/close-icon.svg';

function PrintProjectModel({ isOpen, onClose }: any) {
  if (!isOpen) return null;
  return (
    <>
      <Modal
        className="bg-white rounded-[24px] shadow-md w-[1000px]"
        isOpen={isOpen}
      >
        <form action="">
          <div className="p-[24px] pb-0 flex justify-between items-start">
            <div>
              <h2 className="text-[19px] text-[#212131] font-poppins font-bold mb-0">
                Preview
              </h2>
              <span className="text-[#9999A0] text-[14px] font-normal mt-0">
                Preview the document
              </span>
            </div>
            <button className="border border-[#00000036] bg-white duration-500 text-[#2C3E50]" onClick={onClose}>
            <img src={closeicon} alt="" />
            </button>
          </div>

          <div className="my-5 mx-6 max-h-[612px] min-h-[612px] rounded-[24px] border-[#00000010] border overflow-auto"></div>

          <div className="mx-6 my-radio-btns">
            <span className="text-[#9999A0] text-[16px] font-normal">View</span>
            <div className="flex mt-3 items-start">
              <input type="checkbox" className="w-5 h-5 mr-4 mt-0" />
              <div>
                <span className="text-[#252C34] text-[16px] font-medium mt-0 leading-4">
                  Double View
                </span>
                <p className="text-[#9999A0] text-[14px] font-normal mt-0">
                  By clicking on this, you can view two pages.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end  p-6">
            <button
              className="text-[#653EFF] rounded-[16px] font-medium py-[16px] px-[52px] text-[16px] bg-[#D6CCFF] min-w-[198px] font-poppins mr-4"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="submit"
              className="min-w-[198px] rounded-[16px] bg-[#653EFF] text-white py-[16px] px-[52px]"
            >
              Print
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default PrintProjectModel;
