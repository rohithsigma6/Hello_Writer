import { Socket } from 'socket.io-client';

export interface User {
  token: string;
}

export interface Message {
  id: number;
  content: string;
  isCurrentUser: boolean;
  username: string;
}

// Define the type for the context value
export interface CollabType {
  activeUsers: any[];
  provider: any;
  chatSocket: React.MutableRefObject<Socket | undefined>;
  conferenceSocket: React.MutableRefObject<Socket | undefined>;
  initalMessages: Message[];
  initalIndividualMessages: Message[];
  unreadCount: number;
}

const initialCollabState: CollabType = {
  activeUsers: [],
  provider: undefined,
  initalMessages: [],
  unreadCount: 0,
  initalIndividualMessages: [],
  chatSocket: { current: undefined },
  conferenceSocket: { current: undefined },
};

export { initialCollabState };
