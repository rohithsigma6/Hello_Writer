import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

type DeleteFolderCollobratorPayload = {
  userIds: string[];
};

export const deleteFolderCollobrator = (folderId: string, body: DeleteFolderCollobratorPayload) => {
  return api.delete(`/api/folder/${folderId}/collaborator`, body);
};

export const useDeleteFolderCollobrator = () => {
  return useMutation({
    mutationFn: ({ folderId, body }: { folderId: string; body: { userIds: string[] } }) =>
      deleteFolderCollobrator(folderId, body),
  });
};