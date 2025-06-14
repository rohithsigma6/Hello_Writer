import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

export const createSnapshot = ({
  data,
  fileId,
}: {
  data: any;
  fileId: string;
}): Promise<{ newVersion: { versionName: string } }> => {
  return api.put(`/api/file/${fileId}/createnewversion`, data);
};

type UseCreateFileOptions = {
  mutationConfig?: MutationConfig<typeof createSnapshot>;
  fileId?: string;
};

export const useCreateSnapshot = ({
  mutationConfig,
  fileId,
}: UseCreateFileOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ['snapshot', fileId],
      });
      if (fileId) {
        queryClient.invalidateQueries({
          queryKey: ['version-history', fileId],
        });
      }

      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createSnapshot,
  });
};
