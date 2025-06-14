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
import plottoolicon1 from "@/assets/plot-tool-icon-1.svg"
import plottoolicon2 from "@/assets/plot-tool-icon-2.svg"
import plottoolicon3 from "@/assets/plot-tool-icon-3.svg"
import plottoolicon4 from "@/assets/plot-tool-icon-4.svg"
import plottoolicon5 from "@/assets/plot-tool-icon-5.svg"
import plottoolicon6 from "@/assets/plot-tool-icon-6.svg"
import plottoolicon7 from "@/assets/plot-tool-icon-7.svg"
import plottoolicon8 from "@/assets/plot-tool-icon-8.svg"
import { IoMdAdd } from "react-icons/io";


const PlotToolbar: React.FC = () => {
  return (
    <div className="flex items-center justify-between bg-white w-max p-[10px] rounded-2xl font-poppins">
      {/* Left Icons */}
      <div className="flex gap-1 items-center">
        <button className="rounded-lg hover:bg-gray-200">
        <img src={plottoolicon1} alt="plottoolicon1" className="text-gray-600" />
        </button>
        <button className="rounded-lg hover:bg-gray-200">
        <img src={plottoolicon2} alt="plottoolicon2" className="text-gray-600" />
        </button>
        <button className="rounded-lg hover:bg-gray-200">
        <img src={plottoolicon3} alt="plottoolicon3" className="text-gray-600" />
        </button>

        <div className="w-[1px] h-[20px] bg-[#E9E9EA] mx-2
        "></div>

        <button className="rounded-lg hover:bg-gray-200">
        <img src={plottoolicon4} alt="plottoolicon4" className="text-gray-600" />
        </button>
        <button className="rounded-lg hover:bg-gray-200">
        <img src={plottoolicon5} alt="plottoolicon5" className="text-gray-600" />
        </button>
        <button className="rounded-lg hover:bg-gray-200">
        <img src={plottoolicon6} alt="plottoolicon6" className="text-gray-600" />
        </button>
        <button className="rounded-lg hover:bg-gray-200">
        <img src={plottoolicon7} alt="plottoolicon7" className="text-gray-600" />
        </button>
        <div className="w-[1px] h-[20px] bg-[#E9E9EA] mx-2
        "></div>
        <button className="rounded-lg hover:bg-gray-200">
        <img src={plottoolicon8} alt="plottoolicon8" className="text-gray-600" />
        </button>
      </div>

      <div className="flex items-center gap-2 ms-[55px]">
        <button className="border border-[#653EFF] py-[6px] px-[12px] rounded-[16px] text-[#653EFF] flex items-center gap-2">
        <IoMdAdd  className="text-[#653EFF] font-normal" />  <span className="text-[#653EFF]">Add act</span>
        </button>
        <button className="border border-[#653EFF] py-[6px] px-[12px] rounded-[16px] text-[#653EFF] flex items-center gap-2">
        <IoMdAdd className="text-[#653EFF] font-normal" />  <span className="text-[#653EFF]">Create template</span>
        </button>
      </div>
    </div>
  );
};

export default PlotToolbar;
