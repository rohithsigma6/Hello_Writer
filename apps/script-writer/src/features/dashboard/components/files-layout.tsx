import { FaThList } from 'react-icons/fa';
import { IoGrid } from 'react-icons/io5';
import { FileTable } from './file-table';
import FileList from './file-list';
import Select from '@/components/ui/select/custom-select';
import { FileI } from '@/app/routes/dashboard/dashboard';
import { useState } from 'react';

const FilesLayout = ({ files }: { files: FileI[] }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [fileSortCriteria, setFileSortCriteria] = useState('namea-z');

  const sortOptions = [
    { value: 'namea-z', label: 'By Name A-Z' },
    { value: 'namez-a', label: 'By Name Z-A' },
    { value: 'lastModified', label: 'Last Modified' },
    { value: 'date', label: 'First Created' },
  ];
  return (
    <div className="mx-6 mb-6">
      <section
        className={
          'w-full bg-white rounded-2xl py-[20px] px-[24px] flex flex-col gap-y-8'
        }
      >
        <header className="flex flex-row items-center justify-between w-full">
          <h1 className="text-lg text-text-500 font-bold m-0">Files</h1>
          <div className="filter_buttons flex flex-row gap-3">
            <button
              className={
                `${viewMode === 'table' ? 'bg-black text-white' : 'bg-white text-black'} ` +
                ' p-3 border border-gray-400 text-sm rounded-full transition'
              }
              onClick={() => setViewMode('table')}
            >
              <FaThList />
            </button>
            <button
              className={
                `${viewMode === 'grid' ? 'bg-black text-white' : 'bg-white text-black'} ` +
                ' p-3 border border-gray-400 text-sm rounded-full transition'
              }
              onClick={() => setViewMode('grid')}
            >
              <IoGrid />
            </button>

            <Select
              options={sortOptions}
              value={fileSortCriteria}
              onChange={(e) => setFileSortCriteria(e.target.value)}
              ariaLabel="Default select example"
            ></Select>
          </div>
        </header>
        {viewMode == 'grid' ? (
          <FileList ownedFiles={files} />
        ) : (
          <FileTable ownedFiles={files} />
        )}
      </section>
    </div>
  );
};

export default FilesLayout;
