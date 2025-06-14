import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  addDraftThemeTemplate, 
  addFinalThemeTemplate, 
  addFreedomThemeTemplate, 
  deleteTheme 
} from './add-draft-mutation'; // Ensure the correct import path
import { ThemeRequest, ThemeResponse } from '@/types/api';
import { CharacterByIdRequest, CharacterFileRequest, CharacterRequest, deleteCharacter, getCharacterById, getCharactersByFile, saveCharacter, updateCharacter, UpdateCharacterRequest, updateCharacterStatus, UpdateCharacterStatusRequest } from './get-all-character';
import { useNavigate, useParams } from 'react-router';

// Hook for adding a draft theme
export const useAddDraftTheme = () => {
  return useMutation<ThemeResponse, Error, ThemeRequest>({
    mutationFn: addDraftThemeTemplate,
  });
};

// Hook for adding a finalized theme
export const useAddFinalTheme = () => {
  return useMutation<ThemeResponse, Error, ThemeRequest>({
    mutationFn: addFinalThemeTemplate,
  });
};

// Hook for adding a freeform theme
export const useAddFreedomTheme = () => {
  return useMutation<ThemeResponse, Error, ThemeRequest>({
    mutationFn: addFreedomThemeTemplate,
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



export const useSaveCharacter = () => {
  const queryClient = useQueryClient();

  const { fileId, type } = useParams<{ fileId?: string; type: any }>();
    
  const navigate = useNavigate();
  return useMutation<any, Error, CharacterRequest>({
    mutationFn: saveCharacter,
    onSuccess: (res) => {
      navigate(`/file/${fileId}/characters/${res.character?._id}`)
      queryClient.invalidateQueries(['characters']); // Refetch characters after saving
    },
  });
};

export const useCharactersByFile = ({ fileId }: CharacterFileRequest) => {
  return useQuery({
    queryKey: ['characters', fileId], // Unique cache key
    queryFn: () => getCharactersByFile({ fileId }),
    enabled: !!fileId, // Ensures query runs only if fileId is provided
  });
};

export const useCharacterById = ({ charId }: CharacterByIdRequest) => {
  return useQuery({
    queryKey: ['character', charId], // Unique cache key
    queryFn: () => getCharacterById({ charId }),
    enabled: !!charId, // Ensures query runs only if characterId is provided
  });
};

export const useUpdateCharacterStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, UpdateCharacterStatusRequest>({
    mutationFn: updateCharacterStatus,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['character', variables.characterId]); // Refetch updated character details
    },
  });
};
export const useUpdateCharacter = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, UpdateCharacterRequest>({
    mutationFn: updateCharacter,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['character', variables.characterId]); // Refetch updated character details
    },
  });
};

export const useDeleteCharacter = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { fileId: string; templateId: string }>({
    mutationFn: ({  templateId }) => deleteCharacter( templateId),
    onSuccess: () => {
      // Invalidate the draft Characters query after a delete
      queryClient.invalidateQueries(['character']);
    },
  });
};
