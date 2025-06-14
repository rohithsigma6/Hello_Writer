import { EditorStoreState } from '@/store/editor/initialState';

const stashList = (s: EditorStoreState) => s.stashList;
const isTransliterationPopupOpen = (s: EditorStoreState) =>
  s.isTransliterationPopupOpen;
const transliterationLanguage = (s: EditorStoreState) =>
  s.transliterationLanguage;
const comments = (s: EditorStoreState) => s.comments;
const activeCommentId = (s: EditorStoreState) => s.activeCommentId;
const isCommentPopupOpen = (s: EditorStoreState) => s.isCommentPopupOpen;
const activeSideBar = (s: EditorStoreState) => s.activeSideBar;
const editorJson = (s: EditorStoreState) => s.editorJson;
const editor = (s: EditorStoreState) => s.editor;
const pageCount = (s: EditorStoreState) => s.editorJson?.content?.length ?? 0;

const saveStatus = (s: EditorStoreState) => s.saveStatus;
const scenesData = (s: EditorStoreState) => s.scenesData;
const provider = (s: EditorStoreState) => s.provider;
const filePermission = (s: EditorStoreState) => s.filePermission;
const versionHistory = (s: EditorStoreState) => s.versionHistory;
const zoom = (s: EditorStoreState) => s.zoom;
const editorLeftSidebar = (s: EditorStoreState) => s.editorLeftSidebar;
const editorRightSidebar = (s: EditorStoreState) => s.editorRightSidebar;
export const editorSelectors = {
  stashList,
  isTransliterationPopupOpen,
  transliterationLanguage,
  comments,
  activeCommentId,
  isCommentPopupOpen,
  activeSideBar,
  editorJson,
  pageCount,
  editor,
  saveStatus,
  scenesData,
  provider,
  filePermission,
  versionHistory,
  zoom,
  editorLeftSidebar,
  editorRightSidebar,
};
