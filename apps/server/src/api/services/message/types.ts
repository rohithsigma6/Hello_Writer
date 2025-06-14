export interface GetMessagesParams {
  roomId: string;
}
export interface GetChatHistoryParams {
  roomId: string;
  userId: string;
}

export interface CreateMessageParams {
  content: string;
  roomId: string;
  senderId: string;
}
export interface GetIndividualMessagesParams {
  roomId: string;
  senderId: string;
  receiverId: string;
}

export interface CreateIndividualMessageParams {
  content: string;
  roomId: string;
  senderId: string;
  receiverId: string;
}
