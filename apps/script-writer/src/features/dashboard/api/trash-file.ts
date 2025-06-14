import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

export const trashFile = ({ fileId }: { fileId: string }): Promise<void> => {
  return api.post(`/api/archive`, {
    resourceId: fileId,
    resourceType: 'FILE',
    type: 'trash',
  });
};

type UseTrashFileOptions = {
  mutationConfig?: MutationConfig<typeof trashFile>;
};

export const useTrashFile = ({ mutationConfig }: UseTrashFileOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ['files', 'trash-files'],
      });

      const fileId = variables.fileId;
      queryClient.refetchQueries({ queryKey: ['file', fileId] });
      onSuccess?.(data, variables, context);
    },
    ...restConfig,
    mutationFn: trashFile,
  });
};
