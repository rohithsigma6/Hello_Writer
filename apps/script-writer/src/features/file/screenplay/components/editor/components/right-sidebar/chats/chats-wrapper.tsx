import { useEffect } from 'react';
import { Chats } from './chats';
import { EditorChats } from './editor-chats';
import { EditorChatUser } from './editor-chat-user';
import { useEditorChatStore } from '@/store/editor';
import { useParams, useSearchParams } from 'react-router';
import { useCollabStore, useFileStore } from '@/store/editor/store';

export const ChatsWrapper = () => {
  const [searchParams] = useSearchParams();
  const versionName = searchParams?.get('versionName') || 'V1';
  const versionColor = searchParams?.get('versionColor') || 'White';
  const editStatus = searchParams?.get('editStatus') || 'PERSONAL DRAFT';
  const { showChat, windowStack } = useEditorChatStore((state) => state);
  const fileCtx = useFileStore((state) => state);
  const collabCtx = useCollabStore((state) => state);
  const { fileId } = useParams();

  // Connect to chat
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userObj = JSON.parse(user);
      collabCtx.connectChat({
        user: userObj,
        file: fileId || '',
        versionDetails: {
          versionName,
          versionColor,
          editStatus,
        },
      });
    }
  }, [versionName, versionColor, editStatus]);

  return (
    <>
      <Chats />
      {showChat && (
        <div className="flex fixed bottom-[8%] right-[24%] space-x-6">
          {windowStack.map((stack, index) => {
            return (
              <div
                key={stack.toUserId + index}
                className={`w-[250px] ${index === windowStack.length - 1 ? 'right-[24%]' : 'right-[41%] mr-1'} fixed`}
                data-id={stack.toUserId + index}
              >
                {stack.type === 'group' ? (
                  <EditorChats open={fileCtx.chatOpen} />
                ) : (
                  <EditorChatUser
                    open={!!fileCtx.chatOpenUser}
                    userName={stack.userName}
                    toUserId={stack.toUserId}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
