import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const createFeedback = ({
  data,
}: {
  data: {
    attached_file: File | null | undefined;
    feedback_type: string;
    star_rating: number;
    feedback_text: string;
  };
}): Promise<{ _id: string; message: string }> => {
  return api.post(`/api/feedback`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }); // POST request to the feedback endpoint
};

export const useCreateFeedback = () => {
  const queryClient = useQueryClient();

  // Destructure with the default value for mutationConfig if undefined
  // if(mutationConfig){

  // const { onSuccess, ...restConfig } = mutationConfig;

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ['feedback'],
      });
      // onSuccess?.(...args); // Call onSuccess if it's passed
    },
    // ...restConfig, // Spread the rest of the configuration options
    mutationFn: createFeedback, // Pass the mutation function
  });
  // }
};
