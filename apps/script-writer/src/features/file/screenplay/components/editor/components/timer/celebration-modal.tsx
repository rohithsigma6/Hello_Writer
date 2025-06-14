import { useTimerStore } from '@/store/editor';
import { PartyPopper, X } from 'lucide-react';

export const CelebrationModal = () => {
  const {
    isCelebrationModal,
    wordGoal,
    resetTimer,
    updateIsCelebrationModal,
  } = useTimerStore((state) => state);

  // Return null if celebration modal is falsy
  if (!isCelebrationModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[999]">
      <div className="relative bg-white rounded-2xl p-6 pt-12 w-80 shadow-xl overflow-visible">
        {/* Top Party Icon */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white rounded-full border-4 border-white shadow-md w-16 h-16 flex items-center justify-center z-10">
          <PartyPopper className="text-violet-600 w-8 h-8" />
        </div>
        {/* Close button */}
        <button
          className="absolute top-2 right-2 bg-white rounded-full border-4 border-white shadow-md flex items-center justify-center z-10"
          onClick={() => updateIsCelebrationModal(false)}
        >
          <X className="w-4 h-4" />
        </button>

        {/* Confetti (external CSS) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: ['#f472b6', '#60a5fa', '#34d399', '#facc15'][
                  i % 4
                ],
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Great Work !</h2>
          <p className="text-gray-500">
            you completed a {wordGoal} words sprint
          </p>
          <div className="flex justify-between gap-2 pt-4">
            <button
              onClick={() => resetTimer()}
              className="flex-1 bg-black text-white rounded-xl py-2 font-medium"
            >
              Reset
            </button>
            <button
              onClick={() => {}}
              className="flex-1 bg-black text-white rounded-xl py-2 font-medium"
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
