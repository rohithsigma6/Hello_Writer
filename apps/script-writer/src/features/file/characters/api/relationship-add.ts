// src/hooks/useCharacterMutations.ts

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addCharacterRelationship, AddRelationshipRequest, getAllCharacterRelationships, GetAllCharacterRelationshipsRequest, getCharacterRelationship, getCharacterRelationshipById, GetCharacterRelationshipByIdRequest, GetCharacterRelationshipRequest, removeCharacterRelationship, RemoveRelationshipRequest, updateCharacterRelationshipPosition, UpdateRelationshipPositionRequest } from './relationship-mutation';

export const useAddCharacterRelationship = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, AddRelationshipRequest>({
    mutationFn: addCharacterRelationship,
    onSuccess: () => {
      queryClient.invalidateQueries(['character-relationships']); // Refetch relationships after adding
    },
  });
};
export const useCharacterRelationship = ({ fileId }: GetCharacterRelationshipRequest) => {
  return useQuery({
    queryKey: ['character-relationships', fileId], // Cache relationships per character
    queryFn: () => getCharacterRelationship({ fileId }),
    enabled: !!fileId, // Runs query only if characterId is provided
  });
};

export const useAllCharacterRelationships = ({ fileId }: GetAllCharacterRelationshipsRequest) => {
  return useQuery({
    queryKey: ['all-character-relationships', fileId], // Cache relationships per file
    queryFn: () => getAllCharacterRelationships({ fileId }),
    enabled: !!fileId, // Runs query only if fileId is provided
  });
};

export const useRemoveCharacterRelationship = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, RemoveRelationshipRequest>({
    mutationFn: removeCharacterRelationship,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['character-relationships']); // Refetch relationships after removal
    },
  });
};

export const useUpdateCharacterRelationshipPosition = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, UpdateRelationshipPositionRequest>({
    mutationFn: updateCharacterRelationshipPosition,
    onSuccess: (_, variables) => {
      // queryClient.invalidateQueries(['character-relationships']); // Refetch relationships after position update
    },
  });
};

export const useCharacterRelationshipById = ({ relationId }: GetCharacterRelationshipByIdRequest) => {
  return useQuery({
    queryKey: ['character-relationship', relationId], // Cache the result per relationId
    queryFn: () => getCharacterRelationshipById({ relationId }),
    enabled: !!relationId, // Runs query only if relationId is provided
  });
};

