import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export const postLogout = (body: any) => {
    return api.post('/api/auth/logout', body);
  };
  
  
  export const usePostLogout = () => {
    return useMutation({
      mutationFn: postLogout,
    });
  };