import { SidebarOptions } from '@/store/editor/slices/editor';
import CommentList from './comments/comment-list';
import StashList from './stash/stash-list';
import { useSearchParams } from 'react-router';
import VersionHistoryList from './version-history/version-list';

export const TabContents = () => {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab') as SidebarOptions | null;
  return (
    <div className="w-full max-h-[60vh] p-2 overflow-y-auto">
      {tabParam == SidebarOptions.comments && <CommentList />}
      {tabParam == SidebarOptions.stash && <StashList />}
      {tabParam == SidebarOptions.version && <VersionHistoryList />}
    </div>
  );
};
