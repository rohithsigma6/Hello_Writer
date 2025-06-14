import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

export const getAllTemplates = async () => {
  const response = await api.get(`/api/plot/get-all-plot-template`);
  return response;
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

export const getPlotsByFile = async (fileId: any) => {
  try {
    const response = await api.get(`/api/plot/get-file-plot/${fileId}`);

    return response; 
  } catch (error) {
    console.error("Error fetching plots:", error);
    return null;
  }
};

export const deletePlotById = async (id:string)=>{
  try {
    await api.delete(`/api/plot/delete-plot-by-id/${id}`);
    return true;
  } catch (error) {
    console.error("Error in deletePlotById:", error);
    return false;
  }
}

export const getAllPlotThreadsByFileId = async (fileId:any) => {
  const response = await api.get(`/api/co-writer/scene-card/plot-thread/fileId/${fileId}`);
  console.log("RESPONSE IS ", response)
  return response;
};

