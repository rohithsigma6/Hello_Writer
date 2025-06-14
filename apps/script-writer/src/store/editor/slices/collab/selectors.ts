import { CollabStoreState } from '@/store/editor/initialState';

const activeUsers = (s: CollabStoreState) => s.activeUsers;
const provider = (s: CollabStoreState) => s.provider;
const chatSocket = (s: CollabStoreState) => s.chatSocket;
const conferenceSocket = (s: CollabStoreState) => s.conferenceSocket;
const initalMessages = (s: CollabStoreState) => s.initalMessages;
const initalIndividualMessages = (s: CollabStoreState) =>
  s.initalIndividualMessages;
const unreadCount = (s: CollabStoreState) => s.unreadCount;

export const editorCollabSelectors = {
  activeUsers,
  provider,
  chatSocket,
  conferenceSocket,
  initalMessages,
  initalIndividualMessages,
  unreadCount,
};
