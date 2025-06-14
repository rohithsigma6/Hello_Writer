import React, { Fragment, useContext, useEffect, useState } from "react";

import { Dialog, Transition } from "@headlessui/react";
import Button from "./UI/button";

const FinalizeConfirmationModal = ({
  templatesPopup,
  setTemplatesPopup,
  setProceed,
  finalizeHeading,
  finalizeText,
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
        {/* Backgdrop of the dialog */}
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
              <Dialog.Panel className="relative z-50 transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="w-full px-5 py-4 rounded-3xl shadow-2xl">
                  <div className="flex justify-end ">
                    <div
                      className="text-xl cursor-pointer"
                      onClick={() => {
                        setTemplatesPopup(false);
                      }}
                    >
                      X
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xl pb-4 font-semibold">{finalizeHeading || "Finalize Logline"}</p>
                  </div>
                  <p className="text-base pb-4">
                    {finalizeText ||
                      "Are you sure you want to finalize this logline? This action will mark it as your official logline for this file."}
                  </p>
                  {/* <p className="text-sm pb-4 ">Write the category name to delete</p> */}
                  {/* <label className="block text-[#9999A0] font-medium mb-5">
                    Category Name
                    <input
                      value={title}
                      onChange={handleTitleChange}
                      type="text"
                      className="w-full border-[1px] mt-2 border-[#0000001A] px-2 py-3 rounded-2xl outline-none"
                    />
                  </label> */}
                  <div className="flex mt-5">
                    <Button
                      type={"button"}
                      onClick={() => {
                        setTemplatesPopup(false);
                      }}
                      className={"mt-2 border text-[#9999A0]"}
                    >
                      Cancel
                    </Button>
                    <Button
                      className={"mt-2 ml-2 !bg-primary-blue !text-white"}
                      //   disabled={isDisabled}
                      onClick={() => {
                        setProceed(true);
                        setTemplatesPopup(false);
                      }}
                      type={"button"}
                    >
                      Confirm
                    </Button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>

    // <Transition.Root show={templatesPopup} as={Fragment}>
    //   <Dialog
    //     as="div"
    //     className="relative z-50"
    //     onClose={() => {
    //       setTemplatesPopup(false);
    //     }}
    //   >
    //     {/* Backgdrop of the dialog */}
    //     <Transition.Child
    //       as={Fragment}
    //       enter="ease-out duration-300"
    //       enterFrom="opacity-0"
    //       enterTo="opacity-100"
    //       leave="ease-in duration-200"
    //       leaveFrom="opacity-100"
    //       leaveTo="opacity-0"
    //     >
    //       <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
    //     </Transition.Child>

    //     <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
    //       <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
    //         <Transition.Child
    //           as={Fragment}
    //           enter="ease-out duration-300"
    //           enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    //           enterTo="opacity-100 translate-y-0 sm:scale-100"
    //           leave="ease-in duration-200"
    //           leaveFrom="opacity-100 translate-y-0 sm:scale-100"
    //           leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    //         >
    //           <Dialog.Panel className="relative z-50 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-3/5">
    //             {/* <div className="px-8 py-6"> */}

    //               {/* <h1 className="text-black text-2xl">Finalize Logline</h1>
    //               <p className=" text-slate-500 text-sm pb-4"></p> */}
    //               {/* <Templates setTemplatesPopup={setTemplatesPopup} /> */}
    //             {/* </div> */}
    //           </Dialog.Panel>
    //         </Transition.Child>
    //       </div>
    //     </div>
    //   </Dialog>
    // </Transition.Root>
  );
};

export default FinalizeConfirmationModal;
