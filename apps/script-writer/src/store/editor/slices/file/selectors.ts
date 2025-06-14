import { EditorFileType } from './initialState';

const saving = (s: EditorFileType) => s.saving;
const refreshVer = (s: EditorFileType) => s.refreshVer;
const file = (s: EditorFileType) => s.file;
const scenesData = (s: EditorFileType) => s.scenesData;
const charactersData = (s: EditorFileType) => s.charactersData;
const locationsData = (s: EditorFileType) => s.locationsData;
const saveStatus = (s: EditorFileType) => s.saveStatus;
const isFileLoading = (s: EditorFileType) => s.isFileLoading;
const isContentLoading = (s: EditorFileType) => s.isContentLoading;
const isScriptImporting = (s: EditorFileType) => s.isScriptImporting;
const suggestions = (s: EditorFileType) => s.suggestions;
const suggestionData = (s: EditorFileType) => s.suggestionData;
const previousElement = (s: EditorFileType) => s.previousElement;
const previousNode = (s: EditorFileType) => s.previousNode;
const chatOpen = (s: EditorFileType) => s.chatOpen;
const chatOpenUser = (s: EditorFileType) => s.chatOpenUser;
const selectedSuggestion = (s: EditorFileType) => s.selectedSuggestion;
const activeColor = (s: EditorFileType) => s.activeColor;
const comments = (s: EditorFileType) => s.comments;
const activeCommentId = (s: EditorFileType) => s.activeCommentId;
const importData = (s: EditorFileType) => s.importData;

export const editorFileSelectors = {
  saving,
  refreshVer,
  file,
  scenesData,
  charactersData,
  locationsData,
  saveStatus,
  isFileLoading,
  isContentLoading,
  isScriptImporting,
  suggestions,
  suggestionData,
  previousElement,
  previousNode,
  chatOpen,
  chatOpenUser,
  selectedSuggestion,
  activeColor,
  comments,
  activeCommentId,
  importData,
};
