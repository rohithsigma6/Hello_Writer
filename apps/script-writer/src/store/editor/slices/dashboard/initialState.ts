import { File, Folder } from '@/types/api';

// Define the type for the context value
export interface DashboardType {
  archiveFolders: any[];
  archiveFoldersCurrentPage: number;
  archiveFoldersTotalPages: number;
  archiveFoldersSortBy: 'newest' | 'oldest';
  archiveFiles: any[];
  archiveFilesCurrentPage: number;
  archiveFilesTotalPages: number;
  archiveFilesSortBy: 'newest' | 'oldest';
  trashFolders: any[];
  trashFoldersCurrentPage: number;
  trashFoldersTotalPages: number;
  trashFoldersSortBy: 'newest' | 'oldest';
  trashFiles: any[];
  trashFilesCurrentPage: number;
  trashFilesTotalPages: number;
  trashFilesSortBy: 'newest' | 'oldest';
  foldersChecked: Folder[];
  filesChecked: File[];
}

const initialDashboardState: DashboardType = {
  archiveFolders: [],
  archiveFoldersCurrentPage: 1,
  archiveFoldersTotalPages: 1,
  archiveFoldersSortBy: 'newest',
  archiveFiles: [],
  archiveFilesCurrentPage: 1,
  archiveFilesTotalPages: 1,
  archiveFilesSortBy: 'newest',
  trashFolders: [],
  trashFoldersCurrentPage: 1,
  trashFoldersTotalPages: 1,
  trashFoldersSortBy: 'newest',
  trashFiles: [],
  trashFilesCurrentPage: 1,
  trashFilesTotalPages: 1,
  trashFilesSortBy: 'newest',
  foldersChecked: [],
  filesChecked: [],
};

export { initialDashboardState };
