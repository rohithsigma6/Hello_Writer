import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { User } from '@/types/api';

export const getUser = (): Promise<{ user: User }> => {
  return api
    .get(`/api/auth/status`)
    .then((res) => {
      //@ts-ignore
      console.log(res);
      
      let user = res?.body?.user;
      if (user) {
        // user = {
        //   ...user,
        //   token: JSON.parse(localStorage.getItem('user') as string)?.token,
        // };
        localStorage.setItem('user', JSON.stringify(user));
      }

      return { user };
    })
    .catch((err) => {
      if (!window.location.pathname.includes('register')) {
        localStorage.removeItem('user');
        window.location.href = '/auth/login';
      }
      return err;
    });
};

export const getUserQueryOptions = () => {
  return queryOptions({
    queryKey: ['user'],
    queryFn: getUser,
  });
};

type UseUserOptions = {
  queryConfig?: QueryConfig<typeof getUserQueryOptions>;
};

export const useUser = ({ queryConfig }: UseUserOptions = {}) => {
  const user: User = JSON.parse(localStorage.getItem('user') as string);
  return useQuery({
    ...getUserQueryOptions(),
    ...queryConfig,
    ...(user?.token && { initialData: { user: user } }),
    enabled: !!user?.token,
  });
};
