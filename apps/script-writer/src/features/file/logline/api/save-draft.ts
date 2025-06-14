// src/hooks/useLoglineMutations.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoglineRequest, LoglineResponse } from '@/types/api';
import { addDraftLoglineTemplate, addFinalLoglineTemplate, addFreedomLoglineTemplate, deleteLogline, updateDraftLoglineTemplate } from './add-draft-mutation';

// Hook for adding a draft logline
export const useAddDraftLogline = () => {
  const queryClient = useQueryClient();

  return useMutation<LoglineResponse, Error, LoglineRequest>({
    mutationFn: addDraftLoglineTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries(['draft-logline']);
    },
  });
};
export const useUpdateDraftLogline = () => {
  const queryClient = useQueryClient();

  return useMutation<LoglineResponse, Error, LoglineRequest>({
    mutationFn: updateDraftLoglineTemplate,
    onSuccess: () => {
      // Invalidate the query that fetches draft loglines
      queryClient.invalidateQueries(['draft-logline']);
    },
  });
};

// Hook for adding a finalized logline
export const useAddFinalLogline = () => {
  const queryClient = useQueryClient();

  return useMutation<LoglineResponse, Error, LoglineRequest>({
    mutationFn: addFinalLoglineTemplate,
    onSuccess: () => {
      // Invalidate the draft loglines query to trigger a fresh fetch
      queryClient.invalidateQueries(['draft-logline']);
    },
  });
};

// Hook for adding a freeform logline
export const useAddFreedomLogline = () => {
  const queryClient = useQueryClient();

  return useMutation<LoglineResponse, Error, LoglineRequest>({
    mutationFn: addFreedomLoglineTemplate,
    onSuccess: () => {
      // Invalidate the draft loglines query to trigger a fresh fetch
      queryClient.invalidateQueries(['draft-logline']);
    },
  });
};

// Hook for deleting a logline
export const useDeleteLogline = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { fileId: string; templateId: string }>({
    mutationFn: ({ fileId, templateId }) => deleteLogline(fileId, templateId),
    onSuccess: () => {
      // Invalidate the draft loglines query after a delete
      queryClient.invalidateQueries(['draft-logline']);
    },
  });
};
