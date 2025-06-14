import { api } from '@/lib/api-client';

export const getAllArchiveFiles = async (
  page = 1,
  limit = 4,
  sort = 'newest',
) => {
  const response = api.get(
    `/api/file/archive/files?page=${page}&limit=${limit}&sort=${sort}`,
  );
  return response;
};

export const getAllTrashFiles = async (
  page = 1,
  limit = 4,
  sort = 'newest',
) => {
  const response = api.get(
    `/api/file/trash/files?page=${page}&limit=${limit}&sort=${sort}`,
  );
  return response;
};

export const restoreArchiveFiles = async (ids: string[]) => {
  const response = api.post(`/api/archive/restore`, {
    resourceIds: ids,
    resourceType: 'FILE',
    type: 'archive',
  });
  return response;
};

export const restoreTrashFiles = async (ids: string[]) => {
  const response = api.post(`/api/archive/restore`, {
    resourceIds: ids,
    resourceType: 'FILE',
    type: 'trash',
  });
  return response;
};

export const deleteFiles = async (ids: string[]) => {
  const response = api.patch(`/api/file/multiple`, {
    resourceIDs: ids,
  });
  return response;
};
