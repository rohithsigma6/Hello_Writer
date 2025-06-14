import React from "react";

const BeatCollaborators: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 w-72">
      <div className="text-gray-600 font-medium pb-2">Type to search collaborators:</div>
      <input
        type="text"
        placeholder="Search collaborators"
        className="w-full p-2 text-sm rounded-lg bg-gray-300 text-gray-500 focus:outline-none"
      />

      <div className="mt-2">
        <div className="flex items-center space-x-2 py-2">
         
          <input type="checkbox" className="w-4 h-4" />
           <div className="w-6 h-6 text-sm rounded-full bg-gray-800 text-white flex items-center justify-center font-bold">
            R
          </div>
          <span className="text-gray-800">Ram</span>
        </div>
        <div className="flex items-center space-x-2 py-2">
        <input type="checkbox" className="w-4 h-4" />

          <div className="w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center font-bold">
            S
          </div>
          <span className="text-gray-800">Shyam</span>
        </div>
      </div>
    </div>
  );
};

export default BeatCollaborators;
