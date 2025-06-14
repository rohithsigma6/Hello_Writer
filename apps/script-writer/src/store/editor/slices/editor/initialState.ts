// you can add multiple sidebar options for editor here and just update them using updateActiveSidebar function

import { User } from '@/types/api';
import { Editor } from '@tiptap/react';
import { SuggestionData } from '../file';
import { ScreenplayElement } from '@/types/scenes';

enum SidebarOptions {
  stash = 'stash',
  comments = 'comments',
  version = 'version',
  chat = 'chat',
  timer = 'timer',
}

export enum SaveStatus {
  Saving,
  Saved,
  NotSaved,
  Error,
}

export interface StashI {
  id: string;
  title: string;
  text: string;
  createdAt?: Date;
  updatedAt?: string;
  user?: Partial<User>;
}

export interface LanguageI {
  label: string;
  value: string;
}
export interface Comment {
  id: string;
  message: string;
  user?: any;
  userId?: string;
  lastUpdatedAt?: Date;
  replies: Array<{
    id: string;
    message: string;
    user: any;
    userId?: string;
    lastUpdatedAt?: string;
  }>;
}

export enum FilePermission {
  EDIT = 'EDIT',
  SUGGEST = 'SUGGEST',
  COMMENT = 'COMMENT',
  READ = 'READ',
  GUEST = 'GUEST',
  ADMIN = 'ADMIN',
  VIEW = 'VIEW',
}

export interface VersionHistory {
  updatedAt: Date;
  user: {
    name: string;
    _id: string;
  };
}

export interface EditorState {
  stashList: StashI[];
  isTransliterationPopupOpen: boolean;
  transliterationLanguage: LanguageI;
  //comments
  comments: Comment[];
  activeCommentId: string | null;
  isCommentPopupOpen: boolean;
  activeSideBar: null | SidebarOptions;
  editorJson: any;
  editor: Editor | null;
  scenesData: any[];
  saveStatus: SaveStatus;
  provider: any;
  filePermission: FilePermission | null;
  suggestions: any[];
  suggestionData: SuggestionData;
  selectedSuggestion: number;
  previousElement: ScreenplayElement;
  charactersData: Record<string, any>;
  locationsData: Record<string, any>;
  versionHistory: VersionHistory[];
  zoom: number;
  editorLeftSidebar: boolean;
  editorRightSidebar: boolean;
}

export const initialEditorState: EditorState = {
  stashList: [],
  isTransliterationPopupOpen: false,
  transliterationLanguage: { label: 'Hindi', value: 'hi' },
  comments: [],
  activeCommentId: '',
  isCommentPopupOpen: false,
  activeSideBar: null,
  editorJson: {} as Editor,
  editor: null,
  scenesData: [],
  saveStatus: SaveStatus.Saved,
  provider: null,
  filePermission: null,
  suggestions: [],
  suggestionData: {
    position: { x: 0, y: 0 },
    cursor: 0,
    cursorInNode: 0,
  },
  selectedSuggestion: 0,
  previousElement: ScreenplayElement.Action,
  charactersData: {},
  locationsData: {},
  versionHistory: [],
  zoom: 100,
  editorLeftSidebar: true,
  editorRightSidebar: false,
};

export { SidebarOptions };
