import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

export const duplicateFile = ({
  fileId,
}: {
  fileId: string;
}): Promise<void> => {
  return api.post(`/api/file/${fileId}/duplicate`, {});
};

type UseDuplicateFileOptions = {
  mutationConfig?: MutationConfig<typeof duplicateFile>;
};

export const useDuplicateFile = ({
  mutationConfig,
}: UseDuplicateFileOptions) => {
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
    mutationFn: duplicateFile,
  });
};
