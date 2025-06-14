// src/hooks/useStoryWorld.ts

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addStoryWorld, getStoryWorldDropdown, StoryWorldRequest } from './get-mutation';

export const useStoryWorldDropdown = (fileId: string) => {
  return useQuery({
    queryKey: ['story-world', fileId],
    queryFn: () => getStoryWorldDropdown(fileId),
    enabled: !!fileId, // Only run query if fileId is available
  });
};



export const useAddStoryWorld = () => {
    const queryClient = useQueryClient();
  
    return useMutation<any, Error, StoryWorldRequest>({
      mutationFn: addStoryWorld,
      onSuccess: () => {
        queryClient.invalidateQueries(['story-world']); // Refetch the story world dropdown after adding a new one
      },
    });
  };