import React from 'react';
import projectTitle from '@/assets/dashboard/projectTitle.svg';
import DropdownMenu from './dropdown-menu'; // Adjust import path as needed
import { Pagination } from './pagination';
import { File } from '@/types/api';
import { useLocation } from 'react-router';
import { formatDate } from '../helper';
import { useDashboardStore } from '@/store/editor';

interface FileTableProps {
  files: File[];
  dropdownOpen: string | null;
  toggleDropdown: (id: string) => void;
  type: 'archive' | 'trash';
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const FileTable: React.FC<FileTableProps> = ({
  files,
  dropdownOpen,
  toggleDropdown,
  type,
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  const url = useLocation();
  const { filesChecked, updateFilesChecked } = useDashboardStore(
    (state) => state,
  );
  const tableHeaders = [
    { id: 'checkbox', label: '', width: 'py-2 px-2' },
    { id: 'name', label: 'File name', width: 'p-3' },
    { id: 'versions', label: 'Number of versions', width: 'p-3' },
    {
      id: 'date',
      label: url.pathname == '/archives' ? 'Archives Date' : 'Trash Date',
      width: 'p-3',
    },
    { id: 'location', label: 'File location', width: 'p-3' },
    { id: 'actions', label: '', width: 'p-3' },
  ];

  // Handle checkbox change
  const handleCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
    file: File,
  ) => {
    const { checked } = e.target;
    if (checked) {
      const isAlreadyChecked = filesChecked.some((f) => f._id === file._id);
      if (!isAlreadyChecked) {
        updateFilesChecked([...filesChecked, file]);
      }
    } else {
      const newCheckedFolders = filesChecked.filter((f) => f._id !== file._id);
      updateFilesChecked(newCheckedFolders);
    }
  };

  // Handle select all
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    if (checked) {
      updateFilesChecked(files);
    } else {
      updateFilesChecked([]);
    }
  };

  return (
    <>
      <table className="w-full text-left mb-6">
        <thead>
          <tr className="bg-gray-100">
            {tableHeaders.map((header) => (
              <th key={header.id} className={header.width}>
                {header.id === 'checkbox' && files.length ? (
                  <input
                    type="checkbox"
                    checked={filesChecked.length === files.length}
                    className="form-checkbox h-5 w-5"
                    onChange={handleSelectAll}
                  />
                ) : (
                  header.label
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {files && files.length ? (
            files.map((file, index) => (
              <tr key={index} className="border-b">
                <td className="p-3 font-bold">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5"
                    onChange={(e) => handleCheckbox(e, file)}
                    checked={filesChecked.some((f) => f._id === file._id)}
                  />
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <div className="flex justify-center items-center w-8 h-8 text-primary-blue">
                      <img src={projectTitle} alt="Project title" />
                    </div>
                    <span className="font-bold">{file.title}</span>
                  </div>
                </td>
                <td className="p-3 font-bold">
                  {file?.screenplayVersions?.length || 1}
                </td>
                <td className="p-3 font-bold">
                  {formatDate(file.isArchivedDate)}
                </td>
                <td className="p-3 font-bold">{file.fileLocation}</td>
                <td className="p-3 font-bold text-right relative">
                  <button
                    className="text-gray-600 text-xl font-bold"
                    onClick={() => toggleDropdown(file._id)}
                  >
                    ⋮
                  </button>
                  {dropdownOpen === file._id && (
                    <DropdownMenu
                      id={file._id}
                      resourceType="FILE"
                      type={type}
                    />
                  )}
                </td>
              </tr>
            ))
          ) : (
            <div className="w-full py-8 text-center">
              No files found in {type === 'archive' ? 'archive' : 'trash'}.
            </div>
          )}
        </tbody>
      </table>
      <Pagination
        type={type}
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default FileTable;
