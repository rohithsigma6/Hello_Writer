import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoMdClose } from 'react-icons/io';

const FinalizeConfirmationModal = ({
  templatesPopup,
  setTemplatesPopup,
  setProceed,
  finalizeHeading,
  finalizeText,
  status,draftTitle,
  setDraftTitle
}: any) => {
  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[999999]"
        onClose={() => {
          setTemplatesPopup(false);
        }}
      >
        {/* Backdrop of the dialog */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative font-poppins z-50 transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all sm:my-8 w-[560px]">
                <div className="w-full">
                  <div className="flex justify-between items-center py-[24px] px-[40px]">
                  <p className="text-[19px] p-0 m-0 font-bold text-[#212131]">
                      {finalizeHeading || "Finalize Theme"}
                    </p>
                    <div
                      className="text-xl cursor-pointer"
                      onClick={() => {
                        setTemplatesPopup(false);
                      }}
                    >
                       <IoMdClose />
                    </div>
                  </div>
                
                  <p className="text-base font-normal border-t text-[#212131] border-b border-solid border-[#9999a072] py-[26px] px-[40px]">
                  {status==='finalize'&&finalizeText }
                      {status!=='finalize'&& <>
                        <p className="text-[#212131] text-base font-normal py-2">
                      Add Draft Title
                    </p>
                       <input
                  className="w-full rounded-[16px] border border-solid border-[#0000002b] bg-white shadow-inner p-4"
                  value={draftTitle}
                  onChange={(e)=>setDraftTitle(e.target.value)}
                  
                  />
                  </>
                  }
                  </p>
                  <div className="flex gap-2 px-[24px] py-[12px] justify-end">
                    <button
                      type={"button"}
                      onClick={() => {
                        setTemplatesPopup(false);
                      }}
                      className={"w-[160px] py-[18px] px-[52px] border border-solid border-[#9999A0] rounded-2xl text-[#9999A0] text-center"}
                    >
                      Cancel
                    </button>
                    <button
                      className={
                        "w-[160px] py-[18px] px-[48px] text-white rounded-2xl bg-primary-blue border border-gray-300 hover:border-[#9999A0] hover:bg-white hover:text-[#9999A0]"
                      }
                      onClick={() => {
                        setProceed(true);
                        setTemplatesPopup(false);
                      }}
                      type={"button"}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default FinalizeConfirmationModal;
