import Message, { IMessage } from '../../models/message.model';
import {
  IGetMessagesParams,
  ICreateMessageParams,
  ISenderPopulatedMessage,
  ICreateIndividualMessageParams,
  IGetIndividualMessagesParams,
  IGetChatHistoryParams,
} from './types';

export const getMessages = async ({ roomId }: IGetMessagesParams): Promise<ISenderPopulatedMessage[]> => {
  try {
    const data = await Message.find({ roomId, isGroup: true })
      .select('-fileId')
      .populate('senderId', 'email firstName lastName');
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createMessage = async ({ content, roomId, senderId }: ICreateMessageParams): Promise<IMessage | null> => {
  try {
    const data = await Message.create({ content, roomId, senderId, isGroup: true });
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const createIndividualMessage = async ({
  content,
  roomId,
  senderId,
  receiverId,
}: ICreateIndividualMessageParams): Promise<IMessage | null> => {
  try {
    const data = await Message.create({ content, roomId, senderId, receiverId, isGroup: false });
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getIndividualMessages = async ({
  roomId,
  senderId,
  receiverId,
}: IGetIndividualMessagesParams): Promise<ISenderPopulatedMessage[]> => {
  try {
    const data = await Message.find({
      roomId,
      isGroup: false,
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    })
      .select('-fileId')
      .populate('senderId', 'firstName lastName email')
      .populate('receiverId', 'firstName lastName email');

    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getChatHistory = async ({ roomId, userId }: IGetChatHistoryParams): Promise<ISenderPopulatedMessage[]> => {
  try {
    const messages = await Message.find({
      roomId,
      $or: [{ senderId: userId }, { receiverId: userId }],
    })
      .populate('senderId', 'firstName lastName email')
      .populate('receiverId', 'firstName lastName email')
      .sort({ createdAt: -1 });

    return JSON.parse(JSON.stringify(messages));
  } catch (error: any) {
    console.error(error);
    return [];
  }
};
