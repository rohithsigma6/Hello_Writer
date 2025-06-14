import { useEffect } from 'react';
import { saveLocalTimerData, loadLocalTimerData, removeOldTimerData } from './useLocalTimerData';
import { calculateWordsCount } from '../timer-helper';

export const useTimerSyncOnMount = ({
    fileId,
    versionId,
    words,
    wordGoal,
    pageGoal,
    sceneGoal,
    minutesGoal,
    updateTimer,
    updateWritingTime,
    updateThinkingTime,
}: any) => {
    useEffect(() => {
        if (!fileId || !versionId || !words) return;

        const todayDate = new Date().toISOString().substring(0, 10);
        const versionData = loadLocalTimerData(fileId, versionId);
        const todayData = versionData?.[todayDate];

        if (todayData) {
            updateWritingTime(todayData.writingTime);
            updateThinkingTime(todayData.thinkingTime);
        } else {
            const dates = Object.keys(versionData || {});
            const lastDate = dates[dates.length - 1];
            const lastStats = lastDate ? versionData?.[lastDate] : null;

            if (lastStats) {
                updateTimer({
                    fileId,
                    version: versionId,
                    dailyGoal: {
                        wordCount: calculateWordsCount(words) - lastStats.totalWordCountAtStartOfTheDay,
                        writingTime: lastStats.writingTime,
                        thinkingTime: lastStats.thinkingTime,
                        minutesCount: Math.floor((lastStats.writingTime + lastStats.thinkingTime) / 60),
                        wordGoal,
                        pageGoal,
                        sceneGoal,
                        minutesGoal,
                        deadline: lastDate,
                    },
                });
                removeOldTimerData(fileId, versionId, lastDate);
            }

            saveLocalTimerData(fileId, versionId, todayDate, {
                writingTime: 0,
                thinkingTime: 0,
                totalWordCountAtStartOfTheDay: calculateWordsCount(words),
            });
        }
    }, [fileId, versionId, words]);
};
