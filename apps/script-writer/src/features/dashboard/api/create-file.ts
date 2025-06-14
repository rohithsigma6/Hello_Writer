import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { CreateFilePayload } from '@/types/api';

export const createFile = ({
  data,
}: {
  data: FormData;
}): Promise<{ _id: string; title: string }> => {
  return api.post(`/api/file/create`, data);
};

type UseCreateFileOptions = {
  mutationConfig?: MutationConfig<typeof createFile>;
  folderId?: string;
};

export const useCreateFile = ({
  mutationConfig,
  folderId,
}: UseCreateFileOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ['files'],
      });
      if (folderId) {
        queryClient.invalidateQueries({ queryKey: ['files', folderId] });
        queryClient.invalidateQueries({ queryKey: ['folders'] });
      }

      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createFile,
  });
};
