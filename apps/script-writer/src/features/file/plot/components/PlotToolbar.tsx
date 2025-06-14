import React from "react";
import { FiUsers } from "react-icons/fi";
import { FiLoader } from "react-icons/fi";
import { BsChatLeftDots } from "react-icons/bs";
import { RiExpandDiagonalLine } from "react-icons/ri";
import { MdOutlineZoomInMap } from "react-icons/md";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { FaEdit, FaTrash, FaPlus, FaRegStar } from "react-icons/fa";
import { IoOptionsOutline } from "react-icons/io5";
import { HiOutlinePresentationChartLine } from "react-icons/hi2";

const PlotToolbar: React.FC = () => {
  return (
    <div className="flex items-center justify-between bg-white w-[650px] p-2 rounded-xl mb-6 ">
      {/* Left Icons */}
      <div className="flex space-x-4">
        <button className="p-2 rounded-lg hover:bg-gray-200">
          <FiUsers className="h-5 w-5 text-gray-600" />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-200">
          <FiLoader className="h-5 w-5 text-gray-600" />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-200">
          <BsChatLeftDots className="h-5 w-5 text-gray-600" />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-200">
          <MdOutlineZoomInMap className="h-5 w-5 text-gray-600" />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-200">
          <MdOutlineZoomOutMap className="h-5 w-5 text-gray-600" />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-200">
          <FaRegStar className="h-5 w-5 text-gray-600" />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-200">
          <IoOptionsOutline className="h-5 w-5 text-gray-600" />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-200">
          <HiOutlinePresentationChartLine className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Buttons */}
      <div className="flex">
        <button
          style={{
            paddingLeft: "6px",
            paddingRight: "6px",
            paddingTop: "6px",
            paddingBottom: "6px",
          }}
          className={`text-[#653EFF] rounded-lg   font-medium text-sm rounded-xl flex items-center border border-[#653EFF]   gap-2`}
        >
          <FaPlus />
          Add act
        </button>
     
      </div>
    </div>
  );
};

export default PlotToolbar;
