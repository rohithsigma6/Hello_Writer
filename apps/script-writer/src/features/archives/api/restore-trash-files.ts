import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MutationConfig } from '@/lib/react-query';
import { restoreTrashFiles } from './file';

type UseRestoreTrashFileOptions = {
  mutationConfig?: MutationConfig<typeof restoreTrashFiles>;
};

export const useRestoreTrashFiles = ({
  mutationConfig,
}: UseRestoreTrashFileOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ['trash-files'],
      });

      const fileIds = variables;
      queryClient.refetchQueries({ queryKey: ['file', fileIds] });
      onSuccess?.(data, variables, context);
    },
    ...restConfig,
    mutationFn: restoreTrashFiles,
  });
};
