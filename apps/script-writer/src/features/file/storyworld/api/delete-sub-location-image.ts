import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export const deleteLocationImage = (body:any) => {
  return api.put(`/api/co-writer/location/subLocation/delete/images/${body.locationId}/${body.id}`,body.payload);
};



export const useDeleteSubLocationImage = () => {
  return useMutation({
    mutationFn: deleteLocationImage,
  });
};
