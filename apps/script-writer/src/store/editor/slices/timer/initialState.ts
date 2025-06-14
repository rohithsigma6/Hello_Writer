export interface TimerState {
  isActive: boolean;
  words: string;
  pages: number;
  writingTime: number;
  thinkingTime: number;
  isCelebrationModal: boolean;
  wordGoal:number;
  pageGoal: number;
  sceneGoal: number;
  minutesGoal: number;
  deadline:string ;
}

export const initialTimer = {
  isActive: false,
  targetWordsCount: 150,
  targetMinutesCount: 120,
  words: '',
  pages: 1,
  writingTime: 0,
  thinkingTime: 0,
  isCelebrationModal: false,
};

export const initialTimerState: TimerState = {
  isActive: false,
  words: '',
  pages: 1,
  writingTime: 0,
  thinkingTime: 0,
  isCelebrationModal: false,
  wordGoal:200,
  pageGoal: 4,
  sceneGoal: 2,
  minutesGoal: 100,
  deadline: new Date().toISOString().substring(0, 10),
};
