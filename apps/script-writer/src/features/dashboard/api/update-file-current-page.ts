import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

export const updateFileCurrentPage = ({
  fileId,
  pages,
}: {
  fileId: string;
  pages: number;
}): Promise<void> => {
  return api.post(`/api/file/${fileId}`, { currentPage: pages });
};

type UseUpdateFileCurrentPageOptions = {
  mutationConfig?: MutationConfig<typeof updateFileCurrentPage>;
};

export const useUpdateFileCurrentPage = ({
  mutationConfig,
}: UseUpdateFileCurrentPageOptions) => {
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
    mutationFn: updateFileCurrentPage,
  });
};
