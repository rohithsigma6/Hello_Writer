import React from "react";

const ViewAll: React.FC = () => {
  const items = [
    "Three Acts",
    "Four Acts",
    "Seven Acts",
    "Story Circle",
    "Hero's Journey",
    "Save the Cat!",
    "John Truby's 22 Steps",
    "The Writer's Journey",
    "Story Maps",
    "Syd Field's Paradigm",
    "Turn and Burn",
    "Freytag's Pyramid",
    "Six-Stage Plot",
    "Sequence Approach",
    "Kishōtenketsu",
    "aja's Rose Studio",
  ];

  return (
    <div   style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} className=" mt-2 w-64 bg-white rounded-md shadow-lg h-96 overflow-y-auto ">
    <ul className="space-y-2 p-4">
      {items.map((item, index) => (
        <li
          key={index}
          className="bg-white hover:bg-gray-100 text-gray-800 rounded-md shadow-sm px-4 py-2 text-sm cursor-pointer"
        >
          {item}
        </li>
      ))}
    </ul>
  </div>
  );
};

export default ViewAll;
