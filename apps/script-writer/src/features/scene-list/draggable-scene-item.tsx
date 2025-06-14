import React, { useState } from 'react';
import { IScene } from '@/types/scenes';
import { MdDragIndicator } from 'react-icons/md';
import { getSceneBackgroundColor, timeIndicator } from './helper';

type SceneItemProps = IScene & {
  index: number;
  height: string;
  isDragging?: boolean;
  isSelected?: boolean;
  disabled?: boolean;
  onDragStart?: (sourceIndex: number) => void;
  onDragEnter?: (destinationIndex: number) => void;
  onDragEnd?: () => void;
};

export const DraggableSceneItem: React.FC<SceneItemProps> = (props) => {
  const [dragging, setDragging] = useState(props.isDragging);

  const handleScrollToElement = (index: number) => {
    const scenes = document.getElementsByClassName('scene');
    if (scenes && scenes[index]) {
      scenes[index].scrollIntoView({ behavior: 'smooth' });
    }
  };

  const onStart = () => {
    props.onDragStart?.(props.index);
    setDragging(true);
  };

  const onEnter = () => {
    props.onDragEnter?.(props.index);
  };

  const onLeave = () => {
    //
  };

  const onEnd = () => {
    props.onDragEnd?.();
    setDragging(false);
  };

  return (
    <div
      className={[
        'w-full flex uppercase p-3 flex-row items-center justify-between rounded-2xl',
        dragging ? 'opacity-90 cursor-grabbing' : 'opacity-100 cursor-grab',
        getSceneBackgroundColor(props.text),
        props.text.toUpperCase().endsWith(timeIndicator.night) ||
        props.text.toUpperCase().endsWith(timeIndicator.sundown) ||
        getSceneBackgroundColor(props.text) === 'bg-[#653EFF]'
          ? 'text-white'
          : 'text-black',
      ]
        .filter(Boolean)
        .join(' ')}
      draggable
      onDragStart={onStart}
      onDragEnter={onEnter}
      onDragLeave={onLeave}
      onDragEnd={onEnd}
      onClick={() => handleScrollToElement(props.index)}
    >
      <section
        className="flex flex-row items-center gap-2 handle"
        draggable={false}
      >
        <MdDragIndicator className="text-lg cursor-move" />
        <p className="text-sm w-[200px] uppercase whitespace-nowrap text-ellipsis overflow-clip">
          {`${props.index + 1}. ${props.text}`}
        </p>
      </section>

      <p className="text-right ml-2">({props.height})</p>
    </div>
  );
};
