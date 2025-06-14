import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MutationConfig } from '@/lib/react-query';
import { restoreArchiveFolders } from './folder';

type UseRestoreArchiveFolderOptions = {
  mutationConfig?: MutationConfig<typeof restoreArchiveFolders>;
};

export const useRestoreArchiveFolders = ({
  mutationConfig,
}: UseRestoreArchiveFolderOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ['archive-folders'],
      });

      const folderIds = variables;
      queryClient.refetchQueries({ queryKey: ['folder', folderIds] });
      onSuccess?.(data, variables, context);
    },
    ...restConfig,
    mutationFn: restoreArchiveFolders,
  });
};
