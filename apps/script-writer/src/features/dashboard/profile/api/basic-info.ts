// src/api/profileAPI.ts

import { api } from '@/lib/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';


export const postBasicInfo = async (payload: any): Promise<any> => {
  return api.post('api/profile/basicInfo', payload);
};


export const usePostBasicInfo = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, any>({
    mutationFn: postBasicInfo,
    onSuccess: () => {
          enqueueSnackbar('Update Successful');
      queryClient.invalidateQueries(['profile-info']); // Optional: refetch profile info
    },
  });
};
