import React, { Fragment, ReactNode, useState } from "react";
import Button from "./button";
import { Dialog, Transition } from "@headlessui/react";
import { cn } from "utils/misc";


interface IDialogTemplate{
    children?:ReactNode;
    className?:string;
    onClose:any
}
const DialogCustom:React.FC<IDialogTemplate> = ({children, className, onClose}) => {

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog
        onClose={onClose}
        as="div"
        className="relative z-[999999]"

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
          <div  className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
              <Dialog.Panel  className={cn("relative z-50 transform overflow-hidden rounded-3xl bg-white shadow-xl transition-all w-[40vw]",className )}>
                  {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default DialogCustom;
