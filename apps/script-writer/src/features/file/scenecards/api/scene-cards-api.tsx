import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

export const createOrUpdateSceneCard = async (payload: any) => {
  const response = await api.post(`/api/co-writer/scene-card/sceneWithTemplate`, payload
  );

  return response.data;
};


export const getAllSceneCards = async (payload: any) => {
  const response = await api.post(`/api/co-writer/scene-card/getAllScenesByFileId`, payload
  );
  console.log("RESPONSE IS ", response)
  return response;
}

export const getSceneById = async (payload: any) => {
  console.log("payload id ", payload.sceneCardId)
  const response = await api.get(`/api/co-writer/scene-card/${payload.sceneCardId}`);
  return response;
}

export const createPlotThread = async (payload: any) => {
  const response = await api.post(`/api/co-writer/scene-card/plot-thread`, payload);
  return response;
}
export const getAllPlotThreadsByFileId = async (fileId:any) => {
  const response = await api.get(`/api/co-writer/scene-card/plot-thread/fileId/${fileId}`);
  console.log("RESPONSE IS ", response)
  return response;
};


export const deletePlotThread = async (plotThreadId) => {
  const response = await api.delete(`/api/co-writer/scene-card/plot-thread/${plotThreadId}`);
  return response;
}

export const updatePlotThread = async (threadId,payload) => {
  const response = await api.put(`/api/co-writer/scene-card/plot-thread/${threadId}`,payload);
  return response;
}
export const getCharactersByFileForPlot = async (fileId:any) => {
  const response = await  api.get(`api/co-writer/character/file/${fileId}`);
  return response;
};
export const getCharacterByIdSceneCard = async (characterId:any)=>{
  const response =  await api.get(`api/co-writer/character/${characterId}`);
  return response

}
