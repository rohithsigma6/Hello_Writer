import React from "react";

const BeatTaskStatus: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 w-56 ">
      <div className="flex items-center space-x-2 py-2">
        <input type="checkbox" className="w-4 h-4" />
        <span className="flex items-center space-x-1 text-gray-800 font-medium">
          <span className="text-lg"></span> {/* Clock icon */}
          <span>Not Started</span>
        </span>
      </div>
      <div className="flex items-center space-x-2 py-2">
        <input type="checkbox" className="w-4 h-4" />
        <span className="flex items-center space-x-1 text-gray-800 font-medium">
          <span className="text-lg"></span> {/* Hourglass icon */}
          <span>In Progress</span>
        </span>
      </div>
      <div className="flex items-center space-x-2 py-2">
        <input type="checkbox" className="w-4 h-4" />
        <span className="flex items-center space-x-1 text-gray-800 font-medium">
          <span className="text-lg"></span> {/* Speech bubble icon */}
          <span>Feedback Needed</span>
        </span>
      </div>
      <div className="flex items-center space-x-2 py-2">
        <input type="checkbox" className="w-4 h-4" />
        <span className="flex items-center space-x-1 text-gray-800 font-medium">
          <span className="text-lg"></span> {/* Checkmark icon */}
          <span>Done</span>
        </span>
      </div>
    </div>
  );
};

export default BeatTaskStatus;
