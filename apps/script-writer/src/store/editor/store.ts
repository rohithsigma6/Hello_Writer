import { StateCreator } from 'zustand/vanilla';
import {
  ChatStoreState,
  CollabStoreState,
  DashboardStoreState,
  EditorStoreState,
  FileStoreState,
  initialState,
  TimerStoreState,
} from './initialState';
import { createEditorSlice, EditorAction } from './slices/editor';
import { createDevtools } from '../middleware/createDevTools';
import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import {
  createChatSlice,
  EditorChatAction,
  initialChatState,
} from './slices/chat';
import {
  CollabAction,
  createCollabSlice,
  initialCollabState,
} from './slices/collab';
import {
  createFileSlice,
  EditorFileAction,
  initialFileState,
} from './slices/file';
import {
  createDashboardSlice,
  DashboardAction,
  initialDashboardState,
} from './slices/dashboard';
import { createTimerSlice, TimerAction } from './slices/timer/action';
import { initialTimerState } from './slices/timer';

export type EditorStore = EditorStoreState & EditorAction;
export type ChatStore = ChatStoreState & EditorChatAction;
export type CollabStore = CollabStoreState & CollabAction;
export type FileStore = FileStoreState & EditorFileAction;
export type DashboardStore = DashboardStoreState & DashboardAction;
export type TimerStore = TimerStoreState & TimerAction;

const createStore: StateCreator<EditorStore, [['zustand/devtools', never]]> = (
  ...parameters
) => ({
  ...initialState,
  ...createEditorSlice(...parameters),
});

const createChatStore: StateCreator<
  ChatStore,
  [['zustand/devtools', never]]
> = (...parameters) => ({
  ...initialChatState,
  ...createChatSlice(...parameters),
});

const createCollabStore: StateCreator<
  CollabStore,
  [['zustand/devtools', never]]
> = (...parameters) => ({
  ...initialCollabState,
  ...createCollabSlice(...parameters),
});

const createFileStore: StateCreator<
  FileStore,
  [['zustand/devtools', never]]
> = (...parameters) => ({
  ...initialFileState,
  ...createFileSlice(...parameters),
});

const createDashboardStore: StateCreator<
  DashboardStore,
  [['zustand/devtools', never]]
> = (...parameters) => ({
  ...initialDashboardState,
  ...createDashboardSlice(...parameters),
});

const createTimerStore: StateCreator<
  TimerStore,
  [['zustand/devtools', never]]
> = (...parameters) => ({
  ...initialTimerState,
  ...createTimerSlice(...parameters),
});

const devtools = createDevtools('Editor');
const chatDevTools = createDevtools('Chat');
const collabDevTools = createDevtools('Collab');
const fileDevTools = createDevtools('File');
const dashboardDevTools = createDevtools('Dashboard');
const timerDevTools = createDevtools('Timer');

export const useEditorStore = createWithEqualityFn<EditorStore>()(
  devtools(createStore),
  shallow,
);

export const useEditorChatStore = createWithEqualityFn<ChatStore>()(
  chatDevTools(createChatStore),
  shallow,
);

export const useCollabStore = createWithEqualityFn<CollabStore>()(
  collabDevTools(createCollabStore),
  shallow,
);

export const useFileStore = createWithEqualityFn<FileStore>()(
  fileDevTools(createFileStore),
  shallow,
);

export const useDashboardStore = createWithEqualityFn<DashboardStore>()(
  dashboardDevTools(createDashboardStore),
  shallow,
);

export const useTimerStore = createWithEqualityFn<TimerStore>()(
  timerDevTools(createTimerStore),
  shallow,
);
