import { useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router';
import { useEditorStore, useTimerStore } from '@/store/editor';
import { useTimer } from '@/features/file/screenplay/api/get-timer-data';
import { useUpdateTimer } from '@/features/file/screenplay/api/update-timer-data';
import { useVersionHistory } from '@/features/file/screenplay/api/get-snapshot-versions';

import { useEditorTracking } from './hooks/useEditorTracking';
import { useTimerSyncOnMount } from './hooks/useTimerSyncOnMount';
import { useTimerCleanupSync } from './hooks/useTimerCleanupSync';
import { calculateWordsCount } from './timer-helper';

export const TimerUpdater = () => {
  const { editor } = useEditorStore((state) => state);
  const {
    isActive, words, writingTime, thinkingTime,
    wordGoal, pageGoal, sceneGoal, minutesGoal, deadline,
    updateWords, updatePages, updateWritingTime, updateThinkingTime,
    updateWordGoal, updatePageGoal, updateSceneGoal, updateMinutesGoal,
    updateDeadline, updateIsCelebrationModal,
  } = useTimerStore((state) => state);

  const [params] = useSearchParams();
  const { fileId } = useParams();
  const [versionId, setVersionId] = useState<string | null>(null);

  const { data: versionHistory } = useVersionHistory({ fileId: fileId! });
  const { data: timerData, isSuccess } = useTimer({ fileId: fileId!, versionId: versionId! });
  const { mutate: updateTimer } = useUpdateTimer();

  const latestDataRef = useRef({ words, writingTime, thinkingTime, wordGoal, pageGoal, sceneGoal, minutesGoal, deadline });

  const { isWritingRef, lastActivityTimeRef } = useEditorTracking(editor, isActive, updateWords, updatePages);

  useEffect(() => {
    if (!editor || !isActive) return;
    const interval = setInterval(() => {
      const now = Date.now();
      const idleTime = now - lastActivityTimeRef.current;
      if (isWritingRef.current || idleTime < 2000) {
        updateWritingTime(latestDataRef.current.writingTime + 1);
        isWritingRef.current = false;
      } else {
        updateThinkingTime(latestDataRef.current.thinkingTime + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    latestDataRef.current = { words, writingTime, thinkingTime, wordGoal, pageGoal, sceneGoal, minutesGoal, deadline };
  }, [words, writingTime, thinkingTime, wordGoal, pageGoal, sceneGoal, minutesGoal, deadline]);

  useEffect(() => {
    if (versionHistory) {
      const versionName = params.get('versionName') || 'V1';
      const version = versionHistory.versionList.find((v) => v.versionName === versionName);
      setVersionId(version?._id || null);
    }
  }, [versionHistory, params]);

  useEffect(() => {
    if (!editor || !isActive) return;
    if (calculateWordsCount(words) === wordGoal) updateIsCelebrationModal(true);
  }, [words, wordGoal]);

  useEffect(() => {
    const today = new Date().toISOString().substring(0, 10);
    if (timerData && isSuccess && today === timerData.deadline.substring(0, 10)) {
      updateWordGoal(timerData.wordGoal);
      updatePageGoal(timerData.pageGoal);
      updateSceneGoal(timerData.sceneGoal);
      updateMinutesGoal(timerData.minutesGoal);
      updateDeadline(timerData.deadline.substring(0, 10));
    }
  }, [timerData, isSuccess]);

  useTimerSyncOnMount({ fileId, versionId, words, wordGoal, pageGoal, sceneGoal, minutesGoal, updateTimer, updateWritingTime, updateThinkingTime });

  useTimerCleanupSync({ fileId, versionId, latestDataRef, isSuccess, updateTimer });

  return null;
};
