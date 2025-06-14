import { useDashboardStore } from '@/store/editor';
import { Check, Trash } from 'lucide-react';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  deleteSuccess: boolean;
  handleDeleteSuccess: () => void;
  loading: boolean;
}

export const DeleteModal = ({
  isOpen,
  onClose,
  onDelete,
  deleteSuccess,
  handleDeleteSuccess,
  loading,
}: DeleteModalProps) => {
  const { foldersChecked, filesChecked } = useDashboardStore((state) => state);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div
        className="bg-white rounded-3xl w-full max-w-md shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 flex flex-col items-center">
          {/* Trash icon */}
          {!deleteSuccess ? (
            <div className="bg-red-100 rounded-full p-4 mb-6">
              <Trash className="h-6 w-6 text-red-500" />
            </div>
          ) : (
            <div className="bg-green-100 rounded-full p-4 mb-6">
              <Check className="h-6 w-6 text-green-400" />
            </div>
          )}

          {/* Heading */}
          {!deleteSuccess ? (
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              {foldersChecked.length && filesChecked.length
                ? 'Are you sure you want to delete the selected items.'
                : ''}
              {foldersChecked.length && !filesChecked.length
                ? 'Are you sure you want to delete the selected folders?'
                : ''}
              {filesChecked.length && !foldersChecked.length
                ? 'Are you sure you want to delete the selected files?'
                : ''}
            </h2>
          ) : (
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              {foldersChecked.length && filesChecked.length
                ? 'Selected folders & files deleted successfully.'
                : ''}
              {foldersChecked.length && !filesChecked.length
                ? 'Folders deleted successfully.'
                : ''}
              {filesChecked.length && !foldersChecked.length
                ? 'Files deleted successfully.'
                : ''}
            </h2>
          )}

          {/* Items list */}
          <div className="bg-gray-100 rounded-xl w-full p-5 mb-6 min-h-28 max-h-28 overflow-y-auto">
            {/* Only folders */}
            {foldersChecked.length && !filesChecked.length
              ? foldersChecked.map((folder, index) => (
                  <div key={index} className="flex items-center py-2">
                    <svg
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 5C2 3.89543 2.89543 3 4 3H8.17157C8.70201 3 9.21071 3.21071 9.58579 3.58579L11 5H16C17.1046 5 18 5.89543 18 7V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V5Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                    <span>{folder.title}</span>
                  </div>
                ))
              : null}

            {/* Only files */}
            {filesChecked.length && !foldersChecked.length
              ? filesChecked.map((file, index) => (
                  <div key={index} className="flex items-center py-2">
                    <div className="h-5 w-5 mr-2 bg-red-200 rounded flex items-center justify-center text-xs text-red-500">
                      {file.title[0].toUpperCase()}
                    </div>
                    <span>{file.title}</span>
                  </div>
                ))
              : null}

            {/* Both folders and files */}
            {foldersChecked.length && filesChecked.length ? (
              <>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Folders
                </h3>
                {foldersChecked.map((folder, index) => (
                  <div key={index} className="flex items-center py-2">
                    <svg
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 5C2 3.89543 2.89543 3 4 3H8.17157C8.70201 3 9.21071 3.21071 9.58579 3.58579L11 5H16C17.1046 5 18 5.89543 18 7V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V5Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                    <span>{folder.title}</span>
                  </div>
                ))}

                <h3 className="text-lg font-semibold text-gray-700 mb-2 mt-4">
                  Files
                </h3>
                {filesChecked.map((file, index) => (
                  <div key={index} className="flex items-center py-2">
                    <div className="h-5 w-5 mr-2 bg-red-200 rounded flex items-center justify-center text-xs text-red-500">
                      {file.title[0].toUpperCase()}
                    </div>
                    <span>{file.title}</span>
                  </div>
                ))}
              </>
            ) : null}
          </div>

          {/* Action buttons */}
          <div className="flex w-full gap-4">
            {!deleteSuccess && !loading ? (
              <>
                <button
                  onClick={onClose}
                  className="flex-1 py-4 px-6 border border-gray-300 text-gray-500 rounded-xl font-medium"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={onDelete}
                  className="flex-1 py-4 px-6 bg-red-500 text-white rounded-xl font-medium"
                  disabled={loading}
                >
                  Delete
                </button>
              </>
            ) : (
              <button
                onClick={handleDeleteSuccess}
                className="flex-1 py-4 px-6 bg-indigo-500 text-white rounded-xl font-medium"
              >
                Done
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
