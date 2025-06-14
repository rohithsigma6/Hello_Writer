import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { ThemeTemplateData } from '@/types/api'; // Ensure this type is defined

// Function to fetch theme templates
export const getThemeTemplate = (): Promise<ThemeTemplateData> => {
  return api.get('api/co-writer/theme/theme-template');
};

// Query options for theme templates
export const getThemeTemplateQueryOptions = () => {
  return queryOptions({
    queryKey: ['theme-template'],
    queryFn: () => getThemeTemplate(),
  });
};

type UseThemeTemplateOptions = {
  queryConfig?: QueryConfig<typeof getThemeTemplateQueryOptions>;
};

// Hook to use the theme template query
export const useThemeTemplate = ({ queryConfig = {} }: UseThemeTemplateOptions = {}) => {
  return useQuery<ThemeTemplateData>({
    ...getThemeTemplateQueryOptions(),
  });
};



export type CharacterRequest = {
  payload: {
    name: string;
    description?: string;
    [key: string]: any; // Allows additional fields
  };
};

export const saveCharacter = async (body: CharacterRequest): Promise<any> => {
  return api.post(`api/co-writer/character/save`, body,{
    headers: {
      "Content-Type": "multipart/form-data",
    }});
};


export type CharacterFileRequest = {
  fileId: string;
};

export const getCharactersByFile = async ({ fileId }: CharacterFileRequest): Promise<any> => {
  return api.get(`api/co-writer/character/file/${fileId}`);
};

export type CharacterByIdRequest = {
  charId: string;
};

export const getCharacterById = async ({ charId }: CharacterByIdRequest): Promise<any> => {
  return api.get(`api/co-writer/character/${charId}`);
};

export type UpdateCharacterStatusRequest = {
  characterId: string;
  status: string; 
};
export type UpdateCharacterRequest = {
  charId: string;
  template: string;
  payload: any; 
};

export const updateCharacterStatus = async ({ characterId, status }: UpdateCharacterRequest): Promise<any> => {
  return api.put(`api/co-writer/character/${characterId}/status`, { status });
};
export const updateCharacter = async ({ charId, template,payload }: UpdateCharacterRequest): Promise<any> => {
  return api.put(`api/co-writer/character/${charId}/${template}/template`, payload,{
    headers: {
      "Content-Type": "multipart/form-data",
    }});
};

export const deleteCharacter = async (templateId: string): Promise<void> => {
  return api.delete(`api/co-writer/character/${templateId}`);
};