import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { CreateFolderPayload, CreateFolderResponse } from '@/types/api';

export const createFolder = ({
  data,
}: {
  data: CreateFolderPayload;
}): Promise<{ folder: CreateFolderResponse }> => {
  return api.post(`/api/folder/create`, data);
};

type UseCreateFolderOptions = {
  mutationConfig?: MutationConfig<typeof createFolder>;
};

export const useCreateFolder = ({ mutationConfig }: UseCreateFolderOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ['folders'],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createFolder,
  });
};
