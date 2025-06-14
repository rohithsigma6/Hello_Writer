import { formatDistanceToNow } from 'date-fns';
import { join } from '@/utils/misc';
import { useEditorChatStore } from '@/store/editor';

interface ChatMessageProps {
  message: any;
  isCurrentUser: boolean;
  username: string;
  isIndividual: boolean;
}
const ChatMessage = ({
  message,
  isCurrentUser,
  username,
  isIndividual,
}: ChatMessageProps) => {
  const { isGroup } = useEditorChatStore((state) => state);

  const userColor = isCurrentUser
    ? 'bg-[#ECF8F2] text-black w-[152px]'
    : 'bg-[#F2F2F3] text-gray-800 w-[152px]';
  const formattedTime = formatDistanceToNow(new Date(message.createdAt), {
    addSuffix: true,
  });

  return (
    <div
      className={join(
        'flex items-center mb-4',
        isCurrentUser ? 'justify-end' : '',
      )}
    >
      <div
        className={join(
          'relative rounded-lg p-1 pl-2 pt-2',
          userColor,
          'max-w-md shadow-md',
        )}
      >
        {isGroup && !isIndividual && (
          <p className="font-bold text-xs">{message.username}</p>
        )}
        <p className="text-xs">{message.content}</p>
        <span
          style={{ bottom: '4px', right: '2px' }}
          className="text-gray-400 text-[6px]"
        >
          {formattedTime}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
