import { Fragment } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { useParams } from "react-router";
import { useDraftLogline } from "../api/get-draft-logline";
import { IoMdClose } from "react-icons/io";

const AllTemplatesModal = ({ setTemplatesPopup,setDraftData, templatesdata, handleTemplateChange, refetch,setiniialData ,setLoglineStatus,setslectedLogline }: any) => {

    const { fileId } = useParams();

  const { data, isLoading, error } = useDraftLogline({ id: fileId||"" });
const handleTemplateChnage =(template:any)=>{
    setDraftData( template?.templateId?._id,template)
    
setLoglineStatus && setLoglineStatus('edit')
           setTemplatesPopup(false);

}

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
              <Dialog.Panel className="relative font-poppins z-50 transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all w-[540px]">
                <div className="w-full p-[24px] rounded-3xl shadow-2xl">
                  <div className="flex justify-between items-center pb-4">
                    <p className="text-[19px] p-0 m-0 font-bold text-[#212131]">All Templates</p>
                    <div
                      className="text-xl cursor-pointer"
                      onClick={() => {
                        setTemplatesPopup(false);
                      }}
                    >
                       <IoMdClose />
                    </div>
                  </div>

                  <ul className="s">
                    {data?.logline?.loglineDrafts?.length > 0 ? (
                      data?.logline?.loglineDrafts?.map((template: any, index: any) => (
                        <li key={index} className="flex justify-between items-center border-b pb-3">
                          <span className="text-[#252C34] font-normal text-[14px]" onClick={()=>handleTemplateChnage(template)}>{template?.draftTitle}-{template?.templateId?.templateTitle||'Freeform'}</span>
                     
                        </li>
                      ))
                    ) : (
                      <li className="flex justify-center items-center">
                        <span className="text-[#252C34] font-normal text-[14px]">No Template found</span>
                      </li>
                    )}
                  </ul>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AllTemplatesModal;
