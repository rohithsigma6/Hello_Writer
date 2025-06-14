import { useEffect } from 'react';
import { saveLocalTimerData, loadLocalTimerData } from './useLocalTimerData';
import { calculateWordsCount } from '../timer-helper';

export const useTimerCleanupSync = ({
    fileId,
    versionId,
    latestDataRef,
    isSuccess,
    updateTimer,
}: any) => {
    useEffect(() => {
        return () => {
            if (!fileId || !versionId || !isSuccess) return;

            const todayDate = new Date().toISOString().substring(0, 10);
            const versionData = loadLocalTimerData(fileId, versionId);
            const startWords = versionData?.[todayDate]?.totalWordCountAtStartOfTheDay || 0;

            const {
                words,
                writingTime,
                thinkingTime,
                wordGoal,
                pageGoal,
                sceneGoal,
                minutesGoal,
                deadline,
            } = latestDataRef.current;

            const wordCount = calculateWordsCount(words) - startWords;
            const deadlineDate = deadline?.substring(0, 10);

            if (!deadlineDate) return;

            const isFutureDeadline = deadlineDate > todayDate;
            const isTodayDeadline = deadlineDate === todayDate;

            if (isTodayDeadline) {
                // ✅ Send actual stats for today
                updateTimer({
                    fileId,
                    version: versionId,
                    dailyGoal: {
                        wordCount,
                        writingTime,
                        thinkingTime,
                        minutesCount: Math.floor((writingTime + thinkingTime) / 60),
                        wordGoal,
                        pageGoal,
                        sceneGoal,
                        minutesGoal,
                        deadline: todayDate,
                    },
                });
            } else if (isFutureDeadline) {
                // ✅ 1st Call: send today’s progress (goals are empty)
                updateTimer({
                    fileId,
                    version: versionId,
                    dailyGoal: {
                        wordCount,
                        writingTime,
                        thinkingTime,
                        minutesCount: Math.floor((writingTime + thinkingTime) / 60),
                        wordGoal: 200,
                        pageGoal: 4,
                        sceneGoal: 2,
                        minutesGoal: 100,
                        deadline: todayDate,
                    },
                });

                // ✅ 2nd Call: set only future goals with zeroed stats
                updateTimer({
                    fileId,
                    version: versionId,
                    dailyGoal: {
                        wordCount: 0,
                        writingTime: 0,
                        thinkingTime: 0,
                        minutesCount: 0,
                        wordGoal,
                        pageGoal,
                        sceneGoal,
                        minutesGoal,
                        deadline: deadlineDate,
                    },
                });
            }

            // ✅ Save updated local timer data
            saveLocalTimerData(fileId, versionId, todayDate, {
                writingTime,
                thinkingTime,
                totalWordCountAtStartOfTheDay: startWords,
            });
        };
    }, [fileId, versionId, isSuccess]);
};
