import { MouseEvent, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { join } from '@/utils/misc';
import { ChatWindow } from './chat-window';
import { useEditorChatStore } from '@/store/editor';
import { useParams } from 'react-router';
import { useCollabStore, useFileStore } from '@/store/editor/store';
import { getIndividualMessages } from '@/features/file/screenplay/api/chats';
interface EditorChatsProps {
  open: boolean;
  userName: string;
  toUserId: string;
}

export const EditorChatUser = ({
  open: isChatWindowOpen,
  userName,
  toUserId,
}: EditorChatsProps) => {
  const fileCtx = useFileStore((state) => state);
  const { fileId } = useParams();
  const open = Boolean(isChatWindowOpen);
  const [newMessage, setNewMessage] = useState('');
  const [isIndividual, setIsIndividual] = useState(true);

  const collabCtx = useCollabStore((state) => state);
  const { windowStack, setWindowStack } = useEditorChatStore((state) => state);
  const [userId, setUserId] = useState(() => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    return user?._id || null; // Return user._id if it exists, otherwise null
  });

  const chatSocket = collabCtx.getChatSocket();
  //TODO: Add a state to store messages
  const [messages, setMessages] = useState<any[]>([]);
  const className = `EditorChats`;
  const [file, setFile] = useState(fileId);
  const [unreadCount, setUnreadCount] = useState(0); // Unread messages count

  const handleRemoveUserChat = () => {
    fileCtx.updateChatWindowUser(false);
    if (windowStack.length === 1) {
      setWindowStack([]);
    } else {
      const newStack = windowStack.filter(
        (stack) => stack.toUserId !== toUserId,
      );
      setWindowStack(newStack);
    }
  };

  const getMessage = async () => {
    try {
      const data = {
        receiverId: toUserId,
        senderId: userId,
        roomId: fileId,
      };
      const res: any = await getIndividualMessages(data);
      const allMessages = res?.messages?.messages;
      const messageFormat = {
        id: Date.now(),
        seen: false,
      };

      const initialMessages = allMessages?.map((message: any) => ({
        ...messageFormat,
        content: message.content,
        isCurrentUser: message.senderId._id === userId,
        username: message.username,
        createdAt: message.createdAt, // Preserve message timestamp
        senderId: message.senderId, // Sender info
        receiverId: message.receiverId, // Receiver info
      }));
      setMessages(initialMessages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMessage();
  }, [userId, file, toUserId, userName]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const generatedUserId = user?._id;

    if (generatedUserId) {
      setUserId(generatedUserId);
      chatSocket?.emit('user-joined', generatedUserId);
    }
  }, [chatSocket, isChatWindowOpen]);

  useEffect(() => {
    if (userId != toUserId) {
      const handleReceiveMessage = (data: any) => {
        // Return if message is not for toUserId
        if (data.senderId !== toUserId || data.receiverId !== userId) return;

        const message = {
          id: Date.now(),
          content: data.content,
          seen: false,
          isCurrentUser: data.senderId === userId,
          createdAt: data.createdAt,
          senderId: data.senderId,
          receiverId: data.receiverId,
        };

        setMessages((prevMessages) => [...prevMessages, message]);
        if (!isChatWindowOpen) {
          setUnreadCount((prevCount) => prevCount + 1);
        }
      };

      if (chatSocket) {
        chatSocket.on('receive-message', handleReceiveMessage);
      }

      return () => {
        if (chatSocket) {
          chatSocket.off('receive-message', handleReceiveMessage);
        }
      };
    }
  }, [chatSocket, userId, isChatWindowOpen, messages, toUserId]);

  useEffect(() => {
    if (isChatWindowOpen) {
      setUnreadCount(0); // Reset unread count to 0
    }
  }, [isChatWindowOpen]);

  const handleCloseChat = () => {
    fileCtx.updateChatWindowUser(false);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return; // Ignore empty messages

    if (userName != '' && toUserId != '') {
      const message = {
        id: Date.now(),
        username: 'You', // Replace with actual username
        content: newMessage,
        isCurrentUser: true,
        seen: false, // Add seen property for current user messages
        createdAt: new Date(Date.now()).toISOString(), // Convert to ISO string
      };

      chatSocket?.emit('sendMessage-toUser', {
        fromUserId: userId,
        message: message.content,
        toUserId,
      });

      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  /**
   * Close chats
   *@argument MouseEvent - Click event to stop propagate as the outside div is clickable
   */
  const handleClose = (e: MouseEvent) => {
    e.stopPropagation();
    fileCtx.updateChatWindowUser(false);
  };

  const handleOpen = () => {
    fileCtx.updateChatWindowUser(true);
  };

  return (
    <div
      className={
        className +
        ' ' +
        join(
          'fixed z-50 bottom-[3%] w-[250px] rounded-t-2xl transition-all h-auto px-2',
          // open ? 'h-auto' : 'h-0',
        )
      }
      onClick={handleOpen}
    >
      <div className="w-full flex items-center bg-[#212131] text-white px-3 py-2 rounded-t-xl font-bold text-xs cursor-pointer">
        <div
          onClick={(e) => (open ? handleClose(e) : handleOpen())}
          className="flex gap-2 items-center"
        >
          <div className="relative w-4 h-4 text-[8px] flex items-center justify-center bg-[#4D4D5A] rounded-full text-white font-bold">
            {userName[0]}
            {unreadCount > 0 && (
              <span className="absolute top-[-5px] left-[-4px] flex items-center justify-center w-3 h-3 bg-red-500 text-white text-[6px] font-bold rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <p className="truncate">{userName}</p>
        </div>

        <div className="ml-auto">
          <X
            onClick={handleRemoveUserChat}
            className="cursor-pointer"
            size="18px"
          />
        </div>
      </div>
      <ChatWindow
        messages={messages}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        sendMessage={sendMessage}
        handleCloseChat={handleCloseChat}
        isIndividual={isIndividual}
      />
    </div>
  );
};
