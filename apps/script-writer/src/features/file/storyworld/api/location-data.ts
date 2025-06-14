import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addLocation, deleteLocation, DeleteLocationRequest, getLocation, getLocationById, LocationRequest } from "./location-mutation";

export const useAddLocation = () => {
    const queryClient = useQueryClient();
  
    return useMutation<any, Error, LocationRequest>({
      mutationFn: addLocation,
      onSuccess: () => {
        queryClient.invalidateQueries(['locations']); // Refetch locations after adding/updating
      },
    });
  };

  export const useLocations = (body: LocationRequest) => {
    return useQuery({
      queryKey: ['locations', body?.fileId], // Unique cache key
      queryFn: () => getLocation(body),
      enabled: !!body.fileId, // Prevent API call if fileId is missing
    });
  };

  export const useDeleteLocation = () => {
    const queryClient = useQueryClient();
  
    return useMutation<any, Error, DeleteLocationRequest>({
      mutationFn: deleteLocation,
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(['locations', variables.fileId]); // Refetch locations after deletion
      },
    });
  };

  export const useLocationById = (fileId: string, locationId: string) => {
    return useQuery({
      queryKey: ['location-by-id', fileId, locationId],
      queryFn: () => getLocationById({ fileId, locationId }),
      enabled: !!fileId && !!locationId,
    });
  };