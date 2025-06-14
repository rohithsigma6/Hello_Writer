import { IMessage } from "../../models/message.model";
import { IUser } from "../../models/user.model";

export interface IGetMessagesParams {
  roomId: string;
}
export interface IGetChatHistoryParams {
  roomId: string;
  userId:string;
}
export interface IGetIndividualMessagesParams {
  roomId: string;
  senderId: string;
  receiverId:string;
}

export interface ICreateMessageParams {
  content: string;
  roomId: string;
  senderId: string;
}
export interface ICreateIndividualMessageParams {
  content: string;
  roomId: string;
  senderId: string;
  receiverId:string;
}

export interface ISenderPopulatedMessage extends Omit<IMessage, 'senderId'> {
  senderId: IUser;
}