import { useEffect, useState } from 'react';
import { Check, ChevronDown, ChevronUp, X } from 'lucide-react';
import { useEditorStore } from '@/store/editor';

type Props = {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
};

export default function FindReplaceModal({ isOpen, setIsOpen }: Props) {
  const { editor, editorJson } = useEditorStore((state) => state);
  const [findText, setFindText] = useState(
    editor?.storage?.searchAndReplace?.searchTerm || '',
  );
  const [replaceText, setReplaceText] = useState(
    editor?.storage?.searchAndReplace?.replaceTerm || '',
  );
  const [replaceChecked, setReplaceChecked] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [totalMatches, setTotalMatches] = useState(0);
  const [matchIndex, setMatchIndex] = useState(0);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [matchWholeWord, setMatchWholeWord] = useState(false);
  const [preserveCaseOnReplace, setPreserveCaseOnReplace] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const goToSelection = () => {
    if (!editor) return;

    const { results, resultIndex } = editor.storage.searchAndReplace;
    const position = results[resultIndex];

    if (!position) return;

    setMatchIndex(resultIndex + 1);
    editor.commands.setTextSelection(position);

    const { node } = editor.view.domAtPos(editor.state.selection.anchor);
    node instanceof HTMLElement &&
      node.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleFindText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFindText(e.target.value);

    if (!editor) return;
    editor.commands.setSearchTerm(e.target.value);
    const { resultIndex } = editor.storage.searchAndReplace;
    const allMatches = document.getElementsByClassName('search-result');
    if (allMatches.length) {
      setMatchIndex(resultIndex + 1);
    } else {
      setMatchIndex(0);
    }
  };

  const handleReplaceText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReplaceText(e.target.value);

    if (!editor) return;
    editor.commands.setReplaceTerm(e.target.value);
  };

  const handleFindNext = () => {
    if (!editor) return;
    editor.commands.nextSearchResult();
    goToSelection();
  };

  const handleFindPrevious = () => {
    if (!editor) return;
    editor.commands.previousSearchResult();
    goToSelection();
  };

  const handleReplaceOne = () => {
    if (!editor) return;
    editor.commands.replace();
  };

  const handleReplaceAll = () => {
    if (!editor) return;
    editor.commands.replaceAll();
  };

  const handleCaseSensitive = () => {
    if (!editor) return;
    editor.commands.setCaseSensitive(!caseSensitive);
    setCaseSensitive(!caseSensitive);
  };

  const handleMatchWholeWord = () => {
    if (!editor) return;
    editor.commands.setMatchWholeWord(!matchWholeWord);
    setMatchWholeWord(!matchWholeWord);
  };

  const handlePreserveCaseOnReplace = () => {
    if (!editor) return;
    editor.commands.setPreserveCase(!preserveCaseOnReplace);
    setPreserveCaseOnReplace(!preserveCaseOnReplace);
  };

  // Update total matches list
  useEffect(() => {
    if (!document) return;
    const allMatches = document.getElementsByClassName('search-result');
    setTotalMatches(allMatches.length);
  }, [findText, editorJson]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center">
      <div className="bg-white rounded-2xl w-full max-w-md p-5 relative shadow-lg">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-700"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Find section */}
        <div className="flex items-center mt-6 mb-3">
          <div className="w-4 h-4 rounded border border-indigo-500 flex items-center justify-center mr-2">
            <Check className="text-indigo-500" size={14} />
          </div>
          <span className="text-gray-500 text-base font-normal">Find</span>
        </div>

        <div className="flex mb-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={findText}
              onChange={(e) => handleFindText(e)}
              className="w-full border border-gray-300 rounded-lg py-2 px-3 text-base"
              placeholder="Find text..."
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              {matchIndex}/{totalMatches}
            </div>
          </div>

          <div className="ml-2">
            <div className="border border-gray-300 rounded-lg flex flex-col">
              <button
                onClick={handleFindPrevious}
                className="py-1 px-3 flex items-center justify-center rounded-t-lg hover:bg-gray-300"
                aria-label="Previous match"
              >
                <ChevronUp size={12} />
              </button>
              <button
                onClick={handleFindNext}
                className="py-1 px-3 flex items-center justify-center rounded-b-lg hover:bg-gray-300"
                aria-label="Next match"
              >
                <ChevronDown size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* Replace section */}
        <div className="flex items-center mb-3">
          <div
            className="w-4 h-4 rounded border border-gray-300 flex items-center justify-center mr-2 cursor-pointer"
            onClick={() => setReplaceChecked(!replaceChecked)}
          >
            {replaceChecked && <Check className="text-indigo-500" size={14} />}
          </div>
          <span className="text-gray-500 text-base font-normal">Replace</span>
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={replaceText}
            onChange={(e) => handleReplaceText(e)}
            className="w-full border border-gray-300 rounded-lg py-2 px-3 text-base"
            placeholder="Replace with..."
            disabled={!replaceChecked}
          />
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-2 mb-4">
          <button
            onClick={handleReplaceOne}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-1.5 px-4 rounded-lg text-sm"
          >
            Replace one
          </button>
          <button
            onClick={handleReplaceAll}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-1.5 px-4 rounded-lg text-sm"
          >
            Replace all
          </button>
        </div>

        {/* Advanced button */}
        <div className="mb-3">
          <button
            onClick={() => setAdvancedOpen(!advancedOpen)}
            className="text-indigo-500 border border-indigo-500 rounded-full py-1 px-4 text-sm flex items-center"
          >
            Advanced
            {advancedOpen ? (
              <ChevronUp className="ml-1" size={14} />
            ) : (
              <ChevronDown className="ml-1" size={14} />
            )}
          </button>
        </div>

        {/* Advanced options */}
        <div
          className="w-full rounded-xl border border-gray-300 max-h-48 p-4 transition-all duration-500 overflow-y-auto"
          style={advancedOpen ? {} : { height: 0, display: 'none' }}
        >
          <div className="w-full flex flex-col gap-2">
            <div className="flex items-center">
              <div
                className="w-4 h-4 rounded border border-indigo-500 flex items-center justify-center mr-2 cursor-pointer"
                onClick={handleCaseSensitive}
              >
                {caseSensitive && (
                  <Check className="text-indigo-500" size={14} />
                )}
              </div>
              <span className="text-gray-500 text-sm font-normal">
                Case sensitive
              </span>
            </div>
            <div className="flex items-center">
              <div
                className="w-4 h-4 rounded border border-indigo-500 flex items-center justify-center mr-2 cursor-pointer"
                onClick={handleMatchWholeWord}
              >
                {matchWholeWord && (
                  <Check className="text-indigo-500" size={14} />
                )}
              </div>
              <span className="text-gray-500 text-sm font-normal">
                Match whole word only
              </span>
            </div>
            <div className="flex items-center">
              <div
                className="w-4 h-4 rounded border border-indigo-500 flex items-center justify-center mr-2 cursor-pointer"
                onClick={handlePreserveCaseOnReplace}
              >
                {preserveCaseOnReplace && (
                  <Check className="text-indigo-500" size={14} />
                )}
              </div>
              <span className="text-gray-500 text-sm font-normal">
                Preserve case on replace
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
