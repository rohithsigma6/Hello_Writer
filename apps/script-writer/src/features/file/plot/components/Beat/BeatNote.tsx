import React from "react";
import { IoClose } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BiExpandAlt } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { HiOutlineCube } from "react-icons/hi";
import { RiText } from "react-icons/ri";
import { IoImageOutline } from "react-icons/io5";
import { AiOutlineBold } from "react-icons/ai";
import { AiOutlineItalic } from "react-icons/ai";
import { MdFormatUnderlined } from "react-icons/md";
import { MdContentCopy } from "react-icons/md";
import { TbSparkles } from "react-icons/tb";

const NotesApp = () => {
  return (
    <div className="flex h-screen">
      {/* Main Content */}

      <div className="fixed right-0 top-[90px] h-full w-96 bg-white shadow-lg border-l flex flex-col ">
        <div className="flex items-center gap-2 bg-white px-2 py-2 ">
          {/* Left section */}
          <div className="flex items-center gap-2">
            <button className="p-1  rounded">
              <IoClose size={18} className="text-black" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <IoIosArrowBack size={16} className="text-gray-600" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <IoIosArrowForward size={16} className="text-gray-600" />
            </button>
          </div>

          {/* Middle section */}
          <div className="flex-1 flex text-sm text-black font-bold items-center ">
            <span>
              <HiOutlineCube style={{ color: "gray", marginRight: "2px" }} />
            </span>
            Notes on
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2">
            <button className="p-1 hover:bg-gray-100 rounded">
              <BiExpandAlt size={16} className="text-black" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <BsThreeDots size={16} className="text-black" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <AiOutlinePlus size={16} className="text-black" />
            </button>
          </div>
        </div>

        {/* Synopsis Section */}
        <div className='ml-[9px] mt-4'>
        <h5 className='ml-[6px] font-bold'>Notes on</h5>
        <div className="bg-[#E7EDF3] border-gray-300 h-28 w-[350px]  rounded-lg m-2 p-2">
          <div className="border-b border-gray p-2 flex">
            <span className='flex items-center'>
              <HiOutlineCube style={{ color: "gray", marginRight: "2px" }} />
            </span>
                        <h6>Title</h6>

          </div>
          <div className="mt-2 p-2">
            <h6 className="text-sm">Synosis...</h6>
          </div>
        </div>
       

          {/* <textarea 
          className="w-full bg-gray-100 resize-none outline-none text-gray-600 placeholder-gray-400 text-sm"
          placeholder={defaultText}
          defaultValue=""
          rows={8}
        /> */}
        </div>

        {/* Writing Section */}
        <div className="p-4">
          <h3 className="text-sm font-bold text-gray-800">#mohan</h3>
          <textarea
            className="w-full h-40 mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="Start writing..."
          ></textarea>
        </div>

        {/* Footer */}

        <div className="flex gap-1 justify-center mt-6">

        <div className="flex items-center gap-0.5 bg-gray-900 rounded-lg px-2 py-1.5">
        <button className="p-1.5 hover:bg-gray-800 rounded-md">
          <RiText size={14} className="text-gray-300" />
        </button>
        <button className="p-1.5 hover:bg-gray-800 rounded-md">
          <IoImageOutline size={14} className="text-gray-300" />
        </button>
        <button className="p-1.5 hover:bg-gray-800 rounded-md">
          <AiOutlineBold size={14} className="text-gray-300" />
        </button>
        <button className="p-1.5 hover:bg-gray-800 rounded-md">
          <AiOutlineItalic size={14} className="text-gray-300" />
        </button>
        <button className="p-1.5 hover:bg-gray-800 rounded-md">
          <MdFormatUnderlined  size={14} className="text-gray-300" />
        </button>
        <button className="p-1.5 hover:bg-gray-800 rounded-md">
          <MdContentCopy size={14} className="text-gray-300" />
        </button>
        <button className="p-1.5 hover:bg-gray-800 rounded-md">
          <AiOutlinePlus size={14} className="text-gray-300" />
        </button>
      </div>

      {/* Ask AI button */}
      <button className="flex items-center gap-1 bg-gray-900 rounded-lg px-3 py-1.5 text-sm text-gray-300 hover:bg-gray-800">
       
       <TbSparkles />
       Ask AI
      </button>
      </div>
      </div>
    </div>
  );
};

export default NotesApp;
