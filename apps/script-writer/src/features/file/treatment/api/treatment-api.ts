import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

export const getAllTemplates = async () => {
  const response = await api.get(`/api/plot/get-all-plot-template`);
  return response.data;
};

export const savePlotTemplate = async (data: any) => {
  try {
    const response = await api.post(`/api/plot/save-template-plot`, data);
    return response?.data || {};
  } catch (error) {
    console.error("Error in savePlotTemplate:", error);
    return null;
  }
};

export const getTreatmentByFile = async (fileId: string) => {
  try {
    const response = await api.get(`/api/plot/get-file-plot/${fileId}`);

    return response; 
  } catch (error) {
    console.error("Error fetching plots:", error);
    return null;
  }
};

