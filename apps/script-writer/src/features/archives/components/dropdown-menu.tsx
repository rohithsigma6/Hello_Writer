import { useRestoreArchiveFolders } from '../api/restore-archive-folders';
import { useArchiveFolders } from '../api/get-archive-folders';
import { useArchiveFiles } from '../api/get-archive-files';
import { useRestoreArchiveFiles } from '../api/restore-archive-files';
import { useTrashFolders } from '../api/get-trash-folders';
import { useTrashFiles } from '../api/get-trash-files';
import { useRestoreTrashFolders } from '../api/restore-trash-folders';
import { useRestoreTrashFiles } from '../api/restore-trash-files';
import { useDeleteFolders } from '../api/delete-folders';
import { useDeleteFiles } from '../api/delete-files';
import { useNavigate } from 'react-router';
import { paths } from '@/config/paths';
import { useSnackbar } from 'notistack';

type Props = {
  id: string;
  resourceType: 'FOLDER' | 'FILE';
  type: 'archive' | 'trash';
};

const menuItems = [
  {
    id: 'view',
    label: 'View',
    className: 'px-4 font-sm py-2 cursor-pointer',
  },
  {
    id: 'restore',
    label: 'Restore',
    className: 'px-4 font-sm py-2 cursor-pointer',
  },
  {
    id: 'delete',
    label: 'Delete Permanently',
    className: 'px-4 font-sm py-2 cursor-pointer text-red-500',
  },
];

const DropdownMenu = ({ id, resourceType, type }: Props) => {
  const foldersQuery = useArchiveFolders();
  const filesQuery = useArchiveFiles();
  const trashFoldersQuery = useTrashFolders();
  const trashFilesQuery = useTrashFiles();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: handleRestoreFolders } = useRestoreArchiveFolders({
    mutationConfig: {
      onSuccess: () => {
        foldersQuery.refetch();
        enqueueSnackbar('Folder restored successfully.', {
          variant: 'success',
        });
      },
      onError: () => {
        foldersQuery.refetch();
        enqueueSnackbar('Failed to restore the folder.', { variant: 'error' });
      },
    },
  });

  const { mutate: handleRestoreFiles } = useRestoreArchiveFiles({
    mutationConfig: {
      onSuccess: () => {
        filesQuery.refetch();
        enqueueSnackbar('File restored successfully.', { variant: 'success' });
      },
      onError: () => {
        filesQuery.refetch();
        enqueueSnackbar('Failed to restore the file.', { variant: 'error' });
      },
    },
  });

  const { mutate: handleRestoreTrashFolders } = useRestoreTrashFolders({
    mutationConfig: {
      onSuccess: () => {
        trashFoldersQuery.refetch();
        enqueueSnackbar('Folder restored successfully.', {
          variant: 'success',
        });
      },
      onError: () => {
        trashFoldersQuery.refetch();
        enqueueSnackbar('Failed to restore the folder.', { variant: 'error' });
      },
    },
  });

  const { mutate: handleRestoreTrashFiles } = useRestoreTrashFiles({
    mutationConfig: {
      onSuccess: () => {
        trashFilesQuery.refetch();
        enqueueSnackbar('File restored successfully.', { variant: 'success' });
      },
      onError: () => {
        trashFilesQuery.refetch();
        enqueueSnackbar('Failed to restore the file.', { variant: 'error' });
      },
    },
  });

  const { mutate: handleDeleteFolders } = useDeleteFolders({
    mutationConfig: {
      onSuccess: () => {
        type === 'archive'
          ? foldersQuery.refetch()
          : trashFoldersQuery.refetch();
        enqueueSnackbar('Folder deleted successfully.', { variant: 'success' });
      },
      onError: () => {
        type === 'archive'
          ? foldersQuery.refetch()
          : trashFoldersQuery.refetch();
        enqueueSnackbar('Failed to delete the folder.', { variant: 'error' });
      },
    },
  });

  const { mutate: handleDeleteFiles } = useDeleteFiles({
    mutationConfig: {
      onSuccess: () => {
        type === 'archive' ? filesQuery.refetch() : trashFilesQuery.refetch();
        enqueueSnackbar('File deleted successfully.', { variant: 'success' });
      },
      onError: () => {
        type === 'archive' ? filesQuery.refetch() : trashFilesQuery.refetch();
        enqueueSnackbar('Failed to delete the file.', { variant: 'error' });
      },
    },
  });

  // Handle Restore
  const handleRestore = (id: string) => {
    if (resourceType === 'FOLDER' && type === 'archive') {
      handleRestoreFolders([id]);
    } else if (resourceType === 'FOLDER' && type === 'trash') {
      handleRestoreTrashFolders([id]);
    } else if (resourceType === 'FILE' && type === 'archive') {
      handleRestoreFiles([id]);
    } else if (resourceType === 'FILE' && type === 'trash') {
      handleRestoreTrashFiles([id]);
    } else {
      return null;
    }
  };

  // Handle Delete
  const handleDelete = (id: string) => {
    switch (resourceType) {
      case 'FOLDER':
        handleDeleteFolders([id]);
        break;
      case 'FILE':
        handleDeleteFiles([id]);
        break;
      default:
        break;
    }
  };

  // Handle Navigate
  const handleNavigate = (id: string) => {
    if (resourceType === 'FOLDER') {
      navigate(paths.folder.root.getHref(id));
    }
    if (resourceType === 'FILE') {
      navigate(paths.file.screenplay.getHref(id));
    }
  };

  // Handle dropdown action
  const handleDropdownAction = (menuId: string) => {
    switch (menuId) {
      case 'view':
        handleNavigate(id);
        break;
      case 'restore':
        handleRestore(id);
        break;
      case 'delete':
        handleDelete(id);
        break;
      default:
        break;
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-max bg-black text-white border border-gray-300 shadow-lg z-10 rounded-tl-[30px] rounded-bl-[30px] rounded-br-[30px]">
      <ul className="py-2 text-left">
        {menuItems.map((item) => (
          <li
            key={item.id}
            className={item.className}
            onClick={() => handleDropdownAction(item.id)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;
