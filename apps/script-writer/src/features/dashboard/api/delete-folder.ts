import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

export const deleteFolder = ({
  folderId,
}: {
  folderId: string;
}): Promise<void> => {
  return api.delete(`/api/folder/${folderId}`, {});
};

type UseDeleteFolderOptions = {
  mutationConfig?: MutationConfig<typeof deleteFolder>;
};

export const useDeleteFolder = ({ mutationConfig }: UseDeleteFolderOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ['folders'],
      });
      queryClient.invalidateQueries({
        queryKey: ['files'],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteFolder,
  });
};
