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
import { TableLoader } from '@/features/archives/components/table-loader';
import { useArchiveFolders } from '@/features/archives/api/get-archive-folders';
import { useArchiveFiles } from '@/features/archives/api/get-archive-files';

// Define all types at the top
type TabType = 'all' | 'folders' | 'files';

export interface Folder {
  _id: string;
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

const ArchivesRoute: React.FC = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const {
    archiveFoldersCurrentPage,
    archiveFoldersSortBy,
    archiveFilesCurrentPage,
    archiveFilesSortBy,
    updateArchiveFoldersCurrentPage,
    updateArchiveFoldersSortBy,
    updateArchiveFilesCurrentPage,
    updateArchiveFilesSortBy,
  } = useDashboardStore((state) => state);
  const foldersQuery = useArchiveFolders({
    page: archiveFoldersCurrentPage,
    limit: 4,
    sort: archiveFoldersSortBy,
  });
  const folderLoading = foldersQuery.isLoading;
  const archiveFolders = foldersQuery?.data?.folders || [];
  const archiveFoldersTotalPages = foldersQuery?.data?.totalPages || 1;
  const filesQuery = useArchiveFiles({
    page: archiveFilesCurrentPage,
    limit: 4,
    sort: archiveFilesSortBy,
  });
  const fileLoading = filesQuery.isLoading;
  const archiveFiles = filesQuery?.data?.Files || [];
  const archiveFilesTotalPages = filesQuery?.data?.totalPages || 1;

  const handleFolderSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortOrder = e.target.value as 'newest' | 'oldest';
    if (!['newest', 'oldest'].includes(sortOrder)) return;

    updateArchiveFoldersSortBy(sortOrder);
  };

  const handleFileSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortOrder = e.target.value as 'newest' | 'oldest';
    if (!['newest', 'oldest'].includes(sortOrder)) return;

    updateArchiveFilesSortBy(sortOrder);
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
              folders={archiveFolders}
              dropdownOpen={dropdownOpen}
              toggleDropdown={toggleDropdown}
              type="archive"
              totalPages={archiveFoldersTotalPages}
              currentPage={archiveFoldersCurrentPage}
              setCurrentPage={updateArchiveFoldersCurrentPage}
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
              files={archiveFiles}
              dropdownOpen={dropdownOpen}
              toggleDropdown={toggleDropdown}
              type="archive"
              totalPages={archiveFilesTotalPages}
              currentPage={archiveFilesCurrentPage}
              setCurrentPage={updateArchiveFilesCurrentPage}
            />
          )}
        </>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="bg-white shadow-md rounded-xl m-3 p-4">
        <PageHeader title="Archive" onBack={() => navigate('/dashboard')} />
        <div className="flex justify-between items-center pb-4 mt-2">
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          <ActionButtons type="archive" />
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

export default ArchivesRoute;
