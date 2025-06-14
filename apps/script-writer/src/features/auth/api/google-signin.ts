import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { CreateFilePayload, User } from '@/types/api';
import { signInWithGooglePopup } from '@/lib/firebase';

interface SignInWithGoogleResponse {
  firstName: string;
  lastName: string;
  email: string;
  googleId: string;
  role: string; // Customize this as needed
  isVerified: boolean;
}

const googlePopup = async () => {
  const response = await signInWithGooglePopup();
  const { displayName, email, uid } = response.user;

  if (!email || !uid) {
    throw new Error('Missing required user information from Google.');
  }

  const [firstName, lastName] = displayName?.split(' ') || ['Unknown', 'User'];

  return {
    firstName,
    lastName,
    email,
    googleId: uid,
    role: 'writer', // Customize this as needed
    isVerified: true,
  };
};
export const signInWithGoogle = async (): Promise<{ user: User }> => {
  const data = await googlePopup();
  return api.post(`/api/auth/signin-with-google`, data);
};

type UseCreateFileOptions = {
  mutationConfig?: MutationConfig<typeof signInWithGoogle>;
};

export const useGoogleSignIn = ({ mutationConfig }: UseCreateFileOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      localStorage.setItem('user', JSON.stringify(args[0].user));
      queryClient.invalidateQueries();
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: signInWithGoogle,
  });
};
