import React from 'react';
import { FaLeftLong } from 'react-icons/fa6';

interface PageHeaderProps {
  title: string;
  onBack: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, onBack }) => {
  return (
    <span className="text-xl font-semibold flex items-center space-x-2">
      <FaLeftLong className="cursor-pointer" onClick={onBack} />
      <span className="px-2">{title}</span>
    </span>
  );
};

export default PageHeader