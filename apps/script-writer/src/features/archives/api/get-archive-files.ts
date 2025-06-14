import { queryOptions, useQuery } from '@tanstack/react-query';
import { QueryConfig } from '@/lib/react-query';
import { getAllArchiveFiles } from './file';

export const getArchiveFilesQueryOptions = (
  page = 1,
  limit = 4,
  sort = 'newest',
) => {
  return queryOptions({
    queryKey: ['archive-files', { page, limit, sort }], // Include params in the query key
    queryFn: () => getAllArchiveFiles(page, limit, sort),
  });
};

type UseArchiveFilesOptions = {
  page?: number;
  limit?: number;
  sort?: string;
  queryConfig?: QueryConfig<typeof getArchiveFilesQueryOptions>;
};

export const useArchiveFiles = ({
  page = 1,
  limit = 4,
  sort = 'newest',
  queryConfig = {},
}: UseArchiveFilesOptions = {}) => {
  return useQuery({
    ...getArchiveFilesQueryOptions(page, limit, sort),
    ...queryConfig,
  });
};
