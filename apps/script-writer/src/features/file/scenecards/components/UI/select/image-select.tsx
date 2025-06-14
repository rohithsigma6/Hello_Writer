import { TransliterationLanguage } from "data/transliterationData";
import { useEffect, useState } from "react";
import { LiaLanguageSolid } from "react-icons/lia";



export default function ImageSelect({
  options = [],
  onChange,
  language

}: {
  options: TransliterationLanguage[];
  onChange: (op: TransliterationLanguage) => void;
  language:TransliterationLanguage | undefined
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  useEffect(() => {
    onChange(selectedOption);
  }, [selectedOption]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col items-center justify-center  w-[60px] py-1.5 bg-white rounded-lg border-[1px] border-[#d4d4d4]"
      >
        <LiaLanguageSolid />
        <p className="text-[8px]">{language?.label}</p>
      </button>

      {isOpen && (
        <div className="absolute w-52 mt-1 bg-white border rounded-lg shadow-lg z-10">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setSelectedOption(option);
                setIsOpen(false);
              }}
              className={`w-full p-2 text-left hover:bg-gray-100 ${option.value === language?.value ? " text-primary-blue " : 'text-black'}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
