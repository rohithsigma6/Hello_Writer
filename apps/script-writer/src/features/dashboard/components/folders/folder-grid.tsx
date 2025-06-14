import { useMemo, useState } from 'react';
import { FolderItem } from './folder-item';

import Select from '@/components/ui/select/custom-select';
import { Folder, FoldersData } from '@/types/api';

export interface FileIt {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
export interface FolderItemI {
  _id: string;
  title: string;
  Files: FileIt[];
  createdAt: string;
  updatedAt: string;
}

const options = [
  {
    value: 'By Name A-Z',
    label: 'By Name A-Z',
  },
  {
    value: 'By Name Z-A',
    label: 'By Name Z-A',
  },
  {
    value: 'Last Modified',
    label: 'Last Modified',
  },
  {
    value: 'First Created',
    label: 'First Created',
  },
  {
    value: 'Script Count',
    label: 'Script Count',
  },
];

const FolderGrid = ({
  foldersData,
  emptyStateButton,
}: {
  foldersData: Folder[];
  emptyStateButton: React.ReactNode;
}) => {
  const [folderSortCriteria, setFolderSortCriteria] = useState('By Name A-Z');

  const sortedFolders = useMemo(() => {
    return foldersData.sort((a, b) => {
      switch (folderSortCriteria) {
        case 'By Name A-Z':
          return a.title.localeCompare(b.title);
        case 'By Name Z-A':
          return b.title.localeCompare(a.title);
        case 'First Created':
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case 'Last Modified':
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        case 'Script Count':
          return b.Files.length - a.Files.length;
        default:
          return 0;
      }
    });
  }, [folderSortCriteria, foldersData]);

  return (
    <section className={'px-[32px] py-[28px] w-full flex flex-col'}>
      <header className="flex flex-row items-center justify-between w-full mb-[16px]">
        <h1 className="text-lg text-[#212131] font-bold m-0">Folders</h1>
        {sortedFolders?.length > 0 && (
          <div className="flex flex-row items-center">
            <Select
              options={options}
              value={folderSortCriteria}
              onChange={(e) => setFolderSortCriteria(e.target.value)}
              ariaLabel="Sort folders by"
            />

            <div className="flex flex-row items-center relative">
              <button className="border border-[#653EFF] rounded-full px-4 py-2 text-sm ml-[12px] text-[#653EFF]">
                See more
              </button>
            </div>
          </div>
        )}
      </header>

      <div className="gap-5 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 my-folder-wrappers">
        {sortedFolders && sortedFolders.length > 0
          ? sortedFolders.map((folder, index: number) => (
              <FolderItem folder={folder} key={folder._id} />
            ))
          : emptyStateButton}
      </div>
    </section>
  );
};

export default FolderGrid;
