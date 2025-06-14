import { Socket } from "socket.io";
import { IMessage } from "../api/models/message.model";
import { ISenderPopulatedMessage } from "../api/data/message/types";

interface User {
  _id: string;
  firstname: string;
  lastname: string;
}

export const customiseMessages = (messages: ISenderPopulatedMessage[] = [], socket: Socket) => {
  const customMessages = messages.map((message) => {
    if (message.senderId._id === socket.user?._id) {
      return {
        ...message,
        username: "You",
        isCurrentUser: true,
      };
    } else {
      return {
        ...message,
        username: `${message.senderId.firstName} ${message.senderId.lastName}`,
        isCurrentUser: false,
      };
    }
  });

  return customMessages;
};