import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

export const updateUser = (formData: FormData): Promise<void> => {
  return api.post(`/api/profile/onboard`, formData);
};

type UseUpdateUserOptions = {
  mutationConfig?: MutationConfig<typeof updateUser>;
};

export const useUpdateUserOnBoard = ({
  mutationConfig,
}: UseUpdateUserOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: updateUser,
  });
};
