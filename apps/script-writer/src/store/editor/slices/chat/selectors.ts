import { ChatStoreState } from '@/store/editor/initialState';

const isVisible = (s: ChatStoreState) => s.isVisible;
const userName = (s: ChatStoreState) => s.userName;
const toUserId = (s: ChatStoreState) => s.toUserId;
const isGroup = (s: ChatStoreState) => s.isGroup;
const showChat = (s: ChatStoreState) => s.showChat;
const showTabContainer = (s: ChatStoreState) => s.showTabContainer;
const clickedTab = (s: ChatStoreState) => s.clickedTab;
const windowStack = (s: ChatStoreState) => s.windowStack;

export const editorChatSelectors = {
  isVisible,
  userName,
  toUserId,
  isGroup,
  showChat,
  showTabContainer,
  clickedTab,
  windowStack,
};
