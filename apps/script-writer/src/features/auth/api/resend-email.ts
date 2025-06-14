import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

export const resendEmail = async (
  email: string,
): Promise<{ message: string }> => {
  return (await api.post(`/api/send-verification-email`, { email })).data;
};

type UseResendEmailProps = {
  mutationConfig?: MutationConfig<typeof resendEmail>;
};

export const useResendEmail = ({ mutationConfig }: UseResendEmailProps) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: resendEmail,
  });
};
