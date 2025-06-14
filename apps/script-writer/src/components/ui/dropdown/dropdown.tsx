import { useState, useRef, useEffect } from 'react';
import { PiDotsThreeOutlineVerticalFill } from 'react-icons/pi';

interface DropdownProps {
  children?: React.ReactNode;
  options: string[];
  handleOptionClick: (option: string) => void;
  positionClass?: string;
}

export const CustomDropdown = ({
  children,
  options,
  handleOptionClick,
  positionClass,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section
      ref={dropdownRef}
      className="relative cursor-pointer drop-open-btn"
    >
      {children ? (
        <div onClick={toggleDropdown}>{children}</div>
      ) : (
        <PiDotsThreeOutlineVerticalFill onClick={toggleDropdown} />
      )}
      {isOpen && (
        <div
          className={`absolute top-0 right-10 rounded-lg shadow-lg  ${positionClass ? positionClass : 'custome-drop-down'}`}
        >
          <ul className="text-sm text-white">
            {options?.map((option) => (
              <li
                key={option}
                className="px-[12px] py-[10px] cursor-pointer transition-colors duration-200 hover:bg-black text-xs cu-li"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault()
                  handleOptionClick(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
