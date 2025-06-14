import { io, Socket } from 'socket.io-client';
import { CollabType, User } from './initialState';
import { setNamespace } from '@/utils/store-debug';
import { StateCreator } from 'zustand';
import { CollabStore } from '../../store';
import { env } from '@/config/env';

export interface CollabAction {
  updateActiveUsers: (s: CollabType['activeUsers']) => void;
  updateProvider: (s: CollabType['provider']) => void;
  connectChat: (s: {
    user: User;
    file: string;
    versionDetails: {
      versionName: string;
      versionColor: string;
      editStatus: string;
    };
  }) => Socket | undefined;
  connectConference: (s: { user: User; file: string }) => Socket | undefined;
  getConferenceSocket: () => Socket | undefined;
  getChatSocket: () => Socket | undefined;
  updateUnreadCount: (s: CollabType['unreadCount']) => void;
  incrementUnreadCount: () => void;
}

const n = setNamespace('session');
const API_URL = env.API_URL;

export const createCollabSlice: StateCreator<
  CollabStore,
  [['zustand/devtools', never]],
  [],
  CollabAction
> = (set, get) => ({
  updateActiveUsers: (arg) =>
    set(
      (state) => ({
        ...state,
        activeUsers: arg,
      }),
      false,
      n(`updateActiveUsers`),
    ),
  updateProvider: (arg) =>
    set(
      (state) => ({
        ...state,
        provider: arg,
      }),
      false,
      n(`updateProvider`),
    ),
  connectChat: (arg) => {
    const socket = io(API_URL, {
      path: '/socket.io',
      auth: {
        token: arg.user.token,
        fileId: arg.file,
        versionDetails: arg.versionDetails,
      },
      transports: ['websocket'],
      withCredentials: true,
    });
    set(
      (state) => ({
        ...state,
        chatSocket: { current: socket },
      }),
      false,
      n(`connectChat`),
    );
    return socket;
  },
  connectConference: (arg) => {
    const socket = io(API_URL, {
      path: '/socket.io',
      auth: {
        token: arg.user.token,
        fileId: arg.file,
      },
      transports: ['websocket'],
      withCredentials: true,
    });
    set(
      (state) => ({
        ...state,
        conferenceSocket: { current: socket },
      }),
      false,
      n(`connectConference`),
    );
    return socket;
  },
  getConferenceSocket: () => get().conferenceSocket.current,
  getChatSocket: () => get().chatSocket.current,
  updateUnreadCount: (arg) =>
    set(
      (state) => ({
        ...state,
        unreadCount: arg,
      }),
      false,
      n(`updateUnreadCount`),
    ),
  incrementUnreadCount: () =>
    set(
      (state) => ({
        ...state,
        unreadCount: state.unreadCount + 1,
      }),
      false,
      n(`incrementUnreadCount`),
    ),
});
