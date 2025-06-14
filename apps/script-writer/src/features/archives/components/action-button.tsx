import { RotateCcw, Trash } from 'lucide-react';
import { useState } from 'react';
import { DeleteModal } from '../modal/delete-modal';
import { RestoreModal } from '../modal/restore-modal';
import { useDashboardStore } from '@/store/editor';
import { useArchiveFolders } from '../api/get-archive-folders';
import { useArchiveFiles } from '../api/get-archive-files';
import { useTrashFolders } from '../api/get-trash-folders';
import { useTrashFiles } from '../api/get-trash-files';
import { useRestoreArchiveFolders } from '../api/restore-archive-folders';
import { useRestoreArchiveFiles } from '../api/restore-archive-files';
import { useRestoreTrashFolders } from '../api/restore-trash-folders';
import { useRestoreTrashFiles } from '../api/restore-trash-files';
import { useDeleteFolders } from '../api/delete-folders';
import { useDeleteFiles } from '../api/delete-files';
import { useSnackbar } from 'notistack';

type Props = {
  type: 'archive' | 'trash';
};

const ActionButtons = ({ type }: Props) => {
  const buttons = [
    { id: 'delete', label: 'Delete', icon: Trash },
    { id: 'restore', label: 'Restore', icon: RotateCcw }, // Note: Should likely use a different icon for "Restore"
  ];
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState<boolean>(false);
  const {
    foldersChecked,
    filesChecked,
    updateFoldersChecked,
    updateFilesChecked,
  } = useDashboardStore((state) => state);
  const isDisabled = !foldersChecked.length && !filesChecked.length;
  const foldersQuery = useArchiveFolders();
  const filesQuery = useArchiveFiles();
  const trashFoldersQuery = useTrashFolders();
  const trashFilesQuery = useTrashFiles();
  const [restoreSuccess, setRestoreSuccess] = useState<boolean>(false);
  const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: handleDeleteFolders, isPending: d1 } = useDeleteFolders({
    mutationConfig: {
      onSuccess: () => {
        if (type === 'archive') {
          foldersQuery.refetch();
          setDeleteSuccess(true);
        } else {
          trashFoldersQuery.refetch();
          setDeleteSuccess(true);
        }
        enqueueSnackbar('Folders deleted successfully.', {
          variant: 'success',
        });
      },
      onError: () => {
        type === 'archive'
          ? foldersQuery.refetch()
          : trashFoldersQuery.refetch();
        enqueueSnackbar('Failed to delete the folders.', { variant: 'error' });
      },
    },
  });

  const { mutate: handleDeleteFiles, isPending: d2 } = useDeleteFiles({
    mutationConfig: {
      onSuccess: () => {
        if (type === 'archive') {
          filesQuery.refetch();
          setDeleteSuccess(true);
        } else {
          trashFilesQuery.refetch();
          setDeleteSuccess(true);
        }
        enqueueSnackbar('Files deleted successfully.', { variant: 'success' });
      },
      onError: () => {
        type === 'archive' ? filesQuery.refetch() : trashFilesQuery.refetch();
        enqueueSnackbar('Failed to delete the files.', { variant: 'error' });
      },
    },
  });

  const { mutate: handleRestoreFolders, isPending: p1 } =
    useRestoreArchiveFolders({
      mutationConfig: {
        onSuccess: () => {
          foldersQuery.refetch();
          setRestoreSuccess(true);
          enqueueSnackbar('Folders restored successfully.', {
            variant: 'success',
          });
        },
        onError: () => {
          foldersQuery.refetch();
          enqueueSnackbar('Failed to restore the folders.', {
            variant: 'error',
          });
        },
      },
    });

  const { mutate: handleRestoreFiles, isPending: p2 } = useRestoreArchiveFiles({
    mutationConfig: {
      onSuccess: () => {
        filesQuery.refetch();
        setRestoreSuccess(true);
        enqueueSnackbar('Files restored successfully.', { variant: 'success' });
      },
      onError: () => {
        filesQuery.refetch();
        enqueueSnackbar('Failed to restore the files.', { variant: 'error' });
      },
    },
  });

  const { mutate: handleRestoreTrashFolders, isPending: p3 } =
    useRestoreTrashFolders({
      mutationConfig: {
        onSuccess: () => {
          trashFoldersQuery.refetch();
          setRestoreSuccess(true);
          enqueueSnackbar('Folders restored successfully.', {
            variant: 'success',
          });
        },
        onError: () => {
          trashFoldersQuery.refetch();
          enqueueSnackbar('Failed to restore the folders.', {
            variant: 'error',
          });
        },
      },
    });

  const { mutate: handleRestoreTrashFiles, isPending: p4 } =
    useRestoreTrashFiles({
      mutationConfig: {
        onSuccess: () => {
          trashFilesQuery.refetch();
          setRestoreSuccess(true);
          enqueueSnackbar('Files restored successfully.', {
            variant: 'success',
          });
        },
        onError: () => {
          trashFilesQuery.refetch();
          enqueueSnackbar('Failed to restore the files.', { variant: 'error' });
        },
      },
    });

  const handleDelete = () => {
    if (foldersChecked.length) {
      const mappedIds = foldersChecked.map((folder) => folder._id);
      handleDeleteFolders(mappedIds);
    }
    if (filesChecked.length) {
      const mappedIds = filesChecked.map((file) => file._id);
      handleDeleteFiles(mappedIds);
    }
  };

  const handleDeleteSuccess = () => {
    updateFoldersChecked([]);
    updateFilesChecked([]);
    setDeleteSuccess(false);
    setIsDeleteModalOpen(false);
  };

  const handleRestore = () => {
    if (type === 'archive') {
      if (foldersChecked.length) {
        const mappedIds = foldersChecked.map((folder) => folder._id);
        handleRestoreFolders(mappedIds);
      }
      if (filesChecked.length) {
        const mappedIds = filesChecked.map((file) => file._id);
        handleRestoreFiles(mappedIds);
      }
    }
    if (type === 'trash') {
      if (foldersChecked.length) {
        const mappedIds = foldersChecked.map((folder) => folder._id);
        handleRestoreTrashFolders(mappedIds);
      }
      if (filesChecked.length) {
        const mappedIds = filesChecked.map((file) => file._id);
        handleRestoreTrashFiles(mappedIds);
      }
    }
  };

  const handleRestoreSuccess = () => {
    updateFoldersChecked([]);
    updateFilesChecked([]);
    setRestoreSuccess(false);
    setIsRestoreModalOpen(false);
  };

  const handleButtonAction = (id: string) => {
    if (id === 'delete') {
      setIsDeleteModalOpen(true);
    }

    if (id === 'restore') {
      setIsRestoreModalOpen(true);
    }
  };

  return (
    <div className="flex space-x-6">
      {buttons.map((button) => (
        <button
          key={button.id}
          className={`px-4 py-2 font-bold border border-gray-900 flex items-center space-x-2 rounded-lg hover:bg-gray-900 hover:text-white transition-colors ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => handleButtonAction(button.id)}
          disabled={isDisabled}
        >
          {button.icon && <button.icon size={20} />}
          <span>{button.label}</span>
        </button>
      ))}

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDelete}
        deleteSuccess={deleteSuccess}
        handleDeleteSuccess={() => handleDeleteSuccess()}
        loading={d1 || d2}
      />

      {/* Restore Modal */}
      <RestoreModal
        isOpen={isRestoreModalOpen}
        onClose={() => setIsRestoreModalOpen(false)}
        onRestore={handleRestore}
        restoreSuccess={restoreSuccess}
        handleRestoreSuccess={() => handleRestoreSuccess()}
        loading={p1 || p2 || p3 || p4}
      />
    </div>
  );
};

export default ActionButtons;
