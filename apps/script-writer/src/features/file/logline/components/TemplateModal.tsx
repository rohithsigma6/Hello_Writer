import React, { Fragment, useContext, useEffect, useState } from "react";

import { Dialog, Transition } from "@headlessui/react";
import LoglineOptions from "./LoglineOptions";

const TemplateModal = ({ templatesPopup, setTemplatesPopup,setLoglineStatus,setslectedLogline,setiniialData }: any) => {
  return (
    <Transition.Root show={templatesPopup} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[9999]"
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-[9999]" />
        </Transition.Child>

        <div className="fixed inset-0 z-[9999] w-screen overflow-y-auto">
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
              <Dialog.Panel className="relative z-[9999] transform overflow-hidden bg-white text-left shadow-xl transition-all rounded-3xl px-[24px] pt-[24px] pb-[40px] w-[924px] min-h-[796px] login-line-modal">
                <div>
                  {/* <h1 className="text-black text-2xl">templates</h1> */}
                  {/* <p className=" text-slate-500 text-sm pb-4">Created files will appear in dashboard</p> */}
                  <LoglineOptions setTemplatesPopup={setTemplatesPopup} setiniialData={setiniialData}  setLoglineStatus={setLoglineStatus}  setslectedLogline={setslectedLogline}/>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default TemplateModal;
