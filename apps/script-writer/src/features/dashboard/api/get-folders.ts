import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { FoldersData } from '@/types/api';

export const getFolders = (): Promise<FoldersData> => {
  return api.get('/api/folder');
};

export const getFoldersQueryOptions = () => {
  return queryOptions({
    queryKey: ['folders'],
    queryFn: () => getFolders(),
  });
};

type UseFoldersOptions = {
  queryConfig?: QueryConfig<typeof getFoldersQueryOptions>;
};

export const useFolders = ({ queryConfig = {} }: UseFoldersOptions = {}) => {
  return useQuery({
    ...getFoldersQueryOptions(),
    ...queryConfig,
  });
};
