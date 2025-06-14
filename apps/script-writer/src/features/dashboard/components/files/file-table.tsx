import { useNavigate } from 'react-router';
import { File } from '@/types/api';
import { useState } from 'react';
import { useRenameFile } from '../../api/rename-file';
import { useDeleteFile } from '../../api/delete-file';
import { useDuplicateFile } from '../../api/duplicate-file';
import DeleteModal from '../delete-modal';
import RenameModal from '../rename-modal';
import { useSnackbar } from 'notistack';
import { MoveToFolderModal } from '../move-to-folder-modal';
import { useArchiveFile } from '../../api/archive-file';
import { useTrashFile } from '../../api/trash-file';
import { useFiles } from '../../api/get-files';
import { FileTableChild } from './file-table-child';

export const FileTable = ({ ownedFiles }: { ownedFiles: File[] }) => {
  const [file, setFile] = useState<File | null>(null);
  const fileDropdownOptions = [
    'Open',
    'Duplicate',
    'Rename',
    'Delete',
    'Move file to folder',
    'Archive',
    'Trash',
  ];
  const navigate = useNavigate();
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [moveToFolderModalOpen, setMoveToFolderModalOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const fileQuery = useFiles();

  const { mutate: handleDuplicateFile } = useDuplicateFile({
    mutationConfig: {
      onSuccess: () => {
        fileQuery.refetch();
        enqueueSnackbar('File duplicated successfully.', {
          variant: 'success',
        });
      },
      onError: () => {
        fileQuery.refetch();
        enqueueSnackbar('Failed to duplicate the file.', { variant: 'error' });
      },
    },
  });

  const { mutate: handleDeleteFile } = useDeleteFile({
    mutationConfig: {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        enqueueSnackbar('File deleted successfully.', { variant: 'success' });
      },
      onError: () => {
        setIsDeleteModalOpen(false);
        enqueueSnackbar('Failed to delete the file.', { variant: 'error' });
      },
    },
  });

  const { mutate: handleRenameFile } = useRenameFile({
    mutationConfig: {
      onSuccess: () => {
        setIsRenameModalOpen(false);
        enqueueSnackbar('File renamed successfully.', { variant: 'success' });
      },
      onError: () => {
        setIsRenameModalOpen(false);
        enqueueSnackbar('Failed to rename the file.', { variant: 'error' });
      },
    },
  });

  const { mutate: handleArchiveFile } = useArchiveFile({
    mutationConfig: {
      onSuccess: () => {
        fileQuery.refetch();
        enqueueSnackbar('File archived successfully.', { variant: 'success' });
      },
      onError: () => {
        fileQuery.refetch();
        enqueueSnackbar('Failed to archive the file. Please try again.', {
          variant: 'error',
        });
      },
    },
  });

  const { mutate: handleTrashFile } = useTrashFile({
    mutationConfig: {
      onSuccess: () => {
        fileQuery.refetch();
        enqueueSnackbar('File moved to trash.', { variant: 'success' });
      },
      onError: () => {
        fileQuery.refetch();
        enqueueSnackbar('Uh-oh! Couldn"t move the file to trash.', {
          variant: 'error',
        });
      },
    },
  });

  const handleOptionClick = (option: string) => {
    switch (option) {
      case 'Open':
        navigate(`/file/${file?._id}/screenplay`, {
          state: { fileDetails: file },
        });
        break;
      case 'Duplicate':
        handleDuplicateFile({ fileId: file?._id });
        break;
      case 'Rename':
        setIsRenameModalOpen(true);
        break;
      case 'Delete':
        setIsDeleteModalOpen(true);
        break;
      case 'Move file to folder':
        setMoveToFolderModalOpen(true);
        break;
      case 'Archive':
        handleArchiveFile({ fileId: file?._id });
        break;
      case 'Trash':
        handleTrashFile({ fileId: file?._id });
        break;
      default:
        break;
    }
  };
  const handleRenameSubmit = async (
    e: React.FormEvent,
    updatedName: string,
  ) => {
    e.preventDefault();

    if (file) {
      handleRenameFile({ updatedName, fileId: file?._id });
    }
  };

  const handleDelete = async () => {
    try {
      if (!file) return;
      handleDeleteFile({ fileId: file?._id });
    } catch (error) {
      console.error('Error deleting file', error);
    }
  };
  return (
    <div className="grid grid-cols-1">
      <table className="w-full border-collapse">
        <thead className="bg-[#F9FAFB]">
          <tr>
            <th className="font-bold text-left p-4 align-top text-xs text-[#667085]">
              File Name
            </th>
            <th className="font-bold text-xs text-left p-4 align-top">About</th>
            <th className="font-bold text-xs text-left p-4 align-top">
              Screenplay
            </th>
            <th className="font-bold text-xs text-left p-4 align-top">
              Collaborators
            </th>
            <th className="font-bold text-xs text-left p-4 align-top">
              Progress
            </th>
            <th className="font-bold text-xs text-left p-4 align-top">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {ownedFiles?.map((file, index) => (
            <FileTableChild
              file={file}
              handleOptionClick={handleOptionClick}
              fileDropdownOptions={fileDropdownOptions}
              setFile={setFile}
            />
          ))}
        </tbody>
      </table>
      {isRenameModalOpen && (
        <RenameModal
          {...{
            setIsRenameModalOpen,
            isRenameModalOpen,
            handleRenameSubmit,
            type: 'File',
            initialName: file?.title,
          }}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          {...{
            setIsDeleteModalOpen,
            isDeleteModalOpen,
            handleDelete,
            fileTitle: file?.title,
            type: 'File',
          }}
        />
      )}

      {/* Restore Modal */}
      {moveToFolderModalOpen && file && (
        <MoveToFolderModal
          isOpen={moveToFolderModalOpen}
          onClose={() => setMoveToFolderModalOpen(false)}
          file={file}
          enqueueSnackbar={enqueueSnackbar}
        />
      )}
    </div>
  );
};
