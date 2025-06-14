import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

export const archiveFile = ({ fileId }: { fileId: string }): Promise<void> => {
  return api.post(`/api/archive`, {
    resourceId: fileId,
    resourceType: 'FILE',
    type: 'archive',
  });
};

type UseArchiveFileOptions = {
  mutationConfig?: MutationConfig<typeof archiveFile>;
};

export const useArchiveFile = ({ mutationConfig }: UseArchiveFileOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ['files', 'archive-files'],
      });

      const fileId = variables.fileId;
      queryClient.refetchQueries({ queryKey: ['file', fileId] });
      onSuccess?.(data, variables, context);
    },
    ...restConfig,
    mutationFn: archiveFile,
  });
};
