import { useEffect, useState } from 'react';
import { RangeBar } from '@/components/ui/rangebar/rangebar';
import { CustomDropdown } from '@/components/ui/dropdown';
import { useNavigate } from 'react-router';
import { MdVerifiedUser } from 'react-icons/md';
import img1 from '@/assets/dashboard/contributers/img1.svg';
import projectTitle from '@/assets/dashboard/projectTitle.svg';
import img2 from '@/assets/dashboard/contributers/img2.svg';
import img3 from '@/assets/dashboard/contributers/img3.svg';
import img4 from '@/assets/dashboard/contributers/img4.svg';
import { customFormatDate } from '@/utils/format';
import AvatarGroup from '@/components/ui/avatar/avatar-group';
import FileInfo from '../files/file-info';
import RenameModal from '../rename-modal';
import DeleteModal from '../delete-modal';
import { File } from '@/types/api';
import { useDuplicateFile } from '@/features/dashboard/api/duplicate-file';
import { useDeleteFile } from '@/features/dashboard/api/delete-file';
import { useRenameFile } from '@/features/dashboard/api/rename-file';
import { MoveToFolderModal } from '../move-to-folder-modal';
import { useSnackbar } from 'notistack';
import { useFiles } from '../../api/get-files';
import { useArchiveFile } from '../../api/archive-file';
import { useTrashFile } from '../../api/trash-file';
import {
  calculatePercentage,
  getTextColorClass,
} from '@/components/ui/rangebar/helper';

export const avatars = [
  img1,
  img2,
  img3,
  img4,
  img2,
  img1,
  img3,
  img3,
  img1,
  img2,
];

export const FileItem = ({ file }: { file: File }) => {
  const [avatar, setAvatar] = useState<{ imgLink: string; username: string }[]>(
    [],
  );
  const { title, genre, writtenBy, logline, theme, updatedAt } = file;
  console.log("dada",file);
  
  const fileDropdownOptions = [
    'Open',
    'Duplicate',
    'Rename',
    'Delete',
    'Move file to folder',
    'Archive',
    'Trash',
  ];
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [moveToFolderModalOpen, setMoveToFolderModalOpen] = useState(false);
  const percentage = calculatePercentage(
    file?.currentPage || 0,
    file?.pagetarget || 120,
  );
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setAvatar(
      file?.collaborators?.map((item) => ({
        imgLink: item?.userId?.profile_image,
        username: item?.userId?.firstName + ' ' + item?.userId?.lastName,
      })),
    );
  }, [file]);

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
        navigate(`/file/${file._id}/screenplay`, {
          state: { fileDetails: file },
        });
        break;
      case 'Duplicate':
        handleDuplicateFile({ fileId: file._id });
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
        handleArchiveFile({ fileId: file._id });
        break;
      case 'Trash':
        handleTrashFile({ fileId: file._id });
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
      handleRenameFile({ updatedName, fileId: file._id });
    }
  };

  const handleDelete = async () => {
    try {
      if (!file) return;
      handleDeleteFile({ fileId: file._id });
    } catch (error) {
      console.error('Error deleting file', error);
    }
  };

  return (
    <div className="border border-[#E9E9EA] bg-white rounded-[20px] p-[16px] flex flex-col desh-bored-card-shadow my-files-c-row">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex justify-center items-center  w-[32px] h-[32px]">
            <img src={projectTitle} className="w-full h-full rounded-[8px]" />
          </div>

          <p className="font-bold text-lg text-light-black">{title}</p>
        </div>

        <CustomDropdown
          handleOptionClick={handleOptionClick}
          options={fileDropdownOptions}
        />
      </header>

      <div className="w-full h-[2px] bg-[#E9E9EA] my-[16px]"></div>
      <FileInfo {...{ file, genre, writtenBy, logline, theme ,avatar}}>
        <div className="flex flex-row gap-1 flex-wrap items-center">
          <p className="text-[#9999A0] font-medium text-xs">ScreenPlay </p>
          {['v1', 'Final', 'White'].map((screenplay: string, index: number) => (
            <div
              key={index}
              className="border border-black px-2 rounded-full font-medium text-xs"
            >
              • {screenplay}
            </div>
          ))}
        </div>
      </FileInfo>

      <section className="flex flex-row items-center gap-2 mt-[24px] mb-[16px] pr-6">
        <RangeBar percentage={percentage} />
        <p className={`font-bold text-xl ${getTextColorClass(percentage)}`}>
          {percentage}%
        </p>
      </section>

      <section className="flex flex-row justify-between items-center relative mb-[28px] pr-6">
        <AvatarGroup avatars={avatar} />

        <div className="inline-flex items-center px-2 py-1 gap-1 bg-primary-green text-white rounded-full">
          <MdVerifiedUser className="text-white" />
          <p className="text-sm">Secured</p>
        </div>
      </section>

      <p className="text-[#BABABF] text-xs pr-6">
        Last updated on{' '}
        <span className="text-[#BABABF]">{customFormatDate(updatedAt)}</span>
      </p>

      {isRenameModalOpen && (
        <RenameModal
          {...{
            setIsRenameModalOpen,
            isRenameModalOpen,
            handleRenameSubmit,
            type: 'File',
            initialName: file.title,
          }}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          {...{
            setIsDeleteModalOpen,
            isDeleteModalOpen,
            handleDelete,
            fileTitle: file.title,
            type: 'File',
          }}
        />
      )}

      {/* Restore Modal */}
      {moveToFolderModalOpen && (
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
