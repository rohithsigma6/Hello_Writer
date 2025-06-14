import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

export const createFileRevision = ({
  data,
  fileId,
}: {
  data: any;
  fileId: string;
}): Promise<{ newVersion: { versionName: string } }> => {
  return api.post(`/api/file/${fileId}/revision`, data);
};

type UseCreateFileOptions = {
  mutationConfig?: MutationConfig<typeof createFileRevision>;
  fileId?: string;
};

export const useCreateFileRevision = ({
  mutationConfig,
  fileId,
}: UseCreateFileOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ['fileRevision', fileId],
      });
      if (fileId) {
        queryClient.invalidateQueries({ queryKey: ['file', fileId] });
      }

      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createFileRevision,
  });
};
