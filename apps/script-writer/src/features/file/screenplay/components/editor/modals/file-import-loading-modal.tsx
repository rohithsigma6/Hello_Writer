import { FileUp } from 'lucide-react';

export const FileImportLoadingModal = ({ isOpen }: { isOpen: boolean }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999]">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md flex flex-col items-center">
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-100 rounded-full p-3 flex items-center">
            <FileUp className="w-12 h-12 text-indigo-500" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
          Unrolling Your Screenplay...
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          We're setting the stage - getting your screenplay ready!
        </p>
        <div className="relative w-32 h-32 mb-6 flex items-center justify-center">
          <div
            className="
              w-24 h-24 rounded-full border-8 border-dashed border-gray-300
              border-t-indigo-500 animate-spin
              duration-3000 ease-linear"
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-indigo-500/20 animate-pulse" />
          </div>
        </div>
        <p className="text-gray-700 text-center">
          Sit tight, we're preparing your document.
        </p>
      </div>
    </div>
  );
};
