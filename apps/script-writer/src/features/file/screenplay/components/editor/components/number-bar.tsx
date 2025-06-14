import { useSceneList } from '@/hooks/scenes/use-scene-list';
import { useMemo } from 'react';

export const NumberBar = () => {
  const { scenes } = useSceneList();

  const handleScrollToElement = (dotIndex: number) => {
    const index = scenes[dotIndex].contentIndex;
    const sceneList = document.getElementsByClassName('scene');
    if (sceneList && sceneList[index]) {
      sceneList[index].scrollIntoView({ behavior: 'smooth' });
    }
  };

  const dotsAndNumbers = useMemo(() => {
    const maxVisibleElements = 8; // Maximum numbers or dots in the bar
    const maxDotsBetweenNumbers = 5; // Maximum dots allowed between two numbers
    const sceneCount = scenes.length;

    if (sceneCount <= maxVisibleElements) {
      return scenes.map((_, index) => ({ type: 'number', index }));
    }

    const items: { type: 'number' | 'dot'; index: number }[] = [];

    const step = Math.ceil((sceneCount - 2) / (maxVisibleElements - 2)); // Calculate step for intermediate numbers
    const numbers = [0];
    for (let i = step; i < sceneCount - 1; i += step) {
      numbers.push(i);
    }
    // Include the last number
    numbers.push(sceneCount - 1);

    // Build the items array with dots in between
    for (let i = 0; i < numbers.length - 1; i++) {
      items.push({ type: 'number', index: numbers[i] });
      const gap = numbers[i + 1] - numbers[i];
      const dotCount = Math.min(maxDotsBetweenNumbers, gap - 1); // Limit dots to a maximum

      for (let j = 1; j <= dotCount; j++) {
        const dotIndex = numbers[i] + Math.floor((gap / (dotCount + 1)) * j);
        items.push({ type: 'dot', index: dotIndex });
      }
    }
    // Add the last number
    items.push({ type: 'number', index: numbers[numbers.length - 1] });

    return items;
  }, [scenes]);

  return (
    <div className="flex-shrink-0 h-full sticky top-0">
      <div className="relative overflow-visible pt-4 pr-2">
        <div className="flex flex-col font-sans text-[8px] border border-gray px-2 py-2 rounded-[50px] text-center bg-white m-auto mr-[0px] h-[70vh] ">
          {dotsAndNumbers.length ? (
            dotsAndNumbers.map((item, i) => (
              <div
                onClick={() => handleScrollToElement(item.index)}
                key={i}
                className="relative group overflow-visible h-[20px] cursor-pointer"
              >
                {item.type === 'number' ? (
                  <span className="font-bold">{item.index + 1}</span>
                ) : (
                  <>
                    <span className="font-bold">.</span>
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 hidden group-hover:block">
                      <div className="w-0 h-0 border-t-[6px] border-b-[6px] border-l-[6px] border-transparent border-l-gray-500"></div>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <div className="relative group overflow-visible h-[20px] cursor-pointer">
              <span className="font-bold">1</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

{
  /* <div className="flex-shrink-0 h-full sticky top-0">
<div className="relative overflow-visible">
    <div className="flex flex-col font-sans text-[8px] border border-gray px-2 py-2 mr-[10px] mt-[15px]  rounded-[50px] text-center bg-white m-auto h-[70vh]">
        <div className="relative group overflow-visible h-[20px] cursor-pointer">
            <span className="font-bold">1</span>
        </div>
    </div>
</div>
</div> */
}
