import { Modal } from '@/components/ui/modal';
import React, { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';

interface FormatAssistantModelProps {
  isOpen: boolean;
  onClose: () => void;
}

const checkboxSections = [
  {
    title: 'Elements should:',
    options: ['Not start with blank space', 'Not be empty'],
  },
  {
    title: 'Action should:',
    options: ['Not start with blank space', 'Not be empty'],
  },
  {
    title: 'Characters should:',
    options: ['Have dialogue', 'Precede a dialogue', 'Not have consecutive dialogues'],
  },
  {
    title: 'Dialogue/Dual Dialogue should:',
    options: ['Not contain ()', 'Succeed a character or Parenthetical'],
  },
  {
    title: 'Parenthetical should:',
    options: ['Contain text'],
  },
  {
    title: 'Superimpose should:',
    options: ['Contain text'],
  },
  {
    title: 'Others:',
    options: ['Character Typo', 'Similar names', 'Extra Spacing'],
  },
];

const FormatAssistantModel: React.FC<FormatAssistantModelProps> = ({ isOpen, onClose }) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const toggleCheck = (key: string) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = () => {
    const selected = Object.entries(checkedItems)
      .filter(([_, checked]) => checked)
      .map(([key]) => key);
    console.log("Checked items:", selected);
    // You can use `selected` array for submission
  };

  return (
    <div
      onClick={onClose}
      className="p-10 z-50 w-full h-full fixed top-0 left-0 right-0 bg-[#0000004f] overflow-auto font-poppins flex justify-center"
    >
      <div onClick={(e) => e.stopPropagation()} className='bg-white max-w-2xl w-full h-fit rounded-2xl'>
        {/* Header */}
        <div className="flex justify-between pl-9 pr-6 py-6 items-center border-b border-b-[#00000036]">
          <h2 className="text-xl font-bold text-[#000]">Format Assistant</h2>
          <button
            className="hover:bg-black hover:text-white transition-colors rounded-full p-1"
            onClick={onClose}
          >
            <IoCloseSharp className="text-lg" />
          </button>
        </div>

        {/* Body */}
        <div className="pl-9 pr-6 pt-6">
          <h3 className="text-[#000] font-semibold">Rule Violation:</h3>
          <p className="text-[#4D4D5A] font-normal mb-4">
            Characters should not speak twice in a row without a different element separating the dialogues.
          </p>

          <h3 className="text-[#000] font-semibold">Correction:</h3>
          <p className="text-[#4D4D5A] font-normal">Must be fixed manually.</p>

          <div className="border-b border-b-[#00000036] my-6" />

          <div className="flex flex-wrap gap-y-6">
            {checkboxSections.map((section, idx) => (
              <div key={idx} className="w-1/2">
                <p className="text-[#4D4D5A] font-normal mb-4">{section.title}</p>
                {section.options.map((option, i) => {
                  const key = `${section.title}::${option}`;
                  return (
                    <div className="flex items-center mb-2" key={key}>
                      <input
                        type="checkbox"
                        className="custom-primary-checkbox"
                        checked={!!checkedItems[key]}
                        onChange={() => toggleCheck(key)}
                      />
                      <span className="text-[#4D4D5A] font-normal ps-2">{option}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <button className="mb-6 rounded-[8px] min-w-[129px] text-gray-500 hover:bg-gray-500 hover:text-white transition-colors font-normal py-[7.5px] px-[38px] border border-[#00000026] max-w-[129px] mt-4">
            Options
          </button>
        </div>

        {/* Footer */}
        <div className="flex justify-end py-[12px] border-t border-t-[#00000036]">
          <button
            onClick={onClose}
            className="w-1/4 rounded-xl text-gray-500 hover:bg-gray-500 hover:text-white transition-colors font-medium py-2 px-2 border border-[#9999A0] mr-2"
          >
            Ignore
          </button>
          <button
            className="w-1/4 rounded-xl text-gray-500 hover:bg-gray-500 hover:text-white transition-colors font-medium py-2 px-2 border border-[#9999A0] mr-2"
            onClick={handleSubmit}
          >
            Next
          </button>
          <button
            className="py-[18px] mr-6 w-1/4 rounded-xl bg-[#653EFF] hover:bg-[#5835e3] transition-colors text-white"
            onClick={handleSubmit}
          >
            Fix
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormatAssistantModel;
