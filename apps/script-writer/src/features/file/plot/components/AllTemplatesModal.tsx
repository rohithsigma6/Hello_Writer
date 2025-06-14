import React, { Fragment, useState, useEffect } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { getPlotsByFile, deletePlotById } from '../api/get-all-templates';
import { IoMdClose } from 'react-icons/io';

const AllTemplatesModal = ({
  setTemplatesPopup,
  templatesdata,
  handleTemplateChange,
  refetch,
}: any) => {
  const { type } = useParams<{ type: string }>();
  const { fileId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [userInput, setUserInput] = useState('');
  const navigate = useNavigate();

  const [allTemplates, setAllTemplates] = useState([]);
  useEffect(() => {
    if (!fileId) return;
    console.log('Fetching data for fileId:', fileId);

    const getPlots = async () => {
      try {
        const data = await getPlotsByFile(fileId);
        if (data) {
          setAllTemplates(data);
        }
      } catch (error) {
        toast.error('Failed to fetch templates');
      }
    };

    getPlots();
  }, [fileId, type]);

  const openModal = (template) => {
    setSelectedTemplate(template);
    setUserInput(''); // Reset input field
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTemplate(null);
  };

  const handleDelete = async () => {
    if (!selectedTemplate) return;

    if (userInput === selectedTemplate.draftTitle) {
      const response = await deletePlotById(selectedTemplate._id);

      if (response) {
        alert('Plot deleted successfully');
      } else {
        alert('Plot deletion failed');
      }
      closeModal();
      window.location.reload();
    } else {
      alert('Title does not match. Deletion canceled.');
    }
  };
  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setTemplatesPopup(false)}
      >
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
              <Dialog.Panel className="relative font-poppins z-50 transform rounded-3xl bg-white text-left shadow-xl transition-all w-[540px]">
                <div className="w-full p-[24px] rounded-3xl shadow-2xl">
                  <div className="flex justify-between items-center">
                    <p className="text-[19px] font-bold text-[#212131]">
                      All Templates
                    </p>
                    <div className="text-xl cursor-pointer" onClick={() => setTemplatesPopup(false)}>
                      <IoMdClose />
                    </div>
                  </div>

                  <div className="mt-6">
                    {allTemplates?.length > 0 ? (
                      allTemplates.map((template, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center border-b border-t rounded-[10px] py-3 px-4 mt-2 mb-2"
                        >
                          <div
                            className="text-[#252C34] font-normal text-[14px] cursor-pointer"
                            onClick={() => {
                              navigate(`/file/${fileId}/plot/template/${template?.templateType}`);
                              window.location.reload();
                            }}
                          >
                            {template.templateType} ({template.draftTitle})
                          </div>

                          <div
                            onClick={() => openModal(template)}
                            className="text-[#252C34] font-normal text-[14px] flex items-center justify-center gap-1 py-2 px-3 rounded-2xl min-w-[116px] border border-[#00000010] cursor-pointer hover:bg-gray-100"
                          >
                            <IoMdClose className="text-[20px]" />
                            <span>Delete</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-[#252C34] font-normal text-[14px] text-center">
                        No templates available.
                      </p>
                    )}
                  </div>
                </div>

                {/* ✅ Nested Delete Modal */}
                {showModal && selectedTemplate && (
                  <Dialog
                    as="div"
                    className="fixed inset-0 z-[9999] overflow-y-auto"
                    open={showModal}
                    onClose={() => setShowModal(false)}
                  >
                    <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0 bg-black bg-opacity-50">
                      <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="inline-block align-middle bg-white rounded-3xl text-left overflow-hidden shadow-xl transform transition-all w-[580px] font-poppins"
                      >
                        <div className="flex justify-between items-center py-[24px] px-[40px]">
                          <h2 className="text-[19px] font-bold text-[#212131]">Confirm Deletion</h2>
                          <div className="text-xl cursor-pointer" onClick={() => setShowModal(false)}>
                            <IoMdClose />
                          </div>
                        </div>

                        <div className="border-y border-[#9999a072] py-[26px] px-[40px]">
                          <p className="text-[#212131] text-base font-normal mb-3">
                            Enter the title of the plot <strong>({selectedTemplate.draftTitle})</strong> to confirm deletion:
                          </p>
                          <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            className="w-full rounded-[16px] border border-[#0000002b] bg-white shadow-inner p-4"
                            placeholder="Enter plot title..."
                          />
                        </div>

                        <div className="flex justify-end px-[40px] py-[24px]">
                          <button
                            onClick={() => setShowModal(false)}
                            className="py-[18px] px-[52px] border border-[#9999A0] rounded-2xl text-[#9999A0] mr-3"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleDelete}
                            className="py-[18px] px-[48px] text-white rounded-2xl bg-primary-blue border border-gray-300 hover:border-[#9999A0] hover:bg-white hover:text-[#9999A0]"
                          >
                            Confirm Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </Dialog>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>

  );
};

export default AllTemplatesModal;
