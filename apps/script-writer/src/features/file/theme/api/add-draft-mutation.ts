import { api } from '@/lib/api-client';
import { ThemeRequest, ThemeResponse } from '@/types/themeTypes';

// Add a draft theme template
export const addDraftThemeTemplate = async (body: ThemeRequest): Promise<ThemeResponse> => {
  return api.post(`api/co-writer/theme/`, body);
};

export const updateDraftThemeTemplate = async (body: ThemeRequest): Promise<ThemeResponse> => {
  return api.put  (`api/co-writer/theme/${body.fileId}/${body.themeId}`, body.payload);
};

// Add a finalized theme template
export const addFinalThemeTemplate = async (body: ThemeRequest): Promise<ThemeResponse> => {
  return api.post(`api/co-writer/theme/finalized`, body);
};

// Add a freeform theme template
export const addFreedomThemeTemplate = async (body: ThemeRequest): Promise<ThemeResponse> => {
  return api.post(`api/co-writer/theme/freeform`, body);
};

// Delete a theme template
export const deleteTheme = async (fileId: string, templateId: string): Promise<void> => {
  return api.delete(`api/co-writer/theme/${fileId}/${templateId}`);
};
