import { useEffect, useState } from 'react';
import {
  X,
  Pause,
  CircleStop,
  ChevronDown,
  ChevronUp,
  Play,
} from 'lucide-react';
import { toggleSearchParam } from '@/utils/searchparams-toggle';
import { SidebarOptions } from '@/store/editor/slices/editor';
import { useSearchParams } from 'react-router';
import { useTimerStore } from '@/store/editor';
import { calculateWordsCount, secondsToHHMMSS } from './timer-helper';

export const TimerModal = () => {
  const {
    isActive,
    pages,
    words,
    writingTime,
    thinkingTime,
    wordGoal,
    deadline,
    minutesGoal,
    sceneGoal,
    pageGoal,
    updateDeadline,
    updateMinutesGoal,
    updateWordGoal,
    resetTimer,
    updateIsActive,
    updateSceneGoal,
    updatePageGoal,

  } = useTimerStore((state) => state);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [searchParams, setSearchParam] = useSearchParams();

  const handleToggleTimer = () => {
    const newParams = toggleSearchParam(
      searchParams,
      'tab',
      SidebarOptions.timer,
    );
    setSearchParam(newParams);
  };


  const handleStopPlayTimer = () => {
    updateIsActive(!isActive);
  };

  const handleResetTimer = () => {
    resetTimer();
  };

  const deadlineSelectHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    const todayDate = new Date().toISOString().substring(0, 10);
    if (selectedDate < todayDate) {
      updateDeadline(todayDate); // set to today if it's in the past
    } else {
      updateDeadline(selectedDate); // keep user's selected date
    }
  }


  useEffect(() => {
    const timeout = setTimeout(() => {
      const clamped = Math.max(30, Math.min(99999, wordGoal));
      updateWordGoal(clamped);
    }, 500);

    return () => clearTimeout(timeout);
  }, [wordGoal]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const clamped = Math.max(2, Math.min(9999, minutesGoal));
      updateMinutesGoal(clamped);
    }, 500);

    return () => clearTimeout(timeout);
  }, [minutesGoal]);


  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Timer</h2>
          <button
            onClick={handleToggleTimer}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Today's counts */}
        <div className="mb-3 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-gray-700">Today's Word Counts</label>
            <input
              type="number"
              className="h-10 w-12 rounded-md border border-gray-200 flex items-center justify-center text-sm p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              value={calculateWordsCount(words)}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-gray-700">Today's Minutes Counts</label>
            <input
              type="number"
              className="h-10 w-12 rounded-md border border-gray-200 flex items-center justify-center text-sm p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              value={Math.floor((writingTime + thinkingTime) / 60)}
            />
          </div>
        </div>

        {/* Timer controls */}
        <div className="mb-6 flex gap-3">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 hover:bg-slate-50"
            onClick={handleStopPlayTimer}
          >
            {isActive ? <Pause /> : <Play />}
          </button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 hover:bg-slate-50"
            onClick={handleResetTimer}
          >
            <CircleStop />
          </button>
        </div>

        {/* Stats */}
        <div className="mb-3 py-4 text-sm text-gray-600 border-t border-b border-gray-200">
          {`Page ${pages} | ${calculateWordsCount(words)} Words | Writing: ${secondsToHHMMSS(writingTime)} | Thinking: ${secondsToHHMMSS(thinkingTime)}`}
        </div>

        {/* Advanced section */}
        <div className="mb-3">
          <button
            className="flex w-full items-center justify-between"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          >
            <h3 className="text-lg font-bold text-gray-900">Advanced</h3>
            {isAdvancedOpen ? <ChevronDown /> : <ChevronUp />}
          </button>

          {isAdvancedOpen && (
            <div className="mt-2 max-h-36 overflow-y-auto pr-2">
              <p className="text-sm text-gray-600 pb-3 border-b">
                Select a total word count and a deadline to see how many words a
                day you'll need to succeed
              </p>

              <div className="flex flex-col gap-2 mt-3">
                {/* Word Goal */}
                <div className="flex items-center justify-between">
                  <label className="text-gray-700">Word Goal</label>
                  <input
                    type="number"
                    className="h-10 w-12 rounded-md border border-gray-200 flex items-center justify-center text-sm p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    value={wordGoal}
                    onChange={(e) => { updateWordGoal(Number(e.target.value)) }}
                  />
                </div>

                {/* Page Goals */}
                <div className="flex items-center justify-between">
                  <label className="text-gray-700">Page Goal</label>
                  <input
                    type="number"
                    className="h-10 w-12 rounded-md border border-gray-200 flex items-center justify-center text-sm p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    value={pageGoal}
                    onChange={(e) => { updatePageGoal(Number(e.target.value)) }}
                  />
                </div>
              </div>

              {/* Scene Goal */}
              <div className="my-3">
                <div className="text-gray-700 mb-3">Scene Goal</div>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => updateSceneGoal(num)}
                      className={`flex h-10 w-10 items-center justify-center rounded-md border text-sm ${sceneGoal === num
                        ? 'border-indigo-500 bg-indigo-100 text-indigo-700'
                        : 'border-gray-200 text-gray-700'
                        }`}
                    >
                      {num}
                    </button>
                  ))}
                  <input
                    type="number"
                    placeholder="Custom"
                    className="h-10 w-20 rounded-md border border-gray-200 flex items-center justify-center text-sm p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    value={sceneGoal > 5 ? sceneGoal : ''}
                    onChange={(e) => { updateSceneGoal(Number(e.target.value)) }}
                  />
                </div>
              </div>

              {/* Minutes Goal */}
              <div className="my-3">
                <div className="text-gray-700 mb-3">Minutes Goal</div>
                <div className="flex gap-3">
                  {[15, 30, 45, 60, 120, 200].map((num) => (
                    <button
                      key={num}
                      onClick={() => updateMinutesGoal(num)}
                      className={`flex h-10 w-10 items-center justify-center rounded-md border text-sm ${minutesGoal === num
                        ? 'border-indigo-500 bg-indigo-100 text-indigo-700'
                        : 'border-gray-200 text-gray-700'
                        }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
              {/* Deadline */}
              <div className="my-3">
                <div className="text-gray-700 mb-3">Deadline</div>
                <input
                  type="date"
                  className="h-10 rounded-md border border-gray-200 px-4 text-gray-500"
                  onChange={deadlineSelectHandler}
                  value={deadline}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
