import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MutationConfig } from '@/lib/react-query';
import { restoreTrashFolders } from './folder';

type UseRestoreTrashFolderOptions = {
  mutationConfig?: MutationConfig<typeof restoreTrashFolders>;
};

export const useRestoreTrashFolders = ({
  mutationConfig,
}: UseRestoreTrashFolderOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ['trash-folders'],
      });

      const folderIds = variables;
      queryClient.refetchQueries({ queryKey: ['folder', folderIds] });
      onSuccess?.(data, variables, context);
    },
    ...restConfig,
    mutationFn: restoreTrashFolders,
  });
};
