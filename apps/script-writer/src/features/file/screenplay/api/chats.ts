import { api } from '@/lib/api-client';

export const getFileCollaborators = (fileId: string) => {
  const response = api.get(`api/file/${fileId}/collaborators`);
  return response;
};

export const getAllContacts = async () => {
  const response = await api.get('api/user/contacts');
  return response;
};

export const getGroupMessages = (roomId: string | number) => {
  const response = api.get(`api/message/getGroup-message/${roomId}`);
  return response;
};

export const getIndividualMessages = (body: any) => {
  const response = api.get(
    `api/message/getIndividual-message/${body.roomId}/${body.senderId}/${body.receiverId}`,
  );
  return response;
};

export const addCollaborators = async (fileId: string, users: any) => {
  const response = await api.post(`api/file/${fileId}/collaborate`, {
    collaborators: users,
  });
  return response;
};
