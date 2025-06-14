import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

export const sendResetPasswordLink = async (
  email: string,
): Promise<{ message: string }> => {
  return (await api.post(`/api/auth/send-recover-email`, { email })).data;
};

type UseSendResetPasswordLinkOptions = {
  mutationConfig?: MutationConfig<typeof sendResetPasswordLink>;
};

export const useSendResetPasswordLink = ({
  mutationConfig,
}: UseSendResetPasswordLinkOptions) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: sendResetPasswordLink,
  });
};
