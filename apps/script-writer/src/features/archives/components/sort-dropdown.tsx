import React from 'react';

interface SortDropdownProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ onChange }) => {
  const options = [
    { value: "newest", label: "Newest first" },
    { value: "oldest", label: "Oldest first" },
  ];

  return (
    <div className="flex items-center space-x-2">
      <label className="text-gray-500 font-medium">Sort:</label>
      <select className="px-1 py-1 focus:outline-none font-bold" onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} className="font-bold" value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortDropdown