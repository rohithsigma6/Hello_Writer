import { useSearchParams } from 'react-router';
import { SidebarOptions } from '@/store/editor/slices/editor';
import { CommentsStash } from './comments-stash';
import { ChatsWrapper } from './chats/chats-wrapper';
import { Timer } from '../timer/timer';

const allowedTabs = ['comments', 'version', 'stash', 'chat', 'timer'] as const;
type TabOption = (typeof allowedTabs)[number];

const RightSidebar = () => {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab') as TabOption | null;
  const activeTab: TabOption = tabParam!;

  switch (activeTab) {
    case SidebarOptions.comments:
      return <CommentsStash />;
    case SidebarOptions.version:
      return <CommentsStash />;
    case SidebarOptions.stash:
      return <CommentsStash />;
    case SidebarOptions.chat:
      return <ChatsWrapper />;
    case SidebarOptions.timer:
      return <Timer />;
    default:
      return null;
  }
};

export default RightSidebar;

// Sandbox code to add collab request
// const handleCollaborators = useCallback(async () => {
//   const response = await searchUser({ search: '' });
//   if (response?.users && response.users.length > 0) {
//     // Take 5 users
//     const users = response.users.slice(0, 5).map((user) => {
//       return { userId: user._id, permissionType: 'EDIT' };
//     });
//     const res = await addCollaborators(fileId || '', users);
//     console.log(res);
//   }
// }, []);
