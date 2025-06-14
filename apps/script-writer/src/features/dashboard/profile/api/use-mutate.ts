// src/hooks/useProfileMutations.ts

import { useMutation } from '@tanstack/react-query';
import {
  postProfessionalInfo,
  postPersonalPreferences,
  postScreenwritingStyle,
  postNetworkingGoals,
} from './use-fetch';
import { enqueueSnackbar } from 'notistack';

// Reusable mutation hook
const usePostMutation = (mutationFn: Function) => {
  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      // Display success toast message on all mutations
      enqueueSnackbar('Update Successful');
    },
    onError: (error) => {
      console.error('Mutation Error:', error);
      enqueueSnackbar('Update Failed');
    },
  });
};

export const usePostProfessionalInfo = () => {
  return usePostMutation(postProfessionalInfo);
};

export const usePostPersonalPreferences = () => {
  return usePostMutation(postPersonalPreferences);
};

export const usePostScreenwritingStyle = () => {
  return usePostMutation(postScreenwritingStyle);
};

export const usePostNetworkingGoals = () => {
  return usePostMutation(postNetworkingGoals);
};
