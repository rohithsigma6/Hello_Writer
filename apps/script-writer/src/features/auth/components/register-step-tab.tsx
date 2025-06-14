import React from 'react';

interface TabStepProps {
  step: string;
  title: string;
  isActive: boolean;
}

export const TabStep: React.FC<TabStepProps> = ({ step, title, isActive }) => {
  const circleClasses = isActive
    ? 'md:w-10 w-10 md:h-10 h-10 md:text-base text-sm flex items-center justify-center bg-[#653EFF] text-white rounded-full mx-3'
    : 'md:w-10 w-10 md:h-10 h-10 md:text-base text-sm flex items-center justify-center border text-[#AFB8C7] rounded-full mx-3';

  const titleClasses = isActive
    ? 'text-[rgb(101,62,255)] font-medium text-center text-[16px] font-poppins'
    : 'text-[#AFB8C7] font-medium text-center text-[16px] font-poppins';

  return (
    <div className="flex md:flex-row flex-col md:gap-y-0 gap-y-2 justify-center items-center">
      <div className={circleClasses}>{step}</div>
      <span className={titleClasses}>{title}</span>
    </div>
  );
};

export const DashedDivider: React.FC = () => (
  <div className="border-t border-dashed sm:w-10 w-5 sm:mt-0 mt-3 border-[#AFB8C7] mx-3"></div>
);
