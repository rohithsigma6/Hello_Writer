import { queryOptions, useQuery } from '@tanstack/react-query';
import { QueryConfig } from '@/lib/react-query';
import { getAllTrashFolders } from './folder';

export const getTrashFoldersQueryOptions = (
  page = 1,
  limit = 4,
  sort = 'newest',
) => {
  return queryOptions({
    queryKey: ['trash-folders', { page, limit, sort }], // Include params in the query key
    queryFn: () => getAllTrashFolders(page, limit, sort),
  });
};

type UseTrashFoldersOptions = {
  page?: number;
  limit?: number;
  sort?: string;
  queryConfig?: QueryConfig<typeof getTrashFoldersQueryOptions>;
};

export const useTrashFolders = ({
  page = 1,
  limit = 4,
  sort = 'newest',
  queryConfig = {},
}: UseTrashFoldersOptions = {}) => {
  return useQuery({
    ...getTrashFoldersQueryOptions(page, limit, sort),
    ...queryConfig,
  });
};
