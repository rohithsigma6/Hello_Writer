import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

export const renameFile = ({
  updatedName,
  fileId,
}: {
  updatedName: string;
  fileId: string;
}): Promise<void> => {
  return api.put(`/api/file/${fileId}/rename`, { title: updatedName });
};

type UseRenameFileOptions = {
  mutationConfig?: MutationConfig<typeof renameFile>;
};

export const useRenameFile = ({ mutationConfig }: UseRenameFileOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ['files'],
      });

      const fileId = variables.fileId;
      queryClient.refetchQueries({ queryKey: ['file', fileId] });
      onSuccess?.(data, variables, context);
    },
    ...restConfig,
    mutationFn: renameFile,
  });
};
