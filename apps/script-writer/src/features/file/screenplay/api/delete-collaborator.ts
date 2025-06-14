import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

export const deleteCollaborator = ({
  fileId,
  userIds,
}: {
  fileId: string;
  userIds: string[];
}): Promise<void> => {
  return api.delete(`/api/file/${fileId}/collaborator`, {
    data: {
      userIds: [...userIds],
    },
  });
};

type UseDeleteCollaboratorOptions = {
  mutationConfig?: MutationConfig<typeof deleteCollaborator>;
};

export const useDeleteCollaborator = ({
  mutationConfig,
}: UseDeleteCollaboratorOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ['file'],
      });

      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteCollaborator,
  });
};
