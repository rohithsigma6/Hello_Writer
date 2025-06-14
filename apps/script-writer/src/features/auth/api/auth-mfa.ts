import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export const postMfaSetup = (body: any) => {
    return api.post('/api/auth/mfa/setup', body);
  };
  
  
  export const usePostMfaSetup = () => {
    return useMutation({
      mutationFn: postMfaSetup,
    });
  };