import { StateCreator } from 'zustand/vanilla';
import { TimerStore } from '../../store';
import { setNamespace } from '@/utils/store-debug';
import { initialTimer, TimerState } from './initialState';

export interface TimerAction {
  updateIsActive: (s: TimerState['isActive']) => void;
  updateWords: (s: TimerState['words']) => void;
  updatePages: (s: TimerState['pages']) => void;
  updateWritingTime: (s: TimerState['writingTime']) => void;
  updateThinkingTime: (s: TimerState['thinkingTime']) => void;
  resetTimer: () => void;
  updateIsCelebrationModal: (s: TimerState['isCelebrationModal']) => void;
  updateWordGoal:(s:TimerState['pageGoal'])=>void
  updatePageGoal: (s: TimerState['pageGoal']) => void;
  updateSceneGoal: (s: TimerState['sceneGoal']) => void;
  updateMinutesGoal: (s: TimerState['minutesGoal']) => void;
  updateDeadline: (s: TimerState['deadline']) => void;
}

const n = setNamespace('session');

export const createTimerSlice: StateCreator<
  TimerStore,
  [['zustand/devtools', never]],
  [],
  TimerAction
> = (set, get) => ({
  updateIsActive: (isActive) =>
    set(
      (state) => ({
        ...state,
        isActive: isActive,
      }),
      false,
      n(`updateIsActive`),
    ),
  updateWords: (words) =>
    set(
      (state) => ({
        ...state,
        words: words,
      }),
      false,
      n(`updateWords`),
    ),
  updatePages: (pages) =>
    set(
      (state) => ({
        ...state,
        pages: pages,
      }),
      false,
      n(`updatePages`),
    ),
  updateWritingTime: (writingTime) =>
    set(
      (state) => ({
        ...state,
        writingTime: writingTime,
      }),
      false,
      n(`updateWritingTime`),
    ),
  updateThinkingTime: (thinkingTime) =>
    set(
      (state) => ({
        ...state,
        thinkingTime: thinkingTime,
      }),
      false,
      n(`updateThinkingTime`),
    ),
  resetTimer: () => set(() => initialTimer),
  updateIsCelebrationModal: (isCelebrationModal) =>
    set(
      (state) => ({
        ...state,
        isCelebrationModal: isCelebrationModal,
      }),
      false,
      n(`updateIsCelebrationModal`),
    ),
    updateWordGoal:(wordGoal)=>
      set(
        (state)=>({
          ...state,
          wordGoal:wordGoal,
        }),
        false,
        n('updateWordGoal')
      ),
    updatePageGoal: (pageGoal) =>set(
      (state) => ({
        ...state,
        pageGoal: pageGoal,
      }),
      false,
      n(`updatePageGoal`),
    ),
  updateSceneGoal: (sceneGoal) =>set(
    (state) => ({
        ...state,
        sceneGoal: sceneGoal,
      }),
      false,
      n(`updateSceneGoal`),
    ),
  updateMinutesGoal: (minutesGoal) =>set(
    (state) => ({
        ...state,
        minutesGoal: minutesGoal,
      }),
      false,
      n(`updateMinutesGoal`),
    ),
  updateDeadline: (deadline) =>set(
    (state) => ({
        ...state,
        deadline: deadline,
      }),
      false,
      n(`updateDeadline`),
    ),
});
