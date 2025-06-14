import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

export const renameFolder = ({
  updatedName,
  folderId,
}: {
  updatedName: string;
  folderId: string;
}): Promise<void> => {
  return api.put(`/api/folder/${folderId}`, { title: updatedName });
};

type UseRenameFolderOptions = {
  mutationConfig?: MutationConfig<typeof renameFolder>;
};

export const useRenameFolder = ({ mutationConfig }: UseRenameFolderOptions) => {
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
    mutationFn: renameFolder,
  });
};
