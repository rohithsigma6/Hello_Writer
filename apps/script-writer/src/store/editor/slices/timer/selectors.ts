import { TimerStoreState } from '@/store/editor/initialState';

const isActive = (s: TimerStoreState) => s.isActive;
const targetWordsCount = (s: TimerStoreState) => s.targetMinutesCount;
const targetMinutesCount = (s: TimerStoreState) => s.targetMinutesCount;
const words = (s: TimerStoreState) => s.words;
const pages = (s: TimerStoreState) => s.pages;
const writingTime = (s: TimerStoreState) => s.writingTime;
const thinkingTime = (s: TimerStoreState) => s.thinkingTime;
const isCelebrationModal = (s: TimerStoreState) => s.isCelebrationModal;

export const timerSelectors = {
  isActive,
  targetWordsCount,
  targetMinutesCount,
  words,
  pages,
  writingTime,
  thinkingTime,
  isCelebrationModal,
};
