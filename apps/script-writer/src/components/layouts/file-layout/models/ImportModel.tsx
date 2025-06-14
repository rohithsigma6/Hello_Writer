import { Modal } from '@/components/ui/modal';
import React from 'react';

function ImportModel({ isOpen, onClose }:any) {
    if (!isOpen) return null;
  return (
    <>
      <Modal className="bg-white p-8 rounded-lg shadow-md w-[900px]" isOpen={isOpen}>
        <form action="">
          <div className="flex flex-row">
            <div className="flex-1 mr-6">
              <h2 className="text-xl font-bold mb-0">Import Script</h2>
              <p className="text-lg font-normal text-gray-400 mt-0">
                Please enter details for this script
              </p>

              <div className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-bold mb-1 mt-4 tracking-wider"
                    htmlFor="title"
                  >
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    className="w-full px-3 py-3 border border-gray-300 rounded-[10px]"
                    placeholder="E.g. Suttabaaz"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-sm font-bold mb-1 mt-4 tracking-wider"
                    htmlFor="subTitle"
                  >
                    Sub Title
                  </label>
                  <input
                    id="subTitle"
                    type="text"
                    className="w-full px-3 py-4 border border-gray-300 rounded-[10px]"
                    placeholder="E.g. The Story of a  chain smoker"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-bold mb-1 mt-4 tracking-wider"
                    htmlFor="subTitle"
                  >
                    Based On
                  </label>
                  <input
                    id="basedOn"
                    type="text"
                    className="w-full px-3 py-4 border border-gray-300 rounded-[10px]"
                    placeholder="E.g. The Story of a  chain smoker"
                  />
                </div>
                <label
                  className="block text-sm font-bold mt-4 tracking-wider"
                  htmlFor="subTitle"
                >
                  Type of Creation
                </label>
                <div className=" flex flex-row items-center relative mb-4 w-full">
                  <select
                    className="w-full px-3 py-4 border border-gray-300 rounded-[10px]  form-select appearance-none cursor-pointer select-arrow font-medium text-center flex flex-row gap-4 items-center  text-sm relative"
                    aria-label="Default select example"
                    name="gender"
                  >
                    <option value="" disabled selected className="text-start">
                      Select a Category
                    </option>
                  </select>
               
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-bold mb-1 tracking-wider"
                    htmlFor="authorInput"
                  >
                    Written by
                  </label>

                  <div className="flex">
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center bg-gray-200 rounded-full px-3 py-1">
                        <span className="text-sm text-gray-700 font-medium mr-2"></span>
                        <button className="text-gray-500 hover:text-gray-700 text-lg leading-none">
                          &times;
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1 tracking-wider">
                    Invite collaborators
                  </label>
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="relative w-full"></div>
                    <button
                      type="button"
                      className="px-12 py-4 text-[#9999A0] bg-transparent flex-1 whitespace-nowrap border border-[#9999A0] rounded-[10px]"
                    >
                      Add
                    </button>
                  </div>

                  <div className="max-h-52 overflow-auto">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="relative w-full">
                        <input
                          type="email"
                          className="w-full px-3 py-1 border border-gray-300 rounded-2xl pr-10"
                          readOnly
                        />

                        <button
                          type="button"
                          className="absolute inset-y-0 right-2 text-sm px-1  "
                        >
                          x
                        </button>
                      </div>

                      <select className="px-4 py-1 border border-gray-300 rounded-2xl text-[#653EFF]">
                        <option value="Edit">Edit</option>
                        <option value="Suggest">Suggest</option>
                        <option value="View">View</option>
                        <option value="Comment">Comment</option>
                      </select>

                      <select className="px-4 py-1 border border-gray-300 rounded-2xl text-[#653EFF]">
                        <option value="Admin">Admin</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 ml-6">
              <div className="flex flex-col space-y-4">
                <div className="space-y-4">
                  <div>
                    <label
                      className="block text-sm font-bold mb-1 tracking-wider"
                      htmlFor="title"
                    >
                      Logline
                    </label>
                    <textarea
                      id="logline"
                      className="w-full px-3 py-2 border border-gray-300 rounded-[10px]"
                      placeholder="Describe about Suttabaaz"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-bold mb-1 tracking-wider"
                      htmlFor="title"
                    >
                      Theme
                    </label>
                    <input
                      id="theme"
                      type="text"
                      className="w-full px-3 py-4 border border-gray-300 rounded-[10px]"
                      placeholder="E.g. Hero's journey"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1 tracking-wider">
                      Genre
                    </label>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-bold mb-1 tracking-wider">
                      Sub genre
                    </label>
                  </div>
                </div>
                <div
                  className={`border-2 border-dashed border-gray-300'
                     p-4 rounded-md text-center cursor-pointer`}
                >
                  <p className="text-sm">
                    <span className="text-[#3fbb7b]">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF or FDX file (Max 4MB)
                  </p>
                  <input type="file" accept=".pdf,.fdx" className="hidden" />
                </div>
                <div className="bg-[#E9E9EA] rounded-2xl p-4 gap-2">
                  <p className="text-xs">
                    When uploading a PDF file, please ensure that the
                    screenplays is in the industry-standard format. Otherwise,
                    it might be parsed incorrectly.
                  </p>
                </div>

                <div className="flex items-center relative border  border-[#3CA970] h-14 rounded-[16px] shadow-md">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800 truncate"></p>
                    <p className="text-xs text-gray-500"></p>
                  </div>

                  <button className="absolute top-2 right-2 text-red-500 hover:text-red-700"></button>
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button className="px-4 py-2 text-[#9999A0] bg-transparent border-solid border-[1px] border-[#9999A0] rounded-md" onClick={onClose}>
                  Cancel
                </button>
                <button className="px-4 py-2 text-white bg-[#653EFF] rounded-md">
                  Create File
                </button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default ImportModel;
