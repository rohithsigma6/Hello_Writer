import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MutationConfig } from '@/lib/react-query';
import { restoreArchiveFiles } from './file';

type UseRestoreArchiveFileOptions = {
  mutationConfig?: MutationConfig<typeof restoreArchiveFiles>;
};

export const useRestoreArchiveFiles = ({
  mutationConfig,
}: UseRestoreArchiveFileOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ['archive-files'],
      });

      const fileIds = variables;
      queryClient.refetchQueries({ queryKey: ['file', fileIds] });
      onSuccess?.(data, variables, context);
    },
    ...restConfig,
    mutationFn: restoreArchiveFiles,
  });
};
