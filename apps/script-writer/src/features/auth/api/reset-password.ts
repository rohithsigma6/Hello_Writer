import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

export const resetPassword = async ({
  password,
  userId,
  recoverHash,
}: {
  password: string;
  userId: string;
  recoverHash: string;
}): Promise<{ message: string }> => {
  return (
    await api.post(`/api/auth/reset-password`, {
      password,
      userId,
      recoverHash,
    })
  ).data;
};

type UseResetPasswordOptions = {
  mutationConfig?: MutationConfig<typeof resetPassword>;
};

export const useResetPassword = ({
  mutationConfig,
}: UseResetPasswordOptions) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: resetPassword,
  });
};
