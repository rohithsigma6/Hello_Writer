import { StateCreator } from 'zustand/vanilla';
import { ChatStore } from '../../store';
import { setNamespace } from '@/utils/store-debug';
import { EditorChatType } from './initialState';

export interface EditorChatAction {
  updateIsVisibleStatus: (s: EditorChatType['isVisible']) => void;
  updateUser: (s: EditorChatType['userName']) => void;
  updateToUserId: (s: EditorChatType['toUserId']) => void;
  updateIsGroup: (s: EditorChatType['isGroup']) => void;
  updateShowChat: (s: EditorChatType['showChat']) => void;
  handleIsVisible: (s: EditorChatType['isVisible']) => void;
  handleShowChat: (s: EditorChatType['showChat']) => void;
  handleIsGroup: (s: EditorChatType['isGroup']) => void;
  handleRemoveChat: () => void;
  toggleTabContainer: () => void;
  setClickedTab: (args: any) => void;
  setWindowStack: (args: EditorChatType['windowStack']) => void;
}

const n = setNamespace('session');

export const createChatSlice: StateCreator<
  ChatStore,
  [['zustand/devtools', never]],
  [],
  EditorChatAction
> = (set, get) => ({
  updateIsVisibleStatus: () =>
    set(
      (state) => ({
        ...state,
        showTabContainer: false,
        showChat: !state.showChat,
      }),
      false,
      n(`updateIsVisibleStatus`),
    ),
  updateUser: (arg) =>
    set(
      (state) => ({
        ...state,
        userName: arg,
      }),
      false,
      n(`updateUser`),
    ),
  updateToUserId: (arg) =>
    set(
      (state) => ({
        ...state,
        toUserId: arg,
      }),
      false,
      n(`updateToUserId`),
    ),
  updateIsGroup: (arg) =>
    set(
      (state) => ({
        ...state,
        isGroup: arg,
      }),
      false,
      n(`updateIsGroup`),
    ),
  updateShowChat: () =>
    set(
      (state) => ({
        ...state,
        showChat: !state.showChat,
      }),
      false,
      n(`updateShowChat`),
    ),
  handleIsVisible: (arg) => {
    set(
      (state) => ({
        ...state,
        isVisible: arg,
      }),
      false,
      n(`handleIsVisible`),
    );
  },
  handleShowChat: (arg) => {
    set(
      (state) => ({
        ...state,
        showChat: arg,
      }),
      false,
      n(`handleShowChat`),
    );
  },
  handleIsGroup: (arg) => {
    set(
      (state) => ({
        ...state,
        isGroup: arg,
      }),
      false,
      n(`handleIsGroup`),
    );
  },
  handleRemoveChat: () =>
    set(
      (state) => ({
        ...state,
        isVisible: false,
        showChat: false,
        userName: '',
        toUserId: '',
        isGroup: false,
      }),
      false,
      n(`handleRemoveChat`),
    ),
  toggleTabContainer: () => {
    set((state) => ({
      ...state,
      isVisible: false,
      showChat: !state.showChat,
    }));
  },
  setClickedTab: (args) => {
    set((state) => ({
      ...state,
      clickedTab: args,
    }));
  },
  setWindowStack: (args) => {
    set((state) => ({
      ...state,
      windowStack: args,
    }));
  },
});
