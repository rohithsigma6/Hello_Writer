import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export const post2faVerify = (body: any) => {
    return api.post('api/auth/mfa/verify', body);
  };
  
  
  export const usePost2faVerify = () => {
    return useMutation({
      mutationFn: post2faVerify,
    });
  };