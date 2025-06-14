import { api } from "@/lib/api-client";

export type AddRelationshipRequest = {
    character1Id: string;
    character2Id: string;
    relationshipType: string; // Example: 'friend', 'rival', 'sibling', etc.
    description?: string; // Optional description of the relationship
  };

export type GetCharacterRelationshipRequest = {
  fileId: string;
};

export type GetAllCharacterRelationshipsRequest = {
  fileId: string;
};

export type RemoveRelationshipRequest = {
    characterId: string;
};


export type UpdateRelationshipPositionRequest = {
relationshipId: string;
position: any
};

export type GetCharacterRelationshipByIdRequest = {
  relationId: string;
};

export const getCharacterRelationshipById = async ({ relationId }: GetCharacterRelationshipByIdRequest): Promise<any> => {
  return api.get(`/api/co-writer/character/relationship/id/${relationId}`);
};

export const updateCharacterRelationshipPosition = async (data: UpdateRelationshipPositionRequest): Promise<any> => {
  return api.post('/api/co-writer/character/relationship/position', data);
};

export const removeCharacterRelationship = async (data: RemoveRelationshipRequest): Promise<any> => {
  return api.post('/api/co-writer/character/relationship/removeConnection', data);
};

export const getAllCharacterRelationships = async ({ fileId }: GetAllCharacterRelationshipsRequest): Promise<any> => {
  return api.get(`/api/co-writer/character/allCharacterRelationship/${fileId}`);
};

export const getCharacterRelationship = async ({ fileId }: GetCharacterRelationshipRequest): Promise<any> => {
  return api.get(`/api/co-writer/character/relationship/${fileId}`);
};

  export const addCharacterRelationship = async (data: AddRelationshipRequest): Promise<any> => {
    return api.post('/api/co-writer/character/relationship', data);
  };