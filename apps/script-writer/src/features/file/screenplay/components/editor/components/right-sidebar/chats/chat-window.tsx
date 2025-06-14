import { useEffect, useRef } from 'react';
import { format, isToday, isYesterday, parseISO, isValid } from 'date-fns';

import './chat-window.css';
import { Send } from 'lucide-react';
import ChatMessage from './chat-message';
interface ChatWindowProps {
  messages: any;
  newMessage: any;
  setNewMessage: any;
  sendMessage: any;
  handleCloseChat: any;
  isIndividual?: any;
}

export const ChatWindow = ({
  messages,
  newMessage,
  setNewMessage,
  sendMessage,
  handleCloseChat,
  isIndividual,
}: ChatWindowProps) => {
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const handleMessage = () => {
    sendMessage();
  };

  useEffect(() => {
    const chatBox = chatBoxRef.current;
    if (chatBox)
      chatBox.scrollTo({
        top: chatBox.scrollHeight,
        behavior: 'smooth',
      });
  }, [messages.length]);

  const groupMessagesByDate = (messages: any[]) => {
    const grouped: Record<string, any[]> = {};
    const sortedMessages = messages.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );

    sortedMessages.forEach((message) => {
      if (!message.createdAt) {
        console.warn('Message is missing createdAt:', message);
        return;
      }

      const messageDate = parseISO(message.createdAt); // Ensure createdAt is in ISO format
      if (!isValid(messageDate)) {
        console.warn('Invalid createdAt value:', message.createdAt);
        return;
      }
      let groupKey = '';

      if (isToday(messageDate)) {
        groupKey = 'Today';
      } else if (isYesterday(messageDate)) {
        groupKey = 'Yesterday';
      } else {
        groupKey = format(messageDate, 'EEEE'); // Get the day of the week, e.g., "Friday"
      }

      if (!grouped[groupKey]) {
        grouped[groupKey] = [];
      }
      grouped[groupKey].push(message);
    });

    return grouped;
  };
  return (
    <div className="h-[350px] border">
      <div className="flex flex-col bg-white h-full">
        <div
          className="px-4 py-2 h-[90%] overflow-y-scroll overflow-x-hidden custom-scrollbar"
          ref={chatBoxRef}
        >
          {Object.entries(groupMessagesByDate(messages)).map(
            ([dateGroup, groupedMessages]) => (
              <div key={dateGroup}>
                {/* Date Heading */}
                <div className=" text-sm font-semibold  flex justify-center   mt-4 mb-2">
                  <div
                    style={{
                      width: 'max-content',
                      padding: '1px 6px',
                    }}
                    className=" h-[25px] bg-[#E9E9EA] rounded-lg flex justify-center"
                  >
                    <span className="text-[10px] text-[#212131]">
                      {dateGroup}
                    </span>
                  </div>
                </div>

                {/* Messages for this Date Group */}
                {groupedMessages.map((message: any) => (
                  <ChatMessage
                    username={message.username}
                    key={Math.random()}
                    message={message}
                    isCurrentUser={message.isCurrentUser}
                    isIndividual={isIndividual}
                  />
                ))}
              </div>
            ),
          )}
        </div>
        <div className="flex items-center bg-[#212131] gap-4 border-gray-300 py-6 p-4 border-t h-[10%]">
          <form
            className="flex gap-1 w-full"
            onSubmit={(e) => {
              e.preventDefault();
              handleMessage();
            }}
          >
            <input
              className="flex-grow w-[190px] px-2 py-1 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type here..."
            />
            <Send
              color="white"
              onClick={handleMessage}
              className="cursor-pointer"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
