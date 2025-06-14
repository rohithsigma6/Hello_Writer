import type { OwnedFolder } from '../navigation/left-sidebar';
import { FaAngleDown, FaAngleRight, FaFolder } from 'react-icons/fa6';
import { IoFolderOpen } from 'react-icons/io5';
import { MdInsertDriveFile } from 'react-icons/md';
import { Link, useNavigate } from 'react-router';
import { FormEvent, useState } from 'react';
import { CustomDropdown } from '@/components/ui/dropdown';
import DeleteModal from '../delete-modal';
import RenameModal from '../rename-modal';
import { Folder } from '@/types/api';
import { useDuplicateFolder } from '@/features/dashboard/api/duplicate-folder';
import { useDeleteFolder } from '@/features/dashboard/api/delete-folder';
import { useRenameFolder } from '@/features/dashboard/api/rename-folder';
import { useArchiveFolder } from '../../api/archive-folder';
import { useFolders } from '../../api/get-folders';
import { useTrashFolder } from '../../api/trash-folder';
import { useSnackbar } from 'notistack';
import ShareFolderPopup from '@/components/layouts/file-layout/models/file-folder-popup';
interface SidebarFolderItemProps {
  folder: OwnedFolder;
  isOpen: boolean;
  onToggle: () => void;
}

export const SidebarFolderItem: React.FC<SidebarFolderItemProps> = ({
  folder,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="w-full folder-wrapper-line">
      <div
        className="flex flex-row items-center cursor-pointer justify-between"
        onClick={onToggle}
      >
        <div className="flex flex-row items-center gap-2">
          {isOpen ? <FaAngleDown /> : <FaAngleRight />}
          {isOpen ? (
            <IoFolderOpen className="text-slate-400 text-lg" />
          ) : (
            <FaFolder className="text-slate-400 text-lg" />
          )}
          <p className="font-medium text-text-500">{folder.title}</p>
        </div>
        <div className="w-[24px] h-[24px] rounded-full bg-[#80D1A7] text-center text-[14px] flex justify-center items-center">
          <p className="font-semibold">{folder.Files.length}</p>
        </div>
      </div>
      {isOpen && (
        <div className="ml-6 mt-2 flex flex-col">
          {folder.Files.map((file, fileIndex) => (
            <div key={fileIndex} className="flex items-center gap-2">
              <MdInsertDriveFile className="text-slate-500" />
              <Link
                to={`/file/${file._id}/screenplay`}
                className="text-slate-700 hover:underline"
              >
                {file.title}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

interface FolderItemProps {
  folder: Folder;
}

export const FolderItem = ({ folder }: FolderItemProps) => {
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [shareFolderPopupOpen, setShareFolderPopupOpen] = useState(false);
  const dropdownOptions = [
    'Open',
    'Duplicate',
    'Share',
    'Rename',
    'Delete',
    'Archive',
    'Trash',
  ];
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const folderQuery = useFolders();

  const { mutate: handleFolderDuplicate } = useDuplicateFolder({
    mutationConfig: {
      onSuccess: () => {
        folderQuery.refetch();
        enqueueSnackbar('Folder duplicated successfully.', {
          variant: 'success',
        });
      },
      onError: () => {
        folderQuery.refetch();
        enqueueSnackbar('Failed to duplicate the folder.', {
          variant: 'error',
        });
      },
    },
  });

  const { mutate: handleDeleteFolder } = useDeleteFolder({
    mutationConfig: {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        enqueueSnackbar('Folder deleted successfully.', { variant: 'success' });
      },
      onError: () => {
        setIsDeleteModalOpen(false);
        enqueueSnackbar('Failed to delete the folder.', { variant: 'error' });
      },
    },
  });

  const { mutate: handleUpdateFolder } = useRenameFolder({
    mutationConfig: {
      onSuccess: () => {
        setIsRenameModalOpen(false);
        enqueueSnackbar('Folder renamed successfully.', { variant: 'success' });
      },
      onError: () => {
        setIsRenameModalOpen(false);
        enqueueSnackbar('Failed to rename the folder.', { variant: 'error' });
      },
    },
  });

  const { mutate: handleArchiveFolder } = useArchiveFolder({
    mutationConfig: {
      onSuccess: () => {
        folderQuery.refetch();
        enqueueSnackbar('Folder archived successfully.', {
          variant: 'success',
        });
      },
      onError: () => {
        folderQuery.refetch();
        enqueueSnackbar('Failed to archive the folder. Please try again.', {
          variant: 'error',
        });
      },
    },
  });

  const { mutate: handleTrashFolder } = useTrashFolder({
    mutationConfig: {
      onSuccess: () => {
        folderQuery.refetch();
        enqueueSnackbar('Folder moved to trash.', { variant: 'success' });
      },
      onError: () => {
        folderQuery.refetch();
        enqueueSnackbar('Uh-oh! Couldn"t move the folder to trash.', {
          variant: 'error',
        });
      },
    },
  });

  const handleDelete = () => {
    if (!folder) return;
    handleDeleteFolder({ folderId: folder._id });
  };
  const handleRenameSubmit = (e: FormEvent, updatedName: string) => {
    e.preventDefault();
    if (!folder) return;
    handleUpdateFolder({ folderId: folder._id, updatedName });
  };

  const handleOptionClick = (option: string) => {
    switch (option) {
      case 'Open':
        navigate(`/folder/${folder._id}`);
        break;
      case 'Delete':
        setIsDeleteModalOpen(true);
        break;
      case 'Share':
        setShareFolderPopupOpen(true);
        break;
      case 'Duplicate':
        handleFolderDuplicate({ folderId: folder._id });
        break;
      case 'Rename':
        setIsRenameModalOpen(true);
        break;
      case 'Archive':
        handleArchiveFolder({ folderId: folder._id });
        break;
      case 'Trash':
        handleTrashFolder({ folderId: folder._id });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between items-start bg-white rounded-[16px] p-[12px] border border-[#0000001A] my-folder-c-row">
        <Link to={`/folder/${folder._id}/`} state={{ folderDetails: folder }}>
          <section className="flex items-center gap-4">
            <div className="border border-[#FFC96F] p-2 rounded-xl h-[40px] w-[40px] flex justify-center items-center">
              <FaFolder className="text-[#FFC96F] text-lg" />
            </div>
            <div className="flex flex-col items-start m-0">
              <h1 className="text-base font-semibold m-0 text-text-500">
                {folder.title}
              </h1>
              <p className="text-sm text-text-200 font-normal mt-[4px]">
                {folder.Files.length} Scripts
              </p>
            </div>
          </section>
        </Link>

        <CustomDropdown
          options={dropdownOptions}
          handleOptionClick={handleOptionClick}
        />

        {isRenameModalOpen && (
          <RenameModal
            {...{
              isRenameModalOpen,
              setIsRenameModalOpen,
              handleRenameSubmit,
              type: 'Folder',
              initialName: folder.title,
            }}
          />
        )}

        {isDeleteModalOpen && (
          <DeleteModal
            {...{
              isDeleteModalOpen,
              setIsDeleteModalOpen,
              fileTitle: folder.title,
              handleDelete,
              type: 'Folder',
            }}
          />
        )}
              <ShareFolderPopup
                open={shareFolderPopupOpen}
                setOpen={setShareFolderPopupOpen}
                folderId={folder._id}
                folder={folder}
              />
      </div>
    </>
  );
};
