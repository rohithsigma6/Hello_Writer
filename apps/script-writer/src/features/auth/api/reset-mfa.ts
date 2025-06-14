import { getUser } from "@/features/users/api/get-user";
import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export const postMfaReset = (body: any) => {
    return api.post('/api/auth/mfa/reset', );
  };
  
  
  export const usePostMfaReset = () => {
    return useMutation({
      mutationFn: postMfaReset,
      onSuccess: async () => {
        // Call the getUser API after successful MFA reset
        try {
          const userResponse = await getUser();
          console.log('User data fetched after MFA reset:', userResponse);
          // Optionally, you can handle the user data here, like updating context or state
        } catch (error) {
          console.error('Error fetching user after MFA reset:', error);
        }
      },
    });
  };