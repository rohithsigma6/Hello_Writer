import React from 'react';
import { FaFolder } from 'react-icons/fa6';
import DropdownMenu from './dropdown-menu'; // Adjust import path as needed
import { Pagination } from './pagination';
import { Folder } from '@/types/api';
import { useLocation } from 'react-router';
import { formatDate } from '../helper';
import { useDashboardStore } from '@/store/editor';

interface FolderTableProps {
  folders: Folder[];
  dropdownOpen: string | null;
  toggleDropdown: (id: string) => void;
  type: 'archive' | 'trash';
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const FolderTable: React.FC<FolderTableProps> = ({
  folders,
  dropdownOpen,
  toggleDropdown,
  type,
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  const url = useLocation();
  const { foldersChecked, updateFoldersChecked } = useDashboardStore(
    (state) => state,
  );
  const tableHeaders = [
    { id: 'checkbox', label: '', width: 'p-2' },
    { id: 'name', label: 'Folder name', width: 'p-3 font-gray-100' },
    { id: 'scripts', label: 'Number of Scripts', width: 'p-3' },
    {
      id: 'date',
      label: url.pathname == '/archives' ? 'Archived Date' : 'Trash Date',
      width: 'p-3',
    },
    { id: 'location', label: 'Folder location', width: 'p-3' },
    { id: 'actions', label: '', width: 'p-3' },
  ];

  // Handle checkbox change
  const handleCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
    folder: Folder,
  ) => {
    const { checked } = e.target;
    if (checked) {
      const isAlreadyChecked = foldersChecked.some((f) => f._id === folder._id);
      if (!isAlreadyChecked) {
        updateFoldersChecked([...foldersChecked, folder]);
      }
    } else {
      const newCheckedFolders = foldersChecked.filter(
        (f) => f._id !== folder._id,
      );
      updateFoldersChecked(newCheckedFolders);
    }
  };

  // Handle select all
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    if (checked) {
      updateFoldersChecked(folders);
    } else {
      updateFoldersChecked([]);
    }
  };

  return (
    <>
      <table className="w-full text-left mb-6">
        <thead>
          <tr className="bg-gray-100">
            {tableHeaders.map((header) => (
              <th key={header.id} className={header.width}>
                {header.id === 'checkbox' && folders.length ? (
                  <input
                    type="checkbox"
                    checked={foldersChecked.length === folders.length}
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
          {folders && folders.length ? (
            folders.map((folder, index) => (
              <tr key={index} className="border-b">
                <td className="p-3">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5"
                    onChange={(e) => handleCheckbox(e, folder)}
                    checked={foldersChecked.some((f) => f._id === folder._id)}
                  />
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <div className="border border-yellow-400 p-2 rounded-xl">
                      <FaFolder className="text-yellow-400 text-2xl" />
                    </div>
                    <span className="font-bold">{folder.title}</span>
                  </div>
                </td>
                <td className="p-3 font-bold">{folder?.Files?.length || 0}</td>
                <td className="p-3 font-bold">
                  {formatDate(folder.isArchivedDate)}
                </td>
                <td className="p-3 font-bold">{folder.folderLocation}</td>
                <td className="p-3 font-bold text-right relative">
                  <button
                    className="text-gray-600 text-xl font-bold"
                    onClick={() => toggleDropdown(folder._id)}
                  >
                    ⋮
                  </button>
                  {dropdownOpen === folder._id && (
                    <DropdownMenu
                      id={folder._id}
                      resourceType="FOLDER"
                      type={type}
                    />
                  )}
                </td>
              </tr>
            ))
          ) : (
            <div className="w-full py-8 text-center">
              No folders found in {type === 'archive' ? 'archive' : 'trash'}.
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

export default FolderTable;
