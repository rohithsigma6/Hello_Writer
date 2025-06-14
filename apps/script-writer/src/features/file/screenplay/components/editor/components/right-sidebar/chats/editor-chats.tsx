import { MouseEvent, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { Users, X } from 'lucide-react';
import { join } from '@/utils/misc';
import { ChatWindow } from './chat-window';
import { useEditorChatStore } from '@/store/editor';
import { useStore } from 'zustand';
import { useCollabStore, useFileStore } from '@/store/editor/store';
import { getGroupMessages } from '@/features/file/screenplay/api/chats';
import { useParams } from 'react-router';

interface CustomSocket extends Socket {
  user?: {
    _id: string;
    firstName: string;
    lastName: string;
    // Add other properties you need from the `user` object here
  };
}
interface EditorChatsProps {
  open: boolean;
}

export const EditorChats = ({ open: isChatWindowOpen }: EditorChatsProps) => {
  const fileCtx = useFileStore((state) => state);
  const { fileId } = useParams();
  const open = Boolean(isChatWindowOpen);
  const collabCtx = useCollabStore((state) => state);
  const { updateIsGroup, windowStack, setWindowStack } =
    useStore(useEditorChatStore);
  const [newMessage, setNewMessage] = useState('');
  const [file, setFile] = useState(fileId);
  const [userId, setUserId] = useState(() => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    return user?._id || null; // Return user._id if it exists, otherwise null
  });
  const currentStack = windowStack.find((s) => s.type === 'group');
  console.log('currentStack', currentStack);
  const chatSocket = collabCtx.getChatSocket() as CustomSocket;
  const currentUserId = chatSocket?.user?._id; // Current user's ID
  const [unreadCount, setUnreadCount] = useState(0); // Unread messages count

  //TODO: Add a state to store messages
  const [messages, setMessages] = useState<any[]>([]);
  const className = 'EditorChats';

  const getGroupMessage = async () => {
    try {
      const data = {
        roomId: fileId,
      };
      const res: any = await getGroupMessages(data.roomId || '');
      const allMessages = res?.messages?.messages;
      const messageFormat = {
        seen: false,
      };

      const initialMessages = allMessages?.map((message: any) => {
        const isCurrentUser = message.senderId._id === userId;

        return {
          ...messageFormat,
          id: message.id || Date.now(),
          content: message.content,
          createdAt: message.createdAt,
          senderId: message.senderId,
          receiverId: message.receiverId,
          isCurrentUser: message.senderId._id === userId,
          username: isCurrentUser
            ? 'You'
            : `${message.senderId.firstName} ${message.senderId.lastName}`,
        };
      });
      setMessages(initialMessages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getGroupMessage();
  }, [file]);

  useEffect(() => {
    const handleNewMessage = (data: any) => {
      const message = {
        id: Date.now(),
        content: data.content,
        seen: false,
        createdAt: data.createdAt || new Date().toISOString(),
        isCurrentUser: data.isCurrentUser,
        username: data.username,
        senderId: data.senderId,
      };

      setMessages((prevMessages) => [...prevMessages, message]);

      if (!isChatWindowOpen) {
        setUnreadCount((prevCount) => prevCount + 1);
      }
    };

    if (chatSocket) {
      chatSocket.on('newMessage', handleNewMessage);
    }

    return () => {
      if (chatSocket) {
        chatSocket.off('newMessage', handleNewMessage);
      }
    };
  }, [chatSocket, userId, isChatWindowOpen, collabCtx]);

  useEffect(() => {
    if (isChatWindowOpen) {
      setUnreadCount(0); // Reset unread count to 0
    }
  }, [isChatWindowOpen]);

  const handleCloseChat = () => {
    fileCtx.updateChatWindow(false);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return; // Ignore empty messages

    const message = {
      id: Date.now(),
      content: newMessage,
      isCurrentUser: true,
      seen: false, // Add seen property for current user messages
      createdAt: new Date(Date.now()).toISOString(), // Convert to ISO string
      username: 'You', // Replace with actual username
    };

    chatSocket?.emit('sendMessage', { content: message.content });

    setMessages([...messages, message]);
    setNewMessage('');
  };

  /**
   * Close chats
   *@argument MouseEvent - Click event to stop propagate as the outside div is clickable
   */
  const handleClose = (e: MouseEvent) => {
    e.stopPropagation();
    fileCtx.updateChatWindow(false);
  };

  /**
   * Open chats
   */
  const handleOpen = () => {
    fileCtx.updateChatWindow(true);
  };

  // Handle group
  const handleGroup = () => {
    updateIsGroup(false);
    if (windowStack.length === 1) {
      setWindowStack([]);
    } else {
      const newStack = windowStack.filter((stack) => stack.type !== 'group');
      setWindowStack(newStack);
    }
  };

  return (
    <div
      className={
        className +
        ' ' +
        join(
          'fixed z-50 bottom-[3%] w-[250px] rounded-t-2xl transition-all px-2',
          // open ? 'h-auto' : 'h-0',
        )
      }
      onClick={handleOpen}
    >
      <div className="flex justify-between items-center bg-[#212131] text-white px-3 py-2 rounded-t-xl font-bold text-xs cursor-pointer">
        <div
          onClick={(e) => (open ? handleClose(e) : handleOpen())}
          className="flex gap-2 items-center"
        >
          <div className="relative w-4 h-4 text-[8px] flex items-center justify-center bg-[#4D4D5A] rounded-full text-white font-bold">
            <Users />
            {unreadCount > 0 && (
              <span className="absolute top-[-5px] left-[-4px] flex items-center justify-center w-3 h-3 bg-red-500 text-white text-[6px] font-bold rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <p>Group</p>
        </div>{' '}
        <div className="ml-auto">
          <X onClick={handleGroup} className="cursor-pointer" size="18px" />
        </div>{' '}
      </div>
      <ChatWindow
        messages={messages}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        sendMessage={sendMessage}
        handleCloseChat={handleCloseChat}
      />
    </div>
  );
};
