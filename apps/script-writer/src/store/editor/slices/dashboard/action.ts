import { setNamespace } from '@/utils/store-debug';
import { StateCreator } from 'zustand';
import { DashboardStore } from '../../store';
import { File, Folder } from '@/types/api';

export interface DashboardAction {
  updateArchiveFolders: (archiveFolders: any[]) => void;
  updateArchiveFoldersCurrentPage: (archiveCurrentPage: number) => void;
  updateArchiveFoldersTotalPage: (archiveTotalPages: number) => void;
  updateArchiveFoldersSortBy: (archiveSortBy: 'newest' | 'oldest') => void;
  updateArchiveFiles: (archiveFiles: any[]) => void;
  updateArchiveFilesCurrentPage: (archiveCurrentPage: number) => void;
  updateArchiveFilesTotalPage: (archiveTotalPages: number) => void;
  updateArchiveFilesSortBy: (archiveSortBy: 'newest' | 'oldest') => void;
  updateTrashFolders: (trashFolders: any[]) => void;
  updateTrashFoldersCurrentPage: (trashCurrentPage: number) => void;
  updateTrashFoldersTotalPage: (trashTotalPages: number) => void;
  updateTrashFoldersSortBy: (trashSortBy: 'newest' | 'oldest') => void;
  updateTrashFiles: (trashFiles: any[]) => void;
  updateTrashFilesCurrentPage: (trashCurrentPage: number) => void;
  updateTrashFilesTotalPage: (trashTotalPages: number) => void;
  updateTrashFilesSortBy: (trashSortBy: 'newest' | 'oldest') => void;
  updateFoldersChecked: (foldersChecked: Folder[]) => void;
  updateFilesChecked: (filesChecked: File[]) => void;
}

const n = setNamespace('session');

export const createDashboardSlice: StateCreator<
  DashboardStore,
  [['zustand/devtools', never]],
  [],
  DashboardAction
> = (set, get) => ({
  updateArchiveFolders: (archiveFolders) =>
    set(
      (state) => ({
        ...state,
        archiveFolders,
      }),
      false,
      n(`updateArchiveFolders`),
    ),
  updateArchiveFoldersCurrentPage: (archiveCurrentPage) =>
    set(
      (state) => ({
        ...state,
        archiveFoldersCurrentPage: archiveCurrentPage,
      }),
      false,
      n(`updateArchiveFoldersCurrentPage`),
    ),
  updateArchiveFoldersTotalPage: (archiveTotalPages) =>
    set(
      (state) => ({
        ...state,
        archiveFoldersTotalPages: archiveTotalPages,
      }),
      false,
      n(`updateArchiveFoldersTotalPage`),
    ),
  updateArchiveFoldersSortBy: (archiveSortBy) =>
    set(
      (state) => ({
        ...state,
        archiveFoldersSortBy: archiveSortBy,
      }),
      false,
      n(`updateArchiveFoldersSortBy`),
    ),
  updateArchiveFiles: (archiveFiles) =>
    set(
      (state) => ({
        ...state,
        archiveFiles,
      }),
      false,
      n(`updateArchiveFiles`),
    ),
  updateArchiveFilesCurrentPage: (archiveCurrentPage) =>
    set(
      (state) => ({
        ...state,
        archiveFilesCurrentPage: archiveCurrentPage,
      }),
      false,
      n(`updateArchiveFilesCurrentPage`),
    ),
  updateArchiveFilesTotalPage: (archiveTotalPages) =>
    set(
      (state) => ({
        ...state,
        archiveFilesTotalPages: archiveTotalPages,
      }),
      false,
      n(`updateArchiveFilesTotalPage`),
    ),
  updateArchiveFilesSortBy: (archiveSortBy) =>
    set(
      (state) => ({
        ...state,
        archiveFilesSortBy: archiveSortBy,
      }),
      false,
      n(`updateArchiveFilesSortBy`),
    ),
  updateTrashFolders: (trashFolders) =>
    set(
      (state) => ({
        ...state,
        trashFolders,
      }),
      false,
      n(`updateTrashFolders`),
    ),
  updateTrashFoldersCurrentPage: (trashCurrentPage) =>
    set(
      (state) => ({
        ...state,
        trashFoldersCurrentPage: trashCurrentPage,
      }),
      false,
      n(`updateTrashFoldersCurrentPage`),
    ),
  updateTrashFoldersTotalPage: (trashTotalPages) =>
    set(
      (state) => ({
        ...state,
        trashFoldersTotalPages: trashTotalPages,
      }),
      false,
      n(`updateTrashFoldersTotalPage`),
    ),
  updateTrashFoldersSortBy: (trashSortBy) =>
    set(
      (state) => ({
        ...state,
        trashFoldersSortBy: trashSortBy,
      }),
      false,
      n(`updateTrashFoldersSortBy`),
    ),
  updateTrashFiles: (trashFiles) =>
    set(
      (state) => ({
        ...state,
        trashFiles,
      }),
      false,
      n(`updateTrashFiles`),
    ),
  updateTrashFilesCurrentPage: (trashCurrentPage) =>
    set(
      (state) => ({
        ...state,
        trashFilesCurrentPage: trashCurrentPage,
      }),
      false,
      n(`updateTrashFilesCurrentPage`),
    ),
  updateTrashFilesTotalPage: (trashTotalPages) =>
    set(
      (state) => ({
        ...state,
        trashFilesTotalPages: trashTotalPages,
      }),
      false,
      n(`updateTrashFilesTotalPage`),
    ),
  updateTrashFilesSortBy: (trashSortBy) =>
    set(
      (state) => ({
        ...state,
        trashFilesSortBy: trashSortBy,
      }),
      false,
      n(`updateTrashFilesSortBy`),
    ),
  updateFoldersChecked: (foldersChecked) =>
    set(
      (state) => ({
        ...state,
        foldersChecked,
      }),
      false,
      n(`updateFoldersChecked`),
    ),
  updateFilesChecked: (filesChecked) =>
    set(
      (state) => ({
        ...state,
        filesChecked,
      }),
      false,
      n(`updateFilesChecked`),
    ),
});
