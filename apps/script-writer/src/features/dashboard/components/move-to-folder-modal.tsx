import { FilePlus } from 'lucide-react';
import { useFolders } from '../api/get-folders';
import { File, Folder } from '@/types/api';
import { useState } from 'react';
import { useAddFilesToFolder } from '../api/add-files-to-folder';
import { EnqueueSnackbar } from 'notistack';
import { useFiles } from '../api/get-files';

interface RestoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  file: File;
  enqueueSnackbar: EnqueueSnackbar;
}

export const MoveToFolderModal = ({
  isOpen,
  onClose,
  file,
  enqueueSnackbar,
}: RestoreModalProps) => {
  if (!isOpen) return null;
  const foldersQuery = useFolders();
  const filesQuery = useFiles();
  const isLoading = foldersQuery.isLoading;
  const folders = foldersQuery?.data?.folders?.OWNED || [];
  const [selectedFolder, setSelectedFolder] = useState<string>(
    folders[0]?._id || '',
  );
  const { mutate: handleAddFilesToFolder, isPending } = useAddFilesToFolder({
    mutationConfig: {
      onSuccess: () => {
        foldersQuery.refetch();
        filesQuery.refetch();
        onClose();
        enqueueSnackbar('File moved successfully.', { variant: 'success' });
      },
      onError: () => {
        enqueueSnackbar('Failed to move the file.', { variant: 'error' });
      },
    },
  });

  // Handle Add File
  const handleAddFile = () => {
    if (!selectedFolder || !file) return;
    handleAddFilesToFolder({
      folderId: selectedFolder,
      fileIds: [file._id],
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div
        className="bg-white rounded-3xl w-full max-w-md shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 flex flex-col items-center">
          {/* Heading */}
          <div className="w-full flex gap-2">
            {/* Add File icon */}
            <div className="h-fit w-fit bg-red-100 rounded-full p-4 mb-6">
              <FilePlus className="h-6 w-6 rounded-full" />
            </div>
            {/* Description */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800">Move File</h2>
              <p className="text-gray-400">
                Creating a new file allows users to generate and store content
                any other type of data.
              </p>
            </div>
          </div>

          {/* Items list */}
          <div className="rounded-xl w-full p-5">
            {/* File Name */}
            <div className="w-full flex flex-col gap-1 mb-6">
              <label className="text-base text-gray-500">File Name</label>
              <input
                type="text"
                className="w-full py-3 px-4 border border-gray-300 rounded-xl truncate"
                value={file.title}
                disabled
              />
            </div>
            {/* Folders List */}
            <div className="w-full flex flex-col gap-1 mb-2">
              <label className="text-base text-gray-500">Move to Folder</label>
              <select
                className="w-full py-3 px-4 border outline outline-gray-300 border-r-8 border-transparent rounded-xl truncate"
                disabled={isLoading}
                value={selectedFolder}
                onChange={(e) => setSelectedFolder(e.target.value)}
              >
                {folders &&
                  folders.map((folder: Folder) => (
                    <option key={folder.id} value={folder._id}>
                      {folder.title}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex w-full gap-4">
            <button
              onClick={onClose}
              className="flex-1 py-4 px-6 border border-gray-300 text-gray-500 rounded-xl font-medium"
              disabled={isLoading || isPending}
            >
              Cancel
            </button>
            <button
              onClick={handleAddFile}
              className="flex-1 py-4 px-6 bg-indigo-500 text-white rounded-xl font-medium"
              disabled={isLoading || isPending}
            >
              {isPending ? 'Moving...' : 'Move'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
