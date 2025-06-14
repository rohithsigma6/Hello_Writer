import {  useState } from 'react';
import { LiaLanguageSolid } from 'react-icons/lia';
import { transliterationLanguageData } from '@/features/file/screenplay/lib/content';
import { editorSelectors, useEditorStore } from '@/store/editor';

export default function LanguageSelector() {
  const currentLanguage = useEditorStore(
    editorSelectors.transliterationLanguage,
  );
  const setCurrentLanguage =
    useEditorStore.getState().updateTransliterationLanguage;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col items-center justify-center  w-[60px] py-1.5 bg-white rounded-lg border-[1px] border-[#d4d4d4]"
      >
        <LiaLanguageSolid />
        <p className="text-[8px]">{currentLanguage?.label}</p>
      </button>

      {isOpen && (
        <div className="absolute w-52 mt-1 bg-white border rounded-lg shadow-lg z-10">
          {transliterationLanguageData.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setCurrentLanguage(option);
                setIsOpen(false);
              }}
              className={`w-full p-2 text-left hover:bg-gray-100 ${option.value === currentLanguage?.value ? ' text-primary-blue ' : 'text-black'}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
