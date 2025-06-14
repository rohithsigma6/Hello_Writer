import { api } from '@/lib/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
export type CollaborateRequest = {
  fileId: string;
  userId: string; // Assuming you're adding a collaborator by user ID
  role?: string;  // Optional role (e.g., 'editor', 'viewer')
};
export const addCollaborator = async (data: CollaborateRequest): Promise<any> => {
  return api.post(`api/file/${data.fileId}/collaborate`, data);
};

export const useAddCollaborator = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, CollaborateRequest>({
    mutationFn: addCollaborator,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['file', variables.fileId]); // Refetch file data after collaboration update
    },
  });
};
