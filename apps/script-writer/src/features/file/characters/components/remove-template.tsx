import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useParams } from "react-router";
import { useCharactersByFile, useDeleteCharacter } from "../api/save-draft";
import { enqueueSnackbar } from "notistack";
import { IoMdClose } from "react-icons/io";

const RemoveTemplatesModal = ({ setTemplatesPopup }: any) => {
  const { fileId } = useParams<{ type: string; fileId: string | "" }>();
  const deleteMutation = useDeleteCharacter();
//   const { data } = useDraftLogline({ id: fileId || "" });
    const { data, isLoading, error } = useCharactersByFile({ fileId});

  const [pendingDeletes, setPendingDeletes] = useState<Record<string, NodeJS.Timeout | null>>({});

  const handleRemoveClick = (templateId: string) => {
    // Start a 3-second timer for deletion
    const timer = setTimeout(() => {
      handleConfirmDelete(templateId);
    }, 3000);

    setPendingDeletes((prev) => ({
      ...prev,
      [templateId]: timer, // Store the timeout ID for cancellation
    }));
  };

  const handleUndoClick = (templateId: string) => {
    // Clear the timeout to cancel deletion
    if (pendingDeletes[templateId]) {
      clearTimeout(pendingDeletes[templateId]!);
    }

    setPendingDeletes((prev) => {
      const updated = { ...prev };
      delete updated[templateId]; // Remove from pendingDeletes
      return updated;
    });
  };

  const handleConfirmDelete = (templateId: string) => {
    deleteMutation.mutate(
      { templateId },
      {
        onSuccess: () => {
          enqueueSnackbar("Logline deleted successfully");
        },
        onError: (error) => {
          console.error("Error deleting logline:", error);
        },
      }
    );

    setPendingDeletes((prev) => {
      const updated = { ...prev };
      delete updated[templateId]; // Remove from pendingDeletes after deletion
      return updated;
    });
  };

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[999999]"
        onClose={() => setTemplatesPopup(false)}
      >
        {/* Backdrop */}
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
                      onClick={() => setTemplatesPopup(false)}
                    >
                      <IoMdClose />
                    </div>
                  </div>

                  <h2 className="text-[19px] p-0 m-0 font-bold text-[#212131]">Finalized Characters</h2>
                  <ul>
                    {data?.finalized?.length > 0 ? (
                      data?.finalized?.map((template: any, index: any) => (
                        <li key={index} className="flex justify-between items-center border-b pb-3">
                          <span className="text-[#252C34] font-normal text-[14px]">
                          {template?.allTemplate?.characterBuilder?.basicInfo?.name ||template?.allTemplate?.characterBlueprint?.characterName||template?.allTemplate?.freeform?.characterName}
                          </span>
                          <button
                            onClick={() =>
                              pendingDeletes[template._id]
                                ? handleUndoClick(template._id) // Undo deletion
                                : handleRemoveClick(template._id) // Start deletion timer
                            }
                            className={`border px-2 py-3 rounded-2xl ${
                              pendingDeletes[template._id]
                              ? "text-[#252C34] font-normal text-[14px] flex items-center justify-center gap-1 py-3 px-2 rounded-2xl bg-[#E9E9EA] min-w-[116px] border border-[#00000010]"
                              : "text-[#252C34] font-normal text-[14px] flex items-center justify-center gap-1 py-3 px-2 rounded-2xl min-w-[116px] border border-[#00000010]"
                          } cursor-pointer`}
                          >
                              {pendingDeletes[template._id] ? <div className="flex items-center justify-center gap-1"><IoMdRefresh className="text-[20px]"/> <span>Undo</span> </div>: <div className="flex items-center justify-center gap-1"><IoMdClose className="text-[20px]"/> <span>Remove</span> </div>}
                          </button>
                        </li>
                      ))
                    ) : (
                      <li className="flex justify-center items-center">
                        <span>No Finalized found</span>
                      </li>
                    )}
                  </ul>
                  <h2 className="text-[19px] p-0 m-0 font-bold text-[#212131] mt-4">Drafts Characters</h2>
                  <ul>
                    {data?.drafts?.length > 0 ? (
                      data?.drafts?.map((template: any, index: any) => (
                        <li key={index} className="flex justify-between items-center border-b pb-3">
                          <span className="text-[#252C34] font-normal text-[14px]">
                          {template?.allTemplate?.characterBuilder?.basicInfo?.name ||template?.allTemplate?.characterBlueprint?.characterName||template?.allTemplate?.freeform?.characterName}
                          </span>
                          <button
                            onClick={() =>
                              pendingDeletes[template._id]
                                ? handleUndoClick(template._id) // Undo deletion
                                : handleRemoveClick(template._id) // Start deletion timer
                            }
                            className={`border px-2 py-3 rounded-2xl ${
                              pendingDeletes[template._id]
                                ? "text-[#252C34] font-normal text-[14px] flex items-center justify-center gap-1 py-3 px-2 rounded-2xl bg-[#E9E9EA] min-w-[116px] border border-[#00000010]"
                                : "text-[#252C34] font-normal text-[14px] flex items-center justify-center gap-1 py-3 px-2 rounded-2xl min-w-[116px] border border-[#00000010]"
                            } cursor-pointer`}
                          >
                             {pendingDeletes[template._id] ? <div className="flex items-center justify-center gap-1"><IoMdRefresh className="text-[20px]"/> <span>Undo</span> </div>: <div className="flex items-center justify-center gap-1"><IoMdClose className="text-[20px]"/> <span>Remove</span> </div>}
                          </button>
                        </li>
                      ))
                    ) : (
                      <li className="flex justify-center items-center">
                        <span className="text-[#252C34] font-normal text-[14px]">No drafts found</span>
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

export default RemoveTemplatesModal;
