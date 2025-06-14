import {
  createMessage,
  getMessages,
  createIndividualMessage,
  getIndividualMessages,
  getChatHistory,
} from '../../data/message/message.data';
import {
  GetMessagesParams,
  CreateMessageParams,
  CreateIndividualMessageParams,
  GetIndividualMessagesParams,
  GetChatHistoryParams,
} from './types';

export const getMessagesService = async ({ roomId }: GetMessagesParams) => {
  const messages = await getMessages({ roomId });
  return { messages };
};

export const createMessageService = async ({ content, roomId, senderId }: CreateMessageParams) => {
  const message = await createMessage({ content, roomId, senderId });
  return { message };
};

export const getIndividualMessagesService = async ({ roomId, senderId, receiverId }: GetIndividualMessagesParams) => {
  const messages = await getIndividualMessages({ roomId, senderId, receiverId });
  return { messages };
};

export const createIndividualMessageService = async ({
  content,
  roomId,
  senderId,
  receiverId,
}: CreateIndividualMessageParams) => {
  const message = await createIndividualMessage({ content, roomId, senderId, receiverId });
  return { message };
};
export const getChatHistoryService = async ({ roomId, userId }: GetChatHistoryParams) => {
  const messages = await getChatHistory({ roomId, userId });
  return { messages };
};
