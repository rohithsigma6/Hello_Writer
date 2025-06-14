import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Folder } from '@/types/api';

export const getFolderFiles = ({
  folderId,
}: {
  folderId: string;
}): Promise<{ folder: Folder }> => {
  return api.get(`/api/folder/${folderId}`);
};

export const getFolderFilesQueryOptions = ({
  folderId,
}: {
  folderId: string;
}) => {
  return queryOptions({
    queryKey: ['files', folderId],
    queryFn: () => getFolderFiles({ folderId }),
  });
};

type UseFolderFilesOptions = {
  folderId: string;
  queryConfig?: QueryConfig<typeof getFolderFilesQueryOptions>;
};

export const useFolderFiles = ({
  folderId,
  queryConfig = {},
}: UseFolderFilesOptions) => {
  return useQuery({
    ...getFolderFilesQueryOptions({ folderId }),
    ...queryConfig,
  });
};
