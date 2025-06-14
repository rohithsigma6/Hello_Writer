import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

export const deleteFile = ({ fileId }: { fileId: string }): Promise<void> => {
  return api.delete(`/api/file/${fileId}`, {});
};

type UseDeleteFileOptions = {
  mutationConfig?: MutationConfig<typeof deleteFile>;
};

export const useDeleteFile = ({ mutationConfig }: UseDeleteFileOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ['files'],
      });

      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteFile,
  });
};
