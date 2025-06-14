import { useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  addDraftThemeTemplate, 
  addFinalThemeTemplate, 
  addFreedomThemeTemplate, 
  deleteTheme, 
  updateDraftThemeTemplate
} from './add-draft-mutation'; // Ensure the correct import path
import { ThemeRequest, ThemeResponse } from '@/types/api';

// Hook for adding a draft theme
export const useAddDraftTheme = () => {
  const queryClient = useQueryClient();
  return useMutation<ThemeResponse, Error, ThemeRequest>({
    mutationFn: addDraftThemeTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries(['draft-theme']); // Refetch draft themes
    },
  });
};

// Hook for adding a finalized theme
export const useAddFinalTheme = () => {
  const queryClient = useQueryClient();
  return useMutation<ThemeResponse, Error, ThemeRequest>({
    mutationFn: addFinalThemeTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries(['draft-theme']); // Refetch draft themes
    },
  });
};

export const useUpdateDraftTheme = () => {
  const queryClient = useQueryClient();

  return useMutation<ThemeResponse, Error, ThemeRequest>({
    mutationFn: updateDraftThemeTemplate,
    onSuccess: () => {
      // Invalidate the query that fetches draft loglines
      queryClient.invalidateQueries(['draft-logline']);
    },
  });
};

// Hook for adding a freeform theme
export const useAddFreedomTheme = () => {
  const queryClient = useQueryClient();
  return useMutation<ThemeResponse, Error, ThemeRequest>({
    mutationFn: addFreedomThemeTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries(['draft-theme']); // Refetch draft themes
    },
  });
};

// Hook for deleting a theme
export const useDeleteTheme = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { fileId: string; templateId: string }>({
    mutationFn: ({ fileId, templateId }) => deleteTheme(fileId, templateId),
    onSuccess: () => {
      queryClient.invalidateQueries(['draft-theme']); // Refetch draft themes
    },
  });
};
