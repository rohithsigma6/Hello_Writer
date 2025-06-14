import { Modal } from '@/components/ui/modal'
import React from 'react'
import cogicon from '@/assets/cog-icon.svg';
import foldericon from '@/assets/folder-icon.svg';

function OpenProjectModel({ isOpen, onClose }:any) {
  if (!isOpen) return null;
  
  return (
  <>
      <Modal
        isOpen={isOpen}
       className='bg-white  p-[24px] rounded-[24px] shadow-md w-[1032px] my-from font-poppins'>
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-[19px] font-bold text-[#212131]">
                My Portfolio &gt; Script Bank
              </h2>
              <p className="text-sm text-[#9999A0] font-normal">
                Account created a year ago
              </p>
            </div>
            <button className="material-icons text-[#212131] hover:text-gray-600 cursor-pointer" onClick={onClose}>
              {' '}
              ✖
            </button>
          </div>

          <div className="flex items-center my-6 w-full relative">
            <input
              type="text"
              placeholder="Search all 64 items in portfolio..."
              className="w-full px-4 py-5 text-sm border rounded-2xl font-normal text-[#6A6A75] font-poppins"
            />
            <button className="text-gray-500 hover:text-gray-700 bg-white absolute top-[2px] right-[15px] h-[90%]"></button>
          </div>

          <div className="max-h-[434px] overflow-y-auto border rounded-2xl text-[#6A6A75] font-poppins w-full">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="sticky top-0 bg-white">
                <tr className="border-b">
                  <th className="p-4 text-[#212131] text-sm font-medium">
                    Name
                  </th>
                  <th className="p-4 text-[#212131] text-sm font-medium">
                    Last Modified
                  </th>
                  <th className="p-4 text-[#212131] text-sm font-medium">
                    Length
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-[#E9E9EA] cursor-pointer border-b">
                  <td className="px-4 py-2 flex items-center space-x-2">
                    <span>
                     <img src={foldericon} alt="Import Icon" className="w-4 h-4 ml-auto" />
                    </span>
                    <span className="font-medium text-[#212131] text-[16px]">
                      hello
                    </span>
                  </td>
                  <td className="px-4 py-2 text-gray-500">
                    <span className="block font-medium text-[#212131] text-[16px]">
                      2025-01-24T11:29:52.951Z
                    </span>
                    <span className="text-sm text-[#6A6A75]">
                      Modified by Unknown
                    </span>
                  </td>
                  <td className="px-4 py-2 text-gray-500">-</td>
                </tr>
              </tbody>
            </table>

            {/* <p className="text-gray-500 text-center">No folders or files available.</p> */}
          </div>

          <div className="">
            <div className="flex justify-start items-center mt-6 gap-3">
              <button className="text-[#663EFF] px-[33px] py-[4px] text-[16px] font-medium font-poppins border border-[#653EFF] rounded-[8px]">
                New Project
              </button>
              <button className="text-[#663EFF] px-[33px] py-[4px] text-[16px] font-medium font-poppins border border-[#653EFF] rounded-[8px]">
                New Folder
              </button>
              <button className="text-[#663EFF] px-[33px] py-[4px] text-[16px] font-medium font-poppins border border-[#653EFF] rounded-[8px]">
                Move to Archive
              </button>
              <button className="text-[#663EFF] px-[33px] py-[4px] text-[16px] font-medium font-poppins border border-[#653EFF] rounded-[8px]">
                Open Archive
              </button>
              <button>
                <img
                  src={cogicon}
                  alt="Import Icon"
                  className="w-6 h-6 ml-auto"
                />
              </button>
            </div>
          </div>
          <div className="text-right">
            <button className="bg-[#663EFF] px-[64px] py-[16px] text-[20px] text-white font-medium font-poppins rounded-[16px] mt-8">
              Open
            </button>
          </div>
        </div>
      </Modal>
  </>
  )
}

export default OpenProjectModel