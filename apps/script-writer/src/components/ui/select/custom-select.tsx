import React from 'react';
import { FaAngleDown } from 'react-icons/fa6';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  className?: string;
  ariaLabel?: string;
  extraClass?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  className = '',
  ariaLabel = 'Select dropdown',
  extraClass,
}) => {
  return (
    <div className={`flex flex-row items-center relative`}>
      <select
        className={
          className
            ? className
            : `form-select appearance-none cursor-pointer select-arrow font-medium text-start flex flex-row gap-4 items-center border border-gray rounded-full px-4 py-2 pr-10 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${extraClass}`
        }
        value={value}
        onChange={onChange}
        aria-label={ariaLabel}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="text-start"
          >
            {option.label}
          </option>
        ))}
      </select>
      <FaAngleDown className="absolute mr-3 right-0 pointer-events-none" />
    </div>
  );
};

export default Select;
