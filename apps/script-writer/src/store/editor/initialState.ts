import { EditorChatType, initialChatState } from './slices/chat/initialState';
import { CollabType, initialCollabState } from './slices/collab/initialState';
import { EditorState, initialEditorState } from './slices/editor';
import { EditorFileType, initialFileState } from './slices/file/initialState';
import {
  DashboardType,
  initialDashboardState,
} from './slices/dashboard/initialState';
import { initialTimerState, TimerState } from './slices/timer/initialState';

export type EditorStoreState = EditorState;
export type ChatStoreState = EditorChatType;
export type CollabStoreState = CollabType;
export type FileStoreState = EditorFileType;
export type DashboardStoreState = DashboardType;
export type TimerStoreState = TimerState;

export const initialState: EditorStoreState = {
  ...initialEditorState,
};

export const chastState: ChatStoreState = {
  ...initialChatState,
};

export const collabState: CollabStoreState = {
  ...initialCollabState,
};

export const fileState: FileStoreState = {
  ...initialFileState,
};

export const dashboardState: DashboardStoreState = {
  ...initialDashboardState,
};

export const timerState: TimerStoreState = {
  ...initialTimerState,
};
