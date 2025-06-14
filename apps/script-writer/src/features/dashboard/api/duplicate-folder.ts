import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

export const duplicateFolder = ({
  folderId,
}: {
  folderId: string;
}): Promise<void> => {
  return api.post(`/api/folder/${folderId}/duplicate`, {});
};

type UseDuplicateFolderOptions = {
  mutationConfig?: MutationConfig<typeof duplicateFolder>;
};

export const useDuplicateFolder = ({
  mutationConfig,
}: UseDuplicateFolderOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ['folders'],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: duplicateFolder,
  });
};
