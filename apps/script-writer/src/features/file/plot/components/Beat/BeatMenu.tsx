import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiLoader } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import { LuPause } from "react-icons/lu";

const BeatMenu: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 w-64">
      <div className="flex items-center justify-between space-x-2 py-2 cursor-pointer">
        <span className="flex items-center space-x-2 text-gray-800 font-medium">
          <span className="text-lg"><FiLoader /></span> {/* Sparkles icon */}
          <span className="text-sm">Edit Beat in Branch copy</span>
        </span>
        <span className="text-gray-500"><IoIosArrowForward />
        </span> {/* Right arrow */}
      </div>
      <div className="flex items-center justify-between space-x-2 py-2 cursor-pointer">
        <span className="flex items-center space-x-2 text-gray-800 font-medium">
          <span className="text-lg"><RiDeleteBinLine /></span> {/* Trash bin icon */}
          <span className="text-sm">Remove beat</span>
        </span>
        <span className="text-gray-500"><IoIosArrowForward />
        </span> {/* Right arrow */}
      </div>
      <div className="flex items-center space-x-2 py-2 cursor-pointer">
        <span className="text-lg text-gray-800"><LuPause /></span> {/* Pause icon */}
        <span className="text-gray-800  font-medium text-sm">Make beginning of act</span>
      </div>
      <div className="flex items-center space-x-2 py-2 cursor-pointer">
      <span className="text-lg text-gray-800"><LuPause /></span> {/* Pause icon */}

        <span className="text-gray-800 font-medium text-sm">Make beginning of sequence</span>
      </div>
    </div>
  );
};

export default BeatMenu;
