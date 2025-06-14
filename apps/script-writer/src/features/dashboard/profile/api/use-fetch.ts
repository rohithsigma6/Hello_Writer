// src/apiapi/profileAPI.ts

import { api } from '@/lib/api-client';

export const postProfessionalInfo = (body: any) => {
  return api.post('api/profile/professionalInfo', body);
};

export const postPersonalPreferences = (body: any) => {
  return api.post('api/profile/personalPreferences', body);
};

export const postScreenwritingStyle = (body: any) => {
  return api.post('api/profile/screenwritingStyle', body);
};

export const postNetworkingGoals = (body: any) => {
  return api.post('api/profile/networkingGoals', body);
};
