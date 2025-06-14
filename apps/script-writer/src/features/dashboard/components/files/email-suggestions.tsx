import React, { useEffect, useRef, useState } from 'react';
import Search from '@/assets/dashboard/Search.svg';

import { useSearchUser } from '@/features/users/api/search-users';
import useDebounce from '@/hooks/use-debounce';
import { SearchUser } from '@/types/api';

interface EmailSuggestProps {
  value: any;
  setValue: React.Dispatch<React.SetStateAction<any>>;
}

export function EmailSuggest({ value, setValue }: EmailSuggestProps) {
  const [options, updateOptions] = useState<SearchUser[]>([]);
  const [inputValue, setInputValue] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const { mutate: searchUser, data: users, error } = useSearchUser({});
  const debouncedInput = useDebounce(inputValue, 200);

  // Handle input changes and trigger the debounced user search.
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValue = e.target.value;
    setInputValue(newInputValue);
  };

  // When an option is clicked, update the selected value and clear the input/options.
  const handleOptionClick = (option: any) => {
    setValue(option);
    setInputValue(option.email);
    updateOptions([]);
  };
  useEffect(() => {
   if(value==null){
    setInputValue('')
   }
  }, [value])
  

  const showDropdown = options.length > 0;

  useEffect(() => {
    if (debouncedInput.trim().length > 0 && debouncedInput !== value?.email) {
      searchUser({ search: debouncedInput, fileId: '' });
    }
  }, [debouncedInput, searchUser]);

  useEffect(() => {
    if (users) {
      updateOptions([...users?.users]);
    }
  }, [users]);
  return (
    <div className="" ref={containerRef}>
      <div>
        <div className="relative w-full">
          <input
            value={inputValue}
            onChange={handleInputChange}
            className="w-full px-[14px] py-[18.5px] border border-[#00000011] rounded-[16px] text-[16px] font-medium c-form-input"
            placeholder="Add collaborator’s email"
          />
          <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <img
              src={Search}
              alt="Search icon"
              className="h-5 w-5 text-black border-black"
            />
          </span>
          {showDropdown && (
            <ul
              style={{
                transform: 'translateZ(0)',
              }}
              className="absolute text-black text-sm box-border p-1.5 my-3 mx-0 min-w-[320px] rounded-xl overflow-y-auto max-h-[300px] bg-white border border-solid border-gray-200 z-50"
            >
              {options.map((option, index) => (
                <li
                  key={option.email}
                  className="list-none p-2 rounded-lg cursor-pointer hover:bg-gray-100"
                  onMouseDown={(e) => e.preventDefault()} // Prevent input blur when clicking an option.
                  onClick={() => handleOptionClick(option)}
                >
                  <div className="flex">              
                    <div>
                      <p>{option.name}</p>
                      <p>{option.email}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
