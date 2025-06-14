import { setNamespace } from '@/utils/store-debug';
import { FileI, SuggestionData, User } from './initialState';
import { ScreenplayElement, SaveStatus } from '@screenplay-ink/editor';
import { StateCreator } from 'zustand';
import { FileStore } from '../../store';
import { io } from 'socket.io-client';
import { env } from '@/config/env';

export interface EditorFileAction {
  updateSaving: (saving: boolean) => void;
  updateVersion: (refreshVer: number) => void;
  updateFile: (file: FileI | undefined) => void;
  updateScenesData: (scenesData: any[]) => void;
  updateCharactersData: (charactersData: Record<string, any>) => void;
  updateSaveStatus: (saveStatus: SaveStatus) => void;
  updateSuggestions: (suggestions: any[]) => void;
  updateSuggestionData: (suggestionData: SuggestionData) => void;
  updatePreviousElement: (previousElement: ScreenplayElement) => void;
  updateFileTitle: (fileTitle: string) => void;
  updateFileLoading: (isFileLoading: boolean) => void;
  updateContentLoading: (isContentLoading: boolean) => void;
  updateLocationsData: (locationsData: Record<string, any>) => void;
  updatePreviousNode: (previousNode: any) => void;
  updateChatWindow: (chatWindow: boolean) => void;
  setIsScriptImporting: (isScriptImporting: boolean) => void;
  updateScriptLoading: (isScriptImporting: boolean) => void;
  updateSelection: (selectedSuggestion: number) => void;
  updateChatWindowUser: (chatWindowUser: boolean) => void;
  updateActiveColor: (activeColor: string) => void;
  setComments: (comments: any[]) => void;
  setActiveCommentId: (activeCommentId: string | null) => void;
  connectSocket: (socket: any) => void;
  addComment: (comment: any) => void;
  addReply: (commentId: string, reply: any) => void;
  updateComment: (commentId: string, updatedMessage: string) => void;
  deleteComment: (commentId: string) => void;
  updateChatOpen: (chatOpen: boolean) => void;
  updateChatOpenUser: (chatOpenUser: boolean) => void;
  updateComments: (comments: any[]) => void;
  updateActiveCommentId: (activeCommentId: string | null) => void;
  updateImportData: (importData: any) => void;
}

const n = setNamespace('session');
const API_URL = env.API_URL;

export const createFileSlice: StateCreator<
  FileStore,
  [['zustand/devtools', never]],
  [],
  EditorFileAction
