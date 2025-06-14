export type WindowStackType = {
  userName: string;
  toUserId: string;
  type: 'group' | 'user';
};

// Define the type for the context value
export interface EditorChatType {
  isVisible: boolean;
  userName: string; // Current user's name
  toUserId: string;
  isGroup: boolean;
  showChat: boolean;
  showTabContainer: boolean;
  clickedTab: {
    comment: boolean;
    version: boolean;
    stash: boolean;
  };
  windowStack: WindowStackType[] | [];
}

const initialChatState: EditorChatType = {
  isVisible: true,
  userName: '',
  toUserId: '',
  isGroup: false,
  showChat: true,
  showTabContainer: false,
  clickedTab: {
    comment: false,
    version: true,
    stash: false,
  },
  windowStack: [],
};

export { initialChatState };
