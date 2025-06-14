import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addSubLocation, deleteSubLocation, getSubLocation, getSubLocationById } from "./sub-location-mutation";

export const useAddSubLocation = () => {
    const queryClient = useQueryClient();
  
    return useMutation<any, Error, LocationRequest>({
      mutationFn: addSubLocation,
      onSuccess: () => {
        queryClient.invalidateQueries(['sub-locations']); // Refetch locations after adding/updating
      },
    });
  };

  export const useSubLocations = (body: LocationRequest) => {
    return useQuery({
      queryKey: ['sub-locations', body?.fileId], // Unique cache key
      queryFn: () => getSubLocation(body),
      enabled: !!body.fileId, // Prevent API call if fileId is missing
    });
  };

  export const useDeleteSubLocation = () => {
    const queryClient = useQueryClient();
  
    return useMutation<any, Error, DeleteLocationRequest>({
      mutationFn: deleteSubLocation,
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(['sub-locations', variables.fileId]); // Refetch locations after deletion
      },
    });
  };

  export const useSubLocationById = (fileId: string, locationId: string) => {
    return useQuery({
      queryKey: ['location-by-id', fileId, locationId],
      queryFn: () => getSubLocationById({ fileId, locationId }),
      enabled: !!fileId && !!locationId,
    });
  };