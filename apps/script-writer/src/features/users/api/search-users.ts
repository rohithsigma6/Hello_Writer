import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { SearchUser } from '@/types/api';

export const searchUser = ({
  search,
  fileId = '',
}: {
  search: string;
  fileId?: string;
}): Promise<{ users: SearchUser[] }> => {
  return api.post(`/api/user/search`, { search, fileId });
};

type UseSearchUserOptions = {
  mutationConfig?: MutationConfig<typeof searchUser>;
};

export const useSearchUser = ({ mutationConfig }: UseSearchUserOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: searchUser,
  });
};