> = (set, get) => ({
  updateSaving: (saving) =>
    set(
      (state) => ({
        ...state,
        saving,
      }),
      false,
      n(`updateSaving`),
    ),
  updateVersion: (refreshVer) =>
    set(
      (state) => ({
        ...state,
        refreshVer,
      }),
      false,
      n(`updateVersion`),
    ),
  updateFile: (file) =>
    set(
      (state) => ({
        ...state,
        file,
      }),
      false,
      n(`updateFile`),
    ),
  updateScenesData: (scenesData) =>
    set(
      (state) => ({
        ...state,
        scenesData,
      }),
      false,
      n(`updateScenesData`),
    ),
  updateCharactersData: (charactersData) =>
    set(
      (state) => ({
        ...state,
        charactersData,
      }),
      false,
      n(`updateCharactersData`),
    ),
  updateSaveStatus: (saveStatus) =>
    set(
      (state) => ({
        ...state,
        saveStatus,
      }),
      false,
      n(`updateSaveStatus`),
    ),
  updateSuggestions: (suggestions) =>
    set(
      (state) => ({
        ...state,
        suggestions,
      }),
      false,
      n(`updateSuggestions`),
    ),
  updateSuggestionData: (suggestionData) =>
    set(
      (state) => ({
        ...state,
        suggestionData,
      }),
      false,
      n(`updateSuggestionData`),
    ),
  updatePreviousElement: (previousElement) =>
    set(
      (state) => ({
        ...state,
        previousElement,
      }),
      false,
      n(`updatePreviousElement`),
    ),
  updateFileTitle: (fileTitle) =>
    set(
      (state) => ({
        ...state,
        file: state.file ? { ...state.file, title: fileTitle } : state.file,
      }),
      false,
      n(`updateFileTitle`),
    ),
  updateFileLoading: (isFileLoading) =>
    set(
      (state) => ({
        ...state,
        isFileLoading,
      }),
      false,
      n(`updateFileLoading`),
    ),
  updateContentLoading: (isContentLoading) =>
    set(
      (state) => ({
        ...state,
        isContentLoading,
      }),
      false,
      n(`updateContentLoading`),
    ),
  updateLocationsData: (locationsData) =>
    set(
      (state) => ({
        ...state,
        locationsData,
      }),
      false,
      n(`updateLocationsData`),
    ),
  updatePreviousNode: (previousNode) =>
    set(
      (state) => ({
        ...state,
        previousNode,
      }),
      false,
      n(`updatePreviousNode`),
    ),
  updateChatWindow: (chatWindow) =>
    set(
      (state) => ({
        ...state,
        chatOpen: chatWindow,
      }),
      false,
      n(`updateChatWindow`),
    ),
  setIsScriptImporting: (isScriptImporting) =>
    set(
      (state) => ({
        ...state,
        isScriptImporting,
      }),
      false,
      n(`setIsScriptImporting`),
    ),
  updateScriptLoading: (isScriptImporting) =>
    set(
      (state) => ({
        ...state,
        isScriptImporting,
      }),
      false,
      n(`updateScriptLoading`),
    ),
  updateChatOpen: (chatOpen) =>
    set(
      (state) => ({
        ...state,
        chatOpen,
      }),
      false,
      n(`updateChatOpen`),
    ),
  updateChatOpenUser: (chatOpenUser) =>
    set(
      (state) => ({
        ...state,
        chatOpenUser,
      }),
      false,
      n(`updateChatOpenUser`),
    ),
  updateSelection: (selectedSuggestion) =>
    set(
      (state) => ({
        ...state,
        selectedSuggestion,
      }),
      false,
      n(`updateSelectedSuggestion`),
    ),
  updateActiveColor: (activeColor) =>
    set(
      (state) => ({
        ...state,
        activeColor,
      }),
      false,
      n(`updateActiveColor`),
    ),
  updateComments: (comments) =>
    set(
      (state) => ({
        ...state,
        comments,
      }),
      false,
      n(`updateComments`),
    ),
  updateActiveCommentId: (activeCommentId) =>
    set(
      (state) => ({
        ...state,
        activeCommentId,
      }),
      false,
      n(`updateActiveCommentId`),
    ),
  updateChatWindowUser: (chatWindowUser) =>
    set(
      (state) => ({
        ...state,
        chatOpenUser: chatWindowUser,
      }),
      false,
      n(`updateChatWindowUser`),
    ),
  setComments: (comments) =>
    set(
      (state) => ({
        ...state,
        comments,
      }),
      false,
      n(`setComments`),
    ),
  setActiveCommentId: (activeCommentId) =>
    set(
      (state) => ({
        ...state,
        activeCommentId,
      }),
      false,
      n(`setActiveCommentId`),
    ),
  connectSocket: ({ user, file }: { user: User; file: string }) => {
    const socket = io(API_URL, {
      path: '/socket.io',
      auth: {
        token: user.token,
        fileId: file,
      },
      transports: ['websocket'],
      withCredentials: true,
    });
    set(
      (state) => ({
        ...state,
        socket,
      }),
      false,
      n(`connectSocket`),
    );
  },
  addComment: (comment) => {
    const state = get();
    comment.userId = comment.user._id;
    for (const reply of comment.replies) {
      reply.userId = reply.user._id;
    }
    state.socket.emit('addComment', comment);
    set(
      (state) => ({
        ...state,
        comments: [...state.comments, comment],
        activeCommentId: comment.id,
      }),
      false,
      n(`addComment`),
    );
  },
  addReply: (commentId, reply) => {
    const state = get();
    const updatedComments = state.comments.map((comment) => {
      if (comment.id === commentId) {
        const updatedReplies = [
          ...comment.replies,
          {
            ...reply,
            userId: reply.user._id,
          },
        ];

        return {
          ...comment,
          replies: updatedReplies,
          userId: comment.userId ? comment.userId : comment.user._id,
        };
      }
      return comment;
    });
    const updatedComment = updatedComments.find((c) => c.id === commentId);
    if (updatedComment) {
      state.socket.current?.emit('updateComment', updatedComment);
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
  updateComment: (commentId, updatedMessage) => {
    const state = get();
    const updatedComments = state.comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          message: updatedMessage,
          userId: comment.userId ? comment.userId : comment.user._id,
          lastUpdatedAt: new Date().toISOString(), // Update the timestamp
          replies: comment.replies.map((reply: any) => {
            return {
              ...reply,
              userId: reply.userId ? reply.userId : reply.user?._id,
            };
          }),
        };
      }
      return comment;
    });
    const updatedComment = updatedComments.find((c) => c.id === commentId);
    if (updatedComment) {
      state.socket.current?.emit('updateComment', updatedComment);
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
  deleteComment: (commentId) => {
    const state = get();
    const updatedComments = state.comments.filter(
      (comment) => comment.id !== commentId,
    );
    state.socket.current?.emit('deleteComment', commentId);
    set(
      (state) => ({
        ...state,
        comments: updatedComments,
      }),
      false,
      n(`deleteComment`),
    );
  },
  updateImportData: (importData) =>
    set(
      (state) => ({
        ...state,
        importData: importData,
      }),
      false,
      n(`updateImportData`),
    ),
});
