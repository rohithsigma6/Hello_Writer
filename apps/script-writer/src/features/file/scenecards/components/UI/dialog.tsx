import { Fragment, useContext, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { UserContext } from "../../context/usercontext";
import { FileContext } from "../../context/filecontext";
import { PopupType } from "../../lib/editor/popup";
import PopupImportFile from "../Popup/popupimportfile";
import PopupExportFile from "../Popup/popupexportfile";
import PopupEditorLink from "../Popup/popupeditorlink";
import PopupCreateFile from "../Popup/popupcreatefile";
import PopupCreateFolder from "components/Popup/PopupCreateFolder";
import PopupShareFile from "../Popup/popupsharefile";
import PopupDeleteFile from "../Popup/popupdeletefile";
import PopupImportScript from "components/Popup/PopupImportScript";
import PopupTransliteration from "components/Popup/popupTransliteration";
import PopupCreateComment from "components/Popup/popupCreateComment";
import PopupLifetimePlan from "components/Popup/popupLifetimePlan";

export default function DialogContainer() {
  const userCtx = useContext(UserContext);

  const { popup, updatePopup } = userCtx;

  const open = Boolean(popup);
  const cancelButtonRef = useRef(null);

  const handleClose = () => {
    updatePopup(undefined);
  };

  const getPopup = (type: PopupType): any => {
    let popupcomponent = undefined;
    switch (type) {
      case PopupType.ImportFile:
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        popupcomponent = <PopupImportFile confirmImport={popup.action} closePopup={handleClose} />;
        break;
      case PopupType.DeleteFile:
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        popupcomponent = <PopupDeleteFile file={popup.file} fileId={popup.fileId} />;
        break;
      case PopupType.ExportFile:
        popupcomponent = <PopupExportFile closePopup={handleClose} />;
        break;
      case PopupType.EditorLink:
        popupcomponent = <PopupEditorLink />;
        break;
      case PopupType.CreateFolder:
        popupcomponent = <PopupCreateFolder closePopup={handleClose} />;
        break;
      case PopupType.ImportScript:
        popupcomponent = <PopupImportScript closePopup={handleClose} />;
        break;
      case PopupType.CreateFile:
        popupcomponent = <PopupCreateFile closePopup={handleClose} />;
        break;
      case PopupType.ShareFile:
        popupcomponent = <PopupShareFile closePopup={handleClose} />;
        break;
      case PopupType.Transliteration:
        popupcomponent = <PopupTransliteration closePopup={handleClose} />;
        break;
      case PopupType.LifetimePricing:
        popupcomponent = <PopupLifetimePlan closePopup={handleClose} />
        break;  
      case PopupType.CommentPopup:
        popupcomponent = <PopupCreateComment open={open} handleClose={handleClose} />;
        break;
      default:
        popupcomponent = null;
    }
    return popupcomponent;
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const POPUPTYPE = popup?.type;

  return (
    <>
      {POPUPTYPE !== PopupType.CommentPopup ? (
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={handleClose}>
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
                  {/*  sm:max-w-lg */}
                  <Dialog.Panel className="relative z-50 transform overflow-hidden bg-white text-left shadow-xl transition-all sm:my-8  rounded-[24px]">
                    {getPopup(POPUPTYPE)}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      ) : (
        <> {getPopup(POPUPTYPE)}</>
      )}
    </>
  );
}
