import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

export const trashFolder = ({
  folderId,
}: {
  folderId: string;
}): Promise<void> => {
  return api.post(`/api/archive`, {
    resourceId: folderId,
    resourceType: 'FOLDER',
    type: 'trash',
  });
};

type UseTrashFolderOptions = {
  mutationConfig?: MutationConfig<typeof trashFolder>;
};

export const useTrashFolder = ({ mutationConfig }: UseTrashFolderOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ['folders', 'trash-folders'],
      });

      const folderId = variables.folderId;
      queryClient.refetchQueries({ queryKey: ['folder', folderId] });
      onSuccess?.(data, variables, context);
    },
    ...restConfig,
    mutationFn: trashFolder,
  });
};
