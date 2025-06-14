// src/api/authAPI.ts

import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/api-client";
import { MutationConfig } from "../lib/react-query";

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async ({ email, password }: LoginRequest): Promise<{ token: string;  }> => {
  return (await api.post('/api/auth/login', { email, password }));
};


type UseLoginProps = {
    mutationConfig?: MutationConfig<typeof login>;
  };
  
  export const useLogin = ({ mutationConfig }: UseLoginProps) => {
    const { onSuccess, onError, ...restConfig } = mutationConfig || {};
  
    return useMutation({
      mutationFn: login,  // The login function
      onSuccess: (...args) => {
        onSuccess?.(...args);  // Call onSuccess callback if defined
      },
      onError: (...args) => {
        onError?.(...args);  // Call onError callback if defined
      },
      ...restConfig,  // Spread the rest of the config
    });
  };