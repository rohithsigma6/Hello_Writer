import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";


export const postChangePassword = (body: any) => {
  return api.post('/api/user/change-password', body);
};



export const usePostChangePassword = () => {
  return useMutation({
    mutationFn: postChangePassword,
  });
};
