import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { File, FilesData, SnapShotVersion } from '@/types/api';
import { enqueueSnackbar } from 'notistack';

export const getVersionHistory = ({
  fileId,
}: {
  fileId: string;
}): Promise<SnapShotVersion> => {
  return api.get(`/api/version-history/file/${fileId}`);
};

export const getVersionHistoryQueryOptions = ({
  fileId,
}: {
  fileId: string;
}) => {
  return queryOptions({
    queryKey: ['version-history', fileId],
    queryFn: () => getVersionHistory({ fileId }),
  });
};

type UseVersionHistoryQueryOption = {
  queryConfig?: QueryConfig<typeof getVersionHistoryQueryOptions>;
  fileId: string;
};

export const useVersionHistory = ({
  queryConfig = {},
  fileId,
}: UseVersionHistoryQueryOption) => {
  return useQuery({
    ...getVersionHistoryQueryOptions({ fileId }),
    ...queryConfig,
    placeholderData: (previousData) => previousData,
   
  });
};
