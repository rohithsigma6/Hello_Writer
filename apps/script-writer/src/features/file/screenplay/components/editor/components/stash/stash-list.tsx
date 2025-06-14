import React, { useState } from 'react';
import { useEditorStore } from '@/store/editor';
import { socketSelectors, useSocketStore } from '@/store/socket';
import { useParams } from 'react-router';
import StashCard from './stash-card';

const StashList = () => {
  const { fileId } = useParams();
  const socket = useSocketStore(socketSelectors.socket);
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);

  const { stashList } = useEditorStore();

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    cardId: string,
    cardText: string,
  ) => {
    try {
      event.dataTransfer.setData(
        'application/json',
        JSON.stringify({ text: cardText, id: cardId, fileId }),
      );

      setDraggedCardId(cardId);
    } catch (error) {
      console.error('Drag error:', error);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    console.log({ draggedCardId });
    if (draggedCardId) {
      handleDeleteStash(draggedCardId);

      setDraggedCardId(null);
    }
  };

  const handleDeleteStash = (id: string) => {
    if (socket) {
      socket?.emit('removeStash', fileId, id);
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center w-full max-w-md mx-auto pt-0 p-4">
      {stashList?.map((card) => (
        <StashCard
          key={card?.id}
          title={card?.title}
          id={card?.id}
          text={card?.text}
          user={card?.user!}
          handleDeleteStash={handleDeleteStash}
          handleDragStart={handleDragStart}
          handleDrop={handleDrop}
          createdAt={card?.createdAt!}
        />
      ))}
    </div>
  );
};

export default StashList;
