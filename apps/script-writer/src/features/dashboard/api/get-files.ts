import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { FilesData } from '@/types/api';

export const getFiles = (): Promise<FilesData> => {
  return api.get('/api/file');
};

export const getFilesQueryOptions = () => {
  return queryOptions({
    queryKey: ['files'],
    queryFn: () => getFiles(),
  });
};

type UseFilesOptions = {
  queryConfig?: QueryConfig<typeof getFilesQueryOptions>;
};

export const useFiles = ({ queryConfig = {} }: UseFilesOptions = {}) => {
  return useQuery({
    ...getFilesQueryOptions(),
    ...queryConfig,
  });
};
