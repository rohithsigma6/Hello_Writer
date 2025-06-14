import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { DashboardLayout } from '@/components/layouts';
import SectionHeader from '@/features/archives/components/section-header';
import FolderTable from '@/features/archives/components/folder-table';
import FileTable from '@/features/archives/components/file-table';
import PageHeader from '@/features/archives/components/page-header';
import TabNavigation from '@/features/archives/components/tab-navigation';
import ActionButtons from '@/features/archives/components/action-button';
import { useDashboardStore } from '@/store/editor';
import { useTrashFolders } from '@/features/archives/api/get-trash-folders';
import { useTrashFiles } from '@/features/archives/api/get-trash-files';
import { TableLoader } from '@/features/archives/components/table-loader';

// Define all types at the top
type TabType = 'all' | 'folders' | 'files';

export interface Folder {
  title: string;
  numberOfScripts: number;
  archivedDate: string;
  folderLocation: string;
}

export interface File {
  title: string;
  numberOfVersions: number;
  archivedDate: string;
  fileLocation: string;
}

const TrashRoute: React.FC = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const {
    trashFoldersCurrentPage,
    trashFoldersSortBy,
    trashFilesCurrentPage,
    trashFilesSortBy,
    updateTrashFoldersCurrentPage,
    updateTrashFoldersSortBy,
    updateTrashFilesCurrentPage,
    updateTrashFilesSortBy,
  } = useDashboardStore((state) => state);
  const foldersQuery = useTrashFolders({
    page: trashFoldersCurrentPage,
    limit: 4,
    sort: trashFoldersSortBy,
  });

  const folderLoading = foldersQuery.isLoading;
  const trashFolders = foldersQuery?.data?.folders || [];
  const trashFoldersTotalPages = foldersQuery?.data?.totalPages || 1;
  const filesQuery = useTrashFiles({
    page: trashFilesCurrentPage,
    limit: 4,
    sort: trashFilesSortBy,
  });
  const fileLoading = filesQuery.isLoading;
  const trashFiles = filesQuery?.data?.Files || [];
  const trashFilesTotalPages = filesQuery?.data?.totalPages || 1;

  const handleFolderSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortOrder = e.target.value as 'newest' | 'oldest';
    if (!['newest', 'oldest'].includes(sortOrder)) return;

    updateTrashFoldersSortBy(sortOrder);
  };

  const handleFileSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortOrder = e.target.value as 'newest' | 'oldest';
    if (!['newest', 'oldest'].includes(sortOrder)) return;

    updateTrashFilesSortBy(sortOrder);
  };

  const toggleDropdown = (id: string) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const sections = [
    {
      id: 'folders',
      showWhen: ['all', 'folders'] as TabType[],
      render: () => (
        <>
          <SectionHeader title="Folders" onSort={handleFolderSort} />
          {folderLoading ? (
            <TableLoader />
          ) : (
            <FolderTable
              folders={trashFolders}
              dropdownOpen={dropdownOpen}
              toggleDropdown={toggleDropdown}
              type="trash"
              totalPages={trashFoldersTotalPages}
              currentPage={trashFoldersCurrentPage}
              setCurrentPage={updateTrashFoldersCurrentPage}
            />
          )}
        </>
      ),
    },
    {
      id: 'files',
      showWhen: ['all', 'files'] as TabType[],
      render: () => (
        <>
          <SectionHeader title="Files" onSort={handleFileSort} />
          {fileLoading ? (
            <TableLoader />
          ) : (
            <FileTable
              files={trashFiles}
              dropdownOpen={dropdownOpen}
              toggleDropdown={toggleDropdown}
              type="trash"
              totalPages={trashFilesTotalPages}
              currentPage={trashFilesCurrentPage}
              setCurrentPage={updateTrashFilesCurrentPage}
            />
          )}
        </>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="bg-white shadow-md rounded-xl m-3 p-4">
        <PageHeader title="Trash" onBack={() => navigate('/dashboard')} />
        <div className="flex justify-between items-center pb-4 mt-2">
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          <ActionButtons type="trash" />
        </div>
        <div className="mt-0">
          {sections.map(
            (section) =>
              section.showWhen.includes(activeTab) && (
                <div key={section.id}>{section.render()}</div>
              ),
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TrashRoute;
