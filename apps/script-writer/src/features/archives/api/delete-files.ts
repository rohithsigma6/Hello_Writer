import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MutationConfig } from '@/lib/react-query';
import { deleteFiles } from './file';

type UseDeleteFilesOptions = {
  mutationConfig?: MutationConfig<typeof deleteFiles>;
};

export const useDeleteFiles = ({ mutationConfig }: UseDeleteFilesOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ['archive-files', 'trash-files'],
      });

      const folderIds = variables;
      queryClient.refetchQueries({ queryKey: ['file', folderIds] });
      onSuccess?.(data, variables, context);
    },
    ...restConfig,
    mutationFn: deleteFiles,
  });
};
