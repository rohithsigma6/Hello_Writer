import { useState } from 'react';
import { FolderItem } from './folder-item';
import AddFolderIcon from '@/assets/landingsite/AddFolder.svg';
import Select from '@/components/ui/select/custom-select';

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
const dummyFolders: FolderItemI[] = [
  {
    _id: '1',
    title: 'Project Alpha',
    Files: [
      {
        _id: 'file1',
        name: 'script1.js',
        createdAt: '2023-10-01T10:00:00Z',
        updatedAt: '2023-10-05T12:00:00Z',
      },
      {
        _id: 'file2',
        name: 'script2.js',
        createdAt: '2023-10-02T11:00:00Z',
        updatedAt: '2023-10-06T13:00:00Z',
      },
    ],
    createdAt: '2023-10-01T09:00:00Z',
    updatedAt: '2023-10-05T11:00:00Z',
  },
  {
    _id: '2',
    title: 'Project Beta',
    Files: [
      {
        _id: 'file3',
        name: 'script3.js',
        createdAt: '2023-09-15T08:00:00Z',
        updatedAt: '2023-09-20T10:00:00Z',
      },
      {
        _id: 'file4',
        name: 'script4.js',
        createdAt: '2023-09-16T09:00:00Z',
        updatedAt: '2023-09-21T11:00:00Z',
      },
    ],
    createdAt: '2023-09-15T07:00:00Z',
    updatedAt: '2023-09-20T09:00:00Z',
  },
  {
    _id: '3',
    title: 'Project Gamma',
    Files: [
      {
        _id: 'file5',
        name: 'script5.js',
        createdAt: '2023-08-10T14:00:00Z',
        updatedAt: '2023-08-15T16:00:00Z',
      },
      {
        _id: 'file6',
        name: 'script6.js',
        createdAt: '2023-08-11T15:00:00Z',
        updatedAt: '2023-08-16T17:00:00Z',
      },
    ],
    createdAt: '2023-08-10T13:00:00Z',
    updatedAt: '2023-08-15T15:00:00Z',
  },
];

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

const FolderGrid = () => {
  const [folderSortCriteria, setFolderSortCriteria] = useState('name');
  const sortedFolders = dummyFolders.sort((a, b) => {
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
  return (
    <section className={'px-[32px] py-[28px] w-full flex flex-col'}>
      <header className="flex flex-row items-center justify-between w-full mb-[16px]">
        <h1 className="text-lg text-text-500 font-bold m-0">Folders</h1>
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
      </header>

      <div className="gap-5 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 my-folder-wrappers">
        {sortedFolders && sortedFolders.length > 0 ? (
          sortedFolders.map((folder, index: number) => (
            <FolderItem folder={folder} key={folder._id} />
          ))
        ) : (
          <div className="text-center col-span-full flex flex-col items-center space-y-4 mb-10">
            <img src={AddFolderIcon} alt="No folders" className="w-24 h-24" />
            <h2 className="text-xl font-semibold">Create New Project Folder</h2>
            <p className="text-gray-600">
              Create a new project folder to start adding screenplay files.
            </p>
            <button className=" px-4 py-3 mb-2 flex items-center justify-center gap-2 text-center text-sm font-semibold text-white bg-primary-blue hover:bg-blue-700 transition-colors duration-300 rounded-lg">
              Create Folder
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FolderGrid;
