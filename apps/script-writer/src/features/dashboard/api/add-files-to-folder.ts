import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

export const addFilesToFolder = ({
  folderId,
  fileIds,
}: {
  folderId: string;
  fileIds: string[];
}): Promise<void> => {
  return api.post(`/api/folder/${folderId}/add_files`, {
    fileIds: fileIds,
  });
};

type UseAddFilesToFolderOptions = {
  mutationConfig?: MutationConfig<typeof addFilesToFolder>;
};

export const useAddFilesToFolder = ({
  mutationConfig,
}: UseAddFilesToFolderOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ['files', 'folders'],
      });

      const fileId = variables.fileIds;
      queryClient.refetchQueries({ queryKey: ['file', fileId] });
      onSuccess?.(data, variables, context);
    },
    ...restConfig,
    mutationFn: addFilesToFolder,
  });
};
