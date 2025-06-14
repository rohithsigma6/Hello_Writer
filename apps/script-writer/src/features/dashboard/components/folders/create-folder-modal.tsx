import React, { FormEvent, useState } from 'react';

import { FaFolder } from 'react-icons/fa6';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';

import CreateFolderIcon from '@/assets/dashboard/side-bar-icon/create-folder.svg';
import { useCreateFolder } from '../../api/create-folder';
import { CreateFolderPayload } from '@/types/api';
import { useSnackbar } from 'notistack';

const CreateFolderModal = ({ isOpen, setIsOpen }: any) => {
  const [title, setTitle] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const { mutate: createFolder, isPending } = useCreateFolder({
    mutationConfig: {
      onSuccess: (res) => {
        setIsOpen(false);
        enqueueSnackbar('Folder created successfully.', { variant: 'success' });
      },
      onError: () => {
        enqueueSnackbar('Failed to create the folder.', { variant: 'error' });
      },
    },
  });

  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload: CreateFolderPayload = {
      title,
      // TODO = Dyanamic collabarators
      collaborators: [
        { userId: '671683cf8d8c978dedafd5f3', permissionType: 'VIEW' },
        { userId: '671683bf8d8c978dedafd5eb', permissionType: 'SUGGEST' },
        { userId: '671683c88d8c978dedafd5ef', permissionType: 'EDIT' },
      ],
    };

    createFolder({ data: payload });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTitle hidden></DialogTitle>
      <DialogContent className="bg-white p-6 shadow-md max-w-md h-auto ">
        <form className="" onSubmit={handleCreate}>
          <div className="pop-model-header flex justify-start">
            <img
              className="justify-self-end h-[48px] w-[48px]"
              src={CreateFolderIcon}
            />
            <div className="pop-model-header-right ml-[16px]">
              <h2 className="text-md font-bold text-[#212131] text-left">
                Create Folder
              </h2>
              <p className="text-sm text-[#9999A0] m-0 leading-17">
                Creating a new folder is a basic and essential task in file
                management
              </p>
            </div>
          </div>

          <div className="mt-[20px] mb-[16px]">
            <label
              className="block text-sm font-medium tracking-wider text-[#9999A0]"
              htmlFor="title"
            >
              Folder Name
            </label>
            <div className="relative pop-folder-input">
              <FaFolder className="text-slate-400 text-lg" />
              <input
                id="title"
                type="text"
                className="w-full py-[16px] border border-[#9999A0] rounded-[16px] mt-[6px] pl-[38px] font-medium"
                placeholder="Suttabaaz"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex justify-center">
            <DialogClose asChild>
              <button
                className='className="px-6 py-3 w-48 text-[#9999A0] bg-transparent border-solid border-[1px] border-[#9999A0] rounded-[16px] text-lg"'
                type="button"
                disabled={isPending}
              >
                Close
              </button>
            </DialogClose>
            <button
              type="submit"
              className="py-[18px] w-48 text-white bg-[#653EFF] rounded-[16px] text-[16px] ml-[8px]"
              disabled={isPending}
            >
              {isPending ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFolderModal;
