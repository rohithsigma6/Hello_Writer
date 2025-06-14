import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

type DeleteFileCollobratorPayload = {
  userIds: string[];
};

export const deleteFileCollobrator = (fileId: string, body: DeleteFileCollobratorPayload) => {
  return api.delete(`/api/file/${fileId}/collaborator`,  {
    data: {
      userIds: [body],
    },
  });
};

export const useDeleteFileCollobrator = () => {
  return useMutation({
    mutationFn: ({ fileId, body }: { fileId: string; body: { userIds: string[] } }) =>
      deleteFileCollobrator(fileId, body),
  });
};