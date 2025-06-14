import { DashboardStoreState } from '@/store/editor/initialState';

const archiveFolders = (s: DashboardStoreState) => s.archiveFolders;
const archiveFoldersCurrentPage = (s: DashboardStoreState) =>
  s.archiveFoldersCurrentPage;
const archiveFoldersTotalPages = (s: DashboardStoreState) =>
  s.archiveFoldersTotalPages;
const archiveFoldersSortBy = (s: DashboardStoreState) => s.archiveFoldersSortBy;
const archiveFiles = (s: DashboardStoreState) => s.archiveFiles;
const archiveFilesCurrentPage = (s: DashboardStoreState) =>
  s.archiveFilesCurrentPage;
const archiveFilesTotalPages = (s: DashboardStoreState) =>
  s.archiveFilesTotalPages;
const archiveFilesSortBy = (s: DashboardStoreState) => s.archiveFilesSortBy;
const trashFolders = (s: DashboardStoreState) => s.trashFolders;
const trashFoldersCurrentPage = (s: DashboardStoreState) =>
  s.trashFoldersCurrentPage;
const trashFoldersTotalPages = (s: DashboardStoreState) =>
  s.trashFoldersTotalPages;
const trashFoldersSortBy = (s: DashboardStoreState) => s.trashFoldersSortBy;
const trashFiles = (s: DashboardStoreState) => s.trashFiles;
const trashFilesCurrentPage = (s: DashboardStoreState) =>
  s.trashFilesCurrentPage;
const trashFilesTotalPages = (s: DashboardStoreState) => s.trashFilesTotalPages;
const trashFilesSortBy = (s: DashboardStoreState) => s.trashFilesSortBy;
const foldersChecked = (s: DashboardStoreState) => s.foldersChecked;
const filesChecked = (s: DashboardStoreState) => s.filesChecked;

export const dashboardSelectors = {
  archiveFolders,
  archiveFoldersCurrentPage,
  archiveFoldersTotalPages,
  archiveFoldersSortBy,
  archiveFiles,
  archiveFilesCurrentPage,
  archiveFilesTotalPages,
  archiveFilesSortBy,
  trashFolders,
  trashFoldersCurrentPage,
  trashFoldersTotalPages,
  trashFoldersSortBy,
  trashFiles,
  trashFilesCurrentPage,
  trashFilesTotalPages,
  trashFilesSortBy,
  foldersChecked,
  filesChecked,
};
