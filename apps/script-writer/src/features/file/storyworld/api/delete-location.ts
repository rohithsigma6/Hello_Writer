import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export const deleteLocationImage = (body:any) => {
  return api.put(`/api/co-writer/location/delete/location-images/${body.id}`,body.payload);
};



export const useDeleteLocationImage = () => {
  return useMutation({
    mutationFn: deleteLocationImage,
  });
};
