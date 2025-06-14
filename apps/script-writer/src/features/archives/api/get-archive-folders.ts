import { queryOptions, useQuery } from '@tanstack/react-query';
import { QueryConfig } from '@/lib/react-query';
import { getAllArchiveFolders } from './folder';

export const getArchiveFoldersQueryOptions = (
  page = 1,
  limit = 4,
  sort = 'newest',
) => {
  return queryOptions({
    queryKey: ['archive-folders', { page, limit, sort }], // Include params in the query key
    queryFn: () => getAllArchiveFolders(page, limit, sort),
  });
};

type UseArchiveFoldersOptions = {
  page?: number;
  limit?: number;
  sort?: string;
  queryConfig?: QueryConfig<typeof getArchiveFoldersQueryOptions>;
};

export const useArchiveFolders = ({
  page = 1,
  limit = 4,
  sort = 'newest',
  queryConfig = {},
}: UseArchiveFoldersOptions = {}) => {
  return useQuery({
    ...getArchiveFoldersQueryOptions(page, limit, sort),
    ...queryConfig,
  });
};
