import React from "react";
import { FiUsers } from "react-icons/fi";
import { LuHash } from "react-icons/lu";

const BeatComment: React.FC = () => {
  return (
    <div className="flex items-center w-full max-w-md p-3 bg-white rounded-lg shadow-md border border-gray-300">
      {/* User Avatar */}
      <div className="w-8 h-8 flex-shrink-0 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
        R
      </div>

      {/* Input Field */}
      <input
        type="text"
        placeholder="Comment..."
        className="flex-grow ml-3 text-sm text-gray-700 bg-transparent focus:outline-none"
      />

      {/* Icons Section */}
      <div className="flex items-center gap-3 ml-3">
        {/* People Icon */}
        <button className="w-6 h-6 flex items-center justify-center text-gray-500 rounded-full hover:bg-gray-200">
          <LuHash />
        </button>

        {/* Hash Icon */}
        <button className="w-6 h-6 flex items-center justify-center text-gray-500 rounded-full hover:bg-gray-200">
          <FiUsers />
        </button>
      </div>

      {/* Send Button */}
      <button className="ml-3 px-4 py-1.5 bg-purple-600 text-white text-sm rounded-full hover:bg-purple-700">
        Send
      </button>
    </div>
  );
};

export default BeatComment;
