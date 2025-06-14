import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { LoglineRequest, LoglineResponse } from '@/types/api';

export const addDraftLoglineTemplate = async (body: LoglineRequest): Promise<LoglineResponse> => {
  return api.post(`api/co-writer/logline/`, body);
};
export const updateDraftLoglineTemplate = async (body: LoglineRequest): Promise<LoglineResponse> => {
  return api.put  (`api/co-writer/logline/${body.fileId}/${body.loglineId}`, body.payload);
};

export const addFinalLoglineTemplate = async (body: LoglineRequest): Promise<LoglineResponse> => {
  
  return api.post(`api/co-writer/logline/finalized`, body);
};

export const addFreedomLoglineTemplate = async (body: LoglineRequest): Promise<LoglineResponse> => {
  return api.post(`api/co-writer/logline/freeform`, body);
};


export const deleteLogline = async (fileId: string, templateId: string): Promise<void> => {
  return api.delete(`api/co-writer/logline/${fileId}/${templateId}`);
};