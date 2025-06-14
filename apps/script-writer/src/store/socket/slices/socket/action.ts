import { StateCreator } from 'zustand/vanilla';
import { SocketStore } from '../../store';
import { setNamespace } from '@/utils/store-debug';
import { io } from 'socket.io-client';
import { env } from '@/config/env';
import { User } from '@/types/api';
import { useEditorStore } from '@/store/editor';
import { Comment, StashI } from '@/store/editor/slices/editor';
import { enqueueSnackbar } from 'notistack';

export interface SocketAction {
  connectSocket: (options: {
    token: string;
    fileId: string;
    versionDetails: {
      versionName: string;
      versionColor: string;
      editStatus: string;
    };
  }) => void;
  disconnectSocket: () => void;
}

const n = setNamespace('session');

export const createSocketSlice: StateCreator<
  SocketStore,
  [['zustand/devtools', never]],
  [],
  SocketAction
> = (set, get) => ({
  connectSocket: ({ token, fileId, versionDetails }) => {
    const API_URL = env.API_URL;
    const setComments = useEditorStore.getState().setComments;
    const updateStashList = useEditorStore.getState().updateStashList;
    const updateVersionHistory = useEditorStore.getState().updateVersionHistory;
    if (!API_URL) {
      console.error('API_URL not defined');
      return;
    }
    const newSocket = io(API_URL, {
      path: '/socket.io',
      auth: {
        token: token,
        fileId: fileId,
        versionDetails
      },
      transports: ['websocket'],
      withCredentials: true,
    });

    newSocket.on('connect', () => {
      console.log('Connected to chat server');
    });
    newSocket.on('commentsUpdated', (data) => {
      setComments([
        ...data?.comments?.map((el: Comment) => ({
          ...el,
          userId: el?.user?._id,
          replies: el?.replies?.map((k) => ({
            ...k,
            userId: k?.user?._id,
          })),
        })),
      ]);
    });
    newSocket.on('connect_error', (error) => {
      enqueueSnackbar('Editor Disconnected !', { variant: 'error' });
      console.error('Connection error:', error.message);
    });
    newSocket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    newSocket.on('initialComments', (comments) => {
      setComments([
        ...comments?.map((el: Comment) => ({
          ...el,
          userId: el?.user?._id,
          replies: el?.replies?.map((k) => ({
            ...k,
            userId: k?.user?._id,
          })),
        })),
      ]);
    });

    newSocket.on('initialVersionHistory', (versionHistory) => {
      updateVersionHistory(versionHistory);
    });

    newSocket.on('stashesUpdated', (stashes: any) => {
      updateStashList(
        stashes?.map((el: any) => ({
          id: el?._id || el?.id,
          title: el.title,
          text: el.content,
          createdAt: el?.createdAt,
          updatedAt: el?.updatedAt,
          user: el?.user,
        })),
      );
    });

    newSocket.on('initialStashes', (stashes: any) => {
      console.log(stashes);
      updateStashList(
        stashes?.map((el: any) => ({
          id: el?._id || el?.id,
          title: el.title,
          text: el.content,
          createdAt: el?.createdAt,
          updatedAt: el?.updatedAt,
          user: el?.user,
        })),
      );
    });

    set({ socket: newSocket }, false, n(`connectSocket`));
  },
  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null }, false, n(`disconnectSocket`));
    }
  },
});
