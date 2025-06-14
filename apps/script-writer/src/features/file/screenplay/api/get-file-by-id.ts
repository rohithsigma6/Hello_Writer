import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { File, FilesData } from '@/types/api';
import { enqueueSnackbar } from 'notistack';

export const getFile = ({
  fileId,
}: {
  fileId: string;
}): Promise<{ file: File }> => {
  return api.get(`/api/file/${fileId}`).catch((res) => {
    // if (res?.response?.data?.message == 'File not found.') {
    //   window.location.href = '/dashboard';
    //   enqueueSnackbar('Invalid File', { variant: 'error' });
    // }
    window.location.href = '/dashboard';
    enqueueSnackbar('Invalid File', { variant: 'error' });
    return res;
  });
};

export const getFileQueryOptions = ({ fileId }: { fileId: string }) => {
  return queryOptions({
    queryKey: ['file', fileId],
    queryFn: () => getFile({ fileId }),
  });
};

type UseFileOptions = {
  queryConfig?: QueryConfig<typeof getFileQueryOptions>;
  fileId: string;
};

export const useFile = ({ queryConfig = {}, fileId }: UseFileOptions) => {
  return useQuery({
    ...getFileQueryOptions({ fileId }),
    ...queryConfig,
  });
};
