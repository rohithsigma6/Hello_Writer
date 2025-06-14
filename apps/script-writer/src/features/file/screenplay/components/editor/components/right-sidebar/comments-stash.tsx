import { useSearchParams } from 'react-router';
import { TabContents } from '../tab-contents';
import { SidebarOptions } from '@/store/editor/slices/editor';
import { toggleSearchParam } from '@/utils/searchparams-toggle';

const allowedTabs = ['comments', 'version', 'stash'] as const;
type TabOption = (typeof allowedTabs)[number];

export const CommentsStash = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab') as TabOption | null;

  const activeTab: TabOption = tabParam!;

  // Update the query params when a tab is clicked
  const handleTabChange = (tab: TabOption) => {
    setSearchParams(toggleSearchParam(searchParams, 'tab', tab));
  };

  return (
    <div
      className="w-[29%] max-w-[341px] pl-2"
      style={{ height: 'calc(-50px + 80vh)' }}
    >
      <div className="TabsContainer w-full mt-5 relative flex flex-col gap-y-6">
        <div className="h-12 w-full text-xs font-medium text-center text-gray-500 dark:text-gray-400 dark:border-gray-700">
          <div className="w-full flex flex-nowrap gap-1 items-stretch mb-6 text-[10px]">
            <button
              onClick={() => handleTabChange('comments')}
              className={`w-1/3 rounded-lg py-2 px-3 ${
                activeTab === SidebarOptions.comments
                  ? 'bg-[#663eff] text-white'
                  : 'bg-gray-400 text-white'
              }`}
            >
              Comments
            </button>
            <button
              onClick={() => handleTabChange('version')}
              className={`w-1/3 rounded-lg py-2 px-3 ${
                activeTab === SidebarOptions.version
                  ? 'bg-[#663eff] text-white'
                  : 'bg-gray-400 text-white'
              }`}
            >
              Version History
            </button>
            <button
              onClick={() => handleTabChange('stash')}
              className={`w-1/3 rounded-lg py-2 px-3 ${
                activeTab === SidebarOptions.stash
                  ? 'bg-[#663eff] text-white'
                  : 'bg-gray-400 text-white'
              }`}
            >
              Stash
            </button>
          </div>
        </div>
        <TabContents />
      </div>
    </div>
  );
};
