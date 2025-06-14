import React, { Fragment, useContext, useEffect, useState } from "react";

import Templates from "./TemplateWraper";
import { Dialog, Transition } from "@headlessui/react";

const TemplateModal = ({ templatesPopup, setTemplatesPopup }: any) => {
  return (
    <Transition.Root show={templatesPopup} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
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
              <Dialog.Panel className="relative z-50 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-3/5">
                <div className="px-8 py-6">
                  {/* <h1 className="text-black text-2xl">templates</h1> */}
                  {/* <p className=" text-slate-500 text-sm pb-4">Created files will appear in dashboard</p> */}
                  <Templates setTemplatesPopup={setTemplatesPopup} />
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
