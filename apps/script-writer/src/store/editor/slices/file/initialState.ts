import { ScreenplayElement, SaveStatus } from '@screenplay-ink/editor';

export interface User {
  token: string;
}

export interface UserIdI {
  _id: string;
  firstName: string;
  firstname?: string;
  lastName: string;
  email: string;
  googleId: string;
  isAdmin: boolean;
  isVerified: boolean;
  colorCode: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  role: string;
}

export interface CollaboratorsI {
  _id: string;
  userId: UserIdI;
  __v: number;
  permissionType: string;
}

export interface FileI {
  _id: string;
  userId: string;
  title: string;
  subTitle: string;
  basedOn: string;
  writtenBy: any;
  prefix: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  permissionType?: 'ADMIN' | 'VIEW' | 'EDIT' | 'SUGGEST';
  __v: number;
  collabrators: CollaboratorsI[];
  collaborators: any;
}

export interface Comment {
  id: string;
  message: string;
  user: any;
  userId?: string;
  lastUpdatedAt?: Date;
  replies: {
    id: string;
    message: string;
    user: any;
    userId?: string;
  }[];
}

export interface SuggestionData {
  position: { x: number; y: number };
  cursor: number;
  cursorInNode: number;
}

export interface EditorFileType {
  saving: boolean;
  refreshVer: number;
  file: FileI | undefined;
  scenesData: any[];
  charactersData: Record<string, any>;
  locationsData: Record<string, any>;
  saveStatus: SaveStatus;
  isFileLoading: boolean;
  isContentLoading: boolean;
  isScriptImporting: boolean;
  suggestions: any[];
  suggestionData: SuggestionData;
  previousElement: ScreenplayElement;
  previousNode: any;
  chatOpen: boolean;
  chatOpenUser: boolean;
  selectedSuggestion: number;
  activeColor: string;
  comments: any[];
  activeCommentId: string | null;
  highlightedCommentId: string | null;
  socket: any;
  importData: any;
}

const initialFileState: EditorFileType = {
  saving: false,
  refreshVer: 0,
  file: undefined,
  scenesData: [],
  saveStatus: SaveStatus.Saved,
  isFileLoading: true,
  isContentLoading: true,
  isScriptImporting: false,
  suggestions: [],
  suggestionData: {
    position: { x: 0, y: 0 },
    cursor: 0,
    cursorInNode: 0,
  },
  previousElement: ScreenplayElement.Action,
  previousNode: null,
  chatOpen: false,
  chatOpenUser: false,
  selectedSuggestion: 0,
  activeColor: 'White',
  comments: [],
  activeCommentId: null,
  charactersData: {},
  locationsData: {},
  highlightedCommentId: null,
  socket: null,
  importData: null,
};

export { initialFileState };
