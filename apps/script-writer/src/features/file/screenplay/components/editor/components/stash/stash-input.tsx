import { socketSelectors, useSocketStore } from '@/store/socket';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDebouncedCallback } from 'use-debounce';

const StashInput = ({
  initialTitle,
  id,
}: {
  initialTitle: string;
  id: string;
}) => {
  const { fileId } = useParams();
  const socket = useSocketStore(socketSelectors.socket);
  const [title, setTitle] = useState(initialTitle || '');
  const emitUpdate = (title: string) => {
    if (socket) {
      socket.emit('updateStash', {
        fileId,
        stashId: id,
        updatedTitle: title,
      });
    }
  };
  const debounce = useDebouncedCallback(emitUpdate, 500);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
    debounce(newTitle);
  };

  useEffect(() => {
    if (initialTitle) {
      setTitle(initialTitle);
    }
  }, [initialTitle]);
  return (
    <div className="flex justify-between items-center">
      <input
        type="text"
        className="text-[#212131] text-[14px] font-poppins font-semibold mb-0 outline-none border-none bg-transparent"
        placeholder="Untitled"
        value={title}
        onChange={handleTitleChange}
      />
    </div>
  );
};

export default StashInput;
