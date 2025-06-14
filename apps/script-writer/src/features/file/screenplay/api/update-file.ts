// src/api/fileAPI.ts

import { api } from '@/lib/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type PostToFileRequest = {
  fileId: string;
  payload: any;
};

export const postToFile = async ({ fileId, payload }: PostToFileRequest): Promise<any> => {
  return api.post(`/api/file/${fileId}`, payload);
};



export const usePostToFile = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, PostToFileRequest>({
    mutationFn: postToFile,
    onSuccess: () => {
      queryClient.invalidateQueries(['file-data']); // Adjust based on your file-related query key
    },
  });
};
