// src/api/storyWorldAPI.ts

import { api } from '@/lib/api-client';

export const getStoryWorldDropdown = async (fileId: string): Promise<any> => {
  return api.get(`api/co-writer/story-world/${fileId}`);
};


//
export type StoryWorldRequest = {
  payload: {
    name: string;
    description?: string;
    [key: string]: any; // Allows additional fields
  };
};

export const addStoryWorld = async (body: StoryWorldRequest): Promise<any> => {
  return api.post(`api/co-writer/story-world/save`, body);
};
