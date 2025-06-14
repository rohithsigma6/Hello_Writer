import { FaThList } from 'react-icons/fa';
import { IoGrid } from 'react-icons/io5';
import { FileTable } from './file-table';
import FileList from './file-list';
import Select from '@/components/ui/select/custom-select';
import { useMemo, useState } from 'react';
import { File } from '@/types/api';
import { CustomDropdown } from '@/components/ui/dropdown';
import CreateFileModal from './create-file-modal';
import { useNavigate, useParams } from 'react-router';
import { FaLeftLong } from 'react-icons/fa6';

const FilesLayout = ({
  filesData,
  emptyStateButton,
  folderTitle,
}: {
  filesData: File[];
  emptyStateButton: React.ReactNode;
  folderTitle?: string;
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [fileSortCriteria, setFileSortCriteria] = useState('namea-z');
  const { folderId } = useParams();
  const navigate = useNavigate();

  const sortOptions = [
    { value: 'namea-z', label: 'By Name A-Z' },
    { value: 'namez-a', label: 'By Name Z-A' },
    { value: 'lastModified', label: 'Last Modified' },
    { value: 'date', label: 'First Created' },
  ];

  const sortedFiles = useMemo(() => {
    return filesData?.sort((a, b) => {
      switch (fileSortCriteria) {
        case 'namea-z':
          return a.title.localeCompare(b.title);
        case 'namez-a':
          return b.title.localeCompare(a.title);
        case 'date':
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case 'lastModified':
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        default:
          return 0;
      }
    });
  }, [filesData, fileSortCriteria]);

  const folderOptions = [
    'Archive Folder',
    'Rename Folder',
    'Duplicate Folder',
    'Delete Folder',
  ];

  return (
    <div className="mx-6 mb-6">
      <section
        className={
          'w-full bg-white rounded-2xl py-[20px] px-[24px] flex flex-col gap-y-8'
        }
      >
        <header className="flex flex-row items-center justify-between w-full">
          {folderId && (
            <h1 className="text-xl font-bold flex items-center space-x-2">
              <FaLeftLong
                className="mr-2 cursor-pointer"
                onClick={() => {
                  navigate('/dashboard');
                }}
              />
              <span>{folderTitle}</span>
            </h1>
          )}

          {!folderId && (
            <h1 className="text-lg text-[#212131] font-bold m-0">Files</h1>
          )}
          {sortedFiles?.length > 0 && (
            <div className=" flex flex-row gap-3 items-center">
              <button
                className={
                  `${viewMode === 'table' ? 'bg-black text-white' : 'bg-white text-black'} ` +
                  ' p-3 border border-gray-400 text-sm rounded-full transition w-fit'
                }
                onClick={() => setViewMode('table')}
              >
                <FaThList />
              </button>
              <button
                className={
                  `${viewMode === 'grid' ? 'bg-black text-white' : 'bg-white text-black'} ` +
                  ' p-3 border border-gray-400 text-sm rounded-full transition w-fit'
                }
                onClick={() => setViewMode('grid')}
              >
                <IoGrid />
              </button>

              {!folderId ? (
                <Select
                  options={sortOptions}
                  value={fileSortCriteria}
                  onChange={(e) => setFileSortCriteria(e.target.value)}
                  ariaLabel="Default select example"
                ></Select>
              ) : (
                <>
                  <div className="flex items-center justify-center">
                    <CreateFileModal>
                      <button className="w-auto px-4 py-3 text-sm font-semibold text-white bg-primary-blue hover:bg-blue-700 transition-colors duration-300 rounded-lg whitespace-nowrap">
                        New File
                      </button>
                    </CreateFileModal>
                  </div>

                  <CustomDropdown
                    positionClass="[&>ul]:absolute [&>ul]:top-8 [&>ul]:right-[-15px] [&>ul]:mt-1 [&>ul]:w-48 [&>ul]:bg-black [&>ul]:text-white [&>ul]:rounded-md [&>ul]:shadow-lg [&>ul]:border [&>ul]:border-gray-200 [&>ul]:z-50"
                    options={folderOptions}
                    handleOptionClick={() => {}}
                  />
                </>
              )}
            </div>
          )}
        </header>
        {viewMode == 'grid' ? (
          <FileList
            emptyStateButton={emptyStateButton}
            ownedFiles={sortedFiles}
          />
        ) : (
          <FileTable ownedFiles={sortedFiles} />
        )}
      </section>
    </div>
  );
};

export default FilesLayout;
