import { StateCreator } from 'zustand/vanilla';
import { EditorStore } from '../../store';
import { setNamespace } from '@/utils/store-debug';
import {
  Comment,
  LanguageI,
  StashI,
  SidebarOptions,
  SaveStatus,
  initialEditorState,
} from './initialState';
import { useSocketStore } from '@/store/socket';
import { Editor } from '@tiptap/react';


export interface EditorAction {
  updateStashList: (s: StashI[]) => void;
  deleteStash: (id: string) => void;
  toggleTransliterationPopup: () => void;
  updateTransliterationLanguage: (l: LanguageI) => void;
  //comments Action
  setComments: (comments: Comment[]) => void;
  setActiveCommentId: (id: string | null) => void;
  addComment: (comment: Comment) => void;
  addReply: (commentId: string, reply: any) => void;
  updateComment: (commentId: string, updatedMessage: string) => void;
  deleteComment: (commentId: string) => void;
  toggleCommentPopup: () => void;

  setEditorJson: (editorJson: object) => void;
  setEditor: (editor: Editor | null) => void;

  //Editor
  updateScenesData: (sd: any[]) => void;
  updateSaveStatus: (s: SaveStatus) => void;
  updateProvider: (provider: any) => void;
  updateFilePermission: (s: any) => void;
  updateVersionHistory: (arr: any[]) => void;
  updateZoom: (zoom: number) => void;
  updateEditorLeftSidebar: (editorLeftSidebar: boolean) => void;
  updateEditorRightSidebar: (editorRightSidebar: boolean) => void;
  resetStore: () => void;
}

const n = setNamespace('session');

export const createEditorSlice: StateCreator<
  EditorStore,
  [['zustand/devtools', never]],
  [],
  EditorAction
> = (set, get) => ({
  updateStashList: (updatedStashes: StashI[]) =>
    set(
      (state) => ({
        ...state,
        stashList: updatedStashes,
      }),
      false,
      n(`updateStashList`),
    ),
  deleteStash: (id) => {
    set(
      (state) => ({
        ...state,
        stashList: state.stashList.filter((stash) => stash.id !== id),
      }),
      false,
      n(`deleteStash`),
    );
  },
  updateActiveSidebar: (active: SidebarOptions) =>
    set(
      (state) => ({
        ...state,
        activeSideBar: active,
      }),
      false,
      n(`updateActiveSidebar`),
    ),

  toggleTransliterationPopup: () => {
    set(
      (state) => ({
        ...state,
        isTransliterationPopupOpen: !state.isTransliterationPopupOpen,
      }),
      false,
      n(`toggleTransliterationPopup`),
    );
  },

  toggleCommentPopup: () => {
    set(
      (state) => ({
        ...state,
        isCommentPopupOpen: !state.isCommentPopupOpen,
      }),
      false,
      n(`toggleCommentPopup`),
    );
  },

  updateTransliterationLanguage: (lang: LanguageI) => {
    set(
      (state) => ({
        ...state,
        transliterationLanguage: lang,
      }),
      false,
      n(`updateLanguage`),
    );
  },
  setComments: (comments: Comment[]) =>
    set((state) => ({ ...state, comments }), false, n(`setComments`)),
  setActiveCommentId: (id: string | null) =>
    set(
      (state) => ({ ...state, activeCommentId: id }),
      false,
      n(`setCommentId`),
    ),

  addComment: (comment: Comment) => {
    const { socket } = useSocketStore.getState();
    if (socket) {
      socket.emit('addComment', comment);
    }
  },

  addReply: (commentId: string, reply: any) => {
    const state = get();
    const updatedComments = state.comments.map((comment) => {
      if (comment.id === commentId) {
        const updatedReplies = [
          ...comment.replies,
          { ...reply, userId: reply.user?._id || reply.user.id },
        ];
        return { ...comment, replies: updatedReplies };
      }
      return comment;
    });
    // After updating, retrieve the updated comment and emit an update
    const { socket } = useSocketStore.getState();
    if (socket && updatedComments) {
      socket.emit('updateComment', updatedComments);
    }
    set(
      (state) => ({
        ...state,
        comments: updatedComments,
        activeCommentId: commentId,
      }),
      false,
      n(`addReply`),
    );
  },

  updateComment: (commentId: string, updatedMessage: string) => {
    const state = get();
    const updatedComments = state.comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          message: updatedMessage,
          lastUpdatedAt: new Date(),
          replies: comment.replies.map((reply) => ({
            ...reply,
            userId: reply.userId ?? (reply.user?._id || reply.user.id),
          })),
        };
      }
      return comment;
    });
    const { socket } = useSocketStore.getState();
    if (socket && updatedComments) {
      socket.emit('updateComment', updatedComments);
    }
    set(
      (state) => ({
        ...state,
        comments: updatedComments,
      }),
      false,
      n(`updateComment`),
    );
  },

  deleteComment: (commentId: string) => {
    const state = get();
    const { socket } = useSocketStore.getState();
    if (socket) {
      socket.emit('removeComment', commentId);
    }
    const updatedComments = state.comments.filter(
      (comment) => comment.id !== commentId,
    );
    set(
      (state) => ({
        ...state,
        comments: updatedComments,
      }),
      false,
      n(`deleteComment`),
    );
  },

  setEditorJson: (editorJson: any) => {
    set((state) => ({ ...state, editorJson }), false, n(`setEditorJson`));
  },

  setEditor: (editor: any) => {
    set((state) => ({ ...state, editor }), false, n(`setEditorJson`));
  },

  updateScenesData: (scenesData: any[]) => {
    set(
      (state) => ({ ...state, scenesData: scenesData }),
      false,
      n(`updateScenesData`),
    );
  },
  updateSaveStatus: (saveStatus) => {
    set(
      (state) => ({ ...state, saveStatus: saveStatus }),
      false,
      n(`updateSaveStatus`),
    );
  },
  updateProvider: (provider) => {
    set(
      (state) => ({ ...state, provider: provider }),
      false,
      n(`updateProvider`),
    );
  },

  updateFilePermission: (permission) => {
    set(
      (state) => ({ ...state, filePermission: permission }),
      false,
      n(`updateFilePermission`),
    );
  },

  updateVersionHistory: (versionHistory) => {
    set(
      (state) => ({ ...state, versionHistory }),
      false,
      n(`updateVersionHistory`),
    );
  },

  updateZoom: (zoom) => {
    set((state) => ({ ...state, zoom }), false, n(`updateZoom`));
  },

  updateEditorLeftSidebar: (editorLeftSidebar) => {
    set(
      (state) => ({ ...state, editorLeftSidebar }),
      false,
      n(`updateEditorLeftSidebar`),
    );
  },

  updateEditorRightSidebar: (editorRightSidebar) => {
    set(
      (state) => ({ ...state, editorRightSidebar }),
      false,
      n(`updateEditorRightSidebar`),
    );
  },
  resetStore: () => {
    // Reset all editor state to the initial state
    set(initialEditorState, false, n('resetStore'));

    // Clear any socket subscriptions if needed
    const { socket } = useSocketStore.getState();
    if (socket) {
      socket.off('initialStashes');
      socket.off('stashesUpdated');
      socket.off('initialVersionHistory');
      socket.off('initialComments');
      socket.off('connect_error');
      socket.off('error');
      socket.off("commentsUpdated")
      socket.off("connect")
    }

    // Clear editor reference if needed
    const editor = get().editor;
    if (editor) {
      editor.destroy();
      set({ editor: null });
    }
  },
});
