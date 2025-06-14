import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

export const archiveFolder = ({
  folderId,
}: {
  folderId: string;
}): Promise<void> => {
  return api.post(`/api/archive`, {
    resourceId: folderId,
    resourceType: 'FOLDER',
    type: 'archive',
  });
};

type UseArchiveFolderOptions = {
  mutationConfig?: MutationConfig<typeof archiveFolder>;
};

export const useArchiveFolder = ({
  mutationConfig,
}: UseArchiveFolderOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ['folders', 'archive-folders'],
      });

      const folderId = variables.folderId;
      queryClient.refetchQueries({ queryKey: ['folder', folderId] });
      onSuccess?.(data, variables, context);
    },
    ...restConfig,
    mutationFn: archiveFolder,
  });
};
