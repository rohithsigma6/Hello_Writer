import { api } from '@/lib/api-client';

export const getAllArchiveFolders = async (
  page = 1,
  limit = 4,
  sort = 'newest',
) => {
  const response = api.get(
    `/api/folder/archive/folders?page=${page}&limit=${limit}&sort=${sort}`,
  );
  return response;
};

export const getAllTrashFolders = async (
  page = 1,
  limit = 4,
  sort = 'newest',
) => {
  const response = api.get(
    `/api/folder/trash/folders?page=${page}&limit=${limit}&sort=${sort}`,
  );
  return response;
};

export const restoreArchiveFolders = async (ids: string[]) => {
  const response = api.post(`/api/archive/restore`, {
    resourceIds: ids,
    resourceType: 'FOLDER',
    type: 'archive',
  });
  return response;
};

export const restoreTrashFolders = async (ids: string[]) => {
  const response = api.post(`/api/archive/restore`, {
    resourceIds: ids,
    resourceType: 'FOLDER',
    type: 'trash',
  });
  return response;
};

export const deleteFolders = async (ids: string[]) => {
  const response = api.patch(`/api/folder/multiple`, {
    resourceIDs: ids,
  });
  return response;
};
