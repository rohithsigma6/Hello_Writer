import { useTimerStore } from '@/store/editor';
import { calculateWordsCount, secondsToHHMMSS } from './timer-helper';
import { useEffect, useMemo, useState } from 'react';

type Props = {
  handleToggleTimer: () => void;
};

export const TimerResource = ({ handleToggleTimer }: Props) => {
  const { words, pages, thinkingTime, writingTime } = useTimerStore(
    (state) => state,
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const values = useMemo(
    () => [
      { type: 'Words', value: calculateWordsCount(words) },
      { type: 'Pages', value: pages },
      { type: 'Thinking', value: secondsToHHMMSS(thinkingTime) },
      { type: 'Writing', value: secondsToHHMMSS(writingTime) },
    ],
    [words, pages, thinkingTime, writingTime],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % values.length);
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentIndex, values.length]);

  return (
    <button
      className="flex flex-col items-center justify-center rounded-[12px] h-[40px] w-[40px] border border-indigo-500 bg-indigo-100 text-indigo-500 text-[8px] truncate"
      onClick={handleToggleTimer}
    >
      <span className="text-[7px] leading-tight">
        {values[currentIndex]?.type}
      </span>
      <span className="text-[8px] leading-tight">
        {values[currentIndex]?.value}
      </span>
    </button>
  );
};
