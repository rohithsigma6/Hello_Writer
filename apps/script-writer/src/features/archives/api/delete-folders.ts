import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MutationConfig } from '@/lib/react-query';
import { deleteFolders } from './folder';

type UseDeleteFoldersOptions = {
  mutationConfig?: MutationConfig<typeof deleteFolders>;
};

export const useDeleteFolders = ({
  mutationConfig,
}: UseDeleteFoldersOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ['archive-folders', 'trash-folders'],
      });

      const folderIds = variables;
      queryClient.refetchQueries({ queryKey: ['folder', folderIds] });
      onSuccess?.(data, variables, context);
    },
    ...restConfig,
    mutationFn: deleteFolders,
  });
};
