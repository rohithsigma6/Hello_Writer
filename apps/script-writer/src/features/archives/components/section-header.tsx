import React from 'react';
import SortDropdown from './sort-dropdown'; // Adjust import path as needed

interface SectionHeaderProps {
  title: string;
  onSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, onSort }) => {
  return (
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-sm font-bold">{title}</h3>
      <SortDropdown onChange={onSort} />
    </div>
  );
};

export default SectionHeader