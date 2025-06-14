import { queryOptions, useQuery } from '@tanstack/react-query';
import { QueryConfig } from '@/lib/react-query';
import { getAllTrashFiles } from './file';

export const getTrashFilesQueryOptions = (
  page = 1,
  limit = 4,
  sort = 'newest',
) => {
  return queryOptions({
    queryKey: ['trash-files', { page, limit, sort }], // Include params in the query key
    queryFn: () => getAllTrashFiles(page, limit, sort),
  });
};

type UseTrashFilesOptions = {
  page?: number;
  limit?: number;
  sort?: string;
  queryConfig?: QueryConfig<typeof getTrashFilesQueryOptions>;
};

export const useTrashFiles = ({
  page = 1,
  limit = 4,
  sort = 'newest',
  queryConfig = {},
}: UseTrashFilesOptions = {}) => {
  return useQuery({
    ...getTrashFilesQueryOptions(page, limit, sort),
    ...queryConfig,
  });
};
